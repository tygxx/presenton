import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'gov-cn-image-right'
export const layoutName = '图文（右图）'
export const layoutDescription = '党政政务风图文页（右图）：左侧标题/正文段落/要点，右侧大图配中国红烫金渐变遮罩。米白底 + 中国红 + 烫金细线，对称角标与五角星点缀，庄重权威。'

const schema = z.object({
    title: z.string().min(2).max(20).default('扎实推进民生实事').meta({
        description: "图文页主标题（中文，庄重简短）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落（一句话，中文）" })
    ).min(1).max(3).default([
        '坚持以人民为中心的发展思想，把保障和改善民生作为一切工作的出发点和落脚点。',
        '聚焦群众急难愁盼问题，统筹推进教育、医疗、养老、就业等重点领域改革落地见效。',
        '健全长效工作机制，确保各项惠民政策落到实处，不断增强人民群众的获得感幸福感。',
    ]).meta({
        description: "正文段落数组（1至3段）",
    }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "要点条目（短句，中文）" })
    ).max(3).default([
        '惠民政策精准落地',
        '公共服务提质增效',
        '群众满意稳步提升',
    ]).meta({
        description: "右下要点列表（可空，最多3条）",
    }),
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '基层社区民生服务现场，群众与工作人员交流，庄重温暖的政务氛围',
    }).meta({
        description: "右侧大图（政务/民生主题照片）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageRight: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '扎实推进民生实事'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '坚持以人民为中心的发展思想，把保障和改善民生作为一切工作的出发点和落脚点。',
            '聚焦群众急难愁盼问题，统筹推进教育、医疗、养老、就业等重点领域改革落地见效。',
            '健全长效工作机制，确保各项惠民政策落到实处，不断增强人民群众的获得感幸福感。',
        ]
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png'
    const imagePrompt = slideData?.image?.__image_prompt__ || '基层社区民生服务现场'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#faf7f2)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：顶部中国红色带 + 烫金光晕 + 对称纹样 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="govIRGoldGlow" cx="28%" cy="20%" r="55%">
                                <stop offset="0%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="govIRRedTop" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#c1121f)" stopOpacity="1" />
                                <stop offset="100%" stopColor="var(--primary-color,#c1121f)" stopOpacity="0.78" />
                            </linearGradient>
                        </defs>
                        {/* 顶部中国红色带 */}
                        <rect x="0" y="0" width="1280" height="12" fill="url(#govIRRedTop)" />
                        {/* 烫金光晕 */}
                        <rect x="0" y="0" width="1280" height="720" fill="url(#govIRGoldGlow)" />
                        {/* 左下对称同心圆纹样（华表纹样意象） */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={`l${i}`} cx="-40" cy="660" r={110 + i * 64} fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity={0.07} strokeWidth="1.2" />
                        ))}
                    </svg>
                </div>

                {/* 四角烫金细线角标（对称） */}
                <div className="absolute left-6 top-7 h-9 w-9 border-l-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.55 }} aria-hidden="true" />
                <div className="absolute bottom-7 left-6 h-9 w-9 border-b-2 border-l-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.55 }} aria-hidden="true" />

                {/* 主内容：左文字 + 右大图 */}
                <div className="relative z-10 flex h-full w-full items-stretch gap-12 px-16 py-14">
                    {/* 左侧：标题 + 正文段落 + 要点 */}
                    <div className="flex w-[48%] flex-shrink-0 flex-col justify-center">
                        {/* 标题上方五角星 + 烫金引线 */}
                        <div className="mb-5 flex items-center gap-3" aria-hidden="true">
                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="var(--primary-color,#c1121f)">
                                <path d="M12 2l2.9 6.26L21.8 9.2l-5 4.62L18.1 21 12 17.4 5.9 21l1.3-7.18-5-4.62 6.9-0.94L12 2z" />
                            </svg>
                            <span className="h-px w-20" style={{ background: "linear-gradient(90deg, var(--secondary-color,#b8860b), transparent)" }} />
                        </div>

                        {/* 主标题 */}
                        <h1
                            className="text-5xl font-black leading-[1.3] break-words"
                            style={{
                                color: "var(--background-text,#1a1a1a)",
                                letterSpacing: '0.04em',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        {/* 烫金分隔线 */}
                        <div className="mt-5 mb-6 h-1 w-20 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} aria-hidden="true" />

                        {/* 正文段落 */}
                        <div className="space-y-4">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.8] break-words"
                                    style={{
                                        color: "var(--background-text,#1a1a1a)",
                                        opacity: 0.88,
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 要点列表（可空） */}
                        {bullets.length > 0 && (
                            <div className="mt-7 flex flex-wrap gap-3">
                                {bullets.map((b, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-2 rounded-sm border px-4 py-2 text-base font-semibold leading-relaxed break-words"
                                        style={{
                                            color: "var(--primary-color,#c1121f)",
                                            background: "var(--card-color,#ffffff)",
                                            borderColor: "var(--stroke,#e8dcc8)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        <span className="inline-block h-2 w-2 flex-shrink-0 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} aria-hidden="true" />
                                        {b}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 右侧：大图 + 中国红烫金渐变遮罩 */}
                    <div className="relative flex-1 overflow-hidden rounded-sm">
                        {/* 烫金外框 */}
                        <div
                            className="absolute inset-0 z-20 rounded-sm border-2"
                            style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.65 }}
                            aria-hidden="true"
                        />
                        <img
                            src={imageUrl}
                            alt={imagePrompt}
                            className="h-full w-full object-cover"
                        />
                        {/* 主题色渐变遮罩 */}
                        <div
                            className="absolute inset-0 z-10"
                            style={{
                                background: "linear-gradient(160deg, rgba(193,18,31,0.34) 0%, rgba(193,18,31,0.06) 45%, rgba(184,134,11,0.22) 100%)",
                            }}
                            aria-hidden="true"
                        />
                        {/* 右上角五角星点缀 */}
                        <div className="absolute right-4 top-4 z-20" aria-hidden="true">
                            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="var(--primary-text,#ffffff)" style={{ opacity: 0.92 }}>
                                <path d="M12 2l2.9 6.26L21.8 9.2l-5 4.62L18.1 21 12 17.4 5.9 21l1.3-7.18-5-4.62 6.9-0.94L12 2z" />
                            </svg>
                        </div>
                        {/* 底部烫金细线 */}
                        <div
                            className="absolute bottom-0 left-0 z-20 h-1.5 w-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#c1121f), var(--secondary-color,#b8860b))" }}
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageRight
