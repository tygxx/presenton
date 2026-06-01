"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'culture-cn-line-chart'
export const layoutName = '趋势分析'
export const layoutDescription = '国潮文创风趋势页：宣纸米黄底配朱砂红、墨黑与描金边，水墨笔触与印章红块点缀，左侧标题说明、右侧折线图卡片，底部可附注解。用于呈现随时间变化的趋势。'

const schema = z.object({
    title: z.string().min(2).max(20).default('国潮热度持续攀升').meta({
        description: "趋势页主标题（中文，简短）",
    }),
    description: z.string().min(4).max(50).default('近年国潮文创消费稳步上行，传统美学焕发新生机。').meta({
        description: "对趋势的简要说明",
    }),
    chartData: z.object({
        type: z.literal('line').default('line'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "数据点名称，如年份/季度" }),
            value: z.number().meta({ description: "数据点数值" }),
        })).min(4).max(8).default([
            { name: '2019', value: 38 },
            { name: '2020', value: 52 },
            { name: '2021', value: 67 },
            { name: '2022', value: 81 },
            { name: '2023', value: 96 },
            { name: '2024', value: 118 },
        ]).meta({ description: "折线趋势数据点（4-8 个）" }),
    }).default({
        type: 'line',
        data: [
            { name: '2019', value: 38 },
            { name: '2020', value: 52 },
            { name: '2021', value: 67 },
            { name: '2022', value: 81 },
            { name: '2023', value: 96 },
            { name: '2024', value: 118 },
        ],
    }).meta({ description: "折线图数据" }),
    annotation: z.string().max(30).default('数据来源：国潮文创年度消费白皮书').meta({
        description: "图表底部注解（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const LineChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '国潮热度持续攀升'
    const description = slideData?.description || '近年国潮文创消费稳步上行，传统美学焕发新生机。'
    const chartType = slideData?.chartData?.type || 'line'
    const chartData = slideData?.chartData?.data || []
    const annotation = slideData?.annotation || '数据来源：国潮文创年度消费白皮书'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f5ecd9)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：水墨笔触 + 传统纹样 + 描金边 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="cultureLineInk" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.06" />
                                <stop offset="100%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="cultureLineSeal" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--primary-color,#c0392b)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#c0392b)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 左上水墨晕染 */}
                        <ellipse cx="120" cy="110" rx="320" ry="200" fill="url(#cultureLineInk)" />
                        {/* 右下朱砂晕染 */}
                        <circle cx="1180" cy="640" r="260" fill="url(#cultureLineSeal)" />
                        {/* 传统回纹（顶部细描金条） */}
                        <path
                            d="M0 26 H1280"
                            stroke="var(--stroke,#ddd0b4)"
                            strokeWidth="1"
                            strokeOpacity="0.9"
                        />
                        {/* 远山水墨笔触 */}
                        <path
                            d="M-20 560 Q 180 470 360 540 T 760 520 Q 980 560 1300 470"
                            fill="none"
                            stroke="var(--secondary-color,#1a1a1a)"
                            strokeOpacity="0.06"
                            strokeWidth="40"
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* 描金边框 */}
                    <div
                        className="absolute inset-5 rounded-sm"
                        style={{ border: "1px solid var(--stroke,#ddd0b4)" }}
                    />
                    <div
                        className="absolute inset-[26px] rounded-sm"
                        style={{ border: "1px solid var(--primary-color,#c0392b)", opacity: 0.16 }}
                    />
                </div>

                {/* 右上角印章红块 + 竖排点缀 */}
                <div className="absolute right-12 top-11 z-10 flex items-start gap-3" aria-hidden="true">
                    <div
                        className="flex flex-col items-center justify-center gap-1 rounded-[3px] px-2.5 py-3 text-sm font-bold leading-[1.6]"
                        style={{
                            background: "var(--primary-color,#c0392b)",
                            color: "var(--primary-text,#ffffff)",
                            writingMode: 'vertical-rl',
                            letterSpacing: '0.18em',
                        }}
                    >
                        国潮
                    </div>
                </div>

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full items-stretch gap-10 px-20 py-16">
                    {/* 左侧：标题 + 说明 */}
                    <div className="flex w-[34%] flex-shrink-0 flex-col justify-center">
                        {/* 朱砂红短章 + 描金线 */}
                        <div className="mb-6 flex items-center gap-3">
                            <span
                                className="inline-block h-7 w-7 rounded-[3px]"
                                style={{ background: "var(--primary-color,#c0392b)" }}
                            />
                            <span
                                className="inline-block h-[2px] w-16 rounded-full"
                                style={{ background: "var(--stroke,#ddd0b4)" }}
                            />
                        </div>

                        <h1
                            className="text-4xl font-black leading-[1.3] break-words"
                            style={{
                                color: "var(--background-text,#2b2b2b)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        <div
                            className="my-6 h-1 w-20 rounded-full"
                            style={{ background: "var(--primary-color,#c0392b)" }}
                        />

                        <p
                            className="text-base leading-loose break-words"
                            style={{
                                color: "var(--background-text,#2b2b2b)",
                                opacity: 0.82,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {description}
                        </p>
                    </div>

                    {/* 右侧：折线图卡片 */}
                    <div className="flex flex-1 flex-col">
                        <div
                            className="flex flex-1 flex-col rounded-2xl border p-7 shadow-sm"
                            style={{
                                background: "var(--card-color,#fbf5e9)",
                                borderColor: "var(--stroke,#ddd0b4)",
                            }}
                        >
                            <div className="min-h-0 w-full flex-1">
                                <GeneralChart type={chartType} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>

                        {/* 底部注解 */}
                        {annotation && (
                            <div className="mt-4 flex items-center gap-2.5">
                                <span
                                    className="inline-block h-3.5 w-1 flex-shrink-0 rounded-full"
                                    style={{ background: "var(--primary-color,#c0392b)" }}
                                />
                                <span
                                    className="text-sm leading-relaxed break-words"
                                    style={{
                                        color: "var(--background-text,#2b2b2b)",
                                        opacity: 0.7,
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {annotation}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LineChart
