import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'medical-cn-icon-list'
export const layoutName = '图标要点列表'
export const layoutDescription = '医疗健康风图标要点列表：竖向 4-6 条「左图标右文字」要点行，配圆角卡片、脉搏波形与十字装饰，蓝绿点缀、柔和投影。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('全周期健康管理服务').meta({
        description: "版式主标题（中文，简短有力，≤20字）",
    }),
    items: z.array(z.object({
        icon: IconSchema.meta({ description: "要点图标（phosphor 图标）" }),
        title: z.string().min(2).max(14).meta({ description: "要点小标题，≤14字" }),
        desc: z.string().min(4).max(40).meta({ description: "要点说明文字，≤40字" }),
    })).min(4).max(6).default([
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg",
                __icon_query__: "heartbeat monitor",
            },
            title: '智能体征监测',
            desc: '7×24 小时连续采集心率、血压等核心体征，异常实时预警。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/first-aid-kit-bold.svg",
                __icon_query__: "first aid kit",
            },
            title: '分级诊疗通道',
            desc: '依据病情智能分诊，打通基层与三甲医院双向转诊绿色通道。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/pill-bold.svg",
                __icon_query__: "medication pill",
            },
            title: '用药安全提醒',
            desc: '个性化用药方案与服药提醒，自动核查药物相互作用风险。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg",
                __icon_query__: "health data security",
            },
            title: '隐私安全保障',
            desc: '健康数据全程加密存储，严格遵循医疗信息保护规范。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/stethoscope-bold.svg",
                __icon_query__: "doctor consultation",
            },
            title: '远程专家问诊',
            desc: '随时连线全国名医在线问诊，省去往返奔波与排队等候。',
        },
    ]).meta({ description: "图标要点列表，4-6 条" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const fallbackItems: SlideData['items'] = [
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg",
            __icon_query__: "heartbeat monitor",
        },
        title: '智能体征监测',
        desc: '7×24 小时连续采集心率、血压等核心体征，异常实时预警。',
    },
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/first-aid-kit-bold.svg",
            __icon_query__: "first aid kit",
        },
        title: '分级诊疗通道',
        desc: '依据病情智能分诊，打通基层与三甲医院双向转诊绿色通道。',
    },
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/pill-bold.svg",
            __icon_query__: "medication pill",
        },
        title: '用药安全提醒',
        desc: '个性化用药方案与服药提醒，自动核查药物相互作用风险。',
    },
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg",
            __icon_query__: "health data security",
        },
        title: '隐私安全保障',
        desc: '健康数据全程加密存储，严格遵循医疗信息保护规范。',
    },
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/stethoscope-bold.svg",
            __icon_query__: "doctor consultation",
        },
        title: '远程专家问诊',
        desc: '随时连线全国名医在线问诊，省去往返奔波与排队等候。',
    },
]

const IconList: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '全周期健康管理服务'
    const items = (slideData?.items && slideData.items.length > 0 ? slideData.items : fallbackItems).slice(0, 6)

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
                {/* 背景装饰层：脉搏波形 + 十字 + 柔和光晕 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    {/* 左上柔和光晕 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-120px', left: '-120px', width: '360px', height: '360px', borderRadius: '9999px',
                            background: "radial-gradient(circle, var(--primary-color,#0ea5e9) 0%, rgba(14,165,233,0) 70%)",
                            opacity: 0.12,
                        }}
                    />
                    {/* 右下柔和光晕（绿） */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '-140px', right: '-100px', width: '380px', height: '380px', borderRadius: '9999px',
                            background: "radial-gradient(circle, var(--secondary-color,#10b981) 0%, rgba(16,185,129,0) 70%)",
                            opacity: 0.12,
                        }}
                    />
                    {/* 顶部脉搏波形 */}
                    <svg viewBox="0 0 1280 120" className="absolute top-0 left-0 w-full" preserveAspectRatio="none" aria-hidden="true">
                        <polyline
                            points="0,72 200,72 250,72 280,30 320,108 360,52 400,72 1000,72 1040,72 1070,40 1110,100 1150,58 1190,72 1280,72"
                            fill="none"
                            stroke="var(--primary-color,#0ea5e9)"
                            strokeOpacity="0.16"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    </svg>
                    {/* 右上角十字母题 */}
                    <svg viewBox="0 0 80 80" className="absolute" style={{ top: '40px', right: '56px', width: '64px', height: '64px' }} aria-hidden="true">
                        <rect x="32" y="10" width="16" height="60" rx="6" fill="var(--secondary-color,#10b981)" fillOpacity="0.14" />
                        <rect x="10" y="32" width="60" height="16" rx="6" fill="var(--secondary-color,#10b981)" fillOpacity="0.14" />
                    </svg>
                </div>

                {/* 内容主体 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <span
                            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#0ea5e9)",
                                background: "rgba(14,165,233,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#10b981)" }}
                            />
                            医疗健康服务
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-5 h-1.5 w-20 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))" }}
                        />
                    </div>

                    {/* 要点列表区 */}
                    <div className="mt-8 flex flex-1 flex-col justify-center gap-4">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-5 rounded-2xl border px-6 py-4"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#e2e8f0)",
                                    boxShadow: '0 8px 24px -12px rgba(15,23,42,0.12)',
                                }}
                            >
                                {/* 左图标：圆角方块 + 蓝绿渐变 */}
                                <div
                                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                        background: i % 2 === 0
                                            ? "linear-gradient(135deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))"
                                            : "linear-gradient(135deg, var(--secondary-color,#10b981), var(--primary-color,#0ea5e9))",
                                        boxShadow: '0 6px 16px -6px rgba(14,165,233,0.45)',
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url={item?.icon?.__icon_url__}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-6 h-6"
                                        title={item?.icon?.__icon_query__}
                                    />
                                </div>

                                {/* 右文字 */}
                                <div className="flex min-w-0 flex-1 flex-col leading-relaxed">
                                    <span
                                        className="text-lg font-bold leading-[1.4] break-words"
                                        style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {item?.title}
                                    </span>
                                    <span
                                        className="mt-1 text-sm leading-[1.7] break-words"
                                        style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {item?.desc}
                                    </span>
                                </div>

                                {/* 行尾序号点缀 */}
                                <span
                                    className="hidden flex-shrink-0 text-2xl font-black leading-none sm:block"
                                    style={{ color: "var(--primary-color,#0ea5e9)", opacity: 0.18 }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default IconList
