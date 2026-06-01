import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'green-cn-image-right'
export const layoutName = '图文（右图）'
export const layoutDescription = '新能源环保风图文页：左侧标题/段落/要点，右侧大图。图片叠加清新白绿渐变遮罩，配叶片、自然有机曲线与天空蓝光晕装饰。'

const schema = z.object({
    title: z.string().min(2).max(20).default('清洁能源 共护蓝天').meta({
        description: "图文页主标题（中文，简短有力，≤20字）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落，一句话说明（≤56字）" })
    ).min(1).max(3).default([
        '我们以风光储一体化的清洁能源体系，持续降低碳排放，让绿色电力惠及更多城市与乡村。',
        '依托智能调度与生态修复并举，推动产业低碳转型，守护蓝天碧水与生物多样性。',
    ]).meta({ description: "左侧正文段落（1-3 段）" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "关键要点，简短短语（≤24字）" })
    ).max(3).default([
        '风光储一体化供能',
        '全流程碳足迹管理',
        '生态修复与可持续运营',
    ]).meta({ description: "左侧关键要点（可空，最多 3 条）" }),
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "清新自然的风力发电场与太阳能光伏板，蓝天白云下的绿色山丘，阳光明媚",
    }).meta({ description: "右侧大图" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageRight: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '清洁能源 共护蓝天'
    const paragraphs = slideData?.paragraphs && slideData.paragraphs.length > 0
        ? slideData.paragraphs
        : ['我们以风光储一体化的清洁能源体系，持续降低碳排放，让绿色电力惠及更多城市与乡村。']
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = slideData?.image?.__image_prompt__ || '清新自然的风力发电场与太阳能光伏板'

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
                {/* 背景：清新白绿 + 天空蓝光晕与自然有机曲线 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="greenImgRightSky" x1="0" y1="0" x2="0.4" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--background-color,#f0fdf4)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="greenImgRightSun" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.14" />
                            <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="greenImgRightHill" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.20" />
                        </linearGradient>
                    </defs>
                    {/* 天空蓝光晕 */}
                    <rect x="0" y="0" width="760" height="720" fill="url(#greenImgRightSky)" />
                    {/* 左上柔和阳光光晕 */}
                    <circle cx="180" cy="120" r="260" fill="url(#greenImgRightSun)" />
                    {/* 底部有机山丘曲线 */}
                    <path
                        d="M0,632 C180,580 380,648 600,612 C760,586 720,640 760,628 L760,720 L0,720 Z"
                        fill="url(#greenImgRightHill)"
                    />
                    {/* 自然能源同心环（循环母题） */}
                    {[0, 1, 2].map((i) => (
                        <circle key={i} cx="120" cy="600" r={40 + i * 36} fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity={0.08} strokeWidth="1.4" />
                    ))}
                </svg>

                {/* 左上角叶片有机形状角标 */}
                <div className="absolute" style={{ top: '0', left: '0' }} aria-hidden="true">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <defs>
                            <linearGradient id="greenImgRightLeaf" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" />
                                <stop offset="100%" stopColor="var(--primary-color,#16a34a)" />
                            </linearGradient>
                        </defs>
                        <path d="M0,0 L120,0 C120,66 66,120 0,120 Z" fill="url(#greenImgRightLeaf)" opacity="0.92" />
                        {/* 叶脉 */}
                        <path d="M14,14 C46,30 70,54 88,90" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M40,22 C50,34 56,42 60,54" fill="none" stroke="#ffffff" strokeOpacity="0.30" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M24,46 C36,54 44,62 50,74" fill="none" stroke="#ffffff" strokeOpacity="0.30" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full">
                    {/* 左侧：标题 + 段落 + 要点 */}
                    <div className="flex w-[52%] flex-shrink-0 flex-col justify-center pl-16 pr-10 py-12">
                        <div className="mb-5 flex items-center gap-3">
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
                                <path d="M5,19 C5,9 13,4 21,4 C21,14 14,20 5,19 Z" fill="var(--primary-color,#16a34a)" />
                                <path d="M5,19 C9,14 14,10 19,8" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.4" />
                            </svg>
                            <span
                                className="text-sm font-medium break-words"
                                style={{ color: "var(--primary-color,#16a34a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                绿色低碳
                            </span>
                        </div>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        {/* 自然曲线分隔（叶脉/能流） */}
                        <svg width="160" height="20" viewBox="0 0 160 20" className="mt-5" aria-hidden="true">
                            <path d="M0,14 C36,4 64,4 88,11" fill="none" stroke="var(--primary-color,#16a34a)" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="100" cy="11" r="5" fill="var(--secondary-color,#0891b2)" />
                        </svg>

                        <div className="mt-6 space-y-4">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#14532d)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {bullets.length > 0 && (
                            <div className="mt-8 flex flex-col gap-3">
                                {bullets.map((b, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span
                                            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{ background: "var(--primary-color,#16a34a)" }}
                                        >
                                            <RemoteSvgIcon
                                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg"
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-4 h-4"
                                                title="leaf"
                                            />
                                        </span>
                                        <span
                                            className="text-base font-medium leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {b}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 右侧：大图 + 清新白绿渐变遮罩 */}
                    <div className="relative flex-1 overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={imagePrompt}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* 主题色渐变遮罩 */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(120deg, var(--primary-color,#16a34a) 0%, rgba(22,163,74,0.32) 36%, rgba(8,145,178,0.06) 100%)",
                            }}
                            aria-hidden="true"
                        />
                        {/* 左侧自然有机曲线过渡（叶/坡母题） */}
                        <svg viewBox="0 0 130 720" className="absolute inset-y-0 left-0 h-full" preserveAspectRatio="none" aria-hidden="true">
                            <path d="M0,0 C70,180 30,520 90,720 L0,720 Z" fill="var(--background-color,#f0fdf4)" opacity="0.55" />
                            <path d="M22,0 C84,200 44,520 100,720" fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.4" />
                        </svg>
                        {/* 右下角天空蓝强调点 */}
                        <div
                            className="absolute"
                            style={{
                                bottom: '8%', right: '8%', width: '16px', height: '16px', borderRadius: '9999px',
                                background: "var(--secondary-color,#0891b2)",
                                boxShadow: '0 0 0 7px rgba(8,145,178,0.22)',
                            }}
                            aria-hidden="true"
                        />
                        {/* 左上角叶片浮饰，呼应自然母题 */}
                        <div className="absolute" style={{ top: '7%', left: '12%' }} aria-hidden="true">
                            <svg width="40" height="40" viewBox="0 0 24 24">
                                <path d="M5,19 C5,9 13,4 21,4 C21,14 14,20 5,19 Z" fill="#ffffff" fillOpacity="0.85" />
                                <path d="M5,19 C9,14 14,10 19,8" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.6" strokeWidth="1.4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageRight
