import React from 'react'
import * as z from "zod";

export const layoutId = 'medical-cn-comparison'
export const layoutName = '左右对比'
export const layoutDescription = '医疗健康风左右对比版式：两栏对称卡片，中间 VS 圆形分隔，搭配脉搏波形与医疗十字装饰。适用于两方对比 / before-after / 优劣对照。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('传统诊疗 vs 智慧医疗').meta({
        description: "对比页主标题（中文，简短有力，≤20字）",
    }),
    leftTitle: z.string().min(1).max(12).default('传统诊疗模式').meta({
        description: "左栏标题（≤12字），代表对照方/旧方案",
    }),
    rightTitle: z.string().min(1).max(12).default('智慧医疗模式').meta({
        description: "右栏标题（≤12字），代表推荐方/新方案",
    }),
    leftPoints: z.array(z.string().min(1).max(30).meta({ description: "左栏要点（≤30字）" }))
        .min(2).max(4)
        .default([
            '人工排队挂号，候诊时间长',
            '纸质病历分散，难以追溯',
            '检查报告需多次往返医院',
        ])
        .meta({ description: "左栏对比要点列表（2-4条）" }),
    rightPoints: z.array(z.string().min(1).max(30).meta({ description: "右栏要点（≤30字）" }))
        .min(2).max(4)
        .default([
            '线上预约分时段，随到随诊',
            '电子健康档案全程可追溯',
            '检查结果云端推送，实时查阅',
        ])
        .meta({ description: "右栏对比要点列表（2-4条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Comparison: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '传统诊疗 vs 智慧医疗'
    const leftTitle = slideData?.leftTitle || '传统诊疗模式'
    const rightTitle = slideData?.rightTitle || '智慧医疗模式'
    const leftPoints = (slideData?.leftPoints && slideData.leftPoints.length > 0)
        ? slideData.leftPoints
        : ['人工排队挂号，候诊时间长', '纸质病历分散，难以追溯', '检查报告需多次往返医院']
    const rightPoints = (slideData?.rightPoints && slideData.rightPoints.length > 0)
        ? slideData.rightPoints
        : ['线上预约分时段，随到随诊', '电子健康档案全程可追溯', '检查结果云端推送，实时查阅']

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
                {/* 背景装饰层：柔和光晕 + 医疗十字 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <div
                        className="absolute"
                        style={{
                            top: '-120px', left: '-120px', width: '360px', height: '360px', borderRadius: '9999px',
                            background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, rgba(14,165,233,0) 70%)',
                        }}
                    />
                    <div
                        className="absolute"
                        style={{
                            bottom: '-140px', right: '-120px', width: '380px', height: '380px', borderRadius: '9999px',
                            background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0) 70%)',
                        }}
                    />
                    {/* 顶部脉搏波形 */}
                    <svg viewBox="0 0 1280 80" className="absolute left-0 right-0" style={{ top: '14px' }} preserveAspectRatio="none" aria-hidden="true">
                        <polyline
                            points="0,50 220,50 260,50 290,18 320,72 350,40 380,50 700,50 740,50 770,22 800,68 830,42 860,50 1280,50"
                            fill="none"
                            stroke="var(--primary-color,#0ea5e9)"
                            strokeOpacity="0.16"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-14 py-10">
                    {/* 顶部标题区 */}
                    <div className="flex flex-shrink-0 flex-col items-center text-center">
                        <span
                            className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#0ea5e9)",
                                background: 'rgba(14,165,233,0.10)',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {/* 医疗十字图标 */}
                            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                                <path
                                    d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z"
                                    fill="var(--secondary-color,#10b981)"
                                />
                            </svg>
                            对比分析
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-4 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#10b981)" }} />
                    </div>

                    {/* 左右对比区 */}
                    <div className="mt-8 flex flex-1 items-stretch gap-6">
                        {/* 左栏卡片 */}
                        <div
                            className="flex flex-1 flex-col rounded-3xl border p-7"
                            style={{
                                background: "var(--card-color,#ffffff)",
                                borderColor: "var(--stroke,#e2e8f0)",
                                boxShadow: '0 12px 30px -12px rgba(15,23,42,0.12)',
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                                    style={{ background: 'rgba(14,165,233,0.10)' }}
                                >
                                    {/* 脉搏图标 */}
                                    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                                        <polyline
                                            points="2,13 8,13 10,7 13,17 15,13 22,13"
                                            fill="none"
                                            stroke="var(--primary-color,#0ea5e9)"
                                            strokeWidth="2.2"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                                <h2
                                    className="text-xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {leftTitle}
                                </h2>
                            </div>
                            <div className="my-5 h-px w-full" style={{ background: "var(--stroke,#e2e8f0)" }} />
                            <ul className="flex flex-1 flex-col justify-center gap-4">
                                {leftPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--primary-color,#0ea5e9)", opacity: 0.55 }}
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
                            <div
                                className="h-12 w-px"
                                style={{ background: 'linear-gradient(to bottom, rgba(226,232,240,0) 0%, var(--stroke,#e2e8f0) 100%)' }}
                            />
                            <div
                                className="my-2 flex h-14 w-14 items-center justify-center rounded-full text-lg font-black"
                                style={{
                                    color: "var(--primary-text,#ffffff)",
                                    background: 'linear-gradient(135deg, var(--primary-color,#0ea5e9) 0%, var(--secondary-color,#10b981) 100%)',
                                    boxShadow: '0 10px 22px -8px rgba(14,165,233,0.55)',
                                }}
                            >
                                VS
                            </div>
                            <div
                                className="h-12 w-px"
                                style={{ background: 'linear-gradient(to top, rgba(226,232,240,0) 0%, var(--stroke,#e2e8f0) 100%)' }}
                            />
                        </div>

                        {/* 右栏卡片（推荐方，绿色强调） */}
                        <div
                            className="flex flex-1 flex-col rounded-3xl border p-7"
                            style={{
                                background: "var(--card-color,#ffffff)",
                                borderColor: 'rgba(16,185,129,0.35)',
                                boxShadow: '0 12px 32px -10px rgba(16,185,129,0.22)',
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                                    style={{ background: 'rgba(16,185,129,0.12)' }}
                                >
                                    {/* 爱心脉搏图标 */}
                                    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                                        <path
                                            d="M12 20.5C8 17.5 3.5 14 3.5 9.5 3.5 7 5.4 5.2 7.8 5.2c1.5 0 2.9.8 3.6 2 0.1 0.2 0.5 0.2 0.6 0 0.7-1.2 2.1-2 3.6-2 2.4 0 4.3 1.8 4.3 4.3 0 1.1-0.3 2.1-0.8 3h-3.4l-1.4-2.4-2 4.2-1.3-2.3H7.5"
                                            fill="none"
                                            stroke="var(--secondary-color,#10b981)"
                                            strokeWidth="1.8"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                                <h2
                                    className="text-xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--secondary-color,#10b981)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {rightTitle}
                                </h2>
                            </div>
                            <div className="my-5 h-px w-full" style={{ background: 'rgba(16,185,129,0.20)' }} />
                            <ul className="flex flex-1 flex-col justify-center gap-4">
                                {rightPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        {/* 对勾标记 */}
                                        <span
                                            className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{ background: 'rgba(16,185,129,0.14)' }}
                                        >
                                            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" aria-hidden="true">
                                                <polyline
                                                    points="3,8.5 6.5,12 13,4"
                                                    fill="none"
                                                    stroke="var(--secondary-color,#10b981)"
                                                    strokeWidth="2.4"
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </span>
                                        <span
                                            className="text-base font-medium leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
