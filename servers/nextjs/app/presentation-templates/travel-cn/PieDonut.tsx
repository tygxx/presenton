"use client";

import React from 'react'
import * as z from "zod";
import { GeneralChart } from '../GeneralChartPrimitives';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'travel-cn-pie-donut'
export const layoutName = '占比分析'
export const layoutDescription = '旅游文旅风占比分析页：左侧海蓝罗盘构图饼图（GeneralChart pie），右侧自绘图例与占比色块。明媚海蓝配暖阳橙，淡蓝描边、指南针与路线点缀，纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('客源市场构成占比').meta({
        description: "占比分析主标题（中文，简短）",
    }),
    description: z.string().min(2).max(50).default('本季度游客来源地构成，周边短途与省内自由行客群稳居前列。').meta({
        description: "对占比数据的简要说明（可选）",
    }),
    chartData: z.object({
        type: z.literal('pie').default('pie').meta({ description: "图表类型，固定为饼图" }),
        data: z.array(z.object({
            name: z.string().min(1).max(10).meta({ description: "客源/项目名称，如『省内自驾』" }),
            value: z.number().meta({ description: "该项的占比或客流数值" }),
        })).min(3).max(6).meta({ description: "各项占比数据（3-6 项）" }),
    }).default({
        type: 'pie',
        data: [
            { name: '省内自驾', value: 34 },
            { name: '周边短途', value: 26 },
            { name: '跨省长线', value: 18 },
            { name: '亲子家庭', value: 13 },
            { name: '研学团队', value: 9 },
        ],
    }).meta({ description: "饼图数据" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

// 旅游明媚调色板（海蓝、暖阳橙、天青、青绿、湖蓝、珊瑚），与图表 var(--graph-N) 保持一致
const SLICE_FALLBACKS = ['#0891b2', '#f59e0b', '#0ea5e9', '#14b8a6', '#3b82f6', '#fb923c']
const sliceColor = (i: number) => `var(--graph-${i % 6}, ${SLICE_FALLBACKS[i % SLICE_FALLBACKS.length]})`

const PieDonut: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '客源市场构成占比'
    const description = slideData?.description || '本季度游客来源地构成，周边短途与省内自由行客群稳居前列。'
    const chartData = slideData?.chartData?.data || []

    const total = chartData.reduce((sum, d) => sum + (Number(d?.value) || 0), 0) || 1

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
                {/* 背景装饰：海蓝光晕 + 远山天际线 + 罗盘母题 + 虚线路线 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="travelPieGlow" cx="30%" cy="38%" r="58%">
                                <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="travelPieSky" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.04" />
                            </linearGradient>
                            <linearGradient id="travelPieRidge" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#travelPieGlow)" />
                        {/* 暖阳光晕 */}
                        <circle cx="1080" cy="120" r="160" fill="url(#travelPieSky)" />
                        <circle cx="1080" cy="120" r="62" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.10" />
                        {/* 左侧罗盘母题（呼应饼图圆构图） */}
                        <circle cx="360" cy="368" r="288" fill="none" stroke="var(--primary-color,#0891b2)" strokeOpacity="0.10" strokeWidth="2" />
                        {[0, 1].map((i) => (
                            <circle key={i} cx="360" cy="368" r={306 + i * 26} fill="none" stroke="var(--stroke,#bae6fd)" strokeOpacity="0.8" strokeWidth="1.5" strokeDasharray="2 12" />
                        ))}
                        {/* 罗盘十字方位线 */}
                        <g stroke="var(--primary-color,#0891b2)" strokeOpacity="0.10" strokeWidth="1.5">
                            <line x1="360" y1="58" x2="360" y2="678" />
                            <line x1="50" y1="368" x2="670" y2="368" />
                        </g>
                        {/* 远山天际线 */}
                        <path d="M0 600 L150 520 L300 580 L470 470 L640 560 L820 460 L1010 540 L1280 470 L1280 720 L0 720 Z" fill="url(#travelPieRidge)" />
                        {/* 虚线路线 + 目的地路点 */}
                        <path d="M120 660 C 320 600, 520 700, 760 620 S 1120 560, 1220 620" fill="none" stroke="var(--secondary-color,#f59e0b)" strokeOpacity="0.30" strokeWidth="2.5" strokeDasharray="4 10" strokeLinecap="round" />
                        {[[120, 660], [760, 620], [1220, 620]].map(([cx, cy], i) => (
                            <circle key={i} cx={cx} cy={cy} r="5" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.55" />
                        ))}
                    </svg>
                </div>

                <div className="relative z-10 flex h-full px-16 py-12 gap-12">
                    {/* 左侧：罗盘饼图 */}
                    <div className="flex w-[46%] flex-shrink-0 flex-col">
                        {/* 标题区 */}
                        <div className="flex items-start gap-3">
                            <span
                                className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full shadow-sm"
                                style={{ background: "var(--primary-color,#0891b2)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-6 h-6"
                                    title="compass"
                                />
                            </span>
                            <div className="flex flex-col">
                                <h1
                                    className="text-4xl font-black leading-[1.25] break-words"
                                    style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {title}
                                </h1>
                                <div className="mt-3 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                            </div>
                        </div>

                        {/* 罗盘圆盘容器 */}
                        <div className="mt-6 flex flex-1 items-center justify-center">
                            <div
                                className="flex aspect-square w-full max-w-[360px] items-center justify-center rounded-full p-5 shadow-sm"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    border: "10px solid var(--stroke,#bae6fd)",
                                    boxShadow: "0 10px 30px rgba(8,145,178,0.12), inset 0 0 0 2px rgba(8,145,178,0.08)",
                                }}
                            >
                                <div className="min-h-0 min-w-0 flex-1" style={{ height: '100%' }}>
                                    <GeneralChart type={'pie'} data={chartData} showLegend={false} showTooltip={true} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右侧：说明 + 自绘图例占比列表 */}
                    <div className="flex flex-1 flex-col justify-center">
                        <p
                            className="text-base leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {description}
                        </p>

                        <div className="mt-7 flex flex-col gap-3">
                            {chartData.map((d, i) => {
                                const pct = Math.round(((Number(d?.value) || 0) / total) * 100)
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 rounded-2xl px-5 py-3 shadow-sm"
                                        style={{
                                            background: "var(--card-color,#ffffff)",
                                            border: "1px solid var(--stroke,#bae6fd)",
                                        }}
                                    >
                                        {/* 占比色块（圆形路点，呼应路线母题） */}
                                        <span
                                            className="flex-shrink-0 rounded-full"
                                            style={{
                                                width: '18px',
                                                height: '18px',
                                                background: sliceColor(i),
                                                boxShadow: `0 0 0 4px var(--card-color,#ffffff), 0 0 0 5px var(--stroke,#bae6fd)`,
                                            }}
                                        />
                                        <span
                                            className="flex-1 text-lg font-bold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {d?.name || `客源${i + 1}`}
                                        </span>
                                        <span
                                            className="flex-shrink-0 text-2xl font-black leading-none"
                                            style={{ color: "var(--primary-color,#0891b2)" }}
                                        >
                                            {pct}
                                            <span className="ml-0.5 text-base font-bold align-top">%</span>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* 底部路线点缀 */}
                        <div className="mt-6 flex items-center gap-2 self-end opacity-70">
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg"
                                strokeColor="currentColor"
                                color="var(--secondary-color,#f59e0b)"
                                className="w-5 h-5"
                                title="map pin"
                            />
                            <span
                                className="text-sm leading-relaxed break-words"
                                style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                数据来源 · 文旅客流监测平台
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PieDonut
