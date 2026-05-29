import React from 'react'
import * as z from "zod";
import { getSchemaDefaults } from '../utils';

export const layoutId = 'kpi-metrics'
export const layoutName = '大数字指标'
export const layoutDescription = 'A KPI metrics slide showing two to four oversized headline numbers with labels and optional descriptions.'

const kpiMetricsSchema = z.object({
    title: z.string().min(3).max(30).default('核心业务指标').meta({ description: "Slide title shown above the metric cards" }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(12).default('98%').meta({ description: "Large headline value, e.g. 98%, 3.2x, ¥1.2亿" }),
        label: z.string().min(2).max(24).default('客户续约率').meta({ description: "Short name of the metric" }),
        description: z.string().min(0).max(60).default('连续四个季度保持行业领先').meta({ description: "Optional supporting detail for the metric" }),
    })).min(2).max(4).default([
        { value: '98%', label: '客户续约率', description: '连续四个季度保持行业领先' },
        { value: '3.2x', label: '收入同比增长', description: '远超市场平均增速' },
        { value: '¥1.2亿', label: '年度经常性收入', description: '突破历史新高' },
        { value: '120+', label: '企业级合作客户', description: '覆盖金融与制造头部' },
    ]).meta({ description: "List of 2 to 4 KPI metrics to highlight" }),
})

export const Schema = kpiMetricsSchema
export type KpiMetricsData = z.infer<typeof kpiMetricsSchema>

const KpiMetricsLayout: React.FC<{ data?: Partial<KpiMetricsData> }> = ({ data: slideData }) => {
    const metrics: KpiMetricsData['metrics'] = (slideData?.metrics && slideData.metrics.length > 0)
        ? slideData.metrics
        : getSchemaDefaults(kpiMetricsSchema).metrics

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
                <div className="mb-10">
                    <h1 style={{ color: "var(--background-text,#111827)" }} className="text-4xl lg:text-5xl font-bold leading-tight">
                        {slideData?.title || '核心业务指标'}
                    </h1>
                    <div style={{ background: "var(--primary-color,#9333ea)" }} className="w-20 h-1 mt-4"></div>
                </div>

                <div className="flex-1 grid gap-6 items-stretch"
                     style={{ gridTemplateColumns: `repeat(${Math.min(Math.max(metrics.length, 2), 4)}, minmax(0, 1fr))` }}>
                    {metrics.map((metric, index) => (
                        <div key={index}
                             className="flex flex-col justify-center rounded-2xl px-6 py-8 border"
                             style={{ background: "var(--card-color,#f3f4f6)", borderColor: "var(--stroke,#e5e7eb)" }}>
                            <div className="font-bold leading-none tracking-tight text-5xl lg:text-6xl xl:text-7xl"
                                 style={{ color: "var(--primary-color,#9333ea)" }}>
                                {metric.value || '0'}
                            </div>
                            <div className="mt-5 text-lg lg:text-xl font-semibold"
                                 style={{ color: "var(--background-text,#111827)" }}>
                                {metric.label}
                            </div>
                            {metric.description && (
                                <p className="mt-2 text-sm leading-relaxed"
                                   style={{ color: "var(--background-text,#6b7280)", opacity: 0.75 }}>
                                    {metric.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>)
}

export default KpiMetricsLayout
