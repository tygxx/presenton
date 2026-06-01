import React from 'react'
import * as z from "zod";

export const layoutId = 'realestate-cn-big-statement'
export const layoutName = '金句首屏'
export const layoutDescription = '房产建筑风金句首屏：超大字重主张占据画面，配巨型引号、细金线分隔与极简建筑剪影。高级灰 + 金铜点缀 + 超大留白，纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    statement: z.string().min(2).max(40).default('让每一寸空间，都成为生活的答案').meta({
        description: "核心主张（中文，简短有力，一句话占据画面）",
    }),
    support: z.string().max(50).default('以建筑的克制与质感，承载居住者对美好生活的全部想象。').meta({
        description: "可选的辅助说明，一句话补充主张",
    }),
    attribution: z.string().max(20).default('——  锦熙置业 · 设计哲学').meta({
        description: "可选的署名/出处，如品牌、人物或项目名",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BigStatement: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const statement = slideData?.statement || '让每一寸空间，都成为生活的答案'
    const support = slideData?.support ?? '以建筑的克制与质感，承载居住者对美好生活的全部想象。'
    const attribution = slideData?.attribution ?? '——  锦熙置业 · 设计哲学'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f4f4f5)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：极简建筑剪影 + 细线网格 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="reStmtSky" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="reStmtTower" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.07" />
                            <stop offset="100%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.13" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#reStmtSky)" />

                    {/* 右下角极简建筑剪影群 */}
                    <g fill="url(#reStmtTower)">
                        <rect x="978" y="430" width="58" height="290" />
                        <rect x="1044" y="350" width="74" height="370" />
                        <rect x="1126" y="478" width="48" height="242" />
                        <rect x="1182" y="402" width="66" height="318" />
                    </g>
                    {/* 楼宇窗格细线（克制） */}
                    <g stroke="var(--card-color,#ffffff)" strokeOpacity="0.5" strokeWidth="1">
                        <line x1="1044" y1="392" x2="1118" y2="392" />
                        <line x1="1044" y1="446" x2="1118" y2="446" />
                        <line x1="1044" y1="500" x2="1118" y2="500" />
                        <line x1="1044" y1="554" x2="1118" y2="554" />
                        <line x1="1044" y1="608" x2="1118" y2="608" />
                        <line x1="1182" y1="448" x2="1248" y2="448" />
                        <line x1="1182" y1="510" x2="1248" y2="510" />
                        <line x1="1182" y1="572" x2="1248" y2="572" />
                    </g>

                    {/* 左上角细金线装饰角 */}
                    <g stroke="var(--primary-color,#b08d57)" strokeOpacity="0.55" strokeWidth="1.5" fill="none">
                        <line x1="96" y1="84" x2="200" y2="84" />
                        <line x1="96" y1="84" x2="96" y2="156" />
                    </g>
                </svg>

                {/* 顶部细金线 */}
                <div
                    className="absolute top-0 left-0 h-[3px] w-full"
                    style={{ background: "var(--primary-color,#b08d57)", opacity: 0.85 }}
                />

                {/* 右上角角标 */}
                <div className="absolute top-8 right-12 z-10 flex items-center gap-2">
                    <span
                        className="inline-block h-[6px] w-[6px] rounded-full"
                        style={{ background: "var(--primary-color,#b08d57)" }}
                    />
                    <span
                        className="text-xs font-light tracking-widest break-words"
                        style={{ color: "var(--background-text,#27272a)", opacity: 0.55, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        REAL ESTATE
                    </span>
                </div>

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-24 py-16">
                    {/* 巨型引号装饰 */}
                    <span
                        className="font-black leading-none break-words"
                        style={{
                            fontSize: '120px',
                            lineHeight: '0.7',
                            color: "var(--primary-color,#b08d57)",
                            opacity: 0.9,
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        “
                    </span>

                    {/* 核心主张 */}
                    <h1
                        className="mt-2 max-w-[58rem] text-7xl font-black leading-[1.25] break-words"
                        style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {statement}
                    </h1>

                    {/* 细金线分隔 */}
                    <div className="mt-10 flex items-center gap-5">
                        <div
                            className="h-[2px] w-20 rounded-full"
                            style={{ background: "var(--primary-color,#b08d57)" }}
                        />
                        <div
                            className="h-[1px] w-40 rounded-full"
                            style={{ background: "var(--stroke,#e4e4e7)" }}
                        />
                    </div>

                    {/* 辅助说明 + 署名 */}
                    {(support || attribution) && (
                        <div className="mt-8 flex max-w-[48rem] flex-col gap-3">
                            {support && (
                                <p
                                    className="text-xl font-light leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#27272a)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {support}
                                </p>
                            )}
                            {attribution && (
                                <span
                                    className="text-base font-medium tracking-wide leading-relaxed break-words"
                                    style={{ color: "var(--primary-color,#b08d57)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {attribution}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* 底部细分割线 */}
                <div
                    className="absolute bottom-0 left-0 h-[1px] w-full"
                    style={{ background: "var(--stroke,#e4e4e7)" }}
                />
            </div>
        </>
    )
}

export default BigStatement
