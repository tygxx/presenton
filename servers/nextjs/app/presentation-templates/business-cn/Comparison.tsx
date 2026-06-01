import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'business-cn-comparison'
export const layoutName = '左右对比'
export const layoutDescription = '商务风左右对比：两栏对称卡片 + 中间 VS 分隔，适合方案对比 / before-after / 优劣权衡。深蓝稳健配色 + 橙色强调，纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('两种增长路径对比').meta({
        description: "对比页主标题（中文，简短有力）",
    }),
    leftTitle: z.string().min(2).max(12).default('传统模式').meta({
        description: "左栏方案标题（中文，简短）",
    }),
    rightTitle: z.string().min(2).max(12).default('数字化模式').meta({
        description: "右栏方案标题（中文，简短）",
    }),
    leftPoints: z.array(
        z.string().min(2).max(30).meta({ description: "左栏要点（中文，简短一句）" })
    ).min(2).max(4).default([
        '依赖线下渠道，获客成本逐年攀升',
        '决策依靠经验，反馈周期较长',
        '人工流程为主，规模扩张受限',
    ]).meta({ description: "左栏对比要点列表（2-4 条）" }),
    rightPoints: z.array(
        z.string().min(2).max(30).meta({ description: "右栏要点（中文，简短一句）" })
    ).min(2).max(4).default([
        '全渠道触达，获客成本下降三成',
        '数据驱动决策，迭代以小时计',
        '流程自动化，业务可弹性扩张',
    ]).meta({ description: "右栏对比要点列表（2-4 条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Comparison: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '两种增长路径对比'
    const leftTitle = slideData?.leftTitle || '传统模式'
    const rightTitle = slideData?.rightTitle || '数字化模式'
    const leftPoints = slideData?.leftPoints || []
    const rightPoints = slideData?.rightPoints || []

    const leftIconUrl = 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/x-circle-bold.svg'
    const rightIconUrl = 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/check-circle-bold.svg'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f8fafc)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：经典网格 + 几何光晕 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="bizCmpGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0H0V48" fill="none" stroke="#1e3a8a" strokeOpacity="0.04" strokeWidth="1" />
                        </pattern>
                        <radialGradient id="bizCmpGlow" cx="50%" cy="0%" r="60%">
                            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#bizCmpGrid)" />
                    <rect width="1280" height="720" fill="url(#bizCmpGlow)" />
                </svg>

                {/* 顶部橙色角标 */}
                <div className="absolute top-0 left-0 h-1.5 w-40" style={{ background: "var(--secondary-color,#f97316)" }} aria-hidden="true" />

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col items-center text-center">
                        <div className="mb-4 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                    </div>

                    {/* 对比区：左卡 + VS + 右卡 */}
                    <div className="mt-9 flex flex-1 items-stretch gap-6">
                        {/* 左栏 */}
                        <div
                            className="flex flex-1 flex-col rounded-2xl border p-7"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)", boxShadow: '0 8px 24px rgba(15,23,42,0.05)' }}
                        >
                            <div className="flex items-center gap-3 border-b pb-4" style={{ borderColor: "var(--stroke,#e2e8f0)" }}>
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{ background: "var(--primary-color,#1e3a8a)" }}
                                >
                                    <RemoteSvgIcon
                                        url={leftIconUrl}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-6 h-6"
                                        title="对比项"
                                    />
                                </div>
                                <h2
                                    className="text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {leftTitle}
                                </h2>
                            </div>

                            <ul className="mt-5 flex flex-1 flex-col justify-center gap-4">
                                {leftPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--primary-color,#1e3a8a)", opacity: 0.55 }}
                                        />
                                        <span
                                            className="text-base leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 中间 VS 分隔 */}
                        <div className="flex flex-shrink-0 flex-col items-center justify-center">
                            <div className="w-px flex-1" style={{ background: "var(--stroke,#e2e8f0)" }} />
                            <div
                                className="my-2 flex h-14 w-14 items-center justify-center rounded-full text-lg font-black"
                                style={{
                                    background: "var(--secondary-color,#f97316)",
                                    color: "var(--primary-text,#ffffff)",
                                    boxShadow: '0 0 0 8px rgba(249,115,22,0.12)',
                                }}
                            >
                                VS
                            </div>
                            <div className="w-px flex-1" style={{ background: "var(--stroke,#e2e8f0)" }} />
                        </div>

                        {/* 右栏 */}
                        <div
                            className="flex flex-1 flex-col rounded-2xl p-7"
                            style={{
                                background: "var(--primary-color,#1e3a8a)",
                                boxShadow: '0 12px 28px rgba(30,58,138,0.22)',
                            }}
                        >
                            <div className="flex items-center gap-3 border-b pb-4" style={{ borderColor: 'rgba(255,255,255,0.16)' }}>
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{ background: "var(--secondary-color,#f97316)" }}
                                >
                                    <RemoteSvgIcon
                                        url={rightIconUrl}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-6 h-6"
                                        title="对比项"
                                    />
                                </div>
                                <h2
                                    className="text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {rightTitle}
                                </h2>
                            </div>

                            <ul className="mt-5 flex flex-1 flex-col justify-center gap-4">
                                {rightPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--secondary-color,#f97316)" }}
                                        />
                                        <span
                                            className="text-base leading-[1.7] break-words"
                                            style={{ color: "var(--primary-text,#ffffff)", opacity: 0.92, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {point}
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
