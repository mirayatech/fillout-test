import React, { useState } from "react";
import {
  EllipsisVertical,
  InfoIcon,
  FileTextIcon,
  CheckCircle2,
  PlusIcon,
} from "lucide-react";

export interface Tab {
  id: string;
  label: string;
  type?: "info" | "document" | "completed" | "default";
  disabled?: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  onAddPage?: () => void;
  onAddPageAtIndex?: (index: number) => void;
  showAddButton?: boolean;
  addButtonLabel?: string;
  className?: string;
}

export default function TabNavigation({
  tabs,
  activeTabId,
  onTabChange,
  onAddPage,
  onAddPageAtIndex,
  showAddButton = true,
  addButtonLabel = "Add page",
  className = "",
}: TabNavigationProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || "");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [hoveredSeparator, setHoveredSeparator] = useState<number | null>(null);

  const currentActiveTab = activeTabId || internalActiveTab;

  const handleTabClick = (tabId: string) => {
    if (tabs.find((tab) => tab.id === tabId)?.disabled) return;

    setInternalActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const handleInlineAddClick = (index: number) => {
    onAddPageAtIndex?.(index);
  };

  const getIcon = (tab: Tab, isActive: boolean) => {
    switch (tab.type) {
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
      case "document":
        return (
          <div className="w-5 h-5 relative overflow-hidden flex items-center">
            <FileTextIcon
              className={`w-4 h-4 ${
                isActive ? "text-amber-500" : "text-[#8C93A1]"
              }`}
            />
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

  return (
    <div className={`flex items-center ${className}`}>
      {tabs.map((tab, index) => {
        const isActive = currentActiveTab === tab.id;
        const isHovered = hoveredTab === tab.id;
        const showDots = index < tabs.length - 1;

        return (
          <React.Fragment key={tab.id}>
            <button
              onClick={() => handleTabClick(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              disabled={tab.disabled}
              className={`
                h-8 px-2.5 py-1 rounded-lg flex justify-center items-center gap-1.5 text-sm font-medium font-['Inter'] leading-tight transition-all duration-300 ease-out relative group
                ${
                  isActive
                    ? "bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02)] outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-200"
                    : "bg-[#9DA4B2]/15 hover:bg-[#9DA4B2]/35"
                }
                ${
                  tab.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
              `}
            >
              <div className="flex justify-center items-center gap-1.5">
                <div className="transition-transform duration-300 ease-out hover:scale-105">
                  {getIcon(tab, isActive)}
                </div>
                <span
                  className={`text-center justify-start text-sm font-medium font-['Inter'] leading-tight transition-colors duration-300 ease-out ${
                    isActive ? "text-[#1A1A1A]" : "text-[#677289]"
                  }`}
                >
                  {tab.label}
                </span>
              </div>

              {/* Ellipsis positioned on the right side */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-out text-[#9DA4B2] ${
                  isActive && isHovered
                    ? "w-3  opacity-100"
                    : "w-0 ml-0 opacity-0"
                }`}
              >
                <EllipsisVertical size={16} className="hover:text-[#1A1A1A]" />
              </div>
            </button>

            {/* Separator with hover add button */}
            {showDots && (
              <div
                className="relative flex items-center transition-all duration-300 ease-in-out"
                onMouseEnter={() => setHoveredSeparator(index)}
                onMouseLeave={() => setHoveredSeparator(null)}
              >
                {/* Left dashed line */}
                <div
                  className={`h-[1.50px] relative border border-stone-300 border-dashed transition-all duration-300 ease-in-out ${
                    hoveredSeparator === index && onAddPageAtIndex
                      ? "w-5"
                      : "w-5"
                  }`}
                ></div>

                {/* Hover add button with smooth animation */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    hoveredSeparator === index && onAddPageAtIndex
                      ? "w-5 opacity-100 scale-100"
                      : "w-0 opacity-0 scale-75"
                  }`}
                >
                  {hoveredSeparator === index && onAddPageAtIndex && (
                    <button
                      onClick={() => handleInlineAddClick(index + 1)}
                      className="size-5 bg-white p-1 rounded-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02)] outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-200 flex justify-center items-center transition-all duration-200 ease-out hover:shadow-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 group"
                    >
                      <PlusIcon className="size-3 text-black transition-transform duration-200 ease-out group-hover:scale-110 group-hover:rotate-90" />
                    </button>
                  )}
                </div>

                {/* Right dashed line */}
                <div
                  className={`h-[1.50px] relative border border-stone-300 border-dashed transition-all duration-300 ease-in-out ${
                    hoveredSeparator === index && onAddPageAtIndex
                      ? "w-5"
                      : "w-0 opacity-0"
                  }`}
                ></div>
              </div>
            )}
          </React.Fragment>
        );
      })}

      {showAddButton && (
        <>
          <div className="w-5 h-[1.50px] relative border border-stone-300 border-dashed"></div>
          <button
            onClick={onAddPage}
            className="h-8 px-2.5 py-1 bg-white z-10 rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02)] outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-200 flex justify-center items-center gap-1.5 transition-all duration-300 ease-out hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 group"
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
  );
}
