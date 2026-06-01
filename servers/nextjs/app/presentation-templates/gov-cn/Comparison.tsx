import React from 'react'
import * as z from "zod";

export const layoutId = 'gov-cn-comparison'
export const layoutName = '左右对比'
export const layoutDescription = '党政政务风左右对比：米白底 + 中国红 + 烫金细线，对称双栏对照两方要点，中央以五角星 VS 分隔。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('改革前后对照鲜明').meta({
        description: "对比页主标题（中文，简短有力，居中）",
    }),
    leftTitle: z.string().min(2).max(12).default('改革之前').meta({
        description: "左栏标题（中文，简短）",
    }),
    rightTitle: z.string().min(2).max(12).default('改革之后').meta({
        description: "右栏标题（中文，简短）",
    }),
    leftPoints: z.array(
        z.string().min(2).max(30).meta({ description: "左栏一条对比要点（中文）" })
    ).min(2).max(4).default([
        '审批流程冗长，群众多头跑动',
        '部门数据壁垒，信息难以共享',
        '事项标准不一，办理周期较长',
    ]).meta({ description: "左栏对比要点列表" }),
    rightPoints: z.array(
        z.string().min(2).max(30).meta({ description: "右栏一条对比要点（中文）" })
    ).min(2).max(4).default([
        '一窗受理一网通办，最多跑一次',
        '数据互联互通，信息全域共享',
        '标准统一规范，办结时限大幅压缩',
    ]).meta({ description: "右栏对比要点列表" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Comparison: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '改革前后对照鲜明'
    const leftTitle = slideData?.leftTitle || '改革之前'
    const rightTitle = slideData?.rightTitle || '改革之后'
    const leftPoints = slideData?.leftPoints || []
    const rightPoints = slideData?.rightPoints || []

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
                {/* 背景装饰：对称纹样 + 烫金细线 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="govCmpGold" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#b8860b" stopOpacity="0" />
                            <stop offset="50%" stopColor="#b8860b" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="govCmpHalo" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#c1121f" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="#c1121f" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 左右对称弧形纹样 */}
                    <circle cx="80" cy="80" r="220" fill="none" stroke="#b8860b" strokeOpacity="0.07" strokeWidth="1.5" />
                    <circle cx="80" cy="80" r="160" fill="none" stroke="#b8860b" strokeOpacity="0.07" strokeWidth="1.5" />
                    <circle cx="1200" cy="640" r="220" fill="none" stroke="#b8860b" strokeOpacity="0.07" strokeWidth="1.5" />
                    <circle cx="1200" cy="640" r="160" fill="none" stroke="#b8860b" strokeOpacity="0.07" strokeWidth="1.5" />
                    {/* 中央光晕 */}
                    <rect x="440" y="120" width="400" height="500" fill="url(#govCmpHalo)" />
                </svg>

                {/* 顶部对称角标纹样 */}
                <div className="absolute top-0 left-0 w-full flex justify-between px-12 pt-7" aria-hidden="true">
                    <svg width="64" height="20" viewBox="0 0 64 20">
                        <polygon points="0,10 12,4 12,16" fill="var(--secondary-color,#b8860b)" fillOpacity="0.6" />
                        <rect x="16" y="9" width="48" height="2" fill="var(--secondary-color,#b8860b)" fillOpacity="0.5" />
                    </svg>
                    <svg width="64" height="20" viewBox="0 0 64 20">
                        <rect x="0" y="9" width="48" height="2" fill="var(--secondary-color,#b8860b)" fillOpacity="0.5" />
                        <polygon points="64,10 52,4 52,16" fill="var(--secondary-color,#b8860b)" fillOpacity="0.6" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 居中对称标题 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-12" style={{ background: "var(--secondary-color,#b8860b)" }} />
                            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                                <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="var(--primary-color,#c1121f)" />
                            </svg>
                            <span className="h-px w-12" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        </div>
                        <h1
                            className="mt-4 text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-3 h-1 w-20 rounded-full" style={{ background: "var(--primary-color,#c1121f)" }} />
                    </div>

                    {/* 双栏对称对比 */}
                    <div className="mt-8 flex flex-1 items-stretch gap-6">
                        {/* 左栏 */}
                        <div
                            className="flex flex-1 flex-col rounded-xl border p-8 shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e8dcc8)" }}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md text-base font-black"
                                    style={{ background: "rgba(193,18,31,0.10)", color: "var(--primary-color,#c1121f)" }}
                                >
                                    壹
                                </span>
                                <h2
                                    className="text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--primary-color,#c1121f)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {leftTitle}
                                </h2>
                            </div>
                            <div className="mt-4 h-px w-full" style={{ background: "var(--stroke,#e8dcc8)" }} />
                            <ul className="mt-5 flex flex-1 flex-col justify-center gap-4">
                                {leftPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <svg className="mt-1.5 flex-shrink-0" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                                            <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="var(--secondary-color,#b8860b)" />
                                        </svg>
                                        <span
                                            className="text-base leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 中央 VS 分隔 */}
                        <div className="flex flex-shrink-0 flex-col items-center justify-center">
                            <span className="h-full w-px" style={{ background: "linear-gradient(to bottom, transparent, var(--secondary-color,#b8860b), transparent)" }} />
                            <div
                                className="absolute flex h-14 w-14 items-center justify-center rounded-full text-lg font-black shadow-md"
                                style={{
                                    background: "var(--primary-color,#c1121f)",
                                    color: "var(--primary-text,#ffffff)",
                                    boxShadow: "0 0 0 6px var(--background-color,#faf7f2), 0 0 0 8px var(--secondary-color,#b8860b)",
                                }}
                            >
                                VS
                            </div>
                        </div>

                        {/* 右栏 */}
                        <div
                            className="flex flex-1 flex-col rounded-xl border p-8 shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e8dcc8)" }}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md text-base font-black"
                                    style={{ background: "rgba(184,134,11,0.12)", color: "var(--secondary-color,#b8860b)" }}
                                >
                                    贰
                                </span>
                                <h2
                                    className="text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--secondary-color,#b8860b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {rightTitle}
                                </h2>
                            </div>
                            <div className="mt-4 h-px w-full" style={{ background: "var(--stroke,#e8dcc8)" }} />
                            <ul className="mt-5 flex flex-1 flex-col justify-center gap-4">
                                {rightPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <svg className="mt-1.5 flex-shrink-0" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                                            <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="var(--primary-color,#c1121f)" />
                                        </svg>
                                        <span
                                            className="text-base leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {point}
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
