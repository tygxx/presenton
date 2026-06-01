import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'medical-cn-process-steps'
export const layoutName = '流程步骤'
export const layoutDescription = '医疗健康风流程步骤：横向 3-5 个编号步骤卡片，步骤间用箭头/脉搏连接线串联，配圆角卡片、脉搏波形、十字与柔和投影，蓝绿点缀。纯 CSS/SVG 装饰，离线可渲染，适合编号流程/诊疗管线展示。'

const schema = z.object({
    title: z.string().min(2).max(20).default('标准化诊疗服务流程').meta({
        description: "版式主标题（中文，简短有力，≤20字）",
    }),
    steps: z.array(z.object({
        title: z.string().min(2).max(14).meta({ description: "步骤小标题，≤14字" }),
        desc: z.string().min(4).max(36).meta({ description: "步骤说明文字，≤36字" }),
        icon: IconSchema.optional().meta({ description: "步骤图标（phosphor 图标，可选）" }),
    })).min(3).max(5).default([
        {
            title: '预约登记',
            desc: '线上一键预约挂号，自动核验身份与既往病史档案。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/calendar-check-bold.svg",
                __icon_query__: "appointment registration",
            },
        },
        {
            title: '体征采集',
            desc: '智能设备连续采集心率、血压等核心体征数据。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg",
                __icon_query__: "vital signs monitor",
            },
        },
        {
            title: '专家诊断',
            desc: '名医结合检查结果在线问诊，给出精准诊疗意见。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/stethoscope-bold.svg",
                __icon_query__: "doctor diagnosis",
            },
        },
        {
            title: '方案执行',
            desc: '个性化用药与治疗方案下发，全程跟踪执行情况。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/pill-bold.svg",
                __icon_query__: "treatment plan",
            },
        },
        {
            title: '康复随访',
            desc: '定期回访评估康复进展，动态优化健康管理计划。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg",
                __icon_query__: "recovery follow up",
            },
        },
    ]).meta({ description: "流程步骤列表，3-5 个" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const fallbackSteps: SlideData['steps'] = [
    {
        title: '预约登记',
        desc: '线上一键预约挂号，自动核验身份与既往病史档案。',
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/calendar-check-bold.svg",
            __icon_query__: "appointment registration",
        },
    },
    {
        title: '体征采集',
        desc: '智能设备连续采集心率、血压等核心体征数据。',
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg",
            __icon_query__: "vital signs monitor",
        },
    },
    {
        title: '专家诊断',
        desc: '名医结合检查结果在线问诊，给出精准诊疗意见。',
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/stethoscope-bold.svg",
            __icon_query__: "doctor diagnosis",
        },
    },
    {
        title: '方案执行',
        desc: '个性化用药与治疗方案下发，全程跟踪执行情况。',
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/pill-bold.svg",
            __icon_query__: "treatment plan",
        },
    },
    {
        title: '康复随访',
        desc: '定期回访评估康复进展，动态优化健康管理计划。',
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg",
            __icon_query__: "recovery follow up",
        },
    },
]

