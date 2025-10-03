import React, { useState } from "react";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

export default function ReportsPanel() {
  const [activeTab, setActiveTab] = useState("sales");

  const salesData = [
    { date: "2023-10-01", store: "Store A", total: 1898, items: 2 },
    { date: "2023-10-01", store: "Store B", total: 149, items: 1 },
    { date: "2023-10-02", store: "Store A", total: 2599, items: 3 },
  ];

  const inventoryData = [
    { product: "iPhone 14", movement: "+10", reason: "Purchase", date: "2023-10-01" },
    { product: "Samsung Galaxy S23", movement: "-5", reason: "Sale", date: "2023-10-01" },
    { product: "Dell XPS 13", movement: "+2", reason: "Transfer In", date: "2023-10-02" },
  ];

  const invoiceData = [
    { id: 1, customer: "John Doe", amount: 1898, status: "Paid", date: "2023-10-01" },
    { id: 2, customer: "Jane Smith", amount: 149, status: "Pending", date: "2023-10-02" },
  ];

  const pnlData = {
    revenue: 10000,
    costOfGoods: 6000,
    expenses: 2000,
    profit: 2000,
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Paid: { color: 'success', icon: CheckCircle, text: 'Paid' },
      Pending: { color: 'warning', icon: Clock, text: 'Pending Approval' },
      Overdue: { color: 'error', icon: AlertTriangle, text: 'Overdue' },
    };
    const config = statusConfig[status] || { color: 'gray', icon: Clock, text: status };
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-${config.color}/10 text-${config.color} border border-${config.color}/20`}>
        <Icon className="w-3 h-3" />
        {config.text}
      </span>
    );
  };

  const renderTable = (data, columns) => (
    <table className="w-full text-left border-collapse text-sm">
      <thead className="bg-slate-100 border-b">
        <tr>
          {columns.map(col => <th key={col} className="py-3 px-4">{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="border-b">
            {columns.map(col => <td key={col} className="py-3 px-4">{row[col.toLowerCase().replace(' ', '')]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="text-text font-sans">
      <h2 className="text-xl font-semibold mb-6">Reports</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["Sales", "Inventory", "Invoices", "P&L"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 py-2 rounded-lg ${activeTab === tab.toLowerCase() ? "bg-primary text-white" : "bg-slate-100"}`}
          >
            {tab} Report
          </button>
        ))}
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-2xl shadow p-6">
        {activeTab === "sales" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Sales Report</h3>
            {renderTable(salesData, ["Date", "Store", "Total", "Items"])}
          </div>
        )}

        {activeTab === "inventory" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Inventory Movement Report</h3>
            {renderTable(inventoryData, ["Product", "Movement", "Reason", "Date"])}
          </div>
        )}

        {activeTab === "invoices" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Invoice Report</h3>
            {renderTable(invoiceData, ["ID", "Customer", "Amount", "Status", "Date"])}
          </div>
        )}

        {activeTab === "p&l" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Profit & Loss Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Revenue:</span>
                <span>${pnlData.revenue}</span>
              </div>
              <div className="flex justify-between">
                <span>Cost of Goods:</span>
                <span>${pnlData.costOfGoods}</span>
              </div>
              <div className="flex justify-between">
                <span>Expenses:</span>
                <span>${pnlData.expenses}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Profit:</span>
                <span>${pnlData.profit}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}