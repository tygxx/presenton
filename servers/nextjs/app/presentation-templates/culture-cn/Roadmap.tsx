import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { IconSchema } from '../defaultSchemes';

export const layoutId = 'culture-cn-roadmap'
export const layoutName = '路线图'
export const layoutDescription = '国潮文创风路线图：宣纸米黄底叠墨色印章红块与描金纹样，阶段卡横向排列展示分阶段计划。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('文创品牌焕新之路').meta({
        description: "路线图主标题（中文，简短有力，≤20字）",
    }),
    subtitle: z.string().min(2).max(30).default('以东方美学重塑国潮文创全链路').meta({
        description: "副标题，一句话补充说明（≤30字）",
    }),
    phases: z.array(z.object({
        phase: z.string().min(2).max(10).meta({ description: "阶段标签，如『第一阶段』" }),
        title: z.string().min(2).max(16).meta({ description: "阶段标题（≤16字）" }),
        items: z.array(z.string().min(2).max(24).meta({ description: "阶段要点（≤24字）" }))
            .min(1).max(3).meta({ description: "该阶段的关键举措，1-3条" }),
        icon: IconSchema.default({
            __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/seal-bold.svg",
            __icon_query__: "seal",
        }).meta({ description: "阶段图标" }),
    })).min(3).max(4).default([
        {
            phase: '第一阶段',
            title: '溯源立意',
            items: ['深挖非遗纹样与典故', '确立东方美学定位', '组建匠心设计团队'],
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/scroll-bold.svg",
                __icon_query__: "scroll",
            },
        },
        {
            phase: '第二阶段',
            title: '匠造打磨',
            items: ['首批联名文创打样', '工艺与材质反复推敲', '小范围内测口碑'],
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/paint-brush-bold.svg",
                __icon_query__: "paint brush",
            },
        },
        {
            phase: '第三阶段',
            title: '国潮出圈',
            items: ['博物馆联名首发', '社媒话题造势', '快闪体验店落地'],
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/megaphone-bold.svg",
                __icon_query__: "megaphone",
            },
        },
        {
            phase: '第四阶段',
            title: '生态长青',
            items: ['搭建文创IP矩阵', '深耕会员社群', '走向海外讲东方故事'],
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/tree-bold.svg",
                __icon_query__: "tree",
            },
        },
    ]).meta({ description: "分阶段计划，3-4个阶段横向排列" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Roadmap: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '文创品牌焕新之路'
    const subtitle = slideData?.subtitle || '以东方美学重塑国潮文创全链路'
    const phases = (slideData?.phases && slideData.phases.length > 0)
        ? slideData.phases
        : [
            {
                phase: '第一阶段',
                title: '溯源立意',
                items: ['深挖非遗纹样与典故', '确立东方美学定位', '组建匠心设计团队'],
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/scroll-bold.svg",
                    __icon_query__: "scroll",
                },
            },
            {
                phase: '第二阶段',
                title: '匠造打磨',
                items: ['首批联名文创打样', '工艺与材质反复推敲', '小范围内测口碑'],
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/paint-brush-bold.svg",
                    __icon_query__: "paint brush",
                },
            },
            {
                phase: '第三阶段',
                title: '国潮出圈',
                items: ['博物馆联名首发', '社媒话题造势', '快闪体验店落地'],
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/megaphone-bold.svg",
                    __icon_query__: "megaphone",
                },
            },
            {
                phase: '第四阶段',
                title: '生态长青',
                items: ['搭建文创IP矩阵', '深耕会员社群', '走向海外讲东方故事'],
                icon: {
                    __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/tree-bold.svg",
                    __icon_query__: "tree",
                },
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
                    background: "var(--background-color,#f5ecd9)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：水墨笔触 + 传统纹样 + 留白意境 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="cultureRoadInk" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0" />
                        </linearGradient>
                        <pattern id="cultureRoadPattern" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                            <path d="M0 22 H44 M22 0 V44" stroke="var(--primary-color,#c0392b)" strokeOpacity="0.05" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {/* 顶部传统回纹纹样带 */}
                    <rect x="0" y="0" width="1280" height="720" fill="url(#cultureRoadPattern)" />
                    {/* 左上水墨笔触晕染 */}
                    <ellipse cx="120" cy="80" rx="220" ry="120" fill="url(#cultureRoadInk)" />
                    {/* 右下水墨笔触晕染 */}
                    <ellipse cx="1160" cy="660" rx="260" ry="140" fill="url(#cultureRoadInk)" />
                </svg>

                {/* 右上角描金圆环点缀 */}
                <svg className="absolute top-0 right-0" width="220" height="220" viewBox="0 0 220 220" aria-hidden="true">
                    {[0, 1, 2].map((i) => (
                        <circle key={i} cx="190" cy="30" r={26 + i * 26} fill="none" stroke="var(--primary-color,#c0392b)" strokeOpacity={0.14} strokeWidth="1.5" />
                    ))}
                </svg>

                {/* 左侧描金竖线 */}
                <div
                    className="absolute left-0 top-0 h-full"
                    style={{ width: '6px', background: "linear-gradient(180deg, var(--primary-color,#c0392b), var(--secondary-color,#1a1a1a))" }}
                />

                <div className="relative z-10 flex h-full flex-col px-14 py-10">
                    {/* 页眉：印章红块标识 + 标题 */}
                    <div className="flex items-start gap-5">
                        {/* 印章红块 */}
                        <div
                            className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-md leading-[1.2]"
                            style={{
                                background: "var(--primary-color,#c0392b)",
                                color: "var(--primary-text,#ffffff)",
                                boxShadow: "0 0 0 2px var(--background-color,#f5ecd9), 0 0 0 4px var(--primary-color,#c0392b)",
                            }}
                        >
                            <span className="text-xl font-black break-words" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>规划</span>
                            <span className="text-[10px] font-medium opacity-90 break-words" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>路线</span>
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <p
                                className="mt-2 text-base leading-relaxed break-words"
                                style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    {/* 描金分隔线 */}
                    <div
                        className="mt-6 h-px w-full"
                        style={{ background: "linear-gradient(90deg, var(--primary-color,#c0392b), var(--stroke,#ddd0b4) 60%, transparent)" }}
                    />

                    {/* 阶段卡横向排列 */}
                    <div className="mt-6 flex flex-1 items-stretch gap-5">
                        {phases.map((p, i) => {
                            const phaseLabel = p?.phase || `第${i + 1}阶段`
                            const phaseTitle = p?.title || ''
                            const items = (p?.items && p.items.length > 0) ? p.items : []
                            const icon = p?.icon
                            return (
                                <div key={i} className="flex flex-1 flex-col">
                                    {/* 连接节点：墨点 + 描金连线 */}
                                    <div className="mb-4 flex items-center">
                                        <div
                                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-black"
                                            style={{
                                                background: "var(--secondary-color,#1a1a1a)",
                                                color: "var(--primary-text,#ffffff)",
                                                boxShadow: "0 0 0 3px var(--card-color,#fbf5e9)",
                                            }}
                                        >
                                            {i + 1}
                                        </div>
                                        <div
                                            className="ml-2 h-0.5 flex-1 rounded-full"
                                            style={{
                                                background: i === phases.length - 1
                                                    ? "var(--stroke,#ddd0b4)"
                                                    : "linear-gradient(90deg, var(--primary-color,#c0392b), var(--stroke,#ddd0b4))",
                                            }}
                                        />
                                    </div>

                                    {/* 卡片主体 */}
                                    <div
                                        className="flex flex-1 flex-col rounded-xl border p-5"
                                        style={{
                                            background: "var(--card-color,#fbf5e9)",
                                            borderColor: "var(--stroke,#ddd0b4)",
                                            boxShadow: "0 6px 16px rgba(26,26,26,0.06)",
                                        }}
                                    >
                                        {/* 图标 + 阶段标签 */}
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg"
                                                style={{ background: "var(--primary-color,#c0392b)" }}
                                            >
                                                <RemoteSvgIcon
                                                    url={icon?.__icon_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/seal-bold.svg"}
                                                    strokeColor="currentColor"
                                                    color="var(--primary-text,#ffffff)"
                                                    className="w-6 h-6"
                                                    title={icon?.__icon_query__ || "seal"}
                                                />
                                            </div>
                                            <span
                                                className="text-xs font-bold tracking-wide break-words"
                                                style={{ color: "var(--primary-color,#c0392b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {phaseLabel}
                                            </span>
                                        </div>

                                        {/* 阶段标题 */}
                                        <h2
                                            className="mt-3 text-xl font-black leading-[1.3] break-words"
                                            style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {phaseTitle}
                                        </h2>

                                        {/* 阶段要点 */}
                                        <ul className="mt-3 flex flex-col gap-2.5">
                                            {items.map((it, j) => (
                                                <li key={j} className="flex items-start gap-2">
                                                    <span
                                                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                                        style={{ background: "var(--primary-color,#c0392b)" }}
                                                    />
                                                    <span
                                                        className="text-sm leading-relaxed break-words"
                                                        style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                    >
                                                        {it}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
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
