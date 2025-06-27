import { memo } from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import PageTypeModal, { type PageType } from "../PageTypeModal";

interface TabSeparatorProps {
  index: number;
  isHovered: boolean;
  isActive: boolean;
  showPageTypeModal: boolean;
  addPageIndex: number | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onInlineAddClick: (index: number) => void;
  onModalClose: () => void;
  onPageTypeSelect: (pageType: PageType) => void;
  hasAddPageAtIndex?: boolean;
}

export const TabSeparator = memo<TabSeparatorProps>(
  ({
    index,
    isHovered,
    isActive,
    showPageTypeModal,
    addPageIndex,
    onMouseEnter,
    onMouseLeave,
    onInlineAddClick,
    onModalClose,
    onPageTypeSelect,
    hasAddPageAtIndex = false,
  }) => {
    const shouldShowButton = (isHovered || isActive) && hasAddPageAtIndex;
    const isModalOpen = showPageTypeModal && addPageIndex === index + 1;

    return (
      <div
        className="relative flex items-center transition-all duration-300 ease-in-out flex-shrink-0"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          className={cn(
            "h-[1.50px] relative border border-stone-300 border-dashed transition-all duration-300 ease-in-out",
            shouldShowButton ? "w-5" : "w-5"
          )}
        />

        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            shouldShowButton
              ? "w-5 opacity-100 scale-100"
              : "w-0 opacity-0 scale-75"
          )}
        >
          {shouldShowButton && (
            <PageTypeModal
              isOpen={isModalOpen}
              onClose={onModalClose}
              onSelectPageType={onPageTypeSelect}
              trigger={
                <button
                  onClick={() => onInlineAddClick(index + 1)}
                  className="size-5 bg-white p-1 rounded-full shadow-button outline outline-0.5 outline-offset--0.5 outline-neutral-200 flex justify-center items-center transition-all duration-200 ease-out hover:shadow-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  aria-label="Add page here"
                >
                  <PlusIcon className="size-3 text-black transition-transform duration-200 ease-out group-hover:scale-110 group-hover:rotate-90" />
                </button>
              }
            />
          )}
        </div>

        <div
          className={cn(
            "h-[1.50px] relative border border-stone-300 border-dashed transition-all duration-300 ease-in-out",
            shouldShowButton ? "w-5" : "w-0 opacity-0"
          )}
        />
      </div>
    );
  }
);

TabSeparator.displayName = "TabSeparator";
