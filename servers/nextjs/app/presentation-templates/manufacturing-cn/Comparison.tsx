import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'manufacturing-cn-comparison'
export const layoutName = '左右对比'
export const layoutDescription = '智能制造风左右对比：工业深灰底 + 精密网格，左右两栏对称呈现两方对比/改造前后/优劣，中间齿轮 VS 分隔。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('产线智能化改造前后对比').meta({
        description: "对比页主标题（中文，简短有力）",
    }),
    leftTitle: z.string().min(2).max(12).default('传统产线').meta({
        description: "左栏标题（如改造前/方案A/传统模式）",
    }),
    rightTitle: z.string().min(2).max(12).default('智造产线').meta({
        description: "右栏标题（如改造后/方案B/智能模式）",
    }),
    leftPoints: z.array(z.string().min(2).max(30)).min(2).max(4).default([
        '人工巡检为主，故障响应滞后',
        '设备孤岛运行，数据难以打通',
        '换型调试耗时长，柔性不足',
        '良品率波动大，依赖老师傅经验',
    ]).meta({
        description: "左栏对比要点（每条≤30字，2~4 条）",
    }),
    rightPoints: z.array(z.string().min(2).max(30)).min(2).max(4).default([
        '传感器实时监测，秒级预警停机',
        '设备全连接，数据云端统一调度',
        '一键换型，柔性产线快速切换',
        'AI 质检稳定，良品率提升至 99.6%',
    ]).meta({
        description: "右栏对比要点（每条≤30字，2~4 条）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Comparison: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '产线智能化改造前后对比'
    const leftTitle = slideData?.leftTitle || '传统产线'
    const rightTitle = slideData?.rightTitle || '智造产线'
    const leftPoints = (slideData?.leftPoints && slideData.leftPoints.length > 0)
        ? slideData.leftPoints
        : ['人工巡检为主，故障响应滞后', '设备孤岛运行，数据难以打通', '换型调试耗时长，柔性不足', '良品率波动大，依赖老师傅经验']
    const rightPoints = (slideData?.rightPoints && slideData.rightPoints.length > 0)
        ? slideData.rightPoints
        : ['传感器实时监测，秒级预警停机', '设备全连接，数据云端统一调度', '一键换型，柔性产线快速切换', 'AI 质检稳定，良品率提升至 99.6%']

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#1f2937)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景：精密网格 + 工业母题装饰层 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="mfgGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--stroke,#374151)" strokeOpacity="0.35" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="mfgLeftWash" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="mfgRightWash" x1="1" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.14" />
                            <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#mfgGrid)" />
                    <rect x="0" y="0" width="640" height="720" fill="url(#mfgLeftWash)" />
                    <rect x="640" y="0" width="640" height="720" fill="url(#mfgRightWash)" />
                    {/* 左上角齿轮母题 */}
                    <g transform="translate(120,110)" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.16" fill="none" strokeWidth="2">
                        <circle r="46" />
                        <circle r="20" />
                        {Array.from({ length: 12 }).map((_, i) => {
                            const a = (i * Math.PI) / 6
                            return <line key={i} x1={Math.cos(a) * 46} y1={Math.sin(a) * 46} x2={Math.cos(a) * 58} y2={Math.sin(a) * 58} />
                        })}
                    </g>
                    {/* 右下角齿轮母题 */}
                    <g transform="translate(1160,610)" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.20" fill="none" strokeWidth="2">
                        <circle r="56" />
                        <circle r="24" />
                        {Array.from({ length: 14 }).map((_, i) => {
                            const a = (i * Math.PI) / 7
                            return <line key={i} x1={Math.cos(a) * 56} y1={Math.sin(a) * 56} x2={Math.cos(a) * 70} y2={Math.sin(a) * 70} />
                        })}
                    </g>
                    {/* 硬朗金属质感斜线 */}
                    <line x1="0" y1="180" x2="1280" y2="180" stroke="var(--stroke,#374151)" strokeOpacity="0.5" strokeWidth="1" />
                </svg>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-14 pt-9 pb-10">
                    {/* 顶部标题区 */}
                    <div className="flex flex-shrink-0 flex-col items-center text-center">
                        <span
                            className="mb-3 inline-flex items-center gap-2 rounded-sm px-4 py-1 text-xs font-bold uppercase break-words"
                            style={{
                                color: "var(--primary-color,#3b82f6)",
                                background: "rgba(59,130,246,0.12)",
                                border: "1px solid var(--stroke,#374151)",
                                letterSpacing: '0.18em',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            INTELLIGENT MANUFACTURING
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-4 flex items-center gap-3">
                            <span className="h-1 w-10 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                            <span className="h-1 w-10 rounded-full" style={{ background: "var(--primary-color,#3b82f6)" }} />
                        </div>
                    </div>

                    {/* 中部：左右两栏对称 + 中间 VS 分隔 */}
                    <div className="mt-7 flex min-h-0 flex-1 items-stretch gap-5">
                        {/* 左栏 */}
                        <div
                            className="flex flex-1 flex-col rounded-lg border p-7"
                            style={{
                                background: "var(--card-color,#111827)",
                                borderColor: "var(--stroke,#374151)",
                                boxShadow: "inset 0 0 0 1px rgba(249,115,22,0.10)",
                            }}
                        >
                            <div className="mb-5 flex items-center gap-3">
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md"
                                    style={{ background: "rgba(249,115,22,0.14)", border: "1px solid var(--secondary-color,#f97316)" }}
                                >
                                    <RemoteSvgIcon
                                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/gear-bold.svg"
                                        strokeColor="currentColor"
                                        color="var(--secondary-color,#f97316)"
                                        className="w-6 h-6"
                                        title="traditional production line"
                                    />
                                </div>
                                <h2
                                    className="text-2xl font-black leading-[1.3] break-words"
                                    style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {leftTitle}
                                </h2>
                            </div>
                            <ul className="flex flex-1 flex-col justify-center gap-4">
                                {leftPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rotate-45"
                                            style={{ background: "var(--secondary-color,#f97316)" }}
                                        />
                                        <span
                                            className="text-base leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.92, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 中间 VS 分隔（纯 CSS） */}
                        <div className="flex flex-shrink-0 flex-col items-center justify-center px-1">
                            <span className="w-px flex-1" style={{ background: "linear-gradient(to bottom, transparent, var(--stroke,#374151), transparent)" }} />
                            <div
                                className="my-3 flex h-14 w-14 items-center justify-center rounded-full text-lg font-black"
                                style={{
                                    color: "var(--primary-text,#ffffff)",
                                    background: "var(--background-color,#1f2937)",
                                    border: "2px solid var(--primary-color,#3b82f6)",
                                    boxShadow: "0 0 0 5px rgba(59,130,246,0.14)",
                                }}
                            >
                                VS
                            </div>
                            <span className="w-px flex-1" style={{ background: "linear-gradient(to bottom, transparent, var(--stroke,#374151), transparent)" }} />
                        </div>

                        {/* 右栏 */}
                        <div
                            className="flex flex-1 flex-col rounded-lg border p-7"
                            style={{
                                background: "var(--card-color,#111827)",
                                borderColor: "var(--primary-color,#3b82f6)",
                                boxShadow: "inset 0 0 0 1px rgba(59,130,246,0.16)",
                            }}
                        >
                            <div className="mb-5 flex items-center gap-3">
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md"
                                    style={{ background: "rgba(59,130,246,0.16)", border: "1px solid var(--primary-color,#3b82f6)" }}
                                >
                                    <RemoteSvgIcon
                                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/robot-bold.svg"
                                        strokeColor="currentColor"
                                        color="var(--primary-color,#3b82f6)"
                                        className="w-6 h-6"
                                        title="smart production line"
                                    />
                                </div>
                                <h2
                                    className="text-2xl font-black leading-[1.3] break-words"
                                    style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {rightTitle}
                                </h2>
                            </div>
                            <ul className="flex flex-1 flex-col justify-center gap-4">
                                {rightPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm"
                                            style={{ background: "var(--primary-color,#3b82f6)" }}
                                        >
                                            <RemoteSvgIcon
                                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/check-bold.svg"
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-3.5 h-3.5"
                                                title="advantage"
                                            />
                                        </span>
                                        <span
                                            className="text-base font-medium leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
