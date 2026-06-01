import React from 'react'
import * as z from "zod";

export const layoutId = 'medical-cn-cover'
export const layoutName = '封面'
export const layoutDescription = '医疗健康风封面：清爽蓝绿配色 + 圆角卡片、脉搏波形与十字母题装饰，承载主标题、副标题、汇报人、日期与机构。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    eyebrow: z.string().min(2).max(18).default('健康管理 · 2026').meta({
        description: "标题上方的小标签/分类，如『年度健康报告』『诊疗方案』",
    }),
    title: z.string().min(2).max(20).default('守护全生命周期健康').meta({
        description: "封面主标题（中文，简短有力）",
    }),
    subtitle: z.string().min(4).max(44).default('以循证医学为基石，为每位患者提供精准照护').meta({
        description: "副标题，一句话补充说明",
    }),
    presenterName: z.string().min(2).max(16).default('李慧敏').meta({
        description: "汇报人姓名",
    }),
    presentationDate: z.string().min(2).max(22).default('2026年5月').meta({
        description: "汇报日期",
    }),
    organization: z.string().min(2).max(26).default('仁和医疗健康中心').meta({
        description: "机构或科室名称",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Cover: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const { eyebrow, title, subtitle, presenterName, presentationDate, organization } = slideData || {}
    const initials = (presenterName || '李慧敏').trim().slice(0, 1)

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
                {/* 背景装饰层：柔和光晕 + 脉搏波形 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="medCoverGlowA" cx="85%" cy="12%" r="55%">
                                <stop offset="0%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="medCoverGlowB" cx="8%" cy="92%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0.14" />
                                <stop offset="100%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#medCoverGlowA)" />
                        <rect width="1280" height="720" fill="url(#medCoverGlowB)" />
                        {/* 脉搏波形（贯穿底部，蓝绿点缀） */}
                        <polyline
                            points="-20,560 180,560 240,560 280,520 320,610 360,470 405,560 560,560 620,560 660,530 700,600 740,560 1000,560 1060,560 1100,524 1140,600 1180,560 1320,560"
                            fill="none"
                            stroke="var(--primary-color,#0ea5e9)"
                            strokeOpacity="0.18"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* 右侧蓝绿圆角装饰卡片面板 */}
                <div className="absolute top-0 right-0 z-0 flex h-full w-[40%] items-center justify-center overflow-hidden">
                    <div
                        className="relative flex h-[78%] w-[72%] flex-col items-center justify-center rounded-[2.5rem]"
                        style={{
                            background: "linear-gradient(150deg, var(--primary-color,#0ea5e9) 0%, var(--secondary-color,#10b981) 100%)",
                            boxShadow: "0 24px 60px -20px rgba(14,165,233,0.45)",
                        }}
                    >
                        {/* 卡片内同心圆纹样 */}
                        <svg viewBox="0 0 360 460" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                            {[0, 1, 2, 3].map((i) => (
                                <circle key={i} cx="300" cy="80" r={50 + i * 48} fill="none" stroke="#ffffff" strokeOpacity={0.12} strokeWidth="1.5" />
                            ))}
                        </svg>
                        {/* 居中医疗十字母题 */}
                        <div
                            className="relative flex h-28 w-28 items-center justify-center rounded-3xl"
                            style={{ background: "rgba(255,255,255,0.18)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)" }}
                        >
                            <svg viewBox="0 0 24 24" className="h-14 w-14" aria-hidden="true">
                                <path
                                    d="M9.5 3.5h5a1 1 0 0 1 1 1v4h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-4v4a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-4h-4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h4v-4a1 1 0 0 1 1-1Z"
                                    fill="#ffffff"
                                    fillOpacity="0.95"
                                />
                            </svg>
                        </div>
                        {/* 脉搏跳动小波形 */}
                        <svg viewBox="0 0 200 40" className="relative mt-8 h-10 w-44" aria-hidden="true">
                            <polyline
                                points="0,20 50,20 64,20 76,6 88,34 100,12 112,20 150,20 164,20 176,12 188,28 200,20"
                                fill="none"
                                stroke="#ffffff"
                                strokeOpacity="0.9"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* 右上角机构标识（可选，由生成系统注入） */}
                {((slideData as any)?.__companyName__ || (slideData as any)?._logo_url__) && (
                    <div className="absolute top-0 left-0 z-10 px-16 pt-7" style={{ width: '60%' }}>
                        <div className="flex items-center gap-2">
                            {(slideData as any)?._logo_url__ && <img src={(slideData as any)?._logo_url__} alt="logo" className="w-6 h-6" />}
                            {(slideData as any)?.__companyName__ && (
                                <span className="text-sm font-semibold break-words" style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    {(slideData as any)?.__companyName__}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* 左侧主内容 */}
                <div className="relative z-10 flex h-full w-[62%] flex-col justify-center pl-16 pr-8">
                    <span
                        className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium tracking-wide break-words"
                        style={{
                            color: "var(--secondary-color,#10b981)",
                            background: "rgba(16,185,129,0.10)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <span
                            className="inline-block h-2 w-2 rounded-full"
                            style={{ background: "var(--secondary-color,#10b981)" }}
                        />
                        {eyebrow || '健康管理 · 2026'}
                    </span>

                    <h1
                        className="text-6xl font-black leading-[1.25] break-words"
                        style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title || '守护全生命周期健康'}
                    </h1>

                    <div
                        className="my-7 h-1.5 w-24 rounded-full"
                        style={{ background: "linear-gradient(90deg, var(--primary-color,#0ea5e9) 0%, var(--secondary-color,#10b981) 100%)" }}
                    />

                    <p
                        className="max-w-[34rem] text-xl leading-relaxed break-words"
                        style={{ color: "var(--background-text,#475569)", opacity: 0.92, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {subtitle || '以循证医学为基石，为每位患者提供精准照护'}
                    </p>

                    {/* 汇报人信息卡片 */}
                    <div
                        className="mt-12 flex w-fit items-center gap-4 rounded-2xl border px-5 py-4"
                        style={{
                            background: "var(--card-color,#ffffff)",
                            borderColor: "var(--stroke,#e2e8f0)",
                            boxShadow: "0 12px 30px -16px rgba(15,23,42,0.18)",
                        }}
                    >
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold"
                            style={{
                                background: "linear-gradient(150deg, var(--primary-color,#0ea5e9) 0%, var(--secondary-color,#10b981) 100%)",
                                color: "var(--primary-text,#ffffff)",
                            }}
                        >
                            {initials}
                        </div>
                        <div className="flex flex-col leading-relaxed">
                            <span className="text-base font-bold break-words" style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                {presenterName || '李慧敏'}
                                <span className="ml-2 font-normal break-words" style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    {organization || '仁和医疗健康中心'}
                                </span>
                            </span>
                            <span className="text-sm break-words" style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
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
