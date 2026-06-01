import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'food-cn-roadmap'
export const layoutName = '路线图'
export const layoutDescription = '美食餐饮风路线图：暖米底配焦糖金描边，圆盘构图横向排列阶段卡，呈现分阶段计划。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('门店成长路线图').meta({
        description: "路线图主标题（中文，简短，概括分阶段计划的主题）",
    }),
    phases: z.array(z.object({
        phase: z.string().min(2).max(10).meta({
            description: "阶段标记，如『第一阶段』『首季』",
        }),
        title: z.string().min(2).max(16).meta({
            description: "阶段标题，一句话概括本阶段目标",
        }),
        items: z.array(z.string().min(2).max(24).meta({
            description: "本阶段的具体动作或要点（中文，简短）",
        })).min(1).max(3).meta({
            description: "本阶段要点列表",
        }),
        icon: z.object({
            __icon_url__: z.string().meta({ description: "URL to icon" }),
            __icon_query__: z.string().min(2).max(40).meta({ description: "Query used to search the icon" }),
        }).meta({ description: "阶段图标" }),
    })).min(3).max(4).default([
        {
            phase: '第一阶段',
            title: '选址筹备与菜单打磨',
            items: ['核心商圈选址定位', '招牌菜品反复试做', '后厨动线与设备落位'],
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cooking-pot-bold.svg', __icon_query__: 'cooking pot' },
        },
        {
            phase: '第二阶段',
            title: '试营业与口碑沉淀',
            items: ['团队培训上岗', '邀请食客试吃打分', '收集反馈优化出品'],
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg', __icon_query__: 'fork and knife' },
        },
        {
            phase: '第三阶段',
            title: '正式开业引流',
            items: ['线上线下联合宣发', '会员体系上线', '外卖渠道全面铺开'],
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/storefront-bold.svg', __icon_query__: 'storefront' },
        },
        {
            phase: '第四阶段',
            title: '连锁复制与品牌升级',
            items: ['标准化运营手册', '区域分店布点', '品牌形象焕新'],
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/trend-up-bold.svg', __icon_query__: 'growth trend' },
        },
    ]).meta({ description: "分阶段计划列表（3-4 个阶段，横向排列）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Roadmap: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '门店成长路线图'
    const phases = (slideData?.phases && slideData.phases.length > 0)
        ? slideData.phases
        : [
            { phase: '第一阶段', title: '选址筹备与菜单打磨', items: ['核心商圈选址定位', '招牌菜品反复试做', '后厨动线与设备落位'], icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cooking-pot-bold.svg', __icon_query__: 'cooking pot' } },
            { phase: '第二阶段', title: '试营业与口碑沉淀', items: ['团队培训上岗', '邀请食客试吃打分', '收集反馈优化出品'], icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg', __icon_query__: 'fork and knife' } },
            { phase: '第三阶段', title: '正式开业引流', items: ['线上线下联合宣发', '会员体系上线', '外卖渠道全面铺开'], icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/storefront-bold.svg', __icon_query__: 'storefront' } },
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
                    background: "var(--background-color,#fdf6ec)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：圆盘构图 + 暖色光晕 + 焦糖金描边 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="foodRoadmapGlow" cx="50%" cy="0%" r="80%">
                                <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#foodRoadmapGlow)" />
                        {/* 左上焦糖金同心圆盘 */}
                        {[0, 1, 2].map((i) => (
                            <circle key={`tl-${i}`} cx="40" cy="80" r={70 + i * 60} fill="none" stroke="var(--secondary-color,#c92a2a)" strokeOpacity={0.07} strokeWidth="2" />
                        ))}
                        {/* 右下圆盘点缀 */}
                        {[0, 1].map((i) => (
                            <circle key={`br-${i}`} cx="1230" cy="690" r={90 + i * 70} fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity={0.08} strokeWidth="2" />
                        ))}
                    </svg>
                    {/* 暖色块 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-90px', right: '180px', width: '220px', height: '220px', borderRadius: '9999px',
                            background: 'radial-gradient(circle at 50% 50%, rgba(232,89,12,0.14), rgba(232,89,12,0))',
                        }}
                    />
                </div>

                {/* 内容区 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 items-center gap-4">
                        {/* 圆盘 + 餐具点缀图标 */}
                        <div
                            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
                            style={{
                                background: "var(--primary-color,#e8590c)",
                                boxShadow: '0 0 0 5px rgba(232,89,12,0.14)',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-7 h-7"
                                title="fork and knife"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div className="mt-2 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#c92a2a)" }} />
                        </div>
                    </div>

                    {/* 阶段卡横向排列 */}
                    <div className="mt-10 flex flex-1 items-stretch gap-6">
                        {phases.map((p, i) => {
                            const phaseLabel = p?.phase || `第${i + 1}阶段`
                            const phaseTitle = p?.title || ''
                            const items = (p?.items && p.items.length > 0) ? p.items : []
                            const iconUrl = p?.icon?.__icon_url__
                            const iconQuery = p?.icon?.__icon_query__ || 'food'
                            return (
                                <div
                                    key={i}
                                    className="flex flex-1 flex-col rounded-3xl border p-6"
                                    style={{
                                        background: "var(--card-color,#fffaf2)",
                                        borderColor: "var(--stroke,#f0e0cc)",
                                        boxShadow: '0 8px 24px rgba(146,42,42,0.06)',
                                    }}
                                >
                                    {/* 圆盘序号 + 图标 */}
                                    <div className="flex items-center justify-between">
                                        <div
                                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{
                                                background: "var(--primary-color,#e8590c)",
                                                boxShadow: '0 0 0 4px rgba(232,89,12,0.12)',
                                            }}
                                        >
                                            {iconUrl ? (
                                                <RemoteSvgIcon
                                                    url={iconUrl}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-text,#ffffff)"
                                                    className="w-6 h-6"
                                                    title={iconQuery}
                                                />
                                            ) : (
                                                <span className="text-lg font-black" style={{ color: "var(--primary-text,#ffffff)" }}>
                                                    {i + 1}
                                                </span>
                                            )}
                                        </div>
                                        <span
                                            className="text-5xl font-black leading-none"
                                            style={{ color: "var(--secondary-color,#c92a2a)", opacity: 0.18 }}
                                        >
                                            0{i + 1}
                                        </span>
                                    </div>

                                    {/* 阶段标记 */}
                                    <span
                                        className="mt-5 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold break-words"
                                        style={{
                                            color: "var(--primary-color,#e8590c)",
                                            background: 'rgba(232,89,12,0.10)',
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {phaseLabel}
                                    </span>

                                    {/* 阶段标题 */}
                                    <h2
                                        className="mt-3 text-lg font-bold leading-[1.4] break-words"
                                        style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {phaseTitle}
                                    </h2>

                                    {/* 焦糖金分隔线 */}
                                    <div className="my-4 h-px w-full" style={{ background: "var(--stroke,#f0e0cc)" }} />

                                    {/* 要点列表 */}
                                    <ul className="flex flex-col gap-2.5">
                                        {items.map((it, j) => (
                                            <li key={j} className="flex items-start gap-2.5">
                                                <span
                                                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                                    style={{ background: "var(--primary-color,#e8590c)" }}
                                                />
                                                <span
                                                    className="text-sm leading-[1.7] break-words"
                                                    style={{ color: "var(--background-text,#3b2412)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
