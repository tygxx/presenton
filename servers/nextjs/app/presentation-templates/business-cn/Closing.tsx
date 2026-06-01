import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'business-cn-closing'
export const layoutName = '结尾联系'
export const layoutDescription = '商务风结尾页：大字致谢 + 副标题 + 联系信息行。深蓝几何面板、经典网格与橙色点缀装饰，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('谢谢观看').meta({
        description: "结尾大字致谢标题（中文，简短）",
    }),
    subtitle: z.string().min(0).max(36).default('期待与您携手共创长期商业价值').optional().meta({
        description: "致谢下方的一句话（可选）",
    }),
    contacts: z.array(z.object({
        label: z.string().min(1).max(12).meta({ description: "联系方式标签，如『电话』『邮箱』『地址』" }),
        value: z.string().min(1).max(30).meta({ description: "联系方式内容，如号码、邮箱、网址" }),
        icon: IconSchema.optional().meta({ description: "联系方式图标（可选）" }),
    })).min(1).max(4).default([
        {
            label: '电话',
            value: '400-888-6688',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg',
                __icon_query__: 'phone',
            },
        },
        {
            label: '邮箱',
            value: 'contact@qiyuan.com',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg',
                __icon_query__: 'email envelope',
            },
        },
        {
            label: '官网',
            value: 'www.qiyuan-consulting.com',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg',
                __icon_query__: 'website globe',
            },
        },
        {
            label: '地址',
            value: '上海市浦东新区世纪大道 100 号',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg',
                __icon_query__: 'location map pin',
            },
        },
    ]).meta({ description: "联系信息行（1-4 条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Closing: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '谢谢观看'
    const subtitle = slideData?.subtitle || '期待与您携手共创长期商业价值'
    const contacts = (slideData?.contacts && slideData.contacts.length > 0)
        ? slideData.contacts
        : [
            {
                label: '电话',
                value: '400-888-6688',
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg',
                    __icon_query__: 'phone',
                },
            },
            {
                label: '邮箱',
                value: 'contact@qiyuan.com',
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg',
                    __icon_query__: 'email envelope',
                },
            },
            {
                label: '官网',
                value: 'www.qiyuan-consulting.com',
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg',
                    __icon_query__: 'website globe',
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
                    background: "var(--background-color,#f8fafc)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 顶部深色几何面板：经典网格 + 同心圆 + 橙色强调点 */}
                <div
                    className="absolute top-0 left-0 w-full h-[62%] overflow-hidden"
                    style={{ background: "var(--primary-color,#1e3a8a)" }}
                >
                    <svg viewBox="0 0 1280 450" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                        <defs>
                            <linearGradient id="bizClosingGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                            <pattern id="bizClosingGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                                <path d="M48 0H0V48" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
                            </pattern>
                        </defs>
                        {/* 经典网格母题 */}
                        <rect width="1280" height="450" fill="url(#bizClosingGrid)" />
                        <rect width="1280" height="450" fill="url(#bizClosingGlow)" />
                        {/* 右上几何同心圆 */}
                        {[0, 1, 2, 3, 4].map((i) => (
                            <circle key={i} cx="1140" cy="70" r={60 + i * 56} fill="none" stroke="#ffffff" strokeOpacity={0.09} strokeWidth="1.5" />
                        ))}
                        {/* 几何斜线 */}
                        <line x1="-40" y1="380" x2="420" y2="40" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1.5" />
                        <line x1="-40" y1="460" x2="500" y2="40" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1.5" />
                    </svg>
                    {/* 橙色强调点 */}
                    <div
                        className="absolute"
                        style={{
                            top: '22%', right: '14%', width: '14px', height: '14px', borderRadius: '9999px',
                            background: "var(--secondary-color,#f97316)",
                            boxShadow: '0 0 0 6px rgba(249,115,22,0.18)',
                        }}
                    />
                </div>

                {/* 底部留白区的浅色几何面板装饰 */}
                <div
                    className="absolute bottom-0 left-0 w-full h-[38%] overflow-hidden"
                    aria-hidden="true"
                >
                    <svg viewBox="0 0 1280 280" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <line x1="1080" y1="-40" x2="1320" y2="200" stroke="var(--stroke,#e2e8f0)" strokeWidth="2" />
                        <line x1="1160" y1="-40" x2="1400" y2="200" stroke="var(--stroke,#e2e8f0)" strokeWidth="2" />
                    </svg>
                </div>

                {/* 主内容层 */}
                <div className="relative z-10 flex h-full w-full flex-col">
                    {/* 上部：致谢大字 + 副标题 */}
                    <div className="flex flex-1 flex-col items-center justify-center px-16 text-center">
                        <span
                            className="mb-5 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium tracking-wide break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.16)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            THANK YOU
                        </span>
                        <h1
                            className="text-7xl font-black leading-[1.2] break-words"
                            style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="my-6 h-1.5 w-24 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />
                        {subtitle && (
                            <p
                                className="max-w-[40rem] text-xl leading-relaxed break-words"
                                style={{ color: "var(--primary-text,#ffffff)", opacity: 0.88, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* 下部：联系信息行（卡片落在浅色区上方） */}
                    <div className="px-16 pb-12">
                        <div
                            className="grid gap-4 rounded-2xl border px-8 py-7 shadow-sm"
                            style={{
                                background: "var(--card-color,#ffffff)",
                                borderColor: "var(--stroke,#e2e8f0)",
                                gridTemplateColumns: `repeat(${Math.min(contacts.length, 4)}, minmax(0, 1fr))`,
                            }}
                        >
                            {contacts.slice(0, 4).map((c, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div
                                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                        style={{ background: "var(--primary-color,#1e3a8a)" }}
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
                                            <div
                                                className="h-3 w-3 rounded-full"
                                                style={{ background: "var(--secondary-color,#f97316)" }}
                                            />
                                        )}
                                    </div>
                                    <div className="flex min-w-0 flex-col leading-relaxed">
                                        <span
                                            className="text-xs font-semibold uppercase tracking-wide break-words"
                                            style={{ color: "var(--secondary-color,#f97316)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {c?.label}
                                        </span>
                                        <span
                                            className="text-base font-bold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {c?.value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Closing
