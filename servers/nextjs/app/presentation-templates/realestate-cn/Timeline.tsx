import React from 'react'
import * as z from "zod";

export const layoutId = 'realestate-cn-timeline'
export const layoutName = '时间线'
export const layoutDescription = '房产建筑风横向时间线：高级灰背景 + 金铜细轴线与节点 + 建筑剪影装饰，逐项呈现项目里程碑（时间/标题/说明）。纯 CSS/SVG，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('项目开发里程碑').meta({
        description: "时间线主标题（中文，简短克制，体现项目进程）",
    }),
    milestones: z.array(z.object({
        time: z.string().min(1).max(10).meta({
            description: "时间节点，如『2024 Q1』『2026年』",
        }),
        title: z.string().min(1).max(14).meta({
            description: "里程碑标题（中文，简短）",
        }),
        desc: z.string().min(2).max(36).meta({
            description: "里程碑说明（一句话补充节点内容）",
        }),
    })).min(3).max(5).default([
        { time: '2023', title: '臻选地块', desc: '城芯稀缺地块落定，规划设计正式启动' },
        { time: '2024', title: '奠基开工', desc: '项目奠基动工，主体结构进入施工阶段' },
        { time: '2025', title: '主体封顶', desc: '塔楼结构封顶，幕墙与园林同步推进' },
        { time: '2026', title: '盛启交付', desc: '示范区盛大开放，首批业主品质交付入住' },
    ]).meta({
        description: "项目里程碑列表（横向时间线节点，建议 4 项左右）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Timeline: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '项目开发里程碑'
    const milestones = (slideData?.milestones && slideData.milestones.length > 0)
        ? slideData.milestones
        : [
            { time: '2023', title: '臻选地块', desc: '城芯稀缺地块落定，规划设计正式启动' },
            { time: '2024', title: '奠基开工', desc: '项目奠基动工，主体结构进入施工阶段' },
            { time: '2025', title: '主体封顶', desc: '塔楼结构封顶，幕墙与园林同步推进' },
            { time: '2026', title: '盛启交付', desc: '示范区盛大开放，首批业主品质交付入住' },
        ]

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f4f4f5)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景：极简建筑剪影 + 细线分隔母题 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="reTlSky" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.04" />
                            <stop offset="100%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.12" />
                        </linearGradient>
                    </defs>

                    {/* 底部高级灰建筑剪影群（逐渐升高的天际线） */}
                    <g fill="url(#reTlSky)">
                        <rect x="96" y="624" width="64" height="96" />
                        <rect x="172" y="588" width="52" height="132" />
                        <rect x="236" y="640" width="46" height="80" />
                        <rect x="966" y="600" width="58" height="120" />
                        <rect x="1036" y="556" width="70" height="164" />
                        <rect x="1118" y="612" width="48" height="108" />
                        <rect x="1178" y="572" width="62" height="148" />
                    </g>
                    {/* 塔尖金铜点缀 */}
                    <line x1="1071" y1="556" x2="1071" y2="520" stroke="var(--primary-color,#b08d57)" strokeWidth="1.5" />
                    <circle cx="1071" cy="516" r="3" fill="var(--primary-color,#b08d57)" />

                    {/* 顶部细装饰横线母题 */}
                    <line x1="96" y1="96" x2="1184" y2="96" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                    <line x1="96" y1="96" x2="200" y2="96" stroke="var(--primary-color,#b08d57)" strokeWidth="1.5" />
                </svg>

                {/* 右上角金铜细框角标 */}
                <div
                    className="absolute right-12 top-12 h-10 w-10"
                    style={{
                        borderTop: "1.5px solid var(--primary-color,#b08d57)",
                        borderRight: "1.5px solid var(--primary-color,#b08d57)",
                    }}
                    aria-hidden="true"
                />

                {/* 主内容层 */}
                <div className="relative z-10 flex h-full flex-col px-24 pt-20 pb-16">
                    {/* 标题区 */}
                    <div className="flex flex-col">
                        <span
                            className="mb-5 inline-flex w-fit items-center gap-3 text-sm font-light tracking-[0.3em] break-words"
                            style={{ color: "var(--secondary-color,#3f3f46)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            <span className="inline-block h-px w-8" style={{ background: "var(--primary-color,#b08d57)" }} />
                            项目进程
                        </span>
                        <h1
                            className="max-w-[52rem] text-5xl font-light leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                    </div>

                    {/* 横向时间线：轴线 + 节点 */}
                    <div className="relative mt-auto mb-6 flex items-stretch">
                        {/* 贯穿轴线（细金铜线，含起止端点） */}
                        <div
                            className="absolute left-0 right-0"
                            style={{ top: '11px', height: '1px', background: "var(--stroke,#e4e4e7)" }}
                            aria-hidden="true"
                        />
                        <div
                            className="absolute left-0"
                            style={{ top: '11px', width: '64px', height: '1.5px', background: "var(--primary-color,#b08d57)" }}
                            aria-hidden="true"
                        />

                        {milestones.map((m, i) => (
                            <div key={i} className="flex flex-1 flex-col items-start pr-8">
                                {/* 节点：金铜实心点 + 外环 */}
                                <div className="relative flex items-center" style={{ height: '22px' }}>
                                    <span
                                        className="inline-block rounded-full"
                                        style={{
                                            width: '11px', height: '11px',
                                            background: "var(--primary-color,#b08d57)",
                                            boxShadow: '0 0 0 5px var(--background-color,#f4f4f5), 0 0 0 6px var(--stroke,#e4e4e7)',
                                        }}
                                        aria-hidden="true"
                                    />
                                </div>

                                {/* 时间 */}
                                <span
                                    className="mt-5 text-2xl font-light leading-[1.3] break-words"
                                    style={{ color: "var(--primary-color,#b08d57)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {m?.time}
                                </span>

                                {/* 节点标题 */}
                                <span
                                    className="mt-2.5 text-lg font-medium leading-[1.4] break-words"
                                    style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {m?.title}
                                </span>

                                {/* 细分隔线 */}
                                <span
                                    className="my-3 inline-block h-px w-10"
                                    style={{ background: "var(--stroke,#e4e4e7)" }}
                                    aria-hidden="true"
                                />

                                {/* 说明 */}
                                <span
                                    className="text-sm font-light leading-[1.7] break-words"
                                    style={{ color: "var(--secondary-color,#3f3f46)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {m?.desc}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Timeline
