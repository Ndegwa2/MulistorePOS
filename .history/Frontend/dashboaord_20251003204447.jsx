import React, { useState } from "react";
import { Folder, Layers, Tag, Settings, LogOut, ChevronLeft, ChevronRight, Menu } from "lucide-react";

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
import UsersPanel from "./usersPanel";

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
  { key: "users", label: "Users", icon: Tag },
];

export default function Dashboard() {
  const [active, setActive] = useState("categories");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
    if (active === "users") return <UsersPanel />;
    return <CategoryPanel />;
  }

  return (
    <div className="min-h-screen bg-background text-text flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-sidebar to-sidebar/90 text-white border-r-2 border-primary/20
                   flex flex-col justify-between transition-all duration-300 z-50 shadow-xl
                   ${sidebarCollapsed ? 'w-16' : 'w-64'}
                   ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                   md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div>
          {/* Logo / Title and Collapse Toggle */}
          <div className="px-4 py-6 flex items-center justify-between">
            {!sidebarCollapsed && <div className="text-sm font-semibold">Multistore POS</div>}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded-md hover:bg-sidebar/20 transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
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
                              transition-all duration-200 hover:scale-105
                              ${isActive ? "bg-primary text-white shadow-lg shadow-primary/25" : "hover:bg-sidebar/20 text-white/80"}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className={`p-2 rounded-md ${isActive ? "bg-white/20" : "bg-transparent"}`}>
                    <Icon className="w-5 h-5 transition-colors" />
                  </div>
                  {!sidebarCollapsed && <span className="flex-1">{n.label}</span>}
                  {/* subtle chevron or count placeholder (optional) */}
                </button>
              );
            })}
          </nav>
        </div>

        {/* bottom area */}
        <div className="px-4 pb-6">
          <div className="border-t border-sidebar/20 pt-4 flex flex-col gap-2">
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar/20 text-white/80 hover:text-white transition-all hover:scale-105">
              <Settings className="w-4 h-4" />
              {!sidebarCollapsed && <span className="text-sm">Settings</span>}
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar/20 text-white/80 hover:text-white transition-all hover:scale-105">
              <LogOut className="w-4 h-4" />
              {!sidebarCollapsed && <span className="text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Top Bar */}
      <header className={`fixed top-0 left-0 right-0 h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${
        sidebarCollapsed ? 'md:left-16' : 'md:left-64'
      }`}>
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="p-2 rounded-md hover:bg-gray-100 relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 7v5H9v-5H3v5h6v5l5-5V7h6z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </button>
          {/* User Profile */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
              U
            </div>
            <span className="text-sm font-medium">User</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className={`flex-1 bg-background min-h-screen text-text p-4 md:p-8 transition-all duration-300 mt-16 ${
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      }`}>
        {/* Breadcrumbs and Page Title */}
        <div className="mb-6">
          <nav className="flex mb-2" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <a href="#" className="text-primary hover:text-primary/80">Home</a>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">{NAV.find((n) => n.key === active)?.label}</span>
              </li>
            </ol>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight text-text">
            {NAV.find((n) => n.key === active)?.label}
          </h1>
        </div>

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
