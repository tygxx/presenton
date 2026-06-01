import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'education-cn-four-features'
export const layoutName = '四宫格特性'
export const layoutDescription = '教育培训风四宫格：明亮米白背景 + 圆角卡片 2x2 网格，每格图标、小标题与说明。书本/灯泡/成长曲线/圆点装饰，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('我们的教学优势').meta({
        description: "页面主标题（中文，简短有力，概括四项特性）",
    }),
    features: z.array(z.object({
        icon: IconSchema.meta({ description: "特性图标，建议用 phosphor 图标名" }),
        title: z.string().min(2).max(12).meta({ description: "特性小标题（中文，简短）" }),
        desc: z.string().min(4).max(32).meta({ description: "特性说明（一句话，中文）" }),
    })).min(4).max(4).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/graduation-cap-bold.svg',
                __icon_query__: 'graduation cap',
            },
            title: '名师领航',
            desc: '一线资深教师授课，经验沉淀直达要点',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightbulb-bold.svg',
                __icon_query__: 'lightbulb',
            },
            title: '兴趣启发',
            desc: '情景化互动课堂，让孩子爱上主动思考',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-up-bold.svg',
                __icon_query__: 'growth chart',
            },
            title: '成长可见',
            desc: '阶段测评与成长曲线，进步看得见摸得着',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'small class',
            },
            title: '小班陪伴',
            desc: '小班精细化辅导，每个孩子都被看见',
        },
    ]).meta({ description: "四项教学特性，固定四张卡片" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FALLBACK: SlideData = schema.parse({})

const FourFeatures: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || FALLBACK.title
    const features = (slideData?.features && slideData.features.length > 0)
        ? slideData.features
        : FALLBACK.features

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#fffdf7)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：圆点纹样 + 灯泡/书本光晕（仅装饰，绝对定位） */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    {/* 左上角蓝色光晕 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-140px', left: '-120px', width: '360px', height: '360px', borderRadius: '9999px',
                            background: "radial-gradient(circle, var(--primary-color,#2563eb) 0%, rgba(37,99,235,0) 70%)",
                            opacity: 0.10,
                        }}
                    />
                    {/* 右下角橙色光晕 */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '-160px', right: '-120px', width: '380px', height: '380px', borderRadius: '9999px',
                            background: "radial-gradient(circle, var(--secondary-color,#f97316) 0%, rgba(249,115,22,0) 70%)",
                            opacity: 0.12,
                        }}
                    />
                    {/* 圆点装饰矩阵（右上） */}
                    <svg
                        viewBox="0 0 120 80"
                        className="absolute"
                        style={{ top: '36px', right: '40px', width: '120px', height: '80px', opacity: 0.5 }}
                    >
                        {[0, 1, 2, 3, 4].map((row) =>
                            [0, 1, 2, 3, 4, 5].map((col) => (
                                <circle
                                    key={`${row}-${col}`}
                                    cx={6 + col * 22}
                                    cy={6 + row * 17}
                                    r="2.6"
                                    fill="var(--secondary-color,#f97316)"
                                    opacity={0.45}
                                />
                            ))
                        )}
                    </svg>
                    {/* 成长曲线母题（左下，轻描淡写） */}
                    <svg
                        viewBox="0 0 240 120"
                        className="absolute"
                        style={{ bottom: '20px', left: '28px', width: '240px', height: '120px', opacity: 0.18 }}
                    >
                        <path
                            d="M0 110 C 50 100, 70 60, 110 55 S 180 30, 238 10"
                            fill="none"
                            stroke="var(--primary-color,#2563eb)"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <circle cx="238" cy="10" r="5" fill="var(--secondary-color,#f97316)" />
                    </svg>
                </div>

                {/* 主内容：标题 + 2x2 卡片网格 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-col items-center mb-8">
                        <span
                            className="mb-3 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--secondary-color,#f97316)",
                                background: "rgba(249,115,22,0.12)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            教学特色
                        </span>
                        <h1
                            className="text-center text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-4 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />
                    </div>

                    {/* 2x2 网格 */}
                    <div className="grid grid-cols-2 gap-6">
                        {features.slice(0, 4).map((f, i) => {
                            const accent = i % 2 === 0
                                ? "var(--primary-color,#2563eb)"
                                : "var(--secondary-color,#f97316)"
                            return (
                                <div
                                    key={i}
                                    className="flex items-start gap-5 rounded-2xl border p-6 shadow-sm"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#f1e9d8)",
                                    }}
                                >
                                    {/* 圆角图标徽章 */}
                                    <div
                                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
                                        style={{
                                            background: accent,
                                            boxShadow: `0 8px 18px -8px ${accent}`,
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={f?.icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-7 h-7"
                                            title={f?.icon?.__icon_query__ || f?.title}
                                        />
                                    </div>
                                    {/* 文案 */}
                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <h3
                                            className="text-xl font-bold leading-[1.3] break-words"
                                            style={{ color: "var(--background-text,#1f2937)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {f?.title || '教学特色'}
                                        </h3>
                                        <p
                                            className="mt-2 text-base leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#1f2937)", opacity: 0.72, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {f?.desc || '用心打磨每一节课，陪伴孩子稳步成长'}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FourFeatures
