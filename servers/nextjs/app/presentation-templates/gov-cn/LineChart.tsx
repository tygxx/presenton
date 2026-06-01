"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'gov-cn-line-chart'
export const layoutName = '趋势分析'
export const layoutDescription = '党政政务风趋势页：居中对称烫金标题 + 折线趋势图 + 注解。米白底、中国红、烫金细线，五角星与纹样点缀，纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('民生事业稳步提升').meta({
        description: "趋势页主标题（中文，简短庄重）",
    }),
    description: z.string().min(4).max(50).default('近年来各项民生指标持续向好，发展成果惠及广大群众。').meta({
        description: "对趋势的简要说明（一句话）",
    }),
    chartData: z.object({
        type: z.literal('line').default('line').meta({ description: "图表类型，固定为折线" }),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "数据点名称，如年份/季度" }),
            value: z.number().meta({ description: "数据点数值" }),
        })).min(4).max(8).meta({ description: "折线数据点（4-8个）" }),
    }).default({
        type: 'line',
        data: [
            { name: '2020', value: 62 },
            { name: '2021', value: 71 },
            { name: '2022', value: 79 },
            { name: '2023', value: 88 },
            { name: '2024', value: 96 },
            { name: '2025', value: 108 },
        ],
    }).meta({ description: "折线趋势图数据" }),
    annotation: z.string().max(30).optional().default('数据来源：年度国民经济和社会发展统计公报').meta({
        description: "图表下方注解/数据来源说明（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const LineChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '民生事业稳步提升'
    const description = slideData?.description || '近年来各项民生指标持续向好，发展成果惠及广大群众。'
    const chartData = slideData?.chartData?.data || []
    const annotation = slideData?.annotation || ''

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
                {/* 背景装饰层：左右对称烫金纹样 + 五角星点缀 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="govLineGold" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#b8860b" stopOpacity="0" />
                            <stop offset="50%" stopColor="#b8860b" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="govLineHalo" cx="50%" cy="0%" r="70%">
                            <stop offset="0%" stopColor="#c1121f" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="#c1121f" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 顶部红色光晕 */}
                    <rect width="1280" height="720" fill="url(#govLineHalo)" />
                    {/* 左右对称的同心半圆纹样（华表/年轮母题） */}
                    {[0, 1, 2, 3].map((i) => (
                        <circle key={`l${i}`} cx="0" cy="360" r={120 + i * 90} fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity={0.08} strokeWidth="1.5" />
                    ))}
                    {[0, 1, 2, 3].map((i) => (
                        <circle key={`r${i}`} cx="1280" cy="360" r={120 + i * 90} fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity={0.08} strokeWidth="1.5" />
                    ))}
                    {/* 顶部居中烫金细线 */}
                    <rect x="440" y="150" width="400" height="2" fill="url(#govLineGold)" />
                    {/* 五角星点缀（顶部对称） */}
                    {[
                        { x: 600, y: 96, s: 9 },
                        { x: 640, y: 84, s: 13 },
                        { x: 680, y: 96, s: 9 },
                    ].map((st, i) => (
                        <Star key={`s${i}`} cx={st.x} cy={st.y} size={st.s} />
                    ))}
                </svg>

                {/* 内容主区：居中对称竖向布局 */}
                <div className="relative z-10 flex h-full flex-col items-center px-20 pt-16 pb-10 gap-6">
                    {/* 居中对称标题区 */}
                    <div className="flex flex-col items-center text-center gap-4">
                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        {/* 标题下烫金对称分隔（细线 + 中心红点 + 细线） */}
                        <div className="flex items-center gap-3">
                            <span className="block h-px w-16 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} />
                            <span className="block h-2 w-2 rotate-45" style={{ background: "var(--primary-color,#c1121f)" }} />
                            <span className="block h-px w-16 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        </div>
                        <p
                            className="max-w-[44rem] text-lg leading-relaxed break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>
                    </div>

                    {/* 折线图卡片 */}
                    <div
                        className="flex w-full max-w-[60rem] flex-1 flex-col rounded-xl border p-6"
                        style={{
                            background: "var(--card-color,#ffffff)",
                            borderColor: "var(--stroke,#e8dcc8)",
                            boxShadow: '0 8px 28px rgba(193,18,31,0.06)',
                        }}
                    >
                        <div className="min-h-0 w-full flex-1">
                            <GeneralChart type={'line'} data={chartData} showLegend={false} showTooltip={true} />
                        </div>
                    </div>

                    {/* 底部注解（可选） */}
                    {annotation && (
                        <div className="flex items-center gap-2">
                            <span className="block h-2 w-2 rotate-45 flex-shrink-0" style={{ background: "var(--secondary-color,#b8860b)" }} />
                            <p
                                className="text-sm leading-relaxed break-words"
                                style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {annotation}
                            </p>
                        </div>
                    )}
                </div>

                {/* 底部居中烫金细线装饰条 */}
                <div
                    className="absolute bottom-0 left-1/2 h-1 w-40 -translate-x-1/2"
                    style={{ background: "var(--primary-color,#c1121f)" }}
                />
            </div>
        </>
    )
}

/** 五角星装饰组件（纯 SVG，烫金描边） */
const Star: React.FC<{ cx: number; cy: number; size: number }> = ({ cx, cy, size }) => {
    const points = Array.from({ length: 5 }, (_, i) => {
        const outer = i * (Math.PI * 2 / 5) - Math.PI / 2
        const inner = outer + Math.PI / 5
        const ox = cx + Math.cos(outer) * size
        const oy = cy + Math.sin(outer) * size
        const ix = cx + Math.cos(inner) * (size * 0.42)
        const iy = cy + Math.sin(inner) * (size * 0.42)
        return `${ox.toFixed(1)},${oy.toFixed(1)} ${ix.toFixed(1)},${iy.toFixed(1)}`
    }).join(' ')
    return (
        <polygon
            points={points}
            fill="var(--secondary-color,#b8860b)"
            fillOpacity={0.35}
            stroke="var(--secondary-color,#b8860b)"
            strokeOpacity={0.5}
            strokeWidth={0.8}
        />
    )
}

export default LineChart
