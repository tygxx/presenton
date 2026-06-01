import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'manufacturing-cn-image-right'
export const layoutName = '图文（右图）'
export const layoutDescription = '智能制造风图文页：左侧标题/段落/要点，右侧大图。工业深灰底叠精密网格与齿轮产线装饰，蓝橙强调，图片叠加蓝色金属渐变遮罩。'

const schema = z.object({
    title: z.string().min(2).max(20).default('精密产线 智造未来').meta({
        description: "图文页主标题（中文，简短有力，≤20字）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落，一句话说明（≤56字）" })
    ).min(1).max(3).default([
        '我们以高精度自动化设备与数字孪生产线，将制造误差控制在微米级，保障批量一致性。',
        '依托工业互联网与实时数据采集，实现从来料到成品的全流程可追溯与柔性化排产。',
    ]).meta({ description: "左侧正文段落（1-3 段）" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "关键要点，简短短语（≤24字）" })
    ).max(3).default([
        '自动化柔性产线',
        '数字孪生与实时监控',
        '微米级精度品控',
    ]).meta({ description: "左侧关键要点（可空，最多 3 条）" }),
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "现代化智能工厂自动化产线，机械臂精密作业，金属质感，硬核工业氛围",
    }).meta({ description: "右侧大图" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageRight: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '精密产线 智造未来'
    const paragraphs = slideData?.paragraphs && slideData.paragraphs.length > 0
        ? slideData.paragraphs
        : ['我们以高精度自动化设备与数字孪生产线，将制造误差控制在微米级，保障批量一致性。']
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = slideData?.image?.__image_prompt__ || '现代化智能工厂自动化产线'

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
                {/* 背景装饰层：精密网格 + 金属质感导轨线 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="mfgImgRightGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.4" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="mfgImgRightSteel" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            <stop offset="45%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* 精密网格（仅覆盖左侧文字区） */}
                    <rect x="0" y="0" width="700" height="720" fill="url(#mfgImgRightGrid)" />
                    {/* 硬朗金属导轨横线 */}
                    <rect x="0" y="150" width="700" height="2" fill="url(#mfgImgRightSteel)" />
                    <rect x="0" y="572" width="700" height="2" fill="url(#mfgImgRightSteel)" />
                </svg>

                {/* 左上角硬朗双色直角标记（精密对位母题） */}
                <div className="absolute top-0 left-0 flex" aria-hidden="true">
                    <div className="h-1.5 w-20" style={{ background: "var(--primary-color,#3b82f6)" }} />
                    <div className="h-1.5 w-8" style={{ background: "var(--secondary-color,#f97316)" }} />
                </div>

                <div className="relative z-10 flex h-full">
                    {/* 左侧：标题 + 段落 + 要点 */}
                    <div className="flex w-[52%] flex-shrink-0 flex-col justify-center pl-16 pr-10 py-12">
                        <div className="mb-5 flex items-center gap-3">
                            <span
                                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm"
                                style={{ background: "var(--primary-color,#3b82f6)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-4 h-4"
                                    title="gear"
                                />
                            </span>
                            <span
                                className="text-sm font-semibold tracking-wide break-words"
                                style={{ color: "var(--secondary-color,#f97316)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                智能制造
                            </span>
                        </div>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        {/* 硬朗双色强调条 */}
                        <div className="mt-6 flex items-center gap-2" aria-hidden="true">
                            <div className="h-1.5 w-16 rounded-sm" style={{ background: "var(--primary-color,#3b82f6)" }} />
                            <div className="h-1.5 w-6 rounded-sm" style={{ background: "var(--secondary-color,#f97316)" }} />
                        </div>

                        <div className="mt-7 space-y-4">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {bullets.length > 0 && (
                            <div className="mt-8 flex flex-col gap-3">
                                {bullets.map((b, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-sm border px-3 py-2"
                                        style={{ background: "var(--card-color,#111827)", borderColor: "var(--stroke,#374151)" }}
                                    >
                                        <span
                                            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-sm"
                                            style={{ background: "var(--secondary-color,#f97316)" }}
                                        >
                                            <RemoteSvgIcon
                                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/check-bold.svg"
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-4 h-4"
                                                title="check"
                                            />
                                        </span>
                                        <span
                                            className="text-base font-medium leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {b}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 右侧：大图 + 蓝色金属渐变遮罩 + 齿轮产线装饰 */}
                    <div className="relative flex-1 overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={imagePrompt}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* 主题色渐变遮罩（从左侧文字区向图片柔和过渡） */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(105deg, var(--background-color,#1f2937) 0%, rgba(31,41,55,0.55) 22%, rgba(59,130,246,0.18) 62%, rgba(59,130,246,0.04) 100%)",
                            }}
                            aria-hidden="true"
                        />
                        {/* 右上角齿轮装饰（精密同心环 + 齿牙） */}
                        <svg viewBox="0 0 320 320" className="absolute -top-10 -right-10 h-56 w-56" aria-hidden="true">
                            <g transform="translate(160 160)" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.85" strokeWidth="3">
                                {Array.from({ length: 14 }).map((_, i) => {
                                    const a = (i / 14) * Math.PI * 2
                                    const x1 = Math.cos(a) * 92
                                    const y1 = Math.sin(a) * 92
                                    const x2 = Math.cos(a) * 112
                                    const y2 = Math.sin(a) * 112
                                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="9" strokeOpacity="0.6" />
                                })}
                                <circle r="92" />
                                <circle r="60" strokeOpacity="0.45" />
                                <circle r="24" strokeOpacity="0.6" />
                            </g>
                        </svg>
                        {/* 底部产线节点（精密对位点） */}
                        <svg viewBox="0 0 520 60" className="absolute bottom-7 left-7 h-8 w-2/3" preserveAspectRatio="xMinYMid meet" aria-hidden="true">
                            {[20, 140, 260, 380].map((cx, i) => (
                                <g key={i}>
                                    {i < 3 && <line x1={cx + 12} y1="30" x2={cx + 108} y2="30" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />}
                                    <circle cx={cx} cy="30" r="7" fill="var(--secondary-color,#f97316)" fillOpacity="0.95" />
                                    <circle cx={cx} cy="30" r="12" fill="none" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.4" strokeWidth="2" />
                                </g>
                            ))}
                        </svg>
                        {/* 左侧细线条网格（呼应精密网格母题） */}
                        <svg viewBox="0 0 120 720" className="absolute inset-y-0 left-0 h-full" preserveAspectRatio="none" aria-hidden="true">
                            {[0, 1, 2].map((i) => (
                                <line key={i} x1={18 + i * 24} y1="0" x2={18 + i * 24} y2="720" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" />
                            ))}
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageRight
