import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { IconSchema } from '../defaultSchemes';

export const layoutId = 'business-cn-roadmap'
export const layoutName = '路线图'
export const layoutDescription = '商务风路线图：分阶段计划横向排列的阶段卡片，深蓝主色 + 橙色强调 + 稳健网格装饰。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('三年增长路线图').meta({
        description: "路线图主标题（中文，简短有力）",
    }),
    subtitle: z.string().min(4).max(40).default('分阶段稳步推进，实现可持续的规模化增长').meta({
        description: "副标题，一句话说明整体规划",
    }),
    phases: z.array(z.object({
        phase: z.string().min(2).max(10).meta({
            description: "阶段标签，如『第一阶段』",
        }),
        title: z.string().min(2).max(16).meta({
            description: "阶段主题标题",
        }),
        icon: IconSchema.default({
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/flag-bold.svg",
            __icon_query__: "flag milestone",
        }).meta({ description: "阶段图标" }),
        items: z.array(z.string().min(2).max(24).meta({
            description: "阶段关键举措/目标",
        })).min(1).max(3).meta({ description: "该阶段的关键举措列表" }),
    })).min(3).max(4).default([
        {
            phase: '第一阶段',
            title: '夯实基础',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/buildings-bold.svg",
                __icon_query__: "foundation buildings",
            },
            items: ['搭建标准化运营体系', '组建核心管理团队', '打磨主营产品与服务'],
        },
        {
            phase: '第二阶段',
            title: '规模扩张',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg",
                __icon_query__: "growth chart",
            },
            items: ['拓展全国重点区域市场', '建设数字化营销渠道', '营收实现三倍增长'],
        },
        {
            phase: '第三阶段',
            title: '生态领跑',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-bold.svg",
                __icon_query__: "rocket leadership",
            },
            items: ['构建产业上下游生态', '布局国际化业务版图', '成为细分行业领军者'],
        },
    ]).meta({ description: "分阶段计划列表（3 至 4 个阶段，横向排列）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Roadmap: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '三年增长路线图'
    const subtitle = slideData?.subtitle || '分阶段稳步推进，实现可持续的规模化增长'
    const phases = (slideData?.phases && slideData.phases.length > 0)
        ? slideData.phases
        : [
            {
                phase: '第一阶段',
                title: '夯实基础',
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/buildings-bold.svg",
                    __icon_query__: "foundation buildings",
                },
                items: ['搭建标准化运营体系', '组建核心管理团队', '打磨主营产品与服务'],
            },
            {
                phase: '第二阶段',
                title: '规模扩张',
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg",
                    __icon_query__: "growth chart",
                },
                items: ['拓展全国重点区域市场', '建设数字化营销渠道', '营收实现三倍增长'],
            },
            {
                phase: '第三阶段',
                title: '生态领跑',
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-bold.svg",
                    __icon_query__: "rocket leadership",
                },
                items: ['构建产业上下游生态', '布局国际化业务版图', '成为细分行业领军者'],
            },
        ]

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
                {/* 背景稳健网格 + 几何装饰 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern id="bizRoadmapGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0H0V48" fill="none" stroke="#1e3a8a" strokeOpacity="0.05" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="bizRoadmapGlow" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#bizRoadmapGrid)" />
                    <rect width="520" height="720" fill="url(#bizRoadmapGlow)" />
                </svg>

                {/* 顶部橙色装饰条 */}
                <div
                    className="absolute left-0 top-0 h-1.5 w-full"
                    style={{ background: "var(--secondary-color,#f97316)" }}
                />

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 items-end justify-between gap-8">
                        <div className="flex flex-col">
                            <div className="mb-4 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                        <p
                            className="max-w-[26rem] pb-1 text-right text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle}
                        </p>
                    </div>

                    {/* 阶段卡横向排列 */}
                    <div className="mt-10 flex flex-1 items-stretch gap-6">
                        {phases.map((p, i) => {
                            const phaseLabel = p?.phase || `第${i + 1}阶段`
                            const phaseTitle = p?.title || ''
                            const items = p?.items || []
                            const iconUrl = p?.icon?.__icon_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/flag-bold.svg"
                            const iconQuery = p?.icon?.__icon_query__ || 'milestone'
                            const stepNo = String(i + 1).padStart(2, '0')
                            return (
                                <div
                                    key={i}
                                    className="relative flex flex-1 flex-col rounded-2xl border p-6 shadow-sm"
                                    style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                                >
                                    {/* 卡片左上几何角标 */}
                                    <div
                                        className="absolute right-5 top-5 text-5xl font-black leading-none"
                                        style={{ color: "var(--primary-color,#1e3a8a)", opacity: 0.08 }}
                                    >
                                        {stepNo}
                                    </div>

                                    {/* 图标 + 阶段标签 */}
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                            style={{ background: "var(--primary-color,#1e3a8a)" }}
                                        >
                                            <RemoteSvgIcon
                                                url={iconUrl}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-6 h-6"
                                                title={iconQuery}
                                            />
                                        </div>
                                        <span
                                            className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide break-words"
                                            style={{
                                                color: "var(--secondary-color,#f97316)",
                                                background: "rgba(249,115,22,0.10)",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {phaseLabel}
                                        </span>
                                    </div>

                                    {/* 阶段标题 */}
                                    <h2
                                        className="mt-5 text-2xl font-bold leading-[1.3] break-words"
                                        style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {phaseTitle}
                                    </h2>

                                    <div className="mt-4 h-px w-full" style={{ background: "var(--stroke,#e2e8f0)" }} />

                                    {/* 关键举措列表 */}
                                    <ul className="mt-4 flex flex-col gap-3">
                                        {items.map((it, j) => (
                                            <li key={j} className="flex items-start gap-2.5">
                                                <span
                                                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                                    style={{ background: "var(--secondary-color,#f97316)" }}
                                                />
                                                <span
                                                    className="text-sm leading-relaxed break-words"
                                                    style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                >
                                                    {it}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* 底部阶段进度条 */}
                                    <div className="mt-auto pt-6">
                                        <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--stroke,#e2e8f0)" }}>
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${Math.round(((i + 1) / phases.length) * 100)}%`,
                                                    background: "var(--primary-color,#1e3a8a)",
                                                }}
                                            />
                                        </div>
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

export default Roadmap
