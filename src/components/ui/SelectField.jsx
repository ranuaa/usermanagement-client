import React from "react";

export default function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      {label && <label className="form-label">{label}</label>}
      <select className="form-select" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
