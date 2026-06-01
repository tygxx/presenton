import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'medical-cn-four-features'
export const layoutName = '四宫格特性'
export const layoutDescription = '医疗健康风四宫格特性页：2x2 圆角卡片网格展示四项核心能力，每张卡片含图标、标题与说明。脉搏波形与柔和投影装饰，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('全周期健康守护').meta({
        description: "页面主标题（中文，简短有力）",
    }),
    features: z.array(z.object({
        icon: IconSchema.default({
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg",
            __icon_query__: "heartbeat",
        }).meta({ description: "特性图标" }),
        title: z.string().min(2).max(12).meta({ description: "特性标题（中文，简短）" }),
        desc: z.string().min(4).max(32).meta({ description: "特性说明（中文，一句话）" }),
    })).min(4).max(4).default([
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg",
                __icon_query__: "heartbeat",
            },
            title: '智能监测',
            desc: '实时采集体征数据，异常波动即时预警。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/first-aid-bold.svg",
                __icon_query__: "first aid kit",
            },
            title: '精准诊疗',
            desc: '影像辅助识别病灶，提升诊断准确率。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg",
                __icon_query__: "shield check",
            },
            title: '隐私安全',
            desc: '全程加密存储，患者数据合规可控。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg",
                __icon_query__: "care team",
            },
            title: '专家协同',
            desc: '多科室在线会诊，打通诊疗全链路。',
        },
    ]).meta({ description: "四项核心特性，固定 4 张卡片" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK_FEATURES = [
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg",
            __icon_query__: "heartbeat",
        },
        title: '智能监测',
        desc: '实时采集体征数据，异常波动即时预警。',
    },
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/first-aid-bold.svg",
            __icon_query__: "first aid kit",
        },
        title: '精准诊疗',
        desc: '影像辅助识别病灶，提升诊断准确率。',
    },
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg",
            __icon_query__: "shield check",
        },
        title: '隐私安全',
        desc: '全程加密存储，患者数据合规可控。',
    },
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg",
            __icon_query__: "care team",
        },
        title: '专家协同',
        desc: '多科室在线会诊，打通诊疗全链路。',
    },
]

const FourFeatures: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '全周期健康守护'
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
                    background: "var(--background-color,#f8fafc)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：左上柔和光晕 */}
                <div
                    className="absolute -left-24 -top-24 h-80 w-80 rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(14,165,233,0.16) 0%, rgba(14,165,233,0) 70%)",
                    }}
                    aria-hidden="true"
                />
                {/* 背景装饰：右下柔和光晕 */}
                <div
                    className="absolute -bottom-28 -right-20 h-96 w-96 rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(16,185,129,0.14) 0%, rgba(16,185,129,0) 70%)",
                    }}
                    aria-hidden="true"
                />
                {/* 背景装饰：贯穿底部的脉搏波形 */}
                <svg
                    viewBox="0 0 1280 120"
                    className="absolute bottom-0 left-0 h-24 w-full"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path
                        d="M0 80 H360 L390 80 L410 40 L435 110 L460 20 L482 80 L520 80 H760 L788 80 L808 44 L832 108 L858 26 L880 80 L920 80 H1280"
                        fill="none"
                        stroke="var(--primary-color,#0ea5e9)"
                        strokeOpacity="0.18"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="mb-9 flex items-center gap-4">
                        {/* 十字母题徽标 */}
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm"
                            style={{
                                background: "linear-gradient(135deg, var(--primary-color,#0ea5e9) 0%, var(--secondary-color,#10b981) 100%)",
                                boxShadow: '0 8px 20px -6px rgba(14,165,233,0.45)',
                            }}
                            aria-hidden="true"
                        >
                            <svg viewBox="0 0 24 24" className="h-6 w-6">
                                <path
                                    d="M10 3 H14 V10 H21 V14 H14 V21 H10 V14 H3 V10 H10 Z"
                                    fill="var(--primary-text,#ffffff)"
                                />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div
                                className="mt-3 h-1.5 w-20 rounded-full"
                                style={{ background: "linear-gradient(90deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))" }}
                            />
                        </div>
                    </div>

                    {/* 2x2 卡片网格 */}
                    <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-6">
                        {features.slice(0, 4).map((feature, i) => {
                            const accent = i % 2 === 0 ? "var(--primary-color,#0ea5e9)" : "var(--secondary-color,#10b981)"
                            const accentSoft = i % 2 === 0 ? "rgba(14,165,233,0.12)" : "rgba(16,185,129,0.12)"
                            return (
                                <div
                                    key={i}
                                    className="relative flex items-start gap-5 overflow-hidden rounded-3xl border p-7"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#e2e8f0)",
                                        boxShadow: '0 14px 30px -18px rgba(15,23,42,0.22)',
                                    }}
                                >
                                    {/* 卡片左侧色条 */}
                                    <div
                                        className="absolute left-0 top-0 h-full w-1.5"
                                        style={{ background: accent }}
                                        aria-hidden="true"
                                    />
                                    {/* 图标徽章 */}
                                    <div
                                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
                                        style={{ background: accent, boxShadow: `0 8px 18px -8px ${accentSoft}` }}
                                    >
                                        <RemoteSvgIcon
                                            url={feature?.icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-7 h-7"
                                            title={feature?.icon?.__icon_query__}
                                        />
                                    </div>
                                    {/* 文本 */}
                                    <div className="flex min-w-0 flex-col">
                                        <h3
                                            className="text-xl font-bold leading-[1.3] break-words"
                                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {feature?.title || '核心能力'}
                                        </h3>
                                        <p
                                            className="mt-2.5 text-sm leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#475569)", opacity: 0.9, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {feature?.desc || '以专业能力为健康保驾护航。'}
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
