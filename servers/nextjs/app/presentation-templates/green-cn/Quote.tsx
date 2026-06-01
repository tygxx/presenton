import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'green-cn-quote'
export const layoutName = '客户证言'
export const layoutDescription = '新能源环保风客户证言：清新白绿配色，大引号装饰 + 叶片/地球/能源自然曲线母题，左侧引言、右侧署名头像（无头像时用姓名首字圆形徽标）。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    quote: z.string().min(4).max(60).default('携手新能源方案后，园区年碳排放下降三成，绿色未来真正可见。').meta({
        description: "客户引言/证言原话（中文，简短有力，一两句）",
    }),
    authorName: z.string().min(2).max(14).default('林清和').meta({
        description: "证言人姓名",
    }),
    authorTitle: z.string().min(2).max(20).default('青屿能源 可持续发展总监').meta({
        description: "证言人职务与所属机构",
    }),
    avatar: ImageSchema.optional().meta({
        description: "证言人头像照片（可选，留空时显示姓名首字圆形徽标）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Quote: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const quote = slideData?.quote || '携手新能源方案后，园区年碳排放下降三成，绿色未来真正可见。'
    const authorName = slideData?.authorName || '林清和'
    const authorTitle = slideData?.authorTitle || '青屿能源 可持续发展总监'
    const avatarUrl = slideData?.avatar?.__image_url__
    const avatarPrompt = slideData?.avatar?.__image_prompt__ || '证言人专业头像照片，自然光，清新背景'
    const initial = (authorName || '林').trim().slice(0, 1)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f0fdf4)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景自然曲线 + 光晕装饰层 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="greenQuoteSky" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.04" />
                        </linearGradient>
                        <radialGradient id="greenQuoteGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#greenQuoteSky)" />
                    {/* 顶部天空蓝有机曲线 */}
                    <path
                        d="M0,90 C260,150 420,30 680,90 C940,150 1120,40 1280,100 L1280,0 L0,0 Z"
                        fill="#0891b2"
                        fillOpacity="0.07"
                    />
                    {/* 底部白绿自然丘陵曲线 */}
                    <path
                        d="M0,620 C220,560 460,690 720,620 C960,556 1120,690 1280,612 L1280,720 L0,720 Z"
                        fill="#16a34a"
                        fillOpacity="0.08"
                    />
                    <path
                        d="M0,665 C260,615 520,720 800,660 C1020,612 1160,710 1280,665 L1280,720 L0,720 Z"
                        fill="#16a34a"
                        fillOpacity="0.06"
                    />
                </svg>

                {/* 右上角能量光晕 */}
                <div
                    className="absolute"
                    style={{
                        top: '-140px', right: '-120px', width: '420px', height: '420px',
                        borderRadius: '9999px', background: 'radial-gradient(circle, rgba(8,145,178,0.16), rgba(8,145,178,0))',
                    }}
                    aria-hidden="true"
                />

                {/* 左下角叶片母题装饰 */}
                <svg
                    viewBox="0 0 220 220"
                    className="absolute"
                    style={{ left: '-30px', bottom: '-30px', width: '240px', height: '240px', opacity: 0.5 }}
                    aria-hidden="true"
                >
                    <g fill="none" stroke="#16a34a" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round">
                        <path d="M40 200 C40 110 100 50 190 40" />
                        <path d="M62 196 C72 150 118 104 168 92" />
                        <path d="M90 192 C104 162 138 134 172 126" />
                    </g>
                    <path
                        d="M190 40 C150 44 118 70 100 110 C140 110 176 84 190 40 Z"
                        fill="#16a34a"
                        fillOpacity="0.20"
                    />
                </svg>

                <div className="relative z-10 flex h-full px-16 py-14 gap-12">
                    {/* 左侧：大引号 + 引言 */}
                    <div className="flex flex-1 flex-col justify-center">
                        {/* 装饰大引号 */}
                        <div className="mb-4 flex items-center gap-4">
                            <span
                                className="font-black leading-none"
                                style={{ color: "var(--primary-color,#16a34a)", fontSize: '120px', lineHeight: '0.7' }}
                                aria-hidden="true"
                            >
                                &ldquo;
                            </span>
                            <span
                                className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium break-words"
                                style={{
                                    color: "var(--secondary-color,#0891b2)",
                                    background: "rgba(8,145,178,0.10)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                客户心声 · 绿色见证
                            </span>
                        </div>

                        <blockquote
                            className="text-4xl font-bold leading-[1.5] break-words"
                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {quote}
                        </blockquote>

                        <div
                            className="mt-8 h-1.5 w-24 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#16a34a), var(--secondary-color,#0891b2))" }}
                        />
                    </div>

                    {/* 右侧：署名卡片 */}
                    <div className="flex w-[34%] flex-shrink-0 flex-col justify-center">
                        <div
                            className="flex flex-col items-center gap-5 rounded-3xl border p-9 shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#d1fae5)" }}
                        >
                            {/* 头像 / 姓名首字徽标 */}
                            <div className="relative">
                                {avatarUrl ? (
                                    <div
                                        className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-full"
                                        style={{ boxShadow: '0 0 0 4px rgba(22,163,74,0.18)' }}
                                    >
                                        <img src={avatarUrl} alt={avatarPrompt} className="h-full w-full object-cover" />
                                        <div
                                            className="absolute inset-0 rounded-full"
                                            style={{ background: 'linear-gradient(135deg, rgba(22,163,74,0.18), rgba(8,145,178,0.18))' }}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full text-5xl font-black"
                                        style={{
                                            background: "linear-gradient(135deg, var(--primary-color,#16a34a), var(--secondary-color,#0891b2))",
                                            color: "var(--primary-text,#ffffff)",
                                            boxShadow: '0 0 0 4px rgba(22,163,74,0.16)',
                                        }}
                                    >
                                        {initial}
                                    </div>
                                )}
                                {/* 叶片小角标 */}
                                <div
                                    className="absolute flex items-center justify-center rounded-full"
                                    style={{
                                        right: '-6px', bottom: '-6px', width: '38px', height: '38px',
                                        background: "var(--card-color,#ffffff)",
                                        boxShadow: '0 2px 8px rgba(20,83,45,0.15)',
                                    }}
                                    aria-hidden="true"
                                >
                                    <svg viewBox="0 0 24 24" className="h-5 w-5">
                                        <path
                                            d="M5 19 C5 11 11 5 19 5 C19 13 13 19 5 19 Z"
                                            fill="var(--primary-color,#16a34a)"
                                            fillOpacity="0.9"
                                        />
                                        <path d="M8 16 C11 12 14 9 18 7" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <span
                                    className="text-xl font-bold leading-relaxed break-words"
                                    style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {authorName}
                                </span>
                                <span
                                    className="mt-1.5 text-sm leading-relaxed break-words"
                                    style={{ color: "var(--secondary-color,#0891b2)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {authorTitle}
                                </span>
                            </div>

                            {/* 地球/可持续小标识 */}
                            <div
                                className="mt-1 flex items-center gap-2 rounded-full px-4 py-1.5"
                                style={{ background: "rgba(22,163,74,0.08)" }}
                            >
                                <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" aria-hidden="true">
                                    <circle cx="12" cy="12" r="9" fill="none" stroke="var(--primary-color,#16a34a)" strokeWidth="1.6" />
                                    <path d="M3 12 H21 M12 3 C15 6 15 18 12 21 C9 18 9 6 12 3" fill="none" stroke="var(--primary-color,#16a34a)" strokeWidth="1.4" strokeOpacity="0.8" />
                                </svg>
                                <span
                                    className="text-xs font-medium break-words"
                                    style={{ color: "var(--primary-color,#16a34a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    可持续合作伙伴
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Quote
