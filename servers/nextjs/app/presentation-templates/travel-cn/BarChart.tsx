"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'travel-cn-bar-chart'
export const layoutName = '柱状图数据'
export const layoutDescription = '旅游文旅风数据页：左侧标题、说明与关键结论，右侧明媚海蓝柱状图卡片。指南针与路线点缀装饰，纯 CSS/SVG，离线可渲染。仅在有可量化数据时使用，主题色自动跟随。'

const schema = z.object({
    eyebrow: z.string().min(2).max(16).default('文旅数据 · 2026').meta({
        description: "标题上方的小标签/分类，如『客流数据』『文旅趋势』",
    }),
    title: z.string().min(2).max(22).default('客流量稳步攀升').meta({
        description: "数据页主标题（中文，简短有力）",
    }),
    description: z.string().min(6).max(56).default('近五年目的地接待游客量持续上行，旅游热度逐年走高。').meta({
        description: "对数据的简要说明",
    }),
    chartData: z.object({
        type: z.enum(['bar', 'line', 'area']).default('bar'),
        data: z.array(z.object({
            name: z.string().min(1).max(12).meta({ description: "数据点名称，如年份/季度/月份" }),
            value: z.number().meta({ description: "数据点数值，如接待人次（万）" }),
        })).min(3).max(6),
    }).default({
        type: 'bar',
        data: [
            { name: '2021', value: 286 },
            { name: '2022', value: 342 },
            { name: '2023', value: 518 },
            { name: '2024', value: 706 },
            { name: '2025', value: 920 },
        ],
    }).meta({ description: "图表数据（柱状图）" }),
    highlights: z.array(z.object({
        value: z.string().min(1).max(8).meta({ description: "关键指标数值，如 920万、34%" }),
        label: z.string().min(2).max(16).meta({ description: "指标说明" }),
    })).min(2).max(3).default([
        { value: '920万', label: '2025年接待人次' },
        { value: '34%', label: '年均复合增速' },
        { value: '4.8分', label: '游客满意度' },
    ]).meta({ description: "图表旁的关键结论指标" }),
    conclusion: z.string().min(4).max(40).default('全域旅游格局成型，淡旺季差距持续收窄。').meta({
        description: "底部一句话关键结论",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BarChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '文旅数据 · 2026'
    const title = slideData?.title || '客流量稳步攀升'
    const description = slideData?.description || '近五年目的地接待游客量持续上行，旅游热度逐年走高。'
    const chartType = slideData?.chartData?.type || 'bar'
    const chartData = slideData?.chartData?.data || []
    const highlights = slideData?.highlights || []
    const conclusion = slideData?.conclusion || '全域旅游格局成型，淡旺季差距持续收窄。'

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
                {/* 背景装饰层：海蓝天光晕 + 暖阳 + 路线虚线 + 指南针 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="travelBarSky" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="travelBarSun" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.28" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 顶部天光 */}
                    <rect x="0" y="0" width="1280" height="360" fill="url(#travelBarSky)" />
                    {/* 右上暖阳 */}
                    <circle cx="1120" cy="120" r="220" fill="url(#travelBarSun)" />
                    {/* 旅行路线虚线 */}
                    <path
                        d="M40 620 C 260 540, 360 660, 560 560 S 920 460, 1240 540"
                        fill="none"
                        stroke="var(--primary-color,#0891b2)"
                        strokeOpacity="0.16"
                        strokeWidth="2.5"
                        strokeDasharray="2 12"
                        strokeLinecap="round"
                    />
                    {/* 路线点 */}
                    {[[120, 588], [560, 560], [900, 500], [1200, 538]].map((p, i) => (
                        <circle key={i} cx={p[0]} cy={p[1]} r="6" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.5" />
                    ))}
                </svg>

                {/* 左上角指南针母题 */}
                <div className="absolute left-10 top-9 z-10 flex items-center gap-2.5">
                    <svg width="30" height="30" viewBox="0 0 48 48" aria-hidden="true">
                        <circle cx="24" cy="24" r="21" fill="none" stroke="var(--primary-color,#0891b2)" strokeWidth="2.5" />
                        <circle cx="24" cy="24" r="2.5" fill="var(--primary-color,#0891b2)" />
                        <polygon points="24,8 29,24 24,21 19,24" fill="var(--secondary-color,#f59e0b)" />
                        <polygon points="24,40 19,24 24,27 29,24" fill="var(--primary-color,#0891b2)" fillOpacity="0.6" />
                    </svg>
                    <span
                        className="text-base font-bold break-words"
                        style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        文旅洞察
                    </span>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full px-16 pt-20 pb-12 gap-10">
                    {/* 左侧：标签 + 标题 + 说明 + 关键结论 */}
                    <div className="flex w-[38%] flex-shrink-0 flex-col justify-center">
                        <span
                            className="mb-5 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide break-words"
                            style={{
                                color: "var(--secondary-color,#f59e0b)",
                                background: "rgba(245,158,11,0.12)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {eyebrow}
                        </span>

                        <h1
                            className="text-4xl font-black leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div className="my-5 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />

                        <p
                            className="text-base leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        {/* 关键结论指标 */}
                        <div className="mt-8 space-y-4">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex items-baseline gap-3">
                                    <span className="text-3xl font-black leading-[1.2]" style={{ color: "var(--primary-color,#0891b2)" }}>
                                        {h.value}
                                    </span>
                                    <span
                                        className="text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {h.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 右侧：明媚海蓝图表卡片 */}
                    <div className="flex flex-1 flex-col gap-4">
                        <div
                            className="flex min-h-0 flex-1 flex-col rounded-2xl border p-6 shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#bae6fd)" }}
                        >
                            <div className="mb-4 flex items-center gap-2.5">
                                <span
                                    className="inline-block h-3 w-3 rounded-sm"
                                    style={{ background: "var(--primary-color,#0891b2)" }}
                                />
                                <span
                                    className="text-sm font-bold break-words"
                                    style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    年度接待游客量趋势
                                </span>
                            </div>
                            <div className="min-h-0 w-full flex-1">
                                <GeneralChart type={chartType} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>

                        {/* 底部关键结论条 */}
                        <div
                            className="flex items-center gap-3 rounded-2xl px-6 py-4 break-words"
                            style={{ background: "rgba(8,145,178,0.08)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            <span
                                className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-black"
                                style={{ background: "var(--secondary-color,#f59e0b)", color: "var(--primary-text,#ffffff)" }}
                            >
                                ★
                            </span>
                            <span
                                className="text-sm font-semibold leading-relaxed break-words"
                                style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {conclusion}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BarChart
