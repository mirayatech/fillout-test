import { useState, useCallback } from "react";
import type { Tab } from "../types/tab.types";
import {
  createNewPageTab,
  createNewInsertTab,
  insertTabAtIndex,
  getFirstAvailableTabId,
  isValidTabId,
} from "../utils/tab.utils";

interface UseTabManagerOptions {
  initialTabs: Tab[];
  initialActiveTabId?: string;
  onTabChange?: (tabId: string) => void;
  onTabsReorder?: (newTabs: Tab[]) => void;
}

interface UseTabManagerReturn {
  tabs: Tab[];
  activeTabId: string;
  setTabs: React.Dispatch<React.SetStateAction<Tab[]>>;
  handleTabChange: (tabId: string) => void;
  handleTabsReorder: (newTabs: Tab[]) => void;
  handleAddPage: () => void;
  handleAddPageAtIndex: (index: number) => void;
  getActiveTab: () => Tab | undefined;
}

export const useTabManager = ({
  initialTabs,
  initialActiveTabId,
  onTabChange,
  onTabsReorder,
}: UseTabManagerOptions): UseTabManagerReturn => {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [activeTabId, setActiveTabId] = useState<string>(() => {
    // validate initial active tab id or fallback to first available
    if (initialActiveTabId && isValidTabId(initialTabs, initialActiveTabId)) {
      return initialActiveTabId;
    }
    return getFirstAvailableTabId(initialTabs) || "";
  });

  const handleTabChange = useCallback(
    (tabId: string) => {
      if (isValidTabId(tabs, tabId)) {
        setActiveTabId(tabId);
        onTabChange?.(tabId);
      }
    },
    [tabs, onTabChange]
  );

  const handleTabsReorder = useCallback(
    (newTabs: Tab[]) => {
      setTabs(newTabs);
      onTabsReorder?.(newTabs);
    },
    [onTabsReorder]
  );

  const handleAddPage = useCallback(() => {
    const newTab = createNewPageTab(tabs);
    const newTabs = [...tabs, newTab];
    setTabs(newTabs);
    onTabsReorder?.(newTabs);
  }, [tabs, onTabsReorder]);

  const handleAddPageAtIndex = useCallback(
    (index: number) => {
      const newTab = createNewInsertTab(tabs);
      const newTabs = insertTabAtIndex(tabs, newTab, index);
      setTabs(newTabs);
      onTabsReorder?.(newTabs);
    },
    [tabs, onTabsReorder]
  );

  const getActiveTab = useCallback(() => {
    return tabs.find((tab) => tab.id === activeTabId);
  }, [tabs, activeTabId]);

  return {
    tabs,
    activeTabId,
    setTabs,
    handleTabChange,
    handleTabsReorder,
    handleAddPage,
    handleAddPageAtIndex,
    getActiveTab,
  };
};
