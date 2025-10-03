import React, { useState } from "react";

export default function QuotationsPanel() {
  const [quotations, setQuotations] = useState([
    { id: 1, customer: "John Doe", amount: 1898, status: "Pending", date: "2023-10-01", items: ["iPhone 14", "Samsung Galaxy S23"] },
    { id: 2, customer: "Jane Smith", amount: 149, status: "Converted", date: "2023-10-02", items: ["IKEA Chair"] },
  ]);

  const [showNewQuote, setShowNewQuote] = useState(false);
  const [newQuote, setNewQuote] = useState({ customer: "", items: [], amount: "" });
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printingQuote, setPrintingQuote] = useState(null);

  const handleConvert = (id) => {
    // In real app, create invoice from quote
    alert("Quote converted to invoice!");
    setQuotations(quotations.map(q => q.id === id ? { ...q, status: "Converted" } : q));
  };

  const handleCreateQuote = () => {
    if (!newQuote.customer || !newQuote.amount) return;
    const quote = {
      id: Date.now(),
      customer: newQuote.customer,
      amount: parseFloat(newQuote.amount),
      status: "Pending",
      date: new Date().toISOString().split('T')[0],
      items: newQuote.items.split(',').map(i => i.trim()),
    };
    setQuotations([quote, ...quotations]);
    setNewQuote({ customer: "", items: "", amount: "" });
    setShowNewQuote(false);
  };

  const handlePrint = (quote) => {
    setPrintingQuote(quote);
    setShowPrintModal(true);
  };

  const handleDownload = (quote) => {
    const content = `Quotation #${quote.id}\nCustomer: ${quote.customer}\nDate: ${quote.date}\nItems: ${quote.items.join(", ")}\nTotal Amount: $${quote.amount.toFixed(2)}\nStatus: ${quote.status}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quotation-${quote.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-text font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <h2 className="text-xl font-semibold">Quotations</h2>
        <button
          onClick={() => setShowNewQuote(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-slate-700"
        >
          + New Quotation
        </button>
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Quote #</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((quote) => (
              <tr key={quote.id} className="border-b hover:bg-slate-50">
                <td className="py-3 px-4">{quote.id}</td>
                <td className="py-3 px-4">{quote.customer}</td>
                <td className="py-3 px-4">${quote.amount.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    quote.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                  }`}>
                    {quote.status}
                  </span>
                </td>
                <td className="py-3 px-4">{quote.date}</td>
                <td className="py-3 px-4">{quote.items.join(", ")}</td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => handlePrint(quote)}
                    className="text-blue-600 hover:underline"
                  >
                    Print
                  </button>
                  {quote.status === "Pending" && (
                    <button
                      onClick={() => handleConvert(quote.id)}
                      className="text-green-600 hover:underline"
                    >
                      Convert to Invoice
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Quote Modal */}
      {showNewQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl border border-slate-200">
            <h2 className="text-lg font-semibold mb-4">Create New Quotation</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-600">Customer</label>
                <input
                  type="text"
                  value={newQuote.customer}
                  onChange={(e) => setNewQuote({ ...newQuote, customer: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Items (comma separated)</label>
                <input
                  type="text"
                  value={newQuote.items}
                  onChange={(e) => setNewQuote({ ...newQuote, items: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Total Amount</label>
                <input
                  type="number"
                  value={newQuote.amount}
                  onChange={(e) => setNewQuote({ ...newQuote, amount: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowNewQuote(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateQuote}
                className="px-4 py-2 bg-primary text-white hover:bg-slate-700 rounded-lg"
              >
                Create Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}