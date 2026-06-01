import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'business-cn-quote'
export const layoutName = '客户证言'
export const layoutDescription = '商务风客户证言页：大引号装饰 + 引言金句 + 署名（姓名/职务/头像）。无头像时用姓名首字圆形徽标。深蓝几何面板 + 橙色强调点，纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    quote: z.string().min(4).max(60).default('与启元合作的三年里，他们用专业和稳健帮助我们把营收翻了一倍。').meta({
        description: "客户证言金句（中文，简短有力，一句话）",
    }),
    authorName: z.string().min(2).max(14).default('李文涛').meta({
        description: "证言人姓名",
    }),
    authorTitle: z.string().min(2).max(20).default('鼎峰集团 · 首席执行官').meta({
        description: "证言人职务/所属（公司 · 职位）",
    }),
    avatar: ImageSchema.optional().meta({
        description: "证言人头像（可选）。留空则用姓名首字圆形徽标。",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Quote: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const quote = slideData?.quote || '与启元合作的三年里，他们用专业和稳健帮助我们把营收翻了一倍。'
    const authorName = slideData?.authorName || '李文涛'
    const authorTitle = slideData?.authorTitle || '鼎峰集团 · 首席执行官'
    const avatarUrl = slideData?.avatar?.__image_url__
    const avatarPrompt = slideData?.avatar?.__image_prompt__ || '企业高管职业头像'
    const initial = (authorName || '李').trim().slice(0, 1)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f8fafc)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景：稳健网格 + 几何面板 + 橙色强调 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="bizQuoteGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0 L0 0 0 48" fill="none" stroke="var(--primary-color,#1e3a8a)" strokeOpacity="0.05" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="bizQuotePanel" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#bizQuoteGrid)" />
                </svg>

                {/* 底部深蓝几何面板（角标装饰） */}
                <div
                    className="absolute bottom-0 left-0 h-[34%] w-full overflow-hidden"
                    style={{ background: "var(--primary-color,#1e3a8a)" }}
                >
                    <svg viewBox="0 0 1280 245" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                        <rect width="1280" height="245" fill="url(#bizQuotePanel)" />
                        {[0, 1, 2, 3, 4].map((i) => (
                            <circle key={i} cx="1160" cy="60" r={50 + i * 46} fill="none" stroke="#ffffff" strokeOpacity={0.08} strokeWidth="1.5" />
                        ))}
                        <line x1="120" y1="245" x2="420" y2="-20" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1.5" />
                    </svg>
                </div>

                {/* 顶部橙色强调条 */}
                <div
                    className="absolute top-0 left-0 h-1.5 w-full"
                    style={{ background: "var(--secondary-color,#f97316)" }}
                />

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-20 py-14">
                    {/* 大引号装饰 */}
                    <div
                        className="select-none font-black leading-none"
                        style={{
                            color: "var(--secondary-color,#f97316)",
                            fontSize: '120px',
                            lineHeight: '0.6',
                            opacity: 0.9,
                        }}
                        aria-hidden="true"
                    >
                        &ldquo;
                    </div>

                    {/* 引言金句 */}
                    <blockquote
                        className="mt-2 max-w-[58rem] text-4xl font-bold leading-[1.5] break-words"
                        style={{
                            color: "var(--background-text,#0f172a)",
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                        }}
                    >
                        {quote}
                    </blockquote>

                    {/* 橙色分隔线 */}
                    <div
                        className="mt-8 mb-7 h-1.5 w-24 rounded-full"
                        style={{ background: "var(--secondary-color,#f97316)" }}
                    />

                    {/* 署名：头像 / 首字徽标 + 姓名 + 职务 */}
                    <div className="flex items-center gap-5">
                        {avatarUrl ? (
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full" style={{ boxShadow: '0 0 0 3px var(--card-color,#ffffff), 0 0 0 5px var(--primary-color,#1e3a8a)' }}>
                                <img src={avatarUrl} alt={avatarPrompt} className="h-full w-full object-cover" />
                                <div
                                    className="absolute inset-0"
                                    style={{ background: "linear-gradient(135deg, rgba(30,58,138,0.28), rgba(249,115,22,0.18))" }}
                                />
                            </div>
                        ) : (
                            <div
                                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-2xl font-black"
                                style={{
                                    background: "var(--primary-color,#1e3a8a)",
                                    color: "var(--primary-text,#ffffff)",
                                    boxShadow: '0 0 0 3px var(--card-color,#ffffff), 0 0 0 5px rgba(249,115,22,0.35)',
                                }}
                                aria-hidden="true"
                            >
                                {initial}
                            </div>
                        )}

                        <div className="flex flex-col gap-1 leading-relaxed">
                            <span
                                className="text-xl font-bold break-words"
                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {authorName}
                            </span>
                            <span
                                className="text-base leading-relaxed break-words"
                                style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
