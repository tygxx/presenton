import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { IconSchema } from '../defaultSchemes';

export const layoutId = 'tech-cn-timeline'
export const layoutName = '时间线'
export const layoutDescription = '科技风横向里程碑时间线：深色底 + 霓虹蓝紫渐变，几何网格与电路线装饰，横向轴线串联 3~5 个发光节点卡片。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    eyebrow: z.string().min(2).max(16).default('发展历程 · ROADMAP').meta({
        description: "标题上方的小标签/分类，如『发展历程』『产品演进』",
    }),
    title: z.string().min(2).max(20).default('技术演进里程碑').meta({
        description: "时间线主标题（中文，简短有力）",
    }),
    milestones: z.array(z.object({
        time: z.string().min(1).max(10).meta({
            description: "时间节点，如年份/季度，建议用等宽数字",
        }),
        title: z.string().min(2).max(14).meta({
            description: "里程碑标题，简短有力",
        }),
        desc: z.string().min(4).max(36).meta({
            description: "里程碑简要说明，一句话",
        }),
        icon: IconSchema.default({
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-bold.svg",
            __icon_query__: "rocket",
        }).meta({ description: "里程碑图标" }),
    })).min(3).max(5).default([
        {
            time: '2021',
            title: '架构启航',
            desc: '完成云原生底座搭建，微服务全面落地。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-bold.svg",
                __icon_query__: "rocket",
            },
        },
        {
            time: '2022',
            title: '数据中台',
            desc: '统一数据资产，实时计算覆盖核心链路。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/database-bold.svg",
                __icon_query__: "database",
            },
        },
        {
            time: '2023',
            title: '智能升级',
            desc: '引入大模型能力，业务智能化全面提速。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/brain-bold.svg",
                __icon_query__: "brain",
            },
        },
        {
            time: '2024',
            title: '全球部署',
            desc: '多区域容灾上线，服务全球亿级用户。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg",
                __icon_query__: "globe",
            },
        },
        {
            time: '2025',
            title: '生态共建',
            desc: '开放平台联通伙伴，构建开发者生态。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/graph-bold.svg",
                __icon_query__: "network",
            },
        },
    ]).meta({ description: "里程碑节点列表（3~5 个）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Timeline: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '发展历程 · ROADMAP'
    const title = slideData?.title || '技术演进里程碑'
    const milestones = (slideData?.milestones && slideData.milestones.length > 0
        ? slideData.milestones
        : (schema.shape.milestones._def as any).defaultValue) as NonNullable<SlideData['milestones']>

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
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="techTlGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.28" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="techTlGlow2" x1="1" y1="1" x2="0" y2="0">
                                <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.24" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="techTlAxis" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.9" />
                            </linearGradient>
                            <pattern id="techTlGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0H0V40" fill="none" stroke="var(--background-text,#e5e7eb)" strokeOpacity="0.05" strokeWidth="1" />
                            </pattern>
                        </defs>
                        {/* 几何网格 */}
                        <rect width="1280" height="720" fill="url(#techTlGrid)" />
                        {/* 霓虹光晕 */}
                        <circle cx="120" cy="80" r="320" fill="url(#techTlGlow)" />
                        <circle cx="1180" cy="700" r="360" fill="url(#techTlGlow2)" />
                        {/* 电路线 */}
                        <g stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.18" strokeWidth="1.5" fill="none">
                            <path d="M0 140 H180 L210 110 H360" />
                            <path d="M1280 620 H1080 L1050 650 H880" />
                            <circle cx="180" cy="140" r="3" fill="var(--primary-color,#3b82f6)" stroke="none" />
                            <circle cx="1080" cy="620" r="3" fill="var(--secondary-color,#8b5cf6)" stroke="none" />
                        </g>
                    </svg>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-16 py-12">
                    {/* 标题区（左对齐） */}
                    <div className="flex flex-col">
                        <span
                            className="mb-4 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#3b82f6)",
                                background: "rgba(59,130,246,0.12)",
                                border: "1px solid rgba(59,130,246,0.30)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {eyebrow}
                        </span>
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
                            className="mt-5 h-1 w-28 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))" }}
                        />
                    </div>

                    {/* 横向时间线区 */}
                    <div className="relative mt-12 flex items-stretch">
                        {/* 横向轴线 */}
                        <div
                            className="absolute left-0 right-0 rounded-full"
                            style={{
                                top: '22px', height: '3px',
                                background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                boxShadow: "0 0 16px rgba(59,130,246,0.45)",
                            }}
                        />
                        {/* 节点列表 */}
                        <div className="relative flex w-full" style={{ gap: '20px' }}>
                            {milestones.map((m, i) => {
                                const time = m?.time || ''
                                const mTitle = m?.title || ''
                                const desc = m?.desc || ''
                                const iconUrl = m?.icon?.__icon_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-bold.svg"
                                const iconQuery = m?.icon?.__icon_query__ || 'milestone'
                                return (
                                    <div key={i} className="flex flex-1 flex-col items-center">
                                        {/* 发光节点 */}
                                        <div
                                            className="flex flex-shrink-0 items-center justify-center rounded-full"
                                            style={{
                                                width: '46px', height: '46px',
                                                background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                                boxShadow: "0 0 0 4px rgba(10,14,26,0.9), 0 0 22px rgba(139,92,246,0.55)",
                                            }}
                                        >
                                            <RemoteSvgIcon
                                                url={iconUrl}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-6 h-6"
                                                title={iconQuery}
                                            />
                                        </div>

                                        {/* 时间（等宽数字） */}
                                        <span
                                            className="mt-5 text-2xl font-black leading-[1.2] break-words"
                                            style={{
                                                color: "var(--primary-color,#3b82f6)",
                                                fontFamily: "ui-monospace, 'SFMono-Regular', 'Menlo', monospace",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {time}
                                        </span>

                                        {/* 内容卡片：半透明发光描边 */}
                                        <div
                                            className="mt-3 flex w-full flex-col rounded-2xl px-4 py-4"
                                            style={{
                                                background: "rgba(17,24,39,0.72)",
                                                border: "1px solid var(--stroke,#1f2937)",
                                                boxShadow: "0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
                                            }}
                                        >
                                            <h3
                                                className="text-lg font-bold leading-[1.35] break-words"
                                                style={{
                                                    color: "var(--background-text,#e5e7eb)",
                                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                                }}
                                            >
                                                {mTitle}
                                            </h3>
                                            <p
                                                className="mt-2 text-sm leading-relaxed break-words"
                                                style={{
                                                    color: "var(--background-text,#e5e7eb)",
                                                    opacity: 0.72,
                                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                                }}
                                            >
                                                {desc}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Timeline
