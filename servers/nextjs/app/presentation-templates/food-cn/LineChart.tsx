"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'food-cn-line-chart'
export const layoutName = '趋势分析'
export const layoutDescription = '美食餐饮风趋势页：左侧标题/说明/注解，右侧折线趋势图。暖米底 + 食欲橙红 + 圆盘构图 + 焦糖金描边，温暖诱人。仅在有可量化的时序数据时使用。主题色自动跟随。'

const schema = z.object({
    title: z.string().min(2).max(20).default('门店客流稳步回暖').meta({
        description: "趋势页主标题（中文，简短，建议不超过20字）",
    }),
    description: z.string().min(4).max(50).default('近半年到店客流持续上扬，周末峰值屡创新高。').meta({
        description: "对趋势的简要说明（中文，一句话，建议不超过50字）",
    }),
    chartData: z.object({
        type: z.literal('line').default('line').meta({ description: "图表类型，固定为折线 line" }),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "数据点名称，如月份/季度（建议不超过10字）" }),
            value: z.number().meta({ description: "该时间点的数值，如客流量/营收（万）" }),
        })).min(4).max(8).meta({ description: "折线数据点（4到8个）" }),
    }).default({
        type: 'line',
        data: [
            { name: '1月', value: 38 },
            { name: '2月', value: 45 },
            { name: '3月', value: 52 },
            { name: '4月', value: 61 },
            { name: '5月', value: 74 },
            { name: '6月', value: 89 },
        ],
    }).meta({ description: "折线趋势图数据" }),
    annotation: z.string().max(30).optional().default('6月环比增长 20%，复购率创年内新高').meta({
        description: "图表下方的趋势注解/亮点（中文，可选，建议不超过30字）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const LineChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '门店客流稳步回暖'
    const description = slideData?.description || '近半年到店客流持续上扬，周末峰值屡创新高。'
    const chartData = slideData?.chartData?.data || []
    const annotation = slideData?.annotation ?? '6月环比增长 20%，复购率创年内新高'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#fdf6ec)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：圆盘构图 + 暖色光晕 + 焦糖金描边圆环 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <radialGradient id="foodLineWarmGlow" cx="18%" cy="22%" r="60%">
                            <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="foodLinePlate" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.04" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#foodLineWarmGlow)" />
                    {/* 右上角圆盘叠环（焦糖金描边） */}
                    <circle cx="1180" cy="-40" r="230" fill="url(#foodLinePlate)" />
                    <circle cx="1180" cy="-40" r="230" fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity="0.16" strokeWidth="2" />
                    <circle cx="1180" cy="-40" r="180" fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity="0.10" strokeWidth="1.5" />
                    {/* 左下角暖色圆盘 */}
                    <circle cx="-30" cy="700" r="170" fill="url(#foodLinePlate)" />
                    <circle cx="-30" cy="700" r="170" fill="none" stroke="var(--secondary-color,#c92a2a)" strokeOpacity="0.12" strokeWidth="1.5" />
                </svg>

                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：图标徽章 + 标题 + 说明 + 注解 */}
                    <div className="flex w-[38%] flex-shrink-0 flex-col justify-center">
                        {/* 圆盘图标徽章（餐具点缀母题） */}
                        <div className="mb-6 flex items-center gap-3">
                            <div
                                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                                style={{
                                    background: "var(--primary-color,#e8590c)",
                                    boxShadow: '0 0 0 5px rgba(232,89,12,0.14)',
                                }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-6 h-6"
                                    title="trend up"
                                />
                            </div>
                            <span
                                className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold leading-relaxed break-words"
                                style={{
                                    color: "var(--secondary-color,#c92a2a)",
                                    background: "rgba(201,42,42,0.08)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                趋势分析
                            </span>
                        </div>

                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div
                            className="my-5 h-1.5 w-16 rounded-full"
                            style={{ background: "var(--secondary-color,#c92a2a)" }}
                        />

                        <p
                            className="text-base leading-loose break-words"
                            style={{ color: "var(--background-text,#3b2412)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        {/* 注解卡片（暖色块 + 焦糖金描边 + 餐具点缀） */}
                        {annotation && (
                            <div
                                className="mt-8 flex items-start gap-3 rounded-2xl border px-5 py-4"
                                style={{
                                    background: "var(--card-color,#fffaf2)",
                                    borderColor: "var(--stroke,#f0e0cc)",
                                    boxShadow: '0 6px 18px rgba(232,89,12,0.06)',
                                }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-color,#e8590c)"
                                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                                    title="dining"
                                />
                                <span
                                    className="text-sm font-medium leading-relaxed break-words"
                                    style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {annotation}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* 右侧：折线趋势图卡片（圆盘构图圆角 + 焦糖金描边） */}
                    <div
                        className="flex flex-1 flex-col rounded-3xl border p-6"
                        style={{
                            background: "var(--card-color,#fffaf2)",
                            borderColor: "var(--stroke,#f0e0cc)",
                            boxShadow: '0 10px 30px rgba(232,89,12,0.08)',
                        }}
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
