import React from 'react'
import * as z from "zod";

export const layoutId = 'realestate-cn-data-table'
export const layoutName = '数据表格'
export const layoutDescription = '房产建筑风数据表格：表头主题色金铜底，斑马纹行，细线分隔与建筑剪影装饰。适用于户型对比、楼盘明细等结构化数据。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('在售楼盘明细对比').meta({
        description: "表格主标题（中文，简短，如『户型价格明细』）",
    }),
    subtitle: z.string().min(2).max(28).default('数据截至 2026 年第二季度').meta({
        description: "标题下方的补充说明或数据口径",
    }),
    headers: z.array(
        z.string().min(1).max(12).meta({ description: "表头列名，如『项目』『均价』" })
    ).min(2).max(5).default([
        '楼盘项目', '建筑面积', '参考均价', '交付时间', '物业类型',
    ]).meta({ description: "表头列名列表（2-5 列）" }),
    rows: z.array(
        z.array(
            z.string().min(1).max(16).meta({ description: "单元格内容（中文，简短）" })
        )
    ).min(2).max(6).default([
        ['云澜雅苑', '89-128㎡', '4.6 万/㎡', '2027 年 6 月', '高层住宅'],
        ['江望府邸', '140-210㎡', '6.2 万/㎡', '2026 年 12 月', '叠拼别墅'],
        ['锦城天阶', '76-105㎡', '3.8 万/㎡', '2028 年 3 月', '小高层'],
        ['翠湖名邸', '160-260㎡', '7.5 万/㎡', '2027 年 9 月', '独栋别墅'],
        ['未来公元', '52-88㎡', '3.2 万/㎡', '2026 年 9 月', '城市公寓'],
    ]).meta({ description: "表格行数据，每行单元格数量应与表头一致（2-6 行）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DataTable: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '在售楼盘明细对比'
    const subtitle = slideData?.subtitle || '数据截至 2026 年第二季度'
    const headers = (slideData?.headers && slideData.headers.length > 0)
        ? slideData.headers
        : ['楼盘项目', '建筑面积', '参考均价', '交付时间', '物业类型']
    const rows = (slideData?.rows && slideData.rows.length > 0)
        ? slideData.rows
        : [
            ['云澜雅苑', '89-128㎡', '4.6 万/㎡', '2027 年 6 月', '高层住宅'],
            ['江望府邸', '140-210㎡', '6.2 万/㎡', '2026 年 12 月', '叠拼别墅'],
            ['锦城天阶', '76-105㎡', '3.8 万/㎡', '2028 年 3 月', '小高层'],
            ['翠湖名邸', '160-260㎡', '7.5 万/㎡', '2027 年 9 月', '独栋别墅'],
            ['未来公元', '52-88㎡', '3.2 万/㎡', '2026 年 9 月', '城市公寓'],
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
                    background: "var(--background-color,#f4f4f5)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：极简建筑剪影 + 细线 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="reTableSkyline" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* 底部建筑剪影 */}
                    <g fill="url(#reTableSkyline)">
                        <rect x="40" y="560" width="70" height="160" />
                        <rect x="120" y="500" width="56" height="220" />
                        <rect x="186" y="600" width="44" height="120" />
                        <rect x="1010" y="540" width="60" height="180" />
                        <rect x="1080" y="480" width="50" height="240" />
                        <rect x="1140" y="590" width="58" height="130" />
                        <rect x="1206" y="540" width="40" height="180" />
                    </g>
                    {/* 细分割线 / 极简线条母题 */}
                    <line x1="0" y1="640" x2="1280" y2="640" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                    <line x1="64" y1="0" x2="64" y2="720" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" strokeOpacity="0.5" />
                </svg>

                {/* 右上角金铜点缀角标 */}
                <div className="absolute top-0 right-0 z-10 flex items-start">
                    <div
                        className="h-1.5 w-28"
                        style={{ background: "var(--primary-color,#b08d57)" }}
                    />
                </div>

                {/* 主内容：超大留白 + 细线分隔 */}
                <div className="relative z-10 flex h-full flex-col px-20 py-12">
                    {/* 抬头区 */}
                    <div className="flex items-end justify-between">
                        <div className="flex flex-col">
                            <span
                                className="mb-3 inline-flex items-center gap-2 text-xs font-medium tracking-wide break-words"
                                style={{
                                    color: "var(--primary-color,#b08d57)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                <span
                                    className="inline-block h-px w-8"
                                    style={{ background: "var(--primary-color,#b08d57)" }}
                                />
                                REAL ESTATE
                            </span>
                            <h1
                                className="text-4xl font-light leading-[1.25] break-words"
                                style={{
                                    color: "var(--background-text,#27272a)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {title}
                            </h1>
                        </div>
                        <p
                            className="ml-6 max-w-[18rem] text-right text-sm font-light leading-relaxed break-words"
                            style={{
                                color: "var(--secondary-color,#3f3f46)",
                                opacity: 0.75,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {subtitle}
                        </p>
                    </div>

                    {/* 标题下细分割线 */}
                    <div
                        className="mt-6 h-px w-full"
                        style={{ background: "var(--stroke,#e4e4e7)" }}
                    />

                    {/* 表格主体 */}
                    <div
                        className="mt-7 flex flex-1 flex-col overflow-hidden rounded-sm border"
                        style={{
                            background: "var(--card-color,#ffffff)",
                            borderColor: "var(--stroke,#e4e4e7)",
                        }}
                    >
                        {/* 表头：主题色金铜底 */}
                        <div
                            className="grid"
                            style={{
                                gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                                background: "var(--primary-color,#b08d57)",
                            }}
                        >
                            {headers.map((h, ci) => (
                                <div
                                    key={ci}
                                    className="px-6 py-4 text-sm font-medium leading-relaxed break-words"
                                    style={{
                                        color: "var(--primary-text,#ffffff)",
                                        textAlign: ci === 0 ? 'left' : 'center',
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {h}
                                </div>
                            ))}
                        </div>

                        {/* 表格行：斑马纹 */}
                        <div className="flex flex-1 flex-col">
                            {rows.map((row, ri) => (
                                <div
                                    key={ri}
                                    className="grid flex-1 items-center"
                                    style={{
                                        gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                                        background: ri % 2 === 1
                                            ? "var(--background-color,#f4f4f5)"
                                            : "var(--card-color,#ffffff)",
                                        borderTop: ri === 0 ? 'none' : "1px solid var(--stroke,#e4e4e7)",
                                    }}
                                >
                                    {Array.from({ length: colCount }).map((_, ci) => {
                                        const cell = row[ci] ?? ''
                                        const isFirst = ci === 0
                                        return (
                                            <div
                                                key={ci}
                                                className="px-6 py-3 text-sm leading-relaxed break-words"
                                                style={{
                                                    color: isFirst
                                                        ? "var(--background-text,#27272a)"
                                                        : "var(--secondary-color,#3f3f46)",
                                                    fontWeight: isFirst ? 500 : 300,
                                                    textAlign: isFirst ? 'left' : 'center',
                                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                                }}
                                            >
                                                {isFirst && (
                                                    <span
                                                        className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
                                                        style={{ background: "var(--primary-color,#b08d57)" }}
                                                    />
                                                )}
                                                <span className="align-middle">{cell}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 底部脚注：极简线条 + 说明 */}
                    <div className="mt-5 flex items-center gap-3">
                        <span
                            className="inline-block h-px flex-1"
                            style={{ background: "var(--stroke,#e4e4e7)" }}
                        />
                        <span
                            className="text-xs font-light tracking-wide break-words"
                            style={{
                                color: "var(--secondary-color,#3f3f46)",
                                opacity: 0.6,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            以上数据仅供参考 · 最终以官方公示为准
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
