import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'food-cn-icon-list'
export const layoutName = '图标要点列表'
export const layoutDescription = '美食餐饮风图标要点列表：暖米底圆盘构图 + 焦糖金描边，左图标右文字的竖向 4-6 条要点。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('我们的待客之道').meta({
        description: "页面主标题（中文，简短，体现餐饮主张）",
    }),
    items: z.array(z.object({
        icon: IconSchema.meta({ description: "要点图标" }),
        title: z.string().min(2).max(14).meta({ description: "要点小标题，如『食材甄选』" }),
        desc: z.string().min(4).max(40).meta({ description: "要点说明，一句话描述" }),
    })).min(4).max(6).default([
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg', __icon_query__: 'fresh ingredient leaf' },
            title: '食材甄选',
            desc: '每日清晨直采时令鲜货，从源头守护那一口本味。',
        },
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cooking-pot-bold.svg', __icon_query__: 'cooking pot kitchen' },
            title: '匠心慢炖',
            desc: '老火细煨数小时，让汤色醇厚、香气层层绽放。',
        },
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg', __icon_query__: 'fork knife dining' },
            title: '现点现做',
            desc: '坚持订单制烹制，热气腾腾上桌，锅气不打折。',
        },
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg', __icon_query__: 'heart hospitality service' },
            title: '暖心服务',
            desc: '从一杯热茶到一句问候，把每位食客当家人。',
        },
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/coffee-bold.svg', __icon_query__: 'coffee warm drink' },
            title: '温馨空间',
            desc: '暖色灯光与木质长桌，营造放松惬意的用餐氛围。',
        },
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/seal-check-bold.svg', __icon_query__: 'quality food safety certified' },
            title: '安心品质',
            desc: '后厨明档透明可见，每道工序都经得起细看。',
        },
    ]).meta({ description: "图标要点列表，4-6 条" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const IconList: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '我们的待客之道'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : [
            { icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg', __icon_query__: 'fresh ingredient leaf' }, title: '食材甄选', desc: '每日清晨直采时令鲜货，从源头守护那一口本味。' },
            { icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cooking-pot-bold.svg', __icon_query__: 'cooking pot kitchen' }, title: '匠心慢炖', desc: '老火细煨数小时，让汤色醇厚、香气层层绽放。' },
            { icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg', __icon_query__: 'fork knife dining' }, title: '现点现做', desc: '坚持订单制烹制，热气腾腾上桌，锅气不打折。' },
            { icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg', __icon_query__: 'heart hospitality service' }, title: '暖心服务', desc: '从一杯热茶到一句问候，把每位食客当家人。' },
        ]

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
                {/* 背景装饰层：焦糖金圆盘同心圆 + 暖色光晕 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <radialGradient id="foodIconGlow" cx="0.15" cy="0.12" r="0.9">
                            <stop offset="0%" stopColor="#e8590c" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="#e8590c" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="foodIconGlow2" cx="0.95" cy="0.95" r="0.8">
                            <stop offset="0%" stopColor="#c92a2a" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#c92a2a" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#foodIconGlow)" />
                    <rect width="1280" height="720" fill="url(#foodIconGlow2)" />
                    {/* 右上角圆盘同心圆（焦糖金描边） */}
                    {[0, 1, 2, 3].map((i) => (
                        <circle key={i} cx="1180" cy="80" r={60 + i * 46} fill="none" stroke="#e8590c" strokeOpacity={0.10} strokeWidth="1.5" />
                    ))}
                    {/* 左下角圆盘剪影 */}
                    <circle cx="80" cy="660" r="150" fill="none" stroke="#c92a2a" strokeOpacity="0.08" strokeWidth="1.5" />
                    <circle cx="80" cy="660" r="108" fill="none" stroke="#c92a2a" strokeOpacity="0.06" strokeWidth="1.5" />
                </svg>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区：餐具点缀 + 焦糖金短线 */}
                    <div className="mb-8 flex flex-shrink-0 items-center gap-4">
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                            style={{
                                background: "var(--primary-color,#e8590c)",
                                boxShadow: '0 0 0 6px rgba(232,89,12,0.14)',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-6 h-6"
                                title="dining utensils"
                            />
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

                    {/* 要点列表：左图标右文字，竖向均分 */}
                    <div className="flex flex-1 flex-col justify-center gap-4">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-5 rounded-2xl border px-6 py-4"
                                style={{
                                    background: "var(--card-color,#fffaf2)",
                                    borderColor: "var(--stroke,#f0e0cc)",
                                    boxShadow: '0 1px 2px rgba(59,36,18,0.04)',
                                }}
                            >
                                {/* 圆盘式图标（暖色块 + 焦糖金描边） */}
                                <div
                                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
                                    style={{
                                        background: "var(--primary-color,#e8590c)",
                                        boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.18), 0 0 0 4px rgba(232,89,12,0.10)',
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url={item?.icon?.__icon_url__}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-7 h-7"
                                        title={item?.icon?.__icon_query__ || 'food icon'}
                                    />
                                </div>

                                {/* 文字区 */}
                                <div className="flex min-w-0 flex-1 flex-col">
                                    <span
                                        className="text-lg font-bold leading-[1.6] break-words"
                                        style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {item?.title}
                                    </span>
                                    <span
                                        className="text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#3b2412)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {item?.desc}
                                    </span>
                                </div>

                                {/* 右侧焦糖金序号点缀 */}
                                <span
                                    className="hidden flex-shrink-0 text-2xl font-black leading-none sm:block"
                                    style={{ color: "var(--secondary-color,#c92a2a)", opacity: 0.25 }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default IconList
