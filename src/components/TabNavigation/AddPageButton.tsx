import { memo, forwardRef } from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import PageTypeModal, { type PageType } from "../PageTypeModal";

interface AddPageButtonProps {
  showPageTypeModal: boolean;
  onAddPageClick: () => void;
  onModalClose: () => void;
  onPageTypeSelect: (pageType: PageType) => void;
  label?: string;
  className?: string;
}

export const AddPageButton = memo(
  forwardRef<HTMLButtonElement, AddPageButtonProps>(
    (
      {
        showPageTypeModal,
        onAddPageClick,
        onModalClose,
        onPageTypeSelect,
        label = "Add page",
        className,
      },
      ref
    ) => {
      return (
        <>
          <div className="w-5 h-[1.50px] relative border border-stone-300 border-dashed flex-shrink-0" />
          <PageTypeModal
            isOpen={showPageTypeModal}
            onClose={onModalClose}
            onSelectPageType={onPageTypeSelect}
            trigger={
              <button
                ref={ref}
                onClick={onAddPageClick}
                className={cn(
                  "h-8 px-2.5 py-1 bg-white z-10 rounded-lg shadow-button border-gray-200 border flex justify-center items-center gap-1.5 transition-all duration-300 ease-out hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2F72E2] focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_4px_rgba(47,114,226,0.1)] group flex-shrink-0",
                  className
                )}
              >
                <div className="size-4 flex items-center justify-center relative transition-transform duration-300 ease-out">
                  <PlusIcon className="size-4 text-zinc-900" />
                </div>
                <div className="relative overflow-hidden">
                  <span className="text-center justify-start text-zinc-900 text-sm font-medium font-inter leading-tight transition-colors duration-300 ease-out">
                    {label}
                  </span>
                </div>
              </button>
            }
          />
        </>
      );
    }
  )
);

AddPageButton.displayName = "AddPageButton";
