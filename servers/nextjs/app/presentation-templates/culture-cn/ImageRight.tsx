import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'culture-cn-image-right'
export const layoutName = '图文（右图）'
export const layoutDescription = '国潮文创风图文页（右图）：左侧标题、正文段落与要点，右侧大图叠朱砂渐变遮罩。宣纸米黄底 + 墨黑 + 描金边 + 印章红块，水墨纹样点缀，东方雅致。'

const schema = z.object({
    title: z.string().min(2).max(20).default('匠心承古韵').meta({
        description: "图文页主标题（中文，简短雅致，体现传统文化气质）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落，每段一句话阐述（中文）" })
    ).min(1).max(3).default([
        '以东方美学为魂，融传统纹样与当代设计于一体。',
        '从一笔水墨、一方印章中提炼意境，让古意焕发新生。',
        '于留白之间见格调，让文创之物承载千年文化温度。',
    ]).meta({ description: "左侧正文段落（1-3 段）" }),
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "东方水墨意境，传统纹样器物，朱砂红与描金点缀的国潮文创静物",
    }).meta({ description: "右侧主图（照片槽，将叠加朱砂渐变遮罩）" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "要点短语（中文，简练）" })
    ).max(3).default([
        '非遗工艺现代演绎',
        '原创纹样自主设计',
        '环保选材匠心打磨',
    ]).meta({ description: "左侧要点列表（可空，最多 3 条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageRight: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '匠心承古韵'
    const paragraphs = slideData?.paragraphs && slideData.paragraphs.length > 0
        ? slideData.paragraphs
        : [
            '以东方美学为魂，融传统纹样与当代设计于一体。',
            '从一笔水墨、一方印章中提炼意境，让古意焕发新生。',
            '于留白之间见格调，让文创之物承载千年文化温度。',
        ]
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imageAlt = slideData?.image?.__image_prompt__ || '东方水墨意境国潮文创静物'

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
                {/* 背景水墨纹样装饰层 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="cultureRInkGlow" cx="18%" cy="20%" r="60%">
                            <stop offset="0%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#cultureRInkGlow)" />
                    {/* 传统回纹/云纹母题（左下角点缀） */}
                    <g stroke="var(--primary-color,#c0392b)" strokeOpacity="0.10" strokeWidth="2" fill="none">
                        <path d="M40 600 q40 -60 80 0 q40 60 80 0 q40 -60 80 0" />
                        <path d="M40 640 q40 -60 80 0 q40 60 80 0 q40 -60 80 0" />
                    </g>
                    {/* 描金弧线 */}
                    <path d="M-40 120 Q 220 40 440 150" stroke="#c8a24a" strokeOpacity="0.30" strokeWidth="2" fill="none" />
                </svg>

                {/* 左侧描金竖边线 */}
                <div
                    className="absolute left-0 top-0 h-full"
                    style={{ width: '6px', background: "linear-gradient(180deg,#d8b15a,#a87c2c)" }}
                    aria-hidden="true"
                />

                <div className="relative z-10 flex h-full">
                    {/* 左侧：文字区 */}
                    <div className="flex w-[52%] flex-shrink-0 flex-col justify-center pl-16 pr-10 py-12">
                        {/* 竖排点缀 + 印章红块 */}
                        <div className="mb-6 flex items-center gap-4">
                            <div
                                className="flex flex-col items-center justify-center rounded-[4px] px-2 py-2 break-words"
                                style={{
                                    background: "var(--primary-color,#c0392b)",
                                    color: "var(--primary-text,#ffffff)",
                                    writingMode: 'vertical-rl',
                                    letterSpacing: '0.12em',
                                    boxShadow: '0 0 0 2px rgba(192,57,43,0.18)',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                <span className="text-sm font-bold">国潮文创</span>
                            </div>
                            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,#c8a24a,transparent)" }} />
                        </div>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        {/* 描金分隔线 */}
                        <div className="mt-6 mb-7 flex items-center gap-2" aria-hidden="true">
                            <div className="h-1 w-12 rounded-full" style={{ background: "var(--primary-color,#c0392b)" }} />
                            <div className="h-1 w-4 rounded-full" style={{ background: "#c8a24a" }} />
                        </div>

                        <div className="space-y-4">
                            {paragraphs.slice(0, 3).map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.8] break-words"
                                    style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {bullets.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-3">
                                {bullets.slice(0, 3).map((b, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium leading-relaxed break-words"
                                        style={{
                                            background: "var(--card-color,#fbf5e9)",
                                            borderColor: "var(--stroke,#ddd0b4)",
                                            color: "var(--secondary-color,#1a1a1a)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        <span
                                            className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--primary-color,#c0392b)" }}
                                            aria-hidden="true"
                                        />
                                        {b}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 右侧：大图区 */}
                    <div className="relative flex flex-1 items-center justify-center py-10 pr-12 pl-2">
                        <div
                            className="relative h-full w-full overflow-hidden rounded-[10px] border"
                            style={{ borderColor: "var(--stroke,#ddd0b4)", boxShadow: '0 12px 30px rgba(26,26,26,0.18)' }}
                        >
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            {/* 朱砂主题色渐变遮罩 */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(135deg, rgba(192,57,43,0.32) 0%, rgba(26,26,26,0.10) 45%, rgba(26,26,26,0.34) 100%)",
                                }}
                                aria-hidden="true"
                            />
                            {/* 描金内边框 */}
                            <div
                                className="absolute inset-3 rounded-[6px]"
                                style={{ border: '1.5px solid rgba(200,162,74,0.55)' }}
                                aria-hidden="true"
                            />
                            {/* 右下角印章红块 */}
                            <div
                                className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-[4px] break-words"
                                style={{
                                    background: "var(--primary-color,#c0392b)",
                                    color: "var(--primary-text,#ffffff)",
                                    writingMode: 'vertical-rl',
                                    boxShadow: '0 2px 8px rgba(192,57,43,0.40)',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                                aria-hidden="true"
                            >
                                <span className="text-xs font-bold leading-relaxed" style={{ letterSpacing: '0.1em' }}>雅集</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageRight
