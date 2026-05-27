import React, { useState, useEffect } from 'react';


const LoadingState = () => {
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const tips = [
        "AI 正在精心打造你的演示文稿 ✨",
        "正在分析内容，打造完美的幻灯片 📊",
        "正在组织信息以达到最佳效果 🎯",
        "正在添加视觉元素，让观众更有共鸣 🎨",
        "快好了！正在做最后润色 ⚡️"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTipIndex((prev) => (prev + 1) % tips.length);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto w-[500px] flex flex-col items-center justify-center p-8">
            <div className="w-full bg-white rounded-xl p-[2px] ">
                <div className="bg-white rounded-xl p-6 w-full">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div
                            className="presentation-loader-dots shrink-0"
                            role="status"
                            aria-label="加载中"
                        />
                        <h2 className="text-2xl font-semibold text-gray-800">
                            正在创建你的演示文稿
                        </h2>
                    </div>
                    <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 mb-4">
                        <div className="min-h-[120px] flex items-center justify-center">
                            <p className="text-gray-700 text-lg text-center">
                                {tips[currentTipIndex]}
                            </p>
                        </div>
                    </div>

                    <div className="w-full max-w-md">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#5141e5] rounded-full animate-progress" />
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .presentation-loader-dots {
                    width: 50px;
                    aspect-ratio: 1;
                    --_c: no-repeat radial-gradient(
                        farthest-side,
                        #7a5af8 92%,
                        #0000
                    );
                    background:
                        var(--_c) top,
                        var(--_c) left,
                        var(--_c) right,
                        var(--_c) bottom;
                    background-size: 12px 12px;
                    animation: presentation-loader-l7 1s infinite;
                }
                @keyframes presentation-loader-l7 {
                    to {
                        transform: rotate(0.5turn);
                    }
                }
            `}</style>
        </div>
    );
};

export default LoadingState; 