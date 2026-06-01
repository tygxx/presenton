import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'retail-cn-four-features'
export const layoutName = '四宫格特性'
export const layoutDescription = '电商新零售四宫格特性页：2x2 圆角卡片网格，撞色色块与价签装饰、活力几何形点缀，潮流粗体排版。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('新零售四大增长引擎').meta({
        description: "四宫格特性页主标题（中文，简短有力）",
    }),
    features: z.array(z.object({
        icon: IconSchema.meta({ description: "特性图标" }),
        title: z.string().min(2).max(12).meta({ description: "特性卡片标题（中文，简短）" }),
        desc: z.string().min(4).max(32).meta({ description: "特性卡片说明（一句话）" }),
    })).min(4).max(4).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shopping-cart-bold.svg',
                __icon_query__: 'shopping cart',
            },
            title: '全渠道融合',
            desc: '线上线下一盘货，门店即仓库即体验。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightning-bold.svg',
                __icon_query__: 'lightning fast delivery',
            },
            title: '极速达履约',
            desc: '前置仓三公里，最快三十分钟送达。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'private domain members',
            },
            title: '私域会员',
            desc: '社群直播双驱动，复购率持续走高。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'data driven growth',
            },
            title: '数据选品',
            desc: '智能算法洞察需求，爆款命中更精准。',
        },
    ]).meta({ description: "四张特性卡片（固定四项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK_FEATURES: SlideData['features'] = [
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shopping-cart-bold.svg',
            __icon_query__: 'shopping cart',
        },
        title: '全渠道融合',
        desc: '线上线下一盘货，门店即仓库即体验。',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightning-bold.svg',
            __icon_query__: 'lightning fast delivery',
        },
        title: '极速达履约',
        desc: '前置仓三公里，最快三十分钟送达。',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
            __icon_query__: 'private domain members',
        },
        title: '私域会员',
        desc: '社群直播双驱动，复购率持续走高。',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
            __icon_query__: 'data driven growth',
        },
        title: '数据选品',
        desc: '智能算法洞察需求，爆款命中更精准。',
    },
]

const FourFeatures: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '新零售四大增长引擎'
    const rawFeatures = (slideData?.features && slideData.features.length > 0) ? slideData.features : FALLBACK_FEATURES
    const features = rawFeatures.slice(0, 4)

    // 撞色：粉 / 橙 交替，营造潮流活力撞色卡片
    const accents = [
        "var(--primary-color,#db2777)",
        "var(--secondary-color,#f59e0b)",
        "var(--secondary-color,#f59e0b)",
        "var(--primary-color,#db2777)",
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
                    background: "var(--background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：撞色大色块 + 活力几何形 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    {/* 左上撞色大色块 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-120px', left: '-100px', width: '360px', height: '360px',
                            borderRadius: '9999px',
                            background: "var(--primary-color,#db2777)",
                            opacity: 0.10,
                        }}
                    />
                    {/* 右下撞色大色块 */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '-140px', right: '-90px', width: '300px', height: '300px',
                            borderRadius: '48px',
                            transform: 'rotate(18deg)',
                            background: "var(--secondary-color,#f59e0b)",
                            opacity: 0.12,
                        }}
                    />
                    {/* 活力几何形：散点价签小圆 */}
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                        <circle cx="1180" cy="90" r="6" fill="var(--primary-color,#db2777)" fillOpacity="0.35" />
                        <circle cx="1140" cy="130" r="4" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.45" />
                        <circle cx="80" cy="600" r="5" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.4" />
                        <rect x="1150" y="520" width="14" height="14" rx="3" transform="rotate(20 1157 527)" fill="var(--primary-color,#db2777)" fillOpacity="0.25" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-14 py-10">
                    {/* 标题区：价签 + 撞色下划块 + 潮流粗体 */}
                    <div className="flex flex-shrink-0 items-center gap-4">
                        {/* 价签装饰：带挂孔的圆角标签 */}
                        <div className="flex flex-shrink-0 items-center" aria-hidden="true">
                            <div
                                className="flex items-center justify-center"
                                style={{
                                    width: '46px', height: '46px',
                                    borderRadius: '14px',
                                    background: "var(--primary-color,#db2777)",
                                    transform: 'rotate(-8deg)',
                                    boxShadow: '0 8px 18px rgba(219,39,119,0.28)',
                                }}
                            >
                                <span
                                    style={{
                                        width: '8px', height: '8px', borderRadius: '9999px',
                                        background: "var(--primary-text,#ffffff)", display: 'block',
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span
                                className="text-sm font-bold leading-relaxed break-words"
                                style={{ color: "var(--secondary-color,#f59e0b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                RETAIL · 新零售
                            </span>
                            <h1
                                className="text-4xl font-black leading-[1.2] break-words"
                                style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                        <div
                            className="ml-auto hidden h-2 w-28 self-end rounded-full md:block"
                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                        />
                    </div>

                    {/* 2x2 网格卡片 */}
                    <div className="mt-8 grid flex-1 grid-cols-2 grid-rows-2 gap-6">
                        {features.map((f, i) => {
                            const accent = accents[i % accents.length]
                            return (
                                <div
                                    key={i}
                                    className="relative flex items-start gap-5 overflow-hidden rounded-3xl border p-6 shadow-sm"
                                    style={{
                                        background: "var(--card-color,#fdf2f8)",
                                        borderColor: "var(--stroke,#fbcfe8)",
                                    }}
                                >
                                    {/* 卡片左侧撞色竖条 */}
                                    <div
                                        className="absolute left-0 top-0 h-full"
                                        style={{ width: '6px', background: accent }}
                                        aria-hidden="true"
                                    />
                                    {/* 角标编号：价签风格 */}
                                    <span
                                        className="absolute right-5 top-5 text-2xl font-black leading-none"
                                        style={{ color: accent, opacity: 0.18 }}
                                        aria-hidden="true"
                                    >
                                        0{i + 1}
                                    </span>

                                    {/* 图标块：撞色圆角 */}
                                    <div
                                        className="flex flex-shrink-0 items-center justify-center rounded-2xl"
                                        style={{
                                            width: '60px', height: '60px',
                                            background: accent,
                                            boxShadow: `0 10px 20px ${i % 2 === 0 ? 'rgba(219,39,119,0.22)' : 'rgba(245,158,11,0.24)'}`,
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

                                    {/* 文案 */}
                                    <div className="flex min-w-0 flex-1 flex-col pr-8">
                                        <h3
                                            className="text-xl font-black leading-[1.3] break-words"
                                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {f?.title || '特性标题'}
                                        </h3>
                                        <p
                                            className="mt-2 text-base leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#52525b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {f?.desc || '一句话特性说明。'}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FourFeatures
