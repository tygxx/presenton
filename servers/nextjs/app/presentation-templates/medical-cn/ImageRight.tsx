import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'medical-cn-image-right'
export const layoutName = '图文（右图）'
export const layoutDescription = '医疗健康风图文页：左侧标题、段落与要点列表，右侧大图（圆角卡片 + 蓝绿渐变遮罩）。脉搏波形与十字母题装饰，清爽专业、洁净可信赖。'

const schema = z.object({
    title: z.string().min(2).max(20).default('精准诊疗，守护健康').meta({
        description: "图文页主标题（中文，简短有力）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落，一句话陈述" })
    ).min(1).max(3).default([
        '依托循证医学与多学科协作，为每位患者制定个体化诊疗方案。',
        '从早筛、诊断到康复随访，构建全流程闭环健康管理体系。',
    ]).meta({ description: "左侧正文段落，1至3段" }),
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "明亮整洁的现代医院诊室，医生与患者温和交流，柔和自然光，蓝绿色调",
    }).meta({ description: "右侧大图，建议为诊疗或健康场景照片" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "要点短语，简洁有力" })
    ).max(3).default([
        '多学科会诊协作',
        '全周期健康随访',
        '数据驱动精准照护',
    ]).meta({ description: "左侧要点列表，可空，最多3条" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const bulletIcons = [
    'heartbeat',
    'shield-check',
    'pulse',
]

const ImageRight: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '精准诊疗，守护健康'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '依托循证医学与多学科协作，为每位患者制定个体化诊疗方案。',
            '从早筛、诊断到康复随访，构建全流程闭环健康管理体系。',
        ]
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = slideData?.image?.__image_prompt__ || '医疗健康场景图'

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
                {/* 背景装饰层：柔和光晕 + 脉搏波形 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="medRightGlow" cx="12%" cy="14%" r="55%">
                                <stop offset="0%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#medRightGlow)" />
                        <polyline
                            points="-20,650 200,650 260,650 300,610 340,690 380,560 425,650 600,650 660,650 700,624 740,684 780,650 1320,650"
                            fill="none"
                            stroke="var(--secondary-color,#10b981)"
                            strokeOpacity="0.14"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full items-stretch gap-12 px-16 py-12">
                    {/* 左侧：标题 + 段落 + 要点 */}
                    <div className="flex w-[48%] flex-shrink-0 flex-col justify-center">
                        {/* 母题角标：十字 + 渐变条 */}
                        <div className="mb-6 flex items-center gap-3">
                            <div
                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                                style={{
                                    background: "linear-gradient(150deg, var(--primary-color,#0ea5e9) 0%, var(--secondary-color,#10b981) 100%)",
                                    boxShadow: "0 10px 24px -12px rgba(14,165,233,0.55)",
                                }}
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                                    <path
                                        d="M9.5 3.5h5a1 1 0 0 1 1 1v4h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-4v4a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-4h-4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h4v-4a1 1 0 0 1 1-1Z"
                                        fill="var(--primary-text,#ffffff)"
                                        fillOpacity="0.95"
                                    />
                                </svg>
                            </div>
                            <div
                                className="h-1.5 w-16 rounded-full"
                                style={{ background: "linear-gradient(90deg, var(--primary-color,#0ea5e9) 0%, var(--secondary-color,#10b981) 100%)" }}
                            />
                        </div>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div className="mt-6 flex flex-col gap-3">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#475569)", opacity: 0.92, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {bullets.length > 0 && (
                            <div className="mt-8 flex flex-col gap-3">
                                {bullets.map((b, i) => (
                                    <div
                                        key={i}
                                        className="flex w-fit items-center gap-3 rounded-2xl border px-4 py-2.5"
                                        style={{
                                            background: "var(--card-color,#ffffff)",
                                            borderColor: "var(--stroke,#e2e8f0)",
                                            boxShadow: "0 10px 26px -18px rgba(15,23,42,0.20)",
                                        }}
                                    >
                                        <div
                                            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{
                                                background: "linear-gradient(150deg, var(--primary-color,#0ea5e9) 0%, var(--secondary-color,#10b981) 100%)",
                                            }}
                                        >
                                            <RemoteSvgIcon
                                                url={`https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${bulletIcons[i % bulletIcons.length]}-bold.svg`}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-4 h-4"
                                                title={b}
                                            />
                                        </div>
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

                    {/* 右侧：大图圆角卡片 + 蓝绿渐变遮罩 */}
                    <div className="flex flex-1 items-center justify-center">
                        <div
                            className="relative h-full w-full overflow-hidden rounded-[2rem]"
                            style={{
                                borderColor: "var(--stroke,#e2e8f0)",
                                boxShadow: "0 28px 64px -24px rgba(14,165,233,0.40)",
                            }}
                        >
                            <img
                                src={imageUrl}
                                alt={imagePrompt}
                                className="h-full w-full object-cover"
                            />
                            {/* 主题色渐变遮罩 */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(150deg, rgba(14,165,233,0.30) 0%, rgba(16,185,129,0.12) 45%, rgba(15,23,42,0.10) 100%)",
                                }}
                                aria-hidden="true"
                            />
                            {/* 角标十字母题 */}
                            <div
                                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl"
                                style={{
                                    background: "rgba(255,255,255,0.20)",
                                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.30)",
                                }}
                                aria-hidden="true"
                            >
                                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                                    <path
                                        d="M9.5 3.5h5a1 1 0 0 1 1 1v4h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-4v4a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-4h-4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h4v-4a1 1 0 0 1 1-1Z"
                                        fill="#ffffff"
                                        fillOpacity="0.95"
                                    />
                                </svg>
                            </div>
                            {/* 底部脉搏波形点缀 */}
                            <svg viewBox="0 0 320 48" className="absolute bottom-5 left-5 h-9 w-40" aria-hidden="true">
                                <polyline
                                    points="0,24 70,24 90,24 106,8 122,40 138,14 154,24 230,24 250,24 268,14 286,34 304,24 320,24"
                                    fill="none"
                                    stroke="#ffffff"
                                    strokeOpacity="0.92"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageRight
