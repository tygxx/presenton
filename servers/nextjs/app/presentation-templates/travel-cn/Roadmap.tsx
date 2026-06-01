import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'travel-cn-roadmap'
export const layoutName = '路线图'
export const layoutDescription = '文旅风路线图：明媚海蓝背景配暖阳橙点缀，阶段卡横向排列连成一条旅程路线，含指南针与路线点装饰。纯 CSS/SVG，离线可渲染，用于分阶段行程或计划。'

const phaseItemSchema = z.string().min(2).max(24).meta({
    description: "该阶段下的一条要点（中文，简短）",
})

const phaseSchema = z.object({
    phase: z.string().min(2).max(10).default('第一阶段').meta({
        description: "阶段编号，如『第一阶段』『启程』",
    }),
    title: z.string().min(2).max(16).default('启程探路').meta({
        description: "阶段标题（中文，简短有力）",
    }),
    icon: z.object({
        __icon_url__: z.string().meta({ description: "URL to icon" }),
        __icon_query__: z.string().min(2).max(40).meta({ description: "图标英文检索词" }),
    }).default({
        __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg',
        __icon_query__: 'compass navigation',
    }).meta({ description: "阶段图标" }),
    items: z.array(phaseItemSchema).min(1).max(3).default([
        '确定目的地与出行主题',
        '规划航线与签证准备',
    ]).meta({ description: "该阶段的要点列表（1-3 条）" }),
})

