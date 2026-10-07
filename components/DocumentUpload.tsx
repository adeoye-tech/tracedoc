"use client";

import { useState } from "react";

type DocumentUploadProps = {
  onUpload: (document: { name: string; url: string }) => void;
};

export default function DocumentUpload({
  onUpload,
}: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = async () => {
    try {
      const response = await fetch(
        "/api/cloudinary/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file: reader.result,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Upload failed"
        );
      }

      onUpload({
        name: file.name,
        url: data.url,
      });

      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Document upload failed");
    }
  };

  reader.readAsDataURL(file);
};
  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full rounded-lg border border-slate-300 p-3"
      />

      {file && (
        <p className="text-sm text-slate-600">
          Selected: {file.name}
        </p>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={!file}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Upload Document
      </button>
    </div>
  );
}