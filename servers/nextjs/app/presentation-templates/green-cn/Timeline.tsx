import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'green-cn-timeline'
export const layoutName = '时间线'
export const layoutDescription = '新能源环保风时间线：横向自然曲线轴 + 圆角节点卡片，叶片与地球母题装饰，清新白绿配天空蓝。纯 CSS/SVG，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('绿色发展里程碑').meta({
        description: "时间线主标题（中文，简短有力）",
    }),
    milestones: z.array(z.object({
        time: z.string().min(1).max(10).meta({
            description: "时间节点，如年份/季度，如『2024』",
        }),
        title: z.string().min(2).max(14).meta({
            description: "里程碑标题（中文，简短）",
        }),
        desc: z.string().min(2).max(36).meta({
            description: "里程碑简要说明（一句话）",
        }),
    })).min(3).max(5).default([
        { time: '2021', title: '碳中和启动', desc: '发布碳达峰碳中和路线图，绿电占比迈过三成。' },
        { time: '2022', title: '光伏全面铺设', desc: '园区屋顶光伏并网，年减碳排放逾两万吨。' },
        { time: '2023', title: '储能体系成型', desc: '建成智慧储能矩阵，绿能消纳率提升至九成。' },
        { time: '2024', title: '零碳工厂认证', desc: '主力基地通过零碳工厂认证，循环水利用率创新高。' },
        { time: '2025', title: '生态共建生效', desc: '联合上下游构建绿色供应链，植被覆盖再扩展。' },
    ]).meta({
        description: "里程碑节点列表（3 到 5 项）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const NODE_ICONS = [
    'leaf-bold',
    'sun-bold',
    'battery-charging-bold',
    'factory-bold',
    'globe-hemisphere-west-bold',
]

const Timeline: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '绿色发展里程碑'
    const milestones = (slideData?.milestones && slideData.milestones.length > 0)
        ? slideData.milestones
        : [
            { time: '2021', title: '碳中和启动', desc: '发布碳达峰碳中和路线图，绿电占比迈过三成。' },
            { time: '2022', title: '光伏全面铺设', desc: '园区屋顶光伏并网，年减碳排放逾两万吨。' },
            { time: '2023', title: '储能体系成型', desc: '建成智慧储能矩阵，绿能消纳率提升至九成。' },
            { time: '2024', title: '零碳工厂认证', desc: '主力基地通过零碳工厂认证，循环水利用率创新高。' },
            { time: '2025', title: '生态共建生效', desc: '联合上下游构建绿色供应链，植被覆盖再扩展。' },
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
                {/* 背景装饰层：天空蓝光晕 + 自然有机曲线 + 叶片/地球母题 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="greenTlSky" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="greenTlGlow" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="220" fill="url(#greenTlSky)" />
                        {/* 自然有机曲线（山丘/水波） */}
                        <path d="M-40 640 C 220 560 380 700 640 620 C 900 540 1060 700 1320 600 L 1320 760 L -40 760 Z" fill="var(--primary-color,#16a34a)" fillOpacity="0.06" />
                        <path d="M-40 690 C 260 620 420 740 680 670 C 940 600 1100 730 1320 660 L 1320 760 L -40 760 Z" fill="var(--secondary-color,#0891b2)" fillOpacity="0.05" />
                        {/* 地球同心圆母题（右上） */}
                        <circle cx="1140" cy="120" r="200" fill="url(#greenTlGlow)" />
                        {[0, 1, 2].map((i) => (
                            <circle key={i} cx="1180" cy="90" r={50 + i * 34} fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.10" strokeWidth="1.5" />
                        ))}
                        {/* 叶片母题（左上） */}
                        <path d="M70 70 C 150 60 190 120 150 190 C 90 170 60 130 70 70 Z" fill="var(--primary-color,#16a34a)" fillOpacity="0.08" />
                        <path d="M86 88 C 120 110 132 150 138 178" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.16" strokeWidth="2" />
                    </svg>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 items-center gap-4">
                        <div
                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                            style={{ background: "var(--primary-color,#16a34a)", boxShadow: '0 8px 20px rgba(22,163,74,0.22)' }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-6 h-6"
                                title="leaf"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                        <div className="ml-auto h-1.5 w-20 flex-shrink-0 rounded-full" style={{ background: "var(--secondary-color,#0891b2)" }} />
                    </div>

                    {/* 横向时间线区 */}
                    <div className="relative flex flex-1 items-center">
                        {/* 横向轴线（自然曲线感渐变） */}
                        <div
                            className="absolute left-0 right-0 rounded-full"
                            style={{
                                top: '50%',
                                height: '4px',
                                transform: 'translateY(-50%)',
                                background: "linear-gradient(90deg, var(--primary-color,#16a34a) 0%, var(--secondary-color,#0891b2) 100%)",
                                opacity: 0.5,
                            }}
                        />

                        {/* 节点 */}
                        <div className="relative z-10 flex w-full items-stretch justify-between gap-5">
                            {milestones.map((m, i) => {
                                const isUp = i % 2 === 0
                                const iconName = NODE_ICONS[i % NODE_ICONS.length]
                                return (
                                    <div key={i} className="flex flex-1 flex-col items-center">
                                        {/* 上方卡片（偶数项） */}
                                        <div className={`flex w-full flex-col items-center ${isUp ? '' : 'opacity-0 pointer-events-none select-none'}`} aria-hidden={!isUp}>
                                            <MilestoneCard m={m} />
                                            <div className="h-6 w-px" style={{ background: "var(--stroke,#d1fae5)" }} />
                                        </div>

                                        {/* 轴上节点圆 */}
                                        <div className="flex flex-shrink-0 flex-col items-center">
                                            <div
                                                className="flex h-12 w-12 items-center justify-center rounded-full"
                                                style={{
                                                    background: "var(--card-color,#ffffff)",
                                                    border: '3px solid var(--primary-color,#16a34a)',
                                                    boxShadow: '0 6px 16px rgba(22,163,74,0.20)',
                                                }}
                                            >
                                                <RemoteSvgIcon
                                                    url={`https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${iconName}.svg`}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-color,#16a34a)"
                                                    className="w-6 h-6"
                                                    title="milestone"
                                                />
                                            </div>
                                        </div>

                                        {/* 下方卡片（奇数项） */}
                                        <div className={`flex w-full flex-col items-center ${!isUp ? '' : 'opacity-0 pointer-events-none select-none'}`} aria-hidden={isUp}>
                                            <div className="h-6 w-px" style={{ background: "var(--stroke,#d1fae5)" }} />
                                            <MilestoneCard m={m} />
                                        </div>
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

const MilestoneCard: React.FC<{ m: { time: string; title: string; desc: string } }> = ({ m }) => {
    return (
        <div
            className="flex w-full flex-col items-center gap-1.5 rounded-2xl border px-4 py-4 text-center"
            style={{
                background: "var(--card-color,#ffffff)",
                borderColor: "var(--stroke,#d1fae5)",
                boxShadow: '0 10px 24px rgba(8,145,178,0.08)',
            }}
        >
            <span
                className="inline-flex items-center rounded-full px-3 py-0.5 text-sm font-bold break-words"
                style={{
                    color: "var(--primary-text,#ffffff)",
                    background: "var(--primary-color,#16a34a)",
                    overflowWrap: 'break-word', wordBreak: 'break-word',
                }}
            >
                {m.time}
            </span>
            <h3
                className="text-lg font-black leading-[1.3] break-words"
                style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
            >
                {m.title}
            </h3>
            <p
                className="text-sm leading-relaxed break-words"
                style={{ color: "var(--background-text,#14532d)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
            >
                {m.desc}
            </p>
        </div>
    )
}

export default Timeline
