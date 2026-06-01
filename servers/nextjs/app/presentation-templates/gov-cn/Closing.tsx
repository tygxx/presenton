import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'gov-cn-closing'
export const layoutName = '结尾联系'
export const layoutDescription = '党政政务风结尾页：米白底 + 中国红 + 烫金细线，居中对称构图，华表纹样与五角星点缀。大字致谢 + 副标题 + 联系信息行（1~4 项，含图标）。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('谢谢观看').meta({
        description: "结尾大字致谢标题（中文，庄重简短，如『谢谢观看』『敬请指正』）",
    }),
    subtitle: z.string().min(2).max(36).default('恳请各位领导和同志批评指正').meta({
        description: "副标题，一句话致谢或致意（可选）",
    }),
    contacts: z.array(z.object({
        label: z.string().min(1).max(12).meta({
            description: "联系方式标签，如『联系电话』『电子邮箱』『办公地址』",
        }),
        value: z.string().min(1).max(30).meta({
            description: "联系方式内容，如电话号码、邮箱、地址",
        }),
        icon: IconSchema.optional().meta({
            description: "该联系方式的图标（可选）",
        }),
    })).min(1).max(4).default([
        {
            label: '联系电话',
            value: '010-8888 6666',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg',
                __icon_query__: 'phone',
            },
        },
        {
            label: '电子邮箱',
            value: 'office@example.gov.cn',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg',
                __icon_query__: 'envelope email',
            },
        },
        {
            label: '办公地址',
            value: '某某市人民大道一号',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg',
                __icon_query__: 'map pin location',
            },
        },
    ]).meta({ description: "联系方式列表（1~4 项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Closing: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '谢谢观看'
    const subtitle = slideData?.subtitle || '恳请各位领导和同志批评指正'
    const contacts = (slideData?.contacts && slideData.contacts.length > 0)
        ? slideData.contacts
        : [
            { label: '联系电话', value: '010-8888 6666', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg', __icon_query__: 'phone' } },
            { label: '电子邮箱', value: 'office@example.gov.cn', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg', __icon_query__: 'envelope email' } },
            { label: '办公地址', value: '某某市人民大道一号', icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg', __icon_query__: 'map pin location' } },
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
                    background: "var(--background-color,#faf7f2)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：米白底纹 + 烫金光晕 + 华表同心圆纹样 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="govClosingGlow" cx="50%" cy="40%" r="58%">
                                <stop offset="0%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="govClosingRed" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#c1121f)" stopOpacity="1" />
                                <stop offset="100%" stopColor="var(--primary-color,#c1121f)" stopOpacity="0.78" />
                            </linearGradient>
                        </defs>
                        {/* 顶部 + 底部中国红色带（对称） */}
                        <rect x="0" y="0" width="1280" height="14" fill="url(#govClosingRed)" />
                        <rect x="0" y="706" width="1280" height="14" fill="url(#govClosingRed)" />
                        {/* 烫金光晕 */}
                        <rect x="0" y="0" width="1280" height="720" fill="url(#govClosingGlow)" />
                        {/* 左右对称同心圆纹样（华表纹样意象） */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={`l${i}`} cx="-40" cy="360" r={130 + i * 72} fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity={0.08} strokeWidth="1.2" />
                        ))}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={`r${i}`} cx="1320" cy="360" r={130 + i * 72} fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity={0.08} strokeWidth="1.2" />
                        ))}
                    </svg>
                </div>

                {/* 四角烫金细线角标（对称） */}
                <div className="absolute left-6 top-7 h-10 w-10 border-l-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.6 }} aria-hidden="true" />
                <div className="absolute right-6 top-7 h-10 w-10 border-r-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.6 }} aria-hidden="true" />
                <div className="absolute bottom-7 left-6 h-10 w-10 border-b-2 border-l-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.6 }} aria-hidden="true" />
                <div className="absolute bottom-7 right-6 h-10 w-10 border-b-2 border-r-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.6 }} aria-hidden="true" />

                {/* 主内容：居中对称 */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-20 py-16 text-center">
                    {/* 顶部五角星点缀 + 烫金线 */}
                    <div className="mb-7 flex items-center justify-center gap-3" aria-hidden="true">
                        <span className="h-px w-16" style={{ background: "var(--secondary-color,#b8860b)", opacity: 0.55 }} />
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="var(--primary-color,#c1121f)">
                            <path d="M12 2l2.9 6.26L21.8 9.2l-5 4.62L18.1 21 12 17.4 5.9 21l1.3-7.18-5-4.62 6.9-0.94L12 2z" />
                        </svg>
                        <span className="h-px w-16" style={{ background: "var(--secondary-color,#b8860b)", opacity: 0.55 }} />
                    </div>

                    {/* 大字致谢标题 */}
                    <h1
                        className="max-w-[60rem] text-8xl font-black leading-[1.2] break-words"
                        style={{
                            color: "var(--primary-color,#c1121f)",
                            letterSpacing: '0.1em',
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    {/* 烫金对称分隔线 + 中心星 */}
                    <div className="my-8 flex items-center justify-center gap-4" aria-hidden="true">
                        <span className="h-0.5 w-24 rounded-full" style={{ background: "linear-gradient(90deg, transparent, var(--secondary-color,#b8860b))" }} />
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="var(--secondary-color,#b8860b)">
                            <path d="M12 2l2.9 6.26L21.8 9.2l-5 4.62L18.1 21 12 17.4 5.9 21l1.3-7.18-5-4.62 6.9-0.94L12 2z" />
                        </svg>
                        <span className="h-0.5 w-24 rounded-full" style={{ background: "linear-gradient(90deg, var(--secondary-color,#b8860b), transparent)" }} />
                    </div>

                    {/* 副标题 */}
                    {subtitle && (
                        <p
                            className="max-w-[44rem] text-2xl leading-relaxed break-words"
                            style={{
                                color: "var(--background-text,#1a1a1a)",
                                opacity: 0.85,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {subtitle}
                        </p>
                    )}

                    {/* 联系信息行：对称排布，1~4 项 */}
                    <div className="mt-14 flex flex-wrap items-stretch justify-center gap-5">
                        {contacts.map((c, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 rounded-sm border px-7 py-4 leading-relaxed"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#e8dcc8)",
                                }}
                            >
                                {/* 图标徽章 */}
                                <span
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-sm"
                                    style={{ background: "var(--primary-color,#c1121f)", color: "var(--primary-text,#ffffff)" }}
                                    aria-hidden={c?.icon ? undefined : true}
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
                                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="var(--primary-text,#ffffff)">
                                            <path d="M12 2l2.9 6.26L21.8 9.2l-5 4.62L18.1 21 12 17.4 5.9 21l1.3-7.18-5-4.62 6.9-0.94L12 2z" />
                                        </svg>
                                    )}
                                </span>
                                {/* 标签 + 内容 */}
                                <div className="flex flex-col items-start text-left leading-relaxed">
                                    <span
                                        className="text-xs font-semibold break-words"
                                        style={{
                                            color: "var(--secondary-color,#b8860b)",
                                            letterSpacing: '0.14em',
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {c?.label || '联系方式'}
                                    </span>
                                    <span
                                        className="text-base font-bold break-words"
                                        style={{
                                            color: "var(--background-text,#1a1a1a)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {c?.value || '——'}
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
