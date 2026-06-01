import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'green-cn-icon-list'
export const layoutName = '图标要点列表'
export const layoutDescription = '新能源环保风图标要点列表：清新白绿背景配叶片、地球与自然曲线装饰，左图标右文字的竖向 4-6 条要点。纯 CSS/SVG 装饰，离线可渲染。'

const iconUrl = (name: string) =>
    `https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${name}-bold.svg`

const schema = z.object({
    title: z.string().min(2).max(20).default('绿色发展四大举措').meta({
        description: "页面主标题（中文，简短有力，建议不超过 20 字）",
    }),
    items: z.array(z.object({
        icon: IconSchema.meta({ description: "要点配图标，选用贴合环保/能源母题的 phosphor 图标" }),
        title: z.string().min(2).max(14).meta({ description: "要点标题（中文，建议不超过 14 字）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点说明（中文一句话，建议不超过 40 字）" }),
    })).min(4).max(6).default([
        {
            icon: { __icon_url__: iconUrl('leaf'), __icon_query__: 'leaf' },
            title: '低碳运营',
            desc: '推进清洁能源替代，全流程降低碳排放强度。',
        },
        {
            icon: { __icon_url__: iconUrl('sun'), __icon_query__: 'solar energy' },
            title: '光伏发电',
            desc: '布局分布式光伏，提升绿电自给与消纳能力。',
        },
        {
            icon: { __icon_url__: iconUrl('drop'), __icon_query__: 'water recycle' },
            title: '循环利用',
            desc: '水资源循环与固废回收，实现资源高效复用。',
        },
        {
            icon: { __icon_url__: iconUrl('globe-hemisphere-west'), __icon_query__: 'green earth' },
            title: '生态修复',
            desc: '植被复绿与生物多样性保护，守护自然底色。',
        },
    ]).meta({ description: "图标要点列表，4-6 条，每条含图标、标题与说明" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const IconList: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '绿色发展四大举措'
    const items = (slideData?.items && slideData.items.length > 0
        ? slideData.items
        : (schema.shape.items as any)._def.defaultValue) as SlideData['items']

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
                {/* 背景装饰层：自然有机曲线 + 叶片 + 地球轮廓 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="greenIconBg" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.06" />
                        </linearGradient>
                        <linearGradient id="greenIconSky" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#greenIconBg)" />
                    {/* 左上天空蓝光晕 */}
                    <circle cx="120" cy="80" r="220" fill="url(#greenIconSky)" />
                    {/* 底部自然有机曲线（连绵丘陵感） */}
                    <path
                        d="M0 600 C 220 540 360 660 580 600 S 980 540 1280 612 L 1280 720 L 0 720 Z"
                        fill="#16a34a"
                        fillOpacity="0.07"
                    />
                    <path
                        d="M0 650 C 260 600 420 700 660 648 S 1040 596 1280 660 L 1280 720 L 0 720 Z"
                        fill="#16a34a"
                        fillOpacity="0.10"
                    />
                    {/* 右上叶片母题 */}
                    <g transform="translate(1180 96) rotate(28)" opacity="0.10">
                        <path
                            d="M0 0 C 90 -10 150 50 150 150 C 50 150 -10 90 0 0 Z"
                            fill="#16a34a"
                        />
                        <path
                            d="M8 8 C 60 60 110 110 142 142"
                            stroke="#16a34a"
                            strokeWidth="3"
                            fill="none"
                        />
                    </g>
                </svg>

                {/* 右上角能源母题角标：风车叶 + 阳光射线 */}
                <div className="absolute top-7 right-8 z-10" aria-hidden="true">
                    <svg width="84" height="84" viewBox="0 0 84 84">
                        {[0, 90, 180, 270].map((deg) => (
                            <path
                                key={deg}
                                d="M42 42 L42 8 C 56 14 56 30 42 42 Z"
                                fill="var(--secondary-color,#0891b2)"
                                fillOpacity="0.22"
                                transform={`rotate(${deg} 42 42)`}
                            />
                        ))}
                        <circle cx="42" cy="42" r="6" fill="var(--primary-color,#16a34a)" fillOpacity="0.5" />
                    </svg>
                </div>

                {/* 内容主体 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex-shrink-0">
                        <span
                            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-sm font-medium break-words"
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
                            可持续 · 绿色行动
                        </span>
                        <h1
                            className="mt-4 text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-4 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--primary-color,#16a34a)" }}
                        />
                    </div>

                    {/* 要点列表（竖向，左图标右文字） */}
                    <div className="mt-8 flex min-h-0 flex-1 flex-col justify-center gap-4">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-5 rounded-2xl border px-6 py-4"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#d1fae5)",
                                    boxShadow: '0 4px 16px rgba(22,163,74,0.06)',
                                }}
                            >
                                {/* 序号 + 图标 */}
                                <div className="flex flex-shrink-0 items-center gap-4">
                                    <span
                                        className="text-base font-black leading-none"
                                        style={{ color: "var(--secondary-color,#0891b2)", opacity: 0.55 }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div
                                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                        style={{
                                            background: "linear-gradient(135deg, var(--primary-color,#16a34a), var(--secondary-color,#0891b2))",
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={item?.icon?.__icon_url__ || iconUrl('leaf')}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-6 h-6"
                                            title={item?.icon?.__icon_query__ || 'leaf'}
                                        />
                                    </div>
                                </div>

                                {/* 文字 */}
                                <div className="flex min-w-0 flex-col">
                                    <h3
                                        className="text-lg font-bold leading-[1.4] break-words"
                                        style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {item?.title || '绿色举措'}
                                    </h3>
                                    <p
                                        className="mt-1 text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#14532d)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {item?.desc || '推动可持续发展，守护绿水青山。'}
                                    </p>
                                </div>

                                {/* 行尾叶片小装饰 */}
                                <div className="ml-auto flex-shrink-0" aria-hidden="true">
                                    <svg width="22" height="22" viewBox="0 0 22 22">
                                        <path
                                            d="M2 2 C 14 0 22 8 20 20 C 8 22 0 14 2 2 Z"
                                            fill="var(--primary-color,#16a34a)"
                                            fillOpacity="0.14"
                                        />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default IconList
