import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'realestate-cn-image-right'
export const layoutName = '图文（右图）'
export const layoutDescription = '房产建筑风图文页（右图）：左侧标题 + 段落 + 要点清单，右侧满铺大图叠金铜渐变遮罩。高级灰背景、金铜细线分隔与建筑剪影点缀，轻奢克制，适合项目介绍/区位价值/产品卖点。'

const schema = z.object({
    title: z.string().min(2).max(20).default('择址城市山脊').meta({
        description: "图文页主标题（中文，简短有意境，≤20字）",
    }),
    paragraphs: z.array(
        z.string().min(2).max(56).meta({
            description: "正文段落，一段一句话，≤56字",
        })
    ).min(1).max(3).default([
        '项目坐落于城市中央生态绿轴之上，以克制的设计语言，回应都市精英对理想居所的全部想象。',
        '通透玻璃幕墙与天然石材立面相映，黄昏暖光下，建筑轮廓与远山天际线浑然一体。',
    ]).meta({
        description: "左侧正文段落，1至3段，每段≤56字",
    }),
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "现代高端住宅建筑外立面，黄昏暖光，玻璃幕墙与石材立面，简约线条，杂志质感",
    }).meta({
        description: "右侧满铺大图，建议选用高端建筑/楼盘实景照片",
    }),
    bullets: z.array(
        z.string().min(2).max(24).meta({
            description: "要点短句，≤24字",
        })
    ).max(3).default([
        '约15分钟直达城市核心商圈',
        '270°景观视野俯瞰中央绿廊',
        '意大利进口石材定制立面',
    ]).meta({
        description: "左侧要点清单，最多3条，可留空，每条≤24字",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageRight: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '择址城市山脊'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '项目坐落于城市中央生态绿轴之上，以克制的设计语言，回应都市精英对理想居所的全部想象。',
            '通透玻璃幕墙与天然石材立面相映，黄昏暖光下，建筑轮廓与远山天际线浑然一体。',
        ]
    const bullets = slideData?.bullets || []
    const image = slideData?.image
    const imageUrl = image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = image?.__image_prompt__ || '现代高端住宅建筑外立面，黄昏暖光，玻璃幕墙与石材立面'

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
                {/* 背景：极简细线分隔母题 + 左侧大留白 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    {/* 顶部细装饰横线（左半区） */}
                    <line x1="80" y1="92" x2="660" y2="92" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                    <line x1="80" y1="92" x2="180" y2="92" stroke="var(--primary-color,#b08d57)" strokeWidth="1.5" />
                    {/* 底部细装饰横线（左半区） */}
                    <line x1="80" y1="636" x2="540" y2="636" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                    {/* 左下角极简竖线纹样 */}
                    {[0, 1, 2, 3].map((i) => (
                        <line
                            key={`v${i}`}
                            x1={80 + i * 22}
                            y1="664"
                            x2={80 + i * 22}
                            y2={664 + 36 - i * 6}
                            stroke="var(--secondary-color,#3f3f46)"
                            strokeOpacity={0.16 - i * 0.03}
                            strokeWidth="1"
                        />
                    ))}
                </svg>

                {/* 左上角金铜细框角标 */}
                <div
                    className="absolute left-10 top-10 h-9 w-9"
                    style={{
                        borderTop: "1.5px solid var(--primary-color,#b08d57)",
                        borderLeft: "1.5px solid var(--primary-color,#b08d57)",
                    }}
                    aria-hidden="true"
                />

                {/* 主体：左文字 + 右大图 */}
                <div className="relative z-10 flex h-full">
                    {/* 左：文字区（超大留白） */}
                    <div className="flex w-[52%] flex-shrink-0 flex-col justify-center pl-20 pr-12">
                        {/* eyebrow 细线标识 */}
                        <span
                            className="mb-6 inline-flex w-fit items-center gap-3 text-xs font-light tracking-[0.3em] break-words"
                            style={{ color: "var(--primary-color,#b08d57)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            <span className="inline-block h-px w-8" style={{ background: "var(--primary-color,#b08d57)" }} />
                            ARCHITECTURE
                        </span>

                        {/* 主标题（极简细体） */}
                        <h1
                            className="text-5xl font-light leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        {/* 金铜细分隔线 */}
                        <div
                            className="my-7 h-px w-20"
                            style={{ background: "var(--primary-color,#b08d57)" }}
                        />

                        {/* 正文段落 */}
                        <div className="flex flex-col gap-4">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={`p${i}`}
                                    className="max-w-[34rem] text-base font-light leading-[1.8] break-words"
                                    style={{ color: "var(--secondary-color,#3f3f46)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 要点清单（可空） */}
                        {bullets.length > 0 && (
                            <div className="mt-9 flex flex-col gap-3.5">
                                {bullets.map((b, i) => (
                                    <div key={`b${i}`} className="flex items-center gap-3.5">
                                        {/* 金铜细方点 */}
                                        <span
                                            className="inline-block h-1.5 w-1.5 flex-shrink-0 rotate-45"
                                            style={{ background: "var(--primary-color,#b08d57)" }}
                                            aria-hidden="true"
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

                    {/* 右：满铺大图区 */}
                    <div className="relative flex-1 overflow-hidden">
                        {/* 背景照片 */}
                        <img
                            src={imageUrl}
                            alt={imagePrompt}
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        {/* 金铜 + 深色渐变遮罩：贴合主题、压低边缘以接合左侧留白 */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(270deg, rgba(39,39,42,0.06) 0%, rgba(39,39,42,0.14) 62%, rgba(244,244,245,0.55) 100%)",
                            }}
                            aria-hidden="true"
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(160deg, color-mix(in srgb, var(--primary-color,#b08d57) 22%, transparent) 0%, rgba(0,0,0,0) 48%)",
                            }}
                            aria-hidden="true"
                        />

                        {/* 极简建筑剪影 + 细线装饰层 */}
                        <svg
                            viewBox="0 0 600 720"
                            className="absolute inset-0 h-full w-full"
                            preserveAspectRatio="xMidYMid slice"
                            aria-hidden="true"
                        >
                            {/* 底部建筑剪影（错落天际线） */}
                            <path
                                d="M0 720 L0 596 L70 596 L70 540 L150 540 L150 580 L236 580 L236 500 L308 500 L308 552 L396 552 L396 510 L476 510 L476 566 L546 566 L546 528 L600 528 L600 720 Z"
                                fill="rgba(39,39,42,0.26)"
                            />
                            {/* 右上角细竖线纹样 */}
                            {[0, 1, 2, 3].map((i) => (
                                <line
                                    key={`rl${i}`}
                                    x1={544 - i * 22}
                                    y1="96"
                                    x2={544 - i * 22}
                                    y2="248"
                                    stroke="#ffffff"
                                    strokeOpacity={0.14 - i * 0.025}
                                    strokeWidth="1"
                                />
                            ))}
                            {/* 顶部金铜细横线 */}
                            <line x1="56" y1="96" x2="544" y2="96" stroke="var(--primary-color,#b08d57)" strokeOpacity="0.5" strokeWidth="1" />
                        </svg>

                        {/* 右下角金铜细框角标 */}
                        <div
                            className="absolute bottom-10 right-10 h-9 w-9"
                            style={{
                                borderBottom: "1.5px solid var(--primary-color,#b08d57)",
                                borderRight: "1.5px solid var(--primary-color,#b08d57)",
                            }}
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageRight
