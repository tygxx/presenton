import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'travel-cn-full-bleed-image'
export const layoutName = '全幅大图'
export const layoutDescription = '旅游文旅满幅大图版式：风景大图满铺，叠加深色渐变遮罩保证文字可读，左下角标题与副标题，配指南针与路线点装饰。'

const schema = z.object({
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "碧海蓝天的海岛风光，金色阳光洒在沙滩与远山，明媚轻盈的旅行氛围",
    }).meta({
        description: "满铺背景风景大图",
    }),
    eyebrow: z.string().min(2).max(16).default('目的地 · 探索之旅').meta({
        description: "标题上方的小标签，如目的地分类或行程主题",
    }),
    title: z.string().min(2).max(20).default('与远方不期而遇').meta({
        description: "幻灯片主标题（中文，简短有力，≤20字）",
    }),
    subtitle: z.string().min(2).max(40).default('收拾行囊，奔赴一段明媚而轻盈的山海之约').meta({
        description: "副标题，一句话补充行程氛围（可选，≤40字）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FullBleedImage: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const image = slideData?.image || {
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "碧海蓝天的海岛风光，金色阳光洒在沙滩与远山，明媚轻盈的旅行氛围",
    }
    const eyebrow = slideData?.eyebrow || '目的地 · 探索之旅'
    const title = slideData?.title || '与远方不期而遇'
    const subtitle = slideData?.subtitle || '收拾行囊，奔赴一段明媚而轻盈的山海之约'

    const compassIcon = {
        __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg",
        __icon_query__: "compass",
    }
    const pinIcon = {
        __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg",
        __icon_query__: "map pin",
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
                    background: "var(--background-color,#f0f9ff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 满铺背景风景大图 */}
                <img
                    src={image.__image_url__}
                    alt={image.__image_prompt__}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* 深色 + 主题色渐变遮罩，保证文字可读 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(180deg, rgba(12,74,110,0.30) 0%, rgba(12,74,110,0.10) 40%, rgba(8,55,82,0.78) 100%)",
                    }}
                    aria-hidden="true"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(110deg, rgba(8,145,178,0.55) 0%, rgba(8,145,178,0.12) 45%, rgba(245,158,11,0.0) 100%)",
                    }}
                    aria-hidden="true"
                />

                {/* 右上角指南针装饰 */}
                <div className="absolute right-10 top-9 z-10 flex items-center gap-3">
                    <span
                        className="text-sm font-medium break-words"
                        style={{ color: "var(--primary-text,#ffffff)", opacity: 0.92, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        启程
                    </span>
                    <div
                        className="flex h-11 w-11 items-center justify-center rounded-full"
                        style={{
                            background: "rgba(255,255,255,0.14)",
                            border: "1px solid var(--stroke,#bae6fd)",
                        }}
                    >
                        <RemoteSvgIcon
                            url={compassIcon.__icon_url__}
                            strokeColor="currentColor"
                            color="var(--primary-text,#ffffff)"
                            className="w-6 h-6"
                            title={compassIcon.__icon_query__}
                        />
                    </div>
                </div>

                {/* 右上角路线点缀 SVG */}
                <svg
                    viewBox="0 0 320 200"
                    className="absolute right-0 top-0 z-0 h-[200px] w-[320px]"
                    preserveAspectRatio="xMaxYMin meet"
                    aria-hidden="true"
                >
                    <path
                        d="M40 160 C 110 110, 130 70, 220 60 S 300 30, 300 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeOpacity="0.40"
                        strokeWidth="2"
                        strokeDasharray="6 8"
                        strokeLinecap="round"
                    />
                    <circle cx="40" cy="160" r="5" fill="var(--secondary-color,#f59e0b)" />
                    <circle cx="220" cy="60" r="4" fill="#ffffff" fillOpacity="0.85" />
                    <circle cx="300" cy="24" r="6" fill="var(--secondary-color,#f59e0b)" />
                </svg>

                {/* 左下角主内容：标签 + 标题 + 副标题 */}
                <div className="relative z-10 flex h-full w-full flex-col justify-end px-16 pb-14">
                    <span
                        className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                        style={{
                            color: "var(--primary-text,#ffffff)",
                            background: "rgba(8,145,178,0.42)",
                            border: "1px solid var(--stroke,#bae6fd)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <RemoteSvgIcon
                            url={pinIcon.__icon_url__}
                            strokeColor="currentColor"
                            color="var(--secondary-color,#f59e0b)"
                            className="w-4 h-4"
                            title={pinIcon.__icon_query__}
                        />
                        {eyebrow}
                    </span>

                    <h1
                        className="max-w-[58rem] text-6xl font-black leading-[1.2] break-words"
                        style={{
                            color: "var(--primary-text,#ffffff)",
                            textShadow: "0 2px 18px rgba(8,55,82,0.55)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    <div
                        className="my-6 h-1.5 w-24 rounded-full"
                        style={{ background: "var(--secondary-color,#f59e0b)" }}
                    />

                    {subtitle && (
                        <p
                            className="max-w-[42rem] text-xl leading-relaxed break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                opacity: 0.95,
                                textShadow: "0 1px 10px rgba(8,55,82,0.5)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
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
