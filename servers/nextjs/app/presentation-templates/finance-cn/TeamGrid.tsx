import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'finance-cn-team-grid'
export const layoutName = '团队介绍'
export const layoutDescription = '金融投资风团队介绍：深藏青底配香槟金线条与衬线大标题，成员卡网格（3-4 张）。无头像自动用首字徽标 + 主题色。数据网格/棱形装饰，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('核心投研团队').meta({
        description: "团队页主标题（中文，简短有力，如『核心投研团队』）",
    }),
    members: z.array(z.object({
        name: z.string().min(1).max(10).meta({ description: "成员姓名" }),
        role: z.string().min(1).max(16).meta({ description: "职务/头衔，如『首席投资官』" }),
        bio: z.string().max(30).optional().meta({ description: "一句话简介（可选），如专长或经历" }),
        avatar: ImageSchema.optional().meta({ description: "成员头像（可选，留空则用首字徽标）" }),
    })).min(3).max(4).default([
        {
            name: '陈砚之',
            role: '首席投资官 / CIO',
            bio: '深耕权益市场十八载，掌舵百亿资产。',
        },
        {
            name: '林沐风',
            role: '固定收益总监',
            bio: '宏观利率研判，穿越多轮周期。',
        },
        {
            name: '苏明远',
            role: '量化策略负责人',
            bio: '多因子模型与高频信号研究专家。',
        },
        {
            name: '顾清岚',
            role: '风险管理总监',
            bio: '构建全流程风控体系，守护底线。',
        },
    ]).meta({ description: "团队成员列表（3-4 人）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TeamGrid: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '核心投研团队'
    const members = (slideData?.members && slideData.members.length > 0)
        ? slideData.members
        : [
            { name: '陈砚之', role: '首席投资官 / CIO', bio: '深耕权益市场十八载，掌舵百亿资产。' },
            { name: '林沐风', role: '固定收益总监', bio: '宏观利率研判，穿越多轮周期。' },
            { name: '苏明远', role: '量化策略负责人', bio: '多因子模型与高频信号研究专家。' },
            { name: '顾清岚', role: '风险管理总监', bio: '构建全流程风控体系，守护底线。' },
        ]

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@600;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：数据网格 + 增长曲线 + 细金线 + 棱形 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="finTeamSheen" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.10" />
                            <stop offset="55%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="finTeamCurve" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.5" />
                        </linearGradient>
                        <pattern id="finTeamGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0H0V48" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.45" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {/* 数据网格 */}
                    <rect width="1280" height="720" fill="url(#finTeamGrid)" />
                    {/* 顶部金色光晕 */}
                    <rect width="1280" height="720" fill="url(#finTeamSheen)" />
                    {/* 增长曲线 */}
                    <path d="M-20 600 C 240 540, 420 470, 640 410 S 1060 250, 1320 150" fill="none" stroke="url(#finTeamCurve)" strokeWidth="2" />
                    {/* 细金线 */}
                    <line x1="0" y1="118" x2="1280" y2="118" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.28" strokeWidth="1" />
                    {/* 棱形母题 */}
                    {[0, 1, 2, 3].map((i) => (
                        <rect
                            key={i}
                            x={1130 + i * 26}
                            y={36 + i * 6}
                            width="14"
                            height="14"
                            fill="none"
                            stroke="var(--primary-color,#d4af37)"
                            strokeOpacity={0.5 - i * 0.09}
                            strokeWidth="1.4"
                            transform={`rotate(45 ${1137 + i * 26} ${43 + i * 6})`}
                        />
                    ))}
                </svg>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex items-end gap-4">
                        <div className="h-9 w-1.5 rounded-full" style={{ background: "var(--primary-color,#d4af37)" }} />
                        <div className="flex flex-col">
                            <span
                                className="text-sm font-medium leading-relaxed break-words"
                                style={{ color: "var(--secondary-color,#60a5fa)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                TEAM · 专业铸就信任
                            </span>
                            <h1
                                className="text-5xl font-black leading-[1.25] break-words"
                                style={{
                                    color: "var(--background-text,#e2e8f0)",
                                    fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* 标题下细金线 */}
                    <div className="mt-6 h-px w-full" style={{ background: "linear-gradient(90deg, var(--primary-color,#d4af37) 0%, transparent 60%)" }} />

                    {/* 成员卡网格 */}
                    <div
                        className="mt-8 grid flex-1 items-stretch gap-6"
                        style={{ gridTemplateColumns: `repeat(${Math.min(Math.max(members.length, 3), 4)}, minmax(0, 1fr))` }}
                    >
                        {members.slice(0, 4).map((m, i) => {
                            const name = m?.name || '团队成员'
                            const role = m?.role || '资深顾问'
                            const bio = m?.bio
                            const avatarUrl = m?.avatar?.__image_url__
                            const avatarPrompt = m?.avatar?.__image_prompt__
                            const initial = name.trim().slice(0, 1)
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center rounded-2xl border px-5 py-7"
                                    style={{ background: "var(--card-color,#1e293b)", borderColor: "var(--stroke,#334155)" }}
                                >
                                    {/* 头像 / 首字徽标 */}
                                    <div className="relative">
                                        {/* 棱形描边光环 */}
                                        <div
                                            className="absolute inset-0 -m-2 rounded-2xl"
                                            style={{ border: "1px solid var(--primary-color,#d4af37)", opacity: 0.35, transform: 'rotate(45deg)' }}
                                        />
                                        {avatarUrl ? (
                                            <div className="relative h-20 w-20 overflow-hidden rounded-full" style={{ border: "2px solid var(--primary-color,#d4af37)" }}>
                                                <img
                                                    src={avatarUrl}
                                                    alt={avatarPrompt || name}
                                                    className="h-full w-full object-cover"
                                                />
                                                <div
                                                    className="absolute inset-0"
                                                    style={{ background: "linear-gradient(160deg, rgba(212,175,55,0.18) 0%, rgba(15,23,42,0.35) 100%)" }}
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="relative flex h-20 w-20 items-center justify-center rounded-full"
                                                style={{
                                                    background: "linear-gradient(150deg, var(--primary-color,#d4af37) 0%, var(--card-color,#1e293b) 130%)",
                                                    border: "2px solid var(--primary-color,#d4af37)",
                                                }}
                                            >
                                                <span
                                                    className="text-3xl font-black break-words"
                                                    style={{
                                                        color: "var(--primary-text,#ffffff)",
                                                        fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                                    }}
                                                >
                                                    {initial}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* 姓名 */}
                                    <h3
                                        className="mt-5 text-center text-xl font-bold leading-[1.3] break-words"
                                        style={{
                                            color: "var(--background-text,#e2e8f0)",
                                            fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {name}
                                    </h3>

                                    {/* 职务徽章 */}
                                    <span
                                        className="mt-2 inline-flex w-fit max-w-full items-center rounded-full px-3 py-1 text-center text-xs font-medium leading-relaxed break-words"
                                        style={{
                                            color: "var(--primary-color,#d4af37)",
                                            background: "rgba(212,175,55,0.12)",
                                            border: "1px solid var(--stroke,#334155)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {role}
                                    </span>

                                    {/* 金色分隔点 */}
                                    <div className="mt-3 h-1.5 w-1.5 rotate-45" style={{ background: "var(--primary-color,#d4af37)", opacity: 0.7 }} />

                                    {/* 简介 */}
                                    {bio && (
                                        <p
                                            className="mt-3 text-center text-sm leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#94a3b8)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
