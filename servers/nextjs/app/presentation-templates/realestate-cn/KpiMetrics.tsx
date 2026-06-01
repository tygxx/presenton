import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'realestate-cn-kpi-metrics'
export const layoutName = '核心数据'
export const layoutDescription = '房产建筑核心数据页：3-4 个超大数字 KPI，高级灰配色 + 金铜点缀 + 超大留白 + 细线分隔，建筑剪影装饰。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('项目核心数据').meta({
        description: "核心数据页主标题（中文，简短）",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(8).meta({
            description: "核心数值，如 128万㎡、98% 等（超大字重展示）",
        }),
        label: z.string().min(2).max(16).meta({
            description: "指标名称，如『总建筑面积』",
        }),
        desc: z.string().max(30).optional().meta({
            description: "指标补充说明（可选，一句话）",
        }),
        icon: IconSchema.optional().meta({
            description: "指标图标（可选）",
        }),
    })).min(3).max(4).default([
        {
            value: '128万',
            label: '总建筑面积',
            desc: '涵盖住宅、商业与配套，单位平方米',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/buildings-bold.svg',
                __icon_query__: 'buildings',
            },
        },
        {
            value: '98%',
            label: '一期去化率',
            desc: '开盘三月内售罄，去化稳居区域前列',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/trend-up-bold.svg',
                __icon_query__: 'trend up',
            },
        },
        {
            value: '4.2万',
            label: '均价（元/㎡）',
            desc: '对标城市级地段，价值持续坚挺',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/coins-bold.svg',
                __icon_query__: 'coins',
            },
        },
        {
            value: '32%',
            label: '绿地覆盖率',
            desc: '园林低密生活，营造城市绿洲',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg',
                __icon_query__: 'leaf',
            },
        },
    ]).meta({ description: "3-4 个核心数据指标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const KpiMetrics: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '项目核心数据'
    const metrics = (slideData?.metrics && slideData.metrics.length > 0
        ? slideData.metrics
        : [
            { value: '128万', label: '总建筑面积', desc: '涵盖住宅、商业与配套，单位平方米' },
            { value: '98%', label: '一期去化率', desc: '开盘三月内售罄，去化稳居区域前列' },
            { value: '4.2万', label: '均价（元/㎡）', desc: '对标城市级地段，价值持续坚挺' },
            { value: '32%', label: '绿地覆盖率', desc: '园林低密生活，营造城市绿洲' },
        ]
    ).slice(0, 4)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f4f4f5)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 底部建筑剪影 + 极简线条装饰层 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="reKpiSky" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="var(--primary-color,#b08d57)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* 右上角金铜光晕 */}
                    <rect x="760" y="0" width="520" height="320" fill="url(#reKpiSky)" />
                    {/* 极细网格分隔线 */}
                    <line x1="80" y1="150" x2="1200" y2="150" stroke="var(--stroke,#e4e4e7)" strokeWidth="1" />
                    {/* 底部建筑剪影 */}
                    <g fill="var(--secondary-color,#3f3f46)" opacity="0.05">
                        <rect x="60" y="600" width="70" height="120" />
                        <rect x="140" y="560" width="55" height="160" />
                        <rect x="205" y="630" width="48" height="90" />
                        <rect x="990" y="580" width="60" height="140" />
                        <rect x="1060" y="540" width="52" height="180" />
                        <rect x="1124" y="610" width="44" height="110" />
                        <polygon points="1112,540 1138,508 1164,540" />
                    </g>
                    {/* 金铜细分割线（底部基线） */}
                    <line x1="0" y1="700" x2="1280" y2="700" stroke="var(--primary-color,#b08d57)" strokeWidth="1.5" strokeOpacity="0.35" />
                </svg>

                {/* 右上角极简角标 */}
                <div
                    className="absolute right-12 top-10 h-12 w-12 border-t border-r"
                    style={{ borderColor: "var(--primary-color,#b08d57)", opacity: 0.6 }}
                    aria-hidden="true"
                />

                {/* 主内容 */}
                <div className="relative z-10 flex h-full flex-col px-20 py-14">
                    {/* 头部：标签 + 标题 + 细线 */}
                    <div className="flex-shrink-0">
                        <span
                            className="mb-4 inline-flex items-center text-sm font-medium tracking-wide break-words"
                            style={{
                                color: "var(--primary-color,#b08d57)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            KEY METRICS · 核心数据
                        </span>
                        <h1
                            className="text-5xl font-light leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#27272a)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        <div
                            className="mt-6 h-px w-full"
                            style={{ background: "var(--stroke,#e4e4e7)" }}
                        />
                    </div>

                    {/* KPI 网格：细线分隔，超大数值 */}
                    <div
                        className="grid flex-1 items-center"
                        style={{
                            gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))`,
                        }}
                    >
                        {metrics.map((m, i) => (
                            <div
                                key={i}
                                className="flex h-full flex-col justify-center px-7"
                                style={{
                                    borderLeft: i === 0 ? 'none' : '1px solid var(--stroke,#e4e4e7)',
                                }}
                            >
                                {/* 图标 + 序号 */}
                                <div className="mb-5 flex items-center gap-3">
                                    <div
                                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                                        style={{
                                            background: "var(--primary-color,#b08d57)",
                                            color: "var(--primary-text,#ffffff)",
                                        }}
                                    >
                                        {m.icon?.__icon_url__ ? (
                                            <RemoteSvgIcon
                                                url={m.icon.__icon_url__}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-5 h-5"
                                                title={m.icon.__icon_query__}
                                            />
                                        ) : (
                                            <span className="text-sm font-semibold">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                        )}
                                    </div>
                                    <span
                                        className="text-xs font-medium tracking-wide"
                                        style={{ color: "var(--primary-color,#b08d57)", opacity: 0.7 }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* 超大数值 */}
                                <div
                                    className="text-6xl font-black leading-[1.1] break-words"
                                    style={{
                                        color: "var(--background-text,#27272a)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {m.value}
                                </div>

                                {/* 标签 */}
                                <div
                                    className="mt-3 text-base font-medium leading-relaxed break-words"
                                    style={{
                                        color: "var(--secondary-color,#3f3f46)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {m.label}
                                </div>

                                {/* 说明 */}
                                {m.desc && (
                                    <div
                                        className="mt-2 text-sm leading-relaxed break-words"
                                        style={{
                                            color: "var(--secondary-color,#3f3f46)",
                                            opacity: 0.6,
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        {m.desc}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default KpiMetrics
