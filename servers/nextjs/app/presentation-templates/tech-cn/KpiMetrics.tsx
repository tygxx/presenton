import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'tech-cn-kpi-metrics'
export const layoutName = '核心数据'
export const layoutDescription = '科技风核心数据页：深色底 + 霓虹蓝紫渐变高光、几何网格与电路线装饰，3-4 个超大数字 KPI，半透明发光描边卡片。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('核心业绩指标').meta({
        description: "数据页主标题（中文，简短有力）",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(8).meta({
            description: "核心数值，超大字重显示，如 1.2亿、99.9%、3.5s",
        }),
        label: z.string().min(2).max(16).meta({
            description: "指标名称/说明",
        }),
        desc: z.string().max(30).optional().meta({
            description: "指标补充描述（可选，一句话）",
        }),
        icon: IconSchema.optional().meta({
            description: "指标配图标（可选）",
        }),
    })).min(3).max(4).default([
        {
            value: '1.2亿',
            label: '月活跃用户',
            desc: '同比增长 38%，稳居行业第一梯队',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'active users',
            },
        },
        {
            value: '99.99%',
            label: '服务可用性',
            desc: '全年故障时间低于一小时',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
                __icon_query__: 'reliability shield',
            },
        },
        {
            value: '48ms',
            label: '平均响应时延',
            desc: '边缘节点加速，体验如丝般顺滑',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightning-bold.svg',
                __icon_query__: 'low latency',
            },
        },
        {
            value: '2.6万+',
            label: '日均调用',
            desc: '开放平台接口稳定承载高并发',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'api calls growth',
            },
        },
    ]).meta({ description: "核心 KPI 指标列表（3-4 项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const KpiMetrics: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '核心业绩指标'
    const metrics = (slideData?.metrics && slideData.metrics.length > 0)
        ? slideData.metrics
        : [
            { value: '1.2亿', label: '月活跃用户', desc: '同比增长 38%，稳居行业第一梯队' },
            { value: '99.99%', label: '服务可用性', desc: '全年故障时间低于一小时' },
            { value: '48ms', label: '平均响应时延', desc: '边缘节点加速，体验如丝般顺滑' },
            { value: '2.6万+', label: '日均调用', desc: '开放平台接口稳定承载高并发' },
        ]
    const count = metrics.length
    const gridColsClass = count >= 4 ? 'grid-cols-4' : count === 3 ? 'grid-cols-3' : 'grid-cols-2'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0a0e1a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：几何网格 + 电路线 + 霓虹光晕 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="techKpiNeon" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.55" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="techKpiGlowA" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.40" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="techKpiGlowB" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.38" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </radialGradient>
                            <pattern id="techKpiGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                                <path d="M48 0H0V48" fill="none" stroke="var(--stroke,#1f2937)" strokeOpacity="0.7" strokeWidth="1" />
                            </pattern>
                        </defs>
                        {/* 网格 */}
                        <rect width="1280" height="720" fill="url(#techKpiGrid)" />
                        {/* 顶部霓虹渐变高光 */}
                        <rect width="1280" height="720" fill="url(#techKpiNeon)" />
                        {/* 角落光晕 */}
                        <circle cx="120" cy="80" r="320" fill="url(#techKpiGlowA)" />
                        <circle cx="1180" cy="660" r="340" fill="url(#techKpiGlowB)" />
                        {/* 电路线 */}
                        <g stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.35" strokeWidth="1.5" fill="none">
                            <path d="M0 150 H300 L340 190 H620" />
                            <path d="M1280 250 H1000 L960 290 H760" />
                            <path d="M0 600 H180 L220 560 H520" />
                        </g>
                        <g fill="var(--secondary-color,#8b5cf6)" fillOpacity="0.65">
                            <circle cx="620" cy="190" r="4" />
                            <circle cx="760" cy="290" r="4" />
                            <circle cx="520" cy="560" r="4" />
                        </g>
                        <g fill="var(--primary-color,#3b82f6)" fillOpacity="0.7">
                            <circle cx="300" cy="150" r="3.5" />
                            <circle cx="1000" cy="250" r="3.5" />
                            <circle cx="180" cy="600" r="3.5" />
                        </g>
                    </svg>
                </div>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex items-center gap-4">
                        <div
                            className="h-9 w-1.5 flex-shrink-0 rounded-full"
                            style={{
                                background: "linear-gradient(180deg,var(--primary-color,#3b82f6),var(--secondary-color,#8b5cf6))",
                            }}
                        />
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                    </div>
                    <div
                        className="mt-5 h-px w-full"
                        style={{ background: "linear-gradient(90deg,var(--stroke,#1f2937),transparent)" }}
                    />

                    {/* KPI 卡片网格 */}
                    <div className={`mt-8 grid flex-1 ${gridColsClass} items-stretch gap-6`}>
                        {metrics.map((m, i) => (
                            <div
                                key={i}
                                className="flex flex-col rounded-2xl border p-7"
                                style={{
                                    background: "linear-gradient(160deg, rgba(17,24,39,0.92), rgba(17,24,39,0.55))",
                                    borderColor: "var(--stroke,#1f2937)",
                                    boxShadow: "0 0 0 1px rgba(59,130,246,0.10), 0 18px 40px -24px rgba(59,130,246,0.55)",
                                }}
                            >
                                {/* 图标 + 序号 */}
                                <div className="flex items-center justify-between">
                                    <div
                                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                        style={{
                                            background: "linear-gradient(135deg,var(--primary-color,#3b82f6),var(--secondary-color,#8b5cf6))",
                                            boxShadow: "0 0 18px -2px rgba(139,92,246,0.65)",
                                        }}
                                    >
                                        {m.icon?.__icon_url__ ? (
                                            <RemoteSvgIcon
                                                url={m.icon.__icon_url__}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-6 h-6"
                                                title={m.icon.__icon_query__}
                                            />
                                        ) : (
                                            <span
                                                className="text-base font-black"
                                                style={{ color: "var(--primary-text,#ffffff)", fontVariantNumeric: 'tabular-nums' }}
                                            >
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                        )}
                                    </div>
                                    <span
                                        className="text-sm font-bold"
                                        style={{ color: "var(--primary-color,#3b82f6)", fontVariantNumeric: 'tabular-nums', opacity: 0.8 }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* 超大数值 */}
                                <div className="mt-7 flex-1 flex flex-col justify-center">
                                    <div
                                        className="text-6xl font-black leading-[1.05] break-words"
                                        style={{
                                            color: "var(--primary-text,#ffffff)",
                                            fontVariantNumeric: 'tabular-nums',
                                            overflowWrap: 'break-word',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {m.value}
                                    </div>
                                </div>

                                {/* 分隔光线 */}
                                <div
                                    className="my-4 h-px w-full"
                                    style={{ background: "linear-gradient(90deg,var(--primary-color,#3b82f6),transparent)", opacity: 0.4 }}
                                />

                                {/* 标签 + 描述 */}
                                <div
                                    className="text-lg font-bold leading-relaxed break-words"
                                    style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {m.label}
                                </div>
                                {m.desc && (
                                    <p
                                        className="mt-2 text-sm leading-[1.7] break-words"
                                        style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.62, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m.desc}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default KpiMetrics
