import React from 'react'
import * as z from "zod";

export const layoutId = 'gov-cn-toc'
export const layoutName = '目录'
export const layoutDescription = '党政政务风目录页：米白底 + 中国红 + 烫金细线，居中对称标题，编号大字分节。纯 CSS/SVG 装饰（华表纹样、五角星点缀），无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('目录').meta({
        description: "目录页主标题（中文，默认『目录』）",
    }),
    items: z.array(z.object({
        heading: z.string().min(2).max(16).meta({
            description: "分节标题（中文，简短），编号会自动生成 01/02…",
        }),
        desc: z.string().max(28).optional().meta({
            description: "分节简要说明（可选，中文一句话）",
        }),
    })).min(3).max(6).default([
        { heading: '总体要求与指导思想', desc: '锚定目标定位，把准前进方向' },
        { heading: '重点任务与工作举措', desc: '聚焦关键领域，压实主体责任' },
        { heading: '组织保障与责任落实', desc: '强化统筹协调，凝聚工作合力' },
        { heading: '督查考核与成效评估', desc: '严格跟踪问效，确保落地见效' },
    ]).meta({
        description: "目录条目（3 至 6 项），每项含分节标题与可选说明",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TableOfContents: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '目录'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : [
            { heading: '总体要求与指导思想', desc: '锚定目标定位，把准前进方向' },
            { heading: '重点任务与工作举措', desc: '聚焦关键领域，压实主体责任' },
            { heading: '组织保障与责任落实', desc: '强化统筹协调，凝聚工作合力' },
            { heading: '督查考核与成效评估', desc: '严格跟踪问效，确保落地见效' },
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
                    background: "var(--background-color,#faf7f2)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景对称装饰层：烫金细线边框 + 华表纹样 + 五角星点缀 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="govTocGold" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#b8860b" stopOpacity="0" />
                                <stop offset="50%" stopColor="#b8860b" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="govTocHalo" cx="50%" cy="0%" r="70%">
                                <stop offset="0%" stopColor="#c1121f" stopOpacity="0.07" />
                                <stop offset="100%" stopColor="#c1121f" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 顶部红色光晕，烘托庄重氛围 */}
                        <rect x="0" y="0" width="1280" height="360" fill="url(#govTocHalo)" />
                        {/* 烫金外框（对称） */}
                        <rect x="40" y="40" width="1200" height="640" fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity="0.55" strokeWidth="1.5" />
                        <rect x="52" y="52" width="1176" height="616" fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity="0.3" strokeWidth="1" />
                    </svg>

                    {/* 左右对称华表纹样（圆环 + 竖线，写意） */}
                    {[0, 1].map((side) => (
                        <svg
                            key={side}
                            viewBox="0 0 120 720"
                            className="absolute top-0 h-full"
                            style={{
                                width: '120px',
                                [side === 0 ? 'left' : 'right']: 0,
                                transform: side === 0 ? 'none' : 'scaleX(-1)',
                            } as React.CSSProperties}
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <line x1="60" y1="120" x2="60" y2="600" stroke="var(--secondary-color,#b8860b)" strokeOpacity="0.18" strokeWidth="2" />
                            {[200, 320, 440].map((cy, i) => (
                                <circle key={i} cx="60" cy={cy} r={26 - i * 4} fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity="0.22" strokeWidth="1.5" />
                            ))}
                            <path d="M60 90 L74 118 L46 118 Z" fill="var(--primary-color,#c1121f)" fillOpacity="0.12" />
                        </svg>
                    ))}
                </div>

                {/* 主内容：居中对称布局 */}
                <div className="relative z-10 flex h-full flex-col px-24 py-12">
                    {/* 标题区（居中对称，烫金细线 + 五角星） */}
                    <div className="flex flex-col items-center justify-center pt-2 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="h-px w-20" style={{ background: "var(--secondary-color,#b8860b)" }} />
                            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                                <path
                                    d="M12 2 L14.6 9 L22 9 L16 13.6 L18.2 21 L12 16.6 L5.8 21 L8 13.6 L2 9 L9.4 9 Z"
                                    fill="var(--primary-color,#c1121f)"
                                />
                            </svg>
                            <div className="h-px w-20" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        </div>
                        <h1
                            className="mt-4 text-5xl font-black leading-[1.2] break-words"
                            style={{
                                color: "var(--primary-color,#c1121f)",
                                letterSpacing: '0.5rem',
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        <p
                            className="mt-3 text-sm font-medium leading-relaxed break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.55, letterSpacing: '0.35rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            CONTENTS
                        </p>
                    </div>

                    {/* 条目区：两列对称网格，编号大字 + 分节标题 */}
                    <div className="grid flex-1 content-center grid-cols-2 gap-x-12 gap-y-5">
                        {items.map((item, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-5 rounded-sm border-l-2 py-3 pl-5 pr-4"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--primary-color,#c1121f)",
                                        boxShadow: '0 1px 0 rgba(184,134,11,0.25)',
                                    }}
                                >
                                    {/* 编号大字 */}
                                    <span
                                        className="flex-shrink-0 text-5xl font-black leading-[1.2]"
                                        style={{
                                            color: "var(--primary-color,#c1121f)",
                                            fontVariantNumeric: 'tabular-nums',
                                            opacity: 0.92,
                                        }}
                                    >
                                        {num}
                                    </span>
                                    {/* 烫金分隔细线 */}
                                    <span className="h-10 w-px flex-shrink-0" style={{ background: "var(--secondary-color,#b8860b)", opacity: 0.6 }} />
                                    {/* 分节标题 + 说明 */}
                                    <div className="flex min-w-0 flex-col gap-1">
                                        <span
                                            className="text-lg font-bold leading-[1.35] break-words"
                                            style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item.heading}
                                        </span>
                                        {item.desc && (
                                            <span
                                                className="text-xs leading-relaxed break-words"
                                                style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {item.desc}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* 底部居中烫金细线 + 五角星收尾 */}
                    <div className="flex items-center justify-center gap-3 pt-4">
                        <div className="h-px w-16" style={{ background: "var(--secondary-color,#b8860b)", opacity: 0.6 }} />
                        <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
                            <path
                                d="M12 2 L14.6 9 L22 9 L16 13.6 L18.2 21 L12 16.6 L5.8 21 L8 13.6 L2 9 L9.4 9 Z"
                                fill="var(--secondary-color,#b8860b)"
                                fillOpacity="0.85"
                            />
                        </svg>
                        <div className="h-px w-16" style={{ background: "var(--secondary-color,#b8860b)", opacity: 0.6 }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableOfContents
