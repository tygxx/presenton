import React from 'react'
import * as z from "zod";

export const layoutId = 'retail-cn-section-divider'
export const layoutName = '章节分隔'
export const layoutDescription = '电商新零售风章节过渡页：超大节号作为装饰主体，撞色大色块 + 圆角卡片 + 价签母题 + 潮流粗体排版。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    sectionNumber: z.string().min(1).max(4).default('02').meta({
        description: "章节序号，如『02』，作为超大装饰主体",
    }),
    title: z.string().min(2).max(18).default('爆款选品策略').meta({
        description: "章节标题（中文，简短有力）",
    }),
    subtitle: z.string().min(2).max(36).default('从流量到成交，打造高转化的商品矩阵').meta({
        description: "章节副标题，一句话补充说明（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const SectionDivider: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const sectionNumber = slideData?.sectionNumber || '02'
    const title = slideData?.title || '爆款选品策略'
    const subtitle = slideData?.subtitle || '从流量到成交，打造高转化的商品矩阵'

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
                {/* 背景撞色大色块 + 活力几何形（装饰层，absolute 仅限背景） */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    {/* 左下撞色斜切大色块 */}
                    <div
                        className="absolute -bottom-24 -left-24 h-[120%] w-[46%]"
                        style={{
                            background: "linear-gradient(135deg, var(--primary-color,#db2777) 0%, var(--secondary-color,#f59e0b) 130%)",
                            transform: 'skewX(-10deg)',
                            transformOrigin: 'bottom left',
                        }}
                    />
                    {/* 右上活力几何圆点阵 + 撞色块 */}
                    <svg viewBox="0 0 600 720" className="absolute right-0 top-0 h-full w-[52%]" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="retailDivGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <rect width="600" height="720" fill="url(#retailDivGlow)" />
                        {[0, 1, 2, 3].map((row) => (
                            [0, 1, 2, 3, 4].map((col) => (
                                <circle
                                    key={`${row}-${col}`}
                                    cx={420 + col * 38}
                                    cy={92 + row * 38}
                                    r="4.5"
                                    fill="var(--primary-color,#db2777)"
                                    fillOpacity="0.22"
                                />
                            ))
                        ))}
                    </svg>
                    {/* 右下撞色小色块 */}
                    <div
                        className="absolute bottom-12 right-16 h-16 w-16 rounded-2xl"
                        style={{ background: "var(--secondary-color,#f59e0b)", opacity: 0.9 }}
                    />
                    {/* 价签描边几何（细节母题） */}
                    <div
                        className="absolute right-44 top-24 h-10 w-10 rounded-lg"
                        style={{ border: "3px solid var(--secondary-color,#f59e0b)", opacity: 0.5 }}
                    />
                </div>

                {/* 内容主体 */}
                <div className="relative z-10 flex h-full items-stretch">
                    {/* 左侧：超大节号（装饰主体，叠在撞色块上） */}
                    <div className="flex w-[46%] flex-shrink-0 flex-col justify-center pl-16 pr-6">
                        <span
                            className="mb-3 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-bold leading-relaxed break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                background: "rgba(255,255,255,0.18)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            CHAPTER
                        </span>
                        <span
                            className="font-black leading-[1.0] break-words"
                            style={{
                                fontSize: '15rem',
                                color: "var(--primary-text,#ffffff)",
                                textShadow: '0 8px 30px rgba(0,0,0,0.18)',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {sectionNumber}
                        </span>
                    </div>

                    {/* 右侧：圆角卡片承载标题 + 副标题（潮流排版） */}
                    <div className="flex flex-1 flex-col justify-center pr-16 pl-4">
                        <div
                            className="flex flex-col gap-5 rounded-3xl border p-10 shadow-sm"
                            style={{
                                background: "var(--card-color,#fdf2f8)",
                                borderColor: "var(--stroke,#fbcfe8)",
                            }}
                        >
                            {/* 价签条 */}
                            <div className="flex items-center gap-3">
                                <span
                                    className="inline-flex items-center rounded-md px-3 py-1 text-sm font-black leading-relaxed break-words"
                                    style={{
                                        background: "var(--primary-color,#db2777)",
                                        color: "var(--primary-text,#ffffff)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    新零售 · {sectionNumber}
                                </span>
                                <div className="h-1 flex-1 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                            </div>

                            <h1
                                className="text-6xl font-black leading-[1.2] break-words"
                                style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>

                            <div className="h-1.5 w-20 rounded-full" style={{ background: "var(--primary-color,#db2777)" }} />

                            <p
                                className="text-xl leading-[1.7] break-words"
                                style={{ color: "var(--background-text,#18181b)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {subtitle}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionDivider
