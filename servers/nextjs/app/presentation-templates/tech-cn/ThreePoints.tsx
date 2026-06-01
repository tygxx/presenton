import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'tech-cn-three-points'
export const layoutName = '三栏要点'
export const layoutDescription = '科技风三栏要点页：深色底叠霓虹蓝紫渐变高光与几何网格、电路线装饰，左对齐大标题，三等分发光描边卡片（图标+标题+描述）。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('核心技术能力').meta({
        description: "三栏要点页主标题（中文，简短有力）",
    }),
    points: z.array(z.object({
        icon: IconSchema.meta({ description: "要点图标" }),
        title: z.string().min(2).max(12).meta({ description: "要点标题（中文，简短）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点描述，一句话说明" }),
    })).min(3).max(3).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cpu-bold.svg',
                __icon_query__: 'cpu chip',
            },
            title: '智能算力',
            desc: '弹性调度异构算力，毫秒级响应海量并发请求。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
                __icon_query__: 'shield security',
            },
            title: '安全可信',
            desc: '端到端加密与零信任架构，全链路守护数据安全。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cloud-arrow-up-bold.svg',
                __icon_query__: 'cloud upload',
            },
            title: '云原生',
            desc: '容器化弹性伸缩，分钟级部署支撑业务快速迭代。',
        },
    ]).meta({ description: "三个要点，每项含图标、标题与描述" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ThreePoints: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '核心技术能力'
    const points = slideData?.points || []

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
                {/* 背景装饰层：几何网格 + 霓虹蓝紫光晕 + 电路线 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="techTPNeon" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.55" />
                        </linearGradient>
                        <radialGradient id="techTPGlowA" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.32" />
                            <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="techTPGlowB" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.30" />
                            <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                        </radialGradient>
                        <pattern id="techTPGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--stroke,#1f2937)" strokeWidth="1" strokeOpacity="0.6" />
                        </pattern>
                    </defs>

                    {/* 几何网格 */}
                    <rect width="1280" height="720" fill="url(#techTPGrid)" />

                    {/* 霓虹光晕 */}
                    <circle cx="180" cy="120" r="320" fill="url(#techTPGlowA)" />
                    <circle cx="1120" cy="640" r="360" fill="url(#techTPGlowB)" />

                    {/* 电路线 */}
                    <g stroke="url(#techTPNeon)" strokeWidth="1.5" fill="none" strokeOpacity="0.7">
                        <path d="M0 90 L240 90 L280 130 L520 130" />
                        <path d="M1280 200 L1040 200 L1000 160 L760 160" />
                        <path d="M0 660 L180 660 L220 620 L460 620" />
                    </g>
                    <g fill="var(--primary-color,#3b82f6)">
                        <circle cx="520" cy="130" r="3.5" />
                        <circle cx="760" cy="160" r="3.5" />
                        <circle cx="460" cy="620" r="3.5" />
                    </g>
                </svg>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部：标识徽标 + 左对齐大标题 */}
                    <div className="flex flex-col">
                        <span
                            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#3b82f6)",
                                background: "rgba(59,130,246,0.12)",
                                border: "1px solid var(--stroke,#1f2937)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#8b5cf6)", boxShadow: '0 0 8px rgba(139,92,246,0.9)' }}
                            />
                            TECH · 核心要点
                        </span>
                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#e5e7eb)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-6 h-1 w-28 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))" }}
                        />
                    </div>

                    {/* 三等分要点卡片 */}
                    <div className="mt-10 grid flex-1 grid-cols-3 items-stretch gap-7">
                        {points.map((p, i) => (
                            <div
                                key={i}
                                className="flex flex-col rounded-2xl p-7"
                                style={{
                                    background: "var(--card-color,#111827)",
                                    border: "1px solid var(--stroke,#1f2937)",
                                    boxShadow: '0 0 0 1px rgba(59,130,246,0.08), 0 18px 40px -24px rgba(59,130,246,0.45)',
                                }}
                            >
                                {/* 发光图标徽章 */}
                                <div
                                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                        background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                        boxShadow: '0 0 22px -4px rgba(99,102,241,0.7)',
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url={p?.icon?.__icon_url__}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-7 h-7"
                                        title={p?.icon?.__icon_query__}
                                    />
                                </div>

                                {/* 等宽数字编号点缀 */}
                                <span
                                    className="mt-5 text-sm font-bold"
                                    style={{
                                        color: "var(--primary-color,#3b82f6)",
                                        fontFamily: "'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                <h3
                                    className="mt-2 text-2xl font-bold leading-[1.3] break-words"
                                    style={{
                                        color: "var(--background-text,#e5e7eb)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {p?.title}
                                </h3>

                                <p
                                    className="mt-3 text-base leading-relaxed break-words"
                                    style={{
                                        color: "var(--background-text,#9ca3af)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {p?.desc}
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
