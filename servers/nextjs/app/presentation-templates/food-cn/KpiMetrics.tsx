import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'food-cn-kpi-metrics'
export const layoutName = '核心数据'
export const layoutDescription = '美食餐饮风核心数据页：暖米底 + 食欲橙红，3-4 个圆盘构图大数字 KPI，焦糖金描边与餐具点缀。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('门店经营关键指标').meta({
        description: "数据页主标题（中文，简短有力，≤20字）",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(8).meta({
            description: "核心数值，如 98%、4.9分、35万",
        }),
        label: z.string().min(2).max(16).meta({
            description: "指标名称，如『顾客满意度』",
        }),
        desc: z.string().max(30).optional().meta({
            description: "指标补充说明（可选，≤30字）",
        }),
        icon: IconSchema.optional().meta({
            description: "指标配图标（可选）",
        }),
    })).min(3).max(4).default([
        {
            value: '4.9',
            label: '大众点评评分',
            desc: '连续三年蝉联区域美食榜首位',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/star-bold.svg',
                __icon_query__: 'star rating',
            },
        },
        {
            value: '12万+',
            label: '年度到店食客',
            desc: '日均接待逾三百桌宾客',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg',
                __icon_query__: 'fork and knife dining',
            },
        },
        {
            value: '98%',
            label: '复购回头率',
            desc: '老顾客口碑相传持续增长',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg',
                __icon_query__: 'heart loyalty',
            },
        },
        {
            value: '36道',
            label: '招牌主厨菜品',
            desc: '当季时令食材每日现采现做',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cooking-pot-bold.svg',
                __icon_query__: 'cooking pot signature dish',
            },
        },
    ]).meta({ description: "3-4 个核心数据指标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const KpiMetrics: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '门店经营关键指标'
    const metrics = (slideData?.metrics && slideData.metrics.length > 0)
        ? slideData.metrics
        : [
            { value: '4.9', label: '大众点评评分', desc: '连续三年蝉联区域美食榜首位' },
            { value: '12万+', label: '年度到店食客', desc: '日均接待逾三百桌宾客' },
            { value: '98%', label: '复购回头率', desc: '老顾客口碑相传持续增长' },
            { value: '36道', label: '招牌主厨菜品', desc: '当季时令食材每日现采现做' },
        ]

    const count = metrics.length
    const colsClass = count >= 4 ? 'grid-cols-4' : count === 3 ? 'grid-cols-3' : 'grid-cols-2'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#fdf6ec)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：暖色光晕 + 圆盘构图 + 餐具点缀 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    {/* 左上暖橙光晕 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-160px', left: '-120px', width: '420px', height: '420px', borderRadius: '9999px',
                            background: "radial-gradient(circle, rgba(232,89,12,0.16) 0%, rgba(232,89,12,0) 70%)",
                        }}
                    />
                    {/* 右下焦糖红光晕 */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '-180px', right: '-140px', width: '460px', height: '460px', borderRadius: '9999px',
                            background: "radial-gradient(circle, rgba(201,42,42,0.12) 0%, rgba(201,42,42,0) 70%)",
                        }}
                    />
                    {/* 右上同心圆盘（焦糖金描边） */}
                    <svg viewBox="0 0 460 460" className="absolute" style={{ top: '-150px', right: '-120px', width: '460px', height: '460px' }}>
                        {[0, 1, 2, 3].map((i) => (
                            <circle
                                key={i}
                                cx="300" cy="160" r={60 + i * 46}
                                fill="none"
                                stroke="var(--primary-color,#e8590c)"
                                strokeOpacity={0.12}
                                strokeWidth="2"
                            />
                        ))}
                    </svg>
                    {/* 左下餐具点缀：叉子与勺子（圆盘 + 简笔） */}
                    <svg viewBox="0 0 120 120" className="absolute" style={{ bottom: '24px', left: '36px', width: '120px', height: '120px' }}>
                        <circle cx="60" cy="60" r="48" fill="none" stroke="var(--secondary-color,#c92a2a)" strokeOpacity="0.14" strokeWidth="2" />
                        <circle cx="60" cy="60" r="34" fill="none" stroke="var(--secondary-color,#c92a2a)" strokeOpacity="0.10" strokeWidth="2" />
                        <g stroke="var(--primary-color,#e8590c)" strokeOpacity="0.22" strokeWidth="3" strokeLinecap="round" fill="none">
                            <line x1="48" y1="40" x2="48" y2="80" />
                            <line x1="44" y1="40" x2="44" y2="52" />
                            <line x1="52" y1="40" x2="52" y2="52" />
                            <line x1="72" y1="40" x2="72" y2="80" />
                            <path d="M68 40 q4 14 4 20" />
                        </g>
                    </svg>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="mb-10 flex flex-col items-center text-center">
                        <span
                            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold break-words"
                            style={{
                                color: "var(--secondary-color,#c92a2a)",
                                background: "rgba(201,42,42,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span style={{ width: '8px', height: '8px', borderRadius: '9999px', background: "var(--primary-color,#e8590c)" }} />
                            匠心好味 · 数据见证
                        </span>
                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-5 h-1.5 w-24 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))" }}
                        />
                    </div>

                    {/* KPI 卡片网格 */}
                    <div className={`grid ${colsClass} gap-7`}>
                        {metrics.map((m, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center rounded-3xl border px-5 py-8 text-center shadow-sm"
                                style={{
                                    background: "var(--card-color,#fffaf2)",
                                    borderColor: "var(--stroke,#f0e0cc)",
                                }}
                            >
                                {/* 圆盘图标（焦糖金描边） */}
                                <div
                                    className="mb-5 flex items-center justify-center rounded-full"
                                    style={{
                                        width: '60px', height: '60px',
                                        background: "linear-gradient(135deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))",
                                        boxShadow: '0 6px 16px rgba(232,89,12,0.28)',
                                    }}
                                >
                                    {m?.icon?.__icon_url__ ? (
                                        <RemoteSvgIcon
                                            url={m.icon.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-7 h-7"
                                            title={m.icon.__icon_query__ || m?.label || 'icon'}
                                        />
                                    ) : (
                                        <span
                                            className="text-2xl font-black"
                                            style={{ color: "var(--primary-text,#ffffff)" }}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                    )}
                                </div>

                                {/* 超大数值 */}
                                <div
                                    className="text-6xl font-black leading-[1.05] break-words"
                                    style={{ color: "var(--primary-color,#e8590c)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {m?.value || '—'}
                                </div>

                                {/* 标签 */}
                                <div
                                    className="mt-3 text-lg font-bold leading-[1.6] break-words"
                                    style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {m?.label || ''}
                                </div>

                                {/* 描述（可选） */}
                                {m?.desc && (
                                    <p
                                        className="mt-2 text-sm leading-[1.7] break-words"
                                        style={{ color: "var(--background-text,#3b2412)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m.desc}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default KpiMetrics