const ProcessSteps: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '标准化诊疗服务流程'
    const steps = (slideData?.steps && slideData.steps.length > 0 ? slideData.steps : fallbackSteps).slice(0, 5)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f8fafc)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：柔和蓝绿光晕 */}
                <div
                    className="absolute -top-24 -right-20 h-80 w-80 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(14,165,233,0.14), rgba(14,165,233,0) 70%)" }}
                    aria-hidden="true"
                />
                <div
                    className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12), rgba(16,185,129,0) 70%)" }}
                    aria-hidden="true"
                />

                {/* 背景装饰：贯穿底部的脉搏波形 */}
                <svg
                    viewBox="0 0 1280 120"
                    className="absolute bottom-0 left-0 h-28 w-full"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path
                        d="M0 70 H180 l24 -36 l30 64 l26 -84 l28 70 H560 l24 -36 l30 64 l26 -84 l28 70 H980 l24 -36 l30 64 l26 -84 l28 70 H1280"
                        fill="none"
                        stroke="var(--secondary-color,#10b981)"
                        strokeOpacity="0.16"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>

                {/* 背景装饰：右上角十字母题 */}
                <svg viewBox="0 0 60 60" className="absolute right-12 top-10 h-9 w-9" aria-hidden="true">
                    <path
                        d="M24 6 H36 V24 H54 V36 H36 V54 H24 V36 H6 V24 H24 Z"
                        fill="none"
                        stroke="var(--primary-color,#0ea5e9)"
                        strokeOpacity="0.28"
                        strokeWidth="3"
                        strokeLinejoin="round"
                    />
                </svg>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <div className="flex items-center gap-3">
                            <span
                                className="inline-flex items-center rounded-full px-3.5 py-1 text-sm font-semibold leading-relaxed break-words"
                                style={{
                                    color: "var(--primary-color,#0ea5e9)",
                                    background: "rgba(14,165,233,0.10)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                诊疗流程
                            </span>
                            <div className="h-px flex-1" style={{ background: "var(--stroke,#e2e8f0)" }} />
                        </div>
                        <h1
                            className="mt-5 text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                    </div>

                    {/* 流程步骤区 */}
                    <div className="flex flex-1 items-center">
                        <div className="flex w-full items-stretch gap-3">
                            {steps.map((step, i) => {
                                const num = String(i + 1).padStart(2, '0')
                                const isLast = i === steps.length - 1
                                return (
                                    <React.Fragment key={i}>
                                        {/* 步骤卡片 */}
                                        <div
                                            className="flex flex-1 flex-col rounded-2xl border p-5 shadow-sm"
                                            style={{
                                                background: "var(--card-color,#ffffff)",
                                                borderColor: "var(--stroke,#e2e8f0)",
                                                boxShadow: '0 12px 28px -16px rgba(15,23,42,0.18)',
                                            }}
                                        >
                                            {/* 编号 + 图标 */}
                                            <div className="flex items-center justify-between">
                                                <div
                                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                                                    style={{
                                                        background: "linear-gradient(135deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))",
                                                        color: "var(--primary-text,#ffffff)",
                                                    }}
                                                >
                                                    <RemoteSvgIcon
                                                        url={step?.icon?.__icon_url__}
                                                        strokeColor="currentColor"
                                                        color="var(--primary-text,#ffffff)"
                                                        className="w-6 h-6"
                                                        title={step?.icon?.__icon_query__ || step?.title}
                                                    />
                                                </div>
                                                <span
                                                    className="text-3xl font-black leading-none"
                                                    style={{ color: "rgba(14,165,233,0.22)" }}
                                                >
                                                    {num}
                                                </span>
                                            </div>

                                            {/* 标题 */}
                                            <h3
                                                className="mt-4 text-lg font-bold leading-[1.35] break-words"
                                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {step?.title}
                                            </h3>

                                            {/* 蓝绿分隔线 */}
                                            <div
                                                className="mt-2.5 mb-3 h-1 w-10 rounded-full"
                                                style={{ background: "linear-gradient(90deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))" }}
                                            />

                                            {/* 说明 */}
                                            <p
                                                className="text-sm leading-[1.7] break-words"
                                                style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {step?.desc}
                                            </p>
                                        </div>

                                        {/* 步骤间连接箭头（纯 CSS/SVG） */}
                                        {!isLast && (
                                            <div className="flex flex-shrink-0 items-center justify-center self-center">
                                                <svg viewBox="0 0 28 24" className="h-6 w-7" aria-hidden="true">
                                                    <path
                                                        d="M2 12 H20"
                                                        fill="none"
                                                        stroke="var(--secondary-color,#10b981)"
                                                        strokeOpacity="0.55"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M16 6 L24 12 L16 18"
                                                        fill="none"
                                                        stroke="var(--secondary-color,#10b981)"
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
            </div>
        </>
    )
}

export default ProcessSteps
