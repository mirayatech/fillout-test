import TabNavigation from "./components/TabNavigation";
import { useTabStore } from "./store/tabStore";
import type { Tab } from "./types/tab.types";

export default function App() {
  const {
    tabs,
    activeTabId,
    setActiveTabId,
    reorderTabs,
    addTab,
    addTabAtIndex,
    addTabWithType,
    addTabAtIndexWithType,
  } = useTabStore();

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    console.log("Tab changed to:", tabId);
  };

  const handleTabsReorder = (newTabs: Tab[]) => {
    reorderTabs(newTabs);
    console.log(
      "Tabs reordered:",
      newTabs.map((tab) => tab.label)
    );
  };

  return (
    <div className="min-h-screen p-8 mx-auto max-w-5xl">
      <div className="pt-12">
        <TabNavigation
          tabs={tabs}
          activeTabId={activeTabId}
          onTabChange={handleTabChange}
          onTabsReorder={handleTabsReorder}
          onAddPage={addTab}
          onAddPageWithType={addTabWithType}
          onAddPageAtIndex={addTabAtIndex}
          onAddPageAtIndexWithType={addTabAtIndexWithType}
          className="mb-6"
        />
      </div>
    </div>
  );
}
