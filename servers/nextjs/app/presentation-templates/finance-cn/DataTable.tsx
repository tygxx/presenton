import React from 'react'
import * as z from "zod";

export const layoutId = 'finance-cn-data-table'
export const layoutName = '数据表格'
export const layoutDescription = '金融投资风数据表格页：深藏青底配香槟金线条，衬线大标题，表头主题色底、斑马纹明细表，适合基金/资产/收益对比与明细呈现。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('核心资产配置对比').meta({
        description: "表格页主标题（中文，简短有力，≤20字）",
    }),
    subtitle: z.string().min(2).max(40).default('截至2026年一季度末，各类资产收益与风险一览').meta({
        description: "副标题，一句话说明表格口径或时间范围",
    }),
    headers: z.array(
        z.string().min(1).max(12).meta({ description: "表头列名，如『资产类别』『年化收益』" })
    ).min(2).max(5).default([
        '资产类别', '配置比例', '年化收益', '最大回撤', '风险等级',
    ]).meta({ description: "表格表头（2-5列）" }),
    rows: z.array(
        z.array(
            z.string().min(1).max(16).meta({ description: "单元格内容（≤16字）" })
        )
    ).min(2).max(6).default([
        ['权益类基金', '38%', '+14.6%', '-12.3%', '中高'],
        ['固定收益', '32%', '+5.2%', '-1.8%', '低'],
        ['另类投资', '15%', '+9.8%', '-6.4%', '中'],
        ['货币现金', '10%', '+2.1%', '-0.2%', '极低'],
        ['黄金对冲', '5%', '+7.5%', '-4.1%', '中'],
    ]).meta({ description: "表格数据行（2-6行，每行单元格数应与表头一致）" }),
    footnote: z.string().min(2).max(40).default('数据来源：内部资管系统｜历史业绩不代表未来表现').meta({
        description: "表格下方注释/数据来源说明",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DataTable: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '核心资产配置对比'
    const subtitle = slideData?.subtitle || '截至2026年一季度末，各类资产收益与风险一览'
    const headers = slideData?.headers || ['资产类别', '配置比例', '年化收益', '最大回撤', '风险等级']
    const rows = slideData?.rows || [
        ['权益类基金', '38%', '+14.6%', '-12.3%', '中高'],
        ['固定收益', '32%', '+5.2%', '-1.8%', '低'],
        ['另类投资', '15%', '+9.8%', '-6.4%', '中'],
        ['货币现金', '10%', '+2.1%', '-0.2%', '极低'],
        ['黄金对冲', '5%', '+7.5%', '-4.1%', '中'],
    ]
    const footnote = slideData?.footnote || '数据来源：内部资管系统｜历史业绩不代表未来表现'
    const colCount = headers.length || 1

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@600;700;900&display=swap&subset=chinese-simplified"
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
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="finTableGold" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="finTableGlow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0" />
                        </linearGradient>
                        <pattern id="finTableGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0 L0 0 0 48" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.35" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {/* 数据网格母题 */}
                    <rect width="1280" height="720" fill="url(#finTableGrid)" />
                    {/* 右上角蓝色光晕 */}
                    <rect width="1280" height="720" fill="url(#finTableGlow)" />
                    {/* 增长曲线母题 */}
                    <polyline
                        points="0,640 180,610 360,560 540,580 720,500 900,470 1080,400 1280,340"
                        fill="none"
                        stroke="var(--secondary-color,#60a5fa)"
                        strokeOpacity="0.25"
                        strokeWidth="2"
                    />
                    {/* 棱形母题（右上） */}
                    <g stroke="var(--primary-color,#d4af37)" strokeOpacity="0.30" fill="none" strokeWidth="1.5">
                        <rect x="1140" y="70" width="48" height="48" transform="rotate(45 1164 94)" />
                        <rect x="1188" y="40" width="26" height="26" transform="rotate(45 1201 53)" />
                    </g>
                    {/* 顶部细金线 */}
                    <rect x="0" y="0" width="1280" height="3" fill="url(#finTableGold)" />
                </svg>

                {/* 角标：棱形金点 */}
                <div
                    className="absolute"
                    style={{
                        top: '40px', left: '64px', width: '12px', height: '12px',
                        background: "var(--primary-color,#d4af37)",
                        transform: 'rotate(45deg)',
                        boxShadow: '0 0 0 5px rgba(212,175,55,0.16)',
                    }}
                    aria-hidden="true"
                />

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 pt-12 pb-9">
                    {/* 标题区 */}
                    <div className="flex items-end justify-between gap-6">
                        <div className="flex min-w-0 flex-col">
                            <span
                                className="mb-3 inline-flex w-fit items-center gap-2 text-xs font-medium uppercase break-words"
                                style={{
                                    color: "var(--primary-color,#d4af37)",
                                    letterSpacing: '0.18em',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                FINANCE · DATA
                            </span>
                            <h1
                                className="text-5xl font-black leading-[1.2] break-words"
                                style={{
                                    color: "var(--background-text,#e2e8f0)",
                                    fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {title}
                            </h1>
                            <p
                                className="mt-3 text-base leading-relaxed break-words"
                                style={{
                                    color: "var(--background-text,#e2e8f0)", opacity: 0.72,
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {subtitle}
                            </p>
                        </div>
                        {/* 右上角棱形统计徽标 */}
                        <div className="flex flex-shrink-0 items-center gap-3">
                            <div
                                className="flex h-12 w-12 items-center justify-center"
                                style={{
                                    background: 'rgba(212,175,55,0.10)',
                                    border: '1px solid var(--primary-color,#d4af37)',
                                    transform: 'rotate(45deg)',
                                }}
                            >
                                <span
                                    className="text-lg font-black"
                                    style={{ color: "var(--primary-color,#d4af37)", transform: 'rotate(-45deg)' }}
                                >
                                    {rows.length}
                                </span>
                            </div>
                            <div className="flex flex-col leading-relaxed">
                                <span className="text-sm font-bold break-words" style={{ color: "var(--background-text,#e2e8f0)" }}>
                                    明细条目
                                </span>
                                <span className="text-xs break-words" style={{ color: "var(--background-text,#e2e8f0)", opacity: 0.6 }}>
                                    Rows
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 金色分隔细线 */}
                    <div
                        className="mt-6 h-px w-full"
                        style={{ background: "linear-gradient(90deg, var(--primary-color,#d4af37) 0%, rgba(212,175,55,0.15) 60%, transparent 100%)" }}
                    />

                    {/* 表格区 */}
                    <div
                        className="mt-6 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl"
                        style={{
                            background: "var(--card-color,#1e293b)",
                            border: "1px solid var(--stroke,#334155)",
                        }}
                    >
                        {/* 表头：主题色底 */}
                        <div
                            className="grid items-center"
                            style={{
                                gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                                background: "linear-gradient(90deg, var(--primary-color,#d4af37) 0%, #c79b28 100%)",
                            }}
                        >
                            {headers.map((h, i) => (
                                <div
                                    key={i}
                                    className="px-5 py-3.5 text-sm font-bold leading-relaxed break-words"
                                    style={{
                                        color: "var(--background-color,#0f172a)",
                                        textAlign: i === 0 ? 'left' : 'center',
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {h}
                                </div>
                            ))}
                        </div>

                        {/* 数据行：斑马纹（纯 CSS） */}
                        <div className="flex min-h-0 flex-1 flex-col justify-evenly">
                            {rows.map((row, r) => (
                                <div
                                    key={r}
                                    className="grid items-center"
                                    style={{
                                        gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                                        background: r % 2 === 1 ? 'rgba(148,163,184,0.07)' : 'transparent',
                                        borderTop: r === 0 ? 'none' : '1px solid var(--stroke,#334155)',
                                    }}
                                >
                                    {Array.from({ length: colCount }).map((_, c) => {
                                        const cell = row?.[c] ?? ''
                                        return (
                                            <div
                                                key={c}
                                                className="px-5 py-3 text-sm leading-relaxed break-words"
                                                style={{
                                                    color: "var(--background-text,#e2e8f0)",
                                                    textAlign: c === 0 ? 'left' : 'center',
                                                    fontWeight: c === 0 ? 700 : 400,
                                                    opacity: c === 0 ? 1 : 0.88,
                                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                                }}
                                            >
                                                {c === 0 ? (
                                                    <span className="inline-flex items-center gap-2.5">
                                                        <span
                                                            className="inline-block flex-shrink-0"
                                                            style={{
                                                                width: '7px', height: '7px',
                                                                background: "var(--primary-color,#d4af37)",
                                                                transform: 'rotate(45deg)',
                                                            }}
                                                            aria-hidden="true"
                                                        />
                                                        <span className="break-words" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                                            {cell}
                                                        </span>
                                                    </span>
                                                ) : (
                                                    cell
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 脚注 */}
                    <div className="mt-5 flex items-center gap-2.5">
                        <span
                            className="inline-block h-3 w-1 flex-shrink-0 rounded-full"
                            style={{ background: "var(--secondary-color,#60a5fa)" }}
                            aria-hidden="true"
                        />
                        <p
                            className="text-xs leading-relaxed break-words"
                            style={{
                                color: "var(--background-text,#e2e8f0)", opacity: 0.55,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {footnote}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
