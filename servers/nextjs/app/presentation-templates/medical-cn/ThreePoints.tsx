import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'medical-cn-three-points'
export const layoutName = '三栏要点'
export const layoutDescription = '医疗健康风三栏要点页：标题 + 三等分圆角卡片，每张含图标、小标题与描述。脉搏波形与十字装饰，柔和蓝绿点缀，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('智慧医疗三大核心能力').meta({
        description: "三栏要点页主标题（中文，简短有力）",
    }),
    points: z.array(z.object({
        icon: IconSchema.default({
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg",
            __icon_query__: "heartbeat",
        }).meta({ description: "要点图标" }),
        title: z.string().min(2).max(12).meta({ description: "要点小标题（中文，简短）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点描述（一句话说明）" }),
    })).min(3).max(3).default([
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg",
                __icon_query__: "heartbeat",
            },
            title: '远程实时监护',
            desc: '可穿戴设备全天候采集心率与体征，异常即时预警。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/first-aid-kit-bold.svg",
                __icon_query__: "first aid kit",
            },
            title: '智能辅助诊断',
            desc: 'AI 影像识别辅助医生快速定位病灶，提升诊断效率。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg",
                __icon_query__: "shield check",
            },
            title: '隐私安全合规',
            desc: '全程数据加密与分级授权，严守患者隐私与合规底线。',
        },
    ]).meta({ description: "三个核心要点（固定三项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const fallbackPoints: SlideData['points'] = [
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg",
            __icon_query__: "heartbeat",
        },
        title: '远程实时监护',
        desc: '可穿戴设备全天候采集心率与体征，异常即时预警。',
    },
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/first-aid-kit-bold.svg",
            __icon_query__: "first aid kit",
        },
        title: '智能辅助诊断',
        desc: 'AI 影像识别辅助医生快速定位病灶，提升诊断效率。',
    },
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg",
            __icon_query__: "shield check",
        },
        title: '隐私安全合规',
        desc: '全程数据加密与分级授权，严守患者隐私与合规底线。',
    },
]

const ThreePoints: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '智慧医疗三大核心能力'
    const rawPoints = slideData?.points && slideData.points.length > 0 ? slideData.points : fallbackPoints
    const points = rawPoints.slice(0, 3)

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
                {/* 背景装饰：脉搏波形 + 十字纹样 + 柔和光晕 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="medTpGlowA" cx="0%" cy="0%" r="60%">
                            <stop offset="0%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="medTpGlowB" cx="100%" cy="100%" r="60%">
                            <stop offset="0%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#medTpGlowA)" />
                    <rect width="1280" height="720" fill="url(#medTpGlowB)" />
                    {/* 脉搏波形（贯穿页面顶部偏上） */}
                    <path
                        d="M-20 150 H180 L210 150 L235 108 L268 200 L300 78 L330 150 L520 150 L548 150 L572 116 L602 190 L632 92 L660 150 H900 L928 150 L952 118 L982 188 L1012 96 L1040 150 H1300"
                        fill="none"
                        stroke="var(--primary-color,#0ea5e9)"
                        strokeOpacity="0.16"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>

                {/* 右上角医疗十字角标 */}
                <div
                    className="absolute right-10 top-9 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                        background: "rgba(16,185,129,0.12)",
                        boxShadow: '0 6px 18px rgba(16,185,129,0.14)',
                    }}
                    aria-hidden="true"
                >
                    <svg viewBox="0 0 24 24" className="h-6 w-6">
                        <path
                            d="M10 3 H14 V10 H21 V14 H14 V21 H10 V14 H3 V10 H10 Z"
                            fill="var(--secondary-color,#10b981)"
                            fillOpacity="0.9"
                        />
                    </svg>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-16 py-14">
                    {/* 标题区 */}
                    <div className="mb-10 flex flex-col items-start">
                        <span
                            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#0ea5e9)",
                                background: "rgba(14,165,233,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#10b981)" }}
                            />
                            健康守护 · 核心能力
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.3] break-words"
                            style={{
                                color: "var(--background-text,#0f172a)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-5 h-1.5 w-24 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))" }}
                        />
                    </div>

                    {/* 三等分要点卡片 */}
                    <div className="grid grid-cols-3 gap-7">
                        {points.map((point, i) => {
                            const icon = point?.icon
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col rounded-2xl border p-7"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#e2e8f0)",
                                        boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
                                    }}
                                >
                                    {/* 图标徽章 */}
                                    <div
                                        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                                        style={{
                                            background: "linear-gradient(135deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))",
                                            boxShadow: '0 8px 20px rgba(14,165,233,0.22)',
                                            color: "var(--primary-text,#ffffff)",
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={icon?.__icon_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg"}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-7 h-7"
                                            title={icon?.__icon_query__ || "heartbeat"}
                                        />
                                    </div>

                                    {/* 序号 + 小标题 */}
                                    <div className="mb-3 flex items-center gap-2">
                                        <span
                                            className="text-sm font-black leading-none"
                                            style={{ color: "var(--secondary-color,#10b981)" }}
                                        >
                                            {`0${i + 1}`}
                                        </span>
                                        <h3
                                            className="text-xl font-bold leading-[1.3] break-words"
                                            style={{
                                                color: "var(--background-text,#0f172a)",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {point?.title || '核心要点'}
                                        </h3>
                                    </div>

                                    {/* 描述 */}
                                    <p
                                        className="text-base leading-[1.7] break-words"
                                        style={{
                                            color: "var(--background-text,#475569)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {point?.desc || '以技术与服务为患者提供安全、可靠的健康保障。'}
                                    </p>

                                    {/* 底部脉搏小装饰 */}
                                    <svg viewBox="0 0 200 24" className="mt-6 h-5 w-full" preserveAspectRatio="none" aria-hidden="true">
                                        <path
                                            d="M0 12 H70 L82 12 L92 3 L104 21 L116 6 L126 12 H200"
                                            fill="none"
                                            stroke="var(--primary-color,#0ea5e9)"
                                            strokeOpacity="0.28"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThreePoints
