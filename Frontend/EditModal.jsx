import React, { useState, useEffect } from "react";

export default function EditModal({ isOpen, onClose, onSave, initialData, fields }) {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-xl w-full max-w-md shadow-2xl border border-slate-800">
        <h2 className="text-lg font-semibold mb-4">Edit Item</h2>

        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="text-sm text-slate-400">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  rows="3"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full mt-1 bg-slate-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                />
              ) : field.type === 'select' ? (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full mt-1 bg-slate-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full mt-1 bg-slate-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
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
  );
}