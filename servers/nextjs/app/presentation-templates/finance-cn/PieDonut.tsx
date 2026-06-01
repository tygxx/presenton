"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'finance-cn-pie-donut'
export const layoutName = '占比分析'
export const layoutDescription = '金融投资风占比分析页：左侧衬线大标题与说明，右侧饼图配自绘图例（名称+占比色块）。深藏青底配香槟金线条，数据感强，仅在有占比构成数据时使用。主题色自动跟随。'

// 与 GeneralChart 饼图取色一致：优先 --graph-{slot}，否则用以下 fallback 顺序
const SLICE_COLORS = [
    'var(--graph-0,#d4af37)',
    'var(--graph-1,#60a5fa)',
    'var(--graph-2,#10b981)',
    'var(--graph-3,#f59e0b)',
    'var(--graph-4,#a78bfa)',
    'var(--graph-5,#22d3ee)',
]

const schema = z.object({
    title: z.string().min(2).max(20).default('资产配置结构').meta({
        description: "占比分析页主标题（中文，简短有力）",
    }),
    description: z.string().min(4).max(50).default('多元资产分散配置，兼顾稳健收益与风险对冲。').meta({
        description: "对占比构成的简要说明（可选）",
    }),
    chartData: z.object({
        type: z.literal('pie').default('pie'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "占比项名称，如资产类别" }),
            value: z.number().meta({ description: "占比数值（可为百分比或金额）" }),
        })).min(3).max(6),
    }).default({
        type: 'pie',
        data: [
            { name: '权益资产', value: 38 },
            { name: '固定收益', value: 26 },
            { name: '另类投资', value: 16 },
            { name: '现金管理', value: 12 },
            { name: '海外配置', value: 8 },
        ],
    }).meta({ description: "饼图占比数据（3-6 项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const PieDonut: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '资产配置结构'
    const description = slideData?.description || '多元资产分散配置，兼顾稳健收益与风险对冲。'
    const chartData = slideData?.chartData?.data || []

    const total = chartData.reduce((sum, item) => sum + Math.abs(Number(item?.value) || 0), 0)

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
                {/* 背景装饰层：数据网格 + 细金线 + 增长曲线 + 棱形 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="finPieGold" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </linearGradient>
                        <pattern id="finPieGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0H0V48" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.45" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {/* 数据网格 */}
                    <rect width="1280" height="720" fill="url(#finPieGrid)" />
                    {/* 右上光晕 */}
                    <rect width="1280" height="720" fill="url(#finPieGold)" />
                    {/* 增长曲线 */}
                    <path
                        d="M-20 600 C 220 560, 420 460, 640 420 S 1080 300, 1320 170"
                        fill="none"
                        stroke="var(--secondary-color,#60a5fa)"
                        strokeOpacity="0.22"
                        strokeWidth="2"
                    />
                    {/* 细金线 */}
                    <line x1="-20" y1="120" x2="1320" y2="120" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.18" strokeWidth="1" />
                    <line x1="-20" y1="640" x2="1320" y2="640" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.12" strokeWidth="1" />
                    {/* 棱形母题 */}
                    <rect x="1140" y="90" width="26" height="26" fill="none" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.5" strokeWidth="1.5" transform="rotate(45 1153 103)" />
                    <rect x="84" y="566" width="18" height="18" fill="none" stroke="var(--secondary-color,#60a5fa)" strokeOpacity="0.5" strokeWidth="1.5" transform="rotate(45 93 575)" />
                </svg>

                {/* 顶部细金线角标 */}
                <div
                    className="absolute top-0 left-0 h-1 w-40"
                    style={{ background: "var(--primary-color,#d4af37)", opacity: 0.85 }}
                />

                {/* 主体内容 */}
                <div className="relative z-10 flex h-full px-16 py-12 gap-12">
                    {/* 左侧：标题 + 说明 + 图例 */}
                    <div className="flex w-[44%] flex-shrink-0 flex-col justify-center">
                        <span
                            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide break-words"
                            style={{
                                color: "var(--primary-color,#d4af37)",
                                background: "rgba(212,175,55,0.12)",
                                border: "1px solid var(--stroke,#334155)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rotate-45"
                                style={{ background: "var(--primary-color,#d4af37)" }}
                            />
                            占比分析
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

                        <div
                            className="my-6 h-1 w-20 rounded-full"
                            style={{ background: "var(--primary-color,#d4af37)" }}
                        />

                        <p
                            className="text-base leading-[1.7] break-words"
                            style={{
                                color: "var(--background-text,#94a3b8)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {description}
                        </p>

                        {/* 自绘图例列表 */}
                        <div className="mt-8 flex flex-col gap-3">
                            {chartData.map((item, i) => {
                                const value = Math.abs(Number(item?.value) || 0)
                                const percent = total > 0 ? Math.round((value / total) * 100) : 0
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between gap-4 rounded-lg px-4 py-2.5"
                                        style={{
                                            background: "var(--card-color,#1e293b)",
                                            border: "1px solid var(--stroke,#334155)",
                                        }}
                                    >
                                        <div className="flex min-w-0 items-center gap-3">
                                            <span
                                                className="inline-block h-3.5 w-3.5 flex-shrink-0 rounded-sm"
                                                style={{ background: SLICE_COLORS[i % SLICE_COLORS.length] }}
                                            />
                                            <span
                                                className="text-sm font-medium leading-relaxed break-words"
                                                style={{
                                                    color: "var(--background-text,#e2e8f0)",
                                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                                }}
                                            >
                                                {item?.name}
                                            </span>
                                        </div>
                                        <span
                                            className="flex-shrink-0 text-base font-black tabular-nums"
                                            style={{ color: "var(--primary-color,#d4af37)" }}
                                        >
                                            {percent}%
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 右侧：饼图卡片 */}
                    <div className="flex flex-1 flex-col justify-center">
                        <div
                            className="flex flex-1 flex-col rounded-2xl border p-8 shadow-sm"
                            style={{
                                background: "var(--card-color,#1e293b)",
                                borderColor: "var(--stroke,#334155)",
                            }}
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <span
                                    className="inline-block h-2.5 w-2.5 rotate-45"
                                    style={{ background: "var(--primary-color,#d4af37)" }}
                                />
                                <span
                                    className="text-sm font-semibold leading-relaxed break-words"
                                    style={{
                                        color: "var(--background-text,#94a3b8)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    构成占比
                                </span>
                            </div>
                            <div className="min-h-0 w-full flex-1">
                                <GeneralChart type={'pie'} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PieDonut
