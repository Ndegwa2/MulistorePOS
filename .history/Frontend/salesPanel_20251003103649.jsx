import React, { useState } from "react";

const stores = ["Store A", "Store B", "Store C"];
const products = [
  { id: 1, name: "iPhone 14", price: 999 },
  { id: 2, name: "Samsung Galaxy S23", price: 899 },
  { id: 3, name: "Dell XPS 13", price: 1299 },
  { id: 4, name: "IKEA Chair", price: 149 },
];

export default function SalesPanel() {
  const [selectedStore, setSelectedStore] = useState("Store A");
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [sales, setSales] = useState([
    { id: 1, store: "Store A", date: "2023-10-01", total: 1898, items: 2 },
    { id: 2, store: "Store B", date: "2023-10-01", total: 149, items: 1 },
  ]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, qty } : item));
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const processSale = () => {
    if (cart.length === 0) return;
    const newSale = {
      id: Date.now(),
      store: selectedStore,
      date: new Date().toISOString().split('T')[0],
      total,
      items: cart.length,
    };
    setSales([newSale, ...sales]);
    setCart([]);
    setDiscount(0);
    alert("Sale processed!");
  };

  return (
    <div className="text-text font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <h2 className="text-xl font-semibold">Sales Management</h2>
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="bg-white text-text px-4 py-2 rounded-lg border border-slate-200"
        >
          {stores.map(store => <option key={store} value={store}>{store}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Products</h3>
          <div className="space-y-2">
            {products.map(product => (
              <div key={product.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-slate-600">${product.price}</p>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-primary text-white px-3 py-1 rounded-lg hover:bg-slate-700"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Cart</h3>
          {cart.length === 0 ? (
            <p className="text-slate-600">No items in cart</p>
          ) : (
            <div className="space-y-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm">${item.price} x {item.qty}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="bg-slate-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="bg-slate-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <hr className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <label>Discount (%):</label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-20 border rounded px-2 py-1"
                  />
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="credit">Credit</option>
                </select>
                <button
                  onClick={processSale}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-slate-700"
                >
                  Process Sale
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sales History */}
      <div className="mt-6 bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Store</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale.id} className="border-b">
                <td className="py-3 px-4">{sale.date}</td>
                <td className="py-3 px-4">{sale.store}</td>
                <td className="py-3 px-4">{sale.items}</td>
                <td className="py-3 px-4">${sale.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}