import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { IconSchema } from '../defaultSchemes';

export const layoutId = 'green-cn-comparison'
export const layoutName = '左右对比'
export const layoutDescription = '新能源环保风左右对比页：左右两栏对称布局，中间叶片 VS 分隔，适用于两方对比 / 改造前后 / 优劣对照。纯 CSS/SVG 装饰（叶片、地球、自然曲线），离线可渲染，主题色自动跟随。'

const schema = z.object({
    title: z.string().min(2).max(20).default('传统能源 vs 清洁能源').meta({
        description: "对比页主标题（中文，简短有力）",
    }),
    leftTitle: z.string().min(2).max(12).default('传统火电').meta({
        description: "左栏标题，如『改造前』『传统方案』",
    }),
    rightTitle: z.string().min(2).max(12).default('绿色光伏').meta({
        description: "右栏标题，如『改造后』『清洁方案』",
    }),
    leftIcon: IconSchema.default({
        __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/factory-bold.svg",
        __icon_query__: "factory smokestack",
    }).meta({ description: "左栏图标" }),
    rightIcon: IconSchema.default({
        __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg",
        __icon_query__: "leaf clean energy",
    }).meta({ description: "右栏图标" }),
    leftPoints: z.array(z.string().min(2).max(30)).min(2).max(4).default([
        '燃煤发电，碳排放居高不下',
        '资源不可再生，成本随煤价波动',
        '废气废渣污染周边生态环境',
        '能源转换效率约 40%，损耗较大',
    ]).meta({ description: "左栏对比要点（2-4 条，每条不超过 30 字）" }),
    rightPoints: z.array(z.string().min(2).max(30)).min(2).max(4).default([
        '光伏发电，全程零碳零排放',
        '阳光取之不尽，运维成本逐年走低',
        '清洁无污染，守护蓝天碧水',
        '智能跟踪系统，发电效率持续提升',
    ]).meta({ description: "右栏对比要点（2-4 条，每条不超过 30 字）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Comparison: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '传统能源 vs 清洁能源'
    const leftTitle = slideData?.leftTitle || '传统火电'
    const rightTitle = slideData?.rightTitle || '绿色光伏'
    const leftIcon = slideData?.leftIcon
    const rightIcon = slideData?.rightIcon
    const leftPoints = slideData?.leftPoints || []
    const rightPoints = slideData?.rightPoints || []

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f0fdf4)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景自然有机装饰层 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="greenCmpSky" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="greenCmpGlow" cx="50%" cy="0%" r="70%">
                            <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#greenCmpSky)" />
                    <rect width="1280" height="720" fill="url(#greenCmpGlow)" />
                    {/* 底部自然有机曲线（草坡/地平线） */}
                    <path d="M0 660 C 240 600 420 700 640 650 C 880 595 1040 700 1280 640 L 1280 720 L 0 720 Z" fill="var(--primary-color,#16a34a)" fillOpacity="0.08" />
                    <path d="M0 690 C 280 640 480 720 700 680 C 920 640 1080 720 1280 680 L 1280 720 L 0 720 Z" fill="var(--primary-color,#16a34a)" fillOpacity="0.12" />
                    {/* 左上叶脉装饰 */}
                    <path d="M-30 80 C 120 60 220 160 200 300" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.10" strokeWidth="2" />
                    {/* 右上地球弧线 */}
                    <circle cx="1240" cy="70" r="150" fill="none" stroke="var(--secondary-color,#0891b2)" strokeOpacity="0.12" strokeWidth="2" />
                    <circle cx="1240" cy="70" r="105" fill="none" stroke="var(--secondary-color,#0891b2)" strokeOpacity="0.08" strokeWidth="2" />
                </svg>

                {/* 角标小叶片 */}
                <div className="absolute top-6 left-8 flex items-center gap-2 z-10">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                        <path d="M5 19 C 5 9 13 4 21 4 C 21 14 13 19 5 19 Z M7 17 C 11 13 15 10 19 8" fill="none" stroke="var(--primary-color,#16a34a)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span
                        className="text-sm font-medium break-words"
                        style={{ color: "var(--primary-color,#16a34a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        绿色能源 · 可持续未来
                    </span>
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 pt-16 pb-12">
                    {/* 标题 */}
                    <div className="flex flex-col items-center text-center">
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-4 h-1.5 w-20 rounded-full" style={{ background: "var(--primary-color,#16a34a)" }} />
                    </div>

                    {/* 左右对比 */}
                    <div className="mt-10 flex flex-1 items-stretch gap-6">
                        {/* 左栏 */}
                        <div
                            className="flex flex-1 flex-col rounded-3xl border p-8"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#d1fae5)" }}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
                                    style={{ background: "var(--secondary-color,#0891b2)" }}
                                >
                                    {leftIcon?.__icon_url__ ? (
                                        <RemoteSvgIcon
                                            url={leftIcon.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-7 h-7"
                                            title={leftIcon?.__icon_query__ || 'factory'}
                                        />
                                    ) : null}
                                </div>
                                <h2
                                    className="text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {leftTitle}
                                </h2>
                            </div>
                            <div className="mt-6 h-px w-full" style={{ background: "var(--stroke,#d1fae5)" }} />
                            <ul className="mt-6 flex flex-col gap-4">
                                {leftPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-2 flex h-2 w-2 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--secondary-color,#0891b2)" }}
                                        />
                                        <span
                                            className="text-base leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#14532d)", opacity: 0.88, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 中间 VS 分隔（叶片徽章） */}
                        <div className="flex flex-shrink-0 flex-col items-center justify-center">
                            <div className="w-px flex-1" style={{ background: "linear-gradient(to bottom, transparent, var(--stroke,#d1fae5), transparent)" }} />
                            <div
                                className="my-3 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2"
                                style={{
                                    background: "var(--background-color,#f0fdf4)",
                                    borderColor: "var(--primary-color,#16a34a)",
                                    boxShadow: '0 6px 18px rgba(22,163,74,0.18)',
                                }}
                            >
                                <span
                                    className="text-xl font-black break-words"
                                    style={{ color: "var(--primary-color,#16a34a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    VS
                                </span>
                            </div>
                            <div className="w-px flex-1" style={{ background: "linear-gradient(to bottom, transparent, var(--stroke,#d1fae5), transparent)" }} />
                        </div>

                        {/* 右栏（高亮主色） */}
                        <div
                            className="flex flex-1 flex-col rounded-3xl border-2 p-8"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--primary-color,#16a34a)" }}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
                                    style={{ background: "var(--primary-color,#16a34a)" }}
                                >
                                    {rightIcon?.__icon_url__ ? (
                                        <RemoteSvgIcon
                                            url={rightIcon.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-7 h-7"
                                            title={rightIcon?.__icon_query__ || 'leaf'}
                                        />
                                    ) : null}
                                </div>
                                <h2
                                    className="text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--primary-color,#16a34a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {rightTitle}
                                </h2>
                            </div>
                            <div className="mt-6 h-px w-full" style={{ background: "var(--stroke,#d1fae5)" }} />
                            <ul className="mt-6 flex flex-col gap-4">
                                {rightPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 flex-shrink-0" aria-hidden="true">
                                            <path d="M4 11 L8 15 L16 5" fill="none" stroke="var(--primary-color,#16a34a)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span
                                            className="text-base leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
