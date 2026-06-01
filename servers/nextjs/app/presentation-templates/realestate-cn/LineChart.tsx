"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'realestate-cn-line-chart'
export const layoutName = '趋势分析'
export const layoutDescription = '房产建筑风趋势页：极简细体大标题 + 折线趋势图 + 注解。高级灰底配金铜点缀，建筑剪影与细线分隔装饰，超大留白，纯 CSS/SVG 离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('成交均价走势').meta({
        description: "趋势页主标题（中文，简短克制）",
    }),
    description: z.string().min(4).max(50).default('近八个季度核心地段住宅成交均价稳步上行，市场预期持续修复。').meta({
        description: "对趋势的简要说明（一句话）",
    }),
    chartData: z.object({
        type: z.literal('line').default('line').meta({ description: "图表类型，固定为折线" }),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "数据点名称，如季度/年份" }),
            value: z.number().meta({ description: "成交均价数值（单位:千元/㎡）" }),
        })).min(4).max(8).meta({ description: "折线数据点序列" }),
    }).default({
        type: 'line',
        data: [
            { name: '23Q1', value: 48 },
            { name: '23Q2', value: 51 },
            { name: '23Q3', value: 53 },
            { name: '23Q4', value: 56 },
            { name: '24Q1', value: 59 },
            { name: '24Q2', value: 63 },
            { name: '24Q3', value: 68 },
            { name: '24Q4', value: 74 },
        ],
    }).meta({ description: "折线趋势图表数据" }),
    annotation: z.string().min(2).max(30).default('数据来源：城市住宅成交监测，单位:千元/㎡').meta({
        description: "图表下方注解/数据来源（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const LineChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '成交均价走势'
    const description = slideData?.description || '近八个季度核心地段住宅成交均价稳步上行，市场预期持续修复。'
    const chartData = slideData?.chartData?.data || []
    const annotation = slideData?.annotation || '数据来源：城市住宅成交监测，单位:千元/㎡'

    const values = chartData.map((d) => (typeof d?.value === 'number' ? d.value : 0))
    const peak = values.length ? Math.max(...values) : 0
    const base = values.length ? values[0] : 0
    const growth = base ? Math.round(((peak - base) / base) * 100) : 0

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f4f4f5)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：极简建筑剪影 + 细线分隔，纯 SVG */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    {/* 底部建筑剪影（极简线条天际线） */}
                    <g stroke="var(--secondary-color,#3f3f46)" strokeOpacity="0.06" strokeWidth="1" fill="none">
                        <rect x="60" y="498" width="64" height="222" />
                        <rect x="124" y="540" width="48" height="180" />
                        <rect x="172" y="468" width="80" height="252" />
                        <rect x="252" y="556" width="40" height="164" />
                        <line x1="92" y1="498" x2="92" y2="720" />
                        <line x1="212" y1="468" x2="212" y2="720" />
                    </g>
                    {/* 顶部细分割线 */}
                    <line x1="0" y1="120" x2="1280" y2="120" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                    {/* 金铜细斜线点缀 */}
                    <line x1="980" y1="0" x2="1280" y2="220" stroke="var(--primary-color,#b08d57)" strokeOpacity="0.10" strokeWidth="1.5" />
                    <line x1="1060" y1="0" x2="1280" y2="160" stroke="var(--primary-color,#b08d57)" strokeOpacity="0.06" strokeWidth="1.5" />
                </svg>

                {/* 右上角金铜细环点缀 */}
                <div
                    className="absolute"
                    style={{
                        top: '52px', right: '64px', width: '10px', height: '10px', borderRadius: '9999px',
                        background: "var(--primary-color,#b08d57)",
                        boxShadow: '0 0 0 5px rgba(176,141,87,0.14)',
                    }}
                    aria-hidden="true"
                />

                <div className="relative z-10 flex h-full flex-col px-20 pt-12 pb-10">
                    {/* 顶部页眉：编号标签 */}
                    <div className="flex items-center gap-4">
                        <span
                            className="text-xs font-light tracking-[0.4em] break-words"
                            style={{ color: "var(--primary-color,#b08d57)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            TREND
                        </span>
                        <span className="h-px w-12" style={{ background: "var(--primary-color,#b08d57)", opacity: 0.5 }} />
                        <span
                            className="text-xs font-light tracking-[0.3em] break-words"
                            style={{ color: "var(--background-text,#27272a)", opacity: 0.55, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            趋势分析
                        </span>
                    </div>

                    {/* 主体：左标题/说明 + 右图表 */}
                    <div className="flex flex-1 items-stretch gap-14 pt-8">
                        {/* 左侧：标题 + 说明 + 增幅 */}
                        <div className="flex w-[32%] flex-shrink-0 flex-col justify-center">
                            <h1
                                className="text-5xl font-light leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div className="mt-6 h-px w-20" style={{ background: "var(--primary-color,#b08d57)" }} />
                            <p
                                className="mt-6 text-base font-light leading-[1.8] break-words"
                                style={{ color: "var(--background-text,#27272a)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {description}
                            </p>

                            {/* 区间增幅 */}
                            <div className="mt-10 flex items-end gap-3">
                                <span
                                    className="text-4xl font-light leading-none"
                                    style={{ color: "var(--primary-color,#b08d57)" }}
                                >
                                    +{growth}%
                                </span>
                                <span
                                    className="pb-1 text-xs font-light leading-relaxed break-words"
                                    style={{ color: "var(--background-text,#27272a)", opacity: 0.55, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    区间累计涨幅
                                </span>
                            </div>
                        </div>

                        {/* 右侧：图表卡片 */}
                        <div
                            className="flex flex-1 flex-col rounded-sm border p-7"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e4e4e7)" }}
                        >
                            <div className="min-h-0 w-full flex-1">
                                <GeneralChart type={'line'} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>
                    </div>

                    {/* 底部注解：细线分隔 + 数据来源 */}
                    <div className="mt-6 flex items-center gap-4 pt-5" style={{ borderTop: "1px solid var(--stroke,#e4e4e7)" }}>
                        <span
                            className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                            style={{ background: "var(--primary-color,#b08d57)" }}
                            aria-hidden="true"
                        />
                        <span
                            className="text-xs font-light leading-relaxed break-words"
                            style={{ color: "var(--background-text,#27272a)", opacity: 0.5, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {annotation}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LineChart
