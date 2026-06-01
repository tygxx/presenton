import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'education-cn-three-points'
export const layoutName = '三栏要点'
export const layoutDescription = '教育培训风三栏要点页：明亮米白底 + 圆角卡片，三等分列展示图标、标题与描述，搭配书本、灯泡、成长曲线与圆点装饰母题。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('高效学习三步法').meta({
        description: "三栏要点页主标题（中文，简短有力）",
    }),
    points: z.array(z.object({
        icon: IconSchema.meta({ description: "该要点的图标" }),
        title: z.string().min(2).max(12).meta({ description: "要点小标题（中文，简短）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点描述（中文，一句话说明）" }),
    })).min(3).max(3).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg',
                __icon_query__: 'open book',
            },
            title: '系统输入',
            desc: '搭建知识框架，先建立完整脉络再深入细节。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg',
                __icon_query__: 'lightbulb idea',
            },
            title: '主动思考',
            desc: '带着问题学习，用提问与联想激发深度理解。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'growth curve',
            },
            title: '持续复盘',
            desc: '定期回顾与练习，让成长曲线稳步向上。',
        },
    ]).meta({ description: "三个要点，每个含图标、小标题与描述" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK_POINTS: SlideData['points'] = [
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg',
            __icon_query__: 'open book',
        },
        title: '系统输入',
        desc: '搭建知识框架，先建立完整脉络再深入细节。',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg',
            __icon_query__: 'lightbulb idea',
        },
        title: '主动思考',
        desc: '带着问题学习，用提问与联想激发深度理解。',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
            __icon_query__: 'growth curve',
        },
        title: '持续复盘',
        desc: '定期回顾与练习，让成长曲线稳步向上。',
    },
]

const ThreePoints: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '高效学习三步法'
    const points = (slideData?.points && slideData.points.length === 3)
        ? slideData.points
        : FALLBACK_POINTS

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#fffdf7)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：圆点纹样 + 灯泡光晕 + 成长曲线 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    {/* 左上暖橙光晕 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-120px', left: '-100px', width: '320px', height: '320px', borderRadius: '9999px',
                            background: "radial-gradient(circle, rgba(249,115,22,0.16), rgba(249,115,22,0) 70%)",
                        }}
                    />
                    {/* 右上蓝色光晕 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-140px', right: '-120px', width: '360px', height: '360px', borderRadius: '9999px',
                            background: "radial-gradient(circle, rgba(37,99,235,0.12), rgba(37,99,235,0) 70%)",
                        }}
                    />
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="eduGrowthLine" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.35" />
                            </linearGradient>
                            <pattern id="eduDots" x="0" y="0" width="34" height="34" patternUnits="userSpaceOnUse">
                                <circle cx="3" cy="3" r="2.4" fill="var(--primary-color,#2563eb)" fillOpacity="0.10" />
                            </pattern>
                        </defs>
                        {/* 左下圆点纹样块 */}
                        <rect x="0" y="470" width="240" height="250" fill="url(#eduDots)" />
                        {/* 右下圆点纹样块 */}
                        <rect x="1080" y="40" width="200" height="200" fill="url(#eduDots)" />
                        {/* 底部成长曲线 */}
                        <path
                            d="M -20 680 C 220 660 360 600 540 600 C 760 600 880 520 1300 430"
                            fill="none"
                            stroke="url(#eduGrowthLine)"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-col items-center text-center">
                        <span
                            className="mb-4 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-semibold break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.12)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            学习方法 · 教学要点
                        </span>
                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-5 h-1.5 w-24 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />
                    </div>

                    {/* 三栏卡片区 */}
                    <div className="mt-10 grid flex-1 grid-cols-3 items-stretch gap-8">
                        {points.map((p, i) => {
                            const accent = i === 1
                                ? "var(--secondary-color,#f97316)"
                                : "var(--primary-color,#2563eb)"
                            const accentSoft = i === 1
                                ? "rgba(249,115,22,0.12)"
                                : "rgba(37,99,235,0.10)"
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center rounded-3xl border px-7 py-9 text-center shadow-sm"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#f1e9d8)",
                                    }}
                                >
                                    {/* 序号圆点 */}
                                    <span
                                        className="mb-5 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                                        style={{ background: accentSoft, color: accent }}
                                    >
                                        {`0${i + 1}`}
                                    </span>
                                    {/* 图标圆角徽章 */}
                                    <div
                                        className="flex h-16 w-16 items-center justify-center rounded-2xl"
                                        style={{
                                            background: accent,
                                            boxShadow: `0 8px 18px -6px ${accentSoft}`,
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={p.icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-8 h-8"
                                            title={p.icon?.__icon_query__}
                                        />
                                    </div>
                                    {/* 小标题 */}
                                    <h3
                                        className="mt-6 text-2xl font-bold leading-[1.3] break-words"
                                        style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {p.title}
                                    </h3>
                                    {/* 描述 */}
                                    <p
                                        className="mt-3 text-base leading-loose break-words"
                                        style={{ color: "var(--background-text,#1f2937)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {p.desc}
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

export default ThreePoints
