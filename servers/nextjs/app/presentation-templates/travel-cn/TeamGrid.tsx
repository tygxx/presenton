import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'travel-cn-team-grid'
export const layoutName = '团队介绍'
export const layoutDescription = '旅游文旅风团队介绍：明媚海蓝渐变背景 + 暖阳橙点缀，成员卡网格（3-4 人）。无头像自动用首字徽标 + 主题色。指南针/路线点装饰母题，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('同行团队').meta({
        description: "团队介绍页主标题（中文，简短）",
    }),
    members: z.array(z.object({
        name: z.string().min(1).max(10).meta({
            description: "成员姓名",
        }),
        role: z.string().min(2).max(16).meta({
            description: "成员职务/角色，如『首席领队』",
        }),
        bio: z.string().max(30).optional().meta({
            description: "成员一句话简介（可选）",
        }),
        avatar: ImageSchema.optional().meta({
            description: "成员头像（可选，留空则用首字徽标）",
        }),
    })).min(3).max(4).default([
        {
            name: '林海',
            role: '首席领队',
            bio: '深耕高原与海岛线路十二年',
            avatar: {
                __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
                __image_prompt__: '微笑的男性户外领队，戴遮阳帽，背景是蓝天大海',
            },
        },
        {
            name: '苏晴',
            role: '行程策划总监',
            bio: '擅长私享定制与小众目的地',
        },
        {
            name: '陈屿',
            role: '当地向导主管',
            bio: '熟悉沿海古镇与人文故事',
        },
        {
            name: '周岚',
            role: '客户体验经理',
            bio: '全程贴心服务，旅途无忧',
        },
    ]).meta({
        description: "团队成员列表（3-4 人）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const accentPalette = [
    'var(--primary-color,#0891b2)',
    'var(--secondary-color,#f59e0b)',
    'var(--primary-color,#0891b2)',
    'var(--secondary-color,#f59e0b)',
]

const TeamGrid: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '同行团队'
    const members = (slideData?.members && slideData.members.length > 0)
        ? slideData.members
        : [
            { name: '林海', role: '首席领队', bio: '深耕高原与海岛线路十二年' },
            { name: '苏晴', role: '行程策划总监', bio: '擅长私享定制与小众目的地' },
            { name: '陈屿', role: '当地向导主管', bio: '熟悉沿海古镇与人文故事' },
            { name: '周岚', role: '客户体验经理', bio: '全程贴心服务，旅途无忧' },
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
                    background: "var(--background-color,#f0f9ff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：海天渐变 + 路线点 + 指南针母题 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="travelTeamSky" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="travelTeamSun" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.22" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* 顶部海天光带 */}
                        <rect x="0" y="0" width="1280" height="320" fill="url(#travelTeamSky)" />
                        {/* 右上暖阳光晕 */}
                        <circle cx="1140" cy="120" r="220" fill="url(#travelTeamSun)" />
                        {/* 旅途路线虚线 + 路线点 */}
                        <path
                            d="M 60 150 C 320 60, 540 230, 820 130 S 1180 90, 1230 200"
                            fill="none"
                            stroke="var(--primary-color,#0891b2)"
                            strokeOpacity="0.20"
                            strokeWidth="2.5"
                            strokeDasharray="3 12"
                            strokeLinecap="round"
                        />
                        {[
                            [60, 150], [430, 132], [820, 130], [1230, 200],
                        ].map((p, i) => (
                            <circle key={i} cx={p[0]} cy={p[1]} r="5" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.55" />
                        ))}
                    </svg>
                </div>

                {/* 左上角指南针角标装饰 */}
                <svg
                    className="absolute"
                    style={{ top: '34px', right: '40px', opacity: 0.5 }}
                    width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true"
                >
                    <circle cx="32" cy="32" r="26" stroke="var(--primary-color,#0891b2)" strokeWidth="2" />
                    <circle cx="32" cy="32" r="20" stroke="var(--stroke,#bae6fd)" strokeWidth="1.5" />
                    <path d="M32 14 L37 32 L32 50 L27 32 Z" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.85" />
                    <circle cx="32" cy="32" r="3" fill="var(--primary-color,#0891b2)" />
                </svg>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full w-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <span
                            className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#0891b2)",
                                background: "rgba(8,145,178,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            />
                            一路同行 · 专业护航
                        </span>
                        <div className="flex items-center gap-4">
                            <h1
                                className="text-5xl font-black leading-[1.2] break-words"
                                style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div className="h-1.5 flex-1 rounded-full" style={{ background: "var(--stroke,#bae6fd)" }} />
                        </div>
                    </div>

                    {/* 成员卡网格 */}
                    <div
                        className="mt-10 grid flex-1 items-stretch gap-6"
                        style={{ gridTemplateColumns: `repeat(${Math.min(Math.max(members.length, 3), 4)}, minmax(0, 1fr))` }}
                    >
                        {members.slice(0, 4).map((m, i) => {
                            const accent = accentPalette[i % accentPalette.length]
                            const name = m?.name || '成员'
                            const initial = name.trim().slice(0, 1) || '旅'
                            const hasAvatar = !!m?.avatar?.__image_url__
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center rounded-3xl border px-5 py-7 text-center shadow-sm"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#bae6fd)",
                                        boxShadow: '0 10px 30px rgba(8,145,178,0.10)',
                                    }}
                                >
                                    {/* 头像 / 首字徽标 */}
                                    {hasAvatar ? (
                                        <div
                                            className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full"
                                            style={{ boxShadow: `0 0 0 4px var(--card-color,#ffffff), 0 0 0 6px ${accent}` }}
                                        >
                                            <img
                                                src={m!.avatar!.__image_url__}
                                                alt={m!.avatar!.__image_prompt__ || name}
                                                className="h-full w-full object-cover"
                                            />
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background: `linear-gradient(160deg, rgba(8,145,178,0.10), ${i % 2 === 0 ? 'rgba(8,145,178,0.28)' : 'rgba(245,158,11,0.28)'})`,
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full text-4xl font-black break-words"
                                            style={{
                                                color: "var(--primary-text,#ffffff)",
                                                background: `linear-gradient(150deg, ${accent}, ${i % 2 === 0 ? 'var(--secondary-color,#f59e0b)' : 'var(--primary-color,#0891b2)'})`,
                                                boxShadow: `0 0 0 4px var(--card-color,#ffffff), 0 8px 20px rgba(8,145,178,0.25)`,
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {initial}
                                        </div>
                                    )}

                                    {/* 姓名 */}
                                    <h2
                                        className="mt-5 text-xl font-bold leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {name}
                                    </h2>

                                    {/* 职务 */}
                                    <span
                                        className="mt-2 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold leading-relaxed break-words"
                                        style={{
                                            color: accent,
                                            background: i % 2 === 0 ? 'rgba(8,145,178,0.10)' : 'rgba(245,158,11,0.12)',
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {m?.role || '团队成员'}
                                    </span>

                                    {/* 分隔点缀（路线点母题） */}
                                    <div className="mt-4 flex items-center gap-1.5">
                                        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                                        <span className="inline-block h-px w-8 rounded-full" style={{ background: "var(--stroke,#bae6fd)" }} />
                                        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--primary-color,#0891b2)" }} />
                                    </div>

                                    {/* 简介（可选） */}
                                    {m?.bio && (
                                        <p
                                            className="mt-4 text-sm leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
