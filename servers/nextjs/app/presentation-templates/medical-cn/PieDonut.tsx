"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'medical-cn-pie-donut'
export const layoutName = '占比分析'
export const layoutDescription = '医疗健康风占比分析页：左侧标题/说明 + 饼图，右侧自绘图例与占比。清爽无衬线、圆角卡片、脉搏波形与十字装饰、蓝绿点缀，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('门诊就诊构成').meta({
        description: "占比分析页主标题（中文，简短）",
    }),
    description: z.string().min(4).max(50).default('按科室统计本季度门诊量占比，呼吸内科与心血管科居前。').meta({
        description: "对占比数据的简要说明（可选）",
    }),
    chartData: z.object({
        type: z.literal('pie').default('pie').meta({ description: "图表类型，固定为饼图" }),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "分类名称，如科室/人群" }),
            value: z.number().meta({ description: "该分类的数值或占比" }),
        })).min(3).max(6).meta({ description: "饼图分类数据（3-6 项）" }),
    }).default({
        type: 'pie',
        data: [
            { name: '呼吸内科', value: 32 },
            { name: '心血管科', value: 26 },
            { name: '内分泌科', value: 18 },
            { name: '消化内科', value: 14 },
            { name: '其他科室', value: 10 },
        ],
    }).meta({ description: "占比分析图表数据" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

// 与图表配色保持一致的图例色板（蓝绿主题，由深到浅）
const LEGEND_COLORS = [
    'var(--primary-color,#0ea5e9)',
    'var(--secondary-color,#10b981)',
    '#38bdf8',
    '#34d399',
    '#7dd3fc',
    '#6ee7b7',
]

const PieDonut: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '门诊就诊构成'
    const description = slideData?.description || '按科室统计本季度门诊量占比，呼吸内科与心血管科居前。'
    const chartData = slideData?.chartData?.data || []
    const total = chartData.reduce((sum, item) => sum + (item?.value || 0), 0) || 1

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f8fafc)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：脉搏波形 + 十字 + 柔和光晕 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="medPieGlow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* 左上柔和光晕 */}
                    <circle cx="120" cy="80" r="260" fill="url(#medPieGlow)" />
                    {/* 顶部脉搏波形 */}
                    <path
                        d="M0 64 L260 64 L300 28 L340 104 L380 44 L420 64 L1280 64"
                        fill="none"
                        stroke="var(--primary-color,#0ea5e9)"
                        strokeOpacity="0.18"
                        strokeWidth="2.5"
                    />
                </svg>

                {/* 右下角十字母题装饰 */}
                <div className="absolute bottom-8 right-10" aria-hidden="true">
                    <svg width="56" height="56" viewBox="0 0 56 56">
                        <rect x="22" y="6" width="12" height="44" rx="4" fill="var(--secondary-color,#10b981)" fillOpacity="0.14" />
                        <rect x="6" y="22" width="44" height="12" rx="4" fill="var(--secondary-color,#10b981)" fillOpacity="0.14" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：标题 + 说明 + 饼图 */}
                    <div className="flex w-[56%] flex-shrink-0 flex-col justify-center">
                        <div className="flex items-center gap-3">
                            {/* 十字小标识 */}
                            <span
                                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                                style={{ background: "var(--primary-color,#0ea5e9)" }}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                                    <rect x="6" y="1.5" width="4" height="13" rx="1.5" fill="var(--primary-text,#ffffff)" />
                                    <rect x="1.5" y="6" width="13" height="4" rx="1.5" fill="var(--primary-text,#ffffff)" />
                                </svg>
                            </span>
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                        <p
                            className="mt-4 text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        {/* 饼图卡片 */}
                        <div
                            className="mt-7 flex flex-1 flex-col rounded-2xl border p-5 shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                        >
                            <div className="min-h-0 w-full flex-1">
                                <GeneralChart type={'pie'} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>
                    </div>

                    {/* 右侧：自绘图例列表（name + 占比 + 色块） */}
                    <div className="flex flex-1 flex-col justify-center">
                        <span
                            className="mb-5 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-semibold break-words"
                            style={{
                                color: "var(--secondary-color,#10b981)",
                                background: "rgba(16,185,129,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            占比明细
                        </span>

                        <div className="flex flex-col gap-3">
                            {chartData.map((item, i) => {
                                const pct = Math.round(((item?.value || 0) / total) * 1000) / 10
                                const color = LEGEND_COLORS[i % LEGEND_COLORS.length]
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 rounded-xl border px-4 py-3 shadow-sm"
                                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                                    >
                                        {/* 占比色块 */}
                                        <span
                                            className="h-4 w-4 flex-shrink-0 rounded-md"
                                            style={{ background: color }}
                                        />
                                        <span
                                            className="flex-1 text-base font-medium leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.name}
                                        </span>
                                        <span
                                            className="text-lg font-black leading-none"
                                            style={{ color: "var(--primary-color,#0ea5e9)" }}
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
        </>
    )
}

export default PieDonut
