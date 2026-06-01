import React from 'react'
import * as z from "zod";

export const layoutId = 'realestate-cn-roadmap'
export const layoutName = '路线图'
export const layoutDescription = '房产建筑风路线图：高级灰底 + 金铜点缀，阶段卡横向排列，细线分隔与建筑剪影装饰。用于分阶段开发/交付计划，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('项目开发路线图').meta({
        description: "路线图主标题（中文，简短克制）",
    }),
    phases: z.array(z.object({
        phase: z.string().min(2).max(10).meta({
            description: "阶段序号/标签，如『第一阶段』",
        }),
        title: z.string().min(2).max(16).meta({
            description: "阶段名称，如『土地获取』",
        }),
        items: z.array(z.string().min(2).max(24).meta({
            description: "该阶段的关键事项（一句话）",
        })).min(1).max(3).meta({
            description: "阶段关键事项列表",
        }),
    })).min(3).max(4).default([
        {
            phase: '第一阶段',
            title: '土地获取',
            items: ['完成地块摘牌与确权', '编制总体规划方案', '取得开发立项批复'],
        },
        {
            phase: '第二阶段',
            title: '设计报建',
            items: ['完成建筑施工图设计', '通过规划及消防审查', '办理施工许可证'],
        },
        {
            phase: '第三阶段',
            title: '工程建造',
            items: ['主体结构封顶', '机电安装与精装施工', '园林景观同步推进'],
        },
        {
            phase: '第四阶段',
            title: '交付运营',
            items: ['竣工验收备案', '业主集中交付入住', '社区物业平稳运营'],
        },
    ]).meta({
        description: "分阶段计划，横向排列（3至4个阶段）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Roadmap: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '项目开发路线图'
    const phases = slideData?.phases || []

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f4f4f5)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景：建筑剪影 + 极简线条装饰层 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="reRoadSky" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#reRoadSky)" />
                    {/* 底部建筑剪影 */}
                    <g fill="var(--secondary-color,#3f3f46)" fillOpacity="0.05">
                        <rect x="70" y="560" width="86" height="160" />
                        <rect x="172" y="500" width="64" height="220" />
                        <rect x="252" y="588" width="52" height="132" />
                        <rect x="980" y="540" width="72" height="180" />
                        <rect x="1068" y="486" width="58" height="234" />
                        <rect x="1142" y="572" width="78" height="148" />
                        <rect x="1232" y="528" width="40" height="192" />
                    </g>
                    {/* 建筑剪影细窗格线 */}
                    <g stroke="var(--background-color,#f4f4f5)" strokeOpacity="0.7" strokeWidth="1">
                        <line x1="172" y1="540" x2="236" y2="540" />
                        <line x1="172" y1="580" x2="236" y2="580" />
                        <line x1="172" y1="620" x2="236" y2="620" />
                        <line x1="1068" y1="528" x2="1126" y2="528" />
                        <line x1="1068" y1="572" x2="1126" y2="572" />
                        <line x1="1068" y1="616" x2="1126" y2="616" />
                    </g>
                    {/* 右上角极简线条母题 */}
                    <line x1="1180" y1="48" x2="1232" y2="48" stroke="var(--primary-color,#b08d57)" strokeOpacity="0.5" strokeWidth="1.5" />
                    <line x1="1180" y1="60" x2="1208" y2="60" stroke="var(--primary-color,#b08d57)" strokeOpacity="0.3" strokeWidth="1.5" />
                </svg>

                {/* 内容层：超大留白 + 细线分隔 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 顶部：标签 + 标题 */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <span
                                className="h-px w-10"
                                style={{ background: "var(--primary-color,#b08d57)" }}
                            />
                            <span
                                className="text-xs font-medium uppercase break-words"
                                style={{
                                    color: "var(--primary-color,#b08d57)",
                                    letterSpacing: '0.18em',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                ROADMAP
                            </span>
                        </div>
                        <h1
                            className="mt-4 text-4xl font-light leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#27272a)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                    </div>

                    {/* 细分割线 */}
                    <div
                        className="mt-7 h-px w-full flex-shrink-0"
                        style={{ background: "var(--stroke,#e4e4e7)" }}
                    />

                    {/* 阶段卡：横向排列 */}
                    <div className="mt-9 flex flex-1 items-stretch gap-6">
                        {phases.map((p, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            const isLast = i === phases.length - 1
                            return (
                                <div key={i} className="flex flex-1 items-stretch">
                                    <div
                                        className="flex flex-1 flex-col rounded-sm px-6 py-7"
                                        style={{
                                            background: "var(--card-color,#ffffff)",
                                            border: "1px solid var(--stroke,#e4e4e7)",
                                        }}
                                    >
                                        {/* 序号 + 阶段标签 */}
                                        <div className="flex items-baseline justify-between">
                                            <span
                                                className="text-3xl font-light leading-none"
                                                style={{ color: "var(--primary-color,#b08d57)" }}
                                            >
                                                {num}
                                            </span>
                                            <span
                                                className="text-xs font-medium break-words"
                                                style={{
                                                    color: "var(--secondary-color,#3f3f46)",
                                                    letterSpacing: '0.04em',
                                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                                }}
                                            >
                                                {p?.phase || `第${num}阶段`}
                                            </span>
                                        </div>

                                        {/* 金铜细线 */}
                                        <span
                                            className="mt-5 h-0.5 w-8 flex-shrink-0"
                                            style={{ background: "var(--primary-color,#b08d57)" }}
                                        />

                                        {/* 阶段名称 */}
                                        <h2
                                            className="mt-4 text-xl font-medium leading-[1.35] break-words"
                                            style={{
                                                color: "var(--background-text,#27272a)",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {p?.title || '阶段名称'}
                                        </h2>

                                        {/* 关键事项 */}
                                        <ul className="mt-5 flex flex-col gap-3">
                                            {(p?.items || []).map((it, j) => (
                                                <li key={j} className="flex items-start gap-2.5">
                                                    <span
                                                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                                        style={{ background: "var(--primary-color,#b08d57)" }}
                                                    />
                                                    <span
                                                        className="text-sm leading-[1.7] break-words"
                                                        style={{
                                                            color: "var(--secondary-color,#3f3f46)",
                                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {it}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* 阶段之间的连接细线 */}
                                    {!isLast && (
                                        <div className="flex flex-shrink-0 items-center px-1">
                                            <span
                                                className="h-px w-4"
                                                style={{ background: "var(--stroke,#e4e4e7)" }}
                                            />
                                            <span
                                                className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                                style={{ background: "var(--primary-color,#b08d57)" }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Roadmap
