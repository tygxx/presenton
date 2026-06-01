import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'retail-cn-full-bleed-image'
export const layoutName = '全幅大图'
export const layoutDescription = '电商新零售风全幅大图版式：满铺大图 + 深色潮流渐变遮罩 + 撞色价签角标与大标题叠加。年轻活力、强对比、有冲击力，文字始终清晰可读。'

const schema = z.object({
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "时尚潮流的电商新零售购物场景大图，明亮活力，年轻人逛街购物",
    }).meta({
        description: "满铺背景大图，建议使用具冲击力的潮流购物/商品场景照片",
    }),
    badge: z.string().min(1).max(10).default('限时大促').meta({
        description: "左上角价签标签，潮流短词，如『限时大促』『新品首发』",
    }),
    title: z.string().min(2).max(20).default('全场焕新 潮购不停').meta({
        description: "叠加在大图上的主标题（中文，简短有力，≤20字）",
    }),
    subtitle: z.string().min(2).max(40).default('万款好物上新，下单立享会员专属折扣与免邮特权').meta({
        description: "副标题，一句话补充说明（可选，≤40字）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FullBleedImage: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = slideData?.image?.__image_prompt__ || "时尚潮流的电商新零售购物场景大图，明亮活力，年轻人逛街购物"
    const badge = slideData?.badge || '限时大促'
    const title = slideData?.title || '全场焕新 潮购不停'
    const subtitle = slideData?.subtitle || '万款好物上新，下单立享会员专属折扣与免邮特权'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 满铺大图 */}
                <img
                    src={imageUrl}
                    alt={imagePrompt}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* 深色潮流渐变遮罩：保证文字可读 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(105deg, rgba(15,15,18,0.82) 0%, rgba(15,15,18,0.55) 42%, rgba(15,15,18,0.18) 70%, rgba(15,15,18,0.05) 100%)",
                    }}
                    aria-hidden="true"
                />
                {/* 主题色撞色光晕叠加 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(215deg, color-mix(in srgb, var(--secondary-color,#f59e0b) 32%, transparent) 0%, transparent 38%), radial-gradient(circle at 8% 88%, color-mix(in srgb, var(--primary-color,#db2777) 38%, transparent) 0%, transparent 46%)",
                    }}
                    aria-hidden="true"
                />

                {/* 右下角活力几何形装饰 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                    <circle cx="1140" cy="560" r="120" fill="none" stroke="var(--secondary-color,#f59e0b)" strokeOpacity="0.45" strokeWidth="3" />
                    <circle cx="1140" cy="560" r="170" fill="none" stroke="var(--primary-color,#db2777)" strokeOpacity="0.30" strokeWidth="3" />
                    <rect x="1075" y="495" width="40" height="40" rx="8" fill="var(--secondary-color,#f59e0b)" fillOpacity="0.55" transform="rotate(18 1095 515)" />
                </svg>

                {/* 顶部价签角标 */}
                <div className="absolute top-0 left-0 z-10 flex items-center gap-3 px-14 pt-12">
                    <span
                        className="inline-flex w-fit items-center rounded-md px-4 py-2 text-base font-black break-words"
                        style={{
                            background: "var(--primary-color,#db2777)",
                            color: "var(--primary-text,#ffffff)",
                            boxShadow: "0 10px 28px -8px color-mix(in srgb, var(--primary-color,#db2777) 65%, transparent)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {badge}
                    </span>
                    <span
                        className="inline-flex h-3 w-3 rounded-full"
                        style={{ background: "var(--secondary-color,#f59e0b)" }}
                    />
                </div>

                {/* 左下主内容区：标题 + 副标题叠加 */}
                <div className="relative z-10 flex h-full w-[72%] flex-col justify-end px-14 pb-16">
                    {/* 撞色短色块 */}
                    <div className="mb-6 flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                        <div className="h-2 w-7 rounded-full" style={{ background: "var(--primary-color,#db2777)" }} />
                        <div className="h-2 w-3 rounded-full" style={{ background: "var(--primary-text,#ffffff)", opacity: 0.7 }} />
                    </div>

                    <h1
                        className="text-7xl font-black leading-[1.2] break-words"
                        style={{
                            color: "var(--primary-text,#ffffff)",
                            textShadow: "0 6px 30px rgba(15,15,18,0.55)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    {subtitle && (
                        <p
                            className="mt-6 max-w-[42rem] text-xl leading-relaxed break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                opacity: 0.92,
                                textShadow: "0 3px 18px rgba(15,15,18,0.5)",
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
