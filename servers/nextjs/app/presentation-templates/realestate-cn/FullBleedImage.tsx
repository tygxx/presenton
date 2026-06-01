import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'realestate-cn-full-bleed-image'
export const layoutName = '全幅大图'
export const layoutDescription = '房产建筑风全幅大图：满铺背景照片 + 深色金铜渐变遮罩，叠加大标题与副标题。极简细线 + 建筑剪影点缀，轻奢克制，文字始终清晰可读。'

const schema = z.object({
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "现代高端住宅建筑外立面，黄昏暖光，简约线条，玻璃幕墙，杂志质感",
    }).meta({
        description: "满铺背景图片，建议选用高端建筑/楼盘实景照片",
    }),
    eyebrow: z.string().min(2).max(16).default('臻境系 · 城市人居').meta({
        description: "标题上方的小标签/系列名，如『臻境系』『城市人居』",
    }),
    title: z.string().min(2).max(20).default('栖居于光与境之间').meta({
        description: "满幅大图上的主标题（中文，简短有意境，≤20字）",
    }),
    subtitle: z.string().min(2).max(40).default('以克制的设计语言，重塑城市中央的理想居所').meta({
        description: "副标题，一句话补充意境或卖点（可选，≤40字）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FullBleedImage: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const image = slideData?.image
    const imageUrl = image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = image?.__image_prompt__ || '现代高端住宅建筑外立面，黄昏暖光，简约线条'
    const eyebrow = slideData?.eyebrow || '臻境系 · 城市人居'
    const title = slideData?.title || '栖居于光与境之间'
    const subtitle = slideData?.subtitle || '以克制的设计语言，重塑城市中央的理想居所'

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
                {/* 满铺背景照片 */}
                <img
                    src={imageUrl}
                    alt={imagePrompt}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* 深色 + 金铜渐变遮罩：保证文字可读 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(39,39,42,0.10) 0%, rgba(39,39,42,0.18) 42%, rgba(39,39,42,0.82) 100%)",
                    }}
                    aria-hidden="true"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(105deg, rgba(63,63,70,0.55) 0%, rgba(63,63,70,0.12) 45%, rgba(0,0,0,0) 70%)",
                    }}
                    aria-hidden="true"
                />
                {/* 金铜光晕点缀（右上角） */}
                <div
                    className="absolute"
                    style={{
                        top: '-12%', right: '-6%', width: '34%', height: '46%', borderRadius: '9999px',
                        background: "radial-gradient(circle, color-mix(in srgb, var(--primary-color,#b08d57) 28%, transparent) 0%, rgba(0,0,0,0) 70%)",
                    }}
                    aria-hidden="true"
                />

                {/* 极简建筑剪影 + 细线装饰层 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    {/* 底部建筑剪影 */}
                    <path
                        d="M0 720 L0 612 L92 612 L92 540 L188 540 L188 596 L300 596 L300 500 L300 500 L356 500 L356 560 L470 560 L470 470 L548 470 L548 540 L660 540 L660 588 L780 588 L780 512 L880 512 L880 568 L990 568 L990 528 L1090 528 L1090 600 L1190 600 L1190 556 L1280 556 L1280 720 Z"
                        fill="rgba(39,39,42,0.34)"
                    />
                    {/* 细分割线（顶部框线） */}
                    <line x1="64" y1="92" x2="1216" y2="92" stroke="var(--primary-color,#b08d57)" strokeOpacity="0.55" strokeWidth="1" />
                    {/* 右侧极简竖线纹样 */}
                    {[0, 1, 2, 3].map((i) => (
                        <line
                            key={i}
                            x1={1216 - i * 26}
                            y1="120"
                            x2={1216 - i * 26}
                            y2="300"
                            stroke="#ffffff"
                            strokeOpacity={0.12 - i * 0.02}
                            strokeWidth="1"
                        />
                    ))}
                </svg>

                {/* 内容层：flex 垂直分布 */}
                <div className="relative z-10 flex h-full flex-col justify-between px-16 pt-12 pb-14">
                    {/* 顶部：系列标签 + 角标 */}
                    <div className="flex items-center justify-between">
                        <span
                            className="text-sm font-light tracking-wide break-words"
                            style={{ color: "var(--primary-text,#ffffff)", opacity: 0.92, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {eyebrow}
                        </span>
                        <span
                            className="inline-flex items-center gap-2 text-xs font-light break-words"
                            style={{ color: "var(--primary-color,#b08d57)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            <span
                                className="inline-block"
                                style={{ width: '28px', height: '1px', background: "var(--primary-color,#b08d57)" }}
                            />
                            ARCHITECTURE
                        </span>
                    </div>

                    {/* 底部：主标题 + 副标题 */}
                    <div className="flex flex-col">
                        {/* 金铜短线 */}
                        <div
                            className="mb-6 h-px w-20"
                            style={{ background: "var(--primary-color,#b08d57)" }}
                        />
                        <h1
                            className="text-6xl font-light leading-[1.25] break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                textShadow: '0 2px 18px rgba(0,0,0,0.45)',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        <p
                            className="mt-5 max-w-[40rem] text-lg font-light leading-relaxed break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                opacity: 0.86,
                                textShadow: '0 1px 12px rgba(0,0,0,0.4)',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
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
