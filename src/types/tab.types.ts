export interface Tab {
  id: string;
  label: string;
  type?: "info" | "document" | "completed" | "default";
  disabled?: boolean;
}

export interface TabNavigationProps {
  tabs: Tab[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  onTabsReorder?: (newTabs: Tab[]) => void;
  onAddPage?: () => void;
  onAddPageAtIndex?: (index: number) => void;
  showAddButton?: boolean;
  addButtonLabel?: string;
  className?: string;
}

export interface TabContextMenuState {
  tabId: string;
  x: number;
  y: number;
}

export type TabType = Tab["type"];
