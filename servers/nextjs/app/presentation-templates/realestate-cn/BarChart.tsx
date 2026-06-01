"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'realestate-cn-bar-chart'
export const layoutName = '柱状图数据'
export const layoutDescription = '房产建筑风数据页：左侧标题/说明/关键结论，右侧柱状图卡片。高级灰底搭配金铜点缀、细线分隔与建筑剪影装饰，超大留白质感克制。仅在有可量化数据时使用，主题色自动跟随。'

const schema = z.object({
    eyebrow: z.string().min(2).max(16).default('市场数据 · 2026').meta({
        description: "标题上方的小标签/分类，如『市场数据』『销售业绩』",
    }),
    title: z.string().min(2).max(22).default('销售业绩稳步攀升').meta({
        description: "数据页主标题（中文，简短有力）",
    }),
    description: z.string().min(6).max(56).default('近五年项目签约面积持续走高，高端住宅去化稳健，品质口碑日益沉淀。').meta({
        description: "对数据的简要说明",
    }),
    chartData: z.object({
        type: z.enum(['bar', 'line', 'area']).default('bar'),
        data: z.array(z.object({
            name: z.string().min(1).max(12).meta({ description: "数据点名称，如年份/季度/楼盘" }),
            value: z.number().meta({ description: "数据点数值，如签约面积（万㎡）" }),
        })).min(3).max(6),
    }).default({
        type: 'bar',
        data: [
            { name: '2021', value: 28 },
            { name: '2022', value: 35 },
            { name: '2023', value: 47 },
            { name: '2024', value: 62 },
            { name: '2025', value: 81 },
        ],
    }).meta({ description: "图表数据" }),
    highlights: z.array(z.object({
        value: z.string().min(1).max(8).meta({ description: "关键指标数值，如 81万㎡、22%" }),
        label: z.string().min(2).max(16).meta({ description: "指标说明" }),
    })).min(2).max(3).default([
        { value: '81万㎡', label: '2025年签约面积' },
        { value: '22%', label: '年均复合增速' },
        { value: '94%', label: '当年去化率' },
    ]).meta({ description: "图表旁的关键结论指标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BarChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '市场数据 · 2026'
    const title = slideData?.title || '销售业绩稳步攀升'
    const description = slideData?.description || '近五年项目签约面积持续走高，高端住宅去化稳健，品质口碑日益沉淀。'
    const chartType = slideData?.chartData?.type || 'bar'
    const chartData = slideData?.chartData?.data || []
    const highlights = slideData?.highlights || []

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f4f4f5)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：极简建筑剪影 + 细线母题 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="reBarSilhouette" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0.07" />
                            <stop offset="100%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* 右下角极简建筑剪影 */}
                    <g fill="url(#reBarSilhouette)">
                        <rect x="980" y="430" width="58" height="290" />
                        <rect x="1046" y="500" width="44" height="220" />
                        <rect x="1098" y="380" width="66" height="340" />
                        <rect x="1172" y="470" width="50" height="250" />
                    </g>
                    {/* 建筑窗格细线 */}
                    <g stroke="var(--primary-color,#b08d57)" strokeOpacity="0.10" strokeWidth="1">
                        <line x1="1098" y1="420" x2="1164" y2="420" />
                        <line x1="1098" y1="470" x2="1164" y2="470" />
                        <line x1="1098" y1="520" x2="1164" y2="520" />
                        <line x1="1131" y1="380" x2="1131" y2="720" />
                    </g>
                    {/* 顶部细分割线母题 */}
                    <line x1="0" y1="118" x2="1280" y2="118" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                    <line x1="0" y1="700" x2="1280" y2="700" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                </svg>

                {/* 左上角金铜点缀方框母题 */}
                <div className="absolute left-16 top-12 z-10 flex items-center gap-3">
                    <div
                        className="h-3 w-3"
                        style={{ background: "var(--primary-color,#b08d57)" }}
                    />
                    <span
                        className="text-xs font-light uppercase break-words"
                        style={{
                            color: "var(--secondary-color,#3f3f46)",
                            letterSpacing: '0.18em',
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                        }}
                    >
                        {eyebrow}
                    </span>
                </div>

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full items-stretch gap-14 px-16 pb-16 pt-28">
                    {/* 左侧：标题 + 说明 + 关键结论 */}
                    <div className="flex w-[36%] flex-shrink-0 flex-col justify-center">
                        <div
                            className="mb-6 h-px w-14"
                            style={{ background: "var(--primary-color,#b08d57)" }}
                        />
                        <h1
                            className="text-[2.75rem] font-light leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#27272a)",
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        <p
                            className="mt-5 text-base font-light leading-[1.8] break-words"
                            style={{
                                color: "var(--secondary-color,#3f3f46)",
                                opacity: 0.85,
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {description}
                        </p>

                        {/* 关键结论：细线分隔的极简清单 */}
                        <div className="mt-10 flex flex-col">
                            {highlights.map((h, i) => (
                                <div
                                    key={i}
                                    className="flex items-baseline gap-4 py-4"
                                    style={
                                        i === 0
                                            ? undefined
                                            : { borderTop: '1px solid var(--stroke,#e4e4e7)' }
                                    }
                                >
                                    <span
                                        className="text-3xl font-light leading-[1.2] break-words"
                                        style={{
                                            color: "var(--primary-color,#b08d57)",
                                            overflowWrap: 'break-word',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {h.value}
                                    </span>
                                    <span
                                        className="text-sm font-light leading-relaxed break-words"
                                        style={{
                                            color: "var(--secondary-color,#3f3f46)",
                                            opacity: 0.75,
                                            overflowWrap: 'break-word',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {h.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 右侧：图表卡片，极简细边 + 大留白 */}
                    <div
                        className="flex flex-1 flex-col rounded-sm p-8"
                        style={{
                            background: "var(--card-color,#ffffff)",
                            border: '1px solid var(--stroke,#e4e4e7)',
                        }}
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <span
                                className="text-sm font-light tracking-wide break-words"
                                style={{
                                    color: "var(--secondary-color,#3f3f46)",
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                逐年趋势
                            </span>
                            <span
                                className="h-2 w-2"
                                style={{ background: "var(--primary-color,#b08d57)" }}
                            />
                        </div>
                        <div
                            className="mb-5 h-px w-full"
                            style={{ background: "var(--stroke,#e4e4e7)" }}
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
