import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'manufacturing-cn-closing'
export const layoutName = '结尾联系'
export const layoutDescription = '智能制造风结尾页：工业深灰底叠精密网格与齿轮、产线母题，大字致谢 + 多条联系信息行。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('谢谢观看').meta({
        description: "结尾大字致谢标题（中文，简短）",
    }),
    subtitle: z.string().min(2).max(36).default('精密智造，与您共建可靠的未来工厂').meta({
        description: "致谢副标题，一句话收尾（可选）",
    }),
    contacts: z.array(z.object({
        label: z.string().min(2).max(12).meta({ description: "联系方式标签，如『邮箱』『电话』" }),
        value: z.string().min(2).max(30).meta({ description: "联系方式内容，如邮箱地址、电话号码" }),
        icon: IconSchema.optional().meta({ description: "联系方式图标（可选）" }),
    })).min(1).max(4).default([
        {
            label: '联系电话',
            value: '021-5888 6600',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg',
                __icon_query__: 'phone',
            },
        },
        {
            label: '商务邮箱',
            value: 'contact@zhizao-tech.cn',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg',
                __icon_query__: 'envelope',
            },
        },
        {
            label: '智造基地',
            value: '上海市临港新片区智造大道 88 号',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/factory-bold.svg',
                __icon_query__: 'factory',
            },
        },
        {
            label: '官方网站',
            value: 'www.zhizao-tech.cn',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg',
                __icon_query__: 'globe',
            },
        },
    ]).meta({ description: "联系方式列表（1~4 条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Closing: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '谢谢观看'
    const subtitle = slideData?.subtitle || '精密智造，与您共建可靠的未来工厂'
    const contacts = (slideData?.contacts && slideData.contacts.length > 0)
        ? slideData.contacts
        : [
            { label: '联系电话', value: '021-5888 6600' },
            { label: '商务邮箱', value: 'contact@zhizao-tech.cn' },
            { label: '智造基地', value: '上海市临港新片区智造大道 88 号' },
            { label: '官方网站', value: 'www.zhizao-tech.cn' },
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
                    background: "var(--background-color,#1f2937)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：精密网格 + 齿轮 + 产线 + 金属光晕 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            {/* 精密网格纹样 */}
                            <pattern id="mfgClosingGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M40 0 L0 0 L0 40" fill="none" stroke="var(--stroke,#374151)" strokeWidth="1" strokeOpacity="0.55" />
                            </pattern>
                            {/* 蓝色金属光晕 */}
                            <radialGradient id="mfgClosingGlowA" cx="20%" cy="18%" r="55%">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.30" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </radialGradient>
                            {/* 橙色金属光晕 */}
                            <radialGradient id="mfgClosingGlowB" cx="92%" cy="88%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0.26" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f97316)" stopOpacity="0" />
                            </radialGradient>
                            {/* 齿轮齿形 */}
                            <g id="mfgClosingGear">
                                <path
                                    d="M0,-100 L14,-98 L18,-78 L40,-66 L58,-78 L72,-66 L60,-44 L72,-22 L92,-22 L98,-6 L80,4 L82,28 L98,34 L94,52 L74,52 L62,72 L72,90 L56,98 L42,82 L18,86 L12,100 L-6,98 L-10,80 L-32,68 L-50,78 L-64,64 L-52,44 L-64,22 L-84,24 L-92,8 L-76,-4 L-82,-28 L-98,-36 L-92,-54 L-72,-50 L-60,-70 L-72,-88 L-54,-96 L-40,-80 L-16,-86 Z"
                                    fill="none"
                                    stroke="var(--primary-color,#3b82f6)"
                                    strokeWidth="2.5"
                                    strokeLinejoin="round"
                                />
                                <circle cx="0" cy="0" r="44" fill="none" stroke="var(--primary-color,#3b82f6)" strokeWidth="2.5" />
                                <circle cx="0" cy="0" r="14" fill="none" stroke="var(--primary-color,#3b82f6)" strokeWidth="2.5" />
                            </g>
                        </defs>

                        {/* 网格底 */}
                        <rect width="1280" height="720" fill="url(#mfgClosingGrid)" />
                        {/* 金属光晕 */}
                        <rect width="1280" height="720" fill="url(#mfgClosingGlowA)" />
                        <rect width="1280" height="720" fill="url(#mfgClosingGlowB)" />

                        {/* 右上巨型齿轮（淡） */}
                        <g transform="translate(1140,120) scale(1.5)" opacity="0.16">
                            <use href="#mfgClosingGear" />
                        </g>
                        {/* 右上联动小齿轮 */}
                        <g transform="translate(980,250) scale(0.85)" opacity="0.12">
                            <use href="#mfgClosingGear" />
                        </g>

                        {/* 底部产线母题：导轨 + 工位节点 */}
                        <line x1="0" y1="624" x2="1280" y2="624" stroke="var(--secondary-color,#f97316)" strokeWidth="2.5" strokeOpacity="0.6" />
                        <line x1="0" y1="636" x2="1280" y2="636" stroke="var(--stroke,#374151)" strokeWidth="6" strokeOpacity="0.7" />
                        {[120, 320, 520, 720, 920, 1120].map((cx) => (
                            <g key={cx}>
                                <rect x={cx - 9} y={609} width="18" height="18" fill="none" stroke="var(--primary-color,#3b82f6)" strokeWidth="2" strokeOpacity="0.55" />
                                <circle cx={cx} cy={624} r="3" fill="var(--secondary-color,#f97316)" fillOpacity="0.85" />
                            </g>
                        ))}

                        {/* 硬朗金属斜线 */}
                        <line x1="-40" y1="60" x2="280" y2="-40" stroke="var(--stroke,#374151)" strokeWidth="2" strokeOpacity="0.6" />
                        <line x1="-40" y1="120" x2="340" y2="-40" stroke="var(--stroke,#374151)" strokeWidth="2" strokeOpacity="0.4" />
                    </svg>
                </div>

                {/* 角标：精密制造标识 */}
                <div className="absolute top-8 left-12 z-10 flex items-center gap-2.5">
                    <div className="h-7 w-1 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                    <span
                        className="text-sm font-bold tracking-wide break-words"
                        style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        智能制造 · INTELLIGENT MANUFACTURING
                    </span>
                </div>

                {/* 主内容：大字致谢 + 联系信息行 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-16 pb-16">
                    {/* 顶部强调块 */}
                    <div className="mb-7 flex items-center gap-4">
                        <div className="h-2 w-16 rounded-full" style={{ background: "var(--primary-color,#3b82f6)" }} />
                        <div className="h-2 w-6 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                    </div>

                    {/* 大字致谢 */}
                    <h1
                        className="text-7xl font-black leading-[1.2] break-words"
                        style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title}
                    </h1>

                    <p
                        className="mt-6 max-w-[40rem] text-2xl leading-relaxed break-words"
                        style={{ color: "var(--background-text,#e5e7eb)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {subtitle}
                    </p>

                    {/* 联系信息行 */}
                    <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-5">
                        {contacts.map((c, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 rounded-xl border px-5 py-4"
                                style={{ background: "var(--card-color,#111827)", borderColor: "var(--stroke,#374151)" }}
                            >
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg"
                                    style={{ background: "var(--primary-color,#3b82f6)" }}
                                >
                                    {c.icon?.__icon_url__ ? (
                                        <RemoteSvgIcon
                                            url={c.icon.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-6 h-6"
                                            title={c.icon.__icon_query__}
                                        />
                                    ) : (
                                        <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--primary-text,#ffffff)" }} />
                                    )}
                                </div>
                                <div className="flex min-w-0 flex-col leading-relaxed">
                                    <span
                                        className="text-xs font-semibold tracking-wide break-words"
                                        style={{ color: "var(--secondary-color,#f97316)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {c.label}
                                    </span>
                                    <span
                                        className="text-base font-bold leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#e5e7eb)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {c.value}
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
