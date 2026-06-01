"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'education-cn-pie-donut'
export const layoutName = '占比分析'
export const layoutDescription = '教育培训风占比分析页：左侧饼图（GeneralChart type=pie），右侧自绘图例列表（名称 + 占比色块）。书本/灯泡/成长曲线/圆点装饰，明亮米白活力橙蓝，圆角卡片轻松排版。仅在有占比类可量化数据时使用。'

// 图例色块需与饼图切片颜色保持一致：
// GeneralChart 内部按 var(--graph-{n}, fallback) 取色，这里复用同一套表达式。
const LEGEND_COLORS = [
    "var(--graph-0, #3b82f6)",
    "var(--graph-1, #ef4444)",
    "var(--graph-2, #10b981)",
    "var(--graph-3, #f59e0b)",
    "var(--graph-4, #8b5cf6)",
    "var(--graph-5, #06b6d4)",
]

const schema = z.object({
    title: z.string().min(2).max(20).default('学习时间分布').meta({
        description: "占比分析页主标题（中文，简短有力）",
    }),
    description: z.string().min(4).max(50).optional().default('一周学习投入的各模块占比，帮助学员合理规划节奏。').meta({
        description: "可选说明，一句话点明占比图想说明的结论",
    }),
    chartData: z.object({
        type: z.literal('pie').default('pie').meta({
            description: "图表类型，占比分析固定为饼图 pie",
        }),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({
                description: "占比项名称，如『理论课』『实操训练』",
            }),
            value: z.number().meta({
                description: "占比项数值，可为百分比或绝对值，系统按总和换算占比",
            }),
        })).min(3).max(6).meta({
            description: "占比数据（3-6 项）",
        }),
    }).default({
        type: 'pie',
        data: [
            { name: '理论课', value: 30 },
            { name: '实操训练', value: 28 },
            { name: '小组研讨', value: 18 },
            { name: '自主复习', value: 14 },
            { name: '测评答疑', value: 10 },
        ],
    }).meta({ description: "饼图占比数据" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const PieDonut: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '学习时间分布'
    const description = slideData?.description ?? '一周学习投入的各模块占比，帮助学员合理规划节奏。'
    const chartData = (slideData?.chartData?.data && slideData.chartData.data.length > 0)
        ? slideData.chartData.data
        : [
            { name: '理论课', value: 30 },
            { name: '实操训练', value: 28 },
            { name: '小组研讨', value: 18 },
            { name: '自主复习', value: 14 },
            { name: '测评答疑', value: 10 },
        ]

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
                    background: "var(--background-color,#fffdf7)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：成长曲线 + 圆点 + 灯泡光晕 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="eduPieGrowth" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0.14" />
                        </linearGradient>
                        <radialGradient id="eduPieBulb" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="eduPieBlue" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 右上灯泡光晕 */}
                    <circle cx="1160" cy="110" r="180" fill="url(#eduPieBulb)" />
                    {/* 左下蓝色柔光 */}
                    <circle cx="80" cy="660" r="150" fill="url(#eduPieBlue)" />
                    {/* 贯穿底部的成长曲线 */}
                    <path
                        d="M-20 690 C 220 650, 380 560, 540 520 S 900 430, 1080 320 S 1280 210, 1320 150"
                        fill="none"
                        stroke="url(#eduPieGrowth)"
                        strokeWidth="6"
                        strokeLinecap="round"
                    />
                    {/* 曲线节点圆点 */}
                    <circle cx="540" cy="520" r="9" fill="#2563eb" fillOpacity="0.18" />
                    <circle cx="1080" cy="320" r="9" fill="#f97316" fillOpacity="0.22" />
                </svg>

                {/* 左上书本装饰圆点群 */}
                <div className="absolute left-8 top-7 flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full" style={{ background: "var(--primary-color,#2563eb)", opacity: 0.7 }} />
                    <span className="h-2 w-2 rounded-full" style={{ background: "var(--secondary-color,#f97316)", opacity: 0.7 }} />
                    <span className="h-2 w-2 rounded-full" style={{ background: "var(--stroke,#f1e9d8)" }} />
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full w-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="mb-7 flex items-center gap-4">
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                            style={{ background: "var(--secondary-color,#f97316)", boxShadow: '0 8px 20px rgba(249,115,22,0.24)' }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-pie-slice-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-6 h-6"
                                title="pie chart"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            {description && (
                                <p
                                    className="mt-2 max-w-[40rem] text-base leading-relaxed break-words"
                                    style={{ color: "var(--background-text,#1f2937)", opacity: 0.66, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* 图表 + 图例 */}
                    <div className="flex min-h-0 flex-1 items-stretch gap-8">
                        {/* 左侧：饼图卡片 */}
                        <div
                            className="flex w-[52%] flex-shrink-0 flex-col rounded-3xl border p-6 shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#f1e9d8)" }}
                        >
                            <div className="min-h-0 w-full flex-1">
                                <GeneralChart type={'pie'} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>

                        {/* 右侧：自绘图例列表（名称 + 占比色块） */}
                        <div className="flex min-h-0 flex-1 flex-col justify-center gap-3">
                            {chartData.slice(0, 6).map((item, i) => {
                                const value = Math.abs(Number(item?.value) || 0)
                                const percent = total > 0 ? Math.round((value / total) * 100) : 0
                                const color = LEGEND_COLORS[i % LEGEND_COLORS.length]
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 rounded-2xl border px-5 py-3 shadow-sm"
                                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#f1e9d8)" }}
                                    >
                                        {/* 色块（与饼图切片同色） */}
                                        <span
                                            className="h-9 w-9 flex-shrink-0 rounded-xl"
                                            style={{ background: color }}
                                            aria-hidden="true"
                                        />
                                        {/* 名称 */}
                                        <span
                                            className="min-w-0 flex-1 text-lg font-bold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.name || `项目 ${i + 1}`}
                                        </span>
                                        {/* 占比百分比 */}
                                        <span
                                            className="flex-shrink-0 text-2xl font-black leading-none break-words"
                                            style={{ color, overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
