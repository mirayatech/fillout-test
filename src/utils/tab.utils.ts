import type { Tab } from "../types/tab.types";
import { TAB_LABELS, TAB_DEFAULTS } from "../constants/tab.constants";

export const generateTabId = (prefix: string = "tab"): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createNewTab = (
  options: Partial<Tab> & { label?: string } = {}
): Tab => {
  const defaultLabel = `${TAB_LABELS.NEW_PAGE_PREFIX} ${Date.now()}`;

  return {
    id: options.id || generateTabId(),
    label: options.label || defaultLabel,
    type: options.type || TAB_DEFAULTS.DEFAULT_TAB_TYPE,
    disabled: options.disabled || false,
  };
};

export const createNewPageTab = (existingTabs: Tab[]): Tab => {
  const pageNumber = existingTabs.length + 1;
  return createNewTab({
    id: generateTabId("page"),
    label: `${TAB_LABELS.NEW_PAGE_PREFIX} ${pageNumber}`,
  });
};

export const createNewInsertTab = (existingTabs: Tab[]): Tab => {
  const tabNumber = existingTabs.length + 1;
  return createNewTab({
    id: generateTabId("new"),
    label: `${TAB_LABELS.NEW_TAB_PREFIX} ${tabNumber}`,
  });
};

export const insertTabAtIndex = (
  tabs: Tab[],
  newTab: Tab,
  index: number
): Tab[] => {
  const newTabs = [...tabs];
  newTabs.splice(index, 0, newTab);
  return newTabs;
};

export const findTabById = (tabs: Tab[], tabId: string): Tab | undefined => {
  return tabs.find((tab) => tab.id === tabId);
};

export const isValidTabId = (tabs: Tab[], tabId: string): boolean => {
  return tabs.some((tab) => tab.id === tabId);
};

export const getFirstAvailableTabId = (tabs: Tab[]): string | null => {
  return tabs.length > 0 ? tabs[0].id : null;
};

export const reorderTabs = (
  tabs: Tab[],
  activeId: string,
  overId: string
): Tab[] => {
  const oldIndex = tabs.findIndex((tab) => tab.id === activeId);
  const newIndex = tabs.findIndex((tab) => tab.id === overId);

  if (oldIndex === -1 || newIndex === -1) {
    return tabs;
  }

  // simple array move implementation
  const result = Array.from(tabs);
  const [removed] = result.splice(oldIndex, 1);
  result.splice(newIndex, 0, removed);

  return result;
};
