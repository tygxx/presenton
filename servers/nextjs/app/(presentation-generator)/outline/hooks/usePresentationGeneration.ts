import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { notify } from "@/components/ui/sonner";
import { clearPresentationData } from "@/store/slices/presentationGeneration";
import { PresentationGenerationApi } from "../../services/api/presentation-generation";
import { LoadingState, TABS } from "../types/index";
import { TemplateLayoutsWithSettings } from "@/app/presentation-templates/utils";
import { getCustomTemplateDetails } from "@/app/hooks/useCustomTemplates";
import { MixpanelEvent, trackEvent } from "@/utils/mixpanel";

const DEFAULT_LOADING_STATE: LoadingState = {
  message: "",
  isLoading: false,
  showProgress: false,
  duration: 0,
};

export const usePresentationGeneration = (
  presentationId: string | null,
  outlines: { content: string }[] | null,
  selectedTemplate: TemplateLayoutsWithSettings | string | null,
  setActiveTab: (tab: string) => void
) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [loadingState, setLoadingState] = useState<LoadingState>(
    DEFAULT_LOADING_STATE
  );

  const validateInputs = useCallback(() => {
    if (!outlines || outlines.length === 0) {
      notify.warning(
        "大纲尚未就绪",
        "请等待大纲生成完成后再继续。"
      );
      return false;
    }

    if (!selectedTemplate) {
      notify.warning(
        "未选择版式",
        "请先选择一个版式分组，再生成演示文稿。"
      );
      return false;
    }

    return true;
  }, [outlines, selectedTemplate]);

  const clearTheme = () => {
    const element = document.getElementById("presentation-page");
    if (!element) return;
    element.style.removeProperty("--primary-color");
    element.style.removeProperty("--background-color");
    element.style.removeProperty("--card-color");
    element.style.removeProperty("--stroke");
    element.style.removeProperty("--primary-text");
    element.style.removeProperty("--background-text");
    element.style.removeProperty("--graph-0");
    element.style.removeProperty("--graph-1");
    element.style.removeProperty("--graph-2");
    element.style.removeProperty("--graph-3");
    element.style.removeProperty("--graph-4");
    element.style.removeProperty("--graph-5");
    element.style.removeProperty("--graph-6");
    element.style.removeProperty("--graph-7");
    element.style.removeProperty("--graph-8");
    element.style.removeProperty("--graph-9");
  };

  const handleSubmit = useCallback(async () => {
    if (!selectedTemplate) {
      setActiveTab(TABS.LAYOUTS);
      return;
    }
    if (!validateInputs()) return;

    const selectedTemplateId =
      typeof selectedTemplate === "string"
        ? selectedTemplate
        : selectedTemplate?.id || null;
    const selectedTemplateType =
      typeof selectedTemplate === "string" ? "custom" : "built_in";
    const selectedTemplateName =
      typeof selectedTemplate === "string"
        ? null
        : selectedTemplate?.name || null;
    const selectedTemplateLayoutCount =
      typeof selectedTemplate === "string"
        ? null
        : selectedTemplate?.layouts?.length || 0;

    trackEvent(MixpanelEvent.Outline_Presentation_Generation_Started, {
      pathname,
      presentation_id: presentationId,
      outline_count: outlines?.length || 0,
      template_id: selectedTemplateId,
      template_type: selectedTemplateType,
      template_name: selectedTemplateName,
      template_layout_count: selectedTemplateLayoutCount,
    });

    setLoadingState({
      message: "正在生成演示文稿数据……",
      isLoading: true,
      showProgress: true,
      duration: 30,
    });

    try {
      let layout;

      // Check if it's a custom template (string = presentationId)
      if (typeof selectedTemplate === "string") {
        setLoadingState({
          message: "正在加载自定义模板……",
          isLoading: true,
          showProgress: true,
          duration: 30,
        });

        // Fetch custom template details using the shared function
        const customTemplateDetail = await getCustomTemplateDetails(
          selectedTemplate
        );

        if (
          !customTemplateDetail ||
          customTemplateDetail.layouts.length === 0
        ) {
          notify.error("模板错误", "加载自定义模板版式失败。");
          return;
        }

        setLoadingState({
          message: "正在生成演示文稿数据……",
          isLoading: true,
          showProgress: true,
          duration: 30,
        });

        layout = {
          name: customTemplateDetail.id,
          ordered: false,
          icon_weight: "bold",
          slides: customTemplateDetail.layouts.map((compiledLayout) => ({
            id: customTemplateDetail.id.startsWith("custom-")
              ? `${customTemplateDetail.id}:${compiledLayout.layoutId}`
              : `custom-${customTemplateDetail.id}:${compiledLayout.layoutId}`,
            name: compiledLayout.layoutName,
            description: compiledLayout.layoutDescription,
            templateID: customTemplateDetail.id,
            templateName: customTemplateDetail.name,
            json_schema: compiledLayout.schemaJSON,
          })),
        };
      } else {
        // Built-in template
        layout = {
          name: selectedTemplate.id,
          ordered: false,
          icon_weight: selectedTemplate.settings?.icon_weight || "bold",
          slides: selectedTemplate.layouts.map((layoutItem: any) => ({
            id: layoutItem.layoutId,
            name: layoutItem.layoutName,
            description: layoutItem.layoutDescription,
            templateID: selectedTemplate.id,
            templateName: selectedTemplate.name,
            json_schema: layoutItem.schemaJSON,
          })),
        };
      }

      const response = await PresentationGenerationApi.presentationPrepare({
        presentation_id: presentationId,
        outlines: outlines,
        layout: layout,
      });

      if (response) {
        dispatch(clearPresentationData());
        clearTheme();
        router.replace(
          `/presentation?id=${presentationId}&stream=true&type=standard`
        );
      }
    } catch (error: any) {
      console.error("Error In Presentation Generation(prepare).", error);
      notify.error(
        "生成出错",
        error.message || "生成演示文稿时出错。"
      );
    } finally {
      setLoadingState(DEFAULT_LOADING_STATE);
    }
  }, [
    validateInputs,
    presentationId,
    outlines,
    dispatch,
    router,
    selectedTemplate,
    pathname,
  ]);

  return { loadingState, handleSubmit };
};
