import React, { useState, useRef, useCallback } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "../../utils/cn";
import { useScrollControls } from "../../hooks/useScrollControls";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useTabInteractions } from "../../hooks/useTabInteractions";
import { ScrollControls } from "./ScrollControls";
import { SortableTabItem } from "./SortableTabItem";
import { TabSeparator } from "./TabSeparator";
import { AddPageButton } from "./AddPageButton";
import { DragOverlayTab } from "./DragOverlayTab";
import PageNameModal from "../PageNameModal";
import type { Tab, TabNavigationProps } from "../../types/tab.types";

export default function TabNavigation({
  tabs,
  activeTabId,
  onTabChange,
  onTabsReorder,
  onAddPageAtIndex,
  onAddPageWithType,
  onAddPageAtIndexWithType,
  showAddButton = true,
  addButtonLabel = "Add page",
  className = "",
}: TabNavigationProps) {
  const [internalTabs, setInternalTabs] = useState(tabs);
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || "");

  // sync internal tabs with prop changes
  React.useEffect(() => {
    setInternalTabs(tabs);
  }, [tabs]);

  const currentTabs = internalTabs;
  const currentActiveTab = activeTabId || internalActiveTab;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const scrollControls = useScrollControls({
    containerRef: scrollContainerRef,
    dependencies: [currentTabs],
  });

  const dragAndDrop = useDragAndDrop({
    tabs: currentTabs,
    onTabsReorder: (newTabs) => {
      setInternalTabs(newTabs);
      onTabsReorder?.(newTabs);
    },
  });

  const tabInteractions = useTabInteractions();

  const handleTabClick = useCallback(
    (tabId: string) => {
      const tab = currentTabs.find((tab) => tab.id === tabId);
      if (tab?.disabled) return;

      setInternalActiveTab(tabId);
      onTabChange?.(tabId);
    },
    [currentTabs, onTabChange]
  );

  const handlePageNameContinue = useCallback(
    (name: string) => {
      tabInteractions.handlePageNameContinue(
        name,
        onAddPageWithType,
        onAddPageAtIndexWithType
      );
    },
    [tabInteractions, onAddPageWithType, onAddPageAtIndexWithType]
  );

  const renderTab = useCallback(
    (tab: Tab) => {
      const isActive = currentActiveTab === tab.id;
      const isHovered = tabInteractions.hoveredTab === tab.id;

      return (
        <SortableTabItem
          key={tab.id}
          tab={tab}
          isActive={isActive}
          isHovered={isHovered}
          onTabClick={handleTabClick}
          onMouseEnter={() => tabInteractions.setHoveredTab(tab.id)}
          onMouseLeave={() => tabInteractions.setHoveredTab(null)}
        />
      );
    },
    [currentActiveTab, tabInteractions, handleTabClick]
  );

  const renderSeparator = useCallback(
    (index: number) => {
      const isHovered = tabInteractions.hoveredSeparator === index;
      const isActive = tabInteractions.activeSeparatorIndex === index;

      return (
        <TabSeparator
          key={`separator-${index}`}
          index={index}
          isHovered={isHovered}
          isActive={isActive}
          showPageTypeModal={tabInteractions.showPageTypeModal}
          addPageIndex={tabInteractions.addPageIndex}
          onMouseEnter={() => tabInteractions.setHoveredSeparator(index)}
          onMouseLeave={() => tabInteractions.setHoveredSeparator(null)}
          onInlineAddClick={tabInteractions.handleInlineAddClick}
          onModalClose={tabInteractions.handleModalClose}
          onPageTypeSelect={tabInteractions.handlePageTypeSelect}
          hasAddPageAtIndex={!!onAddPageAtIndex}
        />
      );
    },
    [tabInteractions, onAddPageAtIndex]
  );

  return (
    <DndContext
      sensors={dragAndDrop.sensors}
      collisionDetection={closestCenter}
      onDragStart={dragAndDrop.handleDragStart}
      onDragEnd={dragAndDrop.handleDragEnd}
    >
      <div className={cn("relative", className)}>
        {scrollControls.showScrollButtons && (
          <ScrollControls
            canScrollLeft={scrollControls.canScrollLeft}
            canScrollRight={scrollControls.canScrollRight}
            onScrollLeft={scrollControls.scrollLeft}
            onScrollRight={scrollControls.scrollRight}
          />
        )}

        <div
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto scrollbar-hide scroll-smooth whitespace-nowrap min-w-0 flex-1 py-1 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <SortableContext
            items={currentTabs}
            strategy={horizontalListSortingStrategy}
          >
            {currentTabs.map((tab, index) => {
              const isLastTab = index === currentTabs.length - 1;

              return (
                <React.Fragment key={tab.id}>
                  {renderTab(tab)}
                  {!isLastTab && renderSeparator(index)}
                </React.Fragment>
              );
            })}
          </SortableContext>

          {showAddButton && (
            <AddPageButton
              ref={addButtonRef}
              showPageTypeModal={
                tabInteractions.showPageTypeModal &&
                tabInteractions.addPageIndex === null
              }
              onAddPageClick={tabInteractions.handleAddPageClick}
              onModalClose={tabInteractions.handleModalClose}
              onPageTypeSelect={tabInteractions.handlePageTypeSelect}
              label={addButtonLabel}
            />
          )}
        </div>

        <PageNameModal
          isOpen={tabInteractions.showPageNameModal}
          onClose={tabInteractions.handlePageNameCancel}
          onContinue={handlePageNameContinue}
          pageType={tabInteractions.selectedPageType}
        />
      </div>

      <DragOverlay>
        {dragAndDrop.activeDragTab && (
          <DragOverlayTab tab={dragAndDrop.activeDragTab} />
        )}
      </DragOverlay>
    </DndContext>
  );
}
