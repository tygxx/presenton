import React from 'react'
import * as z from "zod";
import { getSchemaDefaults } from '../utils';

export const layoutId = 'data-chart'
export const layoutName = '数据图表'
export const layoutDescription = 'A data chart slide with a pure CSS vertical bar chart, axis baseline, evenly spaced labeled bars, and an optional insight callout.'

const dataChartSchema = z.object({
    title: z.string().min(3).max(30).default('季度营收增长趋势').meta({ description: "Slide title shown above the bar chart" }),
    insight: z.string().min(0).max(160).default('过去四个季度营收持续走高，Q4 同比增长 42%，验证了产品市场契合度与规模化复制能力。').meta({ description: "Optional one-sentence takeaway summarizing the chart data" }),
    bars: z.array(z.object({
        label: z.string().min(1).max(24).default('Q1').meta({ description: "Short label shown below the bar, e.g. a quarter, month, or category" }),
        value: z.number().min(0).max(100).default(50).meta({ description: "Bar value from 0 to 100, drives bar height and is shown on top" }),
    })).min(3).max(6).default([
        { label: 'Q1', value: 38 },
        { label: 'Q2', value: 52 },
        { label: 'Q3', value: 67 },
        { label: 'Q4', value: 88 },
    ]).meta({ description: "List of 3 to 6 data points to render as vertical bars" }),
})

export const Schema = dataChartSchema
export type DataChartData = z.infer<typeof dataChartSchema>

const GRAPH_VARS = [
    'var(--graph-0,#6366f1)',
    'var(--graph-1,#8b5cf6)',
    'var(--graph-2,#ec4899)',
    'var(--graph-3,#f59e0b)',
    'var(--graph-4,#10b981)',
    'var(--graph-5,#06b6d4)',
]

const DataChartLayout: React.FC<{ data?: Partial<DataChartData> }> = ({ data: slideData }) => {
    const bars: DataChartData['bars'] = (slideData?.bars && slideData.bars.length > 0)
        ? slideData.bars
        : getSchemaDefaults(dataChartSchema).bars

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
                <div className="mb-8">
                    <h1 style={{ color: "var(--background-text,#111827)" }} className="text-4xl lg:text-5xl font-bold leading-tight">
                        {slideData?.title || '季度营收增长趋势'}
                    </h1>
                    <div style={{ background: "var(--primary-color,#9333ea)" }} className="w-20 h-1 mt-4"></div>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row gap-10 min-h-0">
                    {/* Chart */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex-1 flex items-end justify-around gap-4 lg:gap-8 min-h-0">
                            {bars.map((bar, index) => {
                                const v = Math.max(0, Math.min(100, Number(bar.value) || 0))
                                const color = GRAPH_VARS[index % GRAPH_VARS.length]
                                return (
                                    <div key={index} className="flex-1 h-full flex flex-col items-center justify-end">
                                        <div className="text-sm lg:text-base font-bold mb-2"
                                             style={{ color: "var(--background-text,#111827)" }}>
                                            {v}
                                        </div>
                                        <div className="w-full max-w-[72px] rounded-t-lg transition-all"
                                             style={{ height: `${v}%`, background: color, minHeight: '4px' }}>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {/* Baseline */}
                        <div className="h-px w-full" style={{ background: "var(--stroke,#e5e7eb)" }}></div>
                        {/* Labels */}
                        <div className="flex items-start justify-around gap-4 lg:gap-8 pt-3">
                            {bars.map((bar, index) => (
                                <div key={index} className="flex-1 text-center text-sm lg:text-base font-medium"
                                     style={{ color: "var(--background-text,#4b5563)" }}>
                                    {bar.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Insight */}
                    {slideData?.insight && slideData.insight.length > 0 && (
                        <div className="lg:w-72 xl:w-80 flex-shrink-0 flex flex-col justify-center rounded-2xl px-6 py-6 border"
                             style={{ background: "var(--card-color,#f3f4f6)", borderColor: "var(--stroke,#e5e7eb)" }}>
                            <div className="w-10 h-1 mb-4" style={{ background: "var(--primary-color,#9333ea)" }}></div>
                            <p className="text-base lg:text-lg leading-relaxed"
                               style={{ color: "var(--background-text,#374151)" }}>
                                {slideData.insight}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>)
}

export default DataChartLayout
