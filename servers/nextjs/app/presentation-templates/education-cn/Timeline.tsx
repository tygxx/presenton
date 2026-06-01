import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { IconSchema } from '../defaultSchemes';

export const layoutId = 'education-cn-timeline'
export const layoutName = '时间线'
export const layoutDescription = '教育培训风时间线：横向轴线串联 3~5 个里程碑节点，每节点含时间、标题与说明。明亮米白底配活力橙蓝、圆角卡片与书本灯泡装饰，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('学习成长路线').meta({
        description: "时间线主标题（中文，简短有力）",
    }),
    subtitle: z.string().min(2).max(34).default('循序渐进，陪伴每一位学员稳步成长').meta({
        description: "副标题，一句话补充说明学习路径",
    }),
    milestones: z.array(z.object({
        time: z.string().min(1).max(10).meta({
            description: "里程碑时间，如『第1阶段』『2024春』",
        }),
        title: z.string().min(2).max(14).meta({
            description: "里程碑标题（中文，简短）",
        }),
        desc: z.string().min(2).max(36).meta({
            description: "里程碑说明，一句话描述本阶段目标",
        }),
        icon: IconSchema.default({
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg",
            __icon_query__: "book",
        }).meta({ description: "里程碑节点图标" }),
    })).min(3).max(5).default([
        {
            time: '入门期',
            title: '兴趣启蒙',
            desc: '激发学习兴趣，打牢基础认知与学习习惯。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg",
                __icon_query__: "lightbulb",
            },
        },
        {
            time: '夯实期',
            title: '系统学习',
            desc: '构建知识体系，掌握核心方法与解题思路。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg",
                __icon_query__: "book",
            },
        },
        {
            time: '进阶期',
            title: '能力跃迁',
            desc: '专项突破强化训练，能力实现稳步跃升。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg",
                __icon_query__: "growth",
            },
        },
        {
            time: '冲刺期',
            title: '学有所成',
            desc: '查漏补缺融会贯通，自信迎接每一次挑战。',
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/graduation-cap-bold.svg",
                __icon_query__: "graduation",
            },
        },
    ]).meta({ description: "里程碑列表（3~5 个）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Timeline: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '学习成长路线'
    const subtitle = slideData?.subtitle || '循序渐进，陪伴每一位学员稳步成长'
    const milestones = (slideData?.milestones && slideData.milestones.length > 0)
        ? slideData.milestones
        : [
            { time: '入门期', title: '兴趣启蒙', desc: '激发学习兴趣，打牢基础认知与学习习惯。', icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg", __icon_query__: "lightbulb" } },
            { time: '夯实期', title: '系统学习', desc: '构建知识体系，掌握核心方法与解题思路。', icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg", __icon_query__: "book" } },
            { time: '进阶期', title: '能力跃迁', desc: '专项突破强化训练，能力实现稳步跃升。', icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg", __icon_query__: "growth" } },
            { time: '冲刺期', title: '学有所成', desc: '查漏补缺融会贯通，自信迎接每一次挑战。', icon: { __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/graduation-cap-bold.svg", __icon_query__: "graduation" } },
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
                {/* 背景装饰层：成长曲线 + 圆点 + 光晕 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="eduTlGrowth" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.10" />
                        </linearGradient>
                        <radialGradient id="eduTlGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.14" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 成长曲线母题 */}
                    <path d="M-20 660 C 240 600, 420 520, 660 460 S 1080 300, 1320 160" fill="none" stroke="url(#eduTlGrowth)" strokeWidth="26" strokeLinecap="round" />
                    <circle cx="1090" cy="120" r="240" fill="url(#eduTlGlow)" />
                    {/* 右上角圆点装饰阵列 */}
                    {[0, 1, 2, 3].map((r) => (
                        [0, 1, 2, 3].map((c) => (
                            <circle key={`${r}-${c}`} cx={1130 + c * 26} cy={70 + r * 26} r="3" fill="var(--primary-color,#2563eb)" fillOpacity="0.18" />
                        ))
                    ))}
                </svg>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="flex items-start gap-4">
                        <div
                            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm"
                            style={{ background: "var(--primary-color,#2563eb)" }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-7 h-7"
                                title="书本"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.2] break-words"
                                style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <p
                                className="mt-2 text-base leading-relaxed break-words"
                                style={{ color: "var(--background-text,#1f2937)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    {/* 横向时间线区 */}
                    <div className="relative mt-10 flex flex-1 items-center">
                        {/* 横向轴线 */}
                        <div
                            className="absolute left-0 right-0 rounded-full"
                            style={{ top: '46px', height: '4px', background: "var(--stroke,#f1e9d8)" }}
                        />
                        <div
                            className="absolute left-0 rounded-full"
                            style={{
                                top: '46px', height: '4px', width: '88%',
                                background: "linear-gradient(90deg, var(--primary-color,#2563eb), var(--secondary-color,#f97316))",
                            }}
                        />

                        {/* 节点卡片 */}
                        <div className="relative z-10 flex w-full items-stretch justify-between gap-5">
                            {milestones.map((m, i) => (
                                <div key={i} className="flex flex-1 flex-col items-center">
                                    {/* 节点圆 + 图标 */}
                                    <div
                                        className="flex h-[88px] w-[88px] flex-shrink-0 items-center justify-center rounded-full shadow-md"
                                        style={{
                                            background: "var(--card-color,#ffffff)",
                                            border: "4px solid var(--background-color,#fffdf7)",
                                            boxShadow: "0 0 0 2px var(--stroke,#f1e9d8), 0 6px 16px rgba(31,41,55,0.10)",
                                        }}
                                    >
                                        <div
                                            className="flex h-[60px] w-[60px] items-center justify-center rounded-full"
                                            style={{
                                                background: i % 2 === 0
                                                    ? "var(--primary-color,#2563eb)"
                                                    : "var(--secondary-color,#f97316)",
                                            }}
                                        >
                                            <RemoteSvgIcon
                                                url={m?.icon?.__icon_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg"}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-7 h-7"
                                                title={m?.icon?.__icon_query__ || "milestone"}
                                            />
                                        </div>
                                    </div>

                                    {/* 时间标签 */}
                                    <span
                                        className="mt-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-bold break-words"
                                        style={{
                                            color: i % 2 === 0 ? "var(--primary-color,#2563eb)" : "var(--secondary-color,#f97316)",
                                            background: i % 2 === 0 ? "rgba(37,99,235,0.10)" : "rgba(249,115,22,0.12)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {m?.time || '阶段'}
                                    </span>

                                    {/* 文本卡片 */}
                                    <div
                                        className="mt-3 flex w-full flex-col items-center rounded-2xl border px-4 py-4 text-center shadow-sm"
                                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#f1e9d8)" }}
                                    >
                                        <h3
                                            className="text-lg font-bold leading-[1.3] break-words"
                                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {m?.title || '里程碑'}
                                        </h3>
                                        <p
                                            className="mt-2 text-sm leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#1f2937)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {m?.desc || '阶段目标说明'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Timeline
