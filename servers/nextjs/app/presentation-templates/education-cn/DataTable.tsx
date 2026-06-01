import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { IconSchema } from '../defaultSchemes';

export const layoutId = 'education-cn-data-table'
export const layoutName = '数据表格'
export const layoutDescription = '教育培训风数据表格：表头主题色底、内容斑马纹、圆角卡片承载。配书本/灯泡/成长曲线圆点装饰，纯 CSS/SVG，离线可渲染。适合课程对比、成绩明细等表格内容。'

const schema = z.object({
    title: z.string().min(2).max(20).default('课程班型对比').meta({
        description: "表格主标题（中文，简短，如『课程班型对比』）",
    }),
    subtitle: z.string().min(2).max(28).default('帮助学员按需选择最合适的学习方案').meta({
        description: "标题下方一句话说明",
    }),
    icon: IconSchema.default({
        __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/graduation-cap-bold.svg",
        __icon_query__: "graduation cap",
    }).meta({
        description: "标题左侧的装饰图标",
    }),
    headers: z.array(z.string().min(1).max(12).meta({ description: "表头单元格文本（中文，简短）" }))
        .min(2).max(5)
        .default(['对比维度', '基础班', '进阶班', '冲刺班'])
        .meta({ description: "表头行，第一列建议为维度名称" }),
    rows: z.array(
        z.array(z.string().min(1).max(16).meta({ description: "单元格文本（中文，简短）" }))
            .min(2).max(5)
    )
        .min(2).max(6)
        .default([
            ['课时安排', '40 课时', '80 课时', '120 课时'],
            ['班级人数', '30 人', '20 人', '10 人'],
            ['专属辅导', '每周答疑', '一对一答疑', '全程陪伴'],
            ['配套讲义', '电子讲义', '纸质讲义', '定制讲义'],
            ['模拟测评', '月度测评', '双周测评', '每周测评'],
        ])
        .meta({ description: "表格数据行，每行列数应与表头一致" }),
    footnote: z.string().min(2).max(30).default('数据为示例，最终以实际开班安排为准').meta({
        description: "表格底部的备注/数据来源说明",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DataTable: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '课程班型对比'
    const subtitle = slideData?.subtitle || '帮助学员按需选择最合适的学习方案'
    const icon = slideData?.icon || {
        __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/graduation-cap-bold.svg",
        __icon_query__: "graduation cap",
    }
    const headers = (slideData?.headers && slideData.headers.length >= 2)
        ? slideData.headers
        : ['对比维度', '基础班', '进阶班', '冲刺班']
    const rows = (slideData?.rows && slideData.rows.length >= 2)
        ? slideData.rows
        : [
            ['课时安排', '40 课时', '80 课时', '120 课时'],
            ['班级人数', '30 人', '20 人', '10 人'],
            ['专属辅导', '每周答疑', '一对一答疑', '全程陪伴'],
            ['配套讲义', '电子讲义', '纸质讲义', '定制讲义'],
            ['模拟测评', '月度测评', '双周测评', '每周测评'],
        ]
    const footnote = slideData?.footnote || '数据为示例，最终以实际开班安排为准'
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
                    background: "var(--background-color,#fffdf7)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：成长曲线 + 圆点 + 光晕 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="eduTableGrowth" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.35" />
                            </linearGradient>
                            <radialGradient id="eduTableGlow" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 右上角光晕 */}
                        <circle cx="1180" cy="20" r="220" fill="url(#eduTableGlow)" />
                        {/* 左下角成长曲线母题 */}
                        <path
                            d="M -20 700 C 180 660 280 520 420 540 C 560 560 640 460 760 470"
                            fill="none"
                            stroke="url(#eduTableGrowth)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeOpacity="0.6"
                        />
                        {/* 圆点装饰 */}
                        {[
                            { cx: 70, cy: 96, r: 6, c: 'var(--secondary-color,#f97316)', o: 0.55 },
                            { cx: 1130, cy: 120, r: 8, c: 'var(--primary-color,#2563eb)', o: 0.4 },
                            { cx: 1200, cy: 640, r: 7, c: 'var(--secondary-color,#f97316)', o: 0.45 },
                            { cx: 40, cy: 360, r: 5, c: 'var(--primary-color,#2563eb)', o: 0.35 },
                        ].map((d, i) => (
                            <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.c} fillOpacity={d.o} />
                        ))}
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部标题区 */}
                    <div className="flex items-center gap-4">
                        <div
                            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm"
                            style={{ background: "var(--primary-color,#2563eb)" }}
                        >
                            <RemoteSvgIcon
                                url={icon.__icon_url__}
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-7 h-7"
                                title={icon.__icon_query__}
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-3xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <p
                                className="mt-1.5 text-base leading-relaxed break-words"
                                style={{ color: "var(--background-text,#1f2937)", opacity: 0.66, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {subtitle}
                            </p>
                        </div>
                        {/* 右上角书本+灯泡装饰角标 */}
                        <div className="ml-auto flex items-center gap-2.5">
                            <span
                                className="flex h-10 w-10 items-center justify-center rounded-xl"
                                style={{ background: "var(--card-color,#ffffff)", border: "1px solid var(--stroke,#f1e9d8)" }}
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                                    {/* 书本母题 */}
                                    <path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5C4.7 19 4 18.3 4 17.5V5.5Z" fill="var(--primary-color,#2563eb)" fillOpacity="0.85" />
                                    <path d="M20 5.5C20 4.7 19.3 4 18.5 4H13v15h5.5c.8 0 1.5-.7 1.5-1.5V5.5Z" fill="var(--primary-color,#2563eb)" fillOpacity="0.45" />
                                </svg>
                            </span>
                            <span
                                className="flex h-10 w-10 items-center justify-center rounded-xl"
                                style={{ background: "var(--secondary-color,#f97316)" }}
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                                    {/* 灯泡母题 */}
                                    <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z" fill="var(--primary-text,#ffffff)" fillOpacity="0.95" />
                                    <rect x="9.6" y="17.6" width="4.8" height="1.8" rx="0.9" fill="var(--primary-text,#ffffff)" fillOpacity="0.8" />
                                    <rect x="10.2" y="20" width="3.6" height="1.6" rx="0.8" fill="var(--primary-text,#ffffff)" fillOpacity="0.6" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    {/* 主标题与表格之间的分隔小条 */}
                    <div className="mt-5 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />

                    {/* 表格卡片 */}
                    <div
                        className="mt-6 flex flex-1 flex-col rounded-3xl p-3 shadow-sm"
                        style={{ background: "var(--card-color,#ffffff)", border: "1px solid var(--stroke,#f1e9d8)" }}
                    >
                        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl">
                            {/* 表头行 */}
                            <div
                                className="grid"
                                style={{
                                    gridTemplateColumns: `1.3fr repeat(${Math.max(colCount - 1, 1)}, 1fr)`,
                                    background: "var(--primary-color,#2563eb)",
                                }}
                            >
                                {headers.map((h, ci) => (
                                    <div
                                        key={ci}
                                        className={`flex items-center px-5 py-4 ${ci === 0 ? 'justify-start' : 'justify-center'}`}
                                    >
                                        <span
                                            className={`text-base font-bold leading-relaxed break-words ${ci === 0 ? 'text-left' : 'text-center'}`}
                                            style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {h}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* 数据行：斑马纹 */}
                            {rows.map((row, ri) => (
                                <div
                                    key={ri}
                                    className="grid flex-1"
                                    style={{
                                        gridTemplateColumns: `1.3fr repeat(${Math.max(colCount - 1, 1)}, 1fr)`,
                                        background: ri % 2 === 1 ? "var(--background-color,#fffdf7)" : "var(--card-color,#ffffff)",
                                        borderTop: ri === 0 ? 'none' : "1px solid var(--stroke,#f1e9d8)",
                                    }}
                                >
                                    {Array.from({ length: colCount }).map((_, ci) => {
                                        const cell = row[ci] ?? ''
                                        const isFirst = ci === 0
                                        return (
                                            <div
                                                key={ci}
                                                className={`flex items-center px-5 py-3 ${isFirst ? 'justify-start' : 'justify-center'}`}
                                            >
                                                <span
                                                    className={`text-[15px] leading-relaxed break-words ${isFirst ? 'text-left font-semibold' : 'text-center font-normal'}`}
                                                    style={{
                                                        color: isFirst ? "var(--primary-color,#2563eb)" : "var(--background-text,#1f2937)",
                                                        opacity: isFirst ? 1 : 0.92,
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
                            ))}
                        </div>
                    </div>

                    {/* 底部备注 */}
                    <div className="mt-4 flex items-center gap-2">
                        <span
                            className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />
                        <span
                            className="text-xs leading-relaxed break-words"
                            style={{ color: "var(--background-text,#1f2937)", opacity: 0.55, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {footnote}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataTable
