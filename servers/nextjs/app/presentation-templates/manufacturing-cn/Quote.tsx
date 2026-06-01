import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'manufacturing-cn-quote'
export const layoutName = '客户证言'
export const layoutDescription = '智能制造风客户证言：工业深灰底 + 蓝橙强调，精密网格与齿轮装饰，大引号衬托引言，底部署名带头像或姓名首字徽标。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    quote: z.string().min(8).max(60).default('引入智能产线后，关键工序良率提升至 99.6%，交付周期缩短近四成，真正实现了精益可靠的规模化生产。').meta({
        description: "客户证言引言正文（中文，简短有力，建议不超过 60 字）",
    }),
    authorName: z.string().min(2).max(14).default('陈志远').meta({
        description: "证言人姓名",
    }),
    authorTitle: z.string().min(2).max(20).default('华擎精密制造 · 生产总监').meta({
        description: "证言人头衔/公司职务",
    }),
    avatar: ImageSchema.optional().meta({
        description: "证言人头像照片（可选，留空时显示姓名首字圆形徽标）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Quote: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const quote = slideData?.quote || '引入智能产线后，关键工序良率提升至 99.6%，交付周期缩短近四成，真正实现了精益可靠的规模化生产。'
    const authorName = slideData?.authorName || '陈志远'
    const authorTitle = slideData?.authorTitle || '华擎精密制造 · 生产总监'
    const avatar = slideData?.avatar
    const initial = (authorName || '陈').trim().slice(0, 1)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#1f2937)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：精密网格 + 齿轮 + 硬朗金属线条 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            {/* 精密网格 */}
                            <pattern id="mfgQuoteGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.55" strokeWidth="1" />
                            </pattern>
                            <linearGradient id="mfgQuoteFade" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--card-color,#111827)" stopOpacity="0.0" />
                                <stop offset="100%" stopColor="var(--card-color,#111827)" stopOpacity="0.85" />
                            </linearGradient>
                            <linearGradient id="mfgQuoteAccent" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#mfgQuoteGrid)" />
                        <rect width="1280" height="720" fill="url(#mfgQuoteFade)" />
                        {/* 右上角齿轮母题 */}
                        <g transform="translate(1090 130)" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.16">
                            <circle r="150" strokeWidth="2" />
                            <circle r="96" strokeWidth="2" />
                            <circle r="40" strokeWidth="2" />
                            {Array.from({ length: 16 }).map((_, i) => {
                                const a = (i * Math.PI) / 8
                                return (
                                    <line
                                        key={i}
                                        x1={Math.cos(a) * 150}
                                        y1={Math.sin(a) * 150}
                                        x2={Math.cos(a) * 180}
                                        y2={Math.sin(a) * 180}
                                        strokeWidth="3"
                                    />
                                )
                            })}
                        </g>
                        {/* 左下角齿轮母题 */}
                        <g transform="translate(120 660)" fill="none" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.14">
                            <circle r="90" strokeWidth="2" />
                            <circle r="52" strokeWidth="2" />
                            {Array.from({ length: 12 }).map((_, i) => {
                                const a = (i * Math.PI) / 6
                                return (
                                    <line
                                        key={i}
                                        x1={Math.cos(a) * 90}
                                        y1={Math.sin(a) * 90}
                                        x2={Math.cos(a) * 112}
                                        y2={Math.sin(a) * 112}
                                        strokeWidth="3"
                                    />
                                )
                            })}
                        </g>
                        {/* 硬朗产线/金属斜线 */}
                        <line x1="0" y1="180" x2="360" y2="180" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.20" strokeWidth="2" />
                        <line x1="0" y1="190" x2="280" y2="190" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.18" strokeWidth="2" />
                    </svg>
                </div>

                {/* 顶部金属强调条 */}
                <div
                    className="absolute top-0 left-0 h-1 w-full"
                    style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#f97316))" }}
                />

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-20 py-16">
                    {/* 标签 */}
                    <span
                        className="mb-7 inline-flex w-fit items-center gap-2 rounded-sm px-4 py-1.5 text-sm font-semibold tracking-wide break-words"
                        style={{
                            color: "var(--secondary-color,#f97316)",
                            background: "rgba(249,115,22,0.12)",
                            border: "1px solid var(--stroke,#374151)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <span className="inline-block h-2 w-2 rounded-sm" style={{ background: "var(--secondary-color,#f97316)" }} />
                        客户证言
                    </span>

                    {/* 引言区：大引号 + 正文 */}
                    <div className="flex items-start gap-6">
                        {/* 大引号装饰 */}
                        <span
                            className="flex-shrink-0 font-black leading-none select-none"
                            style={{
                                fontSize: '7rem',
                                lineHeight: 0.8,
                                color: "var(--primary-color,#3b82f6)",
                                opacity: 0.85,
                            }}
                            aria-hidden="true"
                        >
                            “
                        </span>
                        <p
                            className="max-w-[52rem] text-4xl font-bold leading-[1.45] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {quote}
                        </p>
                    </div>

                    {/* 分隔线 */}
                    <div className="mt-10 flex items-center gap-4">
                        <div className="h-0.5 w-16 rounded-sm" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <div className="h-px flex-1 rounded-sm" style={{ background: "var(--stroke,#374151)" }} />
                    </div>

                    {/* 署名区 */}
                    <div className="mt-7 flex items-center gap-5">
                        {avatar?.__image_url__ ? (
                            <div
                                className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full"
                                style={{ border: "2px solid var(--primary-color,#3b82f6)" }}
                            >
                                <img
                                    src={avatar.__image_url__}
                                    alt={avatar.__image_prompt__ || authorName}
                                    className="h-full w-full object-cover"
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.28), rgba(249,115,22,0.22))" }}
                                />
                            </div>
                        ) : (
                            <div
                                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-2xl font-black"
                                style={{
                                    background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#f97316))",
                                    color: "var(--primary-text,#ffffff)",
                                    boxShadow: "0 0 0 4px rgba(59,130,246,0.16)",
                                }}
                                aria-hidden="true"
                            >
                                {initial}
                            </div>
                        )}
                        <div className="flex flex-col gap-1 leading-relaxed">
                            <span
                                className="text-xl font-bold break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {authorName}
                            </span>
                            <span
                                className="text-sm leading-relaxed break-words"
                                style={{ color: "var(--background-text,#9ca3af)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
