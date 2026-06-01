import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'food-cn-image-right'
export const layoutName = '图文（右图）'
export const layoutDescription = '美食餐饮风图文页（右图）：暖米底叠焦糖金圆盘描边与暖色光晕，左侧大标题/正文/招牌要点，右侧圆角大图卡片配焦糖金圆环画框与餐具角标。图上叠主题色渐变遮罩，温暖诱人，离线可渲染。'

const schema = z.object({
    title: z.string().min(2).max(20).default('慢炖时光好味道').meta({
        description: "图文页主标题（中文，简短有食欲）",
    }),
    paragraphs: z.array(
        z.string().min(4).max(56).meta({ description: "正文段落（中文，单段一句话）" })
    ).min(1).max(3).default([
        '严选当季新鲜食材，文火慢炖数小时，只为锁住每一分醇厚鲜香。',
        '从备料到出锅坚持手工现做，让家常的温暖在舌尖缓缓绽放。',
    ]).meta({ description: "正文段落列表（1至3段）" }),
    bullets: z.array(
        z.string().min(2).max(24).meta({ description: "招牌要点短语（中文，简短）" })
    ).max(3).default([
        '当日现采食材',
        '古法手工慢炖',
        '低油盐更健康',
    ]).meta({ description: "左下招牌要点标签（可空，最多3条）" }),
    image: ImageSchema.default({
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "诱人的中式招牌炖菜特写，热气腾腾摆盘精致，暖色灯光餐厅氛围",
    }).meta({ description: "右侧主图（建议菜品/食材/餐厅氛围相关画面）" }),
})

export const Schema = schema
type SlideData = z.infer<typeof schema>

