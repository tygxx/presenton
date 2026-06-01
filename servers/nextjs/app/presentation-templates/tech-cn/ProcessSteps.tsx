import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'tech-cn-process-steps'
export const layoutName = '流程步骤'
export const layoutDescription = '科技互联网风流程步骤：深色底 + 霓虹蓝紫渐变高光，左对齐大标题，横向 3-5 个编号管线步骤卡片，步骤间用霓虹连接线 + 箭头串联。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('智能上线全流程').meta({
        description: "幻灯片主标题（中文，简短有力，≤20字）",
    }),
    steps: z.array(z.object({
        title: z.string().min(2).max(14).meta({ description: "步骤标题（中文，≤14字）" }),
        desc: z.string().min(4).max(36).meta({ description: "步骤描述（中文，一句话，≤36字）" }),
        icon: IconSchema.optional().meta({ description: "步骤图标（phosphor 图标，可选）" }),
    })).min(3).max(5).default([
        {
            title: '需求洞察',
            desc: '采集业务诉求与数据指标，定义清晰可量化的目标。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/magnifying-glass-bold.svg",
                __icon_query__: "research insight",
            },
        },
        {
            title: '架构设计',
            desc: '绘制云原生技术蓝图，敲定模块边界与接口规范。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/blueprint-bold.svg",
                __icon_query__: "architecture blueprint",
            },
        },
        {
            title: '研发联调',
            desc: '敏捷迭代编码，持续集成驱动多端并行联调。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/code-bold.svg",
                __icon_query__: "develop code",
            },
        },
        {
            title: '自动测试',
            desc: '全链路用例覆盖，灰度发布前完成质量门禁。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/test-tube-bold.svg",
                __icon_query__: "automated testing",
            },
        },
        {
            title: '上线运维',
            desc: '一键部署上线，实时监控护航稳定运行。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-launch-bold.svg",
                __icon_query__: "launch deploy",
            },
        },
    ]).meta({ description: "流程步骤，3-5 步" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ProcessSteps: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '智能上线全流程'
    const steps = (slideData?.steps && slideData.steps.length > 0
        ? slideData.steps
        : schema.shape.steps._def.defaultValue) as SlideData['steps']

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
                            <linearGradient id="techStepsGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.30" />
                                <stop offset="55%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="techStepsHalo" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </radialGradient>
                            <pattern id="techStepsGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0H0V40" fill="none" stroke="var(--stroke,#1f2937)" strokeOpacity="0.55" strokeWidth="1" />
                            </pattern>
                        </defs>
                        {/* 几何网格 */}
                        <rect width="1280" height="720" fill="url(#techStepsGrid)" />
                        {/* 霓虹渐变高光 */}
                        <rect width="1280" height="720" fill="url(#techStepsGlow)" />
                        {/* 右上光晕 */}
                        <circle cx="1160" cy="80" r="320" fill="url(#techStepsHalo)" />
                        {/* 左下光晕 */}
                        <circle cx="100" cy="720" r="280" fill="url(#techStepsHalo)" />
                        {/* 电路线 */}
                        <g stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.20" strokeWidth="1.5" fill="none">
                            <path d="M0 150 H220 L280 90 H520" />
                            <path d="M1280 640 H1040 L980 700 H720" />
                        </g>
                        <g fill="var(--primary-color,#3b82f6)" fillOpacity="0.5">
                            <circle cx="520" cy="90" r="3.5" />
                            <circle cx="720" cy="700" r="3.5" />
                        </g>
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="mb-10 flex-shrink-0">
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
                            // WORKFLOW
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

                    {/* 流程步骤：横向编号管线 + 连接线/箭头 */}
                    <div className="flex min-h-0 flex-1 items-stretch justify-center gap-2">
                        {steps.map((step, i) => {
                            const idx = String(i + 1).padStart(2, '0')
                            const isLast = i === steps.length - 1
                            return (
                                <React.Fragment key={i}>
                                    {/* 步骤卡片 */}
                                    <div
                                        className="flex flex-1 flex-col rounded-2xl px-5 py-6"
                                        style={{
                                            background: "var(--card-color,#111827)",
                                            border: "1px solid var(--stroke,#1f2937)",
                                            boxShadow: "0 0 0 1px rgba(59,130,246,0.06), 0 16px 36px -20px rgba(139,92,246,0.55)",
                                        }}
                                    >
                                        {/* 顶部：序号 + 图标徽章 */}
                                        <div className="mb-5 flex items-center justify-between">
                                            <span
                                                className="text-3xl font-black tabular-nums leading-none"
                                                style={{
                                                    color: "transparent",
                                                    backgroundImage: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                                    WebkitBackgroundClip: "text",
                                                    backgroundClip: "text",
                                                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                                                }}
                                            >
                                                {idx}
                                            </span>
                                            <div
                                                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                                style={{
                                                    background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                                    boxShadow: "0 0 18px -2px rgba(59,130,246,0.55)",
                                                }}
                                            >
                                                {step?.icon?.__icon_url__ ? (
                                                    <RemoteSvgIcon
                                                        url={step.icon.__icon_url__}
                                                        strokeColor="currentColor"
                                                        color="var(--primary-text,#ffffff)"
                                                        className="w-6 h-6"
                                                        title={step.icon.__icon_query__}
                                                    />
                                                ) : (
                                                    <span
                                                        className="text-base font-black tabular-nums"
                                                        style={{
                                                            color: "var(--primary-text,#ffffff)",
                                                            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                                                        }}
                                                    >
                                                        {idx}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* 文字 */}
                                        <h3
                                            className="mb-2 text-lg font-bold leading-[1.6] break-words"
                                            style={{
                                                color: "var(--background-text,#e5e7eb)",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {step?.title}
                                        </h3>
                                        <p
                                            className="text-sm leading-relaxed break-words"
                                            style={{
                                                color: "var(--background-text,#9ca3af)",
                                                opacity: 0.92,
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {step?.desc}
                                        </p>
                                    </div>

                                    {/* 步骤间连接线 + 箭头（纯 CSS/SVG） */}
                                    {!isLast && (
                                        <div className="flex flex-shrink-0 items-center justify-center" style={{ width: '34px' }}>
                                            <div className="flex w-full items-center">
                                                <div
                                                    className="h-0.5 flex-1 rounded-full"
                                                    style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))" }}
                                                />
                                                <svg width="12" height="12" viewBox="0 0 12 12" className="flex-shrink-0" aria-hidden="true">
                                                    <path
                                                        d="M2 1 L8 6 L2 11"
                                                        fill="none"
                                                        stroke="var(--secondary-color,#8b5cf6)"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProcessSteps
