import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'retail-cn-image-right'
export const layoutName = '图文（右图）'
export const layoutDescription = '电商新零售图文页（右图）：左侧潮流粗体标题/正文/活力要点，右侧大图配价签角标与撞色色块装饰。主题色自动跟随，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('爆款上新 即刻种草').meta({
        description: "图文页主标题（中文，潮流有冲击力）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落（中文，一句话讲清卖点）" })
    ).min(1).max(3).default([
        '从社交种草到一键下单，全域流量精准触达年轻消费者。',
        '会员私域 + 直播带货双引擎，让每一次曝光都高效转化。',
    ]).meta({ description: "正文段落列表，1-3 段" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "活力要点（中文，短促有力，可空）" })
    ).max(3).default([
        '全渠道一盘货',
        '智能选品上新',
        '即时配送到家',
    ]).meta({ description: "右图下方活力要点标签，最多 3 条，可空" }),
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '潮流时尚电商购物场景，年轻人手持手机扫码购物，明亮活力撞色，新零售门店货架',
    }).meta({ description: "右侧主图片" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageRight: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '爆款上新 即刻种草'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : ['从社交种草到一键下单，全域流量精准触达年轻消费者。', '会员私域 + 直播带货双引擎，让每一次曝光都高效转化。']
    const bullets = slideData?.bullets || []
    const imageUrl = slideData?.image?.__image_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png'
    const imagePrompt = slideData?.image?.__image_prompt__ || '潮流时尚电商购物场景'

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
                {/* 背景活力几何装饰层 */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                    {/* 左上撞色色块 */}
                    <div
                        className="absolute"
                        style={{
                            top: '-90px', left: '-70px', width: '260px', height: '260px', borderRadius: '40px',
                            transform: 'rotate(18deg)',
                            background: "var(--card-color,#fdf2f8)",
                        }}
                    />
                    {/* 左下活力圆点 */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '-70px', left: '34%', width: '150px', height: '150px', borderRadius: '9999px',
                            background: "var(--secondary-color,#f59e0b)", opacity: 0.14,
                        }}
                    />
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <circle cx="120" cy="540" r="6" fill="var(--primary-color,#db2777)" opacity="0.5" />
                        <circle cx="150" cy="560" r="4" fill="var(--secondary-color,#f59e0b)" opacity="0.6" />
                        <circle cx="96" cy="566" r="4" fill="var(--secondary-color,#f59e0b)" opacity="0.5" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full items-center gap-12 px-16 py-12">
                    {/* 左侧：文案区 */}
                    <div className="flex w-[46%] flex-shrink-0 flex-col justify-center">
                        {/* 撞色标签 */}
                        <span
                            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                background: "var(--primary-color,#db2777)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightning-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-4 h-4"
                                title="lightning"
                            />
                            新零售 · 全域增长
                        </span>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        {/* 撞色双色下划线 */}
                        <div className="mt-6 mb-7 flex items-center gap-2">
                            <div className="h-1.5 w-16 rounded-full" style={{ background: "var(--primary-color,#db2777)" }} />
                            <div className="h-1.5 w-8 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                        </div>

                        <div className="space-y-4">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#18181b)", opacity: 0.86, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 活力要点标签 */}
                        {bullets.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-3">
                                {bullets.map((b, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold leading-relaxed break-words"
                                        style={{
                                            color: "var(--primary-color,#db2777)",
                                            background: "var(--card-color,#fdf2f8)",
                                            border: "2px solid var(--stroke,#fbcfe8)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        <span
                                            className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                            style={{ background: "var(--secondary-color,#f59e0b)" }}
                                        />
                                        {b}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 右侧：圆角卡片大图 + 价签角标 */}
                    <div className="relative flex flex-1 items-center justify-center">
                        {/* 卡片背后撞色色块 */}
                        <div
                            className="absolute z-0"
                            style={{
                                top: '24px', right: '-18px', bottom: '24px', left: '34px',
                                borderRadius: '28px',
                                background: "var(--secondary-color,#f59e0b)", opacity: 0.18,
                                transform: 'rotate(3deg)',
                            }}
                            aria-hidden="true"
                        />

                        <div
                            className="relative z-10 w-full overflow-hidden rounded-3xl shadow-lg"
                            style={{ border: "4px solid var(--card-color,#fdf2f8)" }}
                        >
                            <div className="relative w-full" style={{ aspectRatio: '4 / 5' }}>
                                <img
                                    src={imageUrl}
                                    alt={imagePrompt}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                {/* 主题色渐变遮罩 */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: "linear-gradient(150deg, rgba(219,39,119,0.30) 0%, rgba(219,39,119,0) 42%, rgba(24,24,27,0.42) 100%)",
                                    }}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>

                        {/* 价签角标 */}
                        <div
                            className="absolute z-20 flex items-center gap-2 rounded-2xl px-5 py-3 shadow-lg"
                            style={{
                                top: '8px', right: '-6px',
                                background: "var(--primary-color,#db2777)",
                                transform: 'rotate(-4deg)',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/tag-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-5 h-5"
                                title="price tag"
                            />
                            <div className="flex flex-col leading-tight">
                                <span
                                    className="text-base font-black break-words"
                                    style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    爆款热销
                                </span>
                                <span
                                    className="text-xs font-medium break-words"
                                    style={{ color: "var(--primary-text,#ffffff)", opacity: 0.9, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    限时秒杀
                                </span>
                            </div>
                        </div>

                        {/* 左下转化率角标卡片 */}
                        <div
                            className="absolute z-20 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lg"
                            style={{
                                bottom: '18px', left: '14px',
                                background: "var(--card-color,#fdf2f8)",
                                border: "2px solid var(--stroke,#fbcfe8)",
                            }}
                        >
                            <div
                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/trend-up-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-5 h-5"
                                    title="trend up"
                                />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-xl font-black leading-none" style={{ color: "var(--primary-color,#db2777)" }}>
                                    +186%
                                </span>
                                <span
                                    className="text-xs font-medium break-words"
                                    style={{ color: "var(--background-text,#18181b)", opacity: 0.7, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    复购增长
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageRight
