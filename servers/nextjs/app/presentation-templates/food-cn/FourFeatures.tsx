import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'food-cn-four-features'
export const layoutName = '四宫格特性'
export const layoutDescription = '美食餐饮风四宫格特性页：2x2 圆盘卡片网格，焦糖金描边 + 暖色块装饰，每张卡片含图标、小标题与说明。纯 CSS/SVG 装饰，离线可渲染。'

const iconDefault = (name: string, query: string) => ({
    __icon_url__: `https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${name}-bold.svg`,
    __icon_query__: query,
})

const schema = z.object({
    title: z.string().min(2).max(20).default('我们的招牌之道').meta({
        description: "四宫格特性页主标题（中文，简短有力，≤20字）",
    }),
    features: z.array(z.object({
        icon: IconSchema.default(iconDefault('cooking-pot', 'cooking pot')).meta({
            description: "卡片图标，使用 phosphor 图标名",
        }),
        title: z.string().min(2).max(12).meta({
            description: "卡片小标题（中文，≤12字）",
        }),
        desc: z.string().min(2).max(32).meta({
            description: "卡片说明文字（中文，≤32字）",
        }),
    })).min(4).max(4).default([
        {
            icon: iconDefault('cooking-pot', 'cooking pot'),
            title: '锅气十足',
            desc: '猛火快炒锁住食材本味，每一口都有家的温度。',
        },
        {
            icon: iconDefault('leaf', 'fresh leaf'),
            title: '当日鲜选',
            desc: '清晨直采时令食材，从田间到餐桌不过数小时。',
        },
        {
            icon: iconDefault('fork-knife', 'fork knife'),
            title: '匠心摆盘',
            desc: '色香味形俱佳，先用眼睛品尝再以味蕾享受。',
        },
        {
            icon: iconDefault('heart', 'warm heart'),
            title: '暖心服务',
            desc: '宾至如归的体贴，让每一次相聚都圆满尽兴。',
        },
    ]).meta({ description: "四张特性卡片（固定四张）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FourFeatures: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '我们的招牌之道'
    const features = (slideData?.features && slideData.features.length > 0)
        ? slideData.features
        : [
            { icon: iconDefault('cooking-pot', 'cooking pot'), title: '锅气十足', desc: '猛火快炒锁住食材本味，每一口都有家的温度。' },
            { icon: iconDefault('leaf', 'fresh leaf'), title: '当日鲜选', desc: '清晨直采时令食材，从田间到餐桌不过数小时。' },
            { icon: iconDefault('fork-knife', 'fork knife'), title: '匠心摆盘', desc: '色香味形俱佳，先用眼睛品尝再以味蕾享受。' },
            { icon: iconDefault('heart', 'warm heart'), title: '暖心服务', desc: '宾至如归的体贴，让每一次相聚都圆满尽兴。' },
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
                {/* 背景装饰：暖色光晕 + 圆盘母题 + 焦糖金细环 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="foodWarmGlow" cx="18%" cy="14%" r="55%">
                                <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="foodWarmGlow2" cx="88%" cy="92%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#foodWarmGlow)" />
                        <rect width="1280" height="720" fill="url(#foodWarmGlow2)" />
                        {/* 左上焦糖金圆盘环 */}
                        {[0, 1, 2].map((i) => (
                            <circle key={`tl-${i}`} cx="120" cy="100" r={60 + i * 48} fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity={0.14} strokeWidth="2" />
                        ))}
                        {/* 右下暖红圆盘环 */}
                        {[0, 1, 2].map((i) => (
                            <circle key={`br-${i}`} cx="1180" cy="640" r={70 + i * 52} fill="none" stroke="var(--secondary-color,#c92a2a)" strokeOpacity={0.12} strokeWidth="2" />
                        ))}
                    </svg>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区：圆盘小点 + 标题 + 焦糖金分隔 */}
                    <div className="flex items-center gap-4">
                        <span
                            className="flex h-3.5 w-3.5 flex-shrink-0 rounded-full"
                            style={{ background: "var(--secondary-color,#c92a2a)", boxShadow: '0 0 0 6px rgba(232,89,12,0.16)' }}
                        />
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                    </div>
                    <div
                        className="mt-4 h-1.5 w-20 rounded-full"
                        style={{ background: "var(--primary-color,#e8590c)" }}
                    />

                    {/* 2x2 圆盘卡片网格 */}
                    <div className="mt-8 grid flex-1 grid-cols-2 grid-rows-2 gap-6">
                        {features.slice(0, 4).map((f, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-5 rounded-3xl border p-6 shadow-sm"
                                style={{
                                    background: "var(--card-color,#fffaf2)",
                                    borderColor: "var(--stroke,#f0e0cc)",
                                }}
                            >
                                {/* 圆盘图标：双层焦糖金圆环 + 暖色填充 */}
                                <div
                                    className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full"
                                    style={{
                                        background: "var(--primary-color,#e8590c)",
                                        boxShadow: '0 0 0 4px rgba(255,250,242,1), 0 0 0 6px rgba(232,89,12,0.28)',
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url={f?.icon?.__icon_url__ || iconDefault('cooking-pot', 'cooking pot').__icon_url__}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-7 h-7"
                                        title={f?.icon?.__icon_query__ || 'feature'}
                                    />
                                </div>

                                {/* 文本区 */}
                                <div className="flex min-w-0 flex-col">
                                    <h3
                                        className="text-xl font-bold leading-[1.3] break-words"
                                        style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {f?.title || '招牌特色'}
                                    </h3>
                                    <p
                                        className="mt-2 text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#3b2412)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {f?.desc || '用心烹制每一道佳肴，为您呈现地道风味。'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FourFeatures
