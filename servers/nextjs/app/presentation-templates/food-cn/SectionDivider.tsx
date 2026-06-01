import React from 'react'
import * as z from "zod";

export const layoutId = 'food-cn-section-divider'
export const layoutName = '章节分隔'
export const layoutDescription = '美食餐饮风章节过渡页：超大节号作为装饰主体，配焦糖金描边圆盘、暖色块与餐具点缀。大节号 + 节标题 + 可选副标题。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    sectionNumber: z.string().min(1).max(4).default('02').meta({
        description: "章节序号，建议两位数字，如『02』『03』",
    }),
    title: z.string().min(2).max(18).default('招牌风味').meta({
        description: "章节标题（中文，简短有力）",
    }),
    subtitle: z.string().min(2).max(36).default('从一锅高汤到一碟小菜，慢工细作的匠心之味').meta({
        description: "副标题，一句话补充本章节内容（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const SectionDivider: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const sectionNumber = slideData?.sectionNumber || '02'
    const title = slideData?.title || '招牌风味'
    const subtitle = slideData?.subtitle || '从一锅高汤到一碟小菜，慢工细作的匠心之味'

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
                {/* 背景装饰层：暖色光晕 + 圆盘构图 + 焦糖金圆环 */}
                <div className="absolute inset-0" aria-hidden="true">
                    {/* 顶部暖色光晕 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-22%', left: '-12%', width: '46%', height: '64%', borderRadius: '9999px',
                            background: "radial-gradient(circle, var(--primary-color,#e8590c) 0%, transparent 70%)",
                            opacity: 0.12,
                        }}
                    />
                    {/* 右下暖红光晕 */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '-26%', right: '-10%', width: '50%', height: '70%', borderRadius: '9999px',
                            background: "radial-gradient(circle, var(--secondary-color,#c92a2a) 0%, transparent 70%)",
                            opacity: 0.10,
                        }}
                    />
                    {/* 右侧大圆盘 + 焦糖金同心圆描边 */}
                    <svg viewBox="0 0 520 720" className="absolute top-0 right-0 h-full" preserveAspectRatio="xMidYMid meet" style={{ width: '52%' }}>
                        <defs>
                            <linearGradient id="foodPlateGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0.04" />
                            </linearGradient>
                        </defs>
                        {/* 圆盘暖色块 */}
                        <circle cx="380" cy="360" r="250" fill="url(#foodPlateGlow)" />
                        {/* 焦糖金同心圆描边（圆盘内圈/外圈） */}
                        {[150, 200, 250].map((r, i) => (
                            <circle
                                key={i}
                                cx="380" cy="360" r={r}
                                fill="none"
                                stroke="var(--primary-color,#e8590c)"
                                strokeOpacity={0.16 - i * 0.03}
                                strokeWidth="2"
                            />
                        ))}
                        {/* 圆盘内圈虚线（餐盘描边质感） */}
                        <circle
                            cx="380" cy="360" r="178"
                            fill="none"
                            stroke="var(--secondary-color,#c92a2a)"
                            strokeOpacity="0.18"
                            strokeWidth="2"
                            strokeDasharray="3 9"
                        />
                    </svg>
                </div>

                {/* 顶部焦糖金细条 */}
                <div
                    className="absolute top-0 left-0 w-full"
                    style={{ height: '6px', background: "linear-gradient(90deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))" }}
                    aria-hidden="true"
                />

                {/* 主内容：左侧节号 + 标题，右侧餐具/圆盘点缀 */}
                <div className="relative z-10 flex h-full items-center gap-8 pl-16 pr-12">
                    {/* 左侧文本区 */}
                    <div className="flex w-[58%] flex-shrink-0 flex-col justify-center">
                        {/* 章节标签 */}
                        <div className="mb-7 flex items-center gap-3">
                            <span
                                className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold break-words"
                                style={{
                                    color: "var(--primary-text,#ffffff)",
                                    background: "linear-gradient(90deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                章节
                            </span>
                            <span
                                className="h-px flex-1 max-w-[120px]"
                                style={{ background: "var(--stroke,#f0e0cc)" }}
                                aria-hidden="true"
                            />
                        </div>

                        {/* 超大节号 + 节标题 */}
                        <div className="flex items-end gap-6">
                            {/* 装饰主体：超大节号 */}
                            <span
                                className="font-black leading-[1.0] break-words"
                                style={{
                                    fontSize: '11rem',
                                    background: "linear-gradient(135deg, var(--primary-color,#e8590c) 0%, var(--secondary-color,#c92a2a) 100%)",
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    color: "var(--primary-color,#e8590c)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {sectionNumber}
                            </span>
                            {/* 焦糖金竖条分隔 */}
                            <span
                                className="mb-6 w-1.5 self-stretch rounded-full"
                                style={{ background: "linear-gradient(180deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))" }}
                                aria-hidden="true"
                            />
                            {/* 节标题 */}
                            <h1
                                className="mb-8 text-6xl font-black leading-[1.2] break-words"
                                style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>

                        {/* 焦糖金短线 */}
                        <div
                            className="mt-2 mb-6 h-1.5 w-24 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))" }}
                            aria-hidden="true"
                        />

                        {/* 副标题 */}
                        {subtitle && (
                            <p
                                className="max-w-[34rem] text-xl leading-relaxed break-words"
                                style={{ color: "var(--background-text,#3b2412)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* 右侧：圆盘 + 餐具点缀（纯 CSS/SVG 装饰） */}
                    <div className="relative flex flex-1 items-center justify-center">
                        <div
                            className="relative flex items-center justify-center rounded-full"
                            style={{
                                width: '300px', height: '300px',
                                background: "var(--card-color,#fffaf2)",
                                border: '2px solid var(--stroke,#f0e0cc)',
                                boxShadow: '0 18px 48px rgba(201,42,42,0.12)',
                            }}
                        >
                            {/* 内圈焦糖金描边圆盘 */}
                            <div
                                className="absolute flex items-center justify-center rounded-full"
                                style={{
                                    width: '224px', height: '224px',
                                    border: '2px solid var(--primary-color,#e8590c)',
                                    borderRadius: '9999px',
                                    background: "radial-gradient(circle at 38% 32%, rgba(232,89,12,0.10), transparent 62%)",
                                }}
                            >
                                {/* 餐具点缀：叉子 + 刀，纯 SVG */}
                                <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
                                    <g
                                        fill="none"
                                        stroke="var(--secondary-color,#c92a2a)"
                                        strokeWidth="3.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeOpacity="0.9"
                                    >
                                        {/* 叉子 */}
                                        <line x1="42" y1="22" x2="42" y2="40" />
                                        <line x1="49" y1="22" x2="49" y2="40" />
                                        <line x1="56" y1="22" x2="56" y2="40" />
                                        <path d="M42 40 Q49 50 49 56 L49 98" />
                                        {/* 刀 */}
                                        <path d="M78 22 Q90 30 88 52 L82 52 L82 98" />
                                    </g>
                                </svg>
                            </div>
                            {/* 圆盘外侧暖色强调点 */}
                            <div
                                className="absolute"
                                style={{
                                    top: '8%', right: '6%', width: '20px', height: '20px', borderRadius: '9999px',
                                    background: "var(--secondary-color,#c92a2a)",
                                    boxShadow: '0 0 0 8px rgba(201,42,42,0.14)',
                                }}
                                aria-hidden="true"
                            />
                            <div
                                className="absolute"
                                style={{
                                    bottom: '12%', left: '2%', width: '14px', height: '14px', borderRadius: '9999px',
                                    background: "var(--primary-color,#e8590c)",
                                    boxShadow: '0 0 0 6px rgba(232,89,12,0.16)',
                                }}
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionDivider
