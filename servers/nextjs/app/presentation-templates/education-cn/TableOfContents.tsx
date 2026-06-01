import React from 'react'
import * as z from "zod";

export const layoutId = 'education-cn-toc'
export const layoutName = '目录'
export const layoutDescription = '教育培训风目录页：左侧大字课程标题 + 圆点书本灯泡装饰，右侧编号分节的圆角议程卡片。纯 CSS/SVG 装饰，无需图片，明亮亲和有活力。'

const schema = z.object({
    title: z.string().min(2).max(16).default('目录').meta({
        description: "目录页主标题，如『目录』『课程大纲』",
    }),
    items: z.array(z.object({
        heading: z.string().min(2).max(16).meta({
            description: "分节标题，简短有力，如『学习目标』",
        }),
        desc: z.string().max(28).optional().meta({
            description: "分节的一句话补充说明（可选）",
        }),
    })).min(3).max(6).default([
        { heading: '学习目标', desc: '明确本次课程的核心收获与能力进阶' },
        { heading: '知识要点', desc: '系统梳理重点概念与基础框架' },
        { heading: '案例实践', desc: '结合真实场景动手演练巩固理解' },
        { heading: '互动答疑', desc: '即时反馈解决学习中的疑难问题' },
        { heading: '成长总结', desc: '回顾收获并规划下一步学习路径' },
    ]).meta({ description: "目录分节列表，编号自动生成" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TableOfContents: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '目录'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : [
            { heading: '学习目标', desc: '明确本次课程的核心收获与能力进阶' },
            { heading: '知识要点', desc: '系统梳理重点概念与基础框架' },
            { heading: '案例实践', desc: '结合真实场景动手演练巩固理解' },
            { heading: '互动答疑', desc: '即时反馈解决学习中的疑难问题' },
            { heading: '成长总结', desc: '回顾收获并规划下一步学习路径' },
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
                    background: "var(--background-color,#fffdf7)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：圆点 + 成长曲线 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="eduTocPanel" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#eduTocPanel)" />
                    {/* 左下角圆点装饰矩阵 */}
                    {[0, 1, 2, 3, 4].map((r) => (
                        [0, 1, 2, 3, 4].map((c) => (
                            <circle
                                key={`${r}-${c}`}
                                cx={60 + c * 30}
                                cy={560 + r * 30}
                                r="3.5"
                                fill="var(--primary-color,#2563eb)"
                                opacity={0.16}
                            />
                        ))
                    ))}
                    {/* 成长曲线母题 */}
                    <path
                        d="M40 470 C 180 460, 220 360, 360 350 S 520 250, 470 470"
                        fill="none"
                        stroke="var(--secondary-color,#f97316)"
                        strokeOpacity="0.18"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>

                {/* 右上角橙色强调圆点 */}
                <div
                    className="absolute"
                    style={{
                        top: '54px', right: '60px', width: '14px', height: '14px', borderRadius: '9999px',
                        background: "var(--secondary-color,#f97316)",
                        boxShadow: '0 0 0 6px rgba(249,115,22,0.15)',
                    }}
                />

                <div className="relative z-10 flex h-full px-16 py-12 gap-12">
                    {/* 左侧：标题 + 书本灯泡装饰 */}
                    <div className="flex w-[34%] flex-shrink-0 flex-col justify-center">
                        {/* 书本 + 灯泡 图标徽章 */}
                        <div className="mb-7 flex items-center gap-3">
                            <div
                                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
                                style={{ background: "var(--primary-color,#2563eb)" }}
                            >
                                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
                                    {/* 书本母题 */}
                                    <path
                                        d="M3 5.5C4.8 4.3 7.2 4.3 9 5.5V19c-1.8-1.2-4.2-1.2-6 0V5.5Z"
                                        stroke="var(--primary-text,#ffffff)" strokeWidth="1.7" strokeLinejoin="round"
                                    />
                                    <path
                                        d="M21 5.5C19.2 4.3 16.8 4.3 15 5.5V19c1.8-1.2 4.2-1.2 6 0V5.5Z"
                                        stroke="var(--primary-text,#ffffff)" strokeWidth="1.7" strokeLinejoin="round"
                                    />
                                    <path d="M9 5.5C10.8 4.3 13.2 4.3 15 5.5" stroke="var(--primary-text,#ffffff)" strokeWidth="1.7" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div
                                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
                                style={{ background: "var(--secondary-color,#f97316)" }}
                            >
                                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
                                    {/* 灯泡母题 */}
                                    <path
                                        d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2H14.5c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z"
                                        stroke="var(--primary-text,#ffffff)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h1
                            className="text-6xl font-black leading-[1.2] break-words"
                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div
                            className="my-6 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />

                        <p
                            className="text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#1f2937)", opacity: 0.75, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            循序渐进，让每一步学习都看得见成长。
                        </p>
                    </div>

                    {/* 右侧：编号分节卡片 */}
                    <div className="flex flex-1 flex-col justify-center gap-4">
                        {items.map((item, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            const accent = i % 2 === 0 ? "var(--primary-color,#2563eb)" : "var(--secondary-color,#f97316)"
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-5 rounded-2xl border px-6 py-4"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#f1e9d8)",
                                        boxShadow: '0 4px 14px rgba(31,41,55,0.05)',
                                    }}
                                >
                                    {/* 编号大字 */}
                                    <span
                                        className="flex-shrink-0 text-4xl font-black leading-none"
                                        style={{ color: accent }}
                                    >
                                        {num}
                                    </span>
                                    <span
                                        className="h-10 w-px flex-shrink-0"
                                        style={{ background: "var(--stroke,#f1e9d8)" }}
                                    />
                                    <div className="flex min-w-0 flex-1 flex-col leading-relaxed">
                                        <span
                                            className="text-xl font-bold break-words"
                                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item.heading}
                                        </span>
                                        {item.desc && (
                                            <span
                                                className="mt-0.5 text-sm leading-relaxed break-words"
                                                style={{ color: "var(--background-text,#1f2937)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {item.desc}
                                            </span>
                                        )}
                                    </div>
                                    {/* 行尾圆点装饰 */}
                                    <span
                                        className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                                        style={{ background: accent, opacity: 0.85 }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableOfContents
