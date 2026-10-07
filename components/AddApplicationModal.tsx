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
  const [expiryDate, setExpiryDate] = useState("");
  const [documents, setDocuments] = useState<
    { name: string; url: string }[]
  >([]);
  const [expectedDays, setExpectedDays] = useState("");

  const [stageInput, setStageInput] = useState("");
  const [timeline, setTimeline] = useState<string[]>([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { applications, addApplication } = useApplications();

  const handleAddStage = () => {
    const trimmedStage = stageInput.trim();

    if (!trimmedStage) {
      return;
    }

    if (timeline.includes(trimmedStage)) {
      return;
    }

    setTimeline((prev) => [...prev, trimmedStage]);
    setStageInput("");
  };

  const handleRemoveStage = (indexToRemove: number) => {
  setTimeline((prev) =>
    prev.filter((_, index) => index !== indexToRemove)
  );
};

  const handleSave = async () => {
    setErrorMessage("");

    if (!title.trim()) {
      setErrorMessage("Please enter an application title.");
      return;
    }

    if (!organization.trim()) {
      setErrorMessage("Please enter an organization.");
      return;
    }

    if (!category.trim()) {
      setErrorMessage("Please enter a category.");
      return;
    }

    if (!expiryDate) {
      setErrorMessage("Please select an expiry date.");
      return;
    }

    if (!expectedDays || Number(expectedDays) <= 0) {
      setErrorMessage(
        "Please enter a valid expected duration."
      );
      return;
    }

    if (timeline.length === 0) {
      setErrorMessage(
        "Please add at least one application stage."
      );
      return;
    }

    const selectedExpiryDate = new Date(expiryDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedExpiryDate.setHours(0, 0, 0, 0);

    if (selectedExpiryDate <= today) {
      setErrorMessage(
        "Expiry date must be a future date."
      );
      return;
    }

    setIsSaving(true);

    try {
      await addApplication({
        id: Date.now(),
        title: title.trim(),
        organization: organization.trim(),
        category: category.trim(),
        expiryDate,
        expectedDays: Number(expectedDays),
        documents,
        status: "Waiting",
        currentStage: timeline[0],
        submittedDate: new Date().toISOString(),
        timeline,
      });

      onClose();
    } catch (error) {
      console.error(
        "Failed to save application:",
        error
      );

      setErrorMessage(
        "Unable to save the application. Please try again."
      );

      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-black shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">
          Add Application
        </h2>

        <div className="max-h-[80vh] space-y-4 overflow-y-auto">
          {/* Application Title */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Application Title
            </label>

            <input
              type="text"
              list="application-titles"
              placeholder="Select or type an application"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrorMessage("");
              }}
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />

            <datalist id="application-titles">
              <option value="University Transcript" />
              <option value="Passport" />
              <option value="Certificate" />
              <option value="Job Application" />
              <option value="Admission Application" />
            </datalist>
          </div>

          {/* Organization */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Organization
            </label>

            <input
              type="text"
              list="organizations"
              placeholder="Select or type an organization"
              value={organization}
              onChange={(e) => {
                setOrganization(e.target.value);
                setErrorMessage("");
              }}
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />

            <datalist id="organizations">
              <option value="University" />
              <option value="Government Agency" />
              <option value="Embassy" />
              <option value="Company" />
              <option value="School" />
            </datalist>
          </div>

          {/* Category */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Category
            </label>

            <input
              type="text"
              list="categories"
              placeholder="Select or type a category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setErrorMessage("");
              }}
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />

            <datalist id="categories">
              <option value="Education" />
              <option value="Employment" />
              <option value="Travel" />
              <option value="Government" />
              <option value="Certification" />
              <option value="Personal" />
            </datalist>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Expiry Date
            </label>

            <input
              type="date"
              value={expiryDate}
              min={new Date()
                .toISOString()
                .split("T")[0]}
              onChange={(e) => {
                setExpiryDate(e.target.value);
                setErrorMessage("");
              }}
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Expected Duration */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Expected Duration
            </label>

            <input
              type="number"
              min="1"
              placeholder="Expected Duration (days)"
              value={expectedDays}
              onChange={(e) => {
                setExpectedDays(e.target.value);
                setErrorMessage("");
              }}
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

        {/* Stages */}
<div>
  <label className="mb-2 block text-sm font-medium">
    Application Stages
  </label>

  <div className="flex gap-2">
    <input
      type="text"
      list="previous-stages"
      placeholder="Enter or select a stage"
      value={stageInput}
      onChange={(e) => setStageInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleAddStage();
        }
      }}
      className="flex-1 rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
    />

    <button
      type="button"
      onClick={handleAddStage}
      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      Add
    </button>
  </div>

  <datalist id="previous-stages">
    {Array.from(
      new Set(
        applications.flatMap(
          (application) => application.timeline
        )
      )
    ).map((stage) => (
      <option key={stage} value={stage} />
    ))}
  </datalist>

  {timeline.length > 0 && (
    <div className="mt-3 space-y-2">
      {timeline.map((stage, index) => (
        <div
          key={index}
          className="flex items-center gap-2 rounded-lg bg-slate-100 p-2"
        >
          <span className="w-8 text-sm font-medium text-slate-500">
            {index + 1}.
          </span>

          <input
            type="text"
            list="previous-stages"
            value={stage}
            onChange={(e) => {
              const updatedTimeline = [...timeline];

              updatedTimeline[index] = e.target.value;

              setTimeline(updatedTimeline);
            }}
            className="flex-1 rounded-lg border border-slate-300 bg-white p-2 outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() => handleRemoveStage(index)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )}
</div>

          {/* Documents */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Documents
            </label>

            <input
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(
                  e.target.files || []
                ).map((file) => ({
                  name: file.name,
                  url: URL.createObjectURL(file),
                }));

                setDocuments(files);
              }}
              className="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}