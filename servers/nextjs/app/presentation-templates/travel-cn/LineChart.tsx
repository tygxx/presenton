"use client";

import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'travel-cn-line-chart'
export const layoutName = '趋势分析'
export const layoutDescription = '文旅风趋势页：左侧标题/说明/趋势注解，右侧折线趋势卡片。明媚海蓝配暖阳橙，指南针与路线点缀装饰，离线可渲染。仅在有可量化时序数据时使用。'

const schema = z.object({
    title: z.string().min(2).max(20).default('客流稳步攀升').meta({
        description: "趋势页主标题（中文，简短）",
    }),
    description: z.string().min(4).max(50).default('近半年到访游客量持续上行，旺季同比增长显著。').meta({
        description: "对趋势的简要说明（一句话）",
    }),
    chartData: z.object({
        type: z.literal('line').default('line'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "时间点名称，如月份/季度" }),
            value: z.number().meta({ description: "该时间点的数值，如游客量（万人次）" }),
        })).min(4).max(8),
    }).default({
        type: 'line',
        data: [
            { name: '1月', value: 18 },
            { name: '2月', value: 26 },
            { name: '3月', value: 34 },
            { name: '4月', value: 45 },
            { name: '5月', value: 58 },
            { name: '6月', value: 72 },
        ],
    }).meta({ description: "折线趋势数据" }),
    annotation: z.string().min(2).max(30).default('5月起进入旺季，单月接待量创历史新高。').meta({
        description: "趋势注解，可选，对关键拐点或峰值的说明",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const LineChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '客流稳步攀升'
    const description = slideData?.description || '近半年到访游客量持续上行，旺季同比增长显著。'
    const chartData = slideData?.chartData?.data || []
    const annotation = slideData?.annotation || '5月起进入旺季，单月接待量创历史新高。'

    const peakValue = chartData.length
        ? Math.max(...chartData.map((d) => (typeof d.value === 'number' ? d.value : 0)))
        : 0

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f0f9ff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：海天渐晕 + 远山轮廓 + 路线点缀 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="travelSkyGlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="travelSunGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* 顶部天空渐晕 */}
                        <rect width="1280" height="320" fill="url(#travelSkyGlow)" />
                        {/* 右上暖阳光晕 */}
                        <circle cx="1130" cy="120" r="220" fill="url(#travelSunGlow)" />
                        {/* 远山轮廓 */}
                        <path d="M0 600 L180 470 L360 560 L560 430 L760 540 L980 450 L1280 560 L1280 720 L0 720 Z" fill="var(--primary-color,#0891b2)" fillOpacity="0.06" />
                        <path d="M0 660 L240 540 L470 620 L720 520 L960 600 L1280 520 L1280 720 L0 720 Z" fill="var(--primary-color,#0891b2)" fillOpacity="0.05" />
                        {/* 虚线路线 + 路线点 */}
                        <path d="M90 250 C 320 130, 560 330, 820 180 S 1180 120, 1200 230" fill="none" stroke="var(--secondary-color,#f59e0b)" strokeOpacity="0.28" strokeWidth="2.5" strokeDasharray="3 12" strokeLinecap="round" />
                        <circle cx="90" cy="250" r="6" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.45" />
                        <circle cx="1200" cy="230" r="6" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.45" />
                    </svg>
                </div>

                {/* 右上角指南针角标 */}
                <div className="absolute top-7 right-9 z-10" aria-hidden="true">
                    <svg viewBox="0 0 64 64" className="h-12 w-12">
                        <circle cx="32" cy="32" r="29" fill="none" stroke="var(--primary-color,#0891b2)" strokeOpacity="0.35" strokeWidth="2" />
                        <circle cx="32" cy="32" r="22" fill="none" stroke="var(--primary-color,#0891b2)" strokeOpacity="0.18" strokeWidth="1.5" />
                        <polygon points="32,12 38,32 32,30 26,32" fill="var(--secondary-color,#f59e0b)" />
                        <polygon points="32,52 26,32 32,34 38,32" fill="var(--primary-color,#0891b2)" fillOpacity="0.55" />
                        <circle cx="32" cy="32" r="3" fill="var(--primary-color,#0891b2)" />
                    </svg>
                </div>

                {/* 内容主体 */}
                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：标题 + 说明 + 趋势注解 */}
                    <div className="flex w-[37%] flex-shrink-0 flex-col justify-center">
                        <span
                            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#0891b2)",
                                background: "rgba(8,145,178,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-color,#0891b2)"
                                className="w-4 h-4"
                                title="trend"
                            />
                            趋势分析
                        </span>

                        <h1
                            className="text-5xl font-black leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div className="my-6 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />

                        <p
                            className="text-lg leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        {/* 趋势注解卡片 */}
                        {annotation && (
                            <div
                                className="mt-8 flex items-start gap-3 rounded-2xl border px-5 py-4 shadow-sm"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#bae6fd)",
                                }}
                            >
                                <div
                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                                    style={{ background: "var(--secondary-color,#f59e0b)", color: "var(--primary-text,#ffffff)" }}
                                >
                                    <RemoteSvgIcon
                                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg"
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-5 h-5"
                                        title="map pin"
                                    />
                                </div>
                                <p
                                    className="text-sm leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {annotation}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 右侧：折线趋势卡片 */}
                    <div
                        className="flex flex-1 flex-col rounded-3xl border p-6 shadow-sm"
                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#bae6fd)" }}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <span
                                className="text-base font-bold break-words"
                                style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                到访趋势
                            </span>
                            <span
                                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold break-words"
                                style={{
                                    color: "var(--secondary-color,#f59e0b)",
                                    background: "rgba(245,158,11,0.12)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                峰值 {peakValue}
                            </span>
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
