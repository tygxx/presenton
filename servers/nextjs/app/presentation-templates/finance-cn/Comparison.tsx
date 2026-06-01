import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'finance-cn-comparison'
export const layoutName = '左右对比'
export const layoutDescription = '金融投资风左右对比页：深藏青底配香槟金细线，衬线大标题，左右两栏对称对比（两方/优劣/前后），中间菱形 VS 分隔。纯 CSS/SVG 装饰，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('两类资产配置对比').meta({
        description: "对比页主标题（中文，简短有力）",
    }),
    leftTitle: z.string().min(2).max(12).default('稳健型组合').meta({
        description: "左栏标题（中文，简短）",
    }),
    rightTitle: z.string().min(2).max(12).default('进取型组合').meta({
        description: "右栏标题（中文，简短）",
    }),
    leftPoints: z.array(
        z.string().min(2).max(30).meta({ description: "左栏要点（中文短句）" })
    ).min(2).max(4).default([
        '债券与货币基金为主，回撤可控',
        '年化波动率低于 5%',
        '适合追求本金安全的投资者',
        '现金流稳定，流动性充裕',
    ]).meta({ description: "左栏对比要点列表" }),
    rightPoints: z.array(
        z.string().min(2).max(30).meta({ description: "右栏要点（中文短句）" })
    ).min(2).max(4).default([
        '权益类资产占比超七成，弹性更高',
        '长期年化收益目标 12% 以上',
        '适合风险承受能力较强的投资者',
        '把握成长赛道的超额回报',
    ]).meta({ description: "右栏对比要点列表" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Comparison: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '两类资产配置对比'
    const leftTitle = slideData?.leftTitle || '稳健型组合'
    const rightTitle = slideData?.rightTitle || '进取型组合'
    const leftPoints = slideData?.leftPoints || []
    const rightPoints = slideData?.rightPoints || []

    const checkIcon = 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/diamond-bold.svg'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰层：数据网格 + 增长曲线 + 细金线 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="finCmpGold" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                                <stop offset="50%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.55" />
                                <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="finCmpCurve" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.30" />
                                <stop offset="100%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0" />
                            </linearGradient>
                            <pattern id="finCmpGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--stroke,#334155)" strokeOpacity="0.35" strokeWidth="1" />
                            </pattern>
                            <radialGradient id="finCmpGlow" cx="50%" cy="38%" r="55%">
                                <stop offset="0%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--secondary-color,#60a5fa)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        {/* 数据网格母题 */}
                        <rect width="1280" height="720" fill="url(#finCmpGrid)" />
                        <rect width="1280" height="720" fill="url(#finCmpGlow)" />
                        {/* 增长曲线母题 */}
                        <path d="M -40 600 C 220 560 360 420 560 380 S 940 300 1320 140" fill="none" stroke="url(#finCmpCurve)" strokeWidth="2.5" />
                        <path d="M -40 660 C 240 640 420 520 620 470 S 1000 380 1320 220" fill="none" stroke="var(--secondary-color,#60a5fa)" strokeOpacity="0.10" strokeWidth="1.5" />
                        {/* 顶部细金线 */}
                        <line x1="0" y1="2" x2="1280" y2="2" stroke="url(#finCmpGold)" strokeWidth="2" />
                    </svg>
                    {/* 棱形角标装饰 */}
                    <div
                        className="absolute"
                        style={{
                            top: '7%', right: '6%', width: '18px', height: '18px',
                            transform: 'rotate(45deg)',
                            border: '1.5px solid var(--primary-color,#d4af37)', opacity: 0.55,
                        }}
                    />
                    <div
                        className="absolute"
                        style={{
                            top: '7%', right: '4.4%', width: '8px', height: '8px',
                            transform: 'rotate(45deg)',
                            background: 'var(--primary-color,#d4af37)', opacity: 0.7,
                        }}
                    />
                </div>

                {/* 内容层 */}
                <div className="relative z-10 flex h-full flex-col px-16 py-10">
                    {/* 标题区 */}
                    <div className="flex flex-col items-center text-center">
                        <span
                            className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase break-words"
                            style={{ color: "var(--primary-color,#d4af37)", letterSpacing: '0.18em', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            <span style={{ width: '24px', height: '1px', background: 'var(--primary-color,#d4af37)', opacity: 0.7 }} />
                            COMPARISON
                            <span style={{ width: '24px', height: '1px', background: 'var(--primary-color,#d4af37)', opacity: 0.7 }} />
                        </span>
                        <h1
                            className="text-4xl font-bold leading-[1.3] break-words"
                            style={{
                                color: "var(--background-text,#e2e8f0)",
                                fontFamily: "var(--heading-font-family, Georgia, 'Songti SC', serif)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>
                        <div className="mt-4 h-px w-28 rounded-full" style={{ background: "var(--primary-color,#d4af37)" }} />
                    </div>

                    {/* 左右对比区 */}
                    <div className="mt-8 grid flex-1 grid-cols-[1fr_auto_1fr] items-stretch gap-6">
                        {/* 左栏 */}
                        <div
                            className="flex flex-col rounded-2xl border p-7"
                            style={{
                                background: "var(--card-color,#1e293b)",
                                borderColor: "var(--stroke,#334155)",
                                boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center"
                                    style={{
                                        background: 'rgba(96,165,250,0.14)',
                                        border: '1px solid var(--secondary-color,#60a5fa)',
                                        transform: 'rotate(45deg)',
                                    }}
                                >
                                    <span style={{ transform: 'rotate(-45deg)', fontFamily: "Georgia, serif", fontWeight: 700, color: "var(--secondary-color,#60a5fa)" }}>A</span>
                                </span>
                                <h2
                                    className="text-2xl font-bold leading-[1.3] break-words"
                                    style={{
                                        color: "var(--secondary-color,#60a5fa)",
                                        fontFamily: "var(--heading-font-family, Georgia, 'Songti SC', serif)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {leftTitle}
                                </h2>
                            </div>
                            <div className="mt-5 h-px w-full" style={{ background: "var(--stroke,#334155)" }} />
                            <ul className="mt-5 flex flex-1 flex-col justify-center gap-4">
                                {leftPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-1.5 flex-shrink-0"
                                            style={{ width: '9px', height: '9px', transform: 'rotate(45deg)', background: "var(--secondary-color,#60a5fa)" }}
                                        />
                                        <span
                                            className="text-base leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#e2e8f0)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 中间 VS 菱形分隔 */}
                        <div className="flex flex-col items-center justify-center px-1">
                            <div className="w-px flex-1" style={{ background: 'linear-gradient(to bottom, transparent, var(--primary-color,#d4af37), transparent)', opacity: 0.55 }} />
                            <div
                                className="my-3 flex flex-shrink-0 items-center justify-center"
                                style={{
                                    width: '56px', height: '56px',
                                    transform: 'rotate(45deg)',
                                    background: "var(--card-color,#1e293b)",
                                    border: '1.5px solid var(--primary-color,#d4af37)',
                                    boxShadow: '0 0 0 6px rgba(212,175,55,0.10)',
                                }}
                            >
                                <span
                                    className="flex items-center gap-1"
                                    style={{ transform: 'rotate(-45deg)' }}
                                >
                                    <RemoteSvgIcon
                                        url={checkIcon}
                                        strokeColor="currentColor"
                                        color="var(--primary-color,#d4af37)"
                                        className="w-4 h-4"
                                        title="对比"
                                    />
                                </span>
                            </div>
                            <span
                                className="text-sm font-bold"
                                style={{ color: "var(--primary-color,#d4af37)", fontFamily: "Georgia, serif", letterSpacing: '0.1em' }}
                            >
                                VS
                            </span>
                            <div className="w-px flex-1" style={{ background: 'linear-gradient(to bottom, transparent, var(--primary-color,#d4af37), transparent)', opacity: 0.55 }} />
                        </div>

                        {/* 右栏 */}
                        <div
                            className="flex flex-col rounded-2xl border p-7"
                            style={{
                                background: "var(--card-color,#1e293b)",
                                borderColor: "var(--primary-color,#d4af37)",
                                boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center"
                                    style={{
                                        background: 'rgba(212,175,55,0.14)',
                                        border: '1px solid var(--primary-color,#d4af37)',
                                        transform: 'rotate(45deg)',
                                    }}
                                >
                                    <span style={{ transform: 'rotate(-45deg)', fontFamily: "Georgia, serif", fontWeight: 700, color: "var(--primary-color,#d4af37)" }}>B</span>
                                </span>
                                <h2
                                    className="text-2xl font-bold leading-[1.3] break-words"
                                    style={{
                                        color: "var(--primary-color,#d4af37)",
                                        fontFamily: "var(--heading-font-family, Georgia, 'Songti SC', serif)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {rightTitle}
                                </h2>
                            </div>
                            <div className="mt-5 h-px w-full" style={{ background: "var(--primary-color,#d4af37)", opacity: 0.4 }} />
                            <ul className="mt-5 flex flex-1 flex-col justify-center gap-4">
                                {rightPoints.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span
                                            className="mt-1.5 flex-shrink-0"
                                            style={{ width: '9px', height: '9px', transform: 'rotate(45deg)', background: "var(--primary-color,#d4af37)" }}
                                        />
                                        <span
                                            className="text-base leading-[1.7] break-words"
                                            style={{ color: "var(--background-text,#e2e8f0)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comparison
