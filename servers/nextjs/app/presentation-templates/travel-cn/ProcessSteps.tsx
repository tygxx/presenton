import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'travel-cn-process-steps'
export const layoutName = '流程步骤'
export const layoutDescription = '文旅风流程步骤页：编号步骤卡片沿明媚海蓝路线横向排布，步骤间以虚线箭头连接，配指南针与路线点装饰。纯 CSS/SVG，离线可渲染，适合行程规划/服务流程/线路步骤。'

const schema = z.object({
    eyebrow: z.string().min(2).max(16).default('出行指南').meta({
        description: "标题上方的小标签/分类，如『行程规划』『服务流程』",
    }),
    title: z.string().min(2).max(20).default('一次旅程的四个步骤').meta({
        description: "流程页主标题（中文，简短）",
    }),
    steps: z.array(z.object({
        title: z.string().min(2).max(14).meta({
            description: "步骤标题（中文，简短）",
        }),
        desc: z.string().min(2).max(36).meta({
            description: "步骤说明（中文，一句话）",
        }),
        icon: IconSchema.optional().meta({
            description: "步骤图标（可选，phosphor 图标）",
        }),
    })).min(3).max(5).default([
        {
            title: '灵感选目的地',
            desc: '挑选心仪的山海与城市，确定旅程主题与节奏。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg',
                __icon_query__: 'compass destination',
            },
        },
        {
            title: '规划路线行程',
            desc: '串联景点与交通，安排每日动线与住宿落点。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-trifold-bold.svg',
                __icon_query__: 'map route planning',
            },
        },
        {
            title: '预订机酒门票',
            desc: '一站完成机票、酒店与景区门票的在线预订。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/ticket-bold.svg',
                __icon_query__: 'ticket booking',
            },
        },
        {
            title: '畅享美好旅程',
            desc: '收拾行囊踏上旅途，把每段风景都收进记忆。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/airplane-takeoff-bold.svg',
                __icon_query__: 'airplane travel',
            },
        },
    ]).meta({
        description: "流程步骤列表（3~5 步），步骤间自动编号并以箭头连接",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ProcessSteps: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '出行指南'
    const title = slideData?.title || '一次旅程的四个步骤'
    const steps = (slideData?.steps && slideData.steps.length > 0)
        ? slideData.steps
        : [
            { title: '灵感选目的地', desc: '挑选心仪的山海与城市，确定旅程主题与节奏。' },
            { title: '规划路线行程', desc: '串联景点与交通，安排每日动线与住宿落点。' },
            { title: '预订机酒门票', desc: '一站完成机票、酒店与景区门票的在线预订。' },
            { title: '畅享美好旅程', desc: '收拾行囊踏上旅途，把每段风景都收进记忆。' },
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
                    background: "var(--background-color,#f0f9ff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：明媚海蓝光晕 + 暖阳橙 + 风景天际线 + 路线虚线 + 指南针母题 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="travelStepsSky" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="travelStepsSun" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.32" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect x="0" y="0" width="1280" height="260" fill="url(#travelStepsSky)" />
                        {/* 暖阳橙光晕 */}
                        <circle cx="1080" cy="120" r="170" fill="url(#travelStepsSun)" />
                        {/* 远山天际线（风景母题） */}
                        <path
                            d="M0 640 L150 560 L320 612 L470 540 L660 600 L840 530 L1010 596 L1180 548 L1280 590 L1280 720 L0 720 Z"
                            fill="var(--primary-color,#0891b2)" fillOpacity="0.06"
                        />
                        <path
                            d="M0 672 L210 614 L420 660 L640 600 L880 658 L1100 612 L1280 656 L1280 720 L0 720 Z"
                            fill="var(--primary-color,#0891b2)" fillOpacity="0.10"
                        />
                        {/* 蜿蜒路线虚线（路线母题） */}
                        <path
                            d="M40 250 C 320 160, 520 360, 760 250 S 1180 160, 1240 280"
                            fill="none" stroke="var(--stroke,#bae6fd)" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round"
                        />
                    </svg>
                    {/* 指南针母题 */}
                    <svg viewBox="0 0 120 120" className="absolute" style={{ top: '34px', right: '40px', width: '88px', height: '88px', opacity: 0.5 }}>
                        <circle cx="60" cy="60" r="50" fill="none" stroke="var(--primary-color,#0891b2)" strokeOpacity="0.5" strokeWidth="2.5" />
                        <circle cx="60" cy="60" r="40" fill="none" stroke="var(--stroke,#bae6fd)" strokeWidth="1.5" />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                            <line
                                key={deg}
                                x1="60" y1="14" x2="60" y2="22"
                                stroke="var(--primary-color,#0891b2)" strokeOpacity="0.45" strokeWidth="2"
                                transform={`rotate(${deg} 60 60)`}
                            />
                        ))}
                        <polygon points="60,28 67,60 60,52 53,60" fill="var(--secondary-color,#f59e0b)" />
                        <polygon points="60,92 53,60 60,68 67,60" fill="var(--primary-color,#0891b2)" fillOpacity="0.7" />
                        <circle cx="60" cy="60" r="4" fill="var(--card-color,#ffffff)" stroke="var(--primary-color,#0891b2)" strokeWidth="2" />
                    </svg>
                </div>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-col">
                        <span
                            className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold break-words"
                            style={{
                                color: "var(--primary-color,#0891b2)",
                                background: "rgba(8,145,178,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            />
                            {eyebrow}
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-4 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                    </div>

                    {/* 步骤区：横向卡片 + 箭头连接 */}
                    <div className="mt-10 flex flex-1 items-center">
                        <div className="flex w-full items-stretch justify-center gap-3">
                            {steps.map((step, i) => {
                                const num = String(i + 1).padStart(2, '0')
                                const isLast = i === steps.length - 1
                                return (
                                    <React.Fragment key={i}>
                                        {/* 步骤卡片（轻盈卡片） */}
                                        <div
                                            className="flex flex-1 basis-0 flex-col rounded-2xl border p-5 shadow-sm"
                                            style={{
                                                background: "var(--card-color,#ffffff)",
                                                borderColor: "var(--stroke,#bae6fd)",
                                            }}
                                        >
                                            {/* 编号 + 图标行 */}
                                            <div className="flex items-center justify-between">
                                                <div
                                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-base font-black"
                                                    style={{
                                                        background: "var(--primary-color,#0891b2)",
                                                        color: "var(--primary-text,#ffffff)",
                                                    }}
                                                >
                                                    {num}
                                                </div>
                                                <div
                                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
                                                    style={{
                                                        background: "rgba(245,158,11,0.14)",
                                                        color: "var(--secondary-color,#f59e0b)",
                                                    }}
                                                >
                                                    {step.icon?.__icon_url__ ? (
                                                        <RemoteSvgIcon
                                                            url={step.icon.__icon_url__}
                                                            strokeColor="currentColor"
                                                            color="var(--secondary-color,#f59e0b)"
                                                            className="w-6 h-6"
                                                            title={step.icon.__icon_query__}
                                                        />
                                                    ) : (
                                                        <span
                                                            className="inline-block h-3 w-3 rounded-full"
                                                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            {/* 步骤标题 */}
                                            <h3
                                                className="mt-5 text-xl font-bold leading-[1.4] break-words"
                                                style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {step.title}
                                            </h3>

                                            {/* 分隔细线 */}
                                            <div className="mt-3 h-px w-full" style={{ background: "var(--stroke,#bae6fd)" }} />

                                            {/* 步骤说明 */}
                                            <p
                                                className="mt-3 text-sm leading-[1.7] break-words"
                                                style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {step.desc}
                                            </p>
                                        </div>

                                        {/* 箭头连接线（纯 CSS/SVG），最后一张不显示 */}
                                        {!isLast && (
                                            <div className="flex flex-shrink-0 items-center self-center">
                                                <svg width="34" height="20" viewBox="0 0 34 20" aria-hidden="true">
                                                    <line
                                                        x1="2" y1="10" x2="22" y2="10"
                                                        stroke="var(--primary-color,#0891b2)" strokeWidth="2.5"
                                                        strokeDasharray="3 4" strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M22 4 L32 10 L22 16"
                                                        fill="none" stroke="var(--secondary-color,#f59e0b)"
                                                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
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
