import React from 'react'
import * as z from "zod";

export const layoutId = 'travel-cn-comparison'
export const layoutName = '左右对比'
export const layoutDescription = '旅游文旅风左右对比：左右两栏对称卡片 + 中间指南针 VS 分隔，海蓝与暖阳橙呼应。适合两方对比 / 行前行后 / 优劣权衡。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('自由行 还是 跟团游').meta({
        description: "对比页主标题（中文，简短有力）",
    }),
    leftTitle: z.string().min(2).max(12).default('自由行').meta({
        description: "左栏标题（中文，简短）",
    }),
    rightTitle: z.string().min(2).max(12).default('跟团游').meta({
        description: "右栏标题（中文，简短）",
    }),
    leftPoints: z.array(z.string().min(2).max(30).meta({ description: "左栏要点（一句话）" }))
        .min(2).max(4)
        .default([
            '行程自由安排，随心调整节奏',
            '深度体验当地风土与小众秘境',
            '住宿餐饮可按预算灵活选择',
            '需自行规划交通与门票预订',
        ])
        .meta({ description: "左栏对比要点列表" }),
    rightPoints: z.array(z.string().min(2).max(30).meta({ description: "右栏要点（一句话）" }))
        .min(2).max(4)
        .default([
            '专业领队全程省心省力',
            '景点门票交通一站式打包',
            '适合首次出行与家庭出游',
            '行程相对固定，自由度较低',
        ])
        .meta({ description: "右栏对比要点列表" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK_LEFT = [
    '行程自由安排，随心调整节奏',
    '深度体验当地风土与小众秘境',
    '住宿餐饮可按预算灵活选择',
    '需自行规划交通与门票预订',
]
const FALLBACK_RIGHT = [
    '专业领队全程省心省力',
    '景点门票交通一站式打包',
    '适合首次出行与家庭出游',
    '行程相对固定，自由度较低',
]

const Comparison: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '自由行 还是 跟团游'
    const leftTitle = slideData?.leftTitle || '自由行'
    const rightTitle = slideData?.rightTitle || '跟团游'
    const leftPoints = (slideData?.leftPoints && slideData.leftPoints.length > 0) ? slideData.leftPoints : FALLBACK_LEFT
    const rightPoints = (slideData?.rightPoints && slideData.rightPoints.length > 0) ? slideData.rightPoints : FALLBACK_RIGHT

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f0f9ff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：明媚海蓝光晕 + 暖阳橙 + 路线点缀 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="travCmpSea" cx="20%" cy="0%" r="60%">
                                <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="travCmpSun" cx="88%" cy="100%" r="55%">
                                <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.14" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#travCmpSea)" />
                        <rect width="1280" height="720" fill="url(#travCmpSun)" />
                        {/* 虚线路线点缀 */}
                        <path
                            d="M-20 120 C 220 60, 420 200, 640 150 S 1060 60, 1300 130"
                            fill="none"
                            stroke="var(--primary-color,#0891b2)"
                            strokeOpacity="0.16"
                            strokeWidth="2"
                            strokeDasharray="2 12"
                            strokeLinecap="round"
                        />
                        <path
                            d="M-20 620 C 240 700, 460 540, 680 600 S 1080 700, 1300 600"
                            fill="none"
                            stroke="var(--secondary-color,#f59e0b)"
                            strokeOpacity="0.14"
                            strokeWidth="2"
                            strokeDasharray="2 12"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-14 py-10">
                    {/* 标题区 */}
                    <div className="flex flex-col items-center text-center">
                        <span
                            className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#0891b2)",
                                background: "rgba(8,145,178,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {/* 指南针母题 */}
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                                <path d="M15 9 L11 11 L9 15 L13 13 Z" fill="currentColor" />
                            </svg>
                            <span>出行方式对比</span>
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                    </div>

                    {/* 对比主体：左卡片 + 中间 VS + 右卡片 */}
                    <div className="mt-8 flex flex-1 items-stretch gap-5">
                        {/* 左栏 */}
                        <div
                            className="flex flex-1 flex-col rounded-3xl border p-7 shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#bae6fd)" }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                                    style={{ background: "var(--primary-color,#0891b2)", color: "var(--primary-text,#ffffff)" }}
                                >
                                    {/* 路线点母题 */}
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                                        <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" stroke="currentColor" strokeWidth="1.8" />
                                        <circle cx="12" cy="9" r="2.4" fill="currentColor" />
                                    </svg>
                                </div>
                                <h2
                                    className="text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--primary-color,#0891b2)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {leftTitle}
                                </h2>
                            </div>
                            <div
                                className="my-5 h-px w-full"
                                style={{ background: "var(--stroke,#bae6fd)" }}
                            />
                            <ul className="flex flex-col gap-4">
                                {leftPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--primary-color,#0891b2)" }}
                                        />
                                        <span
                                            className="text-base leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 中间 VS 指南针分隔 */}
                        <div className="flex flex-shrink-0 flex-col items-center justify-center">
                            <div
                                className="h-full w-px"
                                style={{ background: "linear-gradient(to bottom, transparent, var(--stroke,#bae6fd), transparent)" }}
                            />
                            <div
                                className="my-[-26px] flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 text-sm font-black shadow-md"
                                style={{
                                    background: "var(--secondary-color,#f59e0b)",
                                    color: "var(--primary-text,#ffffff)",
                                    borderColor: "var(--card-color,#ffffff)",
                                }}
                            >
                                VS
                            </div>
                            <div
                                className="h-full w-px"
                                style={{ background: "linear-gradient(to bottom, transparent, var(--stroke,#bae6fd), transparent)" }}
                            />
                        </div>

                        {/* 右栏 */}
                        <div
                            className="flex flex-1 flex-col rounded-3xl border p-7 shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#bae6fd)" }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                                    style={{ background: "var(--secondary-color,#f59e0b)", color: "var(--primary-text,#ffffff)" }}
                                >
                                    {/* 行李/旅程母题 */}
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                                        <rect x="5" y="7.5" width="14" height="11" rx="2.4" stroke="currentColor" strokeWidth="1.8" />
                                        <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5" stroke="currentColor" strokeWidth="1.8" />
                                        <path d="M10 11v4M14 11v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <h2
                                    className="text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--secondary-color,#f59e0b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {rightTitle}
                                </h2>
                            </div>
                            <div
                                className="my-5 h-px w-full"
                                style={{ background: "var(--stroke,#bae6fd)" }}
                            />
                            <ul className="flex flex-col gap-4">
                                {rightPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                                        />
                                        <span
                                            className="text-base leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comparison
