import React from 'react'
import * as z from "zod";

export const layoutId = 'business-cn-toc'
export const layoutName = '目录'
export const layoutDescription = '商务风目录页：左侧标题与分节计数，右侧编号大字（01/02…）+ 分节标题与说明，几何网格与橙色强调装饰。纯 CSS/SVG，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('目录').meta({
        description: "页面标题，默认『目录』，也可写『议程』『内容概览』等",
    }),
    items: z.array(z.object({
        heading: z.string().min(2).max(16).meta({
            description: "分节标题（中文，简短），编号会自动生成",
        }),
        desc: z.string().max(28).optional().meta({
            description: "分节的一句话说明（可选）",
        }),
    })).min(3).max(6).default([
        { heading: '公司概况', desc: '使命愿景与核心业务版图' },
        { heading: '市场洞察', desc: '行业趋势与竞争格局分析' },
        { heading: '战略路径', desc: '增长引擎与重点突破方向' },
        { heading: '业绩表现', desc: '关键财务指标与经营成果' },
        { heading: '未来展望', desc: '中长期目标与行动计划' },
    ]).meta({ description: "目录条目列表（3 至 6 项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TableOfContents: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '目录'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : [
            { heading: '公司概况', desc: '使命愿景与核心业务版图' },
            { heading: '市场洞察', desc: '行业趋势与竞争格局分析' },
            { heading: '战略路径', desc: '增长引擎与重点突破方向' },
            { heading: '业绩表现', desc: '关键财务指标与经营成果' },
            { heading: '未来展望', desc: '中长期目标与行动计划' },
        ]

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
                {/* 背景几何网格装饰层 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="bizTocGrid" width="64" height="64" patternUnits="userSpaceOnUse">
                            <path d="M64 0 L0 0 0 64" fill="none" stroke="#1e3a8a" strokeOpacity="0.05" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="1280" height="720" fill="url(#bizTocGrid)" />
                </svg>

                {/* 左侧深色标题面板 */}
                <div
                    className="absolute top-0 left-0 h-full w-[34%] overflow-hidden"
                    style={{ background: "var(--primary-color,#1e3a8a)" }}
                    aria-hidden="true"
                >
                    <svg viewBox="0 0 440 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="bizTocGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <rect width="440" height="720" fill="url(#bizTocGlow)" />
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={i} cx="60" cy="600" r={70 + i * 60} fill="none" stroke="#ffffff" strokeOpacity={0.08} strokeWidth="1.5" />
                        ))}
                        <line x1="-40" y1="180" x2="480" y2="-120" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1.5" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full">
                    {/* 左侧标题区 */}
                    <div className="flex w-[34%] flex-shrink-0 flex-col justify-center pl-14 pr-8">
                        <span
                            className="mb-5 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                background: "rgba(255,255,255,0.12)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            CONTENTS
                        </span>
                        <h1
                            className="text-6xl font-black leading-[1.2] break-words"
                            style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-7 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <p
                            className="mt-7 text-base leading-relaxed break-words"
                            style={{ color: "var(--primary-text,#ffffff)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            共 {items.length} 个章节
                        </p>
                    </div>

                    {/* 右侧目录条目区 */}
                    <div className="flex flex-1 flex-col justify-center gap-4 py-12 pl-12 pr-16">
                        {items.map((item, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-6 rounded-2xl border px-7 py-4"
                                    style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                                >
                                    {/* 编号大字 */}
                                    <span
                                        className="flex-shrink-0 text-5xl font-black leading-[1.2]"
                                        style={{ color: "var(--secondary-color,#f97316)" }}
                                    >
                                        {num}
                                    </span>
                                    {/* 竖向分隔条 */}
                                    <span
                                        className="block h-12 w-1 flex-shrink-0 rounded-full"
                                        style={{ background: "var(--primary-color,#1e3a8a)", opacity: 0.85 }}
                                        aria-hidden="true"
                                    />
                                    {/* 分节标题与说明 */}
                                    <div className="flex min-w-0 flex-col leading-relaxed">
                                        <span
                                            className="text-xl font-bold leading-[1.35] break-words"
                                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.heading}
                                        </span>
                                        {item?.desc && (
                                            <span
                                                className="mt-1 text-sm leading-relaxed break-words"
                                                style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {item.desc}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableOfContents
