import React from 'react'
import * as z from "zod";

export const layoutId = 'food-cn-toc'
export const layoutName = '目录'
export const layoutDescription = '美食餐饮风目录页：暖米底色 + 焦糖金圆盘装饰，编号大字配分节标题与简介。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('目录').meta({
        description: "目录页主标题（中文，简短，如『目录』『本场内容』）",
    }),
    items: z.array(z.object({
        heading: z.string().min(2).max(16).meta({
            description: "分节标题（中文，简短有力，如『招牌菜品』）",
        }),
        desc: z.string().max(28).optional().meta({
            description: "分节简介，一句话补充说明（可选）",
        }),
    })).min(3).max(6).default([
        { heading: '品牌故事', desc: '十年匠心，从一锅高汤说起' },
        { heading: '招牌菜品', desc: '主厨甄选，时令食材现点现做' },
        { heading: '食材溯源', desc: '产地直供，新鲜直达后厨' },
        { heading: '门店环境', desc: '暖光木质空间，温馨用餐体验' },
    ]).meta({ description: "目录条目列表，编号在组件内自动生成" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TableOfContents: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '目录'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : [
            { heading: '品牌故事', desc: '十年匠心，从一锅高汤说起' },
            { heading: '招牌菜品', desc: '主厨甄选，时令食材现点现做' },
            { heading: '食材溯源', desc: '产地直供，新鲜直达后厨' },
            { heading: '门店环境', desc: '暖光木质空间，温馨用餐体验' },
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
                    background: "var(--background-color,#fdf6ec)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：右上焦糖金圆盘 + 暖色光晕 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="foodTocGlow" cx="85%" cy="12%" r="55%">
                                <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="foodTocPlate" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0.06" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#foodTocGlow)" />
                        {/* 右上同心圆盘构图 */}
                        <circle cx="1170" cy="70" r="220" fill="url(#foodTocPlate)" />
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={i} cx="1170" cy="70" r={120 + i * 46} fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity={0.14} strokeWidth="1.5" />
                        ))}
                        {/* 左下焦糖金细圆盘点缀 */}
                        <circle cx="70" cy="690" r="150" fill="none" stroke="var(--secondary-color,#c92a2a)" strokeOpacity="0.10" strokeWidth="1.5" />
                        <circle cx="70" cy="690" r="96" fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity="0.10" strokeWidth="1.5" />
                    </svg>
                    {/* 餐具点缀：右上圆点强调 */}
                    <div
                        className="absolute"
                        style={{
                            top: '20%', right: '11%', width: '12px', height: '12px', borderRadius: '9999px',
                            background: "var(--secondary-color,#c92a2a)",
                            boxShadow: '0 0 0 6px rgba(201,42,42,0.14)',
                        }}
                    />
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="flex flex-shrink-0 items-end gap-5">
                        {/* 焦糖金描边圆盘图标 */}
                        <div
                            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
                            style={{
                                background: "var(--card-color,#fffaf2)",
                                border: "2px solid var(--primary-color,#e8590c)",
                                boxShadow: '0 0 0 4px rgba(232,89,12,0.12)',
                            }}
                        >
                            <div
                                className="h-6 w-6 rounded-full"
                                style={{ background: "var(--primary-color,#e8590c)" }}
                            />
                        </div>
                        <div className="flex flex-col leading-relaxed">
                            <span
                                className="text-sm font-medium tracking-wide break-words"
                                style={{ color: "var(--secondary-color,#c92a2a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                MENU · 本场内容
                            </span>
                            <h1
                                className="text-5xl font-black leading-[1.2] break-words"
                                style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                    </div>

                    <div className="mt-5 h-1.5 w-24 flex-shrink-0 rounded-full" style={{ background: "var(--primary-color,#e8590c)" }} />

                    {/* 目录条目网格 */}
                    <div className="mt-8 grid flex-1 content-center grid-cols-2 gap-x-10 gap-y-6">
                        {items.map((item, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-5 rounded-2xl px-6 py-4"
                                    style={{
                                        background: "var(--card-color,#fffaf2)",
                                        border: "1px solid var(--stroke,#f0e0cc)",
                                        boxShadow: '0 6px 18px rgba(59,36,18,0.05)',
                                    }}
                                >
                                    {/* 编号大字 + 焦糖金圆盘底 */}
                                    <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center">
                                        <div
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                background: "var(--background-color,#fdf6ec)",
                                                border: "2px solid var(--primary-color,#e8590c)",
                                                borderTopColor: "var(--secondary-color,#c92a2a)",
                                            }}
                                        />
                                        <span
                                            className="relative text-3xl font-black leading-none"
                                            style={{ color: "var(--primary-color,#e8590c)" }}
                                        >
                                            {num}
                                        </span>
                                    </div>

                                    <div className="min-w-0 flex-1 flex flex-col leading-relaxed">
                                        <span
                                            className="text-2xl font-bold leading-[1.3] break-words"
                                            style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item.heading}
                                        </span>
                                        {item.desc && (
                                            <span
                                                className="mt-1 text-sm leading-[1.7] break-words"
                                                style={{ color: "var(--background-text,#3b2412)", opacity: 0.62, overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
        </>
    )
}

export default TableOfContents
