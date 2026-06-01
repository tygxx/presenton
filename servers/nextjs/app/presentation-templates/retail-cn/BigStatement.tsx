import React from 'react'
import * as z from "zod";

export const layoutId = 'retail-cn-big-statement'
export const layoutName = '金句首屏'
export const layoutDescription = '电商新零售风金句首屏：超大粗体主张占据画面，搭配引号装饰、撞色色块、圆角价签卡片与活力几何形。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    statement: z.string().min(2).max(40).default('好货不必等大促，每一天都是你的购物节').meta({
        description: "核心主张（中文大字，简短有力，一句话占据画面）",
    }),
    support: z.string().min(0).max(50).default('精选全球好物，会员专享价，最快当日达，让美好生活触手可及').meta({
        description: "可选的支撑说明，一句话补充主张",
    }),
    attribution: z.string().min(0).max(20).default('潮汐新零售 · 品牌主张').meta({
        description: "可选的出处/署名，如品牌、人物或栏目",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BigStatement: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const statement = slideData?.statement || '好货不必等大促，每一天都是你的购物节'
    const support = slideData?.support ?? '精选全球好物，会员专享价，最快当日达，让美好生活触手可及'
    const attribution = slideData?.attribution ?? '潮汐新零售 · 品牌主张'

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
                {/* 左上撞色大色块 + 活力几何形装饰层 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    {/* 左侧主色撞色色块 */}
                    <div
                        className="absolute top-0 left-0 h-full w-[34%]"
                        style={{ background: "var(--primary-color,#db2777)" }}
                    />
                    {/* 撞色叠加：副色斜切角块 */}
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="retailBigGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <rect x="0" y="0" width="436" height="720" fill="url(#retailBigGlow)" />
                        {/* 副色撞色三角块 */}
                        <polygon points="436,0 560,0 436,260" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.92" />
                        {/* 活力同心圆 */}
                        <circle cx="120" cy="150" r="90" fill="none" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="2" />
                        <circle cx="120" cy="150" r="140" fill="none" stroke="#ffffff" strokeOpacity="0.10" strokeWidth="2" />
                        {/* 右下活力圆点阵 */}
                        {[0, 1, 2, 3].map((r) =>
                            [0, 1, 2, 3].map((c) => (
                                <circle
                                    key={`${r}-${c}`}
                                    cx={1080 + c * 34}
                                    cy={560 + r * 34}
                                    r="4"
                                    fill="var(--secondary-color,#f59e0b)"
                                    fillOpacity="0.55"
                                />
                            ))
                        )}
                    </svg>
                </div>

                {/* 右上角圆角价签卡片（潮流价签母题） */}
                <div
                    className="absolute top-9 right-10 z-10 flex items-center gap-2 rounded-2xl px-4 py-2 shadow-md"
                    style={{ background: "var(--secondary-color,#f59e0b)" }}
                >
                    <span
                        className="flex h-5 w-5 items-center justify-center rounded-full"
                        style={{ background: "var(--primary-text,#ffffff)" }}
                    >
                        <span
                            className="block h-1.5 w-1.5 rounded-full"
                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                        />
                    </span>
                    <span
                        className="text-sm font-black leading-[1.6] break-words"
                        style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        新零售主张
                    </span>
                </div>

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full flex-col justify-center pl-[38%] pr-16 py-12">
                    {/* 超大引号装饰 */}
                    <span
                        className="block font-black leading-[1] select-none"
                        style={{
                            fontSize: '120px',
                            color: "var(--primary-color,#db2777)",
                            opacity: 0.16,
                            marginBottom: '-2.5rem',
                        }}
                        aria-hidden="true"
                    >
                        “
                    </span>

                    {/* 金句主张：超大字重 */}
                    <h1
                        className="text-6xl font-black leading-[1.25] break-words"
                        style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {statement}
                    </h1>

                    {/* 撞色装饰线条 */}
                    <div className="mt-7 flex items-center gap-2">
                        <span
                            className="h-2 w-20 rounded-full"
                            style={{ background: "var(--primary-color,#db2777)" }}
                        />
                        <span
                            className="h-2 w-8 rounded-full"
                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                        />
                    </div>

                    {/* 可选支撑说明（卡片化） */}
                    {support && support.trim().length > 0 && (
                        <div
                            className="mt-7 max-w-[40rem] rounded-2xl border px-6 py-4"
                            style={{
                                background: "var(--card-color,#fdf2f8)",
                                borderColor: "var(--stroke,#fbcfe8)",
                            }}
                        >
                            <p
                                className="text-xl leading-[1.7] break-words"
                                style={{ color: "var(--background-text,#18181b)", opacity: 0.88, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {support}
                            </p>
                        </div>
                    )}

                    {/* 可选署名 */}
                    {attribution && attribution.trim().length > 0 && (
                        <div className="mt-8 flex items-center gap-3">
                            <span
                                className="h-px w-8 rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            />
                            <span
                                className="text-base font-bold leading-relaxed break-words"
                                style={{ color: "var(--primary-color,#db2777)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {attribution}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default BigStatement
