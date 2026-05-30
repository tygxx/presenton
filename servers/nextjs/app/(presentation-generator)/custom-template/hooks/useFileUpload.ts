import { useState, useCallback } from "react";
import { notify } from "@/components/ui/sonner";

export const useFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      const lowerName = file.name.toLowerCase();
      const isPptx = lowerName.endsWith(".pptx");
      if (!isPptx) {
        notify.error("文件无效", "请选择有效的 PPTX 文件。");
        return;
      }

      // Validate file size (100MB limit)
      const maxSize = 100 * 1024 * 1024; // 100MB
      if (file.size > maxSize) {
        notify.error("文件过大", "文件大小必须小于 100MB。");
        return;
      }

      setSelectedFile(file);
    },
    []
  );

  const removeFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  return {
    selectedFile,
    handleFileSelect,
    removeFile,
  };
}; 