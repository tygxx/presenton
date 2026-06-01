import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'green-cn-kpi-metrics'
export const layoutName = '核心数据'
export const layoutDescription = '新能源环保风核心数据页：3-4 个超大字重 KPI 数值卡片，清新白绿 + 天空蓝配色，叶片/地球/能源/自然曲线装饰母题。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('绿色发展成效').meta({
        description: "核心数据页主标题（中文，简短有力）",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(8).meta({
            description: "KPI 核心数值，超大字重展示，如 86%、120万吨、3.6GW",
        }),
        label: z.string().min(2).max(16).meta({
            description: "指标名称/说明",
        }),
        desc: z.string().max(30).optional().meta({
            description: "指标补充描述（可选，一句话）",
        }),
        icon: IconSchema.optional().meta({
            description: "指标配图标（可选，phosphor 图标）",
        }),
    })).min(3).max(4).default([
        {
            value: '86%',
            label: '清洁能源占比',
            desc: '风光储一体化供电稳步提升',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg',
                __icon_query__: 'leaf',
            },
        },
        {
            value: '120万吨',
            label: '年减碳排放',
            desc: '相当于植树六百万棵的固碳量',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-hemisphere-west-bold.svg',
                __icon_query__: 'earth globe',
            },
        },
        {
            value: '3.6GW',
            label: '装机总容量',
            desc: '风电与光伏并网装机持续扩容',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightning-bold.svg',
                __icon_query__: 'energy lightning',
            },
        },
        {
            value: '98.5%',
            label: '资源回收率',
            desc: '循环利用全流程闭环管理',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/recycle-bold.svg',
                __icon_query__: 'recycle',
            },
        },
    ]).meta({ description: "核心数据指标列表，3 至 4 个" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const KpiMetrics: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '绿色发展成效'
    const metrics = (slideData?.metrics && slideData.metrics.length > 0)
        ? slideData.metrics
        : [
            { value: '86%', label: '清洁能源占比', desc: '风光储一体化供电稳步提升' },
            { value: '120万吨', label: '年减碳排放', desc: '相当于植树六百万棵的固碳量' },
            { value: '3.6GW', label: '装机总容量', desc: '风电与光伏并网装机持续扩容' },
            { value: '98.5%', label: '资源回收率', desc: '循环利用全流程闭环管理' },
        ]

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f0fdf4)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景自然曲线 + 光晕装饰层 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="greenKpiSky" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="greenKpiHill" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                            </linearGradient>
                            <radialGradient id="greenKpiGlow" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 顶部天空蓝渐隐 */}
                        <rect width="1280" height="720" fill="url(#greenKpiSky)" />
                        {/* 右上太阳/地球光晕 */}
                        <circle cx="1140" cy="120" r="240" fill="url(#greenKpiGlow)" />
                        {/* 同心能源波纹 */}
                        {[0, 1, 2].map((i) => (
                            <circle key={i} cx="1140" cy="120" r={70 + i * 46} fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity={0.12} strokeWidth="1.5" />
                        ))}
                        {/* 底部自然起伏丘陵曲线 */}
                        <path d="M0 612 C 220 560 420 666 660 616 C 900 566 1080 650 1280 600 L 1280 720 L 0 720 Z" fill="url(#greenKpiHill)" />
                        <path d="M0 654 C 260 612 480 700 760 656 C 980 622 1140 686 1280 648 L 1280 720 L 0 720 Z" fill="var(--primary-color,#16a34a)" fillOpacity="0.08" />
                    </svg>
                </div>

                {/* 左上叶片角标装饰 */}
                <div className="absolute top-0 left-0 z-0" aria-hidden="true">
                    <svg width="180" height="180" viewBox="0 0 180 180">
                        <path
                            d="M10 170 C 10 80 70 18 168 12 C 162 110 100 170 10 170 Z"
                            fill="var(--primary-color,#16a34a)"
                            fillOpacity="0.10"
                        />
                        <path
                            d="M28 152 C 60 110 110 66 158 40"
                            fill="none"
                            stroke="var(--primary-color,#16a34a)"
                            strokeOpacity="0.22"
                            strokeWidth="2"
                        />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col justify-center px-16 py-12">
                    {/* 标题区 */}
                    <div className="mb-9 flex items-center gap-4">
                        <span
                            className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                            style={{ background: "var(--primary-color,#16a34a)" }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 21 C 5 11 11 5 20 4 C 19 14 13 20 5 21 Z" fill="var(--primary-text,#ffffff)" />
                                <path d="M8 18 C 11 13 15 9 19 6" stroke="var(--primary-color,#16a34a)" strokeWidth="1.4" strokeLinecap="round" />
                            </svg>
                        </span>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <span
                                className="mt-2 h-1.5 w-20 rounded-full"
                                style={{ background: "var(--secondary-color,#0891b2)" }}
                            />
                        </div>
                    </div>

                    {/* KPI 卡片网格 */}
                    <div
                        className="grid gap-6"
                        style={{ gridTemplateColumns: `repeat(${Math.min(Math.max(metrics.length, 1), 4)}, minmax(0, 1fr))` }}
                    >
                        {metrics.slice(0, 4).map((m, i) => {
                            const accent = i % 2 === 0 ? "var(--primary-color,#16a34a)" : "var(--secondary-color,#0891b2)"
                            return (
                                <div
                                    key={i}
                                    className="relative flex flex-col rounded-3xl border px-6 py-7 shadow-sm overflow-hidden"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#d1fae5)",
                                    }}
                                >
                                    {/* 卡片顶部彩条 */}
                                    <span
                                        className="absolute top-0 left-0 h-1.5 w-full"
                                        style={{ background: accent }}
                                    />
                                    {/* 卡片右下自然曲线水印 */}
                                    <svg
                                        className="absolute -bottom-4 -right-3"
                                        width="96" height="96" viewBox="0 0 96 96" aria-hidden="true"
                                    >
                                        <path
                                            d="M14 88 C 14 44 44 18 90 14 C 86 60 56 86 14 88 Z"
                                            fill={accent}
                                            fillOpacity="0.07"
                                        />
                                    </svg>

                                    {/* 图标 */}
                                    <span
                                        className="mb-4 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                                        style={{ background: accent }}
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
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                                <path d="M5 21 C 5 11 11 5 20 4 C 19 14 13 20 5 21 Z" fill="var(--primary-text,#ffffff)" />
                                            </svg>
                                        )}
                                    </span>

                                    {/* 超大数值 */}
                                    <div
                                        className="text-5xl font-black leading-[1.1] break-words"
                                        style={{ color: accent, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m.value}
                                    </div>

                                    {/* 指标名称 */}
                                    <div
                                        className="mt-3 text-base font-bold leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m.label}
                                    </div>

                                    {/* 描述（可选） */}
                                    {m.desc ? (
                                        <div
                                            className="mt-2 text-sm leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#14532d)", opacity: 0.66, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {m.desc}
                                        </div>
                                    ) : null}
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
