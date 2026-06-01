import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'business-cn-kpi-metrics'
export const layoutName = '核心数据'
export const layoutDescription = '商务风核心数据页：3-4 个超大数字 KPI 卡片，配标签、说明与图标。深蓝稳健网格 + 橙色强调，纯 CSS/SVG 装饰，离线可渲染。'

const metricSchema = z.object({
    value: z.string().min(1).max(8).meta({
        description: "核心数值，超大展示，如 98亿、+23%、4.9",
    }),
    label: z.string().min(2).max(16).meta({
        description: "指标名称，如 年度营收、客户满意度",
    }),
    desc: z.string().min(2).max(30).optional().meta({
        description: "指标补充说明（可选），一句话点明含义",
    }),
    icon: IconSchema.optional().meta({
        description: "指标图标（可选）",
    }),
})

const schema = z.object({
    title: z.string().min(2).max(20).default('2025 核心经营数据').meta({
        description: "数据页主标题（中文，简短有力）",
    }),
    metrics: z.array(metricSchema).min(3).max(4).default([
        {
            value: '98亿',
            label: '全年营业收入',
            desc: '同比增长 23%，连续五年正增长',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'revenue growth',
            },
        },
        {
            value: '32.6%',
            label: '毛利率',
            desc: '产品结构持续优化，盈利能力稳步提升',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/trend-up-bold.svg',
                __icon_query__: 'gross margin',
            },
        },
        {
            value: '1,280万',
            label: '活跃客户数',
            desc: '覆盖全国 28 个省级行政区',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'active customers',
            },
        },
        {
            value: '4.9',
            label: '客户满意度',
            desc: '满分 5 分，行业领先水平',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/star-bold.svg',
                __icon_query__: 'satisfaction score',
            },
        },
    ]).meta({
        description: "核心 KPI 指标列表（3-4 个大数字）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const KpiMetrics: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '2025 核心经营数据'
    const metrics = (slideData?.metrics && slideData.metrics.length > 0
        ? slideData.metrics
        : [
            { value: '98亿', label: '全年营业收入', desc: '同比增长 23%，连续五年正增长' },
            { value: '32.6%', label: '毛利率', desc: '产品结构持续优化，盈利能力稳步提升' },
            { value: '1,280万', label: '活跃客户数', desc: '覆盖全国 28 个省级行政区' },
            { value: '4.9', label: '客户满意度', desc: '满分 5 分，行业领先水平' },
        ]
    ).slice(0, 4)

    const cols = metrics.length >= 4 ? 'grid-cols-4' : metrics.length === 3 ? 'grid-cols-3' : 'grid-cols-2'

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
                {/* 背景：稳健网格 + 几何面板 + 光晕装饰 */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="bizKpiGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0H0V48" fill="none" stroke="var(--stroke,#e2e8f0)" strokeWidth="1" strokeOpacity="0.7" />
                        </pattern>
                        <linearGradient id="bizKpiTopGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#1e3a8a)" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="var(--primary-color,#1e3a8a)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#bizKpiGrid)" />
                    <rect width="1280" height="260" fill="url(#bizKpiTopGlow)" />
                </svg>

                {/* 左上角深蓝几何强调块 */}
                <div
                    className="absolute top-0 left-0"
                    style={{ width: '300px', height: '8px', background: "var(--primary-color,#1e3a8a)" }}
                />
                <div
                    className="absolute top-0 left-0"
                    style={{ width: '64px', height: '8px', background: "var(--secondary-color,#f97316)" }}
                />

                <div className="relative z-10 flex h-full flex-col justify-center px-16 py-12">
                    {/* 标题区 */}
                    <div className="mb-10 flex items-end justify-between gap-6">
                        <div className="flex flex-col">
                            <span
                                className="mb-3 inline-flex w-fit items-center rounded-full px-4 py-1 text-sm font-medium break-words"
                                style={{
                                    color: "var(--secondary-color,#f97316)",
                                    background: "rgba(249,115,22,0.10)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                KEY METRICS · 核心数据
                            </span>
                            <h1
                                className="text-5xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                        <div
                            className="hidden h-1.5 w-28 flex-shrink-0 rounded-full sm:block"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />
                    </div>

                    {/* KPI 卡片网格 */}
                    <div className={`grid ${cols} gap-6`}>
                        {metrics.map((m, i) => {
                            const icon = (m as any)?.icon
                            return (
                                <div
                                    key={i}
                                    className="relative flex flex-col overflow-hidden rounded-2xl border p-6 shadow-sm"
                                    style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                                >
                                    {/* 卡片顶部深蓝细条强调 */}
                                    <div
                                        className="absolute top-0 left-0 h-1 w-full"
                                        style={{ background: "var(--primary-color,#1e3a8a)" }}
                                    />

                                    {/* 序号 + 图标行 */}
                                    <div className="mb-4 flex items-center justify-between">
                                        <span
                                            className="text-sm font-black leading-none"
                                            style={{ color: "var(--stroke,#e2e8f0)" }}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <div
                                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                                            style={{ background: "var(--primary-color,#1e3a8a)" }}
                                        >
                                            {icon?.__icon_url__ ? (
                                                <RemoteSvgIcon
                                                    url={icon.__icon_url__}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-text,#ffffff)"
                                                    className="w-6 h-6"
                                                    title={icon.__icon_query__ || m.label}
                                                />
                                            ) : (
                                                <div
                                                    className="h-2.5 w-2.5 rounded-full"
                                                    style={{ background: "var(--secondary-color,#f97316)" }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* 超大数值 */}
                                    <div
                                        className="text-6xl font-black leading-[1.05] break-words"
                                        style={{ color: "var(--primary-color,#1e3a8a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m.value}
                                    </div>

                                    {/* 橙色下划强调 */}
                                    <div
                                        className="mt-3 mb-3 h-1 w-10 rounded-full"
                                        style={{ background: "var(--secondary-color,#f97316)" }}
                                    />

                                    {/* 标签 */}
                                    <div
                                        className="text-base font-bold leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m.label}
                                    </div>

                                    {/* 说明 */}
                                    {m.desc && (
                                        <p
                                            className="mt-1.5 text-sm leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {m.desc}
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default KpiMetrics
