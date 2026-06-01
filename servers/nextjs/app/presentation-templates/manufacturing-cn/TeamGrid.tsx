import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'manufacturing-cn-team-grid'
export const layoutName = '团队介绍'
export const layoutDescription = '智能制造风团队介绍：工业深灰底 + 精密网格 + 齿轮装饰，3~4 张成员卡网格。无头像自动用首字徽标 + 主题色。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('核心技术团队').meta({
        description: "版式主标题（中文，简短有力，如『核心技术团队』）",
    }),
    members: z.array(z.object({
        name: z.string().min(1).max(10).meta({
            description: "成员姓名",
        }),
        role: z.string().min(2).max(16).meta({
            description: "成员职务/头衔，如『首席工艺师』",
        }),
        bio: z.string().max(30).optional().meta({
            description: "一句话简介（可选），如专长或履历亮点",
        }),
        avatar: ImageSchema.optional().meta({
            description: "成员头像（可选），无头像时自动用姓名首字徽标",
        }),
    })).min(3).max(4).default([
        {
            name: '陈志远',
            role: '智能产线总工程师',
            bio: '深耕柔性制造与产线集成十五年',
        },
        {
            name: '林晓彤',
            role: '工业机器人首席专家',
            bio: '主导多条无人化焊装线落地',
        },
        {
            name: '赵建国',
            role: '精密工艺总监',
            bio: '微米级加工与质量管控负责人',
        },
        {
            name: '吴敏华',
            role: '数字孪生研发负责人',
            bio: '打造车间级实时仿真平台',
        },
    ]).meta({ description: "团队成员列表（3~4 人）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TeamGrid: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '核心技术团队'
    const members = (slideData?.members && slideData.members.length > 0)
        ? slideData.members
        : [
            { name: '陈志远', role: '智能产线总工程师', bio: '深耕柔性制造与产线集成十五年' },
            { name: '林晓彤', role: '工业机器人首席专家', bio: '主导多条无人化焊装线落地' },
            { name: '赵建国', role: '精密工艺总监', bio: '微米级加工与质量管控负责人' },
            { name: '吴敏华', role: '数字孪生研发负责人', bio: '打造车间级实时仿真平台' },
        ]

    const colCount = members.length <= 3 ? members.length : 4

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#1f2937)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：精密网格 + 齿轮 + 金属线条 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern id="mfgTeamGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0H0V40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.45" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="mfgTeamTopGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="mfgTeamGearStroke" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.35" />
                        </linearGradient>
                    </defs>

                    {/* 精密网格底纹 */}
                    <rect width="1280" height="720" fill="url(#mfgTeamGrid)" />
                    {/* 顶部蓝色光晕 */}
                    <rect width="1280" height="260" fill="url(#mfgTeamTopGlow)" />

                    {/* 右上角齿轮母题（精密机械感） */}
                    <g transform="translate(1170 70)" stroke="url(#mfgTeamGearStroke)" strokeWidth="2.5" fill="none">
                        <circle r="56" />
                        <circle r="22" />
                        {Array.from({ length: 12 }).map((_, i) => {
                            const a = (i * Math.PI) / 6
                            const x1 = Math.cos(a) * 56
                            const y1 = Math.sin(a) * 56
                            const x2 = Math.cos(a) * 70
                            const y2 = Math.sin(a) * 70
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                        })}
                    </g>

                    {/* 左下角小齿轮 */}
                    <g transform="translate(60 660)" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.3" strokeWidth="2" fill="none">
                        <circle r="34" />
                        <circle r="13" />
                        {Array.from({ length: 8 }).map((_, i) => {
                            const a = (i * Math.PI) / 4
                            return (
                                <line
                                    key={i}
                                    x1={Math.cos(a) * 34}
                                    y1={Math.sin(a) * 34}
                                    x2={Math.cos(a) * 44}
                                    y2={Math.sin(a) * 44}
                                />
                            )
                        })}
                    </g>

                    {/* 产线硬朗斜线 */}
                    <line x1="-40" y1="600" x2="1320" y2="600" stroke="var(--stroke,#374151)" strokeOpacity="0.6" strokeWidth="1.5" />
                    <line x1="980" y1="-40" x2="1320" y2="300" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.18" strokeWidth="2" />
                </svg>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 items-center gap-4">
                        <div className="h-9 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                    </div>
                    <div className="mt-4 flex flex-shrink-0 items-center gap-2">
                        <div className="h-px w-16 rounded-full" style={{ background: "var(--primary-color,#3b82f6)" }} />
                        <div className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <div className="h-px flex-1 rounded-full" style={{ background: "var(--stroke,#374151)" }} />
                    </div>

                    {/* 成员卡网格 */}
                    <div
                        className="mt-10 grid flex-1 items-center gap-6"
                        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
                    >
                        {members.map((m, i) => {
                            const name = m?.name || '成员'
                            const role = m?.role || ''
                            const bio = m?.bio || ''
                            const avatarUrl = m?.avatar?.__image_url__
                            const avatarPrompt = m?.avatar?.__image_prompt__ || `${name} 头像`
                            const initial = name.trim().slice(0, 1)

                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center rounded-2xl border px-5 py-7"
                                    style={{
                                        background: "var(--card-color,#111827)",
                                        borderColor: "var(--stroke,#374151)",
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                                    }}
                                >
                                    {/* 头像 / 首字徽标 */}
                                    <div
                                        className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl"
                                        style={{
                                            background: avatarUrl
                                                ? 'transparent'
                                                : 'linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#f97316))',
                                            border: '2px solid var(--stroke,#374151)',
                                        }}
                                    >
                                        {avatarUrl ? (
                                            <>
                                                <img
                                                    src={avatarUrl}
                                                    alt={avatarPrompt}
                                                    className="h-full w-full object-cover"
                                                />
                                                {/* 主题色渐变遮罩 */}
                                                <div
                                                    className="absolute inset-0"
                                                    style={{
                                                        background: 'linear-gradient(135deg, rgba(59,130,246,0.30), rgba(249,115,22,0.18))',
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            <span
                                                className="text-3xl font-black leading-none"
                                                style={{ color: "var(--primary-text,#ffffff)" }}
                                            >
                                                {initial}
                                            </span>
                                        )}
                                    </div>

                                    {/* 装饰短线 */}
                                    <div className="mt-5 h-1 w-8 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />

                                    {/* 姓名 */}
                                    <h3
                                        className="mt-4 text-center text-xl font-bold leading-[1.4] break-words"
                                        style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {name}
                                    </h3>

                                    {/* 职务 */}
                                    {role && (
                                        <p
                                            className="mt-2 text-center text-sm font-medium leading-[1.6] break-words"
                                            style={{ color: "var(--primary-color,#3b82f6)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {role}
                                        </p>
                                    )}

                                    {/* 简介 */}
                                    {bio && (
                                        <p
                                            className="mt-3 text-center text-xs leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#9ca3af)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {bio}
                                        </p>
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
