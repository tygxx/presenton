import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'food-cn-three-points'
export const layoutName = '三栏要点'
export const layoutDescription = '美食餐饮风三栏要点页：暖米底配焦糖金描边圆盘构图，三等分列呈现图标+标题+描述。纯 CSS/SVG 装饰，温暖诱人，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('匠心好味之道').meta({
        description: "三栏要点页主标题（中文，简短，餐饮场景）",
    }),
    points: z.array(z.object({
        icon: IconSchema.meta({ description: "要点配图图标（phosphor 图标）" }),
        title: z.string().min(2).max(12).meta({ description: "要点小标题（中文，≤12字）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点描述（中文，一句话，≤40字）" }),
    })).min(3).max(3).default([
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg",
                __icon_query__: "fresh ingredient leaf",
            },
            title: '当季鲜选',
            desc: '每日清晨直采当季时蔬山珍，只取最新鲜的本味。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cooking-pot-bold.svg",
                __icon_query__: "cooking pot",
            },
            title: '古法慢炖',
            desc: '柴火文火慢煨数时辰，封存醇厚汤底与浓香滋味。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg",
                __icon_query__: "warm hospitality heart",
            },
            title: '暖心待客',
            desc: '以家的温度迎接每位食客，让每一餐都宾至如归。',
        },
    ]).meta({ description: "三个要点（图标+标题+描述），固定三项" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK_POINTS = (schema.shape.points as any)._def.defaultValue as SlideData['points']

const ThreePoints: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '匠心好味之道'
    const points = (slideData?.points && slideData.points.length ? slideData.points : FALLBACK_POINTS).slice(0, 3)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#fdf6ec)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：暖色光晕 + 焦糖金同心圆盘 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="foodPointsGlow" cx="50%" cy="0%" r="90%">
                                <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.10" />
                                <stop offset="60%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.03" />
                                <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#foodPointsGlow)" />
                        {/* 左下角焦糖金同心圆盘 */}
                        {[0, 1, 2].map((i) => (
                            <circle key={`l${i}`} cx="-30" cy="760" r={170 + i * 80} fill="none" stroke="var(--secondary-color,#c92a2a)" strokeOpacity={0.07} strokeWidth="2" />
                        ))}
                        {/* 右上角圆盘 */}
                        {[0, 1, 2].map((i) => (
                            <circle key={`r${i}`} cx="1290" cy="-20" r={150 + i * 70} fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity={0.08} strokeWidth="2" />
                        ))}
                    </svg>
                </div>

                {/* 顶部餐具点缀角标 */}
                <div className="absolute top-7 right-9 z-10 flex items-center gap-2" aria-hidden="true">
                    <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ background: "var(--secondary-color,#c92a2a)", boxShadow: '0 0 0 5px rgba(201,42,42,0.12)' }}
                    />
                    <span
                        className="inline-block h-2 w-12 rounded-full"
                        style={{ background: "var(--primary-color,#e8590c)", opacity: 0.5 }}
                    />
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-col items-center text-center">
                        <span
                            className="mb-4 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--secondary-color,#c92a2a)",
                                background: "rgba(201,42,42,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            匠心三味
                        </span>
                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-5 h-1.5 w-24 rounded-full" style={{ background: "var(--primary-color,#e8590c)" }} />
                    </div>

                    {/* 三等分要点列 */}
                    <div className="mt-10 grid flex-1 grid-cols-3 items-stretch gap-8">
                        {points.map((p, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center rounded-3xl border px-7 py-8 text-center shadow-sm"
                                style={{
                                    background: "var(--card-color,#fffaf2)",
                                    borderColor: "var(--stroke,#f0e0cc)",
                                }}
                            >
                                {/* 圆盘构图图标徽章 */}
                                <div className="relative mb-6 flex items-center justify-center">
                                    <span
                                        className="absolute inline-block rounded-full"
                                        style={{
                                            width: '88px', height: '88px',
                                            border: '2px solid var(--secondary-color,#c92a2a)',
                                            opacity: 0.25,
                                        }}
                                    />
                                    <div
                                        className="flex h-16 w-16 items-center justify-center rounded-full"
                                        style={{
                                            background: "var(--primary-color,#e8590c)",
                                            boxShadow: '0 8px 20px rgba(232,89,12,0.28)',
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={p?.icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-8 h-8"
                                            title={p?.icon?.__icon_query__}
                                        />
                                    </div>
                                </div>

                                {/* 序号点缀 */}
                                <span
                                    className="mb-2 text-sm font-bold"
                                    style={{ color: "var(--secondary-color,#c92a2a)", opacity: 0.8 }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                <h3
                                    className="text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p?.title}
                                </h3>

                                <div
                                    className="my-4 h-px w-10 rounded-full"
                                    style={{ background: "var(--stroke,#f0e0cc)" }}
                                />

                                <p
                                    className="text-base leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#3b2412)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
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
