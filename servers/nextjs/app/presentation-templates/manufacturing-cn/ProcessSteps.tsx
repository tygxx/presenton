import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'manufacturing-cn-process-steps'
export const layoutName = '流程步骤'
export const layoutDescription = '智能制造风流程步骤页：工业深灰底 + 精密网格与齿轮装饰，编号步骤卡片用硬朗连接线串联，呈现编号流程或产线管线。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('智能产线四步流程').meta({
        description: "流程页主标题（中文，简短有力）",
    }),
    steps: z.array(z.object({
        title: z.string().min(2).max(14).meta({
            description: "步骤标题，如『物料入库』『精密加工』",
        }),
        desc: z.string().min(2).max(36).meta({
            description: "步骤简要说明（一句话）",
        }),
        icon: IconSchema.optional().meta({
            description: "步骤图标（可选）",
        }),
    })).min(3).max(5).default([
        {
            title: '智能上料',
            desc: '物料自动识别与配送，零等待入线。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/package-bold.svg',
                __icon_query__: 'material package',
            },
        },
        {
            title: '精密加工',
            desc: '高速机床闭环控制，微米级稳定加工。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg',
                __icon_query__: 'gear machining',
            },
        },
        {
            title: '在线质检',
            desc: '机器视觉全检，缺陷实时拦截剔除。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/scan-bold.svg',
                __icon_query__: 'inspection scan',
            },
        },
        {
            title: '智能仓配',
            desc: '成品自动分拣入库，订单按需直发。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/truck-bold.svg',
                __icon_query__: 'warehouse logistics',
            },
        },
    ]).meta({
        description: "编号流程步骤（3-5 步），按顺序串联",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ProcessSteps: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '智能产线四步流程'
    const steps = (slideData?.steps && slideData.steps.length > 0)
        ? slideData.steps
        : [
            { title: '智能上料', desc: '物料自动识别与配送，零等待入线。', icon: undefined },
            { title: '精密加工', desc: '高速机床闭环控制，微米级稳定加工。', icon: undefined },
            { title: '在线质检', desc: '机器视觉全检，缺陷实时拦截剔除。', icon: undefined },
            { title: '智能仓配', desc: '成品自动分拣入库，订单按需直发。', icon: undefined },
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
                    background: "var(--background-color,#1f2937)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：精密网格 + 齿轮 + 金属线条 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="mfgGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L0 0 0 40" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="mfgTopGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="mfgEdge" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
                        </linearGradient>
                    </defs>
                    {/* 精密网格 */}
                    <rect width="1280" height="720" fill="url(#mfgGrid)" />
                    {/* 顶部蓝光晕 */}
                    <rect width="1280" height="320" fill="url(#mfgTopGlow)" />
                    {/* 右上齿轮母题 */}
                    <g transform="translate(1140 -60)" fill="none" stroke="#3b82f6" strokeOpacity="0.12" strokeWidth="2">
                        <circle cx="0" cy="0" r="150" />
                        <circle cx="0" cy="0" r="110" />
                        <circle cx="0" cy="0" r="60" />
                        {Array.from({ length: 12 }).map((_, i) => {
                            const a = (i * Math.PI) / 6
                            return (
                                <line
                                    key={i}
                                    x1={Math.cos(a) * 110}
                                    y1={Math.sin(a) * 110}
                                    x2={Math.cos(a) * 150}
                                    y2={Math.sin(a) * 150}
                                />
                            )
                        })}
                    </g>
                    {/* 左下齿轮母题 */}
                    <g transform="translate(60 760)" fill="none" stroke="#f97316" strokeOpacity="0.10" strokeWidth="2">
                        <circle cx="0" cy="0" r="120" />
                        <circle cx="0" cy="0" r="80" />
                        {Array.from({ length: 10 }).map((_, i) => {
                            const a = (i * Math.PI) / 5
                            return (
                                <line
                                    key={i}
                                    x1={Math.cos(a) * 80}
                                    y1={Math.sin(a) * 80}
                                    x2={Math.cos(a) * 120}
                                    y2={Math.sin(a) * 120}
                                />
                            )
                        })}
                    </g>
                    {/* 硬朗金属线条 */}
                    <line x1="0" y1="120" x2="1280" y2="120" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
                    <line x1="0" y1="600" x2="1280" y2="600" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
                </svg>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full w-full flex-col justify-center px-16 py-12">
                    {/* 标题区 */}
                    <div className="mb-10 flex items-center gap-4">
                        <div
                            className="h-9 w-1.5 flex-shrink-0 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <span
                            className="ml-2 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold break-words"
                            style={{
                                color: "var(--primary-color,#3b82f6)",
                                borderColor: "var(--stroke,#374151)",
                                background: "rgba(59,130,246,0.08)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            SMART LINE
                        </span>
                    </div>

                    {/* 步骤管线 */}
                    <div className="flex items-stretch gap-3">
                        {steps.map((step, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            const isLast = i === steps.length - 1
                            return (
                                <React.Fragment key={i}>
                                    {/* 步骤卡片 */}
                                    <div
                                        className="flex flex-1 flex-col rounded-xl border p-5 shadow-sm"
                                        style={{
                                            background: "var(--card-color,#111827)",
                                            borderColor: "var(--stroke,#374151)",
                                        }}
                                    >
                                        {/* 编号 + 图标 */}
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-baseline gap-2">
                                                <span
                                                    className="text-3xl font-black leading-none"
                                                    style={{ color: "var(--primary-color,#3b82f6)" }}
                                                >
                                                    {num}
                                                </span>
                                                <span
                                                    className="h-2 w-2 rounded-full"
                                                    style={{ background: "var(--secondary-color,#f97316)" }}
                                                />
                                            </div>
                                            <div
                                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border"
                                                style={{
                                                    background: "rgba(59,130,246,0.12)",
                                                    borderColor: "var(--stroke,#374151)",
                                                }}
                                            >
                                                {step.icon?.__icon_url__ ? (
                                                    <RemoteSvgIcon
                                                        url={step.icon.__icon_url__}
                                                        strokeColor="currentColor"
                                                        color="var(--primary-text,#ffffff)"
                                                        className="w-6 h-6"
                                                        title={step.icon.__icon_query__}
                                                    />
                                                ) : (
                                                    <span
                                                        className="text-lg font-black"
                                                        style={{ color: "var(--primary-text,#ffffff)" }}
                                                    >
                                                        {num}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* 步骤标题 */}
                                        <h3
                                            className="text-xl font-bold leading-[1.35] break-words"
                                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {step.title}
                                        </h3>

                                        {/* 分隔金属线 */}
                                        <div
                                            className="my-3 h-px w-full"
                                            style={{ background: "var(--stroke,#374151)" }}
                                        />

                                        {/* 步骤说明 */}
                                        <p
                                            className="text-sm leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {step.desc}
                                        </p>
                                    </div>

                                    {/* 步骤连接箭头（最后一步不加） */}
                                    {!isLast && (
                                        <div className="flex flex-shrink-0 items-center justify-center" style={{ width: '28px' }}>
                                            <svg width="28" height="20" viewBox="0 0 28 20" aria-hidden="true">
                                                <line x1="2" y1="10" x2="20" y2="10" stroke="url(#mfgEdge)" strokeWidth="2.5" strokeLinecap="round" />
                                                <path d="M18 4 L26 10 L18 16" fill="none" stroke="var(--secondary-color,#f97316)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </div>

                    {/* 底部产线轨道装饰 */}
                    <div className="mt-9 flex items-center gap-3">
                        <div
                            className="h-1 flex-1 rounded-full"
                            style={{ background: "linear-gradient(to right, var(--primary-color,#3b82f6), var(--secondary-color,#f97316))" }}
                        />
                        <span
                            className="text-xs font-medium break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.5, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            智能制造 · 全流程闭环
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProcessSteps
