import { Flag, Edit2, Copy, Files, Trash2 } from "lucide-react";
import { useTabStore } from "../store/tabStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface TabContextMenuProps {
  trigger: React.ReactNode;
  tabId: string;
  onSetAsFirstPage?: (tabId: string) => void;
  onRename?: (tabId: string) => void;
  onCopy?: (tabId: string) => void;
  onDuplicate?: (tabId: string) => void;
  onDelete?: (tabId: string) => void;
  onOpenChange?: (open: boolean) => void;
}

export default function TabContextMenu({
  trigger,
  tabId,
  onSetAsFirstPage,
  onRename,
  onCopy,
  onDuplicate,
  onDelete,
  onOpenChange,
}: TabContextMenuProps) {
  const { removeTab, duplicateTab, updateTab, tabs, reorderTabs } =
    useTabStore();

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
    const tab = tabs.find((tab) => tab.id === tabId);
    if (tab) {
      navigator.clipboard.writeText(JSON.stringify(tab));
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
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-240 mt-3 bg-white rounded-xl shadow-menu border-0.5 border-gray-200 outline outline-0.5 outline-gray-200 outline-offset--0.5 overflow-hidden p-0"
        align="end"
        alignOffset={-130}
      >
        <div className="h-10 bg-gray-50 border-b-0.5 border-gray-200 flex items-center px-3">
          <DropdownMenuLabel className="text-gray-900 text-base font-medium leading-6 p-0">
            Settings
          </DropdownMenuLabel>
        </div>

        <div className="p-3 pb-[14px] flex flex-col gap-[14px]">
          <DropdownMenuItem
            className="w-full flex items-center gap-[6px] text-left group hover:bg-gray-50 rounded p-1 -m-1 cursor-pointer"
            onClick={() =>
              onSetAsFirstPage
                ? onSetAsFirstPage(tabId)
                : handleSetAsFirstPage()
            }
          >
            <div className="size-4 relative overflow-hidden flex items-center justify-center">
              <Flag className="size-4 text-primary-500 fill-primary-500" />
            </div>
            <div className="flex-1 text-gray-900 text-sm font-medium leading-4">
              Set as first page
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="w-full flex items-center gap-[6px] text-left group hover:bg-gray-50 rounded p-1 -m-1 cursor-pointer"
            onClick={() => (onRename ? onRename(tabId) : handleRename())}
          >
            <div className="size-4 relative overflow-hidden flex items-center justify-center">
              <Edit2 className="size-4 text-gray-400" />
            </div>
            <div className="flex-1 text-gray-900 text-sm font-medium leading-4">
              Rename
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="w-full flex items-center gap-[6px] text-left group hover:bg-gray-50 rounded p-1 -m-1 cursor-pointer"
            onClick={() => (onCopy ? onCopy(tabId) : handleCopy())}
          >
            <div className="size-4 relative overflow-hidden flex items-center justify-center">
              <Copy className="size-4 text-gray-400" />
            </div>
            <div className="flex-1 text-gray-900 text-sm font-medium leading-4">
              Copy
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="w-full flex items-center gap-[6px] text-left group hover:bg-gray-50 rounded p-1 -m-1 cursor-pointer"
            onClick={() =>
              onDuplicate ? onDuplicate(tabId) : handleDuplicate()
            }
          >
            <div className="size-4 relative overflow-hidden flex items-center justify-center">
              <Files className="size-4 text-gray-400" />
            </div>
            <div className="flex-1 text-gray-900 text-sm font-medium leading-4">
              Duplicate
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="h-0.5 bg-gray-200 mx-0" />

          <DropdownMenuItem
            className="w-full flex items-center gap-[6px] text-left group hover:bg-red-50 rounded p-1 -m-1 cursor-pointer"
            onClick={() => (onDelete ? onDelete(tabId) : handleDelete())}
          >
            <div className="size-4 relative overflow-hidden flex items-center justify-center">
              <Trash2 className="size-4 text-danger" />
            </div>
            <div className="flex-1 text-danger text-sm font-medium leading-4">
              Delete
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
