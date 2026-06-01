import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'food-cn-process-steps'
export const layoutName = '流程步骤'
export const layoutDescription = '美食餐饮风流程步骤页：暖米底 + 食欲橙红圆盘构图，编号步骤卡片用焦糖金描边连接，步骤间以圆形节点与连接线串联。纯 CSS/SVG 装饰，餐具点缀，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('一碗好汤的诞生').meta({
        description: "流程页主标题（中文，简短，描述整条流程/管线）",
    }),
    subtitle: z.string().min(4).max(40).default('从选料到上桌，每一步都讲究火候与匠心').meta({
        description: "副标题，一句话说明整条流程",
    }),
    steps: z.array(z.object({
        title: z.string().min(2).max(14).meta({
            description: "步骤标题（中文，简短）",
        }),
        desc: z.string().min(4).max(36).meta({
            description: "步骤说明（一句话描述该步骤要点）",
        }),
        icon: IconSchema.optional().meta({
            description: "步骤图标（可选，phosphor 图标）",
        }),
    })).min(3).max(5).default([
        {
            title: '甄选食材',
            desc: '当日直采时令鲜货，源头把控品质底色',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/basket-bold.svg',
                __icon_query__: 'fresh ingredients basket',
            },
        },
        {
            title: '匠心备料',
            desc: '净洗切配按方称量，刀工与配比皆有标准',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/knife-bold.svg',
                __icon_query__: 'prep knife cutting',
            },
        },
        {
            title: '文火慢炖',
            desc: '老火吊汤数小时，鲜味层层释放交融',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cooking-pot-bold.svg',
                __icon_query__: 'simmering pot',
            },
        },
        {
            title: '精心摆盘',
            desc: '色香形俱佳，趁热上桌锁住第一口惊艳',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg',
                __icon_query__: 'plating fork knife',
            },
        },
    ]).meta({ description: "流程步骤列表（建议 3-5 步）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ProcessSteps: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '一碗好汤的诞生'
    const subtitle = slideData?.subtitle || '从选料到上桌，每一步都讲究火候与匠心'
    const steps = (slideData?.steps && slideData.steps.length > 0)
        ? slideData.steps
        : [
            { title: '甄选食材', desc: '当日直采时令鲜货，源头把控品质底色', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/basket-bold.svg', __icon_query__: 'fresh ingredients basket' } },
            { title: '匠心备料', desc: '净洗切配按方称量，刀工与配比皆有标准', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/knife-bold.svg', __icon_query__: 'prep knife cutting' } },
            { title: '文火慢炖', desc: '老火吊汤数小时，鲜味层层释放交融', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cooking-pot-bold.svg', __icon_query__: 'simmering pot' } },
            { title: '精心摆盘', desc: '色香形俱佳，趁热上桌锁住第一口惊艳', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg', __icon_query__: 'plating fork knife' } },
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
                    background: "var(--background-color,#fdf6ec)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：暖色圆盘构图 + 餐具点缀（纯 SVG，绝对定位仅限装饰层） */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="foodStepsGlow" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="foodStepsCaramel" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0.55" />
                        </linearGradient>
                    </defs>
                    {/* 右上暖色圆盘光晕 */}
                    <circle cx="1140" cy="-40" r="280" fill="url(#foodStepsGlow)" />
                    {/* 焦糖金同心圆盘描边（餐盘母题） */}
                    <circle cx="1150" cy="60" r="120" fill="none" stroke="url(#foodStepsCaramel)" strokeWidth="2" strokeOpacity="0.5" />
                    <circle cx="1150" cy="60" r="150" fill="none" stroke="var(--secondary-color,#c92a2a)" strokeWidth="1.5" strokeOpacity="0.18" strokeDasharray="3 7" />
                    {/* 左下暖色圆块 */}
                    <circle cx="-30" cy="700" r="180" fill="var(--primary-color,#e8590c)" fillOpacity="0.06" />
                    <circle cx="60" cy="660" r="90" fill="none" stroke="var(--primary-color,#e8590c)" strokeWidth="1.5" strokeOpacity="0.16" strokeDasharray="2 8" />
                </svg>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-12 rounded-full" style={{ background: "var(--primary-color,#e8590c)" }} />
                            <span
                                className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium break-words"
                                style={{
                                    color: "var(--secondary-color,#c92a2a)",
                                    background: "rgba(201,42,42,0.08)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                匠心流程
                            </span>
                        </div>
                        <h1
                            className="mt-4 text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <p
                            className="mt-3 max-w-[44rem] text-lg leading-relaxed break-words"
                            style={{ color: "var(--background-text,#3b2412)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle}
                        </p>
                    </div>

                    {/* 步骤区：圆盘节点 + 连接线 + 卡片 */}
                    <div className="mt-10 flex flex-1 items-stretch justify-center gap-4">
                        {steps.map((step, i) => (
                            <React.Fragment key={i}>
                                <div className="flex flex-1 flex-col items-center">
                                    {/* 编号圆盘节点（焦糖金描边） */}
                                    <div className="relative flex flex-shrink-0 items-center justify-center">
                                        <div
                                            className="flex h-16 w-16 items-center justify-center rounded-full"
                                            style={{
                                                background: "linear-gradient(135deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))",
                                                boxShadow: '0 6px 16px rgba(232,89,12,0.28)',
                                                border: '3px solid var(--card-color,#fffaf2)',
                                            }}
                                        >
                                            {step.icon?.__icon_url__ ? (
                                                <RemoteSvgIcon
                                                    url={step.icon.__icon_url__}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-text,#ffffff)"
                                                    className="w-7 h-7"
                                                    title={step.icon.__icon_query__}
                                                />
                                            ) : (
                                                <span className="text-2xl font-black" style={{ color: "var(--primary-text,#ffffff)" }}>
                                                    {i + 1}
                                                </span>
                                            )}
                                        </div>
                                        {/* 编号角标 */}
                                        <span
                                            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-black"
                                            style={{
                                                background: "var(--card-color,#fffaf2)",
                                                color: "var(--secondary-color,#c92a2a)",
                                                border: '2px solid var(--stroke,#f0e0cc)',
                                            }}
                                        >
                                            {i + 1}
                                        </span>
                                    </div>

                                    {/* 步骤卡片 */}
                                    <div
                                        className="mt-5 flex w-full flex-1 flex-col items-center rounded-2xl border px-4 py-5 text-center"
                                        style={{
                                            background: "var(--card-color,#fffaf2)",
                                            borderColor: "var(--stroke,#f0e0cc)",
                                            boxShadow: '0 8px 20px rgba(59,36,18,0.06)',
                                        }}
                                    >
                                        <h3
                                            className="text-lg font-bold leading-[1.4] break-words"
                                            style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {step.title}
                                        </h3>
                                        <div className="my-3 h-0.5 w-8 rounded-full" style={{ background: "var(--primary-color,#e8590c)", opacity: 0.5 }} />
                                        <p
                                            className="text-sm leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#3b2412)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* 步骤间连接线（箭头，纯 CSS/SVG，最后一步不显示） */}
                                {i < steps.length - 1 && (
                                    <div className="flex flex-shrink-0 items-start justify-center pt-6">
                                        <svg width="34" height="20" viewBox="0 0 34 20" aria-hidden="true">
                                            <line
                                                x1="2" y1="10" x2="24" y2="10"
                                                stroke="var(--primary-color,#e8590c)"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeDasharray="2 5"
                                                opacity="0.7"
                                            />
                                            <path
                                                d="M24 4 L32 10 L24 16"
                                                fill="none"
                                                stroke="var(--primary-color,#e8590c)"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProcessSteps
