import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'education-cn-image-left'
export const layoutName = '图文（左图）'
export const layoutDescription = '教育培训风图文页：左侧大图叠橙蓝渐变遮罩，右侧标题、段落与要点列表。圆角卡片、圆点与灯泡装饰，明亮亲和有活力。'

const schema = z.object({
    title: z.string().min(2).max(20).default('点亮每一次成长').meta({
        description: "幻灯片主标题（中文，简短有力，建议不超过20字）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落（中文，单段不超过56字）" })
    ).min(1).max(3).default([
        '我们以学习者为中心，把抽象知识拆解为可感知、可操作的小步骤。',
        '通过项目实践与即时反馈，让每位学员在动手中真正掌握技能。',
    ]).meta({ description: "右侧正文段落，1至3段" }),
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '明亮教室里学生围坐讨论，阳光洒在书本上，温暖亲和的学习氛围',
    }).meta({ description: "左侧主图（照片）" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "要点短语（中文，不超过12字最佳）" })
    ).max(3).default([
        '互动式课堂体验',
        '分阶段能力进阶',
        '学完即可实战',
    ]).meta({ description: "右侧要点列表，最多3条，可留空" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const bulletIconUrls = [
    'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg',
    'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
    'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/graduation-cap-bold.svg',
]
const bulletIconQueries = ['lightbulb idea', 'growth chart', 'graduation cap']

const ImageLeft: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '点亮每一次成长'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '我们以学习者为中心，把抽象知识拆解为可感知、可操作的小步骤。',
            '通过项目实践与即时反馈，让每位学员在动手中真正掌握技能。',
        ]
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png'
    const imagePrompt = slideData?.image?.__image_prompt__ || '明亮教室里学生围坐讨论，阳光洒在书本上，温暖亲和的学习氛围'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#fffdf7)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：右上灯泡光晕 + 圆点母题 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <radialGradient id="eduLeftGlow" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <circle cx="1180" cy="90" r="170" fill="url(#eduLeftGlow)" />
                    {/* 圆点装饰阵列 */}
                    {[0, 1, 2, 3].map((r) => (
                        [0, 1, 2, 3, 4].map((c) => (
                            <circle
                                key={`${r}-${c}`}
                                cx={1108 + c * 26}
                                cy={560 + r * 26}
                                r="3.2"
                                fill="var(--primary-color,#2563eb)"
                                fillOpacity="0.14"
                            />
                        ))
                    ))}
                    {/* 成长曲线母题 */}
                    <path
                        d="M40 700 C 240 660, 360 540, 560 520 S 880 470, 1240 360"
                        fill="none"
                        stroke="var(--primary-color,#2563eb)"
                        strokeOpacity="0.06"
                        strokeWidth="3"
                    />
                </svg>

                <div className="relative z-10 flex h-full gap-10 p-10">
                    {/* 左侧：大图 + 渐变遮罩 + 角标 */}
                    <div
                        className="relative w-[46%] flex-shrink-0 overflow-hidden rounded-3xl shadow-md"
                        style={{ border: "6px solid var(--card-color,#ffffff)" }}
                    >
                        <img
                            src={imageUrl}
                            alt={imagePrompt}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* 主题色渐变遮罩 */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(140deg, rgba(37,99,235,0.55) 0%, rgba(37,99,235,0.10) 42%, rgba(249,115,22,0.42) 100%)",
                            }}
                        />
                        {/* 左上角书本标识 */}
                        <div className="absolute left-5 top-5 flex items-center gap-2.5">
                            <div
                                className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm"
                                style={{ background: "var(--secondary-color,#f97316)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-6 h-6"
                                    title="open book"
                                />
                            </div>
                            <span
                                className="rounded-full px-3 py-1 text-sm font-semibold break-words"
                                style={{
                                    background: "rgba(255,255,255,0.92)",
                                    color: "var(--primary-color,#2563eb)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                教育培训
                            </span>
                        </div>
                        {/* 左下角说明条 */}
                        <div className="absolute bottom-5 left-5 right-5">
                            <p
                                className="rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed break-words"
                                style={{
                                    background: "rgba(255,255,255,0.16)",
                                    backdropFilter: "blur(2px)",
                                    color: "var(--primary-text,#ffffff)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                以兴趣为起点，让学习自然发生
                            </p>
                        </div>
                    </div>

                    {/* 右侧：标题 + 段落 + 要点 */}
                    <div className="flex flex-1 flex-col justify-center">
                        {/* 灯泡眉标 */}
                        <div className="mb-5 flex items-center gap-2.5">
                            <div
                                className="flex h-9 w-9 items-center justify-center rounded-full"
                                style={{ background: "rgba(37,99,235,0.10)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-color,#2563eb)"
                                    className="w-5 h-5"
                                    title="lightbulb idea"
                                />
                            </div>
                            <span
                                className="text-sm font-semibold break-words"
                                style={{ color: "var(--secondary-color,#f97316)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                成长式学习
                            </span>
                        </div>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div className="mt-4 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />

                        <div className="mt-6 space-y-3.5">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.8] break-words"
                                    style={{ color: "var(--background-text,#1f2937)", opacity: 0.88, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {bullets.length > 0 && (
                            <div className="mt-8 flex flex-col gap-3">
                                {bullets.slice(0, 3).map((b, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm"
                                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#f1e9d8)" }}
                                    >
                                        <div
                                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                                            style={{ background: "var(--primary-color,#2563eb)" }}
                                        >
                                            <RemoteSvgIcon
                                                url={bulletIconUrls[i % bulletIconUrls.length]}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-5 h-5"
                                                title={bulletIconQueries[i % bulletIconQueries.length]}
                                            />
                                        </div>
                                        <span
                                            className="text-base font-semibold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
