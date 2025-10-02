import React, { useState } from "react";
import EditModal from "./EditModal";
import DeleteConfirm from "./DeleteConfirm";

export default function SubCategoryPanel() {
  const [subcategories, setSubcategories] = useState([
    { id: 1, name: "Laptops", slug: "laptops", parent: "Electronics", count: 6 },
    { id: 2, name: "Phones", slug: "phones", parent: "Electronics", count: 10 },
    { id: 3, name: "Chairs", slug: "chairs", parent: "Furniture", count: 7 },
    { id: 4, name: "Tables", slug: "tables", parent: "Furniture", count: 5 },
    { id: 5, name: "Headphones", slug: "headphones", parent: "Audio", count: 3 },
    { id: 6, name: "Cookware", slug: "cookware", parent: "Kitchen", count: 9 },
    { id: 7, name: "Monitors", slug: "monitors", parent: "Electronics", count: 4 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newSub, setNewSub] = useState({ name: "", slug: "", parent: "", description: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);

  // Filter + pagination logic
  const filtered = subcategories.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAdd = () => setShowModal(true);

  const handleSave = () => {
    if (newSub.name.trim() === "") return;
    setSubcategories([...subcategories, { ...newSub, id: Date.now(), count: 0 }]);
    setNewSub({ name: "", slug: "", parent: "", description: "" });
    setShowModal(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <h2 className="text-xl font-semibold">Subcategories</h2>
        <div className="flex gap-3">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
            onClick={handleAdd}
          >
            + New Subcategory
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm">
            Import CSV
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 flex justify-between items-center flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search subcategories..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full sm:w-1/3 bg-slate-800 text-slate-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
        />
        <span className="text-sm text-slate-400">
          Showing {paginated.length} of {filtered.length} results
        </span>
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-xl p-4 shadow-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="py-2 text-left">#</th>
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Slug</th>
              <th className="py-2 text-left">Parent Category</th>
              <th className="py-2 text-left">Products</th>
              <th className="py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((sub, idx) => (
              <tr key={sub.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                <td className="py-2 px-2">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td className="py-2 px-2 font-medium">{sub.name}</td>
                <td className="py-2 px-2 text-slate-400">{sub.slug}</td>
                <td className="py-2 px-2">{sub.parent}</td>
                <td className="py-2 px-2">{sub.count}</td>
                <td className="py-2 px-2 flex gap-2">
                  <button className="px-2 py-1 bg-blue-600/40 rounded hover:bg-blue-600/60 text-xs">Edit</button>
                  <button className="px-2 py-1 bg-red-600/40 rounded hover:bg-red-600/60 text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-4 py-2 rounded-lg text-sm ${
            currentPage === 1 ? "bg-slate-800 text-slate-600" : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          Prev
        </button>
        <span className="text-slate-400 text-sm self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-2 rounded-lg text-sm ${
            currentPage === totalPages
              ? "bg-slate-800 text-slate-600"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          Next
        </button>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleAdd}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 w-14 h-14 flex items-center justify-center rounded-full shadow-lg"
      >
        <span className="text-2xl">＋</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-xl w-full max-w-md shadow-2xl border border-slate-800">
            <h2 className="text-lg font-semibold mb-4">Add New Subcategory</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400">Name</label>
                <input
                  type="text"
                  value={newSub.name}
                  onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
                  className="w-full mt-1 bg-slate-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Slug</label>
                <input
                  type="text"
                  value={newSub.slug}
                  onChange={(e) => setNewSub({ ...newSub, slug: e.target.value })}
                  className="w-full mt-1 bg-slate-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Parent Category</label>
                <select
                  value={newSub.parent}
                  onChange={(e) => setNewSub({ ...newSub, parent: e.target.value })}
                  className="w-full mt-1 bg-slate-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select Parent</option>
                  {["Electronics", "Furniture", "Kitchen", "Audio"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400">Description</label>
                <textarea
                  rows="3"
                  value={newSub.description}
                  onChange={(e) => setNewSub({ ...newSub, description: e.target.value })}
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
    </div>
  );
}
