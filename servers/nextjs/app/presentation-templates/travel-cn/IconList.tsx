import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'travel-cn-icon-list'
export const layoutName = '图标要点列表'
export const layoutDescription = '旅游文旅风图标要点列表：明媚海蓝标题区 + 4-6 条「左图标右文字」竖向要点，暖阳橙强调与指南针/路线点缀装饰。纯 CSS/SVG，离线可渲染。'

const iconUrl = (name: string) => `https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${name}-bold.svg`

const schema = z.object({
    title: z.string().min(2).max(20).default('一站式畅游服务').meta({
        description: "版式主标题（中文，简短有力，≤20字）",
    }),
    items: z.array(z.object({
        icon: IconSchema.default({
            __icon_url__: iconUrl('map-trifold'),
            __icon_query__: 'travel route map',
        }).meta({ description: "要点图标" }),
        title: z.string().min(2).max(14).meta({ description: "要点小标题（中文，≤14字）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点说明（中文，≤40字）" }),
    })).min(4).max(6).default([
        {
            icon: { __icon_url__: iconUrl('map-trifold'), __icon_query__: 'travel route map' },
            title: '精选路线',
            desc: '资深领队踏勘每一段行程，串联绝美风景与人文体验。',
        },
        {
            icon: { __icon_url__: iconUrl('airplane-tilt'), __icon_query__: 'flight booking' },
            title: '机酒一站订',
            desc: '航班酒店一键打包，省心比价，出发前无需操心。',
        },
        {
            icon: { __icon_url__: iconUrl('compass'), __icon_query__: 'local guide' },
            title: '当地向导',
            desc: '本地中文向导全程随行，深度玩转隐藏小众目的地。',
        },
        {
            icon: { __icon_url__: iconUrl('shield-check'), __icon_query__: 'travel insurance' },
            title: '安心保障',
            desc: '全程旅行保险与二十四小时应急支援，畅游无忧。',
        },
        {
            icon: { __icon_url__: iconUrl('camera'), __icon_query__: 'photo spots' },
            title: '打卡机位',
            desc: '私藏出片机位与最佳光线时段，随手拍出大片质感。',
        },
    ]).meta({ description: "要点列表（4-6 条，左图标右文字）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const IconList: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '一站式畅游服务'
    const items = (slideData?.items && slideData.items.length > 0 ? slideData.items : [
        { icon: { __icon_url__: iconUrl('map-trifold'), __icon_query__: 'travel route map' }, title: '精选路线', desc: '资深领队踏勘每一段行程，串联绝美风景与人文体验。' },
        { icon: { __icon_url__: iconUrl('airplane-tilt'), __icon_query__: 'flight booking' }, title: '机酒一站订', desc: '航班酒店一键打包，省心比价，出发前无需操心。' },
        { icon: { __icon_url__: iconUrl('compass'), __icon_query__: 'local guide' }, title: '当地向导', desc: '本地中文向导全程随行，深度玩转隐藏小众目的地。' },
        { icon: { __icon_url__: iconUrl('shield-check'), __icon_query__: 'travel insurance' }, title: '安心保障', desc: '全程旅行保险与二十四小时应急支援，畅游无忧。' },
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
                    background: "var(--background-color,#f0f9ff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：轻盈海面波纹 + 暖阳光晕 + 虚线路线 + 指南针点缀 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="travelIconSky" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="travelIconSun" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.28" />
                                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 顶部天空渐变带 */}
                        <rect width="1280" height="360" fill="url(#travelIconSky)" />
                        {/* 右上暖阳光晕 */}
                        <circle cx="1130" cy="90" r="220" fill="url(#travelIconSun)" />
                        <circle cx="1130" cy="90" r="46" fill="#f59e0b" fillOpacity="0.12" />
                        {/* 轻盈海面波纹 */}
                        <path d="M0 612 Q 160 580 320 612 T 640 612 T 960 612 T 1280 612" fill="none" stroke="#0891b2" strokeOpacity="0.12" strokeWidth="2" />
                        <path d="M0 660 Q 160 628 320 660 T 640 660 T 960 660 T 1280 660" fill="none" stroke="#0891b2" strokeOpacity="0.08" strokeWidth="2" />
                        {/* 虚线旅行路线 + 路线点 */}
                        <path d="M120 150 C 340 80 520 220 760 150 S 1120 100 1180 200" fill="none" stroke="#f59e0b" strokeOpacity="0.30" strokeWidth="2.5" strokeDasharray="2 12" strokeLinecap="round" />
                        <circle cx="120" cy="150" r="6" fill="none" stroke="#f59e0b" strokeOpacity="0.5" strokeWidth="2.5" />
                        <circle cx="1180" cy="200" r="6" fill="#f59e0b" fillOpacity="0.5" />
                    </svg>
                    {/* 左下角指南针线稿点缀 */}
                    <svg viewBox="0 0 120 120" className="absolute" style={{ width: '150px', height: '150px', left: '-26px', bottom: '-26px', opacity: 0.10 }} aria-hidden="true">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#0891b2" strokeWidth="3" />
                        <circle cx="60" cy="60" r="38" fill="none" stroke="#0891b2" strokeWidth="1.5" />
                        <polygon points="60,22 70,60 60,98 50,60" fill="#0891b2" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="mb-8 flex flex-shrink-0 items-end justify-between">
                        <div className="flex flex-col">
                            <span
                                className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                                style={{
                                    color: "var(--secondary-color,#f59e0b)",
                                    background: "rgba(245,158,11,0.12)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                <RemoteSvgIcon
                                    url={iconUrl('compass')}
                                    strokeColor="currentColor"
                                    color="var(--secondary-color,#f59e0b)"
                                    className="w-4 h-4"
                                    title="travel"
                                />
                                旅行服务
                            </span>
                            <h1
                                className="text-4xl font-bold leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                        <div className="hidden h-1.5 w-24 flex-shrink-0 rounded-full sm:block" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                    </div>

                    {/* 要点列表：左图标右文字 */}
                    <div className="flex min-h-0 flex-1 flex-col justify-center gap-4">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-5 rounded-2xl border p-5 shadow-sm"
                                style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#bae6fd)" }}
                            >
                                {/* 左侧图标徽章（海蓝渐变） */}
                                <div
                                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                                    style={{
                                        background: "linear-gradient(135deg, var(--primary-color,#0891b2), var(--secondary-color,#f59e0b))",
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url={item?.icon?.__icon_url__ || iconUrl('map-pin')}
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
                                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.title || '要点标题'}
                                        </h3>
                                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                                    </div>
                                    <p
                                        className="mt-1 text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {item?.desc || '要点说明文字。'}
                                    </p>
                                </div>

                                {/* 序号 */}
                                <span
                                    className="hidden text-2xl font-black leading-none md:block"
                                    style={{ color: "var(--primary-color,#0891b2)", opacity: 0.16 }}
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
