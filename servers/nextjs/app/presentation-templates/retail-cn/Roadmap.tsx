import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'retail-cn-roadmap'
export const layoutName = '路线图'
export const layoutDescription = '电商新零售风路线图：撞色大色块 + 圆角卡片横向排列，潮流粗体排版，分阶段呈现增长计划。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('全渠道增长路线图').meta({
        description: "路线图主标题（中文，简短有力）",
    }),
    phases: z.array(z.object({
        phase: z.string().min(2).max(10).meta({
            description: "阶段标签，如『第一阶段』",
        }),
        title: z.string().min(2).max(16).meta({
            description: "阶段名称，简短有力",
        }),
        items: z.array(z.string().min(2).max(24).meta({
            description: "该阶段的关键举措，一句话",
        })).min(1).max(3).meta({
            description: "该阶段的关键举措列表",
        }),
    })).min(3).max(4).default([
        {
            phase: '第一阶段',
            title: '私域筑基',
            items: ['搭建会员中台', '上线小程序商城', '沉淀百万种子用户'],
        },
        {
            phase: '第二阶段',
            title: '爆品引流',
            items: ['打造现象级单品', '直播矩阵冷启动', 'GMV 突破亿元'],
        },
        {
            phase: '第三阶段',
            title: '全域共振',
            items: ['抖音天猫双轮驱动', '智能选品与履约', '复购率提升至 45%'],
        },
        {
            phase: '第四阶段',
            title: '生态进化',
            items: ['品牌联名出圈', '海外新兴市场布局', '年销规模冲刺十亿'],
        },
    ]).meta({
        description: "分阶段计划（3-4 个阶段，横向排列）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ACCENTS = [
    { bg: 'var(--primary-color,#db2777)', tag: 'rgba(255,255,255,0.18)', dot: 'var(--secondary-color,#f59e0b)' },
    { bg: 'var(--secondary-color,#f59e0b)', tag: 'rgba(255,255,255,0.20)', dot: 'var(--primary-color,#db2777)' },
    { bg: 'var(--primary-color,#db2777)', tag: 'rgba(255,255,255,0.18)', dot: 'var(--secondary-color,#f59e0b)' },
    { bg: 'var(--secondary-color,#f59e0b)', tag: 'rgba(255,255,255,0.20)', dot: 'var(--primary-color,#db2777)' },
]

const ICONS = ['rocket', 'fire', 'trend-up', 'crown']

const Roadmap: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '全渠道增长路线图'
    const phases = (slideData?.phases && slideData.phases.length > 0)
        ? slideData.phases
        : (schema.shape.phases._def as any)?.defaultValue || []

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景撞色大色块 + 活力几何装饰 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <div
                        className="absolute"
                        style={{
                            top: '-180px', right: '-120px', width: '480px', height: '480px', borderRadius: '9999px',
                            background: "var(--primary-color,#db2777)", opacity: 0.07,
                        }}
                    />
                    <div
                        className="absolute"
                        style={{
                            bottom: '-160px', left: '-80px', width: '360px', height: '360px', borderRadius: '64px',
                            transform: 'rotate(18deg)',
                            background: "var(--secondary-color,#f59e0b)", opacity: 0.08,
                        }}
                    />
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        {[...Array(4)].map((_, i) => (
                            <circle key={i} cx="1180" cy="120" r={36 + i * 46} fill="none" stroke="var(--stroke,#fbcfe8)" strokeOpacity={0.5} strokeWidth="2" />
                        ))}
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-14 py-11">
                    {/* 顶部标题区 + 价签徽标 */}
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div
                                className="h-10 w-2 rounded-full"
                                style={{ background: "var(--primary-color,#db2777)" }}
                            />
                            <h1
                                className="text-4xl font-black leading-[1.2] break-words"
                                style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                        {/* 潮流价签 */}
                        <div
                            className="flex flex-shrink-0 items-center gap-2 rounded-full px-5 py-2"
                            style={{ background: "var(--card-color,#fdf2f8)", border: "2px solid var(--stroke,#fbcfe8)" }}
                        >
                            <span
                                className="inline-block h-2.5 w-2.5 rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            />
                            <span
                                className="text-sm font-bold break-words"
                                style={{ color: "var(--primary-color,#db2777)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                分阶段计划
                            </span>
                        </div>
                    </div>

                    {/* 阶段卡片横向排列 */}
                    <div className="mt-9 flex flex-1 items-stretch gap-5">
                        {phases.map((p: SlideData['phases'][number], i: number) => {
                            const accent = ACCENTS[i % ACCENTS.length]
                            const iconName = ICONS[i % ICONS.length]
                            return (
                                <div
                                    key={i}
                                    className="flex flex-1 flex-col rounded-3xl p-6 shadow-sm"
                                    style={{ background: "var(--card-color,#fdf2f8)", border: "2px solid var(--stroke,#fbcfe8)" }}
                                >
                                    {/* 撞色头部色块 */}
                                    <div
                                        className="flex items-center justify-between rounded-2xl px-4 py-3"
                                        style={{ background: accent.bg }}
                                    >
                                        <span
                                            className="rounded-full px-3 py-1 text-xs font-bold break-words"
                                            style={{ background: accent.tag, color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p?.phase || `第${i + 1}阶段`}
                                        </span>
                                        <RemoteSvgIcon
                                            url={`https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${iconName}-bold.svg`}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-6 h-6"
                                            title={iconName}
                                        />
                                    </div>

                                    {/* 阶段名称 */}
                                    <h2
                                        className="mt-5 text-2xl font-black leading-[1.3] break-words"
                                        style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {p?.title || ''}
                                    </h2>

                                    <div
                                        className="mt-3 h-1 w-10 rounded-full"
                                        style={{ background: accent.dot }}
                                    />

                                    {/* 举措列表 */}
                                    <ul className="mt-4 flex flex-col gap-2.5">
                                        {(p?.items || []).map((item: string, j: number) => (
                                            <li key={j} className="flex items-start gap-2.5">
                                                <span
                                                    className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                                    style={{ background: accent.bg }}
                                                />
                                                <span
                                                    className="text-sm leading-[1.7] break-words"
                                                    style={{ color: "var(--background-text,#18181b)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                >
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Roadmap
