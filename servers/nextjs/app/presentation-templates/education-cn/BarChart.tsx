"use client";

import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'education-cn-bar-chart'
export const layoutName = '柱状图数据'
export const layoutDescription = '教育培训风数据页：左侧标题、说明与关键结论指标，右侧圆角卡片柱状图。书本/灯泡/圆点等装饰母题，明亮米白配活力橙蓝，纯 CSS/SVG 装饰，离线可渲染。仅在有可量化数据时使用，主题色自动跟随。'

const schema = z.object({
    eyebrow: z.string().min(2).max(16).default('学习成效 · 数据洞察').meta({
        description: "标题上方的小标签/分类，如『学习成效』『课程数据』",
    }),
    title: z.string().min(2).max(20).default('学员能力稳步跃升').meta({
        description: "数据页主标题（中文，简短有力）",
    }),
    description: z.string().min(6).max(54).default('六个月系统化训练后，学员综合测评分持续上扬，进步看得见。').meta({
        description: "对数据的简要说明，一句话点出趋势",
    }),
    chartData: z.object({
        type: z.enum(['bar', 'line', 'area']).default('bar'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "数据点名称，如月份/阶段" }),
            value: z.number().meta({ description: "数据点数值，如平均测评分" }),
        })).min(3).max(6),
    }).default({
        type: 'bar',
        data: [
            { name: '第1月', value: 62 },
            { name: '第2月', value: 70 },
            { name: '第3月', value: 78 },
            { name: '第4月', value: 85 },
            { name: '第5月', value: 91 },
            { name: '第6月', value: 96 },
        ],
    }).meta({ description: "图表数据，建议 4-6 个数据点呈现成长趋势" }),
    highlights: z.array(z.object({
        value: z.string().min(1).max(8).meta({ description: "关键指标数值，如 96分、+34分" }),
        label: z.string().min(2).max(14).meta({ description: "指标说明" }),
    })).min(2).max(3).default([
        { value: '+34分', label: '平均提升幅度' },
        { value: '96分', label: '结业平均测评' },
        { value: '92%', label: '学员达标率' },
    ]).meta({ description: "图表旁的关键结论指标，2-3 条" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BarChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '学习成效 · 数据洞察'
    const title = slideData?.title || '学员能力稳步跃升'
    const description = slideData?.description || '六个月系统化训练后，学员综合测评分持续上扬，进步看得见。'
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
                    background: "var(--background-color,#fffdf7)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：圆点纹样 + 柔光晕 + 成长曲线 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <radialGradient id="eduBarGlowBlue" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="eduBarGlowOrange" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </radialGradient>
                        <pattern id="eduBarDots" width="26" height="26" patternUnits="userSpaceOnUse">
                            <circle cx="3" cy="3" r="2" fill="var(--secondary-color,#f97316)" fillOpacity="0.12" />
                        </pattern>
                    </defs>
                    <circle cx="1120" cy="120" r="240" fill="url(#eduBarGlowOrange)" />
                    <circle cx="120" cy="640" r="260" fill="url(#eduBarGlowBlue)" />
                    <rect x="60" y="40" width="150" height="150" fill="url(#eduBarDots)" />
                    {/* 成长曲线母题 */}
                    <path d="M0 600 C 240 560, 420 470, 640 410 S 1080 230, 1280 150" fill="none" stroke="var(--primary-color,#2563eb)" strokeOpacity="0.08" strokeWidth="3" />
                </svg>

                <div className="relative z-10 flex h-full px-16 py-12 gap-10">
                    {/* 左侧：标签 + 标题 + 说明 + 关键结论 */}
                    <div className="flex w-[38%] flex-shrink-0 flex-col justify-center">
                        {/* 标签：灯泡图标 + eyebrow */}
                        <div
                            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
                                strokeColor="currentColor"
                                color="var(--secondary-color,#f97316)"
                                className="w-4 h-4"
                                title="lightbulb"
                            />
                            <span className="text-sm font-medium leading-relaxed">{eyebrow}</span>
                        </div>

                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div className="my-5 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />

                        <p
                            className="text-base leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#1f2937)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        {/* 关键结论指标 */}
                        <div className="mt-8 space-y-4">
                            {highlights.map((h, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 rounded-2xl px-4 py-3"
                                    style={{ background: "var(--card-color,#ffffff)", boxShadow: '0 6px 18px rgba(37,99,235,0.06)' }}
                                >
                                    <span
                                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                                        style={{ background: i % 2 === 0 ? "var(--primary-color,#2563eb)" : "var(--secondary-color,#f97316)" }}
                                    >
                                        <RemoteSvgIcon
                                            url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg"
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-5 h-5"
                                            title="chart-line-up"
                                        />
                                    </span>
                                    <span
                                        className="text-2xl font-black leading-[1.3]"
                                        style={{ color: i % 2 === 0 ? "var(--primary-color,#2563eb)" : "var(--secondary-color,#f97316)" }}
                                    >
                                        {h.value}
                                    </span>
                                    <span
                                        className="text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#1f2937)", opacity: 0.66, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {h.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 右侧：圆角图表卡片 */}
                    <div
                        className="relative flex flex-1 flex-col rounded-3xl border p-6 shadow-sm"
                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#f1e9d8)" }}
                    >
                        {/* 卡片角标：书本图标 */}
                        <div className="absolute top-5 right-5 flex items-center gap-2">
                            <span
                                className="flex h-9 w-9 items-center justify-center rounded-full"
                                style={{ background: "rgba(37,99,235,0.10)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-color,#2563eb)"
                                    className="w-5 h-5"
                                    title="book open"
                                />
                            </span>
                        </div>

                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-3 w-3 flex-shrink-0 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                            <span
                                className="text-sm font-semibold leading-relaxed break-words"
                                style={{ color: "var(--background-text,#1f2937)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                各阶段平均测评分
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
