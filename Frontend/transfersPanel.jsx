import React, { useState } from "react";

const stores = ["Store A", "Store B", "Store C"];

export default function TransfersPanel() {
  const [transfers, setTransfers] = useState([
    { id: 1, product: "iPhone 14", fromStore: "Store A", toStore: "Store B", qty: 5, status: "Pending", date: "2023-10-01" },
    { id: 2, product: "Dell XPS 13", fromStore: "Store B", toStore: "Store C", qty: 2, status: "Approved", date: "2023-10-02" },
    { id: 3, product: "IKEA Chair", fromStore: "Store C", toStore: "Store A", qty: 3, status: "Declined", date: "2023-10-03" },
  ]);

  const [showNewTransfer, setShowNewTransfer] = useState(false);
  const [newTransfer, setNewTransfer] = useState({ product: "", fromStore: "", toStore: "", qty: "" });

  const handleApprove = (id) => {
    // In real app, update stock levels
    alert("Transfer approved, stock updated!");
    setTransfers(transfers.map(t => t.id === id ? { ...t, status: "Approved" } : t));
  };

  const handleDecline = (id) => {
    setTransfers(transfers.map(t => t.id === id ? { ...t, status: "Declined" } : t));
  };

  const handleCreateTransfer = () => {
    if (!newTransfer.product || !newTransfer.fromStore || !newTransfer.toStore || !newTransfer.qty) return;
    const transfer = {
      id: Date.now(),
      product: newTransfer.product,
      fromStore: newTransfer.fromStore,
      toStore: newTransfer.toStore,
      qty: parseInt(newTransfer.qty),
      status: "Pending",
      date: new Date().toISOString().split('T')[0],
    };
    setTransfers([transfer, ...transfers]);
    setNewTransfer({ product: "", fromStore: "", toStore: "", qty: "" });
    setShowNewTransfer(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Approved": return "bg-green-100 text-green-800";
      case "Declined": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="text-text font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <h2 className="text-xl font-semibold">Goods Transfers</h2>
        <button
          onClick={() => setShowNewTransfer(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-slate-700"
        >
          + New Transfer Request
        </button>
      </div>

      {/* Transfers Table */}
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Transfer #</th>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">From Store</th>
              <th className="py-3 px-4">To Store</th>
              <th className="py-3 px-4">Qty</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer) => (
              <tr key={transfer.id} className="border-b hover:bg-slate-50">
                <td className="py-3 px-4">{transfer.id}</td>
                <td className="py-3 px-4">{transfer.product}</td>
                <td className="py-3 px-4">{transfer.fromStore}</td>
                <td className="py-3 px-4">{transfer.toStore}</td>
                <td className="py-3 px-4">{transfer.qty}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(transfer.status)}`}>
                    {transfer.status}
                  </span>
                </td>
                <td className="py-3 px-4">{transfer.date}</td>
                <td className="py-3 px-4 text-right space-x-2">
                  {transfer.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(transfer.id)}
                        className="text-green-600 hover:underline"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDecline(transfer.id)}
                        className="text-red-600 hover:underline"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Transfer Modal */}
      {showNewTransfer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl border border-slate-200">
            <h2 className="text-lg font-semibold mb-4">New Transfer Request</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-600">Product</label>
                <select
                  value={newTransfer.product}
                  onChange={(e) => setNewTransfer({ ...newTransfer, product: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Product</option>
                  <option value="iPhone 14">iPhone 14</option>
                  <option value="Samsung Galaxy S23">Samsung Galaxy S23</option>
                  <option value="Dell XPS 13">Dell XPS 13</option>
                  <option value="IKEA Chair">IKEA Chair</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-600">From Store</label>
                <select
                  value={newTransfer.fromStore}
                  onChange={(e) => setNewTransfer({ ...newTransfer, fromStore: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select From Store</option>
                  {stores.map(store => <option key={store} value={store}>{store}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-600">To Store</label>
                <select
                  value={newTransfer.toStore}
                  onChange={(e) => setNewTransfer({ ...newTransfer, toStore: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select To Store</option>
                  {stores.filter(s => s !== newTransfer.fromStore).map(store => <option key={store} value={store}>{store}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Quantity</label>
                <input
                  type="number"
                  value={newTransfer.qty}
                  onChange={(e) => setNewTransfer({ ...newTransfer, qty: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowNewTransfer(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTransfer}
                className="px-4 py-2 bg-primary text-white hover:bg-slate-700 rounded-lg"
              >
                Create Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}