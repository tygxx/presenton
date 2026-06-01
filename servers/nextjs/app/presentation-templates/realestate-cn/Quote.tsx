import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'realestate-cn-quote'
export const layoutName = '客户证言'
export const layoutDescription = '房产建筑风客户证言页：超大金铜引号 + 业主评价引言 + 署名（姓名/职务/可选头像，无头像时用姓名首字圆形徽标）。高级灰留白配建筑剪影与细线分隔，纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    quote: z.string().min(6).max(60).default('从样板间到交付，每一处细节都看得见匠心，这份从容与质感，正是我们安家的理由。').meta({
        description: "客户/业主的证言引言（中文，简短有力，一句话）",
    }),
    authorName: z.string().min(2).max(14).default('陈思远').meta({
        description: "署名人姓名",
    }),
    authorTitle: z.string().min(2).max(20).default('云麓·叠院 业主代表').meta({
        description: "署名人职务或身份，如『业主代表』『置业顾问』",
    }),
    avatar: ImageSchema.optional().meta({
        description: "署名人头像（可选）。留空时自动使用姓名首字圆形徽标",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Quote: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const quote = slideData?.quote || '从样板间到交付，每一处细节都看得见匠心，这份从容与质感，正是我们安家的理由。'
    const authorName = slideData?.authorName || '陈思远'
    const authorTitle = slideData?.authorTitle || '云麓·叠院 业主代表'
    const avatarUrl = slideData?.avatar?.__image_url__
    const avatarPrompt = slideData?.avatar?.__image_prompt__
    const initial = (authorName || '陈').trim().charAt(0)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f4f4f5)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：建筑剪影 + 细线分隔 + 金铜点缀 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="reQuoteSky" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--background-color,#f4f4f5)" />
                                <stop offset="100%" stopColor="#e9e9eb" />
                            </linearGradient>
                            <linearGradient id="reQuoteGold" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0.85" />
                                <stop offset="100%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0.25" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#reQuoteSky)" />
                        {/* 右下建筑剪影：错落的高层楼宇线条 */}
                        <g fill="none" stroke="var(--secondary-color,#3f3f46)" strokeOpacity="0.08" strokeWidth="1.5">
                            <rect x="880" y="300" width="86" height="420" />
                            <rect x="980" y="220" width="104" height="500" />
                            <rect x="1098" y="360" width="78" height="360" />
                            <rect x="1190" y="270" width="70" height="450" />
                            {/* 楼宇窗格细线 */}
                            {[0, 1, 2, 3, 4, 5, 6, 7].map((r) => (
                                <line key={`wa${r}`} x1="980" y1={260 + r * 56} x2="1084" y2={260 + r * 56} />
                            ))}
                            {[0, 1, 2, 3, 4, 5, 6].map((r) => (
                                <line key={`wb${r}`} x1="880" y1={340 + r * 52} x2="966" y2={340 + r * 52} />
                            ))}
                        </g>
                        {/* 极简细分割线 */}
                        <line x1="96" y1="120" x2="96" y2="600" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                        {/* 金铜点缀短线 */}
                        <line x1="96" y1="120" x2="96" y2="248" stroke="url(#reQuoteGold)" strokeWidth="2.5" />
                    </svg>
                </div>

                {/* 顶部角标：极简品牌行 */}
                <div className="absolute top-0 left-0 z-10 flex w-full items-center justify-between px-16 pt-8" aria-hidden="true">
                    <span
                        className="text-xs font-light tracking-[0.35em] break-words"
                        style={{ color: "var(--background-text,#27272a)", opacity: 0.55, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        CLIENT VOICE
                    </span>
                    <span
                        className="text-xs font-light tracking-[0.35em] break-words"
                        style={{ color: "var(--primary-color,#b08d57)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        业主之声
                    </span>
                </div>

                {/* 主内容：超大留白 + 居中偏左的引言 */}
                <div className="relative z-10 flex h-full flex-col justify-center pl-32 pr-[34%]">
                    {/* 超大金铜装饰引号 */}
                    <div
                        className="font-serif leading-none break-words"
                        style={{
                            fontSize: '120px',
                            color: "var(--primary-color,#b08d57)",
                            opacity: 0.9,
                            marginBottom: '-18px',
                        }}
                        aria-hidden="true"
                    >
                        “
                    </div>

                    {/* 引言正文 */}
                    <p
                        className="text-4xl font-light leading-[1.6] break-words"
                        style={{
                            color: "var(--background-text,#27272a)",
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                        }}
                    >
                        {quote}
                    </p>

                    {/* 细分割线 */}
                    <div
                        className="mt-10 h-px w-20"
                        style={{ background: "var(--primary-color,#b08d57)", opacity: 0.6 }}
                    />

                    {/* 署名区：头像 / 姓名首字徽标 + 姓名 + 职务 */}
                    <div className="mt-7 flex items-center gap-5">
                        {avatarUrl ? (
                            <div
                                className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full"
                                style={{ boxShadow: '0 0 0 1px var(--stroke,#e4e4e7)' }}
                            >
                                <img
                                    src={avatarUrl}
                                    alt={avatarPrompt || authorName}
                                    className="h-full w-full object-cover"
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{ background: "linear-gradient(135deg, rgba(176,141,87,0.28), rgba(63,63,70,0.12))" }}
                                />
                            </div>
                        ) : (
                            <div
                                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-lg font-medium break-words"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    color: "var(--primary-color,#b08d57)",
                                    boxShadow: '0 0 0 1px var(--primary-color,#b08d57)',
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {initial}
                            </div>
                        )}

                        <div className="flex flex-col gap-1">
                            <span
                                className="text-lg font-medium leading-relaxed break-words"
                                style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {authorName}
                            </span>
                            <span
                                className="text-sm font-light leading-relaxed break-words"
                                style={{ color: "var(--secondary-color,#3f3f46)", opacity: 0.75, overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
