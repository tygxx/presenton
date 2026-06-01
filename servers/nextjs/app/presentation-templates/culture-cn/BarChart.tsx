"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'culture-cn-bar-chart'
export const layoutName = '柱状图数据'
export const layoutDescription = '国潮文创风数据页：宣纸米黄底配朱砂红与描金边，左侧竖排标题/印章/关键结论，右侧水墨边框柱状图。仅在有可量化数据时使用。主题色自动跟随。'

const schema = z.object({
    seal: z.string().min(1).max(4).default('文创').meta({
        description: "印章红块内的竖排短语，1-2 字最佳",
    }),
    title: z.string().min(2).max(20).default('国潮文创势头正盛').meta({
        description: "数据页主标题",
    }),
    description: z.string().min(6).max(54).default('近五年文创衍生品销售逐年攀升，传统纹样焕发新生。').meta({
        description: "对数据的简要说明",
    }),
    chartTitle: z.string().min(2).max(16).default('年度文创销售额（亿元）').meta({
        description: "图表卡片上方标题",
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
            { name: '2024', value: 71 },
            { name: '2025', value: 96 },
        ],
    }).meta({ description: "图表数据" }),
    highlights: z.array(z.object({
        value: z.string().min(1).max(8).meta({ description: "关键指标数值，如 96亿、28%" }),
        label: z.string().min(2).max(16).meta({ description: "指标说明" }),
    })).min(2).max(3).default([
        { value: '96亿', label: '2025年销售额' },
        { value: '28%', label: '年均复合增速' },
        { value: '国风', label: '设计语言主线' },
    ]).meta({ description: "图表旁的关键结论指标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BarChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const seal = slideData?.seal || '文创'
    const title = slideData?.title || '国潮文创势头正盛'
    const description = slideData?.description || '近五年文创衍生品销售逐年攀升，传统纹样焕发新生。'
    const chartTitle = slideData?.chartTitle || '年度文创销售额（亿元）'
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
                    background: "var(--background-color,#f5ecd9)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：宣纸纹理 + 水墨笔触 + 传统纹样 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            {/* 宣纸暖色渐晕 */}
                            <radialGradient id="cultureBarPaper" cx="22%" cy="18%" r="90%">
                                <stop offset="0%" stopColor="#fcf6e8" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#f5ecd9" stopOpacity="0" />
                            </radialGradient>
                            {/* 水墨笔触渐隐 */}
                            <linearGradient id="cultureBarInk" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.08" />
                                <stop offset="100%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0" />
                            </linearGradient>
                            {/* 描金渐变 */}
                            <linearGradient id="cultureBarGold" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#caa45a" />
                                <stop offset="50%" stopColor="#e8c980" />
                                <stop offset="100%" stopColor="#b8893f" />
                            </linearGradient>
                        </defs>

                        <rect width="1280" height="720" fill="url(#cultureBarPaper)" />

                        {/* 左下水墨笔触 */}
                        <path
                            d="M-40 600 C 180 540, 320 660, 520 600 C 640 565, 700 640, 820 610 L 820 760 L -40 760 Z"
                            fill="url(#cultureBarInk)"
                        />

                        {/* 右上回纹（传统纹样）角饰 */}
                        <g stroke="url(#cultureBarGold)" strokeWidth="2.5" fill="none" opacity="0.55">
                            <path d="M1180 40 H1240 V100 H1200 V70 H1220" />
                            <path d="M1100 40 H1150 V90 H1120 V65" />
                        </g>

                        {/* 散落的传统圆形纹样 */}
                        <g fill="none" stroke="var(--primary-color,#c0392b)" strokeOpacity="0.12">
                            <circle cx="1140" cy="650" r="42" strokeWidth="2" />
                            <circle cx="1140" cy="650" r="26" strokeWidth="2" />
                            <circle cx="60" cy="120" r="34" strokeWidth="2" />
                        </g>

                        {/* 顶部描金细线 */}
                        <rect x="0" y="0" width="1280" height="6" fill="url(#cultureBarGold)" opacity="0.85" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：印章 + 标题 + 说明 + 关键结论 */}
                    <div className="flex w-[38%] flex-shrink-0 flex-col justify-center">
                        {/* 印章红块（竖排）+ 标题行 */}
                        <div className="mb-6 flex items-start gap-4">
                            <div
                                className="flex flex-shrink-0 flex-col items-center justify-center rounded-[6px] px-2 py-2.5 leading-[1.2] break-words"
                                style={{
                                    background: "var(--primary-color,#c0392b)",
                                    color: "var(--primary-text,#ffffff)",
                                    boxShadow: '0 0 0 1.5px rgba(202,164,90,0.7)',
                                    writingMode: 'vertical-rl',
                                    letterSpacing: '0.18em',
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                <span className="text-base font-black">{seal}</span>
                            </div>
                            <div className="flex flex-col">
                                <div className="mb-3 h-1 w-14 rounded-full" style={{ background: "linear-gradient(90deg,#caa45a,#e8c980,#b8893f)" }} />
                                <h1
                                    className="text-4xl font-black leading-[1.3] break-words"
                                    style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {title}
                                </h1>
                            </div>
                        </div>

                        <p
                            className="text-base leading-[1.8] break-words"
                            style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        {/* 关键结论 */}
                        <div className="mt-8 space-y-4">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex items-baseline gap-3">
                                    <span
                                        className="text-3xl font-black leading-[1.2] break-words"
                                        style={{ color: "var(--primary-color,#c0392b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {h.value}
                                    </span>
                                    <span
                                        className="text-sm leading-[1.7] break-words"
                                        style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.8, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {h.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 右侧：水墨描金边框图表卡片 */}
                    <div
                        className="flex flex-1 flex-col rounded-[10px] p-6"
                        style={{
                            background: "var(--card-color,#fbf5e9)",
                            border: '1px solid var(--stroke,#ddd0b4)',
                            boxShadow: 'inset 0 0 0 3px rgba(202,164,90,0.28), 0 8px 24px rgba(43,43,43,0.08)',
                        }}
                    >
                        <div className="mb-3 flex items-center gap-2.5">
                            <span className="inline-block h-3.5 w-1 rounded-full" style={{ background: "var(--primary-color,#c0392b)" }} />
                            <span
                                className="text-sm font-bold leading-[1.6] break-words"
                                style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {chartTitle}
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
