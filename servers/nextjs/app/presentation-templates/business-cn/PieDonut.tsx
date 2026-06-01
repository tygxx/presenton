"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'business-cn-pie-donut'
export const layoutName = '占比分析'
export const layoutDescription = '商务风占比分析页：左侧饼图，右侧自绘图例与各分项占比。适用于市场份额、营收结构、成本构成等占比类数据。主题色自动跟随。'

const schema = z.object({
    title: z.string().min(2).max(20).default('营收结构占比').meta({
        description: "占比分析页主标题（中文，简短）",
    }),
    description: z.string().min(0).max(50).optional().default('各业务板块营收贡献分布，核心主业占比稳居首位。').meta({
        description: "对占比数据的简要说明（可选）",
    }),
    chartData: z.object({
        type: z.literal('pie').default('pie'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "分项名称，如业务/区域/产品" }),
            value: z.number().meta({ description: "分项数值（占比将自动按总和计算）" }),
        })).min(3).max(6),
    }).default({
        type: 'pie',
        data: [
            { name: '智能制造', value: 42 },
            { name: '数字服务', value: 26 },
            { name: '海外业务', value: 18 },
            { name: '供应链金融', value: 9 },
            { name: '其他', value: 5 },
        ],
    }).meta({ description: "饼图数据" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

// 与 GeneralChartPrimitives 中 pie 切片配色保持一致的兜底色板
const LEGEND_COLORS = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#ec4899",
    "#6366f1",
]

const PieDonut: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '营收结构占比'
    const description = slideData?.description ?? '各业务板块营收贡献分布，核心主业占比稳居首位。'
    const chartData = slideData?.chartData?.data || []

    const total = chartData.reduce((sum, item) => sum + Math.abs(Number(item?.value) || 0), 0)
    const topShare = total > 0
        ? Math.round((Math.max(...chartData.map((d) => Math.abs(Number(d?.value) || 0))) / total) * 100)
        : 0

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
                {/* 背景装饰：稳健网格 + 几何面板 */}
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 1280 720"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern id="bizPieGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0 L0 0 0 48" fill="none" stroke="var(--stroke,#e2e8f0)" strokeWidth="1" strokeOpacity="0.55" />
                        </pattern>
                        <linearGradient id="bizPiePanel" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#1e3a8a)" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="var(--primary-color,#1e3a8a)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#bizPieGrid)" />
                    <rect x="0" y="0" width="520" height="720" fill="url(#bizPiePanel)" />
                </svg>

                {/* 左上角橙色几何强调母题 */}
                <div className="absolute left-0 top-0 h-1.5 w-40" style={{ background: "var(--secondary-color,#f97316)" }} aria-hidden="true" />
                {/* 右下角深蓝几何块 */}
                <div
                    className="absolute -bottom-16 -right-16 h-56 w-56 rounded-3xl"
                    style={{ background: "var(--primary-color,#1e3a8a)", opacity: 0.06, transform: 'rotate(18deg)' }}
                    aria-hidden="true"
                />

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="flex-shrink-0">
                        <div className="mb-4 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        {description && description.length > 0 && (
                            <p
                                className="mt-3 max-w-[44rem] text-base leading-relaxed break-words"
                                style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {description}
                            </p>
                        )}
                    </div>

                    {/* 主体：左饼图卡片 + 右图例 */}
                    <div className="mt-8 flex min-h-0 flex-1 items-stretch gap-10">
                        {/* 左侧：饼图卡片 */}
                        <div
                            className="flex w-[46%] flex-shrink-0 flex-col rounded-2xl border p-6 shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                        >
                            <div className="min-h-0 w-full flex-1">
                                <GeneralChart type={'pie'} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>

                        {/* 右侧：自绘图例列表 + 占比 */}
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                            {/* 居首占比强调（橙色点缀） */}
                            <div className="mb-5 flex items-baseline gap-3">
                                <span
                                    className="text-5xl font-black leading-[1.2]"
                                    style={{ color: "var(--primary-color,#1e3a8a)" }}
                                >
                                    {topShare}%
                                </span>
                                <span
                                    className="text-sm leading-relaxed break-words"
                                    style={{ color: "var(--secondary-color,#f97316)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    最大分项占比
                                </span>
                            </div>

                            <ul className="flex flex-col gap-3">
                                {chartData.map((item, i) => {
                                    const value = Math.abs(Number(item?.value) || 0)
                                    const percent = total > 0 ? Math.round((value / total) * 100) : 0
                                    const color = LEGEND_COLORS[i % LEGEND_COLORS.length]
                                    return (
                                        <li
                                            key={i}
                                            className="flex items-center gap-3 rounded-xl border px-4 py-2.5"
                                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                                        >
                                            {/* 占比色块 */}
                                            <span
                                                className="h-3.5 w-3.5 flex-shrink-0 rounded-sm"
                                                style={{ background: `var(--graph-${i % 10}, ${color})` }}
                                                aria-hidden="true"
                                            />
                                            <span
                                                className="min-w-0 flex-1 truncate text-base font-semibold leading-relaxed break-words"
                                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {item?.name || `分项${i + 1}`}
                                            </span>
                                            {/* 占比进度条 */}
                                            <span className="hidden h-1.5 w-20 flex-shrink-0 overflow-hidden rounded-full md:inline-block" style={{ background: "var(--stroke,#e2e8f0)" }}>
                                                <span
                                                    className="block h-full rounded-full"
                                                    style={{ width: `${percent}%`, background: `var(--graph-${i % 10}, ${color})` }}
                                                />
                                            </span>
                                            <span
                                                className="w-12 flex-shrink-0 text-right text-base font-black leading-relaxed"
                                                style={{ color: "var(--background-text,#0f172a)" }}
                                            >
                                                {percent}%
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PieDonut
