import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'education-cn-icon-list'
export const layoutName = '图标要点列表'
export const layoutDescription = '教育培训风图标要点列表：左侧标题与圆点/书本装饰，右侧 4-6 条「左圆角图标 + 右文字」竖向卡片列表。明亮米白配活力橙蓝，圆角友好。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('高效学习四步法').meta({
        description: "版式主标题（中文，简短，如『核心学习要点』）",
    }),
    items: z.array(z.object({
        icon: IconSchema.meta({ description: "要点图标" }),
        title: z.string().min(2).max(14).meta({ description: "要点小标题（中文，简短）" }),
        desc: z.string().min(2).max(40).meta({ description: "要点说明（中文，一句话）" }),
    })).min(4).max(6).default([
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg",
                __icon_query__: "open book reading",
            },
            title: '主动预习',
            desc: '课前通读教材，标注疑点，带着问题进入课堂。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg",
                __icon_query__: "lightbulb idea",
            },
            title: '深度思考',
            desc: '多问为什么，建立知识之间的关联与逻辑结构。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/pencil-bold.svg",
                __icon_query__: "pencil writing practice",
            },
            title: '及时练习',
            desc: '趁热打铁完成习题，把知识转化为解题能力。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg",
                __icon_query__: "growth chart progress",
            },
            title: '复盘提升',
            desc: '定期回顾错题与笔记，持续优化学习方法。',
        },
    ]).meta({ description: "要点列表，4-6 条，每条含图标、小标题与说明" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK_ITEMS = [
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg",
            __icon_query__: "open book reading",
        },
        title: '主动预习',
        desc: '课前通读教材，标注疑点，带着问题进入课堂。',
    },
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg",
            __icon_query__: "lightbulb idea",
        },
        title: '深度思考',
        desc: '多问为什么，建立知识之间的关联与逻辑结构。',
    },
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/pencil-bold.svg",
            __icon_query__: "pencil writing practice",
        },
        title: '及时练习',
        desc: '趁热打铁完成习题，把知识转化为解题能力。',
    },
    {
        icon: {
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg",
            __icon_query__: "growth chart progress",
        },
        title: '复盘提升',
        desc: '定期回顾错题与笔记，持续优化学习方法。',
    },
]

const IconList: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '高效学习四步法'
    const rawItems = (slideData?.items && slideData.items.length > 0) ? slideData.items : FALLBACK_ITEMS
    const items = rawItems.slice(0, 6)

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
                {/* 背景装饰层：成长曲线 + 圆点 + 光晕，营造明亮活力气质 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <radialGradient id="eduIconGlowA" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="eduIconGlowB" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <circle cx="120" cy="120" r="220" fill="url(#eduIconGlowA)" />
                    <circle cx="1180" cy="640" r="260" fill="url(#eduIconGlowB)" />
                    {/* 成长曲线母题 */}
                    <path d="M-40 600 C 180 560, 300 420, 460 400 S 720 320, 900 220 S 1180 120, 1320 90"
                        fill="none" stroke="var(--primary-color,#2563eb)" strokeOpacity="0.08" strokeWidth="3" />
                    <path d="M-40 660 C 200 620, 340 500, 520 470 S 820 380, 1000 280 S 1240 180, 1320 150"
                        fill="none" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.07" strokeWidth="3" />
                    {/* 圆点装饰母题 */}
                    {[
                        { x: 80, y: 470, r: 6, c: 'var(--secondary-color,#f97316)', o: 0.5 },
                        { x: 132, y: 510, r: 4, c: 'var(--primary-color,#2563eb)', o: 0.45 },
                        { x: 50, y: 540, r: 5, c: 'var(--primary-color,#2563eb)', o: 0.35 },
                        { x: 1150, y: 110, r: 6, c: 'var(--secondary-color,#f97316)', o: 0.5 },
                        { x: 1200, y: 160, r: 4, c: 'var(--primary-color,#2563eb)', o: 0.45 },
                        { x: 1100, y: 70, r: 5, c: 'var(--secondary-color,#f97316)', o: 0.3 },
                    ].map((d, i) => (
                        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} fillOpacity={d.o} />
                    ))}
                </svg>

                <div className="relative z-10 flex h-full px-14 py-12 gap-10">
                    {/* 左侧：标题 + 书本装饰 */}
                    <div className="flex w-[30%] flex-shrink-0 flex-col justify-center">
                        <span
                            className="mb-4 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-semibold break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            学习要点
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-5 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />

                        {/* 书本 + 灯泡装饰图形 */}
                        <div className="mt-10 flex items-end gap-4" aria-hidden="true">
                            <svg viewBox="0 0 96 80" className="w-28 h-24">
                                {/* 书本母题 */}
                                <path d="M8 18 C 24 10, 40 10, 48 16 L 48 70 C 40 64, 24 64, 8 72 Z"
                                    fill="var(--primary-color,#2563eb)" fillOpacity="0.16"
                                    stroke="var(--primary-color,#2563eb)" strokeOpacity="0.55" strokeWidth="2" strokeLinejoin="round" />
                                <path d="M88 18 C 72 10, 56 10, 48 16 L 48 70 C 56 64, 72 64, 88 72 Z"
                                    fill="var(--secondary-color,#f97316)" fillOpacity="0.16"
                                    stroke="var(--secondary-color,#f97316)" strokeOpacity="0.55" strokeWidth="2" strokeLinejoin="round" />
                                <line x1="48" y1="16" x2="48" y2="70" stroke="var(--background-text,#1f2937)" strokeOpacity="0.25" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>

                    {/* 右侧：图标要点列表，竖向自适应分布 */}
                    <div className="flex flex-1 flex-col justify-center gap-3.5 min-w-0">
                        {items.map((item, i) => {
                            const accent = i % 2 === 0 ? "var(--primary-color,#2563eb)" : "var(--secondary-color,#f97316)"
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-5 rounded-2xl border px-5 py-4 shadow-sm min-w-0"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#f1e9d8)",
                                    }}
                                >
                                    {/* 左圆角图标 */}
                                    <div
                                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                        style={{ background: accent }}
                                    >
                                        <RemoteSvgIcon
                                            url={item?.icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-6 h-6"
                                            title={item?.icon?.__icon_query__ || 'icon'}
                                        />
                                    </div>

                                    {/* 右文字 */}
                                    <div className="flex flex-col min-w-0">
                                        <span
                                            className="text-lg font-bold leading-[1.4] break-words"
                                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.title || '学习要点'}
                                        </span>
                                        <span
                                            className="text-sm leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#1f2937)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.desc || '简明扼要的要点说明文字。'}
                                        </span>
                                    </div>

                                    {/* 行尾序号圆点装饰 */}
                                    <div
                                        className="ml-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                                        style={{ background: "rgba(37,99,235,0.08)", color: accent }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default IconList
