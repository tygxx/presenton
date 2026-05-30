/**
 * Constants for Custom Template Creation Flow
 */

import { TemplateCreationStep } from "../types";

// Step configuration
export const TEMPLATE_STEPS: Record<TemplateCreationStep, { title: string; description: string }> = {
    'file-upload': {
        title: '上传模板',
        description: '上传 PPTX 文件以开始',
    },
    'font-check': {
        title: '字体检查',
        description: '正在检查演示文稿中的字体',
    },
    'font-upload': {
        title: '上传字体',
        description: '上传缺失的字体以确保渲染准确',
    },
    'slides-preview': {
        title: '预览幻灯片',
        description: '处理前先检查您的幻灯片',
    },
    'template-creation': {
        title: '创建模板',
        description: '正在将幻灯片转换为可复用的模板',
    },
    'completed': {
        title: '已完成',
        description: '您的模板已准备好保存',
    },
};

// UI Configuration
export const UI_CONFIG = {
    schemaEditorWidth: '520px',
    slideGridGap: '20px',
    maxContentWidth: '1400px',
}
// Highlights for benefits section
export const HIGHLIGHTS_ITEMS = [
    {
        number: "1",
        title: "耗时",
        description: "手动排版和复制幻灯片每周都要浪费数小时",
    },
    {
        number: "2",
        title: "成本高",
        description: "设计资源被用在重复性工作上，而非创新",
    },
    {
        number: "3",
        title: "不一致",
        description: "AI 生成的版式难以预料，需要不断手动修整",
    },
]

// External scripts
export const TAILWIND_CDN_URL = "https://cdn.tailwindcss.com";



export const FAQS = [
    {
        question: "什么是自定义模板创建？",
        answer: "自定义模板创建是一项功能，可让您为演示文稿创建自定义模板。",
    },
    {
        question: "如何创建自定义模板？",
        answer: "您可以通过上传 PPTX 文件，然后按需编辑模板来创建自定义模板。",
    },
    {
        question: "如何编辑自定义模板？",
        answer: "您可以通过上传 PPTX 文件，然后按需编辑模板来编辑自定义模板。",
    },
    {
        question: "如何删除自定义模板？",
        answer: "您可以通过上传 PPTX 文件，然后按需编辑模板来删除自定义模板。",
    },
    {
        question: "如何创建自定义模板？",
        answer: "您可以通过上传 PPTX 文件，然后按需编辑模板来创建自定义模板。",
    },
    {
        question: "如何编辑自定义模板？",
        answer: "您可以通过上传 PPTX 文件，然后按需编辑模板来编辑自定义模板。",
    },
    {
        question: "如何删除自定义模板？",
        answer: "您可以通过上传 PPTX 文件，然后按需编辑模板来删除自定义模板。",
    },
]