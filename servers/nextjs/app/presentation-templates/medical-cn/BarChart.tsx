"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'medical-cn-bar-chart'
export const layoutName = '柱状图数据'
export const layoutDescription = '医疗健康风数据页：左侧标题/说明/关键结论，右侧柱状图卡片。清爽蓝绿配色，圆角卡片与脉搏波形装饰。仅在有可量化数据时使用，主题色自动跟随。'

const schema = z.object({
    eyebrow: z.string().min(2).max(16).default('诊疗数据洞察').meta({
        description: "标题上方的小标签/分类，如『诊疗数据洞察』『年度统计』",
    }),
    title: z.string().min(2).max(22).default('门诊量稳步攀升').meta({
        description: "数据页主标题（中文，简短有力）",
    }),
    description: z.string().min(6).max(60).default('近五年门诊接诊人次持续上行，分级诊疗与智慧医疗成效显著。').meta({
        description: "对数据的简要说明",
    }),
    chartData: z.object({
        type: z.enum(['bar', 'line', 'area']).default('bar'),
        data: z.array(z.object({
            name: z.string().min(1).max(12).meta({ description: "数据点名称，如年份/科室" }),
            value: z.number().meta({ description: "数据点数值" }),
        })).min(3).max(6),
    }).default({
        type: 'bar',
        data: [
            { name: '2021', value: 48 },
            { name: '2022', value: 56 },
            { name: '2023', value: 69 },
            { name: '2024', value: 82 },
            { name: '2025', value: 97 },
        ],
    }).meta({ description: "图表数据" }),
    highlights: z.array(z.object({
        value: z.string().min(1).max(8).meta({ description: "关键指标数值，如 97万、21%" }),
        label: z.string().min(2).max(16).meta({ description: "指标说明" }),
    })).min(2).max(3).default([
        { value: '97万', label: '年门诊人次' },
        { value: '21%', label: '年均增长率' },
        { value: '98.6%', label: '患者满意度' },
    ]).meta({ description: "图表旁的关键结论指标" }),
    icon: z.object({
        __icon_url__: z.string().default('https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg').meta({ description: "图标 URL" }),
        __icon_query__: z.string().min(2).max(40).default('heartbeat pulse').meta({ description: "图标英文检索词" }),
    }).default({
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg',
        __icon_query__: 'heartbeat pulse',
    }).meta({ description: "标题区点缀图标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BarChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '诊疗数据洞察'
    const title = slideData?.title || '门诊量稳步攀升'
    const description = slideData?.description || '近五年门诊接诊人次持续上行，分级诊疗与智慧医疗成效显著。'
    const chartType = slideData?.chartData?.type || 'bar'
    const chartData = slideData?.chartData?.data || []
    const highlights = slideData?.highlights || []
    const icon = slideData?.icon || {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg',
        __icon_query__: 'heartbeat pulse',
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
                {/* 背景装饰：柔和蓝绿光晕 + 脉搏波形 + 十字母题 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="medBarGlowA" cx="0.15" cy="0.12" r="0.6">
                                <stop offset="0%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="medBarGlowB" cx="0.92" cy="0.95" r="0.55">
                                <stop offset="0%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#medBarGlowA)" />
                        <rect width="1280" height="720" fill="url(#medBarGlowB)" />
                        {/* 脉搏波形 */}
                        <path
                            d="M0 118 H120 L150 118 L172 70 L196 162 L220 96 L242 118 H360"
                            fill="none"
                            stroke="var(--secondary-color,#10b981)"
                            strokeOpacity="0.18"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {/* 十字母题（柔和） */}
                    <div className="absolute bottom-10 right-12" style={{ opacity: 0.12 }}>
                        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" aria-hidden="true">
                            <path d="M30 8 H46 V30 H68 V46 H46 V68 H30 V46 H8 V30 H30 Z" fill="var(--primary-color,#0ea5e9)" />
                        </svg>
                    </div>
                </div>

                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：标题 + 说明 + 关键结论 */}
                    <div className="flex w-[38%] flex-shrink-0 flex-col justify-center">
                        <div className="mb-5 flex items-center gap-3">
                            <span
                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl shadow-sm"
                                style={{ background: "var(--primary-color,#0ea5e9)", color: "var(--primary-text,#ffffff)" }}
                            >
                                <RemoteSvgIcon
                                    url={icon.__icon_url__}
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-5 h-5"
                                    title={icon.__icon_query__}
                                />
                            </span>
                            <span
                                className="text-sm font-semibold tracking-wide break-words"
                                style={{ color: "var(--secondary-color,#10b981)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {eyebrow}
                            </span>
                        </div>

                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div className="my-5 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#10b981)" }} />

                        <p
                            className="text-base leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        <div className="mt-8 space-y-4">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex items-baseline gap-3">
                                    <span className="text-3xl font-black leading-none break-words" style={{ color: "var(--primary-color,#0ea5e9)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                        {h.value}
                                    </span>
                                    <span className="text-sm leading-relaxed break-words" style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                        {h.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 右侧：图表卡片 */}
                    <div
                        className="flex flex-1 flex-col rounded-3xl border p-6"
                        style={{
                            background: "var(--card-color,#ffffff)",
                            borderColor: "var(--stroke,#e2e8f0)",
                            boxShadow: '0 18px 40px -20px rgba(14,165,233,0.28)',
                        }}
                    >
                        <div className="mb-3 flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--primary-color,#0ea5e9)" }} />
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--secondary-color,#10b981)" }} />
                            <span
                                className="ml-1 text-xs font-medium break-words"
                                style={{ color: "var(--background-text,#94a3b8)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                逐年趋势 · 单位（万人次）
                            </span>
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

export default BarChart
