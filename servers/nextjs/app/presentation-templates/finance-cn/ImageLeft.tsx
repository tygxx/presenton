import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'finance-cn-image-left'
export const layoutName = '图文（左图）'
export const layoutDescription = '金融投资风图文页：左侧大图叠香槟金渐变遮罩与数据角标，右侧衬线标题、要点段落与棱形要点列表。深藏青底配金线装饰，权威稳重。'

const schema = z.object({
    title: z.string().min(2).max(20).default('深耕价值 穿越周期').meta({
        description: "图文页主标题（中文，简短有力，建议不超过 20 字）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落，一句话阐述观点（中文，建议不超过 56 字）" })
    ).min(1).max(3).default([
        '我们以严谨的基本面研究为锚，在波动的市场中识别被低估的优质资产。',
        '坚持长期主义与分散配置，控制回撤的同时追求可持续的复利增长。',
        '依托数据驱动的风险模型，让每一笔投资都经得起周期的检验。',
    ]).meta({ description: "正文段落列表（1 至 3 段）" }),
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '现代金融中心玻璃幕墙建筑仰拍，暖金色夕阳光线，专业稳重的投资氛围',
    }).meta({ description: "左侧主图，将自动叠加香槟金主题渐变遮罩" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "右侧棱形要点，简短词组（中文，建议不超过 24 字）" })
    ).max(3).default([
        '全球大类资产配置',
        '严控回撤的风险框架',
        '长期复利价值导向',
    ]).meta({ description: "可选的要点列表（最多 3 条，可留空）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageLeft: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '深耕价值 穿越周期'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '我们以严谨的基本面研究为锚，在波动的市场中识别被低估的优质资产。',
            '坚持长期主义与分散配置，控制回撤的同时追求可持续的复利增长。',
            '依托数据驱动的风险模型，让每一笔投资都经得起周期的检验。',
        ]
    const imageUrl = slideData?.image?.__image_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png'
    const imagePrompt = slideData?.image?.__image_prompt__ || '现代金融中心玻璃幕墙建筑仰拍，暖金色夕阳光线，专业稳重的投资氛围'
    const bullets = slideData?.bullets || []

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
                {/* 背景装饰层：数据网格 + 细金线 + 右侧棱形 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="finImgLeftGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                                <path d="M48 0 L0 0 0 48" fill="none" stroke="#60a5fa" strokeOpacity="0.06" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="1280" height="720" fill="url(#finImgLeftGrid)" />
                        {/* 右侧棱形阵列母题 */}
                        {[0, 1, 2, 3].map((i) => (
                            <rect
                                key={`d${i}`}
                                x={1150 - i * 24}
                                y={92 + i * 4}
                                width="14"
                                height="14"
                                fill="none"
                                stroke="#d4af37"
                                strokeOpacity={0.5 - i * 0.09}
                                strokeWidth="1.5"
                                transform={`rotate(45 ${1157 - i * 24} ${99 + i * 4})`}
                            />
                        ))}
                        {/* 顶部与底部细金线 */}
                        <line x1="700" y1="58" x2="1208" y2="58" stroke="#d4af37" strokeOpacity="0.20" strokeWidth="1" />
                        <line x1="700" y1="662" x2="1208" y2="662" stroke="#d4af37" strokeOpacity="0.12" strokeWidth="1" />
                    </svg>
                </div>

                {/* 主体：左图 + 右文 */}
                <div className="relative z-10 flex h-full items-stretch gap-12 pl-12 pr-14 py-12">
                    {/* 左侧大图 + 香槟金渐变遮罩 + 数据角标 */}
                    <div
                        className="relative w-[44%] flex-shrink-0 overflow-hidden rounded-2xl"
                        style={{ border: '1px solid var(--stroke,#334155)' }}
                    >
                        <img
                            src={imageUrl}
                            alt={imagePrompt}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* 主题色渐变遮罩 */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(150deg, rgba(15,23,42,0.18) 0%, rgba(15,23,42,0.55) 58%, rgba(11,17,32,0.86) 100%)',
                            }}
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(0deg, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0) 46%)',
                            }}
                        />
                        {/* 左上分类细金线标识 */}
                        <div className="absolute left-5 top-5 flex items-center gap-2">
                            <span className="inline-block h-px w-8" style={{ background: "var(--primary-color,#d4af37)" }} />
                            <span
                                className="text-xs font-medium uppercase break-words"
                                style={{
                                    color: "var(--primary-color,#d4af37)",
                                    letterSpacing: '0.16em',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                投资理念
                            </span>
                        </div>
                        {/* 左下数据角标 */}
                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                            <div className="flex flex-col leading-relaxed">
                                <span
                                    className="text-3xl font-black leading-[1.2] break-words"
                                    style={{
                                        color: "var(--primary-color,#d4af37)",
                                        fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    18.6%
                                </span>
                                <span
                                    className="mt-1 text-xs break-words"
                                    style={{ color: "var(--background-text,#cbd5e1)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    近五年年化回报
                                </span>
                            </div>
                            <div className="flex flex-col items-end leading-relaxed">
                                <span
                                    className="text-3xl font-black leading-[1.2] break-words"
                                    style={{
                                        color: "var(--secondary-color,#60a5fa)",
                                        fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    8.2%
                                </span>
                                <span
                                    className="mt-1 text-xs break-words"
                                    style={{ color: "var(--background-text,#cbd5e1)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    最大回撤控制
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 右侧文字区 */}
                    <div className="flex flex-1 flex-col justify-center">
                        {/* 顶部分类标签 */}
                        <div className="mb-5 flex items-center gap-3">
                            <span className="inline-block h-px w-10" style={{ background: "var(--primary-color,#d4af37)" }} />
                            <span
                                className="text-sm font-medium uppercase break-words"
                                style={{
                                    color: "var(--primary-color,#d4af37)",
                                    letterSpacing: '0.18em',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                核心观点
                            </span>
                        </div>

                        {/* 衬线大标题 */}
                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#e2e8f0)",
                                fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        {/* 金色分隔线 */}
                        <div
                            className="my-6 h-[3px] w-24 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#d4af37), rgba(212,175,55,0))" }}
                        />

                        {/* 正文段落 */}
                        <div className="flex flex-col gap-4">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-loose break-words"
                                    style={{
                                        color: "var(--background-text,#cbd5e1)",
                                        opacity: 0.94,
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 棱形要点列表（可空） */}
                        {bullets.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                                {bullets.map((b, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span
                                            className="inline-block flex-shrink-0"
                                            style={{
                                                width: '9px',
                                                height: '9px',
                                                background: "var(--primary-color,#d4af37)",
                                                transform: 'rotate(45deg)',
                                            }}
                                        />
                                        <span
                                            className="text-base font-medium leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#e2e8f0)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {b}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageLeft
