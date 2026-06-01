import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'gov-cn-image-left'
export const layoutName = '图文（左图）'
export const layoutDescription = '党政政务图文页：左侧大图叠中国红渐变遮罩，右侧庄重黑体标题、段落与要点。米白底、烫金细线、五角星纹样点缀，对称权威。'

const schema = z.object({
    title: z.string().min(2).max(20).default('坚持以人民为中心').meta({
        description: "幻灯片主标题（中文，庄重简短，建议不超过20字）",
    }),
    paragraphs: z.array(
        z.string().min(2).max(56).meta({ description: "正文段落（中文，建议每段不超过56字）" })
    ).min(1).max(3).default([
        '全面贯彻新发展理念，统筹推进经济建设、政治建设、文化建设、社会建设和生态文明建设。',
        '持续深化改革开放，着力保障和改善民生，不断增强人民群众的获得感、幸福感、安全感。',
    ]).meta({ description: "正文段落列表，1至3段" }),
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "庄重的党政会议现场，鲜艳的红色背景与金色装饰，气氛严肃权威",
    }).meta({ description: "左侧主图（将叠加中国红渐变遮罩）" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "右侧要点条目（中文，建议每条不超过24字）" })
    ).max(3).default([
        '夯实基层治理根基',
        '推动高质量发展',
        '增进民生福祉',
    ]).meta({ description: "右侧要点列表，可空，最多3条" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageLeft: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '坚持以人民为中心'
    const paragraphs = slideData?.paragraphs || []
    const image = slideData?.image
    const imageUrl = image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imageAlt = image?.__image_prompt__ || '党政政务配图'
    const bullets = slideData?.bullets || []

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
                {/* 背景烫金对称细线纹样 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="govLeftLine" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* 顶部与底部对称烫金细线 */}
                    <rect x="640" y="34" width="600" height="2" fill="url(#govLeftLine)" />
                    <rect x="640" y="686" width="600" height="2" fill="url(#govLeftLine)" />
                </svg>

                {/* 右上角五角星纹样点缀 */}
                <div className="absolute top-7 right-9 z-10 flex items-center gap-2" aria-hidden="true">
                    {[0, 1, 2].map((i) => (
                        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5" style={{ opacity: 0.85 }}>
                            <path
                                d="M12 2l2.95 6.02 6.64.97-4.8 4.68 1.13 6.6L12 18.13 6.08 21.27l1.13-6.6-4.8-4.68 6.64-.97z"
                                fill="var(--primary-color,#c1121f)"
                            />
                        </svg>
                    ))}
                </div>

                <div className="relative z-10 flex h-full gap-10 px-14 py-12">
                    {/* 左侧：主图 + 中国红渐变遮罩 + 烫金描边 */}
                    <div
                        className="relative w-[44%] flex-shrink-0 overflow-hidden rounded-2xl"
                        style={{
                            boxShadow: "0 10px 30px rgba(193,18,31,0.18)",
                            border: "2px solid var(--secondary-color,#b8860b)",
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* 中国红主题渐变遮罩 */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(160deg, rgba(193,18,31,0.18) 0%, rgba(193,18,31,0.42) 70%, rgba(193,18,31,0.72) 100%)",
                            }}
                        />
                        {/* 底部烫金标识条 */}
                        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-5 py-4">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" aria-hidden="true">
                                <path
                                    d="M12 2l2.95 6.02 6.64.97-4.8 4.68 1.13 6.6L12 18.13 6.08 21.27l1.13-6.6-4.8-4.68 6.64-.97z"
                                    fill="var(--secondary-color,#b8860b)"
                                />
                            </svg>
                            <span
                                className="h-px flex-1"
                                style={{ background: "var(--secondary-color,#b8860b)", opacity: 0.7 }}
                            />
                        </div>
                    </div>

                    {/* 右侧：标题 + 段落 + 要点 */}
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                        {/* 居中对称标题区 */}
                        <div className="flex flex-col items-start">
                            <span
                                className="mb-4 h-1.5 w-16 rounded-full"
                                style={{ background: "var(--primary-color,#c1121f)" }}
                            />
                            <h1
                                className="text-4xl font-black leading-[1.3] break-words"
                                style={{
                                    color: "var(--background-text,#1a1a1a)",
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {title}
                            </h1>
                            {/* 烫金细线分隔 */}
                            <div
                                className="mt-5 h-px w-full"
                                style={{
                                    background:
                                        "linear-gradient(to right, var(--secondary-color,#b8860b), rgba(184,134,11,0))",
                                }}
                            />
                        </div>

                        {/* 正文段落 */}
                        <div className="mt-6 flex flex-col gap-4">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-base leading-[1.7] break-words"
                                    style={{
                                        color: "var(--background-text,#1a1a1a)",
                                        opacity: 0.88,
                                        overflowWrap: 'break-word',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 要点列表（可空） */}
                        {bullets.length > 0 && (
                            <div className="mt-7 flex flex-col gap-3">
                                {bullets.map((b, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span
                                            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{
                                                background: "var(--primary-color,#c1121f)",
                                            }}
                                        >
                                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                                                <path
                                                    d="M12 2l2.95 6.02 6.64.97-4.8 4.68 1.13 6.6L12 18.13 6.08 21.27l1.13-6.6-4.8-4.68 6.64-.97z"
                                                    fill="var(--primary-text,#ffffff)"
                                                />
                                            </svg>
                                        </span>
                                        <span
                                            className="text-base font-medium leading-[1.6] break-words"
                                            style={{
                                                color: "var(--background-text,#1a1a1a)",
                                                overflowWrap: 'break-word',
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            {b}
                                        </span>
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
