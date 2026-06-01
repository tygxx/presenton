import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'tech-cn-image-left'
export const layoutName = '图文（左图）'
export const layoutDescription = '科技互联网风图文页：左侧大图叠霓虹蓝紫渐变遮罩，右侧深色底配霓虹光晕、几何网格与电路线装饰，呈现标题、正文段落与带图标的发光描边要点卡片。左对齐大标题，未来科技感。'

const schema = z.object({
    title: z.string().min(2).max(20).default('云原生智能平台').meta({
        description: "图文页主标题（中文，简短有力，体现科技未来感）",
    }),
    paragraphs: z.array(
        z.string().min(2).max(56).meta({ description: "正文段落（中文，一段一句话）" })
    ).min(1).max(3).default([
        '以分布式算力与大模型引擎为底座，打通从数据接入到智能决策的完整链路。',
        '弹性调度让每一份算力都用在刀刃上，毫秒级推理支撑亿级并发请求。',
    ]).meta({ description: "正文段落列表（1-3 段）" }),
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '未来科技感数据中心，蓝紫霓虹光线与服务器机柜，深色背景的智能算力平台',
    }).meta({ description: "左侧主图（科技/数据/算力相关），图上会叠加主题色渐变遮罩" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "右侧要点短语（中文，简短）" })
    ).max(3).default([
        '弹性算力调度',
        '毫秒级推理响应',
        '一站式模型部署',
    ]).meta({ description: "右侧要点列表（可空，最多 3 条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageLeft: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '云原生智能平台'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '以分布式算力与大模型引擎为底座，打通从数据接入到智能决策的完整链路。',
            '弹性调度让每一份算力都用在刀刃上，毫秒级推理支撑亿级并发请求。',
        ]
    const imageUrl = slideData?.image?.__image_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png'
    const imagePrompt = slideData?.image?.__image_prompt__ || '未来科技感数据中心，蓝紫霓虹光线与服务器机柜，深色背景的智能算力平台'
    const bullets = slideData?.bullets || []
    const bulletIcons = [
        'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightning-bold.svg',
        'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cpu-bold.svg',
        'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-launch-bold.svg',
    ]
    const bulletQueries = ['lightning', 'cpu', 'rocket launch']

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
                {/* 背景装饰层：霓虹渐变光晕 + 几何网格 + 电路线 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <div
                        className="absolute"
                        style={{
                            top: '-22%', right: '-6%', width: '52%', height: '80%', borderRadius: '9999px',
                            background: "radial-gradient(closest-side, var(--secondary-color,#8b5cf6), transparent 70%)",
                            opacity: 0.32, filter: 'blur(8px)',
                        }}
                    />
                    <div
                        className="absolute"
                        style={{
                            bottom: '-28%', right: '8%', width: '46%', height: '78%', borderRadius: '9999px',
                            background: "radial-gradient(closest-side, var(--primary-color,#3b82f6), transparent 70%)",
                            opacity: 0.28, filter: 'blur(8px)',
                        }}
                    />
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="techImgLeftGrid" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.5" />
                            </linearGradient>
                            <pattern id="techImgLeftMesh" width="56" height="56" patternUnits="userSpaceOnUse">
                                <path d="M56 0H0V56" fill="none" stroke="url(#techImgLeftGrid)" strokeOpacity="0.16" strokeWidth="1" />
                            </pattern>
                            <linearGradient id="techImgLeftCircuit" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                                <stop offset="50%" stopColor="var(--secondary-color,#8b5cf6)" stopOpacity="0.65" />
                                <stop offset="100%" stopColor="var(--primary-color,#3b82f6)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#techImgLeftMesh)" />
                        <path d="M640 640 H840 L900 580 H1160 L1220 640 H1280" fill="none" stroke="url(#techImgLeftCircuit)" strokeWidth="1.3" />
                        <path d="M720 110 H940 L1000 170 H1240" fill="none" stroke="url(#techImgLeftCircuit)" strokeWidth="1.2" />
                        {[[840, 640], [1160, 580], [940, 110], [1000, 170]].map(([cx, cy], i) => (
                            <circle key={`n-${i}`} cx={cx} cy={cy} r="3.2" fill="var(--secondary-color,#8b5cf6)" />
                        ))}
                    </svg>
                </div>

                {/* 主内容：左图 + 右文字 */}
                <div className="relative z-10 flex h-full w-full items-stretch gap-10 p-12">
                    {/* 左侧大图，叠霓虹蓝紫渐变遮罩 */}
                    <div
                        className="relative w-[44%] flex-shrink-0 overflow-hidden rounded-2xl"
                        style={{
                            border: "1px solid var(--stroke,#1f2937)",
                            boxShadow: '0 0 0 1px rgba(59,130,246,0.12), 0 18px 50px -18px rgba(139,92,246,0.55)',
                        }}
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
                                background: "linear-gradient(150deg, rgba(59,130,246,0.42) 0%, rgba(10,14,26,0.20) 45%, rgba(139,92,246,0.55) 100%)",
                            }}
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(to top, rgba(10,14,26,0.78) 0%, transparent 55%)",
                            }}
                        />
                        {/* 图左下角霓虹强调点 */}
                        <div
                            className="absolute"
                            style={{
                                left: '7%', bottom: '8%', width: '10px', height: '10px', borderRadius: '9999px',
                                background: "var(--secondary-color,#8b5cf6)",
                                boxShadow: '0 0 0 5px rgba(139,92,246,0.20), 0 0 18px 3px rgba(139,92,246,0.55)',
                            }}
                        />
                    </div>

                    {/* 右侧文字区 */}
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                        {/* 霓虹分隔条 */}
                        <div
                            className="mb-5 h-1.5 w-20 rounded-full"
                            style={{
                                background: "linear-gradient(90deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                boxShadow: '0 0 14px 1px rgba(59,130,246,0.55)',
                            }}
                        />

                        {/* 主标题：霓虹渐变文字 */}
                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#e5e7eb)",
                                backgroundImage: "linear-gradient(100deg, var(--primary-text,#ffffff) 0%, var(--primary-color,#3b82f6) 60%, var(--secondary-color,#8b5cf6) 100%)",
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        {/* 正文段落 */}
                        <div className="mt-6 space-y-4">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.7] break-words"
                                    style={{
                                        color: "var(--background-text,#e5e7eb)",
                                        opacity: 0.82,
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 要点：半透明发光描边卡片 + 图标 */}
                        {bullets.length > 0 && (
                            <div className="mt-8 flex flex-col gap-3">
                                {bullets.map((b, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3"
                                        style={{
                                            background: "rgba(17,24,39,0.55)",
                                            border: "1px solid var(--stroke,#1f2937)",
                                            boxShadow: '0 0 0 1px rgba(59,130,246,0.10), 0 10px 30px -14px rgba(139,92,246,0.45)',
                                        }}
                                    >
                                        <span
                                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                                            style={{
                                                background: "linear-gradient(135deg, var(--primary-color,#3b82f6), var(--secondary-color,#8b5cf6))",
                                                boxShadow: '0 0 16px 0 rgba(59,130,246,0.5)',
                                            }}
                                        >
                                            <RemoteSvgIcon
                                                url={bulletIcons[i % bulletIcons.length]}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-5 h-5"
                                                title={bulletQueries[i % bulletQueries.length]}
                                            />
                                        </span>
                                        <span
                                            className="text-base font-semibold leading-relaxed break-words"
                                            style={{
                                                color: "var(--primary-text,#ffffff)",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
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
