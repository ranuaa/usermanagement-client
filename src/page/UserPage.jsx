import React, { useMemo, useState } from "react";
import PageHeader from "../components/Layout/PageHeader";
import DataTable from "../components/ui/DataTable";
import useCrud from "../hooks/UseCrud";


export default function UsersPage() {
  const crud = useCrud({
    listUrl: `/api/user/`
  });

  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return crud.rows;
    return crud.rows.filter((x) => `${x.name || ""} ${x.email || ""} ${x.user.department || ""}`.toLowerCase().includes(s));
  }, [crud.rows, q]);

  const toPublicUrl = (path) => {
        if (!path) return "";
        if (path.startsWith("http://") || path.startsWith("https://")) return path;
        const base = import.meta.env.VITE_API_BASE_URL; 
        return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
    };

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
      );
    },
  },
    { key: "name", header: "Name", render: (r) => <span className="fw-semibold">{r.user.name}</span> },
    { key: "email", header: "Email" },
    {
        key: "phoneNumber",
        header : "Phone Number"
    },
    {
      key: "department",
      header: "Department",
      style: { width: 120 },
      render: (r) => <span className="badge text-bg-secondary">{r.department}</span>,
    }
  ];

  return (
    <div className="bg-white border rounded-3 shadow-sm p-3">
      <PageHeader
        title="Manajemen User"
        right={
          <div className="d-flex gap-2">
            <input
              className="form-control"
              style={{ width: 260 }}
              placeholder="Search name/email/department"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        }
      />

      {crud.loading ? <div className="text-muted">Loading...</div> : <DataTable columns={columns} rows={rows} />}
    </div>
  );
}
