import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'realestate-cn-process-steps'
export const layoutName = '流程步骤'
export const layoutDescription = '房产建筑风流程步骤：横向 3-5 段编号管线，金铜连接线串联，配高级灰建筑剪影、细线分隔与大留白。每段含序号、图标、小标题与说明。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('从蓝图到归家的五步').meta({
        description: "页面主标题（中文，简短有力，≤20字）",
    }),
    steps: z.array(z.object({
        title: z.string().min(2).max(14).meta({ description: "步骤小标题（中文，≤14字）" }),
        desc: z.string().min(4).max(36).meta({ description: "步骤说明（中文，≤36字）" }),
        icon: IconSchema.optional().meta({ description: "步骤图标（可选）" }),
    })).min(3).max(5).default([
        {
            title: '规划立项',
            desc: '勘察地脉与城市肌理，确立项目定位与设计哲学。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg',
                __icon_query__: 'site planning',
            },
        },
        {
            title: '匠心设计',
            desc: '以克制语言推敲空间，于细节处铸就质感。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/pencil-ruler-bold.svg',
                __icon_query__: 'architectural design',
            },
        },
        {
            title: '精工营造',
            desc: '甄选优质建材与现代工艺，层层把控施工品质。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/buildings-bold.svg',
                __icon_query__: 'construction quality',
            },
        },
        {
            title: '品质交付',
            desc: '全屋实景检验与精装交付，所见即所得。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/key-bold.svg',
                __icon_query__: 'home handover',
            },
        },
        {
            title: '尊享服务',
            desc: '五星管家长期守护，让美好生活从容延续。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'property service',
            },
        },
    ]).meta({ description: "流程步骤，3-5 段" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ProcessSteps: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '从蓝图到归家的五步'
    const steps = (slideData?.steps && slideData.steps.length > 0)
        ? slideData.steps
        : (schema.shape.steps as any)._def?.defaultValue || []

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f4f4f5)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：金铜光晕 + 极简建筑剪影 + 细线母题 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="reStepsGold" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="reStepsSky" x1="0" y1="1" x2="0" y2="0">
                                <stop offset="0%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.07" />
                                <stop offset="100%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.015" />
                            </linearGradient>
                        </defs>
                        {/* 左上角金铜光晕 */}
                        <circle cx="120" cy="60" r="240" fill="url(#reStepsGold)" />
                        {/* 顶部细装饰横线 + 金铜短线 */}
                        <line x1="80" y1="96" x2="1200" y2="96" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                        <line x1="80" y1="96" x2="200" y2="96" stroke="var(--primary-color,#b08d57)" strokeWidth="1.5" />
                        {/* 底部极简建筑剪影群（高低错落的塔楼） */}
                        <path
                            d="M0 720 L0 636 L96 636 L96 588 L184 588 L184 636 L296 636 L296 552 L344 552 L344 636 L452 636 L452 600 L548 600 L548 636 L660 636 L660 528 L708 528 L708 636 L832 636 L832 572 L928 572 L928 636 L1044 636 L1044 596 L1148 596 L1148 636 L1280 636 L1280 720 Z"
                            fill="url(#reStepsSky)"
                        />
                        {/* 剪影顶部细线勾边 */}
                        <path
                            d="M0 636 L96 636 L96 588 L184 588 L184 636 L296 636 L296 552 L344 552 L344 636 L452 636 L452 600 L548 600 L548 636 L660 636 L660 528 L708 528 L708 636 L832 636 L832 572 L928 572 L928 636 L1044 636 L1044 596 L1148 596 L1148 636 L1280 636"
                            fill="none"
                            stroke="var(--secondary-color,#3f3f46)"
                            strokeOpacity="0.09"
                            strokeWidth="1"
                        />
                    </svg>
                </div>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-20 py-14">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <span
                            className="text-xs font-light tracking-widest break-words"
                            style={{ color: "var(--primary-color,#b08d57)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            DEVELOPMENT PROCESS
                        </span>
                        <h1
                            className="mt-3 text-4xl font-light leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-5 h-px w-full" style={{ background: "var(--stroke,#e4e4e7)" }} />
                    </div>

                    {/* 流程管线区 */}
                    <div className="flex min-h-0 flex-1 items-center">
                        <ol className="flex w-full items-stretch">
                            {steps.map((step: any, i: number) => {
                                const isLast = i === steps.length - 1
                                return (
                                    <React.Fragment key={i}>
                                        <li className="flex min-w-0 flex-1 flex-col items-center">
                                            {/* 编号节点 + 图标 */}
                                            <div className="flex flex-col items-center">
                                                <span
                                                    className="text-xs font-light tracking-[0.2em] break-words"
                                                    style={{ color: "var(--primary-color,#b08d57)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                >
                                                    {`STEP ${String(i + 1).padStart(2, '0')}`}
                                                </span>
                                                <div
                                                    className="mt-3 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full"
                                                    style={{
                                                        background: "var(--card-color,#ffffff)",
                                                        border: "1px solid var(--stroke,#e4e4e7)",
                                                        boxShadow: '0 2px 8px rgba(39,39,42,0.05)',
                                                    }}
                                                >
                                                    {step?.icon?.__icon_url__ ? (
                                                        <RemoteSvgIcon
                                                            url={step.icon.__icon_url__}
                                                            strokeColor="currentColor"
                                                            color="var(--primary-color,#b08d57)"
                                                            className="w-7 h-7"
                                                            title={step?.icon?.__icon_query__}
                                                        />
                                                    ) : (
                                                        <span
                                                            className="text-xl font-light leading-none"
                                                            style={{ color: "var(--primary-color,#b08d57)" }}
                                                        >
                                                            {String(i + 1)}
                                                        </span>
                                                    )}
                                                </div>
                                                {/* 节点下连接到内容的细竖线 */}
                                                <div className="mt-4 h-7 w-px" style={{ background: "var(--stroke,#e4e4e7)" }} />
                                                <div
                                                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                                    style={{ background: "var(--primary-color,#b08d57)" }}
                                                />
                                            </div>

                                            {/* 文字区 */}
                                            <div className="mt-4 flex flex-col items-center px-3">
                                                <span
                                                    className="text-center text-lg font-medium leading-[1.4] break-words"
                                                    style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                >
                                                    {step?.title}
                                                </span>
                                                <span
                                                    className="mt-2 max-w-[14rem] text-center text-sm font-light leading-relaxed break-words"
                                                    style={{ color: "var(--secondary-color,#3f3f46)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                >
                                                    {step?.desc}
                                                </span>
                                            </div>
                                        </li>

                                        {/* 步骤之间的金铜连接线 + 箭头（最后一段不渲染） */}
                                        {!isLast && (
                                            <li className="flex flex-shrink-0 flex-col items-center justify-start self-start" style={{ paddingTop: '2.65rem' }} aria-hidden="true">
                                                <div className="flex items-center">
                                                    <span
                                                        className="block h-px w-10"
                                                        style={{ background: "var(--primary-color,#b08d57)", opacity: 0.55 }}
                                                    />
                                                    <svg width="10" height="12" viewBox="0 0 10 12" className="-ml-px">
                                                        <path d="M0 0 L8 6 L0 12" fill="none" stroke="var(--primary-color,#b08d57)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
                                                    </svg>
                                                </div>
                                            </li>
                                        )}
                                    </React.Fragment>
                                )
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProcessSteps
