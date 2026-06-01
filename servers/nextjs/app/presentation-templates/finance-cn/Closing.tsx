import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'finance-cn-closing'
export const layoutName = '结尾联系'
export const layoutDescription = '金融投资风结尾页：深藏青底 + 香槟金细线 + 衬线大字致谢，配联系信息行（部门/电话/邮箱/网址）。数据网格与增长曲线装饰，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('谢谢观看').meta({
        description: "结尾页主标题（衬线大字致谢），如『谢谢观看』『感谢聆听』",
    }),
    subtitle: z.string().min(2).max(36).default('期待与您携手，把握价值，共创长期稳健回报').meta({
        description: "副标题，一句话表达期待与诚意（可选）",
    }),
    contacts: z.array(z.object({
        label: z.string().min(1).max(12).meta({ description: "联系方式名称，如『投资者关系』『咨询热线』" }),
        value: z.string().min(1).max(30).meta({ description: "联系方式内容，如电话/邮箱/网址" }),
        icon: IconSchema.optional().meta({ description: "该联系方式的图标（可选）" }),
    })).min(1).max(4).default([
        {
            label: '投资者关系',
            value: 'ir@hengyuan-capital.com',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg',
                __icon_query__: 'email envelope',
            },
        },
        {
            label: '咨询热线',
            value: '400-888-6688',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg',
                __icon_query__: 'phone call',
            },
        },
        {
            label: '官方网站',
            value: 'www.hengyuan-capital.com',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg',
                __icon_query__: 'website globe',
            },
        },
        {
            label: '办公地址',
            value: '上海市浦东新区陆家嘴金融城',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg',
                __icon_query__: 'location map pin',
            },
        },
    ]).meta({ description: "联系信息列表（1-4 项）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Closing: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '谢谢观看'
    const subtitle = slideData?.subtitle || '期待与您携手，把握价值，共创长期稳健回报'
    const contacts = slideData?.contacts || []

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;700;900&family=Noto+Sans+SC:wght@400;500;700&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：数据网格 + 增长曲线 + 棱形 + 细金线 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="finClosingGold" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="finClosingCurve" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.7" />
                        </linearGradient>
                        <radialGradient id="finClosingGlow" cx="50%" cy="38%" r="55%">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </radialGradient>
                        <pattern id="finClosingGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0H0V48" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.35" strokeWidth="1" />
                        </pattern>
                    </defs>

                    {/* 数据网格底纹 */}
                    <rect width="1280" height="720" fill="url(#finClosingGrid)" />
                    {/* 中央暖光晕 */}
                    <rect width="1280" height="720" fill="url(#finClosingGlow)" />

                    {/* 增长曲线（从左下到右上） */}
                    <path
                        d="M-20 600 C 220 560, 360 470, 540 430 S 880 320, 1100 200 1320 70 1320 70"
                        fill="none"
                        stroke="url(#finClosingCurve)"
                        strokeWidth="2.5"
                        strokeOpacity="0.55"
                    />
                    {/* 曲线数据节点 */}
                    {[
                        { cx: 220, cy: 560 },
                        { cx: 540, cy: 430 },
                        { cx: 860, cy: 300 },
                        { cx: 1100, cy: 200 },
                    ].map((p, i) => (
                        <circle key={i} cx={p.cx} cy={p.cy} r="3.5" fill="var(--primary-color,#d4af37)" fillOpacity="0.85" />
                    ))}

                    {/* 棱形母题（右上角组合） */}
                    {[0, 1, 2].map((i) => (
                        <rect
                            key={`d${i}`}
                            x={1150 - i * 30}
                            y={70 + i * 30}
                            width="44"
                            height="44"
                            transform={`rotate(45 ${1172 - i * 30} ${92 + i * 30})`}
                            fill="none"
                            stroke="var(--primary-color,#d4af37)"
                            strokeOpacity={0.3 - i * 0.07}
                            strokeWidth="1.5"
                        />
                    ))}

                    {/* 左下棱形点缀 */}
                    <rect
                        x="86" y="556" width="22" height="22"
                        transform="rotate(45 97 567)"
                        fill="var(--secondary-color,#60a5fa)" fillOpacity="0.25"
                    />
                </svg>

                {/* 顶部与底部细金线 */}
                <div className="absolute left-0 top-0 h-[3px] w-full" style={{ background: "url(#finClosingGold)" }} />
                <div
                    className="absolute left-0 top-0 h-[3px] w-full"
                    style={{ background: "linear-gradient(90deg, transparent, var(--primary-color,#d4af37), transparent)" }}
                />
                <div
                    className="absolute bottom-0 left-0 h-[3px] w-full"
                    style={{ background: "linear-gradient(90deg, transparent, var(--primary-color,#d4af37), transparent)" }}
                />

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-16 py-14 text-center">
                    {/* 小标签 */}
                    <span
                        className="mb-7 inline-flex items-center gap-2 rounded-full border px-5 py-1.5 text-sm font-medium tracking-wide break-words"
                        style={{
                            color: "var(--primary-color,#d4af37)",
                            borderColor: "var(--stroke,#334155)",
                            background: "var(--card-color,#1e293b)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <span
                            className="inline-block h-2 w-2 rotate-45"
                            style={{ background: "var(--primary-color,#d4af37)" }}
                        />
                        恒源资本 · 投资管理
                    </span>

                    {/* 衬线大字致谢 */}
                    <h1
                        className="text-7xl font-black leading-[1.2] break-words"
                        style={{
                            color: "var(--primary-text,#ffffff)",
                            fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    {/* 金色分隔线 */}
                    <div className="my-7 flex items-center gap-3">
                        <span className="h-px w-16" style={{ background: "var(--primary-color,#d4af37)", opacity: 0.6 }} />
                        <span className="h-2 w-2 rotate-45" style={{ background: "var(--primary-color,#d4af37)" }} />
                        <span className="h-px w-16" style={{ background: "var(--primary-color,#d4af37)", opacity: 0.6 }} />
                    </div>

                    {/* 副标题 */}
                    {subtitle && (
                        <p
                            className="max-w-[42rem] text-xl leading-relaxed break-words"
                            style={{
                                color: "var(--background-text,#e2e8f0)",
                                opacity: 0.9,
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
                                className="flex min-w-[14rem] flex-1 items-center gap-3 rounded-xl border px-5 py-4"
                                style={{
                                    background: "var(--card-color,#1e293b)",
                                    borderColor: "var(--stroke,#334155)",
                                }}
                            >
                                <div
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg"
                                    style={{
                                        background: "rgba(212,175,55,0.14)",
                                        border: "1px solid var(--stroke,#334155)",
                                    }}
                                >
                                    {c?.icon?.__icon_url__ ? (
                                        <RemoteSvgIcon
                                            url={c.icon.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-color,#d4af37)"
                                            className="w-6 h-6"
                                            title={c.icon.__icon_query__}
                                        />
                                    ) : (
                                        <span
                                            className="inline-block h-2.5 w-2.5 rotate-45"
                                            style={{ background: "var(--primary-color,#d4af37)" }}
                                        />
                                    )}
                                </div>
                                <div className="flex min-w-0 flex-col text-left leading-relaxed">
                                    <span
                                        className="text-xs font-medium break-words"
                                        style={{
                                            color: "var(--secondary-color,#60a5fa)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {c?.label}
                                    </span>
                                    <span
                                        className="text-base font-semibold break-words"
                                        style={{
                                            color: "var(--primary-text,#ffffff)",
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
