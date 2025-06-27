import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

interface ScrollControlsProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  className?: string;
}

export const ScrollControls: React.FC<ScrollControlsProps> = ({
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight,
  className,
}) => {
  return (
    <div
      className={cn(
        "absolute right-0 -top-10 flex items-center gap-1 z-20",
        className
      )}
    >
      <button
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
        className={cn(
          "size-6 bg-white rounded shadow-sm border border-gray-200 flex items-center justify-center transition-all duration-200",
          canScrollLeft
            ? "opacity-100 hover:shadow-md hover:bg-gray-50"
            : "opacity-40 cursor-not-allowed"
        )}
        aria-label="Scroll left"
      >
        <ChevronLeft className="size-3 text-gray-600" />
      </button>
      <button
        onClick={onScrollRight}
        disabled={!canScrollRight}
        className={cn(
          "size-6 bg-white rounded shadow-sm border border-gray-200 flex items-center justify-center transition-all duration-200",
          canScrollRight
            ? "opacity-100 hover:shadow-md hover:bg-gray-50"
            : "opacity-40 cursor-not-allowed"
        )}
        aria-label="Scroll right"
      >
        <ChevronRight className="size-3 text-gray-600" />
      </button>
    </div>
  );
};
