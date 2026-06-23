"use client";
import { useEffect, useRef, useState } from "react";
import {
  Loader2,
  RefreshCw,
  Trash2,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { notify } from "@/components/ui/sonner";
import { getApiUrl } from "@/utils/api";
import { MixpanelEvent, trackEvent } from "@/utils/mixpanel";
import { usePathname, useRouter } from "next/navigation";
import { syncStoreAfterCodexSignOut } from "@/utils/storeHelpers";
import {
  DEFAULT_CODEX_MODEL,
  isSupportedCodexModel,
} from "@/utils/codexModels";

interface CodexConfigProps {
  codexModel: string;
  onInputChange: (value: string | boolean, field: string) => void;
  onAuthStatusChange?: (authenticated: boolean) => void;
}

type AuthStatus = "checking" | "unauthenticated" | "polling" | "authenticated";

interface StatusResponse {
  status: string;
  account_id?: string;
  username?: string;
  email?: string;
  is_pro?: boolean;
  detail?: string;
}

export default function CodexConfig({
  codexModel,
  onInputChange,
  onAuthStatusChange,
}: CodexConfigProps) {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [accountId, setAccountId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [isExchanging, setIsExchanging] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const stopPolling = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    checkCurrentAuthStatus();
    return () => stopPolling();
  }, []);

  useEffect(() => {
    onAuthStatusChange?.(authStatus === "authenticated");
  }, [authStatus, onAuthStatusChange]);

  useEffect(() => {
    if (codexModel && !isSupportedCodexModel(codexModel)) {
      onInputChange(DEFAULT_CODEX_MODEL, "codex_model");
    }
  }, [codexModel, onInputChange]);

  const applyProfile = (data: Partial<StatusResponse>) => {
    setAccountId(data.account_id ?? null);
    setUsername(data.username ?? null);
    setEmail(data.email ?? null);
  };

  const checkCurrentAuthStatus = async () => {
    try {
      const res = await fetch(getApiUrl("/api/v1/ppt/codex/auth/status"));
      if (!res.ok) {
        setAuthStatus("unauthenticated");
        applyProfile({});
        return;
      }
      const data: StatusResponse = await res.json();
      if (data.status === "authenticated") {
        onInputChange('codex', 'LLM');
        if (!isSupportedCodexModel(codexModel)) {
          onInputChange(DEFAULT_CODEX_MODEL, 'codex_model');
        }
        setAuthStatus("authenticated");
        applyProfile(data);
      } else {
        setAuthStatus("unauthenticated");
        applyProfile({});
      }
    } catch {
      setAuthStatus("unauthenticated");
      applyProfile({});
    }
  };

  const handleSignIn = async () => {
    try {

      trackEvent(MixpanelEvent.Codex_SignIn_API_Call);
      onInputChange('codex', 'LLM');

      const res = await fetch(getApiUrl("/api/v1/ppt/codex/auth/initiate"), {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to initiate auth");
      const data = await res.json();
      const { session_id, url } = data;

      setSessionId(session_id);
      setAuthStatus("polling");
      window.open(url, "_blank", "noopener,noreferrer");

      pollIntervalRef.current = setInterval(async () => {
        try {
          const pollRes = await fetch(
            getApiUrl(`/api/v1/ppt/codex/auth/status/${session_id}`)
          );
          if (!pollRes.ok) return;
          const pollData: StatusResponse = await pollRes.json();

          if (pollData.status === "success") {
            trackEvent(MixpanelEvent.Codex_SignIn_Completed, { method: "browser_poll" });
            stopPolling();
            setAuthStatus("authenticated");
            applyProfile(pollData);
            setSessionId(null);
            if (!isSupportedCodexModel(codexModel)) {
              onInputChange(DEFAULT_CODEX_MODEL, "codex_model");
            }
            notify.success(
              "已登录 ChatGPT",
              "你的 ChatGPT 账号已连接，可以使用了。"
            );
          } else if (pollData.status === "failed") {
            trackEvent(MixpanelEvent.Codex_SignIn_Failed, { method: "browser_poll" });
            stopPolling();
            setAuthStatus("unauthenticated");
            applyProfile({});
            notify.error(
              "登录失败",
              "认证未完成，请重新登录。"
            );
          }
        } catch {
          // keep polling on transient errors
        }
      }, 2000);
    } catch (err) {
      trackEvent(MixpanelEvent.Codex_SignIn_Failed, { method: "initiate" });
      notify.error(
        "登录失败",
        "无法启动登录流程，请重试。"
      );
      setAuthStatus("unauthenticated");
      applyProfile({});
    }
  };

  const handleManualExchange = async () => {
    if (!sessionId || !manualCode.trim()) return;
    setIsExchanging(true);
    try {
      const res = await fetch(getApiUrl("/api/v1/ppt/codex/auth/exchange"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, code: manualCode.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Exchange failed");
      }
      const data = await res.json();
      trackEvent(MixpanelEvent.Codex_SignIn_Completed, { method: "manual_exchange" });
      stopPolling();
      setAuthStatus("authenticated");
      applyProfile(data);
      setSessionId(null);
      setManualCode("");
      if (!isSupportedCodexModel(codexModel)) {
        onInputChange(DEFAULT_CODEX_MODEL, "codex_model");
      }
      notify.success(
        "已登录 ChatGPT",
        "你的 ChatGPT 账号已连接，可以使用了。"
      );
    } catch (err: any) {
      trackEvent(MixpanelEvent.Codex_SignIn_Failed, { method: "manual_exchange" });
      notify.error(
        "登录失败",
        err.message || "验证码无法被接受，请重试。"
      );
    } finally {
      setIsExchanging(false);
    }
  };

  const handleCancelPolling = () => {
    trackEvent(MixpanelEvent.Codex_SignIn_Cancelled);
    stopPolling();
    setSessionId(null);
    setManualCode("");
    setAuthStatus("unauthenticated");
  };

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await fetch(getApiUrl("/api/v1/ppt/codex/auth/logout"), { method: "POST" });
      trackEvent(MixpanelEvent.Codex_Signed_Out);
      setAuthStatus("unauthenticated");
      setAccountId(null);
      setUsername(null);
      setEmail(null);
      onInputChange("", "codex_model");
      onInputChange("", "CODEX_ACCESS_TOKEN");
      onInputChange("", "CODEX_REFRESH_TOKEN");
      onInputChange("", "CODEX_TOKEN_EXPIRES");
      onInputChange("", "CODEX_ACCOUNT_ID");
      onInputChange("", "CODEX_USERNAME");
      onInputChange("", "CODEX_EMAIL");
      onInputChange(false, "CODEX_IS_PRO");
      syncStoreAfterCodexSignOut();
      router.replace(pathname.startsWith("/settings") ? "/settings" : "/");
      notify.success(
        "已退出登录",
        "已断开与 ChatGPT 的连接。"
      );
    } catch {
      notify.error(
        "退出登录失败",
        "无法断开与 ChatGPT 的连接，请重试。"
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleRefreshToken = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(getApiUrl("/api/v1/ppt/codex/auth/refresh"), {
        method: "POST",
      });
      if (!res.ok) throw new Error("Refresh failed");
      const data = await res.json();
      applyProfile(data);
      notify.success(
        "会话已刷新",
        "已成功续期你的 ChatGPT 连接。"
      );
    } catch {
      notify.error(
        "会话刷新失败",
        "无法续期你的 ChatGPT 会话，请重新登录。"
      );
      setAuthStatus("unauthenticated");
      applyProfile({});
    } finally {
      setIsRefreshing(false);
    }
  };

  if (authStatus === "checking") {
    return (
      <div className="mb-5 w-full p-3 border border-[#EDEEEF] font-syne rounded-[8px] flex items-center gap-6">
        <div className="w-[74px] h-[74px] bg-[#333333] rounded-full flex items-center justify-center shrink-0">
          <Loader2 className="w-10 h-10 text-[#191919] animate-spin" />
        </div>
        <div className="text-start flex-1 min-w-0">
          <h4 className="text-[#191919] text-lg font-medium">正在检查状态</h4>
          <p className="text-[#B3B3B3] text-sm font-normal">
            正在验证你的 ChatGPT 连接…
          </p>
        </div>
      </div>
    );
  }

  if (authStatus === "polling") {
    return (
      <div className="mb-5 space-y-4 font-syne">
        <div className="w-full p-3 border border-[#EDEEEF] rounded-[8px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 min-w-0 flex-1">
            <div className="w-[40px] h-[40px] bg-[#EDEEEF] rounded-full flex items-center justify-center shrink-0">
              <Loader2 className="w-5 h-5 text-[#191919] animate-spin" />
            </div>
            <div className="text-start min-w-0">
              <h4 className="text-[#191919] text-lg font-medium">等待登录</h4>
              <p className="text-[#B3B3B3] text-sm font-normal">
                请在我们打开的浏览器标签页中完成登录。
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCancelPolling}
            className="shrink-0 text-sm text-[#B3B3B3] hover:text-[#191919] underline underline-offset-2 transition-colors"
          >
            取消
          </button>
        </div>

        <div className="space-y-2 rounded-[8px] border border-[#EDEEEF] p-3">
          <p className="text-[#191919] text-xs font-normal">
            如果没有自动跳转，请粘贴重定向 URL 或验证码
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="粘贴 URL 或验证码…"
              className="flex-1 min-w-0 px-3 py-2.5 outline-none border border-[#EDEEEF] rounded-[8px]  text-sm text-[#191919] placeholder:text-[#666666] focus:border-[#555555] transition-colors"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
            />
            <button
              type="button"
              onClick={handleManualExchange}
              disabled={isExchanging || !manualCode.trim()}
              className="shrink-0 px-4 py-2.5 bg-[#EDEEEF] hover:bg-[#E4E5E6] disabled:opacity-40 disabled:hover:bg-[#EDEEEF] rounded-[8px] text-sm font-medium text-[#191919] transition-colors flex items-center justify-center min-w-[88px]"
            >
              {isExchanging ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "提交"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (authStatus === "authenticated") {

    return (
      <div className=" mb-5">
        <div className="flex items-center justify-between gap-3 p-5  border border-[#EDEEEF] rounded-[8px]">
          <div className="flex items-center gap-3">

            <div className="w-[40px] h-[40px] bg-[#333333] rounded-full flex items-center justify-center" >

              <img src="/providers/OpenAI-white.png" alt="OpenAI 标志" className="w-[27px] h-[27px]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <p className="text-sm font-medium text-[#191919] truncate">
                  {username || email || (accountId ? `账号 ${accountId}` : "ChatGPT 账号")}
                </p>

              </div>
              {email && username && (
                <p className="text-xs text-[#B3B3B3] truncate">{email}</p>
              )}
              {!email && accountId && (
                <p className="text-xs text-[#B3B3B3] truncate">ID: {accountId}</p>
              )}
              <p className="text-xs text-[#B3B3B3]">已登录 ChatGPT</p>
            </div>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={handleRefreshToken}
              disabled={isRefreshing}
              title="刷新令牌"
              className="flex items-center justify-center px-3.5 py-2.5  border border-[#EDEEEF] rounded-[58px] minid:opacity-40 transition-colors"
            >
              {isRefreshing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#191919]" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5 text-[#191919]" />
              )}
            </button>
            <button
              onClick={handleSignOut}
              disabled={isLoggingOut}
              title="退出登录"
              className="flex items-center justify-center px-3.5 py-2.5  border border-[#EDEEEF] rounded-[58px]  disabled:opacity-40 transition-colors"
            >
              {isLoggingOut ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#191919]" />
              ) : (
                <Trash2 className="w-3.5 h-3.5 text-[#191919]" />
              )}
            </button>
          </div>
        </div>


      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className=" w-full  p-5 border border-[#EDEEEF] font-syne  hover:bg-[#F7F6F9] transition-colors duration-300   rounded-[12px] flex items-center   justify-between  "
    >
      <div className="flex items-center gap-2 flex-1">
        <div className="w-[40px] h-[40px] bg-[#333333] rounded-full flex items-center justify-center" >

          <img src="/providers/OpenAI-white.png" alt="OpenAI 标志" className="w-[27px] h-[27px]" />
        </div>
        <div className="text-start flex-1">
          <h4 className="text-[#191919] text-sm font-medium">使用 ChatGPT 登录</h4>
          <p className="text-[#B3B3B3]   text-xs font-normal">使用你的 ChatGPT 账号 —— 无需 API 密钥</p>
        </div>
      </div>
      <ArrowRight className="w-[22px] h-[22px] text-[#4C4C4C]" />
    </button>
  );
}
