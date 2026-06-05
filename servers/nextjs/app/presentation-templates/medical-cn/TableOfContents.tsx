import React from 'react'
import * as z from "zod";

export const layoutId = 'medical-cn-toc'
export const layoutName = '目录'
export const layoutDescription = '医疗健康风目录页：左侧大标题 + 脉搏波形与十字装饰，右侧编号分节卡片（自动生成 01/02… 序号）。圆角卡片 + 柔和投影 + 蓝绿点缀，纯 CSS/SVG，无需图片，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(16).default('目录').meta({
        description: "目录页主标题（中文，简短，默认『目录』）",
    }),
    items: z.array(z.object({
        heading: z.string().min(2).max(16).meta({
            description: "分节标题（中文，简短）",
        }),
        desc: z.string().max(28).optional().meta({
            description: "分节简要说明（中文，可选，一行内）",
        }),
    })).min(3).max(6).default([
        { heading: '研究背景与现状', desc: '慢病防控形势与临床痛点' },
        { heading: '诊疗技术方案', desc: '智能辅助诊断与精准治疗' },
        { heading: '临床数据验证', desc: '多中心随机对照试验结果' },
        { heading: '安全与质控体系', desc: '全流程风险监测与管理' },
        { heading: '推广与落地路径', desc: '分级诊疗与基层赋能' },
    ]).meta({
        description: "目录条目列表（3~6 项），编号在组件内自动生成",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const TableOfContents: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '目录'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : [
            { heading: '研究背景与现状', desc: '慢病防控形势与临床痛点' },
            { heading: '诊疗技术方案', desc: '智能辅助诊断与精准治疗' },
            { heading: '临床数据验证', desc: '多中心随机对照试验结果' },
            { heading: '安全与质控体系', desc: '全流程风险监测与管理' },
            { heading: '推广与落地路径', desc: '分级诊疗与基层赋能' },
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
                    background: "var(--background-color,#f8fafc)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：左下脉搏波形 + 右上光晕，柔和不抢内容 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="medTocGlow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="medTocPulse" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.0" />
                            <stop offset="40%" stopColor="var(--primary-color,#0ea5e9)" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="var(--secondary-color,#10b981)" stopOpacity="0.5" />
                        </linearGradient>
                    </defs>
                    {/* 右上柔和光晕 */}
                    <circle cx="1180" cy="-40" r="260" fill="url(#medTocGlow)" />
                    {/* 左下脉搏波形（心电图母题） */}
                    <path
                        d="M-20 612 L150 612 L186 612 L210 560 L236 668 L262 540 L286 612 L470 612 L500 612 L520 584 L540 636 L560 612 L760 612"
                        fill="none"
                        stroke="url(#medTocPulse)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                {/* 左上角十字母题（医疗符号） */}
                <div className="absolute left-16 top-12 z-10" aria-hidden="true">
                    <svg width="34" height="34" viewBox="0 0 34 34">
                        <rect x="13" y="3" width="8" height="28" rx="3" fill="var(--primary-color,#0ea5e9)" opacity="0.9" />
                        <rect x="3" y="13" width="28" height="8" rx="3" fill="var(--secondary-color,#10b981)" opacity="0.9" />
                    </svg>
                </div>

                {/* 内容区：左标题 + 右编号分节卡片 */}
                <div className="relative z-10 flex h-full px-16 py-14 gap-12">
                    {/* 左侧：标题块 */}
                    <div className="flex w-[32%] flex-shrink-0 flex-col justify-center">
                        <span
                            className="mb-4 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium leading-relaxed break-words"
                            style={{
                                color: "var(--primary-color,#0ea5e9)",
                                background: "rgba(14,165,233,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            CONTENTS · 目录
                        </span>
                        <h1
                            className="text-6xl font-black leading-[1.2] break-words"
                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-6 h-1.5 w-20 rounded-full"
                            style={{ background: "linear-gradient(90deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))" }}
                        />
                        <p
                            className="mt-6 max-w-[18rem] text-base leading-relaxed break-words"
                            style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            围绕临床价值与安全可信，逐节展开本次汇报要点。
                        </p>
                    </div>

                    {/* 右侧：编号分节卡片网格 */}
                    <div className="grid flex-1 grid-cols-2 content-center gap-5">
                        {items.map((item, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 rounded-2xl border p-5 shadow-sm break-words"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#e2e8f0)",
                                        boxShadow: "0 8px 24px -12px rgba(14,165,233,0.25)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {/* 编号大字 */}
                                    <span
                                        className="flex-shrink-0 text-4xl font-black leading-none"
                                        style={{
                                            color: "var(--primary-color,#0ea5e9)",
                                        }}
                                    >
                                        {num}
                                    </span>
                                    {/* 竖向分隔条 */}
                                    <span
                                        className="h-9 w-1 flex-shrink-0 rounded-full"
                                        style={{ background: "linear-gradient(180deg, var(--primary-color,#0ea5e9), var(--secondary-color,#10b981))" }}
                                    />
                                    {/* 分节标题 + 说明 */}
                                    <div className="flex min-w-0 flex-col">
                                        <span
                                            className="text-lg font-bold leading-[1.35] break-words"
                                            style={{ color: "var(--background-text,#0f172a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {item?.heading || '分节标题'}
                                        </span>
                                        {item?.desc && (
                                            <span
                                                className="mt-1 text-sm leading-relaxed break-words"
                                                style={{ color: "var(--background-text,#64748b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                            >
                                                {item.desc}
                                            </span>
                                        )}
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

export default TableOfContents
