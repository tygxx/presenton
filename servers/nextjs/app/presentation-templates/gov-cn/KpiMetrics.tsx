import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'gov-cn-kpi-metrics'
export const layoutName = '核心数据'
export const layoutDescription = '党政政务风核心数据页：米白底 + 中国红 + 烫金细线，居中对称标题与华表纹样、五角星点缀，3-4 个超大字重 KPI 数值卡片，配标签与说明。纯 CSS/SVG 装饰，离线可渲染。'

const defaultMetrics = [
    {
        value: '12.6万亿',
        label: '地区生产总值',
        desc: '同比增长百分之五点八，经济运行稳中向好。',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
            __icon_query__: 'economic growth',
        },
    },
    {
        value: '98.6%',
        label: '民生实事完成率',
        desc: '年度民生项目全面落地，群众满意度持续提升。',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg',
            __icon_query__: 'public welfare',
        },
    },
    {
        value: '1280万',
        label: '新增城镇就业',
        desc: '稳就业政策落实有力，重点群体就业有保障。',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
            __icon_query__: 'employment people',
        },
    },
    {
        value: '85.3%',
        label: '群众满意度',
        desc: '政务服务效能稳步提高，营商环境持续优化。',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
            __icon_query__: 'satisfaction trust',
        },
    },
]

const schema = z.object({
    title: z.string().min(2).max(20).default('核心发展指标').meta({
        description: "幻灯片居中主标题（中文，庄重简短）",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(8).meta({
            description: "核心数据数值，超大字重显示，如 12.6万亿、98.6%、1280万",
        }),
        label: z.string().min(2).max(16).meta({
            description: "数据标签/名称（中文，简短）",
        }),
        desc: z.string().min(2).max(30).optional().meta({
            description: "数据补充说明（一句话，可选）",
        }),
        icon: IconSchema.optional().meta({
            description: "数据配图标（phosphor 图标，可选）",
        }),
    })).min(3).max(4).default(defaultMetrics).meta({
        description: "核心数据指标，3 至 4 项大数字 KPI",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const KpiMetrics: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '核心发展指标'
    const metrics = (slideData?.metrics && slideData.metrics.length > 0)
        ? slideData.metrics.slice(0, 4)
        : defaultMetrics

    const count = metrics.length
    // 3 项时三等分，4 项时四等分，均居中对称
    const gridColsClass = count >= 4 ? 'grid-cols-4' : 'grid-cols-3'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#faf7f2)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景对称装饰层：华表纹样 + 烫金细线 + 五角星点缀 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    {/* 顶部中国红色带 */}
                    <div
                        className="absolute left-0 top-0 h-[10px] w-full"
                        style={{
                            background: "linear-gradient(90deg, var(--primary-color,#c1121f), rgba(193,18,31,0.78))",
                        }}
                    />
                    {/* 顶部居中烫金光晕 */}
                    <div
                        className="absolute left-1/2 top-0"
                        style={{
                            width: '620px', height: '340px', transform: 'translate(-50%,-50%)',
                            background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.12), transparent 70%)',
                        }}
                    />
                    {/* 左右对称华表立柱 + 底部纹样横线 */}
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="govKpiGold" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#b8860b" stopOpacity="0" />
                                <stop offset="50%" stopColor="#b8860b" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="govKpiCorner" cx="0%" cy="100%" r="70%">
                                <stop offset="0%" stopColor="#b8860b" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 左右对称竖向烫金细线（华表立柱意象） */}
                        <line x1="56" y1="48" x2="56" y2="672" stroke="url(#govKpiGold)" strokeWidth="2" />
                        <line x1="1224" y1="48" x2="1224" y2="672" stroke="url(#govKpiGold)" strokeWidth="2" />
                        {/* 左右对称同心圆纹样（华表纹样意象） */}
                        {[0, 1, 2].map((i) => (
                            <circle key={`l${i}`} cx="-20" cy="640" r={110 + i * 70} fill="none" stroke="#b8860b" strokeOpacity={0.07} strokeWidth="1.2" />
                        ))}
                        {[0, 1, 2].map((i) => (
                            <circle key={`r${i}`} cx="1300" cy="640" r={110 + i * 70} fill="none" stroke="#b8860b" strokeOpacity={0.07} strokeWidth="1.2" />
                        ))}
                        {/* 底部对称纹样横线 */}
                        <line x1="56" y1="672" x2="1224" y2="672" stroke="#b8860b" strokeOpacity="0.16" strokeWidth="1" />
                    </svg>
                    {/* 四角烫金细线角标（对称） */}
                    <div className="absolute left-6 top-7 h-9 w-9 border-l-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.55 }} />
                    <div className="absolute right-6 top-7 h-9 w-9 border-r-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.55 }} />
                    <div className="absolute bottom-7 left-6 h-9 w-9 border-b-2 border-l-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.55 }} />
                    <div className="absolute bottom-7 right-6 h-9 w-9 border-b-2 border-r-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.55 }} />
                </div>

                {/* 内容主体：居中对称 */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-16 py-12">
                    {/* 居中对称标题区 */}
                    <div className="flex w-full flex-col items-center">
                        {/* 标题上方对称烫金细线 + 五角星 */}
                        <div className="mb-4 flex items-center gap-3" aria-hidden="true">
                            <span className="block h-px w-16" style={{ background: "var(--secondary-color,#b8860b)" }} />
                            <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }} fill="var(--primary-color,#c1121f)">
                                <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
                            </svg>
                            <span className="block h-px w-16" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        </div>
                        <h1
                            className="text-center text-5xl font-black leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", letterSpacing: '0.04em', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        {/* 标题下方对称双色短线 */}
                        <div className="mt-5 flex items-center gap-2" aria-hidden="true">
                            <span className="block h-1 w-10 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} />
                            <span className="block h-1 w-20 rounded-full" style={{ background: "var(--primary-color,#c1121f)" }} />
                            <span className="block h-1 w-10 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        </div>
                    </div>

                    {/* KPI 数值卡片：3 或 4 等分，居中对称 */}
                    <div className={`mt-12 grid w-full ${gridColsClass} gap-7`}>
                        {metrics.map((m, i) => {
                            const value = m?.value || '—'
                            const label = m?.label || ''
                            const desc = m?.desc || ''
                            const iconUrl = m?.icon?.__icon_url__
                            const iconQuery = m?.icon?.__icon_query__
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center rounded-xl border px-5 py-7 text-center"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#e8dcc8)",
                                        boxShadow: '0 8px 24px rgba(193,18,31,0.06)',
                                    }}
                                >
                                    {/* 顶部图标徽章（可选）：中国红圆底 + 烫金描边环 */}
                                    {iconUrl ? (
                                        <div
                                            className="mb-4 flex items-center justify-center rounded-full"
                                            style={{
                                                width: '52px', height: '52px',
                                                background: "var(--primary-color,#c1121f)",
                                                boxShadow: '0 0 0 4px rgba(184,134,11,0.22)',
                                            }}
                                        >
                                            <RemoteSvgIcon
                                                url={iconUrl}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-6 h-6"
                                                title={iconQuery}
                                            />
                                        </div>
                                    ) : (
                                        <span className="mb-3 text-xs font-bold" style={{ color: "var(--secondary-color,#b8860b)", letterSpacing: '0.16em' }}>
                                            {`0${i + 1}`}
                                        </span>
                                    )}

                                    {/* 超大字重数值 */}
                                    <span
                                        className="block text-6xl font-black leading-[1.05] break-words"
                                        style={{ color: "var(--primary-color,#c1121f)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {value}
                                    </span>

                                    {/* 数值下烫金短线 */}
                                    <span className="my-4 block h-1 w-12 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} aria-hidden="true" />

                                    {/* 标签 */}
                                    <span
                                        className="text-lg font-bold leading-[1.6] break-words"
                                        style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {label}
                                    </span>

                                    {/* 说明（可选） */}
                                    {desc ? (
                                        <p
                                            className="mt-2 text-sm leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {desc}
                                        </p>
                                    ) : null}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default KpiMetrics
