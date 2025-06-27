import { memo } from "react";
import { GripVertical } from "lucide-react";
import { TabIcon } from "../ui/tab-icon";
import type { Tab } from "../../types/tab.types";

interface DragOverlayTabProps {
  tab: Tab;
}

export const DragOverlayTab = memo<DragOverlayTabProps>(({ tab }) => {
  return (
    <div className="h-8 px-2.5 py-1 bg-white rounded-lg shadow-lg shadow-black/20 flex justify-center items-center gap-1.5 text-sm font-medium font-inter leading-tight transform rotate-2 scale-105">
      <div className="flex justify-center items-center gap-1.5">
        <GripVertical className="size-3 text-gray-400" />
        <TabIcon tab={tab} isActive={false} />
        <span className="text-center justify-start text-gray-900 text-sm font-medium font-inter leading-tight truncate max-w-[120px]">
          {tab.label}
        </span>
      </div>
    </div>
  );
});

DragOverlayTab.displayName = "DragOverlayTab";
