"use client";
import { useState } from "react";
import { useApplications } from "@/context/ApplicationsContext";
import { useParams } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";
import DocumentUpload from "@/components/DocumentUpload";
import { Application } from "@/types/applications";
import ProgressBar from "@/components/ProgressBar";

export default function ApplicationDetails() {
 const {
  applications,
  updateApplication,
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


  const [editedTimeline, setEditedTimeline] =
  useState<string[]>(application?.timeline || []);
  const handleSave = () => {
  if (!application) return;

  updateApplication({
  ...application,
  title: editedTitle,
  organization: editedOrganization,
  
  timeline: editedTimeline,
  currentStage: editedTimeline.includes(
    application.currentStage
  )
    ? application.currentStage
    : editedTimeline[0] || "",
});

  setIsEditing(false);
};
const handleDocumentUpload = (document: {
  name: string;
  url: string;
}) => {
  if (!application) return;

  updateApplication({
    ...application,
    documents: [
      ...(application.documents || []),
      document,
    ],
  });
};
const handleDocumentDelete = (index: number) => {
  if (!application) return;

  const updatedDocuments = [
    ...(application.documents || []),
  ];

  updatedDocuments.splice(index, 1);

  updateApplication({
    ...application,
    documents: updatedDocuments,
  });
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


  return (
  <main className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-6 text-black">
      <div className="mx-auto max-w-5xl">
        <Link
  href="/dashboard"
  className="mb-6 inline-block font-medium text-blue-600 transition hover:text-blue-700"
>
  ← Back to Dashboard
</Link>

        <div
 className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl"
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
  className="text-4xl font-bold text-black"
>
    {application.title}
  </h1>
)}

  {!isEditing && (
    <button
     onClick={() => {
  setEditedTitle(application.title);
  setEditedOrganization(application.organization);
  
  setEditedTimeline([...application.timeline]);
  setIsEditing(true);
}}
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
  className="mb-6 text-gray-500"
>
    {application.organization}
  </p>
)}

          {isEditing ? (
 <div className="rounded-lg bg-slate-50 px-4 py-3">
  <p className="text-sm text-slate-500">
    Status
  </p>

  <div className="mt-1">
    <StatusBadge status={application.status} />
  </div>
</div>
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
    
     "bg-slate-50 border border-gray-200"
  }`}
>

           <div className="mt-4">
  <label className="mb-2 block font-semibold text-slate-700">
    Current Stage
  </label>

  <select
  value={application.currentStage}
  onChange={async (e) => {
    const newStage = e.target.value;

    await updateApplication({
      ...application,
      currentStage: newStage,
    });
  }}
  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none focus:border-blue-500"
>
  {application.timeline.map((stage) => (
    <option key={stage} value={stage}>
      {stage}
    </option>
  ))}
</select>
</div>
{isEditing && (
  <div className="mt-6">
    <label className="mb-2 block font-semibold text-slate-700">
      Application Stages
    </label>

    <div className="space-y-3">
      {editedTimeline.map((stage, index) => (
        <input
          key={index}
          type="text"
          value={stage}
          onChange={(e) => {
            const updatedTimeline = [...editedTimeline];

            updatedTimeline[index] = e.target.value;

            setEditedTimeline(updatedTimeline);
          }}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none focus:border-blue-500"
          placeholder={`Stage ${index + 1}`}
        />
      ))}
    </div>
  </div>
)}
            <p>
              <strong>Submitted:</strong>{" "}
              {application.submittedDate}
                          </p>

            <p>
              <strong>Category:</strong>{" "}
              {application.category}
            </p>
           <div className="mt-4">
  <strong>Documents:</strong>

  <div className="mt-4">
    <DocumentUpload
      onUpload={handleDocumentUpload}
    />
  </div>

  {application.documents?.length ? (
    <ul className="mt-2 space-y-2">
    {application.documents.map(
  (doc, index) => (
    <li
      key={index}
      className="flex items-center justify-between rounded-lg border p-3"
    >
      <a
        href={doc.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {doc.name}
      </a>

      <button
        type="button"
        onClick={() => handleDocumentDelete(index)}
        className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
      >
        Delete
      </button>
    </li>
  )
)}
    </ul>
  ) : (
    <p>No documents uploaded</p>
  )}
</div>

          </div>

<ProgressBar
  currentStage={application.currentStage}
  timeline={application.timeline}
/>

<div className="mt-10">

  <h2 className="mb-6 text-3xl font-bold">
    Timeline
  </h2>

            <div className="space-y-4">

             {application.timeline.map((step, index) => {
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


</div>

      <p
  className={`text-lg ${
    current
      ? "font-bold text-yellow-500"
      : completed
      ? "text-green-400"
     
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