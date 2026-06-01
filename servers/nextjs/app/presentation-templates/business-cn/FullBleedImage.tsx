import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'business-cn-full-bleed-image'
export const layoutName = '全幅大图'
export const layoutDescription = '商务风全幅大图页：满铺照片叠加深蓝渐变遮罩保证文字可读，左下角大标题与副标题，配经典网格与橙色强调装饰。适用于章节封面或视觉过渡页。'

const schema = z.object({
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "现代化企业总部玻璃幕墙大楼，蓝调商务氛围，宽幅全景",
    }).meta({
        description: "满铺背景图，建议选用大气的商务/建筑/城市场景照片",
    }),
    title: z.string().min(2).max(20).default('稳健前行，价值共创').meta({
        description: "叠加在图片上的主标题（中文，简短有力，≤20字）",
    }),
    subtitle: z.string().min(2).max(40).default('以专业沉淀驱动企业长期增长').meta({
        description: "副标题，一句话补充说明（可选，≤40字）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FullBleedImage: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const image = slideData?.image
    const imageUrl = image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = image?.__image_prompt__ || "现代化企业总部玻璃幕墙大楼，蓝调商务氛围，宽幅全景"
    const title = slideData?.title || '稳健前行，价值共创'
    const subtitle = slideData?.subtitle || '以专业沉淀驱动企业长期增长'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f8fafc)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 满铺背景图 */}
                <img
                    src={imageUrl}
                    alt={imagePrompt}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* 深色渐变遮罩：左下深、右上浅，保证文字可读 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(105deg, rgba(15,23,42,0.86) 0%, rgba(30,58,138,0.62) 42%, rgba(30,58,138,0.16) 78%, rgba(30,58,138,0.05) 100%)",
                    }}
                    aria-hidden="true"
                />
                {/* 底部加深，托起标题 */}
                <div
                    className="absolute inset-x-0 bottom-0 h-2/3"
                    style={{
                        background: "linear-gradient(to top, rgba(15,23,42,0.78) 0%, rgba(15,23,42,0) 100%)",
                    }}
                    aria-hidden="true"
                />

                {/* 经典网格装饰母题 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern id="bizFbiGrid" width="64" height="64" patternUnits="userSpaceOnUse">
                            <path d="M64 0 L0 0 0 64" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="1280" height="720" fill="url(#bizFbiGrid)" />
                </svg>

                {/* 右上角几何面板 + 同心圆装饰 */}
                <svg
                    viewBox="0 0 420 300"
                    className="absolute top-0 right-0 h-[42%] w-auto"
                    preserveAspectRatio="xMaxYMin meet"
                    aria-hidden="true"
                >
                    {[0, 1, 2, 3].map((i) => (
                        <circle key={i} cx="360" cy="70" r={46 + i * 42} fill="none" stroke="#ffffff" strokeOpacity={0.10} strokeWidth="1.5" />
                    ))}
                    <line x1="120" y1="-20" x2="440" y2="240" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1.5" />
                </svg>

                {/* 顶部橙色强调标记条 */}
                <div className="absolute left-16 top-12 z-10 flex items-center gap-3">
                    <div
                        className="h-3 w-3 flex-shrink-0 rounded-full"
                        style={{
                            background: "var(--secondary-color,#f97316)",
                            boxShadow: "0 0 0 5px rgba(249,115,22,0.20)",
                        }}
                    />
                    <span
                        className="text-sm font-medium tracking-wide break-words"
                        style={{ color: "var(--primary-text,#ffffff)", opacity: 0.92, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        企业愿景
                    </span>
                </div>

                {/* 左下主文案区 */}
                <div className="relative z-10 flex h-full w-full flex-col justify-end px-16 pb-16">
                    <div className="max-w-[62%]">
                        {/* 橙色强调短线 */}
                        <div
                            className="mb-6 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />
                        <h1
                            className="text-6xl font-black leading-[1.2] break-words"
                            style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <p
                            className="mt-5 text-xl leading-relaxed break-words"
                            style={{ color: "var(--primary-text,#ffffff)", opacity: 0.88, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FullBleedImage
