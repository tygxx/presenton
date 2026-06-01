import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'gov-cn-roadmap'
export const layoutName = '路线图'
export const layoutDescription = '党政政务风路线图：米白底 + 中国红 + 烫金细线，居中对称标题，阶段卡横向排列展示分阶段计划。纯 CSS/SVG 装饰（华表纹样、五角星点缀），离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('三年发展行动路线图').meta({
        description: "幻灯片主标题（中文，庄重简短），如『分阶段实施计划』",
    }),
    phases: z.array(z.object({
        phase: z.string().min(2).max(10).default('第一阶段').meta({
            description: "阶段标识，如『第一阶段』『近期』",
        }),
        title: z.string().min(2).max(16).default('夯实基础').meta({
            description: "阶段主题（中文，简短有力）",
        }),
        items: z.array(z.string().min(2).max(24).meta({
            description: "该阶段的重点任务/举措（中文，一句话）",
        })).min(1).max(3).default([
            '健全体制机制，明确职责分工',
            '完成专项调研与摸底排查',
        ]).meta({ description: "阶段重点任务清单" }),
        icon: IconSchema.default({
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/flag-bold.svg',
            __icon_query__: 'flag foundation',
        }).meta({ description: "阶段图标" }),
    })).min(3).max(4).default([
        {
            phase: '第一阶段',
            title: '夯实基础',
            items: [
                '健全体制机制，明确职责分工',
                '完成专项调研与摸底排查',
                '出台配套政策与实施细则',
            ],
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/flag-bold.svg',
                __icon_query__: 'flag foundation',
            },
        },
        {
            phase: '第二阶段',
            title: '全面推进',
            items: [
                '重点项目落地见效',
                '示范引领、以点带面推广',
                '强化督查考核与跟踪问效',
            ],
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-launch-bold.svg',
                __icon_query__: 'rocket advance',
            },
        },
        {
            phase: '第三阶段',
            title: '巩固提升',
            items: [
                '总结经验、形成长效机制',
                '全面验收评估与成果转化',
                '迈上高质量发展新台阶',
            ],
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/trophy-bold.svg',
                __icon_query__: 'trophy achievement',
            },
        },
    ]).meta({ description: "分阶段计划（横向排列，3至4个阶段）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Roadmap: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '三年发展行动路线图'
    const phases = (slideData?.phases && slideData.phases.length > 0)
        ? slideData.phases
        : [
            {
                phase: '第一阶段', title: '夯实基础',
                items: ['健全体制机制，明确职责分工', '完成专项调研与摸底排查', '出台配套政策与实施细则'],
                icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/flag-bold.svg', __icon_query__: 'flag foundation' },
            },
            {
                phase: '第二阶段', title: '全面推进',
                items: ['重点项目落地见效', '示范引领、以点带面推广', '强化督查考核与跟踪问效'],
                icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-launch-bold.svg', __icon_query__: 'rocket advance' },
            },
            {
                phase: '第三阶段', title: '巩固提升',
                items: ['总结经验、形成长效机制', '全面验收评估与成果转化', '迈上高质量发展新台阶'],
                icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/trophy-bold.svg', __icon_query__: 'trophy achievement' },
            },
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
                {/* 背景装饰层：对称构图 + 烫金细线 + 华表纹样 + 五角星 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="govRoadGold" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#b8860b" stopOpacity="0" />
                            <stop offset="50%" stopColor="#b8860b" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="govRoadHalo" cx="50%" cy="0%" r="70%">
                            <stop offset="0%" stopColor="#c1121f" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#c1121f" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* 顶部居中红色光晕，呼应对称构图 */}
                    <rect x="0" y="0" width="1280" height="320" fill="url(#govRoadHalo)" />
                    {/* 顶部与底部烫金细线 */}
                    <line x1="240" y1="150" x2="1040" y2="150" stroke="url(#govRoadGold)" strokeWidth="1.5" />
                    <line x1="160" y1="688" x2="1120" y2="688" stroke="url(#govRoadGold)" strokeWidth="1.5" />
                    {/* 四角对称烫金回纹母题 */}
                    {[
                        { x: 56, y: 56, sx: 1, sy: 1 },
                        { x: 1224, y: 56, sx: -1, sy: 1 },
                        { x: 56, y: 664, sx: 1, sy: -1 },
                        { x: 1224, y: 664, sx: -1, sy: -1 },
                    ].map((c, i) => (
                        <g key={i} transform={`translate(${c.x} ${c.y}) scale(${c.sx} ${c.sy})`} stroke="#b8860b" strokeOpacity="0.40" strokeWidth="1.5" fill="none">
                            <path d="M0 22 L0 0 L22 0" />
                            <path d="M6 14 L6 6 L14 6" />
                        </g>
                    ))}
                </svg>

                {/* 主内容：居中对称 */}
                <div className="relative z-10 flex h-full flex-col px-14 py-10">
                    {/* 居中对称标题区 + 五角星点缀 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-3">
                            <StarRule align="right" />
                            <span
                                className="text-sm font-medium tracking-wide break-words"
                                style={{ color: "var(--secondary-color,#b8860b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                政务工作 · 路线图
                            </span>
                            <StarRule align="left" />
                        </div>
                        <h1
                            className="mt-3 text-4xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-3 flex items-center gap-2">
                            <span className="block h-[3px] w-10 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} />
                            <StarMark />
                            <span className="block h-[3px] w-10 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        </div>
                    </div>

                    {/* 阶段卡横向排列 */}
                    <div className="mt-8 flex flex-1 items-stretch justify-center gap-6">
                        {phases.map((p: any, i: number) => {
                            const phaseLabel = p?.phase || `第${['一', '二', '三', '四'][i] || '一'}阶段`
                            const phaseTitle = p?.title || '阶段目标'
                            const items: string[] = Array.isArray(p?.items) ? p.items : []
                            const iconUrl = p?.icon?.__icon_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/flag-bold.svg'
                            const iconQuery = p?.icon?.__icon_query__ || 'phase'
                            return (
                                <div
                                    key={i}
                                    className="flex flex-1 flex-col rounded-xl border p-5 shadow-sm"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#e8dcc8)",
                                        borderTop: "3px solid var(--primary-color,#c1121f)",
                                    }}
                                >
                                    {/* 卡头：序号徽章 + 图标 */}
                                    <div className="flex items-center justify-between">
                                        <div
                                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-lg font-black"
                                            style={{ background: "var(--primary-color,#c1121f)", color: "var(--primary-text,#ffffff)" }}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <div
                                            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{ background: "rgba(184,134,11,0.12)", color: "var(--secondary-color,#b8860b)" }}
                                        >
                                            <RemoteSvgIcon
                                                url={iconUrl}
                                                strokeColor="currentColor"
                                                color="var(--secondary-color,#b8860b)"
                                                className="w-5 h-5"
                                                title={iconQuery}
                                            />
                                        </div>
                                    </div>

                                    {/* 阶段标识 + 标题 */}
                                    <div className="mt-4">
                                        <span
                                            className="text-xs font-semibold tracking-wide break-words"
                                            style={{ color: "var(--secondary-color,#b8860b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {phaseLabel}
                                        </span>
                                        <h3
                                            className="mt-1 text-xl font-black leading-[1.3] break-words"
                                            style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {phaseTitle}
                                        </h3>
                                    </div>

                                    {/* 烫金分隔细线 */}
                                    <div className="my-4 h-px w-full" style={{ background: "var(--stroke,#e8dcc8)" }} />

                                    {/* 任务清单 */}
                                    <ul className="flex flex-col gap-2.5">
                                        {items.map((item, j) => (
                                            <li key={j} className="flex items-start gap-2.5">
                                                <span
                                                    className="mt-[7px] block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                                    style={{ background: "var(--primary-color,#c1121f)" }}
                                                />
                                                <span
                                                    className="text-sm leading-[1.7] break-words"
                                                    style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.88, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                                >
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

/* 五角星点缀（烫金） */
const StarMark: React.FC = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M12 2 L14.9 8.6 L22 9.3 L16.7 14 L18.2 21 L12 17.3 L5.8 21 L7.3 14 L2 9.3 L9.1 8.6 Z"
            fill="var(--secondary-color,#b8860b)"
        />
    </svg>
)

/* 标题两侧的星+细线对称装饰 */
const StarRule: React.FC<{ align: 'left' | 'right' }> = ({ align }) => (
    <span className="flex items-center gap-2">
        {align === 'right' && <span className="block h-px w-8 rounded-full" style={{ background: "var(--secondary-color,#b8860b)", opacity: 0.6 }} />}
        <StarMark />
        {align === 'left' && <span className="block h-px w-8 rounded-full" style={{ background: "var(--secondary-color,#b8860b)", opacity: 0.6 }} />}
    </span>
)

export default Roadmap
