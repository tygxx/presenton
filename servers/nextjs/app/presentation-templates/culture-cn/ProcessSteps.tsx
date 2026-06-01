import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'culture-cn-process-steps'
export const layoutName = '流程步骤'
export const layoutDescription = '国潮文创风流程步骤页：宣纸米黄底 + 朱砂红印章 + 描金边连接线，编号卡片横向排布，步骤间以墨线箭头相连。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('文创产品上新流程').meta({
        description: "流程页主标题（中文，简短）",
    }),
    subtitle: z.string().min(2).max(28).default('从灵感到上市的匠心五步').meta({
        description: "副标题，一句话点题",
    }),
    steps: z.array(z.object({
        title: z.string().min(2).max(14).meta({ description: "步骤标题（中文，简短）" }),
        desc: z.string().min(2).max(36).meta({ description: "步骤说明（中文，一句话）" }),
        icon: IconSchema.optional().meta({ description: "步骤图标（可选）" }),
    })).min(3).max(5).default([
        {
            title: '溯源采风',
            desc: '走访古镇与博物馆，提炼传统纹样与文化母题。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg',
                __icon_query__: 'compass exploration',
            },
        },
        {
            title: '设计打样',
            desc: '将水墨意境融入造型，反复推敲首版样品。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/pen-nib-bold.svg',
                __icon_query__: 'pen nib design',
            },
        },
        {
            title: '匠艺制作',
            desc: '甄选非遗工坊，手作打磨每一处描金细节。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/scissors-bold.svg',
                __icon_query__: 'scissors craft',
            },
        },
        {
            title: '品控验收',
            desc: '逐件核验工艺与色泽，留住器物的温度。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/seal-check-bold.svg',
                __icon_query__: 'seal quality check',
            },
        },
        {
            title: '上市推广',
            desc: '以故事讲述东方美学，让国潮走进日常。',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/megaphone-bold.svg',
                __icon_query__: 'megaphone promotion',
            },
        },
    ]).meta({ description: "流程步骤列表（3-5 步）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const cnNum = ['壹', '贰', '叁', '肆', '伍']

const ProcessSteps: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '文创产品上新流程'
    const subtitle = slideData?.subtitle || '从灵感到上市的匠心五步'
    const steps = (slideData?.steps && slideData.steps.length > 0
        ? slideData.steps
        : [
            { title: '溯源采风', desc: '走访古镇与博物馆，提炼传统纹样与文化母题。' },
            { title: '设计打样', desc: '将水墨意境融入造型，反复推敲首版样品。' },
            { title: '匠艺制作', desc: '甄选非遗工坊，手作打磨每一处描金细节。' },
            { title: '品控验收', desc: '逐件核验工艺与色泽，留住器物的温度。' },
            { title: '上市推广', desc: '以故事讲述东方美学，让国潮走进日常。' },
        ]).slice(0, 5)

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
                {/* 背景装饰层：宣纸纹理 + 水墨晕染 + 描金细线 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="cultureInkTL" cx="0%" cy="0%" r="60%">
                                <stop offset="0%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.06" />
                                <stop offset="100%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="cultureInkBR" cx="100%" cy="100%" r="55%">
                                <stop offset="0%" stopColor="var(--primary-color,#c0392b)" stopOpacity="0.07" />
                                <stop offset="100%" stopColor="var(--primary-color,#c0392b)" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="cultureGold" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#b8860b" stopOpacity="0.0" />
                                <stop offset="50%" stopColor="#cba135" stopOpacity="0.55" />
                                <stop offset="100%" stopColor="#b8860b" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#cultureInkTL)" />
                        <rect width="1280" height="720" fill="url(#cultureInkBR)" />
                        {/* 描金外框 */}
                        <rect x="26" y="26" width="1228" height="668" fill="none" stroke="url(#cultureGold)" strokeWidth="1.5" rx="6" />
                        {/* 传统回纹角饰（左上） */}
                        <path d="M52 92 L52 56 L88 56 M64 80 L64 68 L76 68" fill="none" stroke="#cba135" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        {/* 传统回纹角饰（右下） */}
                        <path d="M1228 628 L1228 664 L1192 664 M1216 640 L1216 652 L1204 652" fill="none" stroke="#cba135" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {/* 右上水墨笔触色块 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-60px', right: '-40px', width: '260px', height: '260px', borderRadius: '50% 50% 48% 52% / 55% 45% 55% 45%',
                            background: 'radial-gradient(circle at 35% 35%, rgba(26,26,26,0.10), rgba(26,26,26,0) 70%)',
                        }}
                    />
                </div>

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 页眉：竖排印章红块 + 标题 */}
                    <div className="flex items-center gap-5">
                        {/* 朱砂印章 + 竖排点缀 */}
                        <div
                            className="flex flex-shrink-0 flex-col items-center justify-center rounded-md px-2.5 py-2 break-words"
                            style={{
                                background: "var(--primary-color,#c0392b)",
                                color: "var(--primary-text,#ffffff)",
                                boxShadow: '0 4px 14px rgba(192,57,43,0.30)',
                                lineHeight: 1.2,
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span className="text-lg font-black">国</span>
                            <span className="text-lg font-black">潮</span>
                        </div>
                        <div className="flex flex-col">
                            <h1
                                className="text-4xl font-black leading-[1.25] break-words"
                                style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <p
                                className="mt-2 text-base leading-relaxed break-words"
                                style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {subtitle}
                            </p>
                        </div>
                        {/* 右侧描金细线分隔 */}
                        <div className="ml-auto hidden items-center gap-2 sm:flex">
                            <span className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(203,161,53,0), rgba(203,161,53,0.7))' }} />
                            <span className="h-2 w-2 rotate-45" style={{ background: "var(--primary-color,#c0392b)" }} />
                        </div>
                    </div>

                    {/* 描金分隔线 */}
                    <div
                        className="mt-6 h-px w-full"
                        style={{ background: 'linear-gradient(90deg, rgba(203,161,53,0.0), rgba(203,161,53,0.6) 18%, rgba(203,161,53,0.6) 82%, rgba(203,161,53,0.0))' }}
                    />

                    {/* 步骤卡片横向排布 + 墨线箭头连接 */}
                    <div className="flex flex-1 items-stretch justify-center gap-2 pt-8">
                        {steps.map((step, i) => (
                            <React.Fragment key={i}>
                                <div className="flex flex-1 flex-col">
                                    <div
                                        className="flex flex-1 flex-col rounded-2xl border p-5 break-words"
                                        style={{
                                            background: "var(--card-color,#fbf5e9)",
                                            borderColor: "var(--stroke,#ddd0b4)",
                                            boxShadow: '0 6px 18px rgba(43,43,43,0.06)',
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {/* 编号印章 + 图标 */}
                                        <div className="flex items-center justify-between">
                                            <div
                                                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md text-xl font-black break-words"
                                                style={{
                                                    background: "var(--primary-color,#c0392b)",
                                                    color: "var(--primary-text,#ffffff)",
                                                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18)',
                                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                                }}
                                            >
                                                {cnNum[i] || (i + 1)}
                                            </div>
                                            {step.icon?.__icon_url__ ? (
                                                <div
                                                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                                                    style={{ background: 'rgba(192,57,43,0.10)', color: "var(--primary-color,#c0392b)" }}
                                                >
                                                    <RemoteSvgIcon
                                                        url={step.icon.__icon_url__}
                                                        strokeColor="currentColor"
                                                        color="var(--primary-color,#c0392b)"
                                                        className="w-5 h-5"
                                                        title={step.icon.__icon_query__}
                                                    />
                                                </div>
                                            ) : (
                                                <span
                                                    className="h-2.5 w-2.5 rotate-45 flex-shrink-0"
                                                    style={{ background: "#cba135" }}
                                                />
                                            )}
                                        </div>

                                        {/* 描金小分隔 */}
                                        <div
                                            className="mt-4 h-px w-10"
                                            style={{ background: 'linear-gradient(90deg, rgba(203,161,53,0.8), rgba(203,161,53,0))' }}
                                        />

                                        {/* 标题 */}
                                        <h3
                                            className="mt-3 text-lg font-bold leading-[1.35] break-words"
                                            style={{ color: "var(--background-text,#2b2b2b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {step.title}
                                        </h3>

                                        {/* 说明 */}
                                        <p
                                            className="mt-2 text-sm leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* 墨线箭头连接（非末尾） */}
                                {i < steps.length - 1 && (
                                    <div className="flex flex-shrink-0 items-center justify-center self-center px-1" aria-hidden="true">
                                        <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                                            <path
                                                d="M2 10 H20"
                                                stroke="var(--primary-color,#c0392b)"
                                                strokeOpacity="0.55"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeDasharray="1 4"
                                            />
                                            <path
                                                d="M17 5 L23 10 L17 15"
                                                stroke="var(--primary-color,#c0392b)"
                                                strokeOpacity="0.75"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProcessSteps
