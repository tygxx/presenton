import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'travel-cn-quote'
export const layoutName = '客户证言'
export const layoutDescription = '旅游文旅风证言页：大引号装饰 + 引言金句 + 署名头像（无头像时用姓名首字圆形徽标）。明媚海蓝与暖阳橙配色，风景大图与指南针路线点缀，轻盈令人向往。'

const schema = z.object({
    eyebrow: z.string().min(2).max(16).default('旅行者说').meta({
        description: "引言上方的小标签，如『旅行者说』『真实评价』",
    }),
    quote: z.string().min(8).max(60).default('从洱海的晨光到雪山的星空，这趟旅程把我心里的远方，变成了脚下真实的路。').meta({
        description: "客户证言引言（中文金句，简短走心）",
    }),
    authorName: z.string().min(2).max(14).default('林晚晴').meta({
        description: "署名人姓名",
    }),
    authorTitle: z.string().min(2).max(20).default('云南深度游 · 老客户').meta({
        description: "署名人头衔或身份，如行程名称、身份标签",
    }),
    avatar: ImageSchema.optional().meta({
        description: "署名人头像（可选，留空则用姓名首字圆形徽标）",
    }),
    destination: z.string().min(2).max(14).default('云南 · 大理').meta({
        description: "目的地标签，显示在风景卡片上",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Quote: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '旅行者说'
    const quote = slideData?.quote || '从洱海的晨光到雪山的星空，这趟旅程把我心里的远方，变成了脚下真实的路。'
    const authorName = slideData?.authorName || '林晚晴'
    const authorTitle = slideData?.authorTitle || '云南深度游 · 老客户'
    const destination = slideData?.destination || '云南 · 大理'
    const avatarUrl = slideData?.avatar?.__image_url__
    const avatarPrompt = slideData?.avatar?.__image_prompt__ || '微笑的中国女性旅行者头像，户外自然光'
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
                    background: "var(--background-color,#f0f9ff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景：明媚海蓝光晕装饰层 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="travelQuoteGlow" cx="18%" cy="22%" r="60%">
                                <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="travelQuoteSun" cx="92%" cy="88%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#travelQuoteGlow)" />
                        <rect width="1280" height="720" fill="url(#travelQuoteSun)" />
                        {/* 虚线路线点缀 */}
                        <path
                            d="M40 600 C 240 520, 360 640, 560 540 S 880 440, 1040 520"
                            fill="none"
                            stroke="var(--primary-color,#0891b2)"
                            strokeOpacity="0.16"
                            strokeWidth="2.5"
                            strokeDasharray="2 12"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* 左上角指南针点缀 */}
                <div className="absolute left-12 top-9 z-10" aria-hidden="true">
                    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="21" stroke="var(--primary-color,#0891b2)" strokeOpacity="0.45" strokeWidth="2" />
                        <circle cx="24" cy="24" r="2.5" fill="var(--secondary-color,#f59e0b)" />
                        <path d="M24 8 L29 24 L24 40 L19 24 Z" fill="var(--primary-color,#0891b2)" fillOpacity="0.30" />
                        <path d="M24 8 L29 24 L24 24 Z" fill="var(--secondary-color,#f59e0b)" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full items-stretch gap-10 px-16 py-12">
                    {/* 左侧：引言主内容 */}
                    <div className="flex w-[58%] flex-shrink-0 flex-col justify-center">
                        <span
                            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold break-words"
                            style={{
                                color: "var(--primary-color,#0891b2)",
                                background: "rgba(8,145,178,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            />
                            {eyebrow}
                        </span>

                        {/* 大引号装饰 */}
                        <div
                            className="font-black leading-none"
                            style={{ fontSize: '120px', color: "var(--secondary-color,#f59e0b)", opacity: 0.85, height: '64px' }}
                            aria-hidden="true"
                        >
                            “
                        </div>

                        <p
                            className="mt-2 text-4xl font-bold leading-[1.45] break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {quote}
                        </p>

                        <div
                            className="my-7 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                        />

                        {/* 署名：头像 / 姓名首字徽标 */}
                        <div className="flex items-center gap-4">
                            {avatarUrl ? (
                                <div
                                    className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full"
                                    style={{ boxShadow: '0 0 0 3px rgba(8,145,178,0.18)' }}
                                >
                                    <img src={avatarUrl} alt={avatarPrompt} className="h-full w-full object-cover" />
                                    <div
                                        className="absolute inset-0"
                                        style={{ background: "linear-gradient(135deg, rgba(8,145,178,0.18), rgba(245,158,11,0.12))" }}
                                    />
                                </div>
                            ) : (
                                <div
                                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-xl font-black"
                                    style={{
                                        background: "linear-gradient(135deg, var(--primary-color,#0891b2), var(--secondary-color,#f59e0b))",
                                        color: "var(--primary-text,#ffffff)",
                                        boxShadow: '0 0 0 3px rgba(8,145,178,0.16)',
                                    }}
                                >
                                    {initial}
                                </div>
                            )}
                            <div className="flex flex-col leading-relaxed">
                                <span
                                    className="text-lg font-bold break-words"
                                    style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {authorName}
                                </span>
                                <span
                                    className="text-sm break-words"
                                    style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {authorTitle}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 右侧：风景目的地卡片 */}
                    <div className="flex flex-1 items-center">
                        <div
                            className="relative w-full overflow-hidden rounded-3xl border shadow-sm"
                            style={{
                                background: "var(--card-color,#ffffff)",
                                borderColor: "var(--stroke,#bae6fd)",
                                aspectRatio: '3 / 4',
                            }}
                        >
                            <img
                                src="https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
                                alt="洱海日出的湖光山色与远处的苍山轮廓"
                                className="h-full w-full object-cover"
                            />
                            {/* 主题色渐变遮罩 */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(160deg, rgba(8,145,178,0.30) 0%, rgba(8,145,178,0.08) 45%, rgba(245,158,11,0.42) 100%)",
                                }}
                            />
                            {/* 目的地路线标签 */}
                            <div className="absolute left-5 top-5 z-10">
                                <span
                                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold break-words"
                                    style={{
                                        background: "rgba(255,255,255,0.92)",
                                        color: "var(--primary-color,#0891b2)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    <span
                                        className="inline-block h-2.5 w-2.5 rounded-full"
                                        style={{ background: "var(--secondary-color,#f59e0b)" }}
                                    />
                                    {destination}
                                </span>
                            </div>
                            {/* 底部路线点缀 */}
                            <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center gap-2" aria-hidden="true">
                                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--primary-text,#ffffff)" }} />
                                <span className="h-0.5 flex-1 rounded-full" style={{ background: "rgba(255,255,255,0.7)" }} />
                                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Quote
