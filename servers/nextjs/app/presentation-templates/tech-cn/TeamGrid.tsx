import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'tech-cn-team-grid'
export const layoutName = '团队介绍'
export const layoutDescription = '科技风团队介绍页：深色霓虹底 + 几何网格/电路线/光晕装饰，左对齐大标题，半透明发光描边成员卡网格（3-4 人）。无头像自动用首字徽标 + 主题色渐变。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('核心团队').meta({
        description: "团队介绍页主标题（中文，简短有力）",
    }),
    eyebrow: z.string().min(2).max(16).default('MEET THE TEAM').meta({
        description: "标题上方的小标签，可用英文点缀科技感",
    }),
    members: z.array(z.object({
        name: z.string().min(1).max(10).meta({ description: "成员姓名" }),
        role: z.string().min(1).max(16).meta({ description: "职位/角色" }),
        bio: z.string().max(30).optional().meta({ description: "一句话简介（可选）" }),
        avatar: ImageSchema.optional().meta({ description: "成员头像（可选，无则用首字徽标）" }),
    })).min(3).max(4).default([
        { name: '林若曦', role: '首席执行官 CEO', bio: '十年云计算与分布式系统经验' },
        { name: '陈思远', role: '首席技术官 CTO', bio: '深耕大模型与高并发架构' },
        { name: '苏黎', role: '产品负责人', bio: '专注用户增长与体验设计' },
        { name: '何子睿', role: '算法科学家', bio: '主导推荐与多模态研发' },
    ]).meta({ description: "团队成员卡片（3 至 4 人）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TeamGrid: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '核心团队'
    const eyebrow = slideData?.eyebrow || 'MEET THE TEAM'
    const members = (slideData?.members && slideData.members.length > 0
        ? slideData.members
        : [
            { name: '林若曦', role: '首席执行官 CEO', bio: '十年云计算与分布式系统经验' },
            { name: '陈思远', role: '首席技术官 CTO', bio: '深耕大模型与高并发架构' },
            { name: '苏黎', role: '产品负责人', bio: '专注用户增长与体验设计' },
            { name: '何子睿', role: '算法科学家', bio: '主导推荐与多模态研发' },
        ]).slice(0, 4)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0a0e1a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：几何网格 + 电路线 + 霓虹光晕 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="techTeamNeon" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.55" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.0" />
                            </linearGradient>
                            <radialGradient id="techTeamGlowA" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.40" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="techTeamGlowB" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.38" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </radialGradient>
                            <pattern id="techTeamGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                                <path d="M48 0H0V48" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.08" strokeWidth="1" />
                            </pattern>
                        </defs>
                        {/* 几何网格母题 */}
                        <rect width="1280" height="720" fill="url(#techTeamGrid)" />
                        {/* 霓虹光晕 */}
                        <ellipse cx="120" cy="80" rx="360" ry="280" fill="url(#techTeamGlowA)" />
                        <ellipse cx="1180" cy="660" rx="380" ry="300" fill="url(#techTeamGlowB)" />
                        {/* 顶部霓虹渐变高光带 */}
                        <rect x="0" y="0" width="1280" height="180" fill="url(#techTeamNeon)" opacity="0.5" />
                        {/* 电路线母题 */}
                        <g stroke="var(--secondary-color,#8b5cf6)" strokeOpacity="0.18" strokeWidth="1.5" fill="none">
                            <path d="M0 200 H260 L300 240 H520" />
                            <path d="M1280 520 H980 L940 480 H720" />
                            <path d="M60 640 H320 L360 600" />
                        </g>
                        <g fill="var(--primary-color,#3b82f6)" fillOpacity="0.5">
                            <circle cx="520" cy="240" r="3.5" />
                            <circle cx="720" cy="480" r="3.5" />
                            <circle cx="360" cy="600" r="3.5" />
                            <circle cx="260" cy="200" r="3.5" />
                        </g>
                    </svg>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区（左对齐） */}
                    <div className="flex flex-shrink-0 flex-col">
                        <span
                            className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold leading-relaxed break-words"
                            style={{
                                color: "var(--primary-color,#3b82f6)",
                                background: "rgba(59,130,246,0.12)",
                                border: "1px solid var(--stroke,#1f2937)",
                                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-1.5 w-1.5 rounded-full"
                                style={{ background: "var(--secondary-color,#8b5cf6)", boxShadow: "0 0 0 3px rgba(139,92,246,0.25)" }}
                            />
                            {eyebrow}
                        </span>
                        <h1
                            className="text-5xl font-black leading-[1.2] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-5 h-1 w-24 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))" }}
                        />
                    </div>

                    {/* 成员卡网格 */}
                    <div
                        className="mt-9 grid flex-1 items-stretch gap-6"
                        style={{ gridTemplateColumns: `repeat(${members.length}, minmax(0, 1fr))` }}
                    >
                        {members.map((m, i) => {
                            const name = m?.name || '成员'
                            const role = m?.role || '团队成员'
                            const bio = m?.bio
                            const initial = name.trim().slice(0, 1)
                            const avatarUrl = m?.avatar?.__image_url__
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center rounded-2xl px-5 py-7 text-center"
                                    style={{
                                        background: "linear-gradient(160deg, rgba(17,24,39,0.92), rgba(17,24,39,0.62))",
                                        border: "1px solid var(--stroke,#1f2937)",
                                        boxShadow: "0 0 28px rgba(59,130,246,0.10), inset 0 1px 0 rgba(255,255,255,0.04)",
                                    }}
                                >
                                    {/* 头像 / 首字徽标 */}
                                    <div
                                        className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full"
                                        style={{
                                            background: avatarUrl
                                                ? "transparent"
                                                : "linear-gradient(140deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                            border: "1px solid var(--stroke,#1f2937)",
                                            boxShadow: "0 0 22px rgba(139,92,246,0.35)",
                                        }}
                                    >
                                        {avatarUrl ? (
                                            <>
                                                <img
                                                    src={avatarUrl}
                                                    alt={m?.avatar?.__image_prompt__ || name}
                                                    className="h-full w-full object-cover"
                                                />
                                                <div
                                                    className="absolute inset-0"
                                                    style={{ background: "linear-gradient(160deg, rgba(59,130,246,0.30), rgba(139,92,246,0.30))" }}
                                                />
                                            </>
                                        ) : (
                                            <span
                                                className="text-3xl font-black break-words"
                                                style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {initial}
                                            </span>
                                        )}
                                    </div>

                                    <h3
                                        className="mt-5 text-xl font-bold leading-[1.35] break-words"
                                        style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {name}
                                    </h3>
                                    <p
                                        className="mt-1.5 text-sm font-medium leading-relaxed break-words"
                                        style={{ color: "var(--primary-color,#3b82f6)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {role}
                                    </p>
                                    {bio && (
                                        <>
                                            <div
                                                className="my-4 h-px w-10"
                                                style={{ background: "var(--stroke,#1f2937)" }}
                                            />
                                            <p
                                                className="text-xs leading-[1.7] break-words"
                                                style={{ color: "var(--background-text,#9ca3af)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {bio}
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
