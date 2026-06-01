import React from 'react'
import * as z from "zod";

export const layoutId = 'finance-cn-timeline'
export const layoutName = '时间线'
export const layoutDescription = '金融投资风横向时间线页：深藏青底叠数据网格与增长曲线，香槟金细轴线串联里程碑节点，棱形节点托起年份，配衬线标题与无衬线正文。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('十年发展里程碑').meta({
        description: "页面主标题（中文，简短有力，体现金融投资发展脉络）",
    }),
    milestones: z.array(z.object({
        time: z.string().min(1).max(10).meta({ description: "时间节点，如年份/季度，如『2018』『2024 Q3』" }),
        title: z.string().min(2).max(14).meta({ description: "里程碑小标题（中文，精炼）" }),
        desc: z.string().min(4).max(36).meta({ description: "里程碑描述（一句话说明该阶段成果）" }),
    })).min(3).max(5).default([
        { time: '2016', title: '基金设立', desc: '首期私募基金完成募集，管理规模突破十亿。' },
        { time: '2019', title: '策略升级', desc: '搭建多资产配置体系，引入量化风控引擎。' },
        { time: '2022', title: '穿越周期', desc: '震荡市中实现正收益，年化回撤显著收窄。' },
        { time: '2024', title: '规模跃迁', desc: '资产管理规模突破百亿，跻身行业前列。' },
        { time: '2026', title: '价值致远', desc: '布局全球资产，构建可持续长期回报体系。' },
    ]).meta({ description: "三到五个里程碑，每项含时间、小标题与描述，沿横向轴线排列" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK_MILESTONES = [
    { time: '2016', title: '基金设立', desc: '首期私募基金完成募集，管理规模突破十亿。' },
    { time: '2019', title: '策略升级', desc: '搭建多资产配置体系，引入量化风控引擎。' },
    { time: '2022', title: '穿越周期', desc: '震荡市中实现正收益，年化回撤显著收窄。' },
    { time: '2024', title: '规模跃迁', desc: '资产管理规模突破百亿，跻身行业前列。' },
    { time: '2026', title: '价值致远', desc: '布局全球资产，构建可持续长期回报体系。' },
]

const Timeline: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '十年发展里程碑'
    const milestones = (slideData?.milestones && slideData.milestones.length >= 3)
        ? slideData.milestones.slice(0, 5)
        : FALLBACK_MILESTONES

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
                {/* 背景装饰层：数据网格 + 增长曲线 + 细金线 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="finTlVignette" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.55" />
                            <stop offset="55%" stopColor="#0f172a" stopOpacity="0" />
                            <stop offset="100%" stopColor="#0b1120" stopOpacity="0.65" />
                        </linearGradient>
                        <linearGradient id="finTlGold" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="finTlCurve" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.0" />
                            <stop offset="100%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.32" />
                        </linearGradient>
                        <pattern id="finTlGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 H0 V40" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.35" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {/* 数据网格母题 */}
                    <rect width="1280" height="720" fill="url(#finTlGrid)" />
                    <rect width="1280" height="720" fill="url(#finTlVignette)" />
                    {/* 增长曲线母题（面积 + 描边） */}
                    <path d="M0 640 C 240 600, 420 520, 640 470 S 1020 350, 1280 230 L 1280 720 L 0 720 Z" fill="url(#finTlCurve)" />
                    <path d="M0 640 C 240 600, 420 520, 640 470 S 1020 350, 1280 230" fill="none" stroke="var(--secondary-color,#60a5fa)" strokeOpacity="0.45" strokeWidth="2" />
                    {/* 顶部细金线 */}
                    <rect x="0" y="0" width="1280" height="3" fill="url(#finTlGold)" />
                    {/* 右上棱形阵列母题 */}
                    {[0, 1, 2, 3].map((i) => (
                        <rect
                            key={`d${i}`}
                            x={1052 + i * 26} y={86 + i * 4} width="16" height="16"
                            transform={`rotate(45 ${1060 + i * 26} ${94 + i * 4})`}
                            fill="none" stroke="var(--primary-color,#d4af37)" strokeOpacity={0.5 - i * 0.09} strokeWidth="1.4"
                        />
                    ))}
                </svg>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col items-start">
                        <span
                            className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase break-words"
                            style={{ color: "var(--primary-color,#d4af37)", letterSpacing: '0.18em', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            <span className="inline-block h-[1px] w-7" style={{ background: "var(--primary-color,#d4af37)" }} />
                            MILESTONES
                        </span>
                        <h1
                            className="text-5xl font-bold leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#e2e8f0)",
                                fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        <div className="mt-5 h-[2px] w-20 rounded-full" style={{ background: "var(--primary-color,#d4af37)" }} />
                    </div>

                    {/* 横向时间线 */}
                    <div className="relative mt-12 flex flex-1 items-center">
                        {/* 轴线层（细金线，铺满节点区） */}
                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2" aria-hidden="true">
                            <div
                                className="h-[2px] w-full rounded-full"
                                style={{ background: "linear-gradient(90deg, rgba(212,175,55,0), var(--primary-color,#d4af37) 12%, var(--primary-color,#d4af37) 88%, rgba(212,175,55,0))" }}
                            />
                        </div>

                        {/* 里程碑节点：奇偶错落，上下交替排布 */}
                        <div className="relative flex w-full items-stretch justify-between gap-5">
                            {milestones.map((m, i) => {
                                const isUp = i % 2 === 0
                                return (
                                    <div key={i} className="flex flex-1 flex-col items-center">
                                        {/* 上方卡片（偶数项） */}
                                        <div className="flex w-full flex-col items-center" style={{ visibility: isUp ? 'visible' : 'hidden', minHeight: '1px' }}>
                                            {isUp && (
                                                <MilestoneCard time={m.time} title={m.title} desc={m.desc} align="up" />
                                            )}
                                        </div>

                                        {/* 中央棱形节点 */}
                                        <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center">
                                            <span
                                                className="absolute inset-0"
                                                style={{
                                                    background: "var(--primary-color,#d4af37)",
                                                    opacity: 0.16,
                                                    transform: 'rotate(45deg)',
                                                    borderRadius: '10px',
                                                }}
                                            />
                                            <span
                                                className="absolute inset-[5px]"
                                                style={{
                                                    border: '1.4px solid var(--primary-color,#d4af37)',
                                                    transform: 'rotate(45deg)',
                                                    borderRadius: '7px',
                                                }}
                                            />
                                            <span
                                                className="relative h-2.5 w-2.5 rounded-full"
                                                style={{
                                                    background: "var(--primary-color,#d4af37)",
                                                    boxShadow: '0 0 0 4px rgba(212,175,55,0.18)',
                                                }}
                                            />
                                        </div>

                                        {/* 下方卡片（奇数项） */}
                                        <div className="flex w-full flex-col items-center" style={{ visibility: isUp ? 'hidden' : 'visible', minHeight: '1px' }}>
                                            {!isUp && (
                                                <MilestoneCard time={m.time} title={m.title} desc={m.desc} align="down" />
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const MilestoneCard: React.FC<{ time: string; title: string; desc: string; align: 'up' | 'down' }> = ({ time, title, desc, align }) => {
    return (
        <div className={`flex w-full max-w-[15rem] flex-col ${align === 'up' ? 'mb-6 items-center' : 'mt-6 items-center'}`}>
            {/* 时间徽标 */}
            <span
                className="mb-3 inline-flex items-center break-words"
                style={{
                    color: "var(--primary-color,#d4af37)",
                    fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    lineHeight: 1.3,
                    letterSpacing: '0.04em',
                    overflowWrap: 'break-word', wordBreak: 'break-word',
                }}
            >
                {time}
            </span>

            {/* 文本卡片 */}
            <div
                className="flex w-full flex-col items-center rounded-2xl border px-5 py-4 text-center"
                style={{
                    background: "var(--card-color,#1e293b)",
                    borderColor: "var(--stroke,#334155)",
                    boxShadow: '0 10px 30px rgba(2,6,23,0.45)',
                }}
            >
                <h3
                    className="text-lg font-bold leading-[1.3] break-words"
                    style={{
                        color: "var(--primary-text,#ffffff)",
                        fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                        overflowWrap: 'break-word', wordBreak: 'break-word',
                    }}
                >
                    {title}
                </h3>
                <div className="my-2.5 h-[1px] w-8" style={{ background: "var(--primary-color,#d4af37)", opacity: 0.7 }} />
                <p
                    className="text-sm leading-[1.7] break-words"
                    style={{
                        color: "var(--background-text,#e2e8f0)",
                        opacity: 0.82,
                        overflowWrap: 'break-word', wordBreak: 'break-word',
                    }}
                >
                    {desc}
                </p>
            </div>
        </div>
    )
}

export default Timeline
