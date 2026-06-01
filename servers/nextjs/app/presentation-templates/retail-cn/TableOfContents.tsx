import React from 'react'
import * as z from "zod";

export const layoutId = 'retail-cn-toc'
export const layoutName = '目录'
export const layoutDescription = '电商新零售风目录页：撞色大色块 + 圆角卡片 + 价签装饰，编号大字自动生成 01/02…，分节标题加可选说明。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('目录').meta({
        description: "目录页主标题，默认『目录』",
    }),
    items: z.array(z.object({
        heading: z.string().min(2).max(16).meta({
            description: "分节标题（编号自动生成，无需手写 01/02）",
        }),
        desc: z.string().max(28).optional().meta({
            description: "分节简要说明（可选，一句话）",
        }),
    })).min(3).max(6).default([
        { heading: '市场与趋势', desc: '消费升级下的新零售机会洞察' },
        { heading: '全渠道布局', desc: '线上线下一体化的人货场重构' },
        { heading: '爆品运营', desc: '选品、定价与营销节奏打法' },
        { heading: '私域增长', desc: '会员沉淀与复购的精细化运营' },
        { heading: '数据驱动', desc: '用户画像与供应链智能决策' },
    ]).meta({
        description: "目录分节列表（3-6 项）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TableOfContents: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '目录'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : [
            { heading: '市场与趋势', desc: '消费升级下的新零售机会洞察' },
            { heading: '全渠道布局', desc: '线上线下一体化的人货场重构' },
            { heading: '爆品运营', desc: '选品、定价与营销节奏打法' },
            { heading: '私域增长', desc: '会员沉淀与复购的精细化运营' },
            { heading: '数据驱动', desc: '用户画像与供应链智能决策' },
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
                    background: "var(--background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：撞色几何形 + 价签母题 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    {/* 左上撞色大色块 */}
                    <div
                        className="absolute -left-20 -top-24 h-72 w-72 rounded-[3rem]"
                        style={{ background: "var(--primary-color,#db2777)", opacity: 0.08, transform: 'rotate(18deg)' }}
                    />
                    {/* 右下活力圆形光晕 */}
                    <div
                        className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full"
                        style={{ background: "var(--secondary-color,#f59e0b)", opacity: 0.10 }}
                    />
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="retailTocGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#db2777)" stopOpacity="0.05" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.04" />
                            </linearGradient>
                        </defs>
                        {/* 价签外形（带圆孔），潮流几何母题 */}
                        <g transform="translate(150 470) rotate(-12)" opacity="0.10">
                            <path d="M0 28 L52 0 L150 0 A14 14 0 0 1 164 14 L164 70 A14 14 0 0 1 150 84 L52 84 Z" fill="var(--primary-color,#db2777)" />
                            <circle cx="44" cy="42" r="9" fill="var(--background-color,#ffffff)" />
                        </g>
                        <rect width="1280" height="720" fill="url(#retailTocGlow)" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full">
                    {/* 左栏：撞色色块 + 大标题 */}
                    <div className="flex w-[34%] flex-shrink-0 flex-col justify-center pl-16 pr-8">
                        <span
                            className="mb-5 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-bold break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                background: "var(--primary-color,#db2777)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            CONTENTS · 议程
                        </span>
                        <h1
                            className="text-7xl font-black leading-[1.2] break-words"
                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        {/* 撞色双色条 */}
                        <div className="mt-7 flex items-center gap-2">
                            <div className="h-2 w-20 rounded-full" style={{ background: "var(--primary-color,#db2777)" }} />
                            <div className="h-2 w-10 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                        </div>
                        <p
                            className="mt-6 max-w-[16rem] text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#18181b)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            潮流爆发 · 全域增长，本次分享的核心脉络
                        </p>
                    </div>

                    {/* 右栏：编号大字 + 分节卡片，自适应网格 */}
                    <div className="flex flex-1 flex-col justify-center py-12 pr-16">
                        <div className="grid grid-cols-2 gap-5">
                            {items.map((item, i) => {
                                const num = String(i + 1).padStart(2, '0')
                                const accent = i % 2 === 0 ? "var(--primary-color,#db2777)" : "var(--secondary-color,#f59e0b)"
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 rounded-2xl border p-4 shadow-sm"
                                        style={{
                                            background: "var(--card-color,#fdf2f8)",
                                            borderColor: "var(--stroke,#fbcfe8)",
                                        }}
                                    >
                                        {/* 编号大字 */}
                                        <span
                                            className="flex-shrink-0 text-5xl font-black leading-none"
                                            style={{ color: accent }}
                                        >
                                            {num}
                                        </span>
                                        {/* 撞色分隔竖条 */}
                                        <div className="h-12 w-1 flex-shrink-0 rounded-full" style={{ background: accent, opacity: 0.35 }} />
                                        <div className="flex min-w-0 flex-col">
                                            <span
                                                className="text-lg font-bold leading-[1.35] break-words"
                                                style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {item.heading}
                                            </span>
                                            {item.desc && (
                                                <span
                                                    className="mt-1 text-sm leading-relaxed break-words"
                                                    style={{ color: "var(--background-text,#18181b)", opacity: 0.55, overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
                </div>
            </div>
        </>
    )
}

export default TableOfContents
