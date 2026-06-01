import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'travel-cn-image-left'
export const layoutName = '图文（左图）'
export const layoutDescription = '旅游文旅风图文页：左侧风景大图叠暖阳渐变遮罩，右侧标题、段落与目的地要点。明媚海蓝配暖阳橙，指南针与路线点缀，轻盈令人向往。'

const schema = z.object({
    title: z.string().min(2).max(20).default('邂逅山海之间').meta({
        description: "图文页主标题（中文，简短有力，旅游主题）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落，一句话描述目的地或行程亮点" })
    ).min(1).max(3).default([
        '从碧蓝海岸到云端山脊，这条线路串联起最令人向往的风景。',
        '专业向导全程陪伴，行程轻松而充实，适合所有热爱自然的旅人。',
    ]).meta({ description: "正文段落，1 至 3 段" }),
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '阳光下的碧蓝海岸线与远山，沙滩与海浪，明媚轻盈的旅游风光大图',
    }).meta({ description: "左侧风景大图，上方会叠加主题色渐变遮罩" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "目的地要点或行程标签" })
    ).max(3).default([
        '海岛日出观景',
        '渔村人文探访',
        '山海徒步路线',
    ]).meta({ description: "目的地要点，最多 3 项，可留空" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const compassIconUrl = 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg'

const ImageLeft: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '邂逅山海之间'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '从碧蓝海岸到云端山脊，这条线路串联起最令人向往的风景。',
            '专业向导全程陪伴，行程轻松而充实，适合所有热爱自然的旅人。',
        ]
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png'
    const imagePrompt = slideData?.image?.__image_prompt__ || '阳光下的碧蓝海岸线与远山'

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
                {/* 背景轻盈光晕与路线点缀 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="travelGlow" cx="80%" cy="18%" r="55%">
                                <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#travelGlow)" />
                        {/* 虚线旅行路线 */}
                        <path
                            d="M 720 560 C 860 520, 980 600, 1120 540"
                            fill="none"
                            stroke="var(--secondary-color,#f59e0b)"
                            strokeOpacity="0.30"
                            strokeWidth="2.5"
                            strokeDasharray="3 12"
                            strokeLinecap="round"
                        />
                        <circle cx="720" cy="560" r="5" fill="var(--primary-color,#0891b2)" fillOpacity="0.5" />
                        <circle cx="1120" cy="540" r="5" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.7" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full w-full items-stretch gap-10 p-12">
                    {/* 左侧：风景大图 + 暖阳渐变遮罩 */}
                    <div className="relative w-[46%] flex-shrink-0 overflow-hidden rounded-3xl shadow-lg">
                        <img
                            src={imageUrl}
                            alt={imagePrompt}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* 主题色渐变遮罩：海蓝→暖橙 */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(160deg, rgba(8,145,178,0.55) 0%, rgba(8,145,178,0.10) 42%, rgba(245,158,11,0.55) 100%)",
                            }}
                        />
                        {/* 角标：指南针 + 目的地标识 */}
                        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full px-3 py-1.5"
                            style={{ background: "rgba(255,255,255,0.22)", backdropFilter: 'blur(4px)' }}
                        >
                            <RemoteSvgIcon
                                url={compassIconUrl}
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-5 h-5"
                                title="compass"
                            />
                            <span
                                className="text-sm font-semibold break-words"
                                style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                精选目的地
                            </span>
                        </div>
                    </div>

                    {/* 右侧：标题 + 段落 + 要点 */}
                    <div className="flex flex-1 flex-col justify-center">
                        <span
                            className="mb-4 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#0891b2)",
                                background: "var(--stroke,#bae6fd)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            旅行手记
                        </span>

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

                        <div className="space-y-3">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.9, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {bullets.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-3">
                                {bullets.map((b, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm break-words"
                                        style={{
                                            background: "var(--card-color,#ffffff)",
                                            borderColor: "var(--stroke,#bae6fd)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        <span
                                            className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                                        />
                                        <span
                                            className="text-base font-medium leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
