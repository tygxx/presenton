import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'medical-cn-team-grid'
export const layoutName = '团队介绍'
export const layoutDescription = '医疗健康风团队介绍：圆角成员卡网格，含姓名、职务与简介，支持头像或首字徽标。脉搏波形、十字与柔和投影点缀，蓝绿配色，洁净可信。'

const schema = z.object({
    title: z.string().min(2).max(20).default('核心医疗团队').meta({
        description: "团队介绍页主标题（中文，简短）",
    }),
    members: z.array(z.object({
        name: z.string().min(1).max(10).meta({
            description: "成员姓名",
        }),
        role: z.string().min(1).max(16).meta({
            description: "成员职务/科室，如『主任医师·心血管科』",
        }),
        bio: z.string().max(30).optional().meta({
            description: "成员简介一句话（可选）",
        }),
        avatar: ImageSchema.optional().meta({
            description: "成员头像照片（可选，无则用首字徽标）",
        }),
    })).min(3).max(4).default([
        {
            name: '林之华',
            role: '主任医师 · 心血管内科',
            bio: '深耕介入治疗二十年，国家级临床专家',
        },
        {
            name: '苏婉清',
            role: '副主任医师 · 全科医学',
            bio: '专注慢病管理与家庭健康照护',
        },
        {
            name: '陈泽楷',
            role: '主治医师 · 影像诊断科',
            bio: 'AI 辅助阅片研究方向带头人',
        },
        {
            name: '何思远',
            role: '护理总监 · 重症监护',
            bio: '构建标准化护理与质控体系',
        },
    ]).meta({ description: "团队成员列表（3 至 4 人）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ACCENTS = [
    'var(--primary-color,#0ea5e9)',
    'var(--secondary-color,#10b981)',
    'var(--primary-color,#0ea5e9)',
    'var(--secondary-color,#10b981)',
]

const TeamGrid: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '核心医疗团队'
    const members = (slideData?.members && slideData.members.length > 0
        ? slideData.members
        : [
            { name: '林之华', role: '主任医师 · 心血管内科', bio: '深耕介入治疗二十年，国家级临床专家' },
            { name: '苏婉清', role: '副主任医师 · 全科医学', bio: '专注慢病管理与家庭健康照护' },
            { name: '陈泽楷', role: '主治医师 · 影像诊断科', bio: 'AI 辅助阅片研究方向带头人' },
            { name: '何思远', role: '护理总监 · 重症监护', bio: '构建标准化护理与质控体系' },
        ]).slice(0, 4)

    const cols = members.length <= 3 ? 'grid-cols-3' : 'grid-cols-4'

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
                {/* 背景装饰：脉搏波形 + 柔和光晕 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <div
                        className="absolute -top-32 -right-24 h-80 w-80 rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.12), rgba(14,165,233,0) 70%)" }}
                    />
                    <div
                        className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12), rgba(16,185,129,0) 70%)" }}
                    />
                    <svg viewBox="0 0 1280 160" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none" aria-hidden="true">
                        <path
                            d="M0 110 L320 110 L360 110 L385 60 L410 150 L445 30 L470 110 L640 110 L900 110 L935 110 L960 70 L985 145 L1015 45 L1040 110 L1280 110"
                            fill="none"
                            stroke="var(--primary-color,#0ea5e9)"
                            strokeOpacity="0.18"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* 右上角十字母题 */}
                <div className="absolute top-8 right-10 z-0 flex items-center justify-center" aria-hidden="true">
                    <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{ background: "rgba(16,185,129,0.12)" }}
                    >
                        <div className="relative h-5 w-5">
                            <span
                                className="absolute left-1/2 top-0 h-full w-1.5 -translate-x-1/2 rounded-full"
                                style={{ background: "var(--secondary-color,#10b981)" }}
                            />
                            <span
                                className="absolute top-1/2 left-0 h-1.5 w-full -translate-y-1/2 rounded-full"
                                style={{ background: "var(--secondary-color,#10b981)" }}
                            />
                        </div>
                    </div>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <span
                            className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-medium break-words"
                            style={{
                                color: "var(--secondary-color,#10b981)",
                                background: "rgba(16,185,129,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-1.5 w-1.5 rounded-full"
                                style={{ background: "var(--secondary-color,#10b981)" }}
                            />
                            专业 · 洁净 · 可信赖
                        </span>
                        <div className="flex items-center gap-4">
                            <span className="h-8 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--primary-color,#0ea5e9)" }} />
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* 成员卡网格 */}
                    <div className={`mt-10 grid flex-1 items-stretch gap-6 ${cols}`}>
                        {members.map((m, i) => {
                            const accent = ACCENTS[i % ACCENTS.length]
                            const name = m?.name || '成员'
                            const initial = name.trim().slice(0, 1)
                            const hasAvatar = !!m?.avatar?.__image_url__
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center rounded-2xl border px-5 pt-8 pb-6 text-center shadow-sm"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#e2e8f0)",
                                        boxShadow: '0 10px 30px -12px rgba(15,23,42,0.12)',
                                    }}
                                >
                                    {/* 头像 / 首字徽标 */}
                                    {hasAvatar ? (
                                        <div
                                            className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full"
                                            style={{ boxShadow: `0 0 0 4px var(--card-color,#ffffff), 0 0 0 6px ${accent}` }}
                                        >
                                            <img
                                                src={m!.avatar!.__image_url__}
                                                alt={m!.avatar!.__image_prompt__ || name}
                                                className="h-full w-full object-cover"
                                            />
                                            <div
                                                className="absolute inset-0"
                                                style={{ background: `linear-gradient(160deg, rgba(14,165,233,0.06), ${accent === 'var(--secondary-color,#10b981)' ? 'rgba(16,185,129,0.22)' : 'rgba(14,165,233,0.22)'})` }}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full text-3xl font-black break-words"
                                            style={{
                                                color: "var(--primary-text,#ffffff)",
                                                background: `linear-gradient(150deg, ${accent}, rgba(255,255,255,0.0))`,
                                                backgroundColor: accent,
                                                boxShadow: '0 0 0 4px var(--card-color,#ffffff), 0 0 0 6px rgba(14,165,233,0.18)',
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {initial}
                                        </div>
                                    )}

                                    {/* 姓名 */}
                                    <h3
                                        className="mt-5 text-lg font-bold leading-[1.3] break-words"
                                        style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {name}
                                    </h3>

                                    {/* 职务 */}
                                    <p
                                        className="mt-1.5 text-xs font-semibold leading-relaxed break-words"
                                        style={{ color: accent, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m?.role || '医师'}
                                    </p>

                                    {/* 分隔脉搏点 */}
                                    <div className="my-3 flex items-center gap-1.5" aria-hidden="true">
                                        <span className="h-1 w-1 rounded-full" style={{ background: "var(--stroke,#e2e8f0)" }} />
                                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent, opacity: 0.6 }} />
                                        <span className="h-1 w-1 rounded-full" style={{ background: "var(--stroke,#e2e8f0)" }} />
                                    </div>

                                    {/* 简介（可选） */}
                                    {m?.bio ? (
                                        <p
                                            className="text-xs leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {m.bio}
                                        </p>
                                    ) : null}
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
