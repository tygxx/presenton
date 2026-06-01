import React from 'react'
import * as z from "zod";

export const layoutId = 'business-cn-data-table'
export const layoutName = '数据表格'
export const layoutDescription = '商务风数据表格页：表头主题深蓝色底、斑马纹行、橙色强调与几何网格装饰，用于对比或明细数据展示。纯 CSS，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('季度业务对比').meta({
        description: "表格页主标题（中文，简短有力）",
    }),
    subtitle: z.string().min(0).max(40).default('各事业部关键经营指标横向对比').meta({
        description: "标题下方的一句话说明（可留空）",
    }),
    headers: z.array(
        z.string().min(1).max(12).meta({ description: "表格列标题文字" })
    ).min(2).max(5).default(['事业部', '营收(亿元)', '同比增长', '毛利率']).meta({
        description: "表头列名称数组（2~5 列）",
    }),
    rows: z.array(
        z.array(
            z.string().min(0).max(16).meta({ description: "单元格文本" })
        ).min(2).max(5)
    ).min(2).max(6).default([
        ['企业服务', '42.6', '+23.5%', '38.2%'],
        ['智能制造', '31.8', '+18.1%', '29.6%'],
        ['数字金融', '27.4', '+15.7%', '44.3%'],
        ['零售消费', '19.2', '+9.4%', '21.8%'],
        ['海外业务', '12.5', '+31.2%', '26.5%'],
    ]).meta({
        description: "表格数据行数组（2~6 行，每行单元格数与表头列数对应）",
    }),
    footnote: z.string().min(0).max(36).default('数据来源：集团 2025 年度财务报告').meta({
        description: "表格下方的来源或备注（可留空）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DataTable: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '季度业务对比'
    const subtitle = slideData?.subtitle ?? '各事业部关键经营指标横向对比'
    const headers = (slideData?.headers && slideData.headers.length >= 2)
        ? slideData.headers
        : ['事业部', '营收(亿元)', '同比增长', '毛利率']
    const rows = (slideData?.rows && slideData.rows.length >= 2)
        ? slideData.rows
        : [
            ['企业服务', '42.6', '+23.5%', '38.2%'],
            ['智能制造', '31.8', '+18.1%', '29.6%'],
            ['数字金融', '27.4', '+15.7%', '44.3%'],
            ['零售消费', '19.2', '+9.4%', '21.8%'],
            ['海外业务', '12.5', '+31.2%', '26.5%'],
        ]
    const footnote = slideData?.footnote ?? '数据来源：集团 2025 年度财务报告'
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
                {/* 背景几何网格装饰层 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="bizTableGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                                <path d="M48 0 L0 0 0 48" fill="none" stroke="var(--primary-color,#1e3a8a)" strokeOpacity="0.04" strokeWidth="1" />
                            </pattern>
                            <linearGradient id="bizTableGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#1e3a8a)" stopOpacity="0.06" />
                                <stop offset="100%" stopColor="var(--primary-color,#1e3a8a)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#bizTableGrid)" />
                        <rect width="640" height="720" fill="url(#bizTableGlow)" />
                    </svg>
                </div>
                {/* 右上角橙色强调几何块 */}
                <div
                    className="absolute top-0 right-0 z-0"
                    style={{
                        width: '0', height: '0',
                        borderTop: '120px solid var(--secondary-color,#f97316)',
                        borderLeft: '120px solid transparent',
                        opacity: 0.16,
                    }}
                    aria-hidden="true"
                />

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex items-end justify-between gap-6">
                        <div className="flex flex-col">
                            <div className="mb-4 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            {subtitle ? (
                                <p
                                    className="mt-3 text-base leading-relaxed break-words"
                                    style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {subtitle}
                                </p>
                            ) : null}
                        </div>
                        <span
                            className="flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold leading-relaxed break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {`共 ${rows.length} 项 · ${colCount} 维度`}
                        </span>
                    </div>

                    {/* 表格区 */}
                    <div className="mt-8 flex flex-1 flex-col justify-center">
                        <div
                            className="overflow-hidden rounded-2xl border shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                        >
                            <table className="w-full border-collapse text-left">
                                {/* 表头：主题深蓝色底 */}
                                <thead>
                                    <tr style={{ background: "var(--primary-color,#1e3a8a)" }}>
                                        {headers.map((h, ci) => (
                                            <th
                                                key={ci}
                                                className="px-6 py-4 text-base font-bold leading-relaxed break-words"
                                                style={{
                                                    color: "var(--primary-text,#ffffff)",
                                                    textAlign: ci === 0 ? 'left' : 'right',
                                                    borderBottom: '3px solid var(--secondary-color,#f97316)',
                                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                                }}
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, ri) => (
                                        <tr
                                            key={ri}
                                            style={{
                                                // 斑马纹：偶数行浅蓝灰底
                                                background: ri % 2 === 1
                                                    ? "rgba(30,58,138,0.04)"
                                                    : "var(--card-color,#ffffff)",
                                            }}
                                        >
                                            {Array.from({ length: colCount }).map((_, ci) => {
                                                const cell = row[ci] ?? ''
                                                const isFirst = ci === 0
                                                return (
                                                    <td
                                                        key={ci}
                                                        className="px-6 py-3.5 text-base leading-relaxed break-words"
                                                        style={{
                                                            color: isFirst
                                                                ? "var(--background-text,#0f172a)"
                                                                : "var(--background-text,#334155)",
                                                            fontWeight: isFirst ? 700 : 500,
                                                            textAlign: isFirst ? 'left' : 'right',
                                                            borderTop: ri === 0 ? 'none' : '1px solid var(--stroke,#e2e8f0)',
                                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {isFirst ? (
                                                            <span className="flex items-center gap-2.5">
                                                                <span
                                                                    className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                                                    style={{ background: "var(--secondary-color,#f97316)" }}
                                                                    aria-hidden="true"
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

                        {/* 脚注 */}
                        {footnote ? (
                            <p
                                className="mt-5 text-sm leading-relaxed break-words"
                                style={{ color: "var(--background-text,#94a3b8)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {footnote}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
