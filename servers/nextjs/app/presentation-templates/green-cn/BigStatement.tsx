import React from 'react'
import * as z from "zod";

export const layoutId = 'green-cn-big-statement'
export const layoutName = '金句首屏'
export const layoutDescription = '新能源环保风金句首屏：清新白绿渐变背景 + 叶片/地球/自然曲线装饰，超大字重主张占据画面，配可选支撑句与署名。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    statement: z.string().min(2).max(40).default('让每一度电，都来自清洁的阳光与风').meta({
        description: "核心主张（中文，超大字号，一句有力的话占据画面）",
    }),
    support: z.string().min(0).max(50).default('以可再生能源重塑能源结构，为子孙后代守护一片绿水青山。').meta({
        description: "可选支撑句，一句话补充主张（可留空）",
    }),
    attribution: z.string().min(0).max(20).default('绿源新能源 · 可持续发展宣言').meta({
        description: "可选署名/出处（可留空），如品牌主张、引用来源",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BigStatement: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const statement = slideData?.statement || '让每一度电，都来自清洁的阳光与风'
    const support = slideData?.support ?? '以可再生能源重塑能源结构，为子孙后代守护一片绿水青山。'
    const attribution = slideData?.attribution ?? '绿源新能源 · 可持续发展宣言'

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
                {/* 背景装饰层：天空蓝 → 清新白绿渐变 + 自然有机形状 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="greenStmtSky" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="55%" stopColor="var(--background-color,#f0fdf4)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="greenStmtHill" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                            </linearGradient>
                            <radialGradient id="greenStmtGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0" />
                            </radialGradient>
                        </defs>

                        {/* 顶部天空蓝光晕 */}
                        <rect width="1280" height="720" fill="url(#greenStmtSky)" />

                        {/* 右上角太阳/能源光晕 */}
                        <circle cx="1100" cy="120" r="220" fill="url(#greenStmtGlow)" />
                        <circle cx="1100" cy="120" r="58" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.18" strokeWidth="2" />
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                            const a = (i / 8) * Math.PI * 2
                            const x1 = 1100 + Math.cos(a) * 70
                            const y1 = 120 + Math.sin(a) * 70
                            const x2 = 1100 + Math.cos(a) * 92
                            const y2 = 120 + Math.sin(a) * 92
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--primary-color,#16a34a)" strokeOpacity="0.18" strokeWidth="2" strokeLinecap="round" />
                        })}

                        {/* 底部自然有机山丘曲线 */}
                        <path d="M0,560 C220,500 380,620 620,560 C880,496 1040,600 1280,540 L1280,720 L0,720 Z" fill="url(#greenStmtHill)" />
                        <path d="M0,620 C260,580 420,668 700,610 C960,558 1120,648 1280,600 L1280,720 L0,720 Z" fill="var(--primary-color,#16a34a)" fillOpacity="0.10" />

                        {/* 自然曲线（风/水流动感） */}
                        <path d="M-40,260 C220,200 360,320 640,260 C920,200 1080,300 1320,240" fill="none" stroke="var(--secondary-color,#0891b2)" strokeOpacity="0.12" strokeWidth="2" />
                    </svg>

                    {/* 左下角叶片装饰 */}
                    <svg viewBox="0 0 200 200" className="absolute" style={{ left: '-12px', bottom: '-16px', width: '220px', height: '220px' }} aria-hidden="true">
                        <path
                            d="M100,180 C40,160 20,90 60,40 C100,90 130,60 170,30 C170,110 150,170 100,180 Z"
                            fill="var(--primary-color,#16a34a)"
                            fillOpacity="0.14"
                        />
                        <path
                            d="M100,180 C90,130 100,80 130,45"
                            fill="none"
                            stroke="var(--primary-color,#16a34a)"
                            strokeOpacity="0.22"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* 主内容：金句居中分布 */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-20 py-16 text-center">
                    {/* 顶部圆角能源标签 + 装饰线 */}
                    <div className="mb-8 flex items-center gap-4">
                        <span className="h-px w-12 rounded-full" style={{ background: "var(--primary-color,#16a34a)", opacity: 0.4 }} />
                        <span
                            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold break-words"
                            style={{
                                color: "var(--primary-color,#16a34a)",
                                background: "var(--stroke,#d1fae5)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            清洁能源 · 绿色未来
                        </span>
                        <span className="h-px w-12 rounded-full" style={{ background: "var(--primary-color,#16a34a)", opacity: 0.4 }} />
                    </div>

                    {/* 超大引号 + 主张 */}
                    <div className="relative flex w-full max-w-[58rem] flex-col items-center">
                        <span
                            className="pointer-events-none select-none leading-none"
                            style={{
                                position: 'absolute',
                                top: '-3.2rem',
                                left: '-0.5rem',
                                fontSize: '8rem',
                                fontWeight: 900,
                                color: "var(--primary-color,#16a34a)",
                                opacity: 0.16,
                            }}
                            aria-hidden="true"
                        >
                            “
                        </span>
                        <h1
                            className="text-6xl font-black leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {statement}
                        </h1>
                    </div>

                    {/* 中间渐变装饰线 */}
                    <div
                        className="my-9 h-1.5 w-28 rounded-full"
                        style={{ background: "linear-gradient(90deg, var(--primary-color,#16a34a), var(--secondary-color,#0891b2))" }}
                    />

                    {/* 可选支撑句 */}
                    {support ? (
                        <p
                            className="max-w-[46rem] text-xl leading-loose break-words"
                            style={{ color: "var(--background-text,#14532d)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {support}
                        </p>
                    ) : null}

                    {/* 可选署名 */}
                    {attribution ? (
                        <div className="mt-9 flex items-center gap-3">
                            <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ background: "var(--secondary-color,#0891b2)", boxShadow: '0 0 0 5px var(--stroke,#d1fae5)' }}
                            />
                            <span
                                className="text-base font-semibold leading-relaxed break-words"
                                style={{ color: "var(--primary-color,#16a34a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {attribution}
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default BigStatement
