import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'gov-cn-full-bleed-image'
export const layoutName = '全幅大图'
export const layoutDescription = '党政政务风全幅大图版式：满铺背景图叠深色渐变遮罩保证可读，居中对称标题，烫金细线、五角星与华表纹样点缀，庄重权威。'

const schema = z.object({
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "庄重大气的政务场景全景照片，红色与暖金色调，象征权威与团结",
    }).meta({
        description: "满铺背景图片",
    }),
    title: z.string().min(2).max(20).default('凝心聚力 砥砺前行').meta({
        description: "居中主标题（中文，简短有力，建议≤20字）",
    }),
    subtitle: z.string().max(40).optional().default('全面贯彻新发展理念 奋力开创工作新局面').meta({
        description: "副标题，一句话补充说明（可选，建议≤40字）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FullBleedImage: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = slideData?.image?.__image_prompt__ || "庄重大气的政务场景全景照片，红色与暖金色调，象征权威与团结"
    const title = slideData?.title || '凝心聚力 砥砺前行'
    const subtitle = slideData?.subtitle || '全面贯彻新发展理念 奋力开创工作新局面'

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
                {/* 满铺背景图 */}
                <img
                    src={imageUrl}
                    alt={imagePrompt}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* 深色渐变遮罩：底部与四周加深，保证标题可读 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(26,26,26,0.55) 0%, rgba(26,26,26,0.30) 38%, rgba(193,18,31,0.55) 100%)",
                    }}
                />
                {/* 中国红主题色叠加，强化政务气质 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(120% 90% at 50% 120%, var(--primary-color,#c1121f) 0%, rgba(193,18,31,0) 60%)",
                        opacity: 0.45,
                    }}
                />

                {/* 顶部烫金细线 + 五角星点缀（对称） */}
                <div className="absolute top-0 left-0 w-full px-16 pt-7" aria-hidden="true">
                    <div className="flex items-center justify-center gap-4">
                        <div
                            className="h-px flex-1"
                            style={{ background: "linear-gradient(90deg, rgba(184,134,11,0) 0%, var(--secondary-color,#b8860b) 100%)" }}
                        />
                        <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill="var(--secondary-color,#b8860b)">
                            <polygon points="12,2 14.9,8.6 22,9.3 16.7,14 18.2,21 12,17.3 5.8,21 7.3,14 2,9.3 9.1,8.6" />
                        </svg>
                        <div
                            className="h-px flex-1"
                            style={{ background: "linear-gradient(90deg, var(--secondary-color,#b8860b) 0%, rgba(184,134,11,0) 100%)" }}
                        />
                    </div>
                </div>

                {/* 底部对称华表纹样装饰 */}
                <svg
                    viewBox="0 0 1280 200"
                    className="absolute bottom-0 left-0 w-full"
                    preserveAspectRatio="xMidYMax meet"
                    aria-hidden="true"
                    style={{ opacity: 0.5 }}
                >
                    <defs>
                        <linearGradient id="govFbGold" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#b8860b" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#b8860b" stopOpacity="0.15" />
                        </linearGradient>
                    </defs>
                    {/* 左侧华表柱 */}
                    <g stroke="url(#govFbGold)" strokeWidth="2" fill="none">
                        <line x1="150" y1="40" x2="150" y2="200" />
                        <path d="M122 70 Q150 50 178 70" />
                        <path d="M118 92 Q150 70 182 92" />
                        <ellipse cx="150" cy="44" rx="20" ry="9" />
                    </g>
                    {/* 右侧华表柱（对称） */}
                    <g stroke="url(#govFbGold)" strokeWidth="2" fill="none">
                        <line x1="1130" y1="40" x2="1130" y2="200" />
                        <path d="M1102 70 Q1130 50 1158 70" />
                        <path d="M1098 92 Q1130 70 1162 92" />
                        <ellipse cx="1130" cy="44" rx="20" ry="9" />
                    </g>
                </svg>

                {/* 居中对称标题内容 */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-20 text-center">
                    {/* 上分隔：烫金细线 + 五角星 */}
                    <div className="mb-7 flex items-center justify-center gap-3">
                        <div className="h-px w-16" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="var(--secondary-color,#b8860b)" aria-hidden="true">
                            <polygon points="12,2 14.9,8.6 22,9.3 16.7,14 18.2,21 12,17.3 5.8,21 7.3,14 2,9.3 9.1,8.6" />
                        </svg>
                        <div className="h-px w-16" style={{ background: "var(--secondary-color,#b8860b)" }} />
                    </div>

                    <h1
                        className="text-6xl font-black leading-[1.25] break-words"
                        style={{
                            color: "var(--primary-text,#ffffff)",
                            textShadow: "0 2px 16px rgba(0,0,0,0.45)",
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    {subtitle && (
                        <p
                            className="mt-6 max-w-3xl text-2xl font-medium leading-relaxed break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                opacity: 0.92,
                                textShadow: "0 1px 10px rgba(0,0,0,0.4)",
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {subtitle}
                        </p>
                    )}

                    {/* 下分隔：烫金细线 */}
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <span
                            className="inline-block h-2 w-2 rotate-45"
                            style={{ background: "var(--secondary-color,#b8860b)" }}
                            aria-hidden="true"
                        />
                        <div
                            className="h-1 w-28 rounded-full"
                            style={{ background: "var(--secondary-color,#b8860b)" }}
                        />
                        <span
                            className="inline-block h-2 w-2 rotate-45"
                            style={{ background: "var(--secondary-color,#b8860b)" }}
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FullBleedImage
