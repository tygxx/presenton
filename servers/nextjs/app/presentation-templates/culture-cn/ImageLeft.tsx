import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'culture-cn-image-left'
export const layoutName = '图文（左图）'
export const layoutDescription = '国潮文创图文页：左侧大图叠朱砂渐变遮罩与描金边框，右侧竖排印章标题、正文段落与要点。宣纸米黄底配水墨纹样、印章红块，东方雅致。'

const schema = z.object({
    title: z.string().min(2).max(20).default('一器一物，皆有匠心').meta({
        description: "图文页主标题（中文，简短雅致，东方气质）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落，一句话讲述文创理念或工艺故事" })
    ).min(1).max(3).default([
        '取宋瓷之素雅、明式之简净，以当代设计语言重述东方器物之美。',
        '每一件作品都源自非遗匠人手作，纹样取自传统典籍，于细节处见温度。',
        '让古典美学走进日常，于一杯一盏间品味千年文脉的当下回响。',
    ]).meta({ description: "正文段落数组，1 到 3 段" }),
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '青瓷茶具与水墨纹样静物，宣纸背景，东方国潮文创风格，柔和侧光',
    }).meta({ description: "左侧主图，建议为器物/工艺/文创实拍图" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "右侧要点短语，提炼工艺或理念关键词" })
    ).max(3).default([
        '非遗手作 · 匠心工艺',
        '典籍纹样 · 古韵新生',
        '东方美学 · 日用之道',
    ]).meta({ description: "要点短语数组，可空，最多 3 条" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageLeft: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '一器一物，皆有匠心'
    const paragraphs = slideData?.paragraphs?.length
        ? slideData.paragraphs
        : [
            '取宋瓷之素雅、明式之简净，以当代设计语言重述东方器物之美。',
            '每一件作品都源自非遗匠人手作，纹样取自传统典籍，于细节处见温度。',
            '让古典美学走进日常，于一杯一盏间品味千年文脉的当下回响。',
        ]
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png'
    const imagePrompt = slideData?.image?.__image_prompt__ || '青瓷茶具与水墨纹样静物，宣纸背景，东方国潮文创风格'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f5ecd9)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景：宣纸纹理 + 水墨笔触 + 传统纹样装饰层 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <radialGradient id="cultLeftPaper" cx="78%" cy="22%" r="90%">
                            <stop offset="0%" stopColor="#fbf5e9" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#f5ecd9" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="cultLeftInk" x1="1" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#cultLeftPaper)" />
                    {/* 右下水墨笔触晕染 */}
                    <path
                        d="M1280 720 C1120 640 1180 540 1080 500 C980 460 1040 360 940 360 C900 720 1100 720 1280 720 Z"
                        fill="url(#cultLeftInk)"
                    />
                    {/* 传统回纹/云纹装饰线（右上） */}
                    <g stroke="var(--stroke,#ddd0b4)" strokeWidth="1.5" fill="none" strokeOpacity="0.7">
                        <path d="M1180 60 h44 v44 h-30 v-30 h16" />
                        <path d="M1120 60 h44 v44 h-30 v-30 h16" />
                        <path d="M1180 120 h44 v44 h-30 v-30 h16" />
                    </g>
                    {/* 描金细线分隔意境 */}
                    <line x1="700" y1="120" x2="700" y2="600" stroke="#c8a96a" strokeOpacity="0.35" strokeWidth="1" />
                </svg>

                <div className="relative z-10 flex h-full p-12 gap-12">
                    {/* 左侧：大图 + 朱砂渐变遮罩 + 描金边框 + 印章红块 */}
                    <div className="relative w-[46%] flex-shrink-0">
                        <div
                            className="relative h-full w-full overflow-hidden rounded-md"
                            style={{ border: '2px solid #c8a96a', boxShadow: '0 18px 40px -18px rgba(26,26,26,0.45)' }}
                        >
                            <img
                                src={imageUrl}
                                alt={imagePrompt}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            {/* 朱砂红 + 墨黑主题渐变遮罩 */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: 'linear-gradient(150deg, rgba(192,57,43,0.42) 0%, rgba(26,26,26,0.12) 45%, rgba(26,26,26,0.62) 100%)',
                                }}
                            />
                            {/* 内描金细边框 */}
                            <div
                                className="absolute inset-3 rounded-sm"
                                style={{ border: '1px solid rgba(200,169,106,0.6)' }}
                            />
                            {/* 左上印章红块 */}
                            <div
                                className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-[4px] text-base font-bold break-words"
                                style={{
                                    background: "var(--primary-color,#c0392b)",
                                    color: "var(--primary-text,#ffffff)",
                                    border: '1.5px solid rgba(255,255,255,0.55)',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                国潮
                            </div>
                            {/* 图底竖排小字点缀 */}
                            <div
                                className="absolute bottom-6 left-6 text-sm font-medium leading-relaxed break-words"
                                style={{
                                    color: "var(--primary-text,#ffffff)",
                                    writingMode: 'vertical-rl',
                                    letterSpacing: '0.18em',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                东方器物之美
                            </div>
                        </div>
                    </div>

                    {/* 右侧：印章标题 + 正文段落 + 要点 */}
                    <div className="flex flex-1 flex-col justify-center">
                        {/* 顶部分类标 + 印章红块 */}
                        <div className="mb-6 flex items-center gap-3">
                            <span
                                className="inline-flex items-center rounded-[3px] px-3 py-1 text-sm font-bold break-words"
                                style={{
                                    background: "var(--primary-color,#c0392b)",
                                    color: "var(--primary-text,#ffffff)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                国潮文创
                            </span>
                            <span className="h-px flex-1" style={{ background: '#c8a96a', opacity: 0.6 }} />
                        </div>

                        <h1
                            className="text-5xl font-black leading-[1.3] break-words"
                            style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        {/* 描金 + 朱砂分隔 */}
                        <div className="mt-6 flex items-center gap-2">
                            <div className="h-1.5 w-16 rounded-full" style={{ background: "var(--primary-color,#c0392b)" }} />
                            <div className="h-1.5 w-8 rounded-full" style={{ background: '#c8a96a' }} />
                        </div>

                        <div className="mt-7 space-y-4">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="max-w-[34rem] text-lg leading-[1.8] break-words"
                                    style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 要点（可空） */}
                        {bullets.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-3">
                                {bullets.map((b, i) => (
                                    <div
                                        key={i}
                                        className="inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-base font-medium break-words"
                                        style={{
                                            background: "var(--card-color,#fbf5e9)",
                                            borderColor: "var(--stroke,#ddd0b4)",
                                            color: "var(--secondary-color,#1a1a1a)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        <span
                                            className="h-2.5 w-2.5 flex-shrink-0 rounded-[2px]"
                                            style={{ background: "var(--primary-color,#c0392b)" }}
                                        />
                                        {b}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageLeft
