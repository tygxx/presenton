import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'tech-cn-four-features'
export const layoutName = '四宫格特性'
export const layoutDescription = '科技互联网风四宫格特性页：深色底 + 霓虹蓝紫渐变高光，左对齐大标题，2x2 半透明发光描边卡片，每张含图标、小标题与说明。纯 CSS/SVG 装饰，离线可渲染。'

const iconUrl = (name: string) =>
    `https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${name}-bold.svg`

const schema = z.object({
    title: z.string().min(2).max(20).default('核心技术能力').meta({
        description: "四宫格特性页主标题（中文，简短有力）",
    }),
    features: z.array(z.object({
        icon: IconSchema.meta({ description: "特性图标（phosphor 图标）" }),
        title: z.string().min(2).max(12).meta({ description: "特性小标题" }),
        desc: z.string().min(4).max(32).meta({ description: "特性简要说明" }),
    })).min(4).max(4).default([
        {
            icon: {
                __icon_url__: iconUrl('cpu'),
                __icon_query__: 'cpu chip computing',
            },
            title: '智能算力',
            desc: '弹性 GPU 集群按需调度，毫秒级响应海量并发推理。',
        },
        {
            icon: {
                __icon_url__: iconUrl('shield-check'),
                __icon_query__: 'security shield',
            },
            title: '安全可信',
            desc: '端到端加密与零信任架构，全链路数据合规可审计。',
        },
        {
            icon: {
                __icon_url__: iconUrl('chart-line-up'),
                __icon_query__: 'growth analytics chart',
            },
            title: '实时洞察',
            desc: '流式数据分析引擎，业务指标秒级回传可视看板。',
        },
        {
            icon: {
                __icon_url__: iconUrl('cloud'),
                __icon_query__: 'cloud native infrastructure',
            },
            title: '云原生',
            desc: '容器化微服务平滑扩缩容，跨区多活高可用部署。',
        },
    ]).meta({ description: "四张特性卡片（固定四项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FourFeatures: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '核心技术能力'
    const features: SlideData['features'] = (slideData?.features && slideData.features.length > 0)
        ? (slideData.features as SlideData['features'])
        : (schema.shape.features as any)._def.defaultValue

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
                {/* 背景装饰层：几何网格 + 电路线 + 霓虹光晕 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="techGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.06" strokeWidth="1" />
                            </pattern>
                            <radialGradient id="techGlowA" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="techGlowB" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.40" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#techGrid)" />
                        {/* 左上蓝色光晕 */}
                        <circle cx="120" cy="80" r="320" fill="url(#techGlowA)" />
                        {/* 右下紫色光晕 */}
                        <circle cx="1180" cy="700" r="360" fill="url(#techGlowB)" />
                        {/* 电路线母题 */}
                        <g stroke="var(--secondary-color,#8b5cf6)" strokeOpacity="0.18" strokeWidth="1.5" fill="none">
                            <path d="M0 150 H180 L210 180 H360" />
                            <path d="M1280 600 H1080 L1050 570 H880" />
                            <path d="M640 0 V60 L670 90 V160" />
                        </g>
                        <g fill="var(--primary-color,#3b82f6)" fillOpacity="0.5">
                            <circle cx="360" cy="180" r="3.5" />
                            <circle cx="880" cy="570" r="3.5" />
                            <circle cx="670" cy="90" r="3.5" />
                        </g>
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区：左对齐大标题 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <span
                            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#3b82f6)",
                                background: "rgba(59,130,246,0.12)",
                                border: "1px solid var(--stroke,#1f2937)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#8b5cf6)", boxShadow: '0 0 8px var(--secondary-color,#8b5cf6)' }}
                            />
                            <span className="font-mono">TECH · 2026</span>
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
                            className="mt-5 h-1 w-28 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))" }}
                        />
                    </div>

                    {/* 2x2 特性卡片网格 */}
                    <div className="mt-8 grid flex-1 grid-cols-2 grid-rows-2 gap-6">
                        {features.slice(0, 4).map((f, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-5 rounded-2xl px-7 py-6"
                                style={{
                                    background: "linear-gradient(145deg, var(--card-color,#111827), rgba(17,24,39,0.6))",
                                    border: "1px solid var(--stroke,#1f2937)",
                                    boxShadow: '0 0 0 1px rgba(59,130,246,0.06), 0 8px 30px rgba(2,6,23,0.45)',
                                }}
                            >
                                {/* 发光图标块 */}
                                <div
                                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                        background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                        boxShadow: '0 0 18px rgba(99,102,241,0.45)',
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url={f?.icon?.__icon_url__}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-7 h-7"
                                        title={f?.icon?.__icon_query__}
                                    />
                                </div>

                                <div className="flex min-w-0 flex-col">
                                    <h3
                                        className="text-xl font-bold leading-[1.35] break-words"
                                        style={{
                                            color: "var(--background-text,#e5e7eb)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {f?.title}
                                    </h3>
                                    <p
                                        className="mt-2 text-sm leading-[1.7] break-words"
                                        style={{
                                            color: "var(--background-text,#9ca3af)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {f?.desc}
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
