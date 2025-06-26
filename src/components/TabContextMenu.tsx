import { Flag, Edit2, Copy, Files, Trash2 } from "lucide-react";
import { useTabStore } from "../store/tabStore";

interface TabContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  tabId: string;
  onClose: () => void;
  onSetAsFirstPage?: (tabId: string) => void;
  onRename?: (tabId: string) => void;
  onCopy?: (tabId: string) => void;
  onDuplicate?: (tabId: string) => void;
  onDelete?: (tabId: string) => void;
}

export default function TabContextMenu({
  isOpen,
  position,
  tabId,
  onClose,
  onSetAsFirstPage,
  onRename,
  onCopy,
  onDuplicate,
  onDelete,
}: TabContextMenuProps) {
  const { removeTab, duplicateTab, updateTab, tabs, reorderTabs } =
    useTabStore();

  if (!isOpen) return null;

  const handleMenuAction = (action: () => void) => {
    action();
    onClose();
  };

  const handleSetAsFirstPage = () => {
    const currentTabs = [...tabs];
    const tabIndex = currentTabs.findIndex((tab) => tab.id === tabId);
    if (tabIndex > 0) {
      const [tab] = currentTabs.splice(tabIndex, 1);
      currentTabs.unshift(tab);
      reorderTabs(currentTabs);
    }
  };

  const handleRename = () => {
    const newName = prompt("Enter new tab name:");
    if (newName && newName.trim()) {
      updateTab(tabId, { label: newName.trim() });
    }
  };

  const handleCopy = () => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab) {
      navigator.clipboard.writeText(JSON.stringify(tab));
      console.log("Tab copied to clipboard:", tab);
    }
  };

  const handleDuplicate = () => {
    duplicateTab(tabId);
  };

  const handleDelete = () => {
    if (tabs.length > 1) {
      removeTab(tabId);
    } else {
      alert("Cannot delete the last tab");
    }
  };

  return (
    <div
      className="fixed z-50 w-[240px] bg-white rounded-xl shadow-[0px_1px_3px_rgba(0,0,0,0.04)] border-[0.5px] border-[#E1E1E1] overflow-hidden flex flex-col"
      style={{
        left: position.x,
        top: position.y,
        outline: "0.50px #E1E1E1 solid",
        outlineOffset: "-0.50px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-10 bg-[#FAFBFC] border-b-[0.5px] border-[#E1E1E1] flex items-center px-3">
        <div
          className="text-[#1A1A1A] text-base font-medium leading-6"
          style={{ fontFamily: "BL Melody, Inter, sans-serif" }}
        >
          Settings
        </div>
      </div>

      <div className="p-3 pb-[14px] flex flex-col gap-[14px]">
        <button
          className="w-full flex items-center gap-[6px] text-left group hover:bg-gray-50 rounded p-1 -m-1"
          onClick={() =>
            handleMenuAction(
              onSetAsFirstPage
                ? () => onSetAsFirstPage(tabId)
                : handleSetAsFirstPage
            )
          }
        >
          <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center">
            <Flag className="w-4 h-4 text-[#2F72E2]" />
          </div>
          <div
            className="flex-1 text-[#1A1A1A] text-sm font-medium leading-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Set as first page
          </div>
        </button>

        <button
          className="w-full flex items-center gap-[6px] text-left group hover:bg-gray-50 rounded p-1 -m-1"
          onClick={() =>
            handleMenuAction(onRename ? () => onRename(tabId) : handleRename)
          }
        >
          <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center">
            <Edit2 className="w-4 h-4 text-[#9DA4B2]" />
          </div>
          <div
            className="flex-1 text-[#1A1A1A] text-sm font-medium leading-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Rename
          </div>
        </button>

        <button
          className="w-full flex items-center gap-[6px] text-left group hover:bg-gray-50 rounded p-1 -m-1"
          onClick={() =>
            handleMenuAction(onCopy ? () => onCopy(tabId) : handleCopy)
          }
        >
          <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center">
            <Copy className="w-4 h-4 text-[#9DA4B2]" />
          </div>
          <div
            className="flex-1 text-[#1A1A1A] text-sm font-medium leading-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Copy
          </div>
        </button>

        <button
          className="w-full flex items-center gap-[6px] text-left group hover:bg-gray-50 rounded p-1 -m-1"
          onClick={() =>
            handleMenuAction(
              onDuplicate ? () => onDuplicate(tabId) : handleDuplicate
            )
          }
        >
          <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center">
            <Files className="w-4 h-4 text-[#9DA4B2]" />
          </div>
          <div
            className="flex-1 text-[#1A1A1A] text-sm font-medium leading-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Duplicate
          </div>
        </button>

        <div className="h-[0.5px] bg-[#E1E1E1]"></div>

        <button
          className="w-full flex items-center gap-[6px] text-left group hover:bg-red-50 rounded p-1 -m-1"
          onClick={() =>
            handleMenuAction(onDelete ? () => onDelete(tabId) : handleDelete)
          }
        >
          <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center">
            <Trash2 className="w-4 h-4 text-[#EF494F]" />
          </div>
          <div
            className="flex-1 text-[#EF494F] text-sm font-medium leading-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Delete
          </div>
        </button>
      </div>
    </div>
  );
}
