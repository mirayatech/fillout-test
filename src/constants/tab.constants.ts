import type { Tab } from "../types/tab.types";

export const DEFAULT_TABS: Tab[] = [
  { id: "info", label: "Info", type: "info" },
  { id: "details", label: "Details", type: "document" },
  { id: "other", label: "Other", type: "document" },
  { id: "ending", label: "Ending", type: "completed" },
];

export const TAB_DEFAULTS = {
  SHOW_ADD_BUTTON: true,
  ADD_BUTTON_LABEL: "Add page",
  DEFAULT_TAB_TYPE: "document" as const,
} as const;

export const TAB_LABELS = {
  NEW_PAGE_PREFIX: "Page",
  NEW_TAB_PREFIX: "New",
} as const;
