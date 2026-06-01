import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'gov-cn-three-points'
export const layoutName = '三栏要点'
export const layoutDescription = '党政政务风三栏要点：米白底 + 中国红 + 烫金细线，居中对称标题与华表纹样装饰，三等分列展示图标+小标题+描述。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('扎实推进民生实事').meta({
        description: "幻灯片居中主标题（中文，庄重简短）",
    }),
    points: z.array(z.object({
        icon: IconSchema.meta({
            description: "要点图标（phosphor 图标）",
        }),
        title: z.string().min(2).max(12).meta({
            description: "要点小标题（中文，简短）",
        }),
        desc: z.string().min(4).max(40).meta({
            description: "要点描述（一句话说明）",
        }),
    })).min(3).max(3).default([
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
                __icon_query__: 'shield check',
            },
            title: '夯实基层治理',
            desc: '坚持党建引领，完善网格化服务，筑牢社会和谐稳定根基。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/seedling-bold.svg',
                __icon_query__: 'seedling growth',
            },
            title: '发展富民产业',
            desc: '聚焦特色优势产业，畅通产销链路，带动群众持续增收致富。',
        },
        {
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg',
                __icon_query__: 'heart care',
            },
            title: '增进民生福祉',
            desc: '办好教育医疗养老等实事，不断提升群众获得感幸福感。',
        },
    ]).meta({ description: "三栏要点，固定三项" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ThreePoints: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '扎实推进民生实事'
    const points = (slideData?.points && slideData.points.length > 0)
        ? slideData.points
        : [
            {
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shield-check-bold.svg',
                    __icon_query__: 'shield check',
                },
                title: '夯实基层治理',
                desc: '坚持党建引领，完善网格化服务，筑牢社会和谐稳定根基。',
            },
            {
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/seedling-bold.svg',
                    __icon_query__: 'seedling growth',
                },
                title: '发展富民产业',
                desc: '聚焦特色优势产业，畅通产销链路，带动群众持续增收致富。',
            },
            {
                icon: {
                    __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg',
                    __icon_query__: 'heart care',
                },
                title: '增进民生福祉',
                desc: '办好教育医疗养老等实事，不断提升群众获得感幸福感。',
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
                {/* 背景对称装饰层：华表纹样 + 烫金细线 + 五角星点缀 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    {/* 顶部居中烫金光晕 */}
                    <div
                        className="absolute left-1/2 top-0"
                        style={{
                            width: '560px', height: '320px', transform: 'translate(-50%,-55%)',
                            background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.10), transparent 70%)',
                        }}
                    />
                    {/* 左右对称华表/纹样竖线 */}
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="govGold" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#b8860b" stopOpacity="0" />
                                <stop offset="50%" stopColor="#b8860b" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* 左右对称竖向烫金细线（华表立柱意象） */}
                        <line x1="64" y1="40" x2="64" y2="680" stroke="url(#govGold)" strokeWidth="2" />
                        <line x1="1216" y1="40" x2="1216" y2="680" stroke="url(#govGold)" strokeWidth="2" />
                        {/* 底部对称纹样横线 */}
                        <line x1="64" y1="664" x2="1216" y2="664" stroke="#b8860b" strokeOpacity="0.18" strokeWidth="1" />
                    </svg>
                    {/* 左右底部对称五角星点缀 */}
                    {[
                        { left: '40px', top: '52px' },
                        { right: '40px', top: '52px' },
                    ].map((pos, i) => (
                        <svg
                            key={i}
                            viewBox="0 0 24 24"
                            className="absolute"
                            style={{ width: '20px', height: '20px', ...pos }}
                            fill="var(--secondary-color,#b8860b)"
                            fillOpacity={0.55}
                        >
                            <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
                        </svg>
                    ))}
                </div>

                {/* 内容主体 */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-16 py-12">
                    {/* 居中对称标题区 */}
                    <div className="flex w-full flex-col items-center">
                        {/* 标题上方对称烫金细线 + 五角星 */}
                        <div className="mb-4 flex items-center gap-3">
                            <span className="block h-px w-16" style={{ background: "var(--secondary-color,#b8860b)" }} />
                            <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }} fill="var(--primary-color,#c1121f)">
                                <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
                            </svg>
                            <span className="block h-px w-16" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        </div>
                        <h1
                            className="text-center text-5xl font-black leading-[1.3] break-words"
                            style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>
                        {/* 标题下方对称双色短线 */}
                        <div className="mt-5 flex items-center gap-2">
                            <span className="block h-1 w-10 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} />
                            <span className="block h-1 w-20 rounded-full" style={{ background: "var(--primary-color,#c1121f)" }} />
                            <span className="block h-1 w-10 rounded-full" style={{ background: "var(--secondary-color,#b8860b)" }} />
                        </div>
                    </div>

                    {/* 三等分列 */}
                    <div className="mt-12 grid w-full grid-cols-3 gap-8">
                        {points.slice(0, 3).map((p, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center rounded-xl border px-7 py-8 text-center"
                                style={{
                                    background: "var(--card-color,#ffffff)",
                                    borderColor: "var(--stroke,#e8dcc8)",
                                    boxShadow: '0 8px 24px rgba(193,18,31,0.06)',
                                }}
                            >
                                {/* 图标徽章：中国红圆底 + 烫金描边环 */}
                                <div
                                    className="mb-5 flex items-center justify-center rounded-full"
                                    style={{
                                        width: '64px', height: '64px',
                                        background: "var(--primary-color,#c1121f)",
                                        boxShadow: '0 0 0 4px rgba(184,134,11,0.25)',
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url={p?.icon?.__icon_url__}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-7 h-7"
                                        title={p?.icon?.__icon_query__}
                                    />
                                </div>
                                {/* 序号 */}
                                <span
                                    className="mb-2 text-sm font-bold"
                                    style={{ color: "var(--secondary-color,#b8860b)", letterSpacing: '0.15em' }}
                                >
                                    {`0${i + 1}`}
                                </span>
                                <h3
                                    className="text-2xl font-black leading-[1.35] break-words"
                                    style={{ color: "var(--background-text,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p?.title}
                                </h3>
                                {/* 分隔短线 */}
                                <span className="my-4 block h-px w-12" style={{ background: "var(--stroke,#e8dcc8)" }} />
                                <p
                                    className="text-base leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#1a1a1a)", opacity: 0.78, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p?.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThreePoints
