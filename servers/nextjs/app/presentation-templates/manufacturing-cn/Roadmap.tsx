import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { IconSchema } from '../defaultSchemes';

export const layoutId = 'manufacturing-cn-roadmap'
export const layoutName = '路线图'
export const layoutDescription = '智能制造风路线图：工业深灰底 + 精密网格 + 蓝橙阶段卡横向排列，沿产线推进的分阶段计划。纯 CSS/SVG 装饰（齿轮/产线/金属线条），离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('智能工厂演进路线').meta({
        description: "路线图主标题（中文，简短有力）",
    }),
    phases: z.array(z.object({
        phase: z.string().min(2).max(10).meta({
            description: "阶段编号，如『第一阶段』",
        }),
        title: z.string().min(2).max(16).meta({
            description: "该阶段核心目标标题",
        }),
        icon: IconSchema.default({
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg",
            __icon_query__: "gear",
        }).meta({
            description: "阶段图标",
        }),
        items: z.array(z.string().min(2).max(24)).min(1).max(3).meta({
            description: "该阶段关键举措（1-3条）",
        }),
    })).min(3).max(4).default([
        {
            phase: '第一阶段',
            title: '产线数字化',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg",
                __icon_query__: "gear",
            },
            items: ['设备联网与数据采集', '搭建工业物联网平台', '关键工序在线监测'],
        },
        {
            phase: '第二阶段',
            title: '柔性化生产',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/factory-bold.svg",
                __icon_query__: "factory",
            },
            items: ['自动化产线改造', '多品种小批量切换', '智能排产与调度'],
        },
        {
            phase: '第三阶段',
            title: '数据驱动优化',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg",
                __icon_query__: "chart line up",
            },
            items: ['质量预测与防错', '设备预测性维护', '能耗与良率优化'],
        },
        {
            phase: '第四阶段',
            title: '黑灯工厂',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/robot-bold.svg",
                __icon_query__: "robot",
            },
            items: ['全流程无人化作业', '自主决策与协同', '端到端智能闭环'],
        },
    ]).meta({
        description: "分阶段路线（3-4个阶段，横向排列）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DEFAULT_PHASES: SlideData['phases'] = [
    {
        phase: '第一阶段',
        title: '产线数字化',
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg",
            __icon_query__: "gear",
        },
        items: ['设备联网与数据采集', '搭建工业物联网平台', '关键工序在线监测'],
    },
    {
        phase: '第二阶段',
        title: '柔性化生产',
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/factory-bold.svg",
            __icon_query__: "factory",
        },
        items: ['自动化产线改造', '多品种小批量切换', '智能排产与调度'],
    },
    {
        phase: '第三阶段',
        title: '数据驱动优化',
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg",
            __icon_query__: "chart line up",
        },
        items: ['质量预测与防错', '设备预测性维护', '能耗与良率优化'],
    },
    {
        phase: '第四阶段',
        title: '黑灯工厂',
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/robot-bold.svg",
            __icon_query__: "robot",
        },
        items: ['全流程无人化作业', '自主决策与协同', '端到端智能闭环'],
    },
]

const Roadmap: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '智能工厂演进路线'
    const phases = (slideData?.phases && slideData.phases.length > 0)
        ? slideData.phases
        : DEFAULT_PHASES

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
                {/* 背景装饰层：精密网格 + 金属质感线条 + 齿轮母题 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            {/* 精密网格 */}
                            <pattern id="mfgGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.55" strokeWidth="1" />
                            </pattern>
                            {/* 顶部金属高光 */}
                            <linearGradient id="mfgMetal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                            {/* 蓝橙光晕 */}
                            <radialGradient id="mfgGlow" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.30" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="mfgGlowOrange" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.24" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                            </radialGradient>
                        </defs>

                        <rect width="1280" height="720" fill="url(#mfgGrid)" />
                        <rect width="1280" height="160" fill="url(#mfgMetal)" />
                        <circle cx="120" cy="80" r="280" fill="url(#mfgGlow)" />
                        <circle cx="1180" cy="660" r="300" fill="url(#mfgGlowOrange)" />

                        {/* 齿轮母题（左上） */}
                        <g transform="translate(140 110)" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.18" fill="none" strokeWidth="2">
                            <circle r="44" />
                            <circle r="20" />
                            {Array.from({ length: 12 }).map((_, i) => {
                                const a = (i * 30) * Math.PI / 180
                                const x1 = Math.cos(a) * 44, y1 = Math.sin(a) * 44
                                const x2 = Math.cos(a) * 58, y2 = Math.sin(a) * 58
                                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                            })}
                        </g>
                        {/* 齿轮母题（右上小） */}
                        <g transform="translate(1140 120)" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.16" fill="none" strokeWidth="2">
                            <circle r="26" />
                            <circle r="11" />
                            {Array.from({ length: 10 }).map((_, i) => {
                                const a = (i * 36) * Math.PI / 180
                                const x1 = Math.cos(a) * 26, y1 = Math.sin(a) * 26
                                const x2 = Math.cos(a) * 36, y2 = Math.sin(a) * 36
                                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                            })}
                        </g>
                    </svg>
                </div>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-14 py-10">
                    {/* 顶部标题区 */}
                    <div className="flex items-center gap-4">
                        <span
                            className="inline-block h-9 w-1.5 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />
                        <div className="flex flex-col">
                            <span
                                className="text-xs font-semibold uppercase leading-relaxed break-words"
                                style={{
                                    color: "var(--secondary-color,#f97316)",
                                    letterSpacing: '0.18em',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                ROADMAP · 分阶段计划
                            </span>
                            <h1
                                className="text-3xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* 阶段卡横向排列区 */}
                    <div className="relative mt-8 flex flex-1 items-stretch">
                        {/* 产线主轴（贯穿卡片顶部的连接线） */}
                        <div
                            className="absolute left-0 right-0 z-0 flex items-center"
                            style={{ top: '46px' }}
                            aria-hidden="true"
                        >
                            <span
                                className="h-[3px] w-full rounded-full"
                                style={{
                                    background: "linear-gradient(90deg, var(--primary-color,#3b82f6) 0%, var(--secondary-color,#f97316) 100%)",
                                    opacity: 0.55,
                                }}
                            />
                        </div>

                        <div className="relative z-10 grid w-full gap-5" style={{ gridTemplateColumns: `repeat(${phases.length}, minmax(0, 1fr))` }}>
                            {phases.map((p, i) => {
                                const isLast = i === phases.length - 1
                                return (
                                    <div key={i} className="flex flex-col">
                                        {/* 节点 + 阶段编号 */}
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                                style={{
                                                    background: isLast
                                                        ? "var(--secondary-color,#f97316)"
                                                        : "var(--primary-color,#3b82f6)",
                                                    boxShadow: isLast
                                                        ? '0 0 0 5px rgba(249,115,22,0.16)'
                                                        : '0 0 0 5px rgba(59,130,246,0.16)',
                                                }}
                                            >
                                                <RemoteSvgIcon
                                                    url={p?.icon?.__icon_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg"}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-text,#ffffff)"
                                                    className="w-6 h-6"
                                                    title={p?.icon?.__icon_query__ || 'gear'}
                                                />
                                            </div>
                                            <span
                                                className="text-sm font-bold leading-relaxed break-words"
                                                style={{
                                                    color: isLast ? "var(--secondary-color,#f97316)" : "var(--primary-color,#3b82f6)",
                                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                                }}
                                            >
                                                {p?.phase || `第${i + 1}阶段`}
                                            </span>
                                        </div>

                                        {/* 阶段卡片 */}
                                        <div
                                            className="mt-4 flex flex-1 flex-col rounded-2xl border p-5"
                                            style={{
                                                background: "var(--card-color,#111827)",
                                                borderColor: "var(--stroke,#374151)",
                                                boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                                            }}
                                        >
                                            <h3
                                                className="text-lg font-black leading-[1.3] break-words"
                                                style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {p?.title || '阶段目标'}
                                            </h3>
                                            <div
                                                className="mt-3 mb-3 h-px w-full"
                                                style={{ background: "var(--stroke,#374151)" }}
                                            />
                                            <ul className="flex flex-col gap-2.5">
                                                {(p?.items || []).map((it, j) => (
                                                    <li key={j} className="flex items-start gap-2.5">
                                                        <span
                                                            className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-sm"
                                                            style={{ background: isLast ? "var(--secondary-color,#f97316)" : "var(--primary-color,#3b82f6)" }}
                                                        />
                                                        <span
                                                            className="text-sm leading-[1.7] break-words"
                                                            style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.86, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                        >
                                                            {it}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 底部金属基线 */}
                    <div className="mt-6 flex items-center gap-3" aria-hidden="true">
                        <span className="h-px flex-1 rounded-full" style={{ background: "var(--stroke,#374151)" }} />
                        <span
                            className="text-[11px] font-medium leading-relaxed break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.45, letterSpacing: '0.12em', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            SMART MANUFACTURING · 智能制造
                        </span>
                        <span className="h-px flex-1 rounded-full" style={{ background: "var(--stroke,#374151)" }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Roadmap
