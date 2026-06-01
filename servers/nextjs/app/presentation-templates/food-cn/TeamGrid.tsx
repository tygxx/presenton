import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'food-cn-team-grid'
export const layoutName = '团队介绍'
export const layoutDescription = '美食餐饮风团队介绍：暖米底配焦糖金圆盘装饰，3-4 张成员卡网格展示姓名、职务与简介；无头像时用首字徽标 + 主题色。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('遇见我们的主厨团队').meta({
        description: "团队介绍主标题（中文，简短温暖）",
    }),
    members: z.array(z.object({
        name: z.string().min(1).max(10).meta({
            description: "成员姓名",
        }),
        role: z.string().min(2).max(16).meta({
            description: "成员职务，如『行政总厨』『甜品师』",
        }),
        bio: z.string().max(30).optional().meta({
            description: "一句话简介（可选）",
        }),
        avatar: ImageSchema.optional().meta({
            description: "成员头像照片（可选，无头像则用首字徽标）",
        }),
    })).min(3).max(4).default([
        { name: '陈一鸣', role: '行政总厨', bio: '二十年粤菜功底，匠心慢火出真味' },
        { name: '林晚秋', role: '甜品主理人', bio: '法式甜点世界赛银奖得主' },
        { name: '苏越', role: '前厅经理', bio: '让每位客人都宾至如归' },
        { name: '何嘉树', role: '品控顾问', bio: '只选当季当地的新鲜食材' },
    ]).meta({ description: "团队成员列表（3-4 人）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK_MEMBERS = [
    { name: '陈一鸣', role: '行政总厨', bio: '二十年粤菜功底，匠心慢火出真味' },
    { name: '林晚秋', role: '甜品主理人', bio: '法式甜点世界赛银奖得主' },
    { name: '苏越', role: '前厅经理', bio: '让每位客人都宾至如归' },
    { name: '何嘉树', role: '品控顾问', bio: '只选当季当地的新鲜食材' },
]

const TeamGrid: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '遇见我们的主厨团队'
    const members = ((slideData?.members && slideData.members.length > 0)
        ? slideData.members
        : FALLBACK_MEMBERS) as SlideData['members']

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#fdf6ec)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：焦糖金同心圆盘 + 暖色光晕 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="foodTeamGlowL" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="foodTeamGlowR" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 左上暖橙光晕 */}
                    <circle cx="120" cy="80" r="260" fill="url(#foodTeamGlowL)" />
                    {/* 右下暖红光晕 */}
                    <circle cx="1180" cy="660" r="280" fill="url(#foodTeamGlowR)" />
                    {/* 右上焦糖金圆盘（同心圆构图） */}
                    {[0, 1, 2, 3].map((i) => (
                        <circle
                            key={i}
                            cx="1180"
                            cy="-30"
                            r={90 + i * 60}
                            fill="none"
                            stroke="var(--stroke,#f0e0cc)"
                            strokeWidth="2"
                        />
                    ))}
                    {/* 左下圆盘点缀 */}
                    {[0, 1].map((i) => (
                        <circle
                            key={`l${i}`}
                            cx="-20"
                            cy="700"
                            r={120 + i * 70}
                            fill="none"
                            stroke="var(--stroke,#f0e0cc)"
                            strokeWidth="2"
                        />
                    ))}
                </svg>

                {/* 内容主层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区：餐具点缀（圆盘 + 刀叉图案） */}
                    <div className="flex flex-shrink-0 items-center gap-4">
                        {/* 圆盘 + 叉子 SVG 母题 */}
                        <span
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                            style={{
                                background: "var(--card-color,#fffaf2)",
                                border: "2px solid var(--stroke,#f0e0cc)",
                                boxShadow: "0 6px 18px rgba(232,89,12,0.12)",
                            }}
                        >
                            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                                {/* 叉子 */}
                                <path d="M8 2v6a2 2 0 0 0 2 2v12" fill="none" stroke="var(--primary-color,#e8590c)" strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M6 2v4M8 2v4M10 2v4" fill="none" stroke="var(--primary-color,#e8590c)" strokeWidth="1.8" strokeLinecap="round" />
                                {/* 勺/刀 */}
                                <path d="M16 2c-1.5 1-1.5 5 0 7v13" fill="none" stroke="var(--secondary-color,#c92a2a)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <div className="flex flex-col">
                            <div className="mb-2 h-1.5 w-14 rounded-full" style={{ background: "var(--primary-color,#e8590c)" }} />
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* 成员卡网格 */}
                    <div className="mt-10 grid flex-1 items-stretch gap-6"
                        style={{ gridTemplateColumns: `repeat(${Math.min(Math.max(members.length, 1), 4)}, minmax(0, 1fr))` }}
                    >
                        {members.map((m, i) => {
                            const name = m?.name || '主厨'
                            const role = m?.role || '团队成员'
                            const bio = m?.bio
                            const avatarUrl = m?.avatar?.__image_url__
                            const initial = name.trim().slice(0, 1)
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center rounded-3xl border px-5 py-7 text-center"
                                    style={{
                                        background: "var(--card-color,#fffaf2)",
                                        borderColor: "var(--stroke,#f0e0cc)",
                                        boxShadow: "0 10px 28px rgba(201,42,42,0.08)",
                                    }}
                                >
                                    {/* 圆盘头像 / 首字徽标 */}
                                    <div className="relative flex-shrink-0">
                                        {/* 焦糖金描边圆环 */}
                                        <div
                                            className="flex h-24 w-24 items-center justify-center rounded-full"
                                            style={{
                                                background: avatarUrl
                                                    ? "var(--stroke,#f0e0cc)"
                                                    : "linear-gradient(135deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))",
                                                border: "3px solid var(--stroke,#f0e0cc)",
                                                boxShadow: "0 8px 20px rgba(232,89,12,0.18)",
                                            }}
                                        >
                                            {avatarUrl ? (
                                                <div className="relative h-[5.25rem] w-[5.25rem] overflow-hidden rounded-full">
                                                    <img
                                                        src={avatarUrl}
                                                        alt={m?.avatar?.__image_prompt__ || name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                    {/* 主题色渐变遮罩 */}
                                                    <div
                                                        className="absolute inset-0"
                                                        style={{
                                                            background: "linear-gradient(160deg, rgba(232,89,12,0.0) 45%, rgba(201,42,42,0.28))",
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <span
                                                    className="text-4xl font-black leading-none"
                                                    style={{ color: "var(--primary-text,#ffffff)" }}
                                                >
                                                    {initial}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* 姓名 */}
                                    <h2
                                        className="mt-5 text-xl font-bold leading-[1.3] break-words"
                                        style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {name}
                                    </h2>

                                    {/* 职务标签（暖色块） */}
                                    <span
                                        className="mt-2 inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-semibold leading-relaxed break-words"
                                        style={{
                                            color: "var(--primary-color,#e8590c)",
                                            background: "rgba(232,89,12,0.10)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {role}
                                    </span>

                                    {/* 焦糖金分隔点 */}
                                    <div className="mt-3 flex items-center gap-1.5">
                                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--stroke,#f0e0cc)" }} />
                                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--secondary-color,#c92a2a)" }} />
                                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--stroke,#f0e0cc)" }} />
                                    </div>

                                    {/* 简介（可选） */}
                                    {bio && (
                                        <p
                                            className="mt-3 text-sm leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#3b2412)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
