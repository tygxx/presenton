import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'finance-cn-kpi-metrics'
export const layoutName = '核心数据'
export const layoutDescription = '金融投资风核心数据页：深藏青底 + 香槟金细线与棱形装饰，3-4 个超大字重 KPI 数值卡片，配标签与说明。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('关键业绩指标').meta({
        description: "核心数据页主标题（中文，简短有力）",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(8).meta({
            description: "核心数值，超大字重展示，如 18.6% / 320亿 / 4.2x",
        }),
        label: z.string().min(2).max(16).meta({
            description: "指标名称，如『年化收益率』『管理规模』",
        }),
        desc: z.string().max(30).optional().meta({
            description: "指标补充说明（可选），一句话点出趋势或口径",
        }),
        icon: IconSchema.optional().meta({
            description: "指标配图标（可选）",
        }),
    })).min(3).max(4).default([
        {
            value: '18.6%',
            label: '年化收益率',
            desc: '近三年净值年化回报，跑赢业绩基准',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'growth trend',
            },
        },
        {
            value: '320亿',
            label: '资产管理规模',
            desc: '在管资产较年初增长逾四成',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/vault-bold.svg',
                __icon_query__: 'asset vault',
            },
        },
        {
            value: '4.2x',
            label: '已投项目回报倍数',
            desc: '存续基金平均投资本金回报',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/trend-up-bold.svg',
                __icon_query__: 'return multiple',
            },
        },
        {
            value: '0.92',
            label: '夏普比率',
            desc: '风险调整后收益处于行业前列',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
                __icon_query__: 'risk control',
            },
        },
    ]).meta({ description: "3-4 个核心 KPI 指标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const KpiMetrics: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '关键业绩指标'
    const metrics = (slideData?.metrics && slideData.metrics.length > 0)
        ? slideData.metrics
        : []

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@600;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：数据网格 + 增长曲线 + 棱形 + 细金线 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="finKpiGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.10" />
                                <stop offset="55%" stopColor="#0f172a" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="finKpiGold" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
                                <stop offset="100%" stopColor="#d4af37" stopOpacity="0.55" />
                            </linearGradient>
                            <pattern id="finKpiGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                                <path d="M48 0 L0 0 0 48" fill="none" stroke="#334155" strokeOpacity="0.30" strokeWidth="1" />
                            </pattern>
                        </defs>
                        {/* 数据网格母题 */}
                        <rect width="1280" height="720" fill="url(#finKpiGrid)" />
                        {/* 左上柔光 */}
                        <rect width="1280" height="720" fill="url(#finKpiGlow)" />
                        {/* 增长曲线母题 */}
                        <path
                            d="M-20 600 L180 560 L360 520 L540 460 L720 400 L900 300 L1080 220 L1300 120"
                            fill="none"
                            stroke="url(#finKpiGold)"
                            strokeWidth="2"
                            strokeOpacity="0.7"
                        />
                        {[
                            [180, 560], [360, 520], [540, 460], [720, 400], [900, 300], [1080, 220],
                        ].map(([cx, cy], i) => (
                            <circle key={i} cx={cx} cy={cy} r="3.5" fill="#d4af37" fillOpacity="0.7" />
                        ))}
                        {/* 棱形母题 */}
                        <rect x="1140" y="70" width="46" height="46" transform="rotate(45 1163 93)" fill="none" stroke="#d4af37" strokeOpacity="0.45" strokeWidth="1.5" />
                        <rect x="1188" y="118" width="22" height="22" transform="rotate(45 1199 129)" fill="#60a5fa" fillOpacity="0.20" />
                        <rect x="70" y="610" width="30" height="30" transform="rotate(45 85 625)" fill="none" stroke="#60a5fa" strokeOpacity="0.30" strokeWidth="1.5" />
                    </svg>
                </div>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="flex items-end justify-between gap-6">
                        <div className="flex flex-col">
                            <span
                                className="mb-3 inline-flex w-fit items-center gap-2 text-xs font-medium tracking-wide break-words"
                                style={{ color: "var(--primary-color,#d4af37)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                <span className="inline-block h-px w-8" style={{ background: "var(--primary-color,#d4af37)" }} />
                                KEY METRICS · 核心数据
                            </span>
                            <h1
                                className="text-5xl font-black leading-[1.2] break-words"
                                style={{
                                    color: "var(--background-text,#e2e8f0)",
                                    fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {title}
                            </h1>
                        </div>
                        {/* 棱形小标记 */}
                        <div className="flex flex-shrink-0 items-center gap-2 pb-2">
                            <span className="inline-block h-2 w-2 rotate-45" style={{ background: "var(--primary-color,#d4af37)" }} />
                            <span className="inline-block h-2 w-2 rotate-45" style={{ background: "var(--secondary-color,#60a5fa)", opacity: 0.7 }} />
                            <span className="inline-block h-2 w-2 rotate-45 border" style={{ borderColor: "var(--primary-color,#d4af37)" }} />
                        </div>
                    </div>

                    {/* 金色分隔细线 */}
                    <div
                        className="mt-6 mb-9 h-px w-full"
                        style={{ background: "linear-gradient(90deg, var(--primary-color,#d4af37) 0%, rgba(212,175,55,0) 60%)" }}
                    />

                    {/* KPI 卡片网格 */}
                    <div
                        className="grid flex-1 items-stretch gap-6"
                        style={{ gridTemplateColumns: `repeat(${Math.min(Math.max(metrics.length, 1), 4)}, minmax(0, 1fr))` }}
                    >
                        {metrics.map((m, i) => {
                            const value = m?.value || ''
                            const label = m?.label || ''
                            const desc = m?.desc || ''
                            const icon = m?.icon
                            return (
                                <div
                                    key={i}
                                    className="relative flex flex-col justify-between rounded-2xl border p-7 overflow-hidden"
                                    style={{
                                        background: "var(--card-color,#1e293b)",
                                        borderColor: "var(--stroke,#334155)",
                                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                                    }}
                                >
                                    {/* 卡片顶部金线 */}
                                    <span
                                        className="absolute left-0 top-0 h-[3px] w-full"
                                        style={{ background: "linear-gradient(90deg, var(--primary-color,#d4af37) 0%, rgba(212,175,55,0.15) 100%)" }}
                                        aria-hidden="true"
                                    />
                                    {/* 卡片右下棱形水印 */}
                                    <span
                                        className="absolute -bottom-5 -right-5 h-16 w-16 rotate-45 border"
                                        style={{ borderColor: "var(--stroke,#334155)", opacity: 0.6 }}
                                        aria-hidden="true"
                                    />

                                    {/* 顶部：序号 + 图标 */}
                                    <div className="flex items-center justify-between">
                                        <span
                                            className="text-xs font-bold tracking-wider"
                                            style={{ color: "var(--primary-color,#d4af37)", opacity: 0.8 }}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        {icon?.__icon_url__ && (
                                            <span
                                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                                                style={{ background: "rgba(212,175,55,0.12)", border: "1px solid var(--stroke,#334155)" }}
                                            >
                                                <RemoteSvgIcon
                                                    url={icon.__icon_url__}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-color,#d4af37)"
                                                    className="w-5 h-5"
                                                    title={icon.__icon_query__ || label}
                                                />
                                            </span>
                                        )}
                                    </div>

                                    {/* 超大数值 */}
                                    <div className="my-4">
                                        <span
                                            className="block text-6xl font-black leading-[1.1] break-words"
                                            style={{
                                                color: "var(--primary-text,#ffffff)",
                                                fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {value}
                                        </span>
                                    </div>

                                    {/* 标签 + 说明 */}
                                    <div className="flex flex-col gap-2">
                                        <span
                                            className="text-base font-bold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#e2e8f0)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {label}
                                        </span>
                                        {desc && (
                                            <span
                                                className="text-xs leading-relaxed break-words"
                                                style={{ color: "var(--background-text,#94a3b8)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {desc}
                                            </span>
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
