import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'gov-cn-four-features'
export const layoutName = '四宫格特性'
export const layoutDescription = '党政政务风四宫格特性页：米白底 + 中国红 + 烫金细线，居中对称标题配五角星点缀，2x2 网格四张特性卡片，图标用 RemoteSvgIcon。纯 CSS/SVG 装饰，离线可渲染。'

const iconUrl = (name: string) =>
    `https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${name}-bold.svg`

const schema = z.object({
    title: z.string().min(2).max(20).default('为民服务核心举措').meta({
        description: "四宫格特性页主标题（中文，简短庄重）",
    }),
    features: z.array(z.object({
        icon: IconSchema.default({
            __icon_url__: iconUrl('shield-check'),
            __icon_query__: 'shield check',
        }).meta({ description: "特性图标" }),
        title: z.string().min(2).max(12).meta({ description: "特性小标题（中文）" }),
        desc: z.string().min(4).max(32).meta({ description: "特性说明（中文，一句话）" }),
    })).min(4).max(4).default([
        {
            icon: { __icon_url__: iconUrl('shield-check'), __icon_query__: 'shield check' },
            title: '依法行政',
            desc: '严格依法履职，权责清晰、流程规范、公开透明。',
        },
        {
            icon: { __icon_url__: iconUrl('users-three'), __icon_query__: 'people group' },
            title: '为民服务',
            desc: '以人民为中心，办实事解民忧暖民心。',
        },
        {
            icon: { __icon_url__: iconUrl('scales'), __icon_query__: 'balance scales' },
            title: '公正廉洁',
            desc: '坚守底线纪律，秉公用权、清正廉明。',
        },
        {
            icon: { __icon_url__: iconUrl('chart-line-up'), __icon_query__: 'growth chart' },
            title: '高效协同',
            desc: '部门联动一体推进，提质增效再上台阶。',
        },
    ]).meta({ description: "四张特性卡片（固定四项，2x2 网格）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

// 烫金五角星装饰
const GoldStar: React.FC<{ className?: string; size?: number; opacity?: number }> = ({ className, size = 18, opacity = 1 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
        style={{ opacity }}
    >
        <path
            d="M12 2l2.95 6.18 6.8.78-5.03 4.62 1.36 6.72L12 17.7 5.92 20.3l1.36-6.72L2.25 8.96l6.8-.78L12 2z"
            fill="var(--secondary-color,#b8860b)"
        />
    </svg>
)

const FourFeatures: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '为民服务核心举措'
    const features = (slideData?.features && slideData.features.length === 4)
        ? slideData.features
        : [
            { icon: { __icon_url__: iconUrl('shield-check'), __icon_query__: 'shield check' }, title: '依法行政', desc: '严格依法履职，权责清晰、流程规范、公开透明。' },
            { icon: { __icon_url__: iconUrl('users-three'), __icon_query__: 'people group' }, title: '为民服务', desc: '以人民为中心，办实事解民忧暖民心。' },
            { icon: { __icon_url__: iconUrl('scales'), __icon_query__: 'balance scales' }, title: '公正廉洁', desc: '坚守底线纪律，秉公用权、清正廉明。' },
            { icon: { __icon_url__: iconUrl('chart-line-up'), __icon_query__: 'growth chart' }, title: '高效协同', desc: '部门联动一体推进，提质增效再上台阶。' },
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
                    background: "var(--background-color,#faf7f2)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：对称华表纹样 + 烫金细线 + 中国红光晕 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    {/* 顶部中国红光晕带 */}
                    <div
                        className="absolute top-0 left-0 w-full"
                        style={{
                            height: '34%',
                            background: 'radial-gradient(120% 100% at 50% 0%, rgba(193,18,31,0.10) 0%, rgba(193,18,31,0) 70%)',
                        }}
                    />
                    {/* 左右对称烫金竖线（华表意象） */}
                    <div
                        className="absolute top-[14%] left-[5%]"
                        style={{
                            width: '2px', height: '72%',
                            background: 'linear-gradient(to bottom, rgba(184,134,11,0) 0%, rgba(184,134,11,0.45) 30%, rgba(184,134,11,0.45) 70%, rgba(184,134,11,0) 100%)',
                        }}
                    />
                    <div
                        className="absolute top-[14%] right-[5%]"
                        style={{
                            width: '2px', height: '72%',
                            background: 'linear-gradient(to bottom, rgba(184,134,11,0) 0%, rgba(184,134,11,0.45) 30%, rgba(184,134,11,0.45) 70%, rgba(184,134,11,0) 100%)',
                        }}
                    />
                    {/* 对称回字纹角标 SVG（左上 + 右上镜像） */}
                    <svg viewBox="0 0 80 80" className="absolute top-5 left-5 h-10 w-10" style={{ opacity: 0.5 }}>
                        <path d="M6 6h32v8H14v24H6V6zm14 14h18v18h-8V28H20v-8z" fill="none" stroke="var(--secondary-color,#b8860b)" strokeWidth="2" />
                    </svg>
                    <svg viewBox="0 0 80 80" className="absolute top-5 right-5 h-10 w-10" style={{ opacity: 0.5, transform: 'scaleX(-1)' }}>
                        <path d="M6 6h32v8H14v24H6V6zm14 14h18v18h-8V28H20v-8z" fill="none" stroke="var(--secondary-color,#b8860b)" strokeWidth="2" />
                    </svg>
                    {/* 底部对称烫金细线 */}
                    <div
                        className="absolute bottom-7 left-1/2"
                        style={{
                            width: '46%', height: '1px', transform: 'translateX(-50%)',
                            background: 'linear-gradient(to right, rgba(184,134,11,0) 0%, rgba(184,134,11,0.5) 50%, rgba(184,134,11,0) 100%)',
                        }}
                    />
                    <div className="absolute bottom-[22px] left-1/2" style={{ transform: 'translateX(-50%)' }}>
                        <GoldStar size={12} opacity={0.7} />
                    </div>
                </div>

                {/* 主内容：居中对称标题 + 2x2 网格 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-11">
                    {/* 居中对称标题区 */}
                    <div className="flex flex-shrink-0 flex-col items-center text-center">
                        <div className="mb-3 flex items-center gap-3">
                            <span style={{ width: '40px', height: '2px', background: 'var(--secondary-color,#b8860b)' }} />
                            <GoldStar size={16} />
                            <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ background: 'var(--primary-color,#c1121f)' }}
                            />
                            <GoldStar size={16} />
                            <span style={{ width: '40px', height: '2px', background: 'var(--secondary-color,#b8860b)' }} />
                        </div>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#1a1a1a)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-4 h-1 w-20 rounded-full"
                            style={{ background: 'var(--primary-color,#c1121f)' }}
                        />
                    </div>

                    {/* 2x2 网格卡片 */}
                    <div className="mt-9 grid flex-1 grid-cols-2 grid-rows-2 gap-6">
                        {features.map((f, i) => {
                            const fTitle = f?.title || ''
                            const fDesc = f?.desc || ''
                            const url = f?.icon?.__icon_url__
                            const query = f?.icon?.__icon_query__ || 'icon'
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-5 rounded-2xl border px-6 py-5"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#e8dcc8)",
                                        boxShadow: '0 6px 22px rgba(193,18,31,0.06)',
                                    }}
                                >
                                    {/* 图标徽章：中国红底 + 烫金描边 */}
                                    <div
                                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl"
                                        style={{
                                            background: "var(--primary-color,#c1121f)",
                                            border: '1.5px solid var(--secondary-color,#b8860b)',
                                            boxShadow: '0 0 0 4px rgba(193,18,31,0.08)',
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={url}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-7 h-7"
                                            title={query}
                                        />
                                    </div>

                                    {/* 文案 */}
                                    <div className="flex min-w-0 flex-col">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="text-lg font-black break-words"
                                                style={{
                                                    color: "var(--background-text,#1a1a1a)",
                                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                                }}
                                            >
                                                {fTitle}
                                            </span>
                                            <span
                                                className="text-xs font-bold"
                                                style={{ color: "var(--secondary-color,#b8860b)" }}
                                            >
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                        <p
                                            className="mt-1.5 text-sm leading-[1.7] break-words"
                                            style={{
                                                color: "var(--background-text,#1a1a1a)",
                                                opacity: 0.78,
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {fDesc}
                                        </p>
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

export default FourFeatures
