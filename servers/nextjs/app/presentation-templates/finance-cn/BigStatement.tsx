import React from 'react'
import * as z from "zod";

export const layoutId = 'finance-cn-big-statement'
export const layoutName = '金句首屏'
export const layoutDescription = '金融投资风金句首屏：深藏青底 + 香槟金线条与棱形装饰、衬线超大字主张占据画面，配可选佐证与署名。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    statement: z.string().min(2).max(40).default('真正的复利，来自时间与纪律的长期主义。').meta({
        description: "占据画面的一句核心主张（中文，简短有力，超大字呈现）",
    }),
    support: z.string().min(2).max(50).default('穿越周期的耐心，远比一时的精准择时更稀缺、更有价值。').meta({
        description: "主张下方的可选佐证或补充说明（可留空）",
    }),
    attribution: z.string().min(2).max(20).default('明远资本 · 投资研究部').meta({
        description: "可选署名/出处，如机构名或人名（可留空）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BigStatement: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const statement = slideData?.statement || '真正的复利，来自时间与纪律的长期主义。'
    const support = slideData?.support || '穿越周期的耐心，远比一时的精准择时更稀缺、更有价值。'
    const attribution = slideData?.attribution || '明远资本 · 投资研究部'

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
                {/* 背景装饰层：数据网格 + 增长曲线 + 细金线 + 棱形 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="finStmtVignette" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.65" />
                            <stop offset="55%" stopColor="#0f172a" stopOpacity="0" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
                        </linearGradient>
                        <linearGradient id="finStmtCurve" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.0" />
                            <stop offset="60%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.55" />
                        </linearGradient>
                        <linearGradient id="finStmtArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </linearGradient>
                        <pattern id="finStmtGrid" width="64" height="64" patternUnits="userSpaceOnUse">
                            <path d="M64 0H0V64" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.55" strokeWidth="1" />
                        </pattern>
                    </defs>

                    {/* 数据网格母题 */}
                    <rect width="1280" height="720" fill="url(#finStmtGrid)" />
                    <rect width="1280" height="720" fill="url(#finStmtVignette)" />

                    {/* 增长曲线 + 面积 */}
                    <path
                        d="M0 600 C 220 560 360 520 520 470 C 700 412 880 360 1060 250 C 1140 200 1210 150 1280 110"
                        fill="none"
                        stroke="url(#finStmtCurve)"
                        strokeWidth="2.5"
                    />
                    <path
                        d="M0 600 C 220 560 360 520 520 470 C 700 412 880 360 1060 250 C 1140 200 1210 150 1280 110 L 1280 720 L 0 720 Z"
                        fill="url(#finStmtArea)"
                    />

                    {/* 细金线 */}
                    <line x1="0" y1="150" x2="1280" y2="60" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.18" strokeWidth="1" />
                    <line x1="0" y1="660" x2="1280" y2="540" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.12" strokeWidth="1" />

                    {/* 棱形母题群 */}
                    {[
                        { x: 1120, y: 150, s: 64, o: 0.5 },
                        { x: 1190, y: 250, s: 30, o: 0.7 },
                        { x: 1050, y: 95, s: 22, o: 0.45 },
                        { x: 150, y: 540, s: 40, o: 0.4 },
                        { x: 90, y: 620, s: 20, o: 0.6 },
                    ].map((d, i) => (
                        <rect
                            key={i}
                            x={d.x - d.s / 2}
                            y={d.y - d.s / 2}
                            width={d.s}
                            height={d.s}
                            fill="none"
                            stroke="var(--primary-color,#d4af37)"
                            strokeOpacity={d.o}
                            strokeWidth="1.5"
                            transform={`rotate(45 ${d.x} ${d.y})`}
                        />
                    ))}
                    {/* 增长曲线节点 */}
                    <circle cx="1060" cy="250" r="5" fill="var(--primary-color,#d4af37)" />
                    <circle cx="1060" cy="250" r="11" fill="none" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.4" strokeWidth="1.5" />
                </svg>

                {/* 顶部细金线装饰条 */}
                <div
                    className="absolute left-0 top-0 h-1 w-full"
                    style={{
                        background:
                            "linear-gradient(90deg, var(--primary-color,#d4af37) 0%, rgba(212,175,55,0.35) 40%, rgba(212,175,55,0) 100%)",
                    }}
                />

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-20 py-16">
                    {/* 装饰性巨大引号（衬线） */}
                    <div className="flex items-start gap-6">
                        <span
                            aria-hidden="true"
                            className="select-none leading-none"
                            style={{
                                fontFamily: "var(--heading-font-family,'Noto Serif SC','Noto Sans SC')",
                                fontSize: '7rem',
                                lineHeight: 1,
                                fontWeight: 900,
                                color: "var(--primary-color,#d4af37)",
                                opacity: 0.85,
                                marginTop: '-1.5rem',
                            }}
                        >
                            “
                        </span>

                        <div className="flex flex-col">
                            {/* 主张：超大字重衬线标题 */}
                            <h1
                                className="break-words font-black leading-[1.3]"
                                style={{
                                    fontFamily: "var(--heading-font-family,'Noto Serif SC','Noto Sans SC')",
                                    fontSize: '4.25rem',
                                    fontWeight: 900,
                                    color: "var(--primary-text,#ffffff)",
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                    textShadow: '0 2px 24px rgba(0,0,0,0.35)',
                                }}
                            >
                                {statement}
                            </h1>

                            {/* 金线分隔 + 棱形端点 */}
                            <div className="mt-9 flex items-center gap-3">
                                <span
                                    className="block h-[3px] w-24 rounded-full"
                                    style={{ background: "var(--primary-color,#d4af37)" }}
                                />
                                <span
                                    className="block h-3 w-3 rotate-45"
                                    style={{ background: "var(--primary-color,#d4af37)" }}
                                />
                                <span
                                    className="block h-[1px] flex-1 max-w-[18rem]"
                                    style={{ background: "linear-gradient(90deg, var(--stroke,#334155), transparent)" }}
                                />
                            </div>

                            {/* 佐证（可选） */}
                            {support && (
                                <p
                                    className="mt-6 max-w-[46rem] break-words text-2xl leading-[1.7]"
                                    style={{
                                        color: "var(--background-text,#e2e8f0)",
                                        opacity: 0.9,
                                        overflowWrap: 'break-word',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {support}
                                </p>
                            )}

                            {/* 署名（可选） */}
                            {attribution && (
                                <div className="mt-10 flex items-center gap-3">
                                    <span
                                        className="block h-5 w-[3px] rounded-full"
                                        style={{ background: "var(--secondary-color,#60a5fa)" }}
                                    />
                                    <span
                                        className="break-words text-base font-medium tracking-wide"
                                        style={{
                                            color: "var(--primary-color,#d4af37)",
                                            overflowWrap: 'break-word',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {attribution}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 右下角棱形角标 */}
                <div className="absolute bottom-8 right-10 z-10 flex items-center gap-2" aria-hidden="true">
                    <span className="block h-2 w-2 rotate-45" style={{ background: "var(--primary-color,#d4af37)", opacity: 0.9 }} />
                    <span className="block h-2 w-2 rotate-45" style={{ border: "1px solid var(--primary-color,#d4af37)", opacity: 0.6 }} />
                    <span className="block h-2 w-2 rotate-45" style={{ border: "1px solid var(--stroke,#334155)" }} />
                </div>
            </div>
        </>
    )
}

export default BigStatement
