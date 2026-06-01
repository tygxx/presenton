import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'travel-cn-image-right'
export const layoutName = '图文（右图）'
export const layoutDescription = '旅游文旅图文页（右图）：左侧标题、正文段落与可选要点，右侧风景大图叠海蓝暖阳渐变遮罩，搭配指南针角标与目的地卡片点缀。明媚轻盈，令人向往。'

const schema = z.object({
    title: z.string().min(2).max(20).default('遇见远方的风景').meta({
        description: "图文页主标题（中文，简短有向往感）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落，一句话描述目的地或行程亮点" })
    ).min(1).max(3).default([
        '沿着蜿蜒的海岸线一路向南，听海风讲述古老港湾的故事。',
        '清晨的薄雾散去，远山与碧海在天际线处温柔相拥。',
        '从喧嚣都市到静谧小镇，让旅途成为一场重新出发的告白。',
    ]).meta({ description: "正文段落，1 到 3 句" }),
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '碧海蓝天的海岸线风光，远处青山与白色小镇，明媚阳光下的旅游目的地',
    }).meta({ description: "右侧风景大图" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "行程要点/亮点标签，简短" })
    ).max(3).default([
        '海岸线自驾',
        '古镇慢生活',
        '日落观景台',
    ]).meta({ description: "可选的行程要点，最多 3 条" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageRight: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '遇见远方的风景'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '沿着蜿蜒的海岸线一路向南，听海风讲述古老港湾的故事。',
            '清晨的薄雾散去，远山与碧海在天际线处温柔相拥。',
            '从喧嚣都市到静谧小镇，让旅途成为一场重新出发的告白。',
        ]
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png'
    const imagePrompt = slideData?.image?.__image_prompt__ || '碧海蓝天的海岸线风光'

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
                {/* 背景轻盈装饰：海蓝光晕 + 路线虚线 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="travelRightGlow" cx="18%" cy="16%" r="42%">
                                <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="travelRightGlow2" cx="40%" cy="92%" r="38%">
                                <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#travelRightGlow)" />
                        <rect width="1280" height="720" fill="url(#travelRightGlow2)" />
                        {/* 旅途路线虚线点缀 */}
                        <path
                            d="M40 600 C 180 540, 240 420, 380 460 S 560 560, 660 470"
                            fill="none"
                            stroke="var(--secondary-color,#f59e0b)"
                            strokeOpacity="0.30"
                            strokeWidth="2"
                            strokeDasharray="2 12"
                            strokeLinecap="round"
                        />
                        <circle cx="40" cy="600" r="5" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.55" />
                        <circle cx="660" cy="470" r="5" fill="var(--primary-color,#0891b2)" fillOpacity="0.55" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full items-stretch gap-10 pl-16 pr-10 py-12">
                    {/* 左侧：文字内容 */}
                    <div className="flex w-[46%] flex-shrink-0 flex-col justify-center">
                        {/* 指南针角标 + 分类 */}
                        <div className="mb-6 flex items-center gap-3">
                            <div
                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                                style={{ background: "var(--primary-color,#0891b2)", color: "var(--primary-text,#ffffff)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-5 h-5"
                                    title="compass"
                                />
                            </div>
                            <span
                                className="inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium break-words"
                                style={{
                                    color: "var(--primary-color,#0891b2)",
                                    background: "rgba(8,145,178,0.10)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                目的地推荐
                            </span>
                        </div>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div
                            className="my-6 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                        />

                        <div className="space-y-4">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.8] break-words"
                                    style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.88, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 可选行程要点 */}
                        {bullets.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-3">
                                {bullets.map((b, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium break-words"
                                        style={{
                                            background: "var(--card-color,#ffffff)",
                                            borderColor: "var(--stroke,#bae6fd)",
                                            color: "var(--background-text,#0c4a6e)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        <span
                                            className="h-2 w-2 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                                        />
                                        {b}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 右侧：风景大图 + 海蓝暖阳渐变遮罩 + 目的地卡片 */}
                    <div className="relative flex-1 overflow-hidden rounded-3xl shadow-lg">
                        <img
                            src={imageUrl}
                            alt={imagePrompt}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* 主题色渐变遮罩 */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(135deg, rgba(8,145,178,0.34) 0%, rgba(8,145,178,0.05) 42%, rgba(245,158,11,0.28) 100%)",
                            }}
                        />
                        {/* 底部柔光 */}
                        <div
                            className="absolute inset-x-0 bottom-0 h-2/5"
                            style={{ background: "linear-gradient(to top, rgba(12,74,110,0.55), rgba(12,74,110,0))" }}
                        />

                        {/* 右上角指南针角标 */}
                        <div
                            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full"
                            style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.45)" }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/navigation-arrow-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-5 h-5"
                                title="navigation"
                            />
                        </div>

                        {/* 左下角目的地卡片 */}
                        <div
                            className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-md"
                            style={{ background: "rgba(255,255,255,0.92)", border: "1px solid var(--stroke,#bae6fd)" }}
                        >
                            <div
                                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)", color: "var(--primary-text,#ffffff)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-4 h-4"
                                    title="map pin"
                                />
                            </div>
                            <div className="flex flex-col leading-snug">
                                <span
                                    className="text-sm font-bold break-words"
                                    style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    精选目的地
                                </span>
                                <span
                                    className="text-xs break-words"
                                    style={{ color: "var(--primary-color,#0891b2)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    一路向海 · 慢享时光
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageRight
