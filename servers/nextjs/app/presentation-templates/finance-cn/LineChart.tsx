"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'finance-cn-line-chart'
export const layoutName = '趋势分析'
export const layoutDescription = '金融投资风趋势分析页：深藏青底 + 香槟金折线，左侧衬线大标题与说明，右侧数据网格折线图卡片配关键注解。纯 CSS/SVG 装饰，离线可渲染，主题色自动跟随。'

const schema = z.object({
    title: z.string().min(2).max(20).default('净值增长趋势').meta({
        description: "趋势分析页主标题（中文，简短有力）",
    }),
    description: z.string().min(4).max(50).default('基金净值沿增长曲线稳步上行，长期回报跑赢业绩基准。').meta({
        description: "对趋势的简要说明（一句话点出走势）",
    }),
    chartData: z.object({
        type: z.enum(['line']).default('line').meta({
            description: "图表类型，固定为折线图",
        }),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({
                description: "数据点名称，如年份/季度，如『2021』『Q1』",
            }),
            value: z.number().meta({
                description: "数据点数值，如净值/指数点位",
            }),
        })).min(4).max(8).meta({
            description: "折线趋势数据点（4-8 个）",
        }),
    }).default({
        type: 'line',
        data: [
            { name: '2019', value: 100 },
            { name: '2020', value: 118 },
            { name: '2021', value: 142 },
            { name: '2022', value: 137 },
            { name: '2023', value: 169 },
            { name: '2024', value: 205 },
            { name: '2025', value: 248 },
        ],
    }).meta({ description: "折线图数据" }),
    annotation: z.string().max(30).optional().default('累计净值增长 148%，年化回报约 16.2%。').meta({
        description: "趋势注解（可选），点出关键拐点或结论",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const LineChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '净值增长趋势'
    const description = slideData?.description || '基金净值沿增长曲线稳步上行，长期回报跑赢业绩基准。'
    const chartData = slideData?.chartData?.data || []
    const annotation = slideData?.annotation || ''

    const values = chartData.map((d) => Number(d?.value) || 0)
    const first = values.length ? values[0] : 0
    const last = values.length ? values[values.length - 1] : 0
    const delta = first ? Math.round(((last - first) / first) * 100) : 0

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;700;900&family=Noto+Sans+SC:wght@400;500;700&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：数据网格 + 细金线 + 棱形 + 增长曲线光晕 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="finLineGold" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.0" />
                                <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.55" />
                            </linearGradient>
                            <linearGradient id="finLineGlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.14" />
                                <stop offset="100%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0" />
                            </linearGradient>
                            <pattern id="finGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.35" strokeWidth="1" />
                            </pattern>
                        </defs>
                        {/* 数据网格母题 */}
                        <rect width="1280" height="720" fill="url(#finGrid)" />
                        {/* 右下增长曲线光晕 */}
                        <path d="M0 620 C 320 600, 540 520, 760 420 S 1120 200, 1280 120 L 1280 720 L 0 720 Z" fill="url(#finLineGlow)" />
                        {/* 增长曲线母题（细金线） */}
                        <path d="M0 620 C 320 600, 540 520, 760 420 S 1120 200, 1280 120" fill="none" stroke="url(#finLineGold)" strokeWidth="2" />
                        {/* 棱形母题 */}
                        {[
                            { x: 1148, y: 96, s: 9 },
                            { x: 1196, y: 150, s: 6 },
                            { x: 1090, y: 70, s: 5 },
                        ].map((d, i) => (
                            <rect
                                key={i}
                                x={d.x - d.s}
                                y={d.y - d.s}
                                width={d.s * 2}
                                height={d.s * 2}
                                transform={`rotate(45 ${d.x} ${d.y})`}
                                fill="none"
                                stroke="var(--primary-color,#d4af37)"
                                strokeOpacity="0.6"
                                strokeWidth="1.5"
                            />
                        ))}
                    </svg>
                    {/* 顶部细金线 */}
                    <div
                        className="absolute left-0 top-0 h-[3px] w-full"
                        style={{ background: "linear-gradient(90deg, var(--primary-color,#d4af37) 0%, rgba(212,175,55,0) 60%)" }}
                    />
                </div>

                <div className="relative z-10 flex h-full px-16 py-12 gap-12">
                    {/* 左侧：衬线大标题 + 说明 + 涨幅胶囊 */}
                    <div className="flex w-[36%] flex-shrink-0 flex-col justify-center">
                        <span
                            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#d4af37)",
                                background: "rgba(212,175,55,0.10)",
                                border: "1px solid rgba(212,175,55,0.35)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-color,#d4af37)"
                                className="w-4 h-4"
                                title="trend analysis"
                            />
                            趋势分析
                        </span>

                        <h1
                            className="font-black leading-[1.25] break-words"
                            style={{
                                fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                color: "var(--background-text,#e2e8f0)",
                                fontSize: '2.75rem',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        {/* 细金线分隔 */}
                        <div
                            className="my-6 h-[2px] w-20 rounded-full"
                            style={{ background: "var(--primary-color,#d4af37)" }}
                        />

                        <p
                            className="text-base leading-[1.8] break-words"
                            style={{
                                color: "var(--background-text,#e2e8f0)",
                                opacity: 0.82,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {description}
                        </p>

                        {/* 累计涨幅强调 */}
                        <div className="mt-9 flex items-baseline gap-3">
                            <span
                                className="text-5xl font-black leading-none"
                                style={{ color: "var(--primary-color,#d4af37)" }}
                            >
                                {delta >= 0 ? '+' : ''}{delta}%
                            </span>
                            <span
                                className="text-sm leading-relaxed break-words"
                                style={{ color: "var(--background-text,#e2e8f0)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                区间累计变动
                            </span>
                        </div>
                    </div>

                    {/* 右侧：折线图卡片 */}
                    <div className="flex flex-1 flex-col">
                        <div
                            className="flex flex-1 flex-col rounded-2xl border p-6"
                            style={{
                                background: "var(--card-color,#1e293b)",
                                borderColor: "var(--stroke,#334155)",
                                boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                            }}
                        >
                            {/* 图例条 */}
                            <div className="mb-3 flex items-center gap-2">
                                <span
                                    className="inline-block h-1 w-6 rounded-full"
                                    style={{ background: "var(--primary-color,#d4af37)" }}
                                />
                                <span
                                    className="text-xs font-medium break-words"
                                    style={{ color: "var(--background-text,#e2e8f0)", opacity: 0.75, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    净值走势（基期 = 100）
                                </span>
                            </div>

                            <div className="min-h-0 w-full flex-1">
                                <GeneralChart type={'line'} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>

                        {/* 趋势注解 */}
                        {annotation && (
                            <div
                                className="mt-4 flex items-start gap-3 rounded-xl px-4 py-3"
                                style={{
                                    background: "rgba(212,175,55,0.08)",
                                    border: "1px solid rgba(212,175,55,0.28)",
                                }}
                            >
                                <span
                                    className="mt-[3px] inline-block flex-shrink-0"
                                    style={{
                                        width: '10px', height: '10px',
                                        transform: 'rotate(45deg)',
                                        border: "1.5px solid var(--primary-color,#d4af37)",
                                    }}
                                    aria-hidden="true"
                                />
                                <p
                                    className="text-sm leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#e2e8f0)", opacity: 0.88, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {annotation}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LineChart
