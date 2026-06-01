import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'food-cn-quote'
export const layoutName = '客户证言'
export const layoutDescription = '美食餐饮风客户证言：暖米底 + 焦糖金描边圆盘构图，大引号装饰承载食客好评，配头像或姓名首字圆形徽标与署名。纯 CSS/SVG 装饰，无头像时自动用首字徽标，离线可渲染。'

const schema = z.object({
    quote: z.string().min(2).max(60).default('一筷子下去，是记忆里外婆灶台的味道，温暖又踏实，让人忍不住想再来一碗。').meta({
        description: "食客证言/好评原文（中文，简短走心，不超过约60字）",
    }),
    authorName: z.string().min(2).max(14).default('陈思颖').meta({
        description: "证言人姓名",
    }),
    authorTitle: z.string().min(2).max(20).default('老饕食客 · 三年常客').meta({
        description: "证言人身份/头衔，如『美食博主』『资深食客』",
    }),
    avatar: ImageSchema.optional().meta({
        description: "证言人头像照片（可选）；留空时自动用姓名首字圆形徽标",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Quote: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const quote = slideData?.quote ?? '一筷子下去，是记忆里外婆灶台的味道，温暖又踏实，让人忍不住想再来一碗。'
    const authorName = slideData?.authorName ?? '陈思颖'
    const authorTitle = slideData?.authorTitle ?? '老饕食客 · 三年常客'
    const avatar = slideData?.avatar
    const hasAvatar = Boolean(avatar?.__image_url__)
    const initial = (authorName || '陈思颖').trim().slice(0, 1)

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
                {/* 背景装饰层：暖色光晕 + 焦糖金描边圆盘构图 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="foodQuoteGlow" cx="16%" cy="20%" r="58%">
                                <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="foodQuoteGlow2" cx="88%" cy="84%" r="54%">
                                <stop offset="0%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#foodQuoteGlow)" />
                        <rect width="1280" height="720" fill="url(#foodQuoteGlow2)" />
                        {/* 左下焦糖金同心圆盘描边（餐盘母题） */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle
                                key={`l-${i}`}
                                cx="150" cy="600" r={70 + i * 44}
                                fill="none"
                                stroke="var(--primary-color,#e8590c)"
                                strokeOpacity={0.16 - i * 0.026}
                                strokeWidth="2"
                            />
                        ))}
                        {/* 右上暖色块圆盘 + 虚线描边 */}
                        <circle cx="1140" cy="120" r="170" fill="var(--secondary-color,#c92a2a)" fillOpacity="0.06" />
                        <circle cx="1140" cy="120" r="112" fill="none" stroke="var(--secondary-color,#c92a2a)" strokeOpacity="0.14" strokeWidth="2" strokeDasharray="2 10" />
                    </svg>
                </div>

                {/* 顶部焦糖金细线 */}
                <div
                    className="absolute top-0 left-0 w-full"
                    style={{ height: '6px', background: "linear-gradient(90deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))" }}
                    aria-hidden="true"
                />

                {/* 右上实心圆盘 + 焦糖金双描边（餐盘装饰母题） */}
                <div
                    className="absolute"
                    style={{
                        top: '7%', right: '6%', width: '180px', height: '180px', borderRadius: '9999px',
                        background: "var(--card-color,#fffaf2)",
                        border: '2px solid var(--stroke,#f0e0cc)',
                        boxShadow: 'inset 0 0 0 9px rgba(232,89,12,0.10), 0 18px 40px -18px rgba(201,42,42,0.35)',
                    }}
                    aria-hidden="true"
                >
                    {/* 盘心暖色点 */}
                    <div
                        className="absolute"
                        style={{
                            top: '50%', left: '50%', width: '66px', height: '66px', transform: 'translate(-50%,-50%)',
                            borderRadius: '9999px',
                            background: "var(--primary-color,#e8590c)", opacity: 0.14,
                        }}
                    />
                </div>

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-20 py-16">
                    {/* 装饰大引号 */}
                    <span
                        className="leading-none"
                        style={{
                            fontSize: '150px',
                            lineHeight: 1,
                            fontWeight: 900,
                            color: "var(--primary-color,#e8590c)",
                            opacity: 0.9,
                            marginBottom: '-32px',
                        }}
                        aria-hidden="true"
                    >
                        &ldquo;
                    </span>

                    {/* 引言正文 */}
                    <blockquote
                        className="max-w-[52rem] text-5xl font-bold leading-[1.55] break-words"
                        style={{
                            color: "var(--background-text,#3b2412)",
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                        }}
                    >
                        {quote}
                    </blockquote>

                    {/* 焦糖金分隔线 + 收尾引号 */}
                    <div className="mt-7 flex items-center gap-4">
                        <div
                            className="h-1.5 w-24 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))" }}
                        />
                        <span
                            className="leading-none"
                            style={{ fontSize: '38px', fontWeight: 900, color: "var(--secondary-color,#c92a2a)", opacity: 0.5 }}
                            aria-hidden="true"
                        >
                            &rdquo;
                        </span>
                    </div>

                    {/* 署名区：头像/首字徽标 + 姓名 + 头衔 */}
                    <div className="mt-9 flex items-center gap-4">
                        {hasAvatar ? (
                            <div
                                className="relative flex-shrink-0 overflow-hidden rounded-full"
                                style={{
                                    width: '60px', height: '60px',
                                    border: '3px solid var(--card-color,#fffaf2)',
                                    boxShadow: '0 0 0 2px var(--stroke,#f0e0cc), 0 8px 20px -8px rgba(201,42,42,0.4)',
                                }}
                            >
                                <img
                                    src={avatar?.__image_url__}
                                    alt={avatar?.__image_prompt__ ?? authorName}
                                    className="h-full w-full object-cover"
                                />
                                {/* 主题色渐变遮罩 */}
                                <div
                                    className="absolute inset-0"
                                    style={{ background: "linear-gradient(135deg, rgba(232,89,12,0.18), rgba(201,42,42,0.06))" }}
                                    aria-hidden="true"
                                />
                            </div>
                        ) : (
                            <div
                                className="flex flex-shrink-0 items-center justify-center rounded-full text-2xl font-black"
                                style={{
                                    width: '60px', height: '60px',
                                    background: "linear-gradient(135deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))",
                                    color: "var(--primary-text,#ffffff)",
                                    border: '3px solid var(--card-color,#fffaf2)',
                                    boxShadow: '0 0 0 2px var(--stroke,#f0e0cc), 0 8px 20px -8px rgba(201,42,42,0.4)',
                                }}
                            >
                                {initial}
                            </div>
                        )}

                        <div className="flex flex-col leading-relaxed">
                            <span
                                className="text-xl font-bold break-words"
                                style={{
                                    color: "var(--background-text,#3b2412)",
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {authorName}
                            </span>
                            <span
                                className="text-base font-medium break-words"
                                style={{
                                    color: "var(--primary-color,#e8590c)",
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {authorTitle}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Quote
