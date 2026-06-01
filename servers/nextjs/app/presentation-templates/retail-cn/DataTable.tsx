import React from 'react'
import * as z from "zod";

export const layoutId = 'retail-cn-data-table'
export const layoutName = '数据表格'
export const layoutDescription = '电商新零售风数据表格：表头主题色撞色底、斑马纹行、潮流粗体标题与价签角标装饰。纯 CSS，离线可渲染，适用于对比表/明细表。'

const schema = z.object({
    title: z.string().min(2).max(20).default('各渠道销售对比').meta({
        description: "表格主标题（中文，简短有力）",
    }),
    headers: z.array(
        z.string().min(1).max(12).meta({ description: "表头单元格文本，如『渠道』『GMV』" })
    ).min(2).max(5).default(['销售渠道', '订单量', 'GMV', '转化率', '环比']).meta({
        description: "表头行，2~5 列",
    }),
    rows: z.array(
        z.array(
            z.string().min(1).max(16).meta({ description: "数据单元格文本" })
        ).min(2).max(5)
    ).min(2).max(6).default([
        ['直播带货', '12.8万单', '¥3,860万', '8.6%', '+42%'],
        ['短视频种草', '9.4万单', '¥2,510万', '6.1%', '+28%'],
        ['私域社群', '6.2万单', '¥1,780万', '11.3%', '+35%'],
        ['天猫旗舰店', '15.6万单', '¥4,920万', '5.4%', '+12%'],
        ['线下快闪店', '3.1万单', '¥980万', '14.2%', '+19%'],
    ]).meta({
        description: "数据行，每行是一组单元格文本，2~6 行",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DataTable: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '各渠道销售对比'
    const headers = (slideData?.headers && slideData.headers.length >= 2)
        ? slideData.headers
        : ['销售渠道', '订单量', 'GMV', '转化率', '环比']
    const rows = (slideData?.rows && slideData.rows.length >= 2)
        ? slideData.rows
        : [
            ['直播带货', '12.8万单', '¥3,860万', '8.6%', '+42%'],
            ['短视频种草', '9.4万单', '¥2,510万', '6.1%', '+28%'],
            ['私域社群', '6.2万单', '¥1,780万', '11.3%', '+35%'],
            ['天猫旗舰店', '15.6万单', '¥4,920万', '5.4%', '+12%'],
            ['线下快闪店', '3.1万单', '¥980万', '14.2%', '+19%'],
        ]

    const colCount = headers.length
    const gridTemplate = `minmax(0, 1.4fr) repeat(${Math.max(colCount - 1, 1)}, minmax(0, 1fr))`

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
                {/* 背景装饰：右上撞色大色块 + 活力几何形 */}
                <div
                    className="absolute top-0 right-0 h-[44%] w-[40%] overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, var(--primary-color,#db2777) 0%, var(--secondary-color,#f59e0b) 140%)",
                        borderBottomLeftRadius: '120px',
                        opacity: 0.10,
                    }}
                    aria-hidden="true"
                />
                <svg className="absolute -bottom-10 -left-10" width="240" height="240" viewBox="0 0 240 240" aria-hidden="true">
                    <circle cx="120" cy="120" r="118" fill="none" stroke="var(--secondary-color,#f59e0b)" strokeOpacity="0.16" strokeWidth="3" strokeDasharray="2 14" />
                    <circle cx="120" cy="120" r="78" fill="none" stroke="var(--primary-color,#db2777)" strokeOpacity="0.12" strokeWidth="14" />
                </svg>
                <div
                    className="absolute top-[18%] left-[2%] h-5 w-5 rotate-12"
                    style={{ background: "var(--secondary-color,#f59e0b)", opacity: 0.5, borderRadius: '4px' }}
                    aria-hidden="true"
                />

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区：潮流粗体 + 价签角标 */}
                    <div className="flex items-start justify-between gap-6">
                        <div className="flex flex-col">
                            <div className="mb-4 flex items-center gap-3">
                                <span
                                    className="inline-block h-9 w-2 rounded-full"
                                    style={{ background: "var(--primary-color,#db2777)" }}
                                />
                                <span
                                    className="inline-flex items-center rounded-full px-4 py-1 text-sm font-bold break-words"
                                    style={{
                                        color: "var(--primary-color,#db2777)",
                                        background: "var(--card-color,#fdf2f8)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    数据明细 · 实时同步
                                </span>
                            </div>
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>

                        {/* 价签风角标 */}
                        <div className="relative flex flex-shrink-0 items-center">
                            <span
                                className="rounded-l-xl px-5 py-3 text-lg font-black break-words"
                                style={{
                                    background: "var(--primary-color,#db2777)",
                                    color: "var(--primary-text,#ffffff)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                NEW RETAIL
                            </span>
                            <span
                                className="flex h-full items-center px-4 py-3 text-lg font-black"
                                style={{
                                    background: "var(--secondary-color,#f59e0b)",
                                    color: "var(--primary-text,#ffffff)",
                                    clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                                    paddingRight: '20px',
                                }}
                            >
                                ¥
                            </span>
                        </div>
                    </div>

                    {/* 表格区：圆角卡片包裹 */}
                    <div
                        className="mt-8 flex flex-1 flex-col overflow-hidden rounded-2xl border"
                        style={{ borderColor: "var(--stroke,#fbcfe8)", background: "var(--card-color,#fdf2f8)" }}
                    >
                        {/* 表头：主题色撞色底 */}
                        <div
                            className="grid items-center"
                            style={{
                                gridTemplateColumns: gridTemplate,
                                background: "linear-gradient(90deg, var(--primary-color,#db2777) 0%, var(--secondary-color,#f59e0b) 180%)",
                            }}
                        >
                            {headers.map((h, ci) => (
                                <div
                                    key={ci}
                                    className={`px-6 py-4 text-base font-black break-words ${ci === 0 ? 'text-left' : 'text-right'}`}
                                    style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {h}
                                </div>
                            ))}
                        </div>

                        {/* 数据行：斑马纹 */}
                        <div className="flex flex-1 flex-col">
                            {rows.map((row, ri) => (
                                <div
                                    key={ri}
                                    className="grid flex-1 items-center"
                                    style={{
                                        gridTemplateColumns: gridTemplate,
                                        background: ri % 2 === 1 ? "var(--background-color,#ffffff)" : "transparent",
                                        borderTop: ri === 0 ? 'none' : '1px solid var(--stroke,#fbcfe8)',
                                    }}
                                >
                                    {Array.from({ length: colCount }).map((_, ci) => {
                                        const cell = row[ci] ?? ''
                                        const isFirst = ci === 0
                                        return (
                                            <div
                                                key={ci}
                                                className={`px-6 py-3 break-words leading-relaxed ${isFirst ? 'text-left' : 'text-right'}`}
                                                style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {isFirst ? (
                                                    <span
                                                        className="inline-flex items-center gap-2 text-base font-bold"
                                                        style={{ color: "var(--background-text,#18181b)" }}
                                                    >
                                                        <span
                                                            className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-sm rotate-45"
                                                            style={{ background: "var(--primary-color,#db2777)" }}
                                                        />
                                                        {cell}
                                                    </span>
                                                ) : (
                                                    <span
                                                        className="text-base font-bold"
                                                        style={{
                                                            color: ci === colCount - 1
                                                                ? "var(--primary-color,#db2777)"
                                                                : "var(--background-text,#18181b)",
                                                        }}
                                                    >
                                                        {cell}
                                                    </span>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 底部备注条 */}
                    <div className="mt-5 flex items-center gap-2 text-sm leading-relaxed break-words"
                        style={{ color: "var(--background-text,#18181b)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        <span
                            className="inline-block h-2 w-2 rounded-full"
                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                        />
                        数据来源：全渠道数据中台 · 单位以页内标注为准
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
