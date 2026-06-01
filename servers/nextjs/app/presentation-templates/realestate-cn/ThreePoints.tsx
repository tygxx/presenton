import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'realestate-cn-three-points'
export const layoutName = '三栏要点'
export const layoutDescription = '房产建筑风三栏要点：高级灰底 + 金铜点缀 + 超大留白 + 细线分隔，三等分列呈现图标、标题与描述。纯 CSS/SVG 装饰（建筑剪影 + 极简线条），离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('臻选品质生活').meta({
        description: "页面主标题（中文，简短克制）",
    }),
    points: z.array(z.object({
        icon: IconSchema.meta({ description: "要点图标（phosphor 图标）" }),
        title: z.string().min(2).max(12).meta({ description: "要点标题（中文，简短）" }),
        desc: z.string().min(4).max(40).meta({ description: "要点描述（中文，一句话说明）" }),
    })).min(3).max(3).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/buildings-bold.svg',
                __icon_query__: 'buildings architecture',
            },
            title: '建筑美学',
            desc: '简约立面与挑高空间，沉淀历久弥新的居住格调。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/tree-bold.svg',
                __icon_query__: 'landscape garden tree',
            },
            title: '园林景观',
            desc: '层叠绿境与水系环绕，于喧嚣之中独享静谧。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg',
                __icon_query__: 'location map pin',
            },
            title: '稀缺地段',
            desc: '坐拥城市核心，交通商圈学府一脉相连。',
        },
    ]).meta({ description: "三栏要点列表（固定三列）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const fallbackPoints: SlideData['points'] = [
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/buildings-bold.svg',
            __icon_query__: 'buildings architecture',
        },
        title: '建筑美学',
        desc: '简约立面与挑高空间，沉淀历久弥新的居住格调。',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/tree-bold.svg',
            __icon_query__: 'landscape garden tree',
        },
        title: '园林景观',
        desc: '层叠绿境与水系环绕，于喧嚣之中独享静谧。',
    },
    {
        icon: {
            __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg',
            __icon_query__: 'location map pin',
        },
        title: '稀缺地段',
        desc: '坐拥城市核心，交通商圈学府一脉相连。',
    },
]

const ThreePoints: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '臻选品质生活'
    const points = (slideData?.points && slideData.points.length > 0 ? slideData.points : fallbackPoints).slice(0, 3)

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
                {/* 底部建筑剪影装饰层（极简线条 + 大留白） */}
                <svg
                    viewBox="0 0 1280 220"
                    className="absolute bottom-0 left-0 w-full"
                    preserveAspectRatio="xMidYMax slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="reThreeSilhouette" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="var(--secondary-color,#3f3f46)" stopOpacity="0.10" />
                        </linearGradient>
                    </defs>
                    {/* 城市天际剪影 */}
                    <path
                        d="M0 220 V150 H70 V120 H140 V170 H210 V100 H250 V60 H300 V100 H360 V150 H430 V110 H500 V160 H560 V90 H600 V50 H650 V90 H720 V140 H790 V120 H860 V165 H930 V110 H1000 V70 H1050 V110 H1120 V150 H1190 V130 H1280 V220 Z"
                        fill="url(#reThreeSilhouette)"
                    />
                    {/* 细线勾勒的塔尖天线 */}
                    <line x1="625" y1="50" x2="625" y2="20" stroke="var(--primary-color,#b08d57)" strokeOpacity="0.45" strokeWidth="1" />
                    <line x1="275" y1="60" x2="275" y2="34" stroke="var(--primary-color,#b08d57)" strokeOpacity="0.35" strokeWidth="1" />
                </svg>

                {/* 右上角极简金铜角标 */}
                <div className="absolute top-9 right-12" aria-hidden="true">
                    <div className="h-px w-16" style={{ background: "var(--primary-color,#b08d57)", opacity: 0.7 }} />
                    <div className="mt-2 h-px w-9" style={{ background: "var(--primary-color,#b08d57)", opacity: 0.45 }} />
                </div>

                <div className="relative z-10 flex h-full flex-col px-20 pt-14 pb-16">
                    {/* 顶部标题区 */}
                    <div className="flex flex-col items-center text-center">
                        <span
                            className="mb-4 inline-flex items-center gap-3 text-xs font-light tracking-[0.4em] break-words"
                            style={{ color: "var(--primary-color,#b08d57)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            <span className="h-px w-8" style={{ background: "var(--primary-color,#b08d57)" }} />
                            EXQUISITE LIVING
                            <span className="h-px w-8" style={{ background: "var(--primary-color,#b08d57)" }} />
                        </span>
                        <h1
                            className="text-5xl font-light leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        <div className="mt-6 h-px w-20" style={{ background: "var(--primary-color,#b08d57)" }} />
                    </div>

                    {/* 三等分要点列 */}
                    <div className="mt-auto mb-auto grid grid-cols-3 items-stretch">
                        {points.map((p, i) => {
                            const icon = p?.icon
                            const pTitle = p?.title || ['建筑美学', '园林景观', '稀缺地段'][i] || '核心要点'
                            const pDesc = p?.desc || '于细节之处，呈现轻奢而克制的品质生活。'
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center px-9 text-center"
                                    style={{
                                        borderLeft: i === 0 ? 'none' : '1px solid var(--stroke,#e4e4e7)',
                                    }}
                                >
                                    {/* 图标徽章：金铜细环 + 浅卡片底 */}
                                    <div
                                        className="flex h-16 w-16 items-center justify-center rounded-full"
                                        style={{
                                            background: "var(--card-color,#ffffff)",
                                            border: "1px solid var(--primary-color,#b08d57)",
                                            boxShadow: '0 6px 18px rgba(176,141,87,0.12)',
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={icon?.__icon_url__}
                                            strokeColor="currentColor"
                                            color="var(--primary-color,#b08d57)"
                                            className="w-7 h-7"
                                            title={icon?.__icon_query__ || pTitle}
                                        />
                                    </div>

                                    {/* 序号 */}
                                    <span
                                        className="mt-5 text-xs font-light tracking-[0.3em]"
                                        style={{ color: "var(--primary-color,#b08d57)", opacity: 0.8 }}
                                    >
                                        {`0${i + 1}`}
                                    </span>

                                    <h3
                                        className="mt-2 text-xl font-medium leading-[1.35] break-words"
                                        style={{ color: "var(--background-text,#27272a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {pTitle}
                                    </h3>

                                    <div className="my-4 h-px w-8" style={{ background: "var(--stroke,#e4e4e7)" }} />

                                    <p
                                        className="text-sm font-light leading-[1.8] break-words"
                                        style={{ color: "var(--secondary-color,#3f3f46)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {pDesc}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThreePoints
