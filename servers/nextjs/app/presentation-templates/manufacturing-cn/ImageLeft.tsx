import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'manufacturing-cn-image-left'
export const layoutName = '图文（左图）'
export const layoutDescription = '智能制造风图文页：左侧大图叠工业蓝橙渐变遮罩，右侧标题、正文与要点。深灰工业底配齿轮、精密网格与硬朗金属线条装饰，硬核可靠。'

const schema = z.object({
    title: z.string().min(2).max(20).default('柔性产线智造升级').meta({
        description: "幻灯片主标题（中文，硬朗简短，如『柔性产线智造升级』）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落（每段一句话，描述工艺/产能/精度等）" })
    ).min(1).max(3).default([
        '以数字孪生与边缘控制为核心，构建可重构的柔性制造单元。',
        '整线节拍稳定在 12 秒以内，关键工序良率持续提升至 99.6%。',
        '设备互联与实时质检贯穿全流程，缺陷可追溯、停机可预测。',
    ]).meta({ description: "正文段落数组（1 至 3 段）" }),
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '现代智能工厂自动化产线，机械臂在精密装配，冷色工业灯光，金属质感',
    }).meta({ description: "左侧主图，将叠加工业蓝橙渐变遮罩" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "右侧要点短句（可空，硬朗简短）" })
    ).max(3).default([
        '数字孪生 实时映射',
        '边缘控制 毫秒响应',
        '全程质检 缺陷追溯',
    ]).meta({ description: "右侧要点列表（最多 3 条，可为空）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageLeft: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '柔性产线智造升级'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '以数字孪生与边缘控制为核心，构建可重构的柔性制造单元。',
            '整线节拍稳定在 12 秒以内，关键工序良率持续提升至 99.6%。',
            '设备互联与实时质检贯穿全流程，缺陷可追溯、停机可预测。',
        ]
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png'
    const imagePrompt = slideData?.image?.__image_prompt__ || '现代智能工厂自动化产线'

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
                {/* 背景装饰层：精密网格 + 硬朗金属线条 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="mfgImgLeftGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--stroke,#374151)" strokeWidth="1" strokeOpacity="0.5" />
                        </pattern>
                        <linearGradient id="mfgImgLeftEdge" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" />
                            <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" />
                        </linearGradient>
                    </defs>
                    <rect x="48%" y="0" width="52%" height="720" fill="url(#mfgImgLeftGrid)" />
                    {/* 硬朗金属斜线 */}
                    <line x1="640" y1="0" x2="780" y2="720" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.08" strokeWidth="2" />
                    <line x1="1180" y1="-40" x2="1320" y2="760" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.10" strokeWidth="2" />
                </svg>

                {/* 右上角齿轮装饰 */}
                <svg viewBox="0 0 120 120" className="absolute" style={{ top: '-26px', right: '-26px', width: '180px', height: '180px' }} aria-hidden="true">
                    <g fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.16" strokeWidth="3">
                        <circle cx="60" cy="60" r="30" />
                        <circle cx="60" cy="60" r="12" />
                        {Array.from({ length: 12 }).map((_, i) => {
                            const a = (i * Math.PI) / 6
                            const x1 = 60 + Math.cos(a) * 30
                            const y1 = 60 + Math.sin(a) * 30
                            const x2 = 60 + Math.cos(a) * 42
                            const y2 = 60 + Math.sin(a) * 42
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                        })}
                    </g>
                </svg>

                <div className="relative z-10 flex h-full gap-10 px-14 py-12">
                    {/* 左侧：大图 + 工业蓝橙渐变遮罩 */}
                    <div
                        className="relative w-[48%] flex-shrink-0 overflow-hidden rounded-2xl border"
                        style={{ borderColor: "var(--stroke,#374151)" }}
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
                                background: "linear-gradient(140deg, rgba(31,41,55,0.20) 0%, rgba(59,130,246,0.30) 55%, rgba(249,115,22,0.42) 100%)",
                            }}
                        />
                        {/* 顶部金属高光线 */}
                        <div
                            className="absolute left-0 top-0 h-1 w-full"
                            style={{ background: "linear-gradient(90deg, var(--secondary-color,#f97316), var(--primary-color,#3b82f6))" }}
                        />
                        {/* 左下角精密刻度母题 */}
                        <div className="absolute bottom-5 left-5 flex items-end gap-1.5" aria-hidden="true">
                            {[10, 18, 12, 26, 16, 22, 14].map((h, i) => (
                                <span
                                    key={i}
                                    style={{
                                        display: 'inline-block', width: '3px', height: `${h}px`, borderRadius: '2px',
                                        background: "var(--primary-text,#ffffff)", opacity: 0.85,
                                    }}
                                />
                            ))}
                        </div>
                        {/* 角标：产线标识 */}
                        <div
                            className="absolute bottom-5 right-5 inline-flex items-center rounded-md px-3 py-1.5 text-xs font-bold break-words"
                            style={{
                                background: "rgba(17,24,39,0.72)",
                                color: "var(--primary-text,#ffffff)",
                                border: "1px solid var(--stroke,#374151)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            LINE-01 / 智造单元
                        </div>
                    </div>

                    {/* 右侧：标题 + 正文 + 要点 */}
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                        {/* 标签 */}
                        <span
                            className="mb-5 inline-flex w-fit items-center rounded-sm px-3 py-1 text-xs font-bold tracking-wide break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.12)",
                                border: "1px solid var(--stroke,#374151)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            智能制造 · 工艺升级
                        </span>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        {/* 蓝橙强调线 */}
                        <div className="mt-6 mb-6 flex items-center gap-2">
                            <span className="h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                            <span className="h-1.5 w-6 rounded-full" style={{ background: "var(--primary-color,#3b82f6)" }} />
                        </div>

                        <div className="space-y-3">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.92, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 要点列表（可空） */}
                        {bullets.length > 0 && (
                            <div className="mt-7 flex flex-wrap gap-3">
                                {bullets.map((b, i) => (
                                    <div
                                        key={i}
                                        className="inline-flex items-center gap-2 rounded-md px-3 py-2"
                                        style={{
                                            background: "var(--card-color,#111827)",
                                            border: "1px solid var(--stroke,#374151)",
                                        }}
                                    >
                                        {/* 齿轮小图标 */}
                                        <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill="none" stroke="var(--primary-color,#3b82f6)" strokeWidth="2" aria-hidden="true">
                                            <circle cx="12" cy="12" r="3.5" />
                                            {Array.from({ length: 8 }).map((_, k) => {
                                                const a = (k * Math.PI) / 4
                                                const x1 = 12 + Math.cos(a) * 6
                                                const y1 = 12 + Math.sin(a) * 6
                                                const x2 = 12 + Math.cos(a) * 9
                                                const y2 = 12 + Math.sin(a) * 9
                                                return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} />
                                            })}
                                        </svg>
                                        <span
                                            className="text-sm font-semibold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
