import React from 'react'
import * as z from "zod";

export const layoutId = 'manufacturing-cn-cover'
export const layoutName = '封面'
export const layoutDescription = '智能制造风封面：工业深灰底 + 蓝橙强调 + 精密网格与齿轮产线装饰，含主标题、副标题、汇报人、日期与机构。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    eyebrow: z.string().min(2).max(18).default('智能制造 · 2026').meta({
        description: "标题上方的小标签/分类，如『智能制造』『年度报告』",
    }),
    title: z.string().min(2).max(20).default('数字工厂全面跃迁').meta({
        description: "封面主标题（中文，简短有力）",
    }),
    subtitle: z.string().min(4).max(44).default('以精密自动化与数据驱动重塑高端制造产线').meta({
        description: "副标题，一句话补充说明",
    }),
    presenterName: z.string().min(2).max(16).default('李建国').meta({
        description: "汇报人姓名",
    }),
    presentationDate: z.string().min(2).max(22).default('2026年5月').meta({
        description: "汇报日期",
    }),
    organization: z.string().min(2).max(26).default('恒锐智能装备制造').meta({
        description: "公司或部门名称",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Cover: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const { eyebrow, title, subtitle, presenterName, presentationDate, organization } = slideData || {}
    const initials = (presenterName || '李建国').trim().slice(0, 1)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#1f2937)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：精密网格 + 金属质感线条 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="mfgGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.45" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="mfgVignette" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
                        </linearGradient>
                        <linearGradient id="mfgSteelLine" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* 精密网格 */}
                    <rect width="1280" height="720" fill="url(#mfgGrid)" />
                    <rect width="1280" height="720" fill="url(#mfgVignette)" />
                    {/* 硬朗金属质感横线（产线导轨意象） */}
                    <rect x="0" y="206" width="1280" height="2" fill="url(#mfgSteelLine)" />
                    <rect x="0" y="540" width="1280" height="2" fill="url(#mfgSteelLine)" />
                </svg>

                {/* 右上角强调光晕 */}
                <div
                    className="absolute -top-24 -right-24 h-[22rem] w-[22rem] rounded-full"
                    style={{ background: "var(--primary-color,#3b82f6)", opacity: 0.18, filter: 'blur(80px)' }}
                    aria-hidden="true"
                />

                {/* 右侧齿轮 + 产线装饰面板 */}
                <div className="absolute top-0 right-0 h-full w-[40%] overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 512 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="mfgGearGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.22" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="512" height="720" fill="url(#mfgGearGlow)" />

                        {/* 主齿轮（蓝色描边，精密同心环） */}
                        <g transform="translate(360 240)" fill="none" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.7" strokeWidth="3">
                            {Array.from({ length: 16 }).map((_, i) => {
                                const a = (i / 16) * Math.PI * 2
                                const x1 = Math.cos(a) * 118
                                const y1 = Math.sin(a) * 118
                                const x2 = Math.cos(a) * 140
                                const y2 = Math.sin(a) * 140
                                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="9" strokeOpacity="0.6" />
                            })}
                            <circle r="118" />
                            <circle r="84" strokeOpacity="0.4" />
                            <circle r="34" strokeOpacity="0.55" />
                        </g>

                        {/* 副齿轮（橙色，咬合定位） */}
                        <g transform="translate(180 470)" fill="none" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.75" strokeWidth="2.5">
                            {Array.from({ length: 12 }).map((_, i) => {
                                const a = (i / 12) * Math.PI * 2
                                const x1 = Math.cos(a) * 66
                                const y1 = Math.sin(a) * 66
                                const x2 = Math.cos(a) * 82
                                const y2 = Math.sin(a) * 82
                                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="7" strokeOpacity="0.65" />
                            })}
                            <circle r="66" />
                            <circle r="22" strokeOpacity="0.5" />
                        </g>

                        {/* 产线节点（精密对位点） */}
                        {[120, 220, 320, 420].map((cx, i) => (
                            <g key={i}>
                                <circle cx={cx} cy="640" r="6" fill="var(--secondary-color,#f97316)" fillOpacity="0.85" />
                                {i < 3 && <line x1={cx + 8} y1="640" x2={cx + 92} y2="640" stroke="var(--stroke,#374151)" strokeOpacity="0.9" strokeWidth="2" />}
                            </g>
                        ))}
                    </svg>
                </div>

                {/* 左侧主内容 */}
                <div className="relative z-10 flex h-full w-[62%] flex-col justify-center pl-16 pr-8">
                    <span
                        className="mb-7 inline-flex w-fit items-center gap-2 rounded-sm border px-4 py-1.5 text-sm font-semibold tracking-wide break-words"
                        style={{
                            color: "var(--secondary-color,#f97316)",
                            borderColor: "var(--secondary-color,#f97316)",
                            background: "rgba(249,115,22,0.10)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <span
                            className="inline-block h-2 w-2 rounded-[2px]"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                            aria-hidden="true"
                        />
                        {eyebrow || '智能制造 · 2026'}
                    </span>

                    <h1
                        className="text-6xl font-black leading-[1.25] break-words"
                        style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title || '数字工厂全面跃迁'}
                    </h1>

                    {/* 硬朗双色强调条 */}
                    <div className="my-7 flex items-center gap-2" aria-hidden="true">
                        <div className="h-1.5 w-20 rounded-sm" style={{ background: "var(--primary-color,#3b82f6)" }} />
                        <div className="h-1.5 w-8 rounded-sm" style={{ background: "var(--secondary-color,#f97316)" }} />
                    </div>

                    <p
                        className="max-w-[36rem] text-xl leading-relaxed break-words"
                        style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {subtitle || '以精密自动化与数据驱动重塑高端制造产线'}
                    </p>

                    {/* 汇报人信息卡 */}
                    <div
                        className="mt-12 flex w-fit items-center gap-4 rounded-md border px-5 py-4"
                        style={{ background: "var(--card-color,#111827)", borderColor: "var(--stroke,#374151)" }}
                    >
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm text-lg font-black"
                            style={{ background: "var(--primary-color,#3b82f6)", color: "var(--primary-text,#ffffff)" }}
                        >
                            {initials}
                        </div>
                        <div className="flex flex-col leading-relaxed">
                            <span className="flex flex-wrap items-baseline gap-x-2 text-base font-bold break-words" style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                {presenterName || '李建国'}
                                <span className="font-normal" style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.6 }}>
                                    {organization || '恒锐智能装备制造'}
                                </span>
                            </span>
                            <span className="text-sm break-words" style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
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
