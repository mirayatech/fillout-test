import type { PageType } from "../components/PageTypeModal";

export interface Tab {
  id: string;
  label: string;
  type?:
    | "info"
    | "document"
    | "completed"
    | "default"
    | "form"
    | "cover"
    | "ending"
    | "review"
    | "payment"
    | "login"
    | "scheduling";
  disabled?: boolean;
}

export interface TabNavigationProps {
  tabs: Tab[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  onTabsReorder?: (newTabs: Tab[]) => void;
  onAddPage?: () => void;
  onAddPageWithType?: (pageType: PageType, name: string) => void;
  onAddPageAtIndex?: (index: number) => void;
  onAddPageAtIndexWithType?: (
    index: number,
    pageType: PageType,
    name: string
  ) => void;
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
