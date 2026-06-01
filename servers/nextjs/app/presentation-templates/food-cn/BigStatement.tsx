import React from 'react'
import * as z from "zod";

export const layoutId = 'food-cn-big-statement'
export const layoutName = '金句首屏'
export const layoutDescription = '美食餐饮风金句首屏：暖米底 + 食欲橙红圆盘构图，超大字重主张占据画面，引号与焦糖金描边、餐具点缀装饰。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    statement: z.string().min(2).max(40).default('好味道，是用时间慢慢熬出来的').meta({
        description: "一句有力的核心主张（中文，简短醒目，占据画面）",
    }),
    support: z.string().min(2).max(50).default('从一锅高汤到一桌团圆，我们只做让人记住的味道。').meta({
        description: "可选的支撑句，一句话补充说明",
    }),
    attribution: z.string().min(2).max(20).default('暖灶食堂 · 主厨手记').meta({
        description: "可选的署名/出处，如品牌、主厨、栏目名",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BigStatement: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const statement = slideData?.statement || '好味道，是用时间慢慢熬出来的'
    const support = slideData?.support || '从一锅高汤到一桌团圆，我们只做让人记住的味道。'
    const attribution = slideData?.attribution || '暖灶食堂 · 主厨手记'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#fdf6ec)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：圆盘构图 + 暖色光晕 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="foodStmtGlow" cx="78%" cy="22%" r="60%">
                                <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="foodStmtGlow2" cx="14%" cy="86%" r="52%">
                                <stop offset="0%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#foodStmtGlow)" />
                        <rect width="1280" height="720" fill="url(#foodStmtGlow2)" />
                        {/* 右上焦糖金描边圆盘（同心圆盘构图） */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle
                                key={`r-${i}`}
                                cx="1090" cy="150" r={86 + i * 46}
                                fill="none"
                                stroke="var(--primary-color,#e8590c)"
                                strokeOpacity={0.16 - i * 0.025}
                                strokeWidth="2"
                            />
                        ))}
                        {/* 左下暖色块圆盘 */}
                        <circle cx="120" cy="640" r="180" fill="var(--secondary-color,#c92a2a)" fillOpacity="0.06" />
                        <circle cx="120" cy="640" r="118" fill="none" stroke="var(--secondary-color,#c92a2a)" strokeOpacity="0.14" strokeWidth="2" strokeDasharray="2 10" />
                    </svg>

                    {/* 右上实心圆盘 + 焦糖金双描边（餐盘母题） */}
                    <div
                        className="absolute"
                        style={{
                            top: '4%', right: '5%', width: '210px', height: '210px', borderRadius: '9999px',
                            background: "var(--card-color,#fffaf2)",
                            border: '2px solid var(--stroke,#f0e0cc)',
                            boxShadow: 'inset 0 0 0 10px rgba(232,89,12,0.10), 0 18px 40px -18px rgba(201,42,42,0.35)',
                        }}
                    >
                        {/* 盘心暖色点 */}
                        <div
                            className="absolute"
                            style={{
                                top: '50%', left: '50%', width: '78px', height: '78px', transform: 'translate(-50%,-50%)',
                                borderRadius: '9999px',
                                background: "var(--primary-color,#e8590c)", opacity: 0.14,
                            }}
                        />
                    </div>
                </div>

                {/* 顶部焦糖金细线 */}
                <div
                    className="absolute top-0 left-0 w-full"
                    style={{ height: '6px', background: "linear-gradient(90deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))" }}
                    aria-hidden="true"
                />

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-20 py-14">
                    {/* 装饰大引号 */}
                    <span
                        className="leading-none"
                        style={{
                            fontSize: '120px',
                            lineHeight: 1,
                            fontWeight: 900,
                            color: "var(--primary-color,#e8590c)",
                            opacity: 0.85,
                            marginBottom: '-18px',
                        }}
                        aria-hidden="true"
                    >
                        &ldquo;
                    </span>

                    {/* 核心主张：超大字重 */}
                    <h1
                        className="max-w-[60rem] text-7xl font-black leading-[1.25] break-words"
                        style={{
                            color: "var(--background-text,#3b2412)",
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                        }}
                    >
                        {statement}
                    </h1>

                    {/* 焦糖金分隔线 + 收尾引号 */}
                    <div className="mt-8 flex items-center gap-4">
                        <div
                            className="h-1.5 w-28 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))" }}
                        />
                        <span
                            className="leading-none"
                            style={{ fontSize: '40px', fontWeight: 900, color: "var(--secondary-color,#c92a2a)", opacity: 0.55 }}
                            aria-hidden="true"
                        >
                            &rdquo;
                        </span>
                    </div>

                    {/* 支撑句 */}
                    {support && (
                        <p
                            className="mt-7 max-w-[46rem] text-2xl leading-relaxed break-words"
                            style={{
                                color: "var(--background-text,#3b2412)",
                                opacity: 0.82,
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {support}
                        </p>
                    )}

                    {/* 署名 + 餐具点缀 */}
                    {attribution && (
                        <div className="mt-10 flex items-center gap-3">
                            {/* 圆盘餐具点缀图标 */}
                            <span
                                className="flex flex-shrink-0 items-center justify-center rounded-full"
                                style={{
                                    width: '40px', height: '40px',
                                    background: "var(--card-color,#fffaf2)",
                                    border: '2px solid var(--stroke,#f0e0cc)',
                                    boxShadow: 'inset 0 0 0 3px rgba(232,89,12,0.10)',
                                }}
                                aria-hidden="true"
                            >
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                                    {/* 叉子 */}
                                    <path d="M8.5 3v6M6.5 3v6M10.5 3v6M8.5 9c0 2-2 2-2 4v8M8.5 9c0 2 2 2 2 4v8" stroke="var(--primary-color,#e8590c)" strokeWidth="1.6" strokeLinecap="round" />
                                    {/* 刀 */}
                                    <path d="M16.5 3c-1.5 1-2 4-2 7 0 2 1 3 2 3v8M16.5 13V3" stroke="var(--secondary-color,#c92a2a)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <span
                                className="text-base font-semibold tracking-wide break-words"
                                style={{
                                    color: "var(--primary-color,#e8590c)",
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
        </>
    )
}

export default BigStatement
