"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'retail-cn-bar-chart'
export const layoutName = '柱状图数据'
export const layoutDescription = '电商新零售数据页：撞色大色块 + 圆角卡片 + 价签母题，左侧关键结论，右侧柱状图。仅在有可量化数据时使用，主题色自动跟随。'

const schema = z.object({
    eyebrow: z.string().min(2).max(14).default('全渠道增长').meta({
        description: "标题上方的小标签/分类，如『销售复盘』『大促战报』",
    }),
    title: z.string().min(2).max(22).default('GMV持续爆发').meta({
        description: "数据页主标题（中文，简短有力）",
    }),
    description: z.string().min(6).max(56).default('近五个季度直播带货叠加私域复购，成交额一路狂飙。').meta({
        description: "对数据的简要说明",
    }),
    chartData: z.object({
        type: z.enum(['bar', 'line', 'area']).default('bar'),
        data: z.array(z.object({
            name: z.string().min(1).max(12).meta({ description: "数据点名称，如季度/月份/渠道" }),
            value: z.number().meta({ description: "数据点数值" }),
        })).min(3).max(6),
    }).default({
        type: 'bar',
        data: [
            { name: 'Q1', value: 32 },
            { name: 'Q2', value: 48 },
            { name: 'Q3', value: 67 },
            { name: 'Q4', value: 91 },
            { name: 'Q5', value: 128 },
        ],
    }).meta({ description: "图表数据" }),
    highlights: z.array(z.object({
        value: z.string().min(1).max(8).meta({ description: "关键指标数值，如 1.28亿、4.2倍" }),
        label: z.string().min(2).max(16).meta({ description: "指标说明" }),
    })).min(2).max(3).default([
        { value: '1.28亿', label: '本季总GMV' },
        { value: '4.2倍', label: '直播间增速' },
        { value: '63%', label: '复购占比' },
    ]).meta({ description: "图表旁的关键结论指标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BarChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '全渠道增长'
    const title = slideData?.title || 'GMV持续爆发'
    const description = slideData?.description || '近五个季度直播带货叠加私域复购，成交额一路狂飙。'
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
                    background: "var(--background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：撞色活力几何形 + 光晕 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    {/* 右上撞色大色块 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-120px', right: '-90px', width: '360px', height: '360px',
                            borderRadius: '9999px',
                            background: "radial-gradient(circle at 30% 30%, var(--primary-color,#db2777), transparent 70%)",
                            opacity: 0.12,
                        }}
                    />
                    {/* 左下活力几何色块 */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '-80px', left: '-60px', width: '240px', height: '240px',
                            borderRadius: '48px',
                            transform: 'rotate(18deg)',
                            background: "var(--secondary-color,#f59e0b)",
                            opacity: 0.10,
                        }}
                    />
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                        <line x1="640" y1="0" x2="640" y2="720" stroke="var(--stroke,#fbcfe8)" strokeOpacity="0.0" strokeWidth="1" />
                        {[0, 1, 2].map((i) => (
                            <circle key={i} cx="80" cy="120" r={26 + i * 5} fill="none" stroke="var(--secondary-color,#f59e0b)" strokeOpacity="0.16" strokeWidth="2" />
                        ))}
                    </svg>
                </div>

                <div className="relative z-10 flex h-full px-14 py-10 gap-9">
                    {/* 左侧：撞色信息卡 + 关键结论价签 */}
                    <div className="flex w-[40%] flex-shrink-0 flex-col justify-center">
                        {/* 价签式 eyebrow */}
                        <div className="mb-5 flex items-center gap-3">
                            <span
                                className="relative inline-flex items-center rounded-r-full rounded-l-md px-4 py-1.5 text-sm font-black break-words"
                                style={{
                                    background: "var(--primary-color,#db2777)",
                                    color: "var(--primary-text,#ffffff)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                <span
                                    className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
                                    style={{ background: "var(--background-color,#ffffff)" }}
                                />
                                {eyebrow}
                            </span>
                        </div>

                        <h1
                            className="text-5xl font-black leading-[1.2] break-words"
                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div className="my-5 h-2 w-20 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />

                        <p
                            className="text-base leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#18181b)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        {/* 关键结论：价签卡片化 */}
                        <div className="mt-8 grid grid-cols-1 gap-3">
                            {highlights.map((h, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 rounded-2xl border px-4 py-3"
                                    style={{
                                        background: "var(--card-color,#fdf2f8)",
                                        borderColor: "var(--stroke,#fbcfe8)",
                                    }}
                                >
                                    <span
                                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-sm font-black"
                                        style={{
                                            background: i === 0 ? "var(--primary-color,#db2777)" : "var(--secondary-color,#f59e0b)",
                                            color: "var(--primary-text,#ffffff)",
                                        }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span
                                        className="text-3xl font-black leading-none break-words"
                                        style={{ color: "var(--primary-color,#db2777)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {h.value}
                                    </span>
                                    <span
                                        className="text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#18181b)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {h.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 右侧：撞色圆角图表卡 */}
                    <div
                        className="flex flex-1 flex-col rounded-3xl border p-7 shadow-sm"
                        style={{ background: "var(--card-color,#fdf2f8)", borderColor: "var(--stroke,#fbcfe8)" }}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <span className="h-3 w-3 rounded-full" style={{ background: "var(--primary-color,#db2777)" }} />
                                <span className="h-3 w-3 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                                <span
                                    className="text-sm font-bold break-words"
                                    style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    成交额走势
                                </span>
                            </div>
                            <span
                                className="rounded-full px-3 py-1 text-xs font-bold break-words"
                                style={{
                                    background: "var(--background-color,#ffffff)",
                                    color: "var(--primary-color,#db2777)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                单位：百万元
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
