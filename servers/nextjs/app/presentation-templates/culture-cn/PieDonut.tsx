"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';

export const layoutId = 'culture-cn-pie-donut'
export const layoutName = '占比分析'
export const layoutDescription = '国潮文创风占比分析页：左侧水墨标题与说明 + 朱砂环图，右侧自绘图例与占比色块。宣纸米黄底配描金边、印章红块，东方雅致。'

const schema = z.object({
    title: z.string().min(2).max(20).default('品类销量占比').meta({
        description: "占比分析主标题（中文，简短）",
    }),
    description: z.string().min(0).max(50).default('国潮文创各品类销售占比分布，纹样香道居首，文房雅集紧随其后。').meta({
        description: "对占比数据的简要说明（可选）",
    }),
    chartData: z.object({
        type: z.literal('pie').default('pie'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "品类名称，如『纹样香道』" }),
            value: z.number().meta({ description: "占比数值或销量" }),
        })).min(3).max(6),
    }).default({
        type: 'pie',
        data: [
            { name: '纹样香道', value: 32 },
            { name: '文房雅集', value: 26 },
            { name: '茶器盏托', value: 18 },
            { name: '锦绣服饰', value: 14 },
            { name: '描金摆件', value: 10 },
        ],
    }).meta({ description: "占比图数据（饼/环图）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

// 国潮配色：朱砂红、墨黑、描金、黛青、苔绿，呼应传统器物色谱
const PALETTE = ['#c0392b', '#1a1a1a', '#b8893a', '#3d5a5b', '#7a6a4f', '#8a4b3a']

const PieDonut: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '品类销量占比'
    const description = slideData?.description || '国潮文创各品类销售占比分布，纹样香道居首，文房雅集紧随其后。'
    const chartData = slideData?.chartData?.data || []
    const total = chartData.reduce((sum, d) => sum + (Math.abs(Number(d?.value)) || 0), 0)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f5ecd9)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：宣纸纹理 + 水墨笔触 + 传统纹样 + 描金边 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="cultPieInk" cx="0.18" cy="0.85" r="0.7">
                            <stop offset="0%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="cultPieGold" cx="0.85" cy="0.12" r="0.55">
                            <stop offset="0%" stopColor="#b8893a" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#b8893a" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 角落水墨晕染 */}
                    <rect width="1280" height="720" fill="url(#cultPieInk)" />
                    <rect width="1280" height="720" fill="url(#cultPieGold)" />
                    {/* 传统回纹纹样（左上点缀） */}
                    <g stroke="var(--secondary-color,#1a1a1a)" strokeOpacity="0.07" strokeWidth="2" fill="none">
                        <path d="M64 64 h44 v44 h-30 v-30 h16 v16" />
                        <path d="M148 64 h44 v44 h-30 v-30 h16 v16" />
                    </g>
                    {/* 水墨笔触（底部一抹横扫） */}
                    <path
                        d="M-20 624 C 200 600, 360 648, 560 620 S 980 596, 1300 632 L 1300 720 L -20 720 Z"
                        fill="var(--secondary-color,#1a1a1a)"
                        fillOpacity="0.045"
                    />
                </svg>

                {/* 描金边框 */}
                <div
                    className="absolute inset-4 rounded-sm pointer-events-none"
                    style={{ border: '1.5px solid #b8893a', opacity: 0.45 }}
                />
                <div
                    className="absolute inset-[22px] rounded-sm pointer-events-none"
                    style={{ border: '1px solid var(--stroke,#ddd0b4)', opacity: 0.7 }}
                />

                {/* 右上角印章红块 */}
                <div
                    className="absolute flex items-center justify-center"
                    style={{
                        top: '40px', right: '44px', width: '52px', height: '52px',
                        borderRadius: '6px',
                        background: "var(--primary-color,#c0392b)",
                        boxShadow: '0 2px 10px rgba(192,57,43,0.28)',
                    }}
                >
                    <span
                        className="text-[10px] font-bold leading-[1.2] text-center break-words"
                        style={{ color: "var(--primary-text,#ffffff)", letterSpacing: '1px', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        国潮<br />文创
                    </span>
                </div>

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full px-16 py-14 gap-10">
                    {/* 左侧：竖排点缀 + 标题 + 说明 + 环图 */}
                    <div className="flex w-[56%] flex-shrink-0 flex-col justify-center">
                        <div className="flex items-start gap-5">
                            {/* 竖排传统气质标签 */}
                            <div
                                className="flex flex-col items-center justify-start pt-1 break-words"
                                style={{
                                    writingMode: 'vertical-rl',
                                    color: "var(--primary-color,#c0392b)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                <span className="text-base font-bold leading-loose" style={{ letterSpacing: '4px' }}>
                                    占比之道
                                </span>
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="mb-4 h-1.5 w-16 rounded-full" style={{ background: "var(--primary-color,#c0392b)" }} />
                                <h1
                                    className="text-4xl font-black leading-[1.3] break-words"
                                    style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {title}
                                </h1>
                                {description && (
                                    <p
                                        className="mt-4 max-w-[26rem] text-base leading-[1.7] break-words"
                                        style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* 朱砂环图卡片 */}
                        <div
                            className="mt-7 flex flex-1 items-center justify-center rounded-2xl border p-5"
                            style={{
                                background: "var(--card-color,#fbf5e9)",
                                borderColor: "var(--stroke,#ddd0b4)",
                                boxShadow: '0 4px 16px rgba(26,26,26,0.05)',
                            }}
                        >
                            <div className="min-h-0 h-full w-full">
                                <GeneralChart type={'pie'} data={chartData} showLegend={false} showTooltip={true} />
                            </div>
                        </div>
                    </div>

                    {/* 右侧：自绘图例列表（名称 + 占比 + 色块） */}
                    <div className="flex flex-1 flex-col justify-center">
                        <div className="mb-5 flex items-center gap-3">
                            <span
                                className="inline-block h-4 w-1.5 rounded-full"
                                style={{ background: "var(--primary-color,#c0392b)" }}
                            />
                            <span
                                className="text-lg font-bold break-words"
                                style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                品类图例
                            </span>
                            <span
                                className="ml-1 inline-block h-px flex-1"
                                style={{ background: "var(--stroke,#ddd0b4)" }}
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            {chartData.map((d, i) => {
                                const value = Math.abs(Number(d?.value)) || 0
                                const pct = total > 0 ? Math.round((value / total) * 100) : 0
                                const color = PALETTE[i % PALETTE.length]
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 rounded-xl border px-4 py-3"
                                        style={{
                                            background: "var(--card-color,#fbf5e9)",
                                            borderColor: "var(--stroke,#ddd0b4)",
                                        }}
                                    >
                                        {/* 占比色块 */}
                                        <span
                                            className="h-9 w-9 flex-shrink-0 rounded-md"
                                            style={{ background: color, boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.35)' }}
                                        />
                                        <span
                                            className="min-w-0 flex-1 text-base font-semibold leading-relaxed break-words"
                                            style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {d?.name || '品类'}
                                        </span>
                                        {/* 占比条 */}
                                        <span
                                            className="hidden sm:block h-2 w-20 flex-shrink-0 overflow-hidden rounded-full"
                                            style={{ background: "var(--stroke,#ddd0b4)" }}
                                        >
                                            <span
                                                className="block h-full rounded-full"
                                                style={{ width: `${pct}%`, background: color }}
                                            />
                                        </span>
                                        <span
                                            className="flex-shrink-0 text-xl font-black leading-none break-words"
                                            style={{ color: "var(--primary-color,#c0392b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {pct}%
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                        <p
                            className="mt-5 text-xs leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            注：占比按各品类销量归一化计算，合计约百分之百。
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PieDonut
