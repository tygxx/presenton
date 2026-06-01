import React from 'react'
import * as z from "zod";

export const layoutId = 'gov-cn-big-statement'
export const layoutName = '金句首屏'
export const layoutDescription = '党政政务风金句首屏：米白底配中国红与烫金细线，居中对称的超大字号主张，辅以华表纹样、烫金引号与五角星点缀。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    statement: z.string().min(2).max(40).default('实干兴邦  以高质量发展开创新局').meta({
        description: "占据画面的核心主张（一句有力的话，超大字号，建议不超过24个汉字）",
    }),
    support: z.string().min(2).max(50).default('坚持人民至上，凝心聚力推动各项事业稳步前进，把蓝图绘到底。').meta({
        description: "主张下方的支撑说明（可选，一句话补充阐述）",
    }),
    attribution: z.string().min(2).max(20).default('— 二〇二六年工作部署会议').meta({
        description: "出处或落款（可选，如会议名称、引文来源）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BigStatement: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const statement = slideData?.statement || '实干兴邦  以高质量发展开创新局'
    const support = slideData?.support || '坚持人民至上，凝心聚力推动各项事业稳步前进，把蓝图绘到底。'
    const attribution = slideData?.attribution || '— 二〇二六年工作部署会议'

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
                {/* 背景装饰层：对称纹样 + 烫金光晕 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="govStmtHalo" cx="50%" cy="38%" r="55%">
                                <stop offset="0%" stopColor="var(--primary-color,#c1121f)" stopOpacity="0.06" />
                                <stop offset="100%" stopColor="var(--primary-color,#c1121f)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 中心柔和红色光晕 */}
                        <rect width="1280" height="720" fill="url(#govStmtHalo)" />
                        {/* 对称同心圆纹样（左右各一组，呼应华表纹样） */}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={`l${i}`} cx="120" cy="360" r={60 + i * 56} fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity={0.07} strokeWidth="1.2" />
                        ))}
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={`r${i}`} cx="1160" cy="360" r={60 + i * 56} fill="none" stroke="var(--secondary-color,#b8860b)" strokeOpacity={0.07} strokeWidth="1.2" />
                        ))}
                    </svg>

                    {/* 四角烫金对称角标 */}
                    <div className="absolute left-8 top-8 h-12 w-12 border-l-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.7 }} />
                    <div className="absolute right-8 top-8 h-12 w-12 border-r-2 border-t-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.7 }} />
                    <div className="absolute bottom-8 left-8 h-12 w-12 border-b-2 border-l-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.7 }} />
                    <div className="absolute bottom-8 right-8 h-12 w-12 border-b-2 border-r-2" style={{ borderColor: "var(--secondary-color,#b8860b)", opacity: 0.7 }} />

                    {/* 顶部中国红窄条 */}
                    <div className="absolute left-0 right-0 top-0 h-2" style={{ background: "var(--primary-color,#c1121f)" }} />
                </div>

                {/* 主内容：居中对称 */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-24 py-16 text-center">
                    {/* 顶部五角星 + 烫金细线 */}
                    <div className="mb-8 flex items-center justify-center gap-4">
                        <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, var(--secondary-color,#b8860b))" }} />
                        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                            <path
                                d="M12 2l2.94 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21.02 7 14.14l-5-4.87 7.06-1.01L12 2z"
                                fill="var(--primary-color,#c1121f)"
                            />
                        </svg>
                        <div className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, var(--secondary-color,#b8860b))" }} />
                    </div>

                    {/* 烫金开引号 */}
                    <div
                        className="leading-none"
                        style={{ color: "var(--secondary-color,#b8860b)", fontSize: '88px', opacity: 0.55, marginBottom: '-12px' }}
                        aria-hidden="true"
                    >
                        “
                    </div>

                    {/* 超大字重主张 */}
                    <h1
                        className="max-w-[60rem] text-6xl font-black leading-[1.25] break-words"
                        style={{ color: "var(--primary-color,#c1121f)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {statement}
                    </h1>

                    {/* 烫金细线分隔 */}
                    <div
                        className="my-7 h-[2px] w-40"
                        style={{ background: "linear-gradient(to right, transparent, var(--secondary-color,#b8860b), transparent)" }}
                        aria-hidden="true"
                    />

                    {/* 支撑说明 */}
                    {support && (
                        <p
                            className="max-w-[44rem] text-xl leading-loose break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {support}
                        </p>
                    )}

                    {/* 出处落款 */}
                    {attribution && (
                        <div
                            className="mt-10 inline-flex items-center rounded-full px-6 py-2 text-base font-medium leading-relaxed break-words"
                            style={{
                                color: "var(--secondary-color,#b8860b)",
                                background: "var(--card-color,#ffffff)",
                                border: "1px solid var(--stroke,#e8dcc8)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {attribution}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default BigStatement
