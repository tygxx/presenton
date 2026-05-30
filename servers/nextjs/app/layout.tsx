import type { Metadata } from "next";
import localFont from "next/font/local";
import { Syne, Unbounded } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import MixpanelInitializer from "./MixpanelInitializer";
import { Toaster } from "@/components/ui/sonner";
const inter = localFont({
  src: [
    {
      path: "./fonts/Inter.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-unbounded",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://presenton.ai"),
  title: "Presenton - 开源 AI 演示文稿生成器",
  description:
    "开源 AI 演示文稿生成器，支持自定义版式、多模型（OpenAI、Gemini、Ollama）以及 PDF/PPTX 导出，是免费的 Gamma 替代方案。",
  keywords: [
    "AI presentation generator",
    "data storytelling",
    "data visualization tool",
    "AI data presentation",
    "presentation generator",
    "data to presentation",
    "interactive presentations",
    "professional slides",
  ],
  openGraph: {
    title: "Presenton - 开源 AI 演示文稿生成器",
    description:
      "开源 AI 演示文稿生成器，支持自定义版式、多模型（OpenAI、Gemini、Ollama）以及 PDF/PPTX 导出，是免费的 Gamma 替代方案。",
    url: "https://presenton.ai",
    siteName: "Presenton",
    images: [
      {
        url: "https://presenton.ai/presenton-feature-graphics.png",
        width: 1200,
        height: 630,
        alt: "Presenton 标志",
      },
    ],
    type: "website",
    locale: "zh_CN",
  },
  alternates: {
    canonical: "https://presenton.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Presenton - 开源 AI 演示文稿生成器",
    description:
      "开源 AI 演示文稿生成器，支持自定义版式、多模型（OpenAI、Gemini、Ollama）以及 PDF/PPTX 导出，是免费的 Gamma 替代方案。",
    images: ["https://presenton.ai/presenton-feature-graphics.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${syne.variable} ${unbounded.variable} antialiased`}
      >
        <Providers>
          <MixpanelInitializer>

            {children}

          </MixpanelInitializer>
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
