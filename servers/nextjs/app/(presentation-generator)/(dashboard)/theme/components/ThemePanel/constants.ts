

export const FONT_OPTIONS: any[] = [
  { name: 'Inter', displayName: 'Inter', cssUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap' },
  { name: 'DM Sans', displayName: 'DM Sans', cssUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap' },
  { name: 'Overpass', displayName: 'Overpass', cssUrl: 'https://fonts.googleapis.com/css2?family=Overpass:wght@100..900&display=swap' },
  { name: 'Barlow', displayName: 'Barlow', cssUrl: 'https://fonts.googleapis.com/css2?family=Barlow:wght@100..900&display=swap' },
  { name: 'Nunito', displayName: 'Nunito', cssUrl: 'https://fonts.googleapis.com/css2?family=Nunito:wght@200..1000&display=swap' },
  { name: 'Lora', displayName: 'Lora', cssUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap' },
  { name: 'Instrument Sans', displayName: 'Instrument Sans', cssUrl: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap' },
  { name: 'Roboto Slab', displayName: 'Roboto Slab', cssUrl: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap' },
  { name: 'Montserrat', displayName: 'Montserrat', cssUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap' },
  { name: 'Libre Baskerville', displayName: 'Libre Baskerville', cssUrl: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap' },
  { name: 'Prompt', displayName: 'Prompt', cssUrl: 'https://fonts.googleapis.com/css2?family=Prompt:wght@100..900&display=swap' },
  { name: 'Inconsolata', displayName: 'Inconsolata', cssUrl: 'https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap' },
  { name: 'Fraunces', displayName: 'Fraunces', cssUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@300..900&display=swap' },
  { name: 'Gelasio', displayName: 'Gelasio', cssUrl: 'https://fonts.googleapis.com/css2?family=Gelasio:wght@300..700&display=swap' },
  { name: 'Raleway', displayName: 'Raleway', cssUrl: 'https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap' },
  { name: 'Kanit', displayName: 'Kanit', cssUrl: 'https://fonts.googleapis.com/css2?family=Kanit:wght@100..900&display=swap' },
  { name: 'Corben', displayName: 'Corben', cssUrl: 'https://fonts.googleapis.com/css2?family=Corben:wght@400;700&display=swap' },
  { name: 'Poppins', displayName: 'Poppins', cssUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100..900&display=swap' },
  { name: 'Open Sans', displayName: 'Open Sans', cssUrl: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap' },
  { name: 'Lato', displayName: 'Lato', cssUrl: 'https://fonts.googleapis.com/css2?family=Lato:wght@100..900&display=swap' },
  { name: 'Source Sans Pro', displayName: 'Source Sans Pro', cssUrl: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200..900&display=swap' },
  { name: 'Playfair Display', displayName: 'Playfair Display', cssUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&display=swap' },
  { name: 'Roboto', displayName: 'Roboto', cssUrl: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100..900&display=swap' },
  // ===== 中文（CJK）字体 =====
  // 注意：cssUrl 显式带上 subset=chinese-simplified，确保下载简体中文字形；useFontLoader 也会兜底补上。
  { name: 'Noto Sans SC', displayName: '思源黑体（Noto Sans SC）', cssUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap&subset=chinese-simplified' },
  { name: 'Noto Serif SC', displayName: '思源宋体（Noto Serif SC）', cssUrl: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700&display=swap&subset=chinese-simplified' },
  { name: 'Ma Shan Zheng', displayName: '马善政楷体（Ma Shan Zheng）', cssUrl: 'https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap&subset=chinese-simplified' },
  { name: 'ZCOOL XiaoWei', displayName: '站酷小薇（ZCOOL XiaoWei）', cssUrl: 'https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap&subset=chinese-simplified' },
  { name: 'ZCOOL QingKe HuangYou', displayName: '站酷庆科黄油（ZCOOL QingKe HuangYou）', cssUrl: 'https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou&display=swap&subset=chinese-simplified' },
  { name: 'Long Cang', displayName: '龙藏行书（Long Cang）', cssUrl: 'https://fonts.googleapis.com/css2?family=Long+Cang&display=swap&subset=chinese-simplified' }
]

export const DEFAULT_THEMES: any[] = [
  {
    id: "edge-yellow",
    name: "锋黄",
    description: "黄黑撞色，专业又带点锐气。",
    logo: null,
    logo_url: null,
    company_name: null,

    data: {
      colors: {
        primary: "#f5f547",
        background: "#1f1f1f",
        card: "#424242",
        stroke: "#585858",
        primary_text: "#161616",
        background_text: "#f5f547",
        graph_0: "#ffff54",
        graph_1: "#f1f142",
        graph_2: "#dada15",
        graph_3: "#c1bf00",
        graph_4: "#a8a600",
        graph_5: "#908c00",
        graph_6: "#797400",
        graph_7: "#625c00",
        graph_8: "#4d4500",
        graph_9: "#382f00"
      },
      fonts: {
        textFont: {
          name: "Playfair Display",
          url: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&display=swap"
        }
      }
    }
  },
  {
    id: "light-rose",
    name: "浅玫瑰",
    description: "玫瑰底色搭配活力字体。",
    logo: null,
    logo_url: null,
    company_name: null,

    data: {
      colors: {
        "primary": "#030204",
        background: "#f69c9c",
        card: "#ffaeb4",
        stroke: "#bf6a6b",
        primary_text: "#bebebe",
        background_text: "#030202",
        graph_0: "#2f2c32",
        graph_1: "#444147",
        graph_2: "#5a565d",
        graph_3: "#706d73",
        graph_4: "#88848b",
        graph_5: "#a09da4",
        graph_6: "#b9b6bd",
        graph_7: "#d3cfd6",
        graph_8: "#eae6ed",
        graph_9: "#f7f3fb"
      },
      fonts: {
        textFont: {
          name: "Overpass",
          url: "https://fonts.googleapis.com/css2?family=Overpass:wght@100..900&display=swap"
        }
      }
    }
  },
  {
    id: "mint-blue",
    name: "薄荷蓝",
    description: "薄荷绿底色，蓝色标题。",
    logo: null,
    logo_url: null,
    company_name: null,

    data: {
      colors: {
        primary: "#3b3172",
        background: "#ffffff",
        card: "#80e7cf",
        stroke: "#d1d1d1",
        primary_text: "#ffffff",
        background_text: "#3b3172",
        graph_0: "#003d2d",
        graph_1: "#005341",
        graph_2: "#006a57",
        graph_3: "#00826d",
        graph_4: "#2b9a85",
        graph_5: "#4ab39d",
        graph_6: "#65cdb6",
        graph_7: "#80e7cf",
        graph_8: "#98ffe6",
        graph_9: "#a5fff4"
      },
      fonts: {
        textFont: {
          name: "Prompt",
          url: "https://fonts.googleapis.com/css2?family=Prompt:wght@100..900&display=swap"
        }
      }
    }
  },
  {
    id: "professional-blue",
    name: "商务蓝",
    description: "简洁专业的蓝色主题。",
    logo: null,
    logo_url: null,
    company_name: null,

    data: {
      colors: {
        primary: "#161616",
        background: "#ffffff",
        card: "#dae6ff",
        stroke: "#d1d1d1",
        primary_text: "#eeeaea",
        background_text: "#000000",
        graph_0: "#2e2e2e",
        graph_1: "#424242",
        graph_2: "#585858",
        graph_3: "#6f6f6f",
        graph_4: "#868686",
        graph_5: "#9e9e9e",
        graph_6: "#b7b7b7",
        graph_7: "#d1d1d1",
        graph_8: "#e8e8e8",
        graph_9: "#f5f5f5"
      },
      fonts: {
        textFont: {
          name: "Inter",
          url: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        }
      }
    }
  },
  {
    id: "professional-dark",
    name: "商务深色",
    description: "简洁专业，适合深色商务场景。",
    logo: null,
    logo_url: null,
    company_name: null,

    data: {
      colors: {
        primary: "#eff5f1",
        background: "#050505",
        card: "#424242",
        stroke: "#585858",
        primary_text: "#050505",
        background_text: "#eff5f1",
        graph_0: "#ebf6ff",
        graph_1: "#dee8fa",
        graph_2: "#c7d2e3",
        graph_3: "#aeb8c9",
        graph_4: "#959fb0",
        graph_5: "#7d8797",
        graph_6: "#666f7f",
        graph_7: "#505867",
        graph_8: "#3a4351",
        graph_9: "#262e3c"
      },
      fonts: {
        textFont: {
          name: "Instrument Sans",
          url: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap"
        }
      }
    }
  },
  {
    id: "deep-ocean",
    name: "深海蓝",
    description: "深蓝配青，清爽专业，适合科技与企业场景。",
    logo: null,
    logo_url: null,
    company_name: null,
    data: {
      colors: {
        primary: "#1d4ed8",
        background: "#ffffff",
        card: "#eef2ff",
        stroke: "#d6dcee",
        primary_text: "#ffffff",
        background_text: "#0f1b3d",
        graph_0: "#1d4ed8",
        graph_1: "#0d9488",
        graph_2: "#6366f1",
        graph_3: "#0ea5e9",
        graph_4: "#14b8a6",
        graph_5: "#8b5cf6",
        graph_6: "#f59e0b",
        graph_7: "#ef4444",
        graph_8: "#22c55e",
        graph_9: "#64748b"
      },
      fonts: {
        textFont: {
          name: "Inter",
          url: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        }
      }
    }
  },
  {
    id: "graphite-tech",
    name: "石墨科技",
    description: "近黑底配电光青，暗色科技感，适合互联网产品。",
    logo: null,
    logo_url: null,
    company_name: null,
    data: {
      colors: {
        primary: "#22d3ee",
        background: "#0d1117",
        card: "#161b22",
        stroke: "#2a313c",
        primary_text: "#04141a",
        background_text: "#e6edf3",
        graph_0: "#22d3ee",
        graph_1: "#3b82f6",
        graph_2: "#a78bfa",
        graph_3: "#f472b6",
        graph_4: "#2dd4bf",
        graph_5: "#38bdf8",
        graph_6: "#818cf8",
        graph_7: "#a3e635",
        graph_8: "#fbbf24",
        graph_9: "#fb7185"
      },
      fonts: {
        textFont: {
          name: "Montserrat",
          url: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap"
        }
      }
    }
  },
  {
    id: "emerald-finance",
    name: "翡翠金融",
    description: "祖母绿配金，奶白衬线，高端稳重，适合金融与投资。",
    logo: null,
    logo_url: null,
    company_name: null,
    data: {
      colors: {
        primary: "#047857",
        background: "#fbfaf7",
        card: "#eaf2ec",
        stroke: "#d8d2c4",
        primary_text: "#ffffff",
        background_text: "#14271f",
        graph_0: "#047857",
        graph_1: "#c79a3a",
        graph_2: "#0d9488",
        graph_3: "#65a30d",
        graph_4: "#15803d",
        graph_5: "#d97706",
        graph_6: "#4d7c5a",
        graph_7: "#92722a",
        graph_8: "#5b6b63",
        graph_9: "#1e3a2f"
      },
      fonts: {
        textFont: {
          name: "Lora",
          url: "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap"
        }
      }
    }
  },
  {
    id: "warm-sun",
    name: "暖阳橙",
    description: "暖橙圆体，亲和活力，适合教育与培训。",
    logo: null,
    logo_url: null,
    company_name: null,
    data: {
      colors: {
        primary: "#c2410c",
        background: "#fffaf3",
        card: "#ffedd5",
        stroke: "#f0d9bf",
        primary_text: "#ffffff",
        background_text: "#3d2510",
        graph_0: "#ea580c",
        graph_1: "#f59e0b",
        graph_2: "#0d9488",
        graph_3: "#eab308",
        graph_4: "#dc2626",
        graph_5: "#16a34a",
        graph_6: "#b45309",
        graph_7: "#0ea5e9",
        graph_8: "#e11d48",
        graph_9: "#84cc16"
      },
      fonts: {
        textFont: {
          name: "Nunito",
          url: "https://fonts.googleapis.com/css2?family=Nunito:wght@200..1000&display=swap"
        }
      }
    }
  },
  {
    id: "clinical-teal",
    name: "临床青",
    description: "青绿配纯白，干净专业，适合医疗与健康。",
    logo: null,
    logo_url: null,
    company_name: null,
    data: {
      colors: {
        primary: "#0f766e",
        background: "#ffffff",
        card: "#e6f5f3",
        stroke: "#cfe6e2",
        primary_text: "#ffffff",
        background_text: "#0f2e2a",
        graph_0: "#0f766e",
        graph_1: "#2563eb",
        graph_2: "#16a34a",
        graph_3: "#06b6d4",
        graph_4: "#4f46e5",
        graph_5: "#0ea5e9",
        graph_6: "#10b981",
        graph_7: "#64748b",
        graph_8: "#7c3aed",
        graph_9: "#f59e0b"
      },
      fonts: {
        textFont: {
          name: "Open Sans",
          url: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap"
        }
      }
    }
  },
  {
    id: "govern-red",
    name: "政务正红",
    description: "中国红配金，米白底，庄重权威，适合政务与汇报。",
    logo: null,
    logo_url: null,
    company_name: null,
    data: {
      colors: {
        primary: "#c8102e",
        background: "#fffdf9",
        card: "#fbeaec",
        stroke: "#e8d9c8",
        primary_text: "#ffffff",
        background_text: "#1f1a17",
        graph_0: "#c8102e",
        graph_1: "#b8860b",
        graph_2: "#8c0d22",
        graph_3: "#d4a017",
        graph_4: "#6b7280",
        graph_5: "#1e3a5f",
        graph_6: "#7f1d1d",
        graph_7: "#a16207",
        graph_8: "#44403c",
        graph_9: "#4d7c0f"
      },
      fonts: {
        textFont: {
          name: "Source Sans Pro",
          url: "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200..900&display=swap"
        }
      }
    }
  },
  {
    id: "twilight-purple",
    name: "暮光紫",
    description: "紫罗兰配品红，时尚活泼，适合营销与创意。",
    logo: null,
    logo_url: null,
    company_name: null,
    data: {
      colors: {
        primary: "#7c3aed",
        background: "#ffffff",
        card: "#f3e8ff",
        stroke: "#e4d4f4",
        primary_text: "#ffffff",
        background_text: "#2a1245",
        graph_0: "#7c3aed",
        graph_1: "#db2777",
        graph_2: "#2563eb",
        graph_3: "#ec4899",
        graph_4: "#4f46e5",
        graph_5: "#c026d3",
        graph_6: "#0ea5e9",
        graph_7: "#f43f5e",
        graph_8: "#14b8a6",
        graph_9: "#f59e0b"
      },
      fonts: {
        textFont: {
          name: "Raleway",
          url: "https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap"
        }
      }
    }
  },
  {
    id: "midnight-neon",
    name: "午夜霓虹",
    description: "深空底配霓虹粉青，炫酷未来，适合发布会。",
    logo: null,
    logo_url: null,
    company_name: null,
    data: {
      colors: {
        primary: "#ff2d95",
        background: "#0a0a12",
        card: "#15151f",
        stroke: "#2a2a3a",
        primary_text: "#12030a",
        background_text: "#f0eefb",
        graph_0: "#ff2d95",
        graph_1: "#22d3ee",
        graph_2: "#a78bfa",
        graph_3: "#a3e635",
        graph_4: "#3b82f6",
        graph_5: "#e879f9",
        graph_6: "#2dd4bf",
        graph_7: "#fbbf24",
        graph_8: "#38bdf8",
        graph_9: "#fb7185"
      },
      fonts: {
        textFont: {
          name: "Kanit",
          url: "https://fonts.googleapis.com/css2?family=Kanit:wght@100..900&display=swap"
        }
      }
    }
  },
  {
    id: "ink-wash",
    name: "墨韵",
    description: "宣纸墨黑配朱砂，水墨国潮，适合文化与国风。",
    logo: null,
    logo_url: null,
    company_name: null,
    data: {
      colors: {
        primary: "#9d2933",
        background: "#f5f1e6",
        card: "#ece4d2",
        stroke: "#d8cbb0",
        primary_text: "#f5f1e6",
        background_text: "#1c1a17",
        graph_0: "#1c1a17",
        graph_1: "#9d2933",
        graph_2: "#8a6d3b",
        graph_3: "#3a5a6b",
        graph_4: "#5e7355",
        graph_5: "#7a5230",
        graph_6: "#595550",
        graph_7: "#b8860b",
        graph_8: "#4a3b52",
        graph_9: "#2f4538"
      },
      fonts: {
        textFont: {
          name: "Fraunces",
          url: "https://fonts.googleapis.com/css2?family=Fraunces:wght@300..900&display=swap"
        }
      }
    }
  },
  {
    id: "data-indigo",
    name: "数据靛蓝",
    description: "靛蓝配多彩图表色，适合数据报告与年报。",
    logo: null,
    logo_url: null,
    company_name: null,
    data: {
      colors: {
        primary: "#4338ca",
        background: "#ffffff",
        card: "#eef2ff",
        stroke: "#d8ddf0",
        primary_text: "#ffffff",
        background_text: "#15183a",
        graph_0: "#4338ca",
        graph_1: "#059669",
        graph_2: "#f59e0b",
        graph_3: "#e11d48",
        graph_4: "#0ea5e9",
        graph_5: "#7c3aed",
        graph_6: "#0d9488",
        graph_7: "#ea580c",
        graph_8: "#2563eb",
        graph_9: "#db2777"
      },
      fonts: {
        textFont: {
          name: "DM Sans",
          url: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
        }
      }
    }
  }
]