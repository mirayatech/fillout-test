import { useState, useCallback } from "react";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import type { Tab } from "../types/tab.types";

interface UseDragAndDropProps {
  tabs: Tab[];
  onTabsReorder?: (newTabs: Tab[]) => void;
}

interface UseDragAndDropReturn {
  activeId: string | null;
  sensors: ReturnType<typeof useSensors>;
  activeDragTab: Tab | undefined;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

export const useDragAndDrop = ({
  tabs,
  onTabsReorder,
}: UseDragAndDropProps): UseDragAndDropReturn => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        const oldIndex = tabs.findIndex((tab) => tab.id === active.id);
        const newIndex = tabs.findIndex((tab) => tab.id === over?.id);

        const newTabs = arrayMove(tabs, oldIndex, newIndex);
        onTabsReorder?.(newTabs);
      }

      setActiveId(null);
    },
    [tabs, onTabsReorder]
  );

  const activeDragTab = tabs.find((tab) => tab.id === activeId);

  return {
    activeId,
    sensors,
    activeDragTab,
    handleDragStart,
    handleDragEnd,
  };
};
