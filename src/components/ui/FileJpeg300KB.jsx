import React, { useRef } from "react";

const MAX = 300 * 1024;

export default function FileJpeg300KB({
  label = "Foto (max 300KB)",
  previewUrl,
  onPick,
  onError,
}) {
  const inputRef = useRef(null);

  const validate = (f) => {
    if (!f) return "Tidak ada file dipilih.";
    if (!f.type?.startsWith("image/")) return "File harus berupa gambar.";
    if (f.size > MAX) return "Ukuran foto maksimal 300KB.";
    return null;
  };

  const handleChange = (e) => {
    const f = e.target.files?.[0] || null;

    // debug biar kelihatan di console
    console.log("FILE PICKED:", f);

    const msg = validate(f);
    if (msg) {
      onError?.(msg);
      // reset input biar bisa pilih file yang sama lagi
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    onPick?.(f);
  };

  return (
    <div>
      <label className="form-label">{label}</label>

      <div className="border rounded-3 p-2 text-center">
        <div
          className="mx-auto mb-2 border rounded-3"
          style={{ width: "100%", height: 160, background: "#f5f5f5", overflow: "hidden" }}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div className="h-100 d-flex align-items-center justify-content-center text-muted small">
              No photo selected
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          className="form-control form-control-sm"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />

        <div className="text-muted small mt-2">Format: image/*, max 300KB</div>
      </div>
    </div>
  );
}
