import React from 'react'
import * as z from "zod";

export const layoutId = 'travel-cn-section-divider'
export const layoutName = '章节分隔'
export const layoutDescription = '旅游文旅风章节过渡页：超大节号作为装饰主体，配节标题与可选副标题，辅以指南针、路线点与海蓝暖阳的渐变光晕。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    sectionNumber: z.string().min(1).max(4).default('02').meta({
        description: "章节序号，作为页面装饰主体，如『02』『03』，建议 1-4 个字符",
    }),
    title: z.string().min(2).max(18).default('启程·寻味山海').meta({
        description: "章节标题（中文，简短有力）",
    }),
    subtitle: z.string().max(36).default('从碧海长滩到云端古道，一程一景皆是向往').meta({
        description: "章节副标题（可选），一句话补充本章看点",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const SectionDivider: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const sectionNumber = slideData?.sectionNumber || '02'
    const title = slideData?.title || '启程·寻味山海'
    const subtitle = slideData?.subtitle || '从碧海长滩到云端古道，一程一景皆是向往'

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
                {/* 背景装饰层：海蓝光晕 + 暖阳光斑 + 路线 + 指南针 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    {/* 左上海蓝光晕 */}
                    <div
                        className="absolute -left-24 -top-28 h-[26rem] w-[26rem] rounded-full"
                        style={{ background: "radial-gradient(circle, var(--primary-color,#0891b2) 0%, rgba(8,145,178,0) 70%)", opacity: 0.18 }}
                    />
                    {/* 右下暖阳光斑 */}
                    <div
                        className="absolute -bottom-32 -right-24 h-[24rem] w-[24rem] rounded-full"
                        style={{ background: "radial-gradient(circle, var(--secondary-color,#f59e0b) 0%, rgba(245,158,11,0) 70%)", opacity: 0.22 }}
                    />

                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="travelSecRoute" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#0891b2)" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" />
                            </linearGradient>
                        </defs>
                        {/* 虚线旅行路线，从左下蜿蜒至右上 */}
                        <path
                            d="M 70 660 C 320 540, 360 360, 620 380 S 1000 300, 1200 120"
                            fill="none"
                            stroke="url(#travelSecRoute)"
                            strokeOpacity="0.45"
                            strokeWidth="3"
                            strokeDasharray="2 14"
                            strokeLinecap="round"
                        />
                        {/* 路线上的目的地点位 */}
                        {[
                            { x: 70, y: 660 },
                            { x: 470, y: 408 },
                            { x: 760, y: 372 },
                            { x: 1200, y: 120 },
                        ].map((p, i) => (
                            <g key={i}>
                                <circle cx={p.x} cy={p.y} r="11" fill="none" stroke="var(--secondary-color,#f59e0b)" strokeOpacity="0.5" strokeWidth="2" />
                                <circle cx={p.x} cy={p.y} r="4" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.85" />
                            </g>
                        ))}
                    </svg>

                    {/* 右上指南针装饰 */}
                    <svg viewBox="0 0 200 200" className="absolute right-10 top-9 h-28 w-28" style={{ opacity: 0.55 }}>
                        <circle cx="100" cy="100" r="86" fill="none" stroke="var(--primary-color,#0891b2)" strokeOpacity="0.45" strokeWidth="2" />
                        <circle cx="100" cy="100" r="70" fill="none" stroke="var(--primary-color,#0891b2)" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="3 9" />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                            <line
                                key={deg}
                                x1="100"
                                y1="100"
                                x2={100 + 84 * Math.cos((deg - 90) * Math.PI / 180)}
                                y2={100 + 84 * Math.sin((deg - 90) * Math.PI / 180)}
                                stroke="var(--primary-color,#0891b2)"
                                strokeOpacity={deg % 90 === 0 ? 0.4 : 0.18}
                                strokeWidth={deg % 90 === 0 ? 2 : 1}
                            />
                        ))}
                        {/* 指针 */}
                        <polygon points="100,30 112,100 100,90 88,100" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.9" />
                        <polygon points="100,170 88,100 100,110 112,100" fill="var(--primary-color,#0891b2)" fillOpacity="0.7" />
                        <circle cx="100" cy="100" r="6" fill="var(--background-color,#f0f9ff)" stroke="var(--primary-color,#0891b2)" strokeWidth="2" />
                    </svg>
                </div>

                {/* 内容主区 */}
                <div className="relative z-10 flex h-full items-center gap-10 px-20 py-14">
                    {/* 超大节号装饰主体 */}
                    <div className="flex flex-shrink-0 items-center">
                        <span
                            className="font-black leading-none"
                            style={{
                                fontSize: 'clamp(11rem, 26vw, 19rem)',
                                background: "linear-gradient(160deg, var(--primary-color,#0891b2) 0%, var(--secondary-color,#f59e0b) 115%)",
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {sectionNumber}
                        </span>
                    </div>

                    {/* 竖向分隔条 */}
                    <div
                        className="h-44 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: "linear-gradient(180deg, var(--primary-color,#0891b2) 0%, var(--secondary-color,#f59e0b) 100%)" }}
                    />

                    {/* 节标题 + 副标题 */}
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <span
                            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold break-words"
                            style={{
                                color: "var(--primary-color,#0891b2)",
                                background: "var(--card-color,#ffffff)",
                                border: "1px solid var(--stroke,#bae6fd)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            />
                            CHAPTER · 旅程章节
                        </span>

                        <h1
                            className="text-6xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div
                            className="my-7 h-1.5 w-24 rounded-full"
                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                        />

                        {subtitle && (
                            <p
                                className="max-w-[34rem] text-xl leading-relaxed break-words"
                                style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>

                {/* 底部细描边装饰条 */}
                <div
                    className="absolute bottom-0 left-0 h-1.5 w-full"
                    style={{ background: "linear-gradient(90deg, var(--primary-color,#0891b2) 0%, var(--secondary-color,#f59e0b) 100%)", opacity: 0.85 }}
                />
            </div>
        </>
    )
}

export default SectionDivider
