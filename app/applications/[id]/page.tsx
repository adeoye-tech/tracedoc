"use client";
import { useState, useEffect } from "react";
import { useApplications } from "@/context/ApplicationsContext";
import { useParams } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";

export default function ApplicationDetails() {
 const {
  applications,
  updateApplication,
  darkMode,
  setDarkMode,
} = useApplications();
  const params = useParams();
  const id = params.id as string;

  const application = applications.find(
    (app) => app.id === Number(id)
  );
  const [isEditing, setIsEditing] =
  useState(false);
  
  

  
const [editedTitle, setEditedTitle] =
  useState(application?.title || "");

const [
  editedOrganization,
  setEditedOrganization,
] = useState(
  application?.organization || ""
);

const [editedStatus, setEditedStatus] =
  useState(application?.status || "");
  const handleSave = () => {
  if (!application) return;

  updateApplication({
    ...application,
    title: editedTitle,
    organization:
      editedOrganization,
    status: editedStatus,
  });

  setIsEditing(false);
};

  if (!application) {
    return (
      <div className="p-10">
        Application not found
      </div>
    );
  }

  const formattedDate = new Date(
  application.submittedDate
).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
const currentIndex =
  application.timeline.indexOf(
    application.currentStage
  );

const progress =
  (currentIndex /
    (application.timeline.length - 1)) *
  100;
  return (
   <main
  className={`min-h-screen p-6 transition-colors duration-300 ${
    localStorage.getItem("theme") === "dark"
      ? "bg-slate-900 text-white"
      : "bg-gradient-to-br from-slate-50 to-blue-50 text-black"
  }`}
>
      <div className="mx-auto max-w-5xl">
        <Link
  href="/dashboard"
  className={`mb-6 inline-block font-medium transition ${
  darkMode
    ? "text-blue-400 hover:text-blue-300"
    : "text-blue-600 hover:text-blue-700"
}`}
>
  ← Back to Dashboard
</Link>

        <div
  className={`rounded-3xl p-8 shadow-xl border ${
    darkMode
      ? "bg-slate-800 border-slate-700"
      : "bg-white border-gray-100"
  }`}
>

          <div className="mb-4 flex items-center justify-between">
  {isEditing ? (
  <input
    value={editedTitle}
    onChange={(e) =>
      setEditedTitle(e.target.value)
    }
    className="w-full rounded-lg border p-3 text-2xl font-bold"
  />
) : (
 <h1
  className={`text-4xl font-bold ${
    darkMode ? "text-white" : "text-black"
  }`}
>
    {application.title}
  </h1>
)}

  {!isEditing && (
    <button
      onClick={() => setIsEditing(true)}
     className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
    >
      Edit
    </button>
  )}
</div>

         {isEditing ? (
  <input
    value={editedOrganization}
    onChange={(e) =>
      setEditedOrganization(
        e.target.value
      )
    }
    className="mb-6 w-full rounded-lg border p-3"
  />
) : (
  <p
  className={`mb-6 ${
    darkMode ? "text-gray-400" : "text-gray-500"
  }`}
>
    {application.organization}
  </p>
)}

          {isEditing ? (
  <select
    value={editedStatus}
    onChange={(e) =>
      setEditedStatus(e.target.value)
    }
    className="rounded-lg border p-3"
  >
    <option>Waiting</option>
    <option>On Track</option>
    <option>Action Required</option>
  </select>
) : (
  <StatusBadge
    status={application.status}
  />
)}
{isEditing && (
  <div className="mt-6 flex gap-3">
    <button
      onClick={handleSave}
      className="rounded-lg bg-green-600 px-4 py-2 text-white"
    >
      Save Changes
    </button>

    <button
      onClick={() =>
        setIsEditing(false)
      }
      className="rounded-lg border px-4 py-2"
    >
      Cancel
    </button>
  </div>
)}

         <div
  className={`mt-8 space-y-4 rounded-2xl p-6 ${
    darkMode
      ? "bg-slate-900/40 border border-slate-700"
      : "bg-slate-50 border border-gray-200"
  }`}
>

            <p>
              <strong>Current Stage:</strong>{" "}
              {application.currentStage}
            </p>

            <p>
              <strong>Submitted:</strong>{" "}
              {application.submittedDate}
                          </p>

            <p>
              <strong>Category:</strong>{" "}
              {application.category}
            </p>

          </div>
          <div className="mb-10">
  <div className="mb-2 flex justify-between">
    <span className="font-semibold">
      Progress
    </span>

   <span className="font-semibold text-blue-500">
  {Math.round(progress)}%
</span>
  </div>

  <div
    className={`h-4 w-full rounded-full overflow-hidden ${
    darkMode ? "bg-slate-700" : "bg-gray-200"
  }`}
>
    <div
      className="h-3 rounded-full bg-blue-600 transition-all"
      style={{
        width: `${progress}%`,
      }}
    />
  </div>
</div>

          <div className="mt-10">

            <h2 className="mb-6 text-3xl font-bold">
              Timeline
            </h2>

            <div className="space-y-4">

              {application.timeline.map((step, index) => {
  const currentIndex =
    application.timeline.indexOf(
      application.currentStage
    );

  const completed = index < currentIndex;
  const current = index === currentIndex;

  return (
   <div
  key={index}
  className="relative flex items-center gap-4 rounded-xl p-3 transition hover:bg-slate-700/20"

>
    
      <div className="relative flex flex-col items-center">
  <div
    className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-bold ${
      completed
        ? "bg-green-600"
        : current
        ? "bg-yellow-500"
        : "bg-gray-500"
    }`}
  >
    {completed ? "✓" : index + 1}
  </div>

  {index !== application.timeline.length - 1 && (
    <div
      className={`absolute top-10 h-12 w-1 ${
        index < currentIndex
          ? "bg-green-600"
          : "bg-slate-600"
      }`}
    />
  )}
</div>

      <p
  className={`text-lg ${
    current
      ? "font-bold text-yellow-500"
      : completed
      ? "text-green-400"
      : darkMode
      ? "text-gray-300"
      : "text-gray-700"
  }`}
>
        {step}
      </p>
    </div>
  );
})}
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}