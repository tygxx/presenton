import React from 'react'
import * as z from "zod";

export const layoutId = 'tech-cn-data-table'
export const layoutName = '数据表格'
export const layoutDescription = '科技互联网风数据表格页：深色霓虹底 + 几何网格/光晕装饰，主题色表头、斑马纹明细行，用于对比或参数明细表格。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('产品方案对比').meta({
        description: "表格页主标题（中文，简短有力，≤20字）",
    }),
    subtitle: z.string().min(2).max(40).default('多维度横向对比，辅助技术选型决策').meta({
        description: "标题下方副标题，一句话说明表格用途",
    }),
    headers: z.array(
        z.string().min(1).max(12).meta({ description: "表头列名（≤12字）" })
    ).min(2).max(5).default([
        '能力维度', '基础版', '专业版', '旗舰版',
    ]).meta({ description: "表头列，2-5列，首列通常为维度名称" }),
    rows: z.array(
        z.array(
            z.string().min(0).max(16).meta({ description: "单元格内容（≤16字）" })
        )
    ).min(2).max(6).default([
        ['并发吞吐', '5k QPS', '20k QPS', '100k QPS'],
        ['数据存储', '100 GB', '1 TB', '弹性扩容'],
        ['SLA 可用性', '99.9%', '99.95%', '99.99%'],
        ['智能算力', '入门 GPU', '混合算力', '专属集群'],
        ['专属支持', '工单服务', '7×24 在线', '架构师驻场'],
    ]).meta({ description: "表格数据行，2-6行，每行单元格数量应与表头列数一致" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DataTable: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '产品方案对比'
    const subtitle = slideData?.subtitle || '多维度横向对比，辅助技术选型决策'
    const headers = slideData?.headers && slideData.headers.length >= 2
        ? slideData.headers
        : ['能力维度', '基础版', '专业版', '旗舰版']
    const rows = slideData?.rows && slideData.rows.length >= 2
        ? slideData.rows
        : [
            ['并发吞吐', '5k QPS', '20k QPS', '100k QPS'],
            ['数据存储', '100 GB', '1 TB', '弹性扩容'],
            ['SLA 可用性', '99.9%', '99.95%', '99.99%'],
            ['智能算力', '入门 GPU', '混合算力', '专属集群'],
            ['专属支持', '工单服务', '7×24 在线', '架构师驻场'],
        ]

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
                    background: "var(--background-color,#0a0e1a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：几何网格 + 霓虹光晕 + 电路线 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="techTblGrid" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.04" />
                            </linearGradient>
                            <radialGradient id="techTblGlowA" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.40" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="techTblGlowB" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.38" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </radialGradient>
                            <pattern id="techTblMesh" width="42" height="42" patternUnits="userSpaceOnUse">
                                <path d="M42 0 L0 0 0 42" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.07" strokeWidth="1" />
                            </pattern>
                        </defs>
                        {/* 网格母题 */}
                        <rect width="1280" height="720" fill="url(#techTblMesh)" />
                        <rect width="1280" height="720" fill="url(#techTblGrid)" />
                        {/* 霓虹光晕 */}
                        <circle cx="120" cy="80" r="320" fill="url(#techTblGlowA)" />
                        <circle cx="1180" cy="660" r="340" fill="url(#techTblGlowB)" />
                        {/* 电路线母题 */}
                        <g stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.16" strokeWidth="1.5" fill="none">
                            <path d="M0 150 H180 L220 110 H420" />
                            <path d="M1280 600 H1080 L1040 640 H840" />
                        </g>
                        <g fill="var(--secondary-color,#8b5cf6)" fillOpacity="0.5">
                            <circle cx="420" cy="110" r="3" />
                            <circle cx="840" cy="640" r="3" />
                            <circle cx="180" cy="150" r="3" />
                        </g>
                    </svg>
                </div>

                {/* 内容主体 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex items-end justify-between gap-6">
                        <div className="flex flex-col">
                            <div className="mb-4 flex items-center gap-3">
                                <span
                                    className="inline-block h-7 w-1.5 rounded-full"
                                    style={{ background: "linear-gradient(180deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))" }}
                                />
                                <span
                                    className="text-sm font-medium tracking-wide break-words"
                                    style={{ color: "var(--primary-color,#3b82f6)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    DATA · 数据对比
                                </span>
                            </div>
                            <h1
                                className="text-5xl font-black leading-[1.2] break-words"
                                style={{
                                    color: "var(--background-text,#e5e7eb)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                    textShadow: '0 0 24px rgba(59,130,246,0.25)',
                                }}
                            >
                                {title}
                            </h1>
                            <p
                                className="mt-3 text-base leading-relaxed break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {subtitle}
                            </p>
                        </div>
                        {/* 行数角标 */}
                        <div className="flex flex-shrink-0 flex-col items-end">
                            <span
                                className="text-4xl font-black leading-none"
                                style={{ color: "var(--primary-color,#3b82f6)", fontFamily: "'Noto Sans SC', monospace" }}
                            >
                                {String(rows.length).padStart(2, '0')}
                            </span>
                            <span
                                className="mt-1 text-xs tracking-wide break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.55, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                项对比维度
                            </span>
                        </div>
                    </div>

                    {/* 表格卡片：半透明发光描边 */}
                    <div
                        className="mt-8 flex flex-1 flex-col overflow-hidden rounded-2xl border"
                        style={{
                            background: "linear-gradient(180deg, rgba(17,24,39,0.85), rgba(10,14,26,0.72))",
                            borderColor: "var(--stroke,#1f2937)",
                            boxShadow: '0 0 0 1px rgba(59,130,246,0.10), 0 18px 50px rgba(0,0,0,0.45)',
                        }}
                    >
                        {/* 表头：主题色渐变底 */}
                        <div
                            className="grid items-center"
                            style={{
                                gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                                background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                            }}
                        >
                            {headers.map((h, ci) => (
                                <div
                                    key={ci}
                                    className="px-6 py-4 break-words"
                                    style={{
                                        textAlign: ci === 0 ? 'left' : 'center',
                                        borderLeft: ci === 0 ? 'none' : '1px solid rgba(255,255,255,0.14)',
                                    }}
                                >
                                    <span
                                        className="text-base font-bold leading-relaxed break-words"
                                        style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {h}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* 数据行：斑马纹 */}
                        <div className="flex flex-1 flex-col">
                            {rows.map((row, ri) => {
                                const isEven = ri % 2 === 1
                                return (
                                    <div
                                        key={ri}
                                        className="grid flex-1 items-center"
                                        style={{
                                            gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                                            background: isEven ? 'rgba(59,130,246,0.06)' : 'transparent',
                                            borderTop: ri === 0 ? 'none' : '1px solid var(--stroke,#1f2937)',
                                        }}
                                    >
                                        {Array.from({ length: colCount }).map((_, ci) => {
                                            const cell = row[ci] ?? ''
                                            const isFirst = ci === 0
                                            return (
                                                <div
                                                    key={ci}
                                                    className="px-6 py-3 break-words"
                                                    style={{
                                                        textAlign: isFirst ? 'left' : 'center',
                                                        borderLeft: isFirst ? 'none' : '1px solid var(--stroke,#1f2937)',
                                                    }}
                                                >
                                                    <span
                                                        className="text-[15px] leading-relaxed break-words"
                                                        style={{
                                                            color: isFirst ? "var(--background-text,#e5e7eb)" : "var(--background-text,#e5e7eb)",
                                                            opacity: isFirst ? 1 : 0.82,
                                                            fontWeight: isFirst ? 600 : 400,
                                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {cell}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
