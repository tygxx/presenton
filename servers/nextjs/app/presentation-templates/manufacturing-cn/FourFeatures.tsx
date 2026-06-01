import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'manufacturing-cn-four-features'
export const layoutName = '四宫格特性'
export const layoutDescription = '智能制造风四宫格特性页：工业深灰底配精密网格与齿轮母题，2x2 网格四张特性卡片，蓝橙硬朗线条点缀。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('智能工厂核心能力').meta({
        description: "版式主标题（中文，简短有力，描述四项制造能力的整体主题）",
    }),
    features: z.array(z.object({
        icon: IconSchema.meta({ description: "特性图标（phosphor 图标）" }),
        title: z.string().min(2).max(12).meta({ description: "特性卡片标题，如『柔性产线』" }),
        desc: z.string().min(4).max(32).meta({ description: "特性简短描述，一句话说明该能力价值" }),
    })).min(4).max(4).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg',
                __icon_query__: 'gear automation',
            },
            title: '柔性产线',
            desc: '模块化产线快速换型，多品种小批量按需切换。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/robot-bold.svg',
                __icon_query__: 'industrial robot',
            },
            title: '无人协作',
            desc: '工业机器人与产线协同作业，节拍稳定零差错。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'data analytics',
            },
            title: '数据驱动',
            desc: '全流程数据实时采集，工艺参数智能优化迭代。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
                __icon_query__: 'quality assurance',
            },
            title: '精密质控',
            desc: '在线视觉检测全检替代抽检，良率持续可追溯。',
        },
    ]).meta({ description: "四项核心特性，固定四张卡片，2x2 网格展示" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FourFeatures: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '智能工厂核心能力'
    const features = (slideData?.features && slideData.features.length === 4)
        ? slideData.features
        : [
            {
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg',
                    __icon_query__: 'gear automation',
                },
                title: '柔性产线',
                desc: '模块化产线快速换型，多品种小批量按需切换。',
            },
            {
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/robot-bold.svg',
                    __icon_query__: 'industrial robot',
                },
                title: '无人协作',
                desc: '工业机器人与产线协同作业，节拍稳定零差错。',
            },
            {
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                    __icon_query__: 'data analytics',
                },
                title: '数据驱动',
                desc: '全流程数据实时采集，工艺参数智能优化迭代。',
            },
            {
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
                    __icon_query__: 'quality assurance',
                },
                title: '精密质控',
                desc: '在线视觉检测全检替代抽检，良率持续可追溯。',
            },
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
                    background: "var(--background-color,#1f2937)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：精密网格 + 齿轮 + 金属斜向线条 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            {/* 精密网格图案 */}
                            <pattern id="mfgGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0H0V40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.45" strokeWidth="1" />
                            </pattern>
                            {/* 金属质感顶部光带 */}
                            <linearGradient id="mfgMetal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </linearGradient>
                            {/* 橙色右下角光晕 */}
                            <radialGradient id="mfgGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.20" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#mfgGrid)" />
                        <rect width="1280" height="280" fill="url(#mfgMetal)" />
                        <circle cx="1180" cy="660" r="320" fill="url(#mfgGlow)" />

                        {/* 左上角大齿轮母题 */}
                        <g transform="translate(80 80)" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.22" fill="none" strokeWidth="2">
                            <circle r="46" />
                            <circle r="20" />
                            {Array.from({ length: 12 }).map((_, i) => {
                                const a = (i * Math.PI) / 6
                                const x1 = Math.cos(a) * 46
                                const y1 = Math.sin(a) * 46
                                const x2 = Math.cos(a) * 62
                                const y2 = Math.sin(a) * 62
                                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                            })}
                        </g>

                        {/* 右上角小齿轮母题 */}
                        <g transform="translate(1170 110)" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.22" fill="none" strokeWidth="2">
                            <circle r="26" />
                            <circle r="11" />
                            {Array.from({ length: 8 }).map((_, i) => {
                                const a = (i * Math.PI) / 4
                                const x1 = Math.cos(a) * 26
                                const y1 = Math.sin(a) * 26
                                const x2 = Math.cos(a) * 38
                                const y2 = Math.sin(a) * 38
                                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                            })}
                        </g>

                        {/* 产线 / 金属斜向硬朗线条 */}
                        <line x1="-40" y1="600" x2="1320" y2="600" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.10" strokeWidth="1.5" />
                        <line x1="-40" y1="630" x2="1320" y2="630" stroke="var(--stroke,#374151)" strokeOpacity="0.6" strokeWidth="1" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="flex flex-shrink-0 items-end justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                <span
                                    className="h-7 w-1.5 rounded-sm"
                                    style={{ background: "var(--secondary-color,#f97316)" }}
                                />
                                <span
                                    className="text-sm font-semibold tracking-wide break-words"
                                    style={{ color: "var(--secondary-color,#f97316)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    SMART MANUFACTURING
                                </span>
                            </div>
                            <h1
                                className="mt-3 text-4xl font-black leading-[1.2] break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                        <div
                            className="hidden flex-shrink-0 items-center gap-2 rounded-md border px-4 py-2 md:flex"
                            style={{ borderColor: "var(--stroke,#374151)", background: "var(--card-color,#111827)" }}
                        >
                            <span className="text-2xl font-black leading-none" style={{ color: "var(--primary-color,#3b82f6)" }}>04</span>
                            <span
                                className="text-xs leading-relaxed break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                核心
                                <br />
                                能力
                            </span>
                        </div>
                    </div>

                    {/* 2x2 特性卡片网格 */}
                    <div className="mt-8 grid flex-1 grid-cols-2 grid-rows-2 gap-6">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="relative flex items-start gap-5 overflow-hidden rounded-xl border p-6"
                                style={{
                                    background: "var(--card-color,#111827)",
                                    borderColor: "var(--stroke,#374151)",
                                }}
                            >
                                {/* 卡片左侧硬朗强调条 */}
                                <span
                                    className="absolute left-0 top-0 h-full w-1"
                                    style={{ background: i % 2 === 0 ? "var(--primary-color,#3b82f6)" : "var(--secondary-color,#f97316)" }}
                                    aria-hidden="true"
                                />
                                {/* 角标编号 */}
                                <span
                                    className="absolute right-5 top-4 text-xs font-black tracking-widest"
                                    style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.25 }}
                                    aria-hidden="true"
                                >
                                    {`0${i + 1}`}
                                </span>

                                {/* 图标方块 */}
                                <div
                                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border"
                                    style={{
                                        background: i % 2 === 0 ? "rgba(59,130,246,0.14)" : "rgba(249,115,22,0.14)",
                                        borderColor: i % 2 === 0 ? "rgba(59,130,246,0.4)" : "rgba(249,115,22,0.4)",
                                        color: i % 2 === 0 ? "var(--primary-color,#3b82f6)" : "var(--secondary-color,#f97316)",
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url={f?.icon?.__icon_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg'}
                                        strokeColor="currentColor"
                                        color="currentColor"
                                        className="w-7 h-7"
                                        title={f?.icon?.__icon_query__ || 'feature'}
                                    />
                                </div>

                                {/* 文本 */}
                                <div className="flex min-w-0 flex-col pr-6">
                                    <h3
                                        className="text-xl font-bold leading-[1.3] break-words"
                                        style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {f?.title || '核心能力'}
                                    </h3>
                                    <p
                                        className="mt-2 text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {f?.desc || '智能制造能力简述。'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FourFeatures
