import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'travel-cn-kpi-metrics'
export const layoutName = '核心数据'
export const layoutDescription = '旅游文旅风核心数据页：3-4 个超大字重 KPI 卡片，配指南针/路线点缀与海蓝暖阳渐变。纯 CSS/SVG 装饰，离线可渲染，主题色自动跟随。'

const schema = z.object({
    title: z.string().min(2).max(20).default('一程山海 数说远方').meta({
        description: "核心数据页主标题（中文，简短有力，旅游文旅语境）",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(8).meta({
            description: "核心指标数值，超大字重展示，如 1280万、4.8分、56国",
        }),
        label: z.string().min(2).max(16).meta({
            description: "指标名称/说明，如『年度接待游客』",
        }),
        desc: z.string().max(30).optional().meta({
            description: "指标补充描述（可选），一句话注脚",
        }),
        icon: IconSchema.optional().meta({
            description: "指标配套图标（可选），用真实 phosphor 图标名",
        }),
    })).min(3).max(4).default([
        {
            value: '1280万',
            label: '年度接待游客',
            desc: '同比增长 23%，再创历史新高',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'tourists crowd',
            },
        },
        {
            value: '4.8分',
            label: '游客满意度',
            desc: '五星好评率超九成，口碑领先',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/star-bold.svg',
                __icon_query__: 'rating star',
            },
        },
        {
            value: '56处',
            label: '精品打卡景点',
            desc: '涵盖山海湖林四大主题线路',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg',
                __icon_query__: 'destination map pin',
            },
        },
        {
            value: '89亿',
            label: '旅游综合收入',
            desc: '带动周边餐宿零售协同增长',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/airplane-tilt-bold.svg',
                __icon_query__: 'travel airplane',
            },
        },
    ]).meta({ description: "核心数据指标，3-4 个大数字 KPI" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const KpiMetrics: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '一程山海 数说远方'
    const metrics = (slideData?.metrics && slideData.metrics.length > 0)
        ? slideData.metrics
        : [
            { value: '1280万', label: '年度接待游客', desc: '同比增长 23%，再创历史新高' },
            { value: '4.8分', label: '游客满意度', desc: '五星好评率超九成，口碑领先' },
            { value: '56处', label: '精品打卡景点', desc: '涵盖山海湖林四大主题线路' },
            { value: '89亿', label: '旅游综合收入', desc: '带动周边餐宿零售协同增长' },
        ]

    const count = metrics.length
    const gridColsClass = count <= 3 ? 'grid-cols-3' : 'grid-cols-4'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f0f9ff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：海蓝暖阳光晕 + 路线母题 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="travelKpiSky" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="travelKpiSun" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.22" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 顶部海天渐变带 */}
                        <rect x="0" y="0" width="1280" height="320" fill="url(#travelKpiSky)" />
                        {/* 暖阳光晕（右上） */}
                        <circle cx="1120" cy="120" r="260" fill="url(#travelKpiSun)" />
                        {/* 同心罗盘环（右上角指南针母题） */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={i} cx="1180" cy="90" r={36 + i * 30} fill="none" stroke="var(--primary-color,#0891b2)" strokeOpacity={0.12} strokeWidth="1.5" />
                        ))}
                        {/* 蜿蜒路线（底部虚线 + 路线点） */}
                        <path d="M -40 640 C 200 600 320 700 540 650 C 760 600 900 700 1120 640 C 1200 618 1260 632 1320 612" fill="none" stroke="var(--secondary-color,#f59e0b)" strokeOpacity="0.30" strokeWidth="2.5" strokeDasharray="2 12" strokeLinecap="round" />
                        {[120, 380, 660, 940, 1180].map((cx, i) => (
                            <circle key={i} cx={cx} cy={[632, 668, 646, 676, 624][i]} r="5" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.55" />
                        ))}
                    </svg>
                </div>

                {/* 内容主体 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 + 指南针角标 */}
                    <div className="flex items-start justify-between gap-6">
                        <div className="flex flex-col">
                            <span
                                className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                                style={{
                                    color: "var(--primary-color,#0891b2)",
                                    background: "rgba(8,145,178,0.10)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                <span className="inline-block h-2 w-2 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                                文旅数据 · 一图读懂
                            </span>
                            <h1
                                className="text-5xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div className="mt-5 h-1.5 w-24 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                        </div>

                        {/* 指南针角标 */}
                        <div
                            className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full"
                            style={{ background: "var(--card-color,#ffffff)", boxShadow: '0 8px 24px rgba(8,145,178,0.16)' }}
                        >
                            <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
                                <circle cx="24" cy="24" r="20" fill="none" stroke="var(--primary-color,#0891b2)" strokeWidth="2" />
                                <polygon points="24,9 29,24 24,21 19,24" fill="var(--secondary-color,#f59e0b)" />
                                <polygon points="24,39 19,24 24,27 29,24" fill="var(--primary-color,#0891b2)" />
                                <circle cx="24" cy="24" r="2.5" fill="var(--background-text,#0c4a6e)" />
                            </svg>
                        </div>
                    </div>

                    {/* KPI 卡片网格 */}
                    <div className={`mt-10 grid flex-1 ${gridColsClass} gap-6`}>
                        {metrics.map((m, i) => (
                            <div
                                key={i}
                                className="flex flex-col rounded-3xl border p-7 shadow-sm"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#bae6fd)",
                                }}
                            >
                                {/* 顶部：图标徽章 + 序号 */}
                                <div className="flex items-center justify-between">
                                    <div
                                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                                        style={{
                                            background: "linear-gradient(135deg, var(--primary-color,#0891b2), var(--secondary-color,#f59e0b))",
                                            color: "var(--primary-text,#ffffff)",
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
                                            <span className="text-lg font-black" style={{ color: "var(--primary-text,#ffffff)" }}>
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                        )}
                                    </div>
                                    <span
                                        className="text-sm font-bold leading-none"
                                        style={{ color: "var(--stroke,#bae6fd)" }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* 超大字重数值 */}
                                <div className="mt-7 flex flex-1 flex-col justify-center">
                                    <span
                                        className="text-6xl font-black leading-[1.05] break-words"
                                        style={{ color: "var(--primary-color,#0891b2)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m.value}
                                    </span>
                                    <span
                                        className="mt-3 text-lg font-bold leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m.label}
                                    </span>
                                </div>

                                {/* 描述注脚 */}
                                {m.desc && (
                                    <p
                                        className="mt-4 border-t pt-3 text-sm leading-[1.7] break-words"
                                        style={{
                                            color: "var(--background-text,#0c4a6e)",
                                            opacity: 0.7,
                                            borderColor: "var(--stroke,#bae6fd)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
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
