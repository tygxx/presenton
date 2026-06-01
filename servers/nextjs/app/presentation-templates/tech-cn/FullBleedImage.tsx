import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'tech-cn-full-bleed-image'
export const layoutName = '全幅大图'
export const layoutDescription = '科技风全幅大图：满铺背景图叠加霓虹蓝紫深色渐变遮罩与几何网格光晕，左下角大标题与副标题。遮罩保证文字在任意图片上的可读性。'

const schema = z.object({
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "未来科技数据中心，蓝紫色霓虹光线与电路质感，深色调全幅背景",
    }).meta({
        description: "满铺背景大图",
    }),
    title: z.string().min(2).max(20).default('智能重塑产业未来').meta({
        description: "叠加在大图上的主标题（中文，简短有力，建议不超过 20 字）",
    }),
    subtitle: z.string().min(2).max(40).default('以 AI 与云原生算力，驱动数字化转型新范式').meta({
        description: "副标题，一句话补充说明（可选，建议不超过 40 字）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FullBleedImage: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = slideData?.image?.__image_prompt__ || "未来科技数据中心，蓝紫色霓虹光线与电路质感，深色调全幅背景"
    const title = slideData?.title || '智能重塑产业未来'
    const subtitle = slideData?.subtitle || '以 AI 与云原生算力，驱动数字化转型新范式'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0a0e1a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景大图（满铺） */}
                <img
                    src={imageUrl}
                    alt={imagePrompt}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* 深色霓虹渐变遮罩：左下角加重，保证文字可读 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(105deg, rgba(10,14,26,0.94) 0%, rgba(10,14,26,0.78) 38%, rgba(10,14,26,0.30) 70%, rgba(10,14,26,0.18) 100%)",
                    }}
                />
                {/* 霓虹蓝紫高光叠加 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(120% 90% at 12% 96%, rgba(59,130,246,0.40) 0%, rgba(59,130,246,0) 46%), radial-gradient(110% 80% at 96% 6%, rgba(139,92,246,0.34) 0%, rgba(139,92,246,0) 50%)",
                        mixBlendMode: "screen",
                    }}
                />

                {/* 几何网格 + 电路线 + 光晕装饰层 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern id="techFbiGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0H0V48" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.10" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="techFbiLine" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.9" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#techFbiGrid)" />
                    {/* 右上角霓虹同心弧 */}
                    {[0, 1, 2, 3].map((i) => (
                        <circle key={i} cx="1180" cy="90" r={70 + i * 64} fill="none" stroke="url(#techFbiLine)" strokeOpacity={0.22} strokeWidth="1.5" />
                    ))}
                    {/* 电路线 */}
                    <path d="M0 250 H180 L240 190 H440" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.28" strokeWidth="1.5" />
                    <path d="M1280 470 H1080 L1020 530 H760" fill="none" stroke="var(--secondary-color,#8b5cf6)" strokeOpacity="0.28" strokeWidth="1.5" />
                    {[ [180, 250], [240, 190], [1080, 470], [1020, 530] ].map(([cx, cy], i) => (
                        <circle key={i} cx={cx} cy={cy} r="3.5" fill="var(--primary-color,#3b82f6)" fillOpacity="0.7" />
                    ))}
                </svg>

                {/* 内容层：左下大标题 */}
                <div className="relative z-10 flex h-full w-full flex-col justify-end px-16 pb-16">
                    {/* 顶部小标签 */}
                    <div className="flex flex-1 items-start pt-14">
                        <span
                            className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium leading-relaxed break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                background: "rgba(59,130,246,0.16)",
                                borderColor: "var(--primary-color,#3b82f6)",
                                boxShadow: "0 0 18px rgba(59,130,246,0.35)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#8b5cf6)", boxShadow: "0 0 8px rgba(139,92,246,0.9)" }}
                            />
                            TECH · 科技互联网
                        </span>
                    </div>

                    {/* 霓虹强调短线 */}
                    <div
                        className="mb-6 h-1.5 w-28 rounded-full"
                        style={{
                            background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                            boxShadow: "0 0 20px rgba(59,130,246,0.55)",
                        }}
                    />

                    <h1
                        className="max-w-[60rem] text-6xl font-black leading-[1.2] break-words"
                        style={{
                            color: "var(--primary-text,#ffffff)",
                            textShadow: "0 2px 24px rgba(10,14,26,0.85)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    {subtitle && (
                        <p
                            className="mt-5 max-w-[46rem] text-xl leading-relaxed break-words"
                            style={{
                                color: "var(--background-text,#e5e7eb)",
                                textShadow: "0 1px 16px rgba(10,14,26,0.8)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* 左侧霓虹竖描边光条 */}
                <div
                    className="absolute left-0 top-0 h-full w-1.5"
                    style={{
                        background: "linear-gradient(180deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                        boxShadow: "0 0 22px rgba(59,130,246,0.6)",
                    }}
                />
            </div>
        </>
    )
}

export default FullBleedImage
