import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'retail-cn-quote'
export const layoutName = '客户证言'
export const layoutDescription = '电商新零售风客户证言：撞色大色块 + 圆角卡片 + 超大引号，引用一句客户好评，配署名/职务与头像（无头像用姓名首字圆形徽标）。潮流粗体、活力几何装饰，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    quote: z.string().min(6).max(60).default('换季上新当天就被抢空，复购率翻了一倍，这套新零售打法真的太香了！').meta({
        description: "客户证言/好评原文（中文，简短有冲击力，一句话）",
    }),
    authorName: z.string().min(2).max(14).default('林晓桐').meta({
        description: "证言者姓名",
    }),
    authorTitle: z.string().min(2).max(20).default('潮玩品牌「轻物集」主理人').meta({
        description: "证言者职务/身份/品牌",
    }),
    avatar: ImageSchema.optional().meta({
        description: "证言者头像（可选）；不提供时自动用姓名首字生成圆形徽标",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Quote: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const quote = slideData?.quote || '换季上新当天就被抢空，复购率翻了一倍，这套新零售打法真的太香了！'
    const authorName = slideData?.authorName || '林晓桐'
    const authorTitle = slideData?.authorTitle || '潮玩品牌「轻物集」主理人'
    const avatar = slideData?.avatar
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
                    background: "var(--background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景：撞色大色块 + 活力几何装饰层 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    {/* 右侧主色撞色大色块 */}
                    <div
                        className="absolute top-0 right-0 h-full w-[40%]"
                        style={{ background: "var(--primary-color,#db2777)" }}
                    >
                        <svg viewBox="0 0 460 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                            <defs>
                                <linearGradient id="retailQuoteGlow" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <rect width="460" height="720" fill="url(#retailQuoteGlow)" />
                            {/* 活力同心圆几何 */}
                            {[0, 1, 2, 3].map((i) => (
                                <circle key={i} cx="360" cy="540" r={70 + i * 70} fill="none" stroke="#ffffff" strokeOpacity={0.12} strokeWidth="2" />
                            ))}
                            {/* 斜向潮流线条 */}
                            <line x1="-40" y1="180" x2="380" y2="-120" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="2" />
                        </svg>
                    </div>
                    {/* 左下角撞色辅色块（活力几何形：斜切方块） */}
                    <div
                        className="absolute"
                        style={{
                            left: '-60px', bottom: '-60px', width: '220px', height: '220px',
                            borderRadius: '40px', transform: 'rotate(18deg)',
                            background: "var(--secondary-color,#f59e0b)", opacity: 0.16,
                        }}
                    />
                    {/* 左上辅色小圆点群 */}
                    <div
                        className="absolute"
                        style={{
                            top: '52px', left: '54px', width: '16px', height: '16px', borderRadius: '9999px',
                            background: "var(--secondary-color,#f59e0b)",
                            boxShadow: '0 0 0 6px rgba(245,158,11,0.16)',
                        }}
                    />
                </div>

                {/* 内容主体 */}
                <div className="relative z-10 flex h-full">
                    {/* 左侧：证言卡片区 */}
                    <div className="flex w-[60%] flex-col justify-center pl-16 pr-10 py-12">
                        {/* 价签风小标签 */}
                        <span
                            className="mb-7 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold break-words"
                            style={{
                                color: "var(--primary-color,#db2777)",
                                background: "var(--card-color,#fdf2f8)",
                                border: "1.5px solid var(--stroke,#fbcfe8)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2.5 w-2.5 rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            />
                            客户好评 · CUSTOMER VOICE
                        </span>

                        {/* 超大装饰引号 */}
                        <div
                            className="font-black leading-none break-words"
                            style={{
                                fontSize: '120px', lineHeight: '0.7',
                                color: "var(--secondary-color,#f59e0b)",
                                opacity: 0.9,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            “
                        </div>

                        {/* 引言正文 */}
                        <p
                            className="mt-2 text-4xl font-black leading-[1.35] break-words"
                            style={{
                                color: "var(--background-text,#18181b)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {quote}
                        </p>

                        {/* 撞色下划线条 */}
                        <div className="mt-8 flex items-center gap-2">
                            <div className="h-1.5 w-16 rounded-full" style={{ background: "var(--primary-color,#db2777)" }} />
                            <div className="h-1.5 w-6 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                        </div>

                        {/* 署名 */}
                        <div className="mt-8 flex items-center gap-4">
                            {avatar?.__image_url__ ? (
                                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full" style={{ border: "3px solid var(--primary-color,#db2777)" }}>
                                    <img
                                        src={avatar.__image_url__}
                                        alt={avatar.__image_prompt__ || authorName}
                                        className="h-full w-full object-cover"
                                    />
                                    {/* 主题色渐变遮罩 */}
                                    <div
                                        className="absolute inset-0"
                                        style={{ background: "linear-gradient(135deg, rgba(219,39,119,0.10), rgba(245,158,11,0.18))" }}
                                    />
                                </div>
                            ) : (
                                <div
                                    className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-2xl font-black"
                                    style={{
                                        background: "var(--primary-color,#db2777)",
                                        color: "var(--primary-text,#ffffff)",
                                        boxShadow: '0 0 0 4px rgba(245,158,11,0.20)',
                                    }}
                                >
                                    {initial}
                                </div>
                            )}
                            <div className="flex flex-col gap-1 leading-relaxed">
                                <span
                                    className="text-lg font-black break-words"
                                    style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {authorName}
                                </span>
                                <span
                                    className="text-sm font-medium leading-relaxed break-words"
                                    style={{ color: "var(--primary-color,#db2777)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {authorTitle}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 右侧色块内的装饰元素（价签 + 五星好评几何徽章） */}
                    <div className="relative flex w-[40%] flex-col items-center justify-center px-10">
                        {/* 圆角卡片：五星好评徽章 */}
                        <div
                            className="flex flex-col items-center gap-4 rounded-3xl px-8 py-10"
                            style={{
                                background: "rgba(255,255,255,0.14)",
                                border: "1.5px solid rgba(255,255,255,0.28)",
                            }}
                        >
                            {/* 五星 */}
                            <div className="flex items-center gap-1.5">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <svg key={i} viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                                        <path
                                            d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.5z"
                                            fill="var(--secondary-color,#f59e0b)"
                                        />
                                    </svg>
                                ))}
                            </div>
                            <span
                                className="text-5xl font-black leading-none"
                                style={{ color: "var(--primary-text,#ffffff)" }}
                            >
                                5.0
                            </span>
                            <span
                                className="text-sm font-medium break-words"
                                style={{ color: "rgba(255,255,255,0.85)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                超满意 · 强烈推荐
                            </span>
                        </div>

                        {/* 价签风装饰小卡（活力几何） */}
                        <div
                            className="absolute flex items-center gap-2 rounded-2xl px-4 py-2"
                            style={{
                                top: '14%', right: '8%',
                                background: "var(--secondary-color,#f59e0b)",
                                transform: 'rotate(-6deg)',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
                            }}
                        >
                            <span
                                className="text-base font-black break-words"
                                style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                复购 +100%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Quote
