import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'medical-cn-image-left'
export const layoutName = '图文（左图）'
export const layoutDescription = '医疗健康风图文页：左侧大图叠蓝绿渐变遮罩，右侧标题、正文段落与要点清单。圆角卡片、脉搏波形、十字与柔和投影装饰，蓝绿点缀，清爽可信赖。'

const schema = z.object({
    title: z.string().min(2).max(20).default('以患者为中心的智慧医疗').meta({
        description: "图文页主标题（中文，简短有力）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落，一句完整描述" })
    ).min(1).max(3).default([
        '依托智能影像与电子病历，让诊疗更精准、更高效。',
        '全流程数据互联，覆盖预防、诊断、治疗与康复全周期。',
    ]).meta({ description: "正文段落列表（1-3 条）" }),
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '明亮整洁的现代化医院走廊，医护人员与患者，柔和自然光，专业可信赖',
    }).meta({ description: "左侧主图（照片）" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "右侧要点，简短名词短语" })
    ).max(3).default([
        '智能影像辅助诊断',
        '全程电子健康档案',
        '远程会诊与随访',
    ]).meta({ description: "右侧要点清单（可空，最多 3 条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const bulletIcons = [
    'heartbeat',
    'first-aid-kit',
    'stethoscope',
]

const ImageLeft: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '以患者为中心的智慧医疗'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '依托智能影像与电子病历，让诊疗更精准、更高效。',
            '全流程数据互联，覆盖预防、诊断、治疗与康复全周期。',
        ]
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png'
    const imagePrompt = slideData?.image?.__image_prompt__ || '明亮整洁的现代化医院走廊'

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
                {/* 背景装饰：右下柔和光晕 */}
                <div
                    className="absolute -bottom-24 -right-24 z-0"
                    style={{
                        width: '380px', height: '380px', borderRadius: '9999px',
                        background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, rgba(16,185,129,0) 70%)',
                    }}
                    aria-hidden="true"
                />
                {/* 背景装饰：右上十字母题 */}
                <svg
                    className="absolute top-8 right-10 z-0"
                    width="60" height="60" viewBox="0 0 60 60" aria-hidden="true"
                >
                    <rect x="24" y="6" width="12" height="48" rx="4" fill="var(--primary-color,#0ea5e9)" fillOpacity="0.10" />
                    <rect x="6" y="24" width="48" height="12" rx="4" fill="var(--primary-color,#0ea5e9)" fillOpacity="0.10" />
                </svg>

                <div className="relative z-10 flex h-full p-8 gap-8">
                    {/* 左侧：大图卡片 + 渐变遮罩 + 脉搏波形 */}
                    <div
                        className="relative w-[46%] flex-shrink-0 overflow-hidden rounded-3xl shadow-lg"
                        style={{ borderColor: "var(--stroke,#e2e8f0)" }}
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
                                background: 'linear-gradient(150deg, rgba(14,165,233,0.55) 0%, rgba(16,185,129,0.30) 55%, rgba(15,23,42,0.45) 100%)',
                            }}
                            aria-hidden="true"
                        />
                        {/* 左下角标签 + 脉搏波形 */}
                        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                            <svg viewBox="0 0 240 36" className="mb-3 h-7 w-40" aria-hidden="true">
                                <path
                                    d="M0 18 H60 L72 18 L84 4 L100 32 L116 10 L128 18 H240"
                                    fill="none"
                                    stroke="var(--primary-text,#ffffff)"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeOpacity="0.95"
                                />
                            </svg>
                            <span
                                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold break-words"
                                style={{
                                    background: 'rgba(255,255,255,0.18)',
                                    color: "var(--primary-text,#ffffff)",
                                    backdropFilter: 'blur(4px)',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heartbeat-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-4 h-4"
                                    title="heartbeat"
                                />
                                健康守护 · 全程相伴
                            </span>
                        </div>
                    </div>

                    {/* 右侧：标题 + 正文 + 要点 */}
                    <div className="flex flex-1 flex-col justify-center">
                        <div className="mb-5 h-1.5 w-16 rounded-full" style={{ background: "var(--secondary-color,#10b981)" }} />
                        <h1
                            className="text-4xl font-black leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div className="mt-5 space-y-3">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-base leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {bullets.length > 0 && (
                            <div className="mt-7 space-y-3">
                                {bullets.map((b, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm"
                                        style={{ background: "var(--card-color,#ffffff)", borderColor: "var(--stroke,#e2e8f0)" }}
                                    >
                                        <span
                                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                                            style={{ background: "var(--primary-color,#0ea5e9)" }}
                                        >
                                            <RemoteSvgIcon
                                                url={`https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${bulletIcons[i % bulletIcons.length]}-bold.svg`}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-5 h-5"
                                                title={bulletIcons[i % bulletIcons.length]}
                                            />
                                        </span>
                                        <span
                                            className="text-base font-semibold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
