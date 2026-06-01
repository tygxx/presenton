import React from 'react'
import * as z from "zod";

export const layoutId = 'medical-cn-section-divider'
export const layoutName = '章节分隔'
export const layoutDescription = '医疗健康风章节过渡页：超大节号作为装饰主体，配脉搏波形、十字与圆角柔影卡片，蓝绿点缀。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    sectionNumber: z.string().min(1).max(4).default('02').meta({
        description: "章节序号，如『01』『02』，作为超大装饰节号",
    }),
    title: z.string().min(2).max(18).default('诊疗服务体系').meta({
        description: "章节标题（中文，简短）",
    }),
    subtitle: z.string().min(2).max(36).default('以患者为中心，构建全流程闭环健康管理').meta({
        description: "章节副标题，一句话补充说明（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const SectionDivider: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const sectionNumber = slideData?.sectionNumber || '02'
    const title = slideData?.title || '诊疗服务体系'
    const subtitle = slideData?.subtitle || '以患者为中心，构建全流程闭环健康管理'

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
                {/* 背景柔和光晕装饰层 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="medDivGlowA" cx="0.82" cy="0.18" r="0.55">
                                <stop offset="0%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="medDivGlowB" cx="0.1" cy="0.92" r="0.5">
                                <stop offset="0%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0.14" />
                                <stop offset="100%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#medDivGlowA)" />
                        <rect width="1280" height="720" fill="url(#medDivGlowB)" />
                        {/* 脉搏波形装饰，横贯下方 */}
                        <polyline
                            points="0,560 220,560 280,560 320,500 360,620 410,440 460,560 720,560 770,560 810,520 850,600 900,560 1280,560"
                            fill="none"
                            stroke="var(--primary-color,#0ea5e9)"
                            strokeOpacity="0.18"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {/* 细同心圆装饰 */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={i} cx="1080" cy="120" r={60 + i * 50} fill="none" stroke="var(--secondary-color,#10b981)" strokeOpacity="0.10" strokeWidth="1.5" />
                        ))}
                    </svg>
                </div>

                {/* 右上角十字 + 圆角卡片角标 */}
                <div className="absolute top-9 right-12 z-10 flex items-center gap-3" aria-hidden="true">
                    <span className="text-sm font-medium" style={{ color: "var(--background-text,#64748b)" }}>
                        HEALTHCARE
                    </span>
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl shadow-md"
                        style={{ background: "var(--primary-color,#0ea5e9)" }}
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5">
                            <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" fill="var(--primary-text,#ffffff)" />
                        </svg>
                    </div>
                </div>

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full items-center gap-10 px-20">
                    {/* 超大节号作为装饰主体 */}
                    <div className="flex flex-shrink-0 items-center">
                        <span
                            className="font-black leading-none break-words"
                            style={{
                                fontSize: '17rem',
                                lineHeight: 1,
                                color: 'transparent',
                                WebkitTextStroke: '3px var(--primary-color,#0ea5e9)',
                                backgroundImage: 'linear-gradient(160deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                opacity: 0.95,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {sectionNumber}
                        </span>
                    </div>

                    {/* 标题信息卡片 */}
                    <div className="flex min-w-0 flex-1 flex-col">
                        <span
                            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--secondary-color,#10b981)",
                                background: "rgba(16,185,129,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ background: "var(--secondary-color,#10b981)" }}
                            />
                            章节 {sectionNumber}
                        </span>

                        <h1
                            className="text-7xl font-black leading-[1.2] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div
                            className="my-7 h-1.5 w-24 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))" }}
                        />

                        {subtitle && (
                            <p
                                className="max-w-[34rem] text-xl leading-relaxed break-words"
                                style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionDivider
