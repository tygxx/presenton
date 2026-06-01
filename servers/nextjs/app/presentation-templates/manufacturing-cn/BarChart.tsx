"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'manufacturing-cn-bar-chart'
export const layoutName = '柱状图数据'
export const layoutDescription = '智能制造风数据页：左侧标题/说明/关键结论，右侧柱状图卡片。工业深灰底 + 蓝橙强调 + 精密网格与齿轮母题。仅在有可量化数据时使用，主题色自动跟随。'

const schema = z.object({
    eyebrow: z.string().min(2).max(16).default('产能数据 · 2026').meta({
        description: "标题上方的小标签/分类，如『产能数据』『良率分析』",
    }),
    title: z.string().min(2).max(22).default('智能产线产能跃升').meta({
        description: "数据页主标题（中文，简短有力）",
    }),
    description: z.string().min(6).max(60).default('引入工业机器人与数字孪生后，近五年整线产能持续攀升，年均增幅超三成。').meta({
        description: "对数据的简要说明",
    }),
    chartData: z.object({
        type: z.enum(['bar', 'line', 'area']).default('bar'),
        data: z.array(z.object({
            name: z.string().min(1).max(12).meta({ description: "数据点名称，如年份/产线" }),
            value: z.number().meta({ description: "数据点数值，如万件/台" }),
        })).min(3).max(6),
    }).default({
        type: 'bar',
        data: [
            { name: '2021', value: 42 },
            { name: '2022', value: 55 },
            { name: '2023', value: 73 },
            { name: '2024', value: 96 },
            { name: '2025', value: 128 },
        ],
    }).meta({ description: "图表数据" }),
    highlights: z.array(z.object({
        value: z.string().min(1).max(8).meta({ description: "关键指标数值，如 128万、31%" }),
        label: z.string().min(2).max(16).meta({ description: "指标说明" }),
    })).min(2).max(3).default([
        { value: '128万', label: '2025年产能（件）' },
        { value: '31%', label: '产能年均增速' },
        { value: '99.2%', label: '整线良率' },
    ]).meta({ description: "图表旁的关键结论指标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BarChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '产能数据 · 2026'
    const title = slideData?.title || '智能产线产能跃升'
    const description = slideData?.description || '引入工业机器人与数字孪生后，近五年整线产能持续攀升，年均增幅超三成。'
    const chartType = slideData?.chartData?.type || 'bar'
    const chartData = slideData?.chartData?.data || []
    const highlights = slideData?.highlights || []

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
                {/* 背景装饰层：精密网格 + 金属质感线条 + 齿轮母题 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            {/* 精密网格 */}
                            <pattern id="mfgBarGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0H0V40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.5" strokeWidth="1" />
                            </pattern>
                            {/* 顶部金属高光 */}
                            <linearGradient id="mfgBarMetal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                            {/* 橙色光晕 */}
                            <radialGradient id="mfgBarGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.22" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#mfgBarGrid)" />
                        <rect width="1280" height="220" fill="url(#mfgBarMetal)" />
                        <circle cx="1180" cy="120" r="240" fill="url(#mfgBarGlow)" />
                        {/* 硬朗金属斜线（产线母题） */}
                        <line x1="-40" y1="640" x2="520" y2="120" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.16" strokeWidth="2" />
                        <line x1="-40" y1="700" x2="600" y2="120" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.10" strokeWidth="2" />
                        {/* 右上齿轮母题 */}
                        <g transform="translate(1150 96)" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.28" fill="none" strokeWidth="3">
                            <circle r="44" />
                            <circle r="16" />
                            {Array.from({ length: 12 }).map((_, i) => {
                                const a = (i * Math.PI) / 6
                                return (
                                    <line
                                        key={i}
                                        x1={Math.cos(a) * 44}
                                        y1={Math.sin(a) * 44}
                                        x2={Math.cos(a) * 58}
                                        y2={Math.sin(a) * 58}
                                    />
                                )
                            })}
                        </g>
                    </svg>
                </div>

                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：标签 + 标题 + 说明 + 关键结论 */}
                    <div className="flex w-[38%] flex-shrink-0 flex-col justify-center">
                        <span
                            className="mb-5 inline-flex w-fit items-center rounded-sm px-3 py-1 text-xs font-semibold uppercase break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.12)",
                                border: "1px solid rgba(249,115,22,0.32)",
                                letterSpacing: "0.05em",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {eyebrow}
                        </span>

                        <div className="mb-5 h-1 w-16 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />

                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <p
                            className="mt-4 text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#9ca3af)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        <div className="mt-8 space-y-4">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex items-baseline gap-3">
                                    <span
                                        className="text-3xl font-black leading-none break-words"
                                        style={{ color: "var(--primary-color,#3b82f6)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {h.value}
                                    </span>
                                    <span
                                        className="text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#9ca3af)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {h.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 右侧：图表卡片（金属边框 + 角标） */}
                    <div
                        className="relative flex flex-1 flex-col rounded-lg border p-6"
                        style={{
                            background: "var(--card-color,#111827)",
                            borderColor: "var(--stroke,#374151)",
                            boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04)",
                        }}
                    >
                        {/* 硬朗角标 */}
                        <div
                            className="absolute left-0 top-0 h-8 w-1 rounded-br-sm"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />
                        <div className="mb-4 flex items-center gap-2">
                            <span
                                className="h-2 w-2 rounded-sm"
                                style={{ background: "var(--primary-color,#3b82f6)" }}
                            />
                            <span
                                className="text-xs font-semibold uppercase break-words"
                                style={{ color: "var(--background-text,#9ca3af)", letterSpacing: "0.05em", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                Production Capacity
                            </span>
                        </div>
                        <div className="min-h-0 w-full flex-1">
                            <GeneralChart type={chartType} data={chartData} showLegend={false} showTooltip={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BarChart
