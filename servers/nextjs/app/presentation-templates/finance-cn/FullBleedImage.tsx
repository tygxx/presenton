import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'finance-cn-full-bleed-image'
export const layoutName = '全幅大图'
export const layoutDescription = '金融投资风全幅大图版式：满铺背景图叠加深藏青渐变遮罩，香槟金细线与棱形/数据网格装饰，衬线大标题居左下角，保证文字在任意图片上可读。'

const schema = z.object({
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "现代金融中心摩天大楼仰拍，玻璃幕墙映射城市天际线，冷静蓝调，高端商务质感",
    }).meta({ description: "满铺背景大图，建议用城市天际线/金融大楼/数据感场景" }),
    title: z.string().min(2).max(20).default('稳健配置，穿越周期').meta({
        description: "叠加在图片上的衬线大标题（中文，简短有力，≤20字）",
    }),
    subtitle: z.string().min(2).max(40).default('以长期主义视角，把握全球资产配置确定性机遇').meta({
        description: "副标题，一句话补充说明（可选，≤40字）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FullBleedImage: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = slideData?.image?.__image_prompt__ || "现代金融中心摩天大楼仰拍，玻璃幕墙映射城市天际线，冷静蓝调，高端商务质感"
    const title = slideData?.title || '稳健配置，穿越周期'
    const subtitle = slideData?.subtitle || '以长期主义视角，把握全球资产配置确定性机遇'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#0f172a)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 满铺背景图 */}
                <img
                    src={imageUrl}
                    alt={imagePrompt}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* 深藏青渐变遮罩：左下深、右上透，保证标题区文字可读 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(105deg, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.80) 38%, rgba(15,23,42,0.42) 66%, rgba(15,23,42,0.20) 100%)",
                    }}
                    aria-hidden="true"
                />
                {/* 底部加深，承托标题 */}
                <div
                    className="absolute inset-x-0 bottom-0 h-2/3"
                    style={{
                        background: "linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.45) 50%, rgba(15,23,42,0) 100%)",
                    }}
                    aria-hidden="true"
                />

                {/* 数据网格 + 增长曲线 + 棱形装饰母题 */}
                <svg
                    viewBox="0 0 1280 720"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="finFbGrowth" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0" />
                            <stop offset="100%" stopColor="var(--primary-color,#d4af37)" stopOpacity="0.55" />
                        </linearGradient>
                        <pattern id="finFbGrid" width="56" height="56" patternUnits="userSpaceOnUse">
                            <path d="M56 0H0V56" fill="none" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.10" strokeWidth="1" />
                        </pattern>
                    </defs>
                    {/* 右上角数据网格 */}
                    <rect x="760" y="0" width="520" height="320" fill="url(#finFbGrid)" />
                    {/* 香槟金细线 */}
                    <line x1="0" y1="120" x2="1280" y2="120" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.16" strokeWidth="1" />
                    <line x1="980" y1="0" x2="980" y2="720" stroke="var(--primary-color,#d4af37)" strokeOpacity="0.12" strokeWidth="1" />
                    {/* 增长曲线 */}
                    <path
                        d="M780 300 L860 268 L940 286 L1020 220 L1100 240 L1180 168 L1260 196"
                        fill="none"
                        stroke="var(--primary-color,#d4af37)"
                        strokeOpacity="0.55"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M780 300 L860 268 L940 286 L1020 220 L1100 240 L1180 168 L1260 196 L1260 320 L780 320 Z"
                        fill="url(#finFbGrowth)"
                    />
                    {[
                        [860, 268], [1020, 220], [1180, 168],
                    ].map(([cx, cy], i) => (
                        <circle key={i} cx={cx} cy={cy} r="3.5" fill="var(--primary-color,#d4af37)" />
                    ))}
                    {/* 棱形母题 */}
                    {[
                        [1150, 470, 9], [1210, 520, 6], [1095, 540, 5],
                    ].map(([cx, cy, r], i) => (
                        <rect
                            key={`d-${i}`}
                            x={cx - r}
                            y={cy - r}
                            width={r * 2}
                            height={r * 2}
                            fill="none"
                            stroke="var(--primary-color,#d4af37)"
                            strokeOpacity="0.30"
                            strokeWidth="1.5"
                            transform={`rotate(45 ${cx} ${cy})`}
                        />
                    ))}
                </svg>

                {/* 内容层：标题居左下角 */}
                <div className="relative z-10 flex h-full flex-col justify-end px-16 pb-16">
                    {/* 顶部小标识：细金线 + 棱形 + 标签 */}
                    <div className="absolute left-16 top-12 flex items-center gap-3">
                        <span
                            className="inline-block h-2.5 w-2.5"
                            style={{
                                background: "var(--primary-color,#d4af37)",
                                transform: 'rotate(45deg)',
                            }}
                        />
                        <span
                            className="text-sm font-medium tracking-wide break-words"
                            style={{
                                color: "var(--primary-color,#d4af37)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            FINANCE · 资产配置展望
                        </span>
                    </div>

                    {/* 金色短线 */}
                    <div
                        className="mb-6 h-1 w-20 rounded-full"
                        style={{ background: "var(--primary-color,#d4af37)" }}
                    />

                    <h1
                        className="max-w-[44rem] text-6xl font-black leading-[1.25] break-words"
                        style={{
                            color: "var(--primary-text,#ffffff)",
                            fontFamily: "var(--heading-font-family,'Noto Serif SC')",
                            textShadow: '0 2px 18px rgba(15,23,42,0.65)',
                            overflowWrap: 'break-word', wordBreak: 'break-word',
                        }}
                    >
                        {title}
                    </h1>

                    {subtitle && (
                        <p
                            className="mt-5 max-w-[40rem] text-xl leading-relaxed break-words"
                            style={{
                                color: "var(--background-text,#e2e8f0)",
                                opacity: 0.92,
                                textShadow: '0 1px 12px rgba(15,23,42,0.6)',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default FullBleedImage
