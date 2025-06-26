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

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <TabNavigation
            tabs={tabs}
            activeTabId={activeTab}
            onTabChange={handleTabChange}
            onAddPage={handleAddPage}
            className="mb-6"
          />
        </div>
      </div>
    </div>
  );
}
