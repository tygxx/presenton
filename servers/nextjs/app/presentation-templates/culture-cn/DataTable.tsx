import React from 'react'
import * as z from "zod";

export const layoutId = 'culture-cn-data-table'
export const layoutName = '数据表格'
export const layoutDescription = '国潮文创风数据表格：宣纸米黄底配朱砂表头、墨黑斑马纹与描金边框，竖排印章点缀。用于对比/明细类数据呈现，纯 CSS 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('文创系列销售明细').meta({
        description: "表格主标题（中文，简短）",
    }),
    subtitle: z.string().min(2).max(28).default('二〇二六年春季 · 各系列产品对比').meta({
        description: "标题下方的副标题/说明",
    }),
    headers: z.array(
        z.string().min(1).max(12).meta({ description: "表头列名" })
    ).min(2).max(5).default(['系列名称', '主打品类', '上市季度', '销量(件)', '好评率']).meta({
        description: "表格表头（2~5 列）",
    }),
    rows: z.array(
        z.array(
            z.string().min(1).max(16).meta({ description: "单元格内容" })
        ).min(2).max(5)
    ).min(2).max(6).default([
        ['敦煌纹样', '丝巾·胸针', '初春', '12,800', '98.6%'],
        ['故宫祥云', '笔记本·胶带', '仲春', '9,450', '97.2%'],
        ['江南烟雨', '油纸伞·团扇', '暮春', '7,320', '96.8%'],
        ['国风生肖', '盲盒·摆件', '初春', '15,600', '99.1%'],
        ['水墨山河', '茶具·香薰', '仲春', '6,180', '95.4%'],
    ]).meta({
        description: "表格数据行（每行单元格数应与表头列数一致，2~6 行）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DataTable: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '文创系列销售明细'
    const subtitle = slideData?.subtitle || '二〇二六年春季 · 各系列产品对比'
    const headers = slideData?.headers && slideData.headers.length > 0
        ? slideData.headers
        : ['系列名称', '主打品类', '上市季度', '销量(件)', '好评率']
    const rows = slideData?.rows && slideData.rows.length > 0
        ? slideData.rows
        : [
            ['敦煌纹样', '丝巾·胸针', '初春', '12,800', '98.6%'],
            ['故宫祥云', '笔记本·胶带', '仲春', '9,450', '97.2%'],
            ['江南烟雨', '油纸伞·团扇', '暮春', '7,320', '96.8%'],
            ['国风生肖', '盲盒·摆件', '初春', '15,600', '99.1%'],
            ['水墨山河', '茶具·香薰', '仲春', '6,180', '95.4%'],
        ]

    const colCount = headers.length

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f5ecd9)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：宣纸纹理 + 水墨笔触 + 传统纹样 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="cultureTableInk" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="cultureTableSeal" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--primary-color,#c0392b)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#c0392b)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 左上墨晕 */}
                    <circle cx="80" cy="70" r="260" fill="url(#cultureTableInk)" />
                    {/* 右下朱砂晕 */}
                    <circle cx="1180" cy="660" r="300" fill="url(#cultureTableSeal)" />
                    {/* 传统回纹边饰（顶部细线） */}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <path
                            key={i}
                            d={`M${40 + i * 24} 30 h12 v12 h-8 v-6 h-4 z`}
                            fill="none"
                            stroke="var(--stroke,#ddd0b4)"
                            strokeWidth="1.4"
                            opacity="0.6"
                        />
                    ))}
                </svg>

                {/* 描金外边框 */}
                <div
                    className="absolute inset-4 rounded-sm pointer-events-none"
                    style={{ border: "1.5px solid var(--stroke,#ddd0b4)" }}
                />
                <div
                    className="absolute inset-[22px] rounded-sm pointer-events-none"
                    style={{ border: "1px solid var(--primary-color,#c0392b)", opacity: 0.18 }}
                />

                {/* 右上角竖排印章块 */}
                <div className="absolute top-9 right-9 z-10 flex flex-col items-center gap-1">
                    <div
                        className="flex flex-col items-center justify-center rounded-md px-2.5 py-3"
                        style={{
                            background: "var(--primary-color,#c0392b)",
                            writingMode: 'vertical-rl',
                            color: "var(--primary-text,#ffffff)",
                        }}
                    >
                        <span
                            className="text-base font-bold leading-loose break-words"
                            style={{ overflowWrap: 'break-word', wordBreak: 'break-word', letterSpacing: '0.18em' }}
                        >
                            匠造国潮
                        </span>
                    </div>
                </div>

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <span
                                className="inline-block h-7 w-1.5 rounded-full"
                                style={{ background: "var(--primary-color,#c0392b)" }}
                            />
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{
                                    color: "var(--background-text,#2b2b2b)",
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {title}
                            </h1>
                        </div>
                        <p
                            className="mt-3 ml-5 pl-1 text-base leading-relaxed break-words"
                            style={{
                                color: "var(--background-text,#2b2b2b)",
                                opacity: 0.7,
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {subtitle}
                        </p>
                    </div>

                    {/* 表格区 */}
                    <div
                        className="mt-8 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl"
                        style={{
                            border: "1.5px solid var(--stroke,#ddd0b4)",
                            background: "var(--card-color,#fbf5e9)",
                            boxShadow: "0 8px 24px rgba(26,26,26,0.06)",
                        }}
                    >
                        {/* 表头：主题色底 */}
                        <div
                            className="grid"
                            style={{
                                gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                                background: "var(--primary-color,#c0392b)",
                            }}
                        >
                            {headers.map((h, i) => (
                                <div
                                    key={i}
                                    className="flex items-center px-5 py-4"
                                    style={
                                        i < colCount - 1
                                            ? { borderRight: "1px solid rgba(255,255,255,0.18)" }
                                            : undefined
                                    }
                                >
                                    <span
                                        className="text-base font-bold leading-relaxed break-words"
                                        style={{
                                            color: "var(--primary-text,#ffffff)",
                                            overflowWrap: 'break-word',
                                            wordBreak: 'break-word',
                                            letterSpacing: '0.04em',
                                        }}
                                    >
                                        {h}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* 数据行：斑马纹 */}
                        <div className="flex min-h-0 flex-1 flex-col">
                            {rows.map((row, rIdx) => {
                                const isEven = rIdx % 2 === 1
                                return (
                                    <div
                                        key={rIdx}
                                        className="grid flex-1 items-stretch"
                                        style={{
                                            gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                                            background: isEven
                                                ? "var(--background-color,#f5ecd9)"
                                                : "var(--card-color,#fbf5e9)",
                                            borderTop: rIdx === 0
                                                ? undefined
                                                : "1px solid var(--stroke,#ddd0b4)",
                                        }}
                                    >
                                        {Array.from({ length: colCount }).map((_, cIdx) => {
                                            const cell = row[cIdx] ?? '—'
                                            return (
                                                <div
                                                    key={cIdx}
                                                    className="flex items-center px-5 py-3"
                                                    style={
                                                        cIdx < colCount - 1
                                                            ? { borderRight: "1px solid var(--stroke,#ddd0b4)" }
                                                            : undefined
                                                    }
                                                >
                                                    <span
                                                        className="text-base leading-relaxed break-words"
                                                        style={{
                                                            color: cIdx === 0
                                                                ? "var(--primary-color,#c0392b)"
                                                                : "var(--background-text,#2b2b2b)",
                                                            fontWeight: cIdx === 0 ? 700 : 400,
                                                            overflowWrap: 'break-word',
                                                            wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {cell}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 底部落款 */}
                    <div className="mt-5 flex items-center justify-between">
                        <span
                            className="text-sm leading-relaxed break-words"
                            style={{
                                color: "var(--background-text,#2b2b2b)",
                                opacity: 0.55,
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            数据来源 · 国潮文创品牌部
                        </span>
                        <span className="flex items-center gap-2">
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--primary-color,#c0392b)" }}
                            />
                            <span
                                className="text-sm leading-relaxed break-words"
                                style={{
                                    color: "var(--background-text,#2b2b2b)",
                                    opacity: 0.55,
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                匠心之作 · 雅韵东方
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
