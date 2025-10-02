import React, { useState } from "react";

export default function BrandPanel() {
  const [brands, setBrands] = useState([
    { id: 1, name: "Apple", slug: "apple", description: "Premium electronics brand", count: 15 },
    { id: 2, name: "Samsung", slug: "samsung", description: "Electronics and appliances", count: 18 },
    { id: 3, name: "Sony", slug: "sony", description: "Audio and video equipment", count: 9 },
    { id: 4, name: "IKEA", slug: "ikea", description: "Furniture and home décor", count: 7 },
    { id: 5, name: "Dell", slug: "dell", description: "Computers and laptops", count: 6 },
    { id: 6, name: "LG", slug: "lg", description: "Appliances and electronics", count: 11 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: "", slug: "", description: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = brands.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAdd = () => setShowModal(true);

  const handleSave = () => {
    if (newBrand.name.trim() === "") return;
    setBrands([...brands, { ...newBrand, id: Date.now(), count: 0 }]);
    setNewBrand({ name: "", slug: "", description: "" });
    setShowModal(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <h1 className="text-xl font-semibold">Brands</h1>
        <div className="flex gap-3">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
            onClick={handleAdd}
          >
            + New Brand
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
          placeholder="Search brands..."
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
              <th className="py-2 text-left">Description</th>
              <th className="py-2 text-left">Products</th>
              <th className="py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((brand, idx) => (
              <tr key={brand.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                <td className="py-2 px-2">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td className="py-2 px-2 font-medium">{brand.name}</td>
                <td className="py-2 px-2 text-slate-400">{brand.slug}</td>
                <td className="py-2 px-2 truncate max-w-xs">{brand.description}</td>
                <td className="py-2 px-2">{brand.count}</td>
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
            <h2 className="text-lg font-semibold mb-4">Add New Brand</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400">Name</label>
                <input
                  type="text"
                  value={newBrand.name}
                  onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                  className="w-full mt-1 bg-slate-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Slug</label>
                <input
                  type="text"
                  value={newBrand.slug}
                  onChange={(e) => setNewBrand({ ...newBrand, slug: e.target.value })}
                  className="w-full mt-1 bg-slate-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Description</label>
                <textarea
                  rows="3"
                  value={newBrand.description}
                  onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
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
