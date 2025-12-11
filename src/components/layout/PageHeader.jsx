import React from "react";

export default function PageHeader({ title, subtitle, right }) {
  return (
    <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-3">
      <div>
        <h5 className ="fw-bold mb-0">{title}</h5>
        {subtitle && <div className="text-muted small">{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}
