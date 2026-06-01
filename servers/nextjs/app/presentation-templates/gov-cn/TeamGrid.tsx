import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'gov-cn-team-grid'
export const layoutName = '团队介绍'
export const layoutDescription = '党政政务风团队介绍页：米白底 + 中国红 + 烫金细线，居中对称标题配五角星点缀，3~4 张成员卡片横向网格，含姓名、职务与简介；无头像时用姓氏首字徽标 + 主题色。纯 CSS/SVG 装饰，离线可渲染。'

const defaultMembers = [
    {
        name: '李建国',
        role: '党组书记 · 主任',
        bio: '统筹全局工作，把方向、谋大局、抓落实。',
    },
    {
        name: '王志远',
        role: '党组副书记 · 副主任',
        bio: '分管政务服务与营商环境优化工作。',
    },
    {
        name: '张为民',
        role: '党组成员 · 副主任',
        bio: '分管民生保障与基层治理创新工作。',
    },
    {
        name: '陈思齐',
        role: '党组成员 · 秘书长',
        bio: '统筹机关运转与综合协调督办工作。',
    },
]

const schema = z.object({
    title: z.string().min(2).max(20).default('领导班子成员介绍').meta({
        description: "团队介绍页主标题（中文，简短庄重）",
    }),
    members: z.array(z.object({
        name: z.string().min(1).max(10).meta({ description: "成员姓名（中文）" }),
        role: z.string().min(2).max(16).meta({ description: "职务/头衔（中文）" }),
        bio: z.string().max(30).optional().meta({ description: "成员简介（中文，一句话，可选）" }),
        avatar: ImageSchema.optional().meta({ description: "成员头像照片（可选，无则用姓氏首字徽标）" }),
    })).min(3).max(4).default(defaultMembers).meta({
        description: "成员卡片（3~4 位，横向网格排布）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

// 烫金五角星装饰
const GoldStar: React.FC<{ className?: string; size?: number; opacity?: number }> = ({ className, size = 18, opacity = 1 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
        style={{ opacity }}
    >
        <path
            d="M12 2l2.95 6.18 6.8.78-5.03 4.62 1.36 6.72L12 17.7 5.92 20.3l1.36-6.72L2.25 8.96l6.8-.78L12 2z"
            fill="var(--secondary-color,#b8860b)"
        />
    </svg>
)

const TeamGrid: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '领导班子成员介绍'
    const members = ((slideData?.members && slideData.members.length >= 3)
        ? slideData.members.slice(0, 4)
        : defaultMembers) as SlideData['members']

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#faf7f2)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：对称华表纹样 + 烫金细线 + 中国红光晕 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    {/* 顶部中国红色带 */}
                    <div
                        className="absolute top-0 left-0 w-full"
                        style={{
                            height: '10px',
                            background: 'linear-gradient(90deg, var(--primary-color,#c1121f) 0%, var(--primary-color,#c1121f) 60%, rgba(193,18,31,0.7) 100%)',
                        }}
                    />
                    {/* 顶部中国红光晕带 */}
                    <div
                        className="absolute top-0 left-0 w-full"
                        style={{
                            height: '32%',
                            background: 'radial-gradient(120% 100% at 50% 0%, rgba(193,18,31,0.09) 0%, rgba(193,18,31,0) 70%)',
                        }}
                    />
                    {/* 左右对称烫金竖线（华表意象） */}
                    <div
                        className="absolute top-[16%] left-[4.5%]"
                        style={{
                            width: '2px', height: '68%',
                            background: 'linear-gradient(to bottom, rgba(184,134,11,0) 0%, rgba(184,134,11,0.45) 30%, rgba(184,134,11,0.45) 70%, rgba(184,134,11,0) 100%)',
                        }}
                    />
                    <div
                        className="absolute top-[16%] right-[4.5%]"
                        style={{
                            width: '2px', height: '68%',
                            background: 'linear-gradient(to bottom, rgba(184,134,11,0) 0%, rgba(184,134,11,0.45) 30%, rgba(184,134,11,0.45) 70%, rgba(184,134,11,0) 100%)',
                        }}
                    />
                    {/* 对称回字纹角标 SVG（左上 + 右上镜像） */}
                    <svg viewBox="0 0 80 80" className="absolute top-6 left-6 h-9 w-9" style={{ opacity: 0.5 }}>
                        <path d="M6 6h32v8H14v24H6V6zm14 14h18v18h-8V28H20v-8z" fill="none" stroke="var(--secondary-color,#b8860b)" strokeWidth="2" />
                    </svg>
                    <svg viewBox="0 0 80 80" className="absolute top-6 right-6 h-9 w-9" style={{ opacity: 0.5, transform: 'scaleX(-1)' }}>
                        <path d="M6 6h32v8H14v24H6V6zm14 14h18v18h-8V28H20v-8z" fill="none" stroke="var(--secondary-color,#b8860b)" strokeWidth="2" />
                    </svg>
                    {/* 底部对称烫金细线 + 中心星 */}
                    <div
                        className="absolute bottom-7 left-1/2"
                        style={{
                            width: '46%', height: '1px', transform: 'translateX(-50%)',
                            background: 'linear-gradient(to right, rgba(184,134,11,0) 0%, rgba(184,134,11,0.5) 50%, rgba(184,134,11,0) 100%)',
                        }}
                    />
                    <div className="absolute bottom-[22px] left-1/2" style={{ transform: 'translateX(-50%)' }}>
                        <GoldStar size={12} opacity={0.7} />
                    </div>
                </div>

                {/* 主内容：居中对称标题 + 成员卡片网格 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-11">
                    {/* 居中对称标题区 */}
                    <div className="flex flex-shrink-0 flex-col items-center text-center">
                        <div className="mb-3 flex items-center gap-3">
                            <span style={{ width: '40px', height: '2px', background: 'var(--secondary-color,#b8860b)' }} />
                            <GoldStar size={16} />
                            <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ background: 'var(--primary-color,#c1121f)' }}
                            />
                            <GoldStar size={16} />
                            <span style={{ width: '40px', height: '2px', background: 'var(--secondary-color,#b8860b)' }} />
                        </div>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#1a1a1a)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-4 h-1 w-20 rounded-full"
                            style={{ background: 'var(--primary-color,#c1121f)' }}
                        />
                    </div>

                    {/* 成员卡片网格：横向均分，3~4 列自适应 */}
                    <div className="mt-9 flex flex-1 items-stretch justify-center gap-6">
                        {members.map((m, i) => {
                            const name = m?.name || ''
                            const role = m?.role || ''
                            const bio = m?.bio || ''
                            const avatarUrl = m?.avatar?.__image_url__
                            const avatarPrompt = m?.avatar?.__image_prompt__ || '成员头像'
                            const initial = name.trim().slice(0, 1) || '·'
                            return (
                                <div
                                    key={i}
                                    className="flex flex-1 basis-0 flex-col items-center rounded-2xl border px-6 py-7 text-center"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#e8dcc8)",
                                        boxShadow: '0 6px 22px rgba(193,18,31,0.06)',
                                    }}
                                >
                                    {/* 头像 / 首字徽标 */}
                                    <div
                                        className="relative flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-full"
                                        style={{
                                            background: "var(--primary-color,#c1121f)",
                                            border: '2px solid var(--secondary-color,#b8860b)',
                                            boxShadow: '0 0 0 4px rgba(184,134,11,0.10)',
                                        }}
                                    >
                                        {avatarUrl ? (
                                            <>
                                                <img
                                                    src={avatarUrl}
                                                    alt={avatarPrompt}
                                                    className="absolute inset-0 h-full w-full object-cover"
                                                />
                                                {/* 主题色渐变遮罩 */}
                                                <div
                                                    className="absolute inset-0"
                                                    style={{
                                                        background: 'linear-gradient(to top, rgba(193,18,31,0.32) 0%, rgba(193,18,31,0) 55%)',
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            <span
                                                className="text-4xl font-black leading-none"
                                                style={{ color: "var(--primary-text,#ffffff)" }}
                                            >
                                                {initial}
                                            </span>
                                        )}
                                    </div>

                                    {/* 姓名 */}
                                    <h2
                                        className="mt-5 text-2xl font-black leading-[1.3] break-words"
                                        style={{
                                            color: "var(--background-text,#1a1a1a)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {name}
                                    </h2>

                                    {/* 职务徽章 */}
                                    <span
                                        className="mt-3 inline-flex items-center rounded-sm px-3 py-1 text-sm font-semibold leading-relaxed break-words"
                                        style={{
                                            color: "var(--primary-color,#c1121f)",
                                            background: 'rgba(193,18,31,0.08)',
                                            border: '1px solid var(--stroke,#e8dcc8)',
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {role}
                                    </span>

                                    {/* 烫金分隔短线 */}
                                    <div
                                        className="mt-4 h-px w-12"
                                        style={{ background: 'var(--secondary-color,#b8860b)', opacity: 0.6 }}
                                        aria-hidden="true"
                                    />

                                    {/* 简介（可选） */}
                                    {bio && (
                                        <p
                                            className="mt-4 text-sm leading-[1.7] break-words"
                                            style={{
                                                color: "var(--background-text,#1a1a1a)",
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
