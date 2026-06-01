import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'retail-cn-closing'
export const layoutName = '结尾联系'
export const layoutDescription = '电商新零售风结尾页：撞色大色块 + 圆角卡片 + 价签装饰，大字致谢与多条联系信息行。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('谢谢观看').meta({
        description: "结尾大字致谢标题（中文，简短有力）",
    }),
    subtitle: z.string().min(2).max(36).default('期待与你一起，把好物带给更多人').meta({
        description: "副标题，一句话致谢或邀约（可选）",
    }),
    contacts: z.array(z.object({
        label: z.string().min(1).max(12).meta({ description: "联系方式标签，如『商务合作』『客服热线』" }),
        value: z.string().min(1).max(30).meta({ description: "联系方式内容，如电话/邮箱/微信" }),
        icon: IconSchema.optional().meta({ description: "联系方式图标（可选）" }),
    })).min(1).max(4).default([
        {
            label: '商务合作',
            value: 'bd@xinlingshou.com',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/handshake-bold.svg',
                __icon_query__: 'handshake',
            },
        },
        {
            label: '客服热线',
            value: '400-826-1688',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-call-bold.svg',
                __icon_query__: 'phone call',
            },
        },
        {
            label: '官方旗舰店',
            value: '搜索『新零售优选』',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/storefront-bold.svg',
                __icon_query__: 'storefront',
            },
        },
        {
            label: '官方微信',
            value: 'XLS-Retail',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/wechat-logo-bold.svg',
                __icon_query__: 'wechat logo',
            },
        },
    ]).meta({ description: "联系方式列表（1-4 条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Closing: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '谢谢观看'
    const subtitle = slideData?.subtitle || '期待与你一起，把好物带给更多人'
    const contacts = (slideData?.contacts && slideData.contacts.length > 0)
        ? slideData.contacts
        : [
            { label: '商务合作', value: 'bd@xinlingshou.com', icon: undefined },
            { label: '客服热线', value: '400-826-1688', icon: undefined },
            { label: '官方旗舰店', value: '搜索『新零售优选』', icon: undefined },
            { label: '官方微信', value: 'XLS-Retail', icon: undefined },
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
                    background: "var(--background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 左侧撞色大色块：品牌主色 */}
                <div
                    className="absolute top-0 left-0 h-full w-[46%] overflow-hidden"
                    style={{ background: "var(--primary-color,#db2777)" }}
                    aria-hidden="true"
                >
                    <svg viewBox="0 0 560 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="retailCloseGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <rect width="560" height="720" fill="url(#retailCloseGlow)" />
                        {/* 活力同心圆 */}
                        {[0, 1, 2, 3, 4].map((i) => (
                            <circle key={i} cx="120" cy="600" r={60 + i * 70} fill="none" stroke="#ffffff" strokeOpacity={0.10} strokeWidth="2" />
                        ))}
                        {/* 撞色对角斜条 */}
                        <polygon points="380,-40 560,-40 560,160 480,160" fill="#ffffff" fillOpacity="0.07" />
                    </svg>

                    {/* 撞色色块：右上活力副色方片 */}
                    <div
                        className="absolute"
                        style={{
                            top: '12%', right: '-44px', width: '120px', height: '120px',
                            borderRadius: '28px', transform: 'rotate(14deg)',
                            background: "var(--secondary-color,#f59e0b)",
                            boxShadow: '0 14px 36px rgba(0,0,0,0.18)',
                        }}
                    />
                    {/* 装饰：圆点 */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '16%', left: '64%', width: '16px', height: '16px', borderRadius: '9999px',
                            background: "var(--secondary-color,#f59e0b)",
                            boxShadow: '0 0 0 7px rgba(245,158,11,0.20)',
                        }}
                    />
                </div>

                {/* 左侧内容：大字致谢 + 价签装饰 */}
                <div className="relative z-10 flex h-full w-[46%] flex-col justify-center pl-16 pr-10">
                    {/* 价签徽标 */}
                    <div className="mb-7 flex items-center gap-3">
                        <span
                            className="relative inline-flex items-center rounded-r-full rounded-l-md py-1.5 pl-4 pr-5 text-sm font-black break-words"
                            style={{
                                background: "var(--secondary-color,#f59e0b)",
                                color: "var(--background-text,#18181b)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="mr-2 inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--background-text,#18181b)", opacity: 0.45 }}
                            />
                            THANK YOU
                        </span>
                    </div>

                    <h1
                        className="text-7xl font-black leading-[1.2] break-words"
                        style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title}
                    </h1>

                    <div
                        className="my-7 h-1.5 w-24 rounded-full"
                        style={{ background: "var(--secondary-color,#f59e0b)" }}
                    />

                    <p
                        className="max-w-[22rem] text-lg leading-relaxed break-words"
                        style={{ color: "var(--primary-text,#ffffff)", opacity: 0.92, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {subtitle}
                    </p>
                </div>

                {/* 右侧：联系信息卡片区 */}
                <div className="relative z-10 ml-auto flex h-full w-[54%] flex-col justify-center pl-12 pr-16">
                    <span
                        className="mb-6 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-bold tracking-wide break-words"
                        style={{
                            color: "var(--primary-color,#db2777)",
                            background: "var(--card-color,#fdf2f8)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        联系我们 · 一起把好物卖爆
                    </span>

                    <div className="flex flex-col gap-4">
                        {contacts.slice(0, 4).map((c, i) => {
                            const icon = (c as { icon?: z.infer<typeof IconSchema> })?.icon
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 rounded-2xl border px-5 py-4"
                                    style={{
                                        background: "var(--card-color,#fdf2f8)",
                                        borderColor: "var(--stroke,#fbcfe8)",
                                        boxShadow: '0 8px 20px rgba(219,39,119,0.06)',
                                    }}
                                >
                                    {/* 撞色图标块 */}
                                    <div
                                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                                        style={{
                                            background: i % 2 === 0 ? "var(--primary-color,#db2777)" : "var(--secondary-color,#f59e0b)",
                                        }}
                                    >
                                        {icon?.__icon_url__ ? (
                                            <RemoteSvgIcon
                                                url={icon.__icon_url__}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-6 h-6"
                                                title={icon.__icon_query__}
                                            />
                                        ) : (
                                            <span
                                                className="text-lg font-black"
                                                style={{ color: "var(--primary-text,#ffffff)" }}
                                            >
                                                {i + 1}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col leading-relaxed">
                                        <span
                                            className="text-xs font-bold uppercase break-words"
                                            style={{ color: "var(--primary-color,#db2777)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {c?.label || '联系方式'}
                                        </span>
                                        <span
                                            className="text-lg font-black leading-snug break-words"
                                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {c?.value || ''}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Closing
