import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'business-cn-image-right'
export const layoutName = '图文（右图）'
export const layoutDescription = '商务风图文页：左侧标题/段落/要点，右侧大图。图片叠加深蓝渐变遮罩，配橙色强调与几何网格装饰。'

const schema = z.object({
    title: z.string().min(2).max(20).default('深耕行业 协同共赢').meta({
        description: "图文页主标题（中文，简短有力，≤20字）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落，一句话说明（≤56字）" })
    ).min(1).max(3).default([
        '我们以稳健的经营策略与专业的服务能力，陪伴客户穿越周期，实现可持续的长期增长。',
        '依托数据驱动的决策体系，为企业提供从战略规划到落地执行的一体化解决方案。',
    ]).meta({ description: "左侧正文段落（1-3 段）" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "关键要点，简短短语（≤24字）" })
    ).max(3).default([
        '战略咨询与组织优化',
        '数字化转型落地',
        '全周期资本运营支持',
    ]).meta({ description: "左侧关键要点（可空，最多 3 条）" }),
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "现代商务办公场景，团队在明亮会议室协作讨论，专业大气",
    }).meta({ description: "右侧大图" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageRight: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '深耕行业 协同共赢'
    const paragraphs = slideData?.paragraphs && slideData.paragraphs.length > 0
        ? slideData.paragraphs
        : ['我们以稳健的经营策略与专业的服务能力，陪伴客户穿越周期，实现可持续的长期增长。']
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = slideData?.image?.__image_prompt__ || '现代商务办公场景'

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
                {/* 背景几何网格装饰 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <pattern id="bizImgRightGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <path d="M48 0 L0 0 0 48" fill="none" stroke="#1e3a8a" strokeOpacity="0.05" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="720" height="720" fill="url(#bizImgRightGrid)" />
                </svg>

                {/* 左上角橙色几何强调块 */}
                <div
                    className="absolute top-0 left-0"
                    style={{
                        width: '0', height: '0',
                        borderTop: '64px solid var(--secondary-color,#f97316)',
                        borderRight: '64px solid transparent',
                    }}
                    aria-hidden="true"
                />

                <div className="relative z-10 flex h-full">
                    {/* 左侧：标题 + 段落 + 要点 */}
                    <div className="flex w-[52%] flex-shrink-0 flex-col justify-center pl-16 pr-10 py-12">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="h-1.5 w-12 rounded-full" style={{ background: "var(--secondary-color,#f97316)" }} />
                            <span
                                className="text-sm font-medium tracking-wide break-words"
                                style={{ color: "var(--secondary-color,#f97316)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                企业商务
                            </span>
                        </div>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div className="mt-7 space-y-4">
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
                            <div className="mt-8 flex flex-col gap-3">
                                {bullets.map((b, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span
                                            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md"
                                            style={{ background: "var(--primary-color,#1e3a8a)" }}
                                        >
                                            <RemoteSvgIcon
                                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/check-bold.svg"
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
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
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 右侧：大图 + 深蓝渐变遮罩 */}
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
                                background: "linear-gradient(120deg, var(--primary-color,#1e3a8a) 0%, rgba(30,58,138,0.35) 38%, rgba(30,58,138,0.05) 100%)",
                            }}
                            aria-hidden="true"
                        />
                        {/* 右下角橙色几何强调点 */}
                        <div
                            className="absolute"
                            style={{
                                bottom: '8%', right: '8%', width: '16px', height: '16px', borderRadius: '9999px',
                                background: "var(--secondary-color,#f97316)",
                                boxShadow: '0 0 0 7px rgba(249,115,22,0.20)',
                            }}
                            aria-hidden="true"
                        />
                        {/* 左侧细线条网格装饰，呼应几何母题 */}
                        <svg viewBox="0 0 120 720" className="absolute inset-y-0 left-0 h-full" preserveAspectRatio="none" aria-hidden="true">
                            {[0, 1, 2].map((i) => (
                                <line key={i} x1={20 + i * 26} y1="0" x2={20 + i * 26} y2="720" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />
                            ))}
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageRight
