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
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-sm bg-white rounded-lg shadow-sm overflow-hidden">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            {columns.map(col => <th key={col} className="py-4 px-6 font-semibold text-gray-900">{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
              {columns.map(col => {
                const key = col.toLowerCase().replace(' ', '');
                const value = row[key];
                return (
                  <td key={col} className="py-4 px-6">
                    {col === 'Status' ? getStatusBadge(value) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="text-text font-sans">
      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { key: "sales", label: "Sales Report", desc: "View sales data and trends" },
          { key: "inventory", label: "Inventory Report", desc: "Track stock movements" },
          { key: "invoices", label: "Invoices Report", desc: "Manage billing status" },
          { key: "p&l", label: "P&L Report", desc: "Financial summary" },
        ].map(report => (
          <div
            key={report.key}
            onClick={() => setActiveTab(report.key)}
            className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all hover:shadow-md hover:scale-105 ${
              activeTab === report.key ? "border-primary shadow-primary/20" : "border-gray-200"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{report.label}</h3>
            <p className="text-sm text-gray-600">{report.desc}</p>
          </div>
        ))}
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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