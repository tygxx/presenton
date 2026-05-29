export interface ModelOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  size: string;
}

export interface ImageProviderOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  requiresApiKey?: boolean;
  apiKeyField?: string;
  apiKeyFieldLabel?: string;
  getApiKeyUrl?: string;
}

export interface LLMProviderOption {
  value: string;
  label: string;
  description?: string;
  model_value?: string;
  model_label?: string;
  url?: string;
  icon?: string;
  getApiKeyUrl?: string;
}

export const IMAGE_PROVIDERS: Record<string, ImageProviderOption> = {
  pexels: {
    value: "pexels",
    label: "Pexels",
    description: "免费的图片与视频素材平台",
    icon: "/providers/pexel.png",
    requiresApiKey: true,
    apiKeyField: "PEXELS_API_KEY",
    apiKeyFieldLabel: "Pexels API 密钥",
    getApiKeyUrl: "https://docs.presenton.ai/help/get-api-keys/get-pexels-api-key",
  },
  pixabay: {
    value: "pixabay",
    label: "Pixabay",
    description: "免费的图片与视频",
    icon: "/providers/pixabay.png",
    requiresApiKey: true,
    apiKeyField: "PIXABAY_API_KEY",
    apiKeyFieldLabel: "Pixabay API 密钥",
    getApiKeyUrl: "https://docs.presenton.ai/help/get-api-keys/get-pixabay-api-key",
  },
  "dall-e-3": {
    value: "dall-e-3",
    label: "DALL-E 3",
    description: "OpenAI 的图像生成模型",
    icon: "/providers/openai.png",
    requiresApiKey: true,
    apiKeyField: "OPENAI_API_KEY",
    apiKeyFieldLabel: "OpenAI API 密钥",
    getApiKeyUrl: "https://www.google.com/search?q=how+to+get+openai+api+key&ie=UTF-8",
  },
  "gpt-image-1.5": {
    value: "gpt-image-1.5",
    label: "GPT Image 1.5",
    description: "OpenAI 的图像生成模型",
    icon: "/providers/openai.png",
    requiresApiKey: true,
    apiKeyField: "OPENAI_API_KEY",
    apiKeyFieldLabel: "OpenAI API 密钥",
    getApiKeyUrl: "https://www.google.com/search?q=how+to+get+openai+api+key&ie=UTF-8",
  },
  gemini_flash: {
    value: "gemini_flash",
    label: "Gemini Flash",
    description: "Google 的快速图像生成模型",
    icon: "/providers/gemini-color.svg",
    requiresApiKey: true,
    apiKeyField: "GOOGLE_API_KEY",
    apiKeyFieldLabel: "Google API 密钥",
    getApiKeyUrl: "https://www.google.com/search?q=how+to+get+google+AI+studio+api+key&sxsrf=ANbL-n5_hUGaEiG9v6k9VxZWyv0mqO0Jew%3A1776339625724",
  },
  nanobanana_pro: {
    value: "nanobanana_pro",
    label: "NanoBanana Pro",
    description: "Google 的高级图像生成模型",
    icon: "/providers/gemini-color.svg",
    requiresApiKey: true,
    apiKeyField: "GOOGLE_API_KEY",
    apiKeyFieldLabel: "Google API 密钥",
    getApiKeyUrl: "https://www.google.com/search?q=how+to+get+google+AI+studio+api+key&sxsrf=ANbL-n5_hUGaEiG9v6k9VxZWyv0mqO0Jew%3A1776339625724",
  },
  comfyui: {
    value: "comfyui",
    label: "ComfyUI",
    description: "使用你的本地 ComfyUI 服务器与自定义工作流",
    icon: "/providers/comfyui-color.svg",
    requiresApiKey: false,
    apiKeyField: "COMFYUI_URL",
    apiKeyFieldLabel: "ComfyUI 服务器地址",
  },
  open_webui: {
    value: "open_webui",
    label: "Open WebUI",
    description: "使用你的 Open WebUI 服务器进行图像生成",
    icon: "/icons/open-webui.png",
    requiresApiKey: false,
    apiKeyField: "OPEN_WEBUI_IMAGE_URL",
    apiKeyFieldLabel: "Open WebUI 地址",
  },
  openai_compatible: {
    value: "openai_compatible",
    label: "自定义",
    description:
      "OpenAI 兼容的 /v1/images 接口（LiteLLM、Azure、vLLM 等）",
    icon: "/providers/custom.svg",
    requiresApiKey: false,
    apiKeyField: "OPENAI_COMPAT_IMAGE_BASE_URL",
    apiKeyFieldLabel: "OpenAI 兼容基础地址",
  },
};

