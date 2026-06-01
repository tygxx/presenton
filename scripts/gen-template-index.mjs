#!/usr/bin/env node
// 根据 presentation-templates/*-cn/ 各组目录，重写 index.tsx 的注册块。
// 仅探测每个 layout 文件的导出标识（layoutId vs slideLayoutId），用 import 别名引用活导出。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATES_DIR = path.resolve(__dirname, '..', 'servers/nextjs/app/presentation-templates')
const OUT = path.join(TEMPLATES_DIR, 'index.tsx')

// 组顺序（business-cn 默认在前）与中文显示名
const GROUPS = [
  ['business-cn', '企业商务'],
  ['tech-cn', '科技互联网'],
  ['medical-cn', '医疗健康'],
  ['education-cn', '教育培训'],
  ['food-cn', '美食餐饮'],
  ['finance-cn', '金融投资'],
  ['gov-cn', '党政政务'],
  ['realestate-cn', '房产建筑'],
  ['culture-cn', '国潮文创'],
  ['green-cn', '新能源环保'],
  ['retail-cn', '电商新零售'],
  ['travel-cn', '旅游文旅'],
  ['manufacturing-cn', '智能制造'],
]

// 版式固定顺序（封面→结尾）
const FILE_ORDER = [
  'Cover', 'TableOfContents', 'SectionDivider', 'BigStatement', 'ThreePoints',
  'FourFeatures', 'IconList', 'KpiMetrics', 'Comparison', 'Timeline',
  'ProcessSteps', 'Roadmap', 'BarChart', 'PieDonut', 'LineChart',
  'DataTable', 'ImageLeft', 'ImageRight', 'FullBleedImage', 'Quote',
  'TeamGrid', 'Closing',
]

const pascal = (id) => id.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')
const camel = (id) => { const p = pascal(id); return p.charAt(0).toLowerCase() + p.slice(1) }

const detect = (src, base) => {
  const has = (name) => new RegExp(`export\\s+const\\s+${name}\\b`).test(src)
  const idName = has('layoutId') ? 'layoutId' : (has('slideLayoutId') ? 'slideLayoutId' : null)
  const nameName = has('layoutName') ? 'layoutName' : (has('slideLayoutName') ? 'slideLayoutName' : null)
  const descName = has('layoutDescription') ? 'layoutDescription' : (has('slideLayoutDescription') ? 'slideLayoutDescription' : null)
  const okSchema = has('Schema') || /export\s*\{[^}]*\bSchema\b/.test(src)
  const okDefault = /export\s+default\b/.test(src)
  return { idName, nameName, descName, okSchema, okDefault }
}

const imports = []
const settingsImports = []
const groupArrays = []
const templatesEntries = []
const allLayoutsSpread = []
const warnings = []

for (const [gid, gname] of GROUPS) {
  const dir = path.join(TEMPLATES_DIR, gid)
  if (!fs.existsSync(dir)) { warnings.push(`组目录缺失: ${gid}`); continue }
  const present = new Set(fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).map(f => f.replace(/\.tsx$/, '')))
  const orderedFiles = FILE_ORDER.filter(f => present.has(f))
  // 顺序外的额外文件也收进来（追加在后）
  for (const f of [...present].sort()) if (!FILE_ORDER.includes(f)) orderedFiles.push(f)
  if (orderedFiles.length < 20) warnings.push(`组 ${gid} 仅 ${orderedFiles.length} 张版式（<20）`)

  const entries = []
  for (const file of orderedFiles) {
    const src = fs.readFileSync(path.join(dir, file + '.tsx'), 'utf8')
    const d = detect(src, file)
    if (!d.idName || !d.nameName || !d.descName || !d.okSchema || !d.okDefault) {
      warnings.push(`跳过 ${gid}/${file}: 导出不完整 ${JSON.stringify(d)}`)
      continue
    }
    const base = `${pascal(gid)}${pascal(file)}`
    imports.push(
      `import ${base}, { Schema as ${base}Schema, ${d.idName} as ${base}Id, ${d.nameName} as ${base}Name, ${d.descName} as ${base}Desc } from "./${gid}/${file}";`
    )
    entries.push(
      `    createTemplateEntry(${base}, ${base}Schema, ${base}Id, ${base}Name, ${base}Desc, "${gid}", "${file}"),`
    )
  }
  const arrName = `${camel(gid)}Templates`
  settingsImports.push(`import ${camel(gid)}Settings from "./${gid}/settings.json";`)
  groupArrays.push(`export const ${arrName}: TemplateWithData[] = [\n${entries.join('\n')}\n];`)
  allLayoutsSpread.push(`    ...${arrName},`)
  templatesEntries.push(
    `    {\n        id: "${gid}",\n        name: "${gname}",\n        description: ${camel(gid)}Settings.description,\n        settings: ${camel(gid)}Settings as TemplateGroupSettings,\n        layouts: ${arrName},\n    },`
  )
}

const HELPERS = `
// Helper to get templates by group ID
export function getTemplatesByTemplateName(templateId: string): TemplateWithData[] {
    const template = templates.find((t) => t.id === templateId);
    return template?.layouts || [];
}

export function getSchemaByTemplateId(templateId: string): any {
    const template = templates.find((t) => t.id === templateId);
    return template?.layouts.map(t => {
        return {
            id: t.layoutId,
            name: t.layoutName,
            description: t.layoutDescription,
            json_schema: t.schemaJSON,
        }
    }) || {};
}
export function getSettingsByTemplateId(templateId: string): TemplateGroupSettings | undefined {
    const template = templates.find((t) => t.id === templateId);
    return template?.settings || undefined;
}
// Helper to get template by layout ID
export function getTemplateByLayoutId(layoutId: string): TemplateWithData | undefined {
    return allLayouts.find((t) => t.layoutId === layoutId);
}
export function getLayoutByLayoutId(layout: string, layoutGroup?: string): TemplateWithData | undefined {
    const templateName = layout.split(':')[0]
    const template = templates.find((t) => t.id === templateName)

    if (template) {
        return template.layouts.find((t) => t.layoutId === layout);
    }

    // Backward compatibility: persisted slides from fallback schema API may
    // store raw IDs like "general-intro-slide" (without "<group>:").
    if (layoutGroup) {
        const groupTemplate = templates.find((t) => t.id === layoutGroup);
        const qualifiedLayoutId = \`\${layoutGroup}:\${layout}\`;
        return groupTemplate?.layouts.find((t) => t.layoutId === qualifiedLayoutId);
    }

    return allLayouts.find((t) => t.layoutId.endsWith(\`:\${layout}\`));
}
`

const out = `import { TemplateWithData, TemplateGroupSettings, createTemplateEntry, TemplateLayoutsWithSettings } from "./utils";

// 本文件由 scripts/gen-template-index.mjs 自动生成，请勿手改。
// 中文场景内置模板组（13 组）。

${imports.join('\n')}

${settingsImports.join('\n')}

${groupArrays.join('\n\n')}

export const allLayouts: TemplateWithData[] = [
${allLayoutsSpread.join('\n')}
];

export const templates: TemplateLayoutsWithSettings[] = [
${templatesEntries.join('\n')}
];
${HELPERS}`

fs.writeFileSync(OUT, out, 'utf8')
const layoutCount = imports.length
console.log(`✅ 写入 ${path.relative(process.cwd(), OUT)}`)
console.log(`   组数=${GROUPS.length}  版式总数=${layoutCount}`)
if (warnings.length) { console.log('⚠️  警告:'); for (const w of warnings) console.log('   - ' + w) }
