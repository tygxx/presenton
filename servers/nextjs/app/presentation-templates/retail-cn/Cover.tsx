import React from 'react'
import * as z from "zod";

export const layoutId = 'retail-cn-cover'
export const layoutName = '封面'
export const layoutDescription = '电商新零售风封面：撞色大色块 + 圆角卡片 + 价签装饰 + 潮流粗体排版。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    eyebrow: z.string().min(2).max(18).default('新零售 · 2026').meta({
        description: "标题上方的小标签/分类，如『年度战略』『品牌焕新』",
    }),
    title: z.string().min(2).max(20).default('焕新增长引擎').meta({
        description: "封面主标题（中文，简短有力、有冲击力）",
    }),
    subtitle: z.string().min(4).max(44).default('全渠道一体化，重新定义消费者的购物体验').meta({
        description: "副标题，一句话补充说明",
    }),
    presenterName: z.string().min(2).max(16).default('林悦').meta({
        description: "汇报人姓名",
    }),
    presentationDate: z.string().min(2).max(22).default('2026年6月').meta({
        description: "汇报日期",
    }),
    organization: z.string().min(2).max(26).default('潮燃新零售集团').meta({
        description: "公司或部门名称",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Cover: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const { eyebrow, title, subtitle, presenterName, presentationDate, organization } = slideData || {}
    const initials = (presenterName || '林悦').trim().slice(0, 2)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：撞色大色块 + 活力几何形 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="retailCoverPrimary" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#db2777)" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" />
                            </linearGradient>
                            <linearGradient id="retailCoverGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* 右侧撞色斜切大色块 */}
                        <path d="M760 0 L1280 0 L1280 720 L560 720 Z" fill="url(#retailCoverPrimary)" />
                        <path d="M760 0 L1280 0 L1280 720 L560 720 Z" fill="url(#retailCoverGlow)" />
                        {/* 活力几何形：圆环、圆点、波点 */}
                        <circle cx="1060" cy="150" r="190" fill="none" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="2" />
                        <circle cx="1060" cy="150" r="120" fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="2" />
                        {[0, 1, 2, 3, 4, 5].map((r) => (
                            [0, 1, 2, 3].map((c) => (
                                <circle key={`${r}-${c}`} cx={880 + c * 40} cy={500 + r * 28} r="3.5" fill="#ffffff" fillOpacity="0.30" />
                            ))
                        ))}
                    </svg>
                </div>

                {/* 左下角撞色色块装饰 */}
                <div
                    className="absolute bottom-0 left-0"
                    style={{
                        width: '180px', height: '14px',
                        background: "var(--secondary-color,#f59e0b)",
                    }}
                    aria-hidden="true"
                />

                {/* 右上角公司标识（可选，由生成系统注入） */}
                {((slideData as any)?.__companyName__ || (slideData as any)?._logo_url__) && (
                    <div className="absolute top-0 right-0 z-10 px-8 pt-5" style={{ width: '40%' }}>
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

                {/* 主体两栏布局 */}
                <div className="relative z-10 flex h-full">
                    {/* 左侧主内容 */}
                    <div className="flex w-[58%] flex-shrink-0 flex-col justify-center pl-16 pr-8">
                        {/* 价签式 eyebrow 标签 */}
                        <span
                            className="mb-7 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                background: "var(--primary-color,#db2777)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            />
                            {eyebrow || '新零售 · 2026'}
                        </span>

                        <h1
                            className="text-7xl font-black leading-[1.2] break-words"
                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title || '焕新增长引擎'}
                        </h1>

                        {/* 撞色下划线条 */}
                        <div className="my-7 flex items-center gap-2">
                            <div className="h-2 w-20 rounded-full" style={{ background: "var(--primary-color,#db2777)" }} />
                            <div className="h-2 w-10 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                        </div>

                        <p
                            className="max-w-[36rem] text-2xl font-medium leading-relaxed break-words"
                            style={{ color: "var(--background-text,#18181b)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle || '全渠道一体化，重新定义消费者的购物体验'}
                        </p>

                        {/* 汇报人信息 */}
                        <div className="mt-12 flex items-center gap-4">
                            <div
                                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-base font-black"
                                style={{ background: "var(--primary-color,#db2777)", color: "var(--primary-text,#ffffff)" }}
                            >
                                {initials}
                            </div>
                            <div className="flex flex-col leading-relaxed">
                                <span className="text-base font-bold break-words" style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    {presenterName || '林悦'}
                                    <span className="ml-2 font-medium" style={{ color: "var(--background-text,#18181b)", opacity: 0.6 }}>
                                        {organization || '潮燃新零售集团'}
                                    </span>
                                </span>
                                <span className="text-sm break-words" style={{ color: "var(--background-text,#18181b)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    {presentationDate || '2026年6月'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 右侧：圆角卡片 + 价签装饰（叠在撞色色块上） */}
                    <div className="relative flex flex-1 items-center justify-center pr-12">
                        <div
                            className="flex w-[78%] max-w-[320px] flex-col gap-5 rounded-3xl p-7 shadow-xl"
                            style={{
                                background: "var(--card-color,#fdf2f8)",
                                border: "1px solid var(--stroke,#fbcfe8)",
                            }}
                        >
                            {/* 卡片内价签条目 */}
                            {[
                                { tag: '全渠道', value: 'GMV +38%' },
                                { tag: '会员', value: '复购 ×2.4' },
                                { tag: '门店', value: '坪效翻番' },
                            ].map((it, i) => (
                                <div key={i} className="flex items-center justify-between gap-3">
                                    <span
                                        className="inline-flex items-center rounded-lg px-3 py-1 text-sm font-bold break-words"
                                        style={{
                                            color: "var(--primary-color,#db2777)",
                                            background: "var(--background-color,#ffffff)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {it.tag}
                                    </span>
                                    <span
                                        className="text-xl font-black break-words"
                                        style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {it.value}
                                    </span>
                                </div>
                            ))}
                            {/* 卡片底部价签缺口装饰 */}
                            <div
                                className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-3"
                                style={{ background: "var(--primary-color,#db2777)" }}
                            >
                                <span
                                    className="h-3 w-3 flex-shrink-0 rounded-full"
                                    style={{ background: "var(--background-color,#ffffff)" }}
                                />
                                <span
                                    className="text-sm font-bold break-words"
                                    style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    增长不止于此
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cover
