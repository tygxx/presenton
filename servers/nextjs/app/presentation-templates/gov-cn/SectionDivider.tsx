import React from 'react'
import * as z from "zod";

export const layoutId = 'gov-cn-section-divider'
export const layoutName = '章节分隔'
export const layoutDescription = '党政政务风章节过渡页：米白底 + 中国红 + 烫金细线，超大节号作为装饰主体，居中对称的节标题与副标题，辅以五角星与华表纹样点缀。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    sectionNumber: z.string().min(1).max(4).default('02').meta({
        description: "章节编号，建议两位数字，如『02』，作为页面装饰主体",
    }),
    title: z.string().min(2).max(18).default('全面深化改革开放').meta({
        description: "章节标题（中文，简短庄重）",
    }),
    subtitle: z.string().min(2).max(36).default('以高水平开放推动高质量发展行稳致远').meta({
        description: "章节副标题，一句话补充说明（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const SectionDivider: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const sectionNumber = slideData?.sectionNumber || '02'
    const title = slideData?.title || '全面深化改革开放'
    const subtitle = slideData?.subtitle || '以高水平开放推动高质量发展行稳致远'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#faf7f2)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：对称纹样 + 烫金细线 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="govSecGold" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="govSecHalo" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--primary-color,#c1121f)" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="var(--primary-color,#c1121f)" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* 中央红色光晕 */}
                    <rect x="240" y="60" width="800" height="600" fill="url(#govSecHalo)" />

                    {/* 顶部 / 底部 烫金细线（对称） */}
                    <rect x="200" y="70" width="880" height="2" fill="url(#govSecGold)" />
                    <rect x="200" y="650" width="880" height="2" fill="url(#govSecGold)" />

                    {/* 左右对称的同心弧纹样（华表/纹样意象） */}
                    {[0, 1, 2].map((i) => (
                        <g key={`l-${i}`}>
                            <circle cx="120" cy="360" r={120 + i * 70} fill="none" stroke="var(--stroke,#e8dcc8)" strokeWidth="1.5" strokeOpacity={0.9 - i * 0.22} />
                        </g>
                    ))}
                    {[0, 1, 2].map((i) => (
                        <g key={`r-${i}`}>
                            <circle cx="1160" cy="360" r={120 + i * 70} fill="none" stroke="var(--stroke,#e8dcc8)" strokeWidth="1.5" strokeOpacity={0.9 - i * 0.22} />
                        </g>
                    ))}

                    {/* 中线对称的细竖线（庄重对称构图） */}
                    <line x1="640" y1="92" x2="640" y2="132" stroke="var(--secondary-color,#b8860b)" strokeWidth="1.5" strokeOpacity="0.5" />
                    <line x1="640" y1="588" x2="640" y2="628" stroke="var(--secondary-color,#b8860b)" strokeWidth="1.5" strokeOpacity="0.5" />
                </svg>

                {/* 四角烫金角标（对称） */}
                <div className="absolute left-8 top-8 h-10 w-10 border-l-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)" }} />
                <div className="absolute right-8 top-8 h-10 w-10 border-r-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)" }} />
                <div className="absolute bottom-8 left-8 h-10 w-10 border-b-2 border-l-2" style={{ borderColor: "var(--secondary-color,#b8860b)" }} />
                <div className="absolute bottom-8 right-8 h-10 w-10 border-b-2 border-r-2" style={{ borderColor: "var(--secondary-color,#b8860b)" }} />

                {/* 主内容：居中对称 */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-20 py-16">
                    {/* 顶部小标记：五角星 + 节字 */}
                    <div className="flex items-center gap-3">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="var(--primary-color,#c1121f)" aria-hidden="true">
                            <path d="M12 1.6l2.94 6.36 6.96.78-5.16 4.7 1.42 6.86L12 17.7 5.84 20.3l1.42-6.86L2.1 8.74l6.96-.78z" />
                        </svg>
                        <span
                            className="text-base font-bold leading-relaxed break-words"
                            style={{ color: "var(--primary-color,#c1121f)", letterSpacing: '0.4em', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            SECTION
                        </span>
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="var(--primary-color,#c1121f)" aria-hidden="true">
                            <path d="M12 1.6l2.94 6.36 6.96.78-5.16 4.7 1.42 6.86L12 17.7 5.84 20.3l1.42-6.86L2.1 8.74l6.96-.78z" />
                        </svg>
                    </div>

                    {/* 超大节号 —— 装饰主体 */}
                    <div className="relative flex items-center justify-center">
                        {/* 红色基底大字 */}
                        <span
                            className="text-[14rem] font-black leading-[1.2] break-words"
                            style={{
                                color: "var(--primary-color,#c1121f)",
                                textShadow: '0 8px 28px rgba(193,18,31,0.18)',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {sectionNumber}
                        </span>
                        {/* 烫金描边叠影（轻微偏移，营造立体烫金感） */}
                        <span
                            className="pointer-events-none absolute text-[14rem] font-black leading-[1.2] break-words"
                            aria-hidden="true"
                            style={{
                                color: 'transparent',
                                WebkitTextStroke: '1.5px var(--secondary-color,#b8860b)',
                                opacity: 0.55,
                                transform: 'translate(6px, -6px)',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {sectionNumber}
                        </span>
                    </div>

                    {/* 烫金分隔线（对称居中） */}
                    <div className="mt-2 flex items-center gap-4">
                        <span className="block h-px w-20" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        <span className="block h-2 w-2 rotate-45" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        <span className="block h-px w-20" style={{ background: "var(--secondary-color,#b8860b)" }} />
                    </div>

                    {/* 节标题 */}
                    <h1
                        className="mt-8 text-center text-6xl font-black leading-[1.25] break-words"
                        style={{ color: "var(--background-text,#1a1a1a)", letterSpacing: '0.08em', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title}
                    </h1>

                    {/* 副标题（可选） */}
                    {subtitle && (
                        <p
                            className="mt-6 max-w-[42rem] text-center text-xl leading-loose break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.7, letterSpacing: '0.12em', overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
