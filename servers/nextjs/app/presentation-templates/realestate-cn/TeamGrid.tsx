import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'realestate-cn-team-grid'
export const layoutName = '团队介绍'
export const layoutDescription = '房产建筑风团队介绍：高级灰底 + 金铜点缀 + 细线分隔的成员卡网格，支持头像或首字徽标。极简线条与建筑剪影装饰，离线可渲染。'

const memberSchema = z.object({
    name: z.string().min(2).max(10).meta({
        description: "成员姓名",
    }),
    role: z.string().min(2).max(16).meta({
        description: "成员职务/头衔",
    }),
    bio: z.string().max(30).optional().meta({
        description: "一句话简介（可选）",
    }),
    avatar: ImageSchema.optional().meta({
        description: "成员头像照片（可选，留空则用首字徽标）",
    }),
})

const schema = z.object({
    title: z.string().min(2).max(20).default('核心团队').meta({
        description: "版式主标题（中文，简短）",
    }),
    eyebrow: z.string().min(2).max(16).default('TEAM · 专业团队').meta({
        description: "标题上方的小标签",
    }),
    members: z.array(memberSchema).min(3).max(4).default([
        {
            name: '沈知远',
            role: '首席建筑设计师',
            bio: '深耕高端住宅与城市更新十六年',
        },
        {
            name: '林婉清',
            role: '项目运营总监',
            bio: '统筹百万方旗舰项目全周期落地',
        },
        {
            name: '陈立帆',
            role: '资产管理合伙人',
            bio: '主导多支核心写字楼基金配置',
        },
        {
            name: '苏景行',
            role: '客户体验官',
            bio: '以人居细节定义轻奢生活范式',
        },
    ]).meta({
        description: "团队成员卡片（3 至 4 位）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const PALETTE = ['#b08d57', '#8a6d3b', '#3f3f46', '#52525b']

const TeamGrid: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '核心团队'
    const eyebrow = slideData?.eyebrow || 'TEAM · 专业团队'
    const members = (slideData?.members && slideData.members.length > 0)
        ? slideData.members
        : [
            { name: '沈知远', role: '首席建筑设计师', bio: '深耕高端住宅与城市更新十六年' },
            { name: '林婉清', role: '项目运营总监', bio: '统筹百万方旗舰项目全周期落地' },
            { name: '陈立帆', role: '资产管理合伙人', bio: '主导多支核心写字楼基金配置' },
            { name: '苏景行', role: '客户体验官', bio: '以人居细节定义轻奢生活范式' },
        ]

    const colCount = members.length <= 3 ? 3 : 4

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
                {/* 背景装饰：极简建筑剪影 + 细线 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    {/* 顶部细基线 */}
                    <line x1="0" y1="0.5" x2="1280" y2="0.5" stroke="var(--primary-color,#b08d57)" strokeOpacity="0.45" strokeWidth="3" />
                    {/* 右下角建筑剪影楼宇群 */}
                    <g stroke="var(--secondary-color,#3f3f46)" strokeOpacity="0.05" strokeWidth="1" fill="none">
                        <rect x="930" y="470" width="70" height="250" />
                        <rect x="1010" y="540" width="56" height="180" />
                        <rect x="1076" y="430" width="80" height="290" />
                        <rect x="1166" y="520" width="64" height="200" />
                        <line x1="950" y1="470" x2="950" y2="720" />
                        <line x1="970" y1="470" x2="970" y2="720" />
                        <line x1="1096" y1="430" x2="1096" y2="720" />
                        <line x1="1116" y1="430" x2="1116" y2="720" />
                        <line x1="1136" y1="430" x2="1136" y2="720" />
                    </g>
                    {/* 左上极简线条网格点缀 */}
                    <g stroke="var(--primary-color,#b08d57)" strokeOpacity="0.10" strokeWidth="1">
                        <line x1="64" y1="150" x2="64" y2="70" />
                        <line x1="64" y1="70" x2="144" y2="70" />
                    </g>
                </svg>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-20 py-14">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <span
                            className="text-xs font-medium uppercase leading-relaxed break-words"
                            style={{
                                color: "var(--primary-color,#b08d57)",
                                letterSpacing: '0.28em',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {eyebrow}
                        </span>
                        <div className="mt-4 flex items-end gap-5">
                            <h1
                                className="text-5xl font-light leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div
                                className="mb-2 h-px flex-1"
                                style={{ background: "var(--stroke,#e4e4e7)" }}
                            />
                        </div>
                    </div>

                    {/* 成员卡网格 */}
                    <div
                        className="mt-12 grid flex-1 items-stretch gap-px"
                        style={{
                            gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                            background: "var(--stroke,#e4e4e7)",
                        }}
                    >
                        {members.map((m, i) => {
                            const accent = PALETTE[i % PALETTE.length]
                            const firstChar = (m?.name || '·').trim().slice(0, 1)
                            const hasAvatar = !!m?.avatar?.__image_url__
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center px-7 py-9 text-center"
                                    style={{ background: "var(--card-color,#ffffff)" }}
                                >
                                    {/* 头像 / 首字徽标 */}
                                    {hasAvatar ? (
                                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full">
                                            <img
                                                src={m.avatar!.__image_url__}
                                                alt={m.avatar?.__image_prompt__ || m?.name || '成员头像'}
                                                className="h-full w-full object-cover"
                                            />
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background: `linear-gradient(160deg, rgba(176,141,87,0.10), ${accent}33)`,
                                                }}
                                            />
                                            <div
                                                className="absolute inset-0 rounded-full"
                                                style={{ boxShadow: `inset 0 0 0 1px ${accent}` }}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full text-3xl font-light"
                                            style={{
                                                color: "var(--primary-text,#ffffff)",
                                                background: `linear-gradient(155deg, ${accent}, var(--secondary-color,#3f3f46))`,
                                                boxShadow: `0 0 0 1px var(--stroke,#e4e4e7), 0 0 0 6px ${accent}14`,
                                            }}
                                        >
                                            <span className="break-words" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                                {firstChar}
                                            </span>
                                        </div>
                                    )}

                                    {/* 姓名 */}
                                    <h3
                                        className="mt-6 text-xl font-medium leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m?.name}
                                    </h3>

                                    {/* 职务 */}
                                    <p
                                        className="mt-1.5 text-sm font-normal leading-relaxed break-words"
                                        style={{ color: accent, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m?.role}
                                    </p>

                                    {/* 细分割线 */}
                                    <div
                                        className="my-4 h-px w-8"
                                        style={{ background: "var(--primary-color,#b08d57)", opacity: 0.6 }}
                                    />

                                    {/* 简介（可选） */}
                                    {m?.bio && (
                                        <p
                                            className="text-xs font-light leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#27272a)", opacity: 0.62, overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
