import React from 'react'
import * as z from "zod";

export const layoutId = 'agenda'
export const layoutName = '目录'
export const layoutDescription = 'An agenda slide with a title on the left and a numbered list of chapters on the right.'

const agendaSlideSchema = z.object({
    title: z.string().min(2).max(20).default('目录').meta({ description: "标题，通常为“目录”或“议程”" }),
    items: z.array(z.object({
        label: z.string().min(2).max(24).default('章节标题').meta({ description: "章节名称" }),
        description: z.string().max(60).default('').meta({ description: "章节的一句简述（可选）" }),
    })).min(3).max(6).default([
        { label: '公司概览', description: '团队背景与发展历程' },
        { label: '市场机会', description: '行业规模与增长趋势' },
        { label: '产品方案', description: '核心能力与差异化优势' },
        { label: '商业模式', description: '盈利路径与收入结构' },
        { label: '融资计划', description: '资金用途与里程碑' },
    ]).meta({ description: "目录章节列表，3 到 6 项" }),
})

export const Schema = agendaSlideSchema
export type AgendaSlideData = z.infer<typeof agendaSlideSchema>

const defaultItems: AgendaSlideData['items'] = [
    { label: '公司概览', description: '团队背景与发展历程' },
    { label: '市场机会', description: '行业规模与增长趋势' },
    { label: '产品方案', description: '核心能力与差异化优势' },
    { label: '商业模式', description: '盈利路径与收入结构' },
    { label: '融资计划', description: '资金用途与里程碑' },
]

const AgendaSlideLayout: React.FC<{ data?: Partial<AgendaSlideData> }> = ({ data: slideData }) => {
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : defaultItems
    const twoColumns = items.length > 4

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

            <div className="relative z-10 flex h-full px-12 lg:px-20 py-16 gap-12 lg:gap-16">
                {/* 左侧标题 */}
                <div className="w-1/3 flex flex-col justify-center">
                    <span className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--primary-color,#9333ea)" }}>Agenda</span>
                    <h1 className="mt-3 text-5xl lg:text-6xl font-bold leading-tight" style={{ color: "var(--background-text,#111827)" }}>{slideData?.title || '目录'}</h1>
                    <div className="mt-6 w-20 h-1" style={{ background: "var(--primary-color,#9333ea)" }}></div>
                </div>

                {/* 右侧编号列表 */}
                <div className="flex-1 flex flex-col justify-center">
                    <div className={twoColumns ? "grid grid-cols-2 gap-x-10 gap-y-1" : "flex flex-col"}>
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-5 py-4"
                                style={!twoColumns && index < items.length - 1
                                    ? { borderBottom: "1px solid var(--stroke,#e5e7eb)" }
                                    : undefined}
                            >
                                <span className="text-3xl lg:text-4xl font-bold leading-none tabular-nums shrink-0" style={{ color: "var(--primary-color,#9333ea)" }}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg lg:text-xl font-semibold leading-snug" style={{ color: "var(--background-text,#111827)" }}>
                                        {item?.label || '章节标题'}
                                    </h3>
                                    {item?.description && (
                                        <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--background-text,#6b7280)", opacity: 0.7 }}>
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default AgendaSlideLayout
