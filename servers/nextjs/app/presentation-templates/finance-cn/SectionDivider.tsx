import React from 'react'
import * as z from "zod";

export const layoutId = 'finance-cn-section-divider'
export const layoutName = '章节分隔'
export const layoutDescription = '金融投资风章节过渡页：超大香槟金衬线节号作装饰主体，配节标题与可选副标题。深藏青底 + 数据网格 / 增长曲线 / 细金线 / 棱形母题，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    sectionNumber: z.string().min(1).max(4).default('02').meta({
        description: "章节序号，作超大装饰主体，如『02』『03』",
    }),
    title: z.string().min(2).max(18).default('资产配置策略').meta({
        description: "章节标题（中文，简短有力）",
    }),
    subtitle: z.string().min(2).max(36).default('穿越周期，构建稳健可持续的投资组合').meta({
        description: "副标题，一句话补充本章主旨（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const SectionDivider: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const sectionNumber = slideData?.sectionNumber || '02'
    const title = slideData?.title || '资产配置策略'
    const subtitle = slideData?.subtitle || '穿越周期，构建稳健可持续的投资组合'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@600;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：数据网格 + 增长曲线 + 细金线 + 棱形 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="finDivVignette" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#0f172a" stopOpacity="0" />
                            <stop offset="100%" stopColor="#020617" stopOpacity="0.85" />
                        </linearGradient>
                        <linearGradient id="finDivGrowth" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.65" />
                        </linearGradient>
                        <linearGradient id="finDivGoldLine" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </linearGradient>
                        <pattern id="finDivGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0H0V48" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.45" strokeWidth="1" />
                        </pattern>
                    </defs>

                    {/* 数据网格母题 */}
                    <rect width="1280" height="720" fill="url(#finDivGrid)" />
                    <rect width="1280" height="720" fill="url(#finDivVignette)" />

                    {/* 增长曲线母题 + 数据节点 */}
                    <path
                        d="M0 600 L210 540 L420 560 L630 430 L840 470 L1050 300 L1280 230"
                        fill="none"
                        stroke="url(#finDivGrowth)"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                    {[
                        { x: 210, y: 540 }, { x: 420, y: 560 }, { x: 630, y: 430 },
                        { x: 840, y: 470 }, { x: 1050, y: 300 },
                    ].map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--primary-color,#d4af37)" fillOpacity="0.85" />
                    ))}

                    {/* 细金线 */}
                    <line x1="0" y1="118" x2="1280" y2="118" stroke="url(#finDivGoldLine)" strokeWidth="1.5" />

                    {/* 棱形母题 */}
                    {[
                        { cx: 1120, cy: 150, s: 30, o: 0.55 },
                        { cx: 1190, cy: 250, s: 18, o: 0.35 },
                        { cx: 1060, cy: 230, s: 12, o: 0.7 },
                    ].map((d, i) => (
                        <rect
                            key={i}
                            x={d.cx - d.s / 2}
                            y={d.cy - d.s / 2}
                            width={d.s}
                            height={d.s}
                            fill="none"
                            stroke="var(--primary-color,#d4af37)"
                            strokeOpacity={d.o}
                            strokeWidth="1.5"
                            transform={`rotate(45 ${d.cx} ${d.cy})`}
                        />
                    ))}
                </svg>

                {/* 超大节号装饰主体 */}
                <div
                    className="absolute select-none break-words"
                    style={{
                        right: '4%',
                        bottom: '-6%',
                        fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                        fontWeight: 900,
                        fontSize: '30rem',
                        lineHeight: 1,
                        letterSpacing: '0.02em',
                        color: 'transparent',
                        WebkitTextStroke: '2px var(--primary-color,#d4af37)',
                        opacity: 0.16,
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word',
                    }}
                >
                    {sectionNumber}
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full w-full items-center px-20">
                    <div className="flex w-full max-w-[58%] flex-col">
                        {/* 节号标记 */}
                        <div className="mb-8 flex items-center gap-5">
                            <span
                                className="break-words"
                                style={{
                                    fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                    fontWeight: 900,
                                    fontSize: '4.5rem',
                                    lineHeight: 1.1,
                                    color: "var(--primary-color,#d4af37)",
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {sectionNumber}
                            </span>
                            <div className="flex flex-col gap-2">
                                <span
                                    className="text-sm font-medium leading-loose break-words"
                                    style={{
                                        color: "var(--secondary-color,#60a5fa)",
                                        letterSpacing: '0.18em',
                                        overflowWrap: 'break-word',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    SECTION
                                </span>
                                <div
                                    className="h-0.5 w-16 rounded-full"
                                    style={{ background: "var(--primary-color,#d4af37)" }}
                                />
                            </div>
                        </div>

                        {/* 节标题（衬线大标题） */}
                        <h1
                            className="break-words leading-[1.25]"
                            style={{
                                fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                fontWeight: 900,
                                fontSize: '4rem',
                                color: "var(--background-text,#e2e8f0)",
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        {/* 细金线分隔 */}
                        <div
                            className="my-7 h-px w-40"
                            style={{
                                background: "linear-gradient(90deg, var(--primary-color,#d4af37), rgba(212,175,55,0))",
                            }}
                        />

                        {/* 副标题（无衬线正文） */}
                        {subtitle && (
                            <p
                                className="max-w-[36rem] text-xl leading-[1.7] break-words"
                                style={{
                                    color: "var(--background-text,#e2e8f0)",
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

                {/* 左下角棱形角标 */}
                <div
                    className="absolute"
                    style={{
                        left: '5rem',
                        bottom: '3.25rem',
                        width: '12px',
                        height: '12px',
                        transform: 'rotate(45deg)',
                        background: "var(--primary-color,#d4af37)",
                        boxShadow: '0 0 0 5px rgba(212,175,55,0.16)',
                    }}
                />
            </div>
        </>
    )
}

export default SectionDivider
