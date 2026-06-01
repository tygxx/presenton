import React from 'react'
import * as z from "zod";

export const layoutId = 'green-cn-section-divider'
export const layoutName = '章节分隔'
export const layoutDescription = '新能源环保风章节过渡页：超大节号作为装饰主体，叶片/地球/自然曲线点缀，清新白绿配天空蓝。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    sectionNumber: z.string().min(1).max(4).default('02').meta({
        description: "章节序号，如『02』，作为超大装饰主体",
    }),
    title: z.string().min(2).max(18).default('绿色能源转型').meta({
        description: "章节标题（中文，简短有力）",
    }),
    subtitle: z.string().min(2).max(36).default('以清洁能源驱动可持续的低碳未来').meta({
        description: "章节副标题，一句话补充说明（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const SectionDivider: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const sectionNumber = slideData?.sectionNumber || '02'
    const title = slideData?.title || '绿色能源转型'
    const subtitle = slideData?.subtitle || '以清洁能源驱动可持续的低碳未来'

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
                {/* 背景：天空蓝到白绿的清新渐变 + 自然有机光晕 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(120% 90% at 88% 8%, rgba(8,145,178,0.12) 0%, rgba(8,145,178,0) 46%), radial-gradient(95% 80% at 6% 96%, rgba(22,163,74,0.14) 0%, rgba(22,163,74,0) 50%), var(--background-color,#f0fdf4)",
                    }}
                />

                {/* 装饰层：超大节号 + 叶片/地球/能源/自然曲线 SVG 母题 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="greenSecNum" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="greenLeaf" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.85" />
                        </linearGradient>
                    </defs>

                    {/* 右下角同心地球经纬环 */}
                    {[0, 1, 2, 3].map((i) => (
                        <circle
                            key={i}
                            cx="1180"
                            cy="690"
                            r={120 + i * 90}
                            fill="none"
                            stroke="var(--primary-color,#16a34a)"
                            strokeOpacity={0.10}
                            strokeWidth="1.5"
                        />
                    ))}

                    {/* 自然有机曲线（能源流动/自然韵律） */}
                    <path
                        d="M-40 560 C 220 470, 420 640, 680 520 S 1120 420, 1340 540"
                        fill="none"
                        stroke="var(--secondary-color,#0891b2)"
                        strokeOpacity="0.16"
                        strokeWidth="2"
                    />
                    <path
                        d="M-40 620 C 240 540, 460 700, 720 580 S 1140 500, 1340 600"
                        fill="none"
                        stroke="var(--primary-color,#16a34a)"
                        strokeOpacity="0.12"
                        strokeWidth="2"
                    />

                    {/* 超大节号作为装饰主体 */}
                    <text
                        x="1240"
                        y="540"
                        textAnchor="end"
                        fontSize="560"
                        fontWeight="900"
                        fill="url(#greenSecNum)"
                        style={{ fontFamily: "var(--heading-font-family,'Noto Sans SC')" }}
                    >
                        {sectionNumber}
                    </text>

                    {/* 左上角叶片母题 */}
                    <g transform="translate(78 64)" opacity="0.9">
                        <path
                            d="M0 70 C 0 24, 38 0, 96 0 C 96 50, 62 78, 0 70 Z"
                            fill="url(#greenLeaf)"
                        />
                        <path
                            d="M6 64 C 30 44, 56 28, 86 14"
                            fill="none"
                            stroke="var(--card-color,#ffffff)"
                            strokeOpacity="0.6"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                        />
                    </g>
                </svg>

                {/* 主内容层 */}
                <div className="relative z-10 flex h-full flex-col justify-center pl-20 pr-24">
                    {/* 顶部小标签：叶片图标 + 章节标记 */}
                    <div className="mb-7 flex items-center gap-3">
                        <span
                            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                            style={{
                                background: "var(--primary-color,#16a34a)",
                                boxShadow: "0 0 0 6px rgba(22,163,74,0.12)",
                            }}
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                                <path
                                    d="M4 20 C 4 9, 12 4, 21 3 C 20 13, 14 20, 4 20 Z"
                                    fill="var(--primary-text,#ffffff)"
                                />
                                <path
                                    d="M6 18 C 10 14, 14 11, 19 7"
                                    fill="none"
                                    stroke="var(--primary-color,#16a34a)"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                        <span
                            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide break-words"
                            style={{
                                color: "var(--secondary-color,#0891b2)",
                                background: "rgba(8,145,178,0.10)",
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            章节 · SECTION
                        </span>
                    </div>

                    {/* 节号（前景实色，与背景巨型装饰呼应） */}
                    <div className="mb-4 flex items-end gap-5">
                        <span
                            className="text-8xl font-black leading-[1.0]"
                            style={{ color: "var(--primary-color,#16a34a)" }}
                        >
                            {sectionNumber}
                        </span>
                        <span
                            className="mb-3 h-14 w-1.5 rounded-full"
                            style={{ background: "var(--secondary-color,#0891b2)" }}
                        />
                    </div>

                    {/* 章节标题 */}
                    <h1
                        className="max-w-[40rem] text-6xl font-black leading-[1.25] break-words"
                        style={{
                            color: "var(--background-text,#14532d)",
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    {/* 副标题 */}
                    {subtitle && (
                        <p
                            className="mt-6 max-w-[34rem] text-xl leading-relaxed break-words"
                            style={{
                                color: "var(--background-text,#14532d)",
                                opacity: 0.78,
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
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
