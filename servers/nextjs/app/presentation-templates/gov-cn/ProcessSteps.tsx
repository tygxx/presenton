import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'gov-cn-process-steps'
export const layoutName = '流程步骤'
export const layoutDescription = '党政政务风流程步骤：米白底 + 中国红 + 烫金细线，居中对称标题，编号卡片以箭头连接线串联，3~5 个步骤。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('政务服务办理流程').meta({
        description: "幻灯片主标题（中文，简短庄重）",
    }),
    steps: z.array(z.object({
        title: z.string().min(2).max(14).meta({
            description: "步骤名称（中文，简短）",
        }),
        desc: z.string().min(4).max(36).meta({
            description: "步骤说明（一句话描述该环节）",
        }),
        icon: IconSchema.optional().meta({
            description: "步骤配图标（可选）",
        }),
    })).min(3).max(5).default([
        {
            title: '网上申请',
            desc: '通过政务服务平台在线提交申请材料',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/file-text-bold.svg',
                __icon_query__: 'application form',
            },
        },
        {
            title: '资格审核',
            desc: '工作人员依规对申报材料进行审查核验',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/magnifying-glass-bold.svg',
                __icon_query__: 'review audit',
            },
        },
        {
            title: '审批决定',
            desc: '主管部门作出准予或不予办理的决定',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gavel-bold.svg',
                __icon_query__: 'approval decision',
            },
        },
        {
            title: '证照办理',
            desc: '制发证照并完成相关信息归档登记',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/seal-check-bold.svg',
                __icon_query__: 'certificate seal',
            },
        },
        {
            title: '结果送达',
            desc: '以邮寄或自取方式向申请人送达结果',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/paper-plane-tilt-bold.svg',
                __icon_query__: 'deliver result',
            },
        },
    ]).meta({ description: "流程步骤列表（3~5 项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ProcessSteps: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '政务服务办理流程'
    const steps = (slideData?.steps && slideData.steps.length > 0)
        ? slideData.steps
        : [
            { title: '网上申请', desc: '通过政务服务平台在线提交申请材料' },
            { title: '资格审核', desc: '工作人员依规对申报材料进行审查核验' },
            { title: '审批决定', desc: '主管部门作出准予或不予办理的决定' },
            { title: '证照办理', desc: '制发证照并完成相关信息归档登记' },
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
                    background: "var(--background-color,#faf7f2)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：烫金对称纹样 + 五角星点缀 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="govStepGoldLine" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#b8860b" stopOpacity="0" />
                            <stop offset="50%" stopColor="#b8860b" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="govStepRedGlow" cx="50%" cy="0%" r="70%">
                            <stop offset="0%" stopColor="#c1121f" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#c1121f" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 顶部中国红光晕 */}
                    <rect x="0" y="0" width="1280" height="320" fill="url(#govStepRedGlow)" />
                    {/* 顶部、底部烫金细线（对称） */}
                    <rect x="320" y="120" width="640" height="2" fill="url(#govStepGoldLine)" />
                    <rect x="240" y="648" width="800" height="1.5" fill="url(#govStepGoldLine)" />
                    {/* 左右对称华表式立柱纹样 */}
                    {[80, 1200].map((cx, i) => (
                        <g key={i} opacity="0.10">
                            <rect x={cx - 4} y="180" width="8" height="380" rx="4" fill="#b8860b" />
                            <rect x={cx - 18} y="170" width="36" height="10" rx="5" fill="#b8860b" />
                            <rect x={cx - 18} y="560" width="36" height="10" rx="5" fill="#b8860b" />
                            <circle cx={cx} cy="150" r="12" fill="none" stroke="#c1121f" strokeWidth="3" />
                        </g>
                    ))}
                    {/* 四角五角星点缀（对称） */}
                    {[[120, 90], [1160, 90], [120, 630], [1160, 630]].map(([sx, sy], i) => (
                        <path
                            key={i}
                            d="M0,-9 2.6,-2.8 9,-2.8 3.7,1.1 5.6,7.3 0,3.5 -5.6,7.3 -3.7,1.1 -9,-2.8 -2.6,-2.8 Z"
                            transform={`translate(${sx},${sy})`}
                            fill="#c1121f"
                            opacity="0.16"
                        />
                    ))}
                </svg>

                <div className="relative z-10 flex h-full flex-col justify-center px-16 py-12">
                    {/* 居中对称标题 */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-4">
                            <span className="h-px w-16" style={{ background: "var(--secondary-color,#b8860b)" }} />
                            {/* 五角星 */}
                            <svg width="22" height="22" viewBox="-11 -11 22 22" aria-hidden="true">
                                <path
                                    d="M0,-10 2.9,-3.1 10,-3.1 4.1,1.2 6.2,8.1 0,3.9 -6.2,8.1 -4.1,1.2 -10,-3.1 -2.9,-3.1 Z"
                                    fill="var(--primary-color,#c1121f)"
                                />
                            </svg>
                            <span className="h-px w-16" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        </div>
                        <h1
                            className="mt-4 text-center text-4xl font-black leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#1a1a1a)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-4 h-1 w-24 rounded-full"
                            style={{ background: "var(--primary-color,#c1121f)" }}
                        />
                    </div>

                    {/* 流程步骤：编号卡片 + 箭头连接线 */}
                    <div className="mt-12 flex items-stretch justify-center gap-2">
                        {steps.map((step, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            return (
                                <React.Fragment key={i}>
                                    <div
                                        className="flex flex-1 flex-col items-center rounded-xl border px-5 py-6"
                                        style={{
                                            background: "var(--card-color,#ffffff)",
                                            borderColor: "var(--stroke,#e8dcc8)",
                                            boxShadow: '0 8px 24px rgba(193,18,31,0.06)',
                                        }}
                                    >
                                        {/* 编号徽章（中国红 + 烫金环） */}
                                        <div className="relative flex items-center justify-center">
                                            <div
                                                className="flex h-14 w-14 items-center justify-center rounded-full"
                                                style={{
                                                    background: "var(--primary-color,#c1121f)",
                                                    boxShadow: '0 0 0 3px var(--card-color,#ffffff), 0 0 0 5px var(--secondary-color,#b8860b)',
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
                                                        className="text-lg font-black leading-none"
                                                        style={{ color: "var(--primary-text,#ffffff)" }}
                                                    >
                                                        {num}
                                                    </span>
                                                )}
                                            </div>
                                            {/* 编号角标 */}
                                            <span
                                                className="absolute -right-2 -top-1 flex h-6 min-w-[1.5rem] items-center justify-center rounded-full px-1 text-xs font-black leading-none"
                                                style={{
                                                    background: "var(--secondary-color,#b8860b)",
                                                    color: "var(--primary-text,#ffffff)",
                                                }}
                                            >
                                                {num}
                                            </span>
                                        </div>

                                        <h3
                                            className="mt-5 text-center text-lg font-bold leading-[1.4] break-words"
                                            style={{
                                                color: "var(--background-text,#1a1a1a)",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {step.title}
                                        </h3>
                                        <div
                                            className="my-3 h-px w-10"
                                            style={{ background: "var(--secondary-color,#b8860b)", opacity: 0.6 }}
                                        />
                                        <p
                                            className="text-center text-sm leading-[1.7] break-words"
                                            style={{
                                                color: "var(--background-text,#1a1a1a)",
                                                opacity: 0.78,
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {step.desc}
                                        </p>
                                    </div>

                                    {/* 箭头连接线（纯 CSS/SVG，最后一项不显示） */}
                                    {i < steps.length - 1 && (
                                        <div className="flex flex-shrink-0 items-center px-1">
                                            <svg width="26" height="20" viewBox="0 0 26 20" aria-hidden="true">
                                                <line
                                                    x1="0" y1="10" x2="18" y2="10"
                                                    stroke="var(--secondary-color,#b8860b)"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M16,4 L24,10 L16,16"
                                                    fill="none"
                                                    stroke="var(--primary-color,#c1121f)"
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
