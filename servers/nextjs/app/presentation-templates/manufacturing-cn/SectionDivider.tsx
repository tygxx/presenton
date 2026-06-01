import React from 'react'
import * as z from "zod";

export const layoutId = 'manufacturing-cn-section-divider'
export const layoutName = '章节分隔'
export const layoutDescription = '智能制造风章节过渡页：超大节号作为装饰主体，配齿轮、产线与精密网格金属质感线条。深色工业底 + 蓝橙强调，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    sectionNumber: z.string().min(1).max(4).default('02').meta({
        description: "章节序号，作为超大装饰主体，如『01』『02』",
    }),
    title: z.string().min(2).max(18).default('智能产线与柔性制造').meta({
        description: "章节标题（中文，简短有力）",
    }),
    subtitle: z.string().min(2).max(36).default('从单机自动化迈向全流程数字化协同制造').meta({
        description: "章节副标题，一句话补充说明（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const SectionDivider: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const sectionNumber = slideData?.sectionNumber || '02'
    const title = slideData?.title || '智能产线与柔性制造'
    const subtitle = slideData?.subtitle || '从单机自动化迈向全流程数字化协同制造'

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
                {/* 背景装饰层：精密网格 + 齿轮 + 产线 + 金属质感线条 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        {/* 精密网格 */}
                        <pattern id="mfgGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.45" strokeWidth="1" />
                        </pattern>
                        {/* 金属质感纵向渐变 */}
                        <linearGradient id="mfgMetal" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
                            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
                        </linearGradient>
                        {/* 节号描边渐变（蓝橙） */}
                        <linearGradient id="mfgNumGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.5" />
                        </linearGradient>
                        {/* 蓝色光晕 */}
                        <radialGradient id="mfgGlow" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* 精密网格铺底 */}
                    <rect width="1280" height="720" fill="url(#mfgGrid)" />
                    {/* 金属质感叠层 */}
                    <rect width="1280" height="720" fill="url(#mfgMetal)" />
                    {/* 右上蓝色光晕 */}
                    <circle cx="1080" cy="120" r="360" fill="url(#mfgGlow)" />

                    {/* 右侧大齿轮（装饰母题） */}
                    <g transform="translate(1090 540)" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.30">
                        <circle r="160" strokeWidth="2" />
                        <circle r="92" strokeWidth="2" />
                        <circle r="40" strokeWidth="2" />
                        {[...Array(16)].map((_, i) => {
                            const a = (i * Math.PI * 2) / 16
                            const x1 = Math.cos(a) * 160
                            const y1 = Math.sin(a) * 160
                            const x2 = Math.cos(a) * 196
                            const y2 = Math.sin(a) * 196
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="10" strokeOpacity="0.22" />
                        })}
                    </g>

                    {/* 左下小齿轮（橙色咬合） */}
                    <g transform="translate(120 600)" fill="none" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.28">
                        <circle r="64" strokeWidth="2" />
                        <circle r="26" strokeWidth="2" />
                        {[...Array(12)].map((_, i) => {
                            const a = (i * Math.PI * 2) / 12
                            const x1 = Math.cos(a) * 64
                            const y1 = Math.sin(a) * 64
                            const x2 = Math.cos(a) * 84
                            const y2 = Math.sin(a) * 84
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="8" strokeOpacity="0.25" />
                        })}
                    </g>

                    {/* 产线轨道 + 工件节点（横贯下方） */}
                    <line x1="0" y1="660" x2="1280" y2="660" stroke="var(--stroke,#374151)" strokeWidth="2" />
                    <line x1="0" y1="668" x2="1280" y2="668" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.5" strokeWidth="3" strokeDasharray="28 18" />
                    {[200, 420, 640, 860, 1080].map((cx, i) => (
                        <rect key={i} x={cx - 12} y={642} width="24" height="16" rx="2" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.55" strokeWidth="2" />
                    ))}

                    {/* 硬朗对角线条（金属质感） */}
                    <line x1="-40" y1="200" x2="520" y2="-60" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.18" strokeWidth="2" />
                    <line x1="-40" y1="260" x2="640" y2="-60" stroke="var(--stroke,#374151)" strokeOpacity="0.6" strokeWidth="1.5" />
                </svg>

                {/* 超大节号作为装饰主体（纯 CSS 文本描边/渐变） */}
                <div
                    className="absolute top-1/2 right-12 -translate-y-1/2 select-none leading-none"
                    style={{
                        fontSize: '30rem',
                        fontWeight: 900,
                        color: 'transparent',
                        WebkitTextStroke: '2px var(--primary-color,#3b82f6)',
                        opacity: 0.22,
                        letterSpacing: '0.02em',
                    }}
                    aria-hidden="true"
                >
                    {sectionNumber}
                </div>

                {/* 左侧主内容 */}
                <div className="relative z-10 flex h-full w-[62%] flex-col justify-center pl-16 pr-8">
                    {/* 章节标记小标签 */}
                    <div className="mb-7 flex items-center gap-3">
                        <span
                            className="inline-flex items-center rounded-sm px-3 py-1 text-sm font-bold tracking-[0.25em] break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.12)",
                                border: "1px solid var(--stroke,#374151)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            SECTION
                        </span>
                        <span
                            className="text-3xl font-black leading-none"
                            style={{ color: "var(--secondary-color,#f97316)" }}
                        >
                            {sectionNumber}
                        </span>
                    </div>

                    {/* 章节标题 */}
                    <h1
                        className="text-6xl font-black leading-[1.25] break-words"
                        style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title}
                    </h1>

                    {/* 蓝橙强调分隔条 */}
                    <div className="mt-7 flex items-center gap-2">
                        <div className="h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <div className="h-1.5 w-8 rounded-full" style={{ background: "var(--primary-color,#3b82f6)" }} />
                        <div className="h-1.5 w-3 rounded-full" style={{ background: "var(--primary-color,#3b82f6)", opacity: 0.5 }} />
                    </div>

                    {/* 章节副标题 */}
                    {subtitle && (
                        <p
                            className="mt-7 max-w-[36rem] text-xl leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default SectionDivider