export const LLM_PROVIDERS: Record<string, LLMProviderOption> = {
  codex: {
    value: "codex",
    label: "ChatGPT",
    description: "通过 OAuth 使用 ChatGPT Plus/Pro",
    icon: "/providers/openai.png",
  },
  openai: {
    value: "openai",
    label: "OpenAI",
    description: "OpenAI 最新的文本生成模型",
    url: "https://api.openai.com/v1",
    icon: "/providers/openai.png",
    getApiKeyUrl: "https://www.google.com/search?q=how+to+get+openai+api+key&ie=UTF-8",
  },
  google: {
    value: "google",
    label: "Google",
    description: "Google 的主力文本生成模型",
    url: "https://api.google.com/v1",
    icon: "/providers/gemini-color.svg",
    getApiKeyUrl: "https://www.google.com/search?q=how+to+get+google+AI+studio+api+key&sxsrf=ANbL-n5_hUGaEiG9v6k9VxZWyv0mqO0Jew%3A1776339625724",
  },
  vertex: {
    value: "vertex",
    label: "Vertex AI",
    description: "Google Vertex AI 模型",
    icon: "/providers/gemini-color.svg",
    getApiKeyUrl: "https://www.google.com/search?q=how+to+get+vertex+ai+api+key",
  },
  azure: {
    value: "azure",
    label: "Azure OpenAI",
    description: "Azure 托管的 OpenAI 部署",
    icon: "/providers/openai.png",
    getApiKeyUrl: "https://www.google.com/search?q=azure+openai+api+key",
  },
  bedrock: {
    value: "bedrock",
    label: "Amazon Bedrock",
    description: "AWS Bedrock 基础模型",
    icon: "/providers/custom.svg",
  },
  openrouter: {
    value: "openrouter",
    label: "OpenRouter",
    description: "通过 OpenRouter 的 OpenAI 兼容 API 使用多种模型",
    url: "https://openrouter.ai/api/v1",
    icon: "/providers/openai.png",
    getApiKeyUrl: "https://openrouter.ai/keys",
  },
  cerebras: {
    value: "cerebras",
    label: "Cerebras",
    description: "通过 OpenAI 兼容 API 使用 Cerebras Cloud",
    url: "https://api.cerebras.ai/v1",
    icon: "/providers/openai.png",
    getApiKeyUrl: "https://inference-docs.cerebras.ai",
  },
  litellm: {
    value: "litellm",
    label: "LiteLLM",
    description: "OpenAI 兼容的 LiteLLM 代理或网关",
    icon: "/providers/openai.png",
  },
  fireworks: {
    value: "fireworks",
    label: "Fireworks",
    description: "通过 OpenAI 兼容 API 使用 Fireworks AI",
    url: "https://api.fireworks.ai/inference/v1",
    icon: "/providers/openai.png",
    getApiKeyUrl: "https://fireworks.ai/account/api-keys",
  },
  together: {
    value: "together",
    label: "Together AI",
    description: "通过 OpenAI 兼容 API 使用 Together AI",
    url: "https://api.together.ai/v1",
    icon: "/providers/openai.png",
    getApiKeyUrl: "https://api.together.xyz/settings/api-keys",
  },
  lmstudio: {
    value: "lmstudio",
    label: "LM Studio",
    description: "本地 LM Studio 的 OpenAI 兼容服务器",
    url: "http://localhost:1234/v1",
    icon: "/providers/custom.svg",
  },
  anthropic: {
    value: "anthropic",
    label: "Anthropic",
    description: "Anthropic 的 Claude 模型",
    url: "https://api.anthropic.com/v1",
    icon: "/providers/claude-color.svg",
    getApiKeyUrl: "https://www.google.com/search?q=how+to+get+anthropic+api+key&sxsrf=ANbL-n7lsueZQ88L56HhqC1ch2PGD0rbNQ%3A1776339632265",
  },
  ollama: {
    value: "ollama",
    label: "Ollama",
    description: "Ollama 的主力文本生成模型",
    icon: "/providers/ollama.svg",
  },
  custom: {
    value: "custom",
    label: "自定义",
    description: "OpenAI 兼容的大语言模型",
    icon: "/providers/custom.svg",
  },

};

export const DALLE_3_QUALITY_OPTIONS = [
  {
    label: "标准",
    value: "standard",
    description: "生成更快，成本更低",
  },
  {
    label: "HD",
    value: "hd",
    description: "画质更高，但成本增加",
  },
];

export const GPT_IMAGE_1_5_QUALITY_OPTIONS = [
  {
    label: "低",
    value: "low",
    description: "最快且最具性价比",
  },
  {
    label: "中",
    value: "medium",
    description: "画质与速度兼顾",
  },
  {
    label: "高",
    value: "high",
    description: "画质最佳，但生成耗时更长",
  },
];
