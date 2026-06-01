import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'realestate-cn-closing'
export const layoutName = '结尾联系'
export const layoutDescription = '房产建筑风结尾联系页：极简细体大字致谢 + 细线分隔的联系信息行，搭配高级灰背景、金铜点缀与建筑剪影装饰。纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('谢谢观看').meta({
        description: "结尾致谢主标题（中文，简短大字，如『谢谢观看』）",
    }),
    subtitle: z.string().min(2).max(36).default('期待与您共建美好人居空间').meta({
        description: "副标题，一句话表达期待合作或愿景（可选）",
    }),
    contacts: z.array(z.object({
        label: z.string().min(1).max(12).meta({ description: "联系方式标签，如『电话』『邮箱』『地址』" }),
        value: z.string().min(1).max(30).meta({ description: "联系方式内容，如电话号码、邮箱、地址" }),
        icon: IconSchema.optional().meta({ description: "联系方式图标（可选）" }),
    })).min(1).max(4).default([
        {
            label: '联系电话',
            value: '400-888-6699',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg',
                __icon_query__: 'phone',
            },
        },
        {
            label: '电子邮箱',
            value: 'contact@jingyuan-estate.com',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg',
                __icon_query__: 'email envelope',
            },
        },
        {
            label: '项目地址',
            value: '上海市浦东新区世纪大道 88 号',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg',
                __icon_query__: 'map location pin',
            },
        },
        {
            label: '官方网站',
            value: 'www.jingyuan-estate.com',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg',
                __icon_query__: 'website globe',
            },
        },
    ]).meta({ description: "联系方式列表（1-4 项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Closing: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '谢谢观看'
    const subtitle = slideData?.subtitle || '期待与您共建美好人居空间'
    const contacts = (slideData?.contacts && slideData.contacts.length > 0)
        ? slideData.contacts
        : [
            { label: '联系电话', value: '400-888-6699', icon: undefined },
            { label: '电子邮箱', value: 'contact@jingyuan-estate.com', icon: undefined },
            { label: '项目地址', value: '上海市浦东新区世纪大道 88 号', icon: undefined },
            { label: '官方网站', value: 'www.jingyuan-estate.com', icon: undefined },
        ]

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
                {/* 底部建筑剪影装饰层（极简线条 + 大留白） */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="reCloseSkyline" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* 建筑剪影群（细线勾勒，靠底留白） */}
                    <g
                        fill="none"
                        stroke="var(--secondary-color,#3f3f46)"
                        strokeOpacity="0.12"
                        strokeWidth="1.5"
                    >
                        <rect x="120" y="560" width="70" height="140" />
                        <rect x="210" y="500" width="56" height="200" />
                        <rect x="286" y="600" width="44" height="100" />
                        <rect x="980" y="540" width="60" height="160" />
                        <rect x="1058" y="470" width="48" height="230" />
                        <rect x="1124" y="590" width="40" height="110" />
                        {/* 楼层细分割横线 */}
                        <line x1="210" y1="540" x2="266" y2="540" />
                        <line x1="210" y1="580" x2="266" y2="580" />
                        <line x1="210" y1="620" x2="266" y2="620" />
                        <line x1="1058" y1="510" x2="1106" y2="510" />
                        <line x1="1058" y1="550" x2="1106" y2="550" />
                        <line x1="1058" y1="590" x2="1106" y2="590" />
                    </g>
                    <rect x="0" y="440" width="1280" height="280" fill="url(#reCloseSkyline)" />
                </svg>

                {/* 右上角金铜极简角标 */}
                <div className="absolute top-0 right-0" aria-hidden="true">
                    <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                        <line x1="160" y1="40" x2="120" y2="40" stroke="var(--primary-color,#b08d57)" strokeWidth="2" />
                        <line x1="120" y1="0" x2="120" y2="40" stroke="var(--primary-color,#b08d57)" strokeWidth="2" />
                        <circle cx="120" cy="40" r="4" fill="var(--primary-color,#b08d57)" />
                    </svg>
                </div>

                {/* 左上角极简细线品牌点 */}
                <div className="absolute top-10 left-16 flex items-center gap-3" aria-hidden="true">
                    <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ background: "var(--primary-color,#b08d57)" }}
                    />
                    <span
                        className="inline-block h-px w-14"
                        style={{ background: "var(--stroke,#e4e4e7)" }}
                    />
                </div>

                {/* 主内容区：上方大字致谢，下方联系信息行 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-20 py-16">
                    {/* 致谢区 */}
                    <div className="flex flex-col items-start">
                        <span
                            className="mb-6 text-sm font-light tracking-wide break-words"
                            style={{
                                color: "var(--primary-color,#b08d57)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            THANK YOU · 致谢
                        </span>
                        <h1
                            className="text-7xl font-light leading-[1.2] break-words"
                            style={{
                                color: "var(--background-text,#27272a)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        {/* 金铜细分割线 */}
                        <div className="mt-7 flex items-center gap-4">
                            <span
                                className="inline-block h-px w-20"
                                style={{ background: "var(--primary-color,#b08d57)" }}
                            />
                            <p
                                className="text-xl font-light leading-[1.7] break-words"
                                style={{
                                    color: "var(--secondary-color,#3f3f46)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    {/* 细分割线 */}
                    <div
                        className="my-10 h-px w-full"
                        style={{ background: "var(--stroke,#e4e4e7)" }}
                    />

                    {/* 联系信息行 */}
                    <div
                        className="grid gap-x-8 gap-y-6"
                        style={{ gridTemplateColumns: `repeat(${Math.min(contacts.length, 4)}, minmax(0, 1fr))` }}
                    >
                        {contacts.slice(0, 4).map((c, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-sm border"
                                    style={{
                                        borderColor: "var(--stroke,#e4e4e7)",
                                        background: "var(--card-color,#ffffff)",
                                        color: "var(--primary-color,#b08d57)",
                                    }}
                                >
                                    {c?.icon?.__icon_url__ ? (
                                        <RemoteSvgIcon
                                            url={c.icon.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-color,#b08d57)"
                                            className="w-5 h-5"
                                            title={c?.icon?.__icon_query__ || c?.label || 'contact'}
                                        />
                                    ) : (
                                        <span
                                            className="inline-block h-2 w-2 rounded-full"
                                            style={{ background: "var(--primary-color,#b08d57)" }}
                                        />
                                    )}
                                </div>
                                <div className="flex min-w-0 flex-col gap-1.5">
                                    <span
                                        className="text-xs font-light tracking-wide break-words"
                                        style={{
                                            color: "var(--secondary-color,#3f3f46)",
                                            opacity: 0.7,
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {c?.label || '联系方式'}
                                    </span>
                                    <span
                                        className="text-base font-normal leading-relaxed break-words"
                                        style={{
                                            color: "var(--background-text,#27272a)",
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
