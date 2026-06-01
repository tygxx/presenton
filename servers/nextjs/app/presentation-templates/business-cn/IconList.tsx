import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'business-cn-icon-list'
export const layoutName = '图标要点列表'
export const layoutDescription = '商务风图标要点列表：深蓝标题区 + 4-6 条「左图标右文字」竖向要点，橙色强调与稳健网格装饰。纯 CSS/SVG，离线可渲染。'

const iconUrl = (name: string) => `https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${name}-bold.svg`

const schema = z.object({
    title: z.string().min(2).max(20).default('我们的核心优势').meta({
        description: "版式主标题（中文，简短有力，≤20字）",
    }),
    items: z.array(z.object({
        icon: IconSchema.default({
            __icon_url__: iconUrl('chart-line-up'),
            __icon_query__: 'growth chart',
        }).meta({ description: "要点图标" }),
        title: z.string().min(2).max(14).meta({ description: "要点小标题（中文，≤14字）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点说明（中文，≤40字）" }),
    })).min(4).max(6).default([
        {
            icon: { __icon_url__: iconUrl('chart-line-up'), __icon_query__: 'growth chart' },
            title: '业绩稳健增长',
            desc: '连续五年营收正增长，年均复合增速超过两成。',
        },
        {
            icon: { __icon_url__: iconUrl('users-three'), __icon_query__: 'expert team' },
            title: '专业团队',
            desc: '资深顾问平均从业十年以上，深耕行业一线。',
        },
        {
            icon: { __icon_url__: iconUrl('shield-check'), __icon_query__: 'risk control' },
            title: '风控严谨',
            desc: '全流程合规与风险管控，保障客户长期利益。',
        },
        {
            icon: { __icon_url__: iconUrl('globe-hemisphere-west'), __icon_query__: 'global network' },
            title: '全球布局',
            desc: '业务覆盖二十余个国家和地区，服务跨境客户。',
        },
        {
            icon: { __icon_url__: iconUrl('handshake'), __icon_query__: 'long term partnership' },
            title: '长期合作',
            desc: '九成以上客户持续续约，建立稳固信任关系。',
        },
    ]).meta({ description: "要点列表（4-6 条，左图标右文字）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const IconList: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '我们的核心优势'
    const items = (slideData?.items && slideData.items.length > 0 ? slideData.items : [
        { icon: { __icon_url__: iconUrl('chart-line-up'), __icon_query__: 'growth chart' }, title: '业绩稳健增长', desc: '连续五年营收正增长，年均复合增速超过两成。' },
        { icon: { __icon_url__: iconUrl('users-three'), __icon_query__: 'expert team' }, title: '专业团队', desc: '资深顾问平均从业十年以上，深耕行业一线。' },
        { icon: { __icon_url__: iconUrl('shield-check'), __icon_query__: 'risk control' }, title: '风控严谨', desc: '全流程合规与风险管控，保障客户长期利益。' },
        { icon: { __icon_url__: iconUrl('handshake'), __icon_query__: 'long term partnership' }, title: '长期合作', desc: '九成以上客户持续续约，建立稳固信任关系。' },
    ]).slice(0, 6)

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
                {/* 背景装饰：稳健网格 + 右上几何面板 + 橙色强调 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="bizIconGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                                <path d="M48 0H0V48" fill="none" stroke="#1e3a8a" strokeOpacity="0.05" strokeWidth="1" />
                            </pattern>
                            <linearGradient id="bizIconPanel" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.06" />
                                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#bizIconGrid)" />
                        <rect x="940" y="-120" width="500" height="500" fill="url(#bizIconPanel)" transform="rotate(18 1190 130)" />
                        {[0, 1, 2].map((i) => (
                            <circle key={i} cx="1180" cy="40" r={120 + i * 70} fill="none" stroke="#1e3a8a" strokeOpacity={0.05} strokeWidth="1.5" />
                        ))}
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="mb-9 flex flex-shrink-0 items-end justify-between">
                        <div className="flex flex-col">
                            <span
                                className="mb-3 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium break-words"
                                style={{
                                    color: "var(--secondary-color,#f97316)",
                                    background: "rgba(249,115,22,0.10)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                核心要点
                            </span>
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                        <div className="hidden h-1.5 w-24 flex-shrink-0 rounded-full sm:block" style={{ background: "var(--secondary-color,#f97316)" }} />
                    </div>

                    {/* 要点列表：左图标右文字 */}
                    <div className="flex min-h-0 flex-1 flex-col justify-center gap-4">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-5 rounded-2xl border p-5 shadow-sm"
                                style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                            >
                                {/* 左侧图标徽章 */}
                                <div
                                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{ background: "var(--primary-color,#1e3a8a)" }}
                                >
                                    <RemoteSvgIcon
                                        url={item?.icon?.__icon_url__ || iconUrl('star')}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-6 h-6"
                                        title={item?.icon?.__icon_query__ || 'icon'}
                                    />
                                </div>

                                {/* 右侧文字 */}
                                <div className="flex min-w-0 flex-1 flex-col">
                                    <div className="flex items-center gap-3">
                                        <h3
                                            className="text-lg font-bold leading-[1.3] break-words"
                                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.title || '要点标题'}
                                        </h3>
                                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                                    </div>
                                    <p
                                        className="mt-1 text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {item?.desc || '要点说明文字。'}
                                    </p>
                                </div>

                                {/* 序号 */}
                                <span
                                    className="hidden text-2xl font-black leading-none md:block"
                                    style={{ color: "var(--primary-color,#1e3a8a)", opacity: 0.14 }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default IconList
