"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'finance-cn-bar-chart'
export const layoutName = '柱状图数据'
export const layoutDescription = '金融投资风数据页：深藏青底配香槟金线条，左侧衬线大标题/说明/关键结论指标，右侧柱状图卡片。仅在有可量化数据时使用。主题色自动跟随。'

const schema = z.object({
    eyebrow: z.string().min(2).max(14).default('业绩回顾 · 2025').meta({
        description: "标题上方的小标签/分类，如『业绩回顾』『资产配置』",
    }),
    title: z.string().min(2).max(22).default('资产管理规模稳步攀升').meta({
        description: "数据页主标题（中文，简短有力）",
    }),
    description: z.string().min(6).max(56).default('近五年管理规模持续扩张，年均复合增长率超过两成，凸显穿越周期的稳健配置能力。').meta({
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
            { name: '2021', value: 820 },
            { name: '2022', value: 1060 },
            { name: '2023', value: 1380 },
            { name: '2024', value: 1720 },
            { name: '2025', value: 2150 },
        ],
    }).meta({ description: "图表数据" }),
    unit: z.string().min(1).max(10).default('单位：亿元').meta({
        description: "图表数值单位说明，如『单位：亿元』",
    }),
    highlights: z.array(z.object({
        value: z.string().min(1).max(8).meta({ description: "关键指标数值，如 2150亿、26%" }),
        label: z.string().min(2).max(16).meta({ description: "指标说明" }),
    })).min(2).max(3).default([
        { value: '2150亿', label: '2025年管理规模' },
        { value: '26%', label: '五年年均复合增速' },
        { value: '5年', label: '连续正增长' },
    ]).meta({ description: "图表旁的关键结论指标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BarChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '业绩回顾 · 2025'
    const title = slideData?.title || '资产管理规模稳步攀升'
    const description = slideData?.description || '近五年管理规模持续扩张，年均复合增长率超过两成，凸显穿越周期的稳健配置能力。'
    const chartType = slideData?.chartData?.type || 'bar'
    const chartData = slideData?.chartData?.data || []
    const unit = slideData?.unit || '单位：亿元'
    const highlights = slideData?.highlights || []

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：数据网格 + 增长曲线 + 细金线 + 棱形 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="finBarGoldLine" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.55" />
                                <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="finBarCurve" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0" />
                                <stop offset="100%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.45" />
                            </linearGradient>
                            <radialGradient id="finBarGlow" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                            </radialGradient>
                            <pattern id="finBarGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0 L0 0 L0 40" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.5" strokeWidth="1" />
                            </pattern>
                        </defs>
                        {/* 数据网格母题 */}
                        <rect width="1280" height="720" fill="url(#finBarGrid)" />
                        {/* 左下角金色光晕 */}
                        <rect x="-160" y="320" width="720" height="560" fill="url(#finBarGlow)" />
                        {/* 增长曲线母题 */}
                        <path d="M0 600 C 260 560, 420 470, 620 410 S 1020 250, 1280 120" fill="none" stroke="url(#finBarGoldLine)" strokeWidth="2" />
                        <path d="M0 660 C 280 630, 460 540, 660 470 S 1060 320, 1280 200" fill="none" stroke="url(#finBarCurve)" strokeWidth="1.5" />
                        {/* 细金线 */}
                        <line x1="0" y1="148" x2="1280" y2="148" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.18" strokeWidth="1" />
                        {/* 棱形母题 */}
                        <rect x="1120" y="96" width="34" height="34" transform="rotate(45 1137 113)" fill="none" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.45" strokeWidth="1.5" />
                        <rect x="1176" y="148" width="18" height="18" transform="rotate(45 1185 157)" fill="var(--primary-color,#d4af37)" fillOpacity="0.28" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full px-16 py-12 gap-12">
                    {/* 左侧：小标签 + 标题 + 说明 + 关键结论 */}
                    <div className="flex w-[40%] flex-shrink-0 flex-col justify-center">
                        <span
                            className="mb-5 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium tracking-wide break-words"
                            style={{
                                color: "var(--primary-color,#d4af37)",
                                background: "rgba(212,175,55,0.12)",
                                border: "1px solid rgba(212,175,55,0.32)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {eyebrow}
                        </span>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#e2e8f0)",
                                fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        <div className="my-6 flex items-center gap-3">
                            <span className="h-1.5 w-16 rounded-full" style={{ background: "var(--primary-color,#d4af37)" }} />
                            <span className="h-1.5 w-3 rounded-full" style={{ background: "var(--secondary-color,#60a5fa)" }} />
                        </div>

                        <p
                            className="text-base leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#cbd5e1)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        <div className="mt-9 space-y-5">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex items-baseline gap-3">
                                    <span
                                        className="text-3xl font-black leading-none"
                                        style={{
                                            color: "var(--primary-color,#d4af37)",
                                            fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                        }}
                                    >
                                        {h.value}
                                    </span>
                                    <span
                                        className="text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#94a3b8)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {h.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 右侧：图表卡片 */}
                    <div
                        className="flex flex-1 flex-col rounded-2xl border p-6"
                        style={{
                            background: "var(--card-color,#1e293b)",
                            borderColor: "var(--stroke,#334155)",
                            boxShadow: "0 18px 48px rgba(2,6,23,0.45)",
                        }}
                    >
                        <div className="mb-3 flex items-baseline justify-between gap-3">
                            <span
                                className="text-sm font-semibold leading-relaxed break-words"
                                style={{ color: "var(--background-text,#e2e8f0)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                历年规模走势
                            </span>
                            <span
                                className="text-xs leading-relaxed break-words"
                                style={{ color: "var(--background-text,#94a3b8)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {unit}
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
