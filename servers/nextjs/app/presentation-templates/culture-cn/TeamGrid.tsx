import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'culture-cn-team-grid'
export const layoutName = '团队介绍'
export const layoutDescription = '国潮文创风团队介绍：宣纸米黄底，朱砂红印章块与描金边框装饰，成员卡网格展示姓名、职务与简介；无头像时以首字徽标搭配主题色呈现。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('匠心团队').meta({
        description: "团队介绍主标题（中文，简短，可体现东方文化气质）",
    }),
    members: z.array(z.object({
        name: z.string().min(1).max(10).meta({
            description: "成员姓名",
        }),
        role: z.string().min(2).max(16).meta({
            description: "成员职务或角色，如『主理人』『文创设计师』",
        }),
        bio: z.string().max(30).optional().meta({
            description: "成员一句话简介（可选）",
        }),
        avatar: ImageSchema.optional().meta({
            description: "成员头像（可选，留空则以姓名首字徽标呈现）",
        }),
    })).min(3).max(4).default([
        {
            name: '苏砚之',
            role: '创始主理人',
            bio: '深耕东方美学，让传统纹样焕新生。',
        },
        {
            name: '林墨白',
            role: '文创设计总监',
            bio: '以水墨笔触诠释现代国潮语言。',
        },
        {
            name: '陈青黛',
            role: '非遗工艺顾问',
            bio: '十年扎根手工艺，守护匠人温度。',
        },
        {
            name: '周锦书',
            role: '品牌主理人',
            bio: '讲好每一件文创背后的中国故事。',
        },
    ]).meta({
        description: "团队成员列表（3-4 人）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const PALETTE = ['#c0392b', '#1a1a1a', '#b8860b', '#7a3b2e']

const TeamGrid: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '匠心团队'
    const members = (slideData?.members && slideData.members.length > 0)
        ? slideData.members
        : [
            { name: '苏砚之', role: '创始主理人', bio: '深耕东方美学，让传统纹样焕新生。' },
            { name: '林墨白', role: '文创设计总监', bio: '以水墨笔触诠释现代国潮语言。' },
            { name: '陈青黛', role: '非遗工艺顾问', bio: '十年扎根手工艺，守护匠人温度。' },
            { name: '周锦书', role: '品牌主理人', bio: '讲好每一件文创背后的中国故事。' },
        ]

    const count = members.length
    const gridCols = count <= 3 ? 'grid-cols-3' : 'grid-cols-4'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f5ecd9)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：宣纸纹理 + 水墨笔触 + 描金线 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="cultureTeamPaper" cx="30%" cy="20%" r="90%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                                <stop offset="60%" stopColor="#f5ecd9" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="cultureTeamInk" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#cultureTeamPaper)" />
                        {/* 左上水墨晕染 */}
                        <path
                            d="M-40,-40 C160,40 120,200 240,240 C360,280 300,420 140,400 C-20,380 -60,180 -40,-40 Z"
                            fill="url(#cultureTeamInk)"
                        />
                        {/* 右下水墨笔触 */}
                        <path
                            d="M1320,760 C1120,700 1180,540 1040,520 C900,500 980,360 1140,400 C1280,436 1320,560 1320,760 Z"
                            fill="url(#cultureTeamInk)"
                        />
                        {/* 描金细线 */}
                        <line x1="80" y1="148" x2="1200" y2="148" stroke="var(--primary-color,#b8860b)" strokeOpacity="0.0" strokeWidth="0" />
                    </svg>
                </div>

                {/* 右上传统回纹角饰 */}
                <svg
                    className="absolute top-6 right-8"
                    width="120" height="120" viewBox="0 0 120 120" aria-hidden="true"
                >
                    <g fill="none" stroke="var(--primary-color,#c0392b)" strokeOpacity="0.18" strokeWidth="3">
                        <path d="M10 10 H110 V110" />
                        <path d="M28 28 H92 V92" />
                        <path d="M46 46 H74 V74" />
                    </g>
                </svg>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区：印章红块 + 描金细线 */}
                    <div className="flex flex-shrink-0 items-center gap-5">
                        <div
                            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md text-2xl font-black"
                            style={{
                                background: "var(--primary-color,#c0392b)",
                                color: "var(--primary-text,#ffffff)",
                                boxShadow: '0 0 0 3px rgba(192,57,43,0.18)',
                            }}
                        >
                            印
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{
                                    color: "var(--background-text,#2b2b2b)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {title}
                            </h1>
                            <div
                                className="mt-3 h-1 w-40 rounded-full"
                                style={{
                                    background: "linear-gradient(90deg, var(--primary-color,#c0392b), var(--stroke,#ddd0b4))",
                                }}
                            />
                        </div>
                    </div>

                    {/* 成员卡网格 */}
                    <div className={`mt-10 grid flex-1 ${gridCols} gap-6`}>
                        {members.map((m, i) => {
                            const accent = PALETTE[i % PALETTE.length]
                            const name = m?.name || '佚名'
                            const role = m?.role || '团队成员'
                            const bio = m?.bio
                            const avatarUrl = m?.avatar?.__image_url__
                            const initial = name.trim().slice(0, 1)

                            return (
                                <div
                                    key={i}
                                    className="relative flex flex-col items-center rounded-xl px-5 py-7 shadow-sm"
                                    style={{
                                        background: "var(--card-color,#fbf5e9)",
                                        border: "1px solid var(--stroke,#ddd0b4)",
                                    }}
                                >
                                    {/* 顶部描金细边 */}
                                    <div
                                        className="absolute left-0 right-0 top-0 h-1 rounded-t-xl"
                                        style={{ background: accent, opacity: 0.85 }}
                                    />

                                    {/* 头像 / 首字徽标 */}
                                    {avatarUrl ? (
                                        <div
                                            className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full"
                                            style={{ boxShadow: `0 0 0 3px ${accent}` }}
                                        >
                                            <img
                                                src={avatarUrl}
                                                alt={m?.avatar?.__image_prompt__ || name}
                                                className="h-full w-full object-cover"
                                            />
                                            {/* 主题色渐变遮罩 */}
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background: `linear-gradient(160deg, rgba(192,57,43,0) 55%, ${accent}66 100%)`,
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="relative flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full text-4xl font-black"
                                            style={{
                                                background: accent,
                                                color: "var(--primary-text,#ffffff)",
                                                boxShadow: `0 0 0 3px var(--background-color,#f5ecd9), 0 0 0 5px ${accent}55`,
                                            }}
                                        >
                                            <span
                                                className="break-words"
                                                style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {initial}
                                            </span>
                                        </div>
                                    )}

                                    {/* 姓名 */}
                                    <div
                                        className="mt-5 text-xl font-bold leading-[1.3] break-words text-center"
                                        style={{
                                            color: "var(--background-text,#2b2b2b)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {name}
                                    </div>

                                    {/* 职务 */}
                                    <div
                                        className="mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium leading-relaxed break-words text-center"
                                        style={{
                                            color: "var(--primary-text,#ffffff)",
                                            background: accent,
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {role}
                                    </div>

                                    {/* 简介 */}
                                    {bio && (
                                        <p
                                            className="mt-4 text-sm leading-[1.7] break-words text-center"
                                            style={{
                                                color: "var(--background-text,#2b2b2b)",
                                                opacity: 0.78,
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
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
