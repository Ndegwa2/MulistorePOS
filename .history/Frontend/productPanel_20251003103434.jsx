import React, { useState } from "react";
import EditModal from "./EditModal";
import DeleteConfirm from "./DeleteConfirm";

export default function ProductPanel() {
  const [products, setProducts] = useState([
    { id: 1, name: "iPhone 14", sku: "IPH14-128", category: "Electronics", subcategory: "Phones", brand: "Apple", unit: "pcs", price: 999, description: "Latest iPhone model", stock: 50 },
    { id: 2, name: "Samsung Galaxy S23", sku: "SGS23-256", category: "Electronics", subcategory: "Phones", brand: "Samsung", unit: "pcs", price: 899, description: "Android flagship", stock: 30 },
    { id: 3, name: "Dell XPS 13", sku: "DXPS13-16", category: "Electronics", subcategory: "Laptops", brand: "Dell", unit: "pcs", price: 1299, description: "Ultrabook laptop", stock: 20 },
    { id: 4, name: "IKEA Chair", sku: "IKCHR-001", category: "Furniture", subcategory: "Chairs", brand: "IKEA", unit: "pcs", price: 149, description: "Comfortable office chair", stock: 15 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", sku: "", category: "", subcategory: "", brand: "", unit: "", price: "", description: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);

  // Derived filtered products
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAdd = () => setShowModal(true);

  const handleSave = () => {
    if (newProduct.name.trim() === "") return;
    setProducts([...products, { ...newProduct, id: Date.now(), stock: 0 }]);
    setNewProduct({ name: "", sku: "", category: "", subcategory: "", brand: "", unit: "", price: "", description: "" });
    setShowModal(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  const handleEditSave = (updated) => {
    setProducts(products.map(p => p.id === updated.id ? updated : p));
    setShowEditModal(false);
  };

  const handleDelete = (item) => {
    setDeletingItem(item);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setProducts(products.filter(p => p.id !== deletingItem.id));
    setShowDeleteConfirm(false);
  };

  return (
    <div className="text-text font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <h2 className="text-xl font-semibold">Products</h2>
        <div className="flex gap-3">
          <button
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-slate-700 text-sm"
            onClick={handleAdd}
          >
            + New Product
          </button>
          <button className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-slate-100 text-sm">
            Import CSV
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 flex justify-between items-center flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full sm:w-1/3 bg-white text-text px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary outline-none"
        />
        <span className="text-sm text-slate-600">
          Showing {paginated.length} of {filtered.length} results
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Brand</th>
              <th className="py-3 px-4">Unit</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((product, idx) => (
              <tr key={product.id} className="border-b hover:bg-slate-50">
                <td className="py-3 px-4">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">{product.sku}</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">{product.brand}</td>
                <td className="py-3 px-4">{product.unit}</td>
                <td className="py-3 px-4">${product.price}</td>
                <td className="py-3 px-4">{product.stock}</td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-primary hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-4 py-2 rounded-lg text-sm ${
            currentPage === 1 ? "bg-slate-100 text-slate-400" : "bg-primary text-white hover:bg-slate-700"
          }`}
        >
          Prev
        </button>
        <span className="text-slate-600 text-sm self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-2 rounded-lg text-sm ${
            currentPage === totalPages
              ? "bg-slate-100 text-slate-400"
              : "bg-primary text-white hover:bg-slate-700"
          }`}
        >
          Next
        </button>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleAdd}
        className="fixed bottom-8 right-8 bg-primary hover:bg-slate-700 w-14 h-14 flex items-center justify-center rounded-full shadow-lg text-white"
      >
        <span className="text-2xl">＋</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl border border-slate-200">
            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-600">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">SKU</label>
                <input
                  type="text"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Kitchen">Kitchen</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Subcategory</label>
                <select
                  value={newProduct.subcategory}
                  onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Subcategory</option>
                  <option value="Phones">Phones</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Chairs">Chairs</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Brand</label>
                <select
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Brand</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Dell">Dell</option>
                  <option value="IKEA">IKEA</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Unit</label>
                <select
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Unit</option>
                  <option value="pcs">pcs</option>
                  <option value="kg">kg</option>
                  <option value="liters">liters</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Price</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Description</label>
                <textarea
                  rows="3"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-white hover:bg-slate-700 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditSave}
        initialData={editingItem}
        fields={[
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'sku', label: 'SKU', type: 'text' },
          { name: 'category', label: 'Category', type: 'select', options: ['', 'Electronics', 'Furniture', 'Kitchen'] },
          { name: 'subcategory', label: 'Subcategory', type: 'select', options: ['', 'Phones', 'Laptops', 'Chairs'] },
          { name: 'brand', label: 'Brand', type: 'select', options: ['', 'Apple', 'Samsung', 'Dell', 'IKEA'] },
          { name: 'unit', label: 'Unit', type: 'select', options: ['', 'pcs', 'kg', 'liters'] },
          { name: 'price', label: 'Price', type: 'number' },
          { name: 'description', label: 'Description', type: 'textarea' }
        ]}
      />

      <DeleteConfirm
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingItem?.name}
      />
    </div>
  );
}