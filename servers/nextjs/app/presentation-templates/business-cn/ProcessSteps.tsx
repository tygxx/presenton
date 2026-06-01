import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'business-cn-process-steps'
export const layoutName = '流程步骤'
export const layoutDescription = '商务风流程步骤页：编号卡片横向排列，步骤间橙色箭头连接线串联。深蓝几何网格装饰 + 橙色强调，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('项目交付五步法').meta({
        description: "流程页主标题（中文，简短有力）",
    }),
    subtitle: z.string().min(4).max(40).default('标准化作业流程，确保每个环节稳健落地').meta({
        description: "副标题，一句话说明该流程的价值",
    }),
    steps: z.array(z.object({
        title: z.string().min(2).max(14).meta({
            description: "步骤标题（中文，简短）",
        }),
        desc: z.string().min(2).max(36).meta({
            description: "步骤说明（一句话描述该步骤要点）",
        }),
        icon: IconSchema.optional().meta({
            description: "步骤配图标（可选，phosphor 图标）",
        }),
    })).min(3).max(5).default([
        {
            title: '需求调研',
            desc: '深度访谈与现状梳理，明确业务目标与边界',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/magnifying-glass-bold.svg',
                __icon_query__: 'research',
            },
        },
        {
            title: '方案设计',
            desc: '制定整体架构与实施路径，输出可行性论证',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/blueprint-bold.svg',
                __icon_query__: 'blueprint design',
            },
        },
        {
            title: '敏捷开发',
            desc: '分阶段迭代交付，持续验证关键功能模块',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/code-bold.svg',
                __icon_query__: 'development',
            },
        },
        {
            title: '测试验收',
            desc: '全流程质量把关，对照标准逐项核验通过',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/check-circle-bold.svg',
                __icon_query__: 'quality check',
            },
        },
        {
            title: '上线运维',
            desc: '平稳部署并持续运营，保障长期稳定运行',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-launch-bold.svg',
                __icon_query__: 'launch',
            },
        },
    ]).meta({ description: "流程步骤列表（3-5 个）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ProcessSteps: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '项目交付五步法'
    const subtitle = slideData?.subtitle || '标准化作业流程，确保每个环节稳健落地'
    const steps = (slideData?.steps && slideData.steps.length > 0)
        ? slideData.steps
        : [
            { title: '需求调研', desc: '深度访谈与现状梳理，明确业务目标与边界' },
            { title: '方案设计', desc: '制定整体架构与实施路径，输出可行性论证' },
            { title: '敏捷开发', desc: '分阶段迭代交付，持续验证关键功能模块' },
            { title: '测试验收', desc: '全流程质量把关，对照标准逐项核验通过' },
            { title: '上线运维', desc: '平稳部署并持续运营，保障长期稳定运行' },
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
                    background: "var(--background-color,#f8fafc)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景几何网格装饰层 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="bizStepsGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0 L0 0 0 48" fill="none" stroke="#1e3a8a" strokeOpacity="0.05" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="bizStepsTop" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#bizStepsGrid)" />
                    <rect width="1280" height="260" fill="url(#bizStepsTop)" />
                </svg>

                {/* 左上几何面板装饰 */}
                <div
                    className="absolute top-0 left-0"
                    style={{ width: '8px', height: '100%', background: "var(--primary-color,#1e3a8a)" }}
                    aria-hidden="true"
                />
                <div
                    className="absolute top-0 left-0"
                    style={{ width: '8px', height: '40%', background: "var(--secondary-color,#f97316)" }}
                    aria-hidden="true"
                />

                {/* 内容区 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-col">
                        <div className="mb-4 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <p
                            className="mt-3 text-lg leading-relaxed break-words"
                            style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle}
                        </p>
                    </div>

                    {/* 步骤流程区 */}
                    <div className="flex flex-1 items-center">
                        <div className="flex w-full items-stretch justify-between gap-3">
                            {steps.map((step, i) => {
                                const num = String(i + 1).padStart(2, '0')
                                const isLast = i === steps.length - 1
                                return (
                                    <React.Fragment key={i}>
                                        {/* 步骤卡片 */}
                                        <div
                                            className="flex flex-1 flex-col rounded-2xl border p-5 shadow-sm"
                                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                                        >
                                            {/* 编号 + 图标行 */}
                                            <div className="flex items-center justify-between">
                                                <div
                                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-base font-black"
                                                    style={{ background: "var(--primary-color,#1e3a8a)", color: "var(--primary-text,#ffffff)" }}
                                                >
                                                    {num}
                                                </div>
                                                {(step as any)?.icon?.__icon_url__ && (
                                                    <span style={{ color: "var(--secondary-color,#f97316)" }}>
                                                        <RemoteSvgIcon
                                                            url={(step as any).icon.__icon_url__}
                                                            strokeColor="currentColor"
                                                            color="var(--secondary-color,#f97316)"
                                                            className="w-6 h-6"
                                                            title={(step as any).icon.__icon_query__}
                                                        />
                                                    </span>
                                                )}
                                            </div>

                                            {/* 橙色分隔细线 */}
                                            <div
                                                className="mt-4 h-1 w-10 rounded-full"
                                                style={{ background: "var(--secondary-color,#f97316)" }}
                                            />

                                            {/* 步骤标题 */}
                                            <h3
                                                className="mt-3 text-xl font-bold leading-[1.35] break-words"
                                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {step?.title || `步骤${i + 1}`}
                                            </h3>

                                            {/* 步骤说明 */}
                                            <p
                                                className="mt-2 text-sm leading-[1.7] break-words"
                                                style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {step?.desc || ''}
                                            </p>
                                        </div>

                                        {/* 步骤间橙色箭头连接线 */}
                                        {!isLast && (
                                            <div className="flex flex-shrink-0 items-center" aria-hidden="true">
                                                <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
                                                    <path
                                                        d="M2 10 H16"
                                                        stroke="var(--secondary-color,#f97316)"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M14 4 L20 10 L14 16"
                                                        stroke="var(--secondary-color,#f97316)"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        fill="none"
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
