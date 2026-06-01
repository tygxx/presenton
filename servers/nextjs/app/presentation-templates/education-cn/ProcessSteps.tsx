import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'education-cn-process-steps'
export const layoutName = '流程步骤'
export const layoutDescription = '教育培训风流程步骤页：编号卡片 + 圆角连接线，逐步展示学习路径或教学流程。明亮米白底配活力橙蓝，书本/灯泡/成长曲线圆点装饰，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('四步搭建高效学习路径').meta({
        description: "流程页主标题（中文，简短有力）",
    }),
    steps: z.array(z.object({
        title: z.string().min(2).max(14).meta({
            description: "步骤标题，如『夯实基础』",
        }),
        desc: z.string().min(4).max(36).meta({
            description: "步骤说明，一句话描述该步要做什么",
        }),
        icon: IconSchema.optional().meta({
            description: "步骤配图标（可选）",
        }),
    })).min(3).max(5).default([
        {
            title: '夯实基础',
            desc: '梳理核心概念，搭建清晰的知识框架。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg',
                __icon_query__: 'open book',
            },
        },
        {
            title: '启发思考',
            desc: '结合案例提问，点燃主动探究的兴趣。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg',
                __icon_query__: 'lightbulb idea',
            },
        },
        {
            title: '实践演练',
            desc: '在真实任务中动手操作，巩固所学技能。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/pencil-bold.svg',
                __icon_query__: 'pencil practice',
            },
        },
        {
            title: '持续成长',
            desc: '复盘反馈并迭代，让能力稳步向上提升。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'growth chart up',
            },
        },
    ]).meta({ description: "流程步骤列表（3-5 项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ProcessSteps: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '四步搭建高效学习路径'
    const steps = (slideData?.steps && slideData.steps.length > 0)
        ? slideData.steps
        : [
            { title: '夯实基础', desc: '梳理核心概念，搭建清晰的知识框架。', icon: undefined },
            { title: '启发思考', desc: '结合案例提问，点燃主动探究的兴趣。', icon: undefined },
            { title: '实践演练', desc: '在真实任务中动手操作，巩固所学技能。', icon: undefined },
            { title: '持续成长', desc: '复盘反馈并迭代，让能力稳步向上提升。', icon: undefined },
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
                    background: "var(--background-color,#fffdf7)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：暖色光晕 + 成长曲线 + 圆点装饰 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    {/* 左上暖橙光晕 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-90px', left: '-70px', width: '300px', height: '300px', borderRadius: '9999px',
                            background: 'radial-gradient(circle, rgba(249,115,22,0.12), rgba(249,115,22,0))',
                        }}
                    />
                    {/* 右下蓝色光晕 */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '-110px', right: '-80px', width: '340px', height: '340px', borderRadius: '9999px',
                            background: 'radial-gradient(circle, rgba(37,99,235,0.10), rgba(37,99,235,0))',
                        }}
                    />
                    {/* 成长曲线 + 圆点纹样 */}
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <path
                            d="M -20 560 C 220 540, 360 360, 620 320 S 1040 220, 1320 120"
                            fill="none"
                            stroke="var(--primary-color,#2563eb)"
                            strokeOpacity="0.07"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M -20 620 C 260 600, 420 440, 700 400 S 1100 300, 1320 200"
                            fill="none"
                            stroke="var(--secondary-color,#f97316)"
                            strokeOpacity="0.07"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        {[
                            { cx: 150, cy: 120, r: 5, c: 'var(--secondary-color,#f97316)' },
                            { cx: 1130, cy: 150, r: 6, c: 'var(--primary-color,#2563eb)' },
                            { cx: 1180, cy: 560, r: 5, c: 'var(--secondary-color,#f97316)' },
                            { cx: 90, cy: 470, r: 4, c: 'var(--primary-color,#2563eb)' },
                        ].map((d, i) => (
                            <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.c} fillOpacity="0.18" />
                        ))}
                    </svg>
                </div>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 页眉 */}
                    <div className="flex flex-shrink-0 flex-col items-center text-center">
                        <span
                            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: 'rgba(249,115,22,0.10)',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#f97316)" }}
                            />
                            学习路径
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-5 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />
                    </div>

                    {/* 步骤卡片行 */}
                    <div className="flex flex-1 items-center justify-center">
                        <div className="flex w-full items-stretch justify-center gap-3">
                            {steps.map((step, i) => {
                                const stepTitle = step?.title || `步骤 ${i + 1}`
                                const stepDesc = step?.desc || ''
                                const icon = (step as any)?.icon as { __icon_url__?: string; __icon_query__?: string } | undefined
                                const isLast = i === steps.length - 1
                                return (
                                    <React.Fragment key={i}>
                                        {/* 卡片 */}
                                        <div
                                            className="flex flex-1 flex-col items-center rounded-3xl border px-5 py-7 text-center shadow-sm"
                                            style={{
                                                background: "var(--card-color,#ffffff)",
                                                borderColor: "var(--stroke,#f1e9d8)",
                                            }}
                                        >
                                            {/* 编号圆徽 + 图标 */}
                                            <div className="relative mb-5 flex items-center justify-center">
                                                <div
                                                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                                                    style={{
                                                        background: i % 2 === 0
                                                            ? "var(--primary-color,#2563eb)"
                                                            : "var(--secondary-color,#f97316)",
                                                    }}
                                                >
                                                    {icon?.__icon_url__ ? (
                                                        <RemoteSvgIcon
                                                            url={icon.__icon_url__}
                                                            strokeColor="currentColor"
                                                            color="var(--primary-text,#ffffff)"
                                                            className="w-8 h-8"
                                                            title={icon.__icon_query__ || stepTitle}
                                                        />
                                                    ) : (
                                                        <span
                                                            className="text-2xl font-black"
                                                            style={{ color: "var(--primary-text,#ffffff)" }}
                                                        >
                                                            {i + 1}
                                                        </span>
                                                    )}
                                                </div>
                                                {/* 角标编号 */}
                                                <div
                                                    className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-black shadow-sm"
                                                    style={{
                                                        background: "var(--card-color,#ffffff)",
                                                        color: i % 2 === 0
                                                            ? "var(--primary-color,#2563eb)"
                                                            : "var(--secondary-color,#f97316)",
                                                        border: '2px solid',
                                                        borderColor: i % 2 === 0
                                                            ? "var(--primary-color,#2563eb)"
                                                            : "var(--secondary-color,#f97316)",
                                                    }}
                                                >
                                                    {i + 1}
                                                </div>
                                            </div>

                                            <h3
                                                className="text-lg font-bold leading-[1.35] break-words"
                                                style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {stepTitle}
                                            </h3>
                                            <p
                                                className="mt-2.5 text-sm leading-relaxed break-words"
                                                style={{ color: "var(--background-text,#1f2937)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {stepDesc}
                                            </p>
                                        </div>

                                        {/* 连接箭头（最后一张不显示） */}
                                        {!isLast && (
                                            <div className="flex flex-shrink-0 items-center self-center" aria-hidden="true">
                                                <svg width="34" height="20" viewBox="0 0 34 20" fill="none">
                                                    <line
                                                        x1="2" y1="10" x2="24" y2="10"
                                                        stroke="var(--stroke,#f1e9d8)"
                                                        strokeWidth="3"
                                                        strokeLinecap="round"
                                                        strokeDasharray="1 7"
                                                    />
                                                    <path
                                                        d="M24 4 L32 10 L24 16"
                                                        fill="none"
                                                        stroke="var(--secondary-color,#f97316)"
                                                        strokeWidth="3"
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
