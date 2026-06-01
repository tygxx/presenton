import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'tech-cn-quote'
export const layoutName = '客户证言'
export const layoutDescription = '科技风客户证言页：深色霓虹底 + 几何网格/电路线/光晕装饰，大引号衬托引言，左对齐排版，署名含姓名与头衔。无头像时用姓名首字圆形渐变徽标。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    quote: z.string().min(6).max(60).default('Presenton 把我们的提案制作周期从三天压缩到两小时，团队终于能把精力放回创意本身。').meta({
        description: "客户引言/证言正文（中文，一句话有力表达）",
    }),
    authorName: z.string().min(2).max(14).default('林雨桐').meta({
        description: "证言人姓名",
    }),
    authorTitle: z.string().min(2).max(20).default('云启科技 · 产品总监').meta({
        description: "证言人头衔与所属机构",
    }),
    avatar: ImageSchema.optional().meta({
        description: "证言人头像照片（可选，留空则用姓名首字圆形徽标）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Quote: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const quote = slideData?.quote || 'Presenton 把我们的提案制作周期从三天压缩到两小时，团队终于能把精力放回创意本身。'
    const authorName = slideData?.authorName || '林雨桐'
    const authorTitle = slideData?.authorTitle || '云启科技 · 产品总监'
    const avatar = slideData?.avatar
    const avatarUrl = avatar?.__image_url__
    const initial = (authorName || '林雨桐').trim().slice(0, 1)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0a0e1a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：几何网格 + 电路线 + 霓虹光晕 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="techQuoteGlow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
                            <stop offset="55%" stopColor="#8b5cf6" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="techQuoteBadge" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                        <radialGradient id="techQuoteHalo" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.30" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                        </radialGradient>
                        <pattern id="techQuoteGrid" width="44" height="44" patternUnits="userSpaceOnUse">
                            <path d="M44 0H0V44" fill="none" stroke="#3b82f6" strokeOpacity="0.07" strokeWidth="1" />
                        </pattern>
                    </defs>

                    {/* 几何网格铺底 */}
                    <rect width="1280" height="720" fill="url(#techQuoteGrid)" />
                    {/* 左上霓虹高光 */}
                    <rect width="1280" height="720" fill="url(#techQuoteGlow)" />
                    {/* 右下紫色光晕 */}
                    <circle cx="1180" cy="640" r="320" fill="url(#techQuoteHalo)" />

                    {/* 电路线母题 */}
                    <g stroke="#3b82f6" strokeOpacity="0.18" strokeWidth="1.5" fill="none">
                        <path d="M0 150 H180 L220 110 H360" />
                        <path d="M0 600 H120 L160 560 H300 L330 590 H470" />
                        <path d="M1280 240 H1120 L1080 200 H980" />
                    </g>
                    <g fill="#8b5cf6" fillOpacity="0.5">
                        <circle cx="360" cy="110" r="3.5" />
                        <circle cx="470" cy="590" r="3.5" />
                        <circle cx="980" cy="200" r="3.5" />
                    </g>
                    {/* 等宽数字点缀（科技感坐标标签） */}
                    <text x="48" y="60" fill="#3b82f6" fillOpacity="0.35" fontSize="13" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" letterSpacing="2">
                        99.2% · SATISFACTION
                    </text>
                </svg>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-20 py-14 gap-9">
                    {/* 大引号装饰 + 标签 */}
                    <div className="flex items-center gap-5">
                        <span
                            className="leading-none select-none"
                            style={{
                                fontFamily: "Georgia, 'Times New Roman', serif",
                                fontSize: '120px',
                                fontWeight: 700,
                                lineHeight: 0.8,
                                background: 'linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: 'var(--primary-color,#3b82f6)',
                            }}
                            aria-hidden="true"
                        >
                            &ldquo;
                        </span>
                        <span
                            className="inline-flex w-fit items-center rounded-full border px-4 py-1.5 text-sm font-medium tracking-wide break-words"
                            style={{
                                color: "var(--primary-color,#3b82f6)",
                                borderColor: "var(--stroke,#1f2937)",
                                background: "rgba(59,130,246,0.10)",
                                boxShadow: '0 0 0 1px rgba(139,92,246,0.12)',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            客户证言
                        </span>
                    </div>

                    {/* 引言正文 */}
                    <blockquote
                        className="max-w-[58rem] text-4xl font-bold leading-[1.45] break-words"
                        style={{
                            color: "var(--background-text,#e5e7eb)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {quote}
                    </blockquote>

                    {/* 霓虹分隔线 */}
                    <div
                        className="h-[3px] w-28 rounded-full"
                        style={{ background: 'linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))' }}
                    />

                    {/* 署名：半透明发光描边卡片 */}
                    <div
                        className="flex w-fit items-center gap-5 rounded-2xl border px-6 py-4"
                        style={{
                            background: "var(--card-color,#111827)",
                            borderColor: "var(--stroke,#1f2937)",
                            boxShadow: '0 0 0 1px rgba(59,130,246,0.10), 0 18px 40px -20px rgba(59,130,246,0.45)',
                        }}
                    >
                        {/* 头像 / 首字徽标 */}
                        {avatarUrl ? (
                            <div
                                className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full"
                                style={{ boxShadow: '0 0 0 2px rgba(139,92,246,0.45)' }}
                            >
                                <img src={avatarUrl} alt={avatar?.__image_prompt__ || '证言人头像'} className="h-full w-full object-cover" />
                                <div
                                    className="absolute inset-0"
                                    style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.30), rgba(139,92,246,0.30))' }}
                                />
                            </div>
                        ) : (
                            <div
                                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-2xl font-black"
                                style={{
                                    background: 'linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))',
                                    color: "var(--primary-text,#ffffff)",
                                    boxShadow: '0 0 0 2px rgba(139,92,246,0.35), 0 8px 24px -8px rgba(139,92,246,0.6)',
                                }}
                            >
                                {initial}
                            </div>
                        )}

                        <div className="flex flex-col gap-1 leading-relaxed">
                            <span
                                className="text-lg font-bold break-words"
                                style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {authorName}
                            </span>
                            <span
                                className="text-sm break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
