import React, { useState, useRef, useEffect } from "react";
import {
  EllipsisVertical,
  InfoIcon,
  FileTextIcon,
  CheckCircle2,
  PlusIcon,
  GripVertical,
  ChevronLeft,
  ChevronRight,
  FormInput,
  BookOpen,
  Heart,
  Eye,
  CreditCard,
  Lock,
  Calendar,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TabContextMenu from "./TabContextMenu";
import type { Tab, TabNavigationProps } from "../types/tab.types";
import { cn } from "../utils/cn";
import PageTypeModal, { type PageType } from "./PageTypeModal";
import PageNameModal from "./PageNameModal";

function SortableTabItem({
  tab,
  isActive,
  isHovered,
  onTabClick,
  onMouseEnter,
  onMouseLeave,
  onEllipsisClick,
  getIcon,
  isContextMenuOpen,
}: {
  tab: Tab;
  isActive: boolean;
  isHovered: boolean;
  onTabClick: (tabId: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onEllipsisClick: (e: React.MouseEvent, tabId: string) => void;
  getIcon: (tab: Tab, isActive: boolean) => React.ReactNode;
  isContextMenuOpen: boolean;
}) {
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

  return (
    <button
      ref={setNodeRef}
      style={style}
      onClick={() => onTabClick(tab.id)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={tab.disabled}
      className={cn(
        "h-8 px-2.5 py-1 rounded-lg flex justify-center items-center gap-1.5 text-sm font-medium font-['Inter'] leading-tight transition-all duration-300 ease-out relative group flex-shrink-0",
        isActive
          ? "bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02)] border border-[#E1E1E1]"
          : "bg-[#9DA4B2]/15 hover:bg-[#9DA4B2]/35",
        tab.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        sortableIsDragging ? "cursor-grabbing" : "cursor-grab",
        "focus-visible:outline focus-visible:outline-[0.50px] focus-visible:outline-[#2F72E2] focus-visible:outline-offset-[-0.50px] focus-visible:shadow-[0_0_0_3px_rgba(47,114,226,0.2)] transform-gpu"
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-center items-center gap-1.5">
        <div className="w-3 flex-shrink-0 flex justify-center items-center">
          <GripVertical
            size={12}
            className="text-[#9DA4B2] hover:text-[#677289]"
          />
        </div>

        <div className="transition-transform duration-300 ease-out hover:scale-105">
          {getIcon(tab, isActive)}
        </div>
        <span
          className={cn(
            "text-center justify-start text-sm font-medium font-['Inter'] leading-tight transition-colors duration-300 ease-out truncate max-w-[120px]",
            isActive ? "text-[#1A1A1A]" : "text-[#677289]"
          )}
        >
          {tab.label}
        </span>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out text-[#9DA4B2]",
          isActive && (isHovered || isContextMenuOpen)
            ? "w-3 opacity-100"
            : "w-0 ml-0 opacity-0"
        )}
      >
        <EllipsisVertical
          size={16}
          className="hover:text-[#1A1A1A] cursor-pointer"
          onClick={(e) => onEllipsisClick(e, tab.id)}
        />
      </div>
    </button>
  );
}

function DragOverlayTab({
  tab,
  getIcon,
}: {
  tab: Tab;
  getIcon: (tab: Tab, isActive: boolean) => React.ReactNode;
}) {
  return (
    <div className="h-8 px-2.5 py-1 bg-white rounded-lg shadow-lg shadow-black/20 flex justify-center items-center gap-1.5 text-sm font-medium font-['Inter'] leading-tight transform rotate-2 scale-105">
      <div className="flex justify-center items-center gap-1.5">
        <GripVertical size={12} className="text-[#9DA4B2]" />
        <div>{getIcon(tab, false)}</div>
        <span className="text-center justify-start text-[#1A1A1A] text-sm font-medium font-['Inter'] leading-tight">
          {tab.label}
        </span>
      </div>
    </div>
  );
}

export default function TabNavigation({
  tabs,
  activeTabId,
  onTabChange,
  onTabsReorder,
  onAddPage,
  onAddPageAtIndex,
  onAddPageWithType,
  onAddPageAtIndexWithType,
  showAddButton = true,
  addButtonLabel = "Add page",
  className = "",
}: TabNavigationProps) {
  const [internalTabs, setInternalTabs] = useState(tabs);
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || "");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [hoveredSeparator, setHoveredSeparator] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    tabId: string;
    x: number;
    y: number;
  } | null>(null);
  const [showPageTypeModal, setShowPageTypeModal] = useState(false);
  const [showPageNameModal, setShowPageNameModal] = useState(false);
  const [selectedPageType, setSelectedPageType] = useState<PageType | null>(
    null
  );
  const [addPageIndex, setAddPageIndex] = useState<number | null>(null);
  const [activeSeparatorIndex, setActiveSeparatorIndex] = useState<
    number | null
  >(null);
  const [addButtonPosition, setAddButtonPosition] = useState({ x: 0, y: 0 });
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  React.useEffect(() => {
    setInternalTabs(tabs);
  }, [tabs]);

  const currentTabs = internalTabs;
  const currentActiveTab = activeTabId || internalActiveTab;

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    setShowScrollButtons(scrollWidth > clientWidth);
  };

  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentTabs]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollButtons);
    return () => container.removeEventListener("scroll", checkScrollButtons);
  }, []);

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

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

  const handleTabClick = (tabId: string) => {
    if (currentTabs.find((tab) => tab.id === tabId)?.disabled) return;

    setInternalActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const handleAddPageClick = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event && addButtonRef.current) {
      const rect = addButtonRef.current.getBoundingClientRect();
      setAddButtonPosition({
        x: rect.left,
        y: rect.bottom,
      });
    }
    setAddPageIndex(null);
    setShowPageTypeModal(true);
  };

  const handleInlineAddClick = (
    index: number,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (event && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      setAddButtonPosition({
        x: rect.left,
        y: rect.bottom,
      });
    }
    setAddPageIndex(index);
    setActiveSeparatorIndex(Math.floor(index - 1));
    setShowPageTypeModal(true);
  };

  const handleEllipsisClick = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenu({
      tabId,
      x: rect.left,
      y: rect.bottom + 4,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = currentTabs.findIndex((tab) => tab.id === active.id);
      const newIndex = currentTabs.findIndex((tab) => tab.id === over?.id);

      const newTabs = arrayMove(currentTabs, oldIndex, newIndex);
      setInternalTabs(newTabs);
      onTabsReorder?.(newTabs);
    }

    setActiveId(null);
  };

  React.useEffect(() => {
    const handleClickOutside = () => closeContextMenu();
    if (contextMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [contextMenu]);

  const getIcon = (tab: Tab, isActive: boolean) => {
    switch (tab.type) {
      case "form":
        return (
          <div className="w-5 h-5 relative overflow-hidden flex items-center">
            <FormInput
              className={`w-4 h-4 ${
                isActive ? "text-orange-600" : "text-[#8C93A1]"
              }`}
            />
          </div>
        );
      case "cover":
        return (
          <div className="w-5 h-5 relative overflow-hidden flex items-center">
            <BookOpen
              className={`w-4 h-4 ${
                isActive ? "text-blue-600" : "text-[#8C93A1]"
              }`}
            />
          </div>
        );
      case "ending":
        return (
          <div className="w-5 h-5 relative overflow-hidden flex items-center">
            <Heart
              className={`w-4 h-4 ${
                isActive ? "text-red-600" : "text-[#8C93A1]"
              }`}
            />
          </div>
        );
      case "review":
        return (
          <div className="w-5 h-5 relative overflow-hidden flex items-center">
            <Eye
              className={`w-4 h-4 ${
                isActive ? "text-purple-600" : "text-[#8C93A1]"
              }`}
            />
          </div>
        );
      case "payment":
        return (
          <div className="w-5 h-5 relative overflow-hidden flex items-center">
            <CreditCard
              className={`w-4 h-4 ${
                isActive ? "text-pink-600" : "text-[#8C93A1]"
              }`}
            />
          </div>
        );
      case "login":
        return (
          <div className="w-5 h-5 relative overflow-hidden flex items-center">
            <Lock
              className={`w-4 h-4 ${
                isActive ? "text-green-600" : "text-[#8C93A1]"
              }`}
            />
          </div>
        );
      case "scheduling":
        return (
          <div className="w-5 h-5 relative overflow-hidden flex items-center">
            <Calendar
              className={`w-4 h-4 ${
                isActive ? "text-gray-600" : "text-[#8C93A1]"
              }`}
            />
          </div>
        );
      case "info":
        return (
          <div className="w-5 h-5 relative overflow-hidden flex items-center">
            <div
              className={`w-4 h-4 left-[2.29px] top-[2.29px] absolute rounded-full flex items-center justify-center ${
                isActive ? "bg-amber-500" : "bg-[#8C93A1]"
              }`}
            >
              <InfoIcon className="w-3 h-3 text-white" />
            </div>
          </div>
        );
      case "completed":
        return (
          <div className="w-5 h-5 relative overflow-hidden flex items-center">
            <CheckCircle2
              className={`w-4 h-4 ${
                isActive ? "text-green-600" : "text-[#8C93A1]"
              }`}
            />
          </div>
        );
      case "document":
      default:
        return (
          <div className="w-5 h-5 relative overflow-hidden flex items-center">
            <FileTextIcon
              className={`w-4 h-4 ${
                isActive ? "text-amber-500" : "text-[#8C93A1]"
              }`}
            />
          </div>
        );
    }
  };

  const activeDragTab = currentTabs.find((tab) => tab.id === activeId);

  const handlePageTypeSelect = (pageType: PageType) => {
    setSelectedPageType(pageType);
    setShowPageTypeModal(false);
    setShowPageNameModal(true);
  };

  const handlePageNameContinue = (name: string) => {
    if (selectedPageType) {
      if (addPageIndex !== null) {
        onAddPageAtIndexWithType?.(addPageIndex, selectedPageType, name);
      } else {
        onAddPageWithType?.(selectedPageType, name);
      }
    }
    handlePageNameCancel();
  };

  const handlePageNameCancel = () => {
    setShowPageNameModal(false);
    setSelectedPageType(null);
    setAddPageIndex(null);
    setActiveSeparatorIndex(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={cn("relative", className)}>
        {/* Scroll buttons positioned above the add button */}
        {showScrollButtons && (
          <div className="absolute right-0 -top-10 flex items-center gap-1 z-20">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={cn(
                "h-6 w-6 bg-white rounded shadow-sm border border-gray-200 flex items-center justify-center transition-all duration-200",
                canScrollLeft
                  ? "opacity-100 hover:shadow-md hover:bg-gray-50"
                  : "opacity-40 cursor-not-allowed"
              )}
            >
              <ChevronLeft size={12} className="text-gray-600" />
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={cn(
                "h-6 w-6 bg-white rounded shadow-sm border border-gray-200 flex items-center justify-center transition-all duration-200",
                canScrollRight
                  ? "opacity-100 hover:shadow-md hover:bg-gray-50"
                  : "opacity-40 cursor-not-allowed"
              )}
            >
              <ChevronRight size={12} className="text-gray-600" />
            </button>
          </div>
        )}

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto scrollbar-hide scroll-smooth whitespace-nowrap min-w-0 flex-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <SortableContext
            items={currentTabs}
            strategy={horizontalListSortingStrategy}
          >
            {currentTabs.map((tab, index) => {
              const isActive = currentActiveTab === tab.id;
              const isHovered = hoveredTab === tab.id;
              const showDots = index < currentTabs.length - 1;

              return (
                <React.Fragment key={tab.id}>
                  <SortableTabItem
                    tab={tab}
                    isActive={isActive}
                    isHovered={isHovered}
                    onTabClick={handleTabClick}
                    onMouseEnter={() => setHoveredTab(tab.id)}
                    onMouseLeave={() => setHoveredTab(null)}
                    onEllipsisClick={handleEllipsisClick}
                    getIcon={getIcon}
                    isContextMenuOpen={contextMenu?.tabId === tab.id}
                  />

                  {showDots && (
                    <div
                      className="relative flex items-center transition-all duration-300 ease-in-out flex-shrink-0"
                      onMouseEnter={() => setHoveredSeparator(index)}
                      onMouseLeave={() => setHoveredSeparator(null)}
                    >
                      <div
                        className={`h-[1.50px] relative border border-stone-300 border-dashed transition-all duration-300 ease-in-out ${
                          (hoveredSeparator === index ||
                            activeSeparatorIndex === index) &&
                          onAddPageAtIndex
                            ? "w-5"
                            : "w-5"
                        }`}
                      ></div>

                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          (hoveredSeparator === index ||
                            activeSeparatorIndex === index) &&
                          onAddPageAtIndex
                            ? "w-5 opacity-100 scale-100"
                            : "w-0 opacity-0 scale-75"
                        }`}
                      >
                        {(hoveredSeparator === index ||
                          activeSeparatorIndex === index) &&
                          onAddPageAtIndex && (
                            <button
                              onClick={(e) =>
                                handleInlineAddClick(index + 1, e)
                              }
                              className="size-5 bg-white p-1 rounded-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02)] outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-200 flex justify-center items-center transition-all duration-200 ease-out hover:shadow-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 group"
                            >
                              <PlusIcon className="size-3 text-black transition-transform duration-200 ease-out group-hover:scale-110 group-hover:rotate-90" />
                            </button>
                          )}
                      </div>

                      <div
                        className={`h-[1.50px] relative border border-stone-300 border-dashed transition-all duration-300 ease-in-out ${
                          (hoveredSeparator === index ||
                            activeSeparatorIndex === index) &&
                          onAddPageAtIndex
                            ? "w-5"
                            : "w-0 opacity-0"
                        }`}
                      ></div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </SortableContext>

          {showAddButton && (
            <>
              <div className="w-5 h-[1.50px] relative border border-stone-300 border-dashed flex-shrink-0"></div>
              <button
                ref={addButtonRef}
                onClick={handleAddPageClick}
                className="h-8 px-2.5 py-1 bg-white z-10 rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02)] border-[#E1E1E1] border flex justify-center items-center gap-1.5 transition-all duration-300 ease-out hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 group flex-shrink-0"
              >
                <div className="w-4 h-4 flex items-center justify-center relative transition-transform duration-300 ease-out group-hover:scale-105 group-hover:rotate-90">
                  <PlusIcon className="w-3 h-3 text-zinc-900" />
                </div>
                <div className="relative overflow-hidden">
                  <span className="text-center justify-start text-zinc-900 text-sm font-medium font-['Inter'] leading-tight transition-colors duration-300 ease-out">
                    {addButtonLabel}
                  </span>
                </div>
              </button>
            </>
          )}
        </div>

        <TabContextMenu
          isOpen={!!contextMenu}
          position={
            contextMenu
              ? { x: contextMenu.x, y: contextMenu.y }
              : { x: 0, y: 0 }
          }
          tabId={contextMenu?.tabId || ""}
          onClose={closeContextMenu}
        />

        <PageTypeModal
          isOpen={showPageTypeModal}
          onClose={() => {
            setShowPageTypeModal(false);
            setActiveSeparatorIndex(null);
            setAddPageIndex(null);
          }}
          onSelectPageType={handlePageTypeSelect}
          position={addButtonPosition}
        />

        <PageNameModal
          isOpen={showPageNameModal}
          onClose={handlePageNameCancel}
          onContinue={handlePageNameContinue}
          pageType={selectedPageType}
        />
      </div>

      <DragOverlay>
        {activeDragTab ? (
          <DragOverlayTab tab={activeDragTab} getIcon={getIcon} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
