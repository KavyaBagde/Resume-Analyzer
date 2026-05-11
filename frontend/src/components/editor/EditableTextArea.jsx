import { useState, useEffect } from "react";

const EditableTextArea = ({ value, onChange, isEditing, className }) => {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(value || "");

  useEffect(() => {
    setLocal(value || "");
  }, [value]);

  const handleBlur = () => {
    setEditing(false);
    onChange(local);
  };

  // VIEW MODE
  if (!isEditing) {
    return <span className={className}>{value || ""}</span>;
  }

  // CLICK TO EDIT
  if (!editing) {
    return (
      <span
        onClick={() => setEditing(true)}
        className={`${className} cursor-text hover:bg-yellow-100 px-1`}
      >
        {value || "Add text..."}
      </span>
    );
  }

  // EDIT MODE
  return (
    <textarea
      rows={4}
      autoFocus
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      onBlur={handleBlur}
      className={`${className} bg-yellow-50 border-b outline-none px-1 w-full`}
    />
  );
};

export default EditableTextArea;
