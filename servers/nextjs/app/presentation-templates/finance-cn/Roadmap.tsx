import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { IconSchema } from '../defaultSchemes';

export const layoutId = 'finance-cn-roadmap'
export const layoutName = '路线图'
export const layoutDescription = '金融投资风路线图：深藏青底 + 香槟金细线 + 衬线大标题，横向排列的分阶段计划卡片，棱形节点串联增长曲线。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('资本配置三年路线图').meta({
        description: "路线图主标题（中文，简短有力）",
    }),
    phases: z.array(z.object({
        phase: z.string().min(2).max(10).meta({
            description: "阶段标签，如『第一阶段』『近期』",
        }),
        title: z.string().min(2).max(16).meta({
            description: "阶段标题（中文，概括该阶段目标）",
        }),
        icon: IconSchema.default({
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/seedling-bold.svg",
            __icon_query__: "seedling growth",
        }).meta({ description: "阶段图标" }),
        items: z.array(
            z.string().min(2).max(24).meta({ description: "该阶段的关键举措" })
        ).min(1).max(3).meta({ description: "阶段关键举措列表" }),
    })).min(3).max(4).default([
        {
            phase: '第一阶段',
            title: '夯实资产底盘',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/seedling-bold.svg",
                __icon_query__: "seedling foundation",
            },
            items: ['完成核心标的尽职调查', '建立风险敞口监控体系', '锁定稳健型固收配置'],
        },
        {
            phase: '第二阶段',
            title: '优化组合结构',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg",
                __icon_query__: "chart growth",
            },
            items: ['提升权益类资产比重', '布局优质成长赛道', '动态再平衡季度调仓'],
        },
        {
            phase: '第三阶段',
            title: '释放复利增长',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/trophy-bold.svg",
                __icon_query__: "trophy returns",
            },
            items: ['实现年化收益超基准', '拓展跨境多元配置', '兑现长期价值回报'],
        },
    ]).meta({ description: "分阶段计划，按时间顺序横向排列" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Roadmap: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '资本配置三年路线图'
    const phases = (slideData?.phases && slideData.phases.length > 0)
        ? slideData.phases
        : [
            {
                phase: '第一阶段',
                title: '夯实资产底盘',
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/seedling-bold.svg",
                    __icon_query__: "seedling foundation",
                },
                items: ['完成核心标的尽职调查', '建立风险敞口监控体系', '锁定稳健型固收配置'],
            },
            {
                phase: '第二阶段',
                title: '优化组合结构',
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg",
                    __icon_query__: "chart growth",
                },
                items: ['提升权益类资产比重', '布局优质成长赛道', '动态再平衡季度调仓'],
            },
            {
                phase: '第三阶段',
                title: '释放复利增长',
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/trophy-bold.svg",
                    __icon_query__: "trophy returns",
                },
                items: ['实现年化收益超基准', '拓展跨境多元配置', '兑现长期价值回报'],
            },
        ]

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：数据网格 + 增长曲线 + 光晕 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="finRoadGlow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="finRoadCurve" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.55" />
                        </linearGradient>
                        <pattern id="finRoadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.30" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {/* 数据网格 */}
                    <rect width="1280" height="720" fill="url(#finRoadGrid)" />
                    {/* 右上角金色光晕 */}
                    <rect width="1280" height="720" fill="url(#finRoadGlow)" />
                    {/* 增长曲线 */}
                    <path
                        d="M-20 600 C 220 560, 360 520, 520 440 S 880 300, 1060 200 1320 60"
                        fill="none"
                        stroke="url(#finRoadCurve)"
                        strokeWidth="2"
                    />
                    <path
                        d="M-20 660 C 240 630, 400 600, 600 520 S 980 360, 1180 250 1320 180"
                        fill="none"
                        stroke="var(--secondary-color,#60a5fa)"
                        strokeOpacity="0.14"
                        strokeWidth="1.5"
                    />
                    {/* 棱形装饰节点 */}
                    {[
                        { x: 520, y: 440 },
                        { x: 1060, y: 200 },
                    ].map((p, i) => (
                        <rect
                            key={i}
                            x={p.x - 5}
                            y={p.y - 5}
                            width="10"
                            height="10"
                            transform={`rotate(45 ${p.x} ${p.y})`}
                            fill="var(--primary-color,#d4af37)"
                            fillOpacity="0.45"
                        />
                    ))}
                </svg>

                {/* 内容主层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="flex items-end justify-between gap-6">
                        <div className="flex flex-col">
                            <span
                                className="mb-3 inline-flex w-fit items-center gap-2 text-xs font-medium tracking-wide break-words"
                                style={{ color: "var(--primary-color,#d4af37)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                <span
                                    className="inline-block h-px w-8"
                                    style={{ background: "var(--primary-color,#d4af37)" }}
                                />
                                INVESTMENT ROADMAP · 投资路线
                            </span>
                            <h1
                                className="text-5xl font-black leading-[1.25] break-words"
                                style={{
                                    color: "var(--background-text,#e2e8f0)",
                                    fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {title}
                            </h1>
                        </div>
                        {/* 棱形 + 细金线装饰 */}
                        <div className="hidden flex-shrink-0 items-center gap-2 pb-2 sm:flex">
                            <span className="h-px w-12" style={{ background: "var(--stroke,#334155)" }} />
                            <span
                                className="block h-2.5 w-2.5 rotate-45"
                                style={{ background: "var(--primary-color,#d4af37)" }}
                            />
                            <span
                                className="block h-2 w-2 rotate-45"
                                style={{ border: "1px solid var(--secondary-color,#60a5fa)" }}
                            />
                        </div>
                    </div>

                    {/* 金色分隔细线 */}
                    <div
                        className="mt-6 h-px w-full"
                        style={{ background: "linear-gradient(90deg, var(--primary-color,#d4af37), transparent)" }}
                    />

                    {/* 阶段卡片横向排列 */}
                    <div className="mt-8 flex flex-1 items-stretch gap-6">
                        {phases.map((p, i) => {
                            const phaseLabel = p?.phase || `第${i + 1}阶段`
                            const phaseTitle = p?.title || '阶段目标'
                            const items = (p?.items && p.items.length > 0) ? p.items : ['关键举措']
                            const icon = p?.icon
                            const order = String(i + 1).padStart(2, '0')
                            return (
                                <div
                                    key={i}
                                    className="flex flex-1 flex-col rounded-2xl border p-6"
                                    style={{
                                        background: "var(--card-color,#1e293b)",
                                        borderColor: "var(--stroke,#334155)",
                                        boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
                                    }}
                                >
                                    {/* 卡片头部：序号 + 图标 + 棱形节点 */}
                                    <div className="flex items-center justify-between">
                                        <div
                                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                                            style={{
                                                background: "rgba(212,175,55,0.12)",
                                                border: "1px solid var(--primary-color,#d4af37)",
                                            }}
                                        >
                                            {icon?.__icon_url__ ? (
                                                <RemoteSvgIcon
                                                    url={icon.__icon_url__}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-color,#d4af37)"
                                                    className="w-6 h-6"
                                                    title={icon.__icon_query__}
                                                />
                                            ) : (
                                                <span
                                                    className="block h-3 w-3 rotate-45"
                                                    style={{ background: "var(--primary-color,#d4af37)" }}
                                                />
                                            )}
                                        </div>
                                        <span
                                            className="text-3xl font-black leading-none"
                                            style={{
                                                color: "var(--primary-color,#d4af37)",
                                                opacity: 0.32,
                                                fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                            }}
                                        >
                                            {order}
                                        </span>
                                    </div>

                                    {/* 阶段标签 */}
                                    <span
                                        className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium break-words"
                                        style={{
                                            color: "var(--secondary-color,#60a5fa)",
                                            background: "rgba(96,165,250,0.10)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        <span
                                            className="block h-1.5 w-1.5 rotate-45"
                                            style={{ background: "var(--secondary-color,#60a5fa)" }}
                                        />
                                        {phaseLabel}
                                    </span>

                                    {/* 阶段标题（衬线） */}
                                    <h3
                                        className="mt-3 text-xl font-bold leading-[1.35] break-words"
                                        style={{
                                            color: "var(--primary-text,#ffffff)",
                                            fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {phaseTitle}
                                    </h3>

                                    {/* 卡内金色细线 */}
                                    <div
                                        className="mt-4 h-px w-full"
                                        style={{ background: "var(--stroke,#334155)" }}
                                    />

                                    {/* 关键举措列表 */}
                                    <ul className="mt-4 flex flex-col gap-3">
                                        {items.map((it, j) => (
                                            <li key={j} className="flex items-start gap-2.5">
                                                <span
                                                    className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rotate-45"
                                                    style={{ background: "var(--primary-color,#d4af37)" }}
                                                />
                                                <span
                                                    className="text-sm leading-[1.7] break-words"
                                                    style={{
                                                        color: "var(--background-text,#e2e8f0)",
                                                        opacity: 0.92,
                                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                                    }}
                                                >
                                                    {it}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Roadmap
