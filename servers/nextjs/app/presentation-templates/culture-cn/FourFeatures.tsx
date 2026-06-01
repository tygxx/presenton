import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'culture-cn-four-features'
export const layoutName = '四宫格特性'
export const layoutDescription = '国潮文创风四宫格特性：宣纸米黄底配朱砂红与描金边的 2x2 卡片网格，每格含图标、小标题与说明。水墨纹样装饰，纯 CSS/SVG，离线可渲染。'

const iconUrl = (name: string) =>
    `https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${name}-bold.svg`

const schema = z.object({
    title: z.string().min(2).max(20).default('匠心营造的四重底蕴').meta({
        description: "版式主标题（中文，简短，体现四项特性的总纲）",
    }),
    features: z.array(z.object({
        icon: IconSchema.default({
            __icon_url__: iconUrl('feather'),
            __icon_query__: 'ink brush',
        }).meta({ description: "特性图标" }),
        title: z.string().min(2).max(12).meta({ description: "特性小标题（中文，简短）" }),
        desc: z.string().min(2).max(32).meta({ description: "特性说明（一句话，中文）" }),
    })).min(4).max(4).default([
        {
            icon: { __icon_url__: iconUrl('feather'), __icon_query__: 'ink brush' },
            title: '水墨意境',
            desc: '取法传统笔墨，于留白处见东方雅韵。',
        },
        {
            icon: { __icon_url__: iconUrl('flower-lotus'), __icon_query__: 'lotus pattern' },
            title: '纹样新生',
            desc: '提炼祥云缠枝纹样，焕发当代国潮气象。',
        },
        {
            icon: { __icon_url__: iconUrl('seal'), __icon_query__: 'red seal stamp' },
            title: '朱印为记',
            desc: '以印章红为点睛，铭刻匠造之诚。',
        },
        {
            icon: { __icon_url__: iconUrl('medal'), __icon_query__: 'gilded craft' },
            title: '描金工艺',
            desc: '勾勒鎏金描边，于细节处尽显高华。',
        },
    ]).meta({ description: "四张特性卡片，固定四项" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FourFeatures: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '匠心营造的四重底蕴'
    const features = (slideData?.features && slideData.features.length === 4)
        ? slideData.features
        : [
            { icon: { __icon_url__: iconUrl('feather'), __icon_query__: 'ink brush' }, title: '水墨意境', desc: '取法传统笔墨，于留白处见东方雅韵。' },
            { icon: { __icon_url__: iconUrl('flower-lotus'), __icon_query__: 'lotus pattern' }, title: '纹样新生', desc: '提炼祥云缠枝纹样，焕发当代国潮气象。' },
            { icon: { __icon_url__: iconUrl('seal'), __icon_query__: 'red seal stamp' }, title: '朱印为记', desc: '以印章红为点睛，铭刻匠造之诚。' },
            { icon: { __icon_url__: iconUrl('medal'), __icon_query__: 'gilded craft' }, title: '描金工艺', desc: '勾勒鎏金描边，于细节处尽显高华。' },
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
                    background: "var(--background-color,#f5ecd9)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：宣纸纹理 + 水墨笔触 + 传统纹样 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="cnffPaper" cx="22%" cy="14%" r="90%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.04" />
                        </radialGradient>
                        <linearGradient id="cnffInk" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="var(--secondary-color,#1a1a1a)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* 宣纸底光 */}
                    <rect width="1280" height="720" fill="url(#cnffPaper)" />
                    {/* 右上角水墨笔触晕染 */}
                    <path
                        d="M1150 -40 C1040 60 1120 170 1230 150 C1300 138 1320 40 1260 -30 Z"
                        fill="url(#cnffInk)"
                    />
                    <path
                        d="M40 660 C140 600 120 520 60 500 C-10 478 -40 600 40 660 Z"
                        fill="url(#cnffInk)"
                    />
                    {/* 传统回纹/祥云点缀（细描金线条） */}
                    <g stroke="var(--primary-color,#c0392b)" strokeOpacity="0.12" strokeWidth="1.4" fill="none">
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={i} cx="1180" cy="560" r={36 + i * 30} />
                        ))}
                    </g>
                </svg>

                {/* 内容主体 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-12">
                    {/* 标题区：竖排印章红块 + 主标题 + 描金分隔 */}
                    <div className="flex items-stretch gap-5">
                        {/* 印章红块（竖排点缀传统气质） */}
                        <div
                            className="flex flex-shrink-0 flex-col items-center justify-center rounded-md px-2.5 py-2 break-words"
                            style={{
                                background: "var(--primary-color,#c0392b)",
                                color: "var(--primary-text,#ffffff)",
                                boxShadow: '0 0 0 2px rgba(192,57,43,0.20)',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <span className="text-lg font-black leading-[1.35]" style={{ writingMode: 'vertical-rl' }}>
                                国潮
                            </span>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1
                                className="text-4xl font-black leading-[1.3] break-words"
                                style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            {/* 描金分隔线 */}
                            <div className="mt-3 flex items-center gap-2">
                                <span className="h-[3px] w-16 rounded-full" style={{ background: "var(--primary-color,#c0392b)" }} />
                                <span className="h-[3px] w-6 rounded-full" style={{ background: "var(--stroke,#ddd0b4)" }} />
                            </div>
                        </div>
                    </div>

                    {/* 2x2 特性网格 */}
                    <div className="mt-9 grid flex-1 grid-cols-2 grid-rows-2 gap-6">
                        {features.slice(0, 4).map((f, i) => (
                            <div
                                key={i}
                                className="relative flex flex-col justify-center overflow-hidden rounded-xl border px-7 py-6"
                                style={{
                                    background: "var(--card-color,#fbf5e9)",
                                    borderColor: "var(--stroke,#ddd0b4)",
                                    boxShadow: 'inset 0 0 0 1px rgba(192,57,43,0.06)',
                                }}
                            >
                                {/* 卡片角落描金纹样角标 */}
                                <span
                                    className="absolute right-0 top-0 h-12 w-12"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, transparent 50%, rgba(192,57,43,0.10) 50%)',
                                    }}
                                    aria-hidden="true"
                                />
                                <div className="flex items-center gap-4">
                                    {/* 图标：朱砂红圆底（印章意象） */}
                                    <div
                                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg"
                                        style={{
                                            background: "var(--primary-color,#c0392b)",
                                            boxShadow: '0 0 0 3px rgba(192,57,43,0.14)',
                                        }}
                                    >
                                        <RemoteSvgIcon
                                            url={f?.icon?.__icon_url__ || iconUrl('feather')}
                                            strokeColor="currentColor"
                                            color="var(--primary-text,#ffffff)"
                                            className="w-6 h-6"
                                            title={f?.icon?.__icon_query__ || 'feature icon'}
                                        />
                                    </div>
                                    <h3
                                        className="text-2xl font-bold leading-[1.3] break-words"
                                        style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {f?.title || '特性'}
                                    </h3>
                                </div>
                                <p
                                    className="mt-4 text-base leading-relaxed break-words"
                                    style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {f?.desc || ''}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FourFeatures
