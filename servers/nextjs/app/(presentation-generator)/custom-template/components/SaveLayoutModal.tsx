
'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Save, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import ToolTip from "@/components/ToolTip";

interface SaveLayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (layoutName: string, description: string, template_info_id: string) => Promise<string | null>;
  isSaving: boolean;
  template_info_id: string;
}

export const SaveLayoutModal: React.FC<SaveLayoutModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isSaving,
  template_info_id,
}) => {

  const [layoutName, setLayoutName] = useState("");
  const [description, setDescription] = useState("");


  const handleSave = async () => {
    if (!layoutName.trim()) {
      return; // Don't save if name is empty
    }
    await onSave(layoutName.trim(), description.trim(), template_info_id);


  };

  const handleClose = () => {
    if (!isSaving) {
      setLayoutName("");
      setDescription("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>

      <DialogContent className="sm:max-w-[480px] " style={{ zIndex: 1000 }}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <Save className="w-5 h-5 text-primary" />
              保存模板
            </span>

          </DialogTitle>
          <DialogDescription>
            为你的模板填写一个清晰的名称和可选的描述，方便日后查找。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label htmlFor="layout-name" className="text-sm font-medium">
              模板名称 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="layout-name"
              value={layoutName}
              onChange={(e) => setLayoutName(e.target.value)}
              placeholder="例如：现代科技路演"
              disabled={isSaving}
              className="w-full"
              aria-required
            />

          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-sm font-medium">
              描述 <span className="text-gray-400">（可选）</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="简要说明该模板最适合的使用场景..."
              disabled={isSaving}
              className="w-full resize-none"
              rows={3}
            />

          </div>
          {isSaving && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock-icon lucide-clock"><path d="M12 6v6l4 2"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="10s" repeatCount="indefinite" /></path><circle cx="12" cy="12" r="10" /></svg>
              <span>正在保存模板，请稍候...</span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSaving}
          >
            取消
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !layoutName.trim()}
            className="bg-green-600 hover:bg-green-700"
            aria-busy={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                保存中...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                保存模板
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  );
}; 