import React from 'react'
import * as z from "zod";

export const layoutId = 'realestate-cn-comparison'
export const layoutName = '左右对比'
export const layoutDescription = '房产建筑风左右对比页：左右两栏对称，中间金铜 VS 分隔。高级灰 + 金铜点缀 + 超大留白 + 细线分隔，建筑剪影装饰。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('两种户型方案对比').meta({
        description: "对比页主标题（中文，简短）",
    }),
    leftTitle: z.string().min(2).max(12).default('精装现房').meta({
        description: "左栏标题",
    }),
    rightTitle: z.string().min(2).max(12).default('毛坯期房').meta({
        description: "右栏标题",
    }),
    leftPoints: z.array(
        z.string().min(2).max(30).meta({ description: "左栏要点（中文一句话）" })
    ).min(2).max(4).default([
        '即买即住，无需等待交付周期',
        '拎包入住，软装家电一步到位',
        '现场实勘，所见即所得无落差',
    ]).meta({ description: "左栏对比要点列表" }),
    rightPoints: z.array(
        z.string().min(2).max(30).meta({ description: "右栏要点（中文一句话）" })
    ).min(2).max(4).default([
        '单价更低，入手门槛相对友好',
        '空间自由，可按需个性化定制',
        '分期付款，资金压力逐步释放',
    ]).meta({ description: "右栏对比要点列表" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Comparison: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '两种户型方案对比'
    const leftTitle = slideData?.leftTitle || '精装现房'
    const rightTitle = slideData?.rightTitle || '毛坯期房'
    const leftPoints = (slideData?.leftPoints && slideData.leftPoints.length > 0)
        ? slideData.leftPoints
        : ['即买即住，无需等待交付周期', '拎包入住，软装家电一步到位', '现场实勘，所见即所得无落差']
    const rightPoints = (slideData?.rightPoints && slideData.rightPoints.length > 0)
        ? slideData.rightPoints
        : ['单价更低，入手门槛相对友好', '空间自由，可按需个性化定制', '分期付款，资金压力逐步释放']

    const Column = ({
        label,
        points,
        align,
    }: {
        label: string
        points: string[]
        align: 'left' | 'right'
    }) => (
        <div
            className="flex flex-1 flex-col justify-center px-10 py-8"
            style={{ alignItems: align === 'right' ? 'flex-end' : 'flex-start' }}
        >
            {/* 栏目序号 / 细线标识 */}
            <div
                className="flex items-center gap-3"
                style={{ flexDirection: align === 'right' ? 'row-reverse' : 'row' }}
            >
                <span
                    className="inline-block h-px w-10"
                    style={{ background: "var(--primary-color,#b08d57)" }}
                    aria-hidden="true"
                />
                <span
                    className="text-xs font-medium tracking-widest break-words"
                    style={{
                        color: "var(--primary-color,#b08d57)",
                        overflowWrap: 'break-word', wordBreak: 'break-word',
                    }}
                >
                    {align === 'left' ? '方案 A' : '方案 B'}
                </span>
            </div>

            <h2
                className="mt-3 text-3xl font-light leading-[1.3] break-words"
                style={{
                    color: "var(--background-text,#27272a)",
                    textAlign: align,
                    overflowWrap: 'break-word', wordBreak: 'break-word',
                }}
            >
                {label}
            </h2>

            <ul
                className="mt-7 flex w-full flex-col gap-4"
                style={{ alignItems: align === 'right' ? 'flex-end' : 'flex-start' }}
            >
                {points.map((p, i) => (
                    <li
                        key={i}
                        className="flex w-full max-w-[22rem] items-start gap-3"
                        style={{ flexDirection: align === 'right' ? 'row-reverse' : 'row' }}
                    >
                        <span
                            className="mt-[0.6rem] inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                            style={{ background: "var(--primary-color,#b08d57)" }}
                            aria-hidden="true"
                        />
                        <span
                            className="text-base font-light leading-[1.7] break-words"
                            style={{
                                color: "var(--secondary-color,#3f3f46)",
                                textAlign: align,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {p}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f4f4f5)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景建筑剪影装饰层（极简线条） */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMax slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="reCompFade" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0" />
                            <stop offset="100%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0.07" />
                        </linearGradient>
                    </defs>
                    <rect x="0" y="500" width="1280" height="220" fill="url(#reCompFade)" />
                    {/* 左侧建筑剪影 */}
                    <g stroke="var(--stroke,#e4e4e7)" strokeWidth="1.5" fill="none" opacity="0.9">
                        <path d="M70 720 L70 560 L150 560 L150 600 L210 600 L210 720" />
                        <path d="M95 560 L95 720 M125 560 L125 720 M150 640 L210 640 M150 680 L210 680" />
                    </g>
                    {/* 右侧建筑剪影 */}
                    <g stroke="var(--stroke,#e4e4e7)" strokeWidth="1.5" fill="none" opacity="0.9">
                        <path d="M1070 720 L1070 590 L1130 530 L1190 590 L1190 720" />
                        <path d="M1100 720 L1100 600 L1160 600 L1160 720 M1130 555 L1130 600" />
                    </g>
                </svg>

                {/* 右上角金铜细角标 */}
                <div
                    className="absolute right-10 top-9 h-px w-16"
                    style={{ background: "var(--primary-color,#b08d57)", opacity: 0.6 }}
                    aria-hidden="true"
                />

                <div className="relative z-10 flex h-full flex-col px-16 pb-12 pt-12">
                    {/* 顶部标题区 */}
                    <div className="flex flex-shrink-0 flex-col items-center text-center">
                        <span
                            className="text-xs font-medium tracking-[0.35em] break-words"
                            style={{
                                color: "var(--primary-color,#b08d57)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            COMPARISON
                        </span>
                        <h1
                            className="mt-3 text-4xl font-light leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#27272a)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-5 h-px w-20"
                            style={{ background: "var(--primary-color,#b08d57)" }}
                        />
                    </div>

                    {/* 对比主体：左右对称 + 中间 VS */}
                    <div className="mt-8 flex min-h-0 flex-1 items-stretch">
                        <Column label={leftTitle} points={leftPoints} align="left" />

                        {/* 中间分隔 / VS */}
                        <div className="flex flex-shrink-0 flex-col items-center justify-center">
                            <span
                                className="inline-block w-px flex-1"
                                style={{ background: "var(--stroke,#e4e4e7)" }}
                                aria-hidden="true"
                            />
                            <div
                                className="my-4 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    border: "1px solid var(--primary-color,#b08d57)",
                                    boxShadow: "0 6px 20px rgba(176,141,87,0.18)",
                                }}
                            >
                                <span
                                    className="text-base font-medium tracking-wide"
                                    style={{ color: "var(--primary-color,#b08d57)" }}
                                >
                                    VS
                                </span>
                            </div>
                            <span
                                className="inline-block w-px flex-1"
                                style={{ background: "var(--stroke,#e4e4e7)" }}
                                aria-hidden="true"
                            />
                        </div>

                        <Column label={rightTitle} points={rightPoints} align="right" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comparison
