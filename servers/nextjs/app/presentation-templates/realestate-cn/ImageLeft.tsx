import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'realestate-cn-image-left'
export const layoutName = '图文（左图）'
export const layoutDescription = '房产建筑风图文页：左侧大图叠金铜渐变遮罩 + 建筑剪影，右侧超大留白配标题、正文段落与细线要点。高级灰 + 金铜点缀，轻奢克制。'

const schema = z.object({
    title: z.string().min(2).max(20).default('择址即见格局').meta({
        description: "右侧主标题（中文，简短有力，轻奢克制）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落，一句话陈述项目价值或区位优势" })
    ).min(1).max(3).default([
        '臻萃城市稀缺地脉，以建筑语言书写都会人居的从容尺度。',
        '低密庭院与挑高大堂，于喧嚣之外留出沉静的居住留白。',
    ]).meta({ description: "右侧正文段落（1至3段）" }),
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "现代高端住宅建筑外立面，玻璃幕墙与石材，黄昏暖光，极简轻奢质感",
    }).meta({ description: "左侧主图，建议为建筑或室内实景照片" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "右侧要点短语，如配套/区位标签" })
    ).max(3).default([
        '城市核心区位',
        '低密纯墅社区',
        '精工臻品交付',
    ]).meta({ description: "右侧细线要点（可空，最多3条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageLeft: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '择址即见格局'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : ['臻萃城市稀缺地脉，以建筑语言书写都会人居的从容尺度。']
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = slideData?.image?.__image_prompt__ || '现代高端住宅建筑外立面'
    const bullets = slideData?.bullets || []

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
                <div className="flex h-full w-full">
                    {/* 左侧：大图 + 金铜渐变遮罩 + 建筑剪影 */}
                    <div className="relative w-[52%] flex-shrink-0 overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={imagePrompt}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* 主题色渐变遮罩 */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(135deg, rgba(63,63,70,0.55) 0%, rgba(63,63,70,0.12) 42%, rgba(176,141,87,0.42) 100%)",
                            }}
                        />
                        {/* 底部建筑剪影母题 */}
                        <svg
                            viewBox="0 0 600 140"
                            className="absolute bottom-0 left-0 w-full"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M0 140 L0 96 L46 96 L46 60 L92 60 L92 84 L150 84 L150 38 L196 38 L196 70 L260 70 L260 52 L312 52 L312 88 L372 88 L372 46 L424 46 L424 74 L486 74 L486 58 L540 58 L540 92 L600 92 L600 140 Z"
                                fill="rgba(39,39,42,0.42)"
                            />
                        </svg>
                        {/* 左上角细线角标 */}
                        <div className="absolute left-7 top-7" aria-hidden="true">
                            <div className="h-7 w-7 border-l border-t" style={{ borderColor: "var(--primary-text,#ffffff)", opacity: 0.7 }} />
                        </div>
                        {/* 金铜竖向强调细线 */}
                        <div
                            className="absolute right-0 top-0 h-full w-[3px]"
                            style={{ background: "var(--primary-color,#b08d57)" }}
                        />
                    </div>

                    {/* 右侧：超大留白 + 标题 + 正文 + 细线要点 */}
                    <div className="flex flex-1 flex-col justify-center pl-14 pr-16 py-14">
                        {/* 极简标签 + 细线 */}
                        <div className="mb-7 flex items-center gap-4">
                            <span
                                className="text-xs font-medium uppercase break-words"
                                style={{
                                    color: "var(--primary-color,#b08d57)",
                                    letterSpacing: '0.18em',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                RESIDENCE
                            </span>
                            <div className="h-px flex-1" style={{ background: "var(--stroke,#e4e4e7)" }} />
                        </div>

                        {/* 主标题 */}
                        <h1
                            className="text-5xl font-light leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        {/* 金铜短分割线 */}
                        <div
                            className="mt-7 mb-8 h-px w-16"
                            style={{ background: "var(--primary-color,#b08d57)" }}
                        />

                        {/* 正文段落 */}
                        <div className="space-y-5">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg font-light leading-[1.8] break-words"
                                    style={{ color: "var(--secondary-color,#3f3f46)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 细线要点 */}
                        {bullets.length > 0 && (
                            <div
                                className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t pt-7"
                                style={{ borderColor: "var(--stroke,#e4e4e7)" }}
                            >
                                {bullets.map((b, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span
                                            className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--primary-color,#b08d57)" }}
                                        />
                                        <span
                                            className="text-sm font-normal leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
