import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'gov-cn-icon-list'
export const layoutName = '图标要点列表'
export const layoutDescription = '党政政务风图标要点列表：米白底 + 中国红 + 烫金细线，居中对称标题与五角星点缀，竖向排布 4-6 条「左图标右文字」要点。纯 CSS/SVG 装饰，离线可渲染。'

const iconUrl = (name: string) =>
    `https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${name}-bold.svg`

const schema = z.object({
    title: z.string().min(2).max(20).default('治理现代化重点举措').meta({
        description: "幻灯片主标题（中文，简短庄重，建议不超过20字）",
    }),
    items: z.array(z.object({
        icon: IconSchema.default({
            __icon_url__: iconUrl('shield-check'),
            __icon_query__: 'shield check',
        }).meta({ description: "要点图标" }),
        title: z.string().min(2).max(14).meta({
            description: "要点小标题（中文，建议不超过14字）",
        }),
        desc: z.string().min(4).max(40).meta({
            description: "要点说明文字（中文，建议不超过40字）",
        }),
    })).min(4).max(6).default([
        {
            icon: { __icon_url__: iconUrl('shield-check'), __icon_query__: 'shield check' },
            title: '依法行政',
            desc: '坚持法治政府建设，权责清单全面公开，规范执法行为。',
        },
        {
            icon: { __icon_url__: iconUrl('users-three'), __icon_query__: 'people group' },
            title: '为民服务',
            desc: '推进政务服务一网通办，群众办事最多跑一次，便民利民。',
        },
        {
            icon: { __icon_url__: iconUrl('scales'), __icon_query__: 'balance scales' },
            title: '公正廉洁',
            desc: '强化监督执纪问责，构建亲清政商关系，营造风清气正环境。',
        },
        {
            icon: { __icon_url__: iconUrl('chart-line-up'), __icon_query__: 'chart growth' },
            title: '高质量发展',
            desc: '统筹推进经济社会发展，培育新质生产力，夯实民生根基。',
        },
        {
            icon: { __icon_url__: iconUrl('leaf'), __icon_query__: 'green leaf' },
            title: '生态文明',
            desc: '践行绿水青山就是金山银山理念，打好污染防治攻坚战。',
        },
    ]).meta({ description: "图标要点列表，4-6 条" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const IconList: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '治理现代化重点举措'
    const items = (slideData?.items && slideData.items.length > 0)
        ? slideData.items
        : []

    // 五角星 SVG 路径（装饰用）
    const Star = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
        <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="currentColor">
            <path d="M12 2.5l2.7 6.06 6.6.55-5.02 4.32 1.53 6.45L12 16.9l-5.81 3.5 1.53-6.45-5.02-4.32 6.6-.55L12 2.5z" />
        </svg>
    )

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
                {/* 背景装饰层：对称烫金华表纹样 + 五角星点缀 */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    {/* 顶部居中中国红光晕 */}
                    <div
                        className="absolute left-1/2 top-0 h-48 w-[120%] -translate-x-1/2"
                        style={{
                            background: "radial-gradient(60% 100% at 50% 0%, color-mix(in srgb, var(--primary-color,#c1121f) 12%, transparent), transparent)",
                        }}
                    />
                    {/* 左右对称烫金竖纹（华表母题简化） */}
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="govListGold" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                                <stop offset="35%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0.45" />
                                <stop offset="65%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="var(--secondary-color,#b8860b)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* 左侧对称双线 */}
                        <line x1="40" y1="120" x2="40" y2="600" stroke="url(#govListGold)" strokeWidth="2" />
                        <line x1="52" y1="160" x2="52" y2="560" stroke="url(#govListGold)" strokeWidth="1" />
                        {/* 右侧对称双线 */}
                        <line x1="1240" y1="120" x2="1240" y2="600" stroke="url(#govListGold)" strokeWidth="2" />
                        <line x1="1228" y1="160" x2="1228" y2="560" stroke="url(#govListGold)" strokeWidth="1" />
                    </svg>
                </div>

                {/* 主内容容器：垂直分布、自适应 */}
                <div className="relative z-10 flex h-full flex-col px-20 py-12">
                    {/* 居中对称标题区 */}
                    <div className="flex flex-shrink-0 flex-col items-center text-center">
                        {/* 标题上方：五角星 + 烫金细线对称构图 */}
                        <div className="flex items-center justify-center gap-3">
                            <span className="h-px w-16 flex-shrink-0" style={{ background: "linear-gradient(to right, transparent, var(--secondary-color,#b8860b))" }} />
                            <Star className="w-4 h-4 flex-shrink-0" style={{ color: "var(--primary-color,#c1121f)" }} />
                            <span className="h-px w-16 flex-shrink-0" style={{ background: "linear-gradient(to left, transparent, var(--secondary-color,#b8860b))" }} />
                        </div>

                        <h1
                            className="mt-4 text-4xl font-black leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        {/* 标题下方烫金细线 + 中心红点 */}
                        <div className="mt-4 flex items-center justify-center gap-2">
                            <span className="h-px w-20 flex-shrink-0" style={{ background: "linear-gradient(to right, transparent, var(--secondary-color,#b8860b))" }} />
                            <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: "var(--primary-color,#c1121f)" }} />
                            <span className="h-px w-20 flex-shrink-0" style={{ background: "linear-gradient(to left, transparent, var(--secondary-color,#b8860b))" }} />
                        </div>
                    </div>

                    {/* 要点列表区：竖向、均匀分布、自适应不溢出 */}
                    <div className="mt-8 flex min-h-0 flex-1 flex-col justify-center gap-4">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-5 rounded-xl border px-6 py-4"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#e8dcc8)",
                                    boxShadow: "0 1px 2px rgba(26,26,26,0.04)",
                                }}
                            >
                                {/* 左侧：图标徽章（中国红底 + 烫金描边） */}
                                <div
                                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg"
                                    style={{
                                        background: "var(--primary-color,#c1121f)",
                                        boxShadow: "inset 0 0 0 1.5px var(--secondary-color,#b8860b)",
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url={item?.icon?.__icon_url__}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-6 h-6"
                                        title={item?.icon?.__icon_query__}
                                    />
                                </div>

                                {/* 烫金分隔细线 */}
                                <span
                                    className="h-10 w-px flex-shrink-0"
                                    style={{ background: "linear-gradient(to bottom, transparent, var(--secondary-color,#b8860b), transparent)", opacity: 0.55 }}
                                />

                                {/* 右侧：标题 + 说明 */}
                                <div className="flex min-w-0 flex-1 flex-col">
                                    <h3
                                        className="text-lg font-bold leading-[1.6] break-words"
                                        style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {item?.title}
                                    </h3>
                                    <p
                                        className="mt-0.5 text-sm leading-relaxed break-words"
                                        style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                    >
                                        {item?.desc}
                                    </p>
                                </div>

                                {/* 行尾序号（烫金小字 + 五角星） */}
                                <div className="hidden flex-shrink-0 items-center gap-1.5 sm:flex">
                                    <Star className="w-3 h-3" style={{ color: "var(--secondary-color,#b8860b)", opacity: 0.7 }} />
                                    <span
                                        className="text-sm font-black leading-none"
                                        style={{ color: "var(--secondary-color,#b8860b)", opacity: 0.85 }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default IconList
