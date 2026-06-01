import React from 'react'
import * as z from "zod";

export const layoutId = 'gov-cn-timeline'
export const layoutName = '时间线'
export const layoutDescription = '党政政务风横向里程碑时间线：米白底 + 中国红 + 烫金细线，居中对称标题，横向轴线串联五角星节点，节点上方时间、标题与说明分布。纯 CSS/SVG 装饰（华表竖线、烫金光晕、五角星点缀），离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('发展历程里程碑').meta({
        description: "时间线页主标题（中文，庄重简短，建议不超过12个汉字）",
    }),
    milestones: z.array(z.object({
        time: z.string().min(1).max(10).meta({
            description: "时间节点（如年份、季度、月份），简短",
        }),
        title: z.string().min(2).max(14).meta({
            description: "节点标题（中文，简短，建议不超过8个汉字）",
        }),
        desc: z.string().min(4).max(36).meta({
            description: "节点说明（一句话描述该阶段的成果或部署）",
        }),
    })).min(3).max(5).default([
        { time: '2021年', title: '谋篇布局', desc: '锚定目标定位，编制中长期规划，绘就发展蓝图。' },
        { time: '2022年', title: '攻坚突破', desc: '聚焦重点领域，破解发展瓶颈，夯实工作根基。' },
        { time: '2023年', title: '提质增效', desc: '深化改革创新，优化营商环境，激发内生动力。' },
        { time: '2024年', title: '行稳致远', desc: '统筹安全发展，巩固成果质效，迈上新的台阶。' },
        { time: '2025年', title: '开创新局', desc: '凝心聚力实干，奋力谱写高质量发展崭新篇章。' },
    ]).meta({ description: "里程碑节点，3至5项，按时间先后排列" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const STAR_PATH =
    'M12 2l2.9 6.26L21.8 9.2l-5 4.62L18.1 21 12 17.4 5.9 21l1.3-7.18-5-4.62 6.9-0.94L12 2z'

const Timeline: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '发展历程里程碑'
    const milestones = (slideData?.milestones && slideData.milestones.length > 0)
        ? slideData.milestones.slice(0, 5)
        : [
            { time: '2021年', title: '谋篇布局', desc: '锚定目标定位，编制中长期规划，绘就发展蓝图。' },
            { time: '2022年', title: '攻坚突破', desc: '聚焦重点领域，破解发展瓶颈，夯实工作根基。' },
            { time: '2023年', title: '提质增效', desc: '深化改革创新，优化营商环境，激发内生动力。' },
            { time: '2024年', title: '行稳致远', desc: '统筹安全发展，巩固成果质效，迈上新的台阶。' },
            { time: '2025年', title: '开创新局', desc: '凝心聚力实干，奋力谱写高质量发展崭新篇章。' },
        ]

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
                {/* 背景对称装饰层：顶部红带 + 烫金光晕 + 华表竖线 + 五角星点缀 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="govTlRedTop" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#c1121f)" stopOpacity="1" />
                                <stop offset="100%" stopColor="var(--primary-color,#c1121f)" stopOpacity="0.78" />
                            </linearGradient>
                            <radialGradient id="govTlGlow" cx="50%" cy="50%" r="60%">
                                <stop offset="0%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="govTlGold" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                                <stop offset="50%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* 顶部中国红色带 */}
                        <rect x="0" y="0" width="1280" height="14" fill="url(#govTlRedTop)" />
                        {/* 中部居中烫金光晕 */}
                        <rect x="0" y="0" width="1280" height="720" fill="url(#govTlGlow)" />
                        {/* 左右对称竖向烫金细线（华表立柱意象） */}
                        <line x1="64" y1="44" x2="64" y2="676" stroke="url(#govTlGold)" strokeWidth="2" />
                        <line x1="1216" y1="44" x2="1216" y2="676" stroke="url(#govTlGold)" strokeWidth="2" />
                        {/* 底部对称纹样横线 */}
                        <line x1="64" y1="668" x2="1216" y2="668" stroke="var(--secondary-color,#b8860b)" strokeOpacity="0.18" strokeWidth="1" />
                    </svg>
                    {/* 四角烫金细线角标（对称） */}
                    <div className="absolute left-6 top-9 h-9 w-9 border-l-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.6 }} />
                    <div className="absolute right-6 top-9 h-9 w-9 border-r-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.6 }} />
                    <div className="absolute bottom-8 left-6 h-9 w-9 border-b-2 border-l-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.6 }} />
                    <div className="absolute bottom-8 right-6 h-9 w-9 border-b-2 border-r-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.6 }} />
                </div>

                {/* 内容主体 */}
                <div className="relative z-10 flex h-full w-full flex-col justify-center px-16 pt-12 pb-10">
                    {/* 居中对称标题区 */}
                    <div className="flex w-full flex-shrink-0 flex-col items-center">
                        {/* 标题上方对称烫金细线 + 五角星 */}
                        <div className="mb-4 flex items-center gap-3">
                            <span className="block h-px w-16" style={{ background: "var(--secondary-color,#b8860b)" }} />
                            <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }} fill="var(--primary-color,#c1121f)">
                                <path d={STAR_PATH} />
                            </svg>
                            <span className="block h-px w-16" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        </div>
                        <h1
                            className="text-center text-5xl font-black leading-[1.3] break-words"
                            style={{
                                color: "var(--background-text,#1a1a1a)",
                                letterSpacing: '0.04em',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        {/* 标题下方对称双色短线 */}
                        <div className="mt-5 flex items-center gap-2">
                            <span className="block h-1 w-10 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} />
                            <span className="block h-1 w-20 rounded-full" style={{ background: "var(--primary-color,#c1121f)" }} />
                            <span className="block h-1 w-10 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        </div>
                    </div>

                    {/* 横向时间线 */}
                    <div className="relative mt-12 flex w-full items-stretch">
                        {/* 贯穿全宽的烫金轴线（位于节点圆心高度） */}
                        <div
                            className="absolute left-0 right-0"
                            style={{
                                top: '92px',
                                height: '3px',
                                background: "linear-gradient(90deg, transparent, var(--secondary-color,#b8860b) 8%, var(--secondary-color,#b8860b) 92%, transparent)",
                                opacity: 0.55,
                            }}
                            aria-hidden="true"
                        />
                        {milestones.map((m, i) => (
                            <div key={i} className="relative z-10 flex flex-1 flex-col items-center px-2">
                                {/* 时间标签 */}
                                <span
                                    className="mb-4 inline-flex items-center rounded-sm px-3 py-1 text-base font-bold leading-relaxed break-words"
                                    style={{
                                        color: "var(--primary-text,#ffffff)",
                                        background: "var(--primary-color,#c1121f)",
                                        letterSpacing: '0.08em',
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {m?.time}
                                </span>

                                {/* 五角星节点（坐落于轴线上） */}
                                <div
                                    className="flex items-center justify-center rounded-full"
                                    style={{
                                        width: '46px', height: '46px',
                                        background: "var(--card-color,#ffffff)",
                                        boxShadow: '0 0 0 4px rgba(184,134,11,0.25), 0 6px 16px rgba(193,18,31,0.12)',
                                    }}
                                >
                                    <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }} fill="var(--primary-color,#c1121f)">
                                        <path d={STAR_PATH} />
                                    </svg>
                                </div>

                                {/* 连接节点与卡片的短竖线 */}
                                <span
                                    className="my-3 block w-px"
                                    style={{ height: '20px', background: "var(--secondary-color,#b8860b)", opacity: 0.5 }}
                                    aria-hidden="true"
                                />

                                {/* 说明卡片 */}
                                <div
                                    className="flex w-full flex-col items-center rounded-xl border px-4 py-5 text-center"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#e8dcc8)",
                                        boxShadow: '0 8px 24px rgba(193,18,31,0.06)',
                                    }}
                                >
                                    <h3
                                        className="text-xl font-black leading-[1.35] break-words"
                                        style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m?.title}
                                    </h3>
                                    <span className="my-3 block h-px w-10" style={{ background: "var(--stroke,#e8dcc8)" }} aria-hidden="true" />
                                    <p
                                        className="text-sm leading-[1.7] break-words"
                                        style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {m?.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Timeline
