import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'tech-cn-comparison'
export const layoutName = '左右对比'
export const layoutDescription = '科技风左右对比页：深色霓虹底 + 几何网格/光晕装饰，左右对称发光描边卡片，中间 VS 分隔，适合两方对比 / before-after / 优劣权衡。纯 CSS/SVG 装饰，离线可渲染。'

const pointSchema = z.string().min(2).max(30)

const schema = z.object({
    title: z.string().min(2).max(20).default('架构升级前后对比').meta({
        description: "对比页主标题（中文，简短有力，≤20字）",
    }),
    leftTitle: z.string().min(1).max(12).default('传统单体架构').meta({
        description: "左栏标题，如『旧方案』『升级前』（≤12字）",
    }),
    rightTitle: z.string().min(1).max(12).default('云原生微服务').meta({
        description: "右栏标题，如『新方案』『升级后』（≤12字）",
    }),
    leftIcon: z.object({
        __icon_url__: z.string().default('https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/database-bold.svg'),
        __icon_query__: z.string().min(2).max(40).default('legacy database server'),
    }).default({
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/database-bold.svg',
        __icon_query__: 'legacy database server',
    }).meta({ description: "左栏图标" }),
    rightIcon: z.object({
        __icon_url__: z.string().default('https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cloud-bold.svg'),
        __icon_query__: z.string().min(2).max(40).default('cloud native microservice'),
    }).default({
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cloud-bold.svg',
        __icon_query__: 'cloud native microservice',
    }).meta({ description: "右栏图标" }),
    leftPoints: z.array(pointSchema).min(2).max(4).default([
        '部署耦合度高，单点故障影响全局',
        '横向扩容受限，资源利用率偏低',
        '迭代发布周期长，回滚成本高',
    ]).meta({ description: "左栏要点（2-4 条，每条≤30字）" }),
    rightPoints: z.array(pointSchema).min(2).max(4).default([
        '服务独立部署，故障域隔离可控',
        '弹性伸缩按需扩容，成本下降四成',
        '持续交付分钟级发布，灰度可回滚',
    ]).meta({ description: "右栏要点（2-4 条，每条≤30字）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Comparison: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '架构升级前后对比'
    const leftTitle = slideData?.leftTitle || '传统单体架构'
    const rightTitle = slideData?.rightTitle || '云原生微服务'
    const leftIcon = slideData?.leftIcon || { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/database-bold.svg', __icon_query__: 'legacy database server' }
    const rightIcon = slideData?.rightIcon || { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cloud-bold.svg', __icon_query__: 'cloud native microservice' }
    const leftPoints = slideData?.leftPoints || ['部署耦合度高，单点故障影响全局', '横向扩容受限，资源利用率偏低', '迭代发布周期长，回滚成本高']
    const rightPoints = slideData?.rightPoints || ['服务独立部署，故障域隔离可控', '弹性伸缩按需扩容，成本下降四成', '持续交付分钟级发布，灰度可回滚']

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
                {/* 背景装饰层：几何网格 + 霓虹光晕 + 电路线 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="techCmpGlowL" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="techCmpGlowR" x1="1" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.24" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="techCmpSeam" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                            <stop offset="45%" stopColor="#8b5cf6" stopOpacity="0.85" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                        <pattern id="techCmpGrid" width="44" height="44" patternUnits="userSpaceOnUse">
                            <path d="M 44 0 L 0 0 0 44" fill="none" stroke="#1f2937" strokeWidth="1" strokeOpacity="0.55" />
                        </pattern>
                    </defs>
                    {/* 几何网格母题 */}
                    <rect width="1280" height="720" fill="url(#techCmpGrid)" />
                    {/* 双侧霓虹光晕 */}
                    <circle cx="200" cy="120" r="360" fill="url(#techCmpGlowL)" />
                    <circle cx="1080" cy="600" r="380" fill="url(#techCmpGlowR)" />
                    {/* 电路线母题 */}
                    <g stroke="#3b82f6" strokeOpacity="0.18" strokeWidth="1.5" fill="none">
                        <path d="M -20 180 H 140 V 90 H 300" />
                        <path d="M 0 640 H 120 V 560" />
                    </g>
                    <g stroke="#8b5cf6" strokeOpacity="0.20" strokeWidth="1.5" fill="none">
                        <path d="M 1300 540 H 1140 V 630 H 980" />
                        <path d="M 1280 110 H 1160 V 190" />
                    </g>
                    <g fill="#8b5cf6" fillOpacity="0.5">
                        <circle cx="300" cy="90" r="3.5" />
                        <circle cx="980" cy="630" r="3.5" />
                    </g>
                </svg>

                <div className="relative z-10 flex h-full flex-col px-16 py-10">
                    {/* 顶部标题 */}
                    <div className="flex flex-col items-center text-center">
                        <span
                            className="mb-3 inline-flex w-fit items-center rounded-full px-4 py-1 text-xs font-semibold tracking-wide break-words"
                            style={{
                                color: "var(--secondary-color,#8b5cf6)",
                                background: "rgba(139,92,246,0.12)",
                                border: "1px solid rgba(139,92,246,0.35)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            方案对比 · COMPARISON
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-4 h-1 w-24 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))" }}
                        />
                    </div>

                    {/* 左右对比主体 */}
                    <div className="mt-8 flex flex-1 items-stretch gap-6">
                        {/* 左栏卡片 */}
                        <div
                            className="flex flex-1 flex-col rounded-2xl p-7"
                            style={{
                                background: "var(--card-color,#111827)",
                                border: "1px solid rgba(59,130,246,0.45)",
                                boxShadow: "0 0 0 1px rgba(59,130,246,0.10), 0 18px 48px -24px rgba(59,130,246,0.55)",
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(59,130,246,0.30), rgba(59,130,246,0.08))",
                                        border: "1px solid rgba(59,130,246,0.5)",
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url={leftIcon.__icon_url__}
                                        strokeColor="currentColor"
                                        color="var(--primary-color,#3b82f6)"
                                        className="w-6 h-6"
                                        title={leftIcon.__icon_query__}
                                    />
                                </div>
                                <h2
                                    className="text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--primary-color,#3b82f6)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {leftTitle}
                                </h2>
                            </div>
                            <div className="my-5 h-px w-full" style={{ background: "var(--stroke,#1f2937)" }} />
                            <ul className="flex flex-1 flex-col justify-center gap-4">
                                {leftPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--primary-color,#3b82f6)", boxShadow: "0 0 8px rgba(59,130,246,0.8)" }}
                                        />
                                        <span
                                            className="text-base leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 中间 VS 分隔 */}
                        <div className="relative flex flex-shrink-0 flex-col items-center justify-center">
                            <div className="absolute top-0 h-full w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(139,92,246,0.55), transparent)" }} />
                            <div
                                className="relative flex h-14 w-14 items-center justify-center rounded-full text-lg font-black"
                                style={{
                                    color: "var(--primary-text,#ffffff)",
                                    background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                    boxShadow: "0 0 0 6px rgba(139,92,246,0.14), 0 0 24px rgba(139,92,246,0.55)",
                                }}
                            >
                                VS
                            </div>
                        </div>

                        {/* 右栏卡片 */}
                        <div
                            className="flex flex-1 flex-col rounded-2xl p-7"
                            style={{
                                background: "var(--card-color,#111827)",
                                border: "1px solid rgba(139,92,246,0.5)",
                                boxShadow: "0 0 0 1px rgba(139,92,246,0.12), 0 18px 48px -24px rgba(139,92,246,0.6)",
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(139,92,246,0.32), rgba(139,92,246,0.08))",
                                        border: "1px solid rgba(139,92,246,0.55)",
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url={rightIcon.__icon_url__}
                                        strokeColor="currentColor"
                                        color="var(--secondary-color,#8b5cf6)"
                                        className="w-6 h-6"
                                        title={rightIcon.__icon_query__}
                                    />
                                </div>
                                <h2
                                    className="text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--secondary-color,#8b5cf6)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {rightTitle}
                                </h2>
                            </div>
                            <div className="my-5 h-px w-full" style={{ background: "var(--stroke,#1f2937)" }} />
                            <ul className="flex flex-1 flex-col justify-center gap-4">
                                {rightPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--secondary-color,#8b5cf6)", boxShadow: "0 0 8px rgba(139,92,246,0.8)" }}
                                        />
                                        <span
                                            className="text-base leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comparison
