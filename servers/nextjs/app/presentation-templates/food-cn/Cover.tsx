import React from 'react'
import * as z from "zod";
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'food-cn-cover'
export const layoutName = '封面'
export const layoutDescription = '美食餐饮风封面：暖米底 + 食欲橙红圆盘构图，焦糖金描边圆环、暖色光晕与餐具点缀，承载主标题、副标题、汇报人、日期与机构。纯 CSS/SVG 装饰，无需图片，离线可渲染。'

const schema = z.object({
    eyebrow: z.string().min(2).max(18).default('风味之旅 · 2026').meta({
        description: "标题上方的小标签/分类，如『新品发布』『招牌菜单』",
    }),
    title: z.string().min(2).max(20).default('舌尖上的匠心之味').meta({
        description: "封面主标题（中文，简短有食欲）",
    }),
    subtitle: z.string().min(4).max(44).default('精选当季食材，慢火细炖每一份温暖滋味').meta({
        description: "副标题，一句话补充说明",
    }),
    presenterName: z.string().min(2).max(16).default('林晚晴').meta({
        description: "汇报人姓名",
    }),
    presentationDate: z.string().min(2).max(22).default('2026年5月').meta({
        description: "汇报日期",
    }),
    organization: z.string().min(2).max(26).default('鼎香餐饮品牌中心').meta({
        description: "餐厅品牌或部门名称",
    }),
    accentIcon: z.object({
        __icon_url__: z.string().meta({ description: "餐饮主题图标 URL" }),
        __icon_query__: z.string().min(2).max(40).meta({ description: "图标英文检索词" }),
    }).default({
        __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg",
        __icon_query__: "fork knife dining",
    }).meta({ description: "封面圆盘中心的餐饮装饰图标" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Cover: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow ?? '风味之旅 · 2026'
    const title = slideData?.title ?? '舌尖上的匠心之味'
    const subtitle = slideData?.subtitle ?? '精选当季食材，慢火细炖每一份温暖滋味'
    const presenterName = slideData?.presenterName ?? '林晚晴'
    const presentationDate = slideData?.presentationDate ?? '2026年5月'
    const organization = slideData?.organization ?? '鼎香餐饮品牌中心'
    const accentIcon = slideData?.accentIcon ?? {
        __icon_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg",
        __icon_query__: "fork knife dining",
    }
    const initials = (presenterName || '林晚晴').trim().slice(0, 2)

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#fdf6ec)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景暖色光晕装饰层 */}
                <div className="absolute inset-0" aria-hidden="true">
                    <div
                        className="absolute -top-32 -left-28 h-[26rem] w-[26rem] rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(232,89,12,0.16) 0%, rgba(232,89,12,0) 70%)" }}
                    />
                    <div
                        className="absolute -bottom-36 left-[26%] h-[24rem] w-[24rem] rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(201,42,42,0.10) 0%, rgba(201,42,42,0) 70%)" }}
                    />
                </div>

                {/* 右侧圆盘构图装饰面板 */}
                <div
                    className="absolute top-0 right-0 h-full w-[44%] overflow-hidden"
                    style={{
                        background: "linear-gradient(150deg, var(--primary-color,#e8590c) 0%, var(--secondary-color,#c92a2a) 100%)",
                    }}
                >
                    <svg viewBox="0 0 440 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                        <defs>
                            <linearGradient id="foodCoverGlow" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <rect width="440" height="720" fill="url(#foodCoverGlow)" />
                        {/* 焦糖金同心圆盘描边 */}
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <circle key={i} cx="250" cy="360" r={80 + i * 48} fill="none" stroke="#ffe3b3" strokeOpacity={0.22 - i * 0.025} strokeWidth="2" />
                        ))}
                        {/* 圆盘内圈虚线（餐盘描边母题） */}
                        <circle cx="250" cy="360" r="128" fill="none" stroke="#ffe3b3" strokeOpacity="0.45" strokeWidth="2.5" strokeDasharray="6 10" />
                    </svg>

                    {/* 圆盘中心餐饮图标 */}
                    <div
                        className="absolute flex items-center justify-center rounded-full"
                        style={{
                            top: '50%', left: '57%', transform: 'translate(-50%, -50%)',
                            width: '128px', height: '128px',
                            background: "var(--card-color,#fffaf2)",
                            boxShadow: '0 12px 32px rgba(123,30,8,0.28)',
                        }}
                    >
                        <RemoteSvgIcon
                            url={accentIcon.__icon_url__}
                            strokeColor="currentColor"
                            color="var(--primary-color,#e8590c)"
                            className="w-14 h-14"
                            title={accentIcon.__icon_query__}
                        />
                    </div>

                    {/* 暖色块点缀 */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            top: '16%', right: '20%', width: '64px', height: '64px',
                            background: "rgba(255,227,179,0.30)",
                        }}
                    />
                    <div
                        className="absolute rounded-full"
                        style={{
                            bottom: '14%', left: '14%', width: '40px', height: '40px',
                            background: "rgba(255,227,179,0.22)",
                        }}
                    />
                    {/* 焦糖金强调点 */}
                    <div
                        className="absolute"
                        style={{
                            top: '70%', right: '24%', width: '14px', height: '14px', borderRadius: '9999px',
                            background: "var(--card-color,#fffaf2)",
                            boxShadow: '0 0 0 6px rgba(255,227,179,0.25)',
                        }}
                    />
                </div>

                {/* 左侧主内容 */}
                <div className="relative z-10 flex h-full w-[60%] flex-col justify-center pl-16 pr-8">
                    <span
                        className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide break-words"
                        style={{
                            color: "var(--primary-text,#ffffff)",
                            background: "linear-gradient(135deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))",
                            boxShadow: '0 6px 16px rgba(232,89,12,0.22)',
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        <span
                            className="inline-block h-1.5 w-1.5 rounded-full"
                            style={{ background: "var(--card-color,#fffaf2)" }}
                        />
                        {eyebrow}
                    </span>

                    <h1
                        className="text-6xl font-black leading-[1.25] break-words"
                        style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {title}
                    </h1>

                    <div
                        className="my-7 h-1.5 w-24 rounded-full"
                        style={{ background: "linear-gradient(90deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))" }}
                    />

                    <p
                        className="max-w-[34rem] text-xl leading-relaxed break-words"
                        style={{ color: "var(--background-text,#3b2412)", opacity: 0.85, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    >
                        {subtitle}
                    </p>

                    {/* 汇报人信息 */}
                    <div className="mt-12 flex items-center gap-4">
                        <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-base font-bold"
                            style={{
                                background: "linear-gradient(135deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))",
                                color: "var(--primary-text,#ffffff)",
                                boxShadow: '0 6px 16px rgba(201,42,42,0.22)',
                            }}
                        >
                            {initials}
                        </div>
                        <div className="flex flex-col leading-relaxed">
                            <span className="text-base font-bold break-words" style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                {presenterName}
                                <span className="ml-2 font-normal" style={{ color: "var(--background-text,#3b2412)", opacity: 0.65 }}>
                                    {organization}
                                </span>
                            </span>
                            <span className="text-sm break-words" style={{ color: "var(--background-text,#3b2412)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                {presentationDate}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cover
