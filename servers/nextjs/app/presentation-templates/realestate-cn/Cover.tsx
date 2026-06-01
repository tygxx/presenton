import React from 'react'
import * as z from "zod";

export const layoutId = 'realestate-cn-cover'
export const layoutName = '封面'
export const layoutDescription = '房产建筑风封面：高级灰背景 + 金铜细线分隔与建筑剪影 + 主标题、副标题、汇报人、日期、机构。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    eyebrow: z.string().min(2).max(18).default('臻境 · 城市人居').meta({
        description: "标题上方的小标签/分类，如『楼盘发布』『项目推介』",
    }),
    title: z.string().min(2).max(20).default('栖于山海之间').meta({
        description: "封面主标题（中文，简短有力，体现轻奢质感）",
    }),
    subtitle: z.string().min(4).max(44).default('以克制的设计语言，重塑都市精英的理想居所').meta({
        description: "副标题，一句话补充项目气质与定位",
    }),
    presenterName: z.string().min(2).max(16).default('沈知远').meta({
        description: "汇报人姓名",
    }),
    presentationDate: z.string().min(2).max(22).default('2026年6月 · 春季发布会').meta({
        description: "汇报日期或场景",
    }),
    organization: z.string().min(2).max(26).default('宸境地产 · 设计研究院').meta({
        description: "机构或品牌名称",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Cover: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '臻境 · 城市人居'
    const title = slideData?.title || '栖于山海之间'
    const subtitle = slideData?.subtitle || '以克制的设计语言，重塑都市精英的理想居所'
    const presenterName = slideData?.presenterName || '沈知远'
    const presentationDate = slideData?.presentationDate || '2026年6月 · 春季发布会'
    const organization = slideData?.organization || '宸境地产 · 设计研究院'

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
                {/* 背景：极简建筑剪影 + 细线分隔母题 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="reCoverBg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--card-color,#ffffff)" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="var(--background-color,#f4f4f5)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="reCoverSky" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.16" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#reCoverBg)" />

                    {/* 右侧高级灰建筑剪影群（高低错落的塔楼） */}
                    <g fill="url(#reCoverSky)">
                        <rect x="868" y="318" width="78" height="402" />
                        <rect x="958" y="392" width="62" height="328" />
                        <rect x="1030" y="250" width="92" height="470" />
                        <rect x="1134" y="356" width="58" height="364" />
                        <rect x="1204" y="430" width="64" height="290" />
                    </g>
                    {/* 塔楼楼层细线（窗格肌理） */}
                    <g stroke="var(--secondary-color,#3f3f46)" strokeOpacity="0.10" strokeWidth="1">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <line key={`f${i}`} x1="868" y1={300 + i * 38} x2="1268" y2={300 + i * 38} />
                        ))}
                    </g>
                    {/* 塔尖金铜点缀 */}
                    <line x1="1076" y1="250" x2="1076" y2="206" stroke="var(--primary-color,#b08d57)" strokeWidth="1.5" />
                    <circle cx="1076" cy="202" r="3.5" fill="var(--primary-color,#b08d57)" />

                    {/* 左下大留白区的细分割线母题 */}
                    <line x1="96" y1="612" x2="560" y2="612" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                    <line x1="96" y1="612" x2="232" y2="612" stroke="var(--primary-color,#b08d57)" strokeWidth="1.5" />

                    {/* 顶部细装饰横线 */}
                    <line x1="96" y1="96" x2="1184" y2="96" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                    <line x1="96" y1="96" x2="200" y2="96" stroke="var(--primary-color,#b08d57)" strokeWidth="1.5" />
                </svg>

                {/* 右上角金铜细框角标 */}
                <div
                    className="absolute right-12 top-12 h-10 w-10"
                    style={{
                        borderTop: "1.5px solid var(--primary-color,#b08d57)",
                        borderRight: "1.5px solid var(--primary-color,#b08d57)",
                    }}
                    aria-hidden="true"
                />

                {/* 主内容层 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-24 py-16">
                    {/* 顶部品牌行 */}
                    <div className="absolute left-24 top-12 flex items-center gap-3">
                        <span
                            className="text-[0.7rem] font-medium tracking-[0.35em] break-words"
                            style={{ color: "var(--primary-color,#b08d57)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {organization}
                        </span>
                    </div>

                    {/* eyebrow 小标签 */}
                    <span
                        className="mb-7 inline-flex w-fit items-center gap-3 text-sm font-light tracking-[0.3em] break-words"
                        style={{ color: "var(--secondary-color,#3f3f46)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        <span className="inline-block h-px w-8" style={{ background: "var(--primary-color,#b08d57)" }} />
                        {eyebrow}
                    </span>

                    {/* 主标题（极简细体 → 用细到中等字重营造轻奢克制） */}
                    <h1
                        className="max-w-[58rem] text-7xl font-light leading-[1.2] break-words"
                        style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title}
                    </h1>

                    {/* 金铜细分隔线 */}
                    <div
                        className="my-9 h-px w-28"
                        style={{ background: "var(--primary-color,#b08d57)" }}
                    />

                    {/* 副标题 */}
                    <p
                        className="max-w-[40rem] text-xl font-light leading-loose break-words"
                        style={{ color: "var(--secondary-color,#3f3f46)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {subtitle}
                    </p>

                    {/* 底部信息：汇报人 / 日期 ，细线分隔 */}
                    <div className="mt-16 flex items-stretch gap-8">
                        <div className="flex flex-col leading-relaxed">
                            <span
                                className="text-[0.7rem] font-light tracking-[0.25em] break-words"
                                style={{ color: "var(--primary-color,#b08d57)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                汇报人
                            </span>
                            <span
                                className="mt-1.5 text-lg font-normal break-words"
                                style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {presenterName}
                            </span>
                        </div>

                        <div className="w-px self-stretch" style={{ background: "var(--stroke,#e4e4e7)" }} />

                        <div className="flex flex-col leading-relaxed">
                            <span
                                className="text-[0.7rem] font-light tracking-[0.25em] break-words"
                                style={{ color: "var(--primary-color,#b08d57)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                时间
                            </span>
                            <span
                                className="mt-1.5 text-lg font-normal break-words"
                                style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {presentationDate}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cover
