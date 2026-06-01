import React from 'react'
import * as z from "zod";

export const layoutId = 'business-cn-cover'
export const layoutName = '封面'
export const layoutDescription = '商务风封面：深蓝几何装饰面板 + 大标题、副标题、汇报人与日期。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    eyebrow: z.string().min(2).max(18).default('企业介绍 · 2026').meta({
        description: "标题上方的小标签/分类，如『年度汇报』『公司介绍』",
    }),
    title: z.string().min(2).max(20).default('以专业驱动增长').meta({
        description: "封面主标题（中文，简短有力）",
    }),
    subtitle: z.string().min(4).max(44).default('为客户创造可衡量的长期商业价值').meta({
        description: "副标题，一句话补充说明",
    }),
    presenterName: z.string().min(2).max(16).default('张明').meta({
        description: "汇报人姓名",
    }),
    presentationDate: z.string().min(2).max(22).default('2026年5月').meta({
        description: "汇报日期",
    }),
    organization: z.string().min(2).max(26).default('启元商务咨询').meta({
        description: "公司或部门名称",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Cover: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const { eyebrow, title, subtitle, presenterName, presentationDate, organization } = slideData || {}
    const initials = (presenterName || '张明').trim().slice(0, 2)

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
                {/* 右侧深色几何装饰面板 */}
                <div
                    className="absolute top-0 right-0 h-full w-[42%] overflow-hidden"
                    style={{ background: "var(--primary-color,#1e3a8a)" }}
                >
                    <svg viewBox="0 0 400 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                        <defs>
                            <linearGradient id="bizCoverGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <rect width="400" height="720" fill="url(#bizCoverGlow)" />
                        {[0, 1, 2, 3, 4].map((i) => (
                            <circle key={i} cx="330" cy="150" r={70 + i * 55} fill="none" stroke="#ffffff" strokeOpacity={0.10} strokeWidth="1.5" />
                        ))}
                        <line x1="-40" y1="560" x2="360" y2="240" stroke="#ffffff" strokeOpacity="0.10" strokeWidth="1.5" />
                        <line x1="-40" y1="640" x2="440" y2="240" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1.5" />
                    </svg>
                    {/* 橙色强调点 */}
                    <div
                        className="absolute"
                        style={{
                            top: '64%', right: '22%', width: '14px', height: '14px', borderRadius: '9999px',
                            background: "var(--secondary-color,#f97316)",
                            boxShadow: '0 0 0 6px rgba(249,115,22,0.18)',
                        }}
                    />
                </div>

                {/* 右上角公司标识（可选，由生成系统注入） */}
                {((slideData as any)?.__companyName__ || (slideData as any)?._logo_url__) && (
                    <div className="absolute top-0 right-0 z-10 px-8 pt-5" style={{ width: '42%' }}>
                        <div className="flex items-center justify-end gap-2">
                            {(slideData as any)?._logo_url__ && <img src={(slideData as any)?._logo_url__} alt="logo" className="w-6 h-6" />}
                            {(slideData as any)?.__companyName__ && (
                                <span className="text-sm font-semibold" style={{ color: "var(--primary-text,#ffffff)" }}>
                                    {(slideData as any)?.__companyName__}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* 左侧主内容 */}
                <div className="relative z-10 flex h-full w-[60%] flex-col justify-center pl-16 pr-8">
                    <span
                        className="mb-6 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium tracking-wide break-words"
                        style={{
                            color: "var(--secondary-color,#f97316)",
                            background: "rgba(249,115,22,0.10)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {eyebrow || '企业介绍 · 2026'}
                    </span>

                    <h1
                        className="text-6xl font-black leading-[1.2] break-words"
                        style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title || '以专业驱动增长'}
                    </h1>

                    <div
                        className="my-7 h-1.5 w-24 rounded-full"
                        style={{ background: "var(--secondary-color,#f97316)" }}
                    />

                    <p
                        className="max-w-[34rem] text-xl leading-relaxed break-words"
                        style={{ color: "var(--background-text,#475569)", opacity: 0.9, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {subtitle || '为客户创造可衡量的长期商业价值'}
                    </p>

                    {/* 汇报人信息 */}
                    <div className="mt-12 flex items-center gap-4">
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-base font-bold"
                            style={{ background: "var(--primary-color,#1e3a8a)", color: "var(--primary-text,#ffffff)" }}
                        >
                            {initials}
                        </div>
                        <div className="flex flex-col leading-relaxed">
                            <span className="text-base font-bold break-words" style={{ color: "var(--background-text,#0f172a)" }}>
                                {presenterName || '张明'}
                                <span className="ml-2 font-normal" style={{ color: "var(--background-text,#64748b)" }}>
                                    {organization || '启元商务咨询'}
                                </span>
                            </span>
                            <span className="text-sm break-words" style={{ color: "var(--background-text,#64748b)" }}>
                                {presentationDate || '2026年5月'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cover
