import React from 'react'
import * as z from "zod";

export const layoutId = 'culture-cn-timeline'
export const layoutName = '时间线'
export const layoutDescription = '国潮文创风时间线：宣纸米黄底 + 朱砂红横向轴线 + 墨黑节点 + 描金边与印章红块，横向里程碑布局，最多五个节点。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('品牌焕新之路').meta({
        description: "时间线主标题（中文，简短有力）",
    }),
    milestones: z.array(z.object({
        time: z.string().min(1).max(10).meta({
            description: "时间节点，如年份/季度，简短",
        }),
        title: z.string().min(2).max(14).meta({
            description: "里程碑标题，简短有力",
        }),
        desc: z.string().min(2).max(36).meta({
            description: "里程碑简要说明，一句话",
        }),
    })).min(3).max(5).default([
        { time: '2019', title: '初心立意', desc: '以东方美学为根，创立国潮文创工坊' },
        { time: '2021', title: '纹样新生', desc: '复刻传统纹样，融入现代生活器物' },
        { time: '2023', title: '联名出圈', desc: '携手博物馆推出限定联名系列' },
        { time: '2025', title: '匠心远行', desc: '以东方雅韵走向世界，传承不止步' },
    ]).meta({
        description: "里程碑节点列表（横向排布，3 到 5 个）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Timeline: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '品牌焕新之路'
    const milestones = (slideData?.milestones && slideData.milestones.length > 0)
        ? slideData.milestones
        : [
            { time: '2019', title: '初心立意', desc: '以东方美学为根，创立国潮文创工坊' },
            { time: '2021', title: '纹样新生', desc: '复刻传统纹样，融入现代生活器物' },
            { time: '2023', title: '联名出圈', desc: '携手博物馆推出限定联名系列' },
            { time: '2025', title: '匠心远行', desc: '以东方雅韵走向世界，传承不止步' },
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
                {/* 背景装饰层：宣纸纹理 + 水墨笔触 + 描金光晕 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            {/* 描金光晕 */}
                            <radialGradient id="cultureTlGold" cx="88%" cy="14%" r="42%">
                                <stop offset="0%" stopColor="#c9a24a" stopOpacity="0.20" />
                                <stop offset="100%" stopColor="#c9a24a" stopOpacity="0" />
                            </radialGradient>
                            {/* 水墨晕染 */}
                            <radialGradient id="cultureTlInk" cx="10%" cy="92%" r="46%">
                                <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.07" />
                                <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
                            </radialGradient>
                            {/* 朱砂晕染 */}
                            <radialGradient id="cultureTlRed" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#c0392b" stopOpacity="0.14" />
                                <stop offset="100%" stopColor="#c0392b" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#cultureTlGold)" />
                        <rect width="1280" height="720" fill="url(#cultureTlInk)" />

                        {/* 传统回纹边框（顶部描金细线） */}
                        <line x1="64" y1="92" x2="1216" y2="92" stroke="#c9a24a" strokeOpacity="0.45" strokeWidth="1.5" />

                        {/* 水墨笔触（左下泼墨） */}
                        <path
                            d="M-30 700 C 120 600 60 540 200 520 C 320 504 280 600 420 580 C 360 660 180 700 -30 720 Z"
                            fill="#1a1a1a" fillOpacity="0.05"
                        />
                        {/* 朱砂水墨晕（右上） */}
                        <circle cx="1120" cy="120" r="150" fill="url(#cultureTlRed)" />

                        {/* 传统云纹母题（右上角，描金线条） */}
                        <g stroke="#c9a24a" strokeOpacity="0.40" strokeWidth="2" fill="none">
                            <path d="M1150 60 q 22 -22 44 0 q 22 22 0 44 q -22 22 -44 0" />
                            <path d="M1180 96 q 16 -16 32 0" />
                        </g>
                    </svg>

                    {/* 右下角传统纹样竖排点缀 */}
                    <div
                        className="absolute select-none break-words"
                        style={{
                            right: '40px', bottom: '34px', writingMode: 'vertical-rl',
                            letterSpacing: '0.35em', fontSize: '13px',
                            color: "var(--background-text,#2b2b2b)", opacity: 0.28,
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        匠心传承 · 东方雅韵
                    </div>
                </div>

                {/* 内容主层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区：印章红块 + 主标题 */}
                    <div className="flex flex-shrink-0 items-center gap-5">
                        {/* 印章红块 */}
                        <div
                            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md"
                            style={{
                                background: "var(--primary-color,#c0392b)",
                                boxShadow: '0 0 0 1.5px var(--stroke,#ddd0b4)',
                            }}
                        >
                            <span
                                className="break-words"
                                style={{
                                    writingMode: 'vertical-rl', letterSpacing: '0.15em',
                                    fontSize: '15px', fontWeight: 700, lineHeight: 1.2,
                                    color: "var(--primary-text,#ffffff)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                文创
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div className="mt-3 flex items-center gap-2">
                                <div className="h-1 w-16 rounded-full" style={{ background: "var(--primary-color,#c0392b)" }} />
                                <div className="h-1 w-6 rounded-full" style={{ background: "#c9a24a" }} />
                            </div>
                        </div>
                    </div>

                    {/* 横向时间线区 */}
                    <div className="relative flex min-h-0 flex-1 items-center">
                        {/* 横向轴线（朱砂红 + 描金描边） */}
                        <div
                            className="absolute left-0 right-0 rounded-full"
                            style={{
                                top: '50%', height: '3px', transform: 'translateY(-1.5px)',
                                background: "var(--primary-color,#c0392b)",
                                boxShadow: '0 0 0 1px var(--stroke,#ddd0b4)',
                            }}
                        />

                        {/* 节点列 */}
                        <div className="relative flex w-full items-stretch justify-between gap-6">
                            {milestones.map((m, i) => {
                                const above = i % 2 === 0
                                return (
                                    <div key={i} className="flex flex-1 flex-col items-center">
                                        {/* 上方卡片（偶数项） */}
                                        <div className={`flex w-full justify-center ${above ? '' : 'opacity-0'}`} style={above ? {} : { pointerEvents: 'none' }}>
                                            {above && (
                                                <MilestoneCard time={m?.time} title={m?.title} desc={m?.desc} placement="top" />
                                            )}
                                        </div>

                                        {/* 中心节点（墨黑 + 描金环 + 印章红心） */}
                                        <div className="relative flex flex-shrink-0 items-center justify-center py-3">
                                            <div
                                                className="flex h-7 w-7 items-center justify-center rounded-full"
                                                style={{
                                                    background: "var(--secondary-color,#1a1a1a)",
                                                    boxShadow: '0 0 0 4px var(--background-color,#f5ecd9), 0 0 0 5.5px #c9a24a',
                                                }}
                                            >
                                                <span
                                                    className="rounded-full"
                                                    style={{ width: '9px', height: '9px', background: "var(--primary-color,#c0392b)" }}
                                                />
                                            </div>
                                        </div>

                                        {/* 下方卡片（奇数项） */}
                                        <div className={`flex w-full justify-center ${!above ? '' : 'opacity-0'}`} style={!above ? {} : { pointerEvents: 'none' }}>
                                            {!above && (
                                                <MilestoneCard time={m?.time} title={m?.title} desc={m?.desc} placement="bottom" />
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const MilestoneCard: React.FC<{ time?: string; title?: string; desc?: string; placement: 'top' | 'bottom' }> = ({ time, title, desc, placement }) => {
    return (
        <div className="flex w-full max-w-[14rem] flex-col items-center">
            {placement === 'bottom' && (
                <div className="h-5 w-px" style={{ background: "var(--stroke,#ddd0b4)" }} />
            )}
            <div
                className="flex w-full flex-col items-center rounded-lg px-4 py-3 text-center"
                style={{
                    background: "var(--card-color,#fbf5e9)",
                    border: '1px solid var(--stroke,#ddd0b4)',
                    boxShadow: '0 1px 0 #c9a24a',
                }}
            >
                {/* 时间标签 */}
                <span
                    className="mb-2 inline-flex items-center rounded-full px-3 py-0.5 text-sm font-bold leading-relaxed break-words"
                    style={{
                        background: "var(--primary-color,#c0392b)",
                        color: "var(--primary-text,#ffffff)",
                        overflowWrap: 'break-word', wordBreak: 'break-word',
                    }}
                >
                    {time || '年份'}
                </span>
                <h3
                    className="text-lg font-bold leading-[1.3] break-words"
                    style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                >
                    {title || '里程碑'}
                </h3>
                <p
                    className="mt-1.5 text-sm leading-relaxed break-words"
                    style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                >
                    {desc || '里程碑说明文字'}
                </p>
            </div>
            {placement === 'top' && (
                <div className="h-5 w-px" style={{ background: "var(--stroke,#ddd0b4)" }} />
            )}
        </div>
    )
}

export default Timeline
