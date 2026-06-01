import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'retail-cn-team-grid'
export const layoutName = '团队介绍'
export const layoutDescription = '电商新零售风团队介绍：撞色大色块 + 圆角成员卡网格 + 价签角标 + 活力几何装饰。无头像时用首字徽标 + 主题色，纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('核心运营团队').meta({
        description: "团队介绍主标题（中文，简短有力）",
    }),
    eyebrow: z.string().min(2).max(16).default('遇见我们 · MEET US').meta({
        description: "标题上方的小标签/分类",
    }),
    members: z.array(z.object({
        name: z.string().min(1).max(10).meta({
            description: "成员姓名",
        }),
        role: z.string().min(2).max(16).meta({
            description: "成员职位/头衔",
        }),
        bio: z.string().max(30).optional().meta({
            description: "一句话成员简介（可选）",
        }),
        avatar: ImageSchema.optional().meta({
            description: "成员头像图片（可选，无则用首字徽标）",
        }),
    })).min(3).max(4).default([
        {
            name: '林悦',
            role: '电商运营负责人',
            bio: '操盘双十一全域GMV破亿增长',
        },
        {
            name: '陈昊',
            role: '私域增长总监',
            bio: '搭建百万会员复购运营体系',
        },
        {
            name: '苏曼',
            role: '内容种草主理人',
            bio: '主导爆款短视频投放与转化',
        },
        {
            name: '周一帆',
            role: '供应链与选品经理',
            bio: '统筹爆品供应与快反履约',
        },
    ]).meta({
        description: "团队成员列表（3至4位）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ACCENTS = [
    'var(--primary-color,#db2777)',
    'var(--secondary-color,#f59e0b)',
    'var(--primary-color,#db2777)',
    'var(--secondary-color,#f59e0b)',
]

const TeamGrid: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '核心运营团队'
    const eyebrow = slideData?.eyebrow || '遇见我们 · MEET US'
    const members = (slideData?.members && slideData.members.length > 0)
        ? slideData.members
        : [
            { name: '林悦', role: '电商运营负责人', bio: '操盘双十一全域GMV破亿增长' },
            { name: '陈昊', role: '私域增长总监', bio: '搭建百万会员复购运营体系' },
            { name: '苏曼', role: '内容种草主理人', bio: '主导爆款短视频投放与转化' },
            { name: '周一帆', role: '供应链与选品经理', bio: '统筹爆品供应与快反履约' },
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
                    background: "var(--background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景活力几何装饰层 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="retailTeamGlow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#db2777)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.04" />
                        </linearGradient>
                    </defs>
                    {/* 左上撞色大色块 */}
                    <path d="M0 0 H520 L380 0 V0 Q300 130 120 150 Q0 162 0 280 Z" fill="url(#retailTeamGlow)" />
                    <circle cx="92" cy="86" r="150" fill="var(--primary-color,#db2777)" fillOpacity="0.07" />
                    {/* 右下活力几何 */}
                    <circle cx="1210" cy="660" r="170" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.08" />
                    <rect x="1120" y="70" width="70" height="70" rx="16" transform="rotate(18 1155 105)" fill="var(--primary-color,#db2777)" fillOpacity="0.10" />
                    <rect x="40" y="600" width="48" height="48" rx="12" transform="rotate(-14 64 624)" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.12" />
                </svg>

                {/* 顶部撞色色块条 */}
                <div
                    className="absolute top-0 left-0 h-2.5 w-full"
                    style={{ background: "linear-gradient(90deg, var(--primary-color,#db2777) 0%, var(--secondary-color,#f59e0b) 100%)" }}
                />

                <div className="relative z-10 flex h-full flex-col px-14 pt-12 pb-12">
                    {/* 标题区 */}
                    <div className="flex items-end justify-between gap-6">
                        <div className="flex flex-col">
                            {/* 价签风角标 */}
                            <span
                                className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold break-words"
                                style={{
                                    color: "var(--primary-color,#db2777)",
                                    background: "var(--card-color,#fdf2f8)",
                                    border: "1.5px solid var(--stroke,#fbcfe8)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                <span
                                    className="inline-block h-2.5 w-2.5 rounded-full"
                                    style={{ background: "var(--secondary-color,#f59e0b)" }}
                                />
                                {eyebrow}
                            </span>
                            <h1
                                className="text-5xl font-black leading-[1.2] break-words"
                                style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                        {/* 撞色装饰几何 */}
                        <div className="flex flex-shrink-0 items-center gap-2.5 pb-2">
                            <span className="h-3.5 w-3.5 rounded-full" style={{ background: "var(--primary-color,#db2777)" }} />
                            <span className="h-3.5 w-10 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                            <span className="h-3.5 w-3.5 rounded-sm" style={{ background: "var(--primary-color,#db2777)" }} />
                        </div>
                    </div>

                    {/* 成员卡网格 */}
                    <div
                        className="mt-10 grid flex-1 items-stretch gap-6"
                        style={{ gridTemplateColumns: `repeat(${members.length}, minmax(0, 1fr))` }}
                    >
                        {members.map((m, i) => {
                            const accent = ACCENTS[i % ACCENTS.length]
                            const initial = (m?.name || '').trim().slice(0, 1) || '·'
                            const hasAvatar = !!m?.avatar?.__image_url__
                            return (
                                <div
                                    key={i}
                                    className="relative flex flex-col items-center rounded-3xl px-5 pt-9 pb-7 break-words"
                                    style={{
                                        background: "var(--card-color,#fdf2f8)",
                                        border: "1.5px solid var(--stroke,#fbcfe8)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {/* 卡片顶部撞色色块 */}
                                    <div
                                        className="absolute top-0 left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-b-full"
                                        style={{ background: accent }}
                                    />
                                    {/* 价签角标编号 */}
                                    <div
                                        className="absolute top-4 right-4 flex h-7 items-center rounded-md px-2 text-xs font-black"
                                        style={{
                                            background: accent,
                                            color: "var(--primary-text,#ffffff)",
                                        }}
                                    >
                                        0{i + 1}
                                    </div>

                                    {/* 头像 / 首字徽标 */}
                                    {hasAvatar ? (
                                        <div
                                            className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl"
                                            style={{ border: `3px solid ${accent}` }}
                                        >
                                            <img
                                                src={m.avatar?.__image_url__}
                                                alt={m?.name || '成员头像'}
                                                className="h-full w-full object-cover"
                                            />
                                            <div
                                                className="absolute inset-0"
                                                style={{ background: "linear-gradient(160deg, rgba(219,39,119,0.10) 0%, rgba(245,158,11,0.28) 100%)" }}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl text-4xl font-black"
                                            style={{
                                                background: `linear-gradient(150deg, ${accent} 0%, var(--secondary-color,#f59e0b) 130%)`,
                                                color: "var(--primary-text,#ffffff)",
                                                boxShadow: `0 10px 22px -10px ${accent}`,
                                            }}
                                        >
                                            {initial}
                                        </div>
                                    )}

                                    {/* 姓名 */}
                                    <h3
                                        className="mt-5 text-center text-xl font-black leading-[1.3] break-words"
                                        style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m?.name || '团队成员'}
                                    </h3>

                                    {/* 职位价签 */}
                                    <span
                                        className="mt-2.5 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold leading-relaxed break-words"
                                        style={{
                                            color: "var(--primary-text,#ffffff)",
                                            background: accent,
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {m?.role || '团队成员'}
                                    </span>

                                    {/* 简介 */}
                                    {m?.bio && (
                                        <>
                                            <div
                                                className="my-3 h-px w-10"
                                                style={{ background: "var(--stroke,#fbcfe8)" }}
                                            />
                                            <p
                                                className="text-center text-sm leading-[1.7] break-words"
                                                style={{ color: "var(--background-text,#18181b)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {m.bio}
                                            </p>
                                        </>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamGrid
