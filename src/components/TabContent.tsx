import type { Tab } from "../types/tab.types";

interface TabContentProps {
  activeTab: Tab | undefined;
  activeTabId: string;
}

export const TabContent = ({ activeTab, activeTabId }: TabContentProps) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Active Tab Content</h2>
      <p className="text-gray-600">
        Current active tab:{" "}
        <span className="font-medium text-blue-600">{activeTabId}</span>
      </p>
      <div className="mt-4 p-4 bg-gray-50 rounded">
        <p>
          Content for the{" "}
          <span className="font-medium">{activeTab?.label || activeTabId}</span>{" "}
          tab would go here.
        </p>
        {activeTab?.type && (
          <p className="mt-2 text-sm text-gray-500">
            Tab type: <span className="font-medium">{activeTab.type}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default TabContent;
