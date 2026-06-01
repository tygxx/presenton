import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { IconSchema } from '../defaultSchemes';

export const layoutId = 'tech-cn-section-divider'
export const layoutName = '章节分隔'
export const layoutDescription = '科技风章节过渡页：超大霓虹节号作为装饰主体，左对齐节标题与副标题，深色底叠几何网格、电路线与蓝紫光晕。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    sectionNumber: z.string().min(1).max(4).default('02').meta({
        description: "章节序号，作为超大装饰主体，如『02』",
    }),
    title: z.string().min(2).max(18).default('技术架构与底层能力').meta({
        description: "章节标题（中文，简短有力）",
    }),
    subtitle: z.string().max(36).default('云原生 · 高并发 · 智能调度的下一代基础设施').meta({
        description: "副标题，一句话补充本章看点（可选）",
    }),
    icon: IconSchema.default({
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cpu-bold.svg',
        __icon_query__: 'cpu chip',
    }).meta({
        description: "章节图标，点缀于节号上方",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const SectionDivider: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const sectionNumber = slideData?.sectionNumber || '02'
    const title = slideData?.title || '技术架构与底层能力'
    const subtitle = slideData?.subtitle ?? '云原生 · 高并发 · 智能调度的下一代基础设施'
    const icon = slideData?.icon || {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cpu-bold.svg',
        __icon_query__: 'cpu chip',
    }

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
                {/* 背景装饰层：几何网格 + 电路线 + 蓝紫光晕 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="techDivGlow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.30" />
                            <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="techDivHalo" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="techDivLine" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                        </linearGradient>
                        <pattern id="techDivGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0 H0 V48" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.08" strokeWidth="1" />
                        </pattern>
                    </defs>

                    {/* 几何网格底纹 */}
                    <rect width="1280" height="720" fill="url(#techDivGrid)" />
                    {/* 左上蓝紫渐变高光 */}
                    <rect width="1280" height="720" fill="url(#techDivGlow)" />
                    {/* 右侧光晕 */}
                    <circle cx="1120" cy="180" r="320" fill="url(#techDivHalo)" />
                    <circle cx="980" cy="600" r="220" fill="url(#techDivHalo)" opacity="0.6" />

                    {/* 电路线 */}
                    <g fill="none" stroke="url(#techDivLine)" strokeWidth="1.5">
                        <path d="M0 150 H520 L580 210 H980" />
                        <path d="M0 560 H360 L420 500 H760 L820 560 H1280" />
                        <path d="M1280 300 H1040 L980 360 H700" />
                    </g>
                    {/* 电路节点 */}
                    <g fill="var(--primary-color,#3b82f6)">
                        <circle cx="580" cy="210" r="4" />
                        <circle cx="420" cy="500" r="4" />
                        <circle cx="980" cy="360" r="4" />
                    </g>
                    <g fill="var(--secondary-color,#8b5cf6)">
                        <circle cx="820" cy="560" r="4" />
                        <circle cx="700" cy="360" r="4" />
                    </g>
                </svg>

                {/* 顶部细霓虹分隔线 */}
                <div
                    className="absolute top-0 left-0 h-1 w-full"
                    style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))" }}
                />

                {/* 主内容：左对齐 */}
                <div className="relative z-10 flex h-full w-full items-center px-20">
                    <div className="grid w-full grid-cols-[auto_1fr] items-center gap-x-16">
                        {/* 左：超大节号（装饰主体） */}
                        <div className="flex flex-col items-center justify-center">
                            <div
                                className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border"
                                style={{
                                    background: "var(--card-color,#111827)",
                                    borderColor: "var(--stroke,#1f2937)",
                                    boxShadow: "0 0 24px 0 rgba(59,130,246,0.35)",
                                }}
                            >
                                <RemoteSvgIcon
                                    url={icon.__icon_url__}
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-7 h-7"
                                    title={icon.__icon_query__}
                                />
                            </div>
                            <span
                                className="font-black leading-[1.0] break-words"
                                style={{
                                    fontSize: '13rem',
                                    fontVariantNumeric: 'tabular-nums',
                                    background: "linear-gradient(160deg, var(--primary-color,#3b82f6) 0%, var(--secondary-color,#8b5cf6) 100%)",
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    color: "var(--primary-color,#3b82f6)",
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {sectionNumber}
                            </span>
                        </div>

                        {/* 右：标题 + 副标题 */}
                        <div className="flex flex-col justify-center">
                            <span
                                className="mb-5 inline-flex w-fit items-center rounded-full border px-4 py-1.5 text-sm font-medium tracking-wide break-words"
                                style={{
                                    color: "var(--primary-color,#3b82f6)",
                                    background: "rgba(59,130,246,0.10)",
                                    borderColor: "var(--stroke,#1f2937)",
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                SECTION · 章节
                            </span>

                            <h1
                                className="text-6xl font-black leading-[1.25] break-words"
                                style={{
                                    color: "var(--background-text,#e5e7eb)",
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {title}
                            </h1>

                            <div
                                className="my-7 h-1.5 w-28 rounded-full"
                                style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))" }}
                            />

                            {subtitle && (
                                <p
                                    className="max-w-[40rem] text-xl leading-relaxed break-words"
                                    style={{
                                        color: "var(--background-text,#e5e7eb)",
                                        opacity: 0.78,
                                        overflowWrap: 'break-word',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionDivider
