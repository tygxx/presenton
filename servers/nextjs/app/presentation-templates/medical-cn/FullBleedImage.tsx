import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'medical-cn-full-bleed-image'
export const layoutName = '全幅大图'
export const layoutDescription = '医疗健康风全幅大图页：满铺照片叠蓝绿深色渐变遮罩保证文字可读，底部叠加大标题与副标题。脉搏波形、十字与柔和光晕装饰，蓝绿点缀，清爽专业、洁净可信赖。'

const schema = z.object({
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '明亮整洁的现代化医院大厅，柔和自然光，医护人员微笑迎接患者，专业洁净可信赖',
    }).meta({ description: "满幅背景大图（照片），会自动叠加深色渐变遮罩" }),
    title: z.string().min(2).max(20).default('守护每一次生命的脉动').meta({
        description: "叠加在图片上的主标题（中文，简短有力，≤20 字）",
    }),
    subtitle: z.string().min(2).max(40).default('以科技与温度，构建全周期智慧健康守护体系').meta({
        description: "副标题，一句话补充说明（可选，≤40 字）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FullBleedImage: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '守护每一次生命的脉动'
    const subtitle = slideData?.subtitle || '以科技与温度，构建全周期智慧健康守护体系'
    const imageUrl = slideData?.image?.__image_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png'
    const imagePrompt = slideData?.image?.__image_prompt__ || '明亮整洁的现代化医院大厅'

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
                {/* 满铺背景大图 */}
                <img
                    src={imageUrl}
                    alt={imagePrompt}
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                />

                {/* 深色主题色渐变遮罩：底部最深，保证文字可读 */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: 'linear-gradient(180deg, rgba(15,23,42,0.10) 0%, rgba(15,23,42,0.20) 42%, rgba(14,165,233,0.45) 78%, rgba(15,23,42,0.86) 100%)',
                    }}
                    aria-hidden="true"
                />
                {/* 左侧蓝绿斜向加强遮罩，提升标题区对比 */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: 'linear-gradient(105deg, rgba(15,23,42,0.55) 0%, rgba(16,185,129,0.16) 48%, rgba(14,165,233,0) 80%)',
                    }}
                    aria-hidden="true"
                />

                {/* 背景装饰：右上柔和光晕 */}
                <div
                    className="absolute -top-24 -right-20 z-0"
                    style={{
                        width: '360px', height: '360px', borderRadius: '9999px',
                        background: 'radial-gradient(circle, rgba(16,185,129,0.30) 0%, rgba(16,185,129,0) 70%)',
                    }}
                    aria-hidden="true"
                />
                {/* 背景装饰：右上十字母题 */}
                <svg
                    className="absolute top-9 right-10 z-10"
                    width="56" height="56" viewBox="0 0 60 60" aria-hidden="true"
                >
                    <rect x="24" y="6" width="12" height="48" rx="4" fill="var(--primary-text,#ffffff)" fillOpacity="0.85" />
                    <rect x="6" y="24" width="48" height="12" rx="4" fill="var(--primary-text,#ffffff)" fillOpacity="0.85" />
                </svg>

                {/* 内容层：整体靠下，标题叠加在遮罩最深处 */}
                <div className="relative z-10 flex h-full flex-col justify-end px-16 pb-14">
                    {/* 顶部品类标签 */}
                    <span
                        className="mb-auto mt-2 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold break-words"
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
                        智慧医疗 · 全程守护
                    </span>

                    {/* 脉搏波形装饰 */}
                    <svg viewBox="0 0 320 36" className="mb-5 h-7 w-48" aria-hidden="true">
                        <path
                            d="M0 18 H72 L86 18 L98 4 L116 32 L132 9 L146 18 H320"
                            fill="none"
                            stroke="var(--secondary-color,#10b981)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeOpacity="0.95"
                        />
                    </svg>

                    {/* 强调短线 */}
                    <div
                        className="mb-5 h-1.5 w-20 rounded-full"
                        style={{ background: "var(--secondary-color,#10b981)" }}
                    />

                    {/* 主标题 */}
                    <h1
                        className="max-w-[60rem] text-6xl font-black leading-[1.25] break-words"
                        style={{
                            color: "var(--primary-text,#ffffff)",
                            textShadow: '0 2px 18px rgba(15,23,42,0.45)',
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    {/* 副标题（可选） */}
                    {subtitle && (
                        <p
                            className="mt-5 max-w-[46rem] text-xl leading-[1.7] break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                opacity: 0.92,
                                textShadow: '0 1px 12px rgba(15,23,42,0.45)',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default FullBleedImage
