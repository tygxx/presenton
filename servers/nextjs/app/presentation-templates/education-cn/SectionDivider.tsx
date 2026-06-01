import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';
import { IconSchema } from '../defaultSchemes';

export const layoutId = 'education-cn-section-divider'
export const layoutName = '章节分隔'
export const layoutDescription = '教育培训风章节过渡页：超大节号作为装饰主体，搭配节标题、可选副标题、书本/灯泡图标与圆点纹样。纯 CSS/SVG 装饰，明亮米白底色，离线可渲染。'

const schema = z.object({
    sectionNumber: z.string().min(1).max(4).default('02').meta({
        description: "章节序号，建议两位数字，如『02』，作为超大装饰主体",
    }),
    title: z.string().min(2).max(18).default('高效学习方法论').meta({
        description: "本章节标题（中文，简短有力）",
    }),
    subtitle: z.string().min(2).max(36).default('从输入到输出，搭建可复用的知识体系').meta({
        description: "副标题，一句话补充本章内容（可选）",
    }),
    icon: IconSchema.default({
        __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg",
        __icon_query__: "open book",
    }).meta({
        description: "章节配图标，建议书本/灯泡/毕业帽等教育母题",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const SectionDivider: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const sectionNumber = slideData?.sectionNumber || '02'
    const title = slideData?.title || '高效学习方法论'
    const subtitle = slideData?.subtitle || '从输入到输出，搭建可复用的知识体系'
    const icon = slideData?.icon || {
        __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg",
        __icon_query__: "open book",
    }

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
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <radialGradient id="eduDivGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="eduDivGrowth" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.0" />
                            <stop offset="100%" stopColor="var(--primary-color,#2563eb)" stopOpacity="0.18" />
                        </linearGradient>
                        <pattern id="eduDivDots" width="34" height="34" patternUnits="userSpaceOnUse">
                            <circle cx="3" cy="3" r="3" fill="var(--primary-color,#2563eb)" fillOpacity="0.12" />
                        </pattern>
                    </defs>
                    {/* 左上角圆点纹样 */}
                    <rect x="56" y="56" width="240" height="150" fill="url(#eduDivDots)" />
                    {/* 右下角圆点纹样 */}
                    <rect x="990" y="520" width="234" height="140" fill="url(#eduDivDots)" />
                    {/* 右侧暖色光晕 */}
                    <circle cx="1120" cy="170" r="220" fill="url(#eduDivGlow)" />
                    {/* 成长曲线（自下而上） */}
                    <path d="M0 700 C 280 660, 520 560, 760 420 S 1180 160, 1280 96" fill="none" stroke="url(#eduDivGrowth)" strokeWidth="3" />
                    <path d="M0 720 C 320 700, 560 620, 820 480 S 1200 220, 1280 150 L 1280 720 Z" fill="url(#eduDivGrowth)" />
                </svg>

                {/* 超大装饰节号（装饰主体） */}
                <div
                    className="absolute select-none break-words"
                    style={{
                        right: '5%',
                        bottom: '-6%',
                        fontWeight: 900,
                        fontSize: '30rem',
                        lineHeight: 1,
                        color: "var(--primary-color,#2563eb)",
                        opacity: 0.08,
                        letterSpacing: '0',
                        overflowWrap: 'break-word', wordBreak: 'break-word',
                    }}
                    aria-hidden="true"
                >
                    {sectionNumber}
                </div>

                {/* 主内容层 */}
                <div className="relative z-10 flex h-full flex-col justify-center pl-20 pr-24">
                    {/* 顶部章节胶囊 + 图标 */}
                    <div className="mb-8 flex items-center gap-4">
                        <div
                            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm"
                            style={{ background: "var(--primary-color,#2563eb)", color: "var(--primary-text,#ffffff)" }}
                        >
                            <RemoteSvgIcon
                                url={icon.__icon_url__}
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-7 h-7"
                                title={icon.__icon_query__}
                            />
                        </div>
                        <span
                            className="inline-flex w-fit items-center rounded-full px-5 py-2 text-base font-semibold break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.12)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            第 {sectionNumber} 章
                        </span>
                    </div>

                    {/* 节号 + 节标题 */}
                    <div className="flex items-end gap-6">
                        <span
                            className="font-black leading-[1.05] break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                fontSize: '9rem',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {sectionNumber}
                        </span>
                        <div className="flex flex-col pb-4">
                            <h1
                                className="text-6xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* 装饰短线 */}
                    <div
                        className="my-7 h-1.5 w-24 rounded-full"
                        style={{ background: "var(--secondary-color,#f97316)" }}
                    />

                    {/* 副标题 */}
                    {subtitle && (
                        <p
                            className="max-w-[40rem] text-2xl leading-relaxed break-words"
                            style={{ color: "var(--background-text,#1f2937)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle}
                        </p>
                    )}

                    {/* 底部圆点装饰 */}
                    <div className="mt-12 flex items-center gap-2.5">
                        <span className="h-2.5 w-9 rounded-full" style={{ background: "var(--primary-color,#2563eb)" }} />
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--stroke,#f1e9d8)" }} />
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--stroke,#f1e9d8)" }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionDivider
