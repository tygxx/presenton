import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'green-cn-image-left'
export const layoutName = '图文（左图）'
export const layoutDescription = '新能源环保风图文页：左侧大图叠绿色渐变遮罩并配叶片/地球装饰，右侧标题、段落与要点列表。清新白绿配天空蓝，圆角有机形状。'

const schema = z.object({
    title: z.string().min(2).max(20).default('让清洁能源点亮可持续未来').meta({
        description: "图文页主标题（中文，简短有力）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落，一句话陈述观点或事实" })
    ).min(1).max(3).default([
        '我们以光伏、风电与储能为核心，构建低碳、稳定、可循环的绿色能源网络。',
        '从源头减排到终端节能，每一度电都更干净，每一寸土地都更有生机。',
    ]).meta({ description: "右侧正文段落（1-3 段）" }),
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '广阔绿色山坡上的光伏板与风力发电机，蓝天白云，清新自然，可持续能源',
    }).meta({ description: "左侧主图（会叠加绿色渐变遮罩）" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "要点短句，简短凝练" })
    ).max(3).default([
        '清洁电力占比超七成',
        '年减碳排放百万吨级',
        '全生命周期可循环',
    ]).meta({ description: "右侧要点列表（可空，最多 3 条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageLeft: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '让清洁能源点亮可持续未来'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '我们以光伏、风电与储能为核心，构建低碳、稳定、可循环的绿色能源网络。',
            '从源头减排到终端节能，每一度电都更干净，每一寸土地都更有生机。',
        ]
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png'
    const imagePrompt = slideData?.image?.__image_prompt__ || '广阔绿色山坡上的光伏板与风力发电机，蓝天白云，清新自然，可持续能源'

    const bulletIcons = [
        'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg',
        'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/wind-bold.svg',
        'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/recycle-bold.svg',
    ]
    const bulletQueries = ['leaf', 'wind', 'recycle']

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
                {/* 背景有机曲线 + 光晕装饰层 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="greenImgLeftBg" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.04" />
                        </linearGradient>
                        <radialGradient id="greenImgLeftGlow" cx="0.85" cy="0.18" r="0.5">
                            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#greenImgLeftBg)" />
                    <rect width="1280" height="720" fill="url(#greenImgLeftGlow)" />
                    {/* 右下自然有机曲线 */}
                    <path d="M1280 470 C1080 430 980 560 820 600 C700 630 640 720 640 720 L1280 720 Z" fill="#16a34a" fillOpacity="0.06" />
                    <path d="M1280 560 C1120 530 1040 640 900 670 C820 688 780 720 780 720 L1280 720 Z" fill="#0891b2" fillOpacity="0.05" />
                </svg>

                {/* 右上角叶片角标装饰 */}
                <div className="absolute top-6 right-8 z-10 flex items-center gap-2">
                    <span
                        className="flex h-9 w-9 items-center justify-center rounded-full"
                        style={{ background: "var(--primary-color,#16a34a)", boxShadow: '0 0 0 6px rgba(22,163,74,0.10)' }}
                    >
                        <RemoteSvgIcon
                            url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg"
                            strokeColor="currentColor"
                            color="var(--primary-text,#ffffff)"
                            className="w-5 h-5"
                            title="leaf"
                        />
                    </span>
                </div>

                {/* 主体：左图 + 右文 */}
                <div className="relative z-10 flex h-full items-center gap-12 pl-10 pr-14 py-10">
                    {/* 左侧大图（圆角 + 绿色渐变遮罩 + 地球/叶片装饰） */}
                    <div className="relative w-[46%] flex-shrink-0 self-stretch">
                        <div
                            className="relative h-full w-full overflow-hidden rounded-[2rem] border shadow-md"
                            style={{ borderColor: "var(--stroke,#d1fae5)" }}
                        >
                            <img
                                src={imageUrl}
                                alt={imagePrompt}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            {/* 主题色渐变遮罩 */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(135deg, rgba(22,163,74,0.55) 0%, rgba(8,145,178,0.30) 55%, rgba(8,145,178,0.06) 100%)",
                                }}
                            />
                            {/* 左下角地球/可持续徽标 */}
                            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3">
                                <span
                                    className="flex h-11 w-11 items-center justify-center rounded-full"
                                    style={{ background: "rgba(255,255,255,0.92)", boxShadow: '0 6px 20px rgba(20,83,45,0.25)' }}
                                >
                                    <RemoteSvgIcon
                                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-hemisphere-west-bold.svg"
                                        strokeColor="currentColor"
                                        color="var(--primary-color,#16a34a)"
                                        className="w-6 h-6"
                                        title="globe"
                                    />
                                </span>
                                <span
                                    className="rounded-full px-3 py-1 text-sm font-semibold break-words"
                                    style={{
                                        background: "rgba(255,255,255,0.92)",
                                        color: "var(--background-text,#14532d)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    碳中和实践
                                </span>
                            </div>
                            {/* 右上叶片有机装饰 */}
                            <svg viewBox="0 0 200 200" className="absolute -top-2 -right-2 h-28 w-28" aria-hidden="true">
                                <path
                                    d="M170 30 C120 30 70 70 60 130 C120 130 165 95 170 30 Z"
                                    fill="#ffffff" fillOpacity="0.22"
                                />
                                <path d="M150 55 C110 75 80 105 65 128" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" fill="none" />
                            </svg>
                        </div>
                    </div>

                    {/* 右侧文字区 */}
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                        {/* 小标签 */}
                        <span
                            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#16a34a)",
                                background: "rgba(22,163,74,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/sun-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-color,#16a34a)"
                                className="w-4 h-4"
                                title="clean energy"
                            />
                            绿色能源 · 可持续发展
                        </span>

                        <h1
                            className="text-4xl font-black leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div
                            className="my-6 h-1.5 w-20 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#16a34a), var(--secondary-color,#0891b2))" }}
                        />

                        <div className="space-y-3">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-base leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#14532d)", opacity: 0.86, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 要点列表 */}
                        {bullets.length > 0 && (
                            <div className="mt-7 flex flex-col gap-3">
                                {bullets.map((b, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-2xl border px-4 py-2.5"
                                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#d1fae5)" }}
                                    >
                                        <span
                                            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{ background: "linear-gradient(135deg, var(--primary-color,#16a34a), var(--secondary-color,#0891b2))" }}
                                        >
                                            <RemoteSvgIcon
                                                url={bulletIcons[i % bulletIcons.length]}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-4 h-4"
                                                title={bulletQueries[i % bulletQueries.length]}
                                            />
                                        </span>
                                        <span
                                            className="text-sm font-medium leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
