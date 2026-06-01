import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'green-cn-roadmap'
export const layoutName = '路线图'
export const layoutDescription = '新能源环保风路线图：分阶段计划横向排列的阶段卡，叶片/地球/自然曲线装饰，清新白绿配色。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('碳中和行动路线图').meta({
        description: "路线图主标题（中文，简短有力）",
    }),
    phases: z.array(z.object({
        phase: z.string().min(2).max(10).meta({
            description: "阶段标签，如『第一阶段』『近期』",
        }),
        title: z.string().min(2).max(16).meta({
            description: "阶段标题（中文，简短）",
        }),
        items: z.array(z.string().min(2).max(24).meta({
            description: "阶段要点（中文，一句话）",
        })).min(1).max(3).meta({
            description: "该阶段的关键举措列表",
        }),
        icon: z.object({
            __icon_url__: z.string().meta({ description: "URL to icon" }),
            __icon_query__: z.string().min(2).max(40).meta({ description: "Query used to search the icon" }),
        }).meta({ description: "阶段图标" }),
    })).min(3).max(4).default([
        {
            phase: '第一阶段',
            title: '绿色基建奠基',
            items: ['完成厂区屋顶光伏铺设', '建成储能与微电网系统', '建立碳排放数据监测平台'],
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg',
                __icon_query__: 'leaf seedling',
            },
        },
        {
            phase: '第二阶段',
            title: '清洁能源替代',
            items: ['绿电占比提升至六成以上', '逐步淘汰高耗能旧设备', '推动供应链协同减碳'],
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightning-bold.svg',
                __icon_query__: 'clean energy lightning',
            },
        },
        {
            phase: '第三阶段',
            title: '循环低碳运营',
            items: ['废弃物资源化循环利用', '产品全生命周期碳足迹核算', '碳汇林与生态修复并举'],
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/recycle-bold.svg',
                __icon_query__: 'recycle circular',
            },
        },
        {
            phase: '第四阶段',
            title: '迈向碳中和',
            items: ['实现运营范围净零排放', '获得权威碳中和认证', '引领行业可持续发展'],
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-hemisphere-east-bold.svg',
                __icon_query__: 'earth globe sustainability',
            },
        },
    ]).meta({ description: "分阶段计划列表，横向排列的阶段卡" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Roadmap: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '碳中和行动路线图'
    const phases = (slideData?.phases && slideData.phases.length > 0)
        ? slideData.phases
        : [
            {
                phase: '第一阶段',
                title: '绿色基建奠基',
                items: ['完成厂区屋顶光伏铺设', '建成储能与微电网系统', '建立碳排放数据监测平台'],
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg',
                    __icon_query__: 'leaf seedling',
                },
            },
            {
                phase: '第二阶段',
                title: '清洁能源替代',
                items: ['绿电占比提升至六成以上', '逐步淘汰高耗能旧设备', '推动供应链协同减碳'],
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightning-bold.svg',
                    __icon_query__: 'clean energy lightning',
                },
            },
            {
                phase: '第三阶段',
                title: '循环低碳运营',
                items: ['废弃物资源化循环利用', '产品全生命周期碳足迹核算', '碳汇林与生态修复并举'],
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/recycle-bold.svg',
                    __icon_query__: 'recycle circular',
                },
            },
            {
                phase: '第四阶段',
                title: '迈向碳中和',
                items: ['实现运营范围净零排放', '获得权威碳中和认证', '引领行业可持续发展'],
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-hemisphere-east-bold.svg',
                    __icon_query__: 'earth globe sustainability',
                },
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
                    background: "var(--background-color,#f0fdf4)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：天空蓝晕染 + 自然有机曲线 + 叶脉 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="greenRoadmapSky" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="greenRoadmapLeaf" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.06" />
                            </linearGradient>
                        </defs>
                        {/* 顶部天空蓝晕染 */}
                        <rect x="0" y="0" width="1280" height="320" fill="url(#greenRoadmapSky)" />
                        {/* 底部自然有机绿色丘陵 */}
                        <path
                            d="M0,640 C220,580 420,700 680,648 C920,600 1080,672 1280,612 L1280,720 L0,720 Z"
                            fill="var(--primary-color,#16a34a)"
                            fillOpacity="0.07"
                        />
                        <path
                            d="M0,688 C260,640 480,724 760,680 C1000,644 1120,712 1280,668 L1280,720 L0,720 Z"
                            fill="var(--secondary-color,#0891b2)"
                            fillOpacity="0.06"
                        />
                        {/* 右上角大叶片母题 + 叶脉 */}
                        <g transform="translate(1080,40)">
                            <path
                                d="M0,180 C0,80 80,0 180,0 C180,100 100,180 0,180 Z"
                                fill="url(#greenRoadmapLeaf)"
                            />
                            <path d="M14,166 C70,110 124,56 168,12" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.16" strokeWidth="2" />
                            <path d="M40,150 L78,140 M64,124 L100,116 M90,98 L124,92" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.12" strokeWidth="1.5" />
                        </g>
                        {/* 左侧小叶片点缀 */}
                        <path
                            d="M64,96 C64,60 92,32 128,32 C128,68 100,96 64,96 Z"
                            fill="var(--primary-color,#16a34a)"
                            fillOpacity="0.10"
                        />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 pt-12 pb-14">
                    {/* 标题区 */}
                    <div className="flex items-center gap-4">
                        <span
                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                            style={{ background: "var(--primary-color,#16a34a)" }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-6 h-6"
                                title="leaf"
                            />
                        </span>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                    </div>
                    <div className="mt-4 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#0891b2)" }} />

                    {/* 阶段卡横向排列 */}
                    <div className="mt-10 flex flex-1 items-stretch gap-6">
                        {phases.map((p, i) => {
                            const items = (p?.items && p.items.length > 0) ? p.items : ['关键举措待补充']
                            const iconUrl = p?.icon?.__icon_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg'
                            const iconQuery = p?.icon?.__icon_query__ || 'leaf'
                            return (
                                <div key={i} className="flex flex-1 flex-col">
                                    {/* 阶段序号 + 连接节点 */}
                                    <div className="flex items-center">
                                        <span
                                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-black"
                                            style={{ background: "var(--primary-color,#16a34a)", color: "var(--primary-text,#ffffff)" }}
                                        >
                                            {i + 1}
                                        </span>
                                        <span
                                            className="ml-3 h-[3px] flex-1 rounded-full"
                                            style={{ background: "var(--stroke,#d1fae5)" }}
                                        />
                                    </div>

                                    {/* 阶段卡 */}
                                    <div
                                        className="mt-5 flex flex-1 flex-col rounded-2xl border p-6 shadow-sm"
                                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#d1fae5)" }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                                                style={{ background: "var(--primary-color,#16a34a)" }}
                                            >
                                                <RemoteSvgIcon
                                                    url={iconUrl}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-text,#ffffff)"
                                                    className="w-5 h-5"
                                                    title={iconQuery}
                                                />
                                            </span>
                                            <span
                                                className="text-xs font-bold tracking-wide break-words"
                                                style={{ color: "var(--secondary-color,#0891b2)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {p?.phase || `第${i + 1}阶段`}
                                            </span>
                                        </div>

                                        <h3
                                            className="mt-4 text-xl font-bold leading-[1.3] break-words"
                                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p?.title || '阶段标题'}
                                        </h3>

                                        <ul className="mt-4 flex flex-col gap-3">
                                            {items.map((it, j) => (
                                                <li key={j} className="flex items-start gap-2.5">
                                                    <span
                                                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                                        style={{ background: "var(--primary-color,#16a34a)" }}
                                                    />
                                                    <span
                                                        className="text-sm leading-relaxed break-words"
                                                        style={{ color: "var(--background-text,#14532d)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                    >
                                                        {it}
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
