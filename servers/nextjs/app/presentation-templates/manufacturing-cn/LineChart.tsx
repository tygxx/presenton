"use client";

import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'manufacturing-cn-line-chart'
export const layoutName = '趋势分析'
export const layoutDescription = '智能制造趋势页：工业深灰底 + 蓝橙双色，左侧标题/说明与折线注解，右侧精密网格折线趋势图。装饰用齿轮、产线与金属质感线条，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('产能持续爬坡').meta({
        description: "趋势页主标题（中文，简短有力）",
    }),
    description: z.string().min(4).max(50).default('智能产线投产后月度产能稳步攀升，良率同步走高。').meta({
        description: "对趋势的简要说明",
    }),
    chartData: z.object({
        type: z.enum(['line', 'area']).default('line'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "数据点名称，如月份/季度" }),
            value: z.number().meta({ description: "数据点数值，如产能/良率" }),
        })).min(4).max(8),
    }).default({
        type: 'line',
        data: [
            { name: '1月', value: 62 },
            { name: '2月', value: 68 },
            { name: '3月', value: 74 },
            { name: '4月', value: 81 },
            { name: '5月', value: 90 },
            { name: '6月', value: 97 },
        ],
    }).meta({ description: "折线趋势数据" }),
    annotation: z.string().max(30).default('Q2 自动化改造完成，产能环比提升 18%。').meta({
        description: "趋势注解（可选），点出关键拐点或结论",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const LineChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '产能持续爬坡'
    const description = slideData?.description || '智能产线投产后月度产能稳步攀升，良率同步走高。'
    const chartType = slideData?.chartData?.type || 'line'
    const chartData = slideData?.chartData?.data || [
        { name: '1月', value: 62 },
        { name: '2月', value: 68 },
        { name: '3月', value: 74 },
        { name: '4月', value: 81 },
        { name: '5月', value: 90 },
        { name: '6月', value: 97 },
    ]
    const annotation = slideData?.annotation || 'Q2 自动化改造完成，产能环比提升 18%。'

    const values = chartData.map((d) => (typeof d.value === 'number' ? d.value : 0))
    const peak = values.length ? Math.max(...values) : 0
    const start = values.length ? values[0] : 0
    const growth = start ? Math.round(((peak - start) / start) * 100) : 0

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
                {/* 背景装饰层：精密网格 + 金属质感线条 + 齿轮母题 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern id="mfgGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0H0V40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.5" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="mfgMetal" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="mfgGlow" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* 精密网格 */}
                    <rect width="1280" height="720" fill="url(#mfgGrid)" />
                    {/* 蓝色光晕 */}
                    <ellipse cx="1080" cy="160" rx="360" ry="280" fill="url(#mfgGlow)" />

                    {/* 金属质感横向线条（产线传送带意象） */}
                    <rect x="0" y="612" width="1280" height="3" fill="url(#mfgMetal)" />
                    <rect x="0" y="640" width="1280" height="1.5" fill="var(--stroke,#374151)" opacity="0.6" />

                    {/* 右上角齿轮母题 */}
                    <g transform="translate(1170 86)" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.28" strokeWidth="2.5">
                        <circle r="48" />
                        <circle r="20" />
                        {Array.from({ length: 12 }).map((_, i) => {
                            const a = (i * Math.PI) / 6
                            const x1 = Math.cos(a) * 48
                            const y1 = Math.sin(a) * 48
                            const x2 = Math.cos(a) * 60
                            const y2 = Math.sin(a) * 60
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                        })}
                    </g>
                    {/* 小齿轮 */}
                    <g transform="translate(1238 168)" fill="none" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.32" strokeWidth="2">
                        <circle r="24" />
                        <circle r="9" />
                        {Array.from({ length: 8 }).map((_, i) => {
                            const a = (i * Math.PI) / 4
                            const x1 = Math.cos(a) * 24
                            const y1 = Math.sin(a) * 24
                            const x2 = Math.cos(a) * 33
                            const y2 = Math.sin(a) * 33
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                        })}
                    </g>
                </svg>

                {/* 顶部蓝橙强调线 */}
                <div
                    className="absolute top-0 left-0 h-1 w-full"
                    style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#f97316))" }}
                />

                {/* 主体内容 */}
                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：标签 + 标题 + 说明 + 关键指标 + 注解 */}
                    <div className="flex w-[40%] flex-shrink-0 flex-col justify-center">
                        <span
                            className="mb-5 inline-flex w-fit items-center gap-2 rounded-sm px-3 py-1.5 text-xs font-semibold tracking-wide break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.12)",
                                border: "1px solid rgba(249,115,22,0.35)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg"
                                strokeColor="currentColor"
                                color="var(--secondary-color,#f97316)"
                                className="w-4 h-4"
                                title="trend"
                            />
                            智能制造 · 趋势分析
                        </span>

                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div className="my-5 h-1 w-16 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />

                        <p
                            className="text-base leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.88, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        {/* 关键指标 */}
                        <div className="mt-8 flex items-stretch gap-4">
                            <div
                                className="flex flex-1 flex-col rounded-sm px-4 py-3"
                                style={{ background: "var(--card-color,#111827)", border: "1px solid var(--stroke,#374151)" }}
                            >
                                <span className="text-3xl font-black leading-none" style={{ color: "var(--primary-color,#3b82f6)" }}>
                                    {peak}
                                </span>
                                <span className="mt-1.5 text-xs leading-relaxed break-words" style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    峰值产能（KPCS）
                                </span>
                            </div>
                            <div
                                className="flex flex-1 flex-col rounded-sm px-4 py-3"
                                style={{ background: "var(--card-color,#111827)", border: "1px solid var(--stroke,#374151)" }}
                            >
                                <span className="text-3xl font-black leading-none" style={{ color: "var(--secondary-color,#f97316)" }}>
                                    +{growth}%
                                </span>
                                <span className="mt-1.5 text-xs leading-relaxed break-words" style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    区间累计增幅
                                </span>
                            </div>
                        </div>

                        {/* 趋势注解 */}
                        {annotation && (
                            <div
                                className="mt-6 flex items-start gap-3 rounded-sm px-4 py-3"
                                style={{ background: "rgba(59,130,246,0.10)", borderLeft: "3px solid var(--primary-color,#3b82f6)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-color,#3b82f6)"
                                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                                    title="gear"
                                />
                                <span
                                    className="text-sm leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {annotation}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* 右侧：折线趋势图卡片 */}
                    <div
                        className="flex flex-1 flex-col rounded-sm p-6"
                        style={{ background: "var(--card-color,#111827)", border: "1px solid var(--stroke,#374151)" }}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <span
                                className="text-sm font-semibold break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                月度产能趋势
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "var(--primary-color,#3b82f6)" }} />
                                <span className="text-xs break-words" style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    实测产能
                                </span>
                            </div>
                        </div>
                        <div className="min-h-0 w-full flex-1">
                            <GeneralChart type={chartType} data={chartData} showLegend={false} showTooltip={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LineChart
