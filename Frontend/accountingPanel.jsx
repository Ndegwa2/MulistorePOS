import React, { useState } from "react";

export default function AccountingPanel() {
  const [invoices, setInvoices] = useState([
    { id: 1, customer: "John Doe", amount: 1898, status: "Pending Approval", date: "2023-10-01", dueDate: "2023-10-15" },
    { id: 2, customer: "Jane Smith", amount: 149, status: "Approved", date: "2023-10-02", dueDate: "2023-10-16" },
    { id: 3, customer: "Bob Johnson", amount: 2599, status: "Paid", date: "2023-09-28", dueDate: "2023-10-12" },
    { id: 4, customer: "Alice Brown", amount: 799, status: "Overdue", date: "2023-09-20", dueDate: "2023-10-04" },
  ]);

  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ customer: "", amount: "", dueDate: "" });

  const handleApprove = (id) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: "Approved" } : inv));
  };

  const handleMarkPaid = (id) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: "Paid" } : inv));
  };

  const handleCreateInvoice = () => {
    if (!newInvoice.customer || !newInvoice.amount) return;
    const invoice = {
      id: Date.now(),
      customer: newInvoice.customer,
      amount: parseFloat(newInvoice.amount),
      status: "Pending Approval",
      date: new Date().toISOString().split('T')[0],
      dueDate: newInvoice.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };
    setInvoices([invoice, ...invoices]);
    setNewInvoice({ customer: "", amount: "", dueDate: "" });
    setShowNewInvoice(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending Approval": return "bg-yellow-100 text-yellow-800";
      case "Approved": return "bg-blue-100 text-blue-800";
      case "Paid": return "bg-green-100 text-green-800";
      case "Overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="text-text font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <h2 className="text-xl font-semibold">Accounting</h2>
        <button
          onClick={() => setShowNewInvoice(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-slate-700"
        >
          + New Invoice
        </button>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Invoice #</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b hover:bg-slate-50">
                <td className="py-3 px-4">{inv.id}</td>
                <td className="py-3 px-4">{inv.customer}</td>
                <td className="py-3 px-4">${inv.amount.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(inv.status)}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="py-3 px-4">{inv.date}</td>
                <td className="py-3 px-4">{inv.dueDate}</td>
                <td className="py-3 px-4 text-right space-x-2">
                  {inv.status === "Pending Approval" && (
                    <button
                      onClick={() => handleApprove(inv.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Approve
                    </button>
                  )}
                  {inv.status === "Approved" && (
                    <button
                      onClick={() => handleMarkPaid(inv.id)}
                      className="text-green-600 hover:underline"
                    >
                      Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Invoice Modal */}
      {showNewInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl border border-slate-200">
            <h2 className="text-lg font-semibold mb-4">Create New Invoice</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-600">Customer</label>
                <input
                  type="text"
                  value={newInvoice.customer}
                  onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Amount</label>
                <input
                  type="number"
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Due Date</label>
                <input
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowNewInvoice(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateInvoice}
                className="px-4 py-2 bg-primary text-white hover:bg-slate-700 rounded-lg"
              >
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}