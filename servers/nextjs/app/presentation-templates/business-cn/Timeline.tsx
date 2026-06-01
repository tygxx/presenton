import React from 'react'
import * as z from "zod";

export const layoutId = 'business-cn-timeline'
export const layoutName = '时间线'
export const layoutDescription = '商务风横向里程碑时间线：深蓝轴线 + 橙色节点，3~5 个关键阶段，每个节点含时间、标题与简述。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('发展历程与里程碑').meta({
        description: "时间线主标题（中文，简短有力）",
    }),
    milestones: z.array(z.object({
        time: z.string().min(1).max(10).meta({
            description: "时间节点，如 2021 / 2023Q2 / 第一阶段",
        }),
        title: z.string().min(2).max(14).meta({
            description: "里程碑标题（简短）",
        }),
        desc: z.string().min(4).max(36).meta({
            description: "里程碑简述（一句话）",
        }),
    })).min(3).max(5).default([
        { time: '2021', title: '公司成立', desc: '组建核心团队，确立企业服务战略方向。' },
        { time: '2022', title: '产品上线', desc: '首款核心产品发布，签约首批标杆客户。' },
        { time: '2023', title: '规模扩张', desc: '完成 A 轮融资，业务覆盖全国主要城市。' },
        { time: '2024', title: '生态共建', desc: '打造开放平台，携手伙伴构建行业生态。' },
        { time: '2025', title: '全球布局', desc: '设立海外分支，迈向国际化经营新阶段。' },
    ]).meta({ description: "里程碑列表（3~5 个）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Timeline: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '发展历程与里程碑'
    const milestones = (slideData?.milestones && slideData.milestones.length > 0)
        ? slideData.milestones
        : [
            { time: '2021', title: '公司成立', desc: '组建核心团队，确立企业服务战略方向。' },
            { time: '2022', title: '产品上线', desc: '首款核心产品发布，签约首批标杆客户。' },
            { time: '2023', title: '规模扩张', desc: '完成 A 轮融资，业务覆盖全国主要城市。' },
            { time: '2024', title: '生态共建', desc: '打造开放平台，携手伙伴构建行业生态。' },
            { time: '2025', title: '全球布局', desc: '设立海外分支，迈向国际化经营新阶段。' },
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
                {/* 背景装饰：经典商务网格 + 几何光晕 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="bizTlGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0H0V48" fill="none" stroke="var(--primary-color,#1e3a8a)" strokeOpacity="0.05" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="bizTlGlow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#1e3a8a)" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="var(--primary-color,#1e3a8a)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#bizTlGrid)" />
                    <circle cx="120" cy="80" r="260" fill="url(#bizTlGlow)" />
                </svg>

                {/* 左上角橙色几何面板角标 */}
                <div
                    className="absolute top-0 left-0"
                    style={{
                        width: '0', height: '0',
                        borderTop: '74px solid var(--secondary-color,#f97316)',
                        borderRight: '74px solid transparent',
                        opacity: 0.9,
                    }}
                    aria-hidden="true"
                />

                {/* 内容主体 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex-shrink-0">
                        <div className="mb-4 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                    </div>

                    {/* 横向时间线 */}
                    <div className="relative flex flex-1 items-center">
                        {/* 轴线 */}
                        <div
                            className="absolute left-0 right-0 rounded-full"
                            style={{ top: '50%', height: '3px', background: "var(--stroke,#e2e8f0)" }}
                            aria-hidden="true"
                        />
                        <div
                            className="absolute left-0 rounded-full"
                            style={{ top: '50%', height: '3px', width: '88%', background: "var(--primary-color,#1e3a8a)", opacity: 0.85 }}
                            aria-hidden="true"
                        />

                        {/* 节点 */}
                        <div className="relative z-10 flex w-full items-stretch justify-between gap-5">
                            {milestones.map((m, i) => {
                                const above = i % 2 === 0
                                return (
                                    <div key={i} className="flex flex-1 flex-col items-center">
                                        {/* 上方卡片 */}
                                        <div className={`flex flex-1 flex-col justify-end ${above ? '' : 'opacity-0 pointer-events-none'}`}>
                                            {above && (
                                                <div
                                                    className="mb-5 rounded-2xl border px-5 py-4 shadow-sm"
                                                    style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                                                >
                                                    <span
                                                        className="text-base font-bold leading-[1.3] break-words"
                                                        style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                    >
                                                        {m.title}
                                                    </span>
                                                    <p
                                                        className="mt-1.5 text-xs leading-relaxed break-words"
                                                        style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                    >
                                                        {m.desc}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* 时间标签（上方节点显示在节点上沿与卡片之间，此处统一用节点圆点的时间徽标） */}
                                        <div className="relative flex flex-col items-center">
                                            <div
                                                className="flex h-7 w-7 items-center justify-center rounded-full border-[3px]"
                                                style={{
                                                    background: "var(--card-color,#ffffff)",
                                                    borderColor: "var(--secondary-color,#f97316)",
                                                }}
                                                aria-hidden="true"
                                            >
                                                <span
                                                    className="h-2.5 w-2.5 rounded-full"
                                                    style={{ background: "var(--primary-color,#1e3a8a)" }}
                                                />
                                            </div>
                                        </div>

                                        {/* 下方卡片 */}
                                        <div className={`flex flex-1 flex-col justify-start ${above ? 'opacity-0 pointer-events-none' : ''}`}>
                                            {!above && (
                                                <div
                                                    className="mt-5 rounded-2xl border px-5 py-4 shadow-sm"
                                                    style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                                                >
                                                    <span
                                                        className="text-base font-bold leading-[1.3] break-words"
                                                        style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                    >
                                                        {m.title}
                                                    </span>
                                                    <p
                                                        className="mt-1.5 text-xs leading-relaxed break-words"
                                                        style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                    >
                                                        {m.desc}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 底部时间刻度 */}
                    <div className="flex-shrink-0">
                        <div className="flex w-full items-start justify-between gap-5">
                            {milestones.map((m, i) => (
                                <div key={i} className="flex flex-1 flex-col items-center">
                                    <span
                                        className="inline-flex items-center rounded-full px-3 py-1 text-sm font-bold leading-[1.4] break-words"
                                        style={{
                                            background: "rgba(30,58,138,0.08)",
                                            color: "var(--primary-color,#1e3a8a)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {m.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Timeline
