import React from 'react'
import * as z from "zod";

export const layoutId = 'section-divider'
export const layoutName = '章节分隔'
export const layoutDescription = 'A bold full-bleed section divider with an oversized number watermark, section title, and optional subtitle.'

const sectionDividerSchema = z.object({
    sectionNumber: z.string().min(1).max(4).default('01').meta({ description: "Section number shown as a large watermark, e.g. 01, 02" }),
    title: z.string().min(2).max(30).default('市场机会').meta({ description: "Section title text" }),
    subtitle: z.string().min(0).max(80).default('从行业痛点到规模化增长的关键路径').meta({ description: "Optional supporting subtitle for the section" }),
})

export const Schema = sectionDividerSchema
export type SectionDividerData = z.infer<typeof sectionDividerSchema>

const SectionDividerLayout: React.FC<{ data?: Partial<SectionDividerData> }> = ({ data: slideData }) => {
    const sectionNumber = slideData?.sectionNumber || '01'
    const title = slideData?.title || '市场机会'
    const subtitle = slideData?.subtitle

    return (<>
        <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
             style={{ background: "var(--primary-color,#9333ea)", fontFamily: "var(--heading-font-family,Poppins)" }}>

            {((slideData as any)?.__companyName__ || (slideData as any)?._logo_url__) && (
                <div className="absolute top-0 left-0 right-0 px-12 lg:px-20 pt-4 z-20">
                    <div className="flex items-center gap-2">
                        {(slideData as any)?._logo_url__ && <img src={(slideData as any)?._logo_url__} alt="logo" className="w-6 h-6" />}
                        {(slideData as any)?.__companyName__ && <span className="text-sm font-semibold" style={{ color: 'var(--primary-text,#ffffff)' }}>{(slideData as any)?.__companyName__}</span>}
                    </div>
                </div>
            )}

            {/* Oversized semi-transparent number watermark */}
            <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden">
                <span
                    className="font-bold leading-none pr-4 lg:pr-10"
                    style={{
                        color: 'var(--primary-text,#ffffff)',
                        opacity: 0.12,
                        fontSize: 'clamp(18rem, 46vw, 34rem)',
                    }}
                >
                    {sectionNumber}
                </span>
            </div>

            {/* Bottom-left section title block */}
            <div className="relative z-10 flex h-full flex-col justify-end px-12 lg:px-20 pt-12 pb-16">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-1 w-16 rounded-full" style={{ background: 'var(--primary-text,#ffffff)', opacity: 0.9 }}></div>
                    <span
                        className="text-base lg:text-lg font-semibold tracking-[0.35em] uppercase"
                        style={{ color: 'var(--primary-text,#ffffff)', opacity: 0.85 }}
                    >
                        Section {sectionNumber}
                    </span>
                </div>

                <h1
                    className="text-6xl lg:text-7xl font-bold leading-tight max-w-3xl"
                    style={{ color: 'var(--primary-text,#ffffff)' }}
                >
                    {title}
                </h1>

                {subtitle && (
                    <p
                        className="mt-6 text-xl lg:text-2xl leading-relaxed max-w-2xl"
                        style={{ color: 'var(--primary-text,#ffffff)', opacity: 0.82 }}
                    >
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    </>)
}

export default SectionDividerLayout
