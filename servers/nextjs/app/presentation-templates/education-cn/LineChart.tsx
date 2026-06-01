"use client";

import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'education-cn-line-chart'
export const layoutName = '趋势分析'
export const layoutDescription = '教育培训风趋势页：左侧标题/说明/亮点注解，右侧圆角卡片折线趋势图。明亮米白底配活力橙蓝，书本灯泡成长曲线母题装饰。仅在有折线趋势数据时使用，主题色自动跟随。'

const schema = z.object({
    title: z.string().min(2).max(20).default('学习成长趋势').meta({
        description: "趋势页主标题（中文，简短有力，≤20字）",
    }),
    description: z.string().min(4).max(50).default('随着课程深入，学员能力评分持续稳步提升。').meta({
        description: "对趋势的简要说明（一句话，≤50字）",
    }),
    chartData: z.object({
        type: z.literal('line').default('line'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "横轴名称，如周次/阶段/月份（≤10字）" }),
            value: z.number().meta({ description: "该节点的数值，如能力评分" }),
        })).min(4).max(8).meta({ description: "折线趋势数据点（4~8个）" }),
    }).default({
        type: 'line',
        data: [
            { name: '第1周', value: 62 },
            { name: '第2周', value: 68 },
            { name: '第3周', value: 74 },
            { name: '第4周', value: 79 },
            { name: '第5周', value: 86 },
            { name: '第6周', value: 92 },
        ],
    }).meta({ description: "折线趋势图数据" }),
    annotation: z.string().min(2).max(30).default('六周内平均评分提升 30 分，进步显著。').meta({
        description: "图表下方的趋势注解/关键解读（可选，≤30字）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const LineChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '学习成长趋势'
    const description = slideData?.description || '随着课程深入，学员能力评分持续稳步提升。'
    const chartData = slideData?.chartData?.data || [
        { name: '第1周', value: 62 },
        { name: '第2周', value: 68 },
        { name: '第3周', value: 74 },
        { name: '第4周', value: 79 },
        { name: '第5周', value: 86 },
        { name: '第6周', value: 92 },
    ]
    const annotation = slideData?.annotation || '六周内平均评分提升 30 分，进步显著。'

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
                {/* 背景装饰层：圆点纹样 + 柔和光晕（书本/成长母题氛围） */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <radialGradient id="eduLineGlowA" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="eduLineGlowB" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0" />
                        </radialGradient>
                        <pattern id="eduLineDots" width="26" height="26" patternUnits="userSpaceOnUse">
                            <circle cx="3" cy="3" r="2" fill="var(--primary-color,#2563eb)" fillOpacity="0.07" />
                        </pattern>
                    </defs>
                    <circle cx="80" cy="650" r="220" fill="url(#eduLineGlowA)" />
                    <circle cx="1180" cy="70" r="200" fill="url(#eduLineGlowB)" />
                    <rect x="40" y="40" width="200" height="120" fill="url(#eduLineDots)" />
                </svg>

                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：徽标 + 标题 + 说明 + 注解 */}
                    <div className="flex w-[38%] flex-shrink-0 flex-col justify-center">
                        {/* 灯泡徽标 + 小标签（成长母题） */}
                        <div className="mb-6 flex items-center gap-3">
                            <div
                                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm"
                                style={{ background: "var(--primary-color,#2563eb)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-6 h-6"
                                    title="growth trend"
                                />
                            </div>
                            <span
                                className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold leading-relaxed break-words"
                                style={{
                                    color: "var(--secondary-color,#f97316)",
                                    background: "rgba(249,115,22,0.12)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                成长趋势
                            </span>
                        </div>

                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div className="mt-5 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />

                        <p
                            className="mt-5 text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#4b5563)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        {/* 趋势注解卡片（书本/灯泡母题） */}
                        {annotation && (
                            <div
                                className="mt-8 flex items-start gap-3 rounded-2xl border p-4 shadow-sm"
                                style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#f1e9d8)" }}
                            >
                                <div
                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{ background: "rgba(37,99,235,0.10)" }}
                                >
                                    <RemoteSvgIcon
                                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
                                        strokeColor="currentColor"
                                        color="var(--primary-color,#2563eb)"
                                        className="w-5 h-5"
                                        title="insight"
                                    />
                                </div>
                                <p
                                    className="text-sm leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#4b5563)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {annotation}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 右侧：折线趋势图卡片 */}
                    <div
                        className="flex flex-1 flex-col rounded-3xl border p-6 shadow-sm"
                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#f1e9d8)" }}
                    >
                        <div className="mb-4 flex items-center gap-2">
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg"
                                strokeColor="currentColor"
                                color="var(--secondary-color,#f97316)"
                                className="w-5 h-5"
                                title="course progress"
                            />
                            <span
                                className="text-sm font-semibold leading-relaxed break-words"
                                style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                能力评分趋势
                            </span>
                        </div>
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
