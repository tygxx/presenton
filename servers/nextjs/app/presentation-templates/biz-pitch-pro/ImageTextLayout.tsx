import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';
import { getSchemaDefaults } from '../utils';

export const layoutId = 'image-text'
export const layoutName = '图文混排'
export const layoutDescription = 'A balanced image-and-text split layout with a full-height image and a list of titled points beside it.'

const imageTextSchema = z.object({
    title: z.string().min(3).max(30).default('产品核心优势').meta({ description: "右侧内容区主标题" }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
        __image_prompt__: '商务团队协作讨论场景'
    }).meta({ description: "左侧大图，撑满高度展示" }),
    points: z.array(z.object({
        title: z.string().min(2).max(24).default('要点标题').meta({ description: "单个要点的小标题" }),
        description: z.string().min(5).max(160).default('对该要点的简要说明，突出价值与差异化优势。').meta({ description: "单个要点的描述文字" }),
    })).min(2).max(4).default([
        { title: '智能化运营', description: '依托数据中台实现全流程自动化，运营效率提升超过 40%。' },
        { title: '一体化交付', description: '从需求到上线端到端打通，交付周期平均缩短至原来的一半。' },
        { title: '安全合规', description: '通过多项行业认证，全链路加密保障客户数据安全无忧。' },
    ]).meta({ description: "右侧要点列表，建议 2 至 4 项" }),
})

export const Schema = imageTextSchema
export type ImageTextData = z.infer<typeof imageTextSchema>

const ImageTextLayout: React.FC<{ data?: Partial<ImageTextData> }> = ({ data: slideData }) => {
    const points: ImageTextData['points'] = slideData?.points && slideData.points.length > 0 ? slideData.points : getSchemaDefaults(imageTextSchema).points

    return (<>
        <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
             style={{ background: "var(--background-color,#ffffff)", fontFamily: "var(--heading-font-family,Poppins)" }}>

            {((slideData as any)?.__companyName__ || (slideData as any)?._logo_url__) && (
                <div className="absolute top-0 left-0 right-0 px-12 lg:px-20 pt-4 z-30">
                    <div className="flex items-center gap-2">
                        {(slideData as any)?._logo_url__ && <img src={(slideData as any)?._logo_url__} alt="logo" className="w-6 h-6" />}
                        {(slideData as any)?.__companyName__ && <span className="text-sm font-semibold" style={{ color: 'var(--background-text,#111827)' }}>{(slideData as any)?.__companyName__}</span>}
                    </div>
                </div>
            )}

            <div className="relative z-10 flex h-full">
                {/* Left: full-height image */}
                <div className="w-1/2 h-full p-8 lg:p-10">
                    <div className="w-full h-full rounded-2xl overflow-hidden" style={{ border: "1px solid var(--stroke,#e5e7eb)" }}>
                        <img
                            src={slideData?.image?.__image_url__ || ''}
                            alt={slideData?.image?.__image_prompt__ || ''}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right: title + accent bar + points */}
                <div className="w-1/2 h-full flex flex-col justify-center pr-12 lg:pr-20 pl-4 lg:pl-6 py-12">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-tight" style={{ color: "var(--background-text,#111827)" }}>
                        {slideData?.title || '产品核心优势'}
                    </h1>
                    <div className="w-16 h-1 mt-4 mb-8 rounded-full" style={{ background: "var(--primary-color,#9333ea)" }}></div>

                    <div className="space-y-6">
                        {points.map((point, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="mt-2 w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--primary-color,#9333ea)" }}></div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold leading-snug" style={{ color: "var(--background-text,#111827)" }}>
                                        {point?.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed mt-1" style={{ color: "var(--background-text,#6b7280)", opacity: 0.85 }}>
                                        {point?.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ImageTextLayout
