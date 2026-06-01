import React from 'react'
import * as z from "zod";

export const layoutId = 'finance-cn-cover'
export const layoutName = '封面'
export const layoutDescription = '金融投资风封面：深藏青底 + 香槟金细线、数据网格与增长曲线装饰，衬线大标题搭配汇报人、日期与机构。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    eyebrow: z.string().min(2).max(18).default('年度投资策略 · 2026').meta({
        description: "标题上方的小标签/分类，如『年度策略』『投资展望』",
    }),
    title: z.string().min(2).max(20).default('稳健配置 价值致远').meta({
        description: "封面主标题（中文，简短有力）",
    }),
    subtitle: z.string().min(4).max(44).default('穿越周期，以严谨研究构建可持续的长期回报').meta({
        description: "副标题，一句话补充说明",
    }),
    presenterName: z.string().min(2).max(16).default('陈衍之').meta({
        description: "汇报人姓名",
    }),
    presentationDate: z.string().min(2).max(22).default('2026年第二季度').meta({
        description: "汇报日期",
    }),
    organization: z.string().min(2).max(26).default('鼎诚资本 · 投资研究部').meta({
        description: "公司或部门名称",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Cover: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const { eyebrow, title, subtitle, presenterName, presentationDate, organization } = slideData || {}
    const initials = (presenterName || '陈衍之').trim().slice(0, 2)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;700;900&family=Noto+Sans+SC:wght@400;500;700&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：数据网格 + 增长曲线 + 棱形 + 细金线 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="finCoverVignette" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.55" />
                                <stop offset="55%" stopColor="#0f172a" stopOpacity="0" />
                                <stop offset="100%" stopColor="#0b1120" stopOpacity="0.65" />
                            </linearGradient>
                            <linearGradient id="finCoverGrowth" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.55" />
                                <stop offset="100%" stopColor="#d4af37" stopOpacity="0.95" />
                            </linearGradient>
                            <linearGradient id="finCoverArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                            </linearGradient>
                            <pattern id="finCoverGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                                <path d="M48 0 L0 0 0 48" fill="none" stroke="#60a5fa" strokeOpacity="0.07" strokeWidth="1" />
                            </pattern>
                        </defs>

                        {/* 数据网格母题 */}
                        <rect width="1280" height="720" fill="url(#finCoverGrid)" />
                        <rect width="1280" height="720" fill="url(#finCoverVignette)" />

                        {/* 右下增长曲线母题：面积 + 折线 + 数据点 */}
                        <path
                            d="M620 600 L740 540 L860 560 L980 470 L1100 430 L1220 330 L1280 300 L1280 720 L620 720 Z"
                            fill="url(#finCoverArea)"
                        />
                        <path
                            d="M620 600 L740 540 L860 560 L980 470 L1100 430 L1220 330 L1280 300"
                            fill="none"
                            stroke="url(#finCoverGrowth)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {[
                            { x: 740, y: 540 },
                            { x: 860, y: 560 },
                            { x: 980, y: 470 },
                            { x: 1100, y: 430 },
                            { x: 1220, y: 330 },
                        ].map((p, i) => (
                            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#0f172a" stroke="#d4af37" strokeWidth="2" />
                        ))}

                        {/* 右上棱形阵列母题 */}
                        {[0, 1, 2, 3].map((i) => (
                            <rect
                                key={`d${i}`}
                                x={1040 + i * 26}
                                y={90 + i * 4}
                                width="16"
                                height="16"
                                fill="none"
                                stroke="#d4af37"
                                strokeOpacity={0.5 - i * 0.08}
                                strokeWidth="1.5"
                                transform={`rotate(45 ${1048 + i * 26} ${98 + i * 4})`}
                            />
                        ))}

                        {/* 顶部与底部细金线 */}
                        <line x1="80" y1="60" x2="1200" y2="60" stroke="#d4af37" strokeOpacity="0.22" strokeWidth="1" />
                        <line x1="80" y1="660" x2="1200" y2="660" stroke="#d4af37" strokeOpacity="0.14" strokeWidth="1" />
                    </svg>

                    {/* 左上柔光晕染 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-12%', left: '-8%', width: '46%', height: '60%', borderRadius: '9999px',
                            background: 'radial-gradient(circle, rgba(212,175,55,0.16) 0%, rgba(212,175,55,0) 70%)',
                        }}
                    />
                </div>

                {/* 右上角机构标识（可选，由生成系统注入） */}
                {((slideData as any)?.__companyName__ || (slideData as any)?._logo_url__) && (
                    <div className="absolute top-0 right-0 z-10 px-12 pt-6">
                        <div className="flex items-center justify-end gap-2">
                            {(slideData as any)?._logo_url__ && <img src={(slideData as any)?._logo_url__} alt="logo" className="w-6 h-6" />}
                            {(slideData as any)?.__companyName__ && (
                                <span className="text-sm font-semibold break-words" style={{ color: "var(--background-text,#e2e8f0)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    {(slideData as any)?.__companyName__}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full flex-col justify-center pl-16 pr-16">
                    {/* 顶部分类标签 */}
                    <div className="mb-7 flex items-center gap-3">
                        <span
                            className="inline-block h-px w-10"
                            style={{ background: "var(--primary-color,#d4af37)" }}
                        />
                        <span
                            className="text-sm font-medium uppercase break-words"
                            style={{
                                color: "var(--primary-color,#d4af37)",
                                letterSpacing: '0.18em',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {eyebrow || '年度投资策略 · 2026'}
                        </span>
                    </div>

                    {/* 衬线大标题 */}
                    <h1
                        className="max-w-[44rem] text-7xl font-black leading-[1.22] break-words"
                        style={{
                            color: "var(--background-text,#e2e8f0)",
                            fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title || '稳健配置 价值致远'}
                    </h1>

                    {/* 金色分隔线 */}
                    <div
                        className="my-8 h-[3px] w-28 rounded-full"
                        style={{ background: "linear-gradient(90deg, var(--primary-color,#d4af37), rgba(212,175,55,0))" }}
                    />

                    {/* 副标题 */}
                    <p
                        className="max-w-[40rem] text-xl leading-loose break-words"
                        style={{
                            color: "var(--background-text,#cbd5e1)",
                            opacity: 0.92,
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {subtitle || '穿越周期，以严谨研究构建可持续的长期回报'}
                    </p>

                    {/* 汇报人信息条 */}
                    <div className="mt-14 flex items-center gap-5">
                        <div
                            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold break-words"
                            style={{
                                background: "var(--card-color,#1e293b)",
                                color: "var(--primary-color,#d4af37)",
                                border: '1.5px solid var(--primary-color,#d4af37)',
                                fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {initials}
                        </div>

                        <div
                            className="flex flex-col gap-1 border-l pl-5 leading-relaxed"
                            style={{ borderColor: "var(--stroke,#334155)" }}
                        >
                            <span
                                className="text-base font-bold break-words"
                                style={{ color: "var(--background-text,#e2e8f0)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {presenterName || '陈衍之'}
                                <span
                                    className="ml-3 font-normal break-words"
                                    style={{ color: "var(--secondary-color,#60a5fa)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {organization || '鼎诚资本 · 投资研究部'}
                                </span>
                            </span>
                            <span
                                className="text-sm break-words"
                                style={{ color: "var(--background-text,#94a3b8)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {presentationDate || '2026年第二季度'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cover
