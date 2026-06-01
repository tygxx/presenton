import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { IconSchema } from '../defaultSchemes';

export const layoutId = 'medical-cn-big-statement'
export const layoutName = '金句首屏'
export const layoutDescription = '医疗健康风金句首屏：一句有力主张占据画面中央，配超大字重、引号与脉搏波形装饰。纯 CSS/SVG，离线可渲染，清爽可信赖。'

const schema = z.object({
    badge: z.object({
        icon: IconSchema.default({
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg',
            __icon_query__: 'heartbeat',
        }).meta({ description: "主张上方标签的图标" }),
        text: z.string().min(2).max(16).default('健康守护 · 2026').meta({
            description: "主张上方的小标签文字，如『健康守护』",
        }),
    }).default({
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg',
            __icon_query__: 'heartbeat',
        },
        text: '健康守护 · 2026',
    }).meta({ description: "主张上方的标签（图标 + 文字）" }),
    statement: z.string().min(2).max(40).default('每一次心跳，都值得被认真守护').meta({
        description: "核心金句主张（中文，简短有力，占据画面中央）",
    }),
    support: z.string().min(0).max(50).default('以数据驱动的精准医疗，让健康管理更主动、更可及、更可信。').meta({
        description: "主张下方的补充说明（可选）",
    }),
    attribution: z.string().min(0).max(20).default('—— 仁和健康研究院').meta({
        description: "署名/出处（可选），如机构或专家姓名",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BigStatement: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const badgeIcon = slideData?.badge?.icon || {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg',
        __icon_query__: 'heartbeat',
    }
    const badgeText = slideData?.badge?.text || '健康守护 · 2026'
    const statement = slideData?.statement || '每一次心跳，都值得被认真守护'
    const support = slideData?.support ?? '以数据驱动的精准医疗，让健康管理更主动、更可及、更可信。'
    const attribution = slideData?.attribution ?? '—— 仁和健康研究院'

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
                {/* 背景柔和光晕装饰 */}
                <div
                    className="absolute -top-32 -left-24 h-96 w-96 rounded-full"
                    style={{
                        background: "radial-gradient(circle, var(--primary-color,#0ea5e9) 0%, rgba(14,165,233,0) 70%)",
                        opacity: 0.16,
                    }}
                    aria-hidden="true"
                />
                <div
                    className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full"
                    style={{
                        background: "radial-gradient(circle, var(--secondary-color,#10b981) 0%, rgba(16,185,129,0) 70%)",
                        opacity: 0.16,
                    }}
                    aria-hidden="true"
                />

                {/* 背景脉搏波形（母题） */}
                <svg
                    viewBox="0 0 1280 240"
                    className="absolute bottom-0 left-0 h-44 w-full"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="medStmtPulse" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.05" />
                            <stop offset="50%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0 160 L360 160 L400 160 L430 80 L470 210 L520 40 L560 160 L640 160 L1280 160"
                        fill="none"
                        stroke="url(#medStmtPulse)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                {/* 右上角十字装饰（母题） */}
                <svg
                    viewBox="0 0 120 120"
                    className="absolute top-10 right-12 h-16 w-16"
                    aria-hidden="true"
                >
                    <rect x="48" y="14" width="24" height="92" rx="8" fill="var(--secondary-color,#10b981)" fillOpacity="0.16" />
                    <rect x="14" y="48" width="92" height="24" rx="8" fill="var(--secondary-color,#10b981)" fillOpacity="0.16" />
                </svg>

                {/* 内容主体 */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-20 py-16 text-center">
                    {/* 顶部标签 */}
                    <span
                        className="mb-10 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-base font-medium break-words"
                        style={{
                            color: "var(--primary-color,#0ea5e9)",
                            background: "var(--card-color,#ffffff)",
                            borderColor: "var(--stroke,#e2e8f0)",
                            boxShadow: "0 8px 24px -12px rgba(14,165,233,0.35)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <RemoteSvgIcon
                            url={badgeIcon.__icon_url__}
                            strokeColor="currentColor"
                            color="var(--primary-color,#0ea5e9)"
                            className="w-5 h-5"
                            title={badgeIcon.__icon_query__}
                        />
                        {badgeText}
                    </span>

                    {/* 大引号装饰 */}
                    <span
                        className="leading-none"
                        style={{
                            fontSize: '6rem',
                            fontWeight: 900,
                            lineHeight: 0.6,
                            color: "var(--primary-color,#0ea5e9)",
                            opacity: 0.18,
                        }}
                        aria-hidden="true"
                    >
                        “
                    </span>

                    {/* 核心金句 */}
                    <h1
                        className="mt-2 max-w-[58rem] text-6xl font-black leading-[1.3] break-words"
                        style={{
                            color: "var(--background-text,#0f172a)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {statement}
                    </h1>

                    {/* 蓝绿渐变分隔线 */}
                    <div
                        className="my-9 h-1.5 w-28 rounded-full"
                        style={{
                            background: "linear-gradient(90deg, var(--primary-color,#0ea5e9) 0%, var(--secondary-color,#10b981) 100%)",
                        }}
                    />

                    {/* 补充说明（可选） */}
                    {support ? (
                        <p
                            className="max-w-[44rem] text-xl leading-relaxed break-words"
                            style={{
                                color: "var(--background-text,#475569)",
                                opacity: 0.92,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {support}
                        </p>
                    ) : null}

                    {/* 署名（可选） */}
                    {attribution ? (
                        <p
                            className="mt-7 text-base font-semibold leading-relaxed break-words"
                            style={{
                                color: "var(--secondary-color,#10b981)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {attribution}
                        </p>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default BigStatement
