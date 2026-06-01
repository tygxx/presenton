import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'manufacturing-cn-icon-list'
export const layoutName = '图标要点列表'
export const layoutDescription = '智能制造风图标要点列表：工业深灰底 + 精密网格 + 齿轮母题，竖向 4-6 条左图标右文字的硬朗列表行。纯 CSS/SVG 装饰，离线可渲染。'

const iconUrl = (name: string) =>
    `https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${name}-bold.svg`

const schema = z.object({
    title: z.string().min(2).max(20).default('智能产线四大核心能力').meta({
        description: "版式主标题（中文，简短有力）",
    }),
    items: z.array(z.object({
        icon: IconSchema.meta({ description: "要点图标" }),
        title: z.string().min(2).max(14).meta({ description: "要点标题（精炼名词短语）" }),
        desc: z.string().min(2).max(40).meta({ description: "要点说明（一句话补充）" }),
    })).min(4).max(6).default([
        {
            icon: { __icon_url__: iconUrl('gear'), __icon_query__: 'gear automation' },
            title: '柔性自动化',
            desc: '模块化产线快速换型，单线兼容多品类混流生产。',
        },
        {
            icon: { __icon_url__: iconUrl('cpu'), __icon_query__: 'industrial cpu control' },
            title: '边缘控制',
            desc: '设备级毫秒响应，工序节拍精准协同零等待。',
        },
        {
            icon: { __icon_url__: iconUrl('chart-line-up'), __icon_query__: 'production data analytics' },
            title: '数据驱动',
            desc: '全工序数据采集，实时看板量化每一道工艺。',
        },
        {
            icon: { __icon_url__: iconUrl('shield-check'), __icon_query__: 'quality inspection' },
            title: '在线质检',
            desc: '机器视觉逐件检测，缺陷拦截率提升至九成九。',
        },
        {
            icon: { __icon_url__: iconUrl('lightning'), __icon_query__: 'energy efficiency' },
            title: '能效优化',
            desc: '能耗精细管控，单位产值电耗同比下降一成八。',
        },
    ]).meta({ description: "图标要点列表（4-6 条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const IconList: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '智能产线四大核心能力'
    const items = (slideData?.items && slideData.items.length > 0
        ? slideData.items
        : []) as NonNullable<SlideData['items']>

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#1f2937)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：精密网格 + 金属质感线条 + 齿轮母题 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern id="mfgGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0H0V48" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.35" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="mfgMetal" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.06" />
                        </linearGradient>
                        <radialGradient id="mfgGlow" cx="0.85" cy="0.12" r="0.6">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 精密网格底纹 */}
                    <rect width="1280" height="720" fill="url(#mfgGrid)" />
                    <rect width="1280" height="720" fill="url(#mfgMetal)" />
                    <rect width="1280" height="720" fill="url(#mfgGlow)" />
                    {/* 硬朗对角线（产线导轨母题） */}
                    <line x1="-40" y1="120" x2="1320" y2="-60" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.12" strokeWidth="1.5" />
                    <line x1="-40" y1="780" x2="1320" y2="600" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.10" strokeWidth="1.5" />
                    {/* 右下角齿轮母题 */}
                    <g transform="translate(1140 612)" fill="none" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.16" strokeWidth="2">
                        <circle r="74" />
                        <circle r="42" />
                        {Array.from({ length: 12 }).map((_, i) => {
                            const a = (i * Math.PI) / 6
                            const x1 = Math.cos(a) * 74
                            const y1 = Math.sin(a) * 74
                            const x2 = Math.cos(a) * 92
                            const y2 = Math.sin(a) * 92
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                        })}
                    </g>
                </svg>

                {/* 顶部蓝橙强调条 */}
                <div
                    className="absolute top-0 left-0 h-1.5 w-full"
                    style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6) 0%, var(--secondary-color,#f97316) 100%)" }}
                />

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <div className="flex items-center gap-3">
                            <span
                                className="inline-block h-7 w-1.5 rounded-sm"
                                style={{ background: "var(--secondary-color,#f97316)" }}
                            />
                            <span
                                className="text-sm font-semibold uppercase break-words"
                                style={{ color: "var(--primary-color,#3b82f6)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                SMART MANUFACTURING
                            </span>
                        </div>
                        <h1
                            className="mt-3 text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-5 h-px w-full"
                            style={{ background: "var(--stroke,#374151)" }}
                        />
                    </div>

                    {/* 列表区：竖向左图标右文字 */}
                    <div className="mt-6 flex flex-1 flex-col justify-center gap-4">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-5 rounded-xl border px-6 py-4"
                                style={{
                                    background: "var(--card-color,#111827)",
                                    borderColor: "var(--stroke,#374151)",
                                }}
                            >
                                {/* 序号 + 图标 */}
                                <div className="flex flex-shrink-0 items-center gap-4">
                                    <span
                                        className="text-base font-black tabular-nums"
                                        style={{ color: "var(--secondary-color,#f97316)" }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div
                                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border"
                                        style={{
                                            background: "linear-gradient(135deg, var(--primary-color,#3b82f6) 0%, rgba(59,130,246,0.55) 100%)",
                                            borderColor: "var(--stroke,#374151)",
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={item?.icon?.__icon_url__ || iconUrl('gear')}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-6 h-6"
                                            title={item?.icon?.__icon_query__ || 'manufacturing icon'}
                                        />
                                    </div>
                                </div>

                                {/* 文字 */}
                                <div className="flex min-w-0 flex-1 flex-col">
                                    <span
                                        className="text-lg font-bold leading-[1.3] break-words"
                                        style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {item?.title || '核心能力'}
                                    </span>
                                    <span
                                        className="mt-1 text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#9ca3af)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {item?.desc || '一句话补充说明。'}
                                    </span>
                                </div>

                                {/* 右侧硬朗刻度装饰 */}
                                <div className="hidden flex-shrink-0 items-center gap-1 lg:flex">
                                    {[0, 1, 2].map((d) => (
                                        <span
                                            key={d}
                                            className="inline-block w-1 rounded-full"
                                            style={{
                                                height: `${10 + d * 6}px`,
                                                background: d === 2 ? "var(--secondary-color,#f97316)" : "var(--primary-color,#3b82f6)",
                                                opacity: d === 2 ? 1 : 0.4 + d * 0.2,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default IconList
