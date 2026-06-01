import React from 'react'
import * as z from "zod";

export const layoutId = 'manufacturing-cn-big-statement'
export const layoutName = '金句首屏'
export const layoutDescription = '智能制造金句首屏：工业深灰底 + 精密网格 + 齿轮/产线线条装饰，一句超大字重主张占据画面，配可选佐证与署名。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    statement: z.string().min(2).max(40).default('以精密制造，定义中国智造的下一个十年').meta({
        description: "占据画面的核心主张（中文，简短有力，建议不超过 24 字）",
    }),
    support: z.string().max(50).default('从一条产线到一座智慧工厂，让每一道工序都可量化、可追溯、可优化。').meta({
        description: "可选佐证句，一句话补充说明主张（可留空）",
    }),
    attribution: z.string().max(20).default('—— 智造研究院').meta({
        description: "可选署名/出处，如人名或机构（可留空）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BigStatement: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const statement = slideData?.statement || '以精密制造，定义中国智造的下一个十年'
    const support = slideData?.support ?? '从一条产线到一座智慧工厂，让每一道工序都可量化、可追溯、可优化。'
    const attribution = slideData?.attribution ?? '—— 智造研究院'

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
                {/* 背景装饰层：精密网格 + 工业光晕 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            {/* 精密网格图案 */}
                            <pattern id="msGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0 H0 V40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.55" strokeWidth="1" />
                            </pattern>
                            {/* 主光晕 */}
                            <radialGradient id="msGlowPrimary" cx="18%" cy="22%" r="60%">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.30" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </radialGradient>
                            {/* 次光晕 */}
                            <radialGradient id="msGlowAccent" cx="88%" cy="86%" r="55%">
                                <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.26" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                            </radialGradient>
                            {/* 顶部金属高光线渐变 */}
                            <linearGradient id="msMetal" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                                <stop offset="45%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.9" />
                                <stop offset="55%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* 精密网格铺底 */}
                        <rect width="1280" height="720" fill="url(#msGrid)" />
                        {/* 双色工业光晕 */}
                        <rect width="1280" height="720" fill="url(#msGlowPrimary)" />
                        <rect width="1280" height="720" fill="url(#msGlowAccent)" />

                        {/* 顶部金属高光线 */}
                        <rect x="0" y="0" width="1280" height="3" fill="url(#msMetal)" />

                        {/* 左上齿轮母题（精密齿） */}
                        <g transform="translate(150 130)" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.35" fill="none">
                            <circle r="62" strokeWidth="2" />
                            <circle r="30" strokeWidth="2" />
                            <circle r="8" strokeWidth="2" />
                            {Array.from({ length: 12 }).map((_, i) => {
                                const a = (i * Math.PI) / 6
                                const x1 = Math.cos(a) * 62
                                const y1 = Math.sin(a) * 62
                                const x2 = Math.cos(a) * 78
                                const y2 = Math.sin(a) * 78
                                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="6" />
                            })}
                        </g>

                        {/* 右下副齿轮母题 */}
                        <g transform="translate(1130 600)" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.32" fill="none">
                            <circle r="44" strokeWidth="2" />
                            <circle r="20" strokeWidth="2" />
                            {Array.from({ length: 10 }).map((_, i) => {
                                const a = (i * Math.PI) / 5
                                const x1 = Math.cos(a) * 44
                                const y1 = Math.sin(a) * 44
                                const x2 = Math.cos(a) * 56
                                const y2 = Math.sin(a) * 56
                                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="5" />
                            })}
                        </g>

                        {/* 产线母题：底部传送轨道 + 节点 */}
                        <g stroke="var(--stroke,#374151)" strokeOpacity="0.9">
                            <line x1="80" y1="640" x2="1200" y2="640" strokeWidth="2" />
                        </g>
                        {[180, 360, 540, 720, 900, 1080].map((cx, i) => (
                            <circle
                                key={cx}
                                cx={cx}
                                cy="640"
                                r="5"
                                fill={i % 2 === 0 ? "var(--primary-color,#3b82f6)" : "var(--secondary-color,#f97316)"}
                                fillOpacity="0.85"
                            />
                        ))}

                        {/* 右上精密坐标刻度（金属质感细线） */}
                        <g stroke="var(--stroke,#374151)" strokeOpacity="0.8">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <line key={i} x1={1040 + i * 24} y1="70" x2={1040 + i * 24} y2={i % 2 === 0 ? 100 : 86} strokeWidth="1.5" />
                            ))}
                        </g>
                    </svg>
                </div>

                {/* 左上角角标：场景标识 */}
                <div className="absolute top-9 left-14 z-10 flex items-center gap-3">
                    <span className="block h-7 w-1.5 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                    <span
                        className="text-sm font-bold tracking-wide break-words"
                        style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        智能制造 · 智造主张
                    </span>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full w-full flex-col justify-center px-20 py-16">
                    {/* 超大引号装饰 */}
                    <div
                        className="leading-none font-black select-none"
                        style={{
                            fontSize: '120px',
                            color: "var(--primary-color,#3b82f6)",
                            opacity: 0.55,
                            height: '64px',
                        }}
                        aria-hidden="true"
                    >
                        “
                    </div>

                    {/* 金句主张 */}
                    <h1
                        className="max-w-[60rem] text-6xl font-black leading-[1.25] break-words"
                        style={{
                            color: "var(--background-text,#e5e7eb)",
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                        }}
                    >
                        {statement}
                    </h1>

                    {/* 双色硬朗分割线 */}
                    <div className="mt-9 flex items-center gap-2" aria-hidden="true">
                        <span className="block h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <span className="block h-1.5 w-10 rounded-full" style={{ background: "var(--primary-color,#3b82f6)" }} />
                        <span className="block h-1.5 w-4 rounded-full" style={{ background: "var(--primary-color,#3b82f6)", opacity: 0.5 }} />
                    </div>

                    {/* 可选佐证 */}
                    {support && support.trim().length > 0 && (
                        <p
                            className="mt-7 max-w-[44rem] text-xl leading-[1.7] break-words"
                            style={{
                                color: "var(--background-text,#e5e7eb)",
                                opacity: 0.82,
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {support}
                        </p>
                    )}

                    {/* 可选署名 */}
                    {attribution && attribution.trim().length > 0 && (
                        <p
                            className="mt-6 text-base font-semibold leading-relaxed break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {attribution}
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default BigStatement
