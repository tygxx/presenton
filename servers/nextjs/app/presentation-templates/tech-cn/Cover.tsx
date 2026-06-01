import React from 'react'
import * as z from "zod";

export const layoutId = 'tech-cn-cover'
export const layoutName = '封面'
export const layoutDescription = '科技互联网风封面：深色底 + 霓虹蓝紫渐变高光、几何网格与电路线装饰、半透明发光描边卡片。左对齐大标题、副标题、汇报人、日期与机构。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    eyebrow: z.string().min(2).max(18).default('技术峰会 · 2026').meta({
        description: "标题上方的小标签/分类，如『技术峰会』『产品发布』",
    }),
    title: z.string().min(2).max(20).default('智算重构未来').meta({
        description: "封面主标题（中文，简短有力，体现科技未来感）",
    }),
    subtitle: z.string().min(4).max(44).default('以大模型与云原生算力驱动产业智能化升级').meta({
        description: "副标题，一句话补充说明",
    }),
    presenterName: z.string().min(2).max(16).default('李哲').meta({
        description: "汇报人姓名",
    }),
    presentationDate: z.string().min(2).max(22).default('2026年5月').meta({
        description: "汇报日期",
    }),
    organization: z.string().min(2).max(26).default('星核智能技术研究院').meta({
        description: "公司或部门名称",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Cover: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const { eyebrow, title, subtitle, presenterName, presentationDate, organization } = slideData || {}
    const initials = (presenterName || '李哲').trim().slice(0, 2)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0a0e1a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：霓虹渐变光晕 + 几何网格 + 电路线 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    {/* 蓝紫双色光晕 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-18%', right: '-8%', width: '60%', height: '85%', borderRadius: '9999px',
                            background: "radial-gradient(closest-side, var(--secondary-color,#8b5cf6), transparent 70%)",
                            opacity: 0.35, filter: 'blur(8px)',
                        }}
                    />
                    <div
                        className="absolute"
                        style={{
                            bottom: '-26%', left: '-12%', width: '58%', height: '82%', borderRadius: '9999px',
                            background: "radial-gradient(closest-side, var(--primary-color,#3b82f6), transparent 70%)",
                            opacity: 0.30, filter: 'blur(8px)',
                        }}
                    />

                    {/* 几何网格 + 电路线 + 节点 */}
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="techCoverGrid" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.5" />
                            </linearGradient>
                            <pattern id="techCoverMesh" width="56" height="56" patternUnits="userSpaceOnUse">
                                <path d="M56 0H0V56" fill="none" stroke="url(#techCoverGrid)" strokeOpacity="0.18" strokeWidth="1" />
                            </pattern>
                            <linearGradient id="techCoverCircuit" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                                <stop offset="50%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* 网格底纹 */}
                        <rect width="1280" height="720" fill="url(#techCoverMesh)" />
                        {/* 右上同心圆环（霓虹） */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={i} cx="1090" cy="120" r={90 + i * 70} fill="none" stroke="url(#techCoverGrid)" strokeOpacity="0.25" strokeWidth="1.2" />
                        ))}
                        {/* 电路线 */}
                        <path d="M0 600 H320 L380 540 H640 L700 600 H980 L1040 540 H1280" fill="none" stroke="url(#techCoverCircuit)" strokeWidth="1.4" />
                        <path d="M0 650 H220 L300 570 H520" fill="none" stroke="url(#techCoverCircuit)" strokeWidth="1.2" />
                        {/* 电路节点 */}
                        {[[320, 600], [640, 540], [980, 600], [220, 650], [520, 570]].map(([cx, cy], i) => (
                            <circle key={`n-${i}`} cx={cx} cy={cy} r="3.5" fill="var(--secondary-color,#8b5cf6)" />
                        ))}
                    </svg>

                    {/* 右下霓虹强调点 */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '20%', right: '12%', width: '12px', height: '12px', borderRadius: '9999px',
                            background: "var(--secondary-color,#8b5cf6)",
                            boxShadow: '0 0 0 6px rgba(139,92,246,0.20), 0 0 22px 4px rgba(139,92,246,0.55)',
                        }}
                    />
                </div>

                {/* 右上角机构标识（可选，由生成系统注入） */}
                {((slideData as any)?.__companyName__ || (slideData as any)?._logo_url__) && (
                    <div className="absolute top-0 right-0 z-10 px-10 pt-6">
                        <div className="flex items-center justify-end gap-2">
                            {(slideData as any)?._logo_url__ && <img src={(slideData as any)?._logo_url__} alt="logo" className="w-6 h-6" />}
                            {(slideData as any)?.__companyName__ && (
                                <span className="text-sm font-semibold break-words" style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    {(slideData as any)?.__companyName__}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* 主内容：左对齐 */}
                <div className="relative z-10 flex h-full w-full flex-col justify-center pl-16 pr-12">
                    {/* eyebrow 霓虹胶囊标签 */}
                    <span
                        className="mb-7 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium tracking-wide break-words"
                        style={{
                            color: "var(--secondary-color,#8b5cf6)",
                            background: "rgba(139,92,246,0.12)",
                            border: "1px solid rgba(139,92,246,0.40)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <span
                            className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                            style={{ background: "var(--primary-color,#3b82f6)", boxShadow: '0 0 8px 1px rgba(59,130,246,0.8)' }}
                        />
                        {eyebrow || '技术峰会 · 2026'}
                    </span>

                    {/* 主标题（霓虹渐变文字） */}
                    <h1
                        className="text-6xl font-black leading-[1.25] break-words"
                        style={{
                            color: "var(--background-text,#e5e7eb)",
                            backgroundImage: "linear-gradient(100deg, var(--primary-text,#ffffff) 0%, var(--primary-color,#3b82f6) 60%, var(--secondary-color,#8b5cf6) 100%)",
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title || '智算重构未来'}
                    </h1>

                    {/* 霓虹分隔条 */}
                    <div
                        className="my-7 h-1.5 w-28 rounded-full"
                        style={{
                            background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                            boxShadow: '0 0 14px 1px rgba(59,130,246,0.55)',
                        }}
                    />

                    {/* 副标题 */}
                    <p
                        className="max-w-[36rem] text-xl leading-relaxed break-words"
                        style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {subtitle || '以大模型与云原生算力驱动产业智能化升级'}
                    </p>

                    {/* 汇报人信息：半透明发光描边卡片 */}
                    <div
                        className="mt-12 inline-flex w-fit items-center gap-4 rounded-2xl px-6 py-4"
                        style={{
                            background: "rgba(17,24,39,0.55)",
                            border: "1px solid var(--stroke,#1f2937)",
                            boxShadow: '0 0 0 1px rgba(59,130,246,0.10), 0 12px 40px -12px rgba(139,92,246,0.45)',
                        }}
                    >
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-base font-bold"
                            style={{
                                background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                color: "var(--primary-text,#ffffff)",
                                boxShadow: '0 0 18px 0 rgba(59,130,246,0.5)',
                            }}
                        >
                            {initials}
                        </div>
                        <div className="flex flex-col leading-relaxed">
                            <span className="text-base font-bold break-words" style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                {presenterName || '李哲'}
                                <span className="ml-2 font-normal break-words" style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    {organization || '星核智能技术研究院'}
                                </span>
                            </span>
                            <span className="text-sm break-words" style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.55, overflowWrap: 'break-word', wordBreak: 'break-word', fontVariantNumeric: 'tabular-nums' }}>
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
