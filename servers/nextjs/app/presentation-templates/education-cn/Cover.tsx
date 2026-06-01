import React from 'react'
import * as z from "zod";

export const layoutId = 'education-cn-cover'
export const layoutName = '封面'
export const layoutDescription = '教育培训风封面：明亮米白背景 + 活力橙蓝圆角卡片，书本、灯泡、成长曲线与圆点装饰母题。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    eyebrow: z.string().min(2).max(18).default('精品课程 · 2026').meta({
        description: "标题上方的小标签/分类，如『公开课』『师资培训』『学期导览』",
    }),
    title: z.string().min(2).max(20).default('点亮每一次成长').meta({
        description: "封面主标题（中文，简短有力，贴合教育培训）",
    }),
    subtitle: z.string().min(4).max(44).default('以兴趣为起点，用方法陪伴每位学员稳步进阶').meta({
        description: "副标题，一句话补充课程理念或培训亮点",
    }),
    presenterName: z.string().min(2).max(16).default('李晓彤').meta({
        description: "主讲人/讲师姓名",
    }),
    presentationDate: z.string().min(2).max(22).default('2026年9月 · 秋季学期').meta({
        description: "课程或培训日期",
    }),
    organization: z.string().min(2).max(26).default('启明教育 · 成长学院').meta({
        description: "机构或部门名称",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Cover: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '精品课程 · 2026'
    const title = slideData?.title || '点亮每一次成长'
    const subtitle = slideData?.subtitle || '以兴趣为起点，用方法陪伴每位学员稳步进阶'
    const presenterName = slideData?.presenterName || '李晓彤'
    const presentationDate = slideData?.presentationDate || '2026年9月 · 秋季学期'
    const organization = slideData?.organization || '启明教育 · 成长学院'
    const initials = presenterName.trim().slice(0, 2)

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
                {/* 背景装饰层：柔和光晕 + 圆点网格 + 成长曲线 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="eduCoverGlowBlue" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="eduCoverGlowOrange" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="eduCoverCurve" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.55" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.55" />
                            </linearGradient>
                        </defs>
                        {/* 左上蓝色光晕 */}
                        <circle cx="160" cy="120" r="260" fill="url(#eduCoverGlowBlue)" />
                        {/* 右下橙色光晕 */}
                        <circle cx="1140" cy="640" r="300" fill="url(#eduCoverGlowOrange)" />
                        {/* 右上圆点装饰网格 */}
                        {[0, 1, 2, 3, 4].map((row) =>
                            [0, 1, 2, 3, 4, 5].map((col) => (
                                <circle
                                    key={`dot-${row}-${col}`}
                                    cx={980 + col * 46}
                                    cy={70 + row * 44}
                                    r="3.5"
                                    fill="var(--secondary-color,#f97316)"
                                    fillOpacity="0.30"
                                />
                            ))
                        )}
                        {/* 成长曲线（向上的学习进阶曲线） */}
                        <path
                            d="M120 600 C 360 560, 520 520, 700 420 S 1040 220, 1200 150"
                            fill="none"
                            stroke="url(#eduCoverCurve)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray="2 14"
                        />
                    </svg>
                </div>

                {/* 右侧大号灯泡 + 书本 SVG 母题装饰面板 */}
                <div className="absolute right-0 top-0 z-0 flex h-full w-[40%] items-center justify-center overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 360 360" className="h-[78%] w-[78%]" preserveAspectRatio="xMidYMid meet">
                        {/* 灯泡光晕环 */}
                        {[0, 1, 2].map((i) => (
                            <circle
                                key={`ring-${i}`}
                                cx="180"
                                cy="150"
                                r={120 + i * 30}
                                fill="none"
                                stroke="var(--secondary-color,#f97316)"
                                strokeOpacity={0.14 - i * 0.03}
                                strokeWidth="2"
                            />
                        ))}
                        {/* 灯泡发散光线 */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                            const rad = (deg * Math.PI) / 180
                            const x1 = 180 + Math.cos(rad) * 100
                            const y1 = 150 + Math.sin(rad) * 100
                            const x2 = 180 + Math.cos(rad) * 124
                            const y2 = 150 + Math.sin(rad) * 124
                            return (
                                <line
                                    key={`ray-${deg}`}
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke="var(--secondary-color,#f97316)"
                                    strokeOpacity="0.45"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                            )
                        })}
                        {/* 灯泡玻璃球 */}
                        <circle cx="180" cy="150" r="72" fill="var(--card-color,#ffffff)" stroke="var(--secondary-color,#f97316)" strokeWidth="6" />
                        {/* 灯泡内成长曲线（创意/启发） */}
                        <path d="M150 178 C 160 150, 200 150, 210 122" fill="none" stroke="var(--primary-color,#2563eb)" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="210" cy="122" r="8" fill="var(--primary-color,#2563eb)" />
                        {/* 灯泡螺口 */}
                        <rect x="156" y="220" width="48" height="14" rx="6" fill="var(--primary-color,#2563eb)" />
                        <rect x="162" y="238" width="36" height="10" rx="5" fill="var(--primary-color,#2563eb)" opacity="0.7" />
                        {/* 书本母题 */}
                        <g transform="translate(96 268)">
                            <rect x="0" y="6" width="168" height="64" rx="10" fill="var(--primary-color,#2563eb)" />
                            <rect x="10" y="0" width="72" height="60" rx="8" fill="var(--card-color,#ffffff)" stroke="var(--primary-color,#2563eb)" strokeWidth="4" />
                            <rect x="86" y="0" width="72" height="60" rx="8" fill="var(--card-color,#ffffff)" stroke="var(--primary-color,#2563eb)" strokeWidth="4" />
                            <line x1="84" y1="6" x2="84" y2="56" stroke="var(--secondary-color,#f97316)" strokeWidth="4" strokeLinecap="round" />
                            <line x1="22" y1="18" x2="70" y2="18" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.7" strokeWidth="4" strokeLinecap="round" />
                            <line x1="22" y1="32" x2="62" y2="32" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
                            <line x1="98" y1="18" x2="146" y2="18" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.7" strokeWidth="4" strokeLinecap="round" />
                            <line x1="98" y1="32" x2="138" y2="32" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
                        </g>
                    </svg>
                </div>

                {/* 右上角机构标识（可选，由生成系统注入） */}
                {((slideData as any)?.__companyName__ || (slideData as any)?._logo_url__) && (
                    <div className="absolute top-0 right-0 z-10 px-8 pt-5" style={{ width: '40%' }}>
                        <div className="flex items-center justify-end gap-2">
                            {(slideData as any)?._logo_url__ && <img src={(slideData as any)?._logo_url__} alt="logo" className="w-6 h-6" />}
                            {(slideData as any)?.__companyName__ && (
                                <span className="text-sm font-semibold break-words" style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    {(slideData as any)?.__companyName__}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* 左侧主内容 */}
                <div className="relative z-10 flex h-full w-[62%] flex-col justify-center pl-16 pr-8">
                    {/* eyebrow 标签：圆角药丸 + 圆点 */}
                    <span
                        className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold leading-relaxed break-words"
                        style={{
                            color: "var(--secondary-color,#f97316)",
                            background: "rgba(249,115,22,0.12)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <span
                            className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />
                        {eyebrow}
                    </span>

                    <h1
                        className="text-6xl font-black leading-[1.25] break-words"
                        style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title}
                    </h1>

                    {/* 双色成长下划线 */}
                    <div className="mt-7 flex items-center gap-2">
                        <div className="h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <div className="h-1.5 w-8 rounded-full" style={{ background: "var(--primary-color,#2563eb)" }} />
                        <div className="h-1.5 w-3 rounded-full" style={{ background: "var(--primary-color,#2563eb)", opacity: 0.5 }} />
                    </div>

                    <p
                        className="mt-7 max-w-[32rem] text-xl leading-loose break-words"
                        style={{ color: "var(--background-text,#1f2937)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {subtitle}
                    </p>

                    {/* 主讲人信息卡片：圆角友好 */}
                    <div
                        className="mt-12 flex w-fit items-center gap-4 rounded-2xl border px-5 py-4"
                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#f1e9d8)" }}
                    >
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-base font-bold break-words"
                            style={{ background: "var(--primary-color,#2563eb)", color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {initials}
                        </div>
                        <div className="flex flex-col leading-relaxed">
                            <span className="text-base font-bold break-words" style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                {presenterName}
                                <span className="ml-2 font-normal" style={{ color: "var(--background-text,#1f2937)", opacity: 0.6 }}>
                                    {organization}
                                </span>
                            </span>
                            <span className="text-sm leading-relaxed break-words" style={{ color: "var(--background-text,#1f2937)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                {presentationDate}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cover
