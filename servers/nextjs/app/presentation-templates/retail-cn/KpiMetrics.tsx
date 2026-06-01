import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'retail-cn-kpi-metrics'
export const layoutName = '核心数据'
export const layoutDescription = '电商新零售风核心数据页：撞色大色块 + 圆角卡片 + 价签母题，3-4 个超大字重 KPI 数字。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('大促核心战报').meta({
        description: "页面主标题（中文，简短有力，≤20字）",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(8).meta({
            description: "核心数值，超大字重展示，如 1.2亿、+87%、328万",
        }),
        label: z.string().min(2).max(16).meta({
            description: "数值含义标签，如『全渠道GMV』",
        }),
        desc: z.string().max(30).optional().meta({
            description: "可选补充说明，一句话点评（≤30字）",
        }),
        icon: IconSchema.optional().meta({
            description: "可选指标图标",
        }),
    })).min(3).max(4).default([
        {
            value: '1.28亿',
            label: '全渠道GMV',
            desc: '同比增长 86%，刷新历史峰值',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shopping-cart-bold.svg',
                __icon_query__: 'shopping cart',
            },
        },
        {
            value: '328万',
            label: '下单用户数',
            desc: '新客占比 42%，复购稳步提升',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'users three',
            },
        },
        {
            value: '+87%',
            label: '直播间转化',
            desc: '爆款短视频引流，停留时长翻倍',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'chart line up',
            },
        },
        {
            value: '4.9分',
            label: '会员满意度',
            desc: '极速发货与售后好评双高',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/star-bold.svg',
                __icon_query__: 'star',
            },
        },
    ]).meta({ description: "核心数据指标列表，3-4 项" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const KpiMetrics: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '大促核心战报'
    const metrics = (slideData?.metrics && slideData.metrics.length > 0
        ? slideData.metrics
        : ((schema.shape.metrics as any)._def.defaultValue as SlideData['metrics'])).slice(0, 4)

    const count = metrics.length
    const gridCols = count >= 4 ? 'grid-cols-4' : count === 3 ? 'grid-cols-3' : 'grid-cols-2'

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
                {/* 背景装饰层：撞色大色块 + 活力几何形 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    {/* 左上撞色大色块 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-160px', left: '-120px', width: '440px', height: '440px',
                            borderRadius: '9999px',
                            background: "var(--primary-color,#db2777)",
                            opacity: 0.10,
                        }}
                    />
                    {/* 右下活力几何 */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '-140px', right: '-100px', width: '380px', height: '380px',
                            borderRadius: '64px',
                            transform: 'rotate(18deg)',
                            background: "var(--secondary-color,#f59e0b)",
                            opacity: 0.10,
                        }}
                    />
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="retailKpiSheen" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#db2777)" stopOpacity="0.05" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.05" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#retailKpiSheen)" />
                        {[0, 1, 2].map((i) => (
                            <circle key={i} cx="1080" cy="120" r={50 + i * 42} fill="none" stroke="var(--secondary-color,#f59e0b)" strokeOpacity="0.16" strokeWidth="2" />
                        ))}
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-14">
                    {/* 顶部：价签母题标签 + 主标题 */}
                    <div className="flex items-center gap-4">
                        {/* 价签形状（撞色） */}
                        <span
                            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold break-words"
                            style={{
                                background: "var(--primary-color,#db2777)",
                                color: "var(--primary-text,#ffffff)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2.5 w-2.5 rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            />
                            DATA · 数据看板
                        </span>
                        <div
                            className="h-1.5 flex-1 rounded-full"
                            style={{ background: "var(--stroke,#fbcfe8)" }}
                        />
                    </div>

                    <h1
                        className="mt-5 text-5xl font-black leading-[1.25] break-words"
                        style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title}
                    </h1>
                    <div className="mt-3 flex items-center gap-2">
                        <span className="h-2 w-12 rounded-full" style={{ background: "var(--primary-color,#db2777)" }} />
                        <span className="h-2 w-6 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                    </div>

                    {/* KPI 卡片网格 */}
                    <div className={`mt-9 grid flex-1 ${gridCols} gap-6`}>
                        {metrics.map((m, i) => {
                            const value = m?.value || '0'
                            const label = m?.label || '指标'
                            const desc = m?.desc
                            const icon = m?.icon
                            const accent = i % 2 === 0
                            return (
                                <div
                                    key={i}
                                    className="relative flex flex-col justify-between rounded-3xl border-2 p-6 shadow-sm overflow-hidden"
                                    style={{
                                        background: "var(--card-color,#fdf2f8)",
                                        borderColor: "var(--stroke,#fbcfe8)",
                                    }}
                                >
                                    {/* 卡片顶部撞色条 */}
                                    <div
                                        className="absolute top-0 left-0 h-1.5 w-full"
                                        style={{
                                            background: accent
                                                ? "var(--primary-color,#db2777)"
                                                : "var(--secondary-color,#f59e0b)",
                                        }}
                                        aria-hidden="true"
                                    />

                                    {/* 图标徽章 + 序号 */}
                                    <div className="flex items-start justify-between">
                                        <div
                                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                                            style={{
                                                background: accent
                                                    ? "var(--primary-color,#db2777)"
                                                    : "var(--secondary-color,#f59e0b)",
                                            }}
                                        >
                                            {icon?.__icon_url__ ? (
                                                <RemoteSvgIcon
                                                    url={icon.__icon_url__}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-text,#ffffff)"
                                                    className="w-6 h-6"
                                                    title={icon.__icon_query__}
                                                />
                                            ) : (
                                                <span
                                                    className="text-lg font-black leading-none"
                                                    style={{ color: "var(--primary-text,#ffffff)" }}
                                                >
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                            )}
                                        </div>
                                        <span
                                            className="text-sm font-black leading-none"
                                            style={{
                                                color: accent
                                                    ? "var(--primary-color,#db2777)"
                                                    : "var(--secondary-color,#f59e0b)",
                                            }}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    {/* 超大数值 */}
                                    <div className="mt-5">
                                        <div
                                            className="text-5xl font-black leading-[1.2] break-words"
                                            style={{
                                                color: accent
                                                    ? "var(--primary-color,#db2777)"
                                                    : "var(--secondary-color,#f59e0b)",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {value}
                                        </div>
                                        <div
                                            className="mt-2 text-base font-bold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {label}
                                        </div>
                                    </div>

                                    {/* 可选说明 */}
                                    {desc ? (
                                        <p
                                            className="mt-3 text-sm leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#18181b)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {desc}
                                        </p>
                                    ) : (
                                        <div className="mt-3" />
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
