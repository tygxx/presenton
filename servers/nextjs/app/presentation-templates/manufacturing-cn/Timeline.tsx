import React from 'react'
import * as z from "zod";

export const layoutId = 'manufacturing-cn-timeline'
export const layoutName = '时间线'
export const layoutDescription = '智能制造风时间线：工业深灰底 + 精密网格 + 齿轮装饰，横向轴线串联 3~5 个里程碑节点。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('智能工厂演进之路').meta({
        description: "时间线主标题（中文，简短有力）",
    }),
    milestones: z.array(z.object({
        time: z.string().min(1).max(10).meta({
            description: "里程碑时间，如『2021』『一期』",
        }),
        title: z.string().min(2).max(14).meta({
            description: "里程碑标题，简短",
        }),
        desc: z.string().min(2).max(36).meta({
            description: "里程碑说明，一句话",
        }),
    })).min(3).max(5).default([
        { time: '2021', title: '自动化产线', desc: '关键工序机器换人，单线产能提升四成。' },
        { time: '2022', title: '数据互联', desc: '设备全面联网，工厂级数据采集与监控落地。' },
        { time: '2024', title: '柔性制造', desc: '柔性产线支持多品种小批量快速切换。' },
        { time: '2026', title: '黑灯工厂', desc: '核心车间无人化运行，良率稳定在九成九。' },
    ]).meta({
        description: "横向里程碑节点（3~5 个）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Timeline: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '智能工厂演进之路'
    const milestones = (slideData?.milestones && slideData.milestones.length > 0)
        ? slideData.milestones
        : [
            { time: '2021', title: '自动化产线', desc: '关键工序机器换人，单线产能提升四成。' },
            { time: '2022', title: '数据互联', desc: '设备全面联网，工厂级数据采集与监控落地。' },
            { time: '2024', title: '柔性制造', desc: '柔性产线支持多品种小批量快速切换。' },
            { time: '2026', title: '黑灯工厂', desc: '核心车间无人化运行，良率稳定在九成九。' },
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
                    background: "var(--background-color,#1f2937)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：精密网格 + 齿轮 + 金属质感线条 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            {/* 精密网格图案 */}
                            <pattern id="mfgGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.45" strokeWidth="1" />
                            </pattern>
                            {/* 顶部金属光晕 */}
                            <linearGradient id="mfgMetalGlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="mfgAxisGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#mfgGrid)" />
                        <rect width="1280" height="260" fill="url(#mfgMetalGlow)" />
                        {/* 右上齿轮母题 */}
                        <g transform="translate(1140 96)" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.22" fill="none" strokeWidth="3">
                            <circle r="58" />
                            <circle r="26" />
                            {Array.from({ length: 12 }).map((_, i) => {
                                const a = (i * Math.PI) / 6
                                return (
                                    <line
                                        key={i}
                                        x1={Math.cos(a) * 58}
                                        y1={Math.sin(a) * 58}
                                        x2={Math.cos(a) * 74}
                                        y2={Math.sin(a) * 74}
                                    />
                                )
                            })}
                        </g>
                        {/* 左下齿轮母题（小） */}
                        <g transform="translate(96 640)" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.18" fill="none" strokeWidth="2.5">
                            <circle r="40" />
                            <circle r="16" />
                            {Array.from({ length: 10 }).map((_, i) => {
                                const a = (i * Math.PI) / 5
                                return (
                                    <line
                                        key={i}
                                        x1={Math.cos(a) * 40}
                                        y1={Math.sin(a) * 40}
                                        x2={Math.cos(a) * 52}
                                        y2={Math.sin(a) * 52}
                                    />
                                )
                            })}
                        </g>
                        {/* 硬朗金属斜线 */}
                        <line x1="0" y1="700" x2="1280" y2="640" stroke="var(--stroke,#374151)" strokeOpacity="0.8" strokeWidth="1.5" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex items-center gap-4">
                        <span
                            className="inline-block h-9 w-1.5 flex-shrink-0 rounded-sm"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />
                        <div className="flex flex-col">
                            <span
                                className="text-xs font-semibold uppercase break-words"
                                style={{ color: "var(--secondary-color,#f97316)", letterSpacing: '0.18em', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                MILESTONE / 发展里程碑
                            </span>
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* 横向时间线主体 */}
                    <div className="relative flex flex-1 items-stretch">
                        {/* 横向轴线（金属渐变，居中贯穿） */}
                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
                            <div
                                className="h-[3px] w-full rounded-full"
                                style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#f97316))", opacity: 0.9 }}
                            />
                        </div>

                        {/* 节点序列：每列三行（上卡 / 节点 / 下卡），轴线恒居中 */}
                        <div className="relative z-10 grid w-full gap-4" style={{ gridTemplateColumns: `repeat(${milestones.length}, minmax(0, 1fr))` }}>
                            {milestones.map((m, i) => {
                                const isUp = i % 2 === 0
                                return (
                                    <div key={i} className="grid h-full" style={{ gridTemplateRows: '1fr auto 1fr' }}>
                                        {/* 上半区：偶数节点放卡片 */}
                                        <div className="flex flex-col items-center justify-end pb-1">
                                            {isUp && (
                                                <>
                                                    <MilestoneCard m={m} index={i} />
                                                    <span className="mt-1 block w-px" style={{ height: '14px', background: "var(--stroke,#374151)" }} />
                                                </>
                                            )}
                                        </div>

                                        {/* 中间：节点圆点 */}
                                        <div className="flex items-center justify-center">
                                            <Node index={i} />
                                        </div>

                                        {/* 下半区：奇数节点放卡片 */}
                                        <div className="flex flex-col items-center justify-start pt-1">
                                            {!isUp && (
                                                <>
                                                    <span className="mb-1 block w-px" style={{ height: '14px', background: "var(--stroke,#374151)" }} />
                                                    <MilestoneCard m={m} index={i} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 底部图例 / 节奏说明 */}
                    <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-2">
                            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "var(--primary-color,#3b82f6)" }} />
                            <span className="text-xs break-words" style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                已交付阶段
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                            <span className="text-xs break-words" style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                规划阶段
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// 节点圆点（带光圈与齿轮内核感）
const Node: React.FC<{ index: number }> = ({ index }) => {
    const accent = index % 2 === 0 ? "var(--primary-color,#3b82f6)" : "var(--secondary-color,#f97316)"
    return (
        <span
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
            style={{
                background: "var(--card-color,#111827)",
                border: `3px solid ${accent}`,
                boxShadow: `0 0 0 5px rgba(31,41,55,0.9), 0 0 14px ${accent}`,
            }}
        >
            <span className="block h-2 w-2 rounded-full" style={{ background: accent }} />
        </span>
    )
}

// 里程碑卡片
const MilestoneCard: React.FC<{ m: { time?: string; title?: string; desc?: string }; index: number }> = ({ m, index }) => {
    const accent = index % 2 === 0 ? "var(--primary-color,#3b82f6)" : "var(--secondary-color,#f97316)"
    return (
        <div
            className="flex w-full max-w-[16rem] flex-col rounded-xl border px-5 py-4"
            style={{
                background: "var(--card-color,#111827)",
                borderColor: "var(--stroke,#374151)",
                borderTop: `3px solid ${accent}`,
            }}
        >
            <span
                className="inline-flex w-fit items-center rounded-md px-2.5 py-1 text-sm font-black leading-none break-words"
                style={{ color: accent, background: "rgba(255,255,255,0.04)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
            >
                {m?.time || '—'}
            </span>
            <h3
                className="mt-3 text-lg font-bold leading-[1.3] break-words"
                style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
            >
                {m?.title || '里程碑'}
            </h3>
            <p
                className="mt-2 text-sm leading-relaxed break-words"
                style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
            >
                {m?.desc || '阶段成果说明。'}
            </p>
        </div>
    )
}

export default Timeline
