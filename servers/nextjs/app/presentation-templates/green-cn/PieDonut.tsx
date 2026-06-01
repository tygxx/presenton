"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'green-cn-pie-donut'
export const layoutName = '占比分析'
export const layoutDescription = '新能源环保风占比分析页：左侧饼/环图，右侧自绘图例列表（色块+名称+占比）。清新白绿配色，叶片与自然曲线装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('清洁能源构成').meta({
        description: "占比分析页主标题（中文，简短）",
    }),
    description: z.string().min(4).max(50).default('2025年绿色电力来源分布，可再生能源占比稳步提升。').meta({
        description: "对占比数据的简要说明（可选）",
    }),
    chartData: z.object({
        type: z.literal('pie').default('pie'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "占比项名称，如『太阳能』" }),
            value: z.number().meta({ description: "占比数值（百分比或绝对值）" }),
        })).min(3).max(6).meta({ description: "占比数据项" }),
    }).default({
        type: 'pie',
        data: [
            { name: '太阳能', value: 38 },
            { name: '风能', value: 27 },
            { name: '水力发电', value: 18 },
            { name: '生物质能', value: 11 },
            { name: '地热能', value: 6 },
        ],
    }).meta({ description: "饼/环图数据" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

// 与图例一致的清新绿色系调色板（图例自绘色块用）
const LEGEND_COLORS = [
    '#16a34a',
    '#0891b2',
    '#65a30d',
    '#0d9488',
    '#4ade80',
    '#0ea5e9',
]

const PieDonut: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '清洁能源构成'
    const description = slideData?.description || '2025年绿色电力来源分布，可再生能源占比稳步提升。'
    const chartData = slideData?.chartData?.data || []
    const total = chartData.reduce((sum, d) => sum + (Number(d?.value) || 0), 0) || 1

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
                {/* 背景装饰层：自然有机曲线 + 叶片 + 光晕（纯 SVG，离线可渲染） */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="greenPieSky" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="greenPieGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.14" />
                            <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 顶部天空蓝渐变带 */}
                    <rect width="1280" height="720" fill="url(#greenPieSky)" />
                    {/* 左下自然有机曲线（山丘/地平线） */}
                    <path
                        d="M0,640 C220,560 420,690 680,610 C900,545 1080,650 1280,580 L1280,720 L0,720 Z"
                        fill="var(--primary-color,#16a34a)"
                        fillOpacity="0.06"
                    />
                    <path
                        d="M0,700 C260,640 480,720 760,665 C980,625 1120,695 1280,650 L1280,720 L0,720 Z"
                        fill="var(--secondary-color,#0891b2)"
                        fillOpacity="0.05"
                    />
                    {/* 右上光晕 */}
                    <circle cx="1150" cy="90" r="200" fill="url(#greenPieGlow)" />
                    {/* 叶片母题（右上角） */}
                    <g transform="translate(1110 70) rotate(28)" opacity="0.16">
                        <path
                            d="M0,0 C46,-66 132,-66 178,0 C132,66 46,66 0,0 Z"
                            fill="var(--primary-color,#16a34a)"
                        />
                        <path
                            d="M8,0 C70,-6 130,-6 174,0"
                            fill="none"
                            stroke="var(--background-color,#f0fdf4)"
                            strokeWidth="3"
                            strokeOpacity="0.7"
                        />
                    </g>
                    {/* 叶片母题（左下角，小） */}
                    <g transform="translate(70 600) rotate(-18)" opacity="0.14">
                        <path
                            d="M0,0 C28,-40 80,-40 108,0 C80,40 28,40 0,0 Z"
                            fill="var(--secondary-color,#0891b2)"
                        />
                    </g>
                </svg>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部：场景标签 + 标题 + 说明 */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <span
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                                style={{ background: "var(--primary-color,#16a34a)" }}
                                aria-hidden="true"
                            >
                                {/* 叶片小图标 */}
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                                    <path
                                        d="M5 19 C5 11 11 5 19 5 C19 13 13 19 5 19 Z"
                                        fill="var(--primary-text,#ffffff)"
                                        fillOpacity="0.95"
                                    />
                                    <path d="M7 17 C10 13 13 10 17 7" stroke="var(--primary-color,#16a34a)" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </span>
                            <span
                                className="inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium break-words"
                                style={{
                                    color: "var(--secondary-color,#0891b2)",
                                    background: "var(--card-color,#ffffff)",
                                    border: "1px solid var(--stroke,#d1fae5)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                绿色能源 · 占比分析
                            </span>
                        </div>

                        <h1
                            className="mt-5 text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <p
                            className="mt-3 max-w-[44rem] text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#14532d)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>
                    </div>

                    {/* 主体：左侧环图 + 右侧自绘图例 */}
                    <div className="mt-8 flex min-h-0 flex-1 items-center gap-12">
                        {/* 左侧：环图卡片 */}
                        <div
                            className="flex h-full w-[46%] flex-shrink-0 flex-col rounded-3xl border p-6 shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#d1fae5)" }}
                        >
                            <div className="min-h-0 w-full flex-1">
                                <GeneralChart type={'pie'} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>

                        {/* 右侧：自绘图例列表（色块 + 名称 + 占比） */}
                        <div className="flex min-h-0 flex-1 flex-col justify-center gap-3">
                            {chartData.map((item, i) => {
                                const value = Number(item?.value) || 0
                                const pct = Math.round((value / total) * 1000) / 10
                                const color = LEGEND_COLORS[i % LEGEND_COLORS.length]
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 rounded-2xl border px-5 py-3"
                                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#d1fae5)" }}
                                    >
                                        <span
                                            className="h-4 w-4 flex-shrink-0 rounded-full"
                                            style={{ background: color }}
                                            aria-hidden="true"
                                        />
                                        <span
                                            className="flex-1 text-base font-semibold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.name}
                                        </span>
                                        <span
                                            className="flex-shrink-0 text-xl font-black leading-none"
                                            style={{ color }}
                                        >
                                            {pct}%
                                        </span>
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

export default PieDonut
