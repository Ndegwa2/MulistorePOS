import React, { useState } from "react";
import { Folder, Layers, Tag, Settings, LogOut } from "lucide-react";

// Assume these exist in your project
import CategoryPanel from "./categoryPanel";
import SubCategoryPanel from "./subcategory";
import BrandPanel from "./brand";
import ProductPanel from "./productPanel";
import StockPanel from "./stockPanel";
import SalesPanel from "./salesPanel";
import AccountingPanel from "./accountingPanel";
import ReportsPanel from "./reportsPanel";
import QuotationsPanel from "./quotationsPanel";
import TransfersPanel from "./transfersPanel";

const NAV = [
  { key: "categories", label: "Categories", icon: Folder },
  { key: "subcategories", label: "Subcategories", icon: Layers },
  { key: "brands", label: "Brands", icon: Tag },
  { key: "products", label: "Products", icon: Folder },
  { key: "stock", label: "Stock", icon: Layers },
  { key: "sales", label: "Sales", icon: Tag },
  { key: "accounting", label: "Accounting", icon: Folder },
  { key: "reports", label: "Reports", icon: Tag },
  { key: "quotations", label: "Quotations", icon: Folder },
  { key: "transfers", label: "Transfers", icon: Layers },
];

export default function Dashboard() {
  const [active, setActive] = useState("categories");

  // small helper for rendering the active panel
  function renderPanel() {
    if (active === "categories") return <CategoryPanel />;
    if (active === "subcategories") return <SubCategoryPanel />;
    if (active === "brands") return <BrandPanel />;
    if (active === "products") return <ProductPanel />;
    if (active === "stock") return <StockPanel />;
    if (active === "sales") return <SalesPanel />;
    if (active === "accounting") return <AccountingPanel />;
    if (active === "reports") return <ReportsPanel />;
    if (active === "quotations") return <QuotationsPanel />;
    if (active === "transfers") return <TransfersPanel />;
    return <CategoryPanel />;
  }

  return (
    <div className="min-h-screen bg-secondary text-text flex">
      {/* Sidebar */}
      <aside
        className="w-64 fixed left-0 top-0 h-screen bg-white text-text border-r border-slate-200
                   flex flex-col justify-between"
        aria-label="Sidebar"
      >
        <div>
          {/* Logo / Title */}
          <div className="px-6 py-6">
            <div className="text-sm font-semibold">Multistore POS</div>
          </div>

          {/* Nav */}
          <nav className="mt-4 px-2" aria-label="Main navigation">
            {NAV.map((n) => {
              const Icon = n.icon;
              const isActive = active === n.key;
              return (
                <button
                  key={n.key}
                  onClick={() => setActive(n.key)}
                  className={`group w-full flex items-center gap-3 px-4 py-3 my-1 rounded-lg text-left
                              transition-colors duration-150
                              ${isActive ? "bg-slate-100 text-primary shadow-inner" : "hover:bg-slate-100"}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className={`p-2 rounded-md ${isActive ? "bg-primary/10" : "bg-transparent"}`}>
                    <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-slate-600"} transition-colors`} />
                  </div>
                  <span className="flex-1">{n.label}</span>
                  {/* subtle chevron or count placeholder (optional) */}
                </button>
              );
            })}
          </nav>
        </div>

        {/* bottom area */}
        <div className="px-4 pb-6">
          <div className="border-t border-slate-200 pt-4 flex flex-col gap-2">
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Settings className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-600">Settings</span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
              <LogOut className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-600">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 bg-secondary min-h-screen text-text p-8">
        {/* Top header (shows active panel name) */}
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              {NAV.find((n) => n.key === active)?.label}
            </h2>
            <div className="text-sm text-text">Welcome back — manage your store data</div>
          </div>
        </header>

        {/* Content area with simple fade/slide animation */}
        <section
          key={active} /* remounts on active change to trigger transition */
          className="transition duration-300 ease-out transform opacity-0 translate-y-2 animate-fade-in"
          style={{ animationFillMode: "forwards", animationDuration: "220ms" }}
        >
          <div className="bg-transparent">
            {renderPanel()}
          </div>
        </section>
      </main>

      {/* small global styles for the fade-in animation (Tailwind can't define keyframes inline) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation-name: fadeIn;
        }
      `}</style>
    </div>
  );
}
