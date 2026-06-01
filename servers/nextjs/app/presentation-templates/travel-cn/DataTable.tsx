import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'travel-cn-data-table'
export const layoutName = '数据表格'
export const layoutDescription = '旅游文旅风数据表格：表头主题色海蓝底、斑马纹行、指南针与路线点缀装饰。用于线路对比、报价明细、行程清单等结构化数据，纯 CSS 离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('热门线路报价对比').meta({
        description: "表格标题（中文，简短，如『线路对比』『行程明细』）",
    }),
    subtitle: z.string().min(2).max(36).default('精选目的地，明媚旅程一目了然').meta({
        description: "标题下方副说明，一句话点题",
    }),
    headers: z.array(
        z.string().min(1).max(12).meta({ description: "表头列名（中文，简短）" })
    ).min(2).max(5).default(['目的地', '行程天数', '出发季节', '人均报价', '推荐指数']).meta({
        description: "表格表头，列数 2-5",
    }),
    rows: z.array(
        z.array(
            z.string().min(1).max(16).meta({ description: "单元格内容" })
        ).min(2).max(5)
    ).min(2).max(6).default([
        ['云南大理', '6 天', '春秋', '¥3,280', '★★★★★'],
        ['海南三亚', '5 天', '冬季', '¥3,860', '★★★★☆'],
        ['川西稻城', '7 天', '秋季', '¥4,520', '★★★★★'],
        ['桂林阳朔', '4 天', '四季', '¥2,680', '★★★★☆'],
        ['新疆喀纳斯', '8 天', '夏秋', '¥5,980', '★★★★★'],
    ]).meta({
        description: "表格数据行，每行列数应与表头一致，2-6 行",
    }),
    icon: IconSchema.default({
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg',
        __icon_query__: 'compass',
    }).meta({ description: "标题旁的装饰图标（旅游主题，如指南针/地图）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DataTable: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '热门线路报价对比'
    const subtitle = slideData?.subtitle || '精选目的地，明媚旅程一目了然'
    const headers = (slideData?.headers && slideData.headers.length >= 2)
        ? slideData.headers
        : ['目的地', '行程天数', '出发季节', '人均报价', '推荐指数']
    const rows = (slideData?.rows && slideData.rows.length >= 2)
        ? slideData.rows
        : [
            ['云南大理', '6 天', '春秋', '¥3,280', '★★★★★'],
            ['海南三亚', '5 天', '冬季', '¥3,860', '★★★★☆'],
            ['川西稻城', '7 天', '秋季', '¥4,520', '★★★★★'],
            ['桂林阳朔', '4 天', '四季', '¥2,680', '★★★★☆'],
            ['新疆喀纳斯', '8 天', '夏秋', '¥5,980', '★★★★★'],
        ]
    const icon = slideData?.icon || {
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg',
        __icon_query__: 'compass',
    }
    const colCount = headers.length

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
                {/* 背景装饰：海天渐变光晕 */}
                <div
                    className="absolute top-0 right-0 h-[46%] w-[52%]"
                    style={{
                        background: "radial-gradient(120% 120% at 100% 0%, rgba(8,145,178,0.10) 0%, rgba(8,145,178,0) 60%)",
                    }}
                    aria-hidden="true"
                />
                <div
                    className="absolute bottom-0 left-0 h-[40%] w-[46%]"
                    style={{
                        background: "radial-gradient(120% 120% at 0% 100%, rgba(245,158,11,0.10) 0%, rgba(245,158,11,0) 62%)",
                    }}
                    aria-hidden="true"
                />

                {/* 背景装饰：指南针 + 路线点缀 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="travelRoute" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.45" />
                        </linearGradient>
                    </defs>
                    {/* 右上角指南针环 */}
                    <g transform="translate(1150 86)">
                        {[34, 50, 66].map((r, i) => (
                            <circle key={i} cx="0" cy="0" r={r} fill="none" stroke="var(--primary-color,#0891b2)" strokeOpacity={0.14} strokeWidth="1.5" />
                        ))}
                        <path d="M0 -52 L11 0 L0 52 L-11 0 Z" fill="var(--primary-color,#0891b2)" fillOpacity="0.18" />
                        <path d="M0 -52 L11 0 L0 0 Z" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.30" />
                        <circle cx="0" cy="0" r="4" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.55" />
                    </g>
                    {/* 左下角虚线路线 + 站点 */}
                    <path
                        d="M -20 700 C 160 600 120 520 300 500 S 520 540 660 470"
                        fill="none"
                        stroke="url(#travelRoute)"
                        strokeWidth="2"
                        strokeDasharray="3 9"
                        strokeLinecap="round"
                        opacity="0.6"
                    />
                    {[[60, 660], [300, 500], [660, 470]].map((p, i) => (
                        <circle key={i} cx={p[0]} cy={p[1]} r="5" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.55" />
                    ))}
                </svg>

                {/* 主体内容 */}
                <div className="relative z-10 flex h-full flex-col px-14 py-10">
                    {/* 标题区 */}
                    <div className="flex items-center gap-4">
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm"
                            style={{
                                background: "linear-gradient(135deg, var(--primary-color,#0891b2), var(--secondary-color,#f59e0b))",
                            }}
                        >
                            <RemoteSvgIcon
                                url={icon.__icon_url__}
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-6 h-6"
                                title={icon.__icon_query__}
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-3xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <p
                                className="mt-1 text-sm leading-relaxed break-words"
                                style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    {/* 分隔线 */}
                    <div
                        className="mt-5 mb-6 h-1 w-full rounded-full"
                        style={{ background: "linear-gradient(90deg, var(--primary-color,#0891b2), var(--secondary-color,#f59e0b) 70%, rgba(245,158,11,0) 100%)", opacity: 0.85 }}
                    />

                    {/* 表格区 */}
                    <div className="flex flex-1 flex-col min-h-0">
                        <div
                            className="flex flex-col flex-1 overflow-hidden rounded-2xl border shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#bae6fd)" }}
                        >
                            {/* 表头 */}
                            <div
                                className="grid"
                                style={{
                                    gridTemplateColumns: `1.4fr ${Array.from({ length: Math.max(colCount - 1, 0) }).map(() => '1fr').join(' ')}`,
                                    background: "linear-gradient(135deg, var(--primary-color,#0891b2), color-mix(in srgb, var(--primary-color,#0891b2) 78%, var(--secondary-color,#f59e0b)))",
                                }}
                            >
                                {headers.map((h, ci) => (
                                    <div
                                        key={ci}
                                        className={`px-5 py-3.5 text-sm font-bold leading-relaxed break-words ${ci === 0 ? 'text-left' : 'text-center'}`}
                                        style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {h}
                                    </div>
                                ))}
                            </div>

                            {/* 数据行（斑马纹） */}
                            <div className="flex flex-col flex-1">
                                {rows.map((row, ri) => {
                                    const cells = Array.from({ length: colCount }).map((_, ci) => row?.[ci] ?? '')
                                    return (
                                        <div
                                            key={ri}
                                            className="grid flex-1 items-center"
                                            style={{
                                                gridTemplateColumns: `1.4fr ${Array.from({ length: Math.max(colCount - 1, 0) }).map(() => '1fr').join(' ')}`,
                                                background: ri % 2 === 0
                                                    ? "var(--card-color,#ffffff)"
                                                    : "color-mix(in srgb, var(--primary-color,#0891b2) 7%, var(--card-color,#ffffff))",
                                                borderTop: "1px solid var(--stroke,#bae6fd)",
                                            }}
                                        >
                                            {cells.map((cell, ci) => (
                                                <div
                                                    key={ci}
                                                    className={`px-5 py-3 text-sm leading-relaxed break-words ${ci === 0 ? 'text-left font-semibold' : 'text-center'}`}
                                                    style={{
                                                        color: ci === 0
                                                            ? "var(--background-text,#0c4a6e)"
                                                            : (ci === colCount - 1 ? "var(--secondary-color,#f59e0b)" : "var(--background-text,#0c4a6e)"),
                                                        opacity: ci === 0 ? 1 : (ci === colCount - 1 ? 1 : 0.86),
                                                        overflowWrap: 'break-word',
                                                        wordBreak: 'break-word',
                                                    }}
                                                >
                                                    {cell}
                                                </div>
                                            ))}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* 底部图例点缀 */}
                        <div className="mt-4 flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--primary-color,#0891b2)" }} />
                                <span
                                    className="text-xs leading-relaxed break-words"
                                    style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.66, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    数据仅供参考，最终以实际行程为准
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                                <span
                                    className="text-xs leading-relaxed break-words"
                                    style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.66, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    暖阳橙列为重点推荐项
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
