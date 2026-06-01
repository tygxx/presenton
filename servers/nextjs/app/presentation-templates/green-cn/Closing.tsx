import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'green-cn-closing'
export const layoutName = '结尾联系'
export const layoutDescription = '新能源环保风结尾页：清新白绿渐变背景 + 叶片/地球/自然曲线装饰，大字致谢 + 联系信息行。纯 CSS/SVG，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('谢谢观看').meta({
        description: "结尾致谢大标题（中文，简短，如『谢谢观看』『感谢聆听』）",
    }),
    subtitle: z.string().min(2).max(36).default('携手共创低碳未来，让每一度电都更绿色').meta({
        description: "副标题，一句呼应可持续主题的结语（可选）",
    }),
    contacts: z.array(z.object({
        label: z.string().min(1).max(12).meta({ description: "联系方式标签，如『邮箱』『电话』『官网』『地址』" }),
        value: z.string().min(1).max(30).meta({ description: "联系方式内容，如邮箱、电话号码、网址" }),
        icon: IconSchema.optional().meta({ description: "联系方式图标（可选）" }),
    })).min(1).max(4).default([
        {
            label: '官网',
            value: 'www.greenenergy-cn.com',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg',
                __icon_query__: 'globe website',
            },
        },
        {
            label: '邮箱',
            value: 'contact@greenenergy-cn.com',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg',
                __icon_query__: 'email envelope',
            },
        },
        {
            label: '电话',
            value: '400-188-6688',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg',
                __icon_query__: 'phone call',
            },
        },
        {
            label: '地址',
            value: '杭州市余杭区未来科技城绿能大厦',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg',
                __icon_query__: 'map location pin',
            },
        },
    ]).meta({ description: "联系方式列表（1-4 项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Closing: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '谢谢观看'
    const subtitle = slideData?.subtitle || '携手共创低碳未来，让每一度电都更绿色'
    const contacts = (slideData?.contacts && slideData.contacts.length > 0)
        ? slideData.contacts
        : [
            { label: '官网', value: 'www.greenenergy-cn.com', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg', __icon_query__: 'globe website' } },
            { label: '邮箱', value: 'contact@greenenergy-cn.com', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg', __icon_query__: 'email envelope' } },
            { label: '电话', value: '400-188-6688', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg', __icon_query__: 'phone call' } },
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
                {/* 背景：清新白绿 + 天空蓝渐变光晕 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(120% 90% at 12% 0%, rgba(8,145,178,0.10) 0%, rgba(8,145,178,0) 55%), radial-gradient(120% 110% at 100% 100%, rgba(22,163,74,0.16) 0%, rgba(22,163,74,0) 60%)",
                    }}
                    aria-hidden="true"
                />

                {/* 背景装饰：地球弧线 + 自然有机曲线 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="greenClosingLeaf" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.06" />
                        </linearGradient>
                        <linearGradient id="greenClosingGlobe" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#0891b2)" stopOpacity="0.14" />
                            <stop offset="100%" stopColor="var(--primary-color,#16a34a)" stopOpacity="0.10" />
                        </linearGradient>
                    </defs>

                    {/* 左下：地球圆弧 + 经纬线（地球/自然母题） */}
                    <circle cx="120" cy="690" r="240" fill="url(#greenClosingGlobe)" />
                    <circle cx="120" cy="690" r="240" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.16" strokeWidth="1.5" />
                    <circle cx="120" cy="690" r="180" fill="none" stroke="var(--secondary-color,#0891b2)" strokeOpacity="0.14" strokeWidth="1.5" />
                    <path d="M-120 690 Q120 560 360 690" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.14" strokeWidth="1.5" />
                    <path d="M-120 690 Q120 610 360 690" fill="none" stroke="var(--secondary-color,#0891b2)" strokeOpacity="0.12" strokeWidth="1.5" />

                    {/* 右上：自然有机曲线（能源/自然流动母题） */}
                    <path d="M820 -40 C980 120, 1180 60, 1320 200" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.12" strokeWidth="2" />
                    <path d="M880 -60 C1040 100, 1240 40, 1360 180" fill="none" stroke="var(--secondary-color,#0891b2)" strokeOpacity="0.10" strokeWidth="2" />
                </svg>

                {/* 右上角叶片装饰（叶片母题） */}
                <svg
                    viewBox="0 0 200 200"
                    className="absolute"
                    style={{ top: '-28px', right: '-20px', width: '230px', height: '230px' }}
                    aria-hidden="true"
                >
                    <path
                        d="M170 30 C90 40, 40 90, 30 170 C110 160, 160 110, 170 30 Z"
                        fill="url(#greenClosingLeaf)"
                        stroke="var(--primary-color,#16a34a)"
                        strokeOpacity="0.30"
                        strokeWidth="2"
                    />
                    <path d="M40 160 C90 110, 130 70, 165 35" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.35" strokeWidth="2" />
                    <path d="M70 150 C95 130, 110 115, 120 95" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.28" strokeWidth="1.6" />
                    <path d="M95 158 C115 140, 128 126, 140 105" fill="none" stroke="var(--primary-color,#16a34a)" strokeOpacity="0.24" strokeWidth="1.6" />
                </svg>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-16 py-14">
                    {/* 顶部小徽标：叶片图标 + 标签 */}
                    <div
                        className="mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2"
                        style={{
                            background: "var(--card-color,#ffffff)",
                            border: "1px solid var(--stroke,#d1fae5)",
                            boxShadow: '0 4px 16px rgba(22,163,74,0.12)',
                        }}
                    >
                        <span
                            className="flex h-7 w-7 items-center justify-center rounded-full"
                            style={{ background: "var(--primary-color,#16a34a)" }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-4 h-4"
                                title="leaf"
                            />
                        </span>
                        <span
                            className="text-sm font-semibold leading-relaxed break-words"
                            style={{ color: "var(--primary-color,#16a34a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            绿色能源 · 可持续未来
                        </span>
                    </div>

                    {/* 大字致谢标题 */}
                    <h1
                        className="text-center text-7xl font-black leading-[1.2] break-words"
                        style={{
                            color: "var(--background-text,#14532d)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    {/* 标题下方装饰短线 */}
                    <div
                        className="mt-7 h-1.5 w-28 rounded-full"
                        style={{
                            background: "linear-gradient(90deg, var(--primary-color,#16a34a), var(--secondary-color,#0891b2))",
                        }}
                    />

                    {/* 副标题 */}
                    {subtitle && (
                        <p
                            className="mt-7 max-w-[44rem] text-center text-xl leading-relaxed break-words"
                            style={{
                                color: "var(--background-text,#14532d)",
                                opacity: 0.82,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {subtitle}
                        </p>
                    )}

                    {/* 联系信息行 */}
                    <div className="mt-11 flex flex-wrap items-stretch justify-center gap-4">
                        {contacts.map((c, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 rounded-2xl px-5 py-3.5"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    border: "1px solid var(--stroke,#d1fae5)",
                                    boxShadow: '0 6px 18px rgba(22,163,74,0.08)',
                                }}
                            >
                                <span
                                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                        background: "linear-gradient(135deg, var(--primary-color,#16a34a), var(--secondary-color,#0891b2))",
                                    }}
                                >
                                    {c?.icon?.__icon_url__ ? (
                                        <RemoteSvgIcon
                                            url={c.icon.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-5 h-5"
                                            title={c?.icon?.__icon_query__ || c?.label || 'contact'}
                                        />
                                    ) : (
                                        <span
                                            className="text-sm font-bold break-words"
                                            style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {(c?.label || '·').slice(0, 1)}
                                        </span>
                                    )}
                                </span>
                                <div className="flex flex-col leading-relaxed">
                                    <span
                                        className="text-xs font-medium leading-relaxed break-words"
                                        style={{ color: "var(--secondary-color,#0891b2)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {c?.label || '联系'}
                                    </span>
                                    <span
                                        className="text-base font-bold leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#14532d)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
