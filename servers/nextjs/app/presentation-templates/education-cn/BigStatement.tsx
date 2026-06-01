import React from 'react'
import * as z from "zod";

export const layoutId = 'education-cn-big-statement'
export const layoutName = '金句首屏'
export const layoutDescription = '教育培训风金句首屏：明亮米白背景 + 圆角卡片，超大字重主张占据画面，配引号/线条装饰与书本、灯泡、成长曲线、圆点母题。纯 CSS/SVG，无需图片，离线可渲染。'

const schema = z.object({
    statement: z.string().min(2).max(40).default('教育的本质，是点燃一团火，而非填满一桶水').meta({
        description: "核心主张/金句（中文，简短有力，占据画面的大字）",
    }),
    support: z.string().min(0).max(50).default('让每一次学习都成为一次自我发现的旅程，唤醒内在的好奇与热爱。').meta({
        description: "支撑说明（可选，一句话补充主张，留空则不显示）",
    }),
    attribution: z.string().min(0).max(20).default('启明学院 · 教学理念').meta({
        description: "出处/署名（可选，如作者、机构、栏目名，留空则不显示）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BigStatement: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const statement = slideData?.statement || '教育的本质，是点燃一团火，而非填满一桶水'
    const support = slideData?.support ?? '让每一次学习都成为一次自我发现的旅程，唤醒内在的好奇与热爱。'
    const attribution = slideData?.attribution ?? '启明学院 · 教学理念'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#fffdf7)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：圆点纹样 + 成长曲线 + 光晕 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="eduBigGlowA" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="eduBigGlowB" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="eduBigCurve" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.0" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.35" />
                        </linearGradient>
                        <pattern id="eduBigDots" x="0" y="0" width="34" height="34" patternUnits="userSpaceOnUse">
                            <circle cx="3" cy="3" r="2.4" fill="#f97316" fillOpacity="0.16" />
                        </pattern>
                    </defs>

                    {/* 左下角光晕（橙） */}
                    <circle cx="120" cy="600" r="320" fill="url(#eduBigGlowA)" />
                    {/* 右上角光晕（蓝） */}
                    <circle cx="1180" cy="120" r="300" fill="url(#eduBigGlowB)" />

                    {/* 左上圆点纹样 */}
                    <rect x="56" y="60" width="200" height="120" fill="url(#eduBigDots)" />
                    {/* 右下圆点纹样 */}
                    <rect x="1020" y="540" width="200" height="120" fill="url(#eduBigDots)" />

                    {/* 成长曲线 + 上扬箭头节点 */}
                    <path
                        d="M 760 600 C 880 590, 980 540, 1060 470 S 1190 320, 1230 250"
                        fill="none"
                        stroke="url(#eduBigCurve)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <circle cx="1060" cy="470" r="6" fill="#2563eb" fillOpacity="0.45" />
                    <circle cx="1230" cy="250" r="8" fill="#f97316" fillOpacity="0.75" />
                </svg>

                {/* 右上角灯泡角标（装饰） */}
                <div
                    className="absolute right-12 top-10 flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                        background: "var(--card-color,#ffffff)",
                        boxShadow: '0 10px 28px rgba(37,99,235,0.12)',
                        border: '1px solid var(--stroke,#f1e9d8)',
                    }}
                >
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
                        <path
                            d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.5.4.8.9.9 1.6l.1.9h5l.1-.9c.1-.7.4-1.2.9-1.6A6 6 0 0 0 12 3Z"
                            stroke="var(--secondary-color,#f97316)"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* 主内容卡片 */}
                <div className="relative z-10 flex h-full items-center justify-center px-16 py-12">
                    <div
                        className="flex w-full max-w-[1000px] flex-col rounded-3xl px-14 py-12"
                        style={{
                            background: "var(--card-color,#ffffff)",
                            border: '1px solid var(--stroke,#f1e9d8)',
                            boxShadow: '0 24px 60px rgba(31,41,55,0.08)',
                        }}
                    >
                        {/* 顶部装饰：超大引号 + 书本图标 + 短线 */}
                        <div className="mb-6 flex items-center gap-4">
                            <span
                                className="leading-none"
                                style={{
                                    fontSize: '72px',
                                    fontWeight: 900,
                                    color: "var(--secondary-color,#f97316)",
                                    lineHeight: 1,
                                }}
                                aria-hidden="true"
                            >
                                &ldquo;
                            </span>
                            <div
                                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                                style={{ background: "rgba(37,99,235,0.10)" }}
                            >
                                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                                    <path
                                        d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5V5.5ZM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5V5.5Z"
                                        stroke="var(--primary-color,#2563eb)"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="h-1 flex-1 rounded-full" style={{ background: "var(--stroke,#f1e9d8)" }} />
                        </div>

                        {/* 主张大字 */}
                        <h1
                            className="text-6xl font-black leading-[1.3] break-words"
                            style={{
                                color: "var(--background-text,#1f2937)",
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {statement}
                        </h1>

                        {/* 强调短线 */}
                        <div
                            className="mt-8 h-1.5 w-28 rounded-full"
                            style={{
                                background: "linear-gradient(90deg, var(--secondary-color,#f97316), var(--primary-color,#2563eb))",
                            }}
                        />

                        {/* 支撑说明（可选） */}
                        {support && support.trim().length > 0 && (
                            <p
                                className="mt-6 max-w-[44rem] text-xl leading-[1.7] break-words"
                                style={{
                                    color: "var(--background-text,#1f2937)",
                                    opacity: 0.78,
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {support}
                            </p>
                        )}

                        {/* 出处/署名（可选） */}
                        {attribution && attribution.trim().length > 0 && (
                            <div className="mt-8 flex items-center gap-3">
                                <span
                                    className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                                    style={{ background: "var(--secondary-color,#f97316)" }}
                                    aria-hidden="true"
                                />
                                <span
                                    className="text-base font-semibold leading-relaxed break-words"
                                    style={{
                                        color: "var(--primary-color,#2563eb)",
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
        </>
    )
}

export default BigStatement
