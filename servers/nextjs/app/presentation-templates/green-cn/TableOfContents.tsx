import React from 'react'
import * as z from "zod";

export const layoutId = 'green-cn-toc'
export const layoutName = '目录'
export const layoutDescription = '新能源环保风目录页：清新白绿背景 + 叶片/地球/自然曲线装饰，编号大字 01/02 配分节标题与说明。纯 CSS/SVG，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('目录').meta({
        description: "目录页主标题，默认『目录』",
    }),
    items: z.array(z.object({
        heading: z.string().min(2).max(16).meta({
            description: "分节标题（中文，简短）",
        }),
        desc: z.string().max(28).optional().meta({
            description: "分节说明，一句话补充（可选）",
        }),
    })).min(3).max(6).default([
        { heading: '绿色发展愿景', desc: '碳中和目标与可持续战略蓝图' },
        { heading: '清洁能源布局', desc: '光伏、风电与储能协同体系' },
        { heading: '低碳技术创新', desc: '前沿减排技术与研发突破' },
        { heading: '生态保护实践', desc: '自然修复与生物多样性守护' },
        { heading: '社会责任成果', desc: '绿色公益与社区共建成效' },
    ]).meta({
        description: "目录条目，编号在组件内自动生成 01/02…",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TableOfContents: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '目录'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : [
            { heading: '绿色发展愿景', desc: '碳中和目标与可持续战略蓝图' },
            { heading: '清洁能源布局', desc: '光伏、风电与储能协同体系' },
            { heading: '低碳技术创新', desc: '前沿减排技术与研发突破' },
            { heading: '生态保护实践', desc: '自然修复与生物多样性守护' },
            { heading: '社会责任成果', desc: '绿色公益与社区共建成效' },
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
                    background: "var(--background-color,#f0fdf4)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：自然有机曲线 + 叶片 + 地球轮廓光晕 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="greenTocBg" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="greenTocLeaf" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#16a34a)" />
                            <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" />
                        </linearGradient>
                        <radialGradient id="greenTocEarth" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#greenTocBg)" />
                    {/* 底部自然有机曲线（叠层水波/丘陵） */}
                    <path d="M0 612 C 200 560, 420 660, 660 606 C 900 552, 1080 648, 1280 590 L 1280 720 L 0 720 Z" fill="var(--primary-color,#16a34a)" fillOpacity="0.07" />
                    <path d="M0 660 C 260 612, 480 700, 720 652 C 940 608, 1120 686, 1280 644 L 1280 720 L 0 720 Z" fill="var(--secondary-color,#0891b2)" fillOpacity="0.06" />
                    {/* 右上地球轮廓光晕 + 经纬线 */}
                    <circle cx="1180" cy="100" r="190" fill="url(#greenTocEarth)" />
                    <g stroke="var(--secondary-color,#0891b2)" strokeOpacity="0.14" strokeWidth="1.5" fill="none">
                        <circle cx="1180" cy="100" r="86" />
                        <ellipse cx="1180" cy="100" rx="40" ry="86" />
                        <ellipse cx="1180" cy="100" rx="74" ry="86" />
                        <line x1="1094" y1="100" x2="1266" y2="100" />
                        <path d="M1100 64 C 1140 76, 1220 76, 1260 64" />
                        <path d="M1100 136 C 1140 124, 1220 124, 1260 136" />
                    </g>
                    {/* 左上叶片母题 */}
                    <g transform="translate(96 -8) rotate(28)">
                        <path d="M0 0 C 70 -42, 150 -28, 168 60 C 96 80, 18 56, 0 0 Z" fill="var(--primary-color,#16a34a)" fillOpacity="0.10" />
                        <path d="M14 14 C 70 6, 120 18, 150 52" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.20" strokeWidth="2" fill="none" />
                    </g>
                </svg>

                {/* 主内容：左标题栏 + 右目录列表 */}
                <div className="relative z-10 flex h-full px-16 py-12 gap-12">
                    {/* 左侧标题区 */}
                    <div className="flex w-[30%] flex-shrink-0 flex-col justify-center">
                        <div
                            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#16a34a)",
                                background: "rgba(22,163,74,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {/* 叶片小图标 */}
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                                <path d="M5 19 C 5 9, 13 4, 20 4 C 20 12, 15 20, 5 19 Z M8 16 C 11 12, 15 9, 18 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="break-words" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>绿色未来 · 议程</span>
                        </div>

                        <h1
                            className="text-6xl font-black leading-[1.2] break-words"
                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div
                            className="my-7 h-1.5 w-20 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#16a34a), var(--secondary-color,#0891b2))" }}
                        />

                        <p
                            className="text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#14532d)", opacity: 0.75, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            共筑清洁、自然、可持续的绿色明天
                        </p>
                    </div>

                    {/* 右侧目录列表 */}
                    <div className="flex flex-1 flex-col justify-center gap-4">
                        {items.map((item, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-5 rounded-2xl border px-6 py-4"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#d1fae5)",
                                        boxShadow: '0 6px 18px rgba(22,163,74,0.06)',
                                    }}
                                >
                                    {/* 编号大字 */}
                                    <span
                                        className="flex-shrink-0 text-4xl font-black leading-none break-words"
                                        style={{
                                            color: 'transparent',
                                            backgroundImage: "linear-gradient(135deg, var(--primary-color,#16a34a), var(--secondary-color,#0891b2))",
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {num}
                                    </span>

                                    {/* 分隔短竖线 */}
                                    <span
                                        className="h-10 w-0.5 flex-shrink-0 rounded-full"
                                        style={{ background: "var(--stroke,#d1fae5)" }}
                                    />

                                    {/* 分节标题 + 说明 */}
                                    <div className="flex min-w-0 flex-col leading-relaxed">
                                        <span
                                            className="text-xl font-bold leading-[1.35] break-words"
                                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item.heading}
                                        </span>
                                        {item.desc && (
                                            <span
                                                className="mt-1 text-sm leading-relaxed break-words"
                                                style={{ color: "var(--background-text,#14532d)", opacity: 0.65, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {item.desc}
                                            </span>
                                        )}
                                    </div>

                                    {/* 右侧叶片小标记 */}
                                    <svg viewBox="0 0 24 24" className="ml-auto h-5 w-5 flex-shrink-0" aria-hidden="true">
                                        <path d="M5 19 C 5 9, 13 4, 20 4 C 20 12, 15 20, 5 19 Z" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
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
