import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'manufacturing-cn-kpi-metrics'
export const layoutName = '核心数据'
export const layoutDescription = '智能制造风核心数据页：工业深灰底 + 精密网格 + 齿轮与产线母题，3-4 个超大字重 KPI 数字卡片。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('智能工厂运行指标').meta({
        description: "核心数据页主标题（中文，简短有力）",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(8).meta({
            description: "核心数值，超大字重展示，如 99.2%、12万、0.8s",
        }),
        label: z.string().min(2).max(16).meta({
            description: "指标名称",
        }),
        desc: z.string().max(30).optional().meta({
            description: "指标补充说明（可选）",
        }),
        icon: IconSchema.optional().meta({
            description: "指标配图标（可选）",
        }),
    })).min(3).max(4).default([
        {
            value: '99.2%',
            label: '产线综合稼动率',
            desc: '全线无人化连续运转，远超行业均值',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg',
                __icon_query__: 'gear',
            },
        },
        {
            value: '12万',
            label: '日均下线整机',
            desc: '柔性产线支撑多型号混线生产',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/factory-bold.svg',
                __icon_query__: 'factory',
            },
        },
        {
            value: '0.8s',
            label: '单工位节拍',
            desc: '高速机械臂协同，节拍稳定可控',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightning-bold.svg',
                __icon_query__: 'lightning',
            },
        },
        {
            value: '0.03%',
            label: '产品不良率',
            desc: '机器视觉全检，缺陷实时拦截',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
                __icon_query__: 'shield check',
            },
        },
    ]).meta({ description: "3-4 个核心 KPI 指标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const KpiMetrics: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '智能工厂运行指标'
    const metrics = (slideData?.metrics && slideData.metrics.length > 0)
        ? slideData.metrics
        : [
            { value: '99.2%', label: '产线综合稼动率', desc: '全线无人化连续运转，远超行业均值' },
            { value: '12万', label: '日均下线整机', desc: '柔性产线支撑多型号混线生产' },
            { value: '0.8s', label: '单工位节拍', desc: '高速机械臂协同，节拍稳定可控' },
            { value: '0.03%', label: '产品不良率', desc: '机器视觉全检，缺陷实时拦截' },
        ]
    const count = metrics.length

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#1f2937)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：精密网格 + 齿轮 + 金属质感线条 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="mfgKpiGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L0 0 L0 40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.45" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="mfgKpiTop" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="mfgKpiGlow" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 精密网格 */}
                    <rect width="1280" height="720" fill="url(#mfgKpiGrid)" />
                    {/* 顶部蓝色辉光带 */}
                    <rect width="1280" height="260" fill="url(#mfgKpiTop)" />
                    {/* 右上橙色光晕 */}
                    <circle cx="1180" cy="60" r="220" fill="url(#mfgKpiGlow)" />
                    {/* 左下大齿轮母题 */}
                    <g transform="translate(110 640)" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.18" fill="none" strokeWidth="2">
                        <circle r="86" />
                        <circle r="44" />
                        {Array.from({ length: 12 }).map((_, i) => {
                            const a = (i * Math.PI * 2) / 12
                            const x1 = Math.cos(a) * 86
                            const y1 = Math.sin(a) * 86
                            const x2 = Math.cos(a) * 108
                            const y2 = Math.sin(a) * 108
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                        })}
                    </g>
                    {/* 产线 / 硬朗金属线条 */}
                    <line x1="0" y1="150" x2="1280" y2="150" stroke="var(--stroke,#374151)" strokeOpacity="0.7" strokeWidth="1.5" />
                    <line x1="0" y1="156" x2="1280" y2="156" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.28" strokeWidth="1" />
                    {[260, 520, 780, 1040].map((x, i) => (
                        <circle key={i} cx={x} cy="153" r="4" fill="var(--secondary-color,#f97316)" fillOpacity="0.5" />
                    ))}
                </svg>

                {/* 内容主层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="flex items-center gap-4">
                        <div className="h-9 w-1.5 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <div className="flex flex-col">
                            <span
                                className="text-xs font-semibold tracking-wide leading-relaxed break-words"
                                style={{ color: "var(--secondary-color,#f97316)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                INTELLIGENT MANUFACTURING · 核心数据
                            </span>
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* KPI 卡片区 */}
                    <div
                        className="mt-10 grid flex-1 items-stretch gap-6"
                        style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
                    >
                        {metrics.map((m, i) => {
                            const value = m?.value || '0'
                            const label = m?.label || '指标'
                            const desc = m?.desc
                            const icon = (m as any)?.icon
                            return (
                                <div
                                    key={i}
                                    className="relative flex flex-col justify-between overflow-hidden rounded-2xl border p-7"
                                    style={{
                                        background: "var(--card-color,#111827)",
                                        borderColor: "var(--stroke,#374151)",
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                                    }}
                                >
                                    {/* 卡片顶部彩条（蓝橙交替，硬朗工业感） */}
                                    <div
                                        className="absolute left-0 top-0 h-1 w-full"
                                        style={{
                                            background: i % 2 === 0
                                                ? "var(--primary-color,#3b82f6)"
                                                : "var(--secondary-color,#f97316)",
                                        }}
                                    />
                                    {/* 卡片内精密角标网格 */}
                                    <svg viewBox="0 0 120 120" className="absolute -right-4 -top-4 h-28 w-28" aria-hidden="true">
                                        <g stroke="var(--stroke,#374151)" strokeOpacity="0.5" strokeWidth="1" fill="none">
                                            {[24, 48, 72, 96].map((p) => (
                                                <line key={`v${p}`} x1={p} y1="0" x2={p} y2="120" />
                                            ))}
                                            {[24, 48, 72, 96].map((p) => (
                                                <line key={`h${p}`} x1="0" y1={p} x2="120" y2={p} />
                                            ))}
                                        </g>
                                    </svg>

                                    {/* 顶部：图标 + 序号 */}
                                    <div className="relative flex items-center justify-between">
                                        <div
                                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg"
                                            style={{
                                                background: i % 2 === 0
                                                    ? "rgba(59,130,246,0.16)"
                                                    : "rgba(249,115,22,0.16)",
                                                border: `1px solid var(--stroke,#374151)`,
                                            }}
                                        >
                                            {icon?.__icon_url__ ? (
                                                <RemoteSvgIcon
                                                    url={icon.__icon_url__}
                                                    strokeColor="currentColor"
                                                    color={i % 2 === 0 ? "var(--primary-color,#3b82f6)" : "var(--secondary-color,#f97316)"}
                                                    className="w-6 h-6"
                                                    title={icon.__icon_query__ || 'metric'}
                                                />
                                            ) : (
                                                <span
                                                    className="text-base font-black leading-none"
                                                    style={{ color: i % 2 === 0 ? "var(--primary-color,#3b82f6)" : "var(--secondary-color,#f97316)" }}
                                                >
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                            )}
                                        </div>
                                        <span
                                            className="text-xs font-mono font-semibold leading-relaxed"
                                            style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.4 }}
                                        >
                                            {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                                        </span>
                                    </div>

                                    {/* 中部：超大字重数值 */}
                                    <div className="relative mt-6">
                                        <span
                                            className="block text-6xl font-black leading-[1.05] break-words"
                                            style={{
                                                color: "var(--primary-text,#ffffff)",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {value}
                                        </span>
                                    </div>

                                    {/* 底部：标签 + 说明 */}
                                    <div className="relative mt-5">
                                        <div
                                            className="mb-3 h-0.5 w-10 rounded-full"
                                            style={{
                                                background: i % 2 === 0
                                                    ? "var(--primary-color,#3b82f6)"
                                                    : "var(--secondary-color,#f97316)",
                                            }}
                                        />
                                        <p
                                            className="text-lg font-bold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {label}
                                        </p>
                                        {desc && (
                                            <p
                                                className="mt-1.5 text-sm leading-relaxed break-words"
                                                style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.62, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {desc}
                                            </p>
                                        )}
                                    </div>
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
