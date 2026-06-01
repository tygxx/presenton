"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'food-cn-pie-donut'
export const layoutName = '占比分析'
export const layoutDescription = '美食餐饮风占比分析页：左侧圆盘构图饼图（GeneralChart pie），右侧自绘图例与占比色块。暖米底配食欲橙红，焦糖金描边、餐具点缀，纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('招牌品类销售占比').meta({
        description: "占比分析主标题（中文，简短）",
    }),
    description: z.string().min(2).max(50).default('本季度各招牌品类销售额构成，热门主食与人气小吃稳居前列。').meta({
        description: "对占比数据的简要说明（可选）",
    }),
    chartData: z.object({
        type: z.literal('pie').default('pie').meta({ description: "图表类型，固定为饼图" }),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "品类名称，如『招牌牛肉面』" }),
            value: z.number().meta({ description: "该品类的占比或销售额数值" }),
        })).min(3).max(6).meta({ description: "各品类占比数据项（3-6 项）" }),
    }).default({
        type: 'pie',
        data: [
            { name: '招牌牛肉面', value: 32 },
            { name: '秘制烤肉', value: 24 },
            { name: '人气小吃', value: 18 },
            { name: '甜品饮品', value: 14 },
            { name: '时令套餐', value: 12 },
        ],
    }).meta({ description: "饼图数据" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

// 暖色食欲调色板（焦糖橙、辣椒红、金黄、姜黄、奶油棕、莓果红），与图表 var(--graph-N) 保持一致
const SLICE_FALLBACKS = ['#e8590c', '#c92a2a', '#f08c00', '#d9480f', '#e67700', '#a61e1e']
const sliceColor = (i: number) => `var(--graph-${i % 6}, ${SLICE_FALLBACKS[i % SLICE_FALLBACKS.length]})`

const PieDonut: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '招牌品类销售占比'
    const description = slideData?.description || '本季度各招牌品类销售额构成，热门主食与人气小吃稳居前列。'
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
                    background: "var(--background-color,#fdf6ec)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：暖色光晕 + 圆盘构图 + 焦糖金圆环 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="foodPieGlow" cx="28%" cy="40%" r="55%">
                                <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="foodPieRim" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.04" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#foodPieGlow)" />
                        {/* 左侧大圆盘母题 */}
                        <circle cx="360" cy="370" r="280" fill="url(#foodPieRim)" />
                        <circle cx="360" cy="370" r="282" fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity="0.10" strokeWidth="2" />
                        {[0, 1, 2].map((i) => (
                            <circle key={i} cx="360" cy="370" r={300 + i * 26} fill="none" stroke="var(--stroke,#f0e0cc)" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="2 10" />
                        ))}
                        {/* 右上角焦糖金弧线点缀 */}
                        <circle cx="1180" cy="-40" r="180" fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity="0.08" strokeWidth="2" />
                        <circle cx="1180" cy="-40" r="230" fill="none" stroke="var(--secondary-color,#c92a2a)" strokeOpacity="0.06" strokeWidth="2" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full px-16 py-12 gap-12">
                    {/* 左侧：圆盘饼图 */}
                    <div className="flex w-[46%] flex-shrink-0 flex-col">
                        {/* 标题区 */}
                        <div className="flex items-start gap-3">
                            <span
                                className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full shadow-sm"
                                style={{ background: "var(--primary-color,#e8590c)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-pie-slice-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-6 h-6"
                                    title="pie chart"
                                />
                            </span>
                            <div className="flex flex-col">
                                <h1
                                    className="text-4xl font-black leading-[1.25] break-words"
                                    style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {title}
                                </h1>
                                <div className="mt-3 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#c92a2a)" }} />
                            </div>
                        </div>

                        {/* 圆盘餐盘容器 */}
                        <div className="mt-6 flex flex-1 items-center justify-center">
                            <div
                                className="flex aspect-square w-full max-w-[360px] items-center justify-center rounded-full p-5 shadow-sm"
                                style={{
                                    background: "var(--card-color,#fffaf2)",
                                    border: "10px solid var(--stroke,#f0e0cc)",
                                    boxShadow: "0 10px 30px rgba(217,72,15,0.10), inset 0 0 0 2px rgba(232,89,12,0.10)",
                                }}
                            >
                                <div className="min-h-0 min-w-0 flex-1" style={{ height: '100%' }}>
                                    <GeneralChart type={'pie'} data={chartData} showLegend={false} showTooltip={true} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右侧：说明 + 自绘图例占比列表 */}
                    <div className="flex flex-1 flex-col justify-center">
                        <p
                            className="text-base leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#3b2412)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        <div className="mt-7 flex flex-col gap-3">
                            {chartData.map((d, i) => {
                                const pct = Math.round(((Number(d?.value) || 0) / total) * 100)
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 rounded-2xl px-5 py-3 shadow-sm"
                                        style={{
                                            background: "var(--card-color,#fffaf2)",
                                            border: "1px solid var(--stroke,#f0e0cc)",
                                        }}
                                    >
                                        {/* 占比色块（圆形，呼应圆盘母题） */}
                                        <span
                                            className="flex-shrink-0 rounded-full"
                                            style={{
                                                width: '18px',
                                                height: '18px',
                                                background: sliceColor(i),
                                                boxShadow: `0 0 0 4px var(--card-color,#fffaf2), 0 0 0 5px var(--stroke,#f0e0cc)`,
                                            }}
                                        />
                                        <span
                                            className="flex-1 text-lg font-bold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {d?.name || `品类${i + 1}`}
                                        </span>
                                        <span
                                            className="flex-shrink-0 text-2xl font-black leading-none"
                                            style={{ color: "var(--primary-color,#e8590c)" }}
                                        >
                                            {pct}
                                            <span className="ml-0.5 text-base font-bold align-top">%</span>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* 底部餐具点缀 */}
                        <div className="mt-6 flex items-center gap-2 self-end opacity-70">
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg"
                                strokeColor="currentColor"
                                color="var(--secondary-color,#c92a2a)"
                                className="w-5 h-5"
                                title="fork and knife"
                            />
                            <span
                                className="text-sm leading-relaxed break-words"
                                style={{ color: "var(--background-text,#3b2412)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                数据来源 · 门店销售系统
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PieDonut
