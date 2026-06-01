import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'travel-cn-closing'
export const layoutName = '结尾联系'
export const layoutDescription = '旅游文旅结尾页：明媚海蓝渐变 + 暖阳橙点缀 + 指南针/路线点装饰，大字致谢与联系信息行。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('谢谢观看').meta({
        description: "结尾大字致谢标题（中文，简短）",
    }),
    subtitle: z.string().min(2).max(36).default('愿每一段旅程都奔赴山海与热爱').meta({
        description: "副标题，一句温暖的结语（可选）",
    }),
    contacts: z.array(z.object({
        label: z.string().min(1).max(12).meta({ description: "联系方式名称，如『预订热线』『官方网站』" }),
        value: z.string().min(1).max(30).meta({ description: "联系方式内容，如电话/网址/邮箱" }),
        icon: IconSchema.optional().meta({ description: "联系方式图标（可选）" }),
    })).min(1).max(4).default([
        {
            label: '预订热线',
            value: '400-888-6688',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg',
                __icon_query__: 'phone',
            },
        },
        {
            label: '官方网站',
            value: 'www.yunyou-travel.com',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg',
                __icon_query__: 'globe website',
            },
        },
        {
            label: '邮箱咨询',
            value: 'hello@yunyou-travel.com',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg',
                __icon_query__: 'email envelope',
            },
        },
        {
            label: '门店地址',
            value: '杭州市西湖区文旅大厦 18 层',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg',
                __icon_query__: 'map pin location',
            },
        },
    ]).meta({ description: "联系方式列表（1-4 项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Closing: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '谢谢观看'
    const subtitle = slideData?.subtitle || '愿每一段旅程都奔赴山海与热爱'
    const contacts = (slideData?.contacts && slideData.contacts.length > 0)
        ? slideData.contacts
        : [
            { label: '预订热线', value: '400-888-6688', icon: undefined },
            { label: '官方网站', value: 'www.yunyou-travel.com', icon: undefined },
            { label: '邮箱咨询', value: 'hello@yunyou-travel.com', icon: undefined },
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
                {/* 背景：明媚海蓝天空渐变层 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(165deg, var(--background-color,#f0f9ff) 0%, #e0f2fe 46%, #cdeafd 100%)",
                    }}
                    aria-hidden="true"
                />

                {/* 背景装饰：远山、暖阳、路线点、指南针 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="travelSunGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="travelSeaBand" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.04" />
                        </linearGradient>
                        <linearGradient id="travelHill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="var(--primary-color,#0891b2)" stopOpacity="0.10" />
                        </linearGradient>
                    </defs>

                    {/* 暖阳光晕 */}
                    <circle cx="1040" cy="150" r="190" fill="url(#travelSunGlow)" />
                    <circle cx="1040" cy="150" r="64" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.85" />

                    {/* 海平面色带 */}
                    <rect x="0" y="520" width="1280" height="200" fill="url(#travelSeaBand)" />

                    {/* 远山轮廓 */}
                    <path d="M0 560 L180 470 L340 545 L520 460 L700 540 L900 470 L1100 548 L1280 500 L1280 720 L0 720 Z" fill="url(#travelHill)" />
                    <path d="M0 600 L240 540 L470 600 L720 530 L980 600 L1280 555 L1280 720 L0 720 Z" fill="var(--primary-color,#0891b2)" fillOpacity="0.10" />

                    {/* 虚线路线 + 路线点 */}
                    <path
                        d="M120 360 C 320 300, 520 420, 760 330 S 1120 280, 1180 250"
                        fill="none"
                        stroke="var(--primary-color,#0891b2)"
                        strokeOpacity="0.35"
                        strokeWidth="2.5"
                        strokeDasharray="2 12"
                        strokeLinecap="round"
                    />
                    <circle cx="120" cy="360" r="6" fill="var(--secondary-color,#f59e0b)" />
                    <circle cx="760" cy="330" r="6" fill="var(--primary-color,#0891b2)" />
                    <circle cx="1180" cy="250" r="6" fill="var(--secondary-color,#f59e0b)" />

                    {/* 指南针母题（右上角，轻盈线条） */}
                    <g transform="translate(1108 470)" stroke="var(--primary-color,#0891b2)" strokeOpacity="0.30" fill="none">
                        <circle r="58" strokeWidth="2" />
                        <circle r="44" strokeWidth="1" strokeDasharray="3 7" />
                        <polygon points="0,-40 11,0 0,40 -11,0" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.55" stroke="none" />
                        <polygon points="0,-40 11,0 0,0" fill="var(--primary-color,#0891b2)" fillOpacity="0.45" stroke="none" />
                    </g>

                    {/* 轻盈光斑 */}
                    <circle cx="240" cy="180" r="6" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.5" />
                    <circle cx="430" cy="120" r="4" fill="var(--primary-color,#0891b2)" fillOpacity="0.4" />
                    <circle cx="640" cy="200" r="5" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.35" />
                </svg>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-20 py-14">
                    {/* 小标签 */}
                    <span
                        className="mb-7 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold break-words"
                        style={{
                            color: "var(--primary-color,#0891b2)",
                            background: "rgba(8,145,178,0.10)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <span
                            className="inline-block h-2 w-2 rounded-full"
                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                        />
                        旅途有终点 · 感谢一路同行
                    </span>

                    {/* 大字致谢 */}
                    <h1
                        className="text-7xl font-black leading-[1.2] break-words"
                        style={{
                            color: "var(--background-text,#0c4a6e)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    {/* 橙色短分隔条 */}
                    <div
                        className="my-7 h-1.5 w-28 rounded-full"
                        style={{ background: "var(--secondary-color,#f59e0b)" }}
                    />

                    {/* 副标题 */}
                    <p
                        className="max-w-[40rem] text-2xl leading-relaxed break-words"
                        style={{
                            color: "var(--background-text,#0c4a6e)",
                            opacity: 0.82,
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {subtitle}
                    </p>

                    {/* 联系信息卡片行 */}
                    <div className="mt-11 grid grid-cols-2 gap-4">
                        {contacts.map((c, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 rounded-2xl border px-5 py-4 shadow-sm"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#bae6fd)",
                                }}
                            >
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                        background: "linear-gradient(135deg, var(--primary-color,#0891b2), var(--secondary-color,#f59e0b))",
                                        color: "var(--primary-text,#ffffff)",
                                    }}
                                >
                                    {c?.icon?.__icon_url__ ? (
                                        <RemoteSvgIcon
                                            url={c.icon.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-6 h-6"
                                            title={c.icon.__icon_query__}
                                        />
                                    ) : (
                                        <span
                                            className="inline-block h-2.5 w-2.5 rounded-full"
                                            style={{ background: "var(--primary-text,#ffffff)" }}
                                        />
                                    )}
                                </div>
                                <div className="flex min-w-0 flex-col leading-relaxed">
                                    <span
                                        className="text-xs font-semibold break-words"
                                        style={{
                                            color: "var(--primary-color,#0891b2)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {c?.label || '联系方式'}
                                    </span>
                                    <span
                                        className="text-base font-bold break-words"
                                        style={{
                                            color: "var(--background-text,#0c4a6e)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {c?.value || ''}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Closing
