import React from 'react'
import * as z from "zod";

export const layoutId = 'gov-cn-data-table'
export const layoutName = '数据表格'
export const layoutDescription = '党政政务风数据表格页：居中对称标题 + 烫金细线装饰，表头中国红主题色底、斑马纹行，适用于指标对比与明细数据呈现。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('重点工作指标完成情况').meta({
        description: "表格主标题（中文，简短庄重，如『重点工作指标完成情况』）",
    }),
    subtitle: z.string().min(2).max(34).default('截至本季度末各项任务进展与目标对照').meta({
        description: "副标题，一句话补充说明数据口径或时间范围",
    }),
    headers: z.array(
        z.string().min(1).max(12).meta({ description: "表头列名，如『指标名称』『目标值』" })
    ).min(2).max(5).default(['指标名称', '年度目标', '当前完成', '完成率', '进度评价']).meta({
        description: "表格表头列（2至5列）",
    }),
    rows: z.array(
        z.array(
            z.string().min(1).max(16).meta({ description: "单元格内容（中文，简短）" })
        ).min(2).max(5)
    ).min(2).max(6).default([
        ['民生实事项目', '120 项', '108 项', '90.0%', '良好'],
        ['财政收入', '85 亿元', '79 亿元', '92.9%', '优秀'],
        ['重点项目投资', '46 个', '41 个', '89.1%', '良好'],
        ['城镇新增就业', '3.2 万人', '3.0 万人', '93.8%', '优秀'],
        ['生态治理面积', '15 万亩', '13 万亩', '86.7%', '稳步'],
    ]).meta({
        description: "表格数据行（2至6行，每行单元格数与表头一致）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DataTable: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '重点工作指标完成情况'
    const subtitle = slideData?.subtitle || '截至本季度末各项任务进展与目标对照'
    const headers = slideData?.headers || ['指标名称', '年度目标', '当前完成', '完成率', '进度评价']
    const rows = slideData?.rows || [
        ['民生实事项目', '120 项', '108 项', '90.0%', '良好'],
        ['财政收入', '85 亿元', '79 亿元', '92.9%', '优秀'],
        ['重点项目投资', '46 个', '41 个', '89.1%', '良好'],
        ['城镇新增就业', '3.2 万人', '3.0 万人', '93.8%', '优秀'],
        ['生态治理面积', '15 万亩', '13 万亩', '86.7%', '稳步'],
    ]

    const colCount = Math.max(headers.length, 1)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#faf7f2)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景对称烫金纹样装饰层 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="govTableGold" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* 左右对称的同心半圆纹样 */}
                    {[0, 1, 2].map((i) => (
                        <circle key={`l-${i}`} cx="0" cy="360" r={120 + i * 90} fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity={0.07} strokeWidth="1.5" />
                    ))}
                    {[0, 1, 2].map((i) => (
                        <circle key={`r-${i}`} cx="1280" cy="360" r={120 + i * 90} fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity={0.07} strokeWidth="1.5" />
                    ))}
                </svg>

                {/* 顶部中国红窄边带 */}
                <div className="absolute top-0 left-0 h-1.5 w-full" style={{ background: "var(--primary-color,#c1121f)" }} />

                <div className="relative z-10 flex h-full flex-col px-16 pt-12 pb-10">
                    {/* 居中对称标题区 */}
                    <div className="flex flex-col items-center text-center">
                        {/* 五角星 + 烫金细线对称装饰 */}
                        <div className="flex items-center justify-center gap-4">
                            <span className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, var(--secondary-color,#b8860b))" }} />
                            <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" aria-hidden="true">
                                <path
                                    d="M12 2l2.9 6.26L21.5 9l-5 4.6 1.4 6.9L12 17.1 6.1 20.5l1.4-6.9-5-4.6 6.6-.74z"
                                    fill="var(--primary-color,#c1121f)"
                                    stroke="var(--secondary-color,#b8860b)"
                                    strokeWidth="0.8"
                                />
                            </svg>
                            <span className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, var(--secondary-color,#b8860b))" }} />
                        </div>

                        <h1
                            className="mt-4 text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word', letterSpacing: '0.04em' }}
                        >
                            {title}
                        </h1>

                        <p
                            className="mt-3 max-w-[42rem] text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle}
                        </p>

                        {/* 标题下方烫金细线 */}
                        <div className="mt-5 h-0.5 w-32 rounded-full" style={{ background: "linear-gradient(to right, transparent, var(--secondary-color,#b8860b), transparent)" }} />
                    </div>

                    {/* 表格区 */}
                    <div className="mt-8 flex min-h-0 flex-1 items-start justify-center">
                        <div
                            className="w-full overflow-hidden rounded-lg border"
                            style={{ borderColor: "var(--stroke,#e8dcc8)", background: "var(--card-color,#ffffff)" }}
                        >
                            <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                                <thead>
                                    <tr style={{ background: "var(--primary-color,#c1121f)" }}>
                                        {headers.map((h, i) => (
                                            <th
                                                key={i}
                                                className="px-4 py-3.5 text-center text-base font-bold leading-relaxed break-words"
                                                style={{
                                                    color: "var(--primary-text,#ffffff)",
                                                    overflowWrap: 'break-word',
                                                    wordBreak: 'break-word',
                                                    borderRight: i < colCount - 1 ? '1px solid rgba(255,255,255,0.18)' : 'none',
                                                    borderBottom: '2px solid var(--secondary-color,#b8860b)',
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
                                                background: ri % 2 === 0
                                                    ? "var(--card-color,#ffffff)"
                                                    : "var(--background-color,#faf7f2)",
                                            }}
                                        >
                                            {Array.from({ length: colCount }).map((_, ci) => {
                                                const cell = row?.[ci] ?? ''
                                                const isFirstCol = ci === 0
                                                return (
                                                    <td
                                                        key={ci}
                                                        className="px-4 py-3 text-center text-sm leading-relaxed break-words"
                                                        style={{
                                                            color: "var(--background-text,#1a1a1a)",
                                                            fontWeight: isFirstCol ? 700 : 400,
                                                            opacity: isFirstCol ? 1 : 0.88,
                                                            overflowWrap: 'break-word',
                                                            wordBreak: 'break-word',
                                                            borderTop: '1px solid var(--stroke,#e8dcc8)',
                                                            borderRight: ci < colCount - 1 ? '1px solid var(--stroke,#e8dcc8)' : 'none',
                                                        }}
                                                    >
                                                        {cell}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 底部对称烫金落款细线 + 五角星 */}
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <span className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, var(--secondary-color,#b8860b))" }} />
                        <svg viewBox="0 0 24 24" className="h-3 w-3 flex-shrink-0" aria-hidden="true">
                            <path
                                d="M12 2l2.9 6.26L21.5 9l-5 4.6 1.4 6.9L12 17.1 6.1 20.5l1.4-6.9-5-4.6 6.6-.74z"
                                fill="var(--secondary-color,#b8860b)"
                            />
                        </svg>
                        <span className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, var(--secondary-color,#b8860b))" }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
