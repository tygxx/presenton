import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'tech-cn-closing'
export const layoutName = '结尾联系'
export const layoutDescription = '科技互联网风结尾页：深色底 + 霓虹蓝紫渐变高光、几何网格与电路线装饰。左对齐大字致谢 + 副标题，下方 1-4 条「图标 + 标签 + 内容」的半透明发光描边联系信息卡片。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('谢谢观看').meta({
        description: "结尾致谢大标题（中文，简短有力，≤16字）",
    }),
    subtitle: z.string().min(2).max(36).default('期待与你共建智能时代的下一站').meta({
        description: "副标题，一句话致谢或展望（中文，可选，≤36字）",
    }),
    contacts: z.array(z.object({
        icon: IconSchema.optional().meta({ description: "联系方式图标（phosphor 图标，可选）" }),
        label: z.string().min(1).max(12).meta({ description: "联系方式标签，如『邮箱』『电话』『官网』（中文，≤12字）" }),
        value: z.string().min(1).max(30).meta({ description: "联系方式内容，如邮箱/电话/网址（≤30字）" }),
    })).min(1).max(4).default([
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg",
                __icon_query__: "email envelope",
            },
            label: '邮箱',
            value: 'contact@xinghe-ai.com',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg",
                __icon_query__: "phone call",
            },
            label: '电话',
            value: '400-800-2026',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-hemisphere-east-bold.svg",
                __icon_query__: "website globe",
            },
            label: '官网',
            value: 'www.xinghe-ai.com',
        },
        {
            icon: {
                __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg",
                __icon_query__: "location map pin",
            },
            label: '地址',
            value: '杭州市余杭区未来科技城',
        },
    ]).meta({ description: "联系方式列表，1-4 条" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Closing: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '谢谢观看'
    const subtitle = slideData?.subtitle || '期待与你共建智能时代的下一站'
    const contacts = (slideData?.contacts && slideData.contacts.length > 0
        ? slideData.contacts
        : (schema.shape.contacts as any)._def.defaultValue) as SlideData['contacts']

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0a0e1a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：霓虹渐变光晕 + 几何网格 + 电路线 + 节点 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    {/* 蓝紫双色光晕 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-22%', right: '-10%', width: '58%', height: '88%', borderRadius: '9999px',
                            background: "radial-gradient(closest-side, var(--secondary-color,#8b5cf6), transparent 70%)",
                            opacity: 0.32, filter: 'blur(8px)',
                        }}
                    />
                    <div
                        className="absolute"
                        style={{
                            bottom: '-30%', left: '-14%', width: '60%', height: '85%', borderRadius: '9999px',
                            background: "radial-gradient(closest-side, var(--primary-color,#3b82f6), transparent 70%)",
                            opacity: 0.28, filter: 'blur(8px)',
                        }}
                    />

                    {/* 几何网格 + 同心圆环 + 电路线 + 节点 */}
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="techClosingGrid" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.5" />
                            </linearGradient>
                            <pattern id="techClosingMesh" width="56" height="56" patternUnits="userSpaceOnUse">
                                <path d="M56 0H0V56" fill="none" stroke="url(#techClosingGrid)" strokeOpacity="0.16" strokeWidth="1" />
                            </pattern>
                            <linearGradient id="techClosingCircuit" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                                <stop offset="50%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* 网格底纹 */}
                        <rect width="1280" height="720" fill="url(#techClosingMesh)" />
                        {/* 右上同心圆环（霓虹） */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={i} cx="1120" cy="100" r={80 + i * 70} fill="none" stroke="url(#techClosingGrid)" strokeOpacity="0.22" strokeWidth="1.2" />
                        ))}
                        {/* 电路线 */}
                        <path d="M0 120 H280 L340 60 H620 L680 120 H960 L1020 60 H1280" fill="none" stroke="url(#techClosingCircuit)" strokeWidth="1.3" />
                        <path d="M0 670 H300 L360 600 H600 L660 670 H1000" fill="none" stroke="url(#techClosingCircuit)" strokeWidth="1.2" />
                        {/* 电路节点 */}
                        {[[280, 120], [620, 60], [960, 120], [300, 670], [600, 600], [1000, 670]].map(([cx, cy], i) => (
                            <circle key={`n-${i}`} cx={cx} cy={cy} r="3.5" fill="var(--secondary-color,#8b5cf6)" fillOpacity="0.8" />
                        ))}
                    </svg>

                    {/* 右下霓虹强调点 */}
                    <div
                        className="absolute"
                        style={{
                            top: '24%', right: '14%', width: '12px', height: '12px', borderRadius: '9999px',
                            background: "var(--secondary-color,#8b5cf6)",
                            boxShadow: '0 0 0 6px rgba(139,92,246,0.20), 0 0 22px 4px rgba(139,92,246,0.55)',
                        }}
                    />
                </div>

                {/* 主内容：左对齐 */}
                <div className="relative z-10 flex h-full w-full flex-col justify-center pl-16 pr-12">
                    {/* eyebrow 等宽霓虹标签 */}
                    <span
                        className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                        style={{
                            color: "var(--primary-color,#3b82f6)",
                            background: "rgba(59,130,246,0.12)",
                            border: "1px solid rgba(59,130,246,0.40)",
                            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <span
                            className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                            style={{ background: "var(--secondary-color,#8b5cf6)", boxShadow: '0 0 8px 1px rgba(139,92,246,0.8)' }}
                        />
                        // THANK&nbsp;YOU
                    </span>

                    {/* 大字致谢主标题（霓虹渐变文字） */}
                    <h1
                        className="text-7xl font-black leading-[1.2] break-words"
                        style={{
                            color: "var(--background-text,#e5e7eb)",
                            backgroundImage: "linear-gradient(100deg, var(--primary-text,#ffffff) 0%, var(--primary-color,#3b82f6) 58%, var(--secondary-color,#8b5cf6) 100%)",
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    {/* 霓虹分隔条 */}
                    <div
                        className="my-7 h-1.5 w-28 rounded-full"
                        style={{
                            background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                            boxShadow: '0 0 14px 1px rgba(59,130,246,0.55)',
                        }}
                    />

                    {/* 副标题 */}
                    {subtitle && (
                        <p
                            className="max-w-[40rem] text-xl leading-relaxed break-words"
                            style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle}
                        </p>
                    )}

                    {/* 联系信息卡片行：半透明发光描边卡片 */}
                    <div className="mt-12 flex flex-wrap gap-4">
                        {contacts.map((c, i) => (
                            <div
                                key={i}
                                className="inline-flex min-w-0 items-center gap-4 rounded-2xl px-5 py-3.5"
                                style={{
                                    background: "rgba(17,24,39,0.55)",
                                    border: "1px solid var(--stroke,#1f2937)",
                                    boxShadow: '0 0 0 1px rgba(59,130,246,0.08), 0 12px 30px -16px rgba(139,92,246,0.50)',
                                }}
                            >
                                {/* 图标徽章（霓虹渐变 + 发光描边） */}
                                {c?.icon?.__icon_url__ && (
                                    <div
                                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                                        style={{
                                            background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                            boxShadow: "0 0 18px -2px rgba(59,130,246,0.55)",
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={c.icon.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-5 h-5"
                                            title={c?.icon?.__icon_query__}
                                        />
                                    </div>
                                )}

                                {/* 标签 + 内容 */}
                                <div className="flex min-w-0 flex-col leading-relaxed">
                                    <span
                                        className="text-xs font-medium uppercase break-words"
                                        style={{
                                            color: "var(--secondary-color,#8b5cf6)",
                                            letterSpacing: '0.08em',
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {c?.label}
                                    </span>
                                    <span
                                        className="text-base font-semibold leading-relaxed break-words"
                                        style={{
                                            color: "var(--background-text,#e5e7eb)",
                                            fontVariantNumeric: 'tabular-nums',
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
