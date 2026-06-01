import React from 'react'
import * as z from "zod";

export const layoutId = 'realestate-cn-toc'
export const layoutName = '目录'
export const layoutDescription = '房产建筑风目录页：编号大字 + 分节标题 + 细线分隔。高级灰底配金铜点缀，极简线条与建筑剪影装饰，超大留白。纯 CSS/SVG，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(1).max(16).default('目录').meta({
        description: "目录页标题，默认『目录』",
    }),
    items: z.array(z.object({
        heading: z.string().min(1).max(16).meta({
            description: "分节标题（中文，简短）",
        }),
        desc: z.string().max(28).optional().meta({
            description: "分节简短说明（可选）",
        }),
    })).min(3).max(6).default([
        { heading: '项目概览', desc: '区位价值与整体定位' },
        { heading: '建筑规划', desc: '空间布局与立面设计' },
        { heading: '园林景观', desc: '绿化体系与公共空间' },
        { heading: '户型解析', desc: '主力户型与功能动线' },
        { heading: '配套服务', desc: '商业教育与智慧物业' },
        { heading: '投资前景', desc: '价值增长与交付计划' },
    ]).meta({ description: "目录条目，编号自动生成 01/02…" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TableOfContents: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '目录'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : [
            { heading: '项目概览', desc: '区位价值与整体定位' },
            { heading: '建筑规划', desc: '空间布局与立面设计' },
            { heading: '园林景观', desc: '绿化体系与公共空间' },
            { heading: '户型解析', desc: '主力户型与功能动线' },
            { heading: '配套服务', desc: '商业教育与智慧物业' },
            { heading: '投资前景', desc: '价值增长与交付计划' },
        ]

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
                {/* 背景装饰层：建筑剪影 + 极简线条 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="tocSkyline" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.07" />
                            <stop offset="100%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* 右下角建筑剪影 */}
                    <g fill="url(#tocSkyline)">
                        <rect x="1000" y="430" width="58" height="290" />
                        <rect x="1066" y="500" width="44" height="220" />
                        <rect x="1118" y="370" width="64" height="350" />
                        <rect x="1190" y="470" width="48" height="250" />
                    </g>
                    <g stroke="var(--secondary-color,#3f3f46)" strokeOpacity="0.10" strokeWidth="1">
                        <line x1="1000" y1="430" x2="1058" y2="430" />
                        <line x1="1118" y1="370" x2="1182" y2="370" />
                        <line x1="1118" y1="430" x2="1182" y2="430" />
                        <line x1="1118" y1="490" x2="1182" y2="490" />
                    </g>
                    {/* 顶部细分割线 */}
                    <line x1="80" y1="118" x2="1200" y2="118" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                </svg>

                {/* 左上角金铜短线点缀 */}
                <div
                    className="absolute"
                    style={{
                        top: '96px', left: '80px', width: '48px', height: '3px',
                        background: "var(--primary-color,#b08d57)",
                    }}
                />

                {/* 内容区 */}
                <div className="relative z-10 flex h-full flex-col px-20 py-14">
                    {/* 标题区 */}
                    <div className="flex items-end justify-between pb-9">
                        <div className="flex flex-col">
                            <span
                                className="text-xs font-light tracking-[0.4em] break-words"
                                style={{ color: "var(--primary-color,#b08d57)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                CONTENTS
                            </span>
                            <h1
                                className="mt-2 text-5xl font-light leading-[1.2] break-words"
                                style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                        <span
                            className="text-sm font-light leading-relaxed break-words"
                            style={{ color: "var(--secondary-color,#3f3f46)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            房产建筑 · 项目导览
                        </span>
                    </div>

                    {/* 条目网格 */}
                    <div className="grid flex-1 grid-cols-2 gap-x-16 gap-y-6 content-center">
                        {items.map((item, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            return (
                                <div key={i} className="flex items-start gap-6 py-1">
                                    {/* 编号大字 */}
                                    <span
                                        className="flex-shrink-0 text-5xl font-light leading-none"
                                        style={{ color: "var(--primary-color,#b08d57)" }}
                                    >
                                        {num}
                                    </span>
                                    {/* 金铜细竖线分隔 */}
                                    <span
                                        className="mt-1 flex-shrink-0 self-stretch"
                                        style={{ width: '1px', background: "var(--stroke,#e4e4e7)" }}
                                    />
                                    {/* 分节标题 + 说明 */}
                                    <div className="flex min-w-0 flex-col">
                                        <span
                                            className="text-xl font-medium leading-[1.35] break-words"
                                            style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.heading || '分节标题'}
                                        </span>
                                        {item?.desc ? (
                                            <span
                                                className="mt-1.5 text-sm font-light leading-relaxed break-words"
                                                style={{ color: "var(--secondary-color,#3f3f46)", opacity: 0.75, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {item.desc}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* 底部细分割线 + 页脚点缀 */}
                    <div className="flex items-center gap-4 pt-6">
                        <div className="h-px flex-1" style={{ background: "var(--stroke,#e4e4e7)" }} />
                        <span
                            className="flex-shrink-0 text-xs font-light tracking-[0.3em] break-words"
                            style={{ color: "var(--secondary-color,#3f3f46)", opacity: 0.55, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            REAL ESTATE
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableOfContents
