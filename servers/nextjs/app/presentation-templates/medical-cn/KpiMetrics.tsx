import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'medical-cn-kpi-metrics'
export const layoutName = '核心数据'
export const layoutDescription = '医疗健康风核心数据页：3-4 个超大数字 KPI，圆角卡片 + 脉搏波形 + 十字母题 + 柔和投影，清爽蓝绿点缀。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('诊疗服务核心指标').meta({
        description: "核心数据页主标题（中文，简短有力，≤20字）",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(8).meta({
            description: "超大展示数值，如 98.6%、2.4万、24h",
        }),
        label: z.string().min(2).max(16).meta({
            description: "数值说明标签，如『患者满意度』",
        }),
        desc: z.string().max(30).optional().meta({
            description: "可选的一句补充说明（≤30字）",
        }),
        icon: IconSchema.optional().meta({
            description: "可选指标图标（phosphor 图标）",
        }),
    })).min(3).max(4).default([
        {
            value: '98.6%',
            label: '患者满意度',
            desc: '连续三年位列区域三甲前列',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg',
                __icon_query__: 'heart',
            },
        },
        {
            value: '2.4万',
            label: '年门诊接诊量',
            desc: '覆盖周边十二个社区',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'patients',
            },
        },
        {
            value: '24h',
            label: '急诊响应时长',
            desc: '全天候多学科联合诊疗',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg',
                __icon_query__: 'emergency',
            },
        },
        {
            value: '320+',
            label: '在岗医护团队',
            desc: '高级职称占比超四成',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/stethoscope-bold.svg',
                __icon_query__: 'medical staff',
            },
        },
    ]).meta({ description: "3-4 个核心 KPI 指标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const KpiMetrics: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '诊疗服务核心指标'
    const metrics = (slideData?.metrics && slideData.metrics.length > 0 ? slideData.metrics : [
        { value: '98.6%', label: '患者满意度', desc: '连续三年位列区域三甲前列' },
        { value: '2.4万', label: '年门诊接诊量', desc: '覆盖周边十二个社区' },
        { value: '24h', label: '急诊响应时长', desc: '全天候多学科联合诊疗' },
        { value: '320+', label: '在岗医护团队', desc: '高级职称占比超四成' },
    ]) as NonNullable<SlideData['metrics']>

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
                    background: "var(--background-color,#f8fafc)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：脉搏波形 + 柔和光晕 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    {/* 左上柔和蓝光晕 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-160px', left: '-140px', width: '420px', height: '420px', borderRadius: '9999px',
                            background: 'radial-gradient(circle, var(--primary-color,#0ea5e9) 0%, transparent 70%)',
                            opacity: 0.10,
                        }}
                    />
                    {/* 右下柔和绿光晕 */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '-180px', right: '-120px', width: '440px', height: '440px', borderRadius: '9999px',
                            background: 'radial-gradient(circle, var(--secondary-color,#10b981) 0%, transparent 70%)',
                            opacity: 0.10,
                        }}
                    />
                    {/* 底部脉搏波形 */}
                    <svg viewBox="0 0 1280 160" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none" aria-hidden="true">
                        <defs>
                            <linearGradient id="medKpiPulse" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.0" />
                                <stop offset="35%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.45" />
                                <stop offset="65%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M0 110 L260 110 L300 110 L330 60 L360 150 L400 30 L430 110 L640 110 L690 110 L720 70 L750 140 L788 50 L818 110 L1280 110"
                            fill="none"
                            stroke="url(#medKpiPulse)"
                            strokeWidth="3"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* 右上角十字母题角标 */}
                <div className="absolute top-0 right-0 z-0 px-12 pt-9" aria-hidden="true">
                    <svg width="44" height="44" viewBox="0 0 44 44">
                        <rect x="17" y="4" width="10" height="36" rx="3" fill="var(--secondary-color,#10b981)" opacity="0.18" />
                        <rect x="4" y="17" width="36" height="10" rx="3" fill="var(--primary-color,#0ea5e9)" opacity="0.18" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <div className="flex items-center gap-3">
                            <span
                                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium break-words"
                                style={{
                                    color: "var(--primary-color,#0ea5e9)",
                                    background: 'rgba(14,165,233,0.10)',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                                    <rect x="5" y="1" width="4" height="12" rx="1.5" fill="currentColor" />
                                    <rect x="1" y="5" width="12" height="4" rx="1.5" fill="currentColor" />
                                </svg>
                                医疗健康
                            </span>
                        </div>
                        <h1
                            className="mt-4 text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-5 h-1.5 w-20 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))" }}
                        />
                    </div>

                    {/* KPI 卡片区 */}
                    <div
                        className="mt-10 grid flex-1 items-stretch gap-6"
                        style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
                    >
                        {metrics.map((m, i) => {
                            const value = m?.value || '—'
                            const label = m?.label || '核心指标'
                            const desc = m?.desc
                            const icon = m?.icon
                            return (
                                <div
                                    key={i}
                                    className="relative flex flex-col rounded-2xl border p-7 shadow-sm overflow-hidden"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#e2e8f0)",
                                        boxShadow: '0 14px 34px -20px rgba(15,23,42,0.30)',
                                    }}
                                >
                                    {/* 卡片顶部蓝绿渐变细条 */}
                                    <div
                                        className="absolute left-0 top-0 h-1.5 w-full"
                                        style={{ background: "linear-gradient(90deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))" }}
                                        aria-hidden="true"
                                    />

                                    {/* 图标徽章 */}
                                    <div
                                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                        style={{
                                            background: "linear-gradient(135deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))",
                                            color: "var(--primary-text,#ffffff)",
                                            boxShadow: '0 8px 18px -8px rgba(14,165,233,0.55)',
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
                                            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                                                <path d="M1 11 H6 L8 5 L11 16 L14 9 L16 11 H21" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
                                            </svg>
                                        )}
                                    </div>

                                    {/* 超大数值 */}
                                    <div
                                        className="mt-6 text-6xl font-black leading-[1.05] break-words"
                                        style={{ color: "var(--primary-color,#0ea5e9)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {value}
                                    </div>

                                    {/* 标签 */}
                                    <div
                                        className="mt-3 text-lg font-bold leading-[1.6] break-words"
                                        style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {label}
                                    </div>

                                    {/* 可选补充说明 */}
                                    {desc ? (
                                        <div
                                            className="mt-2 text-sm leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {desc}
                                        </div>
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
