import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'travel-cn-three-points'
export const layoutName = '三栏要点'
export const layoutDescription = '旅游文旅风三栏要点：三等分列，每列图标+标题+描述。明媚海蓝配暖阳橙，指南针/路线点缀与轻盈卡片，纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('畅游三大理由').meta({
        description: "版式主标题（中文，简短有力，概括三个要点）",
    }),
    points: z.array(z.object({
        icon: IconSchema.meta({ description: "该要点的图标" }),
        title: z.string().min(2).max(12).meta({ description: "要点标题（中文，简短）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点描述（中文，一句话补充）" }),
    })).min(3).max(3).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/mountains-bold.svg',
                __icon_query__: 'mountains landscape',
            },
            title: '绝美风光',
            desc: '雪山湖泊与海岸线串联，移步换景，处处皆是明信片。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg',
                __icon_query__: 'compass navigation',
            },
            title: '深度玩法',
            desc: '专属路线与在地体验，从慢游小镇到秘境徒步随心选。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg',
                __icon_query__: 'heart hospitality',
            },
            title: '贴心服务',
            desc: '全程管家陪伴，吃住行无忧，让旅程轻盈又安心。',
        },
    ]).meta({ description: "三个要点，每个含图标、标题与描述" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ThreePoints: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '畅游三大理由'
    const points = (slideData?.points && slideData.points.length === 3)
        ? slideData.points
        : [
            {
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/mountains-bold.svg',
                    __icon_query__: 'mountains landscape',
                },
                title: '绝美风光',
                desc: '雪山湖泊与海岸线串联，移步换景，处处皆是明信片。',
            },
            {
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg',
                    __icon_query__: 'compass navigation',
                },
                title: '深度玩法',
                desc: '专属路线与在地体验，从慢游小镇到秘境徒步随心选。',
            },
            {
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg',
                    __icon_query__: 'heart hospitality',
                },
                title: '贴心服务',
                desc: '全程管家陪伴，吃住行无忧，让旅程轻盈又安心。',
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
                    background: "var(--background-color,#f0f9ff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：明媚海蓝光晕 + 暖阳橙 + 路线点缀（指南针/航线母题） */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="travelTpSky" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="travelTpSun" cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.22" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 顶部天空渐变带 */}
                        <rect x="0" y="0" width="1280" height="280" fill="url(#travelTpSky)" />
                        {/* 暖阳光晕（右上） */}
                        <circle cx="1120" cy="90" r="220" fill="url(#travelTpSun)" />
                        {/* 海岸航线虚线（路线母题） */}
                        <path
                            d="M-40 250 C 220 150, 460 330, 700 230 S 1140 130, 1340 250"
                            fill="none"
                            stroke="var(--primary-color,#0891b2)"
                            strokeOpacity="0.18"
                            strokeWidth="2.5"
                            strokeDasharray="2 12"
                            strokeLinecap="round"
                        />
                        {/* 同心圈（指南针/罗盘母题，左下角） */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={i} cx="80" cy="650" r={50 + i * 46} fill="none" stroke="var(--primary-color,#0891b2)" strokeOpacity={0.08} strokeWidth="1.5" />
                        ))}
                        {/* 底部海浪曲线 */}
                        <path
                            d="M0 690 C 200 660, 360 700, 600 678 S 1040 656, 1280 690 L 1280 720 L 0 720 Z"
                            fill="var(--primary-color,#0891b2)"
                            fillOpacity="0.06"
                        />
                    </svg>
                    {/* 暖阳橙强调点（航线终点） */}
                    <div
                        className="absolute"
                        style={{
                            top: '32%', right: '8%', width: '12px', height: '12px', borderRadius: '9999px',
                            background: "var(--secondary-color,#f59e0b)",
                            boxShadow: '0 0 0 6px rgba(245,158,11,0.16)',
                        }}
                    />
                </div>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-16 py-12">
                    {/* 标题区 */}
                    <div className="mb-10 flex flex-col items-center text-center">
                        <span
                            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--secondary-color,#f59e0b)",
                                background: "rgba(245,158,11,0.12)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {/* 小指南针徽标 */}
                            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                                <circle cx="12" cy="12" r="9" fill="none" stroke="var(--secondary-color,#f59e0b)" strokeWidth="1.6" />
                                <polygon points="12,6 14,12 12,18 10,12" fill="var(--secondary-color,#f59e0b)" />
                            </svg>
                            目的地指南
                        </span>
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-5 h-1.5 w-20 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                    </div>

                    {/* 三等分要点列 */}
                    <div className="grid grid-cols-3 gap-8">
                        {points.map((p, i) => {
                            const pTitle = p?.title || ['绝美风光', '深度玩法', '贴心服务'][i]
                            const pDesc = p?.desc || ['雪山湖泊与海岸线串联，移步换景，处处皆是明信片。', '专属路线与在地体验，从慢游小镇到秘境徒步随心选。', '全程管家陪伴，吃住行无忧，让旅程轻盈又安心。'][i]
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center rounded-3xl border px-7 py-9 text-center shadow-sm"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#bae6fd)",
                                    }}
                                >
                                    {/* 图标徽章 */}
                                    <div
                                        className="mb-6 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl"
                                        style={{
                                            background: "var(--primary-color,#0891b2)",
                                            boxShadow: '0 8px 20px rgba(8,145,178,0.22)',
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={p?.icon?.__icon_url__ || ''}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-8 h-8"
                                            title={p?.icon?.__icon_query__ || pTitle}
                                        />
                                    </div>

                                    {/* 序号小标记 */}
                                    <span
                                        className="mb-2 text-xs font-bold tracking-wide"
                                        style={{ color: "var(--secondary-color,#f59e0b)" }}
                                    >
                                        {`0${i + 1}`}
                                    </span>

                                    <h3
                                        className="mb-3 text-xl font-bold leading-[1.35] break-words"
                                        style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {pTitle}
                                    </h3>
                                    <p
                                        className="text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {pDesc}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThreePoints
