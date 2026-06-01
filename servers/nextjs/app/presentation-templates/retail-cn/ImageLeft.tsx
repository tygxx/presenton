import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'retail-cn-image-left'
export const layoutName = '图文（左图）'
export const layoutDescription = '电商新零售图文页：左侧大图叠潮流渐变遮罩与价签角标，右侧撞色排版标题、段落与活力要点。卡片化构图，年轻有冲击力。'

const schema = z.object({
    title: z.string().min(2).max(20).default('爆款上新 即刻种草').meta({
        description: "图文页主标题（中文，潮流有力，≤20字）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落（中文，每段≤56字）" })
    ).min(1).max(3).default([
        '从直播间到货架，全渠道一盘货，让每一次心动都能立刻下单。',
        '智能选品 + 千人千面推荐，把对的商品推给对的人，转化更高效。',
    ]).meta({ description: "正文段落，1至3段" }),
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '年轻人手持手机在潮流零售门店购物，色彩明亮活力，时尚新零售场景',
    }).meta({ description: "左侧主图，会叠加潮流渐变遮罩" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "活力要点标签（中文，≤24字）" })
    ).max(3).default([
        '全渠道一盘货',
        '千人千面推荐',
        '极速达 30 分钟',
    ]).meta({ description: "右侧要点标签，0至3条（可空）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageLeft: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '爆款上新 即刻种草'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '从直播间到货架，全渠道一盘货，让每一次心动都能立刻下单。',
            '智能选品 + 千人千面推荐，把对的商品推给对的人，转化更高效。',
        ]
    const image = slideData?.image || {
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '年轻人手持手机在潮流零售门店购物，色彩明亮活力，时尚新零售场景',
    }
    const bullets = slideData?.bullets || []

    const bulletIcons = [
        'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/lightning-bold.svg',
        'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/sparkle-bold.svg',
        'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/tag-bold.svg',
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
                    background: "var(--background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景撞色几何装饰层 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <div
                        className="absolute"
                        style={{
                            top: '-120px', right: '-60px', width: '320px', height: '320px', borderRadius: '9999px',
                            background: "var(--secondary-color,#f59e0b)", opacity: 0.16,
                        }}
                    />
                    <div
                        className="absolute"
                        style={{
                            bottom: '-90px', right: '34%', width: '220px', height: '220px',
                            background: "var(--primary-color,#db2777)", opacity: 0.08,
                            transform: 'rotate(18deg)', borderRadius: '38px',
                        }}
                    />
                </div>

                <div className="relative z-10 flex h-full gap-10 p-12">
                    {/* 左侧：大图卡片 + 渐变遮罩 + 价签角标 */}
                    <div className="flex w-[46%] flex-shrink-0">
                        <div
                            className="relative w-full overflow-hidden rounded-3xl shadow-lg"
                            style={{ border: "4px solid var(--card-color,#fdf2f8)" }}
                        >
                            <img
                                src={image.__image_url__}
                                alt={image.__image_prompt__}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            {/* 潮流主题色渐变遮罩 */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(150deg, rgba(219,39,119,0.55) 0%, rgba(219,39,119,0.10) 45%, rgba(245,158,11,0.42) 100%)",
                                }}
                            />
                            {/* 价签角标 */}
                            <div
                                className="absolute left-5 top-5 flex items-center gap-2 rounded-full px-4 py-2 shadow-md"
                                style={{ background: "var(--secondary-color,#f59e0b)" }}
                            >
                                <RemoteSvgIcon
                                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/tag-bold.svg"
                                    strokeColor="currentColor"
                                    color="var(--primary-text,#ffffff)"
                                    className="w-5 h-5"
                                    title="price tag"
                                />
                                <span
                                    className="text-sm font-black break-words"
                                    style={{ color: "var(--primary-text,#ffffff)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    新零售
                                </span>
                            </div>
                            {/* 撞色价格徽章 */}
                            <div className="absolute bottom-6 left-6 flex items-end gap-3">
                                <div
                                    className="flex items-baseline rounded-2xl px-4 py-2 shadow-lg"
                                    style={{ background: "var(--primary-color,#db2777)" }}
                                >
                                    <span className="text-lg font-bold" style={{ color: "var(--primary-text,#ffffff)" }}>¥</span>
                                    <span className="text-3xl font-black leading-[1.2]" style={{ color: "var(--primary-text,#ffffff)" }}>99</span>
                                    <span className="ml-1 text-sm font-bold" style={{ color: "var(--primary-text,#ffffff)", opacity: 0.85 }}>起</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右侧：潮流排版文字区 */}
                    <div className="flex flex-1 flex-col justify-center">
                        {/* 顶部标签 */}
                        <span
                            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold break-words"
                            style={{
                                color: "var(--primary-color,#db2777)",
                                background: "var(--card-color,#fdf2f8)",
                                border: "1.5px solid var(--stroke,#fbcfe8)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/storefront-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-color,#db2777)"
                                className="w-4 h-4"
                                title="storefront"
                            />
                            电商新零售
                        </span>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        {/* 撞色下划色块 */}
                        <div className="mt-5 flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full" style={{ background: "var(--primary-color,#db2777)" }} />
                            <div className="h-2 w-8 rounded-full" style={{ background: "var(--secondary-color,#f59e0b)" }} />
                        </div>

                        {/* 正文段落 */}
                        <div className="mt-6 space-y-3">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#18181b)", opacity: 0.82, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 活力要点标签 */}
                        {bullets.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-3">
                                {bullets.map((b, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 rounded-2xl px-4 py-2.5 shadow-sm"
                                        style={{
                                            background: "var(--card-color,#fdf2f8)",
                                            border: "1.5px solid var(--stroke,#fbcfe8)",
                                        }}
                                    >
                                        <span
                                            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{ background: "var(--primary-color,#db2777)" }}
                                        >
                                            <RemoteSvgIcon
                                                url={bulletIcons[i % bulletIcons.length]}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-4 h-4"
                                                title="highlight"
                                            />
                                        </span>
                                        <span
                                            className="text-sm font-bold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#18181b)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                        >
                                            {b}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageLeft
