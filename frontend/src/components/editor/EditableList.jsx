import { useState } from "react";
import EditableText from "./EditableText";

const EditableList = ({ items = [], onChange, isEditing }) => {
  const updateItem = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  const addItem = () => {
    onChange([...items, ""]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 items-start group">
          {isEditing && (
            <button
              onClick={() => removeItem(i)}
              className="opacity-0 group-hover:opacity-100 text-red-500"
            >
              ×
            </button>
          )}

          <EditableText
            value={item}
            isEditing={isEditing}
            onChange={(val) => updateItem(i, val)}
            className="flex-1"
          />
        </li>
      ))}

      {isEditing && (
        <button onClick={addItem} className="text-sm text-indigo-600 mt-2">
          + Add item
        </button>
      )}
    </ul>
  );
};

export default EditableList;
