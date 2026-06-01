import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'education-cn-roadmap'
export const layoutName = '路线图'
export const layoutDescription = '教育培训风路线图：分阶段计划横向卡片，圆润友好的米白底色配活力橙蓝，书本/灯泡/成长曲线/圆点装饰。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('学习成长路线图').meta({
        description: "路线图主标题（中文，简短）",
    }),
    phases: z.array(z.object({
        phase: z.string().min(2).max(10).meta({
            description: "阶段标签，如『第一阶段』『启航期』",
        }),
        title: z.string().min(2).max(16).meta({
            description: "阶段名称/目标",
        }),
        icon: z.object({
            __icon_url__: z.string().meta({ description: "图标 URL" }),
            __icon_query__: z.string().min(2).max(40).meta({ description: "图标英文检索词" }),
        }).meta({ description: "阶段图标" }),
        items: z.array(z.string().min(1).max(24).meta({ description: "阶段要点（中文短句）" })).min(1).max(3),
    })).min(3).max(4).default([
        {
            phase: '第一阶段',
            title: '夯实基础',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg',
                __icon_query__: 'book open',
            },
            items: ['掌握核心知识点', '建立学习习惯', '完成入门测评'],
        },
        {
            phase: '第二阶段',
            title: '进阶提升',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg',
                __icon_query__: 'lightbulb idea',
            },
            items: ['专题强化训练', '真题实战演练', '查漏补缺巩固'],
        },
        {
            phase: '第三阶段',
            title: '冲刺突破',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'growth chart',
            },
            items: ['模拟全真考试', '梳理高频考点', '调整应试状态'],
        },
        {
            phase: '第四阶段',
            title: '学有所成',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/graduation-cap-bold.svg',
                __icon_query__: 'graduation cap',
            },
            items: ['达成阶段目标', '复盘学习路径', '开启新的征程'],
        },
    ]).meta({ description: "分阶段计划，3-4 个阶段横向排列" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const fallbackPhases: SlideData['phases'] = [
    {
        phase: '第一阶段',
        title: '夯实基础',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg',
            __icon_query__: 'book open',
        },
        items: ['掌握核心知识点', '建立学习习惯', '完成入门测评'],
    },
    {
        phase: '第二阶段',
        title: '进阶提升',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg',
            __icon_query__: 'lightbulb idea',
        },
        items: ['专题强化训练', '真题实战演练', '查漏补缺巩固'],
    },
    {
        phase: '第三阶段',
        title: '冲刺突破',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
            __icon_query__: 'growth chart',
        },
        items: ['模拟全真考试', '梳理高频考点', '调整应试状态'],
    },
]

const Roadmap: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '学习成长路线图'
    const phases = (slideData?.phases && slideData.phases.length > 0 ? slideData.phases : fallbackPhases)

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
                {/* 背景装饰层：成长曲线 + 圆点 + 光晕 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="eduRoadmapGlow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="eduRoadmapCurve" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.18" />
                        </linearGradient>
                    </defs>
                    {/* 右上光晕 */}
                    <circle cx="1180" cy="-40" r="220" fill="url(#eduRoadmapGlow)" />
                    {/* 成长曲线（自下而上） */}
                    <path
                        d="M -40 660 C 320 600 360 360 660 320 C 980 280 1020 120 1340 90"
                        fill="none"
                        stroke="url(#eduRoadmapCurve)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    {/* 圆点装饰 */}
                    <circle cx="120" cy="120" r="6" fill="var(--secondary-color,#f97316)" fillOpacity="0.30" />
                    <circle cx="1160" cy="600" r="8" fill="var(--primary-color,#2563eb)" fillOpacity="0.18" />
                    <circle cx="640" cy="48" r="5" fill="var(--secondary-color,#f97316)" fillOpacity="0.25" />
                </svg>

                <div className="relative z-10 flex h-full flex-col px-14 py-10">
                    {/* 顶部标题区 */}
                    <div className="flex items-center gap-4">
                        {/* 灯泡母题徽标 */}
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm"
                            style={{ background: "var(--primary-color,#2563eb)" }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-6 h-6"
                                title="lightbulb idea"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div className="mt-2 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        </div>
                    </div>

                    {/* 阶段卡片横向排列 */}
                    <div className="mt-8 flex flex-1 items-stretch gap-5">
                        {phases.map((p, i) => {
                            const isAccent = i % 2 === 1
                            const accent = isAccent ? "var(--secondary-color,#f97316)" : "var(--primary-color,#2563eb)"
                            const items = p?.items || []
                            return (
                                <div
                                    key={i}
                                    className="flex flex-1 flex-col rounded-3xl border p-6 shadow-sm"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#f1e9d8)",
                                    }}
                                >
                                    {/* 卡头：序号圆点 + 阶段标签 */}
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl text-lg font-black"
                                            style={{ background: accent, color: "var(--primary-text,#ffffff)" }}
                                        >
                                            <RemoteSvgIcon
                                                url={p?.icon?.__icon_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg'}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-6 h-6"
                                                title={p?.icon?.__icon_query__ || 'phase icon'}
                                            />
                                        </div>
                                        <span
                                            className="rounded-full px-3 py-1 text-xs font-bold leading-relaxed break-words"
                                            style={{
                                                color: accent,
                                                background: isAccent ? "rgba(249,115,22,0.12)" : "rgba(37,99,235,0.10)",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {p?.phase || `第${i + 1}阶段`}
                                        </span>
                                    </div>

                                    {/* 阶段标题 */}
                                    <h2
                                        className="mt-4 text-2xl font-black leading-[1.3] break-words"
                                        style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {p?.title || '阶段目标'}
                                    </h2>

                                    {/* 分隔线 */}
                                    <div className="mt-3 h-px w-full" style={{ background: "var(--stroke,#f1e9d8)" }} />

                                    {/* 要点列表（圆点装饰） */}
                                    <ul className="mt-4 flex flex-col gap-2.5">
                                        {items.map((it, j) => (
                                            <li key={j} className="flex items-start gap-2.5">
                                                <span
                                                    className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
                                                    style={{ background: accent }}
                                                />
                                                <span
                                                    className="text-sm leading-[1.7] break-words"
                                                    style={{ color: "var(--background-text,#4b5563)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                >
                                                    {it}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Roadmap
