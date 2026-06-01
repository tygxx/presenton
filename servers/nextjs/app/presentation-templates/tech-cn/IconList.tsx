import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'tech-cn-icon-list'
export const layoutName = '图标要点列表'
export const layoutDescription = '科技互联网风要点列表：深色底 + 霓虹蓝紫渐变高光，左对齐大标题，竖向 4-6 条「左图标右文字」的半透明发光描边卡片。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('核心技术能力').meta({
        description: "幻灯片主标题（中文，简短有力，≤20字）",
    }),
    items: z.array(z.object({
        icon: IconSchema.meta({ description: "要点图标（phosphor 图标）" }),
        title: z.string().min(2).max(14).meta({ description: "要点标题（中文，≤14字）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点描述（中文，一句话，≤40字）" }),
    })).min(4).max(6).default([
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cpu-bold.svg",
                __icon_query__: "cpu",
            },
            title: '弹性算力调度',
            desc: '基于云原生架构，按需扩缩容，资源利用率提升 40%。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/brain-bold.svg",
                __icon_query__: "brain ai",
            },
            title: '大模型推理引擎',
            desc: '自研推理框架支持千亿参数模型，毫秒级低延迟响应。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg",
                __icon_query__: "security shield",
            },
            title: '全链路安全防护',
            desc: '端到端加密与零信任体系，守护每一次数据流转。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightning-bold.svg",
                __icon_query__: "lightning speed",
            },
            title: '高并发实时网关',
            desc: '单集群支撑百万级 QPS，平稳应对业务流量洪峰。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/database-bold.svg",
                __icon_query__: "database",
            },
            title: '分布式数据底座',
            desc: '多活容灾架构，PB 级数据存储与秒级实时分析。',
        },
    ]).meta({ description: "要点列表，4-6 条" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const IconList: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '核心技术能力'
    const items = (slideData?.items && slideData.items.length > 0
        ? slideData.items
        : schema.shape.items._def.defaultValue) as SlideData['items']

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
                {/* 背景装饰：几何网格 + 霓虹光晕 + 电路线 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="techIconListGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.30" />
                                <stop offset="55%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="techIconListHalo" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </radialGradient>
                            <pattern id="techIconListGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0H0V40" fill="none" stroke="var(--stroke,#1f2937)" strokeOpacity="0.55" strokeWidth="1" />
                            </pattern>
                        </defs>
                        {/* 几何网格 */}
                        <rect width="1280" height="720" fill="url(#techIconListGrid)" />
                        {/* 左上霓虹渐变高光 */}
                        <rect width="1280" height="720" fill="url(#techIconListGlow)" />
                        {/* 右上光晕 */}
                        <circle cx="1180" cy="120" r="320" fill="url(#techIconListHalo)" />
                        {/* 左下光晕 */}
                        <circle cx="80" cy="700" r="260" fill="url(#techIconListHalo)" />
                        {/* 电路线 */}
                        <g stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.22" strokeWidth="1.5" fill="none">
                            <path d="M0 600 H260 L320 540 H520" />
                            <path d="M1280 200 H1020 L960 260 H760" />
                        </g>
                        <g fill="var(--primary-color,#3b82f6)" fillOpacity="0.5">
                            <circle cx="520" cy="540" r="3.5" />
                            <circle cx="760" cy="260" r="3.5" />
                        </g>
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="mb-8 flex-shrink-0">
                        <span
                            className="mb-4 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#3b82f6)",
                                background: "rgba(59,130,246,0.12)",
                                border: "1px solid var(--stroke,#1f2937)",
                                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            // TECH&nbsp;STACK
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

                    {/* 要点列表：竖向「左图标右文字」发光描边卡片 */}
                    <div className="flex min-h-0 flex-1 flex-col justify-center gap-4">
                        {items.map((item, i) => {
                            const idx = String(i + 1).padStart(2, '0')
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-5 rounded-2xl px-6 py-4"
                                    style={{
                                        background: "var(--card-color,#111827)",
                                        border: "1px solid var(--stroke,#1f2937)",
                                        boxShadow: "0 0 0 1px rgba(59,130,246,0.06), 0 12px 30px -18px rgba(139,92,246,0.55)",
                                    }}
                                >
                                    {/* 序号（等宽数字点缀） */}
                                    <span
                                        className="flex-shrink-0 text-sm font-bold tabular-nums"
                                        style={{
                                            color: "var(--secondary-color,#8b5cf6)",
                                            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                                        }}
                                    >
                                        {idx}
                                    </span>

                                    {/* 图标徽章（霓虹渐变 + 发光描边） */}
                                    <div
                                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                        style={{
                                            background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                            boxShadow: "0 0 18px -2px rgba(59,130,246,0.55)",
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={item?.icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-6 h-6"
                                            title={item?.icon?.__icon_query__}
                                        />
                                    </div>

                                    {/* 右侧文字 */}
                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <h3
                                            className="text-lg font-bold leading-[1.6] break-words"
                                            style={{
                                                color: "var(--background-text,#e5e7eb)",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {item?.title}
                                        </h3>
                                        <p
                                            className="text-sm leading-relaxed break-words"
                                            style={{
                                                color: "var(--background-text,#9ca3af)",
                                                opacity: 0.92,
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {item?.desc}
                                        </p>
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

export default IconList
