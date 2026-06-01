import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'business-cn-image-left'
export const layoutName = '图文（左图）'
export const layoutDescription = '商务风图文页：左侧大图叠深蓝渐变遮罩，右侧标题、正文段落与要点列表。稳健网格 + 橙色点缀，适合用一张照片配核心论述。'

const schema = z.object({
    title: z.string().min(2).max(20).default('深耕行业的稳健力量').meta({
        description: "图文页主标题（中文，简短有力，≤20字）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落，一句完整论述（≤56字）" })
    ).min(1).max(3).default([
        '我们以严谨的方法论与本地化洞察，帮助企业在复杂市场中保持清晰判断。',
        '从战略规划到落地执行，提供端到端的专业陪伴，让每一次决策都有据可依。',
    ]).meta({ description: "右侧正文段落，1至3段" }),
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '现代企业办公环境，商务团队在明亮会议室中协作讨论，专业稳重的氛围',
    }).meta({ description: "左侧主图（叠加深蓝渐变遮罩）" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "右侧要点条目（≤24字）" })
    ).max(3).default([
        '行业经验超过十五年',
        '服务覆盖全国主要城市',
        '客户复购率持续领先',
    ]).meta({ description: "右侧关键要点列表（可空，最多3条）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageLeft: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '深耕行业的稳健力量'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '我们以严谨的方法论与本地化洞察，帮助企业在复杂市场中保持清晰判断。',
            '从战略规划到落地执行，提供端到端的专业陪伴，让每一次决策都有据可依。',
        ]
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png'
    const imagePrompt = slideData?.image?.__image_prompt__ || '现代企业办公环境，商务团队在明亮会议室中协作讨论'

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
                <div className="flex h-full">
                    {/* 左侧：大图 + 深蓝渐变遮罩 */}
                    <div className="relative w-[46%] flex-shrink-0 overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={imagePrompt}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* 主题色渐变遮罩 */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(135deg, rgba(30,58,138,0.78) 0%, rgba(30,58,138,0.32) 52%, rgba(15,23,42,0.55) 100%)",
                            }}
                        />
                        {/* 几何网格装饰 */}
                        <svg viewBox="0 0 560 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                            <defs>
                                <pattern id="bizImgGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                                    <path d="M48 0H0V48" fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="560" height="720" fill="url(#bizImgGrid)" />
                        </svg>
                        {/* 左下角图注标签 */}
                        <div className="absolute bottom-7 left-7 right-7">
                            <div
                                className="mb-3 h-1 w-12 rounded-full"
                                style={{ background: "var(--secondary-color,#f97316)" }}
                            />
                            <span
                                className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium leading-relaxed break-words"
                                style={{
                                    background: "rgba(15,23,42,0.42)",
                                    color: "var(--primary-text,#ffffff)",
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {imagePrompt}
                            </span>
                        </div>
                        {/* 橙色强调角标 */}
                        <div
                            className="absolute top-7 left-7 h-3.5 w-3.5 rounded-full"
                            style={{
                                background: "var(--secondary-color,#f97316)",
                                boxShadow: '0 0 0 6px rgba(249,115,22,0.20)',
                            }}
                        />
                    </div>

                    {/* 右侧：文字内容 */}
                    <div className="relative flex flex-1 flex-col justify-center pl-14 pr-16 py-12">
                        {/* 右上角几何面板装饰 */}
                        <div
                            className="absolute top-0 right-0 h-28 w-28 overflow-hidden"
                            aria-hidden="true"
                        >
                            <svg viewBox="0 0 112 112" className="h-full w-full">
                                {[0, 1, 2].map((i) => (
                                    <circle key={i} cx="112" cy="0" r={36 + i * 26} fill="none" stroke="var(--primary-color,#1e3a8a)" strokeOpacity={0.10} strokeWidth="1.5" />
                                ))}
                            </svg>
                        </div>

                        <div
                            className="mb-5 h-1.5 w-16 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />
                        <h1
                            className="text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div className="mt-6 space-y-4">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#475569)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {bullets.length > 0 && (
                            <ul className="mt-8 space-y-3 border-t pt-6" style={{ borderColor: "var(--stroke,#e2e8f0)" }}>
                                {bullets.map((b, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <span
                                            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{ background: "rgba(30,58,138,0.10)" }}
                                        >
                                            <RemoteSvgIcon
                                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/check-circle-bold.svg"
                                                strokeColor="currentColor"
                                                color="var(--primary-color,#1e3a8a)"
                                                className="w-4 h-4"
                                                title="check"
                                            />
                                        </span>
                                        <span
                                            className="text-base font-medium leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {b}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageLeft
