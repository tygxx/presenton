import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'education-cn-closing'
export const layoutName = '结尾联系'
export const layoutDescription = '教育培训风结尾页：明亮米白底 + 圆角卡片，大字致谢与副标题，下方一行圆角联系卡（标签/内容/图标）。书本、灯泡、成长曲线、圆点装饰，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('谢谢观看').meta({
        description: "结尾大字致谢标题（中文，简短）",
    }),
    subtitle: z.string().min(2).max(36).default('愿每一次学习，都点亮成长的可能').meta({
        description: "副标题，一句温暖的结束语（可选）",
    }),
    contacts: z.array(z.object({
        label: z.string().min(1).max(12).meta({ description: "联系方式标签，如『邮箱』『电话』『微信』" }),
        value: z.string().min(1).max(30).meta({ description: "联系方式内容，如邮箱/手机号/账号" }),
        icon: IconSchema.optional().meta({ description: "联系方式图标（可选）" }),
    })).min(1).max(4).default([
        {
            label: '官方网站',
            value: 'www.qiyuan-edu.cn',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg',
                __icon_query__: 'website',
            },
        },
        {
            label: '联系邮箱',
            value: 'hello@qiyuan-edu.cn',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg',
                __icon_query__: 'email',
            },
        },
        {
            label: '咨询电话',
            value: '400-880-1688',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg',
                __icon_query__: 'phone',
            },
        },
        {
            label: '微信公众号',
            value: '启元成长课堂',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chat-circle-dots-bold.svg',
                __icon_query__: 'wechat',
            },
        },
    ]).meta({ description: "联系方式列表（1-4 项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Closing: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '谢谢观看'
    const subtitle = slideData?.subtitle || '愿每一次学习，都点亮成长的可能'
    const contacts = (slideData?.contacts && slideData.contacts.length > 0)
        ? slideData.contacts
        : [
            {
                label: '官方网站',
                value: 'www.qiyuan-edu.cn',
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg',
                    __icon_query__: 'website',
                },
            },
            {
                label: '联系邮箱',
                value: 'hello@qiyuan-edu.cn',
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg',
                    __icon_query__: 'email',
                },
            },
            {
                label: '咨询电话',
                value: '400-880-1688',
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg',
                    __icon_query__: 'phone',
                },
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
                    background: "var(--background-color,#fffdf7)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：圆点纹样 + 成长曲线 + 光晕 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    {/* 左上暖橙光晕 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-120px', left: '-100px', width: '360px', height: '360px', borderRadius: '9999px',
                            background: 'radial-gradient(circle, var(--secondary-color,#f97316) 0%, rgba(249,115,22,0) 70%)',
                            opacity: 0.16,
                        }}
                    />
                    {/* 右下蓝色光晕 */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '-140px', right: '-120px', width: '420px', height: '420px', borderRadius: '9999px',
                            background: 'radial-gradient(circle, var(--primary-color,#2563eb) 0%, rgba(37,99,235,0) 70%)',
                            opacity: 0.14,
                        }}
                    />
                    {/* 成长曲线 + 圆点装饰 */}
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="eduClosingCurve" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.0" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.55" />
                            </linearGradient>
                        </defs>
                        {/* 上扬成长曲线 */}
                        <path
                            d="M -40 600 C 260 560, 460 470, 700 360 S 1120 150, 1340 90"
                            fill="none"
                            stroke="url(#eduClosingCurve)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeOpacity="0.5"
                        />
                        {/* 曲线上的成长节点 */}
                        <circle cx="700" cy="360" r="6" fill="var(--secondary-color,#f97316)" fillOpacity="0.65" />
                        <circle cx="1080" cy="175" r="8" fill="var(--primary-color,#2563eb)" fillOpacity="0.55" />
                        {/* 右上圆点矩阵 */}
                        {[0, 1, 2, 3, 4].map((r) => (
                            [0, 1, 2, 3, 4].map((c) => (
                                <circle
                                    key={`d-${r}-${c}`}
                                    cx={1080 + c * 28}
                                    cy={64 + r * 28}
                                    r="2.6"
                                    fill="var(--primary-color,#2563eb)"
                                    fillOpacity="0.18"
                                />
                            ))
                        ))}
                    </svg>
                </div>

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-20 py-14 text-center">
                    {/* 顶部图标徽章：灯泡 + 书本意象（圆形渐变） */}
                    <div
                        className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl shadow-md"
                        style={{
                            background: 'linear-gradient(135deg, var(--primary-color,#2563eb) 0%, var(--secondary-color,#f97316) 100%)',
                        }}
                    >
                        <RemoteSvgIcon
                            url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg"
                            strokeColor="currentColor"
                            color="var(--primary-text,#ffffff)"
                            className="w-8 h-8"
                            title="lightbulb idea"
                        />
                    </div>

                    {/* 大字致谢标题 */}
                    <h1
                        className="text-7xl font-black leading-[1.2] break-words"
                        style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title}
                    </h1>

                    {/* 橙色装饰短线 */}
                    <div
                        className="mt-6 mb-5 h-1.5 w-20 rounded-full"
                        style={{ background: "var(--secondary-color,#f97316)" }}
                    />

                    {/* 副标题 */}
                    {subtitle && (
                        <p
                            className="max-w-[42rem] text-xl leading-relaxed break-words"
                            style={{ color: "var(--background-text,#1f2937)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle}
                        </p>
                    )}

                    {/* 联系信息行：圆角卡片 */}
                    <div className="mt-12 flex w-full max-w-[1000px] flex-wrap items-stretch justify-center gap-5">
                        {contacts.slice(0, 4).map((contact, i) => (
                            <div
                                key={i}
                                className="flex min-w-[200px] flex-1 items-center gap-4 rounded-2xl border px-6 py-4 shadow-sm"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#f1e9d8)",
                                }}
                            >
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--primary-color,#2563eb) 0%, var(--secondary-color,#f97316) 100%)',
                                    }}
                                >
                                    {contact?.icon?.__icon_url__ ? (
                                        <RemoteSvgIcon
                                            url={contact.icon.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-6 h-6"
                                            title={contact.icon.__icon_query__ || contact.label}
                                        />
                                    ) : (
                                        <span
                                            className="h-2.5 w-2.5 rounded-full"
                                            style={{ background: "var(--primary-text,#ffffff)" }}
                                        />
                                    )}
                                </div>
                                <div className="flex min-w-0 flex-col items-start text-left leading-relaxed">
                                    <span
                                        className="text-xs font-medium break-words"
                                        style={{ color: "var(--secondary-color,#f97316)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {contact?.label || '联系方式'}
                                    </span>
                                    <span
                                        className="text-base font-bold leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {contact?.value || ''}
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
