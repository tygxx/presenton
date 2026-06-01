import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'culture-cn-icon-list'
export const layoutName = '图标要点列表'
export const layoutDescription = '国潮文创风图标要点列表：宣纸米黄底配朱砂红印章与描金边，左图标右文字竖向排布 4-6 条要点。水墨笔触与传统纹样点缀，纯 CSS/SVG 装饰，离线可渲染。'

const ICON_BASE = 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold'

const schema = z.object({
    title: z.string().min(2).max(20).default('国潮文创核心理念').meta({
        description: "版式主标题（中文，简短有力，体现东方文化底蕴）",
    }),
    items: z.array(z.object({
        icon: IconSchema.default({
            __icon_url__: `${ICON_BASE}/yin-yang-bold.svg`,
            __icon_query__: 'oriental culture',
        }).meta({ description: "要点配图标（phosphor 图标）" }),
        title: z.string().min(2).max(14).meta({ description: "要点小标题（中文，简短）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点说明文字（中文，一句话）" }),
    })).min(4).max(6).default([
        {
            icon: { __icon_url__: `${ICON_BASE}/feather-bold.svg`, __icon_query__: 'ink brush' },
            title: '匠心传承',
            desc: '以传统工艺为根，延续千年东方美学神韵。',
        },
        {
            icon: { __icon_url__: `${ICON_BASE}/yin-yang-bold.svg`, __icon_query__: 'harmony' },
            title: '古今相融',
            desc: '让经典纹样与现代审美相遇，焕发新生。',
        },
        {
            icon: { __icon_url__: `${ICON_BASE}/flower-lotus-bold.svg`, __icon_query__: 'lotus' },
            title: '雅致格调',
            desc: '朱砂墨黑描金留白，营造东方雅趣意境。',
        },
        {
            icon: { __icon_url__: `${ICON_BASE}/scroll-bold.svg`, __icon_query__: 'scroll heritage' },
            title: '文化叙事',
            desc: '每件文创承载一段故事，传递人文温度。',
        },
        {
            icon: { __icon_url__: `${ICON_BASE}/seal-bold.svg`, __icon_query__: 'seal stamp' },
            title: '原创印记',
            desc: '独立设计与版权保护，铸就国潮品牌力。',
        },
    ]).meta({ description: "要点列表（4-6 条，左图标右文字）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK_ITEMS: SlideData['items'] = [
    {
        icon: { __icon_url__: `${ICON_BASE}/feather-bold.svg`, __icon_query__: 'ink brush' },
        title: '匠心传承',
        desc: '以传统工艺为根，延续千年东方美学神韵。',
    },
    {
        icon: { __icon_url__: `${ICON_BASE}/yin-yang-bold.svg`, __icon_query__: 'harmony' },
        title: '古今相融',
        desc: '让经典纹样与现代审美相遇，焕发新生。',
    },
    {
        icon: { __icon_url__: `${ICON_BASE}/flower-lotus-bold.svg`, __icon_query__: 'lotus' },
        title: '雅致格调',
        desc: '朱砂墨黑描金留白，营造东方雅趣意境。',
    },
    {
        icon: { __icon_url__: `${ICON_BASE}/scroll-bold.svg`, __icon_query__: 'scroll heritage' },
        title: '文化叙事',
        desc: '每件文创承载一段故事，传递人文温度。',
    },
]

const IconList: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '国潮文创核心理念'
    const items = (slideData?.items && slideData.items.length > 0 ? slideData.items : FALLBACK_ITEMS).slice(0, 6)

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
                {/* 背景装饰层：宣纸纹理 + 水墨笔触 + 描金边框 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="cultIlPaper" cx="22%" cy="18%" r="95%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                                <stop offset="55%" stopColor="#f5ecd9" stopOpacity="0" />
                                <stop offset="100%" stopColor="#e7d9ba" stopOpacity="0.35" />
                            </radialGradient>
                            <linearGradient id="cultIlInk" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.08" />
                                <stop offset="100%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#cultIlPaper)" />
                        {/* 右上角水墨晕染笔触 */}
                        <path d="M1120 -40 C1230 60 1240 220 1150 300 C1080 360 980 320 1000 220 C1015 140 1060 60 1120 -40 Z" fill="url(#cultIlInk)" />
                        <path d="M1180 120 C1240 180 1230 280 1150 300 C1110 310 1090 260 1110 220 C1130 180 1160 150 1180 120 Z" fill="var(--secondary-color,#1a1a1a)" fillOpacity="0.05" />
                        {/* 左下角传统回纹／远山笔触 */}
                        <path d="M-40 700 C120 600 260 660 360 600 C420 564 470 600 480 680 L480 760 L-40 760 Z" fill="var(--secondary-color,#1a1a1a)" fillOpacity="0.04" />
                    </svg>
                    {/* 描金内边框 */}
                    <div
                        className="absolute inset-5 rounded-sm"
                        style={{ border: '1px solid var(--stroke,#ddd0b4)', boxShadow: 'inset 0 0 0 3px rgba(192,57,43,0.05)' }}
                    />
                    {/* 描金细线点缀 */}
                    <div
                        className="absolute"
                        style={{ left: '20px', top: '20px', width: '54px', height: '54px', borderTop: '2px solid #c9a24b', borderLeft: '2px solid #c9a24b', opacity: 0.7 }}
                    />
                    <div
                        className="absolute"
                        style={{ right: '20px', bottom: '20px', width: '54px', height: '54px', borderBottom: '2px solid #c9a24b', borderRight: '2px solid #c9a24b', opacity: 0.7 }}
                    />
                </div>

                {/* 右上角印章红块 */}
                <div
                    className="absolute z-10 flex items-center justify-center rounded-[6px]"
                    style={{
                        top: '38px', right: '52px', width: '60px', height: '60px',
                        background: "var(--primary-color,#c0392b)",
                        boxShadow: '0 6px 18px rgba(192,57,43,0.30)',
                    }}
                >
                    <div className="flex flex-col items-center justify-center leading-[1.2]" style={{ color: "var(--primary-text,#ffffff)" }}>
                        <span className="text-base font-black break-words" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>国潮</span>
                        <span className="text-base font-black break-words" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>文创</span>
                    </div>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col pr-28">
                        <div className="flex items-center gap-3">
                            <span className="inline-block h-7 w-1.5 rounded-full" style={{ background: "var(--primary-color,#c0392b)" }} />
                            <span
                                className="text-sm font-medium tracking-wide break-words"
                                style={{ color: "var(--primary-color,#c0392b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                匠 · 心 · 传 · 承
                            </span>
                        </div>
                        <h1
                            className="mt-3 text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-4 flex items-center gap-3">
                            <span className="h-px w-16" style={{ background: 'linear-gradient(90deg, #c9a24b, rgba(201,162,75,0))' }} />
                            <span className="text-xl" style={{ color: '#c9a24b' }} aria-hidden="true">◆</span>
                            <span className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(201,162,75,0.5), rgba(201,162,75,0))' }} />
                        </div>
                    </div>

                    {/* 要点列表：竖向，左图标右文字 */}
                    <div className="mt-6 flex flex-1 flex-col justify-center gap-4">
                        {items.map((item, i) => {
                            const it = item || FALLBACK_ITEMS[i % FALLBACK_ITEMS.length]
                            const idx = String(i + 1).padStart(2, '0')
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-5 rounded-xl border px-6 py-4"
                                    style={{
                                        background: "var(--card-color,#fbf5e9)",
                                        borderColor: "var(--stroke,#ddd0b4)",
                                        boxShadow: '0 2px 10px rgba(43,43,43,0.04)',
                                    }}
                                >
                                    {/* 左侧：朱砂印章式图标 */}
                                    <div className="relative flex flex-shrink-0 items-center justify-center">
                                        <div
                                            className="flex items-center justify-center rounded-[10px]"
                                            style={{
                                                width: '52px', height: '52px',
                                                background: "var(--primary-color,#c0392b)",
                                                boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.18)',
                                            }}
                                        >
                                            <RemoteSvgIcon
                                                url={it?.icon?.__icon_url__ || `${ICON_BASE}/yin-yang-bold.svg`}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-6 h-6"
                                                title={it?.icon?.__icon_query__ || 'oriental culture'}
                                            />
                                        </div>
                                        {/* 描金序号角标 */}
                                        <span
                                            className="absolute -left-2 -top-2 flex items-center justify-center rounded-full text-[10px] font-bold"
                                            style={{
                                                width: '20px', height: '20px',
                                                background: "var(--background-color,#f5ecd9)",
                                                color: '#a8852f',
                                                border: '1px solid #c9a24b',
                                            }}
                                        >
                                            {idx}
                                        </span>
                                    </div>

                                    {/* 右侧：文字 */}
                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <h3
                                            className="text-lg font-bold leading-[1.6] break-words"
                                            style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {it?.title || '匠心传承'}
                                        </h3>
                                        <p
                                            className="text-sm leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {it?.desc || '以传统工艺为根，延续千年东方美学神韵。'}
                                        </p>
                                    </div>

                                    {/* 装饰：右侧竖向墨点分隔 */}
                                    <span
                                        className="flex-shrink-0 text-lg leading-none"
                                        style={{ color: 'rgba(192,57,43,0.30)' }}
                                        aria-hidden="true"
                                    >
                                        ❘
                                    </span>
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
