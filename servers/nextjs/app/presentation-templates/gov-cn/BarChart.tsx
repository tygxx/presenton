"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'gov-cn-bar-chart'
export const layoutName = '柱状图数据'
export const layoutDescription = '党政政务数据页：居中对称烫金标题，左侧柱状图，右侧关键结论指标。米白底配中国红与烫金细线，庄重权威。仅在有可量化数据时使用，主题色自动跟随。'

const schema = z.object({
    eyebrow: z.string().min(2).max(16).default('年度数据').meta({
        description: "标题上方的小标签，如『年度数据』『统计公报』",
    }),
    title: z.string().min(2).max(22).default('民生实事稳步推进').meta({
        description: "数据页主标题（中文，庄重简短）",
    }),
    description: z.string().min(6).max(60).default('五年来财政民生支出逐年提升，保障网络更加坚实有力。').meta({
        description: "对数据的简要说明",
    }),
    chartData: z.object({
        type: z.enum(['bar', 'line', 'area']).default('bar'),
        data: z.array(z.object({
            name: z.string().min(1).max(12).meta({ description: "数据点名称，如年份/季度" }),
            value: z.number().meta({ description: "数据点数值" }),
        })).min(3).max(6),
    }).default({
        type: 'bar',
        data: [
            { name: '2021', value: 62 },
            { name: '2022', value: 71 },
            { name: '2023', value: 83 },
            { name: '2024', value: 95 },
            { name: '2025', value: 108 },
        ],
    }).meta({ description: "图表数据" }),
    highlights: z.array(z.object({
        value: z.string().min(1).max(8).meta({ description: "关键指标数值，如 108亿、94%" }),
        label: z.string().min(2).max(16).meta({ description: "指标说明" }),
    })).min(2).max(3).default([
        { value: '108亿', label: '2025年民生支出' },
        { value: '94%', label: '群众满意度' },
        { value: '5年', label: '连续稳步增长' },
    ]).meta({ description: "图表旁的关键结论指标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BarChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '年度数据'
    const title = slideData?.title || '民生实事稳步推进'
    const description = slideData?.description || '五年来财政民生支出逐年提升，保障网络更加坚实有力。'
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
                    background: "var(--background-color,#faf7f2)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：对称纹样 + 烫金光晕 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="govBarGold" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                                <stop offset="50%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="govBarHalo" cx="50%" cy="0%" r="60%">
                                <stop offset="0%" stopColor="var(--primary-color,#c1121f)" stopOpacity="0.06" />
                                <stop offset="100%" stopColor="var(--primary-color,#c1121f)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#govBarHalo)" />
                        {/* 顶部居中烫金细线 */}
                        <rect x="440" y="118" width="400" height="2" fill="url(#govBarGold)" />
                        {/* 左右对称回纹角饰 */}
                        <g stroke="var(--secondary-color,#b8860b)" strokeOpacity="0.16" strokeWidth="2" fill="none">
                            <path d="M40 40 H110 V110" />
                            <path d="M58 58 H92 V92" />
                            <path d="M1240 40 H1170 V110" />
                            <path d="M1222 58 H1188 V92" />
                            <path d="M40 680 H110 V610" />
                            <path d="M58 662 H92 V628" />
                            <path d="M1240 680 H1170 V610" />
                            <path d="M1222 662 H1188 V628" />
                        </g>
                    </svg>
                </div>

                {/* 左右两侧中国红装饰边带（对称） */}
                <div className="absolute left-0 top-0 z-0 h-full w-1.5" style={{ background: "var(--primary-color,#c1121f)" }} aria-hidden="true" />
                <div className="absolute right-0 top-0 z-0 h-full w-1.5" style={{ background: "var(--primary-color,#c1121f)" }} aria-hidden="true" />

                <div className="relative z-10 flex h-full flex-col px-16 py-10">
                    {/* 顶部：居中对称标题区 */}
                    <div className="flex flex-shrink-0 flex-col items-center text-center">
                        <span
                            className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-bold leading-relaxed break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                background: "var(--primary-color,#c1121f)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                                <path d="M12 2l2.47 7.6H22l-6.2 4.5 2.37 7.6L12 17.7 5.83 21.7 8.2 14.1 2 9.6h7.53z" />
                            </svg>
                            {eyebrow}
                        </span>
                        <h1
                            className="mt-4 text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        {/* 烫金对称分隔线 + 中心五角星 */}
                        <div className="mt-4 flex items-center justify-center gap-3">
                            <span className="h-px w-20 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} />
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="var(--secondary-color,#b8860b)" aria-hidden="true">
                                <path d="M12 2l2.47 7.6H22l-6.2 4.5 2.37 7.6L12 17.7 5.83 21.7 8.2 14.1 2 9.6h7.53z" />
                            </svg>
                            <span className="h-px w-20 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        </div>
                        <p
                            className="mt-4 max-w-3xl text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>
                    </div>

                    {/* 下部：左图表 + 右关键结论 */}
                    <div className="mt-8 flex min-h-0 flex-1 gap-10">
                        {/* 左侧：图表卡片 */}
                        <div
                            className="flex flex-1 flex-col rounded-lg border p-6 shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e8dcc8)" }}
                        >
                            <div className="mb-3 flex flex-shrink-0 items-center gap-2">
                                <span className="h-4 w-1 rounded-full" style={{ background: "var(--primary-color,#c1121f)" }} />
                                <span
                                    className="text-sm font-bold leading-relaxed break-words"
                                    style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    历年趋势
                                </span>
                            </div>
                            <div className="min-h-0 w-full flex-1">
                                <GeneralChart type={chartType} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>

                        {/* 右侧：关键结论指标 */}
                        <div className="flex w-[30%] flex-shrink-0 flex-col justify-center gap-4">
                            {highlights.map((h, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col rounded-lg border px-5 py-4 shadow-sm"
                                    style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e8dcc8)" }}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="h-5 w-1 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} />
                                        <span
                                            className="text-3xl font-black leading-[1.2] break-words"
                                            style={{ color: "var(--primary-color,#c1121f)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {h.value}
                                        </span>
                                    </div>
                                    <span
                                        className="mt-2 text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {h.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BarChart
