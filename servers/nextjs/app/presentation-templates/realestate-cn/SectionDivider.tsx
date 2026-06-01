import React from 'react'
import * as z from "zod";

export const layoutId = 'realestate-cn-section-divider'
export const layoutName = '章节分隔'
export const layoutDescription = '房产建筑风章节过渡页：超大节号作装饰主体，细线分隔 + 建筑剪影 + 大留白，高级灰配金铜点缀，轻奢克制。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    sectionNumber: z.string().min(1).max(4).default('02').meta({
        description: "章节序号，作为超大装饰主体，如『02』『03』",
    }),
    title: z.string().min(2).max(18).default('区位与价值').meta({
        description: "章节标题（中文，简短克制）",
    }),
    subtitle: z.string().min(2).max(36).default('城市核心地段，稀缺资源与长期增值潜力').meta({
        description: "章节副标题，一句话补充说明（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const SectionDivider: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const sectionNumber = slideData?.sectionNumber || '02'
    const title = slideData?.title || '区位与价值'
    const subtitle = slideData?.subtitle || '城市核心地段，稀缺资源与长期增值潜力'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f4f4f5)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：建筑剪影 + 细线网格 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="reSecSkyline" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.07" />
                            <stop offset="100%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* 右下角建筑剪影群（极简线条母题） */}
                    <g fill="url(#reSecSkyline)" stroke="var(--secondary-color,#3f3f46)" strokeOpacity="0.10" strokeWidth="1">
                        <rect x="900" y="430" width="70" height="290" />
                        <rect x="982" y="360" width="92" height="360" />
                        <rect x="1086" y="470" width="58" height="250" />
                        <rect x="1156" y="300" width="104" height="420" />
                    </g>
                    {/* 建筑窗格细线 */}
                    <g stroke="var(--secondary-color,#3f3f46)" strokeOpacity="0.08" strokeWidth="1">
                        <line x1="982" y1="400" x2="1074" y2="400" />
                        <line x1="982" y1="460" x2="1074" y2="460" />
                        <line x1="982" y1="520" x2="1074" y2="520" />
                        <line x1="982" y1="580" x2="1074" y2="580" />
                        <line x1="1156" y1="350" x2="1260" y2="350" />
                        <line x1="1156" y1="420" x2="1260" y2="420" />
                        <line x1="1156" y1="490" x2="1260" y2="490" />
                        <line x1="1156" y1="560" x2="1260" y2="560" />
                    </g>

                    {/* 左上极细装饰长线 */}
                    <line x1="0" y1="120" x2="360" y2="120" stroke="var(--primary-color,#b08d57)" strokeOpacity="0.30" strokeWidth="1" />
                </svg>

                {/* 内容主体：超大节号 + 节标题 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-20 py-16">
                    {/* 顶部小标签：章节 */}
                    <div className="flex items-center gap-4">
                        <span
                            className="text-sm font-medium uppercase break-words"
                            style={{
                                color: "var(--primary-color,#b08d57)",
                                letterSpacing: '0.35em',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            SECTION
                        </span>
                        <span className="h-px w-16" style={{ background: "var(--primary-color,#b08d57)", opacity: 0.5 }} />
                    </div>

                    {/* 超大节号 + 标题并排 */}
                    <div className="mt-8 flex items-center gap-12">
                        {/* 装饰主体：超大节号 */}
                        <span
                            className="flex-shrink-0 font-light leading-[1.0] break-words"
                            style={{
                                fontSize: '17rem',
                                color: "var(--secondary-color,#3f3f46)",
                                opacity: 0.14,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {sectionNumber}
                        </span>

                        {/* 细分割线 */}
                        <span
                            className="h-44 w-px flex-shrink-0"
                            style={{ background: "var(--stroke,#e4e4e7)" }}
                        />

                        {/* 节标题区 */}
                        <div className="flex min-w-0 flex-col">
                            <h1
                                className="text-6xl font-light leading-[1.25] break-words"
                                style={{
                                    color: "var(--background-text,#27272a)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {title}
                            </h1>

                            {/* 金铜点缀短线 */}
                            <span
                                className="mt-7 block h-0.5 w-20 rounded-full"
                                style={{ background: "var(--primary-color,#b08d57)" }}
                            />

                            <p
                                className="mt-7 max-w-[34rem] text-lg font-light leading-[1.7] break-words"
                                style={{
                                    color: "var(--background-text,#27272a)",
                                    opacity: 0.62,
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    {/* 底部细分割线 + 标记点 */}
                    <div className="mt-12 flex items-center gap-4">
                        <span className="h-px flex-1" style={{ background: "var(--stroke,#e4e4e7)" }} />
                        <span
                            className="h-2 w-2 rounded-full"
                            style={{
                                background: "var(--primary-color,#b08d57)",
                                boxShadow: '0 0 0 5px rgba(176,141,87,0.12)',
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionDivider
