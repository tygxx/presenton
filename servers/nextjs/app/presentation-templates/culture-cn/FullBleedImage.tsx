import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'culture-cn-full-bleed-image'
export const layoutName = '全幅大图'
export const layoutDescription = '国潮文创全幅大图版式：满铺背景图叠墨色渐变遮罩，朱砂印章与描金竖排点缀，左下角大标题与副标题。文字在深色遮罩上保持清晰可读。'

const schema = z.object({
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "水墨意境的东方古典山水画卷，宣纸质感，留白雅致，国潮文创风格",
    }).meta({
        description: "满铺背景大图（建议东方古典/水墨/传统纹样题材）",
    }),
    title: z.string().min(2).max(20).default('一纸千年 · 国风新生').meta({
        description: "叠加在图上的主标题（中文，简短有力，≤20字）",
    }),
    subtitle: z.string().min(2).max(40).default('以东方美学为魂，让传统纹样在当代焕新').meta({
        description: "叠加在图上的副标题（可选，一句话补充，≤40字）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FullBleedImage: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = slideData?.image?.__image_prompt__ || "水墨意境的东方古典山水画卷，宣纸质感，留白雅致，国潮文创风格"
    const title = slideData?.title || '一纸千年 · 国风新生'
    const subtitle = slideData?.subtitle || '以东方美学为魂，让传统纹样在当代焕新'
    const sealText = (title || '国风').trim().slice(0, 2)

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
                {/* 满铺背景图 */}
                <img
                    src={imageUrl}
                    alt={imagePrompt}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* 深色渐变遮罩：底部墨黑 + 左侧加重，保证文字可读 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to top, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.55) 38%, rgba(26,26,26,0.10) 70%, rgba(26,26,26,0) 100%)",
                    }}
                    aria-hidden="true"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to right, rgba(26,26,26,0.55) 0%, rgba(26,26,26,0.12) 42%, rgba(26,26,26,0) 70%)",
                    }}
                    aria-hidden="true"
                />

                {/* 描金边框点缀 */}
                <div
                    className="absolute inset-5 rounded-sm pointer-events-none"
                    style={{ border: "1px solid var(--stroke,#ddd0b4)", opacity: 0.5 }}
                    aria-hidden="true"
                />

                {/* 右上角水墨笔触 + 传统纹样装饰 */}
                <svg
                    viewBox="0 0 320 320"
                    className="absolute -top-6 -right-6 h-56 w-56 pointer-events-none"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="cultureInkGlow" cx="0.7" cy="0.3" r="0.8">
                            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.42" />
                            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <circle cx="220" cy="100" r="160" fill="url(#cultureInkGlow)" />
                    {/* 传统回纹母题 */}
                    <path
                        d="M120 60 h60 v60 h-40 v-40 h20 v20"
                        fill="none"
                        stroke="var(--stroke,#ddd0b4)"
                        strokeOpacity="0.55"
                        strokeWidth="2"
                    />
                    <path
                        d="M200 130 h60 v60 h-40 v-40 h20 v20"
                        fill="none"
                        stroke="var(--stroke,#ddd0b4)"
                        strokeOpacity="0.4"
                        strokeWidth="2"
                    />
                </svg>

                {/* 右侧描金竖排点缀（传统气质） */}
                <div className="absolute right-9 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 pointer-events-none">
                    <div className="h-12 w-px" style={{ background: "var(--stroke,#ddd0b4)", opacity: 0.6 }} aria-hidden="true" />
                    <span
                        className="text-sm font-medium leading-[1.7] break-words"
                        style={{
                            color: "var(--stroke,#ddd0b4)",
                            writingMode: 'vertical-rl',
                            letterSpacing: '0.35em',
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        东方雅致 · 文创新生
                    </span>
                    <div className="h-12 w-px" style={{ background: "var(--stroke,#ddd0b4)", opacity: 0.6 }} aria-hidden="true" />
                </div>

                {/* 主内容：左下角标题区 */}
                <div className="relative z-10 flex h-full flex-col justify-end px-16 pb-16">
                    <div className="flex max-w-[42rem] flex-col gap-5">
                        {/* 印章红块 + 标签 */}
                        <div className="flex items-center gap-4">
                            <span
                                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md text-lg font-black leading-[1.2] break-words"
                                style={{
                                    background: "var(--primary-color,#c0392b)",
                                    color: "var(--primary-text,#ffffff)",
                                    boxShadow: '0 0 0 2px rgba(245,236,217,0.25)',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {sealText}
                            </span>
                            <span
                                className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium leading-relaxed break-words"
                                style={{
                                    color: "var(--primary-text,#ffffff)",
                                    background: "rgba(192,57,43,0.85)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                国潮文创
                            </span>
                        </div>

                        {/* 主标题 */}
                        <h1
                            className="text-6xl font-black leading-[1.2] break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                textShadow: '0 2px 18px rgba(26,26,26,0.55)',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        {/* 朱砂分隔条 */}
                        <div
                            className="h-1.5 w-28 rounded-full"
                            style={{ background: "var(--primary-color,#c0392b)" }}
                            aria-hidden="true"
                        />

                        {/* 副标题 */}
                        {subtitle && (
                            <p
                                className="text-xl leading-relaxed break-words"
                                style={{
                                    color: "var(--primary-text,#ffffff)",
                                    opacity: 0.92,
                                    textShadow: '0 1px 12px rgba(26,26,26,0.5)',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FullBleedImage
