import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'tech-cn-roadmap'
export const layoutName = '路线图'
export const layoutDescription = '科技互联网风路线图：深色底 + 霓虹蓝紫渐变高光，分阶段计划横向卡片排列，几何网格与电路光晕装饰。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('产品演进路线图').meta({
        description: "幻灯片主标题（中文，简短有力，描述分阶段计划主题）",
    }),
    phases: z.array(z.object({
        phase: z.string().min(2).max(10).meta({
            description: "阶段标签，如『第一阶段』『Q1』",
        }),
        title: z.string().min(2).max(16).meta({
            description: "该阶段标题（中文，简短）",
        }),
        icon: IconSchema.default({
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-bold.svg",
            __icon_query__: "rocket",
        }).meta({ description: "阶段图标" }),
        items: z.array(z.string().min(2).max(24).meta({
            description: "该阶段的关键任务/成果（中文，简短）",
        })).min(1).max(3).meta({ description: "阶段关键事项列表" }),
    })).min(3).max(4).default([
        {
            phase: '第一阶段',
            title: '基础架构搭建',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/stack-bold.svg",
                __icon_query__: "stack architecture",
            },
            items: ['云原生底座上线', '微服务拆分完成', '核心数据打通'],
        },
        {
            phase: '第二阶段',
            title: '智能能力接入',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/brain-bold.svg",
                __icon_query__: "brain ai",
            },
            items: ['大模型推理服务', '智能推荐引擎', '实时风控体系'],
        },
        {
            phase: '第三阶段',
            title: '规模化增长',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg",
                __icon_query__: "growth chart",
            },
            items: ['日活突破千万', '多端生态协同', '商业化闭环'],
        },
        {
            phase: '第四阶段',
            title: '全球化拓展',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg",
                __icon_query__: "globe global",
            },
            items: ['海外节点部署', '多语言本地化', '合规与安全认证'],
        },
    ]).meta({ description: "分阶段计划，横向卡片排列（3-4 个阶段）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Roadmap: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '产品演进路线图'
    const phases = (slideData?.phases && slideData.phases.length > 0)
        ? slideData.phases
        : [
            {
                phase: '第一阶段', title: '基础架构搭建',
                icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/stack-bold.svg", __icon_query__: "stack architecture" },
                items: ['云原生底座上线', '微服务拆分完成', '核心数据打通'],
            },
            {
                phase: '第二阶段', title: '智能能力接入',
                icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/brain-bold.svg", __icon_query__: "brain ai" },
                items: ['大模型推理服务', '智能推荐引擎', '实时风控体系'],
            },
            {
                phase: '第三阶段', title: '规模化增长',
                icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg", __icon_query__: "growth chart" },
                items: ['日活突破千万', '多端生态协同', '商业化闭环'],
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
                    background: "var(--background-color,#0a0e1a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：几何网格 + 电路线 + 霓虹光晕 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="techRoadGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.22" />
                                <stop offset="50%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="techRoadLine" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.7" />
                            </linearGradient>
                            <pattern id="techRoadGrid" width="44" height="44" patternUnits="userSpaceOnUse">
                                <path d="M44 0 L0 0 0 44" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.06" strokeWidth="1" />
                            </pattern>
                            <radialGradient id="techRoadHalo" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 网格底纹 */}
                        <rect width="1280" height="720" fill="url(#techRoadGrid)" />
                        {/* 顶部渐变高光 */}
                        <rect width="1280" height="720" fill="url(#techRoadGlow)" />
                        {/* 左上霓虹光晕 */}
                        <circle cx="120" cy="80" r="320" fill="url(#techRoadHalo)" />
                        {/* 右下紫色光晕 */}
                        <circle cx="1180" cy="700" r="300" fill="url(#techRoadGlow)" />
                        {/* 电路线母题 */}
                        <g stroke="url(#techRoadLine)" strokeWidth="1.5" fill="none" strokeOpacity="0.5">
                            <path d="M0 150 H180 L220 190 H420" />
                            <path d="M1280 600 H1080 L1040 560 H840" />
                        </g>
                        <g fill="var(--secondary-color,#8b5cf6)" fillOpacity="0.6">
                            <circle cx="420" cy="190" r="3.5" />
                            <circle cx="840" cy="560" r="3.5" />
                        </g>
                    </svg>
                </div>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{
                                    background: "var(--primary-color,#3b82f6)",
                                    boxShadow: '0 0 0 5px rgba(59,130,246,0.18)',
                                }}
                            />
                            <span
                                className="text-sm font-medium uppercase break-words"
                                style={{
                                    color: "var(--primary-color,#3b82f6)",
                                    letterSpacing: '0.18em',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                ROADMAP
                            </span>
                        </div>
                        <h1
                            className="mt-3 text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-5 h-1.5 w-28 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))" }}
                        />
                    </div>

                    {/* 阶段卡片横向排列 */}
                    <div className="mt-10 flex flex-1 items-stretch gap-6">
                        {phases.map((p, i) => {
                            const items = p?.items || []
                            const icon = p?.icon
                            return (
                                <div
                                    key={i}
                                    className="flex flex-1 flex-col rounded-2xl border p-6"
                                    style={{
                                        background: "var(--card-color,#111827)",
                                        borderColor: "var(--stroke,#1f2937)",
                                        boxShadow: '0 0 0 1px rgba(59,130,246,0.08), 0 18px 40px -22px rgba(59,130,246,0.55)',
                                    }}
                                >
                                    {/* 顶部：等宽序号 + 图标 */}
                                    <div className="flex items-center justify-between">
                                        <span
                                            className="text-3xl font-black leading-none"
                                            style={{ color: "var(--secondary-color,#8b5cf6)", fontFamily: "ui-monospace, 'SFMono-Regular', Menlo, monospace" }}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <div
                                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                                            style={{
                                                background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                                boxShadow: '0 8px 22px -10px rgba(139,92,246,0.8)',
                                            }}
                                        >
                                            {icon?.__icon_url__ && (
                                                <RemoteSvgIcon
                                                    url={icon.__icon_url__}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-text,#ffffff)"
                                                    className="w-6 h-6"
                                                    title={icon.__icon_query__}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* 阶段标签 */}
                                    <span
                                        className="mt-5 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold break-words"
                                        style={{
                                            color: "var(--primary-color,#3b82f6)",
                                            background: "rgba(59,130,246,0.12)",
                                            border: "1px solid var(--stroke,#1f2937)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {p?.phase || `第${i + 1}阶段`}
                                    </span>

                                    {/* 阶段标题 */}
                                    <h3
                                        className="mt-3 text-xl font-bold leading-[1.35] break-words"
                                        style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {p?.title || '阶段目标'}
                                    </h3>

                                    {/* 分隔光线 */}
                                    <div
                                        className="my-4 h-px w-full"
                                        style={{ background: "linear-gradient(90deg, var(--stroke,#1f2937), rgba(59,130,246,0.45), var(--stroke,#1f2937))" }}
                                    />

                                    {/* 关键事项 */}
                                    <ul className="flex flex-col gap-3">
                                        {items.map((it, j) => (
                                            <li key={j} className="flex items-start gap-2.5">
                                                <span
                                                    className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                                    style={{
                                                        background: "var(--secondary-color,#8b5cf6)",
                                                        boxShadow: '0 0 6px 1px rgba(139,92,246,0.7)',
                                                    }}
                                                />
                                                <span
                                                    className="text-sm leading-[1.7] break-words"
                                                    style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
