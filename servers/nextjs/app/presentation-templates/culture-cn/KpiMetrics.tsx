import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'culture-cn-kpi-metrics'
export const layoutName = '核心数据'
export const layoutDescription = '国潮文创风核心数据页：宣纸米黄底 + 朱砂印章红块 + 描金边 + 水墨笔触，以超大字重呈现 3-4 个关键数据指标。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('国潮焕新成果').meta({
        description: "数据页主标题（中文，简短有力）",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(8).meta({
            description: "核心数值，超大字重展示，如 86%、千万级、12载",
        }),
        label: z.string().min(2).max(16).meta({
            description: "指标名称说明",
        }),
        desc: z.string().max(30).optional().meta({
            description: "指标补充描述（可选）",
        }),
        icon: IconSchema.optional().meta({
            description: "指标配图标（可选，phosphor 图标）",
        }),
    })).min(3).max(4).default([
        {
            value: '86%',
            label: '年轻客群占比',
            desc: '九五后与零零后成消费主力',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'young customers',
            },
        },
        {
            value: '3.2亿',
            label: '全年文创营收',
            desc: '联名系列贡献过半增量',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/coins-bold.svg',
                __icon_query__: 'revenue',
            },
        },
        {
            value: '180+',
            label: '非遗匠人合作',
            desc: '联结传统工艺与现代设计',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg',
                __icon_query__: 'craftsmanship heritage',
            },
        },
        {
            value: '4.9分',
            label: '用户口碑评分',
            desc: '复购率较行业均值高三成',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/star-bold.svg',
                __icon_query__: 'rating',
            },
        },
    ]).meta({ description: "核心数据指标列表（3-4 个大数字 KPI）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const KpiMetrics: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '国潮焕新成果'
    const metrics = (slideData?.metrics && slideData.metrics.length > 0)
        ? slideData.metrics
        : [
            { value: '86%', label: '年轻客群占比', desc: '九五后与零零后成消费主力' },
            { value: '3.2亿', label: '全年文创营收', desc: '联名系列贡献过半增量' },
            { value: '180+', label: '非遗匠人合作', desc: '联结传统工艺与现代设计' },
            { value: '4.9分', label: '用户口碑评分', desc: '复购率较行业均值高三成' },
        ]
    const count = metrics.length

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f5ecd9)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：宣纸纹理 + 水墨笔触 + 描金光晕 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="cultKpiPaper" cx="20%" cy="12%" r="90%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                                <stop offset="55%" stopColor="#ffffff" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="cultKpiInk" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.10" />
                                <stop offset="70%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.04" />
                                <stop offset="100%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="cultKpiGold" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#c9a227" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#e8cf86" stopOpacity="0.7" />
                            </linearGradient>
                        </defs>
                        {/* 宣纸高光 */}
                        <rect width="1280" height="720" fill="url(#cultKpiPaper)" />
                        {/* 右下水墨晕染笔触 */}
                        <ellipse cx="1120" cy="640" rx="320" ry="220" fill="url(#cultKpiInk)" />
                        <ellipse cx="180" cy="700" rx="260" ry="160" fill="url(#cultKpiInk)" />
                        {/* 左上水墨飞白笔触 */}
                        <path
                            d="M -40 120 C 160 60 320 150 520 96 C 700 48 760 130 900 90"
                            fill="none"
                            stroke="var(--secondary-color,#1a1a1a)"
                            strokeOpacity="0.07"
                            strokeWidth="26"
                            strokeLinecap="round"
                        />
                        {/* 传统回纹边角（左上） */}
                        <g stroke="url(#cultKpiGold)" strokeWidth="2.5" fill="none" opacity="0.55">
                            <path d="M 44 44 H 150 M 44 44 V 150" strokeLinecap="round" />
                            <rect x="60" y="60" width="34" height="34" rx="2" />
                        </g>
                        {/* 传统回纹边角（右下） */}
                        <g stroke="url(#cultKpiGold)" strokeWidth="2.5" fill="none" opacity="0.45">
                            <path d="M 1236 676 H 1130 M 1236 676 V 570" strokeLinecap="round" />
                            <rect x="1186" y="626" width="34" height="34" rx="2" />
                        </g>
                    </svg>

                    {/* 描金细边框 */}
                    <div
                        className="absolute inset-[14px] rounded-sm"
                        style={{ border: '1.5px solid rgba(201,162,39,0.45)' }}
                    />
                </div>

                {/* 右上印章红块 */}
                <div
                    className="absolute z-10"
                    style={{ top: '34px', right: '38px' }}
                >
                    <div
                        className="flex flex-col items-center justify-center rounded-[6px]"
                        style={{
                            width: '58px',
                            height: '58px',
                            background: "var(--primary-color,#c0392b)",
                            boxShadow: '0 4px 14px rgba(192,57,43,0.30)',
                            border: '1.5px solid rgba(255,255,255,0.35)',
                        }}
                    >
                        <span
                            className="text-[15px] font-black leading-[1.2] break-words"
                            style={{ color: "var(--primary-text,#ffffff)", letterSpacing: '2px', writingMode: 'vertical-rl' }}
                        >
                            国潮
                        </span>
                    </div>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-20 py-14">
                    {/* 标题区：竖排印章红条 + 大标题 */}
                    <div className="mb-10 flex items-stretch gap-5">
                        <div
                            className="flex flex-shrink-0 items-center justify-center rounded-[4px] px-2 py-2"
                            style={{
                                background: "var(--primary-color,#c0392b)",
                                boxShadow: '0 4px 12px rgba(192,57,43,0.25)',
                            }}
                        >
                            <span
                                className="text-base font-black leading-[1.35] break-words"
                                style={{
                                    color: "var(--primary-text,#ffffff)",
                                    writingMode: 'vertical-rl',
                                    letterSpacing: '4px',
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                数据
                            </span>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1
                                className="text-5xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div className="mt-4 flex items-center gap-3">
                                <span
                                    className="h-[3px] w-20 rounded-full"
                                    style={{ background: "var(--primary-color,#c0392b)" }}
                                />
                                <span
                                    className="h-[3px] w-10 rounded-full"
                                    style={{ background: 'rgba(201,162,39,0.7)' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 指标卡片网格 */}
                    <div
                        className="grid gap-6"
                        style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
                    >
                        {metrics.map((m, i) => {
                            const value = m?.value || '—'
                            const label = m?.label || '指标'
                            const desc = m?.desc
                            const icon = (m as any)?.icon
                            return (
                                <div
                                    key={i}
                                    className="relative flex flex-col rounded-2xl px-6 py-7 overflow-hidden"
                                    style={{
                                        background: "var(--card-color,#fbf5e9)",
                                        border: '1px solid var(--stroke,#ddd0b4)',
                                        boxShadow: '0 8px 22px rgba(43,43,43,0.06)',
                                    }}
                                >
                                    {/* 卡片顶部描金细线 */}
                                    <span
                                        className="absolute left-0 top-0 h-[3px] w-full"
                                        style={{ background: 'linear-gradient(90deg,#c9a227,#e8cf86)' }}
                                    />
                                    {/* 卡片角落水墨印记 */}
                                    <span
                                        className="absolute -right-6 -bottom-6 rounded-full"
                                        style={{
                                            width: '92px',
                                            height: '92px',
                                            background: 'radial-gradient(circle, rgba(192,57,43,0.07) 0%, rgba(192,57,43,0) 70%)',
                                        }}
                                    />

                                    {/* 图标 + 序号 */}
                                    <div className="flex items-center justify-between">
                                        <div
                                            className="flex items-center justify-center rounded-xl"
                                            style={{
                                                width: '46px',
                                                height: '46px',
                                                background: "var(--primary-color,#c0392b)",
                                                boxShadow: '0 4px 12px rgba(192,57,43,0.22)',
                                            }}
                                        >
                                            {icon?.__icon_url__ ? (
                                                <RemoteSvgIcon
                                                    url={icon.__icon_url__}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-text,#ffffff)"
                                                    className="w-6 h-6"
                                                    title={icon.__icon_query__}
                                                />
                                            ) : (
                                                <span
                                                    className="text-lg font-black leading-none"
                                                    style={{ color: "var(--primary-text,#ffffff)" }}
                                                >
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                            )}
                                        </div>
                                        <span
                                            className="text-sm font-bold leading-none"
                                            style={{ color: 'rgba(201,162,39,0.85)', writingMode: 'vertical-rl', letterSpacing: '1px' }}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    {/* 超大数值 */}
                                    <div
                                        className="mt-5 text-6xl font-black leading-[1.1] break-words"
                                        style={{ color: "var(--primary-color,#c0392b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {value}
                                    </div>

                                    {/* 指标名称 */}
                                    <div
                                        className="mt-3 text-lg font-bold leading-[1.6] break-words"
                                        style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {label}
                                    </div>

                                    {/* 补充描述 */}
                                    {desc && (
                                        <div
                                            className="mt-2 text-sm leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.62, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {desc}
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
