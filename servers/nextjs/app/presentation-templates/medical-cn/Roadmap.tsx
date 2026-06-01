import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { IconSchema } from '../defaultSchemes';

export const layoutId = 'medical-cn-roadmap'
export const layoutName = '路线图'
export const layoutDescription = '医疗健康风路线图：横向排列的圆角阶段卡，配脉搏波形与十字装饰，用于分阶段计划展示。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('健康管理推进路线').meta({
        description: "路线图主标题（中文，简短有力，分阶段计划主题）",
    }),
    phases: z.array(z.object({
        phase: z.string().min(2).max(10).meta({
            description: "阶段标签，如『第一阶段』『启动期』",
        }),
        title: z.string().min(2).max(16).meta({
            description: "该阶段标题，概括阶段目标",
        }),
        icon: IconSchema.meta({
            description: "代表该阶段的图标",
        }),
        items: z.array(z.string().min(2).max(24).meta({
            description: "该阶段的关键举措或里程碑",
        })).min(1).max(3).meta({
            description: "阶段内的要点列表",
        }),
    })).min(3).max(4).default([
        {
            phase: '第一阶段',
            title: '体系搭建',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg',
                __icon_query__: 'heartbeat',
            },
            items: ['完善电子健康档案', '组建多学科诊疗团队', '部署智能监测设备'],
        },
        {
            phase: '第二阶段',
            title: '试点运行',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/first-aid-kit-bold.svg',
                __icon_query__: 'first aid kit',
            },
            items: ['选取重点科室试运行', '建立随访干预机制', '采集真实诊疗数据'],
        },
        {
            phase: '第三阶段',
            title: '全面推广',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'users group',
            },
            items: ['覆盖全院诊疗流程', '打通医保结算通道', '面向社区延伸服务'],
        },
        {
            phase: '第四阶段',
            title: '持续优化',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'growth chart',
            },
            items: ['评估健康改善成效', '迭代智能预警模型', '形成可复制标准'],
        },
    ]).meta({
        description: "分阶段计划，横向排列的阶段卡（3-4 个）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK_PHASES: SlideData['phases'] = [
    {
        phase: '第一阶段',
        title: '体系搭建',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg',
            __icon_query__: 'heartbeat',
        },
        items: ['完善电子健康档案', '组建多学科诊疗团队', '部署智能监测设备'],
    },
    {
        phase: '第二阶段',
        title: '试点运行',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/first-aid-kit-bold.svg',
            __icon_query__: 'first aid kit',
        },
        items: ['选取重点科室试运行', '建立随访干预机制', '采集真实诊疗数据'],
    },
    {
        phase: '第三阶段',
        title: '全面推广',
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
            __icon_query__: 'users group',
        },
        items: ['覆盖全院诊疗流程', '打通医保结算通道', '面向社区延伸服务'],
    },
]

const Roadmap: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '健康管理推进路线'
    const phases = (slideData?.phases && slideData.phases.length > 0)
        ? slideData.phases
        : FALLBACK_PHASES

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
                {/* 背景脉搏波形装饰层 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="medRoadmapGlow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#medRoadmapGlow)" />
                    {/* 柔和光晕 */}
                    <circle cx="120" cy="80" r="220" fill="var(--primary-color,#0ea5e9)" fillOpacity="0.05" />
                    <circle cx="1180" cy="660" r="240" fill="var(--secondary-color,#10b981)" fillOpacity="0.05" />
                    {/* 底部脉搏波形 */}
                    <path
                        d="M0 650 L260 650 L300 650 L330 600 L360 690 L400 540 L440 650 L720 650 L760 650 L790 610 L820 685 L860 560 L900 650 L1280 650"
                        fill="none"
                        stroke="var(--primary-color,#0ea5e9)"
                        strokeOpacity="0.18"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                {/* 右上角十字装饰 */}
                <div className="absolute top-9 right-12 z-0" aria-hidden="true">
                    <svg width="56" height="56" viewBox="0 0 56 56">
                        <rect x="22" y="6" width="12" height="44" rx="4" fill="var(--secondary-color,#10b981)" fillOpacity="0.16" />
                        <rect x="6" y="22" width="44" height="12" rx="4" fill="var(--secondary-color,#10b981)" fillOpacity="0.16" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <div className="flex items-center gap-3">
                            <span
                                className="inline-flex items-center rounded-full px-4 py-1 text-sm font-semibold break-words"
                                style={{
                                    color: "var(--primary-color,#0ea5e9)",
                                    background: "rgba(14,165,233,0.10)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                分阶段计划
                            </span>
                        </div>
                        <h1
                            className="mt-4 text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-5 h-1.5 w-24 rounded-full" style={{ background: "var(--secondary-color,#10b981)" }} />
                    </div>

                    {/* 阶段卡横向排列 */}
                    <div className="mt-10 grid flex-1 items-stretch gap-6" style={{ gridTemplateColumns: `repeat(${phases.length}, minmax(0, 1fr))` }}>
                        {phases.map((p, i) => (
                            <div
                                key={i}
                                className="flex flex-col rounded-3xl border p-6"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#e2e8f0)",
                                    boxShadow: '0 12px 30px -12px rgba(14,165,233,0.20)',
                                }}
                            >
                                {/* 序号 + 图标 */}
                                <div className="flex items-center justify-between">
                                    <div
                                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                                        style={{ background: "var(--primary-color,#0ea5e9)" }}
                                    >
                                        <RemoteSvgIcon
                                            url={p?.icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-6 h-6"
                                            title={p?.icon?.__icon_query__}
                                        />
                                    </div>
                                    <span
                                        className="text-4xl font-black leading-none"
                                        style={{ color: "rgba(14,165,233,0.16)" }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* 阶段标签 */}
                                <span
                                    className="mt-5 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold break-words"
                                    style={{
                                        color: "var(--secondary-color,#10b981)",
                                        background: "rgba(16,185,129,0.10)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {p?.phase || '阶段'}
                                </span>

                                {/* 阶段标题 */}
                                <h2
                                    className="mt-3 text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p?.title || '阶段目标'}
                                </h2>

                                {/* 分隔细线 */}
                                <div className="my-4 h-px w-full" style={{ background: "var(--stroke,#e2e8f0)" }} />

                                {/* 要点列表 */}
                                <ul className="flex flex-col gap-3">
                                    {(p?.items || []).map((item, j) => (
                                        <li key={j} className="flex items-start gap-2.5">
                                            <span
                                                className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
                                                style={{ background: "var(--secondary-color,#10b981)" }}
                                            />
                                            <span
                                                className="text-sm leading-[1.7] break-words"
                                                style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Roadmap
