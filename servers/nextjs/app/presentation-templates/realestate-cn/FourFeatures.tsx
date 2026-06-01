import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'realestate-cn-four-features'
export const layoutName = '四宫格特性'
export const layoutDescription = '房产建筑风四宫格特性页：2x2 网格卡片，每张含图标、小标题与说明。极简细体、高级灰配金铜点缀、细线分隔与建筑剪影装饰，纯 CSS/SVG，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('品质人居四重承诺').meta({
        description: "四宫格特性页主标题（中文，简短克制）",
    }),
    features: z.array(z.object({
        icon: IconSchema.meta({ description: "卡片图标（phosphor 细线图标）" }),
        title: z.string().min(2).max(12).meta({ description: "特性小标题（中文，≤12字）" }),
        desc: z.string().min(4).max(32).meta({ description: "特性说明（中文，一句话，≤32字）" }),
    })).min(4).max(4).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/buildings-bold.svg',
                __icon_query__: 'modern architecture',
            },
            title: '建筑美学',
            desc: '现代主义立面，光影与线条勾勒城市天际线。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/tree-bold.svg',
                __icon_query__: 'landscape garden',
            },
            title: '生态园林',
            desc: '低密布局，三重立体绿化营造静谧栖居。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
                __icon_query__: 'security service',
            },
            title: '智慧安防',
            desc: '五重门禁与全时监控，守护家的安全感。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/diamond-bold.svg',
                __icon_query__: 'premium interior',
            },
            title: '精工品质',
            desc: '甄选名厂材料，毫米级工艺成就轻奢质感。',
        },
    ]).meta({ description: "四张特性卡片（固定四张）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const fallbackFeatures: SlideData['features'] = [
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/buildings-bold.svg',
            __icon_query__: 'modern architecture',
        },
        title: '建筑美学',
        desc: '现代主义立面，光影与线条勾勒城市天际线。',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/tree-bold.svg',
            __icon_query__: 'landscape garden',
        },
        title: '生态园林',
        desc: '低密布局，三重立体绿化营造静谧栖居。',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
            __icon_query__: 'security service',
        },
        title: '智慧安防',
        desc: '五重门禁与全时监控，守护家的安全感。',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/diamond-bold.svg',
            __icon_query__: 'premium interior',
        },
        title: '精工品质',
        desc: '甄选名厂材料，毫米级工艺成就轻奢质感。',
    },
]

const FourFeatures: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '品质人居四重承诺'
    const features = (slideData?.features && slideData.features.length === 4)
        ? slideData.features
        : fallbackFeatures

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
                {/* 背景装饰层：建筑剪影 + 细线 + 金铜光晕 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    {/* 右下建筑剪影（极简线条） */}
                    <svg
                        viewBox="0 0 1280 720"
                        className="absolute inset-0 h-full w-full"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <defs>
                            <linearGradient id="reFourGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#b08d57" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="#b08d57" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* 左上金铜光晕 */}
                        <circle cx="120" cy="80" r="260" fill="url(#reFourGlow)" />
                        {/* 极简建筑剪影群（右下） */}
                        <g stroke="var(--secondary-color,#3f3f46)" strokeOpacity="0.07" strokeWidth="1.5" fill="none">
                            <rect x="980" y="430" width="70" height="290" />
                            <rect x="1062" y="500" width="54" height="220" />
                            <rect x="1128" y="380" width="80" height="340" />
                            <rect x="1220" y="470" width="60" height="250" />
                            <line x1="980" y1="430" x2="1015" y2="395" />
                            <line x1="1050" y1="430" x2="1015" y2="395" />
                            <line x1="1128" y1="380" x2="1168" y2="345" />
                            <line x1="1208" y1="380" x2="1168" y2="345" />
                        </g>
                        {/* 横向细分割线 */}
                        <line x1="0" y1="186" x2="1280" y2="186" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                    </svg>
                    {/* 顶部金铜细线点缀 */}
                    <div
                        className="absolute left-16 top-[150px] h-px w-16"
                        style={{ background: "var(--primary-color,#b08d57)" }}
                    />
                </div>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <span
                            className="mb-3 text-xs font-light uppercase break-words"
                            style={{
                                color: "var(--primary-color,#b08d57)",
                                letterSpacing: '0.35em',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            FOUR FEATURES
                        </span>
                        <h1
                            className="text-4xl font-light leading-[1.3] break-words"
                            style={{
                                color: "var(--background-text,#27272a)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                    </div>

                    {/* 2x2 网格卡片 */}
                    <div className="mt-9 grid flex-1 grid-cols-2 grid-rows-2 gap-6">
                        {features.map((f, i) => {
                            const fTitle = f?.title || fallbackFeatures[i].title
                            const fDesc = f?.desc || fallbackFeatures[i].desc
                            const iconUrl = f?.icon?.__icon_url__ || fallbackFeatures[i].icon.__icon_url__
                            const iconQuery = f?.icon?.__icon_query__ || fallbackFeatures[i].icon.__icon_query__
                            return (
                                <div
                                    key={i}
                                    className="flex items-start gap-5 rounded-md border px-8 py-6"
                                    style={{
                                        background: "var(--card-color,#ffffff)",
                                        borderColor: "var(--stroke,#e4e4e7)",
                                        boxShadow: '0 1px 2px rgba(39,39,42,0.04)',
                                    }}
                                >
                                    {/* 图标 + 序号细线 */}
                                    <div className="flex flex-shrink-0 flex-col items-center gap-3">
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-md"
                                            style={{
                                                background: "var(--primary-color,#b08d57)",
                                                color: "var(--primary-text,#ffffff)",
                                            }}
                                        >
                                            <RemoteSvgIcon
                                                url={iconUrl}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-6 h-6"
                                                title={iconQuery}
                                            />
                                        </div>
                                        <span
                                            className="text-xs font-light"
                                            style={{ color: "var(--primary-color,#b08d57)", letterSpacing: '0.1em' }}
                                        >
                                            0{i + 1}
                                        </span>
                                    </div>

                                    {/* 竖向细分割线 */}
                                    <div
                                        className="mt-1 h-12 w-px flex-shrink-0"
                                        style={{ background: "var(--stroke,#e4e4e7)" }}
                                    />

                                    {/* 文本 */}
                                    <div className="flex min-w-0 flex-col">
                                        <h3
                                            className="text-lg font-medium leading-[1.4] break-words"
                                            style={{
                                                color: "var(--background-text,#27272a)",
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {fTitle}
                                        </h3>
                                        <p
                                            className="mt-2 text-sm font-light leading-[1.7] break-words"
                                            style={{
                                                color: "var(--secondary-color,#3f3f46)",
                                                opacity: 0.85,
                                                overflowWrap: 'break-word', wordBreak: 'break-word',
                                            }}
                                        >
                                            {fDesc}
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
