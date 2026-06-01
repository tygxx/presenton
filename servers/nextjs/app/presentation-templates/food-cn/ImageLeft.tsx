import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'food-cn-image-left'
export const layoutName = '图文（左图）'
export const layoutDescription = '美食餐饮风图文页：左侧大图叠暖色渐变遮罩与圆盘构图，右侧标题、段落与要点。焦糖金描边、暖米底，温暖诱人。'

const schema = z.object({
    title: z.string().min(2).max(20).default('匠心慢炖的家常滋味').meta({
        description: "图文页主标题（中文，简短有食欲）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落（中文一句话）" })
    ).min(1).max(3).default([
        '甄选当季新鲜食材，文火慢炖锁住汤汁的醇厚与鲜甜。',
        '老师傅手工现做，每一口都是熟悉的烟火气与温度。',
    ]).meta({ description: "正文段落，1-3 段" }),
    image: ImageSchema.default({
        __image_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png',
        __image_prompt__: '一盘热气腾腾的红烧家常菜，暖色灯光，俯拍特写，质感诱人',
    }).meta({ description: "左侧主图，会叠加暖色渐变遮罩" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "右侧要点短语（中文）" })
    ).max(3).default([
        '当季时鲜直采',
        '古法手工现做',
        '暖心慢火慢炖',
    ]).meta({ description: "右侧亮点要点，最多 3 条，可空" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageLeft: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '匠心慢炖的家常滋味'
    const paragraphs = slideData?.paragraphs || []
    const image = slideData?.image
    const bullets = slideData?.bullets || []
    const imageUrl = image?.__image_url__ || 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png'
    const imageAlt = image?.__image_prompt__ || '美食图片'

    const bulletIcons = [
        'leaf',
        'cooking-pot',
        'heart',
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
                    background: "var(--background-color,#fdf6ec)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 背景暖色装饰：右下大圆盘与焦糖金描边圆环 */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="foodWarmGlow" cx="80%" cy="22%" r="60%">
                                <stop offset="0%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0.10" />
                                <stop offset="100%" stopColor="var(--primary-color,#e8590c)" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1280" height="720" fill="url(#foodWarmGlow)" />
                        {/* 右下角圆盘构图叠环 */}
                        {[0, 1, 2].map((i) => (
                            <circle key={i} cx="1180" cy="700" r={150 + i * 70} fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity={0.10} strokeWidth="2" />
                        ))}
                        {/* 右上角焦糖金小圆点 */}
                        <circle cx="1140" cy="120" r="6" fill="var(--secondary-color,#c92a2a)" fillOpacity="0.5" />
                        <circle cx="1190" cy="180" r="4" fill="var(--primary-color,#e8590c)" fillOpacity="0.4" />
                    </svg>
                </div>

                <div className="relative z-10 flex h-full gap-10 p-12">
                    {/* 左侧大图：圆角卡 + 暖色渐变遮罩 + 焦糖金描边 */}
                    <div className="flex w-[46%] flex-shrink-0 items-stretch">
                        <div
                            className="relative w-full overflow-hidden rounded-[2rem] shadow-md"
                            style={{ border: "3px solid var(--stroke,#f0e0cc)" }}
                        >
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            {/* 暖色主题渐变遮罩 */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(150deg, rgba(232,89,12,0.42) 0%, rgba(201,42,42,0.18) 48%, rgba(59,36,18,0.55) 100%)",
                                }}
                            />
                            {/* 餐具点缀角标：圆盘内餐具图标 */}
                            <div className="absolute left-5 top-5 flex items-center gap-2">
                                <div
                                    className="flex h-11 w-11 items-center justify-center rounded-full shadow"
                                    style={{ background: "var(--primary-color,#e8590c)" }}
                                >
                                    <RemoteSvgIcon
                                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg"
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-5 h-5"
                                        title="cutlery"
                                    />
                                </div>
                                <span
                                    className="rounded-full px-3 py-1 text-sm font-semibold break-words"
                                    style={{
                                        background: "var(--card-color,#fffaf2)",
                                        color: "var(--primary-color,#e8590c)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    招牌主厨推荐
                                </span>
                            </div>
                            {/* 底部焦糖金圆盘弧线点缀 */}
                            <svg viewBox="0 0 600 120" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none" aria-hidden="true">
                                <path d="M0 120 Q300 40 600 120 Z" fill="var(--secondary-color,#c92a2a)" fillOpacity="0.22" />
                            </svg>
                        </div>
                    </div>

                    {/* 右侧文字区 */}
                    <div className="flex flex-1 flex-col justify-center">
                        {/* 小标签 + 焦糖金分隔条 */}
                        <span
                            className="mb-5 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-sm font-medium break-words"
                            style={{
                                color: "var(--primary-color,#e8590c)",
                                background: "rgba(232,89,12,0.10)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            舌尖上的温暖时光
                        </span>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
                        >
                            {title}
                        </h1>

                        <div
                            className="my-6 h-1.5 w-20 rounded-full"
                            style={{ background: "var(--secondary-color,#c92a2a)" }}
                        />

                        <div className="space-y-3">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.7] break-words"
                                    style={{ color: "var(--background-text,#3b2412)", opacity: 0.88, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 要点：圆盘暖色块 + 餐具点缀图标 */}
                        {bullets.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-3">
                                {bullets.map((b, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2.5 rounded-full py-2 pl-2.5 pr-4 shadow-sm"
                                        style={{
                                            background: "var(--card-color,#fffaf2)",
                                            border: "1.5px solid var(--stroke,#f0e0cc)",
                                        }}
                                    >
                                        <span
                                            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{ background: "var(--primary-color,#e8590c)" }}
                                        >
                                            <RemoteSvgIcon
                                                url={`https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${bulletIcons[i % bulletIcons.length]}-bold.svg`}
                                                strokeColor="currentColor"
                                                color="var(--primary-text,#ffffff)"
                                                className="w-4 h-4"
                                                title="food highlight"
                                            />
                                        </span>
                                        <span
                                            className="text-base font-semibold leading-relaxed break-words"
                                            style={{ color: "var(--background-text,#3b2412)", overflowWrap: 'break-word', wordBreak: 'break-word' }}
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
