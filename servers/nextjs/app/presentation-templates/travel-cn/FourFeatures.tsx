import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'travel-cn-four-features'
export const layoutName = '四宫格特性'
export const layoutDescription = '旅游文旅风四宫格特性页：2x2 网格卡片，每张含图标、小标题与一句说明。明媚海蓝配暖阳橙，指南针与路线点缀装饰，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('为何选择这趟旅程').meta({
        description: "页面主标题（中文，简短有力，概括四项特性）",
    }),
    features: z.array(z.object({
        icon: IconSchema.meta({ description: "特性图标，建议用 phosphor 图标名" }),
        title: z.string().min(2).max(12).meta({ description: "特性小标题，如『精选目的地』" }),
        desc: z.string().min(2).max(32).meta({ description: "特性一句话说明" }),
    })).min(4).max(4).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-trifold-bold.svg',
                __icon_query__: 'map route',
            },
            title: '精选目的地',
            desc: '甄选小众秘境与经典名胜，避开人潮直达美景。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg',
                __icon_query__: 'compass guide',
            },
            title: '专业领队',
            desc: '资深本地向导全程随行，路线灵活随心调整。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/airplane-tilt-bold.svg',
                __icon_query__: 'airplane travel',
            },
            title: '一价全包',
            desc: '机票住宿门票一站搞定，无隐形消费更省心。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/sun-horizon-bold.svg',
                __icon_query__: 'sunrise scenery',
            },
            title: '沉浸体验',
            desc: '深度感受当地风物人情，留下难忘旅途记忆。',
        },
    ]).meta({ description: "四项核心特性，固定四张卡片" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FourFeatures: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '为何选择这趟旅程'
    const features = (slideData?.features && slideData.features.length === 4)
        ? slideData.features
        : [
            {
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-trifold-bold.svg',
                    __icon_query__: 'map route',
                },
                title: '精选目的地',
                desc: '甄选小众秘境与经典名胜，避开人潮直达美景。',
            },
            {
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg',
                    __icon_query__: 'compass guide',
                },
                title: '专业领队',
                desc: '资深本地向导全程随行，路线灵活随心调整。',
            },
            {
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/airplane-tilt-bold.svg',
                    __icon_query__: 'airplane travel',
                },
                title: '一价全包',
                desc: '机票住宿门票一站搞定，无隐形消费更省心。',
            },
            {
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/sun-horizon-bold.svg',
                    __icon_query__: 'sunrise scenery',
                },
                title: '沉浸体验',
                desc: '深度感受当地风物人情，留下难忘旅途记忆。',
            },
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
                {/* 背景装饰：海蓝光晕 + 暖阳光斑 + 指南针 + 虚线路线 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="travelSeaGlow" cx="14%" cy="8%" r="55%">
                                <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="travelSunGlow" cx="92%" cy="94%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#travelSeaGlow)" />
                        <rect width="1280" height="720" fill="url(#travelSunGlow)" />
                        {/* 暖阳 */}
                        <circle cx="1140" cy="120" r="58" fill="var(--secondary-color,#f59e0b)" opacity="0.14" />
                        <circle cx="1140" cy="120" r="92" fill="none" stroke="var(--secondary-color,#f59e0b)" strokeOpacity="0.10" strokeWidth="1.5" />
                        {/* 虚线旅行路线 + 路线点 */}
                        <path d="M40 660 C 260 560, 360 700, 560 600 S 900 520, 1240 600" fill="none" stroke="var(--primary-color,#0891b2)" strokeOpacity="0.16" strokeWidth="2.5" strokeDasharray="10 12" strokeLinecap="round" />
                        <circle cx="40" cy="660" r="6" fill="var(--primary-color,#0891b2)" opacity="0.5" />
                        <circle cx="560" cy="600" r="6" fill="var(--secondary-color,#f59e0b)" opacity="0.6" />
                        <circle cx="1240" cy="600" r="6" fill="var(--primary-color,#0891b2)" opacity="0.5" />
                    </svg>
                    {/* 指南针母题（左上角，淡描线） */}
                    <svg viewBox="0 0 120 120" className="absolute left-10 top-8 h-24 w-24 opacity-[0.18]" aria-hidden="true">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="var(--primary-color,#0891b2)" strokeWidth="2.5" />
                        <circle cx="60" cy="60" r="40" fill="none" stroke="var(--primary-color,#0891b2)" strokeWidth="1" strokeDasharray="4 5" />
                        <polygon points="60,16 70,60 60,104 50,60" fill="var(--secondary-color,#f59e0b)" />
                        <polygon points="60,16 50,60 60,60" fill="var(--primary-color,#0891b2)" />
                        <circle cx="60" cy="60" r="5" fill="var(--primary-color,#0891b2)" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="flex flex-shrink-0 flex-col items-center">
                        <span
                            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#0891b2)",
                                background: "rgba(8,145,178,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            />
                            旅程亮点
                        </span>
                        <h1
                            className="text-center text-4xl font-black leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-5 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                        />
                    </div>

                    {/* 2x2 特性卡片网格 */}
                    <div className="mt-9 grid flex-1 grid-cols-2 grid-rows-2 gap-6">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-5 rounded-2xl border p-6 shadow-sm"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#bae6fd)",
                                }}
                            >
                                {/* 图标徽章 */}
                                <div
                                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                        background: i % 2 === 0
                                            ? "var(--primary-color,#0891b2)"
                                            : "var(--secondary-color,#f59e0b)",
                                        boxShadow: i % 2 === 0
                                            ? '0 6px 16px rgba(8,145,178,0.28)'
                                            : '0 6px 16px rgba(245,158,11,0.28)',
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url={f?.icon?.__icon_url__}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-7 h-7"
                                        title={f?.icon?.__icon_query__}
                                    />
                                </div>
                                {/* 文本 */}
                                <div className="flex min-w-0 flex-1 flex-col">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="text-sm font-black leading-relaxed"
                                            style={{ color: "var(--secondary-color,#f59e0b)", opacity: 0.85 }}
                                        >
                                            {`0${i + 1}`}
                                        </span>
                                        <h3
                                            className="text-xl font-bold leading-[1.3] break-words"
                                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {f?.title}
                                        </h3>
                                    </div>
                                    <p
                                        className="mt-2 text-base leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {f?.desc}
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
