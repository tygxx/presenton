import React from 'react'
import * as z from "zod";

export const layoutId = 'medical-cn-data-table'
export const layoutName = '数据表格'
export const layoutDescription = '医疗健康风数据表格页：表头主题色底、斑马纹行、圆角卡片承载。适合指标对比、检查明细、用药方案等结构化数据呈现。纯 CSS/SVG 装饰（脉搏波形 / 十字 / 柔和光晕），离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('科室核心指标对比').meta({
        description: "表格主标题（中文，简短，建议不超过20字）",
    }),
    subtitle: z.string().min(2).max(40).default('近三个季度门诊量、满意度与平均住院日横向对比').meta({
        description: "副标题，一句话说明表格内容",
    }),
    headers: z.array(
        z.string().min(1).max(12).meta({ description: "列表头文字，建议不超过12字" })
    ).min(2).max(5).default(['指标项', '心血管内科', '呼吸内科', '消化内科', '同比变化']).meta({
        description: "表头列（2~5列）",
    }),
    rows: z.array(
        z.array(
            z.string().min(0).max(16).meta({ description: "单元格文字，建议不超过16字" })
        ).min(2).max(5)
    ).min(2).max(6).default([
        ['季度门诊量（人次）', '12,480', '9,360', '10,720', '+8.6%'],
        ['住院满意度', '98.2%', '96.7%', '97.5%', '+1.4%'],
        ['平均住院日（天）', '6.8', '7.2', '6.5', '-0.5'],
        ['日间手术占比', '42%', '18%', '35%', '+6.0%'],
        ['抗菌药使用强度', '38.5', '41.2', '36.8', '-2.1'],
        ['复诊预约率', '64%', '58%', '61%', '+3.2%'],
    ]).meta({
        description: "数据行（2~6行，每行单元格数应与表头列数一致）",
    }),
    footnote: z.string().min(0).max(40).default('数据来源：医院信息系统 HIS · 统计周期 2026年Q1').meta({
        description: "表格下方备注/数据来源说明",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DataTable: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '科室核心指标对比'
    const subtitle = slideData?.subtitle || '近三个季度门诊量、满意度与平均住院日横向对比'
    const headers = (slideData?.headers && slideData.headers.length >= 2)
        ? slideData.headers
        : ['指标项', '心血管内科', '呼吸内科', '消化内科', '同比变化']
    const rows = (slideData?.rows && slideData.rows.length >= 1)
        ? slideData.rows
        : [
            ['季度门诊量（人次）', '12,480', '9,360', '10,720', '+8.6%'],
            ['住院满意度', '98.2%', '96.7%', '97.5%', '+1.4%'],
            ['平均住院日（天）', '6.8', '7.2', '6.5', '-0.5'],
            ['日间手术占比', '42%', '18%', '35%', '+6.0%'],
            ['抗菌药使用强度', '38.5', '41.2', '36.8', '-2.1'],
            ['复诊预约率', '64%', '58%', '61%', '+3.2%'],
        ]
    const footnote = slideData?.footnote ?? '数据来源：医院信息系统 HIS · 统计周期 2026年Q1'
    const colCount = headers.length

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f8fafc)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：柔和光晕 + 脉搏波形 + 十字母题 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    {/* 右上柔和光晕 */}
                    <div
                        className="absolute -top-24 -right-24 h-72 w-72 rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.16), rgba(14,165,233,0))" }}
                    />
                    {/* 左下柔和光晕 */}
                    <div
                        className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.14), rgba(16,185,129,0))" }}
                    />
                    {/* 底部脉搏波形 */}
                    <svg
                        viewBox="0 0 1280 160"
                        className="absolute bottom-0 left-0 w-full"
                        preserveAspectRatio="none"
                        style={{ height: '120px' }}
                    >
                        <defs>
                            <linearGradient id="medTablePulse" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.05" />
                                <stop offset="50%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.05" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M0,120 L360,120 L400,120 L420,70 L450,150 L480,30 L510,120 L900,120 L940,120 L960,80 L985,140 L1010,55 L1035,120 L1280,120"
                            fill="none"
                            stroke="url(#medTablePulse)"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* 右上角十字角标 */}
                <div className="absolute top-6 right-8 z-10" aria-hidden="true">
                    <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{ background: "rgba(14,165,233,0.10)" }}
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5">
                            <path
                                d="M10 3 h4 v5 h5 v4 h-5 v5 h-4 v-5 h-5 v-4 h5 z"
                                fill="var(--primary-color,#0ea5e9)"
                                opacity="0.85"
                            />
                        </svg>
                    </div>
                </div>

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-10">
                    {/* 标题区 */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div
                                className="h-7 w-1.5 flex-shrink-0 rounded-full"
                                style={{ background: "var(--secondary-color,#10b981)" }}
                            />
                            <h1
                                className="text-3xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                        <p
                            className="mt-2.5 pl-4 text-sm leading-relaxed break-words"
                            style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle}
                        </p>
                    </div>

                    {/* 表格卡片 */}
                    <div className="mt-7 flex min-h-0 flex-1 flex-col">
                        <div
                            className="flex flex-1 flex-col overflow-hidden rounded-2xl border"
                            style={{
                                background: "var(--card-color,#ffffff)",
                                borderColor: "var(--stroke,#e2e8f0)",
                                boxShadow: '0 12px 30px -12px rgba(14,165,233,0.20)',
                            }}
                        >
                            <table className="w-full table-fixed border-collapse">
                                {/* 表头：主题色底 */}
                                <thead>
                                    <tr style={{ background: "var(--primary-color,#0ea5e9)" }}>
                                        {headers.map((h, ci) => (
                                            <th
                                                key={ci}
                                                className={`px-5 py-4 align-middle text-sm font-bold break-words ${ci === 0 ? 'text-left' : 'text-center'}`}
                                                style={{
                                                    color: "var(--primary-text,#ffffff)",
                                                    overflowWrap: 'break-word',
                                                    wordBreak: 'break-word',
                                                }}
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                {/* 数据行：斑马纹 */}
                                <tbody>
                                    {rows.map((row, ri) => (
                                        <tr
                                            key={ri}
                                            style={{
                                                background: ri % 2 === 1
                                                    ? "rgba(14,165,233,0.05)"
                                                    : "var(--card-color,#ffffff)",
                                                borderTop: "1px solid var(--stroke,#e2e8f0)",
                                            }}
                                        >
                                            {Array.from({ length: colCount }).map((_, ci) => {
                                                const cell = row?.[ci] ?? ''
                                                const isFirst = ci === 0
                                                return (
                                                    <td
                                                        key={ci}
                                                        className={`px-5 py-3.5 align-middle text-sm leading-relaxed break-words ${isFirst ? 'text-left font-semibold' : 'text-center'}`}
                                                        style={{
                                                            color: isFirst
                                                                ? "var(--background-text,#0f172a)"
                                                                : "var(--background-text,#334155)",
                                                            overflowWrap: 'break-word',
                                                            wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {isFirst ? (
                                                            <span className="inline-flex items-center gap-2">
                                                                <span
                                                                    className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                                                    style={{ background: "var(--secondary-color,#10b981)" }}
                                                                />
                                                                <span
                                                                    className="break-words"
                                                                    style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                                >
                                                                    {cell}
                                                                </span>
                                                            </span>
                                                        ) : (
                                                            cell
                                                        )}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 备注 */}
                        {footnote && (
                            <p
                                className="mt-3 flex-shrink-0 text-xs leading-relaxed break-words"
                                style={{ color: "var(--background-text,#94a3b8)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {footnote}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
