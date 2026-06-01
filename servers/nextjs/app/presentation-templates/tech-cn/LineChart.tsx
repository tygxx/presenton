"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'tech-cn-line-chart'
export const layoutName = '趋势分析'
export const layoutDescription = '科技互联网风趋势页：深色霓虹背景 + 几何网格/电路装饰，左对齐大标题与说明，右侧半透明发光描边卡片内嵌折线趋势图，底部可加注解。仅在有可量化的时间序列数据时使用，主题色自动跟随。'

const schema = z.object({
    title: z.string().min(2).max(20).default('用户规模持续攀升').meta({
        description: "趋势页主标题（中文，简短有力）",
    }),
    description: z.string().min(4).max(50).default('近八个月月活用户保持高速增长，留存与活跃度同步走高。').meta({
        description: "对趋势的简要说明（一句话）",
    }),
    chartData: z.object({
        type: z.literal('line').default('line'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "数据点名称，如月份/季度" }),
            value: z.number().meta({ description: "数据点数值，如月活（万）" }),
        })).min(4).max(8).meta({ description: "折线时间序列数据点（4~8 个）" }),
    }).default({
        type: 'line',
        data: [
            { name: '1月', value: 128 },
            { name: '2月', value: 156 },
            { name: '3月', value: 203 },
            { name: '4月', value: 241 },
            { name: '5月', value: 312 },
            { name: '6月', value: 398 },
            { name: '7月', value: 472 },
            { name: '8月', value: 586 },
        ],
    }).meta({ description: "折线趋势图数据" }),
    annotation: z.string().max(30).optional().default('数据来源：平台后台埋点统计（单位：万）').meta({
        description: "图表下方的注解/数据来源（可选，简短）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const LineChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '用户规模持续攀升'
    const description = slideData?.description || '近八个月月活用户保持高速增长，留存与活跃度同步走高。'
    const chartData = slideData?.chartData?.data || []
    const annotation = slideData?.annotation || '数据来源：平台后台埋点统计（单位：万）'

    // 据末值与首值估算增幅，作为发光指标卡片
    const firstVal = chartData.length ? (chartData[0]?.value ?? 0) : 0
    const lastVal = chartData.length ? (chartData[chartData.length - 1]?.value ?? 0) : 0
    const growth = firstVal > 0 ? Math.round(((lastVal - firstVal) / firstVal) * 100) : 0

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
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="techLineGlowA" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.32" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="techLineGlowB" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.30" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </radialGradient>
                            <pattern id="techLineGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--stroke,#1f2937)" strokeWidth="1" strokeOpacity="0.55" />
                            </pattern>
                        </defs>
                        {/* 几何网格底纹 */}
                        <rect width="1280" height="720" fill="url(#techLineGrid)" />
                        {/* 左上霓虹蓝紫渐变高光 */}
                        <rect width="1280" height="720" fill="url(#techLineGlowA)" />
                        {/* 右下光晕 */}
                        <circle cx="1120" cy="640" r="360" fill="url(#techLineGlowB)" />
                        {/* 左侧紫色光晕 */}
                        <circle cx="80" cy="120" r="260" fill="url(#techLineGlowB)" />
                        {/* 电路线母题 */}
                        <g stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.22" strokeWidth="1.5" fill="none">
                            <path d="M -20 180 H 180 V 100 H 320" />
                            <path d="M -20 540 H 120 V 620 H 300" />
                            <path d="M 1300 260 H 1140 V 200 H 1000" />
                        </g>
                        <g fill="var(--primary-color,#3b82f6)" fillOpacity="0.6">
                            <circle cx="320" cy="100" r="3.5" />
                            <circle cx="300" cy="620" r="3.5" />
                            <circle cx="1000" cy="200" r="3.5" />
                        </g>
                    </svg>
                </div>

                <div className="relative z-10 flex h-full px-16 py-12 gap-12">
                    {/* 左侧：标签 + 标题 + 说明 + 增幅指标 */}
                    <div className="flex w-[36%] flex-shrink-0 flex-col justify-center">
                        <span
                            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#3b82f6)",
                                background: "rgba(59,130,246,0.12)",
                                border: "1px solid rgba(59,130,246,0.30)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-color,#3b82f6)"
                                className="w-4 h-4"
                                title="trend"
                            />
                            趋势分析
                        </span>

                        <div
                            className="mb-5 h-1.5 w-16 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))" }}
                        />

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <p
                            className="mt-5 text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        {/* 发光增幅指标卡片 */}
                        <div
                            className="mt-9 flex w-fit items-center gap-4 rounded-2xl px-5 py-4"
                            style={{
                                background: "var(--card-color,#111827)",
                                border: "1px solid rgba(139,92,246,0.40)",
                                boxShadow: "0 0 24px rgba(59,130,246,0.22)",
                            }}
                        >
                            <div
                                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                                style={{
                                    background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                    boxShadow: "0 0 16px rgba(139,92,246,0.45)",
                                }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/trend-up-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-6 h-6"
                                    title="growth"
                                />
                            </div>
                            <div className="flex flex-col leading-relaxed">
                                <span
                                    className="text-3xl font-black leading-none"
                                    style={{ color: "var(--primary-color,#3b82f6)", fontVariantNumeric: 'tabular-nums' }}
                                >
                                    +{growth}%
                                </span>
                                <span
                                    className="mt-1 text-sm break-words"
                                    style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    区间累计增幅
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 右侧：半透明发光描边图表卡片 */}
                    <div className="flex flex-1 flex-col justify-center min-w-0">
                        <div
                            className="flex flex-1 flex-col rounded-3xl p-6"
                            style={{
                                background: "rgba(17,24,39,0.72)",
                                border: "1px solid rgba(59,130,246,0.35)",
                                boxShadow: "0 0 40px rgba(59,130,246,0.18), inset 0 0 60px rgba(139,92,246,0.08)",
                            }}
                        >
                            <div className="mb-3 flex items-center gap-2">
                                <span
                                    className="inline-block h-2.5 w-2.5 rounded-full"
                                    style={{ background: "var(--primary-color,#3b82f6)", boxShadow: "0 0 8px var(--primary-color,#3b82f6)" }}
                                />
                                <span
                                    className="text-sm font-medium break-words"
                                    style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.8, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    月度活跃用户走势
                                </span>
                            </div>
                            <div className="min-h-0 w-full flex-1">
                                <GeneralChart type={'line'} data={chartData} showLegend={false} showTooltip={true} />
                            </div>

                            {/* 底部注解 */}
                            {annotation && (
                                <div
                                    className="mt-3 flex items-center gap-2 border-t pt-3"
                                    style={{ borderColor: "var(--stroke,#1f2937)" }}
                                >
                                    <RemoteSvgIcon
                                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/info-bold.svg"
                                        strokeColor="currentColor"
                                        color="var(--secondary-color,#8b5cf6)"
                                        className="w-4 h-4 flex-shrink-0"
                                        title="annotation"
                                    />
                                    <span
                                        className="text-xs leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {annotation}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LineChart
