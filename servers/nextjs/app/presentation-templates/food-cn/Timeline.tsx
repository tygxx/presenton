import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'food-cn-timeline'
export const layoutName = '时间线'
export const layoutDescription = '美食餐饮风横向里程碑时间线：暖米底 + 食欲橙红圆盘节点，焦糖金描边轴线，温暖诱人。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('品牌成长里程碑').meta({
        description: "时间线主标题（中文，简短有力，如『品牌成长之路』）",
    }),
    milestones: z.array(z.object({
        time: z.string().min(1).max(10).meta({
            description: "时间节点，如年份/月份，例『2018年』",
        }),
        title: z.string().min(1).max(14).meta({
            description: "里程碑标题（中文，简短），例『首店开业』",
        }),
        desc: z.string().min(2).max(36).meta({
            description: "里程碑简要说明（一句话）",
        }),
        icon: IconSchema.default({
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/storefront-bold.svg",
            __icon_query__: "storefront",
        }).meta({ description: "节点图标" }),
    })).min(3).max(5).default([
        {
            time: '2016年',
            title: '初心小灶',
            desc: '城东巷口一间二十平的小馆，主打家常烟火味。',
            icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cooking-pot-bold.svg", __icon_query__: "cooking pot" },
        },
        {
            time: '2019年',
            title: '首店开业',
            desc: '正式注册品牌，第一家标准门店落地核心商圈。',
            icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/storefront-bold.svg", __icon_query__: "storefront" },
        },
        {
            time: '2021年',
            title: '中央厨房',
            desc: '自建中央厨房，统一供应链，口味与品质双稳定。',
            icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chef-hat-bold.svg", __icon_query__: "chef hat" },
        },
        {
            time: '2023年',
            title: '百店连锁',
            desc: '门店突破一百家，覆盖全国十二座城市。',
            icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg", __icon_query__: "fork knife" },
        },
        {
            time: '2025年',
            title: '品牌升级',
            desc: '焕新视觉与菜单，迈向温暖高端的餐饮新阶段。',
            icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/sparkle-bold.svg", __icon_query__: "sparkle" },
        },
    ]).meta({ description: "里程碑节点列表（3-5个）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Timeline: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '品牌成长里程碑'
    const milestones = (slideData?.milestones && slideData.milestones.length > 0)
        ? slideData.milestones
        : [
            { time: '2016年', title: '初心小灶', desc: '城东巷口一间二十平的小馆，主打家常烟火味。', icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cooking-pot-bold.svg", __icon_query__: "cooking pot" } },
            { time: '2019年', title: '首店开业', desc: '正式注册品牌，第一家标准门店落地核心商圈。', icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/storefront-bold.svg", __icon_query__: "storefront" } },
            { time: '2021年', title: '中央厨房', desc: '自建中央厨房，统一供应链，口味与品质双稳定。', icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chef-hat-bold.svg", __icon_query__: "chef hat" } },
            { time: '2023年', title: '百店连锁', desc: '门店突破一百家，覆盖全国十二座城市。', icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg", __icon_query__: "fork knife" } },
            { time: '2025年', title: '品牌升级', desc: '焕新视觉与菜单，迈向温暖高端的餐饮新阶段。', icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/sparkle-bold.svg", __icon_query__: "sparkle" } },
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
                {/* 背景装饰层：圆盘构图 + 暖色光晕 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="foodTlGlow" cx="50%" cy="0%" r="80%">
                                <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="foodTlPlate" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0.08" />
                                <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.04" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#foodTlGlow)" />
                        {/* 左上焦糖金圆盘 */}
                        <circle cx="120" cy="100" r="170" fill="url(#foodTlPlate)" />
                        <circle cx="120" cy="100" r="170" fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity="0.12" strokeWidth="2" />
                        <circle cx="120" cy="100" r="130" fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity="0.10" strokeWidth="1.5" strokeDasharray="3 8" />
                        {/* 右下暖色圆盘 */}
                        <circle cx="1180" cy="660" r="200" fill="url(#foodTlPlate)" />
                        <circle cx="1180" cy="660" r="200" fill="none" stroke="var(--secondary-color,#c92a2a)" strokeOpacity="0.10" strokeWidth="2" />
                        <circle cx="1180" cy="660" r="155" fill="none" stroke="var(--secondary-color,#c92a2a)" strokeOpacity="0.10" strokeWidth="1.5" strokeDasharray="3 8" />
                    </svg>
                </div>

                {/* 右上角餐具点缀角标 */}
                <div className="absolute top-7 right-9 z-10 flex items-center gap-2.5" aria-hidden="true">
                    <span
                        className="flex h-9 w-9 items-center justify-center rounded-full"
                        style={{ background: "var(--card-color,#fffaf2)", border: "1.5px solid var(--stroke,#f0e0cc)" }}
                    >
                        <RemoteSvgIcon
                            url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg"
                            strokeColor="currentColor"
                            color="var(--primary-color,#e8590c)"
                            className="w-4 h-4"
                            title="fork knife"
                        />
                    </span>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 pt-12 pb-14">
                    {/* 标题区 */}
                    <div className="flex items-center gap-4">
                        <span
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                            style={{
                                background: "var(--primary-color,#e8590c)",
                                boxShadow: "0 6px 16px rgba(232,89,12,0.28), 0 0 0 6px rgba(232,89,12,0.10)",
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/bowl-food-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-6 h-6"
                                title="bowl food"
                            />
                        </span>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div className="mt-2.5 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#c92a2a)" }} />
                        </div>
                    </div>

                    {/* 横向时间线 */}
                    <div className="relative mt-4 flex flex-1 items-center">
                        {/* 轴线（焦糖金描边） */}
                        <div
                            className="absolute left-0 right-0 rounded-full"
                            style={{
                                top: '50%',
                                height: '4px',
                                transform: 'translateY(-50%)',
                                background: "linear-gradient(90deg, var(--primary-color,#e8590c) 0%, var(--secondary-color,#c92a2a) 100%)",
                                opacity: 0.85,
                            }}
                        />

                        {/* 节点列表 */}
                        <div className="relative z-10 flex w-full items-stretch justify-between gap-5">
                            {milestones.map((m, i) => {
                                const above = i % 2 === 0
                                return (
                                    <div key={i} className="flex flex-1 flex-col items-center justify-center">
                                        {/* 上方卡片（偶数节点） */}
                                        {above && (
                                            <div className="flex w-full flex-col items-center">
                                                <div
                                                    className="w-full rounded-2xl px-4 py-3.5 text-center"
                                                    style={{
                                                        background: "var(--card-color,#fffaf2)",
                                                        border: "1.5px solid var(--stroke,#f0e0cc)",
                                                        boxShadow: "0 8px 22px rgba(59,36,18,0.07)",
                                                    }}
                                                >
                                                    <span
                                                        className="inline-block rounded-full px-3 py-1 text-sm font-bold break-words"
                                                        style={{
                                                            background: "rgba(232,89,12,0.10)",
                                                            color: "var(--primary-color,#e8590c)",
                                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {m.time}
                                                    </span>
                                                    <h3
                                                        className="mt-2 text-lg font-bold leading-[1.3] break-words"
                                                        style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                    >
                                                        {m.title}
                                                    </h3>
                                                    <p
                                                        className="mt-1.5 text-sm leading-relaxed break-words"
                                                        style={{ color: "var(--background-text,#7a5a3f)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                    >
                                                        {m.desc}
                                                    </p>
                                                </div>
                                                {/* 连接小段 */}
                                                <div className="h-5 w-0.5 rounded-full" style={{ background: "var(--stroke,#f0e0cc)" }} />
                                            </div>
                                        )}

                                        {/* 圆盘节点 */}
                                        <div
                                            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{
                                                background: "var(--card-color,#fffaf2)",
                                                border: "3px solid var(--primary-color,#e8590c)",
                                                boxShadow: "0 0 0 6px var(--background-color,#fdf6ec), 0 6px 16px rgba(232,89,12,0.22)",
                                            }}
                                        >
                                            <span
                                                className="flex h-9 w-9 items-center justify-center rounded-full"
                                                style={{ background: i % 2 === 0 ? "var(--primary-color,#e8590c)" : "var(--secondary-color,#c92a2a)" }}
                                            >
                                                <RemoteSvgIcon
                                                    url={m.icon?.__icon_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg"}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-text,#ffffff)"
                                                    className="w-5 h-5"
                                                    title={m.icon?.__icon_query__ || "milestone"}
                                                />
                                            </span>
                                        </div>

                                        {/* 下方卡片（奇数节点） */}
                                        {!above && (
                                            <div className="flex w-full flex-col items-center">
                                                {/* 连接小段 */}
                                                <div className="h-5 w-0.5 rounded-full" style={{ background: "var(--stroke,#f0e0cc)" }} />
                                                <div
                                                    className="w-full rounded-2xl px-4 py-3.5 text-center"
                                                    style={{
                                                        background: "var(--card-color,#fffaf2)",
                                                        border: "1.5px solid var(--stroke,#f0e0cc)",
                                                        boxShadow: "0 8px 22px rgba(59,36,18,0.07)",
                                                    }}
                                                >
                                                    <span
                                                        className="inline-block rounded-full px-3 py-1 text-sm font-bold break-words"
                                                        style={{
                                                            background: "rgba(201,42,42,0.10)",
                                                            color: "var(--secondary-color,#c92a2a)",
                                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {m.time}
                                                    </span>
                                                    <h3
                                                        className="mt-2 text-lg font-bold leading-[1.3] break-words"
                                                        style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                    >
                                                        {m.title}
                                                    </h3>
                                                    <p
                                                        className="mt-1.5 text-sm leading-relaxed break-words"
                                                        style={{ color: "var(--background-text,#7a5a3f)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                    >
                                                        {m.desc}
                                                    </p>
                                                </div>
                                            </div>
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
