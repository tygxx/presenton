import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'medical-cn-quote'
export const layoutName = '客户证言'
export const layoutDescription = '医疗健康风客户证言页：大引号装饰 + 引言金句 + 署名（姓名/头衔/可选头像）。脉搏波形与十字医疗母题、圆角卡片与柔和投影，蓝绿点缀。纯 CSS/SVG 装饰，无头像时用姓名首字圆形徽标，离线可渲染。'

const schema = z.object({
    quote: z.string().min(6).max(60).default('在这里，先进的设备与温暖的关怀同样重要，我们全家都把健康放心托付。').meta({
        description: "客户证言引言金句（中文，简短有温度，建议不超过60字）",
    }),
    authorName: z.string().min(2).max(14).default('林婉清').meta({
        description: "证言人姓名",
    }),
    authorTitle: z.string().min(2).max(20).default('心血管科长期随访患者').meta({
        description: "证言人头衔/身份说明",
    }),
    avatar: ImageSchema.optional().meta({
        description: "证言人头像照片（可选，留空时自动用姓名首字圆形徽标）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Quote: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const quote = slideData?.quote || '在这里，先进的设备与温暖的关怀同样重要，我们全家都把健康放心托付。'
    const authorName = slideData?.authorName || '林婉清'
    const authorTitle = slideData?.authorTitle || '心血管科长期随访患者'
    const avatarUrl = slideData?.avatar?.__image_url__
    const avatarPrompt = slideData?.avatar?.__image_prompt__ || '微笑的患者肖像照片'
    const initial = (authorName || '林').trim().slice(0, 1)

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
                {/* 背景装饰层：柔和蓝绿光晕 + 脉搏波形 + 十字母题 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    {/* 左上柔和蓝色光晕 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-12%', left: '-8%', width: '420px', height: '420px', borderRadius: '9999px',
                            background: "radial-gradient(circle, color-mix(in srgb, var(--primary-color,#0ea5e9) 18%, transparent) 0%, transparent 70%)",
                        }}
                    />
                    {/* 右下柔和绿色光晕 */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '-16%', right: '-6%', width: '480px', height: '480px', borderRadius: '9999px',
                            background: "radial-gradient(circle, color-mix(in srgb, var(--secondary-color,#10b981) 16%, transparent) 0%, transparent 70%)",
                        }}
                    />
                    {/* 底部脉搏波形 */}
                    <svg viewBox="0 0 1280 160" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none" aria-hidden="true">
                        <path
                            d="M0 110 H360 l34 0 22 -64 26 102 24 -120 30 82 22 0 H760 l30 0 20 -40 24 60 22 -78 24 58 20 0 H1280"
                            fill="none"
                            stroke="var(--primary-color,#0ea5e9)"
                            strokeOpacity="0.18"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {/* 右上角十字医疗母题 */}
                    <svg viewBox="0 0 80 80" className="absolute" style={{ top: '40px', right: '44px', width: '60px', height: '60px' }} aria-hidden="true">
                        <rect x="32" y="8" width="16" height="64" rx="5" fill="var(--secondary-color,#10b981)" fillOpacity="0.16" />
                        <rect x="8" y="32" width="64" height="16" rx="5" fill="var(--secondary-color,#10b981)" fillOpacity="0.16" />
                    </svg>
                </div>

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-20 py-16">
                    {/* 大引号装饰 */}
                    <div
                        className="font-black leading-none"
                        style={{ fontSize: '128px', color: "var(--primary-color,#0ea5e9)", opacity: 0.22, height: '64px', lineHeight: '1' }}
                        aria-hidden="true"
                    >
                        “
                    </div>

                    {/* 引言金句 */}
                    <p
                        className="mt-2 max-w-[60rem] text-center text-4xl font-bold leading-[1.6] break-words"
                        style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {quote}
                    </p>

                    {/* 蓝绿渐变分隔条 */}
                    <div
                        className="mt-10 h-1.5 w-24 rounded-full"
                        style={{ background: "linear-gradient(90deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))" }}
                    />

                    {/* 署名卡片 */}
                    <div
                        className="mt-8 flex items-center gap-4 rounded-2xl border px-7 py-4 shadow-sm"
                        style={{
                            background: "var(--card-color,#ffffff)",
                            borderColor: "var(--stroke,#e2e8f0)",
                            boxShadow: "0 12px 30px color-mix(in srgb, var(--primary-color,#0ea5e9) 12%, transparent)",
                        }}
                    >
                        {/* 头像或首字徽标 */}
                        {avatarUrl ? (
                            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
                                <img src={avatarUrl} alt={avatarPrompt} className="h-full w-full object-cover" />
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--primary-color,#0ea5e9) 24%, transparent), color-mix(in srgb, var(--secondary-color,#10b981) 24%, transparent))" }}
                                />
                            </div>
                        ) : (
                            <div
                                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold"
                                style={{
                                    background: "linear-gradient(135deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))",
                                    color: "var(--primary-text,#ffffff)",
                                }}
                            >
                                {initial}
                            </div>
                        )}

                        {/* 姓名 + 头衔 */}
                        <div className="flex flex-col">
                            <span
                                className="text-lg font-bold leading-relaxed break-words"
                                style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {authorName}
                            </span>
                            <span
                                className="text-sm leading-relaxed break-words"
                                style={{ color: "var(--secondary-color,#10b981)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {authorTitle}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Quote
