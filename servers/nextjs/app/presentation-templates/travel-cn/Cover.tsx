import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'travel-cn-cover'
export const layoutName = '封面'
export const layoutDescription = '旅游文旅风封面：明媚海蓝渐变背景 + 暖阳橙点缀 + 风景大图与轻盈目的地卡片，指南针与路线点装饰。纯 CSS/SVG 营造氛围，离线可渲染。'

const schema = z.object({
    eyebrow: z.string().min(2).max(18).default('文旅推介 · 2026').meta({
        description: "标题上方的小标签/分类，如『目的地推介』『旅游季』",
    }),
    title: z.string().min(2).max(20).default('遇见远方的海岸').meta({
        description: "封面主标题（中文，简短有向往感）",
    }),
    subtitle: z.string().min(4).max(44).default('一段关于海风、暖阳与小城慢生活的旅程').meta({
        description: "副标题，一句话补充说明，营造向往氛围",
    }),
    presenterName: z.string().min(2).max(16).default('林晚晴').meta({
        description: "汇报人姓名",
    }),
    presentationDate: z.string().min(2).max(22).default('2026年盛夏').meta({
        description: "汇报日期",
    }),
    organization: z.string().min(2).max(26).default('远行文旅推广中心').meta({
        description: "机构或部门名称",
    }),
    coverImage: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "明媚海岸风光，碧蓝海水与金色沙滩，暖阳下的小城，旅行向往氛围",
    }).meta({ description: "封面右侧风景大图" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const Cover: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const eyebrow = slideData?.eyebrow || '文旅推介 · 2026'
    const title = slideData?.title || '遇见远方的海岸'
    const subtitle = slideData?.subtitle || '一段关于海风、暖阳与小城慢生活的旅程'
    const presenterName = slideData?.presenterName || '林晚晴'
    const presentationDate = slideData?.presentationDate || '2026年盛夏'
    const organization = slideData?.organization || '远行文旅推广中心'
    const coverImage = slideData?.coverImage?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const coverPrompt = slideData?.coverImage?.__image_prompt__ || '明媚海岸风光，碧蓝海水与金色沙滩'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#f0f9ff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景轻盈装饰：海蓝光晕 + 路线虚线 + 暖阳光斑 */}
                <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <radialGradient id="travelSunGlow" cx="18%" cy="14%" r="55%">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="travelSeaGlow" cx="42%" cy="92%" r="60%">
                            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.14" />
                            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="1280" height="720" fill="url(#travelSunGlow)" />
                    <rect width="1280" height="720" fill="url(#travelSeaGlow)" />
                    {/* 路线虚线（旅程感） */}
                    <path
                        d="M60 560 C 220 430, 360 600, 520 470 S 760 320, 700 200"
                        fill="none"
                        stroke="var(--primary-color,#0891b2)"
                        strokeOpacity="0.28"
                        strokeWidth="2.5"
                        strokeDasharray="2 12"
                        strokeLinecap="round"
                    />
                    {/* 路线点 */}
                    <circle cx="60" cy="560" r="6" fill="var(--secondary-color,#f59e0b)" />
                    <circle cx="520" cy="470" r="5" fill="var(--primary-color,#0891b2)" fillOpacity="0.55" />
                    <circle cx="700" cy="200" r="6" fill="var(--secondary-color,#f59e0b)" />
                </svg>

                <div className="relative z-10 flex h-full">
                    {/* 左侧主内容 */}
                    <div className="flex w-[55%] flex-shrink-0 flex-col justify-center pl-16 pr-10">
                        {/* eyebrow 标签 + 指南针图标 */}
                        <span
                            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#0891b2)",
                                background: "rgba(8,145,178,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/compass-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-color,#0891b2)"
                                className="w-4 h-4"
                                title="compass"
                            />
                            {eyebrow}
                        </span>

                        <h1
                            className="text-6xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div
                            className="my-7 h-1.5 w-24 rounded-full"
                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                        />

                        <p
                            className="max-w-[32rem] text-xl leading-relaxed break-words"
                            style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {subtitle}
                        </p>

                        {/* 汇报人信息 */}
                        <div className="mt-12 flex items-center gap-4">
                            <div
                                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                                style={{ background: "var(--primary-color,#0891b2)", color: "var(--primary-text,#ffffff)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/airplane-tilt-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-6 h-6"
                                    title="airplane"
                                />
                            </div>
                            <div className="flex flex-col leading-relaxed">
                                <span className="text-base font-bold break-words" style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    {presenterName}
                                    <span className="ml-2 font-normal" style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.65 }}>
                                        {organization}
                                    </span>
                                </span>
                                <span className="text-sm break-words leading-relaxed" style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.65, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                    {presentationDate}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 右侧风景大图区 */}
                    <div className="relative flex w-[45%] flex-shrink-0 items-center justify-center pr-12">
                        <div
                            className="relative w-full overflow-hidden rounded-3xl aspect-[3/4] shadow-lg"
                            style={{ border: "4px solid var(--card-color,#ffffff)" }}
                        >
                            <img
                                src={coverImage}
                                alt={coverPrompt}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            {/* 主题色渐变遮罩 */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(160deg, rgba(8,145,178,0.10) 0%, rgba(8,145,178,0.05) 40%, rgba(12,74,110,0.72) 100%)",
                                }}
                            />
                            {/* 底部轻盈目的地卡片 */}
                            <div className="absolute inset-x-4 bottom-4">
                                <div
                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 shadow-sm"
                                    style={{ background: "var(--card-color,#ffffff)", border: "1px solid var(--stroke,#bae6fd)" }}
                                >
                                    <div
                                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                                        style={{ background: "rgba(245,158,11,0.14)" }}
                                    >
                                        <RemoteSvgIcon
                                            url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/map-pin-bold.svg"
                                            strokeColor="currentColor"
                                            color="var(--secondary-color,#f59e0b)"
                                            className="w-5 h-5"
                                            title="map pin"
                                        />
                                    </div>
                                    <div className="flex min-w-0 flex-col leading-relaxed">
                                        <span className="text-sm font-bold break-words" style={{ color: "var(--background-text,#0c4a6e)", overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                            精选目的地
                                        </span>
                                        <span className="text-xs break-words leading-relaxed" style={{ color: "var(--background-text,#0c4a6e)", opacity: 0.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                            海岸线 · 古城 · 山海之间
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 暖阳橙强调圆点 */}
                        <div
                            className="absolute right-7 top-10 h-4 w-4 rounded-full"
                            style={{
                                background: "var(--secondary-color,#f59e0b)",
                                boxShadow: '0 0 0 6px rgba(245,158,11,0.18)',
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cover
