import { useState, useCallback } from "react";
import { notify } from "@/components/ui/sonner";
import { ApiResponseHandler } from "@/app/(presentation-generator)/services/api/api-error-handler";
import { ProcessedSlide } from "../types";
import { getHeader } from "@/app/(presentation-generator)/services/api/header";
import { getApiUrl } from "@/utils/api";
import { MixpanelEvent, trackEvent } from "@/utils/mixpanel";


export const useLayoutSaving = (
  slides: ProcessedSlide[],


) => {
  const [isSavingLayout, setIsSavingLayout] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSaveModal = useCallback(() => {
    trackEvent(MixpanelEvent.CustomTemplate_Save_Modal_Opened, {
      slide_count: slides.length,
      processed_slides: slides.filter((slide) => slide.processed).length,
    });
    setIsModalOpen(true);
  }, [slides]);

  const closeSaveModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);




  const saveLayout = useCallback(async (layoutName: string, description: string, template_info_id: string): Promise<string | null> => {
    if (!slides.length) {
      notify.error("没有可保存的幻灯片", "请先添加至少一张幻灯片，再保存模板。");
      return null;
    }

    setIsSavingLayout(true);

    try {
      trackEvent(MixpanelEvent.CustomTemplate_Save_Started, {
        template_info_id,
        layout_name: layoutName,
        layout_name_length: layoutName.length,
        description_length: description.length,
        slide_count: slides.length,
        processed_slides: slides.filter((slide) => slide.processed).length,
      });



      const reactComponents = slides.map((slide) => ({
        layout_id: `${slide.slide_number}`,
        layout_name: `Slide${slide.slide_number}`,
        layout_code: slide.react,
      }));


      // Save the layout components to the app_data/layouts folder
      const saveResponse = await fetch(
        getApiUrl(`/api/v1/ppt/template/save`),
        {
          method: "POST",
          headers: getHeader(),
          body: JSON.stringify({
            template_info_id: template_info_id,
            name: layoutName,
            description: description,
            layouts: reactComponents,

          }),
        }
      );

      const data = await ApiResponseHandler.handleResponse(
        saveResponse,
        "保存模板组件失败"
      );
      if (!data) {
        notify.error(
          "无法保存模板",
          "部分模板组件未能保存，请重试。"
        );
        return null;
      }

      // Mark all slides as saved (remove modified flag)
      slides.forEach((slide) => {
        slide.modified = false;
      });

      notify.success(
        "模板已保存",
        `模板“${layoutName}”已成功保存。`
      );
      trackEvent(MixpanelEvent.CustomTemplate_Saved, {
        template_info_id,
        saved_template_id: data.id,
        layout_name: layoutName,
        slide_count: slides.length,
      });

      closeSaveModal();
      return data.id;
    } catch (error) {
      console.error("Error saving layout:", error);
      notify.error(
        "保存模板失败",
        error instanceof Error
          ? error.message
          : "发生未知错误"
      );
      return null;
    } finally {
      setIsSavingLayout(false);
    }
  }, [slides, closeSaveModal]);

  return {
    isSavingLayout,
    isModalOpen,
    openSaveModal,
    closeSaveModal,
    saveLayout,
  };
}; 
