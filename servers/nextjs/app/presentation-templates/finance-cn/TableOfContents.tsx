import React from 'react'
import * as z from "zod";

export const layoutId = 'finance-cn-toc'
export const layoutName = '目录'
export const layoutDescription = '金融投资风目录页：深藏青底配香槟金细线与数据网格，衬线大标题，左侧大编号分节、右侧议程列表。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('目录').meta({
        description: "目录页标题（中文，通常为『目录』『议程』）",
    }),
    items: z.array(z.object({
        heading: z.string().min(2).max(16).meta({
            description: "分节标题（中文，简短）",
        }),
        desc: z.string().max(28).optional().meta({
            description: "分节副说明（可选，一句话补充）",
        }),
    })).min(3).max(6).default([
        { heading: '宏观经济展望', desc: '全球流动性与利率周期研判' },
        { heading: '资产配置策略', desc: '股债商品多元化配置框架' },
        { heading: '权益投资机会', desc: '高景气赛道与价值重估标的' },
        { heading: '固收与现金管理', desc: '稳健票息与久期管理思路' },
        { heading: '风险控制体系', desc: '回撤约束与组合压力测试' },
    ]).meta({ description: "目录条目列表（编号自动生成 01/02…）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TableOfContents: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '目录'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : [
            { heading: '宏观经济展望', desc: '全球流动性与利率周期研判' },
            { heading: '资产配置策略', desc: '股债商品多元化配置框架' },
            { heading: '权益投资机会', desc: '高景气赛道与价值重估标的' },
            { heading: '固收与现金管理', desc: '稳健票息与久期管理思路' },
            { heading: '风险控制体系', desc: '回撤约束与组合压力测试' },
        ]

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：数据网格 + 增长曲线 + 棱形 + 细金线 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="finTocGoldLine" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="finTocCurve" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.55" />
                        </linearGradient>
                        <pattern id="finTocGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L0 0 0 40" fill="none" stroke="#334155" strokeOpacity="0.30" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {/* 数据网格（右侧区域） */}
                    <rect x="640" y="0" width="640" height="720" fill="url(#finTocGrid)" />
                    {/* 顶部光晕 */}
                    <rect width="1280" height="720" fill="url(#finTocGoldLine)" opacity="0.10" />
                    {/* 增长曲线 */}
                    <path d="M0 600 C 260 560, 420 470, 620 420 S 1020 250, 1280 150" fill="none" stroke="url(#finTocCurve)" strokeWidth="2.5" />
                    <path d="M0 660 C 300 630, 480 560, 700 500 S 1080 360, 1280 280" fill="none" stroke="#334155" strokeOpacity="0.45" strokeWidth="1.5" />
                    {/* 细金线 */}
                    <line x1="80" y1="118" x2="600" y2="118" stroke="#d4af37" strokeOpacity="0.45" strokeWidth="1.5" />
                    {/* 棱形母题 */}
                    {[0, 1, 2].map((i) => (
                        <rect
                            key={i}
                            x={1120 + i * 34}
                            y={70 + i * 18}
                            width="22"
                            height="22"
                            fill="none"
                            stroke="#d4af37"
                            strokeOpacity={0.40 - i * 0.10}
                            strokeWidth="1.5"
                            transform={`rotate(45 ${1131 + i * 34} ${81 + i * 18})`}
                        />
                    ))}
                </svg>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 items-end gap-4">
                        <span
                            className="text-sm font-medium uppercase"
                            style={{ color: "var(--secondary-color,#60a5fa)", letterSpacing: '0.18em' }}
                        >
                            Contents
                        </span>
                        <div className="mb-1 h-px flex-1" style={{ background: "var(--stroke,#334155)" }} />
                    </div>
                    <h1
                        className="mt-3 flex-shrink-0 text-6xl leading-[1.2] break-words"
                        style={{
                            color: "var(--background-text,#e2e8f0)",
                            fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                            fontWeight: 900,
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>
                    <div
                        className="mt-5 h-1 w-20 flex-shrink-0 rounded-full"
                        style={{ background: "var(--primary-color,#d4af37)" }}
                    />

                    {/* 议程列表 */}
                    <div className="mt-8 grid flex-1 grid-cols-2 content-center gap-x-12 gap-y-5">
                        {items.map((item, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            return (
                                <div
                                    key={i}
                                    className="flex items-start gap-5 rounded-xl border p-4"
                                    style={{
                                        background: "var(--card-color,#1e293b)",
                                        borderColor: "var(--stroke,#334155)",
                                    }}
                                >
                                    {/* 编号大字 */}
                                    <span
                                        className="flex-shrink-0 text-4xl leading-none"
                                        style={{
                                            color: "var(--primary-color,#d4af37)",
                                            fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                            fontWeight: 900,
                                        }}
                                    >
                                        {num}
                                    </span>
                                    {/* 金色竖线分隔 */}
                                    <span
                                        className="mt-1 h-10 w-px flex-shrink-0"
                                        style={{ background: "var(--primary-color,#d4af37)", opacity: 0.5 }}
                                    />
                                    {/* 分节标题 + 说明 */}
                                    <div className="flex min-w-0 flex-col">
                                        <span
                                            className="text-lg font-bold leading-[1.35] break-words"
                                            style={{
                                                color: "var(--background-text,#e2e8f0)",
                                                overflowWrap: 'break-word',
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            {item?.heading}
                                        </span>
                                        {item?.desc && (
                                            <span
                                                className="mt-1.5 text-sm leading-relaxed break-words"
                                                style={{
                                                    color: "var(--background-text,#94a3b8)",
                                                    overflowWrap: 'break-word',
                                                    wordBreak: 'break-word',
                                                }}
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
