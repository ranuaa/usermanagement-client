import React, { useEffect, useState } from "react";
import Modal from "../components/ui/modal";
import TextField from "../components/ui/TextField"; 
import SelectField from "../components/ui/SelectField";
import Alert from "../components/ui/Alert"; 

export default function UserFormModal({ open, initialValue, saving, error, onClose, onSubmit }) {
  const [form, setForm] = useState({ id: null, name: "", email: "", role: "user" });
  
  useEffect(() => {
    setForm({
      id: initialValue?.id ?? null,
      name: initialValue?.name ?? "",
      email: initialValue?.email ?? "",
      role: initialValue?.role ?? 'user',
    });
  }, [initialValue, open]);

  const footer = (
    <>
      <button className="btn btn-outline-secondary" onClick={onClose} disabled={saving}>Cancel</button>
      <button className="btn btn-primary" onClick={() => onSubmit(form)} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </button>
    </>
  );

  return (
    <Modal open={open} title={form.id ? "Edit User" : "Add User"} onClose={onClose} footer={footer}>
      <Alert>{error}</Alert>

      <div className="d-grid gap-3">
        <TextField label="Name" value={form.name} onChange={(v) => setForm(p => ({ ...p, name: v }))} />
        <TextField label="Email" type="email" value={form.email} onChange={(v) => setForm(p => ({ ...p, email: v }))} />
        <SelectField
          label="Role"
          value={form.role}
          onChange={(v) => setForm(p => ({ ...p, role: v }))}
          options={[
            { value: "user", label: "user" },
            { value: "admin", label: "admin" },
          ]}
        />
      </div>
    </Modal>
  );
}
