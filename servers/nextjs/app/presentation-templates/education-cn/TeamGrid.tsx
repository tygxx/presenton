import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'education-cn-team-grid'
export const layoutName = '团队介绍'
export const layoutDescription = '教育培训风团队介绍页：明亮米白背景 + 书本/灯泡/成长曲线/圆点装饰，圆角卡片网格展示 3-4 位讲师成员，含姓名、职务、简介与首字徽标兜底。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('师资团队').meta({
        description: "团队介绍主标题（中文，简短）",
    }),
    members: z.array(z.object({
        name: z.string().min(1).max(10).meta({
            description: "成员姓名",
        }),
        role: z.string().min(1).max(16).meta({
            description: "成员职务/头衔，如『金牌讲师』",
        }),
        bio: z.string().max(30).optional().meta({
            description: "一句话简介（可选）",
        }),
        avatar: ImageSchema.optional().meta({
            description: "成员头像（可选，无则用首字徽标）",
        }),
    })).min(3).max(4).default([
        {
            name: '林晓',
            role: '教学总监',
            bio: '深耕 K12 教研十二年',
        },
        {
            name: '陈睿',
            role: '金牌讲师',
            bio: '善用启发式提问点燃思维',
        },
        {
            name: '王彦',
            role: '课程研发',
            bio: '把抽象知识拆成成长阶梯',
        },
        {
            name: '苏珊',
            role: '学习规划师',
            bio: '为每位学员定制成长路径',
        },
    ]).meta({ description: "团队成员卡片列表（3-4 位）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ACCENTS = [
    { color: 'var(--primary-color,#2563eb)', soft: 'rgba(37,99,235,0.10)' },
    { color: 'var(--secondary-color,#f97316)', soft: 'rgba(249,115,22,0.12)' },
    { color: 'var(--primary-color,#2563eb)', soft: 'rgba(37,99,235,0.10)' },
    { color: 'var(--secondary-color,#f97316)', soft: 'rgba(249,115,22,0.12)' },
]

const TeamGrid: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '师资团队'
    const members = (slideData?.members && slideData.members.length > 0)
        ? slideData.members
        : [
            { name: '林晓', role: '教学总监', bio: '深耕 K12 教研十二年' },
            { name: '陈睿', role: '金牌讲师', bio: '善用启发式提问点燃思维' },
            { name: '王彦', role: '课程研发', bio: '把抽象知识拆成成长阶梯' },
            { name: '苏珊', role: '学习规划师', bio: '为每位学员定制成长路径' },
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
                {/* 背景装饰层：圆点纹样 + 成长曲线 + 角落光晕 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="eduTeamGlowA" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="eduTeamGlowB" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </radialGradient>
                        <pattern id="eduTeamDots" x="0" y="0" width="34" height="34" patternUnits="userSpaceOnUse">
                            <circle cx="3" cy="3" r="2.4" fill="var(--primary-color,#2563eb)" fillOpacity="0.06" />
                        </pattern>
                    </defs>
                    {/* 左上圆点纹样 */}
                    <rect x="40" y="40" width="300" height="150" fill="url(#eduTeamDots)" />
                    {/* 角落光晕 */}
                    <circle cx="120" cy="80" r="230" fill="url(#eduTeamGlowA)" />
                    <circle cx="1180" cy="660" r="260" fill="url(#eduTeamGlowB)" />
                    {/* 成长曲线 */}
                    <path
                        d="M -20 600 C 220 580 360 470 560 470 C 800 470 940 360 1300 320"
                        fill="none"
                        stroke="var(--secondary-color,#f97316)"
                        strokeOpacity="0.18"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="2 14"
                    />
                </svg>

                {/* 右上角灯泡装饰角标 */}
                <div
                    className="absolute top-7 right-9 z-10 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: "rgba(249,115,22,0.12)" }}
                    aria-hidden="true"
                >
                    <RemoteSvgIcon
                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
                        strokeColor="currentColor"
                        color="var(--secondary-color,#f97316)"
                        className="w-6 h-6"
                        title="lightbulb"
                    />
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 items-center gap-4">
                        <span
                            className="flex h-12 w-12 items-center justify-center rounded-2xl"
                            style={{ background: "var(--primary-color,#2563eb)" }}
                            aria-hidden="true"
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-6 h-6"
                                title="team"
                            />
                        </span>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div className="mt-2.5 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        </div>
                    </div>

                    {/* 成员卡片网格 */}
                    <div
                        className="mt-10 grid flex-1 items-stretch gap-6"
                        style={{ gridTemplateColumns: `repeat(${members.length}, minmax(0, 1fr))` }}
                    >
                        {members.map((m, i) => {
                            const accent = ACCENTS[i % ACCENTS.length]
                            const name = (m?.name || '讲师').trim()
                            const initial = name.slice(0, 1)
                            const avatarUrl = m?.avatar?.__image_url__
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center rounded-3xl border px-5 py-7 shadow-sm"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#f1e9d8)",
                                    }}
                                >
                                    {/* 头像 / 首字徽标 */}
                                    {avatarUrl ? (
                                        <div
                                            className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full"
                                            style={{ boxShadow: `0 0 0 4px ${accent.soft}` }}
                                        >
                                            <img
                                                src={avatarUrl}
                                                alt={m?.avatar?.__image_prompt__ || name}
                                                className="h-full w-full object-cover"
                                            />
                                            <div
                                                className="absolute inset-0"
                                                style={{ background: `linear-gradient(160deg, transparent 45%, ${accent.color}33 100%)` }}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full text-4xl font-black break-words"
                                            style={{
                                                background: accent.soft,
                                                color: accent.color,
                                                boxShadow: `0 0 0 4px ${accent.soft}`,
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {initial}
                                        </div>
                                    )}

                                    {/* 姓名 */}
                                    <span
                                        className="mt-5 text-xl font-bold leading-[1.35] break-words"
                                        style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {name}
                                    </span>

                                    {/* 职务徽章 */}
                                    <span
                                        className="mt-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium leading-relaxed break-words"
                                        style={{
                                            color: accent.color,
                                            background: accent.soft,
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {m?.role || '金牌讲师'}
                                    </span>

                                    {/* 分隔圆点装饰 */}
                                    <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
                                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--primary-color,#2563eb)", opacity: 0.35 }} />
                                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--secondary-color,#f97316)", opacity: 0.55 }} />
                                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--primary-color,#2563eb)", opacity: 0.35 }} />
                                    </div>

                                    {/* 简介 */}
                                    {m?.bio && (
                                        <p
                                            className="mt-4 text-center text-sm leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#1f2937)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {m.bio}
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
