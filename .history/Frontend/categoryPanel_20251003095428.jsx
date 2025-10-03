import React, { useState } from "react";
import EditModal from "./EditModal";
import DeleteConfirm from "./DeleteConfirm";

export default function CategoryPanel() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", slug: "electronics", parent: "None", count: 12 },
    { id: 2, name: "Laptops", slug: "laptops", parent: "Electronics", count: 6 },
    { id: 3, name: "Furniture", slug: "furniture", parent: "None", count: 8 },
    { id: 4, name: "Kitchen", slug: "kitchen", parent: "None", count: 9 },
    { id: 5, name: "Phones", slug: "phones", parent: "Electronics", count: 10 },
    { id: 6, name: "Accessories", slug: "accessories", parent: "Electronics", count: 4 },
    { id: 7, name: "Chairs", slug: "chairs", parent: "Furniture", count: 7 },
    { id: 8, name: "Tables", slug: "tables", parent: "Furniture", count: 5 },
    { id: 9, name: "Home Decor", slug: "home-decor", parent: "None", count: 11 },
    { id: 10, name: "Audio", slug: "audio", parent: "Electronics", count: 3 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "", parent: "", description: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);

  // Derived filtered categories
  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAdd = () => setShowModal(true);

  const handleSave = () => {
    if (newCategory.name.trim() === "") return;
    setCategories([...categories, { ...newCategory, id: Date.now(), count: 0 }]);
    setNewCategory({ name: "", slug: "", parent: "", description: "" });
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
    setCategories(categories.map(c => c.id === updated.id ? updated : c));
    setShowEditModal(false);
  };

  const handleDelete = (item) => {
    setDeletingItem(item);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setCategories(categories.filter(c => c.id !== deletingItem.id));
    setShowDeleteConfirm(false);
  };

  return (
    <div className="text-text font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <h2 className="text-xl font-semibold">Categories</h2>
        <div className="flex gap-3">
          <button
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-slate-700 text-sm"
            onClick={handleAdd}
          >
            + New Category
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
          placeholder="Search categories..."
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
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Parent</th>
              <th className="py-3 px-4">Products</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((cat, idx) => (
              <tr key={cat.id} className="border-b hover:bg-slate-50">
                <td className="py-3 px-4">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td className="py-3 px-4">{cat.name}</td>
                <td className="py-3 px-4">{cat.slug}</td>
                <td className="py-3 px-4">{cat.parent}</td>
                <td className="py-3 px-4">{cat.count}</td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="text-primary hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat)}
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
          <div className="bg-slate-900 p-6 rounded-xl w-full max-w-md shadow-2xl border border-slate-800">
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400">Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full mt-1 bg-slate-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Slug</label>
                <input
                  type="text"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  className="w-full mt-1 bg-slate-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Parent</label>
                <select
                  value={newCategory.parent}
                  onChange={(e) => setNewCategory({ ...newCategory, parent: e.target.value })}
                  className="w-full mt-1 bg-slate-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">None</option>
                  {categories
                    .filter((c) => c.parent === "None")
                    .map((c) => (
                      <option key={c.id}>{c.name}</option>
                    ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400">Description</label>
                <textarea
                  rows="3"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full mt-1 bg-slate-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
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
          { name: 'slug', label: 'Slug', type: 'text' },
          { name: 'parent', label: 'Parent', type: 'select', options: ['None', ...categories.filter(c => c.parent === 'None').map(c => c.name)] },
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
