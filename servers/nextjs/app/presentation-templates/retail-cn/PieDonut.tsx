"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'retail-cn-pie-donut'
export const layoutName = '占比分析'
export const layoutDescription = '电商新零售占比分析页：左侧潮流大标题 + 撞色卡片饼图，右侧自绘价签式图例（名称 + 占比色块）。GeneralChart type=pie，纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('全渠道销售占比').meta({
        description: "占比分析页主标题（中文，潮流有冲击力）",
    }),
    description: z.string().min(0).max(50).default('双11大促期间各渠道GMV构成，直播电商成为增长第一引擎。').meta({
        description: "对占比数据的简要说明（可选）",
    }),
    chartData: z.object({
        type: z.literal('pie').default('pie'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "渠道/品类名称，如直播电商" }),
            value: z.number().meta({ description: "该渠道占比数值（GMV）" }),
        })).min(3).max(6).meta({ description: "饼图各分段数据" }),
    }).default({
        type: 'pie',
        data: [
            { name: '直播电商', value: 38 },
            { name: '货架商城', value: 26 },
            { name: '私域社群', value: 18 },
            { name: '门店到家', value: 12 },
            { name: '其他渠道', value: 6 },
        ],
    }).meta({ description: "饼图占比数据" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

// 与 GeneralChart 内部 CHART_COLORS 一致的图例兜底色板（按渐变 var(--graph-N) 顺序）
const LEGEND_FALLBACK_COLORS = [
    'var(--graph-0,#3b82f6)',
    'var(--graph-1,#ef4444)',
    'var(--graph-2,#10b981)',
    'var(--graph-3,#f59e0b)',
    'var(--graph-4,#8b5cf6)',
    'var(--graph-5,#06b6d4)',
]

const PieDonut: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '全渠道销售占比'
    const description = slideData?.description || '双11大促期间各渠道GMV构成，直播电商成为增长第一引擎。'
    const chartType = slideData?.chartData?.type || 'pie'
    const chartData = slideData?.chartData?.data || []
    const total = chartData.reduce((sum, item) => sum + (Number(item?.value) || 0), 0) || 1

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景撞色大色块 + 活力几何装饰层 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    {/* 右上撞色斜切大色块 */}
                    <div
                        className="absolute top-0 right-0 h-[44%] w-[40%]"
                        style={{
                            background: "var(--secondary-color,#f59e0b)",
                            clipPath: 'polygon(28% 0, 100% 0, 100% 100%, 0 100%)',
                            opacity: 0.16,
                        }}
                    />
                    {/* 左下品牌色圆角色块 */}
                    <div
                        className="absolute -bottom-16 -left-16 h-64 w-64 rounded-[3rem]"
                        style={{ background: "var(--primary-color,#db2777)", opacity: 0.08, transform: 'rotate(18deg)' }}
                    />
                    {/* 活力几何描边圆 */}
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <circle cx="1180" cy="120" r="46" fill="none" stroke="var(--primary-color,#db2777)" strokeOpacity="0.18" strokeWidth="6" />
                        <circle cx="64" cy="120" r="9" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.5" />
                        <circle cx="96" cy="150" r="5" fill="var(--primary-color,#db2777)" fillOpacity="0.4" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full gap-8 px-14 py-12">
                    {/* 左侧：标题 + 说明 + 饼图卡片 */}
                    <div className="flex w-[56%] flex-shrink-0 flex-col">
                        {/* 潮流眉标价签 */}
                        <span
                            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold break-words"
                            style={{
                                background: "var(--primary-color,#db2777)",
                                color: "var(--primary-text,#ffffff)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            />
                            占比分析 · 新零售
                        </span>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        {/* 撞色下划条 */}
                        <div className="mt-4 flex items-center gap-1.5">
                            <span className="h-1.5 w-12 rounded-full" style={{ background: "var(--primary-color,#db2777)" }} />
                            <span className="h-1.5 w-6 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                        </div>

                        {description ? (
                            <p
                                className="mt-4 max-w-[30rem] text-base leading-relaxed break-words"
                                style={{ color: "var(--background-text,#18181b)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {description}
                            </p>
                        ) : null}

                        {/* 饼图卡片 */}
                        <div
                            className="mt-6 flex min-h-0 flex-1 flex-col rounded-3xl border-2 p-5 shadow-sm"
                            style={{ background: "var(--card-color,#fdf2f8)", borderColor: "var(--stroke,#fbcfe8)" }}
                        >
                            <div className="min-h-0 w-full flex-1">
                                <GeneralChart type={chartType} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>
                    </div>

                    {/* 右侧：自绘价签式图例列表 */}
                    <div className="flex flex-1 flex-col justify-center">
                        <span
                            className="mb-4 text-sm font-bold uppercase break-words"
                            style={{ color: "var(--primary-color,#db2777)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            渠道构成 · 图例
                        </span>

                        <div className="flex flex-col gap-3">
                            {chartData.map((item, i) => {
                                const value = Number(item?.value) || 0
                                const percent = Math.round((value / total) * 100)
                                const color = LEGEND_FALLBACK_COLORS[i % LEGEND_FALLBACK_COLORS.length]
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-2xl px-4 py-3 shadow-sm"
                                        style={{ background: "var(--card-color,#fdf2f8)", borderLeft: '6px solid', borderLeftColor: color }}
                                    >
                                        {/* 占比色块 */}
                                        <span
                                            className="h-5 w-5 flex-shrink-0 rounded-md"
                                            style={{ background: color }}
                                        />
                                        <span
                                            className="flex-1 text-base font-bold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.name || `渠道${i + 1}`}
                                        </span>
                                        {/* 价签式占比 */}
                                        <span
                                            className="flex-shrink-0 rounded-lg px-3 py-1 text-lg font-black leading-none"
                                            style={{ background: color, color: "var(--primary-text,#ffffff)" }}
                                        >
                                            {percent}%
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PieDonut
