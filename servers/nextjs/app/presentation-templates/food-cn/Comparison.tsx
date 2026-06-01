import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'food-cn-comparison'
export const layoutName = '左右对比'
export const layoutDescription = '美食餐饮风左右对比页：暖米底 + 圆盘构图 + 焦糖金描边，左右两栏对称呈现两方对比/优劣/before-after，中间以圆形 VS 分隔。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('堂食 还是 外带').meta({
        description: "对比页主标题（中文，简短有力，≤20字）",
    }),
    leftTitle: z.string().min(2).max(12).default('店内堂食').meta({
        description: "左栏标题，如对比的一方名称（≤12字）",
    }),
    rightTitle: z.string().min(2).max(12).default('打包外带').meta({
        description: "右栏标题，如对比的另一方名称（≤12字）",
    }),
    leftPoints: z.array(z.string().min(2).max(30).meta({ description: "左栏要点（≤30字）" }))
        .min(2).max(4)
        .default([
            '现做现上，热气腾腾最入味',
            '环境氛围佳，适合聚餐小酌',
            '主厨摆盘，仪式感拉满',
            '服务即时，需求随叫随到',
        ])
        .meta({ description: "左栏对比要点列表（2-4条）" }),
    rightPoints: z.array(z.string().min(2).max(30).meta({ description: "右栏要点（≤30字）" }))
        .min(2).max(4)
        .default([
            '到店即取，节省排队等候',
            '随时开吃，办公居家两相宜',
            '密封锁鲜，口味稳定不打折',
            '环保餐盒，分量足够实在',
        ])
        .meta({ description: "右栏对比要点列表（2-4条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ColumnCard: React.FC<{
    side: 'left' | 'right'
    columnTitle: string
    points: string[]
    iconUrl: string
    iconQuery: string
}> = ({ side, columnTitle, points, iconUrl, iconQuery }) => {
    const isLeft = side === 'left'
    const accent = isLeft ? "var(--primary-color,#e8590c)" : "var(--secondary-color,#c92a2a)"
    const tint = isLeft ? 'rgba(232,89,12,0.10)' : 'rgba(201,42,42,0.10)'

    return (
        <div
            className="flex flex-1 flex-col rounded-3xl border p-8"
            style={{
                background: "var(--card-color,#fffaf2)",
                borderColor: "var(--stroke,#f0e0cc)",
                boxShadow: '0 18px 40px -24px rgba(59,36,18,0.35)',
            }}
        >
            {/* 顶部圆盘标识 + 栏标题 */}
            <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                    {/* 圆盘构图：外圈焦糖金描边 + 内圆暖色块 */}
                    <div
                        className="flex h-16 w-16 items-center justify-center rounded-full"
                        style={{ background: tint, boxShadow: `inset 0 0 0 2px ${accent}` }}
                    >
                        <div
                            className="flex h-12 w-12 items-center justify-center rounded-full"
                            style={{ background: accent }}
                        >
                            <RemoteSvgIcon
                                url={iconUrl}
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-7 h-7"
                                title={iconQuery}
                            />
                        </div>
                    </div>
                </div>
                <h2
                    className="text-2xl font-extrabold leading-[1.3] break-words"
                    style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                >
                    {columnTitle}
                </h2>
            </div>

            {/* 焦糖金分隔线 */}
            <div
                className="my-6 h-[3px] w-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${accent}, rgba(0,0,0,0))` }}
            />

            {/* 要点列表 */}
            <ul className="flex flex-1 flex-col justify-center gap-4">
                {points.map((p, i) => (
                    <li key={i} className="flex items-start gap-3">
                        {/* 餐具点缀感的圆形项目符号 */}
                        <span
                            className="mt-[2px] flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                            style={{ background: tint, color: accent }}
                        >
                            {i + 1}
                        </span>
                        <span
                            className="text-base leading-[1.7] break-words"
                            style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {p}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Comparison: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '堂食 还是 外带'
    const leftTitle = slideData?.leftTitle || '店内堂食'
    const rightTitle = slideData?.rightTitle || '打包外带'
    const leftPoints = (slideData?.leftPoints && slideData.leftPoints.length > 0)
        ? slideData.leftPoints
        : ['现做现上，热气腾腾最入味', '环境氛围佳，适合聚餐小酌', '主厨摆盘，仪式感拉满', '服务即时，需求随叫随到']
    const rightPoints = (slideData?.rightPoints && slideData.rightPoints.length > 0)
        ? slideData.rightPoints
        : ['到店即取，节省排队等候', '随时开吃，办公居家两相宜', '密封锁鲜，口味稳定不打折', '环保餐盒，分量足够实在']

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
                {/* 背景装饰层：圆盘母题 + 暖色光晕 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="foodCmpGlowL" cx="0%" cy="0%" r="60%">
                                <stop offset="0%" stopColor="#e8590c" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="#e8590c" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="foodCmpGlowR" cx="100%" cy="100%" r="60%">
                                <stop offset="0%" stopColor="#c92a2a" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="#c92a2a" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#foodCmpGlowL)" />
                        <rect width="1280" height="720" fill="url(#foodCmpGlowR)" />
                        {/* 左上圆盘同心圆 */}
                        {[0, 1, 2].map((i) => (
                            <circle key={`l${i}`} cx="120" cy="100" r={60 + i * 46} fill="none" stroke="#e8590c" strokeOpacity={0.08} strokeWidth="2" />
                        ))}
                        {/* 右下圆盘同心圆 */}
                        {[0, 1, 2].map((i) => (
                            <circle key={`r${i}`} cx="1170" cy="640" r={60 + i * 46} fill="none" stroke="#c92a2a" strokeOpacity={0.08} strokeWidth="2" />
                        ))}
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col items-center text-center">
                        <span
                            className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold break-words"
                            style={{
                                color: "var(--primary-color,#e8590c)",
                                background: 'rgba(232,89,12,0.10)',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-color,#e8590c)"
                                className="w-4 h-4"
                                title="fork and knife"
                            />
                            两相对比
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-4 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--primary-color,#e8590c)" }}
                        />
                    </div>

                    {/* 对比主体：左右对称 + 中间圆形 VS */}
                    <div className="relative mt-8 flex min-h-0 flex-1 items-stretch gap-16">
                        <ColumnCard
                            side="left"
                            columnTitle={leftTitle}
                            points={leftPoints}
                            iconUrl="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chef-hat-bold.svg"
                            iconQuery="chef hat"
                        />
                        <ColumnCard
                            side="right"
                            columnTitle={rightTitle}
                            points={rightPoints}
                            iconUrl="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shopping-bag-bold.svg"
                            iconQuery="takeaway bag"
                        />

                        {/* 中间圆形 VS 分隔（圆盘构图 + 焦糖金描边） */}
                        <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                            <div
                                className="flex h-20 w-20 items-center justify-center rounded-full text-xl font-black"
                                style={{
                                    background: "var(--card-color,#fffaf2)",
                                    color: "var(--primary-text,#ffffff)",
                                    boxShadow: '0 0 0 4px var(--background-color,#fdf6ec), 0 12px 28px -10px rgba(59,36,18,0.5)',
                                }}
                            >
                                <div
                                    className="flex h-14 w-14 items-center justify-center rounded-full"
                                    style={{ background: "linear-gradient(135deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))" }}
                                >
                                    VS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comparison
