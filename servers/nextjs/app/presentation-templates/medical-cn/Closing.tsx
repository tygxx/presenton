import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'medical-cn-closing'
export const layoutName = '结尾联系'
export const layoutDescription = '医疗健康风结尾页：大字致谢 + 副标题 + 联系方式行。清爽蓝绿点缀、圆角卡片、脉搏波形与十字装饰，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('谢谢观看').meta({
        description: "结尾大字致谢标题（中文，简短）",
    }),
    subtitle: z.string().max(36).default('守护健康，与您同行 — 期待与您进一步交流合作').meta({
        description: "副标题，一句话致谢或邀约（可选）",
    }),
    contacts: z.array(z.object({
        label: z.string().min(1).max(12).meta({ description: "联系方式名称，如『电话』『邮箱』『官网』" }),
        value: z.string().min(1).max(30).meta({ description: "联系方式内容，如电话号码、邮箱地址" }),
        icon: IconSchema.optional().meta({ description: "联系方式图标（可选）" }),
    })).min(1).max(4).default([
        {
            label: '电话',
            value: '400-120-1200',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg',
                __icon_query__: 'phone',
            },
        },
        {
            label: '邮箱',
            value: 'contact@kangyuan-health.cn',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg',
                __icon_query__: 'email envelope',
            },
        },
        {
            label: '官网',
            value: 'www.kangyuan-health.cn',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg',
                __icon_query__: 'website globe',
            },
        },
        {
            label: '地址',
            value: '上海市浦东新区健康产业园 A 座',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg',
                __icon_query__: 'address location pin',
            },
        },
    ]).meta({ description: "联系方式列表（1-4 条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Closing: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '谢谢观看'
    const subtitle = slideData?.subtitle ?? '守护健康，与您同行 — 期待与您进一步交流合作'
    const contacts = (slideData?.contacts && slideData.contacts.length > 0)
        ? slideData.contacts
        : [
            { label: '电话', value: '400-120-1200', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg', __icon_query__: 'phone' } },
            { label: '邮箱', value: 'contact@kangyuan-health.cn', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg', __icon_query__: 'email envelope' } },
            { label: '官网', value: 'www.kangyuan-health.cn', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg', __icon_query__: 'website globe' } },
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
                    background: "var(--background-color,#f8fafc)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景柔和光晕装饰 */}
                <div
                    className="absolute -top-32 -right-24 h-[28rem] w-[28rem] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(14,165,233,0.16) 0%, rgba(14,165,233,0) 70%)",
                    }}
                    aria-hidden="true"
                />
                <div
                    className="absolute -bottom-28 -left-20 h-[24rem] w-[24rem] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(16,185,129,0.14) 0%, rgba(16,185,129,0) 70%)",
                    }}
                    aria-hidden="true"
                />

                {/* 顶部脉搏波形装饰 */}
                <svg
                    viewBox="0 0 1280 120"
                    className="absolute top-0 left-0 w-full"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    style={{ height: '90px', opacity: 0.5 }}
                >
                    <defs>
                        <linearGradient id="medClosePulse" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.15" />
                            <stop offset="50%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.15" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0 70 L360 70 L400 70 L430 30 L470 105 L510 50 L545 70 L900 70 L940 70 L968 40 L1004 96 L1040 70 L1280 70"
                        fill="none"
                        stroke="url(#medClosePulse)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                {/* 右下角十字母题装饰 */}
                <svg
                    viewBox="0 0 120 120"
                    className="absolute"
                    aria-hidden="true"
                    style={{ bottom: '40px', right: '48px', width: '120px', height: '120px', opacity: 0.12 }}
                >
                    <rect x="48" y="14" width="24" height="92" rx="8" fill="var(--secondary-color,#10b981)" />
                    <rect x="14" y="48" width="92" height="24" rx="8" fill="var(--secondary-color,#10b981)" />
                </svg>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-20 py-16 text-center">
                    {/* 顶部小徽标：十字图章 */}
                    <div
                        className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl shadow-md"
                        style={{
                            background: "linear-gradient(135deg, var(--primary-color,#0ea5e9) 0%, var(--secondary-color,#10b981) 100%)",
                            boxShadow: "0 12px 28px rgba(14,165,233,0.28)",
                        }}
                    >
                        <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
                            <rect x="10" y="3" width="4" height="18" rx="1.6" fill="var(--primary-text,#ffffff)" />
                            <rect x="3" y="10" width="18" height="4" rx="1.6" fill="var(--primary-text,#ffffff)" />
                        </svg>
                    </div>

                    {/* 大字致谢标题 */}
                    <h1
                        className="text-7xl font-black leading-[1.2] break-words"
                        style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title}
                    </h1>

                    {/* 蓝绿渐变分隔线 */}
                    <div
                        className="my-7 h-1.5 w-24 rounded-full"
                        style={{ background: "linear-gradient(90deg, var(--primary-color,#0ea5e9) 0%, var(--secondary-color,#10b981) 100%)" }}
                    />

                    {/* 副标题 */}
                    {subtitle ? (
                        <p
                            className="max-w-[44rem] text-xl leading-relaxed break-words"
                            style={{ color: "var(--background-text,#475569)", opacity: 0.9, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle}
                        </p>
                    ) : null}

                    {/* 联系信息卡片行 */}
                    <div className="mt-12 flex w-full flex-wrap items-stretch justify-center gap-5">
                        {contacts.map((c, i) => (
                            <div
                                key={i}
                                className="flex min-w-[14rem] max-w-[18rem] flex-1 items-center gap-3 rounded-2xl border px-5 py-4 shadow-sm"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#e2e8f0)",
                                    boxShadow: "0 8px 22px rgba(15,23,42,0.06)",
                                }}
                            >
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                        background: "linear-gradient(135deg, var(--primary-color,#0ea5e9) 0%, var(--secondary-color,#10b981) 100%)",
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
                                        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                                            <circle cx="12" cy="12" r="5" fill="var(--primary-text,#ffffff)" />
                                        </svg>
                                    )}
                                </div>
                                <div className="flex min-w-0 flex-col text-left leading-relaxed">
                                    <span
                                        className="text-xs font-medium break-words"
                                        style={{ color: "var(--primary-color,#0ea5e9)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {c?.label || '联系方式'}
                                    </span>
                                    <span
                                        className="text-base font-semibold break-words"
                                        style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
