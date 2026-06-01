import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'retail-cn-comparison'
export const layoutName = '左右对比'
export const layoutDescription = '电商新零售风左右对比页：左右两栏撞色圆角卡片对称排布，中间潮流 VS 价签徽章分隔，纯 CSS/SVG 装饰，适合两方对比/优劣/升级前后。'

const schema = z.object({
    title: z.string().min(2).max(20).default('升级前 vs 升级后').meta({
        description: "对比页主标题（中文，简短有力）",
    }),
    leftTitle: z.string().min(2).max(12).default('传统门店').meta({
        description: "左栏标题（被对比方/旧方案）",
    }),
    rightTitle: z.string().min(2).max(12).default('全渠道新零售').meta({
        description: "右栏标题（推荐方/新方案）",
    }),
    leftPoints: z.array(
        z.string().min(2).max(30).meta({ description: "左栏对比要点（一句话）" })
    ).min(2).max(4).default([
        '客流依赖地段，触达范围有限',
        '库存与销售数据相互割裂',
        '促销靠经验，转化难以衡量',
        '会员复购缺乏精细化运营',
    ]).meta({ description: "左栏要点列表（2-4 条）" }),
    rightPoints: z.array(
        z.string().min(2).max(30).meta({ description: "右栏对比要点（一句话）" })
    ).min(2).max(4).default([
        '线上线下一体，全域引流获客',
        '人货场数据打通，实时可视',
        '智能选品配券，转化提升 35%',
        '私域会员分层，复购率翻倍',
    ]).meta({ description: "右栏要点列表（2-4 条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const dotIcon = {
    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/check-bold.svg",
    __icon_query__: "check",
}
const minusIcon = {
    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/x-bold.svg",
    __icon_query__: "close",
}

const Comparison: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '升级前 vs 升级后'
    const leftTitle = slideData?.leftTitle || '传统门店'
    const rightTitle = slideData?.rightTitle || '全渠道新零售'
    const leftPoints = (slideData?.leftPoints && slideData.leftPoints.length > 0)
        ? slideData.leftPoints
        : ['客流依赖地段，触达范围有限', '库存与销售数据相互割裂', '促销靠经验，转化难以衡量', '会员复购缺乏精细化运营']
    const rightPoints = (slideData?.rightPoints && slideData.rightPoints.length > 0)
        ? slideData.rightPoints
        : ['线上线下一体，全域引流获客', '人货场数据打通，实时可视', '智能选品配券，转化提升 35%', '私域会员分层，复购率翻倍']

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
                {/* 背景装饰：撞色活力几何形 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="retailCmpGlowL" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="retailCmpGlowR" x1="1" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#db2777)" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="var(--primary-color,#db2777)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <circle cx="120" cy="120" r="220" fill="url(#retailCmpGlowL)" />
                    <circle cx="1160" cy="600" r="240" fill="url(#retailCmpGlowR)" />
                    <rect x="60" y="560" width="58" height="58" rx="14" fill="var(--secondary-color,#f59e0b)" opacity="0.16" transform="rotate(18 89 589)" />
                    <rect x="1170" y="70" width="46" height="46" rx="12" fill="var(--primary-color,#db2777)" opacity="0.16" transform="rotate(-14 1193 93)" />
                    <circle cx="1110" cy="150" r="9" fill="var(--primary-color,#db2777)" opacity="0.30" />
                    <circle cx="180" cy="600" r="7" fill="var(--secondary-color,#f59e0b)" opacity="0.35" />
                </svg>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-14 py-10">
                    {/* 顶部标题区 */}
                    <div className="flex flex-shrink-0 flex-col items-center text-center">
                        <span
                            className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold break-words"
                            style={{
                                color: "var(--primary-color,#db2777)",
                                background: "var(--card-color,#fdf2f8)",
                                border: "1.5px solid var(--stroke,#fbcfe8)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span className="inline-block h-2 w-2 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                            方案对比
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                    </div>

                    {/* 中部：左右对比卡片 + 中间 VS 价签 */}
                    <div className="mt-8 flex min-h-0 flex-1 items-stretch gap-5">
                        {/* 左栏卡片 */}
                        <div
                            className="flex w-0 flex-1 flex-col rounded-3xl p-7"
                            style={{
                                background: "var(--card-color,#fdf2f8)",
                                border: "1.5px solid var(--stroke,#fbcfe8)",
                            }}
                        >
                            <div className="flex flex-shrink-0 items-center gap-3">
                                <span
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl text-lg font-black"
                                    style={{ background: "var(--background-text,#18181b)", color: "var(--primary-text,#ffffff)" }}
                                >
                                    A
                                </span>
                                <h2
                                    className="text-2xl font-black leading-[1.3] break-words"
                                    style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {leftTitle}
                                </h2>
                            </div>
                            <div className="mt-5 h-1 w-full rounded-full" style={{ background: "var(--stroke,#fbcfe8)" }} />
                            <ul className="mt-5 flex flex-1 flex-col justify-center gap-4">
                                {leftPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{ background: "var(--background-text,#18181b)" }}
                                        >
                                            <RemoteSvgIcon
                                                url={minusIcon.__icon_url__}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-3.5 h-3.5"
                                                title={minusIcon.__icon_query__}
                                            />
                                        </span>
                                        <span
                                            className="text-base leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#18181b)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 中间 VS 价签分隔 */}
                        <div className="flex flex-shrink-0 flex-col items-center justify-center">
                            <div className="h-full w-px" style={{ background: "var(--stroke,#fbcfe8)" }} />
                            <div
                                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-xl font-black"
                                style={{
                                    background: "var(--primary-color,#db2777)",
                                    color: "var(--primary-text,#ffffff)",
                                    boxShadow: "0 8px 22px rgba(219,39,119,0.35)",
                                    transform: "rotate(-6deg)",
                                }}
                            >
                                VS
                            </div>
                            <div className="h-full w-px" style={{ background: "var(--stroke,#fbcfe8)" }} />
                        </div>

                        {/* 右栏卡片（推荐 / 撞色高亮） */}
                        <div
                            className="relative flex w-0 flex-1 flex-col overflow-hidden rounded-3xl p-7"
                            style={{
                                background: "var(--primary-color,#db2777)",
                                boxShadow: "0 14px 34px rgba(219,39,119,0.30)",
                            }}
                        >
                            {/* 右上角价签角标 */}
                            <div
                                className="absolute right-5 top-5 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black break-words"
                                style={{
                                    background: "var(--secondary-color,#f59e0b)",
                                    color: "var(--background-text,#18181b)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                ★ 推荐
                            </div>
                            <div className="flex flex-shrink-0 items-center gap-3">
                                <span
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl text-lg font-black"
                                    style={{ background: "var(--secondary-color,#f59e0b)", color: "var(--background-text,#18181b)" }}
                                >
                                    B
                                </span>
                                <h2
                                    className="text-2xl font-black leading-[1.3] break-words"
                                    style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {rightTitle}
                                </h2>
                            </div>
                            <div className="mt-5 h-1 w-full rounded-full" style={{ background: "rgba(255,255,255,0.30)" }} />
                            <ul className="mt-5 flex flex-1 flex-col justify-center gap-4">
                                {rightPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                                        >
                                            <RemoteSvgIcon
                                                url={dotIcon.__icon_url__}
                                                strokeColor="currentColor"
                                                color="var(--background-text,#18181b)"
                                                className="w-3.5 h-3.5"
                                                title={dotIcon.__icon_query__}
                                            />
                                        </span>
                                        <span
                                            className="text-base font-medium leading-[1.7] break-words"
                                            style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comparison
