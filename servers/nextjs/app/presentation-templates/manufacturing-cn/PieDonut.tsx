"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'manufacturing-cn-pie-donut'
export const layoutName = '占比分析'
export const layoutDescription = '智能制造风占比分析页：工业深灰底 + 精密网格 + 齿轮母题，左侧饼图、右侧自绘图例与占比色块。用 GeneralChart 渲染占比构成，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('产能结构占比分析').meta({
        description: "占比分析页主标题（中文，简短有力）",
    }),
    description: z.string().min(4).max(50).optional().meta({
        description: "对占比数据的简要说明（可选）",
    }),
    chartData: z.object({
        type: z.literal('pie').default('pie').meta({
            description: "图表类型，固定为饼图",
        }),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({
                description: "占比项名称，如产线/工序/产品类别",
            }),
            value: z.number().meta({
                description: "占比数值，可为百分比或绝对值",
            }),
        })).min(3).max(6).meta({
            description: "占比构成数据，3-6 项",
        }),
    }).default({
        type: 'pie',
        data: [
            { name: '整机装配', value: 38 },
            { name: '精密机加', value: 24 },
            { name: '焊接冲压', value: 18 },
            { name: '质检包装', value: 12 },
            { name: '智能仓储', value: 8 },
        ],
    }).meta({ description: "占比图表数据" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

// 图例配色：蓝橙为主，辅以工业冷色，保证与饼图色序一致
const LEGEND_COLORS = [
    'var(--primary-color,#3b82f6)',
    'var(--secondary-color,#f97316)',
    '#10b981',
    '#06b6d4',
    '#8b5cf6',
    '#84cc16',
]

const PieDonut: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '产能结构占比分析'
    const description = slideData?.description || '各生产环节产能分布均衡，整机装配占比最高，柔性产线支撑多工序协同。'
    const rawData = (slideData?.chartData?.data && slideData.chartData.data.length > 0)
        ? slideData.chartData.data
        : [
            { name: '整机装配', value: 38 },
            { name: '精密机加', value: 24 },
            { name: '焊接冲压', value: 18 },
            { name: '质检包装', value: 12 },
            { name: '智能仓储', value: 8 },
        ]
    const chartData = rawData.map((d) => ({ name: d?.name || '环节', value: Number(d?.value) || 0 }))
    const total = chartData.reduce((sum, d) => sum + (Number(d.value) || 0), 0) || 1

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
                {/* 背景装饰层：精密网格 + 齿轮 + 金属质感产线线条 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="mfgPieGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L0 0 L0 40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.42" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="mfgPieTop" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="mfgPieGlow" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.20" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 精密网格 */}
                    <rect width="1280" height="720" fill="url(#mfgPieGrid)" />
                    {/* 顶部蓝色辉光带 */}
                    <rect width="1280" height="240" fill="url(#mfgPieTop)" />
                    {/* 左下橙色光晕，呼应饼图区 */}
                    <circle cx="300" cy="700" r="260" fill="url(#mfgPieGlow)" />
                    {/* 右上大齿轮母题 */}
                    <g transform="translate(1170 90)" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.16" fill="none" strokeWidth="2">
                        <circle r="92" />
                        <circle r="48" />
                        {Array.from({ length: 12 }).map((_, i) => {
                            const a = (i * Math.PI * 2) / 12
                            return (
                                <line
                                    key={i}
                                    x1={Math.cos(a) * 92}
                                    y1={Math.sin(a) * 92}
                                    x2={Math.cos(a) * 116}
                                    y2={Math.sin(a) * 116}
                                />
                            )
                        })}
                    </g>
                    {/* 中部小齿轮 */}
                    <g transform="translate(70 360)" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.14" fill="none" strokeWidth="2">
                        <circle r="40" />
                        {Array.from({ length: 8 }).map((_, i) => {
                            const a = (i * Math.PI * 2) / 8
                            return (
                                <line
                                    key={i}
                                    x1={Math.cos(a) * 40}
                                    y1={Math.sin(a) * 40}
                                    x2={Math.cos(a) * 54}
                                    y2={Math.sin(a) * 54}
                                />
                            )
                        })}
                    </g>
                    {/* 产线 / 硬朗金属线条 */}
                    <line x1="0" y1="142" x2="1280" y2="142" stroke="var(--stroke,#374151)" strokeOpacity="0.7" strokeWidth="1.5" />
                    <line x1="0" y1="148" x2="1280" y2="148" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.26" strokeWidth="1" />
                    {[300, 600, 900, 1180].map((x, i) => (
                        <circle key={i} cx={x} cy="145" r="4" fill="var(--secondary-color,#f97316)" fillOpacity="0.5" />
                    ))}
                </svg>

                {/* 内容主层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="flex items-center gap-4">
                        <div className="h-9 w-1.5 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <div className="flex flex-col">
                            <span
                                className="text-xs font-semibold tracking-wide leading-relaxed break-words"
                                style={{ color: "var(--secondary-color,#f97316)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                INTELLIGENT MANUFACTURING · 占比分析
                            </span>
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* 主体：左侧饼图卡片 + 右侧图例 */}
                    <div className="mt-8 flex min-h-0 flex-1 items-stretch gap-10">
                        {/* 左侧：饼图卡片 */}
                        <div
                            className="relative flex w-[46%] flex-shrink-0 flex-col overflow-hidden rounded-2xl border p-6"
                            style={{
                                background: "var(--card-color,#111827)",
                                borderColor: "var(--stroke,#374151)",
                                boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                            }}
                        >
                            {/* 卡片顶部蓝色彩条 */}
                            <div
                                className="absolute left-0 top-0 h-1 w-full"
                                style={{ background: "var(--primary-color,#3b82f6)" }}
                            />
                            {/* 卡片内精密角标网格 */}
                            <svg viewBox="0 0 120 120" className="absolute -left-4 -bottom-4 h-28 w-28" aria-hidden="true">
                                <g stroke="var(--stroke,#374151)" strokeOpacity="0.5" strokeWidth="1" fill="none">
                                    {[24, 48, 72, 96].map((p) => (
                                        <line key={`v${p}`} x1={p} y1="0" x2={p} y2="120" />
                                    ))}
                                    {[24, 48, 72, 96].map((p) => (
                                        <line key={`h${p}`} x1="0" y1={p} x2="120" y2={p} />
                                    ))}
                                </g>
                            </svg>
                            <span
                                className="relative text-xs font-mono font-semibold leading-relaxed break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.5, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                产能构成 · CAPACITY MIX
                            </span>
                            <div className="relative mt-2 min-h-0 w-full flex-1">
                                <GeneralChart type={'pie'} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>

                        {/* 右侧：说明 + 自绘图例列表 */}
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                            <div className="mb-5 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                            <p
                                className="text-base leading-[1.7] break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.88, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {description}
                            </p>

                            {/* 图例列表：色块 + 名称 + 占比 */}
                            <div className="mt-6 flex flex-col gap-3">
                                {chartData.map((d, i) => {
                                    const pct = Math.round(((Number(d.value) || 0) / total) * 100)
                                    const color = LEGEND_COLORS[i % LEGEND_COLORS.length]
                                    return (
                                        <div
                                            key={i}
                                            className="flex items-center gap-4 rounded-xl border px-4 py-3"
                                            style={{
                                                background: "var(--card-color,#111827)",
                                                borderColor: "var(--stroke,#374151)",
                                            }}
                                        >
                                            {/* 占比色块 */}
                                            <span
                                                className="h-4 w-4 flex-shrink-0 rounded-sm"
                                                style={{ background: color, boxShadow: '0 0 0 3px rgba(255,255,255,0.04)' }}
                                            />
                                            <span
                                                className="min-w-0 flex-1 text-base font-bold leading-relaxed break-words"
                                                style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {d.name}
                                            </span>
                                            {/* 占比进度条 */}
                                            <span
                                                className="hidden h-1.5 w-20 flex-shrink-0 overflow-hidden rounded-full md:block"
                                                style={{ background: "var(--stroke,#374151)" }}
                                            >
                                                <span
                                                    className="block h-full rounded-full"
                                                    style={{ width: `${Math.max(pct, 4)}%`, background: color }}
                                                />
                                            </span>
                                            <span
                                                className="flex-shrink-0 font-mono text-xl font-black leading-none"
                                                style={{ color: "var(--primary-text,#ffffff)" }}
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
