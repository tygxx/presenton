import React from 'react'
import * as z from "zod";

export const layoutId = 'business-cn-big-statement'
export const layoutName = '金句首屏'
export const layoutDescription = '商务风金句首屏：超大字重主张占据画面，深蓝底色 + 橙色引号与线条装饰、几何网格点缀。可选支撑说明与署名。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    statement: z.string().min(4).max(40).default('真正的护城河，是持续为客户创造价值').meta({
        description: "核心主张/金句，超大字呈现，简短有力（中文）",
    }),
    support: z.string().min(0).max(50).default('增长不是终点，而是长期信任与专业能力共同积累的结果').meta({
        description: "可选的支撑说明，一句话补充金句（中文）",
    }),
    attribution: z.string().min(0).max(20).default('启元商务咨询 · 战略观点').meta({
        description: "可选署名/出处，如人名、部门或来源",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BigStatement: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const statement = slideData?.statement ?? '真正的护城河，是持续为客户创造价值'
    const support = slideData?.support ?? '增长不是终点，而是长期信任与专业能力共同积累的结果'
    const attribution = slideData?.attribution ?? '启元商务咨询 · 战略观点'

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
                {/* 深蓝主背景层 */}
                <div className="absolute inset-0" style={{ background: "var(--primary-color,#1e3a8a)" }}>
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                        <defs>
                            <linearGradient id="bizStmtVignette" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
                                <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
                                <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
                            </linearGradient>
                            <pattern id="bizStmtGrid" width="64" height="64" patternUnits="userSpaceOnUse">
                                <path d="M64 0 L0 0 0 64" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
                            </pattern>
                        </defs>
                        {/* 稳健网格母题 */}
                        <rect width="1280" height="720" fill="url(#bizStmtGrid)" />
                        <rect width="1280" height="720" fill="url(#bizStmtVignette)" />
                        {/* 右上几何同心圆 */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={i} cx="1170" cy="-30" r={140 + i * 90} fill="none" stroke="#ffffff" strokeOpacity={0.08} strokeWidth="1.5" />
                        ))}
                        {/* 斜向几何线条 */}
                        <line x1="-60" y1="600" x2="520" y2="120" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1.5" />
                        <line x1="-60" y1="700" x2="640" y2="120" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1.5" />
                    </svg>
                </div>

                {/* 左侧橙色强调竖条 */}
                <div
                    className="absolute left-0 top-0 h-full w-[6px]"
                    style={{ background: "var(--secondary-color,#f97316)" }}
                    aria-hidden="true"
                />

                {/* 右下角橙色几何面板点缀 */}
                <div className="absolute bottom-0 right-0" aria-hidden="true">
                    <svg width="240" height="200" viewBox="0 0 240 200" className="block">
                        <polygon points="240,200 240,40 80,200" fill="var(--secondary-color,#f97316)" fillOpacity="0.16" />
                        <polygon points="240,200 240,110 150,200" fill="var(--secondary-color,#f97316)" fillOpacity="0.28" />
                    </svg>
                </div>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-20 py-16">
                    {/* 顶部标签 + 引号 */}
                    <div className="flex items-center gap-5">
                        {/* 超大装饰引号 */}
                        <span
                            className="leading-none"
                            style={{ fontSize: '120px', color: "var(--secondary-color,#f97316)", lineHeight: 0.6 }}
                            aria-hidden="true"
                        >
                            “
                        </span>
                        <span
                            className="inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium tracking-wide break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.14)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            观点 · STATEMENT
                        </span>
                    </div>

                    {/* 金句主张：超大字重 */}
                    <h1
                        className="max-w-[58rem] text-7xl font-black leading-[1.25] break-words"
                        style={{
                            color: "var(--primary-text,#ffffff)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {statement}
                    </h1>

                    {/* 橙色分隔线条 */}
                    <div
                        className="mt-8 mb-6 h-1.5 w-28 rounded-full"
                        style={{ background: "var(--secondary-color,#f97316)" }}
                        aria-hidden="true"
                    />

                    {/* 支撑说明（可选） */}
                    {support ? (
                        <p
                            className="max-w-[44rem] text-2xl leading-relaxed break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                opacity: 0.82,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {support}
                        </p>
                    ) : null}

                    {/* 署名（可选） */}
                    {attribution ? (
                        <div className="mt-10 flex items-center gap-3">
                            <div
                                className="h-px w-10 flex-shrink-0"
                                style={{ background: "var(--secondary-color,#f97316)" }}
                                aria-hidden="true"
                            />
                            <span
                                className="text-base font-medium tracking-wide break-words"
                                style={{
                                    color: "var(--primary-text,#ffffff)",
                                    opacity: 0.7,
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
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
