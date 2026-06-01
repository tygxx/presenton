import React from 'react'
import * as z from "zod";

export const layoutId = 'culture-cn-cover'
export const layoutName = '封面'
export const layoutDescription = '国潮文创封面：宣纸米黄底 + 朱砂印章红块 + 水墨笔触与描金边，竖排点缀的东方雅致气质。主标题、副标题、汇报人、日期、机构。纯 CSS/SVG 装饰，无图片，离线可渲染。'

const schema = z.object({
    eyebrow: z.string().min(2).max(18).default('国潮文创 · 壹').meta({
        description: "标题上方的小标签/分类，如『国潮文创』『非遗新生』",
    }),
    title: z.string().min(2).max(20).default('器以载道').meta({
        description: "封面主标题（中文，简短有力，宜四字成语或短句）",
    }),
    subtitle: z.string().min(4).max(44).default('以东方美学重塑当代生活的器物与器度').meta({
        description: "副标题，一句话补充说明",
    }),
    presenterName: z.string().min(2).max(16).default('沈砚之').meta({
        description: "汇报人姓名",
    }),
    presentationDate: z.string().min(2).max(22).default('丙午年 · 2026年仲春').meta({
        description: "汇报日期",
    }),
    organization: z.string().min(2).max(26).default('归墨文创工作室').meta({
        description: "公司、机构或部门名称",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Cover: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '国潮文创 · 壹'
    const title = slideData?.title || '器以载道'
    const subtitle = slideData?.subtitle || '以东方美学重塑当代生活的器物与器度'
    const presenterName = slideData?.presenterName || '沈砚之'
    const presentationDate = slideData?.presentationDate || '丙午年 · 2026年仲春'
    const organization = slideData?.organization || '归墨文创工作室'
    const seal = presenterName.trim().slice(0, 2)

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
                {/* 宣纸纹理与底色晕染 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(120% 90% at 12% 8%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 46%)," +
                            "radial-gradient(130% 100% at 92% 96%, rgba(192,57,43,0.06) 0%, rgba(192,57,43,0) 50%)",
                    }}
                    aria-hidden="true"
                />

                {/* 水墨笔触 + 传统纹样 + 描金弧线（背景装饰层） */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="cnInkWash" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.02" />
                        </linearGradient>
                        <linearGradient id="cnGold" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#c9a24b" stopOpacity="0.9" />
                            <stop offset="50%" stopColor="#e8cf8f" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#b8862f" stopOpacity="0.9" />
                        </linearGradient>
                        <pattern id="cnLattice" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                            <path d="M0 18 H36 M18 0 V36" stroke="#1a1a1a" strokeOpacity="0.05" strokeWidth="1" />
                        </pattern>
                    </defs>

                    {/* 右上角水墨笔触晕染 */}
                    <path
                        d="M980 -40 C1120 30 1260 60 1320 200 C1360 300 1300 360 1180 350 C1040 338 980 250 1000 150 C1012 88 960 40 980 -40 Z"
                        fill="url(#cnInkWash)"
                    />
                    <path
                        d="M1150 60 C1230 110 1300 130 1300 210 C1300 270 1240 280 1190 250 C1130 214 1120 130 1150 60 Z"
                        fill="#1a1a1a"
                        fillOpacity="0.10"
                    />

                    {/* 左下角传统回纹格栅 */}
                    <rect x="0" y="470" width="430" height="250" fill="url(#cnLattice)" />

                    {/* 描金长弧（贯穿留白） */}
                    <path
                        d="M-40 600 C320 470 760 540 1340 300"
                        fill="none"
                        stroke="url(#cnGold)"
                        strokeWidth="2.5"
                        strokeOpacity="0.7"
                    />
                    <path
                        d="M-40 642 C300 530 720 600 1340 380"
                        fill="none"
                        stroke="url(#cnGold)"
                        strokeWidth="1.2"
                        strokeOpacity="0.4"
                    />

                    {/* 底部水墨墨点（远山意象） */}
                    <path
                        d="M520 690 C600 640 660 660 720 690 C760 668 820 668 880 690 Z"
                        fill="#1a1a1a"
                        fillOpacity="0.07"
                    />
                </svg>

                {/* 描金内边框（雅致包边） */}
                <div
                    className="absolute inset-5 rounded-sm pointer-events-none"
                    style={{ border: "1px solid var(--stroke,#ddd0b4)" }}
                    aria-hidden="true"
                />
                <div
                    className="absolute inset-[26px] rounded-sm pointer-events-none"
                    style={{ border: "1px solid rgba(201,162,75,0.55)" }}
                    aria-hidden="true"
                />

                {/* 主内容区 */}
                <div className="relative z-10 flex h-full w-full items-stretch pl-20 pr-16 py-16 gap-12">
                    {/* 左：竖排标签 + 印章 */}
                    <div className="flex flex-col items-center justify-between flex-shrink-0">
                        {/* 竖排小标签 */}
                        <span
                            className="text-base font-medium leading-loose break-words"
                            style={{
                                writingMode: 'vertical-rl',
                                letterSpacing: '0.35em',
                                color: "var(--background-text,#2b2b2b)",
                                opacity: 0.8,
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {eyebrow}
                        </span>

                        {/* 朱砂印章红块 */}
                        <div
                            className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[6px]"
                            style={{
                                background: "var(--primary-color,#c0392b)",
                                boxShadow: '0 6px 18px rgba(192,57,43,0.28)',
                            }}
                        >
                            <span
                                className="text-2xl font-black leading-[1.2] break-words"
                                style={{
                                    writingMode: 'vertical-rl',
                                    color: "var(--primary-text,#ffffff)",
                                    letterSpacing: '0.12em',
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {seal}
                            </span>
                        </div>
                    </div>

                    {/* 中：墨色竖线分隔 */}
                    <div
                        className="w-px flex-shrink-0 self-stretch"
                        style={{ background: "linear-gradient(to bottom, rgba(26,26,26,0) 0%, rgba(26,26,26,0.18) 22%, rgba(26,26,26,0.18) 78%, rgba(26,26,26,0) 100%)" }}
                        aria-hidden="true"
                    />

                    {/* 右：主文案 */}
                    <div className="flex flex-1 flex-col justify-center min-w-0">
                        <h1
                            className="text-7xl font-black leading-[1.25] break-words"
                            style={{
                                color: "var(--secondary-color,#1a1a1a)",
                                letterSpacing: '0.06em',
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        {/* 朱砂短笔触 + 描金点 */}
                        <div className="mt-7 mb-7 flex items-center gap-3">
                            <div
                                className="h-1.5 w-20 rounded-full"
                                style={{ background: "var(--primary-color,#c0392b)" }}
                            />
                            <div
                                className="h-2 w-2 rounded-full"
                                style={{ background: "rgba(201,162,75,0.95)" }}
                            />
                        </div>

                        <p
                            className="max-w-[40rem] text-2xl leading-loose break-words"
                            style={{
                                color: "var(--background-text,#2b2b2b)",
                                opacity: 0.9,
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                            {subtitle}
                        </p>

                        {/* 汇报人 / 机构 / 日期 */}
                        <div
                            className="mt-14 flex items-center gap-5 rounded-md px-6 py-4 w-fit max-w-full"
                            style={{
                                background: "var(--card-color,#fbf5e9)",
                                border: "1px solid var(--stroke,#ddd0b4)",
                                boxShadow: '0 6px 20px rgba(43,43,43,0.06)',
                            }}
                        >
                            <div
                                className="h-10 w-1 flex-shrink-0 rounded-full"
                                style={{ background: "var(--primary-color,#c0392b)" }}
                                aria-hidden="true"
                            />
                            <div className="flex flex-col leading-relaxed min-w-0">
                                <span
                                    className="text-lg font-bold leading-relaxed break-words"
                                    style={{ color: "var(--secondary-color,#1a1a1a)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {presenterName}
                                    <span
                                        className="ml-3 text-base font-normal"
                                        style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.7 }}
                                    >
                                        {organization}
                                    </span>
                                </span>
                                <span
                                    className="text-sm leading-relaxed break-words"
                                    style={{ color: "var(--background-text,#2b2b2b)", opacity: 0.65, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {presentationDate}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cover
