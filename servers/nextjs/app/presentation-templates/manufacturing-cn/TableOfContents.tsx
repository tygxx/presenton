import React from 'react'
import * as z from "zod";

export const layoutId = 'manufacturing-cn-toc'
export const layoutName = '目录'
export const layoutDescription = '智能制造风目录页：工业深灰底 + 精密网格 + 齿轮纹样，左侧大标题，右侧编号分节列表（自动生成 01/02…）。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('目录').meta({
        description: "目录页主标题（中文，简短，默认『目录』）",
    }),
    items: z.array(z.object({
        heading: z.string().min(2).max(16).meta({
            description: "分节标题（中文，简短有力）",
        }),
        desc: z.string().max(28).optional().meta({
            description: "分节简短说明（可选，一句话）",
        }),
    })).min(3).max(6).default([
        { heading: '智能产线总览', desc: '柔性制造与产能布局' },
        { heading: '工艺数字孪生', desc: '虚实联动的过程仿真' },
        { heading: '设备健康管理', desc: '预测性维护与停机预警' },
        { heading: '质量在线检测', desc: '机器视觉与精度管控' },
        { heading: '能效与碳管理', desc: '单位产值能耗优化' },
    ]).meta({
        description: "目录分节列表（3-6 项，编号自动生成）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TableOfContents: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '目录'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : [
            { heading: '智能产线总览', desc: '柔性制造与产能布局' },
            { heading: '工艺数字孪生', desc: '虚实联动的过程仿真' },
            { heading: '设备健康管理', desc: '预测性维护与停机预警' },
            { heading: '质量在线检测', desc: '机器视觉与精度管控' },
            { heading: '能效与碳管理', desc: '单位产值能耗优化' },
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
                {/* 背景：精密网格 + 齿轮纹样 + 金属质感线条 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="mfgTocGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0H0V40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.55" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="mfgTocSheen" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.16" />
                            <stop offset="55%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="mfgTocGearGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 精密网格底纹 */}
                    <rect width="1280" height="720" fill="url(#mfgTocGrid)" />
                    {/* 左上蓝色金属光泽 */}
                    <rect width="1280" height="720" fill="url(#mfgTocSheen)" />

                    {/* 右下角齿轮母题（精密网格上叠加） */}
                    <circle cx="1120" cy="600" r="220" fill="url(#mfgTocGearGlow)" />
                    {(() => {
                        const teeth = 16
                        const cx = 1120, cy = 600, rOuter = 150, rTooth = 172, rInner = 92
                        const pts: string[] = []
                        for (let i = 0; i < teeth; i++) {
                            const a0 = (i / teeth) * Math.PI * 2
                            const a1 = ((i + 0.32) / teeth) * Math.PI * 2
                            const a2 = ((i + 0.5) / teeth) * Math.PI * 2
                            const a3 = ((i + 0.82) / teeth) * Math.PI * 2
                            pts.push(`${cx + rOuter * Math.cos(a0)},${cy + rOuter * Math.sin(a0)}`)
                            pts.push(`${cx + rTooth * Math.cos(a1)},${cy + rTooth * Math.sin(a1)}`)
                            pts.push(`${cx + rTooth * Math.cos(a2)},${cy + rTooth * Math.sin(a2)}`)
                            pts.push(`${cx + rOuter * Math.cos(a3)},${cy + rOuter * Math.sin(a3)}`)
                        }
                        return (
                            <>
                                <polygon
                                    points={pts.join(' ')}
                                    fill="none"
                                    stroke="var(--primary-color,#3b82f6)"
                                    strokeOpacity="0.30"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                />
                                <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.22" strokeWidth="2" />
                                <circle cx={cx} cy={cy} r={rInner - 26} fill="none" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.30" strokeWidth="2" strokeDasharray="6 8" />
                            </>
                        )
                    })()}

                    {/* 产线/硬朗金属线条 */}
                    <line x1="0" y1="120" x2="1280" y2="120" stroke="var(--stroke,#374151)" strokeOpacity="0.8" strokeWidth="1.5" />
                    <line x1="80" y1="0" x2="80" y2="720" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.22" strokeWidth="2" />
                </svg>

                {/* 左上角分节角标（橙色强调，工业标识感） */}
                <div className="absolute left-0 top-0 z-10 flex items-center gap-3 pl-16 pt-9" aria-hidden="true">
                    <span className="block h-7 w-1.5 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                    <span
                        className="text-xs font-bold tracking-[0.3em] break-words"
                        style={{ color: "var(--primary-color,#3b82f6)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        SMART MANUFACTURING
                    </span>
                </div>

                {/* 主体内容 */}
                <div className="relative z-10 flex h-full items-stretch gap-12 px-16 pb-12 pt-28">
                    {/* 左侧：大标题 */}
                    <div className="flex w-[30%] flex-shrink-0 flex-col justify-center">
                        <div className="mb-6 h-2 w-20 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <h1
                            className="text-6xl font-black leading-[1.2] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <p
                            className="mt-5 text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.65, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            产线 · 工艺 · 数据全景
                        </p>
                        <span
                            className="mt-8 text-sm font-semibold tracking-widest break-words"
                            style={{ color: "var(--primary-color,#3b82f6)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            CONTENTS / {String(items.length).padStart(2, '0')}
                        </span>
                    </div>

                    {/* 右侧：编号分节列表 */}
                    <div className="flex flex-1 flex-col justify-center gap-3">
                        {items.map((item, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-6 rounded-xl border px-6 py-3"
                                    style={{
                                        background: "var(--card-color,#111827)",
                                        borderColor: "var(--stroke,#374151)",
                                    }}
                                >
                                    {/* 编号大字 */}
                                    <span
                                        className="flex-shrink-0 text-4xl font-black leading-none tabular-nums"
                                        style={{ color: "var(--primary-color,#3b82f6)" }}
                                    >
                                        {num}
                                    </span>
                                    {/* 分隔金属竖线 */}
                                    <span
                                        className="block h-9 w-px flex-shrink-0"
                                        style={{ background: "var(--stroke,#374151)" }}
                                        aria-hidden="true"
                                    />
                                    {/* 分节标题 + 说明 */}
                                    <div className="flex min-w-0 flex-col leading-relaxed">
                                        <span
                                            className="text-xl font-bold leading-[1.35] break-words"
                                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.heading || ''}
                                        </span>
                                        {item?.desc && (
                                            <span
                                                className="mt-0.5 text-sm leading-relaxed break-words"
                                                style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {item.desc}
                                            </span>
                                        )}
                                    </div>
                                    {/* 橙色强调点（工业指示灯感） */}
                                    <span
                                        className="ml-auto block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                                        style={{
                                            background: "var(--secondary-color,#f97316)",
                                            boxShadow: '0 0 0 5px rgba(249,115,22,0.14)',
                                        }}
                                        aria-hidden="true"
                                    />
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
