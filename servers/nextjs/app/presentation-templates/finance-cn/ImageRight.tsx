import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'finance-cn-image-right'
export const layoutName = '图文（右图）'
export const layoutDescription = '金融投资风图文页：左侧衬线大标题、正文段落与要点，右侧大图叠香槟金渐变遮罩。深藏青底配细金线、数据网格与增长曲线装饰，高端稳重。'

const schema = z.object({
    title: z.string().min(2).max(20).default('稳健配置 穿越周期').meta({
        description: "页面主标题（中文，衬线大标题，简短有力）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落，一句话阐述一个观点" })
    ).min(1).max(3).default([
        '以多元资产配置为核心，分散风险、平滑波动，追求长期复利回报。',
        '严守安全边际，在不确定的市场中守住本金，把握确定性机会。',
    ]).meta({ description: "正文段落（1至3段）" }),
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "现代金融中心摩天大楼仰拍，玻璃幕墙，冷调蓝金光影，高端商务氛围",
    }).meta({ description: "右侧主图，建议金融、城市、数据相关画面" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "关键要点，简短词组" })
    ).max(3).default([
        '全球多元资产',
        '风险对冲机制',
        '长期价值投资',
    ]).meta({ description: "底部关键要点（可空，最多3条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageRight: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '稳健配置 穿越周期'
    const paragraphs = slideData?.paragraphs && slideData.paragraphs.length > 0
        ? slideData.paragraphs
        : [
            '以多元资产配置为核心，分散风险、平滑波动，追求长期复利回报。',
            '严守安全边际，在不确定的市场中守住本金，把握确定性机会。',
        ]
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = slideData?.image?.__image_prompt__ || '现代金融中心摩天大楼仰拍，玻璃幕墙，冷调蓝金光影，高端商务氛围'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@600;700;900&display=swap&subset=chinese-simplified"
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
                        <linearGradient id="finRightGoldLine" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                        </linearGradient>
                        <pattern id="finRightGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0 L0 0 0 48" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.45" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {/* 左侧数据网格底纹 */}
                    <rect x="0" y="0" width="760" height="720" fill="url(#finRightGrid)" />
                    {/* 增长曲线 */}
                    <path
                        d="M40 560 L200 500 L360 520 L520 400 L680 430 L760 300"
                        fill="none"
                        stroke="url(#finRightGoldLine)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {[
                        [200, 500], [360, 520], [520, 400], [680, 430],
                    ].map(([cx, cy], i) => (
                        <circle key={i} cx={cx} cy={cy} r="3.5" fill="var(--primary-color,#d4af37)" fillOpacity="0.7" />
                    ))}
                    {/* 棱形母题 */}
                    <rect x="92" y="120" width="34" height="34" transform="rotate(45 109 137)" fill="none" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.4" strokeWidth="1.5" />
                    <rect x="640" y="600" width="22" height="22" transform="rotate(45 651 611)" fill="none" stroke="var(--secondary-color,#60a5fa)" strokeOpacity="0.4" strokeWidth="1.5" />
                </svg>

                {/* 主内容：左文字 + 右大图 */}
                <div className="relative z-10 flex h-full">
                    {/* 左侧文字区 */}
                    <div className="flex w-[54%] flex-shrink-0 flex-col justify-center pl-16 pr-10 py-12">
                        {/* 细金线标签 */}
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-12" style={{ background: "var(--primary-color,#d4af37)" }} />
                            <span
                                className="text-sm font-medium tracking-wide break-words"
                                style={{ color: "var(--primary-color,#d4af37)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                金融投资 · 资产配置
                            </span>
                        </div>

                        {/* 衬线大标题 */}
                        <h1
                            className="text-5xl font-bold leading-[1.3] break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                fontFamily: "'Noto Serif SC', serif",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        {/* 金色分隔线 */}
                        <div
                            className="my-7 h-1 w-24 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#d4af37), rgba(212,175,55,0))" }}
                        />

                        {/* 正文段落 */}
                        <div className="flex flex-col gap-4">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.7] break-words"
                                    style={{
                                        color: "var(--background-text,#e2e8f0)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 关键要点（可空） */}
                        {bullets.length > 0 && (
                            <div className="mt-9 flex flex-wrap gap-3">
                                {bullets.map((b, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium leading-relaxed break-words"
                                        style={{
                                            color: "var(--background-text,#e2e8f0)",
                                            background: "var(--card-color,#1e293b)",
                                            borderColor: "var(--stroke,#334155)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        <span
                                            className="inline-block h-1.5 w-1.5 flex-shrink-0 rotate-45"
                                            style={{ background: "var(--primary-color,#d4af37)" }}
                                        />
                                        {b}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 右侧大图区 */}
                    <div className="relative flex-1 overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={imagePrompt}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* 主题色渐变遮罩 */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(105deg, var(--background-color,#0f172a) 0%, rgba(15,23,42,0.55) 35%, rgba(15,23,42,0.12) 100%)",
                            }}
                        />
                        {/* 金色描边遮罩点缀 */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(180deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0) 30%)",
                            }}
                        />
                        {/* 右下角细金线棱形角标 */}
                        <svg className="absolute bottom-6 right-6" width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
                            <rect x="20" y="20" width="32" height="32" transform="rotate(45 36 36)" fill="none" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.7" strokeWidth="1.5" />
                            <circle cx="36" cy="36" r="4" fill="var(--primary-color,#d4af37)" fillOpacity="0.85" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageRight
