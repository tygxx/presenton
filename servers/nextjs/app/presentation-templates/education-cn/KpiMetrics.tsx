import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'education-cn-kpi-metrics'
export const layoutName = '核心数据'
export const layoutDescription = '教育培训风核心数据页：3-4 个超大数字 KPI 卡片，配圆角卡片、书本/灯泡/成长曲线/圆点装饰。纯 CSS/SVG，明亮米白活力橙蓝，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('学习成果一览').meta({
        description: "核心数据页主标题（中文，简短有力）",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(8).meta({
            description: "核心数值，超大字重展示，如 98%、12万、4.8分",
        }),
        label: z.string().min(2).max(16).meta({
            description: "数值含义标签，如『学员满意度』",
        }),
        desc: z.string().max(30).optional().meta({
            description: "可选补充说明，一句话",
        }),
        icon: IconSchema.optional().meta({
            description: "可选图标，phosphor 图标",
        }),
    })).min(3).max(4).default([
        {
            value: '98%',
            label: '学员满意度',
            desc: '课程结业后真实回访数据',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/smiley-bold.svg',
                __icon_query__: 'satisfaction smiley',
            },
        },
        {
            value: '12万+',
            label: '累计学员',
            desc: '覆盖全国三十余座城市',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'students users',
            },
        },
        {
            value: '4.8分',
            label: '课程评分',
            desc: '满分五分的师生综合评价',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/star-bold.svg',
                __icon_query__: 'rating star',
            },
        },
        {
            value: '320门',
            label: '精品课程',
            desc: '涵盖职业素养与专业技能',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/books-bold.svg',
                __icon_query__: 'courses books',
            },
        },
    ]).meta({ description: "核心数据 KPI 列表（3-4 个）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const KpiMetrics: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '学习成果一览'
    const metrics = (slideData?.metrics && slideData.metrics.length > 0)
        ? slideData.metrics
        : [
            { value: '98%', label: '学员满意度', desc: '课程结业后真实回访数据' },
            { value: '12万+', label: '累计学员', desc: '覆盖全国三十余座城市' },
            { value: '4.8分', label: '课程评分', desc: '满分五分的师生综合评价' },
        ]

    const count = metrics.length
    const gridColsClass = count >= 4 ? 'grid-cols-4' : count === 3 ? 'grid-cols-3' : 'grid-cols-2'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#fffdf7)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：成长曲线 + 圆点 + 灯泡光晕 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="eduKpiGrowth" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0.14" />
                        </linearGradient>
                        <radialGradient id="eduKpiBulb" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 右上灯泡光晕 */}
                    <circle cx="1140" cy="120" r="170" fill="url(#eduKpiBulb)" />
                    {/* 左下成长曲线 */}
                    <path
                        d="M-20 700 C 200 660, 360 560, 520 520 S 880 430, 1060 320 S 1280 210, 1320 150"
                        fill="none"
                        stroke="url(#eduKpiGrowth)"
                        strokeWidth="6"
                        strokeLinecap="round"
                    />
                    {/* 成长曲线节点圆点 */}
                    <circle cx="520" cy="520" r="9" fill="#2563eb" fillOpacity="0.18" />
                    <circle cx="1060" cy="320" r="9" fill="#f97316" fillOpacity="0.22" />
                </svg>

                {/* 左上书本装饰圆点群 */}
                <div className="absolute left-8 top-7 flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full" style={{ background: "var(--primary-color,#2563eb)", opacity: 0.7 }} />
                    <span className="h-2 w-2 rounded-full" style={{ background: "var(--secondary-color,#f97316)", opacity: 0.7 }} />
                    <span className="h-2 w-2 rounded-full" style={{ background: "var(--stroke,#f1e9d8)" }} />
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full w-full flex-col justify-center px-16 py-12">
                    {/* 标题区 */}
                    <div className="mb-9 flex items-center gap-4">
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                            style={{ background: "var(--secondary-color,#f97316)", boxShadow: '0 8px 20px rgba(249,115,22,0.24)' }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-6 h-6"
                                title="lightbulb"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div className="mt-2 h-1.5 w-20 rounded-full" style={{ background: "var(--primary-color,#2563eb)" }} />
                        </div>
                    </div>

                    {/* KPI 卡片网格 */}
                    <div className={`grid ${gridColsClass} gap-6`}>
                        {metrics.map((m, i) => {
                            const isOrange = i % 2 === 1
                            const accent = isOrange ? "var(--secondary-color,#f97316)" : "var(--primary-color,#2563eb)"
                            const accentSoft = isOrange ? 'rgba(249,115,22,0.12)' : 'rgba(37,99,235,0.10)'
                            return (
                                <div
                                    key={i}
                                    className="relative flex flex-col rounded-3xl border p-6 shadow-sm overflow-hidden"
                                    style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#f1e9d8)" }}
                                >
                                    {/* 卡片顶部色条 */}
                                    <div className="absolute left-0 top-0 h-1.5 w-full" style={{ background: accent }} />
                                    {/* 卡片右上柔光圆点装饰 */}
                                    <div
                                        className="absolute -right-6 -top-6 h-20 w-20 rounded-full"
                                        style={{ background: accentSoft }}
                                        aria-hidden="true"
                                    />

                                    {/* 图标徽章 */}
                                    {m.icon?.__icon_url__ && (
                                        <div
                                            className="relative z-10 mb-4 flex h-11 w-11 items-center justify-center rounded-2xl"
                                            style={{ background: accent }}
                                        >
                                            <RemoteSvgIcon
                                                url={m.icon.__icon_url__}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-6 h-6"
                                                title={m.icon.__icon_query__ || m.label || 'metric'}
                                            />
                                        </div>
                                    )}

                                    {/* 超大数值 */}
                                    <div
                                        className="relative z-10 text-6xl font-black leading-[1.1] break-words"
                                        style={{ color: accent, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m.value}
                                    </div>

                                    {/* 标签 */}
                                    <div
                                        className="relative z-10 mt-3 text-lg font-bold leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m.label}
                                    </div>

                                    {/* 可选说明 */}
                                    {m.desc && (
                                        <div
                                            className="relative z-10 mt-2 text-sm leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#1f2937)", opacity: 0.66, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {m.desc}
                                        </div>
                                    )}
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
