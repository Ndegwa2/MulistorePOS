import React, { useState } from "react";
import CategoryPanel from "./categoryPanel";
import SubCategoryPanel from "./subcategory";
import BrandPanel from "./brand";

export default function UnifiedDashboard() {
  const [activeTab, setActiveTab] = useState("categories");

  const tabs = [
    { key: "categories", label: "Categories" },
    { key: "subcategories", label: "Subcategories" },
    { key: "brands", label: "Brands" },
  ];

  const renderActivePanel = () => {
    switch (activeTab) {
      case "categories":
        return <CategoryPanel />;
      case "subcategories":
        return <SubCategoryPanel />;
      case "brands":
        return <BrandPanel />;
      default:
        return <CategoryPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Product Management Dashboard</h1>

        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-900 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Panel Content */}
      <div className="bg-slate-900 rounded-xl p-4 shadow-lg">
        {renderActivePanel()}
      </div>
    </div>
  );
}