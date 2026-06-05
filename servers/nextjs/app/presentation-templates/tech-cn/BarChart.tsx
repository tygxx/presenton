"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'tech-cn-bar-chart'
export const layoutName = '柱状图数据'
export const layoutDescription = '科技互联网风数据页：深色霓虹底，左侧大标题/说明/关键结论，右侧发光描边柱状图卡片。仅在有可量化数据时使用。主题色自动跟随。'

const schema = z.object({
    title: z.string().min(2).max(22).default('用户规模指数级跃升').meta({
        description: "数据页主标题",
    }),
    description: z.string().min(6).max(60).default('日活跃用户连续五个季度高速攀升，云端调用量同步翻倍增长。').meta({
        description: "对数据的简要说明",
    }),
    chartData: z.object({
        type: z.enum(['bar', 'line', 'area']).default('bar'),
        data: z.array(z.object({
            name: z.string().min(1).max(12).meta({ description: "数据点名称，如季度/版本" }),
            value: z.number().meta({ description: "数据点数值" }),
        })).min(3).max(6),
    }).default({
        type: 'bar',
        data: [
            { name: 'Q1', value: 280 },
            { name: 'Q2', value: 430 },
            { name: 'Q3', value: 690 },
            { name: 'Q4', value: 1120 },
            { name: 'Q5', value: 1860 },
        ],
    }).meta({ description: "图表数据" }),
    highlights: z.array(z.object({
        value: z.string().min(1).max(8).meta({ description: "关键指标数值，如 1860万、98%" }),
        label: z.string().min(2).max(16).meta({ description: "指标说明" }),
    })).min(2).max(3).default([
        { value: '1860万', label: '当季日活用户' },
        { value: '6.6×', label: '五季度增幅' },
        { value: '99.99%', label: '服务可用性' },
    ]).meta({ description: "图表旁的关键结论指标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BarChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '用户规模指数级跃升'
    const description = slideData?.description || '日活跃用户连续五个季度高速攀升，云端调用量同步翻倍增长。'
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
                    background: "var(--background-color,#0a0e1a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：几何网格 + 霓虹光晕 + 电路线 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="techBarHaloA" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.32" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="techBarHaloB" x1="1" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.30" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </linearGradient>
                            <pattern id="techBarGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0H0V40" fill="none" stroke="var(--stroke,#1f2937)" strokeWidth="1" strokeOpacity="0.55" />
                            </pattern>
                        </defs>
                        {/* 网格 */}
                        <rect width="1280" height="720" fill="url(#techBarGrid)" />
                        {/* 蓝色光晕 */}
                        <circle cx="120" cy="80" r="360" fill="url(#techBarHaloA)" />
                        {/* 紫色光晕 */}
                        <circle cx="1180" cy="700" r="380" fill="url(#techBarHaloB)" />
                        {/* 电路线 */}
                        <path d="M0 600 H180 L240 540 H420 L470 590 H700" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.22" strokeWidth="1.5" />
                        <path d="M1280 140 H1080 L1020 200 H840" fill="none" stroke="var(--secondary-color,#8b5cf6)" strokeOpacity="0.22" strokeWidth="1.5" />
                        <circle cx="180" cy="600" r="3.5" fill="var(--primary-color,#3b82f6)" fillOpacity="0.6" />
                        <circle cx="1080" cy="140" r="3.5" fill="var(--secondary-color,#8b5cf6)" fillOpacity="0.6" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：标题 + 说明 + 关键结论 */}
                    <div className="flex w-[38%] flex-shrink-0 flex-col justify-center">
                        <div
                            className="mb-5 h-1.5 w-16 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))" }}
                        />
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

                        <div className="mt-8 space-y-5">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex items-baseline gap-3">
                                    <span
                                        className="text-3xl font-black leading-none break-words"
                                        style={{
                                            fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
                                            color: "var(--primary-color,#3b82f6)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
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

                    {/* 右侧：发光描边图表卡片 */}
                    <div
                        className="relative flex flex-1 flex-col rounded-2xl border p-6"
                        style={{
                            background: "var(--card-color,#111827)",
                            borderColor: "var(--stroke,#1f2937)",
                            boxShadow: "0 0 0 1px rgba(59,130,246,0.12), 0 0 60px -12px rgba(139,92,246,0.35)",
                        }}
                    >
                        {/* 卡片顶部发光描边线 */}
                        <div
                            className="absolute left-6 right-6 top-0 h-px"
                            style={{ background: "linear-gradient(90deg, transparent, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6), transparent)" }}
                            aria-hidden="true"
                        />
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
