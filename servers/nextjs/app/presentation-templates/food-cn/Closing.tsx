import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'food-cn-closing'
export const layoutName = '结尾联系'
export const layoutDescription = '美食餐饮风结尾页：暖米底配焦糖金圆盘构图，大字致谢加副标题，下方一行联系方式卡片。纯 CSS/SVG 装饰，餐具与圆盘点缀，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('谢谢观看').meta({
        description: "结尾主标题（大字致谢，简短有力）",
    }),
    subtitle: z.string().min(2).max(36).default('愿每一道菜都成为相聚时最暖的记忆').meta({
        description: "副标题，一句温暖的结语（可选）",
    }),
    contacts: z.array(z.object({
        label: z.string().min(1).max(12).meta({ description: "联系方式标签，如『预订热线』『门店地址』" }),
        value: z.string().min(1).max(30).meta({ description: "联系方式内容，如电话号码、地址、公众号" }),
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
            label: '门店地址',
            value: '城市中心广场美食街 18 号',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg',
                __icon_query__: 'map pin location',
            },
        },
        {
            label: '官方公众号',
            value: '暖灶人家',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/wechat-logo-bold.svg',
                __icon_query__: 'wechat',
            },
        },
        {
            label: '营业时间',
            value: '每日 10:00 - 22:00',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/clock-bold.svg',
                __icon_query__: 'clock time',
            },
        },
    ]).meta({ description: "联系方式列表（1 至 4 项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Closing: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '谢谢观看'
    const subtitle = slideData?.subtitle || '愿每一道菜都成为相聚时最暖的记忆'
    const contacts = (slideData?.contacts && slideData.contacts.length > 0)
        ? slideData.contacts
        : [
            { label: '预订热线', value: '400-888-6688', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg', __icon_query__: 'phone' } },
            { label: '门店地址', value: '城市中心广场美食街 18 号', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg', __icon_query__: 'map pin location' } },
            { label: '官方公众号', value: '暖灶人家', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/wechat-logo-bold.svg', __icon_query__: 'wechat' } },
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
                    background: "var(--background-color,#fdf6ec)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：圆盘构图 + 焦糖金描边 + 暖色光晕 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <radialGradient id="foodClosingGlow" cx="50%" cy="34%" r="60%">
                            <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="foodClosingPlate" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#c92a2a)" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.04" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#foodClosingGlow)" />
                    {/* 同心圆盘（焦糖金描边） */}
                    {[0, 1, 2, 3].map((i) => (
                        <circle key={`c${i}`} cx="640" cy="246" r={92 + i * 74} fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity={0.12 - i * 0.022} strokeWidth="2" />
                    ))}
                    {/* 左上角暖色块圆盘 */}
                    <circle cx="92" cy="86" r="150" fill="url(#foodClosingPlate)" />
                    <circle cx="92" cy="86" r="150" fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity="0.14" strokeWidth="2" />
                    {/* 右下角暖色块圆盘 */}
                    <circle cx="1196" cy="652" r="170" fill="url(#foodClosingPlate)" />
                    <circle cx="1196" cy="652" r="170" fill="none" stroke="var(--secondary-color,#c92a2a)" strokeOpacity="0.12" strokeWidth="2" />
                </svg>

                {/* 餐具点缀：左侧刀叉剪影 */}
                <svg viewBox="0 0 64 200" className="absolute left-10 top-1/2 h-44 w-14 -translate-y-1/2 opacity-[0.16]" aria-hidden="true">
                    <g fill="none" stroke="var(--primary-color,#e8590c)" strokeWidth="3" strokeLinecap="round">
                        {/* 叉子 */}
                        <line x1="14" y1="14" x2="14" y2="44" />
                        <line x1="22" y1="14" x2="22" y2="44" />
                        <line x1="30" y1="14" x2="30" y2="44" />
                        <path d="M14 44 Q22 56 22 70 L22 188" />
                        {/* 刀 */}
                        <path d="M50 14 Q56 30 52 52 L50 52 L50 188" />
                    </g>
                </svg>

                {/* 主内容：垂直居中分布 */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-16 py-12 text-center">
                    {/* 顶部小标 */}
                    <span
                        className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-5 py-1.5 text-sm font-medium leading-relaxed break-words"
                        style={{
                            color: "var(--secondary-color,#c92a2a)",
                            background: "var(--card-color,#fffaf2)",
                            border: "1px solid var(--stroke,#f0e0cc)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <span
                            className="inline-block h-2 w-2 rounded-full"
                            style={{ background: "var(--primary-color,#e8590c)" }}
                        />
                        诚邀莅临 · 共享美味时光
                    </span>

                    {/* 大字致谢 */}
                    <h1
                        className="text-7xl font-black leading-[1.2] break-words"
                        style={{
                            color: "var(--background-text,#3b2412)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    {/* 焦糖金分隔点缀 */}
                    <div className="my-7 flex items-center justify-center gap-3">
                        <span className="h-[3px] w-12 rounded-full" style={{ background: "var(--stroke,#f0e0cc)" }} />
                        <span className="h-3 w-3 rounded-full" style={{ background: "var(--primary-color,#e8590c)" }} />
                        <span className="h-[3px] w-12 rounded-full" style={{ background: "var(--stroke,#f0e0cc)" }} />
                    </div>

                    {/* 副标题 */}
                    {subtitle && (
                        <p
                            className="max-w-[46rem] text-xl leading-relaxed break-words"
                            style={{
                                color: "var(--background-text,#3b2412)",
                                opacity: 0.82,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {subtitle}
                        </p>
                    )}

                    {/* 联系信息行 */}
                    <div className="mt-12 flex w-full max-w-[60rem] flex-wrap items-stretch justify-center gap-4">
                        {contacts.map((c, i) => (
                            <div
                                key={i}
                                className="flex min-w-[14rem] flex-1 items-center gap-3 rounded-2xl px-5 py-4 break-words"
                                style={{
                                    background: "var(--card-color,#fffaf2)",
                                    border: "1px solid var(--stroke,#f0e0cc)",
                                    boxShadow: "0 6px 18px rgba(232,89,12,0.06)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {/* 圆形图标盘 */}
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
                                    style={{ background: "var(--primary-color,#e8590c)" }}
                                >
                                    {c?.icon?.__icon_url__ ? (
                                        <RemoteSvgIcon
                                            url={c.icon.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-5 h-5"
                                            title={c.icon.__icon_query__}
                                        />
                                    ) : (
                                        <span
                                            className="h-2.5 w-2.5 rounded-full"
                                            style={{ background: "var(--primary-text,#ffffff)" }}
                                        />
                                    )}
                                </div>
                                <div className="flex min-w-0 flex-col text-left leading-relaxed">
                                    <span
                                        className="text-xs font-medium break-words"
                                        style={{
                                            color: "var(--secondary-color,#c92a2a)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {c?.label}
                                    </span>
                                    <span
                                        className="text-base font-bold leading-relaxed break-words"
                                        style={{
                                            color: "var(--background-text,#3b2412)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {c?.value}
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
