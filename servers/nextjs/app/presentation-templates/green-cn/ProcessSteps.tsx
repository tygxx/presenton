import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'green-cn-process-steps'
export const layoutName = '流程步骤'
export const layoutDescription = '新能源环保风流程步骤页：清新白绿渐变背景 + 叶片地球装饰，编号卡片横向排列，步骤间以自然曲线箭头连接。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('绿色能源转型路径').meta({
        description: "流程主标题（中文，简短有力）",
    }),
    subtitle: z.string().min(2).max(36).default('从清洁发电到零碳运营的可持续闭环').meta({
        description: "副标题，一句话补充流程总览",
    }),
    steps: z.array(z.object({
        title: z.string().min(2).max(14).meta({
            description: "步骤标题（中文，简短）",
        }),
        desc: z.string().min(2).max(36).meta({
            description: "步骤描述（中文，一句话）",
        }),
        icon: IconSchema.optional().meta({
            description: "步骤图标（可选）",
        }),
    })).min(3).max(5).default([
        {
            title: '清洁发电',
            desc: '风光储一体化布局，提升绿电供给占比',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/sun-bold.svg',
                __icon_query__: 'solar power',
            },
        },
        {
            title: '智慧储能',
            desc: '梯次电池与智能调度，平抑波动削峰填谷',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/battery-charging-bold.svg',
                __icon_query__: 'battery storage',
            },
        },
        {
            title: '绿电消纳',
            desc: '园区微网就近接入，绿色电力直供用户',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/plug-bold.svg',
                __icon_query__: 'green power grid',
            },
        },
        {
            title: '碳汇核算',
            desc: '全流程碳足迹监测，量化减排实时核算',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg',
                __icon_query__: 'carbon leaf',
            },
        },
        {
            title: '零碳运营',
            desc: '迈向碳中和目标，构建可持续生态闭环',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-hemisphere-west-bold.svg',
                __icon_query__: 'sustainable earth',
            },
        },
    ]).meta({ description: "流程步骤列表（3-5 项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const fallbackSteps: SlideData['steps'] = [
    {
        title: '清洁发电',
        desc: '风光储一体化布局，提升绿电供给占比',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/sun-bold.svg',
            __icon_query__: 'solar power',
        },
    },
    {
        title: '智慧储能',
        desc: '梯次电池与智能调度，平抑波动削峰填谷',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/battery-charging-bold.svg',
            __icon_query__: 'battery storage',
        },
    },
    {
        title: '绿电消纳',
        desc: '园区微网就近接入，绿色电力直供用户',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/plug-bold.svg',
            __icon_query__: 'green power grid',
        },
    },
    {
        title: '零碳运营',
        desc: '迈向碳中和目标，构建可持续生态闭环',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-hemisphere-west-bold.svg',
            __icon_query__: 'sustainable earth',
        },
    },
]

const ProcessSteps: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '绿色能源转型路径'
    const subtitle = slideData?.subtitle || '从清洁发电到零碳运营的可持续闭环'
    const steps = (slideData?.steps && slideData.steps.length > 0) ? slideData.steps : fallbackSteps

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f0fdf4)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：天空蓝晕染 + 自然有机曲线 + 叶片地球母题 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="greenStepsSky" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="greenStepsHill" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                            </linearGradient>
                            <radialGradient id="greenStepsSun" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 顶部天空蓝晕染 */}
                        <rect x="0" y="0" width="1280" height="320" fill="url(#greenStepsSky)" />
                        {/* 左上能源光晕（地球/太阳母题） */}
                        <circle cx="150" cy="110" r="220" fill="url(#greenStepsSun)" />
                        {/* 底部自然有机曲线（丘陵起伏） */}
                        <path d="M0 600 C 220 540 360 660 620 612 C 880 564 1040 648 1280 588 L 1280 720 L 0 720 Z" fill="url(#greenStepsHill)" />
                        <path d="M0 648 C 260 600 420 700 700 664 C 980 628 1120 696 1280 652 L 1280 720 L 0 720 Z" fill="var(--primary-color,#16a34a)" fillOpacity="0.06" />
                    </svg>

                    {/* 右上角叶片母题 */}
                    <svg viewBox="0 0 200 200" className="absolute -right-6 -top-6 h-44 w-44" aria-hidden="true">
                        <path
                            d="M170 30 C 90 30 30 90 30 170 C 110 170 170 110 170 30 Z"
                            fill="var(--primary-color,#16a34a)"
                            fillOpacity="0.10"
                        />
                        <path
                            d="M170 30 C 120 80 70 130 30 170"
                            fill="none"
                            stroke="var(--primary-color,#16a34a)"
                            strokeOpacity="0.18"
                            strokeWidth="2"
                        />
                    </svg>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-col">
                        <span
                            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#16a34a)",
                                background: "rgba(22,163,74,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#0891b2)" }}
                            />
                            可持续能源流程
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <p
                            className="mt-3 text-lg leading-relaxed break-words"
                            style={{ color: "var(--background-text,#14532d)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle}
                        </p>
                    </div>

                    {/* 流程步骤区 */}
                    <div className="mt-10 flex flex-1 items-stretch justify-center gap-3">
                        {steps.map((step, i) => {
                            const stepNo = String(i + 1).padStart(2, '0')
                            const isLast = i === steps.length - 1
                            return (
                                <React.Fragment key={i}>
                                    {/* 步骤卡片 */}
                                    <div
                                        className="flex flex-1 flex-col rounded-3xl border p-6"
                                        style={{
                                            background: "var(--card-color,#ffffff)",
                                            borderColor: "var(--stroke,#d1fae5)",
                                            boxShadow: '0 12px 28px -18px rgba(22,163,74,0.35)',
                                        }}
                                    >
                                        {/* 编号 + 图标 */}
                                        <div className="flex items-center justify-between">
                                            <span
                                                className="text-3xl font-black leading-none"
                                                style={{ color: "var(--primary-color,#16a34a)", opacity: 0.28 }}
                                            >
                                                {stepNo}
                                            </span>
                                            <div
                                                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                                                style={{
                                                    background: "linear-gradient(135deg, var(--primary-color,#16a34a), var(--secondary-color,#0891b2))",
                                                    color: "var(--primary-text,#ffffff)",
                                                }}
                                            >
                                                {step?.icon?.__icon_url__ ? (
                                                    <RemoteSvgIcon
                                                        url={step.icon.__icon_url__}
                                                        strokeColor="currentColor"
                                                        color="var(--primary-text,#ffffff)"
                                                        className="w-6 h-6"
                                                        title={step?.icon?.__icon_query__ || step?.title || 'process step'}
                                                    />
                                                ) : (
                                                    <span className="text-lg font-bold" style={{ color: "var(--primary-text,#ffffff)" }}>
                                                        {i + 1}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* 分隔小线 */}
                                        <div
                                            className="mt-5 h-1 w-10 rounded-full"
                                            style={{ background: "var(--secondary-color,#0891b2)", opacity: 0.6 }}
                                        />

                                        {/* 标题 + 描述 */}
                                        <h3
                                            className="mt-4 text-xl font-bold leading-[1.35] break-words"
                                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {step?.title || `步骤 ${i + 1}`}
                                        </h3>
                                        <p
                                            className="mt-2 text-sm leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#14532d)", opacity: 0.68, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {step?.desc || ''}
                                        </p>
                                    </div>

                                    {/* 步骤间自然曲线箭头连接线（纯 CSS/SVG） */}
                                    {!isLast && (
                                        <div className="flex w-6 flex-shrink-0 items-center justify-center self-center" aria-hidden="true">
                                            <svg viewBox="0 0 36 40" className="h-10 w-9">
                                                <path
                                                    d="M4 28 C 16 28 18 12 30 12"
                                                    fill="none"
                                                    stroke="var(--primary-color,#16a34a)"
                                                    strokeOpacity="0.55"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M24 7 L 31 12 L 24 17"
                                                    fill="none"
                                                    stroke="var(--secondary-color,#0891b2)"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
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
