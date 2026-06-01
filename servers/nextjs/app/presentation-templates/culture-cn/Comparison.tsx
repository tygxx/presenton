import React from 'react'
import * as z from "zod";

export const layoutId = 'culture-cn-comparison'
export const layoutName = '左右对比'
export const layoutDescription = '国潮文创风左右对比版式：宣纸米黄底，左右两栏对称，中间朱砂印章 VS 分隔，描金边与水墨笔触装饰。用于两方对比 / 优劣 / before-after。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('守正与创新').meta({
        description: "对比页主标题（中文，简短有力）",
    }),
    leftTitle: z.string().min(2).max(12).default('传统工艺').meta({
        description: "左栏标题，如『传统』『现状』『方案甲』",
    }),
    rightTitle: z.string().min(2).max(12).default('国潮新生').meta({
        description: "右栏标题，如『创新』『未来』『方案乙』",
    }),
    leftPoints: z.array(
        z.string().min(2).max(30).meta({ description: "左栏要点（中文短句）" })
    ).min(2).max(4).default([
        '匠心手作，一器一物皆有温度',
        '纹样源自典籍，承载千年文脉',
        '工序繁复，产能受限难成规模',
        '受众多为收藏雅集，圈层有限',
    ]).meta({ description: "左栏要点列表" }),
    rightPoints: z.array(
        z.string().min(2).max(30).meta({ description: "右栏要点（中文短句）" })
    ).min(2).max(4).default([
        '现代设计语言，焕活东方美学',
        '联名跨界，触达年轻消费群体',
        '量产工艺成熟，价格更为亲民',
        '线上传播迅速，文化破圈出海',
    ]).meta({ description: "右栏要点列表" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const sealMark = (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
        <rect x="3" y="3" width="58" height="58" rx="6" fill="var(--primary-color,#c0392b)" />
        <rect x="7" y="7" width="50" height="50" rx="4" fill="none" stroke="var(--primary-text,#ffffff)" strokeOpacity="0.55" strokeWidth="1.4" />
    </svg>
)

const Comparison: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '守正与创新'
    const leftTitle = slideData?.leftTitle || '传统工艺'
    const rightTitle = slideData?.rightTitle || '国潮新生'
    const leftPoints = slideData?.leftPoints || [
        '匠心手作，一器一物皆有温度',
        '纹样源自典籍，承载千年文脉',
        '工序繁复，产能受限难成规模',
        '受众多为收藏雅集，圈层有限',
    ]
    const rightPoints = slideData?.rightPoints || [
        '现代设计语言，焕活东方美学',
        '联名跨界，触达年轻消费群体',
        '量产工艺成熟，价格更为亲民',
        '线上传播迅速，文化破圈出海',
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
                    background: "var(--background-color,#f5ecd9)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：水墨笔触 + 传统纹样光晕 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <radialGradient id="cultCmpGlow" cx="50%" cy="0%" r="70%">
                            <stop offset="0%" stopColor="var(--primary-color,#c0392b)" stopOpacity="0.07" />
                            <stop offset="100%" stopColor="var(--primary-color,#c0392b)" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="cultCmpInk" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#cultCmpGlow)" />
                    {/* 左下角水墨笔触 */}
                    <path d="M-30 700 C 120 600, 80 560, 220 600 C 300 624, 260 690, 160 720 Z" fill="url(#cultCmpInk)" />
                    {/* 右上角传统回纹纹样 */}
                    <g stroke="var(--secondary-color,#1a1a1a)" strokeOpacity="0.05" strokeWidth="2" fill="none">
                        <path d="M1140 60 h60 v60 h-40 v-40 h20 v20" />
                        <path d="M1060 60 h60 v60 h-40 v-40 h20 v20" />
                    </g>
                </svg>

                {/* 角标印章红块 */}
                <div className="absolute top-8 left-8 h-7 w-7 opacity-90">{sealMark}</div>

                <div className="relative z-10 flex h-full flex-col px-16 pt-10 pb-12">
                    {/* 顶部标题区 */}
                    <div className="flex flex-col items-center text-center">
                        <span
                            className="text-sm font-medium tracking-wide break-words"
                            style={{ color: "var(--primary-color,#c0392b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            两相参照 · 各得其妙
                        </span>
                        <h1
                            className="mt-2 text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-4 flex items-center gap-3">
                            <span className="h-px w-16 rounded-full" style={{ background: "var(--stroke,#ddd0b4)" }} />
                            <span className="h-2 w-2 rotate-45" style={{ background: "var(--primary-color,#c0392b)" }} />
                            <span className="h-px w-16 rounded-full" style={{ background: "var(--stroke,#ddd0b4)" }} />
                        </div>
                    </div>

                    {/* 对比主体：左 / VS / 右 */}
                    <div className="mt-8 flex flex-1 items-stretch gap-6">
                        {/* 左栏 */}
                        <div
                            className="flex flex-1 flex-col rounded-2xl border p-8 shadow-sm"
                            style={{ background: "var(--card-color,#fbf5e9)", borderColor: "var(--stroke,#ddd0b4)" }}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-base font-black"
                                    style={{ background: "var(--secondary-color,#1a1a1a)", color: "var(--primary-text,#ffffff)" }}
                                >
                                    甲
                                </span>
                                <h2
                                    className="text-2xl font-black leading-[1.3] break-words"
                                    style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {leftTitle}
                                </h2>
                            </div>
                            <div className="mt-4 mb-5 h-1 w-full rounded-full" style={{ background: "var(--secondary-color,#1a1a1a)", opacity: 0.85 }} />
                            <ul className="flex flex-1 flex-col justify-center gap-4">
                                {leftPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--secondary-color,#1a1a1a)" }}
                                        />
                                        <span
                                            className="text-base leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 中间 VS 印章分隔 */}
                        <div className="flex flex-col items-center justify-center gap-3">
                            <span className="h-full w-px rounded-full" style={{ background: "var(--stroke,#ddd0b4)" }} />
                            <div
                                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md text-lg font-black shadow-sm"
                                style={{
                                    background: "var(--primary-color,#c0392b)",
                                    color: "var(--primary-text,#ffffff)",
                                    boxShadow: '0 0 0 4px rgba(192,57,43,0.16)',
                                }}
                            >
                                VS
                            </div>
                            <span className="h-full w-px rounded-full" style={{ background: "var(--stroke,#ddd0b4)" }} />
                        </div>

                        {/* 右栏 */}
                        <div
                            className="flex flex-1 flex-col rounded-2xl border p-8 shadow-sm"
                            style={{
                                background: "var(--card-color,#fbf5e9)",
                                borderColor: "var(--primary-color,#c0392b)",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-base font-black"
                                    style={{ background: "var(--primary-color,#c0392b)", color: "var(--primary-text,#ffffff)" }}
                                >
                                    乙
                                </span>
                                <h2
                                    className="text-2xl font-black leading-[1.3] break-words"
                                    style={{ color: "var(--primary-color,#c0392b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {rightTitle}
                                </h2>
                            </div>
                            <div className="mt-4 mb-5 h-1 w-full rounded-full" style={{ background: "var(--primary-color,#c0392b)" }} />
                            <ul className="flex flex-1 flex-col justify-center gap-4">
                                {rightPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--primary-color,#c0392b)" }}
                                        />
                                        <span
                                            className="text-base leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comparison
