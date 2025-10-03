import React, { useState } from "react";
import { Folder, Layers, Tag, Settings, LogOut } from "lucide-react";

// Assume these exist in your project
import CategoryPanel from "./categoryPanel";
import SubCategoryPanel from "./subcategory";
import BrandPanel from "./brand";

const NAV = [
  { key: "categories", label: "Categories", icon: Folder },
  { key: "subcategories", label: "Subcategories", icon: Layers },
  { key: "brands", label: "Brands", icon: Tag },
];

export default function Dashboard() {
  const [active, setActive] = useState("categories");

  // small helper for rendering the active panel
  function renderPanel() {
    if (active === "categories") return <CategoryPanel />;
    if (active === "subcategories") return <SubCategoryPanel />;
    return <BrandPanel />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside
        className="w-64 fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-800
                   flex flex-col justify-between"
        aria-label="Sidebar"
      >
        <div>
          {/* Logo / Title */}
          <div className="px-6 py-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400
                            flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-900" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <div className="text-sm font-semibold">Multistore POS</div>
              <div className="text-xs text-slate-400">Admin Panel</div>
            </div>
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
                              ${isActive ? "bg-slate-800 text-blue-300 shadow-inner" : "hover:bg-slate-800/60"}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className={`p-2 rounded-md ${isActive ? "bg-blue-700/20" : "bg-transparent"}`}>
                    <Icon className={`w-5 h-5 ${isActive ? "text-blue-300" : "text-slate-300"} transition-colors`} />
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
          <div className="border-t border-slate-800 pt-4 flex flex-col gap-2">
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Settings className="w-4 h-4 text-slate-300" />
              <span className="text-sm text-slate-300">Settings</span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              <LogOut className="w-4 h-4 text-slate-300" />
              <span className="text-sm text-slate-300">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen p-6">
        {/* Top header (shows active panel name) */}
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              {NAV.find((n) => n.key === active)?.label}
            </h2>
            <div className="text-sm text-slate-400">Welcome back — manage your store data</div>
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
