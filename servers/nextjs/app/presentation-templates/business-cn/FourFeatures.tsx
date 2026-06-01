import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'business-cn-four-features'
export const layoutName = '四宫格特性'
export const layoutDescription = '商务风四宫格特性页：2x2 网格卡片，每张含图标、小标题与说明。深蓝几何网格装饰 + 橙色强调，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('四大核心优势').meta({
        description: "页面主标题（中文，简短有力，概括四张卡片）",
    }),
    features: z.array(z.object({
        icon: IconSchema.meta({ description: "卡片图标（phosphor 图标）" }),
        title: z.string().min(2).max(12).meta({ description: "卡片小标题（中文，4-8字）" }),
        desc: z.string().min(4).max(32).meta({ description: "卡片说明（一句话，中文）" }),
    })).min(4).max(4).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-bold.svg',
                __icon_query__: 'rocket growth',
            },
            title: '高效增长',
            desc: '以数据驱动决策，助力业务持续稳健增长。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
                __icon_query__: 'security shield',
            },
            title: '稳健可靠',
            desc: '全流程风控体系，保障交付质量与安全。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'professional team',
            },
            title: '专业团队',
            desc: '资深顾问深度协同，提供一站式解决方案。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'data insight',
            },
            title: '洞察先机',
            desc: '行业研究与趋势预判，把握每一次机遇。',
        },
    ]).meta({ description: "四张特性卡片，固定四项" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK_FEATURES: SlideData['features'] = [
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-bold.svg',
            __icon_query__: 'rocket growth',
        },
        title: '高效增长',
        desc: '以数据驱动决策，助力业务持续稳健增长。',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
            __icon_query__: 'security shield',
        },
        title: '稳健可靠',
        desc: '全流程风控体系，保障交付质量与安全。',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
            __icon_query__: 'professional team',
        },
        title: '专业团队',
        desc: '资深顾问深度协同，提供一站式解决方案。',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
            __icon_query__: 'data insight',
        },
        title: '洞察先机',
        desc: '行业研究与趋势预判，把握每一次机遇。',
    },
]

const FourFeatures: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '四大核心优势'
    const features = (slideData?.features && slideData.features.length === 4)
        ? slideData.features
        : FALLBACK_FEATURES

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
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="bizFFGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.05" />
                                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                            </linearGradient>
                            <pattern id="bizFFGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0 H0 V40" fill="none" stroke="#1e3a8a" strokeOpacity="0.04" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="1280" height="720" fill="url(#bizFFGrid)" />
                        <rect width="1280" height="720" fill="url(#bizFFGlow)" />
                        {[0, 1, 2].map((i) => (
                            <circle key={i} cx="1180" cy="100" r={60 + i * 50} fill="none" stroke="#1e3a8a" strokeOpacity={0.05} strokeWidth="1.5" />
                        ))}
                    </svg>
                </div>

                {/* 左侧深蓝几何角标 */}
                <div
                    className="absolute left-0 top-0 h-full w-[6px]"
                    style={{ background: "var(--primary-color,#1e3a8a)" }}
                    aria-hidden="true"
                />

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 页眉 */}
                    <div className="flex flex-shrink-0 items-end gap-4">
                        <div className="mb-2 h-10 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* 2x2 网格卡片 */}
                    <div className="mt-10 grid flex-1 grid-cols-2 grid-rows-2 gap-6">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-5 rounded-2xl border p-7 shadow-sm"
                                style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                            >
                                {/* 图标徽章 */}
                                <div
                                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{ background: "var(--primary-color,#1e3a8a)" }}
                                >
                                    <RemoteSvgIcon
                                        url={f.icon?.__icon_url__}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-7 h-7"
                                        title={f.icon?.__icon_query__}
                                    />
                                </div>

                                <div className="flex min-w-0 flex-col">
                                    <div className="flex items-center gap-3">
                                        <h3
                                            className="text-xl font-bold leading-[1.3] break-words"
                                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {f.title}
                                        </h3>
                                        <span
                                            className="flex-shrink-0 text-sm font-black leading-none"
                                            style={{ color: "var(--secondary-color,#f97316)", opacity: 0.85 }}
                                        >
                                            0{i + 1}
                                        </span>
                                    </div>
                                    <p
                                        className="mt-2.5 text-base leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {f.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FourFeatures
