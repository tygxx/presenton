import React from 'react'
import * as z from "zod";

export const layoutId = 'retail-cn-timeline'
export const layoutName = '时间线'
export const layoutDescription = '电商新零售风时间线：横向轴线 + 圆角节点卡片，撞色色块与价签式标签，潮流粗体排版。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('品牌增长里程碑').meta({
        description: "时间线主标题（中文，简短有力）",
    }),
    milestones: z.array(z.object({
        time: z.string().min(1).max(10).meta({
            description: "时间点，如年份/季度/月份",
        }),
        title: z.string().min(2).max(14).meta({
            description: "里程碑标题（简短）",
        }),
        desc: z.string().min(2).max(36).meta({
            description: "里程碑说明，一句话描述",
        }),
    })).min(3).max(5).default([
        { time: '2021', title: '品牌上线', desc: '首店入驻头部平台，开启全域经营' },
        { time: '2022', title: '私域破圈', desc: '社群+直播双引擎，会员突破百万' },
        { time: '2023', title: '全渠道', desc: '线上线下一体化，门店数翻三倍' },
        { time: '2024', title: 'GMV登顶', desc: '类目销量第一，复购率超六成' },
        { time: '2025', title: '出海加速', desc: '布局东南亚市场，品牌全球化' },
    ]).meta({
        description: "里程碑节点列表（3-5 个，按时间顺序）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ACCENTS = [
    'var(--primary-color,#db2777)',
    'var(--secondary-color,#f59e0b)',
    'var(--primary-color,#db2777)',
    'var(--secondary-color,#f59e0b)',
    'var(--primary-color,#db2777)',
]

const Timeline: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '品牌增长里程碑'
    const milestones = (slideData?.milestones && slideData.milestones.length > 0)
        ? slideData.milestones
        : [
            { time: '2021', title: '品牌上线', desc: '首店入驻头部平台，开启全域经营' },
            { time: '2022', title: '私域破圈', desc: '社群+直播双引擎，会员突破百万' },
            { time: '2023', title: '全渠道', desc: '线上线下一体化，门店数翻三倍' },
            { time: '2024', title: 'GMV登顶', desc: '类目销量第一，复购率超六成' },
            { time: '2025', title: '出海加速', desc: '布局东南亚市场，品牌全球化' },
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
                    background: "var(--background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：撞色大色块 + 活力几何形 */}
                <div
                    className="absolute top-0 left-0 h-full w-[34%]"
                    style={{
                        background: "linear-gradient(150deg, var(--primary-color,#db2777) 0%, var(--secondary-color,#f59e0b) 160%)",
                    }}
                    aria-hidden="true"
                />
                <svg
                    viewBox="0 0 460 720"
                    className="absolute top-0 left-0 h-full w-[34%]"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="retailTLGlow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="460" height="720" fill="url(#retailTLGlow)" />
                    <circle cx="380" cy="120" r="150" fill="none" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="2" />
                    <circle cx="380" cy="120" r="92" fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="2" />
                    {/* 活力几何形：旋转方块 */}
                    <rect x="60" y="560" width="86" height="86" rx="18" fill="#ffffff" fillOpacity="0.12" transform="rotate(18 103 603)" />
                    <rect x="150" y="470" width="40" height="40" rx="10" fill="#ffffff" fillOpacity="0.16" transform="rotate(-12 170 490)" />
                </svg>

                {/* 右上角价签式角标 */}
                <div
                    className="absolute top-7 right-8 z-10 flex items-center gap-2 rounded-full px-4 py-1.5"
                    style={{ background: "var(--card-color,#fdf2f8)", border: "1.5px solid var(--stroke,#fbcfe8)" }}
                    aria-hidden="true"
                >
                    <span
                        className="inline-block h-3 w-3 rounded-sm"
                        style={{ background: "var(--secondary-color,#f59e0b)" }}
                    />
                    <span
                        className="text-xs font-bold break-words"
                        style={{ color: "var(--primary-color,#db2777)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        GROWTH
                    </span>
                </div>

                <div className="relative z-10 flex h-full flex-col">
                    {/* 顶部标题区 */}
                    <div className="flex flex-shrink-0 items-end gap-5 px-14 pt-14 pb-2">
                        <span
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-xl font-black"
                            style={{
                                background: "var(--secondary-color,#f59e0b)",
                                color: "var(--primary-text,#ffffff)",
                                boxShadow: "0 8px 20px rgba(245,158,11,0.32)",
                            }}
                        >
                            ↗
                        </span>
                        <div className="flex flex-col">
                            <span
                                className="mb-1 text-sm font-bold break-words"
                                style={{ color: "var(--secondary-color,#f59e0b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                MILESTONE · 发展历程
                            </span>
                            <h1
                                className="text-4xl font-black leading-[1.2] break-words"
                                style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* 横向时间线主体 */}
                    <div className="flex min-h-0 flex-1 items-center px-14 pb-12">
                        <div className="relative w-full">
                            {/* 横向轴线 */}
                            <div
                                className="absolute left-0 right-0 rounded-full"
                                style={{
                                    top: '52px',
                                    height: '4px',
                                    background: "linear-gradient(90deg, var(--primary-color,#db2777), var(--secondary-color,#f59e0b))",
                                    opacity: 0.85,
                                }}
                                aria-hidden="true"
                            />

                            {/* 节点卡片 */}
                            <div className="relative flex items-stretch gap-4">
                                {milestones.map((m, i) => {
                                    const accent = ACCENTS[i % ACCENTS.length]
                                    return (
                                        <div key={i} className="flex flex-1 flex-col items-center">
                                            {/* 时间价签 */}
                                            <div
                                                className="mb-3 flex items-center rounded-full px-4 py-1 text-sm font-black break-words"
                                                style={{
                                                    background: accent,
                                                    color: "var(--primary-text,#ffffff)",
                                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                                }}
                                            >
                                                {m?.time}
                                            </div>

                                            {/* 轴线节点 */}
                                            <div
                                                className="z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
                                                style={{
                                                    background: "var(--background-color,#ffffff)",
                                                    border: `4px solid ${accent}`,
                                                }}
                                                aria-hidden="true"
                                            >
                                                <span
                                                    className="h-2.5 w-2.5 rounded-full"
                                                    style={{ background: accent }}
                                                />
                                            </div>

                                            {/* 圆角卡片 */}
                                            <div
                                                className="mt-3 flex w-full flex-col items-center rounded-2xl px-4 py-5 text-center"
                                                style={{
                                                    background: "var(--card-color,#fdf2f8)",
                                                    border: "1.5px solid var(--stroke,#fbcfe8)",
                                                    boxShadow: "0 10px 24px rgba(219,39,119,0.08)",
                                                }}
                                            >
                                                {/* 序号撞色色块 */}
                                                <span
                                                    className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black"
                                                    style={{
                                                        background: accent,
                                                        color: "var(--primary-text,#ffffff)",
                                                    }}
                                                    aria-hidden="true"
                                                >
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                                <h3
                                                    className="text-lg font-black leading-[1.3] break-words"
                                                    style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                >
                                                    {m?.title}
                                                </h3>
                                                <p
                                                    className="mt-2 text-sm leading-relaxed break-words"
                                                    style={{ color: "var(--background-text,#71717a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                >
                                                    {m?.desc}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Timeline
