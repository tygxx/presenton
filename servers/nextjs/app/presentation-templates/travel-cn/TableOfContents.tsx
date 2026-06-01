import React from 'react'
import * as z from "zod";

export const layoutId = 'travel-cn-toc'
export const layoutName = '目录'
export const layoutDescription = '旅游文旅风目录页：左侧海蓝渐变面板配指南针与路线点缀，右侧编号大字分节卡片。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('目录').meta({
        description: "目录页主标题，默认『目录』",
    }),
    items: z.array(z.object({
        heading: z.string().min(2).max(16).meta({
            description: "分节标题（中文，简短）",
        }),
        desc: z.string().max(28).optional().meta({
            description: "分节简要说明（可选）",
        }),
    })).min(3).max(6).default([
        { heading: '行程概览', desc: '路线规划与亮点目的地一览' },
        { heading: '目的地推荐', desc: '海岛、古城与人文风光精选' },
        { heading: '特色体验', desc: '美食、民宿与在地文化活动' },
        { heading: '出行攻略', desc: '交通、住宿与最佳出游时节' },
    ]).meta({ description: "目录分节列表，编号自动生成" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TableOfContents: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '目录'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : [
            { heading: '行程概览', desc: '路线规划与亮点目的地一览' },
            { heading: '目的地推荐', desc: '海岛、古城与人文风光精选' },
            { heading: '特色体验', desc: '美食、民宿与在地文化活动' },
            { heading: '出行攻略', desc: '交通、住宿与最佳出游时节' },
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
                {/* 背景轻盈光晕装饰 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="tocBgGlow" cx="78%" cy="14%" r="60%">
                                <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#bae6fd" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#tocBgGlow)" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full">
                    {/* 左侧：海蓝渐变面板 + 指南针 + 路线点缀 */}
                    <div
                        className="relative flex w-[36%] flex-shrink-0 flex-col justify-center overflow-hidden pl-16 pr-10"
                        style={{
                            background: "linear-gradient(160deg, var(--primary-color,#0891b2) 0%, #0c4a6e 100%)",
                        }}
                    >
                        {/* 风景与路线 SVG 点缀 */}
                        <svg viewBox="0 0 460 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                            {/* 同心指南环 */}
                            {[0, 1, 2, 3].map((i) => (
                                <circle key={i} cx="360" cy="120" r={48 + i * 46} fill="none" stroke="#ffffff" strokeOpacity={0.12} strokeWidth="1.5" />
                            ))}
                            {/* 虚线行进路线 */}
                            <path
                                d="M40 600 C 140 540, 120 440, 230 400 S 380 320, 420 200"
                                fill="none"
                                stroke="#ffffff"
                                strokeOpacity="0.28"
                                strokeWidth="2"
                                strokeDasharray="2 10"
                                strokeLinecap="round"
                            />
                            {/* 远山轮廓 */}
                            <path d="M0 660 L120 560 L210 640 L330 540 L460 650 L460 720 L0 720 Z" fill="#ffffff" fillOpacity="0.07" />
                            {/* 路线端点 */}
                            <circle cx="40" cy="600" r="6" fill="var(--secondary-color,#f59e0b)" />
                            <circle cx="420" cy="200" r="6" fill="var(--secondary-color,#f59e0b)" />
                        </svg>

                        <div className="relative z-10">
                            {/* 指南针图标徽章 */}
                            <div
                                className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl"
                                style={{ background: "rgba(255,255,255,0.14)" }}
                            >
                                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="var(--secondary-color,#f59e0b)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <circle cx="12" cy="12" r="9.5" />
                                    <polygon points="15.6,8.4 11,11 8.4,15.6 13,13" fill="var(--secondary-color,#f59e0b)" stroke="none" />
                                </svg>
                            </div>

                            <span
                                className="mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide break-words"
                                style={{
                                    color: "var(--primary-text,#ffffff)",
                                    background: "rgba(245,158,11,0.22)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                探索旅程 · TRAVEL
                            </span>

                            <h1
                                className="text-6xl font-black leading-[1.2] break-words"
                                style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>

                            <div
                                className="mt-6 h-1.5 w-20 rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            />

                            <p
                                className="mt-6 max-w-[16rem] text-sm leading-relaxed break-words"
                                style={{ color: "var(--primary-text,#ffffff)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                跟随路线，开启一段明媚轻盈的旅程
                            </p>
                        </div>
                    </div>

                    {/* 右侧：编号大字分节卡片 */}
                    <div className="flex flex-1 flex-col justify-center gap-4 px-14 py-12">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-5 rounded-2xl border px-6 py-4 shadow-sm"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#bae6fd)",
                                }}
                            >
                                {/* 编号大字 */}
                                <span
                                    className="flex-shrink-0 text-5xl font-black leading-[1.2]"
                                    style={{ color: "var(--primary-color,#0891b2)" }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                {/* 分隔竖线 */}
                                <span
                                    className="h-10 w-0.5 flex-shrink-0 rounded-full"
                                    style={{ background: "var(--secondary-color,#f59e0b)" }}
                                />

                                {/* 标题 + 说明 */}
                                <div className="flex min-w-0 flex-1 flex-col gap-1">
                                    <span
                                        className="text-xl font-bold leading-[1.35] break-words"
                                        style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {item?.heading}
                                    </span>
                                    {item?.desc && (
                                        <span
                                            className="text-sm leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item.desc}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableOfContents
