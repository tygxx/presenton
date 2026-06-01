import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { IconSchema } from '../defaultSchemes';

export const layoutId = 'medical-cn-timeline'
export const layoutName = '时间线'
export const layoutDescription = '医疗健康风时间线：横向轴线 + 脉搏波形节点，展示发展里程碑/诊疗流程。清爽无衬线，圆角卡片与柔和阴影，蓝绿点缀，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('健康守护历程').meta({
        description: "时间线主标题（中文，简短有力）",
    }),
    subtitle: z.string().min(4).max(40).default('从预防到康复，全周期守护每一位患者').meta({
        description: "副标题，一句话补充说明",
    }),
    icon: IconSchema.default({
        __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg",
        __icon_query__: "heartbeat pulse",
    }).meta({
        description: "标题旁的主题图标（医疗相关）",
    }),
    milestones: z.array(z.object({
        time: z.string().min(1).max(10).meta({
            description: "时间点，如年份/阶段，如『2020』『第一阶段』",
        }),
        title: z.string().min(2).max(14).meta({
            description: "里程碑标题（中文，简短）",
        }),
        desc: z.string().min(4).max(36).meta({
            description: "里程碑描述，一句话说明",
        }),
        icon: IconSchema.meta({
            description: "节点图标（医疗相关）",
        }),
    })).min(3).max(5).default([
        {
            time: '2018',
            title: '智慧门诊',
            desc: '线上预约与电子病历全面上线，候诊时间缩短四成。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/calendar-check-bold.svg",
                __icon_query__: "appointment calendar",
            },
        },
        {
            time: '2020',
            title: '远程会诊',
            desc: '搭建跨院区远程诊疗平台，优质医疗下沉基层。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/video-camera-bold.svg",
                __icon_query__: "telemedicine video",
            },
        },
        {
            time: '2022',
            title: 'AI 辅助诊断',
            desc: '影像智能识别投入临床，早期病灶检出率显著提升。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/brain-bold.svg",
                __icon_query__: "ai brain diagnosis",
            },
        },
        {
            time: '2024',
            title: '全程管理',
            desc: '慢病随访与健康档案打通，构建全周期照护网络。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg",
                __icon_query__: "chronic care management",
            },
        },
    ]).meta({
        description: "里程碑节点（3 至 5 个）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const accentFor = (i: number) =>
    i % 2 === 0 ? "var(--primary-color,#0ea5e9)" : "var(--secondary-color,#10b981)"

const Timeline: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '健康守护历程'
    const subtitle = slideData?.subtitle || '从预防到康复，全周期守护每一位患者'
    const headIcon = slideData?.icon
    const milestones = (slideData?.milestones && slideData.milestones.length > 0)
        ? slideData.milestones
        : []

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
                {/* 背景装饰层：柔和光晕 + 十字母题 + 脉搏波形 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <div
                        className="absolute"
                        style={{
                            top: '-12%', left: '-8%', width: '420px', height: '420px', borderRadius: '9999px',
                            background: 'radial-gradient(circle, rgba(14,165,233,0.12), rgba(14,165,233,0) 70%)',
                        }}
                    />
                    <div
                        className="absolute"
                        style={{
                            bottom: '-16%', right: '-6%', width: '460px', height: '460px', borderRadius: '9999px',
                            background: 'radial-gradient(circle, rgba(16,185,129,0.12), rgba(16,185,129,0) 70%)',
                        }}
                    />
                    {/* 顶部脉搏波形纹样 */}
                    <svg viewBox="0 0 1280 120" className="absolute top-0 left-0 w-full" preserveAspectRatio="none" aria-hidden="true">
                        <polyline
                            points="0,70 180,70 220,70 250,28 290,108 330,70 520,70 560,70 600,42 640,96 680,70 1280,70"
                            fill="none"
                            stroke="var(--primary-color,#0ea5e9)"
                            strokeOpacity="0.10"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    </svg>
                    {/* 右上角十字母题 */}
                    <svg viewBox="0 0 60 60" className="absolute" style={{ top: '8%', right: '6%', width: '52px', height: '52px' }} aria-hidden="true">
                        <path d="M24 8 H36 V24 H52 V36 H36 V52 H24 V36 H8 V24 H24 Z" fill="var(--secondary-color,#10b981)" fillOpacity="0.10" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="flex items-center gap-4">
                        <div
                            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm"
                            style={{
                                background: "var(--primary-color,#0ea5e9)",
                                boxShadow: '0 8px 20px rgba(14,165,233,0.25)',
                            }}
                        >
                            {headIcon?.__icon_url__ ? (
                                <RemoteSvgIcon
                                    url={headIcon.__icon_url__}
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-7 h-7"
                                    title={headIcon.__icon_query__}
                                />
                            ) : null}
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <p
                                className="mt-2 text-base leading-relaxed break-words"
                                style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    {/* 横向时间线主体 */}
                    <div className="relative mt-4 flex flex-1 items-center">
                        {/* 轴线 */}
                        <div
                            className="absolute left-0 right-0 rounded-full"
                            style={{
                                top: '50%',
                                height: '3px',
                                transform: 'translateY(-50%)',
                                background: 'linear-gradient(90deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))',
                                opacity: 0.35,
                            }}
                        />

                        <div className="relative z-10 flex w-full items-stretch justify-between gap-5">
                            {milestones.map((m, i) => {
                                const accent = accentFor(i)
                                const above = i % 2 === 0
                                return (
                                    <div key={i} className="flex flex-1 flex-col items-center">
                                        {/* 上方卡片 */}
                                        {above ? (
                                            <div className="flex w-full flex-col items-center">
                                                <div
                                                    className="w-full rounded-2xl border p-4 shadow-sm"
                                                    style={{
                                                        background: "var(--card-color,#ffffff)",
                                                        borderColor: "var(--stroke,#e2e8f0)",
                                                        boxShadow: '0 10px 24px rgba(15,23,42,0.06)',
                                                    }}
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <div
                                                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                                                            style={{ background: accent }}
                                                        >
                                                            {m.icon?.__icon_url__ ? (
                                                                <RemoteSvgIcon
                                                                    url={m.icon.__icon_url__}
                                                                    strokeColor="currentColor"
                                                                    color="var(--primary-text,#ffffff)"
                                                                    className="w-5 h-5"
                                                                    title={m.icon.__icon_query__}
                                                                />
                                                            ) : null}
                                                        </div>
                                                        <span
                                                            className="text-base font-bold leading-snug break-words"
                                                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                        >
                                                            {m.title}
                                                        </span>
                                                    </div>
                                                    <p
                                                        className="mt-2 text-sm leading-relaxed break-words"
                                                        style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                    >
                                                        {m.desc}
                                                    </p>
                                                </div>
                                                {/* 连接线 */}
                                                <div className="h-5 w-[2px] rounded-full" style={{ background: accent, opacity: 0.5 }} />
                                            </div>
                                        ) : (
                                            <div style={{ height: '1.25rem' }} />
                                        )}

                                        {/* 中央节点 + 时间标签 */}
                                        <div className="flex flex-col items-center">
                                            <div
                                                className="flex h-6 w-6 items-center justify-center rounded-full"
                                                style={{
                                                    background: "var(--card-color,#ffffff)",
                                                    border: `3px solid ${accent}`,
                                                    boxShadow: `0 0 0 5px ${i % 2 === 0 ? 'rgba(14,165,233,0.12)' : 'rgba(16,185,129,0.12)'}`,
                                                }}
                                            >
                                                <div className="h-2 w-2 rounded-full" style={{ background: accent }} />
                                            </div>
                                            <span
                                                className="mt-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-bold leading-snug break-words"
                                                style={{
                                                    color: accent,
                                                    background: i % 2 === 0 ? 'rgba(14,165,233,0.10)' : 'rgba(16,185,129,0.10)',
                                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                                }}
                                            >
                                                {m.time}
                                            </span>
                                        </div>

                                        {/* 下方卡片 */}
                                        {!above ? (
                                            <div className="flex w-full flex-col items-center">
                                                {/* 连接线 */}
                                                <div className="h-5 w-[2px] rounded-full" style={{ background: accent, opacity: 0.5 }} />
                                                <div
                                                    className="w-full rounded-2xl border p-4 shadow-sm"
                                                    style={{
                                                        background: "var(--card-color,#ffffff)",
                                                        borderColor: "var(--stroke,#e2e8f0)",
                                                        boxShadow: '0 10px 24px rgba(15,23,42,0.06)',
                                                    }}
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <div
                                                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                                                            style={{ background: accent }}
                                                        >
                                                            {m.icon?.__icon_url__ ? (
                                                                <RemoteSvgIcon
                                                                    url={m.icon.__icon_url__}
                                                                    strokeColor="currentColor"
                                                                    color="var(--primary-text,#ffffff)"
                                                                    className="w-5 h-5"
                                                                    title={m.icon.__icon_query__}
                                                                />
                                                            ) : null}
                                                        </div>
                                                        <span
                                                            className="text-base font-bold leading-snug break-words"
                                                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                        >
                                                            {m.title}
                                                        </span>
                                                    </div>
                                                    <p
                                                        className="mt-2 text-sm leading-relaxed break-words"
                                                        style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                    >
                                                        {m.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ height: '1.25rem' }} />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Timeline
