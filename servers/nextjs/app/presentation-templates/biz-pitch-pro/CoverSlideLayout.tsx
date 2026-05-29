import React from 'react'
import * as z from "zod";
import { ImageSchema } from '../defaultSchemes';

export const layoutId = 'cover'
export const layoutName = '封面'
export const layoutDescription = 'A cover slide with a large bold title, accent line, subtitle, presenter and date on the left, and a large rounded cover image on the right.'

const coverSlideSchema = z.object({
    title: z.string().min(3).max(30).default('2026 业务战略汇报').meta({ description: "封面主标题" }),
    subtitle: z.string().min(6).max(60).default('聚焦核心业务，驱动规模化增长').meta({ description: "封面副标题，一句话概述" }),
    presenterName: z.string().min(2).max(24).default('张明').meta({ description: "演讲者姓名" }),
    presentationDate: z.string().min(2).max(24).default('2026 年 5 月').meta({ description: "汇报日期" }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
        __image_prompt__: 'Modern business team strategy meeting'
    }).meta({ description: "封面主视觉图片" })
})

export const Schema = coverSlideSchema
export type CoverSlideData = z.infer<typeof coverSlideSchema>

const CoverSlideLayout: React.FC<{ data?: Partial<CoverSlideData> }> = ({ data: slideData }) => {
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
                {/* Left: title block */}
                <div className="flex-1 flex flex-col justify-center pl-12 lg:pl-20 pr-8 py-16 space-y-7">
                    <h1 style={{ color: "var(--background-text,#111827)" }} className="text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                        {slideData?.title || '2026 业务战略汇报'}
                    </h1>

                    <div style={{ background: "var(--primary-color,#9333ea)" }} className="w-24 h-1.5 rounded-full"></div>

                    <p style={{ color: "var(--background-text,#4b5563)" }} className="text-xl lg:text-2xl leading-relaxed max-w-xl opacity-90">
                        {slideData?.subtitle || '聚焦核心业务，驱动规模化增长'}
                    </p>

                    <div className="flex items-center gap-4 pt-2 text-sm lg:text-base">
                        <span style={{ color: "var(--background-text,#111827)" }} className="font-semibold">
                            {slideData?.presenterName || '张明'}
                        </span>
                        <span style={{ background: "var(--stroke,#e5e7eb)" }} className="w-px h-4"></span>
                        <span style={{ color: "var(--background-text,#6b7280)" }} className="opacity-80">
                            {slideData?.presentationDate || '2026 年 5 月'}
                        </span>
                    </div>
                </div>

                {/* Right: cover image */}
                <div className="w-1/2 h-full relative py-10 pr-12 lg:pr-16">
                    <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl"
                        style={{ border: "1px solid var(--stroke,#e5e7eb)" }}>
                        <img
                            src={slideData?.image?.__image_url__ || ''}
                            alt={slideData?.image?.__image_prompt__ || ''}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default CoverSlideLayout
