import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'finance-cn-icon-list'
export const layoutName = '图标要点列表'
export const layoutDescription = '金融投资风图标要点列表：深藏青底 + 香槟金细线 + 衬线大标题，左图标右文字竖向排布 4-6 条要点。纯 CSS/SVG 装饰，离线可渲染。'

const ICON_BASE = 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold'

const schema = z.object({
    title: z.string().min(2).max(20).default('稳健投资的四项原则').meta({
        description: "版式主标题（中文，简短有力）",
    }),
    items: z.array(z.object({
        icon: IconSchema.default({
            __icon_url__: `${ICON_BASE}/chart-line-up-bold.svg`,
            __icon_query__: 'growth chart',
        }).meta({ description: "要点图标" }),
        title: z.string().min(2).max(14).default('长期价值').meta({
            description: "要点标题（极简，4-7字为宜）",
        }),
        desc: z.string().min(4).max(40).default('聚焦企业内在价值，穿越周期分享复利增长。').meta({
            description: "要点说明（一句话，简明）",
        }),
    })).min(4).max(6).default([
        {
            icon: { __icon_url__: `${ICON_BASE}/chart-line-up-bold.svg`, __icon_query__: 'growth chart' },
            title: '长期价值',
            desc: '聚焦企业内在价值，穿越周期分享复利增长。',
        },
        {
            icon: { __icon_url__: `${ICON_BASE}/shield-check-bold.svg`, __icon_query__: 'risk shield' },
            title: '风险控制',
            desc: '设定安全边际，严守仓位纪律，控制最大回撤。',
        },
        {
            icon: { __icon_url__: `${ICON_BASE}/chart-pie-slice-bold.svg`, __icon_query__: 'portfolio allocation' },
            title: '分散配置',
            desc: '跨资产、跨地域均衡布局，降低组合波动率。',
        },
        {
            icon: { __icon_url__: `${ICON_BASE}/scales-bold.svg`, __icon_query__: 'valuation balance' },
            title: '估值纪律',
            desc: '逆向布局，低估买入高估卖出，杜绝追涨杀跌。',
        },
    ]).meta({ description: "图标要点列表（4-6 条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DEFAULT_ITEMS: SlideData['items'] = [
    {
        icon: { __icon_url__: `${ICON_BASE}/chart-line-up-bold.svg`, __icon_query__: 'growth chart' },
        title: '长期价值',
        desc: '聚焦企业内在价值，穿越周期分享复利增长。',
    },
    {
        icon: { __icon_url__: `${ICON_BASE}/shield-check-bold.svg`, __icon_query__: 'risk shield' },
        title: '风险控制',
        desc: '设定安全边际，严守仓位纪律，控制最大回撤。',
    },
    {
        icon: { __icon_url__: `${ICON_BASE}/chart-pie-slice-bold.svg`, __icon_query__: 'portfolio allocation' },
        title: '分散配置',
        desc: '跨资产、跨地域均衡布局，降低组合波动率。',
    },
    {
        icon: { __icon_url__: `${ICON_BASE}/scales-bold.svg`, __icon_query__: 'valuation balance' },
        title: '估值纪律',
        desc: '逆向布局，低估买入高估卖出，杜绝追涨杀跌。',
    },
]

const IconList: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '稳健投资的四项原则'
    const items = (slideData?.items && slideData.items.length > 0 ? slideData.items : DEFAULT_ITEMS).slice(0, 6)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;600;700;900&family=Noto+Sans+SC:wght@400;500;700&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：数据网格 + 增长曲线 + 棱形 + 细金线 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="finIconGold" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="finIconCurve" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.5" />
                        </linearGradient>
                        <pattern id="finIconGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.45" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {/* 数据网格底纹 */}
                    <rect width="1280" height="720" fill="url(#finIconGrid)" />
                    {/* 右上角金色光晕 */}
                    <circle cx="1160" cy="-40" r="320" fill="url(#finIconGold)" />
                    {/* 增长曲线 */}
                    <path
                        d="M-20 600 L180 560 L360 500 L540 440 L720 380 L900 300 L1080 220 L1300 120"
                        fill="none"
                        stroke="url(#finIconCurve)"
                        strokeWidth="2"
                        strokeOpacity="0.7"
                    />
                    {[180, 360, 540, 720, 900, 1080].map((x, i) => (
                        <circle key={i} cx={x} cy={560 - i * 60} r="3.5" fill="var(--primary-color,#d4af37)" fillOpacity="0.85" />
                    ))}
                    {/* 棱形母题 */}
                    <rect x="92" y="92" width="26" height="26" transform="rotate(45 105 105)" fill="none" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.5" strokeWidth="1.5" />
                    <rect x="1150" y="640" width="18" height="18" transform="rotate(45 1159 649)" fill="var(--secondary-color,#60a5fa)" fillOpacity="0.35" />
                </svg>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <span
                                className="inline-block h-3 w-3 rotate-45"
                                style={{ background: "var(--primary-color,#d4af37)" }}
                            />
                            <span
                                className="text-sm font-medium tracking-wide break-words"
                                style={{ color: "var(--secondary-color,#60a5fa)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                INVESTMENT PRINCIPLES · 投资原则
                            </span>
                        </div>
                        <h1
                            className="mt-4 text-5xl font-bold leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#e2e8f0)",
                                fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        <div className="mt-5 flex items-center gap-3">
                            <div className="h-px w-20" style={{ background: "var(--primary-color,#d4af37)" }} />
                            <div className="h-px flex-1" style={{ background: "var(--stroke,#334155)" }} />
                        </div>
                    </div>

                    {/* 要点列表区：竖向自适应分布 */}
                    <div className="mt-8 flex min-h-0 flex-1 flex-col justify-center gap-5">
                        {items.map((item, i) => {
                            const iconUrl = item?.icon?.__icon_url__ || `${ICON_BASE}/chart-line-up-bold.svg`
                            const iconQuery = item?.icon?.__icon_query__ || 'finance icon'
                            const itemTitle = item?.title || '投资原则'
                            const itemDesc = item?.desc || ''
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-5 rounded-xl border px-6 py-4"
                                    style={{
                                        background: "var(--card-color,#1e293b)",
                                        borderColor: "var(--stroke,#334155)",
                                    }}
                                >
                                    {/* 序号金线 */}
                                    <span
                                        className="flex-shrink-0 text-sm font-bold leading-none"
                                        style={{ color: "var(--primary-color,#d4af37)", fontFamily: "var(--heading-font-family,'Noto Serif SC')" }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    {/* 图标棱形底座 */}
                                    <div
                                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg"
                                        style={{
                                            background: "rgba(212,175,55,0.12)",
                                            border: "1px solid var(--stroke,#334155)",
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={iconUrl}
                                            strokeColor="currentColor"
                                            color="var(--primary-color,#d4af37)"
                                            className="w-6 h-6"
                                            title={iconQuery}
                                        />
                                    </div>
                                    {/* 文字 */}
                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <span
                                            className="text-xl font-bold leading-[1.6] break-words"
                                            style={{
                                                color: "var(--background-text,#e2e8f0)",
                                                fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                                overflowWrap: 'break-word',
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            {itemTitle}
                                        </span>
                                        {itemDesc && (
                                            <span
                                                className="mt-1 text-sm leading-relaxed break-words"
                                                style={{
                                                    color: "var(--background-text,#94a3b8)",
                                                    overflowWrap: 'break-word',
                                                    wordBreak: 'break-word',
                                                }}
                                            >
                                                {itemDesc}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default IconList
