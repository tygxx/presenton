import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'finance-cn-quote'
export const layoutName = '客户证言'
export const layoutDescription = '金融投资风客户证言页：深藏青底叠数据网格与增长曲线，香槟金大引号装饰，衬线大引言配署名。无头像时以姓名首字圆形金徽标兜底，纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    quote: z.string().min(4).max(60).default('与启元资本同行三年，他们用稳健的资产配置与透明的风控，让我们的长期回报真正可衡量。').meta({
        description: "客户引言/证言正文（中文，简短有力，一句话最佳）",
    }),
    authorName: z.string().min(2).max(14).default('陈思远').meta({
        description: "证言人姓名",
    }),
    authorTitle: z.string().min(2).max(20).default('鼎丰控股 首席财务官').meta({
        description: "证言人头衔/公司职务",
    }),
    avatar: ImageSchema.optional().meta({
        description: "证言人头像照片（可选，留空则用姓名首字金色圆形徽标）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Quote: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const quote = slideData?.quote || '与启元资本同行三年，他们用稳健的资产配置与透明的风控，让我们的长期回报真正可衡量。'
    const authorName = slideData?.authorName || '陈思远'
    const authorTitle = slideData?.authorTitle || '鼎丰控股 首席财务官'
    const avatarUrl = slideData?.avatar?.__image_url__
    const avatarPrompt = slideData?.avatar?.__image_prompt__ || '证言人专业肖像'
    const initial = (authorName || '陈').trim().slice(0, 1)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@500;600;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：数据网格 + 增长曲线 + 棱形 + 细金线（纯 SVG，离线可渲染） */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="finQuoteGoldLine" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.25" />
                        </linearGradient>
                        <linearGradient id="finQuoteCurveFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="finQuoteGlow" cx="0.82" cy="0.18" r="0.7">
                            <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.20" />
                            <stop offset="100%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0" />
                        </radialGradient>
                        <pattern id="finQuoteGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0 H0 V48" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.45" strokeWidth="1" />
                        </pattern>
                    </defs>

                    {/* 数据网格母题 */}
                    <rect width="1280" height="720" fill="url(#finQuoteGrid)" />
                    {/* 右上角蓝色光晕 */}
                    <rect width="1280" height="720" fill="url(#finQuoteGlow)" />

                    {/* 增长曲线母题：填充区 + 主线 */}
                    <path
                        d="M0 600 L160 560 L320 520 L480 440 L640 470 L800 380 L960 320 L1120 230 L1280 160 L1280 720 L0 720 Z"
                        fill="url(#finQuoteCurveFill)"
                    />
                    <path
                        d="M0 600 L160 560 L320 520 L480 440 L640 470 L800 380 L960 320 L1120 230 L1280 160"
                        fill="none"
                        stroke="url(#finQuoteGoldLine)"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                    />

                    {/* 细金线母题：右上斜线束 */}
                    <line x1="900" y1="-40" x2="1320" y2="240" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.18" strokeWidth="1.5" />
                    <line x1="980" y1="-40" x2="1340" y2="180" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.12" strokeWidth="1.5" />

                    {/* 棱形母题装饰 */}
                    <rect x="1112" y="120" width="22" height="22" fill="none" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.6" strokeWidth="1.5" transform="rotate(45 1123 131)" />
                    <rect x="1170" y="470" width="14" height="14" fill="var(--primary-color,#d4af37)" fillOpacity="0.5" transform="rotate(45 1177 477)" />
                    <rect x="80" y="120" width="16" height="16" fill="none" stroke="var(--secondary-color,#60a5fa)" strokeOpacity="0.5" strokeWidth="1.5" transform="rotate(45 88 128)" />
                </svg>

                {/* 顶部细金线条 */}
                <div
                    className="absolute top-0 left-0 h-1 w-full"
                    style={{ background: "linear-gradient(90deg, var(--primary-color,#d4af37) 0%, rgba(212,175,55,0.15) 60%, transparent 100%)" }}
                />

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-20 py-16">
                    {/* 大引号装饰 + 引言 */}
                    <div className="flex items-start gap-6">
                        <span
                            aria-hidden="true"
                            className="flex-shrink-0 select-none leading-none"
                            style={{
                                fontFamily: "var(--heading-font-family,'Noto Serif SC'), serif",
                                fontSize: '150px',
                                lineHeight: 0.8,
                                color: "var(--primary-color,#d4af37)",
                                marginTop: '-0.18em',
                            }}
                        >
                            “
                        </span>

                        <blockquote
                            className="break-words leading-[1.6]"
                            style={{
                                fontFamily: "var(--heading-font-family,'Noto Serif SC'), serif",
                                fontSize: '40px',
                                fontWeight: 600,
                                color: "var(--background-text,#e2e8f0)",
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {quote}
                        </blockquote>
                    </div>

                    {/* 细金分隔线 */}
                    <div className="mt-10 flex items-center gap-3 pl-24">
                        <span className="h-px w-14 rounded-full" style={{ background: "var(--primary-color,#d4af37)" }} />
                        <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: "var(--secondary-color,#60a5fa)", boxShadow: "0 0 0 4px rgba(96,165,250,0.18)" }}
                        />
                    </div>

                    {/* 署名区：头像 / 姓名首字徽标 + 姓名 + 头衔 */}
                    <div className="mt-8 flex items-center gap-5 pl-24">
                        {avatarUrl ? (
                            <div
                                className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full"
                                style={{ boxShadow: "0 0 0 2px var(--primary-color,#d4af37)" }}
                            >
                                <img
                                    src={avatarUrl}
                                    alt={avatarPrompt}
                                    className="h-full w-full object-cover"
                                />
                                {/* 主题色渐变遮罩 */}
                                <div
                                    className="absolute inset-0"
                                    style={{ background: "linear-gradient(135deg, rgba(15,23,42,0) 40%, rgba(212,175,55,0.35) 100%)" }}
                                />
                            </div>
                        ) : (
                            <div
                                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full"
                                style={{
                                    background: "linear-gradient(135deg, var(--primary-color,#d4af37) 0%, #b8902c 100%)",
                                    boxShadow: "0 0 0 2px rgba(212,175,55,0.35)",
                                    fontFamily: "var(--heading-font-family,'Noto Serif SC'), serif",
                                    fontSize: '26px',
                                    fontWeight: 700,
                                    color: "var(--background-color,#0f172a)",
                                }}
                            >
                                {initial}
                            </div>
                        )}

                        <div className="flex flex-col gap-1">
                            <span
                                className="break-words leading-relaxed"
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                    color: "var(--primary-text,#ffffff)",
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {authorName}
                            </span>
                            <span
                                className="break-words leading-relaxed"
                                style={{
                                    fontSize: '15px',
                                    color: "var(--primary-color,#d4af37)",
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