const ImageRight: React.FC<{ data?: Partial<SlideData> }> = ({ data: slideData }) => {
    const title = slideData?.title || '慢炖时光好味道'
    const paragraphs = (slideData?.paragraphs && slideData.paragraphs.length > 0)
        ? slideData.paragraphs
        : [
            '严选当季新鲜食材，文火慢炖数小时，只为锁住每一分醇厚鲜香。',
            '从备料到出锅坚持手工现做，让家常的温暖在舌尖缓缓绽放。',
        ]
    const bullets = slideData?.bullets || []
    const image = slideData?.image || {
        __image_url__: "https://presenton-public.s3.ap-southeast-1.amazonaws.com/replaceable_template_image.png",
        __image_prompt__: "诱人的中式招牌炖菜特写，热气腾腾摆盘精致，暖色灯光餐厅氛围",
    }

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
                {/* 背景装饰层：暖色光晕 + 焦糖金圆盘描边 */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    {/* 左上暖橙光晕 */}
                    <div
                        className="absolute -top-32 -left-28 h-[26rem] w-[26rem] rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(232,89,12,0.14) 0%, rgba(232,89,12,0) 70%)" }}
                    />
                    {/* 左下暖红光晕 */}
                    <div
                        className="absolute -bottom-36 left-[18%] h-[22rem] w-[22rem] rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(201,42,42,0.09) 0%, rgba(201,42,42,0) 70%)" }}
                    />
                    {/* 焦糖金同心圆盘描边（左侧文字区背景母题） */}
                    <svg viewBox="0 0 1280 720" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={i} cx="150" cy="600" r={90 + i * 60} fill="none" stroke="var(--primary-color,#e8590c)" strokeOpacity={0.10 - i * 0.018} strokeWidth="2" />
                        ))}
                    </svg>
                </div>

                {/* 主内容：左文字 + 右大图 */}
                <div className="relative z-10 grid h-full grid-cols-[1fr_0.92fr] gap-10 px-16 py-12">
                    {/* 左侧文字区 */}
                    <div className="flex min-w-0 flex-col justify-center">
                        {/* 顶部小标签：焦糖金描边胶囊 + 餐具图标 */}
                        <span
                            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold break-words"
                            style={{
                                color: "var(--primary-text,#ffffff)",
                                background: "linear-gradient(135deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))",
                                boxShadow: "0 6px 16px rgba(232,89,12,0.22)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            <RemoteSvgIcon
                                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/fork-knife-bold.svg"
                                strokeColor="currentColor"
                                color="var(--primary-text,#ffffff)"
                                className="w-4 h-4"
                                title="fork knife dining"
                            />
                            招牌风味
                        </span>

                        <h1
                            className="text-5xl font-black leading-[1.25] break-words"
                            style={{
                                color: "var(--background-text,#3b2412)",
                                overflowWrap: 'break-word', wordBreak: 'break-word',
                            }}
                        >
                            {title}
                        </h1>

                        {/* 焦糖金渐变分隔条 */}
                        <div
                            className="my-7 h-1.5 w-24 rounded-full"
                            style={{
                                background: "linear-gradient(90deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))",
                                boxShadow: "0 4px 12px rgba(232,89,12,0.28)",
                            }}
                        />

                        <div className="flex flex-col gap-3.5">
                            {paragraphs.map((p, i) => (
                                <p
                                    key={i}
                                    className="text-lg leading-[1.7] break-words"
                                    style={{
                                        color: "var(--background-text,#3b2412)",
                                        opacity: 0.85,
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>

                        {/* 招牌要点标签：暖色卡片 + 焦糖金圆点 */}
                        {bullets.length > 0 && (
                            <div className="mt-9 flex flex-wrap gap-3">
                                {bullets.map((b, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium break-words"
                                        style={{
                                            color: "var(--background-text,#3b2412)",
                                            background: "var(--card-color,#fffaf2)",
                                            borderColor: "var(--stroke,#f0e0cc)",
                                            boxShadow: "0 4px 12px rgba(123,30,8,0.06)",
                                            overflowWrap: 'break-word', wordBreak: 'break-word',
                                        }}
                                    >
                                        <span
                                            className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                            style={{
                                                background: "linear-gradient(135deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))",
                                            }}
                                        />
                                        {b}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 右侧大图卡片：焦糖金圆环画框 + 主题色渐变遮罩 + 餐具角标 */}
                    <div className="relative flex min-w-0 items-center">
                        {/* 圆盘构图：图卡后方焦糖金圆环点缀 */}
                        <div
                            className="absolute -right-6 -top-5 h-28 w-28 rounded-full"
                            style={{
                                border: "3px solid var(--primary-color,#e8590c)",
                                opacity: 0.5,
                            }}
                            aria-hidden="true"
                        />
                        <div
                            className="absolute -left-7 bottom-2 h-16 w-16 rounded-full"
                            style={{
                                background: "rgba(232,89,12,0.12)",
                            }}
                            aria-hidden="true"
                        />

                        <div
                            className="relative w-full overflow-hidden rounded-[1.75rem] border"
                            style={{
                                borderColor: "var(--stroke,#f0e0cc)",
                                background: "var(--card-color,#fffaf2)",
                                boxShadow: "0 22px 60px rgba(123,30,8,0.22)",
                                aspectRatio: "4 / 5",
                            }}
                        >
                            <img
                                src={image.__image_url__}
                                alt={image.__image_prompt__}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            {/* 主题色渐变遮罩（暖橙→暖红，营造食欲质感） */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(155deg, rgba(232,89,12,0.30) 0%, rgba(59,36,18,0.06) 44%, rgba(201,42,42,0.40) 100%)",
                                }}
                            />
                            {/* 焦糖金内描边画框 */}
                            <div
                                className="absolute inset-3 rounded-[1.4rem]"
                                style={{ border: "1.5px solid rgba(255,227,179,0.55)" }}
                                aria-hidden="true"
                            />
                            {/* 左上餐盘标识角标 */}
                            <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
                                <div
                                    className="flex h-9 w-9 items-center justify-center rounded-full"
                                    style={{
                                        background: "var(--card-color,#fffaf2)",
                                        boxShadow: "0 6px 16px rgba(123,30,8,0.28)",
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/cooking-pot-bold.svg"
                                        strokeColor="currentColor"
                                        color="var(--primary-color,#e8590c)"
                                        className="w-5 h-5"
                                        title="cooking pot dish"
                                    />
                                </div>
                            </div>
                            {/* 右下招牌徽标角标 */}
                            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                                <span
                                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold break-words"
                                    style={{
                                        color: "var(--primary-text,#ffffff)",
                                        background: "linear-gradient(135deg, var(--primary-color,#e8590c), var(--secondary-color,#c92a2a))",
                                        boxShadow: "0 6px 16px rgba(201,42,42,0.30)",
                                        overflowWrap: 'break-word', wordBreak: 'break-word',
                                    }}
                                >
                                    <RemoteSvgIcon
                                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/leaf-bold.svg"
                                        strokeColor="currentColor"
                                        color="var(--primary-text,#ffffff)"
                                        className="w-3.5 h-3.5"
                                        title="fresh leaf ingredient"
                                    />
                                    新鲜直供
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
