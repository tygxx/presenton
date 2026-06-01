"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'tech-cn-pie-donut'
export const layoutName = '占比分析'
export const layoutDescription = '科技互联网风占比分析页：深色霓虹底 + 几何网格/光晕电路装饰，左侧饼/环图，右侧自绘图例（名称 + 占比色块）。纯 CSS/SVG 装饰，离线可渲染。仅在有可量化占比数据时使用，主题色自动跟随。'

const schema = z.object({
    title: z.string().min(2).max(20).default('流量来源占比').meta({
        description: "占比分析页主标题（中文，简短有力）",
    }),
    description: z.string().min(2).max(50).default('各渠道用户访问来源分布，自然搜索与直接访问构成主力。').meta({
        description: "对占比数据的简要说明（可选）",
    }),
    chartData: z.object({
        type: z.literal('pie').default('pie').meta({ description: "图表类型，固定为饼/环图" }),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "占比项名称，如渠道/分类" }),
            value: z.number().meta({ description: "占比项数值（用于计算百分比）" }),
        })).min(3).max(6).meta({ description: "占比数据项（3-6 项）" }),
    }).default({
        type: 'pie',
        data: [
            { name: '自然搜索', value: 38 },
            { name: '直接访问', value: 26 },
            { name: '社交媒体', value: 18 },
            { name: '付费广告', value: 12 },
            { name: '邮件触达', value: 6 },
        ],
    }).meta({ description: "占比图表数据" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const PALETTE = [
    'var(--primary-color,#3b82f6)',
    'var(--secondary-color,#8b5cf6)',
    '#22d3ee',
    '#a78bfa',
    '#38bdf8',
    '#c084fc',
]

const PieDonut: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '流量来源占比'
    const description = slideData?.description || '各渠道用户访问来源分布，自然搜索与直接访问构成主力。'
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
                    background: "var(--background-color,#0a0e1a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：几何网格 + 霓虹光晕 + 电路线 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="techPieGrid" width="44" height="44" patternUnits="userSpaceOnUse">
                                <path d="M44 0 L0 0 0 44" fill="none" stroke="var(--stroke,#1f2937)" strokeWidth="1" strokeOpacity="0.5" />
                            </pattern>
                            <radialGradient id="techPieGlowA" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="techPieGlowB" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 网格 */}
                        <rect width="1280" height="720" fill="url(#techPieGrid)" />
                        {/* 霓虹光晕 */}
                        <circle cx="300" cy="420" r="340" fill="url(#techPieGlowA)" />
                        <circle cx="1080" cy="120" r="300" fill="url(#techPieGlowB)" />
                        {/* 电路线 */}
                        <g stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.22" strokeWidth="1.5" fill="none">
                            <path d="M0 600 H180 L240 540 H420" />
                            <path d="M1280 200 H1100 L1040 260 H880" />
                            <circle cx="420" cy="540" r="4" fill="var(--primary-color,#3b82f6)" fillOpacity="0.5" stroke="none" />
                            <circle cx="880" cy="260" r="4" fill="var(--secondary-color,#8b5cf6)" fillOpacity="0.5" stroke="none" />
                        </g>
                        <g stroke="var(--secondary-color,#8b5cf6)" strokeOpacity="0.18" strokeWidth="1.5" fill="none">
                            <path d="M0 120 H120 L170 170 H300" />
                            <path d="M1280 640 H1140 L1090 590 H960" />
                        </g>
                    </svg>
                    {/* 顶部霓虹渐变高光条 */}
                    <div
                        className="absolute left-0 top-0 h-[3px] w-full"
                        style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6), transparent)" }}
                    />
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <span
                                className="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold"
                                style={{
                                    background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                    color: "var(--primary-text,#ffffff)",
                                }}
                            >
                                %
                            </span>
                            <span
                                className="text-sm font-medium tracking-wide break-words"
                                style={{ color: "var(--primary-color,#3b82f6)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                占比分析
                            </span>
                        </div>
                        <h1
                            className="mt-3 text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        {description && (
                            <p
                                className="mt-3 max-w-[44rem] text-base leading-relaxed break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {description}
                            </p>
                        )}
                    </div>

                    {/* 主体：左图 + 右图例 */}
                    <div className="mt-8 flex min-h-0 flex-1 items-stretch gap-10">
                        {/* 左侧：饼/环图卡片（半透明发光描边） */}
                        <div
                            className="flex w-[48%] flex-shrink-0 flex-col rounded-2xl border p-6"
                            style={{
                                background: "var(--card-color,#111827)",
                                borderColor: "var(--stroke,#1f2937)",
                                boxShadow: "0 0 0 1px rgba(59,130,246,0.12), 0 18px 50px -22px rgba(59,130,246,0.55)",
                            }}
                        >
                            <div className="min-h-0 w-full flex-1">
                                <GeneralChart type={'pie'} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>

                        {/* 右侧：自绘图例列表（名称 + 占比 + 色块） */}
                        <div className="flex min-h-0 flex-1 flex-col justify-center">
                            <div className="flex flex-col gap-3">
                                {chartData.map((item, i) => {
                                    const value = Number(item?.value) || 0
                                    const pct = Math.round((value / total) * 100)
                                    const color = PALETTE[i % PALETTE.length]
                                    return (
                                        <div
                                            key={i}
                                            className="flex items-center gap-4 rounded-xl border px-4 py-3"
                                            style={{
                                                background: "rgba(17,24,39,0.55)",
                                                borderColor: "var(--stroke,#1f2937)",
                                            }}
                                        >
                                            {/* 色块 */}
                                            <span
                                                className="h-4 w-4 flex-shrink-0 rounded-md"
                                                style={{ background: color, boxShadow: `0 0 10px 0 ${color}` }}
                                            />
                                            {/* 名称 */}
                                            <span
                                                className="flex-1 text-base font-semibold leading-relaxed break-words"
                                                style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {item?.name}
                                            </span>
                                            {/* 占比进度条 */}
                                            <span
                                                className="hidden h-1.5 w-24 flex-shrink-0 overflow-hidden rounded-full sm:block"
                                                style={{ background: "var(--stroke,#1f2937)" }}
                                            >
                                                <span
                                                    className="block h-full rounded-full"
                                                    style={{ width: `${pct}%`, background: color }}
                                                />
                                            </span>
                                            {/* 百分比（等宽数字点缀） */}
                                            <span
                                                className="flex-shrink-0 text-xl font-black leading-none tabular-nums"
                                                style={{ color: color, fontVariantNumeric: 'tabular-nums' }}
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
            </div>
        </>
    )
}

export default PieDonut
