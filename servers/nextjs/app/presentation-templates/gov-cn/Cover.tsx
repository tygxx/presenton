import React from 'react'
import * as z from "zod";

export const layoutId = 'gov-cn-cover'
export const layoutName = '封面'
export const layoutDescription = '党政政务风封面：米白底 + 中国红 + 烫金细线，居中对称构图，华表纹样与五角星点缀，主标题、副标题、汇报人、日期与机构。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    eyebrow: z.string().min(2).max(18).default('专题工作汇报').meta({
        description: "主标题上方的小标签/分类，如『专题工作汇报』『年度工作总结』",
    }),
    title: z.string().min(2).max(20).default('凝心聚力谋发展').meta({
        description: "封面主标题（中文，庄重简短）",
    }),
    subtitle: z.string().min(4).max(44).default('全面贯彻新发展理念　扎实推进高质量发展').meta({
        description: "副标题，一句话补充说明",
    }),
    presenterName: z.string().min(2).max(16).default('李建国').meta({
        description: "汇报人姓名",
    }),
    presentationDate: z.string().min(2).max(22).default('二〇二六年五月').meta({
        description: "汇报日期",
    }),
    organization: z.string().min(2).max(26).default('中共某某市委员会办公室').meta({
        description: "机构或部门名称",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Cover: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const { eyebrow, title, subtitle, presenterName, presentationDate, organization } = slideData || {}

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
                {/* 背景装饰层：米白底纹 + 烫金光晕 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="govGoldGlow" cx="50%" cy="22%" r="60%">
                                <stop offset="0%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="govRedTop" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#c1121f)" stopOpacity="1" />
                                <stop offset="100%" stopColor="var(--primary-color,#c1121f)" stopOpacity="0.78" />
                            </linearGradient>
                        </defs>
                        {/* 顶部中国红色带 */}
                        <rect x="0" y="0" width="1280" height="14" fill="url(#govRedTop)" />
                        {/* 烫金光晕 */}
                        <rect x="0" y="0" width="1280" height="720" fill="url(#govGoldGlow)" />
                        {/* 左右对称同心圆纹样（华表纹样意象） */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={`l${i}`} cx="-30" cy="600" r={120 + i * 70} fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity={0.08} strokeWidth="1.2" />
                        ))}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={`r${i}`} cx="1310" cy="600" r={120 + i * 70} fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity={0.08} strokeWidth="1.2" />
                        ))}
                    </svg>
                </div>

                {/* 四角烫金细线角标（对称） */}
                <div className="absolute left-6 top-7 h-10 w-10 border-l-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.6 }} aria-hidden="true" />
                <div className="absolute right-6 top-7 h-10 w-10 border-r-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.6 }} aria-hidden="true" />
                <div className="absolute bottom-7 left-6 h-10 w-10 border-b-2 border-l-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.6 }} aria-hidden="true" />
                <div className="absolute bottom-7 right-6 h-10 w-10 border-b-2 border-r-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.6 }} aria-hidden="true" />

                {/* 主内容：居中对称 */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-20 py-16 text-center">
                    {/* 顶部五角星点缀 */}
                    <div className="mb-7 flex items-center justify-center gap-3" aria-hidden="true">
                        <span className="h-px w-16" style={{ background: "var(--secondary-color,#b8860b)", opacity: 0.55 }} />
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="var(--primary-color,#c1121f)">
                            <path d="M12 2l2.9 6.26L21.8 9.2l-5 4.62L18.1 21 12 17.4 5.9 21l1.3-7.18-5-4.62 6.9-0.94L12 2z" />
                        </svg>
                        <span className="h-px w-16" style={{ background: "var(--secondary-color,#b8860b)", opacity: 0.55 }} />
                    </div>

                    {/* 小标签 */}
                    <span
                        className="mb-7 inline-flex w-fit items-center rounded-sm px-5 py-2 text-base font-semibold leading-relaxed break-words"
                        style={{
                            color: "var(--primary-text,#ffffff)",
                            background: "var(--primary-color,#c1121f)",
                            letterSpacing: '0.18em',
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {eyebrow || '专题工作汇报'}
                    </span>

                    {/* 主标题 */}
                    <h1
                        className="max-w-[60rem] text-7xl font-black leading-[1.25] break-words"
                        style={{
                            color: "var(--background-text,#1a1a1a)",
                            letterSpacing: '0.06em',
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title || '凝心聚力谋发展'}
                    </h1>

                    {/* 烫金对称分隔线 + 中心星 */}
                    <div className="my-8 flex items-center justify-center gap-4" aria-hidden="true">
                        <span className="h-0.5 w-24 rounded-full" style={{ background: "linear-gradient(90deg, transparent, var(--secondary-color,#b8860b))" }} />
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="var(--secondary-color,#b8860b)">
                            <path d="M12 2l2.9 6.26L21.8 9.2l-5 4.62L18.1 21 12 17.4 5.9 21l1.3-7.18-5-4.62 6.9-0.94L12 2z" />
                        </svg>
                        <span className="h-0.5 w-24 rounded-full" style={{ background: "linear-gradient(90deg, var(--secondary-color,#b8860b), transparent)" }} />
                    </div>

                    {/* 副标题 */}
                    <p
                        className="max-w-[44rem] text-2xl leading-relaxed break-words"
                        style={{
                            color: "var(--background-text,#1a1a1a)",
                            opacity: 0.85,
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {subtitle || '全面贯彻新发展理念　扎实推进高质量发展'}
                    </p>

                    {/* 底部署名区：机构 / 汇报人 / 日期，对称排布 */}
                    <div
                        className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-sm border px-10 py-5 leading-relaxed"
                        style={{
                            background: "var(--card-color,#ffffff)",
                            borderColor: "var(--stroke,#e8dcc8)",
                        }}
                    >
                        <span className="text-lg font-bold break-words" style={{ color: "var(--primary-color,#c1121f)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                            {organization || '中共某某市委员会办公室'}
                        </span>
                        <span className="h-5 w-px" style={{ background: "var(--stroke,#e8dcc8)" }} aria-hidden="true" />
                        <span className="text-base break-words" style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                            汇报人：{presenterName || '李建国'}
                        </span>
                        <span className="h-5 w-px" style={{ background: "var(--stroke,#e8dcc8)" }} aria-hidden="true" />
                        <span className="text-base break-words" style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.8, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                            {presentationDate || '二〇二六年五月'}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cover
