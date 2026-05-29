import React from 'react'
import * as z from "zod";

export const layoutId = 'timeline'
export const layoutName = '时间线'
export const layoutDescription = 'A horizontal timeline / roadmap slide with a title and evenly spaced milestone nodes alternating above and below a primary-colored baseline.'

const timelineSchema = z.object({
    title: z.string().min(3).max(30).default('产品发展路线图').meta({ description: "时间线页面的主标题" }),
    milestones: z.array(z.object({
        time: z.string().min(2).max(16).default('Q1').meta({ description: "里程碑时间点，如 Q1、2026.03 或 第一阶段" }),
        title: z.string().min(2).max(20).default('产品立项').meta({ description: "里程碑标题" }),
        description: z.string().min(5).max(60).default('完成市场调研与核心需求定义').meta({ description: "里程碑简要说明" }),
    })).min(3).max(5).default([
        { time: 'Q1', title: '产品立项', description: '完成市场调研与核心需求定义' },
        { time: 'Q2', title: '原型开发', description: '搭建 MVP 并启动种子用户内测' },
        { time: 'Q3', title: '正式上线', description: '产品公测发布并完成首轮商业化' },
        { time: 'Q4', title: '规模增长', description: '渠道扩张，月活突破百万量级' },
    ]).meta({ description: "时间线里程碑列表，按时间先后排列" }),
})

export const Schema = timelineSchema
export type TimelineData = z.infer<typeof timelineSchema>

const defaultMilestones: TimelineData['milestones'] = [
    { time: 'Q1', title: '产品立项', description: '完成市场调研与核心需求定义' },
    { time: 'Q2', title: '原型开发', description: '搭建 MVP 并启动种子用户内测' },
    { time: 'Q3', title: '正式上线', description: '产品公测发布并完成首轮商业化' },
    { time: 'Q4', title: '规模增长', description: '渠道扩张，月活突破百万量级' },
]

const TimelineLayout: React.FC<{ data?: Partial<TimelineData> }> = ({ data: slideData }) => {
    const milestones = (slideData?.milestones && slideData.milestones.length > 0)
        ? slideData.milestones
        : defaultMilestones

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

            <div className="relative z-10 flex h-full flex-col px-12 lg:px-20 pt-16 pb-12">
                {/* Title */}
                <div className="space-y-4 shrink-0">
                    <h1 style={{ color: "var(--background-text,#111827)" }} className="text-4xl lg:text-5xl font-bold leading-tight">
                        {slideData?.title || '产品发展路线图'}
                    </h1>
                    <div style={{ background: "var(--primary-color,#9333ea)" }} className="w-20 h-1"></div>
                </div>

                {/* Timeline */}
                <div className="flex-1 flex items-center">
                    <div className="relative w-full">
                        {/* Baseline */}
                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full"
                            style={{ background: "var(--primary-color,#9333ea)" }}></div>

                        {/* Milestone columns */}
                        <div className="relative flex justify-between items-stretch">
                            {milestones.map((item, index) => {
                                const isTop = index % 2 === 0
                                return (
                                    <div key={index} className="flex flex-col items-center flex-1 min-w-0 px-2">
                                        {/* Top content */}
                                        <div className={`w-full flex flex-col items-center text-center ${isTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                            <ContentCard item={item} />
                                            <div className="h-8 w-px mt-2" style={{ background: "var(--stroke,#e5e7eb)" }}></div>
                                        </div>

                                        {/* Node dot */}
                                        <div className="relative z-10 my-1 flex items-center justify-center shrink-0">
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center shadow"
                                                style={{ background: "var(--primary-color,#9333ea)", border: "3px solid var(--background-color,#ffffff)" }}>
                                            </div>
                                        </div>

                                        {/* Bottom content */}
                                        <div className={`w-full flex flex-col items-center text-center ${!isTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                            <div className="h-8 w-px mb-2" style={{ background: "var(--stroke,#e5e7eb)" }}></div>
                                            <ContentCard item={item} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

const ContentCard: React.FC<{ item: { time: string; title: string; description: string } }> = ({ item }) => {
    return (
        <div className="w-full max-w-[220px] rounded-lg px-4 py-3"
            style={{ background: "var(--card-color,#f3f4f6)", border: "1px solid var(--stroke,#e5e7eb)" }}>
            <div className="text-sm font-bold tracking-wide" style={{ color: "var(--primary-color,#9333ea)" }}>
                {item.time}
            </div>
            <div className="text-base font-semibold mt-1 leading-snug" style={{ color: "var(--background-text,#111827)" }}>
                {item.title}
            </div>
            <div className="text-xs mt-1.5 leading-relaxed" style={{ color: "var(--background-text,#6b7280)" }}>
                {item.description}
            </div>
        </div>
    )
}

export default TimelineLayout
