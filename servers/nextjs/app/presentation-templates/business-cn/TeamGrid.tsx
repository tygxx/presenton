import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'business-cn-team-grid'
export const layoutName = '团队介绍'
export const layoutDescription = '商务风团队介绍：标题居左，成员卡网格（3~4 张）。无头像自动用首字徽标 + 主题色。深蓝几何网格底纹 + 橙色强调，纯 CSS/SVG 装饰，离线可渲染。'

const MemberSchema = z.object({
    name: z.string().min(1).max(10).meta({
        description: "成员姓名（中文）",
    }),
    role: z.string().min(1).max(16).meta({
        description: "职务/头衔，如『首席执行官』",
    }),
    bio: z.string().max(30).optional().meta({
        description: "一句话简介/分管领域（可选）",
    }),
    avatar: ImageSchema.optional().meta({
        description: "成员头像（可选，留空则用首字徽标）",
    }),
})

const schema = z.object({
    title: z.string().min(2).max(20).default('核心管理团队').meta({
        description: "团队介绍页主标题（中文，简短）",
    }),
    members: z.array(MemberSchema).min(3).max(4).default([
        {
            name: '张明远',
            role: '首席执行官',
            bio: '十八年战略与运营经验',
        },
        {
            name: '李文清',
            role: '首席技术官',
            bio: '主导平台技术与研发体系',
        },
        {
            name: '王嘉禾',
            role: '首席财务官',
            bio: '统筹资本运作与风控管理',
        },
        {
            name: '陈思齐',
            role: '首席市场官',
            bio: '负责品牌建设与全球拓展',
        },
    ]).meta({ description: "团队成员（3~4 人）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const PALETTE = ['#1e3a8a', '#f97316', '#0f766e', '#7c3aed']

const TeamGrid: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '核心管理团队'
    const members = (slideData?.members && slideData.members.length > 0
        ? slideData.members
        : [
            { name: '张明远', role: '首席执行官', bio: '十八年战略与运营经验' },
            { name: '李文清', role: '首席技术官', bio: '主导平台技术与研发体系' },
            { name: '王嘉禾', role: '首席财务官', bio: '统筹资本运作与风控管理' },
            { name: '陈思齐', role: '首席市场官', bio: '负责品牌建设与全球拓展' },
        ]
    ).slice(0, 4)

    const cols = members.length <= 3 ? 3 : 4

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f8fafc)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景：经典网格底纹 + 几何面板装饰层 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="bizTeamGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0H0V48" fill="none" stroke="#1e3a8a" strokeOpacity="0.05" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="bizTeamPanel" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#bizTeamGrid)" />
                    <rect x="0" y="0" width="640" height="720" fill="url(#bizTeamPanel)" />
                </svg>

                {/* 顶部深蓝几何条 + 橙色强调 */}
                <div className="absolute top-0 left-0 h-2 w-full" style={{ background: "var(--primary-color,#1e3a8a)" }} aria-hidden="true" />
                <div className="absolute top-0 left-0 h-2 w-40" style={{ background: "var(--secondary-color,#f97316)" }} aria-hidden="true" />

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex items-end justify-between gap-6">
                        <div className="flex flex-col">
                            <div className="mb-4 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                        <span
                            className="mb-1 inline-flex flex-shrink-0 items-center rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {`核心成员 · ${members.length} 人`}
                        </span>
                    </div>

                    {/* 成员卡网格 */}
                    <div
                        className="mt-10 grid flex-1 content-center gap-6"
                        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                    >
                        {members.map((m, i) => {
                            const name = m?.name || '成员'
                            const role = m?.role || '职务'
                            const bio = m?.bio
                            const avatar = m?.avatar
                            const initial = name.trim().slice(0, 1)
                            const accent = PALETTE[i % PALETTE.length]

                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center rounded-2xl border px-5 py-7 shadow-sm"
                                    style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                                >
                                    {/* 头像 / 首字徽标 */}
                                    {avatar?.__image_url__ ? (
                                        <div
                                            className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full"
                                            style={{ boxShadow: `0 0 0 4px ${i === 0 ? 'var(--primary-color,#1e3a8a)' : accent}22` }}
                                        >
                                            <img
                                                src={avatar.__image_url__}
                                                alt={avatar.__image_prompt__ || name}
                                                className="h-full w-full object-cover"
                                            />
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background: `linear-gradient(160deg, rgba(30,58,138,0.10), rgba(249,115,22,0.18))`,
                                                }}
                                                aria-hidden="true"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full text-3xl font-black break-words"
                                            style={{
                                                background: i === 0 ? "var(--primary-color,#1e3a8a)" : accent,
                                                color: "var(--primary-text,#ffffff)",
                                                boxShadow: `0 0 0 4px ${i === 0 ? 'rgba(30,58,138,0.14)' : 'rgba(249,115,22,0.14)'}`,
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {initial}
                                        </div>
                                    )}

                                    {/* 姓名 */}
                                    <h3
                                        className="mt-5 text-xl font-bold leading-[1.3] break-words text-center"
                                        style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {name}
                                    </h3>

                                    {/* 职务 */}
                                    <p
                                        className="mt-2 text-sm font-semibold leading-relaxed break-words text-center"
                                        style={{ color: "var(--secondary-color,#f97316)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {role}
                                    </p>

                                    {/* 分隔点缀 */}
                                    <div
                                        className="my-3 h-px w-10"
                                        style={{ background: "var(--stroke,#e2e8f0)" }}
                                        aria-hidden="true"
                                    />

                                    {/* 简介（可选） */}
                                    {bio ? (
                                        <p
                                            className="text-sm leading-[1.7] break-words text-center"
                                            style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {bio}
                                        </p>
                                    ) : (
                                        <RemoteSvgIcon
                                            url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/user-bold.svg"
                                            strokeColor="currentColor"
                                            color="var(--background-text,#94a3b8)"
                                            className="w-5 h-5"
                                            title="team member"
                                        />
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
