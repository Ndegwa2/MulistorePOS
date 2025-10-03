import React, { useState } from "react";

export default function StockPanel() {
  const stores = ["Store A", "Store B", "Store C"];

  const [stockData, setStockData] = useState([
    { productId: 1, productName: "iPhone 14", store: "Store A", stock: 50 },
    { productId: 1, productName: "iPhone 14", store: "Store B", stock: 30 },
    { productId: 1, productName: "iPhone 14", store: "Store C", stock: 20 },
    { productId: 2, productName: "Samsung Galaxy S23", store: "Store A", stock: 40 },
    { productId: 2, productName: "Samsung Galaxy S23", store: "Store B", stock: 25 },
    { productId: 2, productName: "Samsung Galaxy S23", store: "Store C", stock: 15 },
    { productId: 3, productName: "Dell XPS 13", store: "Store A", stock: 20 },
    { productId: 3, productName: "Dell XPS 13", store: "Store B", stock: 10 },
    { productId: 3, productName: "Dell XPS 13", store: "Store C", stock: 5 },
    { productId: 4, productName: "IKEA Chair", store: "Store A", stock: 15 },
    { productId: 4, productName: "IKEA Chair", store: "Store B", stock: 10 },
    { productId: 4, productName: "IKEA Chair", store: "Store C", stock: 8 },
  ]);

  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustingItem, setAdjustingItem] = useState(null);
  const [adjustment, setAdjustment] = useState({ type: "add", quantity: "", reason: "" });

  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferringItem, setTransferringItem] = useState(null);
  const [transfer, setTransfer] = useState({ toStore: "", quantity: "" });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState("");

  // Filter
  const filtered = stockData.filter(
    (s) =>
      s.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStore === "" || s.store === selectedStore)
  );

  const handleAdjust = (item) => {
    setAdjustingItem(item);
    setAdjustment({ type: "add", quantity: "", reason: "" });
    setShowAdjustModal(true);
  };

  const handleSaveAdjustment = () => {
    const qty = parseInt(adjustment.quantity);
    if (isNaN(qty) || qty <= 0) return;

    setStockData(stockData.map(s =>
      s.productId === adjustingItem.productId && s.store === adjustingItem.store
        ? { ...s, stock: adjustment.type === "add" ? s.stock + qty : Math.max(0, s.stock - qty) }
        : s
    ));
    setShowAdjustModal(false);
  };

  return (
    <div className="text-text font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <h2 className="text-xl font-semibold">Stock Management</h2>
        <div className="flex gap-3">
          <button className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-slate-100 text-sm">
            Export Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white text-text px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary outline-none"
          />
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="bg-white text-text px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="">All Stores</option>
            {stores.map(store => <option key={store} value={store}>{store}</option>)}
          </select>
        </div>
        <span className="text-sm text-slate-600">
          Showing {filtered.length} entries
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Store</th>
              <th className="py-3 px-4">Current Stock</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={`${item.productId}-${item.store}`} className="border-b hover:bg-slate-50">
                <td className="py-3 px-4">{item.productName}</td>
                <td className="py-3 px-4">{item.store}</td>
                <td className="py-3 px-4">{item.stock}</td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => handleAdjust(item)}
                    className="text-primary hover:underline"
                  >
                    Adjust Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Adjustment Modal */}
      {showAdjustModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl border border-slate-200">
            <h2 className="text-lg font-semibold mb-4">Adjust Stock</h2>
            <p className="text-sm text-slate-600 mb-4">
              Product: {adjustingItem?.productName} | Store: {adjustingItem?.store}
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-600">Adjustment Type</label>
                <select
                  value={adjustment.type}
                  onChange={(e) => setAdjustment({ ...adjustment, type: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="add">Add Stock</option>
                  <option value="reduce">Reduce Stock</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Quantity</label>
                <input
                  type="number"
                  value={adjustment.quantity}
                  onChange={(e) => setAdjustment({ ...adjustment, quantity: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Reason</label>
                <select
                  value={adjustment.reason}
                  onChange={(e) => setAdjustment({ ...adjustment, reason: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Reason</option>
                  <option value="purchase">Purchase</option>
                  <option value="damaged">Damaged</option>
                  <option value="return">Return</option>
                  <option value="transfer">Transfer</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAdjustModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAdjustment}
                className="px-4 py-2 bg-primary text-white hover:bg-slate-700 rounded-lg"
              >
                Save Adjustment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}