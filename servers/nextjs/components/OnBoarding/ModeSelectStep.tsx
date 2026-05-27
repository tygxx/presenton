import { ChevronRight } from 'lucide-react'
import React from 'react'

const ModeSelectStep = ({ selectedMode, setStep, setSelectedMode }: { selectedMode: string, setStep: (step: number) => void, setSelectedMode: (mode: string) => void }) => {
    return (
        <div className='max-w-[650px]'>
            <div className='mb-[70px]'>

                <h2 className='mb-4 text-black text-[26px] font-normal font-unbounded '>选择演示文稿的生成方式</h2>
                <p className='text-[#000000CC] text-xl font-normal font-syne'>请先选择生成模式，下一步将配置你的模型服务商。</p>
            </div>
            <div className='space-y-5'>
                <div onClick={() => {
                    setSelectedMode("presenton")

                }} className={`border font-syne  rounded-[11px] p-3  flex items-center  justify-between gap-6 cursor-pointer ${selectedMode === "presenton" ? "border-[#a49cfc]" : "border-[#EDEEEF]"}`}>
                    <div className='flex items-center gap-6'>
                        <div className='rounded-[4px] bg-[#F4F3FF]  pt-[16.8px] pl-[16.8px] pb-[15.8px] pr-[17.1px]  w-[74px] h-[74px] flex items-center justify-center'>
                            <img src='/logo-with-bg.png' alt='presenton' className='w-[40px] h-[41.4px] object-contain' />
                        </div>
                        <div className=''>
                            <div className='flex items-start gap-2 relative '>

                                <h3 className='text-black text-[18px] font-medium font-syne'>模板演示模式</h3>
                                <p className='bg-[#F4F3FF] px-3 py-1.5 rounded-[30px] text-[#7A5AF8] text-[9px] absolute left-[260px] top-[-10px]'>支持 PPTX 导出</p>
                            </div>
                            <p className='text-[#999999] text-[14px] font-normal font-syne'>适合结构化幻灯片、编辑与 PPTX 导出，需要文本和图像服务商。</p>
                        </div>
                    </div>
                    <ChevronRight className='w-6 h-6 text-[#B3B3B3]' />
                </div>
                <div
                    className='border font-syne border-[#EDEEEF]  cursor-not-allowed rounded-[11px] p-3  flex items-center  justify-between gap-6  relative'>
                    <p className='text-black absolute top-[20px] right-14 flex items-center justify-center text-[14px] font-normal bg-[#F4F3FF] px-3 py-1.5 rounded-[30px]'>即将推出</p>

                    <div className='flex items-center gap-6'>
                        <div className='rounded-[4px] bg-[#FFF6ED]  p-[12px] w-[74px] h-[74px] flex items-center justify-center'>
                            <img src='/image_mode.png' alt='presenton' className='w-full h-full object-contain' />
                        </div>
                        <div className=''>
                            <div className='flex items-start gap-2 relative '>

                                <h3 className='text-black text-[18px] font-medium font-syne'>图像幻灯片模式</h3>
                                <p className='bg-[#F4F3FF] px-3 py-1.5 rounded-[30px] text-[#7A5AF8] text-[9px] absolute left-[180px] top-[-10px]'>不支持 PPTX 导出</p>
                            </div>
                            <p className='text-[#999999] text-[14px] font-normal font-syne'>适合从图像模型生成视觉化幻灯片，不支持 PPTX 导出。</p>
                        </div>
                    </div>
                    <ChevronRight className='w-6 h-6 text-[#B3B3B3]' />
                </div>
            </div>
            <div className='fixed bottom-16 mr-8  max-w-[1440px]  right-16 flex justify-end items-center gap-2.5 '>

                <button
                    onClick={() => {
                        setStep(2);
                    }}
                    className='border font-syne border-[#EDEEEF] bg-[#7C51F8]  rounded-[58px] px-5 py-2.5 text-white text-xs  font-semibold'>
                    下一步：选择服务商
                </button>
            </div>
        </div>
    )
}

export default ModeSelectStep
