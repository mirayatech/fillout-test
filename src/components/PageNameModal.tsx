import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "../utils/cn";
import type { PageType } from "./PageTypeModal";

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

  if (!isOpen || !pageType) return null;

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

  const IconComponent = pageType.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                pageType.id === "form" && "bg-orange-100 text-orange-600",
                pageType.id === "cover" && "bg-blue-100 text-blue-600",
                pageType.id === "ending" && "bg-red-100 text-red-600",
                pageType.id === "review" && "bg-purple-100 text-purple-600",
                pageType.id === "payment" && "bg-pink-100 text-pink-600",
                pageType.id === "login" && "bg-green-100 text-green-600",
                pageType.id === "scheduling" && "bg-gray-100 text-gray-600"
              )}
            >
              <IconComponent size={16} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Name your {pageType.name.toLowerCase()} page
            </h2>
          </div>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 pt-0">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            disabled={!pageName.trim()}
            className={cn(
              "px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
              pageName.trim()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
