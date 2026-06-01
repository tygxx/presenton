import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'food-cn-full-bleed-image'
export const layoutName = '全幅大图'
export const layoutDescription = '美食餐饮全幅大图版式：满铺诱人菜品大图 + 暖色深色渐变遮罩保证文字可读，左下叠加大标题与副标题，配焦糖金圆盘描边与餐具点缀装饰。'

const schema = z.object({
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "热气腾腾的精致中式菜肴特写，暖色灯光，俯拍圆盘构图，食欲诱人",
    }).meta({
        description: "满幅背景大图，建议使用诱人的菜品/餐桌实拍照片",
    }),
    title: z.string().min(2).max(20).default('舌尖上的烟火气').meta({
        description: "叠加在大图上的主标题（中文，简短有食欲）",
    }),
    subtitle: z.string().max(40).default('每一道菜，都是一次用心的味觉旅行').meta({
        description: "副标题，一句话补充说明（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FullBleedImage: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = slideData?.image?.__image_prompt__ || "热气腾腾的精致中式菜肴特写，暖色灯光，俯拍圆盘构图，食欲诱人"
    const title = slideData?.title || '舌尖上的烟火气'
    const subtitle = slideData?.subtitle || '每一道菜，都是一次用心的味觉旅行'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#fdf6ec)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 满铺背景大图 */}
                <img
                    src={imageUrl}
                    alt={imagePrompt}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* 暖色深色渐变遮罩：左下加重，保证文字可读 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(105deg, rgba(59,36,18,0.82) 0%, rgba(59,36,18,0.46) 42%, rgba(59,36,18,0.08) 70%, rgba(201,42,42,0.0) 100%)",
                    }}
                    aria-hidden="true"
                />
                {/* 底部食欲橙红压暗，托住标题 */}
                <div
                    className="absolute inset-x-0 bottom-0 h-[62%]"
                    style={{
                        background:
                            "linear-gradient(0deg, rgba(59,36,18,0.78) 0%, rgba(201,42,42,0.18) 45%, rgba(59,36,18,0) 100%)",
                    }}
                    aria-hidden="true"
                />

                {/* 右上：焦糖金圆盘构图装饰（同心圆 + 餐具点缀） */}
                <svg
                    viewBox="0 0 360 360"
                    className="absolute -right-16 -top-16 h-[360px] w-[360px]"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="foodFbGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.30" />
                            <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <circle cx="240" cy="120" r="160" fill="url(#foodFbGlow)" />
                    {[0, 1, 2].map((i) => (
                        <circle
                            key={i}
                            cx="240"
                            cy="120"
                            r={60 + i * 36}
                            fill="none"
                            stroke="#f0c46a"
                            strokeOpacity={0.55 - i * 0.13}
                            strokeWidth="2"
                        />
                    ))}
                    {/* 圆盘内侧虚线，呼应餐盘描边 */}
                    <circle
                        cx="240"
                        cy="120"
                        r="46"
                        fill="none"
                        stroke="#f0c46a"
                        strokeOpacity="0.7"
                        strokeWidth="1.5"
                        strokeDasharray="3 6"
                    />
                </svg>

                {/* 左上：餐具点缀（叉与勺剪影） */}
                <svg
                    viewBox="0 0 80 80"
                    className="absolute left-12 top-10 h-12 w-12"
                    aria-hidden="true"
                >
                    {/* 叉 */}
                    <g stroke="#f0c46a" strokeOpacity="0.85" strokeWidth="3" strokeLinecap="round" fill="none">
                        <line x1="22" y1="10" x2="22" y2="30" />
                        <line x1="30" y1="10" x2="30" y2="30" />
                        <line x1="38" y1="10" x2="38" y2="30" />
                        <line x1="30" y1="30" x2="30" y2="70" />
                        {/* 勺 */}
                        <ellipse cx="58" cy="22" rx="9" ry="13" />
                        <line x1="58" y1="35" x2="58" y2="70" />
                    </g>
                </svg>

                {/* 顶部标签：餐厅/栏目标识 */}
                <div className="absolute left-12 top-24 z-10">
                    <span
                        className="inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-semibold break-words"
                        style={{
                            color: "var(--primary-text,#ffffff)",
                            background: "rgba(232,89,12,0.55)",
                            border: "1px solid rgba(240,196,106,0.7)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        精选美味 · 当季新品
                    </span>
                </div>

                {/* 左下：标题与副标题叠加 */}
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col px-16 pb-14">
                    {/* 焦糖金短描边 */}
                    <div
                        className="mb-5 h-1.5 w-20 rounded-full"
                        style={{ background: "#f0c46a" }}
                    />
                    <h1
                        className="max-w-[42rem] text-6xl font-black leading-[1.2] break-words"
                        style={{
                            color: "var(--primary-text,#ffffff)",
                            textShadow: "0 2px 18px rgba(59,36,18,0.55)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>
                    {subtitle ? (
                        <p
                            className="mt-5 max-w-[40rem] text-xl leading-relaxed break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                opacity: 0.92,
                                textShadow: "0 1px 12px rgba(59,36,18,0.5)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {subtitle}
                        </p>
                    ) : null}

                    {/* 暖色圆点装饰，呼应圆盘母题 */}
                    <div className="mt-7 flex items-center gap-2.5" aria-hidden="true">
                        <span
                            className="h-3 w-3 rounded-full"
                            style={{ background: "var(--secondary-color,#c92a2a)" }}
                        />
                        <span
                            className="h-3 w-3 rounded-full"
                            style={{ background: "var(--primary-color,#e8590c)" }}
                        />
                        <span
                            className="h-3 w-3 rounded-full"
                            style={{ background: "#f0c46a" }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FullBleedImage
