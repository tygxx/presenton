import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'travel-cn-timeline'
export const layoutName = '时间线'
export const layoutDescription = '文旅风横向里程碑时间线：明媚海蓝渐变背景 + 暖阳橙节点，配指南针与路线点缀，纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('环岛之旅行程脉络').meta({
        description: "时间线主标题（中文，简短有力，≤20 字）",
    }),
    milestones: z.array(z.object({
        time: z.string().min(1).max(10).meta({
            description: "时间标签，如『第一天』『上午』『2026春』，≤10 字",
        }),
        title: z.string().min(2).max(14).meta({
            description: "节点标题，如目的地或里程碑名称，≤14 字",
        }),
        desc: z.string().min(2).max(36).meta({
            description: "节点说明，一句话介绍亮点，≤36 字",
        }),
    })).min(3).max(5).default([
        { time: '第一天', title: '海湾启程', desc: '抵达滨海小城，漫步金色沙滩，迎接海风第一缕暖阳。' },
        { time: '第二天', title: '古巷寻味', desc: '穿行老城街巷，品尝地道风味小吃，邂逅市井烟火。' },
        { time: '第三天', title: '山海观景', desc: '登临观海平台，俯瞰碧波万顷，记录最美海岸线。' },
        { time: '第四天', title: '岛屿探索', desc: '搭船登上离岛，浮潜赏珊瑚，沉醉于澄澈海水间。' },
        { time: '第五天', title: '日落归途', desc: '于落日余晖中告别海岸，满载美好回忆踏上归程。' },
    ]).meta({
        description: "里程碑节点列表（3~5 个），沿横向轴线依次展开",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DEFAULT_MILESTONES = [
    { time: '第一天', title: '海湾启程', desc: '抵达滨海小城，漫步金色沙滩，迎接海风第一缕暖阳。' },
    { time: '第二天', title: '古巷寻味', desc: '穿行老城街巷，品尝地道风味小吃，邂逅市井烟火。' },
    { time: '第三天', title: '山海观景', desc: '登临观海平台，俯瞰碧波万顷，记录最美海岸线。' },
    { time: '第四天', title: '岛屿探索', desc: '搭船登上离岛，浮潜赏珊瑚，沉醉于澄澈海水间。' },
    { time: '第五天', title: '日落归途', desc: '于落日余晖中告别海岸，满载美好回忆踏上归程。' },
]

const NODE_ICONS = [
    'map-pin',
    'mountains',
    'sun-horizon',
    'anchor',
    'flag-banner',
]

const Timeline: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '环岛之旅行程脉络'
    const milestones = (slideData?.milestones && slideData.milestones.length > 0)
        ? slideData.milestones
        : DEFAULT_MILESTONES

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
                {/* 背景装饰层：明媚海蓝渐变 + 暖阳光晕 + 路线点缀 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="travelSky" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="travelSun" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.22" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#travelSky)" />
                        {/* 暖阳光晕 */}
                        <circle cx="1120" cy="120" r="200" fill="url(#travelSun)" />
                        {/* 轻盈山海曲线 */}
                        <path d="M-40 640 C 240 560, 420 690, 700 600 S 1120 560, 1340 630 L 1340 760 L -40 760 Z" fill="var(--primary-color,#0891b2)" fillOpacity="0.06" />
                        <path d="M-40 690 C 300 620, 520 720, 820 650 S 1180 620, 1340 680 L 1340 760 L -40 760 Z" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.05" />
                        {/* 虚线路线点缀 */}
                        <path d="M120 200 C 360 120, 620 260, 900 160" fill="none" stroke="var(--primary-color,#0891b2)" strokeOpacity="0.12" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" />
                    </svg>
                </div>

                {/* 指南针角标装饰 */}
                <div
                    className="absolute top-9 right-12 flex h-12 w-12 items-center justify-center rounded-full"
                    aria-hidden="true"
                    style={{
                        background: "var(--card-color,#ffffff)",
                        border: "1.5px solid var(--stroke,#bae6fd)",
                        boxShadow: '0 4px 14px rgba(8,145,178,0.10)',
                    }}
                >
                    <RemoteSvgIcon
                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg"
                        strokeColor="currentColor"
                        color="var(--primary-color,#0891b2)"
                        className="w-6 h-6"
                        title="compass"
                    />
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 头部标题区 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <span
                            className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#0891b2)",
                                background: "rgba(8,145,178,0.08)",
                                border: "1px solid var(--stroke,#bae6fd)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/path-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-color,#0891b2)"
                                className="w-4 h-4"
                                title="route"
                            />
                            旅程时间线
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-4 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                        />
                    </div>

                    {/* 横向时间线区 */}
                    <div className="relative flex flex-1 items-center">
                        {/* 横向轴线 */}
                        <div
                            className="absolute left-0 right-0 rounded-full"
                            style={{
                                top: '50%',
                                height: '3px',
                                background: "linear-gradient(90deg, var(--primary-color,#0891b2), var(--secondary-color,#f59e0b))",
                                opacity: 0.45,
                            }}
                            aria-hidden="true"
                        />

                        {/* 节点 */}
                        <div className="relative z-10 flex w-full items-stretch justify-between gap-5">
                            {milestones.map((m, i) => {
                                const isUp = i % 2 === 0
                                const iconName = NODE_ICONS[i % NODE_ICONS.length]
                                return (
                                    <div key={i} className="flex flex-1 flex-col items-center">
                                        {/* 上方卡片（偶数） */}
                                        {isUp && (
                                            <div
                                                className="mb-3 w-full rounded-2xl border p-4 shadow-sm"
                                                style={{
                                                    background: "var(--card-color,#ffffff)",
                                                    borderColor: "var(--stroke,#bae6fd)",
                                                    boxShadow: '0 8px 22px rgba(8,145,178,0.08)',
                                                }}
                                            >
                                                <span
                                                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold break-words"
                                                    style={{
                                                        color: "var(--primary-text,#ffffff)",
                                                        background: "var(--secondary-color,#f59e0b)",
                                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                                    }}
                                                >
                                                    {m.time}
                                                </span>
                                                <h3
                                                    className="mt-2 text-lg font-bold leading-[1.3] break-words"
                                                    style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                >
                                                    {m.title}
                                                </h3>
                                                <p
                                                    className="mt-1.5 text-sm leading-relaxed break-words"
                                                    style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                >
                                                    {m.desc}
                                                </p>
                                            </div>
                                        )}

                                        {/* 轴上节点 */}
                                        <div className="flex flex-shrink-0 flex-col items-center">
                                            <div
                                                className="flex h-12 w-12 items-center justify-center rounded-full"
                                                style={{
                                                    background: isUp ? "var(--primary-color,#0891b2)" : "var(--secondary-color,#f59e0b)",
                                                    border: "3px solid var(--card-color,#ffffff)",
                                                    boxShadow: '0 0 0 4px rgba(8,145,178,0.12)',
                                                }}
                                            >
                                                <RemoteSvgIcon
                                                    url={`https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${iconName}-bold.svg`}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-text,#ffffff)"
                                                    className="w-6 h-6"
                                                    title={iconName}
                                                />
                                            </div>
                                            <span
                                                className="mt-1.5 text-xs font-bold leading-relaxed break-words"
                                                style={{ color: "var(--primary-color,#0891b2)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {i + 1}
                                            </span>
                                        </div>

                                        {/* 下方卡片（奇数） */}
                                        {!isUp && (
                                            <div
                                                className="mt-3 w-full rounded-2xl border p-4 shadow-sm"
                                                style={{
                                                    background: "var(--card-color,#ffffff)",
                                                    borderColor: "var(--stroke,#bae6fd)",
                                                    boxShadow: '0 8px 22px rgba(8,145,178,0.08)',
                                                }}
                                            >
                                                <span
                                                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold break-words"
                                                    style={{
                                                        color: "var(--primary-text,#ffffff)",
                                                        background: "var(--primary-color,#0891b2)",
                                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                                    }}
                                                >
                                                    {m.time}
                                                </span>
                                                <h3
                                                    className="mt-2 text-lg font-bold leading-[1.3] break-words"
                                                    style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                >
                                                    {m.title}
                                                </h3>
                                                <p
                                                    className="mt-1.5 text-sm leading-relaxed break-words"
                                                    style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                >
                                                    {m.desc}
                                                </p>
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
