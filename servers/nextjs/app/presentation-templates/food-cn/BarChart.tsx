"use client";

import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'food-cn-bar-chart'
export const layoutName = '柱状图数据'
export const layoutDescription = '美食餐饮风数据页：左侧标题/说明/关键结论，右侧圆盘式柱状图卡片。暖米底配焦糖金描边与餐具点缀，仅在有可量化数据时使用。主题色自动跟随。'

const schema = z.object({
    title: z.string().min(2).max(22).default('门店客流稳步攀升').meta({
        description: "数据页主标题",
    }),
    description: z.string().min(6).max(60).default('近五个月堂食客流量持续走高，招牌菜品复购率领跑全城。').meta({
        description: "对数据的简要说明",
    }),
    chartData: z.object({
        type: z.enum(['bar', 'line', 'area']).default('bar'),
        data: z.array(z.object({
            name: z.string().min(1).max(12).meta({ description: "数据点名称，如月份/门店" }),
            value: z.number().meta({ description: "数据点数值" }),
        })).min(3).max(6),
    }).default({
        type: 'bar',
        data: [
            { name: '一月', value: 38 },
            { name: '二月', value: 46 },
            { name: '三月', value: 61 },
            { name: '四月', value: 79 },
            { name: '五月', value: 95 },
        ],
    }).meta({ description: "图表数据" }),
    highlights: z.array(z.object({
        icon: z.object({
            __icon_url__: z.string().default('https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fire-bold.svg').meta({ description: "图标地址" }),
            __icon_query__: z.string().min(2).max(40).default('fire').meta({ description: "图标英文检索词" }),
        }).meta({ description: "指标配图标" }),
        value: z.string().min(1).max(8).meta({ description: "关键指标数值，如 9.5万、32%" }),
        label: z.string().min(2).max(16).meta({ description: "指标说明" }),
    })).min(2).max(3).default([
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fire-bold.svg', __icon_query__: 'fire' },
            value: '9.5万',
            label: '五月到店客流',
        },
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg', __icon_query__: 'heart' },
            value: '32%',
            label: '招牌菜复购率',
        },
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/star-bold.svg', __icon_query__: 'star' },
            value: '4.9分',
            label: '平台综合评分',
        },
    ]).meta({ description: "图表旁的关键结论指标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BarChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '门店客流稳步攀升'
    const description = slideData?.description || '近五个月堂食客流量持续走高，招牌菜品复购率领跑全城。'
    const chartType = slideData?.chartData?.type || 'bar'
    const chartData = slideData?.chartData?.data || []
    const highlights = slideData?.highlights || []

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
                {/* 背景装饰：圆盘构图 + 暖色光晕 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="foodBarGlow" cx="18%" cy="22%" r="60%">
                                <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="foodBarRing" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.04" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#foodBarGlow)" />
                        {/* 右下焦糖金圆盘叠环 */}
                        <circle cx="1150" cy="640" r="220" fill="url(#foodBarRing)" />
                        <circle cx="1150" cy="640" r="150" fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity="0.18" strokeWidth="2" />
                        <circle cx="1150" cy="640" r="110" fill="none" stroke="var(--secondary-color,#c92a2a)" strokeOpacity="0.14" strokeWidth="2" strokeDasharray="5 7" />
                        {/* 左上小圆盘点缀 */}
                        <circle cx="70" cy="90" r="46" fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity="0.16" strokeWidth="2" />
                        <circle cx="70" cy="90" r="10" fill="var(--secondary-color,#c92a2a)" fillOpacity="0.20" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：标题 + 说明 + 关键结论 */}
                    <div className="flex w-[38%] flex-shrink-0 flex-col justify-center">
                        {/* 餐具点缀小标签 */}
                        <div className="mb-5 flex items-center gap-3">
                            <span
                                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                                style={{ background: "var(--primary-color,#e8590c)", boxShadow: '0 0 0 5px rgba(232,89,12,0.14)' }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-5 h-5"
                                    title="餐饮"
                                />
                            </span>
                            <span className="h-1.5 w-12 rounded-full" style={{ background: "var(--secondary-color,#c92a2a)" }} />
                        </div>

                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <p
                            className="mt-4 text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#7a5a3c)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        <div className="mt-8 space-y-3">
                            {highlights.map((h, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 rounded-2xl border px-4 py-3"
                                    style={{ background: "var(--card-color,#fffaf2)", borderColor: "var(--stroke,#f0e0cc)" }}
                                >
                                    <span
                                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                                        style={{ background: "var(--primary-color,#e8590c)" }}
                                    >
                                        <RemoteSvgIcon
                                            url={h?.icon?.__icon_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fire-bold.svg'}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-5 h-5"
                                            title={h?.icon?.__icon_query__ || 'highlight'}
                                        />
                                    </span>
                                    <span className="text-2xl font-black leading-none" style={{ color: "var(--secondary-color,#c92a2a)" }}>
                                        {h.value}
                                    </span>
                                    <span
                                        className="text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#7a5a3c)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {h.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 右侧：图表卡片（圆盘式焦糖金描边） */}
                    <div
                        className="relative flex flex-1 flex-col rounded-[28px] border p-6 shadow-sm"
                        style={{ background: "var(--card-color,#fffaf2)", borderColor: "var(--stroke,#f0e0cc)" }}
                    >
                        {/* 卡片顶部焦糖金细条 */}
                        <div
                            className="mb-4 h-1.5 w-20 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))" }}
                        />
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
