import React from "react";

export default function Modal({ open, title, children, footer, onClose, size = "md" }) {
  if (!open) return null;

  const dialogClass =
    size === "lg" ? "modal-dialog modal-lg"
    : size === "sm" ? "modal-dialog modal-sm"
    : "modal-dialog";

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      style={{ background: "rgba(0,0,0,.4)" }}
    >
      <div className={dialogClass} role="document">
        <div className="modal-content border-0">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">{children}</div>

          {footer ? <div className="modal-footer">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}
