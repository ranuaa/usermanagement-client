import React from "react";

export default function TextField({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div>
      {label && <label className="form-label"> {label}</label>}
      <input
        className="form-control"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
