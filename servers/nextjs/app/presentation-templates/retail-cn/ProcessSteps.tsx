import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'retail-cn-process-steps'
export const layoutName = '流程步骤'
export const layoutDescription = '电商新零售流程步骤页：编号管线步骤卡片，撞色色块 + 圆角卡片 + 价签母题，步骤间用纯 CSS 箭头/连接线衔接。潮流粗体、强对比，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('从种草到复购的增长链路').meta({
        description: "流程页主标题（中文，简短有力，≤20字）",
    }),
    subtitle: z.string().min(2).max(36).default('围绕用户全生命周期，打通公域引流与私域留存').meta({
        description: "副标题，一句话补充说明流程目标（可选）",
    }),
    steps: z.array(z.object({
        title: z.string().min(2).max(14).meta({ description: "步骤名称（中文，≤14字）" }),
        desc: z.string().min(2).max(36).meta({ description: "步骤说明（中文，≤36字）" }),
        icon: IconSchema.optional().meta({ description: "步骤图标（可选）" }),
    })).min(3).max(5).default([
        {
            title: '内容种草',
            desc: '短视频+达人带货精准触达兴趣人群，沉淀公域流量',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/megaphone-bold.svg',
                __icon_query__: 'megaphone marketing',
            },
        },
        {
            title: '爆品转化',
            desc: '限时秒杀与满减券组合，缩短决策路径拉高客单',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/shopping-cart-bold.svg',
                __icon_query__: 'shopping cart',
            },
        },
        {
            title: '履约交付',
            desc: '前置仓极速达，全链路物流可视，体验更省心',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/truck-bold.svg',
                __icon_query__: 'delivery truck',
            },
        },
        {
            title: '私域沉淀',
            desc: '导购企微+社群运营，把成交用户转为长期会员',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-three-bold.svg',
                __icon_query__: 'community members',
            },
        },
        {
            title: '复购裂变',
            desc: '会员积分与拼团裂变激活老客，撬动口碑增长',
            icon: {
                __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/repeat-bold.svg',
                __icon_query__: 'repeat purchase loop',
            },
        },
    ]).meta({ description: "流程步骤列表（3-5 步）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ProcessSteps: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '从种草到复购的增长链路'
    const subtitle = slideData?.subtitle || '围绕用户全生命周期，打通公域引流与私域留存'
    const steps = (slideData?.steps && slideData.steps.length > 0 ? slideData.steps : [
        { title: '内容种草', desc: '短视频+达人带货精准触达兴趣人群，沉淀公域流量' },
        { title: '爆品转化', desc: '限时秒杀与满减券组合，缩短决策路径拉高客单' },
        { title: '履约交付', desc: '前置仓极速达，全链路物流可视，体验更省心' },
        { title: '私域沉淀', desc: '导购企微+社群运营，把成交用户转为长期会员' },
        { title: '复购裂变', desc: '会员积分与拼团裂变激活老客，撬动口碑增长' },
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
                    background: "var(--background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景装饰：撞色大色块 + 活力几何形 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    {/* 左上撞色粉色块 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-120px', left: '-120px', width: '380px', height: '380px',
                            borderRadius: '9999px',
                            background: "var(--primary-color,#db2777)", opacity: 0.10,
                        }}
                    />
                    {/* 右下活力橙色斜块 */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '-160px', right: '-80px', width: '420px', height: '420px',
                            borderRadius: '64px', transform: 'rotate(18deg)',
                            background: "var(--secondary-color,#f59e0b)", opacity: 0.10,
                        }}
                    />
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="retailStepDot" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--primary-color,#db2777)" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="var(--secondary-color,#f59e0b)" stopOpacity="0.10" />
                            </linearGradient>
                        </defs>
                        {/* 潮流几何点阵 */}
                        {[0, 1, 2, 3].map((r) => (
                            [0, 1, 2, 3].map((c) => (
                                <circle key={`${r}-${c}`} cx={920 + c * 28} cy={60 + r * 28} r="3" fill="url(#retailStepDot)" />
                            ))
                        ))}
                    </svg>
                </div>

                <div className="relative z-10 flex h-full w-full flex-col px-16 py-12">
                    {/* 顶部：价签母题标签 + 标题 */}
                    <div className="flex flex-shrink-0 flex-col">
                        <span
                            className="mb-4 inline-flex w-fit items-center gap-2 rounded-md px-4 py-1.5 text-sm font-bold break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                background: "var(--primary-color,#db2777)",
                                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 14px 100%, 0% 50%)',
                                paddingLeft: '20px',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            新零售增长方法论
                        </span>
                        <div className="flex items-end gap-4">
                            <h1
                                className="text-5xl font-black leading-[1.2] break-words"
                                style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {title}
                            </h1>
                            <span
                                className="mb-2 h-2 flex-shrink-0 w-16 rounded-full"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            />
                        </div>
                        <p
                            className="mt-3 max-w-[44rem] text-lg leading-relaxed break-words"
                            style={{ color: "var(--background-text,#18181b)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle}
                        </p>
                    </div>

                    {/* 步骤区：圆角卡片 + 编号 + 箭头连接线 */}
                    <div className="mt-auto flex flex-1 items-stretch gap-3 pt-10">
                        {steps.map((step, i) => {
                            const num = String(i + 1).padStart(2, '0')
                            const icon = (step as any)?.icon
                            const isLast = i === steps.length - 1
                            return (
                                <React.Fragment key={i}>
                                    <div
                                        className="flex flex-1 flex-col rounded-2xl border-2 p-5"
                                        style={{
                                            background: "var(--card-color,#fdf2f8)",
                                            borderColor: "var(--stroke,#fbcfe8)",
                                        }}
                                    >
                                        {/* 编号 + 图标徽章 */}
                                        <div className="flex items-center justify-between">
                                            <span
                                                className="text-3xl font-black leading-none"
                                                style={{ color: "var(--primary-color,#db2777)" }}
                                            >
                                                {num}
                                            </span>
                                            <span
                                                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                                                style={{
                                                    background: "var(--primary-color,#db2777)",
                                                    boxShadow: '0 6px 16px rgba(219,39,119,0.28)',
                                                }}
                                            >
                                                {icon?.__icon_url__ ? (
                                                    <RemoteSvgIcon
                                                        url={icon.__icon_url__}
                                                        strokeColor="currentColor"
                                                        color="var(--primary-text,#ffffff)"
                                                        className="w-6 h-6"
                                                        title={icon.__icon_query__}
                                                    />
                                                ) : (
                                                    <span
                                                        className="h-3 w-3 rounded-full"
                                                        style={{ background: "var(--primary-text,#ffffff)" }}
                                                    />
                                                )}
                                            </span>
                                        </div>

                                        {/* 撞色分隔条 */}
                                        <div
                                            className="my-4 h-1 w-10 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                                        />

                                        <h3
                                            className="text-xl font-black leading-[1.3] break-words"
                                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {step?.title}
                                        </h3>
                                        <p
                                            className="mt-2 text-sm leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#18181b)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {step?.desc}
                                        </p>
                                    </div>

                                    {/* 步骤间箭头连接线（纯 CSS） */}
                                    {!isLast && (
                                        <div className="flex flex-shrink-0 items-center justify-center">
                                            <span
                                                className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-black"
                                                style={{
                                                    background: "var(--secondary-color,#f59e0b)",
                                                    color: "var(--primary-text,#ffffff)",
                                                }}
                                            >
                                                {'›'}
                                            </span>
                                        </div>
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProcessSteps
