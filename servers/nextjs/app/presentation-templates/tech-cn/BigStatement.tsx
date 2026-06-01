import React from 'react'
import * as z from "zod";

export const layoutId = 'tech-cn-big-statement'
export const layoutName = '金句首屏'
export const layoutDescription = '科技风金句首屏：深色底 + 霓虹蓝紫渐变高光，左对齐超大字重主张，引号/线条/几何网格装饰，可选补充说明与署名。纯 CSS/SVG，无需图片，离线可渲染。'

const schema = z.object({
    statement: z.string().min(2).max(40).default('真正的智能，是让复杂消失于无形').meta({
        description: "核心主张/金句（中文，简短有力，占据画面的一句话）",
    }),
    support: z.string().min(0).max(50).default('当算法理解了意图，技术便退居幕后，只留下流畅的体验本身。').meta({
        description: "可选的补充说明，一句话延展主张",
    }),
    attribution: z.string().min(0).max(20).default('—— 星澜科技 · 产品理念').meta({
        description: "可选的署名/出处，如人物、团队或品牌",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BigStatement: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const statement = slideData?.statement || '真正的智能，是让复杂消失于无形'
    const support = slideData?.support ?? '当算法理解了意图，技术便退居幕后，只留下流畅的体验本身。'
    const attribution = slideData?.attribution ?? '—— 星澜科技 · 产品理念'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0a0e1a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：几何网格 + 霓虹光晕 + 电路线 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            {/* 网格图案 */}
                            <pattern id="techStmtGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                                <path d="M48 0H0V48" fill="none" stroke="var(--stroke,#1f2937)" strokeWidth="1" strokeOpacity="0.55" />
                            </pattern>
                            {/* 左上霓虹蓝光晕 */}
                            <radialGradient id="techStmtGlowA" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.55" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </radialGradient>
                            {/* 右下霓虹紫光晕 */}
                            <radialGradient id="techStmtGlowB" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </radialGradient>
                            {/* 蓝紫渐变描边 */}
                            <linearGradient id="techStmtLine" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" />
                            </linearGradient>
                        </defs>

                        {/* 网格铺底 */}
                        <rect width="1280" height="720" fill="url(#techStmtGrid)" />
                        {/* 光晕 */}
                        <rect x="-260" y="-300" width="900" height="900" fill="url(#techStmtGlowA)" />
                        <rect x="760" y="320" width="900" height="900" fill="url(#techStmtGlowB)" />

                        {/* 电路线母题 */}
                        <g stroke="url(#techStmtLine)" strokeWidth="1.5" strokeOpacity="0.45" fill="none">
                            <path d="M0 600 L220 600 L260 560 L520 560" />
                            <path d="M1280 130 L1060 130 L1020 170 L820 170" />
                            <path d="M120 80 L120 200 L160 240 L160 360" />
                        </g>
                        <g fill="url(#techStmtLine)" fillOpacity="0.9">
                            <circle cx="520" cy="560" r="4" />
                            <circle cx="820" cy="170" r="4" />
                            <circle cx="160" cy="360" r="4" />
                        </g>
                    </svg>
                </div>

                {/* 右上角几何角标 */}
                <div className="absolute top-0 right-0 z-10" aria-hidden="true">
                    <div
                        className="h-16 w-16"
                        style={{
                            background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                            opacity: 0.85,
                            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                        }}
                    />
                </div>

                {/* 主内容卡片：半透明发光描边 */}
                <div className="relative z-10 flex h-full items-center px-16 py-14">
                    <div className="flex w-full max-w-[58rem] flex-col">
                        {/* 顶部标签 + 渐变线 */}
                        <div className="mb-8 flex items-center gap-4">
                            <span
                                className="inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide break-words"
                                style={{
                                    color: "var(--primary-text,#ffffff)",
                                    background: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.18))",
                                    border: "1px solid var(--stroke,#1f2937)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                FUTURE / 理念主张
                            </span>
                            <div
                                className="h-px flex-1"
                                style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), transparent)" }}
                            />
                        </div>

                        {/* 超大引号 + 金句主张 */}
                        <div className="flex items-start gap-5">
                            <span
                                className="select-none font-black leading-none"
                                style={{
                                    fontSize: '7rem',
                                    lineHeight: 1,
                                    background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    color: 'transparent',
                                    marginTop: '-0.5rem',
                                }}
                                aria-hidden="true"
                            >
                                “
                            </span>
                            <h1
                                className="text-6xl font-black leading-[1.25] break-words"
                                style={{
                                    color: "var(--background-text,#e5e7eb)",
                                    textShadow: '0 0 32px rgba(59,130,246,0.28)',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {statement}
                            </h1>
                        </div>

                        {/* 渐变分隔线 */}
                        <div
                            className="my-9 h-1 w-28 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))" }}
                        />

                        {/* 补充说明（可选） */}
                        {support ? (
                            <p
                                className="max-w-[44rem] text-xl leading-[1.7] break-words"
                                style={{
                                    color: "var(--background-text,#e5e7eb)",
                                    opacity: 0.82,
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {support}
                            </p>
                        ) : null}

                        {/* 署名（可选） */}
                        {attribution ? (
                            <div className="mt-10 flex items-center gap-3">
                                <span
                                    className="inline-block h-6 w-1 rounded-full"
                                    style={{ background: "linear-gradient(180deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))" }}
                                    aria-hidden="true"
                                />
                                <span
                                    className="text-base font-semibold tracking-wide break-words"
                                    style={{
                                        color: "var(--background-text,#e5e7eb)",
                                        opacity: 0.7,
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {attribution}
                                </span>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BigStatement
