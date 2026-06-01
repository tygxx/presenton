import React from 'react'
import * as z from "zod";

export const layoutId = 'culture-cn-toc'
export const layoutName = '目录'
export const layoutDescription = '国潮文创风目录页：宣纸米黄底 + 朱砂印章 + 描金边 + 水墨笔触装饰，左侧竖排标题与印章，右侧编号大字分节列表。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('目录').meta({
        description: "目录页主标题，如『目录』『卷宗』『纲目』",
    }),
    items: z.array(z.object({
        heading: z.string().min(2).max(16).meta({
            description: "分节标题（中文，简短）",
        }),
        desc: z.string().max(28).optional().meta({
            description: "分节简要说明（可选，一句话）",
        }),
    })).min(3).max(6).default([
        { heading: '品牌溯源', desc: '从传统纹样中提炼东方美学基因' },
        { heading: '产品体系', desc: '国潮文创全品类设计与开发' },
        { heading: '工艺匠造', desc: '非遗技艺与现代制造的融合' },
        { heading: '市场拓展', desc: '线上线下联动的渠道布局' },
        { heading: '未来图景', desc: '让东方雅致走进当代生活' },
    ]).meta({
        description: "目录条目列表（编号自动生成 01/02…）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TableOfContents: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '目录'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : [
            { heading: '品牌溯源', desc: '从传统纹样中提炼东方美学基因' },
            { heading: '产品体系', desc: '国潮文创全品类设计与开发' },
            { heading: '工艺匠造', desc: '非遗技艺与现代制造的融合' },
            { heading: '市场拓展', desc: '线上线下联动的渠道布局' },
            { heading: '未来图景', desc: '让东方雅致走进当代生活' },
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
                {/* 宣纸纹理与水墨晕染背景层 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="cultureTocPaper" cx="0.5" cy="0.4" r="0.9">
                                <stop offset="0%" stopColor="#fbf5e9" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#f5ecd9" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="cultureTocInk" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.07" />
                                <stop offset="70%" stopColor="#1a1a1a" stopOpacity="0.02" />
                                <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="cultureTocCinnabar" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="#c0392b" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="#c0392b" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#cultureTocPaper)" />
                        {/* 水墨晕染笔触 */}
                        <ellipse cx="180" cy="600" rx="260" ry="160" fill="url(#cultureTocInk)" />
                        <ellipse cx="1120" cy="120" rx="240" ry="150" fill="url(#cultureTocCinnabar)" />
                        {/* 传统回纹（描金细线）顶部 */}
                        <g stroke="#c8a24a" strokeOpacity="0.30" strokeWidth="1.5" fill="none">
                            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                                <path
                                    key={i}
                                    d={`M${i * 80 + 8} 8 h40 v40 h-28 v-26 h14`}
                                    transform={`translate(${i * 0}, 0)`}
                                />
                            ))}
                        </g>
                    </svg>
                </div>

                {/* 描金外边框 */}
                <div
                    className="absolute inset-4 rounded-sm pointer-events-none"
                    aria-hidden="true"
                    style={{ border: '1.5px solid var(--stroke,#ddd0b4)' }}
                />
                <div
                    className="absolute inset-[22px] rounded-sm pointer-events-none"
                    aria-hidden="true"
                    style={{ border: '1px solid rgba(200,162,74,0.45)' }}
                />

                {/* 主内容 */}
                <div className="relative z-10 flex h-full px-16 py-12 gap-12">
                    {/* 左侧：竖排标题 + 朱砂印章 */}
                    <div className="flex w-[26%] flex-shrink-0 flex-col justify-between py-2">
                        <div className="flex items-start gap-5">
                            {/* 竖排标题 */}
                            <h1
                                className="text-5xl font-black leading-[1.3] break-words"
                                style={{
                                    color: "var(--secondary-color,#1a1a1a)",
                                    writingMode: 'vertical-rl',
                                    letterSpacing: '0.12em',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {title}
                            </h1>
                            {/* 朱砂印章红块 */}
                            <div
                                className="mt-1 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md"
                                style={{
                                    background: "var(--primary-color,#c0392b)",
                                    boxShadow: '0 4px 14px rgba(192,57,43,0.30)',
                                }}
                            >
                                <span
                                    className="text-2xl font-black leading-[1.2] break-words"
                                    style={{
                                        color: "var(--primary-text,#ffffff)",
                                        writingMode: 'vertical-rl',
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    纲目
                                </span>
                            </div>
                        </div>

                        {/* 底部英文小注 + 描金分隔 */}
                        <div className="flex flex-col gap-3">
                            <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, var(--primary-color,#c0392b), transparent)' }} />
                            <span
                                className="text-xs tracking-wide break-words"
                                style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.55, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                CONTENTS · 目录
                            </span>
                        </div>
                    </div>

                    {/* 中缝：水墨竖线 */}
                    <div className="flex-shrink-0 self-stretch py-2">
                        <div
                            className="h-full w-px"
                            style={{ background: 'linear-gradient(180deg, transparent, var(--stroke,#ddd0b4) 18%, var(--stroke,#ddd0b4) 82%, transparent)' }}
                        />
                    </div>

                    {/* 右侧：编号大字分节列表 */}
                    <div className="flex flex-1 flex-col justify-center gap-3">
                        {items.map((item, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-5 rounded-lg px-5 py-2.5"
                                    style={{
                                        background: i % 2 === 0 ? "var(--card-color,#fbf5e9)" : "transparent",
                                        border: i % 2 === 0 ? '1px solid var(--stroke,#ddd0b4)' : '1px solid transparent',
                                    }}
                                >
                                    {/* 编号大字 */}
                                    <span
                                        className="flex-shrink-0 text-5xl font-black leading-[1.2] break-words"
                                        style={{
                                            color: "var(--primary-color,#c0392b)",
                                            fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {num}
                                    </span>
                                    {/* 朱砂竖条 */}
                                    <span
                                        className="flex-shrink-0 self-stretch rounded-full"
                                        style={{ width: '3px', background: "var(--primary-color,#c0392b)", opacity: 0.55 }}
                                    />
                                    {/* 分节标题 + 说明 */}
                                    <div className="flex min-w-0 flex-1 flex-col leading-relaxed">
                                        <span
                                            className="text-2xl font-bold leading-[1.4] break-words"
                                            style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.heading || ''}
                                        </span>
                                        {item?.desc && (
                                            <span
                                                className="mt-0.5 text-sm leading-relaxed break-words"
                                                style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {item.desc}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 右下角描金印章角标 */}
                <div
                    className="absolute z-10"
                    aria-hidden="true"
                    style={{ right: '40px', bottom: '36px', width: '10px', height: '10px', borderRadius: '9999px', background: "var(--primary-color,#c0392b)", boxShadow: '0 0 0 5px rgba(192,57,43,0.14)' }}
                />
            </div>
        </>
    )
}

export default TableOfContents
