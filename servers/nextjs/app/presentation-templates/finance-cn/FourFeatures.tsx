import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'finance-cn-four-features'
export const layoutName = '四宫格特性'
export const layoutDescription = '金融投资风四宫格特性页：深藏青底 + 香槟金细线与棱形装饰，2x2 网格卡片展示四项核心能力/优势，每张卡片含图标、标题与说明。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('四维投研体系').meta({
        description: "页面主标题（中文，简短有力）",
    }),
    features: z.array(z.object({
        icon: IconSchema.default({
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg",
            __icon_query__: "growth chart",
        }).meta({ description: "特性图标" }),
        title: z.string().min(2).max(12).meta({ description: "特性标题（中文，简短）" }),
        desc: z.string().min(4).max(32).meta({ description: "特性说明（中文，一句话）" }),
    })).min(4).max(4).default([
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg",
                __icon_query__: "growth chart",
            },
            title: '宏观研判',
            desc: '把握周期拐点，自上而下配置资产。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg",
                __icon_query__: "risk shield",
            },
            title: '风险管控',
            desc: '全流程风控，严守回撤与久期纪律。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/magnifying-glass-bold.svg",
                __icon_query__: "deep research",
            },
            title: '深度研究',
            desc: '基本面深耕，精选优质标的与赛道。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/scales-bold.svg",
                __icon_query__: "portfolio balance",
            },
            title: '组合优化',
            desc: '量化择时与再平衡，追求稳健收益。',
        },
    ]).meta({ description: "四项核心特性（固定四项，2x2 网格）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FourFeatures: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '四维投研体系'
    const features = (slideData?.features && slideData.features.length > 0
        ? slideData.features
        : [
            {
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg",
                    __icon_query__: "growth chart",
                },
                title: '宏观研判',
                desc: '把握周期拐点，自上而下配置资产。',
            },
            {
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg",
                    __icon_query__: "risk shield",
                },
                title: '风险管控',
                desc: '全流程风控，严守回撤与久期纪律。',
            },
            {
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/magnifying-glass-bold.svg",
                    __icon_query__: "deep research",
                },
                title: '深度研究',
                desc: '基本面深耕，精选优质标的与赛道。',
            },
            {
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/scales-bold.svg",
                    __icon_query__: "portfolio balance",
                },
                title: '组合优化',
                desc: '量化择时与再平衡，追求稳健收益。',
            },
        ]).slice(0, 4)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;700;900&family=Noto+Sans+SC:wght@400;500;700&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：数据网格 + 增长曲线 + 细金线 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="finFFGlow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="finFFCurve" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0" />
                            <stop offset="100%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.28" />
                        </linearGradient>
                        <pattern id="finFFGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0H0V48" fill="none" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.05" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {/* 数据网格 */}
                    <rect width="1280" height="720" fill="url(#finFFGrid)" />
                    {/* 右上角光晕 */}
                    <rect width="1280" height="720" fill="url(#finFFGlow)" />
                    {/* 增长曲线 */}
                    <path
                        d="M0 600 C 220 560, 360 470, 540 430 S 900 300, 1280 150"
                        fill="none"
                        stroke="url(#finFFCurve)"
                        strokeWidth="2.5"
                    />
                    {/* 细金线分隔 */}
                    <line x1="0" y1="118" x2="1280" y2="118" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.22" strokeWidth="1" />
                </svg>

                {/* 左上棱形母题 */}
                <div
                    className="absolute"
                    style={{
                        top: '-26px', left: '-26px', width: '120px', height: '120px',
                        transform: 'rotate(45deg)',
                        border: '1px solid var(--primary-color,#d4af37)',
                        opacity: 0.18,
                    }}
                    aria-hidden="true"
                />
                {/* 右下棱形母题 */}
                <div
                    className="absolute"
                    style={{
                        bottom: '40px', right: '40px', width: '14px', height: '14px',
                        transform: 'rotate(45deg)',
                        background: "var(--secondary-color,#60a5fa)",
                        boxShadow: '0 0 0 6px rgba(96,165,250,0.16)',
                    }}
                    aria-hidden="true"
                />

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 items-end gap-4">
                        <div
                            className="h-9 w-1 flex-shrink-0 rounded-full"
                            style={{ background: "var(--primary-color,#d4af37)" }}
                            aria-hidden="true"
                        />
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#e2e8f0)",
                                fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                    </div>

                    {/* 2x2 网格卡片 */}
                    <div className="mt-10 grid flex-1 grid-cols-2 grid-rows-2 gap-6">
                        {features.map((f, i) => {
                            const fTitle = f?.title || ''
                            const fDesc = f?.desc || ''
                            const iconUrl = f?.icon?.__icon_url__
                            const iconQuery = f?.icon?.__icon_query__ || 'feature icon'
                            const number = String(i + 1).padStart(2, '0')
                            return (
                                <div
                                    key={i}
                                    className="relative flex flex-col justify-center overflow-hidden rounded-2xl border px-8 py-6"
                                    style={{
                                        background: "var(--card-color,#1e293b)",
                                        borderColor: "var(--stroke,#334155)",
                                    }}
                                >
                                    {/* 卡片左侧金色细描边 */}
                                    <div
                                        className="absolute left-0 top-0 h-full w-1"
                                        style={{ background: "var(--primary-color,#d4af37)", opacity: 0.85 }}
                                        aria-hidden="true"
                                    />
                                    {/* 卡片右上序号 */}
                                    <span
                                        className="absolute right-6 top-5 text-3xl font-black leading-none"
                                        style={{
                                            color: "var(--primary-color,#d4af37)",
                                            opacity: 0.16,
                                            fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                        }}
                                        aria-hidden="true"
                                    >
                                        {number}
                                    </span>

                                    <div className="flex items-center gap-4">
                                        {/* 图标块 */}
                                        <div
                                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                            style={{
                                                background: "rgba(212,175,55,0.12)",
                                                border: '1px solid var(--stroke,#334155)',
                                            }}
                                        >
                                            <RemoteSvgIcon
                                                url={iconUrl}
                                                strokeColor="currentColor"
                                                color="var(--primary-color,#d4af37)"
                                                className="w-6 h-6"
                                                title={iconQuery}
                                            />
                                        </div>
                                        <h3
                                            className="text-xl font-bold leading-[1.3] break-words"
                                            style={{
                                                color: "var(--primary-text,#ffffff)",
                                                fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {fTitle}
                                        </h3>
                                    </div>

                                    <p
                                        className="mt-4 text-base leading-relaxed break-words"
                                        style={{
                                            color: "var(--background-text,#e2e8f0)",
                                            opacity: 0.82,
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {fDesc}
                                    </p>
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
