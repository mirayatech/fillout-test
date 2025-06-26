import { useState } from "react";
import TabNavigation, { type Tab } from "./components/TabNavigation";

export default function App() {
  const [activeTab, setActiveTab] = useState("info");
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "info", label: "Info", type: "info" },
    { id: "details", label: "Details", type: "document" },
    { id: "other", label: "Other", type: "document" },
    { id: "ending", label: "Ending", type: "completed" },
  ]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleAddPage = () => {
    const newTabId = `page-${tabs.length + 1}`;
    const newTab: Tab = {
      id: newTabId,
      label: `Page ${tabs.length + 1}`,
      type: "document",
    };
    setTabs([...tabs, newTab]);
  };

  const handleAddPageAtIndex = (index: number) => {
    const newTabId = `new-${Date.now()}`;
    const newTab: Tab = {
      id: newTabId,
      label: `New ${tabs.length + 1}`,
      type: "document",
    };
    const newTabs = [...tabs];
    newTabs.splice(index, 0, newTab);
    setTabs(newTabs);
  };

  return (
    <div className="min-h-screen p-8">
      <div className=" mx-auto">
        <div className="mb-8">
          <TabNavigation
            tabs={tabs}
            activeTabId={activeTab}
            onTabChange={handleTabChange}
            onAddPage={handleAddPage}
            onAddPageAtIndex={handleAddPageAtIndex}
            className="mb-6"
          />
        </div>
      </div>
    </div>
  );
}
