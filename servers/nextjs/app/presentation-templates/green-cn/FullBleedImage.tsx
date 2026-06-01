import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'green-cn-full-bleed-image'
export const layoutName = '全幅大图'
export const layoutDescription = '新能源环保风全幅大图：满铺主图 + 深绿渐变遮罩保证文字可读，左下角叶片角标与大标题、副标题叠加。适合章节封面或主题视觉页。'

const schema = z.object({
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "航拍视角下的绿色丘陵与风力发电机，清晨阳光，蓝天白云，清新自然",
    }).meta({
        description: "满铺背景大图，建议使用大气的自然/能源场景照片",
    }),
    eyebrow: z.string().min(2).max(16).default('绿色未来 · 可持续').meta({
        description: "标题上方的小标签/分类",
    }),
    title: z.string().min(2).max(20).default('让能源回归自然').meta({
        description: "叠加在图片上的主标题（中文，简短有力）",
    }),
    subtitle: z.string().min(4).max(40).default('以清洁能源驱动低碳生活，共建可持续的绿色家园').meta({
        description: "副标题，一句话补充说明（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FullBleedImage: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = slideData?.image?.__image_prompt__ || "航拍视角下的绿色丘陵与风力发电机，清晨阳光，蓝天白云，清新自然"
    const eyebrow = slideData?.eyebrow || '绿色未来 · 可持续'
    const title = slideData?.title || '让能源回归自然'
    const subtitle = slideData?.subtitle || '以清洁能源驱动低碳生活，共建可持续的绿色家园'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f0fdf4)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 满铺背景大图 */}
                <img
                    src={imageUrl}
                    alt={imagePrompt}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* 深绿色渐变遮罩：左下重、右上透，保证文字可读 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(115deg, rgba(20,83,45,0.88) 0%, rgba(20,83,45,0.55) 42%, rgba(8,145,178,0.18) 72%, rgba(8,145,178,0) 100%)",
                    }}
                />
                {/* 底部加深，托住标题 */}
                <div
                    className="absolute inset-x-0 bottom-0 h-2/3"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(6,40,24,0.85) 0%, rgba(6,40,24,0.25) 55%, rgba(6,40,24,0) 100%)",
                    }}
                />

                {/* 自然有机曲线 + 叶片母题装饰层 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="greenFbiLeaf" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#86efac" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.10" />
                        </linearGradient>
                        <radialGradient id="greenFbiGlow" cx="0.18" cy="0.22" r="0.5">
                            <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.30" />
                            <stop offset="100%" stopColor="#bbf7d0" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* 左上柔光晕 */}
                    <rect width="1280" height="720" fill="url(#greenFbiGlow)" />

                    {/* 右上角能源轨道环（地球/自然循环母题） */}
                    {[0, 1, 2].map((i) => (
                        <circle
                            key={i}
                            cx="1150"
                            cy="120"
                            r={70 + i * 56}
                            fill="none"
                            stroke="#ffffff"
                            strokeOpacity={0.16 - i * 0.04}
                            strokeWidth="1.5"
                        />
                    ))}

                    {/* 底部自然有机曲线（起伏的地平线/丘陵） */}
                    <path
                        d="M0 612 C 220 560 420 648 660 600 C 900 552 1080 624 1280 580 L 1280 720 L 0 720 Z"
                        fill="url(#greenFbiLeaf)"
                    />
                    <path
                        d="M0 656 C 260 614 460 684 720 644 C 980 604 1120 666 1280 632"
                        fill="none"
                        stroke="#bbf7d0"
                        strokeOpacity="0.45"
                        strokeWidth="2"
                    />

                    {/* 飘动的叶片剪影 */}
                    <path
                        d="M1052 470 C 1052 430 1086 396 1126 396 C 1126 436 1092 470 1052 470 Z M1052 470 L1126 396"
                        fill="#86efac"
                        fillOpacity="0.22"
                        stroke="#bbf7d0"
                        strokeOpacity="0.40"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M168 168 C 168 138 193 113 223 113 C 223 143 198 168 168 168 Z M168 168 L223 113"
                        fill="#86efac"
                        fillOpacity="0.18"
                        stroke="#bbf7d0"
                        strokeOpacity="0.35"
                        strokeWidth="1.5"
                    />
                </svg>

                {/* 内容层：左下分布 */}
                <div className="relative z-10 flex h-full flex-col justify-end p-16">
                    {/* 叶片角标 + 小标签 */}
                    <div className="mb-6 flex items-center gap-3">
                        <div
                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                            style={{
                                background: "var(--primary-color,#16a34a)",
                                boxShadow: "0 0 0 6px rgba(22,163,74,0.22)",
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-6 h-6"
                                title="leaf"
                            />
                        </div>
                        <span
                            className="inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium leading-relaxed break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                background: "rgba(8,145,178,0.32)",
                                border: "1px solid rgba(187,247,208,0.40)",
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {eyebrow}
                        </span>
                    </div>

                    {/* 主标题 */}
                    <h1
                        className="max-w-[60rem] text-6xl font-black leading-[1.2] break-words"
                        style={{
                            color: "var(--primary-text,#ffffff)",
                            textShadow: "0 2px 18px rgba(6,40,24,0.45)",
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    {/* 强调横线 */}
                    <div
                        className="my-7 h-1.5 w-24 rounded-full"
                        style={{
                            background:
                                "linear-gradient(90deg, var(--primary-color,#16a34a), var(--secondary-color,#0891b2))",
                        }}
                    />

                    {/* 副标题 */}
                    {subtitle && (
                        <p
                            className="max-w-[42rem] text-xl leading-relaxed break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                opacity: 0.92,
                                textShadow: "0 1px 12px rgba(6,40,24,0.40)",
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default FullBleedImage
