import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'finance-cn-process-steps'
export const layoutName = '流程步骤'
export const layoutDescription = '金融投资风流程步骤：深藏青底 + 香槟金细线 + 衬线大标题，编号卡片横向排布，步骤间以金色箭头连接线衔接，展示编号化的投资/管线流程。纯 CSS/SVG 装饰，离线可渲染。'

const ICON_BASE = 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold'

const schema = z.object({
    title: z.string().min(2).max(20).default('投资决策五步法').meta({
        description: "版式主标题（中文，简短有力）",
    }),
    steps: z.array(z.object({
        title: z.string().min(2).max(14).default('需求诊断').meta({
            description: "步骤标题（极简，4-7字为宜）",
        }),
        desc: z.string().min(4).max(36).default('厘清风险偏好与收益目标，明确资金期限。').meta({
            description: "步骤说明（一句话，简明）",
        }),
        icon: IconSchema.default({
            __icon_url__: `${ICON_BASE}/magnifying-glass-bold.svg`,
            __icon_query__: 'requirement diagnosis',
        }).meta({ description: "步骤图标（可选）" }),
    })).min(3).max(5).default([
        {
            title: '需求诊断',
            desc: '厘清风险偏好与收益目标，明确资金期限。',
            icon: { __icon_url__: `${ICON_BASE}/magnifying-glass-bold.svg`, __icon_query__: 'requirement diagnosis' },
        },
        {
            title: '资产配置',
            desc: '跨股债商品均衡布局，构建稳健组合框架。',
            icon: { __icon_url__: `${ICON_BASE}/chart-pie-slice-bold.svg`, __icon_query__: 'asset allocation' },
        },
        {
            title: '标的优选',
            desc: '基本面与估值双轮驱动，精选优质标的。',
            icon: { __icon_url__: `${ICON_BASE}/funnel-bold.svg`, __icon_query__: 'security selection' },
        },
        {
            title: '风险监控',
            desc: '动态追踪回撤与敞口，严守仓位纪律。',
            icon: { __icon_url__: `${ICON_BASE}/shield-check-bold.svg`, __icon_query__: 'risk monitoring' },
        },
        {
            title: '定期再平衡',
            desc: '按周期校准权重，锁定收益控制波动。',
            icon: { __icon_url__: `${ICON_BASE}/arrows-clockwise-bold.svg`, __icon_query__: 'rebalancing' },
        },
    ]).meta({ description: "流程步骤（3-5 步）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DEFAULT_STEPS: SlideData['steps'] = [
    {
        title: '需求诊断',
        desc: '厘清风险偏好与收益目标，明确资金期限。',
        icon: { __icon_url__: `${ICON_BASE}/magnifying-glass-bold.svg`, __icon_query__: 'requirement diagnosis' },
    },
    {
        title: '资产配置',
        desc: '跨股债商品均衡布局，构建稳健组合框架。',
        icon: { __icon_url__: `${ICON_BASE}/chart-pie-slice-bold.svg`, __icon_query__: 'asset allocation' },
    },
    {
        title: '标的优选',
        desc: '基本面与估值双轮驱动，精选优质标的。',
        icon: { __icon_url__: `${ICON_BASE}/funnel-bold.svg`, __icon_query__: 'security selection' },
    },
    {
        title: '风险监控',
        desc: '动态追踪回撤与敞口，严守仓位纪律。',
        icon: { __icon_url__: `${ICON_BASE}/shield-check-bold.svg`, __icon_query__: 'risk monitoring' },
    },
    {
        title: '定期再平衡',
        desc: '按周期校准权重，锁定收益控制波动。',
        icon: { __icon_url__: `${ICON_BASE}/arrows-clockwise-bold.svg`, __icon_query__: 'rebalancing' },
    },
]

const ProcessSteps: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '投资决策五步法'
    const steps = (slideData?.steps && slideData.steps.length > 0 ? slideData.steps : DEFAULT_STEPS).slice(0, 5)

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
                        <linearGradient id="finStepGold" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="finStepCurve" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.5" />
                        </linearGradient>
                        <pattern id="finStepGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.4" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {/* 数据网格底纹 */}
                    <rect width="1280" height="720" fill="url(#finStepGrid)" />
                    {/* 左上角金色光晕 */}
                    <circle cx="120" cy="-40" r="300" fill="url(#finStepGold)" />
                    {/* 增长曲线（流程上行隐喻） */}
                    <path
                        d="M-20 640 L200 600 L420 540 L640 470 L860 390 L1080 300 L1300 200"
                        fill="none"
                        stroke="url(#finStepCurve)"
                        strokeWidth="2"
                        strokeOpacity="0.6"
                    />
                    {/* 棱形母题 */}
                    <rect x="1148" y="86" width="24" height="24" transform="rotate(45 1160 98)" fill="none" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.5" strokeWidth="1.5" />
                    <rect x="96" y="636" width="18" height="18" transform="rotate(45 105 645)" fill="var(--secondary-color,#60a5fa)" fillOpacity="0.3" />
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
                                INVESTMENT PROCESS · 投资流程
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

                    {/* 流程步骤区：横向卡片 + 金色箭头连接线，居中自适应 */}
                    <div className="mt-8 flex min-h-0 flex-1 items-stretch justify-center gap-3">
                        {steps.map((step, i) => {
                            const st = step || ({} as SlideData['steps'][number])
                            const iconUrl = st.icon?.__icon_url__ || `${ICON_BASE}/magnifying-glass-bold.svg`
                            const iconQuery = st.icon?.__icon_query__ || 'process step'
                            const stepTitle = st.title || '流程步骤'
                            const stepDesc = st.desc || ''
                            const isLast = i === steps.length - 1
                            return (
                                <React.Fragment key={i}>
                                    {/* 步骤卡片 */}
                                    <div
                                        className="flex flex-1 flex-col rounded-xl border px-5 py-6"
                                        style={{
                                            background: "var(--card-color,#1e293b)",
                                            borderColor: "var(--stroke,#334155)",
                                        }}
                                    >
                                        {/* 编号 + 图标棱形底座 */}
                                        <div className="flex items-center justify-between">
                                            <span
                                                className="text-3xl font-bold leading-none"
                                                style={{
                                                    color: "var(--primary-color,#d4af37)",
                                                    fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                                }}
                                            >
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <div
                                                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg"
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
                                        </div>

                                        {/* 金色分隔细线 */}
                                        <div
                                            className="mt-4 h-px w-full"
                                            style={{ background: "var(--primary-color,#d4af37)", opacity: 0.4 }}
                                        />

                                        {/* 步骤标题 */}
                                        <span
                                            className="mt-4 text-lg font-bold leading-[1.5] break-words"
                                            style={{
                                                color: "var(--background-text,#e2e8f0)",
                                                fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                                overflowWrap: 'break-word',
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            {stepTitle}
                                        </span>

                                        {/* 步骤说明 */}
                                        {stepDesc && (
                                            <span
                                                className="mt-2 text-sm leading-[1.7] break-words"
                                                style={{
                                                    color: "var(--background-text,#94a3b8)",
                                                    overflowWrap: 'break-word',
                                                    wordBreak: 'break-word',
                                                }}
                                            >
                                                {stepDesc}
                                            </span>
                                        )}
                                    </div>

                                    {/* 步骤间金色箭头连接线（纯 CSS/SVG） */}
                                    {!isLast && (
                                        <div className="flex flex-shrink-0 items-center" aria-hidden="true">
                                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
                                                <path
                                                    d="M1 10 H17"
                                                    stroke="var(--primary-color,#d4af37)"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeOpacity="0.85"
                                                />
                                                <path
                                                    d="M13 5 L19 10 L13 15"
                                                    stroke="var(--primary-color,#d4af37)"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    strokeOpacity="0.85"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProcessSteps
