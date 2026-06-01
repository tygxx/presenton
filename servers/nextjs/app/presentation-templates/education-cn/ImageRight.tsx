import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'education-cn-image-right'
export const layoutName = '图文（右图）'
export const layoutDescription = '教育培训风图文页（右图）：明亮米白背景叠橙蓝柔光与圆点装饰，左侧大标题/正文/要点，右侧圆角大图卡片配灯泡角标与书本母题。图上叠主题色渐变遮罩，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('让学习自然发生').meta({
        description: "图文页主标题（中文，简短有力，贴合教育培训）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落（中文，单段一句话，讲教学理念或课程亮点）" })
    ).min(1).max(3).default([
        '以兴趣为起点设计课堂，把抽象知识拆解成可感知、可练习的小步骤。',
        '老师全程陪伴与反馈，让每位学员在试错中收获信心与持续成长。',
    ]).meta({ description: "正文段落列表（1至3段）" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "要点短语（中文，简短，如教学特色）" })
    ).max(3).default([
        '小班互动教学',
        '阶梯式进阶路径',
        '一对一作业点评',
    ]).meta({ description: "左下要点标签（可空，最多3条）" }),
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "明亮教室里学员围坐讨论，老师在白板前讲解，氛围积极向上，温暖自然光",
    }).meta({ description: "右侧主图（建议课堂/师生互动/学习场景画面）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageRight: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '让学习自然发生'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '以兴趣为起点设计课堂，把抽象知识拆解成可感知、可练习的小步骤。',
            '老师全程陪伴与反馈，让每位学员在试错中收获信心与持续成长。',
        ]
    const bullets = slideData?.bullets || []
    const image = slideData?.image || {
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "明亮教室里学员围坐讨论，老师在白板前讲解，氛围积极向上，温暖自然光",
    }

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
                {/* 背景装饰层：柔和橙蓝光晕 + 圆点网格 + 成长曲线 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="eduRightGlowBlue" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.14" />
                                <stop offset="100%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="eduRightGlowOrange" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="eduRightCurve" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.5" />
                            </linearGradient>
                        </defs>
                        {/* 左上蓝色光晕 */}
                        <circle cx="120" cy="90" r="240" fill="url(#eduRightGlowBlue)" />
                        {/* 右下橙色光晕 */}
                        <circle cx="1180" cy="660" r="260" fill="url(#eduRightGlowOrange)" />
                        {/* 左下圆点装饰网格 */}
                        {[0, 1, 2, 3].map((row) =>
                            [0, 1, 2, 3, 4].map((col) => (
                                <circle
                                    key={`dot-${row}-${col}`}
                                    cx={56 + col * 40}
                                    cy={560 + row * 40}
                                    r="3.2"
                                    fill="var(--secondary-color,#f97316)"
                                    fillOpacity="0.26"
                                />
                            ))
                        )}
                        {/* 成长曲线（向上的学习进阶曲线） */}
                        <path
                            d="M60 470 C 220 440, 320 410, 440 330 S 600 200, 700 150"
                            fill="none"
                            stroke="url(#eduRightCurve)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeDasharray="2 13"
                        />
                    </svg>
                </div>

                {/* 主内容：左文字 + 右大图 */}
                <div className="relative z-10 grid h-full grid-cols-[1fr_0.92fr] gap-12 px-16 py-12">
                    {/* 左侧文字区 */}
                    <div className="flex min-w-0 flex-col justify-center">
                        {/* 顶部小标签：圆角药丸 + 书本图标 */}
                        <span
                            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold leading-relaxed break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.12)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg"
                                strokeColor="currentColor"
                                color="var(--secondary-color,#f97316)"
                                className="w-4 h-4"
                                title="book"
                            />
                            教学理念
                        </span>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#1f2937)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        {/* 双色成长下划线 */}
                        <div className="mt-7 flex items-center gap-2">
                            <div className="h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                            <div className="h-1.5 w-8 rounded-full" style={{ background: "var(--primary-color,#2563eb)" }} />
                            <div className="h-1.5 w-3 rounded-full" style={{ background: "var(--primary-color,#2563eb)", opacity: 0.5 }} />
                        </div>

                        <div className="mt-7 flex flex-col gap-3.5">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-loose break-words"
                                    style={{
                                        color: "var(--background-text,#1f2937)",
                                        opacity: 0.82,
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 要点标签：圆角卡片 + 圆点 */}
                        {bullets.length > 0 && (
                            <div className="mt-9 flex flex-wrap gap-3">
                                {bullets.map((b, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold leading-relaxed break-words"
                                        style={{
                                            color: "var(--background-text,#1f2937)",
                                            background: "var(--card-color,#ffffff)",
                                            borderColor: "var(--stroke,#f1e9d8)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        <span
                                            className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--primary-color,#2563eb)" }}
                                        />
                                        {b}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 右侧大图卡片：圆角友好 + 主题色渐变遮罩 + 灯泡角标 */}
                    <div className="flex min-w-0 items-center">
                        <div
                            className="relative w-full overflow-hidden rounded-3xl border"
                            style={{
                                borderColor: "var(--stroke,#f1e9d8)",
                                background: "var(--card-color,#ffffff)",
                                boxShadow: "0 22px 60px rgba(37,99,235,0.16)",
                                aspectRatio: "4 / 5",
                            }}
                        >
                            <img
                                src={image.__image_url__}
                                alt={image.__image_prompt__}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            {/* 主题色渐变遮罩 */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(150deg, rgba(37,99,235,0.30) 0%, rgba(255,253,247,0.06) 46%, rgba(249,115,22,0.34) 100%)",
                                }}
                            />
                            {/* 内描边柔框 */}
                            <div
                                className="absolute inset-3 rounded-2xl"
                                style={{ border: "1px solid rgba(255,255,255,0.35)" }}
                            />
                            {/* 左上圆点装饰 */}
                            <div className="absolute left-4 top-4 z-10 flex gap-1.5">
                                <span className="h-2 w-2 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                                <span className="h-2 w-2 rounded-full" style={{ background: "var(--card-color,#ffffff)", opacity: 0.85 }} />
                                <span className="h-2 w-2 rounded-full" style={{ background: "var(--primary-color,#2563eb)" }} />
                            </div>
                            {/* 右下灯泡角标（创意/启发母题） */}
                            <div className="absolute bottom-4 right-4 z-10">
                                <div
                                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                                    style={{
                                        background: "var(--secondary-color,#f97316)",
                                        boxShadow: "0 8px 22px rgba(249,115,22,0.42)",
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-6 h-6"
                                        title="lightbulb"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageRight
