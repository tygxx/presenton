import React from 'react'
import * as z from "zod";

export const layoutId = 'travel-cn-big-statement'
export const layoutName = '金句首屏'
export const layoutDescription = '旅游文旅风金句首屏：超大字重主张占据画面，配引号与路线/指南针点缀。明媚海蓝 + 暖阳橙渐变天幕，轻盈卡片承托署名。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    statement: z.string().min(2).max(40).default('远方不在地图尽头，而在你启程的那一刻').meta({
        description: "一句有力的主张/金句（中文，简短铿锵，占据画面主视觉）",
    }),
    support: z.string().min(0).max(50).default('从海岸线到雪山之巅，我们为每一次出发，定制专属的目的地体验').meta({
        description: "可选的支撑说明，一句话补充金句的意涵",
    }),
    attribution: z.string().min(0).max(20).default('远行文旅 · 目的地主张').meta({
        description: "可选的署名/来源，如品牌名或出处",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BigStatement: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const statement = slideData?.statement || '远方不在地图尽头，而在你启程的那一刻'
    const support = slideData?.support ?? '从海岸线到雪山之巅，我们为每一次出发，定制专属的目的地体验'
    const attribution = slideData?.attribution ?? '远行文旅 · 目的地主张'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f0f9ff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景天幕：海蓝→暖阳的明媚渐变与光晕 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(135deg, var(--background-color,#f0f9ff) 0%, #ffffff 46%, rgba(245,158,11,0.08) 100%)",
                    }}
                    aria-hidden="true"
                />
                {/* 装饰 SVG：风景天际线 + 路线弧线 + 指南针/目的地点 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="travelSkyGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="travelSeaGlow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.14" />
                            <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* 右上暖阳光晕 */}
                    <circle cx="1090" cy="150" r="220" fill="url(#travelSkyGlow)" />
                    <circle cx="1090" cy="150" r="66" fill="none" stroke="var(--secondary-color,#f59e0b)" strokeOpacity="0.30" strokeWidth="2" />
                    {/* 左下海蓝光晕 */}
                    <circle cx="150" cy="640" r="260" fill="url(#travelSeaGlow)" />
                    {/* 路线弧线（旅途线索） */}
                    <path
                        d="M -40 560 C 280 470, 520 600, 760 470 S 1180 360, 1340 430"
                        fill="none"
                        stroke="var(--primary-color,#0891b2)"
                        strokeOpacity="0.28"
                        strokeWidth="2.5"
                        strokeDasharray="2 12"
                        strokeLinecap="round"
                    />
                    {/* 远山天际线 */}
                    <path
                        d="M 0 612 L 150 560 L 290 600 L 470 530 L 640 596 L 840 540 L 1040 604 L 1280 556 L 1280 720 L 0 720 Z"
                        fill="var(--stroke,#bae6fd)"
                        fillOpacity="0.45"
                    />
                    <path
                        d="M 0 660 L 220 612 L 430 658 L 700 600 L 980 660 L 1280 614 L 1280 720 L 0 720 Z"
                        fill="var(--primary-color,#0891b2)"
                        fillOpacity="0.10"
                    />
                    {/* 目的地路线点 */}
                    {[
                        { x: 280, y: 470 },
                        { x: 760, y: 470 },
                        { x: 1180, y: 408 },
                    ].map((p, i) => (
                        <g key={i}>
                            <circle cx={p.x} cy={p.y} r="9" fill="none" stroke="var(--secondary-color,#f59e0b)" strokeOpacity="0.55" strokeWidth="2" />
                            <circle cx={p.x} cy={p.y} r="3.5" fill="var(--secondary-color,#f59e0b)" />
                        </g>
                    ))}
                </svg>

                {/* 右上角指南针角标 */}
                <div className="absolute right-12 top-10 z-10" aria-hidden="true">
                    <svg viewBox="0 0 64 64" className="h-16 w-16" style={{ opacity: 0.9 }}>
                        <circle cx="32" cy="32" r="28" fill="none" stroke="var(--primary-color,#0891b2)" strokeOpacity="0.35" strokeWidth="2" />
                        <circle cx="32" cy="32" r="20" fill="none" stroke="var(--stroke,#bae6fd)" strokeWidth="1.5" />
                        <polygon points="32,12 38,32 32,28 26,32" fill="var(--secondary-color,#f59e0b)" />
                        <polygon points="32,52 26,32 32,36 38,32" fill="var(--primary-color,#0891b2)" fillOpacity="0.6" />
                        <circle cx="32" cy="32" r="3" fill="var(--primary-color,#0891b2)" />
                    </svg>
                </div>

                {/* 主内容：金句居中，引号与线条装饰 */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-20 py-16 text-center">
                    {/* 顶部引号 */}
                    <span
                        className="leading-none"
                        style={{
                            fontFamily: "Georgia, 'Noto Sans SC', serif",
                            fontSize: '128px',
                            fontWeight: 900,
                            color: "var(--secondary-color,#f59e0b)",
                            opacity: 0.55,
                            marginBottom: '-2.5rem',
                        }}
                        aria-hidden="true"
                    >
                        “
                    </span>

                    {/* 金句主张 */}
                    <h1
                        className="max-w-[60rem] break-words text-6xl font-black leading-[1.25]"
                        style={{
                            color: "var(--background-text,#0c4a6e)",
                            overflowWrap: 'break-word',
                            wordBreak: 'break-word',
                        }}
                    >
                        {statement}
                    </h1>

                    {/* 装饰线条 */}
                    <div className="mt-9 flex items-center justify-center gap-3" aria-hidden="true">
                        <span
                            className="h-1 w-12 rounded-full"
                            style={{ background: "var(--stroke,#bae6fd)" }}
                        />
                        <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                        />
                        <span
                            className="h-1 w-24 rounded-full"
                            style={{ background: "var(--primary-color,#0891b2)" }}
                        />
                        <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                        />
                        <span
                            className="h-1 w-12 rounded-full"
                            style={{ background: "var(--stroke,#bae6fd)" }}
                        />
                    </div>

                    {/* 支撑说明 */}
                    {support && support.trim().length > 0 && (
                        <p
                            className="mt-8 max-w-[44rem] break-words text-xl leading-[1.7]"
                            style={{
                                color: "var(--background-text,#0c4a6e)",
                                opacity: 0.82,
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {support}
                        </p>
                    )}

                    {/* 署名卡片 */}
                    {attribution && attribution.trim().length > 0 && (
                        <div
                            className="mt-9 inline-flex items-center gap-3 rounded-full border px-6 py-2.5 shadow-sm"
                            style={{
                                background: "var(--card-color,#ffffff)",
                                borderColor: "var(--stroke,#bae6fd)",
                            }}
                        >
                            <span
                                className="h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                                aria-hidden="true"
                            />
                            <span
                                className="break-words text-base font-semibold leading-relaxed"
                                style={{
                                    color: "var(--primary-color,#0891b2)",
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
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
