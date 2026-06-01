import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'finance-cn-three-points'
export const layoutName = '三栏要点'
export const layoutDescription = '金融投资风三栏要点页：深藏青底叠数据网格与增长曲线，三等分列以香槟金棱形托起图标，配衬线大标题与无衬线正文。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('三大投资优势').meta({
        description: "页面主标题（中文，简短有力，体现金融投资主题）",
    }),
    points: z.array(z.object({
        icon: IconSchema.meta({ description: "要点图标，使用 phosphor 图标" }),
        title: z.string().min(2).max(12).meta({ description: "要点小标题（中文，精炼）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点描述（一句话说明）" }),
    })).min(3).max(3).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'growth chart',
            },
            title: '稳健增长',
            desc: '组合年化收益穿越周期，长期复利稳步累积资产价值。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
                __icon_query__: 'risk shield',
            },
            title: '风险可控',
            desc: '多资产分散配置叠加严格风控，有效平抑市场波动回撤。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/coins-bold.svg',
                __icon_query__: 'liquidity coins',
            },
            title: '流动充裕',
            desc: '资产高度流动随时申赎，灵活把握市场结构性机会。',
        },
    ]).meta({ description: "三个要点，每项含图标、小标题与描述" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ThreePoints: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '三大投资优势'
    const points = (slideData?.points && slideData.points.length === 3)
        ? slideData.points
        : [
            {
                icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg', __icon_query__: 'growth chart' },
                title: '稳健增长',
                desc: '组合年化收益穿越周期，长期复利稳步累积资产价值。',
            },
            {
                icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg', __icon_query__: 'risk shield' },
                title: '风险可控',
                desc: '多资产分散配置叠加严格风控，有效平抑市场波动回撤。',
            },
            {
                icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/coins-bold.svg', __icon_query__: 'liquidity coins' },
                title: '流动充裕',
                desc: '资产高度流动随时申赎，灵活把握市场结构性机会。',
            },
        ]

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@600;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：数据网格 + 增长曲线 + 细金线 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="finTpVignette" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.55" />
                            <stop offset="55%" stopColor="#0f172a" stopOpacity="0" />
                            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.65" />
                        </linearGradient>
                        <linearGradient id="finTpGold" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="finTpCurve" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.0" />
                            <stop offset="100%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.35" />
                        </linearGradient>
                        <pattern id="finTpGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 H0 V40" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.35" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {/* 数据网格 */}
                    <rect width="1280" height="720" fill="url(#finTpGrid)" />
                    <rect width="1280" height="720" fill="url(#finTpVignette)" />
                    {/* 增长曲线（面积） */}
                    <path d="M0 600 C 220 560, 360 470, 560 430 S 940 320, 1280 200 L 1280 720 L 0 720 Z" fill="url(#finTpCurve)" />
                    {/* 增长曲线（描边） */}
                    <path d="M0 600 C 220 560, 360 470, 560 430 S 940 320, 1280 200" fill="none" stroke="var(--secondary-color,#60a5fa)" strokeOpacity="0.5" strokeWidth="2" />
                    {/* 顶部细金线 */}
                    <rect x="0" y="0" width="1280" height="3" fill="url(#finTpGold)" />
                </svg>

                {/* 右上角棱形装饰母题 */}
                <div className="absolute top-0 right-0" aria-hidden="true">
                    <svg viewBox="0 0 220 220" className="h-44 w-44" preserveAspectRatio="xMidYMid meet">
                        {[0, 1, 2].map((i) => (
                            <rect
                                key={i}
                                x={150 - i * 26} y={20 + i * 26} width={36} height={36}
                                transform={`rotate(45 ${168 - i * 26} ${38 + i * 26})`}
                                fill="none" stroke="var(--primary-color,#d4af37)" strokeOpacity={0.45 - i * 0.1} strokeWidth="1.4"
                            />
                        ))}
                    </svg>
                </div>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col items-start">
                        <span
                            className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase break-words"
                            style={{ color: "var(--primary-color,#d4af37)", letterSpacing: '0.18em', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            <span className="inline-block h-[1px] w-7" style={{ background: "var(--primary-color,#d4af37)" }} />
                            INVESTMENT
                        </span>
                        <h1
                            className="text-5xl font-bold leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#e2e8f0)",
                                fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        <div className="mt-5 h-[2px] w-20 rounded-full" style={{ background: "var(--primary-color,#d4af37)" }} />
                    </div>

                    {/* 三等分列 */}
                    <div className="mt-10 grid flex-1 grid-cols-3 items-stretch gap-8">
                        {points.map((p, i) => (
                            <div
                                key={i}
                                className="flex flex-col rounded-2xl border p-7"
                                style={{
                                    background: "var(--card-color,#1e293b)",
                                    borderColor: "var(--stroke,#334155)",
                                    boxShadow: '0 10px 30px rgba(2,6,23,0.45)',
                                }}
                            >
                                {/* 棱形图标托 */}
                                <div className="flex items-center justify-between">
                                    <div className="relative flex h-16 w-16 items-center justify-center">
                                        <span
                                            className="absolute inset-0"
                                            style={{
                                                background: "var(--primary-color,#d4af37)",
                                                opacity: 0.14,
                                                transform: 'rotate(45deg)',
                                                borderRadius: '14px',
                                            }}
                                        />
                                        <span
                                            className="absolute inset-1.5"
                                            style={{
                                                border: '1.4px solid var(--primary-color,#d4af37)',
                                                opacity: 0.6,
                                                transform: 'rotate(45deg)',
                                                borderRadius: '12px',
                                            }}
                                        />
                                        <RemoteSvgIcon
                                            url={p.icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-color,#d4af37)"
                                            className="w-7 h-7"
                                            title={p.icon?.__icon_query__}
                                        />
                                    </div>
                                    <span
                                        className="text-4xl font-bold leading-none"
                                        style={{ color: "var(--stroke,#334155)", fontFamily: "var(--heading-font-family,'Noto Serif SC')", opacity: 0.85 }}
                                    >
                                        0{i + 1}
                                    </span>
                                </div>

                                <h3
                                    className="mt-6 text-2xl font-bold leading-[1.3] break-words"
                                    style={{
                                        color: "var(--primary-text,#ffffff)",
                                        fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {p.title}
                                </h3>

                                <div className="mt-3 h-[1px] w-10" style={{ background: "var(--primary-color,#d4af37)", opacity: 0.7 }} />

                                <p
                                    className="mt-4 text-base leading-[1.7] break-words"
                                    style={{
                                        color: "var(--background-text,#e2e8f0)",
                                        opacity: 0.82,
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {p.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThreePoints
