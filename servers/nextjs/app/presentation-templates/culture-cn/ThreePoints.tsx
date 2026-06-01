import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'culture-cn-three-points'
export const layoutName = '三栏要点'
export const layoutDescription = '国潮文创风三栏要点：宣纸米黄底配朱砂红印章块与描金边框，三等分列呈现图标、标题、描述。纯 CSS/SVG 水墨纹样装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('国潮文创三大主张').meta({
        description: "版面主标题（中文，简短有力，体现传统文化气质）",
    }),
    points: z.array(z.object({
        icon: IconSchema.meta({ description: "要点图标，使用 phosphor 图标" }),
        title: z.string().min(2).max(12).meta({ description: "要点标题（中文，简短）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点描述（一句话说明）" }),
    })).min(3).max(3).default([
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/scroll-bold.svg",
                __icon_query__: "scroll heritage",
            },
            title: '匠心传承',
            desc: '承袭千年纹样与工艺，让东方美学焕发当代生机。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/paint-brush-bold.svg",
                __icon_query__: "paint brush design",
            },
            title: '原创设计',
            desc: '以水墨笔触重塑视觉语言，融合现代审美与国风意趣。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/flower-lotus-bold.svg",
                __icon_query__: "lotus culture",
            },
            title: '文化共鸣',
            desc: '讲好中国故事，让每件文创承载温度与情感联结。',
        },
    ]).meta({ description: "三个要点，固定三列" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ThreePoints: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '国潮文创三大主张'
    const points = slideData?.points || []

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f5ecd9)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景水墨纹样装饰层 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="cultureInkGlow" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
                        </radialGradient>
                        <pattern id="cultureWeave" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M0 24 L24 0 L48 24 L24 48 Z" fill="none" stroke="#c0392b" strokeOpacity="0.05" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {/* 传统回纹底纹 */}
                    <rect width="1280" height="720" fill="url(#cultureWeave)" />
                    {/* 左上水墨晕染 */}
                    <ellipse cx="120" cy="90" rx="220" ry="160" fill="url(#cultureInkGlow)" />
                    {/* 右下水墨晕染 */}
                    <ellipse cx="1180" cy="660" rx="260" ry="180" fill="url(#cultureInkGlow)" />
                    {/* 描金细线分隔 */}
                    <line x1="80" y1="188" x2="1200" y2="188" stroke="#c0392b" strokeOpacity="0.18" strokeWidth="1" />
                </svg>

                {/* 右上角印章红块 */}
                <div className="absolute top-9 right-12 z-10 flex h-12 w-12 items-center justify-center rounded-md"
                    style={{ background: "var(--primary-color,#c0392b)", boxShadow: '0 4px 14px rgba(192,57,43,0.28)' }}>
                    <span className="text-sm font-bold leading-[1.2] break-words"
                        style={{ color: "var(--primary-text,#ffffff)", writingMode: 'vertical-rl', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                        国潮
                    </span>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 items-end gap-4">
                        {/* 朱砂竖条点缀 */}
                        <div className="h-12 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--primary-color,#c0392b)" }} />
                        <div className="flex flex-col">
                            <span className="mb-2 text-sm font-medium leading-relaxed break-words"
                                style={{ color: "var(--primary-color,#c0392b)", letterSpacing: '0.2em', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                CULTURE · 东方美学
                            </span>
                            <h1 className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* 三栏要点 */}
                    <div className="mt-12 grid flex-1 grid-cols-3 gap-8">
                        {points.map((p, i) => (
                            <div
                                key={i}
                                className="relative flex flex-col rounded-xl border px-7 py-8"
                                style={{
                                    background: "var(--card-color,#fbf5e9)",
                                    borderColor: "var(--stroke,#ddd0b4)",
                                    boxShadow: '0 6px 22px rgba(43,43,43,0.06)',
                                }}
                            >
                                {/* 描金顶边 */}
                                <div className="absolute left-7 right-7 top-0 h-[3px] rounded-full"
                                    style={{ background: "linear-gradient(90deg, var(--primary-color,#c0392b), rgba(192,57,43,0.25))" }} />

                                {/* 序号水墨字 */}
                                <span className="absolute right-6 top-5 text-5xl font-black leading-none"
                                    style={{ color: "var(--secondary-color,#1a1a1a)", opacity: 0.06 }}>
                                    {`0${i + 1}`}
                                </span>

                                {/* 图标朱砂圆块 */}
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
                                    style={{ background: "var(--primary-color,#c0392b)", boxShadow: '0 6px 16px rgba(192,57,43,0.28)' }}>
                                    <RemoteSvgIcon
                                        url={p?.icon?.__icon_url__}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-7 h-7"
                                        title={p?.icon?.__icon_query__}
                                    />
                                </div>

                                <h3 className="mt-6 text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    {p?.title}
                                </h3>

                                {/* 描金小分隔 */}
                                <div className="my-4 h-px w-10 rounded-full" style={{ background: "var(--stroke,#ddd0b4)" }} />

                                <p className="text-base leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    {p?.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThreePoints
