"use client";

import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'green-cn-bar-chart'
export const layoutName = '柱状图数据'
export const layoutDescription = '新能源环保数据页：左侧标题/说明/关键结论，右侧柱状图卡片。清新白绿配天空蓝，叶片与自然曲线装饰。仅在有可量化数据时使用，主题色自动跟随。'

const schema = z.object({
    eyebrow: z.string().min(2).max(16).default('绿色能源 · 数据').meta({
        description: "标题上方的小标签/分类",
    }),
    title: z.string().min(2).max(22).default('清洁能源装机持续攀升').meta({
        description: "数据页主标题",
    }),
    description: z.string().min(6).max(60).default('近五年风光储装机规模逐年跃升，绿电占比稳步提升，碳减排成效显著。').meta({
        description: "对数据的简要说明",
    }),
    chartData: z.object({
        type: z.enum(['bar', 'line', 'area']).default('bar'),
        data: z.array(z.object({
            name: z.string().min(1).max(12).meta({ description: "数据点名称，如年份/季度" }),
            value: z.number().meta({ description: "数据点数值" }),
        })).min(3).max(6),
    }).default({
        type: 'bar',
        data: [
            { name: '2021', value: 28 },
            { name: '2022', value: 39 },
            { name: '2023', value: 54 },
            { name: '2024', value: 73 },
            { name: '2025', value: 96 },
        ],
    }).meta({ description: "图表数据" }),
    chartUnit: z.string().min(1).max(12).default('单位：万千瓦').meta({
        description: "图表数值单位说明",
    }),
    highlights: z.array(z.object({
        icon: z.object({
            __icon_url__: z.string().meta({ description: "图标 URL" }),
            __icon_query__: z.string().min(2).max(40).meta({ description: "图标英文检索词" }),
        }).meta({ description: "指标图标" }),
        value: z.string().min(1).max(8).meta({ description: "关键指标数值，如 96万、42%" }),
        label: z.string().min(2).max(16).meta({ description: "指标说明" }),
    })).min(2).max(3).default([
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightning-bold.svg', __icon_query__: 'clean energy capacity' },
            value: '96万',
            label: '2025年新增装机',
        },
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg', __icon_query__: 'green electricity share' },
            value: '42%',
            label: '绿电占比提升',
        },
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-hemisphere-west-bold.svg', __icon_query__: 'carbon emission reduction' },
            value: '120万吨',
            label: '年减碳当量',
        },
    ]).meta({ description: "图表旁的关键结论指标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BarChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '绿色能源 · 数据'
    const title = slideData?.title || '清洁能源装机持续攀升'
    const description = slideData?.description || '近五年风光储装机规模逐年跃升，绿电占比稳步提升，碳减排成效显著。'
    const chartType = slideData?.chartData?.type || 'bar'
    const chartData = slideData?.chartData?.data || []
    const chartUnit = slideData?.chartUnit || '单位：万千瓦'
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
                    background: "var(--background-color,#f0fdf4)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：自然有机曲线 + 叶片 + 地球光晕 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="greenBarSky" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.04" />
                        </linearGradient>
                        <linearGradient id="greenBarLeaf" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.06" />
                        </linearGradient>
                        <radialGradient id="greenBarGlobe" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.14" />
                            <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 顶部天空蓝渐变带 */}
                    <rect width="1280" height="720" fill="url(#greenBarSky)" />
                    {/* 底部自然有机起伏曲线（远山/草坡） */}
                    <path
                        d="M0 612 C 180 560, 360 648, 560 600 C 760 552, 940 632, 1120 588 C 1180 574, 1240 588, 1280 580 L 1280 720 L 0 720 Z"
                        fill="url(#greenBarLeaf)"
                    />
                    <path
                        d="M0 664 C 220 620, 440 692, 680 652 C 900 616, 1080 684, 1280 648 L 1280 720 L 0 720 Z"
                        fill="var(--primary-color,#16a34a)"
                        fillOpacity="0.07"
                    />
                    {/* 右上地球光晕 */}
                    <circle cx="1150" cy="120" r="200" fill="url(#greenBarGlobe)" />
                    <circle cx="1150" cy="120" r="118" fill="none" stroke="var(--secondary-color,#0891b2)" strokeOpacity="0.12" strokeWidth="1.5" />
                    <circle cx="1150" cy="120" r="150" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.10" strokeWidth="1.5" />
                    {/* 叶片母题（自然曲线） */}
                    <path
                        d="M96 96 C 150 56, 226 64, 250 132 C 200 150, 124 156, 96 96 Z"
                        fill="var(--primary-color,#16a34a)"
                        fillOpacity="0.14"
                    />
                    <path
                        d="M104 100 C 150 92, 196 104, 240 128"
                        fill="none"
                        stroke="var(--primary-color,#16a34a)"
                        strokeOpacity="0.20"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：标签 + 标题 + 说明 + 关键结论 */}
                    <div className="flex w-[38%] flex-shrink-0 flex-col justify-center">
                        <div className="mb-5 flex items-center gap-2">
                            <span
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full"
                                style={{ background: "var(--primary-color,#16a34a)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-4 h-4"
                                    title="leaf"
                                />
                            </span>
                            <span
                                className="text-sm font-semibold break-words"
                                style={{ color: "var(--primary-color,#16a34a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {eyebrow}
                            </span>
                        </div>

                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div className="my-4 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#0891b2)" }} />

                        <p
                            className="text-base leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#14532d)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        <div className="mt-8 space-y-4">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span
                                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                                        style={{ background: "var(--stroke,#d1fae5)" }}
                                    >
                                        <RemoteSvgIcon
                                            url={h?.icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-color,#16a34a)"
                                            className="w-5 h-5"
                                            title={h?.icon?.__icon_query__ || 'energy'}
                                        />
                                    </span>
                                    <div className="flex flex-col leading-relaxed">
                                        <span
                                            className="text-2xl font-black leading-[1.2] break-words"
                                            style={{ color: "var(--primary-color,#16a34a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {h.value}
                                        </span>
                                        <span
                                            className="text-sm leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#14532d)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {h.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 右侧：图表卡片 */}
                    <div
                        className="flex flex-1 flex-col rounded-3xl border p-6 shadow-sm"
                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#d1fae5)" }}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full" style={{ background: "var(--primary-color,#16a34a)" }} />
                                <span
                                    className="text-base font-bold break-words"
                                    style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    增长趋势
                                </span>
                            </div>
                            <span
                                className="text-xs leading-relaxed break-words"
                                style={{ color: "var(--background-text,#14532d)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {chartUnit}
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
