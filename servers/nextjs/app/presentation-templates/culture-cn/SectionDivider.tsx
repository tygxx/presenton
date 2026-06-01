import React from 'react'
import * as z from "zod";

export const layoutId = 'culture-cn-section-divider'
export const layoutName = '章节分隔'
export const layoutDescription = '国潮文创风章节过渡页：宣纸米黄底 + 超大描金墨黑节号作装饰主体，朱砂印章红块点缀节标题与可选副标题，配水墨笔触与传统回纹边饰、竖排点缀。纯 CSS/SVG，无需图片，离线可渲染。'

const schema = z.object({
    sectionNumber: z.string().min(1).max(4).default('02').meta({
        description: "章节序号，作为超大装饰主体，如『02』『叁』",
    }),
    title: z.string().min(2).max(18).default('匠心传承').meta({
        description: "章节标题（中文，简短雅致）",
    }),
    subtitle: z.string().min(0).max(36).default('于一笔一画间，见东方器物之美与文脉之深').meta({
        description: "章节副标题，一句话点题（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const SectionDivider: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const sectionNumber = slideData?.sectionNumber || '02'
    const title = slideData?.title || '匠心传承'
    const subtitle = slideData?.subtitle ?? '于一笔一画间，见东方器物之美与文脉之深'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f5ecd9)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 宣纸纹理 + 水墨晕染背景层 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            {/* 水墨晕染光晕 */}
                            <radialGradient id="cnDivInk" cx="78%" cy="28%" r="62%">
                                <stop offset="0%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.08" />
                                <stop offset="55%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.03" />
                                <stop offset="100%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0" />
                            </radialGradient>
                            {/* 朱砂晕染 */}
                            <radialGradient id="cnDivCinnabar" cx="14%" cy="84%" r="48%">
                                <stop offset="0%" stopColor="var(--primary-color,#c0392b)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#c0392b)" stopOpacity="0" />
                            </radialGradient>
                            {/* 描金线性渐变 */}
                            <linearGradient id="cnDivGold" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#d4af37" />
                                <stop offset="50%" stopColor="#f2d98c" />
                                <stop offset="100%" stopColor="#b8860b" />
                            </linearGradient>
                            {/* 传统回纹母题 */}
                            <pattern id="cnDivFret" width="36" height="36" patternUnits="userSpaceOnUse">
                                <path
                                    d="M6 6 H30 V30 H12 V12 H24 V24"
                                    fill="none"
                                    stroke="var(--secondary-color,#1a1a1a)"
                                    strokeOpacity="0.10"
                                    strokeWidth="1.5"
                                />
                            </pattern>
                        </defs>
                        <rect width="1280" height="720" fill="url(#cnDivInk)" />
                        <rect width="1280" height="720" fill="url(#cnDivCinnabar)" />
                        {/* 顶部回纹横带 */}
                        <rect x="0" y="0" width="1280" height="36" fill="url(#cnDivFret)" />
                        {/* 底部回纹横带 */}
                        <rect x="0" y="684" width="1280" height="36" fill="url(#cnDivFret)" />
                        {/* 水墨笔触斜扫 */}
                        <path
                            d="M820 -40 C900 140, 1040 240, 1180 300 C1060 320, 940 380, 880 520 C840 360, 760 220, 820 -40 Z"
                            fill="var(--secondary-color,#1a1a1a)"
                            fillOpacity="0.05"
                        />
                        {/* 描金细弧 */}
                        <path
                            d="M40 560 C220 470, 460 470, 640 540"
                            fill="none"
                            stroke="url(#cnDivGold)"
                            strokeOpacity="0.55"
                            strokeWidth="2"
                        />
                    </svg>
                </div>

                {/* 描金内框边线 */}
                <div
                    className="absolute inset-5 rounded-sm pointer-events-none"
                    style={{ border: "1px solid var(--stroke,#ddd0b4)" }}
                    aria-hidden="true"
                />
                <div
                    className="absolute inset-6 rounded-sm pointer-events-none"
                    style={{ borderTop: "2px solid #d4af37", borderBottom: "2px solid #d4af37", opacity: 0.5 }}
                    aria-hidden="true"
                />

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full items-center gap-12 px-20 py-16">
                    {/* 左侧：超大描金墨黑节号作装饰主体 */}
                    <div className="flex w-[46%] flex-shrink-0 items-center justify-center">
                        <div className="relative flex items-start">
                            <span
                                className="text-sm font-medium leading-relaxed mr-3 mt-4 break-words"
                                style={{
                                    writingMode: 'vertical-rl',
                                    color: "var(--background-text,#2b2b2b)",
                                    opacity: 0.45,
                                    letterSpacing: '0.35em',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                第 章
                            </span>
                            <span
                                className="font-black leading-[1.2] break-words"
                                style={{
                                    fontSize: '20rem',
                                    backgroundImage: "linear-gradient(135deg, #d4af37 0%, #f2d98c 45%, #b8860b 100%)",
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    color: 'transparent',
                                    textShadow: '0 6px 18px rgba(26,26,26,0.12)',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {sectionNumber}
                            </span>
                        </div>
                    </div>

                    {/* 竖向描金分隔线 */}
                    <div
                        className="h-[58%] w-px flex-shrink-0"
                        style={{
                            background: "linear-gradient(to bottom, transparent, #d4af37, transparent)",
                            opacity: 0.7,
                        }}
                        aria-hidden="true"
                    />

                    {/* 右侧：朱砂印章 + 节标题 + 副标题 */}
                    <div className="flex flex-1 flex-col justify-center">
                        {/* 朱砂印章红块 */}
                        <div className="mb-7 flex items-center gap-4">
                            <div
                                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md"
                                style={{
                                    background: "var(--primary-color,#c0392b)",
                                    boxShadow: '0 4px 14px rgba(192,57,43,0.30), inset 0 0 0 2px rgba(255,255,255,0.18)',
                                }}
                            >
                                <span
                                    className="text-2xl font-black leading-[1.2] break-words"
                                    style={{
                                        writingMode: 'vertical-rl',
                                        color: "var(--primary-text,#ffffff)",
                                        letterSpacing: '0.1em',
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    章节
                                </span>
                            </div>
                            <div
                                className="h-px flex-1"
                                style={{ background: "var(--stroke,#ddd0b4)" }}
                                aria-hidden="true"
                            />
                        </div>

                        <h1
                            className="text-6xl font-black leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#2b2b2b)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        {/* 朱砂短线 */}
                        <div
                            className="mt-6 mb-6 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--primary-color,#c0392b)" }}
                            aria-hidden="true"
                        />

                        {subtitle ? (
                            <p
                                className="max-w-[30rem] text-lg leading-loose break-words"
                                style={{
                                    color: "var(--background-text,#2b2b2b)",
                                    opacity: 0.78,
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {subtitle}
                            </p>
                        ) : null}
                    </div>
                </div>

                {/* 右下角朱砂印章角标 */}
                <div
                    className="absolute bottom-10 right-10 flex h-12 w-12 items-center justify-center rounded-sm"
                    style={{
                        background: "var(--primary-color,#c0392b)",
                        opacity: 0.92,
                        boxShadow: '0 2px 8px rgba(192,57,43,0.30)',
                    }}
                    aria-hidden="true"
                >
                    <span
                        className="text-xl font-black leading-[1.2] break-words"
                        style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        印
                    </span>
                </div>
            </div>
        </>
    )
}

export default SectionDivider
