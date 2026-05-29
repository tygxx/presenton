import React from 'react'
import * as z from "zod";

export const layoutId = 'comparison'
export const layoutName = '左右对比'
export const layoutDescription = 'A side-by-side comparison slide with a title and two equal-width columns, contrasting an old approach against the proposed solution.'

const comparisonSchema = z.object({
    title: z.string().min(3).max(30).default('为什么选择我们').meta({ description: "Slide title shown at the top" }),
    left: z.object({
        heading: z.string().min(2).max(24).default('传统方式').meta({ description: "Heading of the left (baseline) column" }),
        points: z.array(z.string().min(2).max(60)).min(2).max(4).default([
            '人工流程多，效率低且易出错',
            '数据分散，难以形成统一视图',
            '扩展成本高，响应周期漫长',
        ]).meta({ description: "Drawback points of the traditional approach (2-4 items)" }),
    }).default({
        heading: '传统方式',
        points: [
            '人工流程多，效率低且易出错',
            '数据分散，难以形成统一视图',
            '扩展成本高，响应周期漫长',
        ],
    }).meta({ description: "Left column: the baseline / old approach" }),
    right: z.object({
        heading: z.string().min(2).max(24).default('我们的方案').meta({ description: "Heading of the right (highlighted) column" }),
        points: z.array(z.string().min(2).max(60)).min(2).max(4).default([
            '端到端自动化，效率提升 3 倍以上',
            '一体化数据中台，决策实时可视',
            '弹性架构按需扩展，快速上线',
        ]).meta({ description: "Advantage points of our solution (2-4 items)" }),
    }).default({
        heading: '我们的方案',
        points: [
            '端到端自动化，效率提升 3 倍以上',
            '一体化数据中台，决策实时可视',
            '弹性架构按需扩展，快速上线',
        ],
    }).meta({ description: "Right column: our proposed solution (highlighted)" }),
})

export const Schema = comparisonSchema
export type ComparisonData = z.infer<typeof comparisonSchema>

const ComparisonLayout: React.FC<{ data?: Partial<ComparisonData> }> = ({ data: slideData }) => {
    const left = slideData?.left
    const right = slideData?.right

    return (<>
        <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
            style={{ background: "var(--background-color,#ffffff)", fontFamily: "var(--heading-font-family,Poppins)" }}>

            {((slideData as any)?.__companyName__ || (slideData as any)?._logo_url__) && (
                <div className="absolute top-0 left-0 right-0 px-12 lg:px-20 pt-4">
                    <div className="flex items-center gap-2">
                        {(slideData as any)?._logo_url__ && <img src={(slideData as any)?._logo_url__} alt="logo" className="w-6 h-6" />}
                        {(slideData as any)?.__companyName__ && <span className="text-sm font-semibold" style={{ color: 'var(--background-text,#111827)' }}>{(slideData as any)?.__companyName__}</span>}
                    </div>
                </div>
            )}

            <div className="relative z-10 flex flex-col h-full px-12 lg:px-20 pt-16 pb-12">
                {/* Title */}
                <div className="mb-8">
                    <h1 style={{ color: "var(--background-text,#111827)" }} className="text-4xl lg:text-5xl font-bold leading-tight">
                        {slideData?.title || '为什么选择我们'}
                    </h1>
                    <div style={{ background: "var(--primary-color,#9333ea)" }} className="mt-4 w-20 h-1 rounded-full"></div>
                </div>

                {/* Two columns */}
                <div className="flex-1 grid grid-cols-2 gap-8 min-h-0">
                    {/* Left card - neutral */}
                    <div
                        className="rounded-2xl p-8 flex flex-col"
                        style={{ background: "var(--card-color,#f3f4f6)", border: "1px solid var(--stroke,#e5e7eb)" }}
                    >
                        <h2 style={{ color: "var(--background-text,#111827)" }} className="text-2xl font-semibold">
                            {left?.heading || '传统方式'}
                        </h2>
                        <div style={{ background: "var(--background-text,#9ca3af)", opacity: 0.4 }} className="mt-3 mb-6 w-12 h-0.5 rounded-full"></div>
                        <ul className="space-y-4 flex-1">
                            {(left?.points || []).map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span
                                        className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                                        style={{ background: "var(--background-text,#9ca3af)", opacity: 0.5 }}
                                    ></span>
                                    <span style={{ color: "var(--background-text,#4b5563)" }} className="text-base leading-relaxed">
                                        {point}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right card - highlighted with primary accent */}
                    <div
                        className="rounded-2xl p-8 flex flex-col"
                        style={{
                            background: "var(--card-color,#f3f4f6)",
                            border: "2px solid var(--primary-color,#9333ea)",
                            boxShadow: "0 10px 30px -12px var(--primary-color,#9333ea)",
                        }}
                    >
                        <h2 style={{ color: "var(--background-text,#111827)" }} className="text-2xl font-semibold">
                            {right?.heading || '我们的方案'}
                        </h2>
                        <div style={{ background: "var(--primary-color,#9333ea)" }} className="mt-3 mb-6 w-12 h-1 rounded-full"></div>
                        <ul className="space-y-4 flex-1">
                            {(right?.points || []).map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span
                                        className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                                        style={{ background: "var(--primary-color,#9333ea)" }}
                                    >
                                        <svg viewBox="0 0 20 20" fill="none" className="w-3 h-3">
                                            <path d="M4 10l4 4 8-8" stroke="var(--primary-text,#ffffff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span style={{ color: "var(--background-text,#111827)" }} className="text-base font-medium leading-relaxed">
                                        {point}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ComparisonLayout
