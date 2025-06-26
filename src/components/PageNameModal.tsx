import { useState } from "react";
import { cn } from "../utils/cn";
import type { PageType } from "./PageTypeModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";

interface PageNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (name: string) => void;
  pageType: PageType | null;
}

export default function PageNameModal({
  isOpen,
  onClose,
  onContinue,
  pageType,
}: PageNameModalProps) {
  const [pageName, setPageName] = useState("");

  const handleContinue = () => {
    if (pageName.trim()) {
      onContinue(pageName.trim());
      setPageName("");
    }
  };

  const handleCancel = () => {
    setPageName("");
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  if (!pageType) return null;

  const IconComponent = pageType.icon;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-white rounded-lg shadow-modal max-w-md w-full mx-4 p-0">
        <DialogHeader className="flex items-center justify-between p-4 border-b space-y-0">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "size-8 rounded-lg flex items-center justify-center",
                pageType.id === "form" && "bg-orange-100 text-orange-600",
                pageType.id === "cover" && "bg-blue-100 text-blue-600",
                pageType.id === "ending" && "bg-red-100 text-red-600",
                pageType.id === "review" && "bg-purple-100 text-purple-600",
                pageType.id === "payment" && "bg-pink-100 text-pink-600",
                pageType.id === "login" && "bg-green-100 text-green-600",
                pageType.id === "scheduling" && "bg-gray-100 text-gray-600"
              )}
            >
              <IconComponent className="size-4" />
            </div>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Name your {pageType.name.toLowerCase()} page
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-4">
          <div>
            <label
              htmlFor="pageName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Page name
            </label>
            <input
              id="pageName"
              type="text"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              placeholder={`Enter ${pageType.name.toLowerCase()} page name`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-900 transition-colors"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && pageName.trim()) {
                  handleContinue();
                }
                if (e.key === "Escape") {
                  handleCancel();
                }
              }}
            />
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-px p-6 pt-0">
          <button
            onClick={handleCancel}
            className="h-10 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:border-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            disabled={!pageName.trim()}
            className={cn(
              "h-10 px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors",
              pageName.trim()
                ? "bg-zinc-900 hover:bg-zinc-800"
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            Continue
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
