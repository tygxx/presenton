import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'retail-cn-three-points'
export const layoutName = '三栏要点'
export const layoutDescription = '电商新零售风三栏要点页：撞色大色块 + 圆角卡片 + 价签角标，三等分列展示图标、标题与描述。潮流粗体排版，活力几何装饰，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('全域增长三引擎').meta({
        description: "三栏要点页主标题（中文，简短有力，潮流感）",
    }),
    points: z.array(z.object({
        icon: IconSchema.meta({
            description: "要点配图标（phosphor 图标）",
        }),
        title: z.string().min(2).max(12).meta({
            description: "要点标题（中文，简短）",
        }),
        desc: z.string().min(2).max(40).meta({
            description: "要点描述（一句话说明该要点价值）",
        }),
    })).min(3).max(3).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/storefront-bold.svg',
                __icon_query__: 'storefront retail',
            },
            title: '全渠道融合',
            desc: '线上线下一盘货，门店即仓库，到家到店随心选',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'private domain users',
            },
            title: '私域复购',
            desc: '社群直播双驱动，会员精细运营，复购率持续走高',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'data growth',
            },
            title: '数据选品',
            desc: '爆款雷达实时洞察趋势，柔性供应链快反上新',
        },
    ]).meta({ description: "三栏要点列表（固定 3 个）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK_POINTS: SlideData['points'] = [
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/storefront-bold.svg',
            __icon_query__: 'storefront retail',
        },
        title: '全渠道融合',
        desc: '线上线下一盘货，门店即仓库，到家到店随心选',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
            __icon_query__: 'private domain users',
        },
        title: '私域复购',
        desc: '社群直播双驱动，会员精细运营，复购率持续走高',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
            __icon_query__: 'data growth',
        },
        title: '数据选品',
        desc: '爆款雷达实时洞察趋势，柔性供应链快反上新',
    },
]

const ThreePoints: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '全域增长三引擎'
    const points = (slideData?.points && slideData.points.length > 0)
        ? slideData.points
        : FALLBACK_POINTS

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
                {/* 背景活力几何装饰层 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="retailTpBlock" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#db2777)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.04" />
                        </linearGradient>
                    </defs>
                    {/* 顶部撞色大色块斜切 */}
                    <path d="M0 0 H1280 V120 L0 200 Z" fill="url(#retailTpBlock)" />
                    {/* 左下活力圆形光晕 */}
                    <circle cx="80" cy="660" r="180" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.06" />
                    {/* 右下活力几何撞色块 */}
                    <circle cx="1210" cy="640" r="120" fill="var(--primary-color,#db2777)" fillOpacity="0.06" />
                </svg>

                {/* 左上撞色双竖条 */}
                <div
                    className="absolute top-0 left-0"
                    style={{ width: '10px', height: '100%', background: "var(--primary-color,#db2777)" }}
                    aria-hidden="true"
                />
                <div
                    className="absolute top-0 left-0"
                    style={{ width: '10px', height: '45%', background: "var(--secondary-color,#f59e0b)" }}
                    aria-hidden="true"
                />

                {/* 内容区 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-col items-start">
                        <span
                            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                background: "var(--primary-color,#db2777)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span style={{ width: '7px', height: '7px', borderRadius: '9999px', background: "var(--secondary-color,#f59e0b)" }} aria-hidden="true" />
                            新零售 · 增长策略
                        </span>
                        <h1
                            className="text-5xl font-black leading-[1.2] break-words"
                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-5 flex items-center gap-2" aria-hidden="true">
                            <div className="h-2 w-16 rounded-full" style={{ background: "var(--primary-color,#db2777)" }} />
                            <div className="h-2 w-8 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                        </div>
                    </div>

                    {/* 三等分要点列 */}
                    <div className="mt-10 grid flex-1 grid-cols-3 gap-7">
                        {points.slice(0, 3).map((p, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            const accent = i === 1 ? "var(--secondary-color,#f59e0b)" : "var(--primary-color,#db2777)"
                            return (
                                <div
                                    key={i}
                                    className="relative flex flex-col rounded-3xl border p-7 shadow-sm overflow-hidden"
                                    style={{ background: "var(--card-color,#fdf2f8)", borderColor: "var(--stroke,#fbcfe8)" }}
                                >
                                    {/* 价签角标 */}
                                    <div
                                        className="absolute right-5 top-5 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black"
                                        style={{ background: accent, color: "var(--primary-text,#ffffff)" }}
                                        aria-hidden="true"
                                    >
                                        <span style={{ width: '5px', height: '5px', borderRadius: '9999px', background: "var(--primary-text,#ffffff)", opacity: 0.9 }} />
                                        {num}
                                    </div>

                                    {/* 图标方块 */}
                                    <div
                                        className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm"
                                        style={{ background: accent }}
                                    >
                                        {(p as any)?.icon?.__icon_url__ && (
                                            <RemoteSvgIcon
                                                url={(p as any).icon.__icon_url__}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-8 h-8"
                                                title={(p as any).icon.__icon_query__}
                                            />
                                        )}
                                    </div>

                                    {/* 撞色短分隔线 */}
                                    <div
                                        className="mt-5 h-1.5 w-12 rounded-full"
                                        style={{ background: accent }}
                                        aria-hidden="true"
                                    />

                                    {/* 要点标题 */}
                                    <h3
                                        className="mt-3 text-2xl font-black leading-[1.3] break-words"
                                        style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {p?.title || `要点${i + 1}`}
                                    </h3>

                                    {/* 要点描述 */}
                                    <p
                                        className="mt-3 text-base leading-[1.7] break-words"
                                        style={{ color: "var(--background-text,#52525b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {p?.desc || ''}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThreePoints
