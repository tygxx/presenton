import React from 'react'
import * as z from "zod";

export const layoutId = 'green-cn-data-table'
export const layoutName = '数据表格'
export const layoutDescription = '新能源环保风数据表格：表头主题绿底、斑马纹行、叶片与自然曲线装饰。适合对比/明细数据呈现，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('清洁能源项目对比').meta({
        description: "表格主标题（中文，简短）",
    }),
    subtitle: z.string().min(2).max(40).default('各类可再生能源关键指标横向对比').meta({
        description: "副标题/一句话说明",
    }),
    headers: z.array(
        z.string().min(1).max(12).meta({ description: "表头列名（中文，简短）" })
    ).min(2).max(5).default(['能源类型', '装机容量', '年发电量', '减排量']).meta({
        description: "表格表头，2-5 列",
    }),
    rows: z.array(
        z.array(
            z.string().min(1).max(16).meta({ description: "单元格内容（中文，简短）" })
        ).min(2).max(5)
    ).min(2).max(6).default([
        ['光伏发电', '120 MW', '1.8 亿度', '14.6 万吨'],
        ['陆上风电', '200 MW', '4.2 亿度', '34.1 万吨'],
        ['海上风电', '350 MW', '9.5 亿度', '77.2 万吨'],
        ['生物质能', '60 MW', '0.9 亿度', '7.3 万吨'],
        ['储能配套', '80 MWh', '调峰削峰', '间接降耗'],
    ]).meta({
        description: "表格数据行，每行单元格数需与表头一致，2-6 行",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DataTable: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '清洁能源项目对比'
    const subtitle = slideData?.subtitle || '各类可再生能源关键指标横向对比'
    const headers = slideData?.headers && slideData.headers.length >= 2
        ? slideData.headers
        : ['能源类型', '装机容量', '年发电量', '减排量']
    const rows = slideData?.rows && slideData.rows.length >= 2
        ? slideData.rows
        : [
            ['光伏发电', '120 MW', '1.8 亿度', '14.6 万吨'],
            ['陆上风电', '200 MW', '4.2 亿度', '34.1 万吨'],
            ['海上风电', '350 MW', '9.5 亿度', '77.2 万吨'],
            ['生物质能', '60 MW', '0.9 亿度', '7.3 万吨'],
            ['储能配套', '80 MWh', '调峰削峰', '间接降耗'],
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
                    background: "var(--background-color,#f0fdf4)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：自然有机曲线 + 地球光晕 + 叶片纹样 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="greenTableGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="greenEarthGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.14" />
                                <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 顶部天空蓝有机曲线 */}
                        <path d="M0 0 H1280 V70 C980 150 760 30 520 90 C320 140 150 80 0 130 Z" fill="url(#greenTableGlow)" />
                        {/* 右上地球光晕 + 经纬线 */}
                        <circle cx="1180" cy="40" r="150" fill="url(#greenEarthGlow)" />
                        <circle cx="1180" cy="40" r="92" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.12" strokeWidth="1.5" />
                        <ellipse cx="1180" cy="40" rx="92" ry="36" fill="none" stroke="var(--secondary-color,#0891b2)" strokeOpacity="0.12" strokeWidth="1.2" />
                        <ellipse cx="1180" cy="40" rx="46" ry="92" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.10" strokeWidth="1.2" />
                        {/* 左下叶片 */}
                        <path
                            d="M40 700 C40 600 100 540 200 520 C150 590 130 650 120 700 Z"
                            fill="var(--primary-color,#16a34a)" fillOpacity="0.10"
                        />
                        <path
                            d="M120 700 C120 612 168 560 244 540 C206 600 188 652 184 700 Z"
                            fill="var(--secondary-color,#0891b2)" fillOpacity="0.08"
                        />
                        {/* 底部自然曲线 */}
                        <path d="M0 720 V680 C260 620 520 700 820 660 C1040 632 1180 680 1280 650 V720 Z" fill="var(--primary-color,#16a34a)" fillOpacity="0.06" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex items-start gap-4">
                        {/* 叶片标识 */}
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                            style={{
                                background: "var(--primary-color,#16a34a)",
                                boxShadow: "0 8px 20px rgba(22,163,74,0.22)",
                            }}
                            aria-hidden="true"
                        >
                            <svg viewBox="0 0 24 24" className="h-6 w-6">
                                <path
                                    d="M5 19 C5 11 11 5 19 5 C19 13 13 19 5 19 Z"
                                    fill="var(--primary-text,#ffffff)"
                                />
                                <path
                                    d="M7 17 C10 13 13 10 17 7"
                                    fill="none" stroke="var(--primary-color,#16a34a)" strokeWidth="1.4" strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <p
                                className="mt-2 text-base leading-relaxed break-words"
                                style={{ color: "var(--background-text,#14532d)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    <div
                        className="mt-5 h-1.5 w-20 flex-shrink-0 rounded-full"
                        style={{ background: "var(--secondary-color,#0891b2)" }}
                    />

                    {/* 表格区 */}
                    <div
                        className="mt-7 flex flex-1 flex-col overflow-hidden rounded-2xl border"
                        style={{
                            background: "var(--card-color,#ffffff)",
                            borderColor: "var(--stroke,#d1fae5)",
                            boxShadow: "0 12px 30px rgba(20,83,45,0.08)",
                        }}
                    >
                        {/* 表头 */}
                        <div
                            className="grid flex-shrink-0"
                            style={{
                                gridTemplateColumns: `1.3fr repeat(${Math.max(colCount - 1, 1)}, 1fr)`,
                                background: "var(--primary-color,#16a34a)",
                            }}
                        >
                            {headers.map((h, i) => (
                                <div
                                    key={i}
                                    className="flex items-center px-6 py-4 text-base font-bold leading-relaxed break-words"
                                    style={{
                                        color: "var(--primary-text,#ffffff)",
                                        justifyContent: i === 0 ? 'flex-start' : 'center',
                                        textAlign: i === 0 ? 'left' : 'center',
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {h}
                                </div>
                            ))}
                        </div>

                        {/* 数据行（斑马纹） */}
                        <div className="flex flex-1 flex-col">
                            {rows.map((row, ri) => (
                                <div
                                    key={ri}
                                    className="grid flex-1 items-center"
                                    style={{
                                        gridTemplateColumns: `1.3fr repeat(${Math.max(colCount - 1, 1)}, 1fr)`,
                                        background: ri % 2 === 1
                                            ? "var(--background-color,#f0fdf4)"
                                            : "var(--card-color,#ffffff)",
                                        borderTop: ri === 0 ? 'none' : "1px solid var(--stroke,#d1fae5)",
                                    }}
                                >
                                    {Array.from({ length: colCount }).map((_, ci) => {
                                        const cell = row?.[ci] ?? ''
                                        const isFirst = ci === 0
                                        return (
                                            <div
                                                key={ci}
                                                className="flex items-center px-6 py-3 leading-relaxed break-words"
                                                style={{
                                                    justifyContent: isFirst ? 'flex-start' : 'center',
                                                    textAlign: isFirst ? 'left' : 'center',
                                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                                }}
                                            >
                                                {isFirst ? (
                                                    <span className="flex items-center gap-2.5">
                                                        <span
                                                            className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                                                            style={{ background: "var(--secondary-color,#0891b2)" }}
                                                            aria-hidden="true"
                                                        />
                                                        <span
                                                            className="text-base font-semibold break-words"
                                                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                        >
                                                            {cell}
                                                        </span>
                                                    </span>
                                                ) : (
                                                    <span
                                                        className="text-base break-words"
                                                        style={{ color: "var(--background-text,#14532d)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                    >
                                                        {cell}
                                                    </span>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