const schema = z.object({
    title: z.string().min(2).max(20).default('文旅之旅路线规划').meta({
        description: "路线图主标题（中文，简短）",
    }),
    subtitle: z.string().min(2).max(40).default('从启程到归来，循序展开一段令人向往的旅程').meta({
        description: "副标题，一句话说明（中文）",
    }),
    phases: z.array(phaseSchema).min(3).max(4).default([
        {
            phase: '第一阶段',
            title: '启程探路',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg',
                __icon_query__: 'compass navigation',
            },
            items: ['确定目的地与出行主题', '规划航线与签证准备', '预订机票与精选酒店'],
        },
        {
            phase: '第二阶段',
            title: '抵达启幕',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/airplane-tilt-bold.svg',
                __icon_query__: 'airplane travel',
            },
            items: ['落地接机与酒店入住', '熟悉周边与行程预热'],
        },
        {
            phase: '第三阶段',
            title: '深度畅游',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-trifold-bold.svg',
                __icon_query__: 'map exploration',
            },
            items: ['打卡核心景点与地标', '体验当地美食与人文', '海岛休闲与户外探索'],
        },
        {
            phase: '第四阶段',
            title: '满载归程',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/suitcase-rolling-bold.svg',
                __icon_query__: 'suitcase return',
            },
            items: ['采购伴手礼与纪念品', '整理影像与旅程回顾'],
        },
    ]).meta({ description: "阶段列表（3-4 个，横向排列连成路线）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Roadmap: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '文旅之旅路线规划'
    const subtitle = slideData?.subtitle || '从启程到归来，循序展开一段令人向往的旅程'
    const phases = (slideData?.phases && slideData.phases.length > 0)
        ? slideData.phases
        : [
            {
                phase: '第一阶段',
                title: '启程探路',
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg',
                    __icon_query__: 'compass navigation',
                },
                items: ['确定目的地与出行主题', '规划航线与签证准备', '预订机票与精选酒店'],
            },
            {
                phase: '第二阶段',
                title: '抵达启幕',
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/airplane-tilt-bold.svg',
                    __icon_query__: 'airplane travel',
                },
                items: ['落地接机与酒店入住', '熟悉周边与行程预热'],
            },
            {
                phase: '第三阶段',
                title: '深度畅游',
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-trifold-bold.svg',
                    __icon_query__: 'map exploration',
                },
                items: ['打卡核心景点与地标', '体验当地美食与人文', '海岛休闲与户外探索'],
            },
            {
                phase: '第四阶段',
                title: '满载归程',
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/suitcase-rolling-bold.svg',
                    __icon_query__: 'suitcase return',
                },
                items: ['采购伴手礼与纪念品', '整理影像与旅程回顾'],
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
                    background: "var(--background-color,#f0f9ff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：海蓝光晕 + 暖阳橙点 + 旅程路线纹理 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="travelSkyGlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="travelSunGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.22" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#travelSkyGlow)" />
                        {/* 暖阳光晕（右上） */}
                        <circle cx="1120" cy="120" r="220" fill="url(#travelSunGlow)" />
                        {/* 同心指南针环（左下淡纹） */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={i} cx="120" cy="650" r={60 + i * 70} fill="none" stroke="var(--primary-color,#0891b2)" strokeOpacity={0.06} strokeWidth="1.5" />
                        ))}
                        {/* 蜿蜒旅程虚线 */}
                        <path
                            d="M 40 470 C 280 380, 420 540, 660 450 S 1080 360, 1250 460"
                            fill="none"
                            stroke="var(--primary-color,#0891b2)"
                            strokeOpacity="0.12"
                            strokeWidth="2.5"
                            strokeDasharray="2 14"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-14 pt-10 pb-9">
                    {/* 顶部标题区 */}
                    <div className="flex items-start gap-4">
                        {/* 指南针角标 */}
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                            style={{
                                background: "var(--primary-color,#0891b2)",
                                boxShadow: '0 8px 20px rgba(8,145,178,0.22)',
                            }}
                        >
                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                                <circle cx="12" cy="12" r="9" stroke="var(--primary-text,#ffffff)" strokeWidth="1.6" />
                                <path d="M12 12 L15.2 8.8 L12.8 11.2 Z" fill="var(--secondary-color,#f59e0b)" />
                                <path d="M12 12 L8.8 15.2 L11.2 12.8 Z" fill="var(--primary-text,#ffffff)" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <p
                                className="mt-2 text-base leading-relaxed break-words"
                                style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    {/* 阶段卡横向排列 */}
                    <div className="mt-9 flex flex-1 items-stretch gap-5">
                        {phases.map((p, i) => {
                            const isLast = i === phases.length - 1
                            return (
                                <div key={i} className="flex flex-1 flex-col">
                                    {/* 路线点 + 连接线 */}
                                    <div className="flex items-center">
                                        <div
                                            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-black"
                                            style={{
                                                background: "var(--secondary-color,#f59e0b)",
                                                color: "var(--primary-text,#ffffff)",
                                                boxShadow: '0 0 0 5px rgba(245,158,11,0.15)',
                                            }}
                                        >
                                            {i + 1}
                                        </div>
                                        {!isLast && (
                                            <div
                                                className="ml-2 h-[2px] flex-1 rounded-full"
                                                style={{
                                                    backgroundImage: 'repeating-linear-gradient(to right, var(--primary-color,#0891b2) 0 6px, transparent 6px 12px)',
                                                    opacity: 0.45,
                                                }}
                                            />
                                        )}
                                    </div>

                                    {/* 阶段卡片 */}
                                    <div
                                        className="mt-4 flex flex-1 flex-col rounded-2xl border p-5"
                                        style={{
                                            background: "var(--card-color,#ffffff)",
                                            borderColor: "var(--stroke,#bae6fd)",
                                            boxShadow: '0 10px 28px rgba(8,145,178,0.10)',
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                                                style={{ background: "var(--primary-color,#0891b2)" }}
                                            >
                                                <RemoteSvgIcon
                                                    url={p?.icon?.__icon_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg'}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-text,#ffffff)"
                                                    className="w-6 h-6"
                                                    title={p?.icon?.__icon_query__ || 'travel stage'}
                                                />
                                            </div>
                                            <span
                                                className="text-xs font-bold tracking-wide break-words"
                                                style={{ color: "var(--secondary-color,#f59e0b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {p?.phase || '第一阶段'}
                                            </span>
                                        </div>

                                        <h2
                                            className="mt-3 text-xl font-black leading-[1.3] break-words"
                                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p?.title || '阶段标题'}
                                        </h2>

                                        <div
                                            className="my-3 h-[2px] w-10 rounded-full"
                                            style={{ background: "var(--secondary-color,#f59e0b)", opacity: 0.7 }}
                                        />

                                        <ul className="flex flex-col gap-2.5">
                                            {(p?.items || []).map((item, j) => (
                                                <li key={j} className="flex items-start gap-2">
                                                    <span
                                                        className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                                        style={{ background: "var(--primary-color,#0891b2)" }}
                                                    />
                                                    <span
                                                        className="text-sm leading-[1.7] break-words"
                                                        style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.86, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                    >
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
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
