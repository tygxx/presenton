"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'realestate-cn-pie-donut'
export const layoutName = '占比分析'
export const layoutDescription = '房产建筑风占比页：左侧标题/说明 + 饼图，右侧自绘图例与占比明细。高级灰金铜配色、细线分隔、建筑剪影装饰，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('货值结构占比').meta({
        description: "占比页主标题（中文，简短克制）",
    }),
    description: z.string().min(0).max(50).default('全盘可售货值按业态拆分，住宅与商业协同支撑去化节奏。').meta({
        description: "对占比数据的简要说明（可选）",
    }),
    chartData: z.object({
        type: z.literal('pie').default('pie'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "占比项名称，如住宅/商业/车位" }),
            value: z.number().meta({ description: "占比项数值（用于计算占比）" }),
        })).min(3).max(6).meta({ description: "饼图分项数据（3~6 项）" }),
    }).default({
        type: 'pie',
        data: [
            { name: '高层住宅', value: 46 },
            { name: '洋房叠墅', value: 22 },
            { name: '商业街区', value: 16 },
            { name: '写字楼', value: 10 },
            { name: '车位配套', value: 6 },
        ],
    }).meta({ description: "占比图表数据" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

// 与本场景气质贴合的图例色板（高级灰 + 金铜点缀），与图表默认色板独立维护
const LEGEND_COLORS = [
    'var(--primary-color,#b08d57)',
    'var(--secondary-color,#3f3f46)',
    '#c8a878',
    '#71717a',
    '#a1a1aa',
    '#d4d4d8',
]

const PieDonut: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '货值结构占比'
    const description = slideData?.description || '全盘可售货值按业态拆分，住宅与商业协同支撑去化节奏。'
    const chartData = slideData?.chartData?.data || []
    const total = chartData.reduce((sum, item) => sum + (Math.abs(Number(item?.value) || 0)), 0)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f4f4f5)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：建筑剪影 + 极简线条，大留白 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="reCnPieSky" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* 底部建筑剪影：极简错落矩形天际线 */}
                    <g fill="url(#reCnPieSky)">
                        <rect x="40" y="556" width="44" height="164" />
                        <rect x="96" y="600" width="34" height="120" />
                        <rect x="142" y="520" width="50" height="200" />
                        <rect x="204" y="588" width="30" height="132" />
                        <rect x="246" y="544" width="46" height="176" />
                        <rect x="1052" y="572" width="40" height="148" />
                        <rect x="1104" y="528" width="52" height="192" />
                        <rect x="1168" y="596" width="32" height="124" />
                        <rect x="1212" y="556" width="44" height="164" />
                    </g>
                    {/* 建筑剪影描边线 */}
                    <g fill="none" stroke="var(--secondary-color,#3f3f46)" strokeOpacity="0.08" strokeWidth="1">
                        <rect x="142" y="520" width="50" height="200" />
                        <rect x="1104" y="528" width="52" height="192" />
                    </g>
                    {/* 极简细线条 */}
                    <line x1="80" y1="96" x2="1200" y2="96" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                    <line x1="900" y1="150" x2="900" y2="600" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                </svg>

                {/* 右上角金铜点缀角标 */}
                <div
                    className="absolute top-9 right-12 z-10 h-2 w-2 rounded-full"
                    style={{
                        background: "var(--primary-color,#b08d57)",
                        boxShadow: '0 0 0 5px rgba(176,141,87,0.14)',
                    }}
                    aria-hidden="true"
                />

                <div className="relative z-10 flex h-full px-20 py-14 gap-12">
                    {/* 左侧：标题 + 说明 + 饼图 */}
                    <div className="flex w-[52%] flex-shrink-0 flex-col justify-center">
                        <span
                            className="mb-4 text-xs font-light tracking-wide break-words"
                            style={{
                                color: "var(--primary-color,#b08d57)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            占比分析 · STRUCTURE
                        </span>
                        <h1
                            className="text-4xl font-light leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-5 h-px w-16" style={{ background: "var(--primary-color,#b08d57)" }} />
                        {description && (
                            <p
                                className="mt-5 max-w-[26rem] text-sm font-light leading-loose break-words"
                                style={{ color: "var(--secondary-color,#3f3f46)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {description}
                            </p>
                        )}

                        <div className="mt-7 flex w-full flex-1 items-center justify-center" style={{ maxWidth: '22rem' }}>
                            <div className="h-full max-h-[280px] w-full">
                                <GeneralChart type={'pie'} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>
                    </div>

                    {/* 右侧：自绘图例 + 占比明细 */}
                    <div className="flex flex-1 flex-col justify-center">
                        <div className="mb-6 flex items-baseline gap-3">
                            <span
                                className="text-sm font-light tracking-wide break-words"
                                style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                业态占比明细
                            </span>
                            <span className="flex-1 h-px" style={{ background: "var(--stroke,#e4e4e7)" }} />
                        </div>

                        <div className="flex flex-col">
                            {chartData.map((item, i) => {
                                const value = Math.abs(Number(item?.value) || 0)
                                const percent = total > 0 ? Math.round((value / total) * 100) : 0
                                const color = LEGEND_COLORS[i % LEGEND_COLORS.length]
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 py-3.5"
                                        style={{ borderTop: i === 0 ? 'none' : '1px solid var(--stroke,#e4e4e7)' }}
                                    >
                                        <span
                                            className="h-3 w-3 flex-shrink-0 rounded-sm"
                                            style={{ background: color }}
                                            aria-hidden="true"
                                        />
                                        <span
                                            className="flex-1 text-base font-light leading-relaxed break-words"
                                            style={{ color: "var(--secondary-color,#3f3f46)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.name || `分项 ${i + 1}`}
                                        </span>
                                        {/* 细占比进度条 */}
                                        <span className="hidden h-px w-24 sm:block" style={{ background: "var(--stroke,#e4e4e7)" }}>
                                            <span
                                                className="block h-px"
                                                style={{ width: `${percent}%`, background: color }}
                                            />
                                        </span>
                                        <span
                                            className="w-14 text-right text-lg font-normal leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {percent}%
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PieDonut
