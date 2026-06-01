import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'gov-cn-quote'
export const layoutName = '客户证言'
export const layoutDescription = '党政政务风证言页：米白底配中国红与烫金细线，居中对称的烫金大引号引出一句证言，下方对称署名区含姓名、职务与头像；无头像时以姓名首字烫金圆形徽标替代。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    quote: z.string().min(2).max(60).default('这套机制让政务服务真正实现了一次办好，群众办事更省心、更高效，获得感实实在在。').meta({
        description: "证言/引言正文（一句有力的话，建议不超过36个汉字）",
    }),
    authorName: z.string().min(2).max(14).default('王志远').meta({
        description: "证言人姓名",
    }),
    authorTitle: z.string().min(2).max(20).default('某某市政务服务中心主任').meta({
        description: "证言人职务或头衔",
    }),
    avatar: ImageSchema.optional().meta({
        description: "证言人头像照片（可选，留空时显示姓名首字烫金圆形徽标）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Quote: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const quote = slideData?.quote || '这套机制让政务服务真正实现了一次办好，群众办事更省心、更高效，获得感实实在在。'
    const authorName = slideData?.authorName || '王志远'
    const authorTitle = slideData?.authorTitle || '某某市政务服务中心主任'
    const avatar = slideData?.avatar
    const initial = (authorName || '王').trim().slice(0, 1)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#faf7f2)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：对称华表纹样 + 烫金光晕 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="govQuoteHalo" cx="50%" cy="32%" r="58%">
                                <stop offset="0%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="govQuoteRedTop" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#c1121f)" stopOpacity="1" />
                                <stop offset="100%" stopColor="var(--primary-color,#c1121f)" stopOpacity="0.8" />
                            </linearGradient>
                        </defs>
                        {/* 顶部中国红色带 */}
                        <rect x="0" y="0" width="1280" height="12" fill="url(#govQuoteRedTop)" />
                        {/* 烫金光晕 */}
                        <rect x="0" y="0" width="1280" height="720" fill="url(#govQuoteHalo)" />
                        {/* 左右对称同心圆纹样（华表纹样意象） */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={`l${i}`} cx="90" cy="640" r={70 + i * 60} fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity={0.07} strokeWidth="1.2" />
                        ))}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={`r${i}`} cx="1190" cy="640" r={70 + i * 60} fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity={0.07} strokeWidth="1.2" />
                        ))}
                    </svg>
                </div>

                {/* 四角烫金细线角标（对称） */}
                <div className="absolute left-8 top-8 h-11 w-11 border-l-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.65 }} aria-hidden="true" />
                <div className="absolute right-8 top-8 h-11 w-11 border-r-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.65 }} aria-hidden="true" />
                <div className="absolute bottom-8 left-8 h-11 w-11 border-b-2 border-l-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.65 }} aria-hidden="true" />
                <div className="absolute bottom-8 right-8 h-11 w-11 border-b-2 border-r-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.65 }} aria-hidden="true" />

                {/* 主内容：居中对称 */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-24 py-16 text-center">
                    {/* 顶部五角星 + 烫金细线 */}
                    <div className="mb-6 flex items-center justify-center gap-4" aria-hidden="true">
                        <span className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, var(--secondary-color,#b8860b))" }} />
                        <svg viewBox="0 0 24 24" className="h-5 w-5">
                            <path
                                d="M12 2l2.94 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21.02 7 14.14l-5-4.87 7.06-1.01L12 2z"
                                fill="var(--primary-color,#c1121f)"
                            />
                        </svg>
                        <span className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, var(--secondary-color,#b8860b))" }} />
                    </div>

                    {/* 烫金大开引号 */}
                    <div
                        className="leading-none"
                        style={{ color: "var(--secondary-color,#b8860b)", fontSize: '112px', opacity: 0.5, marginBottom: '-28px' }}
                        aria-hidden="true"
                    >
                        “
                    </div>

                    {/* 证言正文 */}
                    <blockquote
                        className="max-w-[52rem] text-4xl font-bold leading-[1.6] break-words"
                        style={{
                            color: "var(--background-text,#1a1a1a)",
                            letterSpacing: '0.02em',
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {quote}
                    </blockquote>

                    {/* 烫金对称分隔线 + 中心星 */}
                    <div className="my-8 flex items-center justify-center gap-4" aria-hidden="true">
                        <span className="h-0.5 w-24 rounded-full" style={{ background: "linear-gradient(90deg, transparent, var(--secondary-color,#b8860b))" }} />
                        <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path
                                d="M12 2l2.94 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21.02 7 14.14l-5-4.87 7.06-1.01L12 2z"
                                fill="var(--secondary-color,#b8860b)"
                            />
                        </svg>
                        <span className="h-0.5 w-24 rounded-full" style={{ background: "linear-gradient(90deg, var(--secondary-color,#b8860b), transparent)" }} />
                    </div>

                    {/* 署名区：头像 / 首字徽标 + 姓名 + 职务 */}
                    <div className="flex items-center justify-center gap-5">
                        {/* 头像或姓名首字烫金圆形徽标 */}
                        <div
                            className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full"
                            style={{
                                background: "var(--primary-color,#c1121f)",
                                border: "2px solid var(--secondary-color,#b8860b)",
                                boxShadow: "0 0 0 4px rgba(184,134,11,0.14)",
                            }}
                        >
                            {avatar?.__image_url__ ? (
                                <div className="relative h-full w-full">
                                    <img
                                        src={avatar.__image_url__}
                                        alt={avatar.__image_prompt__ || authorName}
                                        className="h-full w-full object-cover"
                                    />
                                    {/* 主题色渐变遮罩 */}
                                    <div
                                        className="absolute inset-0"
                                        style={{ background: "linear-gradient(160deg, rgba(193,18,31,0.18), rgba(184,134,11,0.22))" }}
                                        aria-hidden="true"
                                    />
                                </div>
                            ) : (
                                <span
                                    className="text-2xl font-black break-words"
                                    style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {initial}
                                </span>
                            )}
                        </div>

                        {/* 姓名 + 职务 */}
                        <div className="flex flex-col items-start text-left leading-relaxed">
                            <span
                                className="text-xl font-bold break-words"
                                style={{ color: "var(--primary-color,#c1121f)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {authorName}
                            </span>
                            <span
                                className="mt-1 text-base leading-relaxed break-words"
                                style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.8, overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
