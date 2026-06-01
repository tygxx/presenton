import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'culture-cn-quote'
export const layoutName = '客户证言'
export const layoutDescription = '国潮文创风证言页：宣纸米黄底 + 朱砂红印章 + 描金边 + 水墨笔触，大引号装饰引言，配署名与圆形头像/姓名首字徽标。纯 CSS/SVG 装饰，可叠图片，离线可渲染。'

const schema = z.object({
    quote: z.string().min(6).max(60).default('一器一物皆有匠心，国潮之美在于让古老纹样重新呼吸，焕新当代生活。').meta({
        description: "引言正文（中文，简短有力，建议不超过六十字）",
    }),
    authorName: z.string().min(2).max(14).default('沈墨白').meta({
        description: "证言人姓名",
    }),
    authorTitle: z.string().min(2).max(20).default('锦绣文创 创始人').meta({
        description: "证言人头衔/职务",
    }),
    avatar: ImageSchema.optional().meta({
        description: "证言人头像（可选，留空则用姓名首字圆形徽标）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Quote: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const quote = slideData?.quote || '一器一物皆有匠心，国潮之美在于让古老纹样重新呼吸，焕新当代生活。'
    const authorName = slideData?.authorName || '沈墨白'
    const authorTitle = slideData?.authorTitle || '锦绣文创 创始人'
    const avatarUrl = slideData?.avatar?.__image_url__
    const avatarPrompt = slideData?.avatar?.__image_prompt__ || '证言人头像'
    const initial = (authorName || '沈').trim().slice(0, 1)

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
                {/* 背景：宣纸纹理 + 水墨晕染 + 描金细纹 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="cultureQuotePaper" cx="28%" cy="24%" r="90%">
                                <stop offset="0%" stopColor="#fbf5e9" stopOpacity="0.9" />
                                <stop offset="60%" stopColor="#f5ecd9" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="cultureQuoteInk" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.06" />
                                <stop offset="70%" stopColor="#1a1a1a" stopOpacity="0.02" />
                                <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="cultureQuoteGold" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#bda05a" stopOpacity="0.0" />
                                <stop offset="50%" stopColor="#bda05a" stopOpacity="0.55" />
                                <stop offset="100%" stopColor="#bda05a" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#cultureQuotePaper)" />
                        {/* 右下水墨晕染 */}
                        <ellipse cx="1080" cy="640" rx="360" ry="240" fill="url(#cultureQuoteInk)" />
                        {/* 左上水墨笔触 */}
                        <path
                            d="M-40 120 C 180 60, 360 180, 520 120 C 620 84, 700 140, 760 110"
                            fill="none"
                            stroke="#1a1a1a"
                            strokeOpacity="0.06"
                            strokeWidth="36"
                            strokeLinecap="round"
                        />
                        {/* 传统回纹（描金细纹角饰，右上） */}
                        <g stroke="#bda05a" strokeOpacity="0.4" strokeWidth="2" fill="none">
                            <path d="M1140 60 h60 v60 h-44 v-44 h28 v28" />
                            <path d="M1090 60 v44 h-44" transform="translate(70 0)" opacity="0" />
                        </g>
                        {/* 描金分隔横线 */}
                        <rect x="96" y="560" width="520" height="2" fill="url(#cultureQuoteGold)" />
                    </svg>
                </div>

                {/* 顶部描金边 */}
                <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: "linear-gradient(90deg, transparent, var(--stroke,#ddd0b4), #bda05a, var(--stroke,#ddd0b4), transparent)" }}
                    aria-hidden="true"
                />

                {/* 右上角印章红块 + 留白 */}
                <div className="absolute top-10 right-12 z-10 flex flex-col items-center gap-3" aria-hidden="true">
                    <div
                        className="flex items-center justify-center"
                        style={{
                            width: '72px', height: '72px', borderRadius: '10px',
                            background: "var(--primary-color,#c0392b)",
                            boxShadow: '0 8px 22px rgba(192,57,43,0.28)',
                        }}
                    >
                        <span
                            className="text-3xl font-black leading-none"
                            style={{ color: "var(--primary-text,#ffffff)", fontFamily: "'Noto Serif SC', serif" }}
                        >
                            匠
                        </span>
                    </div>
                    <span className="text-xs font-medium" style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.55 }}>
                        国潮 · 文创
                    </span>
                </div>

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-24 py-16">
                    {/* 大引号装饰 */}
                    <div className="flex items-start">
                        <span
                            className="select-none leading-none"
                            style={{
                                fontFamily: "'Noto Serif SC', Georgia, serif",
                                fontSize: '150px',
                                color: "var(--primary-color,#c0392b)",
                                opacity: 0.85,
                                marginTop: '-32px',
                                marginRight: '8px',
                            }}
                            aria-hidden="true"
                        >
                            “
                        </span>
                    </div>

                    {/* 引言正文 */}
                    <blockquote
                        className="max-w-[44rem] text-4xl font-bold leading-[1.6] break-words"
                        style={{
                            color: "var(--secondary-color,#1a1a1a)",
                            marginTop: '-48px',
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {quote}
                    </blockquote>

                    {/* 描金短线分隔 */}
                    <div
                        className="mt-10 mb-8 h-0.5 w-28 rounded-full"
                        style={{ background: "linear-gradient(90deg, var(--primary-color,#c0392b), #bda05a)" }}
                        aria-hidden="true"
                    />

                    {/* 署名：头像/首字徽标 + 姓名 + 头衔 */}
                    <div className="flex items-center gap-5">
                        {avatarUrl ? (
                            <div
                                className="relative flex-shrink-0 overflow-hidden"
                                style={{
                                    width: '68px', height: '68px', borderRadius: '9999px',
                                    boxShadow: '0 0 0 3px var(--card-color,#fbf5e9), 0 0 0 5px var(--stroke,#ddd0b4)',
                                }}
                            >
                                <img src={avatarUrl} alt={avatarPrompt} className="h-full w-full object-cover" />
                                <div
                                    className="absolute inset-0"
                                    style={{ background: "linear-gradient(135deg, rgba(192,57,43,0.30), rgba(26,26,26,0.10))" }}
                                    aria-hidden="true"
                                />
                            </div>
                        ) : (
                            <div
                                className="flex flex-shrink-0 items-center justify-center"
                                style={{
                                    width: '68px', height: '68px', borderRadius: '9999px',
                                    background: "var(--primary-color,#c0392b)",
                                    color: "var(--primary-text,#ffffff)",
                                    boxShadow: '0 0 0 3px var(--card-color,#fbf5e9), 0 0 0 5px var(--stroke,#ddd0b4)',
                                }}
                            >
                                <span className="text-2xl font-black leading-none" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                                    {initial}
                                </span>
                            </div>
                        )}

                        <div className="flex flex-col gap-1 leading-relaxed">
                            <span
                                className="text-xl font-bold break-words"
                                style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {authorName}
                            </span>
                            <span
                                className="text-base break-words"
                                style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {authorTitle}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 左下竖排点缀 */}
                <div
                    className="absolute bottom-12 right-16 z-10 flex flex-col items-center gap-1 break-words"
                    style={{
                        writingMode: 'vertical-rl',
                        color: "var(--background-text,#2b2b2b)",
                        opacity: 0.4,
                        overflowWrap: 'break-word', wordBreak: 'break-word',
                    }}
                    aria-hidden="true"
                >
                    <span className="text-sm tracking-wide" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                        匠心传承 · 雅韵新生
                    </span>
                </div>
            </div>
        </>
    )
}

export default Quote
