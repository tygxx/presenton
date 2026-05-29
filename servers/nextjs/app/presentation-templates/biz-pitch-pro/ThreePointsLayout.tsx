import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'three-points'
export const layoutName = '三栏要点'
export const layoutDescription = 'A three-column layout presenting three key points, each with an icon, title, and description.'

const threePointsSchema = z.object({
    title: z.string().min(3).max(30).default('核心优势').meta({ description: "Slide title shown at the top" }),
    points: z.array(z.object({
        icon: IconSchema.meta({ description: "Icon representing the point" }),
        title: z.string().min(2).max(24).default('要点标题').meta({ description: "Short title of the point" }),
        description: z.string().min(10).max(160).default('用一句话清晰说明该要点的价值与意义。').meta({ description: "Supporting description of the point" }),
    })).min(3).max(3).default([
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/rocket-bold.svg', __icon_query__: 'rocket growth' },
            title: '高速增长',
            description: '产品上线一年内月活突破百万，营收同比增长三倍，验证了市场需求的真实性。',
        },
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/target-bold.svg', __icon_query__: 'target focus' },
            title: '精准定位',
            description: '聚焦中小企业数字化转型痛点，以轻量化方案切入万亿级蓝海市场。',
        },
        {
            icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chart-line-bold.svg', __icon_query__: 'chart growth' },
            title: '数据驱动',
            description: '依托自研数据中台实现全链路指标追踪，让每一次决策都有据可依。',
        },
    ]).meta({ description: "Exactly three key points to highlight" }),
})

export const Schema = threePointsSchema
export type ThreePointsData = z.infer<typeof threePointsSchema>

const ThreePointsLayout: React.FC<{ data?: Partial<ThreePointsData> }> = ({ data: slideData }) => {
    const points = slideData?.points || []
    return (<>
        <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
             style={{ background: "var(--background-color,#ffffff)", fontFamily: "var(--heading-font-family,Poppins)" }}>

            {((slideData as any)?.__companyName__ || (slideData as any)?._logo_url__) && (
                <div className="absolute top-0 left-0 right-0 px-12 lg:px-20 pt-4">
                    <div className="flex items-center gap-2">
                        {(slideData as any)?._logo_url__ && <img src={(slideData as any)?._logo_url__} alt="logo" className="w-6 h-6" />}
                        {(slideData as any)?.__companyName__ && <span className="text-sm font-semibold" style={{ color: 'var(--background-text,#111827)' }}>{(slideData as any)?.__companyName__}</span>}
                    </div>
                </div>
            )}

            <div className="relative z-10 flex flex-col h-full px-12 lg:px-20 pt-16 pb-12">
                <div className="mb-10">
                    <h1 style={{ color: "var(--background-text,#111827)" }} className="text-4xl lg:text-5xl font-bold leading-tight">{slideData?.title || '核心优势'}</h1>
                    <div style={{ background: "var(--primary-color,#9333ea)" }} className="w-20 h-1 mt-4"></div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-6 lg:gap-8">
                    {points.slice(0, 3).map((point, index) => (
                        <div key={index}
                             className="flex flex-col rounded-2xl p-6 lg:p-8 border"
                             style={{ background: "var(--card-color,#f3f4f6)", borderColor: "var(--stroke,#e5e7eb)" }}>
                            <div style={{ background: "var(--primary-color,#9333ea)" }} className="w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                                <RemoteSvgIcon url={point.icon?.__icon_url__ || ''} color="var(--primary-text,#ffffff)" className="w-7 h-7" title={point.icon?.__icon_query__ || ''} />
                            </div>
                            <h3 style={{ color: "var(--background-text,#111827)" }} className="text-xl lg:text-2xl font-semibold mb-3 leading-snug">{point.title}</h3>
                            <p style={{ color: "var(--background-text,#4b5563)" }} className="text-sm lg:text-base leading-relaxed">{point.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>)
}

export default ThreePointsLayout
