import React from 'react'
import * as z from "zod";

export const layoutId = 'culture-cn-big-statement'
export const layoutName = '金句首屏'
export const layoutDescription = '国潮文创金句首屏：宣纸米黄底配朱砂红印章与描金线条，超大字重主张一句占据画面，墨黑引号点缀，可附支撑句与署名。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    statement: z.string().min(2).max(40).default('守艺人之心，传东方之美').meta({
        description: "金句主张，超大字号占据画面（中文，简短有力，建议不超过 24 字）",
    }),
    support: z.string().min(2).max(50).default('以当代设计语言重述千年纹样，让传统在日常里生长。').meta({
        description: "支撑句，一句话补充说明主张（可选）",
    }),
    attribution: z.string().min(2).max(20).default('——「拾遗」品牌主理人 沈砚秋').meta({
        description: "署名/出处（可选），如人物姓名或品牌",
    }),
    seal: z.string().min(1).max(4).default('拾遗').meta({
        description: "右上角印章红块内的文字（1-2 字最佳，竖排篆意）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const BigStatement: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const statement = slideData?.statement || '守艺人之心，传东方之美'
    const support = slideData?.support || '以当代设计语言重述千年纹样，让传统在日常里生长。'
    const attribution = slideData?.attribution || '——「拾遗」品牌主理人 沈砚秋'
    const seal = (slideData?.seal || '拾遗').trim().slice(0, 4)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f5ecd9)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：宣纸纹理光晕 + 水墨笔触 + 传统回纹 + 描金边 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="cultureBSPaper" cx="28%" cy="24%" r="85%">
                                <stop offset="0%" stopColor="#fbf5e9" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#f5ecd9" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="cultureBSInk" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* 宣纸暖光 */}
                        <rect width="1280" height="720" fill="url(#cultureBSPaper)" />
                        {/* 左下水墨笔触晕染 */}
                        <ellipse cx="120" cy="640" rx="280" ry="150" fill="url(#cultureBSInk)" />
                        {/* 右侧水墨枯笔斜扫 */}
                        <path d="M1080 -40 C 1140 160 1120 360 1180 560 C 1200 640 1160 720 1240 760" fill="none" stroke="#1a1a1a" strokeOpacity="0.06" strokeWidth="46" strokeLinecap="round" />
                        {/* 传统回纹角饰（左上） */}
                        <g stroke="var(--primary-color,#c0392b)" strokeOpacity="0.22" strokeWidth="2.5" fill="none">
                            <path d="M64 96 H120 V152 H92 V124 H106" />
                            <path d="M64 176 H96 V148" />
                        </g>
                    </svg>

                    {/* 描金细边框 */}
                    <div
                        className="absolute inset-6 rounded-sm"
                        style={{ border: '1px solid var(--stroke,#ddd0b4)' }}
                    />
                    <div
                        className="absolute inset-7 rounded-sm"
                        style={{ border: '1px solid', borderColor: 'rgba(192,57,43,0.18)' }}
                    />
                </div>

                {/* 右上角印章红块（竖排篆意） */}
                <div className="absolute top-10 right-12 z-10">
                    <div
                        className="flex flex-col items-center justify-center rounded-[4px] px-3 py-3 break-words"
                        style={{
                            background: "var(--primary-color,#c0392b)",
                            color: "var(--primary-text,#ffffff)",
                            boxShadow: '0 6px 20px rgba(192,57,43,0.28)',
                            writingMode: 'vertical-rl',
                            letterSpacing: '0.12em',
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <span className="text-xl font-black leading-[1.35]">{seal}</span>
                    </div>
                </div>

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full flex-col justify-center px-24 py-16">
                    {/* 开引号（墨黑装饰） */}
                    <span
                        className="select-none font-black leading-none"
                        style={{
                            color: "var(--secondary-color,#1a1a1a)",
                            opacity: 0.16,
                            fontSize: '120px',
                            fontFamily: "Georgia, 'Times New Roman', serif",
                        }}
                        aria-hidden="true"
                    >
                        “
                    </span>

                    {/* 金句主张 */}
                    <h1
                        className="-mt-6 max-w-[60rem] text-7xl font-black leading-[1.25] break-words"
                        style={{
                            color: "var(--background-text,#2b2b2b)",
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {statement}
                    </h1>

                    {/* 朱砂红描金分隔线 */}
                    <div className="mt-8 flex items-center gap-3">
                        <span
                            className="h-2.5 w-2.5 flex-shrink-0 rotate-45 rounded-[2px]"
                            style={{ background: "var(--primary-color,#c0392b)" }}
                        />
                        <span
                            className="h-[3px] w-32 rounded-full"
                            style={{ background: "var(--primary-color,#c0392b)" }}
                        />
                        <span
                            className="h-[2px] w-16 rounded-full"
                            style={{ background: "var(--stroke,#ddd0b4)" }}
                        />
                    </div>

                    {/* 支撑句 */}
                    {support && (
                        <p
                            className="mt-7 max-w-[44rem] text-2xl leading-loose break-words"
                            style={{
                                color: "var(--background-text,#2b2b2b)",
                                opacity: 0.82,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {support}
                        </p>
                    )}

                    {/* 署名 */}
                    {attribution && (
                        <p
                            className="mt-8 text-lg font-medium leading-relaxed break-words"
                            style={{
                                color: "var(--primary-color,#c0392b)",
                                letterSpacing: '0.04em',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {attribution}
                        </p>
                    )}
                </div>

                {/* 左下角印章红点装饰 */}
                <div
                    className="absolute bottom-12 left-24 z-10 h-3 w-3 rounded-[2px]"
                    style={{ background: "var(--primary-color,#c0392b)", boxShadow: '0 0 0 5px rgba(192,57,43,0.12)' }}
                    aria-hidden="true"
                />
            </div>
        </>
    )
}

export default BigStatement
