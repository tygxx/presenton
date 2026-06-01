"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'medical-cn-line-chart'
export const layoutName = '趋势分析'
export const layoutDescription = '医疗健康风趋势页：左侧标题/说明/注解，右侧折线趋势图卡片。清爽无衬线，圆角卡片 + 脉搏波形 + 十字母题，蓝绿点缀。仅在有可量化时间序列数据时使用。'

const schema = z.object({
    title: z.string().min(2).max(20).default('门诊量稳步回升').meta({
        description: "趋势页主标题（中文，简短）",
    }),
    description: z.string().min(6).max(50).default('近半年月度门诊接诊人次持续上行，服务能力稳健释放。').meta({
        description: "对趋势的简要说明",
    }),
    chartData: z.object({
        type: z.literal('line').default('line'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "数据点名称，如月份/季度" }),
            value: z.number().meta({ description: "数据点数值，如门诊人次（千）" }),
        })).min(4).max(8),
    }).default({
        type: 'line',
        data: [
            { name: '1月', value: 42 },
            { name: '2月', value: 38 },
            { name: '3月', value: 51 },
            { name: '4月', value: 57 },
            { name: '5月', value: 63 },
            { name: '6月', value: 72 },
        ],
    }).meta({ description: "折线趋势图数据" }),
    annotation: z.string().max(30).default('6月环比增长 14.3%，创近一年新高。').optional().meta({
        description: "图表下方的趋势注解（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const LineChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '门诊量稳步回升'
    const description = slideData?.description || '近半年月度门诊接诊人次持续上行，服务能力稳健释放。'
    const chartData = slideData?.chartData?.data || []
    const annotation = slideData?.annotation || '6月环比增长 14.3%，创近一年新高。'

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
                {/* 背景装饰层：脉搏波形 + 柔和光晕 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="medGlowA" cx="0.12" cy="0.18" r="0.5">
                            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="medGlowB" cx="0.92" cy="0.9" r="0.55">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#medGlowA)" />
                    <rect width="1280" height="720" fill="url(#medGlowB)" />
                    {/* 脉搏波形母题 */}
                    <path
                        d="M0 632 L240 632 L268 632 L292 560 L320 690 L356 612 L386 632 L1280 632"
                        fill="none"
                        stroke="var(--primary-color,#0ea5e9)"
                        strokeOpacity="0.14"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>

                {/* 右上角十字母题角标 */}
                <div className="absolute top-9 right-12 z-10" aria-hidden="true">
                    <svg width="40" height="40" viewBox="0 0 40 40">
                        <rect x="15.5" y="3" width="9" height="34" rx="3" fill="var(--secondary-color,#10b981)" fillOpacity="0.22" />
                        <rect x="3" y="15.5" width="34" height="9" rx="3" fill="var(--secondary-color,#10b981)" fillOpacity="0.22" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：标识 + 标题 + 说明 + 注解 */}
                    <div className="flex w-[38%] flex-shrink-0 flex-col justify-center">
                        <div className="mb-6 flex items-center gap-3">
                            <div
                                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm"
                                style={{ background: "var(--primary-color,#0ea5e9)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-6 h-6"
                                    title="trend line"
                                />
                            </div>
                            <span
                                className="text-sm font-semibold tracking-wide break-words"
                                style={{ color: "var(--primary-color,#0ea5e9)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                趋势分析
                            </span>
                        </div>

                        <h1
                            className="text-4xl font-black leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div
                            className="my-6 h-1.5 w-16 rounded-full"
                            style={{ background: "var(--secondary-color,#10b981)" }}
                        />

                        <p
                            className="text-base leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        {/* 注解卡片 */}
                        {annotation && (
                            <div
                                className="mt-8 flex items-start gap-3 rounded-2xl border p-4 shadow-sm"
                                style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                            >
                                <div
                                    className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
                                    style={{ background: "rgba(16,185,129,0.12)" }}
                                >
                                    <RemoteSvgIcon
                                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg"
                                        strokeColor="currentColor"
                                        color="var(--secondary-color,#10b981)"
                                        className="w-4 h-4"
                                        title="heartbeat"
                                    />
                                </div>
                                <p
                                    className="text-sm font-medium leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {annotation}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 右侧：折线趋势图卡片 */}
                    <div
                        className="flex flex-1 flex-col rounded-3xl border p-6 shadow-sm"
                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                    >
                        <div className="mb-3 flex items-center gap-2">
                            <span
                                className="inline-block h-2.5 w-2.5 rounded-full"
                                style={{ background: "var(--primary-color,#0ea5e9)" }}
                            />
                            <span
                                className="text-sm font-semibold break-words"
                                style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                月度趋势
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
