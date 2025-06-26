import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Tab } from "../types/tab.types";
import {
  createNewPageTab,
  createNewInsertTab,
  insertTabAtIndex,
  getFirstAvailableTabId,
  isValidTabId,
} from "../utils/tab.utils";
import { DEFAULT_TABS } from "../constants/tab.constants";

interface TabState {
  tabs: Tab[];
  activeTabId: string;

  setTabs: (tabs: Tab[]) => void;
  setActiveTabId: (tabId: string) => void;
  addTab: () => void;
  addTabAtIndex: (index: number) => void;
  reorderTabs: (newTabs: Tab[]) => void;
  removeTab: (tabId: string) => void;
  updateTab: (tabId: string, updates: Partial<Tab>) => void;
  duplicateTab: (tabId: string) => void;
  getActiveTab: () => Tab | undefined;
  reset: () => void;
}

const initialState = {
  tabs: DEFAULT_TABS,
  activeTabId: DEFAULT_TABS[0]?.id || "",
};

export const useTabStore = create<TabState>()(
  persist(
    (set, get) => ({
      tabs: initialState.tabs,
      activeTabId: initialState.activeTabId,

      setTabs: (tabs) => set({ tabs }),

      setActiveTabId: (tabId) => {
        const { tabs } = get();
        if (isValidTabId(tabs, tabId)) {
          set({ activeTabId: tabId });
        }
      },

      addTab: () => {
        const { tabs } = get();
        const newTab = createNewPageTab(tabs);
        const newTabs = [...tabs, newTab];
        set({ tabs: newTabs });
      },

      addTabAtIndex: (index) => {
        const { tabs } = get();
        const newTab = createNewInsertTab(tabs);
        const newTabs = insertTabAtIndex(tabs, newTab, index);
        set({ tabs: newTabs });
      },

      reorderTabs: (newTabs) => {
        set({ tabs: newTabs });
      },

      removeTab: (tabId) => {
        const { tabs, activeTabId } = get();
        const newTabs = tabs.filter((tab) => tab.id !== tabId);

        // if we're removing the active tab, set a new active tab
        let newActiveTabId = activeTabId;
        if (activeTabId === tabId) {
          newActiveTabId = getFirstAvailableTabId(newTabs) || "";
        }

        set({
          tabs: newTabs,
          activeTabId: newActiveTabId,
        });
      },

      updateTab: (tabId, updates) => {
        const { tabs } = get();
        const newTabs = tabs.map((tab) =>
          tab.id === tabId ? { ...tab, ...updates } : tab
        );
        set({ tabs: newTabs });
      },

      duplicateTab: (tabId) => {
        const { tabs } = get();
        const tabToDuplicate = tabs.find((tab) => tab.id === tabId);
        if (!tabToDuplicate) return;

        const newTab = createNewPageTab(tabs);
        newTab.label = `${tabToDuplicate.label} (Copy)`;
        newTab.type = tabToDuplicate.type;

        const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
        const newTabs = insertTabAtIndex(tabs, newTab, tabIndex + 1);
        set({ tabs: newTabs });
      },

      getActiveTab: () => {
        const { tabs, activeTabId } = get();
        return tabs.find((tab) => tab.id === activeTabId);
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "tab-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        tabs: state.tabs,
        activeTabId: state.activeTabId,
      }),
    }
  )
);
