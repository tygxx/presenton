import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'education-cn-full-bleed-image'
export const layoutName = '全幅大图'
export const layoutDescription = '教育培训风全幅大图：满铺背景图 + 深色渐变遮罩保证文字可读，左下角标题与副标题叠加，辅以书本图标与圆点装饰。适合章节封面或主题导入页。'

const schema = z.object({
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "明亮温暖的教室，学生围坐讨论，阳光透过窗户洒下",
    }).meta({
        description: "满铺背景大图（会自动叠加深色渐变遮罩以保证文字可读）",
    }),
    eyebrow: z.string().min(2).max(16).default('成长课堂 · 第三章').meta({
        description: "标题上方的小标签/章节分类",
    }),
    title: z.string().min(2).max(20).default('点亮每一次好奇').meta({
        description: "叠加在大图上的主标题（中文，简短有力）",
    }),
    subtitle: z.string().min(2).max(40).default('以兴趣为起点，让学习成为一段愉快的探索旅程').meta({
        description: "副标题，一句话补充说明（可选）",
    }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const FullBleedImage: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const imageUrl = slideData?.image?.__image_url__ || "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png"
    const imagePrompt = slideData?.image?.__image_prompt__ || "明亮温暖的教室，学生围坐讨论，阳光透过窗户洒下"
    const eyebrow = slideData?.eyebrow || '成长课堂 · 第三章'
    const title = slideData?.title || '点亮每一次好奇'
    const subtitle = slideData?.subtitle || '以兴趣为起点，让学习成为一段愉快的探索旅程'

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap&subset=chinese-simplified"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--background-color,#fffdf7)",
                    fontFamily: "var(--heading-font-family,'Noto Sans SC')",
                }}
            >
                {/* 满铺背景图 */}
                <img
                    src={imageUrl}
                    alt={imagePrompt}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* 深色渐变遮罩：左下加重，保证文字可读 */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(120deg, rgba(15,23,42,0.78) 0%, rgba(15,23,42,0.50) 42%, rgba(15,23,42,0.12) 72%, rgba(15,23,42,0.04) 100%)",
                    }}
                />
                {/* 底部主题色叠加，强化亲和活力气质 */}
                <div
                    className="absolute inset-x-0 bottom-0 h-2/3"
                    style={{
                        background: "linear-gradient(to top, rgba(37,99,235,0.34) 0%, rgba(37,99,235,0.06) 60%, rgba(37,99,235,0) 100%)",
                    }}
                />

                {/* 右上角圆点装饰母题 */}
                <svg
                    viewBox="0 0 240 160"
                    className="absolute right-0 top-0 h-44 w-64"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="eduFullGlow" cx="70%" cy="20%" r="70%">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.32" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="240" height="160" fill="url(#eduFullGlow)" />
                    {[0, 1, 2, 3, 4].map((row) => (
                        [0, 1, 2, 3, 4].map((col) => (
                            <circle
                                key={`${row}-${col}`}
                                cx={150 + col * 18}
                                cy={24 + row * 18}
                                r="2.6"
                                fill="#ffffff"
                                fillOpacity={0.55 - row * 0.07}
                            />
                        ))
                    ))}
                </svg>

                {/* 右上角橙色强调圆点（成长母题点睛） */}
                <div
                    className="absolute"
                    style={{
                        top: '12%', right: '10%', width: '14px', height: '14px', borderRadius: '9999px',
                        background: "var(--secondary-color,#f97316)",
                        boxShadow: '0 0 0 7px rgba(249,115,22,0.20)',
                    }}
                />

                {/* 左下角文字内容叠加 */}
                <div className="relative z-10 flex h-full w-full flex-col justify-end p-14">
                    <div className="flex max-w-[40rem] flex-col">
                        {/* 章节标签 + 书本图标 */}
                        <span
                            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium leading-relaxed break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                background: "rgba(249,115,22,0.90)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-open-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-4 h-4"
                                title="open book"
                            />
                            {eyebrow}
                        </span>

                        <h1
                            className="text-6xl font-black leading-[1.25] break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                textShadow: '0 2px 18px rgba(15,23,42,0.45)',
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        {/* 圆角强调条 */}
                        <div
                            className="my-7 h-1.5 w-24 rounded-full"
                            style={{ background: "var(--secondary-color,#f97316)" }}
                        />

                        {subtitle && (
                            <p
                                className="max-w-[34rem] text-xl leading-relaxed break-words"
                                style={{
                                    color: "var(--primary-text,#ffffff)",
                                    opacity: 0.94,
                                    textShadow: '0 1px 10px rgba(15,23,42,0.40)',
                                    overflowWrap: 'break-word', wordBreak: 'break-word',
                                }}
                            >
                                {subtitle}
                            </p>
                        )}

                        {/* 底部三枚成长母题图标（书本 / 灯泡 / 成长曲线） */}
                        <div className="mt-10 flex items-center gap-3">
                            {[
                                { url: 'lightbulb', q: 'idea lightbulb' },
                                { url: 'graduation-cap', q: 'graduation cap' },
                                { url: 'chart-line-up', q: 'growth chart' },
                            ].map((it, i) => (
                                <div
                                    key={i}
                                    className="flex h-11 w-11 items-center justify-center rounded-full"
                                    style={{
                                        background: "rgba(255,255,255,0.16)",
                                        border: "1px solid rgba(255,255,255,0.28)",
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url={`https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/${it.url}-bold.svg`}
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-5 h-5"
                                        title={it.q}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FullBleedImage
