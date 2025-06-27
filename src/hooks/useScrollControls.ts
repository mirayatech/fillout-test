import { useState, useEffect, useCallback, type RefObject } from "react";

interface UseScrollControlsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  dependencies?: unknown[];
}

interface UseScrollControlsReturn {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  showScrollButtons: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
}

export const useScrollControls = ({
  containerRef,
  dependencies = [],
}: UseScrollControlsProps): UseScrollControlsReturn => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const checkScrollButtons = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    setShowScrollButtons(scrollWidth > clientWidth);
  }, [containerRef]);

  const scrollLeft = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  }, [containerRef]);

  const scrollRight = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  }, [containerRef]);

  // check scroll buttons on dependency changes
  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [...dependencies, checkScrollButtons]);

  // add scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollButtons);
    return () => container.removeEventListener("scroll", checkScrollButtons);
  }, [checkScrollButtons]);

  return {
    canScrollLeft,
    canScrollRight,
    showScrollButtons,
    scrollLeft,
    scrollRight,
  };
};
