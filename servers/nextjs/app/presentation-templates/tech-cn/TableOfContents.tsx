import React from 'react'
import * as z from "zod";

export const layoutId = 'tech-cn-toc'
export const layoutName = '目录'
export const layoutDescription = '科技互联网风目录页：深色底 + 霓虹蓝紫渐变高光，左对齐大标题，编号大字 + 分节标题的发光描边卡片。纯 CSS/SVG 装饰（几何网格/光晕/电路线），无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('目录').meta({
        description: "目录页主标题，如『目录』『议程』",
    }),
    eyebrow: z.string().min(2).max(18).default('内容导览 · CONTENTS').meta({
        description: "标题上方的小标签",
    }),
    items: z.array(z.object({
        heading: z.string().min(2).max(16).meta({
            description: "分节标题（中文，简短）",
        }),
        desc: z.string().max(28).optional().meta({
            description: "分节副说明（可选，一句话）",
        }),
    })).min(3).max(6).default([
        { heading: '产品与技术架构', desc: '云原生底座与微服务拆分' },
        { heading: '智能算法引擎', desc: '大模型驱动的推荐与检索' },
        { heading: '数据中台建设', desc: '实时数仓与全链路埋点' },
        { heading: '增长与商业化', desc: '用户规模与付费转化路径' },
        { heading: '安全与合规体系', desc: '零信任架构与隐私保护' },
        { heading: '未来路线图', desc: '下一代平台演进规划' },
    ]).meta({ description: "目录条目列表（编号自动生成 01/02…）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TableOfContents: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '目录'
    const eyebrow = slideData?.eyebrow || '内容导览 · CONTENTS'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : [
            { heading: '产品与技术架构', desc: '云原生底座与微服务拆分' },
            { heading: '智能算法引擎', desc: '大模型驱动的推荐与检索' },
            { heading: '数据中台建设', desc: '实时数仓与全链路埋点' },
            { heading: '增长与商业化', desc: '用户规模与付费转化路径' },
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
                    background: "var(--background-color,#0a0e1a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：几何网格 + 霓虹光晕 + 电路线 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="techTocGrid" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.04" />
                            </linearGradient>
                            <radialGradient id="techTocGlowA" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="techTocGlowB" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.40" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </radialGradient>
                            <pattern id="techTocMesh" width="44" height="44" patternUnits="userSpaceOnUse">
                                <path d="M44 0H0V44" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.07" strokeWidth="1" />
                            </pattern>
                        </defs>
                        {/* 网格 */}
                        <rect width="1280" height="720" fill="url(#techTocMesh)" />
                        <rect width="1280" height="720" fill="url(#techTocGrid)" />
                        {/* 霓虹光晕 */}
                        <circle cx="1120" cy="120" r="320" fill="url(#techTocGlowA)" />
                        <circle cx="180" cy="660" r="280" fill="url(#techTocGlowB)" />
                        {/* 电路线 */}
                        <g stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.16" strokeWidth="1.5" fill="none">
                            <path d="M0 200 H180 L220 240 H520" />
                            <path d="M1280 520 H1040 L1000 480 H760" />
                            <path d="M640 0 V60 L680 100 V160" />
                        </g>
                        <g fill="var(--secondary-color,#8b5cf6)" fillOpacity="0.5">
                            <circle cx="520" cy="240" r="3.5" />
                            <circle cx="760" cy="480" r="3.5" />
                            <circle cx="680" cy="160" r="3.5" />
                        </g>
                    </svg>
                </div>

                {/* 顶部细霓虹渐变条 */}
                <div
                    className="absolute top-0 left-0 h-1 w-full"
                    style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6) 0%, var(--secondary-color,#8b5cf6) 100%)" }}
                />

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-16 py-12 gap-9">
                    {/* 标题区 */}
                    <div className="flex flex-col">
                        <span
                            className="mb-4 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#3b82f6)",
                                background: "rgba(59,130,246,0.12)",
                                border: "1px solid var(--stroke,#1f2937)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {eyebrow}
                        </span>
                        <div className="flex items-center gap-5">
                            <h1
                                className="text-5xl font-black leading-[1.2] break-words"
                                style={{
                                    color: "var(--background-text,#e5e7eb)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {title}
                            </h1>
                            <div
                                className="h-px flex-1 rounded-full"
                                style={{ background: "linear-gradient(90deg, var(--secondary-color,#8b5cf6) 0%, rgba(139,92,246,0) 100%)" }}
                            />
                        </div>
                    </div>

                    {/* 条目网格：编号大字 + 分节标题 */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                        {items.map((item, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-5 rounded-2xl px-6 py-4"
                                    style={{
                                        background: "var(--card-color,#111827)",
                                        border: "1px solid var(--stroke,#1f2937)",
                                        boxShadow: "0 0 0 1px rgba(59,130,246,0.08), 0 8px 24px -12px rgba(139,92,246,0.35)",
                                    }}
                                >
                                    {/* 编号大字 */}
                                    <span
                                        className="flex-shrink-0 text-4xl font-black leading-none"
                                        style={{
                                            fontFamily: "var(--code-font-family,'JetBrains Mono','SF Mono',ui-monospace,monospace)",
                                            background: "linear-gradient(135deg, var(--primary-color,#3b82f6) 0%, var(--secondary-color,#8b5cf6) 100%)",
                                            WebkitBackgroundClip: 'text',
                                            backgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            color: "var(--primary-color,#3b82f6)",
                                        }}
                                    >
                                        {num}
                                    </span>
                                    {/* 竖线分隔 */}
                                    <span
                                        className="h-10 w-px flex-shrink-0 rounded-full"
                                        style={{ background: "linear-gradient(180deg, var(--primary-color,#3b82f6) 0%, var(--secondary-color,#8b5cf6) 100%)", opacity: 0.5 }}
                                    />
                                    {/* 分节标题 + 副说明 */}
                                    <div className="flex min-w-0 flex-col leading-relaxed">
                                        <span
                                            className="text-lg font-bold leading-[1.6] break-words"
                                            style={{
                                                color: "var(--primary-text,#ffffff)",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {item?.heading}
                                        </span>
                                        {item?.desc && (
                                            <span
                                                className="text-sm leading-[1.7] break-words"
                                                style={{
                                                    color: "var(--background-text,#9ca3af)",
                                                    opacity: 0.85,
                                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                                }}
                                            >
                                                {item.desc}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableOfContents
