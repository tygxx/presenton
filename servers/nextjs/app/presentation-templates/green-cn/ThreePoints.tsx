import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'green-cn-three-points'
export const layoutName = '三栏要点'
export const layoutDescription = '新能源环保风三栏要点：清新白绿背景配天空蓝点缀，叶片/地球/能源自然曲线装饰，三等分列展示图标+标题+描述。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('绿色发展三大支柱').meta({
        description: "三栏要点的主标题（中文，简短有力，≤20字）",
    }),
    points: z.array(z.object({
        icon: IconSchema.meta({ description: "要点图标（phosphor 图标）" }),
        title: z.string().min(2).max(12).meta({ description: "要点标题（中文，≤12字）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点描述（中文，≤40字）" }),
    })).min(3).max(3).default([
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg",
                __icon_query__: "leaf",
            },
            title: '清洁能源',
            desc: '以风光储一体化替代化石燃料，从源头降低碳排放强度。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/recycle-bold.svg",
                __icon_query__: "recycle",
            },
            title: '循环再生',
            desc: '推动资源闭环回收与再制造，让废弃物重新成为可用原料。',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-hemisphere-east-bold.svg",
                __icon_query__: "earth globe",
            },
            title: '生态共生',
            desc: '守护蓝天碧水与生物多样性，构建人与自然和谐共生格局。',
        },
    ]).meta({ description: "三个要点，每个含图标、标题与描述" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ThreePoints: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '绿色发展三大支柱'
    const points = (slideData?.points && slideData.points.length === 3)
        ? slideData.points
        : [
            {
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg",
                    __icon_query__: "leaf",
                },
                title: '清洁能源',
                desc: '以风光储一体化替代化石燃料，从源头降低碳排放强度。',
            },
            {
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/recycle-bold.svg",
                    __icon_query__: "recycle",
                },
                title: '循环再生',
                desc: '推动资源闭环回收与再制造，让废弃物重新成为可用原料。',
            },
            {
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-hemisphere-east-bold.svg",
                    __icon_query__: "earth globe",
                },
                title: '生态共生',
                desc: '守护蓝天碧水与生物多样性，构建人与自然和谐共生格局。',
            },
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
                    background: "var(--background-color,#f0fdf4)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：天空蓝光晕 + 叶片/自然曲线母题 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="greenTpSky" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="greenTpLeafGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* 顶部天空蓝渐变带 */}
                        <rect x="0" y="0" width="1280" height="280" fill="url(#greenTpSky)" />
                        {/* 左上角有机叶片形 */}
                        <path
                            d="M -60 -40 C 180 -40 320 120 300 320 C 140 300 -20 200 -60 -40 Z"
                            fill="url(#greenTpLeafGlow)"
                        />
                        {/* 右上角地球弧线（同心圆纹样） */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={i} cx="1230" cy="80" r={70 + i * 60} fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity={0.10} strokeWidth="2" />
                        ))}
                        {/* 底部自然能源曲线 */}
                        <path d="M -40 660 C 280 600 480 700 760 620 C 980 558 1120 640 1320 580" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.16" strokeWidth="2.5" />
                        <path d="M -40 700 C 300 650 520 730 800 660 C 1020 606 1160 680 1320 630" fill="none" stroke="var(--secondary-color,#0891b2)" strokeOpacity="0.14" strokeWidth="2" />
                        {/* 右下角叶脉叶片 */}
                        <path
                            d="M 1340 760 C 1100 760 960 600 980 400 C 1140 420 1300 520 1340 760 Z"
                            fill="url(#greenTpLeafGlow)"
                        />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-col items-center text-center">
                        <span
                            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#16a34a)",
                                background: "rgba(22,163,74,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#0891b2)" }}
                            />
                            可持续 · 低碳 · 共生
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-5 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--primary-color,#16a34a)" }}
                        />
                    </div>

                    {/* 三等分要点列 */}
                    <div className="mt-10 grid flex-1 grid-cols-3 items-stretch gap-8">
                        {points.map((p, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center rounded-3xl border px-7 py-8 text-center shadow-sm"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#d1fae5)",
                                }}
                            >
                                {/* 图标圆形容器，叶绿渐变 + 天空蓝光圈 */}
                                <div
                                    className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl"
                                    style={{
                                        background: "linear-gradient(135deg, var(--primary-color,#16a34a), var(--secondary-color,#0891b2))",
                                        boxShadow: "0 0 0 6px rgba(8,145,178,0.10)",
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url={p?.icon?.__icon_url__}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-8 h-8"
                                        title={p?.icon?.__icon_query__ || 'leaf'}
                                    />
                                </div>

                                {/* 序号小标 */}
                                <span
                                    className="mt-5 text-xs font-bold tracking-wide"
                                    style={{ color: "var(--secondary-color,#0891b2)" }}
                                >
                                    {`0${i + 1}`}
                                </span>

                                <h3
                                    className="mt-2 text-xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p?.title}
                                </h3>

                                <div
                                    className="my-4 h-px w-10 rounded-full"
                                    style={{ background: "var(--stroke,#d1fae5)" }}
                                />

                                <p
                                    className="text-sm leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#14532d)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p?.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThreePoints
