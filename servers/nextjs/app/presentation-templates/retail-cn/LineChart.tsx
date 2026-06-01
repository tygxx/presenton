"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'retail-cn-line-chart'
export const layoutName = '趋势分析'
export const layoutDescription = '电商新零售趋势分析页：潮流粗体撞色色块 + 圆角卡片，左侧标题与价签注解，右侧折线趋势图。纯 CSS/SVG 装饰，主题色自动跟随。'

const schema = z.object({
    title: z.string().min(2).max(20).default('销量趋势上扬').meta({
        description: "趋势页主标题（中文，潮流有力）",
    }),
    description: z.string().min(4).max(50).default('近八个月线上线下全渠道成交持续走高，复购率稳步提升。').meta({
        description: "对趋势的简要说明",
    }),
    chartData: z.object({
        type: z.literal('line').default('line'),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "数据点名称，如月份/周次" }),
            value: z.number().meta({ description: "数据点数值，如成交额/单量" }),
        })).min(4).max(8),
    }).default({
        type: 'line',
        data: [
            { name: '1月', value: 128 },
            { name: '2月', value: 156 },
            { name: '3月', value: 142 },
            { name: '4月', value: 198 },
            { name: '5月', value: 234 },
            { name: '6月', value: 276 },
            { name: '7月', value: 312 },
            { name: '8月', value: 368 },
        ],
    }).meta({ description: "折线趋势图数据" }),
    annotation: z.string().max(30).default('618大促单月环比增长 39%').meta({
        description: "趋势关键注解（可选），如增长拐点说明",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const trendIcon = {
    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
    __icon_query__: 'chart line up',
}

const LineChart: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '销量趋势上扬'
    const description = slideData?.description || '近八个月线上线下全渠道成交持续走高，复购率稳步提升。'
    const chartType = slideData?.chartData?.type || 'line'
    const chartData = slideData?.chartData?.data || []
    const annotation = slideData?.annotation || '618大促单月环比增长 39%'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景潮流几何装饰层 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    {/* 右上撞色大色块 */}
                    <div
                        className="absolute -right-24 -top-28 h-80 w-80 rounded-[3rem]"
                        style={{ background: "var(--primary-color,#db2777)", opacity: 0.10, transform: 'rotate(18deg)' }}
                    />
                    {/* 左下活力圆形光晕 */}
                    <div
                        className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full"
                        style={{ background: "var(--secondary-color,#f59e0b)", opacity: 0.12 }}
                    />
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="retailDots" x="0" y="0" width="34" height="34" patternUnits="userSpaceOnUse">
                                <circle cx="3" cy="3" r="2" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.14" />
                            </pattern>
                        </defs>
                        <rect x="40" y="520" width="320" height="150" fill="url(#retailDots)" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full px-14 py-12 gap-9">
                    {/* 左侧：标题 + 说明 + 价签注解 */}
                    <div className="flex w-[36%] flex-shrink-0 flex-col justify-center">
                        {/* 撞色图标徽章 */}
                        <div
                            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                            style={{ background: "var(--primary-color,#db2777)", transform: 'rotate(-4deg)' }}
                        >
                            <RemoteSvgIcon
                                url={trendIcon.__icon_url__}
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-7 h-7"
                                title={trendIcon.__icon_query__}
                            />
                        </div>

                        <h1
                            className="text-5xl font-black leading-[1.2] break-words"
                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        {/* 撞色双段下划线 */}
                        <div className="mt-5 flex items-center gap-2">
                            <span className="h-2 w-14 rounded-full" style={{ background: "var(--primary-color,#db2777)" }} />
                            <span className="h-2 w-6 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                        </div>

                        <p
                            className="mt-6 text-base leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#18181b)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        {/* 价签式注解卡片 */}
                        {annotation && (
                            <div
                                className="relative mt-9 flex w-fit items-center gap-3 rounded-xl px-5 py-3"
                                style={{ background: "var(--card-color,#fdf2f8)", border: "1.5px solid var(--stroke,#fbcfe8)" }}
                            >
                                {/* 价签打孔点 */}
                                <span
                                    className="h-3 w-3 flex-shrink-0 rounded-full"
                                    style={{ background: "var(--secondary-color,#f59e0b)" }}
                                />
                                <span
                                    className="text-sm font-bold leading-relaxed break-words"
                                    style={{ color: "var(--primary-color,#db2777)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {annotation}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* 右侧：折线趋势图卡片 */}
                    <div
                        className="flex flex-1 flex-col rounded-3xl p-7 shadow-sm"
                        style={{ background: "var(--card-color,#fdf2f8)", border: "1.5px solid var(--stroke,#fbcfe8)" }}
                    >
                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full" style={{ background: "var(--primary-color,#db2777)" }} />
                            <span
                                className="text-sm font-bold break-words"
                                style={{ color: "var(--background-text,#18181b)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                全渠道成交趋势
                            </span>
                        </div>
                        <div className="min-h-0 w-full flex-1">
                            <GeneralChart type={chartType} data={chartData} showLegend={false} showTooltip={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LineChart
