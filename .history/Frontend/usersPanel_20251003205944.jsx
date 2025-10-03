import React, { useState } from "react";

export default function UsersPanel() {
  const [roles, setRoles] = useState(["Admin", "User", "Stock Manager"]);

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", permissions: ["view", "add", "edit", "delete"] },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", permissions: ["view", "add"] },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Stock Manager", permissions: ["view", "edit"] },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({ role: "", permissions: [] });

  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditData({ role: user.role, permissions: [...user.permissions] });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setUsers(users.map(u => u.id === editingUser.id ? { ...u, role: editData.role, permissions: editData.permissions } : u));
    setShowEditModal(false);
  };

  const togglePermission = (perm) => {
    setEditData({
      ...editData,
      permissions: editData.permissions.includes(perm)
        ? editData.permissions.filter(p => p !== perm)
        : [...editData.permissions, perm]
    });
  };

  const toggleNewRolePermission = (perm) => {
    setNewRole({
      ...newRole,
      permissions: newRole.permissions.includes(perm)
        ? newRole.permissions.filter(p => p !== perm)
        : [...newRole.permissions, perm]
    });
  };

  const handleCreateRole = () => {
    if (!newRole.name.trim()) return;
    if (roles.includes(newRole.name)) {
      alert("Role name already exists!");
      return;
    }
    setRoles([...roles, newRole.name]);
    setNewRole({ name: "", permissions: [] });
    setShowCreateRoleModal(false);
  };

  return (
    <div className="text-text font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <h2 className="text-xl font-semibold">User & Role Management</h2>
        <button
          onClick={() => setShowCreateRoleModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-slate-700"
        >
          + Create Role
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Permissions</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-slate-50">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === "Admin" ? "bg-red-100 text-red-800" :
                    user.role === "User" ? "bg-blue-100 text-blue-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">{user.permissions.join(", ")}</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-primary hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl border border-slate-200">
            <h2 className="text-lg font-semibold mb-4">Edit User Role & Permissions</h2>
            <p className="text-sm text-slate-600 mb-4">User: {editingUser?.name}</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-600">Role</label>
                <select
                  value={editData.role}
                  onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                >
                  {roles.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-600">Permissions</label>
                <div className="mt-2 space-y-2">
                  {["view", "add", "edit", "delete"].map(perm => (
                    <label key={perm} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editData.permissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                        className="mr-2"
                      />
                      {perm.charAt(0).toUpperCase() + perm.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-primary text-white hover:bg-slate-700 rounded-lg"
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