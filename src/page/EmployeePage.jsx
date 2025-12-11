import React, { useMemo, useState } from "react";
import PageHeader from "../components/Layout/PageHeader";
import DataTable from "../components/ui/DataTable";
import useCrud from "../hooks/useCrud";
import api from "../api/axios";
import EmployeeFormModal from "../Forms/EmployeeFormModals";
import { endpoints } from "../api/endpoints";

const MAX = 300 * 1024;

function validatePhoto(file) {
  if (!file)  return null;
  if (!file.type?.startsWith("image/")) return "File harus berupa gambar.";
  if (file.size > MAX) return "Ukuran foto maksimal 300KB.";
  return null;
}

export default function EmployeesPage() {
  const crud = useCrud({
    listUrl: "api/user",
    createFn: (fd) => api.post("api/employee/createEmployee", fd, { headers: { "Content-Type": "multipart/form-data" } }),
    updateFn: (id, fd) => api.put(`/employees/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } }),
    deleteFn: (id) => api.delete(`/employees/${id}`),
  });

  const [q, setQ] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return crud.rows;
    return crud.rows.filter((x) =>
      `${x.name || ""} ${x.email || ""} ${x.position || ""}`.toLowerCase().includes(s)
    );
  }, [crud.rows, q]);

  const openAdd = () => { setError(""); setEditing(null); setModalOpen(true); };
  const openEdit = (row) => { setError(""); setEditing(row); setModalOpen(true); };

  const onDelete = async (row) => {
    const ok = confirm(`Hapus pegawai: ${row.user.name}?`);
    if (!ok) return;
    await api.delete(endpoints.employee.delete(row.userId))
        await crud.fetchAll?.();
  };

const onSubmit = async (form) => {
    const cleanDate = (v) => (v && String(v).trim() ? v : null);
    const cleanStr = (v) => (v && String(v).trim() ? String(v).trim() : null);
  setError("");

  if (!form.name?.trim()) return setError("Nama pegawai wajib diisi.");
  if (!form.email?.trim()) return setError("Email wajib diisi.");
  if (!form.id && !form.password?.trim()) return setError("Password wajib diisi untuk pegawai baru.");

  const msg = validatePhoto(form.photoFile);
  if (msg) return setError(msg);

  const payload = {
    name: form.name,
    email: form.email,
    password: form.password,
    role: form.role,
    phoneNumber: form.phoneNumber,
    address: form.address,
    department: form.department,
    jobTitle: form.jobTitle,
    salary: form.salary,
    leaveAllowance: form.leaveAllowance,
    workLocation: form.workLocation,
    businessAddress: form.businessAddress,
    emergencyContact: form.emergencyContact,
    status: form.status,
    dateOfJoining: cleanDate(form.dateOfJoining),
    dateOfBirth: cleanDate(form.dateOfBirth),
    gender: form.gender,
    reportingTo: form.reportingTo,
  };

  // edit: kalau password kosong jangan kirim password
  if (form.id && !payload.password) delete payload.password;

  setSaving(true);

  try {

    let userId = form.id;
    const { photoFile, photoPreview, ...payload } = form;
    if (form.id) {
      await api.put(endpoints.employee.update(form.id), payload);
    } else {
      const res = await api.post(endpoints.employee.create, payload);
      console.log("CREATE RES:", res?.data);

      userId =
        res?.data?.userId ??
        res?.data?.data?.userId ??
        res?.data?.id ??
        res?.data?.data?.id ??
        null;
    }

    console.log("form",form)
    console.log(userId)

    if (form.photoFile && userId) {
      const fd = new FormData();
      fd.append("photo", form.photoFile);

      await api.put(endpoints.employee.uploadPhoto(userId), fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    setQ("")
    await crud.fetchAll?.();
    setModalOpen(false);
  } catch (e) {
    console.error("SAVE EMPLOYEE ERROR:", e);
    setError(
      e?.response?.data?.message ||
      e?.response?.data?.error ||
      e?.message ||
      "Gagal menyimpan pegawai."
    );
  } finally {
    setSaving(false);
  }
};

  const toPublicUrl = (path) => {
        if (!path) return "";
        if (path.startsWith("http://") || path.startsWith("https://")) return path;
        const base = import.meta.env.VITE_API_BASE_URL; 
        return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`}
  const columns = [
    {
       key: "photoUrl",
    header: "Foto",
    style: { width: 90 },
    render: (r) => {

      const raw = r.photoUrl ?? r.user?.photoUrl ?? "";
      const src = toPublicUrl(raw);

      return (
        <div
          className="rounded-circle border"
          style={{
            width: 44,
            height: 44,
            overflow: "hidden",
            background: "#f2f2f2",
          }}
        >
          {src ? (
            <img
              src={src}
              alt={r.user?.name || "user"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : null}
        </div>
      )}
    },
    { key: "name", header: "Nama", render: (r) => <span className="fw-semibold">{r.user.name}</span> },
    { key: "email", header: "Email" },
    { key: "department", header: "Departemen" },
    {
      key: "actions",
      header: "Action",
      style: { width: 170 },
      className: "text-end",
      tdClassName: "text-end",
      render: (r) => (
        <div className="btn-group btn-group-sm">
          <button className="btn btn-outline-primary" onClick={() => openEdit(r)}>Edit</button>
          <button className="btn btn-outline-danger" onClick={() => onDelete(r)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white border rounded-3 shadow-sm p-3">
      <PageHeader
        title="Manajemen Pegawai"
        subtitle="CRUD pegawai + upload foto (JPG max 300KB)"
        right={
          <div className="d-flex gap-2">
            <input
              className="form-control"
              style={{ width: 260 }}
              placeholder="Search name/email/position..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button className="btn btn-primary" onClick={openAdd}>+ Add Pegawai</button>
          </div>
        }
      />

      {crud.loading ? <div className="text-muted">Loading...</div> : <DataTable columns={columns} rows={rows} />}

      <EmployeeFormModal
        open={modalOpen}
        initialValue={editing}
        saving={saving}
        error={error}
        onClose={() => setModalOpen(false)}
        onSubmit={onSubmit}
        onFileError={(msg) => setError(msg)}
      />
    </div>
  );
}
