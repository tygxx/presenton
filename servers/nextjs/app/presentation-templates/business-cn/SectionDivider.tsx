import React from 'react'
import * as z from "zod";

export const layoutId = 'business-cn-section-divider'
export const layoutName = '章节分隔'
export const layoutDescription = '商务风章节过渡页：超大节号作为装饰主体 + 节标题与副标题，配经典网格、几何面板与橙色强调。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    sectionNumber: z.string().min(1).max(4).default('02').meta({
        description: "章节序号（如『02』），作为超大装饰主体",
    }),
    title: z.string().min(2).max(18).default('市场策略与增长路径').meta({
        description: "章节标题（中文，简短有力）",
    }),
    subtitle: z.string().min(2).max(36).default('聚焦核心赛道，构建可持续的商业增长引擎').meta({
        description: "章节副标题，一句话补充说明（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const SectionDivider: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const sectionNumber = slideData?.sectionNumber || '02'
    const title = slideData?.title || '市场策略与增长路径'
    const subtitle = slideData?.subtitle || '聚焦核心赛道，构建可持续的商业增长引擎'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f8fafc)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 经典网格背景装饰层 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="bizDividerGrid" width="64" height="64" patternUnits="userSpaceOnUse">
                                <path d="M64 0H0V64" fill="none" stroke="#1e3a8a" strokeOpacity="0.06" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="1280" height="720" fill="url(#bizDividerGrid)" />
                    </svg>
                </div>

                {/* 右侧深色几何面板 + 超大节号装饰主体 */}
                <div
                    className="absolute top-0 right-0 h-full w-[46%] overflow-hidden"
                    style={{ background: "var(--primary-color,#1e3a8a)" }}
                    aria-hidden="true"
                >
                    <svg viewBox="0 0 600 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="bizDividerGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <rect width="600" height="720" fill="url(#bizDividerGlow)" />
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={i} cx="500" cy="120" r={80 + i * 70} fill="none" stroke="#ffffff" strokeOpacity={0.10} strokeWidth="1.5" />
                        ))}
                        <line x1="-60" y1="600" x2="520" y2="220" stroke="#ffffff" strokeOpacity="0.10" strokeWidth="1.5" />
                        <line x1="-60" y1="700" x2="640" y2="240" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1.5" />
                    </svg>

                    {/* 超大节号 */}
                    <span
                        className="absolute select-none break-words"
                        style={{
                            top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                            fontSize: '20rem', fontWeight: 900, lineHeight: 1,
                            color: 'rgba(255,255,255,0.14)',
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {sectionNumber}
                    </span>

                    {/* 橙色强调点 */}
                    <div
                        className="absolute"
                        style={{
                            top: '24%', right: '18%', width: '14px', height: '14px', borderRadius: '9999px',
                            background: "var(--secondary-color,#f97316)",
                            boxShadow: '0 0 0 6px rgba(249,115,22,0.18)',
                        }}
                    />
                </div>

                {/* 左侧主内容 */}
                <div className="relative z-10 flex h-full w-[58%] flex-col justify-center pl-16 pr-8">
                    {/* 小节号 + 标签 */}
                    <div className="mb-7 flex items-center gap-4">
                        <span
                            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-2xl font-black leading-none"
                            style={{ background: "var(--primary-color,#1e3a8a)", color: "var(--primary-text,#ffffff)" }}
                        >
                            {sectionNumber}
                        </span>
                        <span
                            className="inline-flex items-center text-sm font-semibold uppercase break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                letterSpacing: '0.18em',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            SECTION
                        </span>
                    </div>

                    <h1
                        className="text-6xl font-black leading-[1.25] break-words"
                        style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title}
                    </h1>

                    <div
                        className="my-7 h-1.5 w-24 rounded-full"
                        style={{ background: "var(--secondary-color,#f97316)" }}
                    />

                    <p
                        className="max-w-[36rem] text-xl leading-relaxed break-words"
                        style={{ color: "var(--background-text,#475569)", opacity: 0.9, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {subtitle}
                    </p>
                </div>
            </div>
        </>
    )
}

export default SectionDivider
