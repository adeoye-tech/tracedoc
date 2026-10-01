"use client";

import { useState } from "react";
import { useApplications } from "@/context/ApplicationsContext";

type AddApplicationModalProps = {
  onClose: () => void;
};

export default function AddApplicationModal({
  onClose,
}: AddApplicationModalProps) {
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [category, setCategory] = useState("");
  const { addApplication } = useApplications();
  const handleSave = () => {
  if (!title || !organization || !category) {
    return;
  }

  addApplication({
    id: Date.now(),
    title,
    organization,
    category,
    status: "Waiting",
    currentStage: "Submitted",
    submittedDate: new Date().toISOString(),
    timeline: [
      "Submitted",
      "Verification",
      "Processing",
      "Completed",
    ],
  });

  onClose();
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <h2 className="mb-6 text-2xl font-bold">
          Add Application
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Organization"
            value={organization}
            onChange={(e) =>
              setOrganization(e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
  onClick={handleSave}
  className="rounded-lg bg-blue-600 px-4 py-2 text-white"
>
  Save
</button>
        </div>
      </div>
    </div>
  );
}