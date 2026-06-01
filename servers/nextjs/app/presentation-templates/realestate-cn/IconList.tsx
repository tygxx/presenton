import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'realestate-cn-icon-list'
export const layoutName = '图标要点列表'
export const layoutDescription = '房产建筑风图标要点列表：竖向 4-6 条「左图标右文字」要点，高级灰底配金铜点缀、细线分隔与建筑剪影装饰。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('品质人居的五重标准').meta({
        description: "页面主标题（中文，简短有力，≤20字）",
    }),
    items: z.array(z.object({
        icon: IconSchema.meta({ description: "要点图标" }),
        title: z.string().min(2).max(14).meta({ description: "要点小标题（中文，≤14字）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点说明（中文，≤40字）" }),
    })).min(4).max(6).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/buildings-bold.svg',
                __icon_query__: 'modern architecture',
            },
            title: '匠心营造',
            desc: '甄选优质建材与现代工艺，铸就经得起时间检验的建筑品质。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/tree-bold.svg',
                __icon_query__: 'landscape garden',
            },
            title: '园林景观',
            desc: '高绿化率中央庭院，四季有景，于喧嚣都市中安放一处静谧。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg',
                __icon_query__: 'prime location',
            },
            title: '稀缺地段',
            desc: '坐拥城市核心地段，地铁商圈名校环伺，价值随城市同步生长。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
                __icon_query__: 'smart security',
            },
            title: '智慧安防',
            desc: '人车分流与全域监控，多重智能门禁，为家人构筑全天候守护。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'community service',
            },
            title: '尊享服务',
            desc: '五星级物业管家团队，提供贴心管家式服务，居住体验从容自在。',
        },
    ]).meta({ description: "图标要点列表，4-6 条" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK_ITEMS = (schema.shape.items as any)._def.defaultValue as SlideData['items']

const IconList: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '品质人居的五重标准'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : FALLBACK_ITEMS

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
                {/* 背景装饰层：极简建筑剪影 + 细线 + 金铜光晕 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="reIconListGold" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="reIconListSkyline" x1="0" y1="1" x2="0" y2="0">
                                <stop offset="0%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.07" />
                                <stop offset="100%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.02" />
                            </linearGradient>
                        </defs>
                        {/* 右上角金铜光晕 */}
                        <circle cx="1180" cy="80" r="260" fill="url(#reIconListGold)" />
                        {/* 极简同心弧线 */}
                        {[0, 1, 2].map((i) => (
                            <circle key={i} cx="1180" cy="80" r={120 + i * 80} fill="none" stroke="var(--primary-color,#b08d57)" strokeOpacity={0.08} strokeWidth="1" />
                        ))}
                        {/* 底部极简建筑剪影 */}
                        <path
                            d="M0 720 L0 612 L120 612 L120 560 L210 560 L210 612 L320 612 L320 524 L360 524 L360 612 L470 612 L470 580 L560 580 L560 612 L660 612 L660 500 L700 500 L700 612 L820 612 L820 548 L910 548 L910 612 L1020 612 L1020 576 L1120 576 L1120 612 L1280 612 L1280 720 Z"
                            fill="url(#reIconListSkyline)"
                        />
                        {/* 剪影顶部细线勾边 */}
                        <path
                            d="M0 612 L120 612 L120 560 L210 560 L210 612 L320 612 L320 524 L360 524 L360 612 L470 612 L470 580 L560 580 L560 612 L660 612 L660 500 L700 500 L700 612 L820 612 L820 548 L910 548 L910 612 L1020 612 L1020 576 L1120 576 L1120 612 L1280 612"
                            fill="none"
                            stroke="var(--secondary-color,#3f3f46)"
                            strokeOpacity="0.10"
                            strokeWidth="1"
                        />
                    </svg>
                </div>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-20 py-14">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <span
                            className="text-xs font-light tracking-widest break-words"
                            style={{ color: "var(--primary-color,#b08d57)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            PROPERTY VALUE
                        </span>
                        <h1
                            className="mt-3 text-4xl font-light leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-5 h-px w-full" style={{ background: "var(--stroke,#e4e4e7)" }} />
                    </div>

                    {/* 要点列表区 */}
                    <div className="flex min-h-0 flex-1 flex-col justify-center">
                        <ul className="flex flex-col">
                            {items.map((item: any, i: number) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-6 py-4"
                                    style={
                                        i !== 0
                                            ? { borderTop: "1px solid var(--stroke,#e4e4e7)" }
                                            : undefined
                                    }
                                >
                                    {/* 序号 */}
                                    <span
                                        className="w-8 flex-shrink-0 text-sm font-light leading-none"
                                        style={{ color: "var(--primary-color,#b08d57)" }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>

                                    {/* 图标 */}
                                    <div
                                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
                                        style={{
                                            background: "var(--card-color,#ffffff)",
                                            border: "1px solid var(--stroke,#e4e4e7)",
                                            boxShadow: '0 1px 2px rgba(39,39,42,0.04)',
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={item?.icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-color,#b08d57)"
                                            className="w-5 h-5"
                                            title={item?.icon?.__icon_query__}
                                        />
                                    </div>

                                    {/* 文字 */}
                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <span
                                            className="text-lg font-medium leading-[1.4] break-words"
                                            style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.title}
                                        </span>
                                        <span
                                            className="mt-1 text-sm font-light leading-relaxed break-words"
                                            style={{ color: "var(--secondary-color,#3f3f46)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.desc}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IconList
