import React from 'react'
import * as z from "zod";

export const layoutId = 'green-cn-cover'
export const layoutName = '封面'
export const layoutDescription = '新能源环保风封面：清新白绿渐变 + 叶片、地球与自然有机曲线装饰，承载主标题、副标题、汇报人、日期与机构。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    eyebrow: z.string().min(2).max(18).default('绿色低碳 · 2026').meta({
        description: "标题上方的小标签/分类，如『可持续发展』『碳中和』",
    }),
    title: z.string().min(2).max(20).default('共绘绿色未来').meta({
        description: "封面主标题（中文，简短有力）",
    }),
    subtitle: z.string().min(4).max(44).default('以清洁能源与生态保护驱动可持续发展').meta({
        description: "副标题，一句话补充说明",
    }),
    presenterName: z.string().min(2).max(16).default('林清').meta({
        description: "汇报人姓名",
    }),
    presentationDate: z.string().min(2).max(22).default('2026年6月').meta({
        description: "汇报日期",
    }),
    organization: z.string().min(2).max(26).default('青澜新能源研究院').meta({
        description: "公司或机构名称",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Cover: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const { eyebrow, title, subtitle, presenterName, presentationDate, organization } = slideData || {}
    const initials = (presenterName || '林清').trim().slice(0, 2)

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
                {/* 背景：清新白绿 + 天空蓝渐变与自然有机曲线 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="greenCoverSky" x1="0" y1="0" x2="0.5" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--background-color,#f0fdf4)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="greenCoverHill" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.85" />
                            <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.95" />
                        </linearGradient>
                        <linearGradient id="greenCoverHillBack" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.30" />
                            <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.40" />
                        </linearGradient>
                        <radialGradient id="greenCoverSun" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* 天空蓝光晕 */}
                    <rect width="1280" height="720" fill="url(#greenCoverSky)" />
                    {/* 右上柔和阳光光晕 */}
                    <circle cx="1080" cy="150" r="320" fill="url(#greenCoverSun)" />

                    {/* 后层有机山丘曲线 */}
                    <path
                        d="M0,560 C220,470 420,540 660,500 C900,460 1080,520 1280,470 L1280,720 L0,720 Z"
                        fill="url(#greenCoverHillBack)"
                    />
                    {/* 前层有机山丘曲线 */}
                    <path
                        d="M0,640 C260,560 480,640 760,600 C1000,566 1130,628 1280,588 L1280,720 L0,720 Z"
                        fill="url(#greenCoverHill)"
                    />

                    {/* 能源同心环（自然/循环母题） */}
                    {[0, 1, 2, 3].map((i) => (
                        <circle key={i} cx="1080" cy="150" r={56 + i * 46} fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity={0.10} strokeWidth="1.4" />
                    ))}
                </svg>

                {/* 右上角地球 + 叶片装饰母题 */}
                <div className="absolute" style={{ top: '52px', right: '64px' }} aria-hidden="true">
                    <svg width="148" height="148" viewBox="0 0 148 148">
                        <defs>
                            <linearGradient id="greenCoverEarth" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" />
                                <stop offset="100%" stopColor="var(--primary-color,#16a34a)" />
                            </linearGradient>
                        </defs>
                        {/* 地球 */}
                        <circle cx="74" cy="74" r="46" fill="url(#greenCoverEarth)" opacity="0.95" />
                        <ellipse cx="74" cy="74" rx="46" ry="17" fill="none" stroke="#ffffff" strokeOpacity="0.40" strokeWidth="1.4" />
                        <path d="M74,28 C58,52 58,96 74,120" fill="none" stroke="#ffffff" strokeOpacity="0.40" strokeWidth="1.4" />
                        <path d="M74,28 C90,52 90,96 74,120" fill="none" stroke="#ffffff" strokeOpacity="0.30" strokeWidth="1.4" />
                        {/* 大陆斑块 */}
                        <path d="M52,60 q12,-8 22,2 q-6,12 -18,10 q-8,-6 -4,-12 Z" fill="#ffffff" fillOpacity="0.22" />
                        <path d="M86,82 q10,2 8,12 q-10,4 -14,-4 q1,-7 6,-8 Z" fill="#ffffff" fillOpacity="0.18" />
                        {/* 环绕叶片 */}
                        <path d="M118,40 q18,-6 22,-22 q-22,0 -28,16 q-2,8 6,6 Z" fill="var(--primary-color,#16a34a)" opacity="0.85" />
                        <path d="M122,46 q-6,-4 -12,-2" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.2" />
                    </svg>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full w-full flex-col justify-center px-20">
                    {/* eyebrow 标签：带叶片图标 */}
                    <span
                        className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                        style={{
                            color: "var(--primary-color,#16a34a)",
                            background: "var(--card-color,#ffffff)",
                            border: "1px solid var(--stroke,#d1fae5)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
                            <path d="M5,19 C5,9 13,4 21,4 C21,14 14,20 5,19 Z" fill="var(--primary-color,#16a34a)" />
                            <path d="M5,19 C9,14 14,10 19,8" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.4" />
                        </svg>
                        {eyebrow || '绿色低碳 · 2026'}
                    </span>

                    <h1
                        className="max-w-[36rem] text-7xl font-black leading-[1.2] break-words"
                        style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title || '共绘绿色未来'}
                    </h1>

                    {/* 自然曲线分隔（叶脉/能流） */}
                    <svg width="180" height="22" viewBox="0 0 180 22" className="my-7" aria-hidden="true">
                        <path d="M0,16 C40,4 70,4 96,11" fill="none" stroke="var(--primary-color,#16a34a)" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="108" cy="11" r="5" fill="var(--secondary-color,#0891b2)" />
                    </svg>

                    <p
                        className="max-w-[34rem] text-xl leading-relaxed break-words"
                        style={{ color: "var(--background-text,#14532d)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {subtitle || '以清洁能源与生态保护驱动可持续发展'}
                    </p>

                    {/* 汇报人信息卡 */}
                    <div className="mt-12 flex items-center gap-4">
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-base font-bold"
                            style={{
                                background: "var(--primary-color,#16a34a)",
                                color: "var(--primary-text,#ffffff)",
                            }}
                        >
                            {initials}
                        </div>
                        <div className="flex flex-col leading-relaxed">
                            <span className="text-base font-bold break-words" style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                {presenterName || '林清'}
                                <span className="ml-2 font-normal" style={{ color: "var(--secondary-color,#0891b2)" }}>
                                    {organization || '青澜新能源研究院'}
                                </span>
                            </span>
                            <span className="text-sm break-words" style={{ color: "var(--background-text,#14532d)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                {presentationDate || '2026年6月'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cover
