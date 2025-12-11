import React, { useEffect, useState } from "react";
import Modal from "../components/ui/modal";
import TextField from "../components/ui/TextField";
import Alert from "../components/ui/Alert";
import FileJpeg300KB from "../components/ui/FileJpeg300KB";
import SelectField from "../components/ui/SelectField";

export default function EmployeeFormModal({
  open,
  initialValue,
  saving,
  error,
  onClose,
  onSubmit,
  onFileError,
}) {
const [form, setForm] = useState({
  id: null,

  name: "",
  email: "",
  password: "",
  role: "",

  phoneNumber: "",
  address: "",
  department: "",
  jobTitle: "",
  salary: "",
  leaveAllowance: 0,
  workLocation: "",
  businessAddress: "",
  emergencyContact: "",
  status: true,
  dateOfJoining: "",   
  dateOfBirth: "",    
  gender: "",
  reportingTo: "",
  photoFile: null,
  photoPreview: "",
});


useEffect(() => {
  setForm({
    id: initialValue?.id ?? initialValue?.userId ?? null,

    name: initialValue?.name ?? initialValue?.fullName ?? "",
    email: initialValue?.email ?? initialValue?.user?.email ?? "",
    password: "",
    role: initialValue?.role ?? initialValue?.user?.role ?? "IT",

    phoneNumber: initialValue?.phoneNumber ?? "",
    address: initialValue?.address ?? "",
    department: initialValue?.department ?? "",
    jobTitle: initialValue?.jobTitle ?? "",
    salary: initialValue?.salary ?? "",
    leaveAllowance: initialValue?.leaveAllowance ?? 0,
    workLocation: initialValue?.workLocation ?? "",
    businessAddress: initialValue?.businessAddress ?? "",
    emergencyContact: initialValue?.emergencyContact ?? "",
    status: initialValue?.status ?? true,
    dateOfJoining: (initialValue?.dateOfJoining ?? "").slice(0, 10),
    dateOfBirth: (initialValue?.dateOfBirth ?? "").slice(0, 10),
    gender: initialValue?.gender ?? "",
    reportingTo: initialValue?.reportingTo ?? "",

    photoFile: null,
    photoPreview: initialValue?.photoUrl ?? initialValue?.user?.photoUrl ?? "",
  });
}, [initialValue, open]);


const footer = (
  <>
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={onClose}
      disabled={saving}
    >
      Cancel
    </button>

    <button
      type="button"
      className="btn btn-primary"
      onClick={async () => {
        await onSubmit(form);        // pastikan onSubmit async
      }}
      disabled={saving}
    >
      {saving ? "Saving..." : "Save"}
    </button>
  </>
);

  return (
<Modal
  open={open}
  title={form.id ? "Edit Pegawai" : "Add Pegawai"}
  onClose={onClose}
  footer={footer}
  size="lg"
>
  <Alert>{error}</Alert>

  <div className="row g-3">
    {/* LEFT: FORM FIELDS */}
    <div className="col-12 col-md-8">
      <div className="row g-3">
        <div className="col-12">
          <TextField
            label="Nama"
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
          />
        </div>

        <div className="col-12 col-md-6">
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm((p) => ({ ...p, email: v }))}
          />
        </div>

        <div className="col-12 col-md-6">
          {/* Password biasanya wajib saat Add, opsional saat Edit */}
          <TextField
            label="Password"
            type="password"
            placeholder={form.id ? "(kosongkan jika tidak diubah)" : "min. 6 karakter"}
            value={form.password}
            onChange={(v) => setForm((p) => ({ ...p, password: v }))}
          />
        </div>

        <div className="col-12 col-md-6">
          <SelectField
            label="Role"
            value={form.role}
            onChange={(v) => setForm((p) => ({ ...p, role: v }))}
            options={[
              { value: "IT", label: "IT" },
              { value: "HR", label: "HR" },
              { value: "Finance", label: "Finance" },
              { value: "Admin", label: "Admin" },
            ]}
          />
        </div>

        <div className="col-12 col-md-6">
          <TextField
            label="Phone Number"
            value={form.phoneNumber}
            onChange={(v) => setForm((p) => ({ ...p, phoneNumber: v }))}
          />
        </div>

        <div className="col-12">
          <TextField
            label="Address"
            value={form.address}
            onChange={(v) => setForm((p) => ({ ...p, address: v }))}
          />
        </div>

        <div className="col-12 col-md-6">
          <TextField
            label="Department"
            value={form.department}
            onChange={(v) => setForm((p) => ({ ...p, department: v }))}
          />
        </div>

        <div className="col-12 col-md-6">
          <TextField
            label="Job Title"
            value={form.jobTitle}
            onChange={(v) => setForm((p) => ({ ...p, jobTitle: v }))}
          />
        </div>

        <div className="col-12 col-md-6">
          <TextField
            label="Salary"
            placeholder="contoh: 10000000"
            value={form.salary}
            onChange={(v) => setForm((p) => ({ ...p, salary: v }))}
          />
        </div>

        <div className="col-12 col-md-6">
          <TextField
            label="Leave Allowance"
            type="number"
            value={String(form.leaveAllowance ?? 0)}
            onChange={(v) =>
              setForm((p) => ({ ...p, leaveAllowance: Number(v || 0) }))
            }
          />
        </div>

        <div className="col-12 col-md-6">
          <SelectField
            label="Work Location"
            value={form.workLocation}
            onChange={(v) => setForm((p) => ({ ...p, workLocation: v }))}
            options={[
              { value: "Office", label: "Office" },
              { value: "Remote", label: "Remote" },
              { value: "Hybrid", label: "Hybrid" },
            ]}
          />
        </div>

        <div className="col-12 col-md-6">
          <SelectField
            label="Gender"
            value={form.gender}
            onChange={(v) => setForm((p) => ({ ...p, gender: v }))}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />
        </div>

        <div className="col-12">
          <TextField
            label="Business Address"
            value={form.businessAddress}
            onChange={(v) => setForm((p) => ({ ...p, businessAddress: v }))}
          />
        </div>

        <div className="col-12">
          <TextField
            label="Emergency Contact"
            value={form.emergencyContact}
            onChange={(v) => setForm((p) => ({ ...p, emergencyContact: v }))}
          />
        </div>

        <div className="col-12 col-md-6">
          <TextField
            label="Reporting To"
            value={form.reportingTo}
            onChange={(v) => setForm((p) => ({ ...p, reportingTo: v }))}
          />
        </div>

        <div className="col-12 col-md-6 d-flex align-items-end">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={!!form.status}
              onChange={(e) => setForm((p) => ({ ...p, status: e.target.checked }))}
              id="statusActive"
            />
            <label className="form-check-label" htmlFor="statusActive">
              Active
            </label>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <TextField
            label="Date Of Joining"
            type="date"
            value={form.dateOfJoining}
            onChange={(v) => setForm((p) => ({ ...p, dateOfJoining: v }))}
          />
        </div>

        <div className="col-12 col-md-6">
          <TextField
            label="Date Of Birth"
            type="date"
            value={form.dateOfBirth}
            onChange={(v) => setForm((p) => ({ ...p, dateOfBirth: v }))}
          />
        </div>
      </div>
    </div>

    <div className="col-12 col-md-4">
      <FileJpeg300KB
        previewUrl={form.photoPreview}
        onPick={(file) => {
          const preview = URL.createObjectURL(file);
          setForm((p) => ({ ...p, photoFile: file, photoPreview: preview }));
        }}
        onError={(msg) => onFileError?.(msg)}
      />
    </div>
  </div>
</Modal>

  );
}
