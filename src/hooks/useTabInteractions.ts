import { useState, useCallback } from "react";
import type { PageType } from "../components/PageTypeModal";

interface UseTabInteractionsReturn {
  hoveredTab: string | null;
  hoveredSeparator: number | null;
  activeSeparatorIndex: number | null;
  showPageTypeModal: boolean;
  showPageNameModal: boolean;
  selectedPageType: PageType | null;
  addPageIndex: number | null;
  setHoveredTab: (tabId: string | null) => void;
  setHoveredSeparator: (index: number | null) => void;
  handleAddPageClick: () => void;
  handleInlineAddClick: (index: number) => void;
  handlePageTypeSelect: (pageType: PageType) => void;
  handlePageNameContinue: (
    name: string,
    onAddPageWithType?: (pageType: PageType, name: string) => void,
    onAddPageAtIndexWithType?: (
      index: number,
      pageType: PageType,
      name: string
    ) => void
  ) => void;
  handlePageNameCancel: () => void;
  handleModalClose: () => void;
}

export const useTabInteractions = (): UseTabInteractionsReturn => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [hoveredSeparator, setHoveredSeparator] = useState<number | null>(null);
  const [activeSeparatorIndex, setActiveSeparatorIndex] = useState<
    number | null
  >(null);
  const [showPageTypeModal, setShowPageTypeModal] = useState(false);
  const [showPageNameModal, setShowPageNameModal] = useState(false);
  const [selectedPageType, setSelectedPageType] = useState<PageType | null>(
    null
  );
  const [addPageIndex, setAddPageIndex] = useState<number | null>(null);

  const handleAddPageClick = useCallback(() => {
    setAddPageIndex(null);
    setShowPageTypeModal(true);
  }, []);

  const handleInlineAddClick = useCallback((index: number) => {
    setAddPageIndex(index);
    setActiveSeparatorIndex(Math.floor(index - 1));
    setShowPageTypeModal(true);
  }, []);

  const handlePageTypeSelect = useCallback((pageType: PageType) => {
    setSelectedPageType(pageType);
    setShowPageTypeModal(false);
    setShowPageNameModal(true);
  }, []);

  const handlePageNameContinue = useCallback(
    (
      name: string,
      onAddPageWithType?: (pageType: PageType, name: string) => void,
      onAddPageAtIndexWithType?: (
        index: number,
        pageType: PageType,
        name: string
      ) => void
    ) => {
      if (selectedPageType) {
        if (addPageIndex !== null) {
          onAddPageAtIndexWithType?.(addPageIndex, selectedPageType, name);
        } else {
          onAddPageWithType?.(selectedPageType, name);
        }
      }
      handlePageNameCancel();
    },
    [selectedPageType, addPageIndex]
  );

  const handlePageNameCancel = useCallback(() => {
    setShowPageNameModal(false);
    setSelectedPageType(null);
    setAddPageIndex(null);
    setActiveSeparatorIndex(null);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowPageTypeModal(false);
    setActiveSeparatorIndex(null);
    setAddPageIndex(null);
  }, []);

  return {
    hoveredTab,
    hoveredSeparator,
    activeSeparatorIndex,
    showPageTypeModal,
    showPageNameModal,
    selectedPageType,
    addPageIndex,
    setHoveredTab,
    setHoveredSeparator,
    handleAddPageClick,
    handleInlineAddClick,
    handlePageTypeSelect,
    handlePageNameContinue,
    handlePageNameCancel,
    handleModalClose,
  };
};
