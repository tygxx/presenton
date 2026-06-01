"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'gov-cn-pie-donut'
export const layoutName = '占比分析'
export const layoutDescription = '党政政务风占比分析页：居中对称烫金标题，左侧饼图，右侧自绘图例（名称+占比色块）。米白底+中国红+烫金，纯 CSS/SVG 装饰，离线可渲染。仅在有结构占比数据时使用。'

const schema = z.object({
    title: z.string().min(2).max(20).default('财政支出结构占比').meta({
        description: "占比分析页主标题（中文，庄重简短）",
    }),
    description: z.string().min(0).max(50).default('全年财政资金重点投向民生与基础建设，分配科学、保障有力。').meta({
        description: "对占比数据的简要说明（可选）",
    }),
    chartData: z.object({
        type: z.literal('pie').default('pie'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "占比项名称，如『民生保障』" }),
            value: z.number().meta({ description: "占比项数值（系统自动换算为百分比）" }),
        })).min(3).max(6).meta({ description: "占比明细数据，3 至 6 项" }),
    }).default({
        type: 'pie',
        data: [
            { name: '民生保障', value: 38 },
            { name: '基础建设', value: 24 },
            { name: '教育科技', value: 18 },
            { name: '生态环保', value: 12 },
            { name: '行政管理', value: 8 },
        ],
    }).meta({ description: "饼图占比数据" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

// 与 GeneralChart 内置调色板（--graph-0..n）对齐的图例色块，确保图例颜色与饼图扇区一致
const LEGEND_COLORS = [
    'var(--graph-0,#3b82f6)',
    'var(--graph-1,#ef4444)',
    'var(--graph-2,#10b981)',
    'var(--graph-3,#f59e0b)',
    'var(--graph-4,#8b5cf6)',
    'var(--graph-5,#06b6d4)',
]

const PieDonut: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '财政支出结构占比'
    const description = slideData?.description || '全年财政资金重点投向民生与基础建设，分配科学、保障有力。'
    const chartData = slideData?.chartData?.data || []
    const total = chartData.reduce((sum, item) => sum + Math.abs(Number(item?.value) || 0), 0)

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
                {/* 背景装饰层：对称烫金细线 + 华表/纹样意象 + 五角星点缀 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="govPieGold" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="govPieHalo" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--primary-color,#c1121f)" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="var(--primary-color,#c1121f)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 顶部居中红色光晕 */}
                    <rect x="340" y="-260" width="600" height="600" fill="url(#govPieHalo)" />
                    {/* 左右对称烫金回纹竖线 */}
                    <line x1="56" y1="80" x2="56" y2="640" stroke="var(--secondary-color,#b8860b)" strokeOpacity="0.28" strokeWidth="1" />
                    <line x1="1224" y1="80" x2="1224" y2="640" stroke="var(--secondary-color,#b8860b)" strokeOpacity="0.28" strokeWidth="1" />
                    {/* 底部对称纹样点阵 */}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <circle key={`l${i}`} cx={120 + i * 14} cy="678" r="1.6" fill="var(--secondary-color,#b8860b)" fillOpacity="0.4" />
                    ))}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <circle key={`r${i}`} cx={1160 - i * 14} cy="678" r="1.6" fill="var(--secondary-color,#b8860b)" fillOpacity="0.4" />
                    ))}
                </svg>

                {/* 主体内容：居中对称标题区 + 双栏（饼图 / 图例） */}
                <div className="relative z-10 flex h-full flex-col px-16 pt-10 pb-12">
                    {/* 居中对称标题 */}
                    <div className="flex flex-shrink-0 flex-col items-center text-center">
                        <div className="flex items-center gap-3">
                            <Star />
                            <span
                                className="text-sm font-medium tracking-wide break-words"
                                style={{ color: "var(--secondary-color,#b8860b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                占比分析
                            </span>
                            <Star />
                        </div>
                        <h1
                            className="mt-3 text-4xl font-black leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        {/* 居中对称烫金分隔线 */}
                        <div className="mt-4 h-px w-64" style={{ background: "linear-gradient(90deg, transparent, var(--secondary-color,#b8860b), transparent)" }} />
                        {description && (
                            <p
                                className="mt-4 max-w-3xl text-base leading-relaxed break-words"
                                style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {description}
                            </p>
                        )}
                    </div>

                    {/* 双栏主体 */}
                    <div className="mt-8 flex min-h-0 flex-1 items-stretch gap-10">
                        {/* 左侧：饼图卡片 */}
                        <div
                            className="flex w-[46%] flex-shrink-0 flex-col rounded-2xl border p-5"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e8dcc8)" }}
                        >
                            <div className="min-h-0 w-full flex-1">
                                <GeneralChart type={'pie'} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>

                        {/* 右侧：自绘图例（名称 + 占比色块） */}
                        <div className="flex flex-1 flex-col justify-center gap-3">
                            {chartData.map((item, i) => {
                                const value = Math.abs(Number(item?.value) || 0)
                                const percent = total > 0 ? Math.round((value / total) * 100) : 0
                                const swatch = LEGEND_COLORS[i % LEGEND_COLORS.length]
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 rounded-xl border px-5 py-3"
                                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e8dcc8)" }}
                                    >
                                        {/* 占比色块 */}
                                        <span
                                            className="h-4 w-4 flex-shrink-0 rounded-sm"
                                            style={{ background: swatch }}
                                            aria-hidden="true"
                                        />
                                        {/* 名称 */}
                                        <span
                                            className="flex-1 text-base font-semibold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.name || `项目 ${i + 1}`}
                                        </span>
                                        {/* 占比百分比 */}
                                        <span
                                            className="flex-shrink-0 text-xl font-black leading-none"
                                            style={{ color: "var(--primary-color,#c1121f)" }}
                                        >
                                            {percent}
                                            <span className="ml-0.5 text-sm font-bold" style={{ color: "var(--secondary-color,#b8860b)" }}>%</span>
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

// 五角星点缀（对称构图母题）
const Star: React.FC = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M12 2l2.9 6.26L21.6 9l-5 4.6L18 21l-6-3.4L6 21l1.4-7.4-5-4.6 6.7-.74L12 2z"
            fill="var(--secondary-color,#b8860b)"
        />
    </svg>
)

export default PieDonut
