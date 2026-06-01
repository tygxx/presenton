import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'tech-cn-image-right'
export const layoutName = '图文（右图）'
export const layoutDescription = '科技风图文页（右图）：深色底叠霓虹蓝紫渐变光晕与电路网格，左侧大标题/正文/要点，右侧发光描边大图卡片。图上叠主题色渐变遮罩，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('云原生智能引擎').meta({
        description: "图文页主标题（中文，简短有力）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落（中文，单段一句话）" })
    ).min(1).max(3).default([
        '以分布式架构与实时算力为底座，支撑亿级请求的稳定低延迟运行。',
        '从数据采集到智能决策全链路打通，让业务在秒级完成迭代与上线。',
    ]).meta({ description: "正文段落列表（1至3段）" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "要点短语（中文，简短）" })
    ).max(3).default([
        '毫秒级弹性扩缩容',
        '端到端全链路加密',
        '智能调度提效四成',
    ]).meta({ description: "右下要点标签（可空，最多3条）" }),
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "未来感数据中心机房，蓝紫色霓虹灯光与服务器阵列，科技互联网氛围",
    }).meta({ description: "右侧主图（建议科技/数据中心/算力相关画面）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageRight: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '云原生智能引擎'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '以分布式架构与实时算力为底座，支撑亿级请求的稳定低延迟运行。',
            '从数据采集到智能决策全链路打通，让业务在秒级完成迭代与上线。',
        ]
    const bullets = slideData?.bullets || []
    const image = slideData?.image || {
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "未来感数据中心机房，蓝紫色霓虹灯光与服务器阵列，科技互联网氛围",
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
                    background: "var(--background-color,#0a0e1a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：霓虹光晕 + 电路网格 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="techRightGlowA" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.30" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient id="techRightGlowB" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.32" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0" />
                            </radialGradient>
                            <pattern id="techRightGrid" width="46" height="46" patternUnits="userSpaceOnUse">
                                <path d="M46 0 H0 V46" fill="none" stroke="var(--stroke,#1f2937)" strokeOpacity="0.55" strokeWidth="1" />
                            </pattern>
                        </defs>
                        {/* 网格底纹 */}
                        <rect width="1280" height="720" fill="url(#techRightGrid)" />
                        {/* 左上蓝色光晕 */}
                        <rect x="-120" y="-160" width="760" height="620" fill="url(#techRightGlowA)" />
                        {/* 右下紫色光晕 */}
                        <circle cx="980" cy="640" r="360" fill="url(#techRightGlowB)" />
                        {/* 电路线 */}
                        <line x1="64" y1="560" x2="560" y2="560" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.22" strokeWidth="1.5" />
                        <line x1="560" y1="560" x2="600" y2="520" stroke="var(--primary-color,#3b82f6)" strokeOpacity="0.22" strokeWidth="1.5" />
                        <line x1="120" y1="120" x2="120" y2="300" stroke="var(--secondary-color,#8b5cf6)" strokeOpacity="0.20" strokeWidth="1.5" />
                        <circle cx="120" cy="120" r="4" fill="var(--secondary-color,#8b5cf6)" fillOpacity="0.6" />
                        <circle cx="600" cy="520" r="4" fill="var(--primary-color,#3b82f6)" fillOpacity="0.6" />
                    </svg>
                </div>

                {/* 主内容：左文字 + 右大图 */}
                <div className="relative z-10 grid h-full grid-cols-[1fr_0.92fr] gap-10 px-16 py-12">
                    {/* 左侧文字区 */}
                    <div className="flex min-w-0 flex-col justify-center">
                        {/* 顶部小标签 */}
                        <span
                            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                borderColor: "var(--primary-color,#3b82f6)",
                                background: "rgba(59,130,246,0.12)",
                                boxShadow: "0 0 18px rgba(59,130,246,0.25)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cpu-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-4 h-4"
                                title="cpu"
                            />
                            科技互联网
                        </span>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#e5e7eb)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        {/* 霓虹渐变分隔条 */}
                        <div
                            className="my-7 h-1.5 w-24 rounded-full"
                            style={{
                                background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                boxShadow: "0 0 16px rgba(139,92,246,0.5)",
                            }}
                        />

                        <div className="flex flex-col gap-3.5">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.7] break-words"
                                    style={{
                                        color: "var(--background-text,#e5e7eb)",
                                        opacity: 0.9,
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 要点标签 */}
                        {bullets.length > 0 && (
                            <div className="mt-9 flex flex-wrap gap-3">
                                {bullets.map((b, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium break-words"
                                        style={{
                                            color: "var(--background-text,#e5e7eb)",
                                            background: "var(--card-color,#111827)",
                                            borderColor: "var(--stroke,#1f2937)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        <span
                                            className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                            style={{
                                                background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                                boxShadow: "0 0 8px rgba(59,130,246,0.6)",
                                            }}
                                        />
                                        {b}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 右侧大图卡片：发光描边 + 主题色渐变遮罩 */}
                    <div className="flex min-w-0 items-center">
                        <div
                            className="relative w-full overflow-hidden rounded-2xl border"
                            style={{
                                borderColor: "var(--primary-color,#3b82f6)",
                                background: "var(--card-color,#111827)",
                                boxShadow: "0 0 0 1px rgba(139,92,246,0.25), 0 22px 60px rgba(59,130,246,0.28)",
                                aspectRatio: "4 / 5",
                            }}
                        >
                            <img
                                src={image.__image_url__}
                                alt={image.__image_prompt__}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            {/* 主题色渐变遮罩 */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(150deg, rgba(59,130,246,0.32) 0%, rgba(10,14,26,0.10) 42%, rgba(139,92,246,0.42) 100%)",
                                }}
                            />
                            {/* 描边发光内框 */}
                            <div
                                className="absolute inset-3 rounded-xl"
                                style={{ border: "1px solid rgba(229,231,235,0.18)" }}
                            />
                            {/* 右下角标 */}
                            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                                <div
                                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                                    style={{
                                        background: "rgba(10,14,26,0.55)",
                                        border: "1px solid var(--primary-color,#3b82f6)",
                                        boxShadow: "0 0 16px rgba(59,130,246,0.45)",
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightning-bold.svg"
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-5 h-5"
                                        title="lightning"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageRight
