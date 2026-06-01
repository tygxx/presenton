import React from 'react'
import * as z from "zod";

export const layoutId = 'manufacturing-cn-data-table'
export const layoutName = '数据表格'
export const layoutDescription = '智能制造风数据表格：工业深灰底 + 精密网格 + 齿轮装饰，表头主题色底、斑马纹行，适合产线指标对比/明细。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('产线关键指标对比').meta({
        description: "表格主标题（中文，简短）",
    }),
    subtitle: z.string().min(2).max(40).default('各车间产线核心运行指标月度明细').meta({
        description: "副标题，一句话说明表格内容",
    }),
    headers: z.array(z.string().min(1).max(12).meta({ description: "表头列名" }))
        .min(2).max(5)
        .default(['产线', '产能 (件/日)', '良品率', 'OEE', '能耗指数']).meta({
            description: "表格表头，2-5 列",
        }),
    rows: z.array(
        z.array(z.string().min(1).max(16).meta({ description: "单元格内容" }))
    )
        .min(2).max(6)
        .default([
            ['一号冲压线', '12,800', '99.2%', '88.6%', '0.92'],
            ['二号焊装线', '9,400', '98.7%', '85.3%', '1.04'],
            ['三号装配线', '15,200', '99.5%', '91.2%', '0.87'],
            ['四号涂装线', '7,600', '97.9%', '82.4%', '1.18'],
            ['五号总装线', '11,300', '99.1%', '89.7%', '0.95'],
        ]).meta({
            description: "表格数据行，每行是一组单元格字符串，2-6 行",
        }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DataTable: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '产线关键指标对比'
    const subtitle = slideData?.subtitle || '各车间产线核心运行指标月度明细'
    const headers = (slideData?.headers && slideData.headers.length >= 2)
        ? slideData.headers
        : ['产线', '产能 (件/日)', '良品率', 'OEE', '能耗指数']
    const rows = (slideData?.rows && slideData.rows.length >= 2)
        ? slideData.rows
        : [
            ['一号冲压线', '12,800', '99.2%', '88.6%', '0.92'],
            ['二号焊装线', '9,400', '98.7%', '85.3%', '1.04'],
            ['三号装配线', '15,200', '99.5%', '91.2%', '0.87'],
            ['四号涂装线', '7,600', '97.9%', '82.4%', '1.18'],
            ['五号总装线', '11,300', '99.1%', '89.7%', '0.95'],
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
                    background: "var(--background-color,#1f2937)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：精密网格 + 齿轮 + 金属质感线条 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            {/* 精密网格纹样 */}
                            <pattern id="mfgGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--stroke,#374151)" strokeWidth="1" strokeOpacity="0.5" />
                            </pattern>
                            <linearGradient id="mfgTopGlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="mfgCornerGlow" x1="1" y1="1" x2="0" y2="0">
                                <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#mfgGrid)" />
                        <rect width="1280" height="260" fill="url(#mfgTopGlow)" />
                        <rect x="900" y="420" width="380" height="300" fill="url(#mfgCornerGlow)" />
                        {/* 硬朗金属斜线 */}
                        <line x1="0" y1="120" x2="1280" y2="120" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.12" strokeWidth="1.5" />
                        <line x1="-60" y1="700" x2="360" y2="320" stroke="var(--stroke,#374151)" strokeOpacity="0.7" strokeWidth="1.5" />
                    </svg>
                    {/* 左上齿轮母题 */}
                    <svg viewBox="0 0 100 100" className="absolute" style={{ top: '-26px', left: '-26px', width: '150px', height: '150px', opacity: 0.16 }} aria-hidden="true">
                        <path
                            d="M50 8 l5 0 2 9 8 3 7-6 4 4 -6 7 3 8 9 2 0 5 -9 2 -3 8 6 7 -4 4 -7-6 -8 3 -2 9 -5 0 -2-9 -8-3 -7 6 -4-4 6-7 -3-8 -9-2 0-5 9-2 3-8 -6-7 4-4 7 6 8-3z"
                            fill="none" stroke="var(--primary-color,#3b82f6)" strokeWidth="2"
                        />
                        <circle cx="50" cy="50" r="14" fill="none" stroke="var(--primary-color,#3b82f6)" strokeWidth="2" />
                    </svg>
                    {/* 右下齿轮母题 */}
                    <svg viewBox="0 0 100 100" className="absolute" style={{ bottom: '-34px', right: '40px', width: '120px', height: '120px', opacity: 0.14 }} aria-hidden="true">
                        <path
                            d="M50 8 l5 0 2 9 8 3 7-6 4 4 -6 7 3 8 9 2 0 5 -9 2 -3 8 6 7 -4 4 -7-6 -8 3 -2 9 -5 0 -2-9 -8-3 -7 6 -4-4 6-7 -3-8 -9-2 0-5 9-2 3-8 -6-7 4-4 7 6 8-3z"
                            fill="none" stroke="var(--secondary-color,#f97316)" strokeWidth="2"
                        />
                        <circle cx="50" cy="50" r="14" fill="none" stroke="var(--secondary-color,#f97316)" strokeWidth="2" />
                    </svg>
                </div>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex items-end justify-between gap-6">
                        <div className="flex flex-col">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="h-7 w-1.5 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                                <span
                                    className="text-xs font-bold uppercase break-words"
                                    style={{ color: "var(--secondary-color,#f97316)", letterSpacing: '0.18em', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    SMART MANUFACTURING
                                </span>
                            </div>
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
                        {/* 产线母题角标 */}
                        <div className="flex flex-shrink-0 items-center gap-1.5 pb-1" aria-hidden="true">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <span
                                    key={i}
                                    className="block rounded-sm"
                                    style={{
                                        width: '6px',
                                        height: `${14 + i * 8}px`,
                                        background: i % 2 === 0 ? "var(--primary-color,#3b82f6)" : "var(--secondary-color,#f97316)",
                                        opacity: 0.85,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 表格区 */}
                    <div className="mt-8 flex flex-1 flex-col justify-center">
                        <div
                            className="overflow-hidden rounded-xl border"
                            style={{
                                borderColor: "var(--stroke,#374151)",
                                background: "var(--card-color,#111827)",
                                boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                            }}
                        >
                            <table className="w-full table-fixed border-collapse">
                                {/* 表头：主题色底 */}
                                <thead>
                                    <tr style={{ background: "var(--primary-color,#3b82f6)" }}>
                                        {headers.map((h, i) => (
                                            <th
                                                key={i}
                                                className="px-5 py-4 text-left align-middle text-sm font-bold leading-relaxed break-words"
                                                style={{
                                                    color: "var(--primary-text,#ffffff)",
                                                    borderRight: i < colCount - 1 ? '1px solid rgba(255,255,255,0.18)' : 'none',
                                                    overflowWrap: 'break-word',
                                                    wordBreak: 'break-word',
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
                                                // 斑马纹：奇偶行不同底色
                                                background: ri % 2 === 0
                                                    ? "var(--card-color,#111827)"
                                                    : "var(--background-color,#1f2937)",
                                                borderTop: '1px solid var(--stroke,#374151)',
                                            }}
                                        >
                                            {Array.from({ length: colCount }).map((_, ci) => {
                                                const cell = row[ci] ?? ''
                                                const isFirst = ci === 0
                                                return (
                                                    <td
                                                        key={ci}
                                                        className="px-5 py-3.5 align-middle text-sm leading-relaxed break-words"
                                                        style={{
                                                            color: isFirst
                                                                ? "var(--background-text,#e5e7eb)"
                                                                : "var(--background-text,#e5e7eb)",
                                                            fontWeight: isFirst ? 700 : 400,
                                                            opacity: isFirst ? 1 : 0.88,
                                                            borderRight: ci < colCount - 1 ? '1px solid var(--stroke,#374151)' : 'none',
                                                            overflowWrap: 'break-word',
                                                            wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {/* 首列加一道蓝色精密标识线 */}
                                                        {isFirst ? (
                                                            <span className="flex items-center gap-2.5">
                                                                <span
                                                                    className="block h-3.5 w-1 flex-shrink-0 rounded-full"
                                                                    style={{ background: "var(--secondary-color,#f97316)" }}
                                                                />
                                                                <span className="break-words" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
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

                        {/* 底部注脚 */}
                        <div className="mt-5 flex items-center gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--primary-color,#3b82f6)" }} />
                            <span
                                className="text-xs leading-relaxed break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.55, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                数据来源：智能制造执行系统 MES · 实时采集
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
