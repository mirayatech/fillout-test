import React, { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EllipsisVertical, GripVertical } from "lucide-react";
import { cn } from "../../utils/cn";
import { TabIcon } from "../ui/tab-icon";
import TabContextMenu from "../TabContextMenu";
import type { Tab } from "../../types/tab.types";

interface SortableTabItemProps {
  tab: Tab;
  isActive: boolean;
  isHovered: boolean;
  onTabClick: (tabId: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const SortableTabItem = memo<SortableTabItemProps>(
  ({ tab, isActive, isHovered, onTabClick, onMouseEnter, onMouseLeave }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging: sortableIsDragging,
    } = useSortable({ id: tab.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition: transition || "transform 200ms ease",
      opacity: sortableIsDragging ? 0.5 : 1,
      zIndex: sortableIsDragging ? 1000 : 1,
    };

    const handleClick = () => {
      if (!tab.disabled) {
        onTabClick(tab.id);
      }
    };

    const handleContextMenuClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    return (
      <button
        ref={setNodeRef}
        style={style}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        disabled={tab.disabled}
        className={cn(
          "h-8 px-2.5 py-1 rounded-lg flex justify-center items-center gap-1.5 text-sm font-medium font-inter leading-tight transition-all duration-300 ease-out relative group flex-shrink-0",
          isActive
            ? "bg-white shadow-tab border border-gray-200"
            : "bg-gray-400/15 hover:bg-gray-400/35",
          tab.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          sortableIsDragging ? "cursor-grabbing" : "cursor-grab",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2F72E2] focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_4px_rgba(47,114,226,0.1)] transform-gpu"
        )}
        {...attributes}
        {...listeners}
      >
        <div className="flex justify-center items-center gap-1.5">
          <div className="w-3 flex-shrink-0 flex justify-center items-center">
            <GripVertical className="size-3 text-gray-400 hover:text-gray-500" />
          </div>

          <div className="transition-transform duration-300 ease-out hover:scale-105">
            <TabIcon tab={tab} isActive={isActive} />
          </div>

          <span
            className={cn(
              "text-center justify-start text-sm font-medium font-inter leading-tight transition-colors duration-300 ease-out truncate max-w-[120px]",
              isActive ? "text-gray-900" : "text-gray-500"
            )}
          >
            {tab.label}
          </span>
        </div>

        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out text-gray-400",
            isActive && isHovered ? "w-3 opacity-100" : "w-0 ml-0 opacity-0"
          )}
        >
          <TabContextMenu
            tabId={tab.id}
            trigger={
              <EllipsisVertical
                className="size-4 hover:text-gray-900 cursor-pointer"
                onClick={handleContextMenuClick}
              />
            }
          />
        </div>
      </button>
    );
  }
);

SortableTabItem.displayName = "SortableTabItem";
