import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'manufacturing-cn-three-points'
export const layoutName = '三栏要点'
export const layoutDescription = '智能制造风三栏要点：工业深灰底 + 精密网格 + 蓝橙硬朗线条，三等分列展示图标+标题+描述。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('智能制造核心能力').meta({
        description: "版式主标题（中文，简短有力，≤20字）",
    }),
    points: z.array(z.object({
        icon: IconSchema.meta({ description: "要点图标（phosphor 图标）" }),
        title: z.string().min(2).max(12).meta({ description: "要点标题（≤12字）" }),
        desc: z.string().min(2).max(40).meta({ description: "要点描述（≤40字）" }),
    })).min(3).max(3).default([
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg",
                __icon_query__: "gear",
            },
            title: '柔性产线',
            desc: '模块化工位与可重构产线，快速换型，支持多品种小批量混线生产。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cpu-bold.svg",
                __icon_query__: "industrial controller",
            },
            title: '数字孪生',
            desc: '实时采集设备工况，构建虚拟产线模型，仿真预演工艺与节拍优化。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg",
                __icon_query__: "quality control",
            },
            title: '智能质检',
            desc: '机器视觉在线检测，缺陷自动识别与追溯，良率与一致性显著提升。',
        },
    ]).meta({ description: "三个核心要点（固定三列）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ThreePoints: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '智能制造核心能力'
    const fallbackPoints = (schema.shape.points as any)._def.defaultValue as SlideData['points']
    const points = (slideData?.points && slideData.points.length === 3) ? slideData.points : fallbackPoints

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
                {/* 背景装饰层：精密网格 + 金属质感斜线 + 齿轮母题 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        {/* 精密工业网格 */}
                        <pattern id="mfgGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0H0V40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.55" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="mfgTopGlow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.16" />
                            <stop offset="55%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="mfgRail" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* 网格底纹 */}
                    <rect width="1280" height="720" fill="url(#mfgGrid)" />
                    {/* 左上蓝色光晕 */}
                    <rect width="1280" height="720" fill="url(#mfgTopGlow)" />

                    {/* 金属质感斜线（产线导轨意象） */}
                    <line x1="-60" y1="120" x2="420" y2="-60" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.18" strokeWidth="2" />
                    <line x1="-60" y1="180" x2="480" y2="-60" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.10" strokeWidth="2" />
                    <line x1="900" y1="780" x2="1380" y2="560" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.14" strokeWidth="2" />

                    {/* 右上齿轮母题（精密线稿） */}
                    <g transform="translate(1140 96)" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.22" fill="none" strokeWidth="2">
                        <circle r="58" />
                        <circle r="30" />
                        {Array.from({ length: 12 }).map((_, i) => {
                            const a = (i * 30) * Math.PI / 180
                            const x1 = Math.cos(a) * 58
                            const y1 = Math.sin(a) * 58
                            const x2 = Math.cos(a) * 74
                            const y2 = Math.sin(a) * 74
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                        })}
                    </g>
                </svg>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full w-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <div className="flex items-center gap-3">
                            <span
                                className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-sm"
                                style={{ background: "var(--secondary-color,#f97316)" }}
                            />
                            <span
                                className="text-sm font-semibold uppercase break-words"
                                style={{ color: "var(--secondary-color,#f97316)", letterSpacing: '0.08em', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                SMART MANUFACTURING
                            </span>
                        </div>
                        <h1
                            className="mt-3 text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        {/* 产线导轨分隔线 */}
                        <div className="mt-5 h-px w-full" style={{ background: "var(--stroke,#374151)" }} />
                    </div>

                    {/* 三等分要点列 */}
                    <div className="grid flex-1 grid-cols-3 items-stretch gap-8 pt-9">
                        {points.map((p, i) => (
                            <div
                                key={i}
                                className="flex flex-col rounded-xl border p-7"
                                style={{
                                    background: "var(--card-color,#111827)",
                                    borderColor: "var(--stroke,#374151)",
                                    boxShadow: '0 1px 0 rgba(255,255,255,0.03) inset',
                                }}
                            >
                                {/* 顶部：序号 + 图标 */}
                                <div className="flex items-center justify-between">
                                    <div
                                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg"
                                        style={{
                                            background: "var(--primary-color,#3b82f6)",
                                            boxShadow: '0 0 0 1px var(--stroke,#374151)',
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={p.icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-7 h-7"
                                            title={p.icon?.__icon_query__}
                                        />
                                    </div>
                                    <span
                                        className="text-5xl font-black leading-none"
                                        style={{ color: "var(--stroke,#374151)" }}
                                    >
                                        {`0${i + 1}`}
                                    </span>
                                </div>

                                {/* 橙色强调短线 */}
                                <div
                                    className="mt-6 h-1 w-10 rounded-full"
                                    style={{ background: "var(--secondary-color,#f97316)" }}
                                />

                                {/* 标题 */}
                                <h3
                                    className="mt-4 text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p.title}
                                </h3>

                                {/* 描述 */}
                                <p
                                    className="mt-3 text-base leading-relaxed break-words"
                                    style={{ color: "var(--background-text,#9ca3af)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThreePoints
