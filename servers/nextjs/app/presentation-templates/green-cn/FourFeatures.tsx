import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'green-cn-four-features'
export const layoutName = '四宫格特性'
export const layoutDescription = '新能源环保风四宫格特性页：2x2 圆角卡片网格，叶片/地球/能源自然母题装饰，每张卡片含图标、小标题与说明。纯 CSS/SVG 装饰，离线可渲染，主题色自动跟随。'

const schema = z.object({
    title: z.string().min(2).max(20).default('绿色低碳四大核心优势').meta({
        description: "版式主标题（中文，简短有力，概括四项特性）",
    }),
    features: z.array(z.object({
        icon: IconSchema.meta({ description: "特性图标，建议用 leaf/sun/wind/recycle 等自然能源图标" }),
        title: z.string().min(2).max(12).meta({ description: "特性小标题（中文，简短）" }),
        desc: z.string().min(4).max(32).meta({ description: "特性说明（中文，一句话）" }),
    })).min(4).max(4).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg',
                __icon_query__: 'leaf',
            },
            title: '清洁能源',
            desc: '风光储一体化，全程零碳排放供能',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/sun-bold.svg',
                __icon_query__: 'solar power',
            },
            title: '光伏发电',
            desc: '高效组件转化，年发电量提升三成',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/recycle-bold.svg',
                __icon_query__: 'recycle',
            },
            title: '循环利用',
            desc: '资源回收再生，废弃物利用率达九成',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-hemisphere-west-bold.svg',
                __icon_query__: 'earth globe',
            },
            title: '生态友好',
            desc: '守护绿水青山，共建可持续美好家园',
        },
    ]).meta({ description: "四项核心特性，固定四张卡片" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK_FEATURES = [
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg',
            __icon_query__: 'leaf',
        },
        title: '清洁能源',
        desc: '风光储一体化，全程零碳排放供能',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/sun-bold.svg',
            __icon_query__: 'solar power',
        },
        title: '光伏发电',
        desc: '高效组件转化，年发电量提升三成',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/recycle-bold.svg',
            __icon_query__: 'recycle',
        },
        title: '循环利用',
        desc: '资源回收再生，废弃物利用率达九成',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-hemisphere-west-bold.svg',
            __icon_query__: 'earth globe',
        },
        title: '生态友好',
        desc: '守护绿水青山，共建可持续美好家园',
    },
]

const FourFeatures: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '绿色低碳四大核心优势'
    const features = (slideData?.features && slideData.features.length > 0)
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
                    background: "var(--background-color,#f0fdf4)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景自然装饰层：地球弧线 + 叶片 + 自然曲线 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="greenFfSky" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="greenFfGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.14" />
                            <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 顶部天空蓝渐变 */}
                    <rect width="1280" height="720" fill="url(#greenFfSky)" />
                    {/* 左上能源光晕 */}
                    <circle cx="120" cy="90" r="220" fill="url(#greenFfGlow)" />
                    {/* 右下地球弧线（同心圆） */}
                    {[0, 1, 2, 3].map((i) => (
                        <circle
                            key={i}
                            cx="1180"
                            cy="700"
                            r={180 + i * 90}
                            fill="none"
                            stroke="var(--primary-color,#16a34a)"
                            strokeOpacity={0.08}
                            strokeWidth="1.5"
                        />
                    ))}
                    {/* 自然有机曲线（流动的河流/风线） */}
                    <path
                        d="M -40 600 C 280 540 360 660 660 580 C 980 500 1080 640 1340 560"
                        fill="none"
                        stroke="var(--primary-color,#16a34a)"
                        strokeOpacity="0.10"
                        strokeWidth="2"
                    />
                    <path
                        d="M -40 660 C 300 600 420 720 720 640 C 1020 560 1120 700 1340 620"
                        fill="none"
                        stroke="var(--secondary-color,#0891b2)"
                        strokeOpacity="0.08"
                        strokeWidth="2"
                    />
                    {/* 右上角叶片母题 */}
                    <path
                        d="M 1180 60 C 1120 60 1060 120 1060 180 C 1060 120 1120 60 1180 60 C 1180 120 1140 170 1080 180 C 1140 180 1180 130 1180 60 Z"
                        fill="var(--primary-color,#16a34a)"
                        fillOpacity="0.10"
                    />
                </svg>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex items-center gap-4">
                        {/* 叶片图章 */}
                        <span
                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                            style={{ background: "var(--primary-color,#16a34a)" }}
                            aria-hidden="true"
                        >
                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                                <path
                                    d="M4 20 C4 11 11 4 20 4 C20 13 13 20 4 20 Z M4 20 C8 16 12 12 18 7"
                                    stroke="var(--primary-text,#ffffff)"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <div className="flex flex-col">
                            <h1
                                className="text-3xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div
                                className="mt-2 h-1.5 w-20 rounded-full"
                                style={{ background: "var(--secondary-color,#0891b2)" }}
                            />
                        </div>
                    </div>

                    {/* 2x2 网格卡片 */}
                    <div className="mt-9 grid flex-1 grid-cols-2 grid-rows-2 gap-6">
                        {features.slice(0, 4).map((f, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-5 rounded-3xl border p-7 shadow-sm"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#d1fae5)",
                                }}
                            >
                                {/* 图标圆角章 + 编号角标 */}
                                <div className="relative flex-shrink-0">
                                    <div
                                        className="flex h-14 w-14 items-center justify-center rounded-2xl"
                                        style={{ background: "var(--primary-color,#16a34a)" }}
                                    >
                                        <RemoteSvgIcon
                                            url={f?.icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-7 h-7"
                                            title={f?.icon?.__icon_query__}
                                        />
                                    </div>
                                    <span
                                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                                        style={{
                                            background: "var(--secondary-color,#0891b2)",
                                            color: "var(--primary-text,#ffffff)",
                                        }}
                                    >
                                        {i + 1}
                                    </span>
                                </div>

                                {/* 文案 */}
                                <div className="flex min-w-0 flex-col">
                                    <h3
                                        className="text-lg font-bold leading-[1.3] break-words"
                                        style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {f?.title}
                                    </h3>
                                    <p
                                        className="mt-2 text-sm leading-[1.7] break-words"
                                        style={{
                                            color: "var(--background-text,#14532d)",
                                            opacity: 0.78,
                                            overflowWrap: 'break-word',
                                            wordBreak: 'break-word',
                                        }}
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
