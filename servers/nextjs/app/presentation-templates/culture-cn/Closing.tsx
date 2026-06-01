import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'culture-cn-closing'
export const layoutName = '结尾联系'
export const layoutDescription = '国潮文创风结尾页：宣纸米黄底 + 朱砂印章红块 + 水墨笔触 + 描金边与传统纹样，大字致谢配竖排点缀，下方一行联系方式。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('谢谢观看').meta({
        description: "结尾大字致谢标题（中文，简短）",
    }),
    subtitle: z.string().min(2).max(36).default('愿与您共赏东方雅韵，共创文创新章').meta({
        description: "副标题，一句致谢或愿景（可选）",
    }),
    contacts: z.array(z.object({
        label: z.string().min(1).max(12).meta({ description: "联系方式名称，如电话/邮箱/官网" }),
        value: z.string().min(1).max(30).meta({ description: "联系方式内容" }),
        icon: IconSchema.optional().meta({ description: "联系方式图标（可选）" }),
    })).min(1).max(4).default([
        {
            label: '电话',
            value: '010-8888 6666',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg',
                __icon_query__: 'phone',
            },
        },
        {
            label: '邮箱',
            value: 'hello@guochao-art.cn',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-bold.svg',
                __icon_query__: 'envelope',
            },
        },
        {
            label: '官网',
            value: 'www.guochao-art.cn',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg',
                __icon_query__: 'globe',
            },
        },
        {
            label: '地址',
            value: '北京市东城区文创园 12 号',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg',
                __icon_query__: 'map pin',
            },
        },
    ]).meta({ description: "联系方式列表（1-4 项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Closing: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '谢谢观看'
    const subtitle = slideData?.subtitle || '愿与您共赏东方雅韵，共创文创新章'
    const contacts = (slideData?.contacts && slideData.contacts.length > 0)
        ? slideData.contacts
        : [
            { label: '电话', value: '010-8888 6666', icon: undefined },
            { label: '邮箱', value: 'hello@guochao-art.cn', icon: undefined },
            { label: '官网', value: 'www.guochao-art.cn', icon: undefined },
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
                {/* 宣纸纹理与水墨晕染背景层 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="cnCloseInk" cx="20%" cy="78%" r="55%">
                            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.10" />
                            <stop offset="60%" stopColor="#1a1a1a" stopOpacity="0.04" />
                            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="cnCloseGlow" cx="82%" cy="22%" r="50%">
                            <stop offset="0%" stopColor="#c0392b" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="#c0392b" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="cnCloseGold" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#d4af6a" />
                            <stop offset="100%" stopColor="#b8893d" />
                        </linearGradient>
                    </defs>
                    {/* 米黄底色叠加 */}
                    <rect width="1280" height="720" fill="var(--background-color,#f5ecd9)" />
                    <rect width="1280" height="720" fill="url(#cnCloseInk)" />
                    <rect width="1280" height="720" fill="url(#cnCloseGlow)" />
                    {/* 左下水墨笔触 */}
                    <path
                        d="M-40 600 C140 540 220 660 380 590 C520 528 560 640 720 580"
                        fill="none"
                        stroke="#1a1a1a"
                        strokeOpacity="0.08"
                        strokeWidth="46"
                        strokeLinecap="round"
                    />
                    <path
                        d="M-20 650 C120 620 240 700 400 648"
                        fill="none"
                        stroke="#1a1a1a"
                        strokeOpacity="0.06"
                        strokeWidth="24"
                        strokeLinecap="round"
                    />
                    {/* 右上传统回纹（万字纹样意象，描金细线） */}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <g key={i} transform={`translate(${980 + i * 50} 70)`} opacity="0.5">
                            <path
                                d="M0 0 H30 V30 H8 V8 H22 V22 H14"
                                fill="none"
                                stroke="url(#cnCloseGold)"
                                strokeWidth="2"
                                strokeLinejoin="miter"
                            />
                        </g>
                    ))}
                    {/* 描金外框 */}
                    <rect x="26" y="26" width="1228" height="668" rx="4" fill="none" stroke="url(#cnCloseGold)" strokeWidth="2.5" strokeOpacity="0.85" />
                    <rect x="36" y="36" width="1208" height="648" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="1" strokeOpacity="0.18" />
                </svg>

                {/* 右上角朱砂印章红块 + 竖排点缀 */}
                <div className="absolute top-12 right-16 z-10 flex items-start gap-4">
                    <div
                        className="flex flex-col items-center justify-center gap-1 rounded-md px-2.5 py-3 break-words"
                        style={{
                            background: "var(--primary-color,#c0392b)",
                            color: "var(--primary-text,#ffffff)",
                            boxShadow: '0 4px 14px rgba(192,57,43,0.28)',
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <span className="text-lg font-black leading-[1.3]" style={{ writingMode: 'vertical-rl' }}>国潮</span>
                        <span className="text-lg font-black leading-[1.3]" style={{ writingMode: 'vertical-rl' }}>文创</span>
                    </div>
                </div>

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-20">
                    {/* 顶部描金小印 + 引导小字 */}
                    <div className="mb-6 flex items-center gap-3">
                        <span className="h-px w-12" style={{ background: "var(--stroke,#ddd0b4)" }} />
                        <span
                            className="text-sm tracking-wide break-words"
                            style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            敬呈雅鉴 · 不胜感激
                        </span>
                        <span className="h-px w-12" style={{ background: "var(--stroke,#ddd0b4)" }} />
                    </div>

                    {/* 大字致谢 */}
                    <h1
                        className="text-center text-7xl font-black leading-[1.25] break-words"
                        style={{
                            color: "var(--secondary-color,#1a1a1a)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    {/* 朱砂分隔短笔 */}
                    <div className="my-7 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: "var(--primary-color,#c0392b)" }} />
                        <span className="h-1.5 w-28 rounded-full" style={{ background: "var(--primary-color,#c0392b)" }} />
                        <span className="h-2 w-2 rounded-full" style={{ background: "var(--primary-color,#c0392b)" }} />
                    </div>

                    {/* 副标题 */}
                    {subtitle && (
                        <p
                            className="mb-12 max-w-[44rem] text-center text-xl leading-relaxed break-words"
                            style={{
                                color: "var(--background-text,#2b2b2b)",
                                opacity: 0.85,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {subtitle}
                        </p>
                    )}

                    {/* 联系方式行 */}
                    <div className="flex flex-wrap items-stretch justify-center gap-4">
                        {contacts.map((c, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 rounded-xl border px-5 py-3 break-words"
                                style={{
                                    background: "var(--card-color,#fbf5e9)",
                                    borderColor: "var(--stroke,#ddd0b4)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                <span
                                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                                    style={{ background: "var(--primary-color,#c0392b)", color: "var(--primary-text,#ffffff)" }}
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
                                        <span className="text-base font-black leading-none" style={{ color: "var(--primary-text,#ffffff)" }}>
                                            {(c?.label || '').trim().slice(0, 1)}
                                        </span>
                                    )}
                                </span>
                                <div className="flex flex-col leading-relaxed">
                                    <span
                                        className="text-xs break-words"
                                        style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {c?.label}
                                    </span>
                                    <span
                                        className="text-base font-bold break-words"
                                        style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
