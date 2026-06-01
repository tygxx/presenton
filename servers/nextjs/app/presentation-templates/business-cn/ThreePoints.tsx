import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'business-cn-three-points'
export const layoutName = '三栏要点'
export const layoutDescription = '商务风三栏要点：三等分列，每列为图标 + 小标题 + 描述。经典网格与几何面板装饰，橙色强调，稳健大气。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('三大核心优势').meta({
        description: "页面主标题（中文，简短有力）",
    }),
    points: z.array(z.object({
        icon: IconSchema.meta({ description: "要点图标" }),
        title: z.string().min(2).max(12).meta({ description: "要点小标题，简短" }),
        desc: z.string().min(4).max(40).meta({ description: "要点描述，一句话说明" }),
    })).min(3).max(3).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'growth chart',
            },
            title: '业绩增长',
            desc: '深耕行业十余年，营收连续五年保持两位数稳健增长。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'professional team',
            },
            title: '专业团队',
            desc: '汇聚资深行业专家，提供端到端的一站式商业解决方案。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
                __icon_query__: 'quality assurance',
            },
            title: '品质保障',
            desc: '严格的质量管控体系，为客户创造长期可衡量的商业价值。',
        },
    ]).meta({ description: "三个并列要点" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const DEFAULTS: SlideData = schema.parse({})

const ThreePoints: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || DEFAULTS.title
    const points = (slideData?.points && slideData.points.length > 0 ? slideData.points : DEFAULTS.points).slice(0, 3)

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
                {/* 背景装饰层：经典网格 + 顶部深蓝几何面板 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="bizTPGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0H0V40" fill="none" stroke="var(--primary-color,#1e3a8a)" strokeOpacity="0.05" strokeWidth="1" />
                            </pattern>
                            <linearGradient id="bizTPPanel" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#1e3a8a)" />
                                <stop offset="100%" stopColor="var(--primary-color,#1e3a8a)" stopOpacity="0.92" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#bizTPGrid)" />
                    </svg>
                    {/* 右上角橙色几何强调点 */}
                    <div
                        className="absolute"
                        style={{
                            top: '52px', right: '64px', width: '12px', height: '12px', borderRadius: '9999px',
                            background: "var(--secondary-color,#f97316)",
                            boxShadow: '0 0 0 6px rgba(249,115,22,0.16)',
                        }}
                    />
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-col items-center text-center">
                        <span
                            className="mb-4 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium tracking-wide break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            核心竞争力
                        </span>
                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-5 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />
                    </div>

                    {/* 三等分要点列 */}
                    <div className="mt-12 grid flex-1 grid-cols-3 gap-8">
                        {points.map((p, i) => (
                            <div
                                key={i}
                                className="flex flex-col rounded-2xl border p-8 shadow-sm"
                                style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                            >
                                {/* 图标 + 序号 */}
                                <div className="flex items-center justify-between">
                                    <div
                                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl"
                                        style={{ background: "var(--primary-color,#1e3a8a)" }}
                                    >
                                        <RemoteSvgIcon
                                            url={p?.icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-7 h-7"
                                            title={p?.icon?.__icon_query__}
                                        />
                                    </div>
                                    <span
                                        className="text-5xl font-black leading-none"
                                        style={{ color: "var(--secondary-color,#f97316)", opacity: 0.16 }}
                                    >
                                        {`0${i + 1}`}
                                    </span>
                                </div>

                                <h2
                                    className="mt-7 text-2xl font-bold leading-[1.3] break-words"
                                    style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p?.title}
                                </h2>

                                <div
                                    className="mt-3 h-1 w-10 rounded-full"
                                    style={{ background: "var(--secondary-color,#f97316)", opacity: 0.55 }}
                                />

                                <p
                                    className="mt-4 text-base leading-relaxed break-words"
                                    style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
