import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'retail-cn-icon-list'
export const layoutName = '图标要点列表'
export const layoutDescription = '电商新零售风图标要点列表：撞色大色块 + 圆角卡片 + 价签角标，左图标右文字的竖向 4-6 条要点列表。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('新零售增长引擎').meta({
        description: "版式主标题（中文，潮流有力，建议≤20字）",
    }),
    items: z.array(z.object({
        icon: IconSchema.default({
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shopping-cart-bold.svg",
            __icon_query__: "shopping cart",
        }).meta({ description: "要点图标" }),
        title: z.string().min(2).max(14).meta({ description: "要点小标题（中文，建议≤14字）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点说明（一句话，建议≤40字）" }),
    })).min(4).max(6).default([
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shopping-cart-bold.svg",
                __icon_query__: "shopping cart",
            },
            title: '全渠道融合',
            desc: '线上线下一盘货，会员资产打通，触点无缝衔接。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/tag-bold.svg",
                __icon_query__: "price tag",
            },
            title: '智能定价',
            desc: '动态价签与促销引擎，毛利与转化双线兼顾。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/truck-bold.svg",
                __icon_query__: "delivery truck",
            },
            title: '极速履约',
            desc: '前置仓加同城配送，三十分钟送达体验拉满。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg",
                __icon_query__: "membership community",
            },
            title: '会员运营',
            desc: '私域社群精细分层，复购与口碑持续滚雪球。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg",
                __icon_query__: "data growth",
            },
            title: '数据驱动',
            desc: '消费者画像实时洞察，选品与货架千人千面。',
        },
    ]).meta({ description: "要点列表，竖向 4-6 条，每条含图标、小标题与说明" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ACCENTS = [
    "var(--primary-color,#db2777)",
    "var(--secondary-color,#f59e0b)",
]

const IconList: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '新零售增长引擎'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : ((schema.shape.items as any)._def.defaultValue as SlideData['items'])

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
                {/* 背景装饰：撞色活力几何形 + 光晕 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="retailIconGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#db2777)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.04" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#retailIconGlow)" />
                        {/* 左上撞色大色块 */}
                        <rect x="-90" y="-120" width="430" height="430" rx="60" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.10" transform="rotate(-12 125 95)" />
                        {/* 右下活力圆点矩阵 */}
                        {[0, 1, 2, 3].map((r) => (
                            [0, 1, 2, 3].map((c) => (
                                <circle key={`${r}-${c}`} cx={1140 + c * 34} cy={560 + r * 34} r="4" fill="var(--primary-color,#db2777)" fillOpacity="0.18" />
                            ))
                        ))}
                    </svg>
                </div>

                {/* 左下角撞色斜切块 */}
                <div
                    className="absolute bottom-0 left-0 z-0"
                    style={{
                        width: '260px', height: '160px',
                        background: "var(--primary-color,#db2777)", opacity: 0.06,
                        clipPath: 'polygon(0 30%, 100% 100%, 0 100%)',
                    }}
                />

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 头部：撞色色块标签 + 大标题 */}
                    <div className="flex flex-shrink-0 items-center gap-4">
                        <span
                            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-black"
                            style={{
                                background: "var(--primary-color,#db2777)",
                                color: "var(--primary-text,#ffffff)",
                                boxShadow: '0 8px 20px rgba(219,39,119,0.28)',
                            }}
                        >
                            ¥
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                    </div>
                    <div
                        className="mt-4 h-1.5 w-24 flex-shrink-0 rounded-full"
                        style={{ background: "var(--secondary-color,#f59e0b)" }}
                    />

                    {/* 竖向要点卡片列表 */}
                    <div className="mt-8 flex min-h-0 flex-1 flex-col justify-center gap-4">
                        {items.map((item, i) => {
                            const accent = ACCENTS[i % ACCENTS.length]
                            return (
                                <div
                                    key={i}
                                    className="relative flex items-center gap-5 rounded-2xl border px-6 py-4 shadow-sm"
                                    style={{
                                        background: "var(--card-color,#fdf2f8)",
                                        borderColor: "var(--stroke,#fbcfe8)",
                                    }}
                                >
                                    {/* 左侧撞色竖条 */}
                                    <span
                                        className="absolute left-0 top-1/2 h-2/3 w-1.5 -translate-y-1/2 rounded-r-full"
                                        style={{ background: accent }}
                                        aria-hidden="true"
                                    />
                                    {/* 图标价签块 */}
                                    <span
                                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
                                        style={{
                                            background: accent,
                                            color: "var(--primary-text,#ffffff)",
                                            boxShadow: '0 6px 16px rgba(219,39,119,0.22)',
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={item?.icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-7 h-7"
                                            title={item?.icon?.__icon_query__}
                                        />
                                    </span>
                                    {/* 右侧文字 */}
                                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                                        <h3
                                            className="text-xl font-black leading-[1.3] break-words"
                                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.title}
                                        </h3>
                                        <p
                                            className="text-sm leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#52525b)", opacity: 0.92, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.desc}
                                        </p>
                                    </div>
                                    {/* 序号价签角标 */}
                                    <span
                                        className="flex-shrink-0 text-2xl font-black leading-none"
                                        style={{ color: accent, opacity: 0.32 }}
                                        aria-hidden="true"
                                    >
                                        {String(i + 1).padStart(2, '0')}
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
