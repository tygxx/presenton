"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'green-cn-line-chart'
export const layoutName = '趋势分析'
export const layoutDescription = '新能源环保趋势分析页：左侧标题/说明/注解，右侧折线趋势图。清新白绿配色，叶片与自然曲线装饰母题。仅在有可量化时间序列数据时使用。'

const schema = z.object({
    title: z.string().min(2).max(20).default('清洁能源装机趋势').meta({
        description: "趋势分析主标题（中文，简短）",
    }),
    description: z.string().min(4).max(50).default('近年可再生能源装机容量稳步攀升，绿色转型加速推进。').meta({
        description: "对趋势的一句话说明",
    }),
    chartData: z.object({
        type: z.literal('line').default('line'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "数据点名称，如年份/季度" }),
            value: z.number().meta({ description: "数据点数值，如装机容量" }),
        })).min(4).max(8),
    }).default({
        type: 'line',
        data: [
            { name: '2019', value: 76 },
            { name: '2020', value: 95 },
            { name: '2021', value: 121 },
            { name: '2022', value: 158 },
            { name: '2023', value: 204 },
            { name: '2024', value: 268 },
        ],
    }).meta({ description: "折线趋势图数据（时间序列）" }),
    annotation: z.string().min(2).max(30).default('2024年同比增长逾三成，创历史新高').meta({
        description: "对趋势关键节点的注解（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const LineChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '清洁能源装机趋势'
    const description = slideData?.description || '近年可再生能源装机容量稳步攀升，绿色转型加速推进。'
    const chartData = slideData?.chartData?.data || []
    const annotation = slideData?.annotation || '2024年同比增长逾三成，创历史新高'

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
                {/* 背景装饰层：天空蓝光晕 + 自然有机形状 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="greenLineSky" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.08" />
                                <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="greenLineGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#16a34a" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#greenLineSky)" />
                        {/* 左下角自然有机起伏曲线（山丘/草地母题） */}
                        <path d="M0 600 C 200 540, 360 660, 560 600 C 760 540, 900 640, 1280 580 L 1280 720 L 0 720 Z" fill="#16a34a" fillOpacity="0.05" />
                        <path d="M0 660 C 240 600, 420 700, 640 650 C 860 600, 1040 680, 1280 640 L 1280 720 L 0 720 Z" fill="#0891b2" fillOpacity="0.05" />
                        {/* 右上角地球光晕 */}
                        <circle cx="1180" cy="-40" r="220" fill="url(#greenLineGlow)" />
                    </svg>
                </div>

                {/* 右上角叶片角标装饰（叶片母题） */}
                <div className="absolute top-7 right-9 z-10" aria-hidden="true">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                        <path
                            d="M48 8 C 22 10, 8 28, 8 48 C 30 48, 48 32, 48 8 Z"
                            fill="var(--primary-color,#16a34a)"
                            fillOpacity="0.16"
                        />
                        <path
                            d="M16 40 C 26 30, 36 20, 44 14"
                            stroke="var(--primary-color,#16a34a)"
                            strokeOpacity="0.5"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：标题 + 说明 + 注解 */}
                    <div className="flex w-[36%] flex-shrink-0 flex-col justify-center">
                        {/* 叶片小徽标 */}
                        <div className="mb-5 flex items-center gap-3">
                            <span
                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                                style={{ background: "var(--primary-color,#16a34a)" }}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path
                                        d="M20 4 C 9 5, 4 12, 4 20 C 13 20, 20 13, 20 4 Z"
                                        fill="var(--primary-text,#ffffff)"
                                    />
                                    <path
                                        d="M8 17 C 12 13, 16 9, 18 7"
                                        stroke="var(--primary-color,#16a34a)"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                            <span
                                className="text-sm font-medium break-words"
                                style={{ color: "var(--secondary-color,#0891b2)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                绿色发展 · 趋势洞察
                            </span>
                        </div>

                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div className="my-6 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#0891b2)" }} />

                        <p
                            className="text-base leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#14532d)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        {/* 注解卡片 */}
                        {annotation && (
                            <div
                                className="mt-8 flex items-start gap-3 rounded-2xl border p-4"
                                style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#d1fae5)" }}
                            >
                                <span
                                    className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
                                    style={{ background: "var(--stroke,#d1fae5)", color: "var(--primary-color,#16a34a)" }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M4 18 L 10 11 L 14 14 L 20 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M20 6 L 20 11 M 20 6 L 15 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <p
                                    className="text-sm font-medium leading-[1.6] break-words"
                                    style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {annotation}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 右侧：折线趋势图卡片 */}
                    <div
                        className="flex flex-1 flex-col rounded-2xl border p-6 shadow-sm"
                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#d1fae5)" }}
                    >
                        <div
                            className="mb-4 flex items-center gap-2 text-sm font-medium break-words"
                            style={{ color: "var(--secondary-color,#0891b2)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ background: "var(--primary-color,#16a34a)" }} />
                            历年趋势变化
                        </div>
                        <div className="min-h-0 w-full flex-1">
                            <GeneralChart type={'line'} data={chartData} showLegend={false} showTooltip={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LineChart
