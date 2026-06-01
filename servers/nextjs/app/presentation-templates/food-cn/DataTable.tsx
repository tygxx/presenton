import React from 'react'
import * as z from "zod";

export const layoutId = 'food-cn-data-table'
export const layoutName = '数据表格'
export const layoutDescription = '美食餐饮风对比明细表：暖米底 + 焦糖金圆盘装饰，表头食欲橙红主题色底，斑马纹行交替，纯 CSS/SVG，离线可渲染。适用于菜品对比、价格明细、门店数据等表格场景。'

const schema = z.object({
    title: z.string().min(2).max(20).default('招牌菜品对比明细').meta({
        description: "表格主标题（中文，简短，如『招牌菜品对比』）",
    }),
    headers: z.array(
        z.string().min(1).max(12).meta({ description: "表头列名，如『菜品』『口味』" })
    ).min(2).max(5).default(['招牌菜品', '主打口味', '人气指数', '建议售价']).meta({
        description: "表格表头（2-5 列）",
    }),
    rows: z.array(
        z.array(
            z.string().min(1).max(16).meta({ description: "单元格内容" })
        ).min(2).max(5)
    ).min(2).max(6).default([
        ['秘制红烧肉', '咸香软糯', '★★★★★', '￥58'],
        ['古法卤味拼盘', '回味甘醇', '★★★★☆', '￥48'],
        ['麻辣鲜香水煮鱼', '麻辣鲜爽', '★★★★★', '￥88'],
        ['养生菌菇煲', '清鲜暖胃', '★★★★☆', '￥38'],
        ['桂花酒酿圆子', '香甜润口', '★★★★☆', '￥22'],
    ]).meta({
        description: "表格数据行（2-6 行，每行单元格数应与表头一致）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DataTable: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '招牌菜品对比明细'
    const headers = (slideData?.headers && slideData.headers.length >= 2)
        ? slideData.headers
        : ['招牌菜品', '主打口味', '人气指数', '建议售价']
    const rows = (slideData?.rows && slideData.rows.length >= 2)
        ? slideData.rows
        : [
            ['秘制红烧肉', '咸香软糯', '★★★★★', '￥58'],
            ['古法卤味拼盘', '回味甘醇', '★★★★☆', '￥48'],
            ['麻辣鲜香水煮鱼', '麻辣鲜爽', '★★★★★', '￥88'],
            ['养生菌菇煲', '清鲜暖胃', '★★★★☆', '￥38'],
            ['桂花酒酿圆子', '香甜润口', '★★★★☆', '￥22'],
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
                    background: "var(--background-color,#fdf6ec)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：暖色圆盘构图 + 焦糖金描边圆环 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="foodTableGlow" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 右上角大圆盘光晕 */}
                        <circle cx="1180" cy="-40" r="320" fill="url(#foodTableGlow)" />
                        {/* 左下角暖色块圆盘 */}
                        <circle cx="-30" cy="760" r="240" fill="var(--secondary-color,#c92a2a)" opacity="0.06" />
                        {/* 焦糖金描边圆环（圆盘构图母题） */}
                        {[0, 1, 2].map((i) => (
                            <circle
                                key={i}
                                cx="1150"
                                cy="90"
                                r={56 + i * 40}
                                fill="none"
                                stroke="var(--primary-color,#e8590c)"
                                strokeOpacity={0.12}
                                strokeWidth="2"
                            />
                        ))}
                    </svg>
                </div>

                {/* 右上角餐具点缀（叉勺图样） */}
                <div className="absolute top-7 right-9 z-10" aria-hidden="true">
                    <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                        {/* 叉子 */}
                        <path d="M16 6v10a4 4 0 0 0 4 4v22" stroke="var(--primary-color,#e8590c)" strokeOpacity="0.5" strokeWidth="2.4" strokeLinecap="round" />
                        <path d="M16 6v10M20 6v10M24 6v10" stroke="var(--primary-color,#e8590c)" strokeOpacity="0.5" strokeWidth="2.4" strokeLinecap="round" />
                        {/* 勺子 */}
                        <ellipse cx="36" cy="13" rx="6" ry="9" stroke="var(--secondary-color,#c92a2a)" strokeOpacity="0.45" strokeWidth="2.4" />
                        <path d="M36 22v20" stroke="var(--secondary-color,#c92a2a)" strokeOpacity="0.45" strokeWidth="2.4" strokeLinecap="round" />
                    </svg>
                </div>

                {/* 内容区 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="mb-8 flex items-center gap-4">
                        {/* 焦糖金圆盘标记 */}
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                            style={{
                                background: "var(--primary-color,#e8590c)",
                                boxShadow: '0 0 0 6px rgba(232,89,12,0.12)',
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <circle cx="12" cy="12" r="9" stroke="var(--primary-text,#ffffff)" strokeWidth="2" />
                                <circle cx="12" cy="12" r="3.5" fill="var(--primary-text,#ffffff)" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <div className="mt-3 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#c92a2a)" }} />
                        </div>
                    </div>

                    {/* 表格区 */}
                    <div
                        className="flex flex-1 flex-col overflow-hidden rounded-2xl border shadow-sm"
                        style={{
                            background: "var(--card-color,#fffaf2)",
                            borderColor: "var(--stroke,#f0e0cc)",
                        }}
                    >
                        {/* 表头行：主题色底 */}
                        <div
                            className="grid"
                            style={{
                                gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                                background: "var(--primary-color,#e8590c)",
                            }}
                        >
                            {headers.map((h, i) => (
                                <div
                                    key={i}
                                    className={`px-6 py-4 text-base font-bold leading-relaxed break-words ${i === 0 ? 'text-left' : 'text-center'}`}
                                    style={{
                                        color: "var(--primary-text,#ffffff)",
                                        overflowWrap: 'break-word',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {h}
                                </div>
                            ))}
                        </div>

                        {/* 数据行：斑马纹交替 */}
                        <div className="flex flex-1 flex-col">
                            {rows.map((row, ri) => (
                                <div
                                    key={ri}
                                    className="grid flex-1 items-center"
                                    style={{
                                        gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                                        background: ri % 2 === 1
                                            ? "rgba(232,89,12,0.06)"
                                            : "var(--card-color,#fffaf2)",
                                        borderTop: ri === 0 ? 'none' : '1px solid var(--stroke,#f0e0cc)',
                                    }}
                                >
                                    {Array.from({ length: colCount }).map((_, ci) => {
                                        const cell = row[ci] ?? ''
                                        const isFirst = ci === 0
                                        return (
                                            <div
                                                key={ci}
                                                className={`px-6 py-3.5 leading-relaxed break-words ${isFirst ? 'text-left text-base font-bold' : 'text-center text-base'}`}
                                                style={{
                                                    color: isFirst
                                                        ? "var(--background-text,#3b2412)"
                                                        : "var(--secondary-color,#c92a2a)",
                                                    overflowWrap: 'break-word',
                                                    wordBreak: 'break-word',
                                                }}
                                            >
                                                {cell}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
