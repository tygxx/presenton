import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'education-cn-quote'
export const layoutName = '客户证言'
export const layoutDescription = '教育培训风客户证言页：明亮米白底 + 活力橙蓝圆角卡片，书本、灯泡、成长曲线与圆点装饰母题，大引号衬托引言，署名含姓名与头衔。无头像时用姓名首字圆形徽标。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    quote: z.string().min(6).max(60).default('在启明的课堂上，孩子第一次主动追问『为什么』，那种被点亮的眼神，是我们最想看到的成长。').meta({
        description: "学员/家长证言正文（中文，一句话有力表达，贴合教育培训）",
    }),
    authorName: z.string().min(2).max(14).default('赵欣然').meta({
        description: "证言人姓名（如学员家长、毕业学员、合作校长）",
    }),
    authorTitle: z.string().min(2).max(20).default('六年级学员家长 · 启明成长营').meta({
        description: "证言人头衔与所属（如学员家长、毕业学员、合作机构）",
    }),
    avatar: ImageSchema.optional().meta({
        description: "证言人头像照片（可选，留空则用姓名首字圆形徽标）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Quote: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const quote = slideData?.quote || '在启明的课堂上，孩子第一次主动追问『为什么』，那种被点亮的眼神，是我们最想看到的成长。'
    const authorName = slideData?.authorName || '赵欣然'
    const authorTitle = slideData?.authorTitle || '六年级学员家长 · 启明成长营'
    const avatar = slideData?.avatar
    const avatarUrl = avatar?.__image_url__
    const initial = (authorName || '赵欣然').trim().slice(0, 1)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#fffdf7)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：柔和光晕 + 圆点网格 + 成长曲线 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="eduQuoteGlowBlue" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.14" />
                                <stop offset="100%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="eduQuoteGlowOrange" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="eduQuoteCurve" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.5" />
                            </linearGradient>
                            <linearGradient id="eduQuoteMark" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#2563eb)" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" />
                            </linearGradient>
                        </defs>
                        {/* 左上蓝色光晕 */}
                        <circle cx="140" cy="110" r="240" fill="url(#eduQuoteGlowBlue)" />
                        {/* 右下橙色光晕 */}
                        <circle cx="1160" cy="650" r="300" fill="url(#eduQuoteGlowOrange)" />
                        {/* 右上圆点装饰网格 */}
                        {[0, 1, 2, 3].map((row) =>
                            [0, 1, 2, 3, 4].map((col) => (
                                <circle
                                    key={`dot-${row}-${col}`}
                                    cx={1010 + col * 46}
                                    cy={66 + row * 44}
                                    r="3.5"
                                    fill="var(--secondary-color,#f97316)"
                                    fillOpacity="0.28"
                                />
                            ))
                        )}
                        {/* 底部成长曲线（向上的进阶曲线） */}
                        <path
                            d="M90 660 C 340 620, 520 580, 700 480 S 1040 280, 1210 210"
                            fill="none"
                            stroke="url(#eduQuoteCurve)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray="2 14"
                        />
                    </svg>
                </div>

                {/* 右侧灯泡 + 书本 SVG 母题装饰面板 */}
                <div className="absolute right-0 top-0 z-0 flex h-full w-[34%] items-center justify-center overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 320 360" className="h-[70%] w-[70%]" preserveAspectRatio="xMidYMid meet">
                        {/* 灯泡光晕环 */}
                        {[0, 1, 2].map((i) => (
                            <circle
                                key={`ring-${i}`}
                                cx="160"
                                cy="140"
                                r={104 + i * 28}
                                fill="none"
                                stroke="var(--secondary-color,#f97316)"
                                strokeOpacity={0.12 - i * 0.03}
                                strokeWidth="2"
                            />
                        ))}
                        {/* 灯泡发散光线 */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                            const rad = (deg * Math.PI) / 180
                            const x1 = 160 + Math.cos(rad) * 88
                            const y1 = 140 + Math.sin(rad) * 88
                            const x2 = 160 + Math.cos(rad) * 110
                            const y2 = 140 + Math.sin(rad) * 110
                            return (
                                <line
                                    key={`ray-${deg}`}
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke="var(--secondary-color,#f97316)"
                                    strokeOpacity="0.40"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                            )
                        })}
                        {/* 灯泡玻璃球 */}
                        <circle cx="160" cy="140" r="64" fill="var(--card-color,#ffffff)" stroke="var(--secondary-color,#f97316)" strokeWidth="6" />
                        {/* 灯泡内成长曲线（创意/启发） */}
                        <path d="M134 166 C 144 140, 178 140, 188 114" fill="none" stroke="var(--primary-color,#2563eb)" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="188" cy="114" r="7" fill="var(--primary-color,#2563eb)" />
                        {/* 灯泡螺口 */}
                        <rect x="140" y="206" width="40" height="13" rx="6" fill="var(--primary-color,#2563eb)" />
                        <rect x="146" y="223" width="28" height="9" rx="5" fill="var(--primary-color,#2563eb)" opacity="0.7" />
                        {/* 书本母题 */}
                        <g transform="translate(86 252)">
                            <rect x="0" y="6" width="148" height="58" rx="10" fill="var(--primary-color,#2563eb)" />
                            <rect x="8" y="0" width="64" height="54" rx="8" fill="var(--card-color,#ffffff)" stroke="var(--primary-color,#2563eb)" strokeWidth="4" />
                            <rect x="76" y="0" width="64" height="54" rx="8" fill="var(--card-color,#ffffff)" stroke="var(--primary-color,#2563eb)" strokeWidth="4" />
                            <line x1="74" y1="6" x2="74" y2="50" stroke="var(--secondary-color,#f97316)" strokeWidth="4" strokeLinecap="round" />
                            <line x1="18" y1="16" x2="62" y2="16" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.7" strokeWidth="4" strokeLinecap="round" />
                            <line x1="18" y1="30" x2="54" y2="30" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
                            <line x1="86" y1="16" x2="130" y2="16" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.7" strokeWidth="4" strokeLinecap="round" />
                            <line x1="86" y1="30" x2="122" y2="30" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
                        </g>
                    </svg>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full w-[66%] flex-col justify-center pl-16 pr-8 py-14 gap-7">
                    {/* 大引号装饰 + 标签 */}
                    <div className="flex items-center gap-5">
                        <span
                            className="select-none"
                            style={{
                                fontFamily: "Georgia, 'Times New Roman', serif",
                                fontSize: '110px',
                                fontWeight: 700,
                                lineHeight: 0.8,
                                background: 'linear-gradient(135deg, var(--primary-color,#2563eb), var(--secondary-color,#f97316))',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: 'var(--primary-color,#2563eb)',
                            }}
                            aria-hidden="true"
                        >
                            &ldquo;
                        </span>
                        <span
                            className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold leading-relaxed break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.12)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                style={{ background: "var(--secondary-color,#f97316)" }}
                            />
                            学员心声
                        </span>
                    </div>

                    {/* 引言正文 */}
                    <blockquote
                        className="max-w-[42rem] text-4xl font-bold leading-[1.5] break-words"
                        style={{
                            color: "var(--background-text,#1f2937)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {quote}
                    </blockquote>

                    {/* 双色成长分隔线 */}
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <div className="h-1.5 w-8 rounded-full" style={{ background: "var(--primary-color,#2563eb)" }} />
                        <div className="h-1.5 w-3 rounded-full" style={{ background: "var(--primary-color,#2563eb)", opacity: 0.5 }} />
                    </div>

                    {/* 署名：圆角友好卡片 */}
                    <div
                        className="flex w-fit items-center gap-5 rounded-2xl border px-6 py-4"
                        style={{
                            background: "var(--card-color,#ffffff)",
                            borderColor: "var(--stroke,#f1e9d8)",
                            boxShadow: '0 14px 36px -22px rgba(37,99,235,0.45)',
                        }}
                    >
                        {/* 头像 / 首字徽标 */}
                        {avatarUrl ? (
                            <div
                                className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full"
                                style={{ boxShadow: '0 0 0 2px rgba(249,115,22,0.40)' }}
                            >
                                <img src={avatarUrl} alt={avatar?.__image_prompt__ || '证言人头像'} className="h-full w-full object-cover" />
                                <div
                                    className="absolute inset-0"
                                    style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.28), rgba(249,115,22,0.28))' }}
                                />
                            </div>
                        ) : (
                            <div
                                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-2xl font-black break-words"
                                style={{
                                    background: 'linear-gradient(135deg, var(--primary-color,#2563eb), var(--secondary-color,#f97316))',
                                    color: "var(--primary-text,#ffffff)",
                                    boxShadow: '0 8px 22px -8px rgba(37,99,235,0.6)',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {initial}
                            </div>
                        )}

                        <div className="flex flex-col gap-1 leading-relaxed">
                            <span
                                className="text-lg font-bold break-words"
                                style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {authorName}
                            </span>
                            <span
                                className="text-sm leading-relaxed break-words"
                                style={{ color: "var(--background-text,#1f2937)", opacity: 0.62, overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
