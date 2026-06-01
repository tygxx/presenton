import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'green-cn-team-grid'
export const layoutName = '团队介绍'
export const layoutDescription = '新能源环保风团队介绍页：清新白绿背景 + 叶片/地球/自然曲线装饰，成员卡网格展示姓名、职务、简介与头像；无头像时用首字徽标 + 主题色。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('我们的团队').meta({
        description: "团队介绍页主标题（中文，简短）",
    }),
    members: z.array(z.object({
        name: z.string().min(1).max(10).meta({
            description: "成员姓名",
        }),
        role: z.string().min(2).max(16).meta({
            description: "成员职务，如『首席科学家』『研发总监』",
        }),
        bio: z.string().max(30).optional().meta({
            description: "一句话简介（可选），如专长或愿景",
        }),
        avatar: ImageSchema.optional().meta({
            description: "成员头像（可选），无头像时自动用姓名首字徽标",
        }),
    })).min(3).max(4).default([
        {
            name: '林清禾',
            role: '创始人 / CEO',
            bio: '深耕清洁能源十五年，推动零碳转型',
        },
        {
            name: '叶承泽',
            role: '首席技术官',
            bio: '光伏与储能系统架构专家',
        },
        {
            name: '苏沐阳',
            role: '研发总监',
            bio: '主导新一代风电叶片研发',
        },
        {
            name: '陈知行',
            role: '可持续发展总监',
            bio: '专注碳中和路径与生态共建',
        },
    ]).meta({
        description: "团队成员列表（3-4 人）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TeamGrid: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '我们的团队'
    const members = (slideData?.members && slideData.members.length > 0)
        ? slideData.members
        : [
            { name: '林清禾', role: '创始人 / CEO', bio: '深耕清洁能源十五年，推动零碳转型' },
            { name: '叶承泽', role: '首席技术官', bio: '光伏与储能系统架构专家' },
            { name: '苏沐阳', role: '研发总监', bio: '主导新一代风电叶片研发' },
            { name: '陈知行', role: '可持续发展总监', bio: '专注碳中和路径与生态共建' },
        ]

    const count = members.length

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f0fdf4)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：自然曲线 + 地球 + 叶脉光晕（纯 SVG，离线可渲染） */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="greenTeamSky" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="greenTeamGlow" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* 顶部天空蓝渐变带 */}
                    <rect width="1280" height="720" fill="url(#greenTeamSky)" />

                    {/* 左上能源光晕 */}
                    <circle cx="120" cy="80" r="240" fill="url(#greenTeamGlow)" />

                    {/* 右下地球弧线（自然有机形状） */}
                    <circle cx="1180" cy="700" r="200" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.16" strokeWidth="2" />
                    <circle cx="1180" cy="700" r="260" fill="none" stroke="var(--secondary-color,#0891b2)" strokeOpacity="0.12" strokeWidth="2" />
                    <path d="M980 700 a200 200 0 0 1 400 0" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.10" strokeWidth="1.5" />

                    {/* 底部自然曲线（草坡/能源流动） */}
                    <path
                        d="M0 660 C 220 600 420 700 660 650 S 1080 600 1280 650 L 1280 720 L 0 720 Z"
                        fill="var(--primary-color,#16a34a)"
                        fillOpacity="0.06"
                    />
                    <path
                        d="M0 690 C 260 640 480 720 720 680 S 1100 650 1280 685 L 1280 720 L 0 720 Z"
                        fill="var(--secondary-color,#0891b2)"
                        fillOpacity="0.05"
                    />

                    {/* 叶片母题：右上一枚舒展的叶子 + 叶脉 */}
                    <g transform="translate(1080 70) rotate(18)" opacity="0.5">
                        <path
                            d="M0 0 C 70 -40 150 -20 180 70 C 90 90 10 70 0 0 Z"
                            fill="var(--primary-color,#16a34a)"
                            fillOpacity="0.14"
                        />
                        <path d="M0 0 C 70 25 130 45 180 70" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.22" strokeWidth="2" />
                    </g>
                </svg>

                {/* 内容层：标题 + 成员网格，flex 纵向居中分布 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 items-center gap-4">
                        <span
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                            style={{ background: "var(--primary-color,#16a34a)" }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-6 h-6"
                                title="leaf"
                            />
                        </span>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div className="mt-3 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#0891b2)" }} />
                        </div>
                    </div>

                    {/* 成员网格 */}
                    <div
                        className="mt-10 grid flex-1 items-stretch gap-6"
                        style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
                    >
                        {members.map((m, i) => {
                            const name = m?.name || '团队成员'
                            const role = m?.role || '核心成员'
                            const bio = m?.bio
                            const initial = name.trim().slice(0, 1)
                            const avatarUrl = m?.avatar?.__image_url__
                            const avatarPrompt = m?.avatar?.__image_prompt__ || '团队成员肖像'

                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center rounded-3xl border px-5 py-7 text-center shadow-sm"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#d1fae5)",
                                    }}
                                >
                                    {/* 头像 / 首字徽标 */}
                                    <div className="relative flex-shrink-0">
                                        {avatarUrl ? (
                                            <div
                                                className="relative h-24 w-24 overflow-hidden rounded-full"
                                                style={{ border: "3px solid var(--stroke,#d1fae5)" }}
                                            >
                                                <img
                                                    src={avatarUrl}
                                                    alt={avatarPrompt}
                                                    className="h-full w-full object-cover"
                                                />
                                                {/* 主题色渐变遮罩 */}
                                                <div
                                                    className="absolute inset-0"
                                                    style={{
                                                        background: "linear-gradient(160deg, rgba(22,163,74,0.05) 0%, rgba(8,145,178,0.30) 100%)",
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-black"
                                                style={{
                                                    background: "linear-gradient(160deg, var(--primary-color,#16a34a) 0%, var(--secondary-color,#0891b2) 100%)",
                                                    color: "var(--primary-text,#ffffff)",
                                                }}
                                            >
                                                {initial}
                                            </div>
                                        )}
                                        {/* 角标叶片点缀 */}
                                        <span
                                            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full shadow"
                                            style={{ background: "var(--card-color,#ffffff)", border: "1px solid var(--stroke,#d1fae5)" }}
                                        >
                                            <RemoteSvgIcon
                                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg"
                                                strokeColor="currentColor"
                                                color="var(--primary-color,#16a34a)"
                                                className="w-4 h-4"
                                                title="leaf"
                                            />
                                        </span>
                                    </div>

                                    {/* 姓名 */}
                                    <h3
                                        className="mt-5 text-xl font-bold leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {name}
                                    </h3>

                                    {/* 职务标签 */}
                                    <span
                                        className="mt-2 inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium leading-relaxed break-words"
                                        style={{
                                            color: "var(--secondary-color,#0891b2)",
                                            background: "rgba(8,145,178,0.10)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {role}
                                    </span>

                                    {/* 简介（可选） */}
                                    {bio && (
                                        <p
                                            className="mt-4 text-sm leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#14532d)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
