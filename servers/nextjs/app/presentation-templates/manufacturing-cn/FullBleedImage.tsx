import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'manufacturing-cn-full-bleed-image'
export const layoutName = '全幅大图'
export const layoutDescription = '智能制造风全幅大图：满铺图片 + 深色渐变遮罩保证文字可读，叠加标题与副标题。装饰母题为齿轮、产线与精密网格，工业硬朗气质。'

const schema = z.object({
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "现代化智能制造车间，自动化机械臂产线，金属质感冷色调工业氛围",
    }).meta({
        description: "满铺背景大图，建议使用车间/产线/机械臂等工业场景照片",
    }),
    title: z.string().min(2).max(20).default('智造未来 精密驱动').meta({
        description: "图片上叠加的主标题（中文，简短有力）",
    }),
    subtitle: z.string().min(2).max(40).default('以数字化产线与精密工艺，重塑高端制造价值').meta({
        description: "副标题，一句话补充说明（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FullBleedImage: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const image = slideData?.image
    const imageUrl = image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = image?.__image_prompt__ || "现代化智能制造车间，自动化机械臂产线，金属质感冷色调工业氛围"
    const title = slideData?.title || '智造未来 精密驱动'
    const subtitle = slideData?.subtitle || '以数字化产线与精密工艺，重塑高端制造价值'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#1f2937)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 满铺背景图 */}
                <img
                    src={imageUrl}
                    alt={imagePrompt}
                    className="absolute inset-0 h-full w-full object-cover"
                    aria-hidden="true"
                />

                {/* 主题色深色渐变遮罩：左下深、右上透，保证文字可读 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(115deg, rgba(31,41,55,0.94) 0%, rgba(31,41,55,0.72) 42%, rgba(31,41,55,0.30) 100%)",
                    }}
                    aria-hidden="true"
                />
                {/* 底部加深，托住文字 */}
                <div
                    className="absolute inset-x-0 bottom-0 h-1/2"
                    style={{
                        background: "linear-gradient(to top, rgba(17,24,39,0.92) 0%, rgba(17,24,39,0) 100%)",
                    }}
                    aria-hidden="true"
                />

                {/* 装饰层：精密网格 + 齿轮 + 产线母题 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern id="mfgGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0H0V48" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.45" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="mfgEdgeGlow" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* 精密网格仅铺在左下信息区，低调内敛 */}
                    <rect x="0" y="300" width="720" height="420" fill="url(#mfgGrid)" opacity="0.5" />
                    <rect x="0" y="0" width="1280" height="720" fill="url(#mfgEdgeGlow)" />

                    {/* 右上角齿轮母题（金属线条） */}
                    <g transform="translate(1132 132)" opacity="0.5">
                        <circle r="62" fill="none" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.55" strokeWidth="2.5" />
                        <circle r="30" fill="none" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.5" strokeWidth="2" />
                        <circle r="6" fill="var(--secondary-color,#f97316)" fillOpacity="0.65" />
                        {Array.from({ length: 12 }).map((_, i) => {
                            const a = (i * Math.PI) / 6
                            const x1 = Math.cos(a) * 62
                            const y1 = Math.sin(a) * 62
                            const x2 = Math.cos(a) * 80
                            const y2 = Math.sin(a) * 80
                            return (
                                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--secondary-color,#f97316)" strokeOpacity="0.55" strokeWidth="3" />
                            )
                        })}
                    </g>

                    {/* 右上角小齿轮，啮合感 */}
                    <g transform="translate(1036 92)" opacity="0.4">
                        <circle r="34" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.7" strokeWidth="2" />
                        <circle r="14" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.6" strokeWidth="1.5" />
                        {Array.from({ length: 8 }).map((_, i) => {
                            const a = (i * Math.PI) / 4
                            const x1 = Math.cos(a) * 34
                            const y1 = Math.sin(a) * 34
                            const x2 = Math.cos(a) * 46
                            const y2 = Math.sin(a) * 46
                            return (
                                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.7" strokeWidth="2.5" />
                            )
                        })}
                    </g>

                    {/* 底部产线母题：硬朗水平线 + 节点 */}
                    <line x1="0" y1="624" x2="1280" y2="624" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.35" strokeWidth="1.5" />
                    {[120, 360, 600, 840, 1080].map((cx, i) => (
                        <g key={i}>
                            <circle cx={cx} cy="624" r="4" fill="var(--secondary-color,#f97316)" fillOpacity="0.75" />
                            <line x1={cx} y1="624" x2={cx} y2="604" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.4" strokeWidth="1.5" />
                        </g>
                    ))}
                </svg>

                {/* 顶部主题色硬朗细条，工业精密感 */}
                <div
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{ background: "linear-gradient(to right, var(--primary-color,#3b82f6), var(--secondary-color,#f97316))" }}
                    aria-hidden="true"
                />

                {/* 内容层：左下角标题区，垂直水平合理分布 */}
                <div className="relative z-10 flex h-full w-full flex-col justify-end px-16 pb-16 pt-14">
                    <div className="flex max-w-[58rem] flex-col gap-6">
                        {/* 行业小标签 */}
                        <span
                            className="inline-flex w-fit items-center gap-2 rounded-sm px-4 py-1.5 text-sm font-semibold tracking-wide break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                background: "var(--primary-color,#3b82f6)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            智能制造 · 数字化产线
                        </span>

                        {/* 主标题 */}
                        <h1
                            className="text-6xl font-black leading-[1.2] break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                textShadow: "0 2px 18px rgba(0,0,0,0.55)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        {/* 强调短线 */}
                        <div
                            className="h-1.5 w-28 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />

                        {/* 副标题 */}
                        {subtitle && (
                            <p
                                className="max-w-[42rem] text-xl leading-relaxed break-words"
                                style={{
                                    color: "var(--background-text,#e5e7eb)",
                                    textShadow: "0 1px 12px rgba(0,0,0,0.5)",
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
