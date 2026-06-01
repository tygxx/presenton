import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'education-cn-comparison'
export const layoutName = '左右对比'
export const layoutDescription = '教育培训风左右对比页：左右两栏对称卡片，中间圆形 VS 分隔，配书本/灯泡/成长曲线圆点装饰。用于两方对比、改进前后、优劣分析。纯 CSS/SVG，离线可渲染，主题色自动跟随。'

const schema = z.object({
    title: z.string().min(2).max(20).default('传统课堂 vs 智慧课堂').meta({
        description: "对比页主标题（中文，简短有力）",
    }),
    leftTitle: z.string().min(2).max(12).default('传统课堂').meta({
        description: "左栏标题，如『改进前』『方案A』",
    }),
    rightTitle: z.string().min(2).max(12).default('智慧课堂').meta({
        description: "右栏标题，如『改进后』『方案B』",
    }),
    leftPoints: z.array(
        z.string().min(2).max(30).meta({ description: "左栏要点（中文，一句话）" })
    ).min(2).max(4).default([
        '老师单向灌输，学生被动接受',
        '统一进度，难以因材施教',
        '课后反馈滞后，问题难追踪',
        '教学资源有限，互动较少',
    ]).meta({ description: "左栏要点列表（2-4 条）" }),
    rightPoints: z.array(
        z.string().min(2).max(30).meta({ description: "右栏要点（中文，一句话）" })
    ).min(2).max(4).default([
        '互动探究学习，激发主动思考',
        '数据驱动，精准个性化辅导',
        '实时反馈，学习轨迹可视化',
        '海量资源，随时随地可学',
    ]).meta({ description: "右栏要点列表（2-4 条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Comparison: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '传统课堂 vs 智慧课堂'
    const leftTitle = slideData?.leftTitle || '传统课堂'
    const rightTitle = slideData?.rightTitle || '智慧课堂'
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
                    background: "var(--background-color,#fffdf7)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：成长曲线 + 圆点 + 光晕 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="eduCmpGlowL" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="eduCmpGlowR" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <circle cx="160" cy="120" r="240" fill="url(#eduCmpGlowL)" />
                        <circle cx="1120" cy="620" r="260" fill="url(#eduCmpGlowR)" />
                        {/* 成长曲线母题 */}
                        <path d="M40 640 C 320 600, 520 360, 760 320 S 1180 140, 1240 96" fill="none" stroke="var(--secondary-color,#f97316)" strokeOpacity="0.10" strokeWidth="3" strokeLinecap="round" />
                        {/* 圆点装饰母题 */}
                        {[
                            { x: 90, y: 250 }, { x: 150, y: 250 }, { x: 90, y: 310 },
                            { x: 1190, y: 200 }, { x: 1130, y: 200 }, { x: 1190, y: 260 },
                        ].map((d, i) => (
                            <circle key={i} cx={d.x} cy={d.y} r="5" fill="var(--primary-color,#2563eb)" fillOpacity="0.14" />
                        ))}
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-14 py-10">
                    {/* 标题区：灯泡图标 + 主标题 */}
                    <div className="flex flex-shrink-0 flex-col items-center text-center">
                        <div className="flex items-center gap-3">
                            <span
                                className="flex h-11 w-11 items-center justify-center rounded-2xl"
                                style={{ background: "var(--primary-color,#2563eb)", color: "var(--primary-text,#ffffff)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-6 h-6"
                                    title="lightbulb"
                                />
                            </span>
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                        <div className="mt-4 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                    </div>

                    {/* 对比区：左右对称卡片 + 中间 VS */}
                    <div className="mt-8 flex min-h-0 flex-1 items-stretch gap-5">
                        {/* 左栏卡片 */}
                        <div
                            className="flex flex-1 flex-col rounded-3xl border p-7 shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#f1e9d8)" }}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                                    style={{ background: "rgba(37,99,235,0.10)", color: "var(--primary-color,#2563eb)" }}
                                >
                                    <RemoteSvgIcon
                                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg"
                                        strokeColor="currentColor"
                                        color="var(--primary-color,#2563eb)"
                                        className="w-7 h-7"
                                        title="book"
                                    />
                                </span>
                                <h2
                                    className="text-2xl font-black leading-[1.3] break-words"
                                    style={{ color: "var(--primary-color,#2563eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {leftTitle}
                                </h2>
                            </div>
                            <div className="mt-5 h-px w-full" style={{ background: "var(--stroke,#f1e9d8)" }} />
                            <ul className="mt-5 flex flex-1 flex-col justify-center gap-4">
                                {leftPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--primary-color,#2563eb)" }}
                                        />
                                        <span
                                            className="text-base leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 中间 VS 分隔 */}
                        <div className="flex flex-shrink-0 flex-col items-center justify-center">
                            <div
                                className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-black shadow-md"
                                style={{
                                    background: "var(--secondary-color,#f97316)",
                                    color: "var(--primary-text,#ffffff)",
                                    boxShadow: '0 0 0 8px rgba(249,115,22,0.12)',
                                }}
                            >
                                VS
                            </div>
                        </div>

                        {/* 右栏卡片 */}
                        <div
                            className="flex flex-1 flex-col rounded-3xl border p-7 shadow-sm"
                            style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#f1e9d8)" }}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                                    style={{ background: "rgba(249,115,22,0.12)", color: "var(--secondary-color,#f97316)" }}
                                >
                                    <RemoteSvgIcon
                                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-launch-bold.svg"
                                        strokeColor="currentColor"
                                        color="var(--secondary-color,#f97316)"
                                        className="w-7 h-7"
                                        title="rocket"
                                    />
                                </span>
                                <h2
                                    className="text-2xl font-black leading-[1.3] break-words"
                                    style={{ color: "var(--secondary-color,#f97316)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {rightTitle}
                                </h2>
                            </div>
                            <div className="mt-5 h-px w-full" style={{ background: "var(--stroke,#f1e9d8)" }} />
                            <ul className="mt-5 flex flex-1 flex-col justify-center gap-4">
                                {rightPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--secondary-color,#f97316)" }}
                                        />
                                        <span
                                            className="text-base leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
