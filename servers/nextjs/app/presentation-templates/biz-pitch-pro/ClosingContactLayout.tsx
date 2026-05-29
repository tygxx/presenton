import React from 'react'
import * as z from "zod";
import { IconSchema } from '../defaultSchemes';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = 'closing-contact'
export const layoutName = '结尾联系'
export const layoutDescription = 'A clean closing slide with an oversized thank-you title, accent line, optional message, and three lines of contact information each with a primary-colored icon.'

const closingContactSchema = z.object({
    title: z.string().min(2).max(20).default('谢谢观看').meta({ description: "Large closing thank-you headline" }),
    message: z.string().min(0).max(120).default('期待与您携手同行，共创更大价值。').meta({ description: "Optional one-line closing message below the title" }),
    contacts: z.object({
        email: z.object({
            icon: IconSchema.default({ __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg', __icon_query__: 'email envelope' }).meta({ description: "Icon for the email contact" }),
            label: z.string().min(3).max(40).default('contact@company.com').meta({ description: "Email address text" }),
        }).meta({ description: "Email contact line" }),
        phone: z.object({
            icon: IconSchema.default({ __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg', __icon_query__: 'phone call' }).meta({ description: "Icon for the phone contact" }),
            label: z.string().min(3).max(40).default('+86 138 0000 0000').meta({ description: "Phone number text" }),
        }).meta({ description: "Phone contact line" }),
        website: z.object({
            icon: IconSchema.default({ __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg', __icon_query__: 'website globe' }).meta({ description: "Icon for the website contact" }),
            label: z.string().min(3).max(40).default('www.company.com').meta({ description: "Website URL text" }),
        }).meta({ description: "Website contact line" }),
    }).default({
        email: { icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/envelope-simple-bold.svg', __icon_query__: 'email envelope' }, label: 'contact@company.com' },
        phone: { icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/phone-bold.svg', __icon_query__: 'phone call' }, label: '+86 138 0000 0000' },
        website: { icon: { __icon_url__: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/globe-bold.svg', __icon_query__: 'website globe' }, label: 'www.company.com' },
    }).meta({ description: "Email, phone, and website contact details" }),
})

export const Schema = closingContactSchema
export type ClosingContactData = z.infer<typeof closingContactSchema>

const ClosingContactLayout: React.FC<{ data?: Partial<ClosingContactData> }> = ({ data: slideData }) => {
    const contacts = slideData?.contacts
    const contactLines = [contacts?.email, contacts?.phone, contacts?.website].filter(Boolean)

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

            <div className="relative z-10 flex flex-col h-full px-12 lg:px-20 pt-20 pb-16 justify-center">
                <h1 style={{ color: "var(--background-text,#111827)" }} className="text-6xl lg:text-7xl font-bold leading-none tracking-tight">{slideData?.title || '谢谢观看'}</h1>

                <div style={{ background: "var(--primary-color,#9333ea)" }} className="w-24 h-1.5 mt-6 rounded-full"></div>

                {slideData?.message && (
                    <p style={{ color: "var(--background-text,#4b5563)" }} className="text-lg lg:text-xl leading-relaxed mt-6 max-w-2xl">{slideData.message}</p>
                )}

                <div className="mt-12 flex flex-col gap-5">
                    {contactLines.map((contact, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div style={{ background: "var(--primary-color,#9333ea)" }} className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0">
                                <RemoteSvgIcon url={contact?.icon?.__icon_url__ || ''} color="var(--primary-text,#ffffff)" className="w-5 h-5" title={contact?.icon?.__icon_query__ || ''} />
                            </div>
                            <span style={{ color: "var(--background-text,#111827)" }} className="text-lg lg:text-xl font-medium">{contact?.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>)
}

export default ClosingContactLayout
