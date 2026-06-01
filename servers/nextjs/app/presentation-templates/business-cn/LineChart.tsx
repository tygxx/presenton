"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'business-cn-line-chart'
export const layoutName = '趋势分析'
export const layoutDescription = '商务风趋势页：左侧标题/说明/趋势注解，右侧折线图卡片。用于展示随时间变化的指标走势。纯 CSS/SVG 装饰，主题色自动跟随。'

const schema = z.object({
    title: z.string().min(2).max(20).default('市场份额持续走高').meta({
        description: "趋势页主标题（中文，简短有力）",
    }),
    description: z.string().min(6).max(50).default('过去八个季度核心业务占有率稳步攀升，增长动能强劲。').meta({
        description: "对趋势走势的简要说明",
    }),
    chartData: z.object({
        type: z.literal('line').default('line').meta({ description: "图表类型，固定为折线图" }),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "数据点名称，如季度/月份" }),
            value: z.number().meta({ description: "数据点数值" }),
        })).min(4).max(8).meta({ description: "折线趋势数据点（4-8 个）" }),
    }).default({
        type: 'line',
        data: [
            { name: 'Q1', value: 18 },
            { name: 'Q2', value: 22 },
            { name: 'Q3', value: 27 },
            { name: 'Q4', value: 31 },
            { name: 'Q5', value: 38 },
            { name: 'Q6', value: 44 },
            { name: 'Q7', value: 49 },
            { name: 'Q8', value: 56 },
        ],
    }).meta({ description: "折线图数据" }),
    annotation: z.string().min(2).max(30).default('第六季度新品上线后增速明显提升').meta({
        description: "对趋势关键拐点的注解说明（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const LineChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '市场份额持续走高'
    const description = slideData?.description || '过去八个季度核心业务占有率稳步攀升，增长动能强劲。'
    const chartData = slideData?.chartData?.data || []
    const annotation = slideData?.annotation || '第六季度新品上线后增速明显提升'

    const trendIcon = {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
        __icon_query__: 'chart line up',
    }

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
                {/* 背景装饰层：经典网格纹样 + 左下角橙色光晕 */}
                <svg className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
                    <defs>
                        <pattern id="bizLineGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--primary-color,#1e3a8a)" strokeOpacity="0.05" strokeWidth="1" />
                        </pattern>
                        <radialGradient id="bizLineGlow" cx="0" cy="1" r="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#bizLineGrid)" />
                    <rect width="100%" height="100%" fill="url(#bizLineGlow)" />
                </svg>

                {/* 顶部深蓝几何细条 */}
                <div
                    className="absolute top-0 left-0 h-1.5 w-full"
                    style={{ background: "var(--primary-color,#1e3a8a)" }}
                    aria-hidden="true"
                />
                {/* 右上角橙色强调小角标 */}
                <div
                    className="absolute top-0 right-0"
                    style={{
                        width: 0, height: 0,
                        borderTop: '56px solid var(--secondary-color,#f97316)',
                        borderLeft: '56px solid transparent',
                    }}
                    aria-hidden="true"
                />

                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：标题 + 说明 + 趋势注解 */}
                    <div className="flex w-[38%] flex-shrink-0 flex-col justify-center">
                        <div className="mb-5 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <p
                            className="mt-4 text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        {/* 趋势注解卡片 */}
                        {annotation && (
                            <div
                                className="mt-10 flex items-start gap-3 rounded-2xl border p-5 shadow-sm"
                                style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                            >
                                <div
                                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{ background: "var(--primary-color,#1e3a8a)" }}
                                >
                                    <RemoteSvgIcon
                                        url={trendIcon.__icon_url__}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-5 h-5"
                                        title={trendIcon.__icon_query__}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span
                                        className="text-xs font-semibold leading-relaxed break-words"
                                        style={{ color: "var(--secondary-color,#f97316)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        关键拐点
                                    </span>
                                    <span
                                        className="mt-1 text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#334155)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {annotation}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 右侧：折线图卡片 */}
                    <div
                        className="flex flex-1 flex-col rounded-2xl border p-6 shadow-sm"
                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                    >
                        <div className="min-h-0 w-full flex-1">
                            <GeneralChart type={'line'} data={chartData} showLegend={false} showTooltip={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LineChart
