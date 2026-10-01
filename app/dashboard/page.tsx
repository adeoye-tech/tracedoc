"use client";
import { useApplications } from "@/context/ApplicationsContext";
import StatusBadge from "@/components/StatusBadge";
import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";
import { useState, useEffect } from "react";
import AddApplicationModal from "@/components/AddApplicationModal";
import ExportPdfButton from "@/components/ExportPdfButton";
import DeleteModal from "@/components/DeleteModal";

export default function Dashboard() {
  const {
  applications,
  deleteApplication,
} = useApplications();
  const [isModalOpen, setIsModalOpen] =
  useState(false);
  const [searchTerm, setSearchTerm] =
  useState("");
  const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    setDarkMode(true);
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "theme",
    darkMode ? "dark" : "light"
  );
}, [darkMode]);
 

  
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const filteredApplications = applications.filter((app) => {
  const matchesSearch = app.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    app.status === statusFilter;

  return matchesSearch && matchesStatus;
});
  const totalApplications = applications.length;

const waitingCount = applications.filter(
  (app) => app.status === "Waiting"
).length;

const onTrackCount = applications.filter(
  (app) => app.status === "On Track"
).length;

const actionRequiredCount = applications.filter(
  (app) => app.status === "Action Required"
).length;
  return (
    <main
  className={`min-h-screen p-6 transition-colors duration-300 ${
    darkMode
      ? "bg-slate-900 text-white"
      : "bg-linear-to-br from-slate-50 to-blue-50 text-black"
  }`}
>
      <div className="mx-auto max-w-7xl">
       
  <div className="flex items-center justify-between">
  <h1
    className={`text-4xl font-bold ${
      darkMode ? "text-white" : "text-gray-900"
    }`}
  >
    TraceDoc Dashboard
  </h1>

  <button
    onClick={() => setDarkMode(!darkMode)}
    className={`rounded-xl px-4 py-2 transition ${
  darkMode
    ? "bg-slate-800 text-white border border-slate-600"
    : "bg-white text-black border border-gray-300"
}`}
  >
    {darkMode ? "☀️ Light" : "🌙 Dark"}
  </button>
</div>

  <p className="mt-2 text-gray-500">
    Track every application from submission to completion.
  </p>
</div>
        <input
  type="text"
  placeholder=" Search applications..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
  className={`mb-6 w-full rounded-2xl border p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
  darkMode
    ? "border-slate-600 bg-slate-800 text-white"
    : "border-gray-300 bg-white text-gray-900"
}`}
/>
<div className="mb-6 flex flex-wrap gap-2">
  <button
  onClick={() => setStatusFilter("All")}
  className={`rounded-lg px-4 py-2 transition ${
  statusFilter === "All"
    ? "bg-blue-600 text-white"
    : darkMode
    ? "border border-slate-600 bg-slate-800 text-white"
    : "border bg-white text-black"
}`}
>
  All
</button>
  <button
  onClick={() => setStatusFilter("Waiting")}
  className={`rounded-lg px-4 py-2 transition ${
  statusFilter === "Waiting"
    ? "bg-yellow-500 text-white"
    : darkMode
    ? "border border-slate-600 bg-slate-800 text-white"
    : "border bg-white text-black"
}`}
>
  Waiting
</button>

  <button
  onClick={() => setStatusFilter("On Track")}
  className={`rounded-lg px-4 py-2 transition ${
  statusFilter === "On Track"
    ? "bg-green-600 text-white"
    : darkMode
    ? "border border-slate-600 bg-slate-800 text-white"
    : "border bg-white text-black"
}`}
>
  On Track
</button>

  <button
  onClick={() => setStatusFilter("Action Required")}
 className={`rounded-lg px-4 py-2 transition ${
  statusFilter === "Action Required"
    ? "bg-red-600 text-white"
    : darkMode
    ? "border border-slate-600 bg-slate-800 text-white"
    : "border bg-white text-black"
}`}
>
  Action Required
</button>
</div>
<div className="mb-6 flex gap-3">
  <ExportPdfButton />

  <button
    onClick={() => setIsModalOpen(true)}
    className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
  >
    + Add Application
  </button>
</div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div
  className={`rounded-2xl border p-6 shadow-sm transition hover:shadow-lg ${
    darkMode
      ? "bg-slate-800 border-slate-600"
      : "bg-white border-gray-200"
  }`}
>
            <p
  className={`text-lg font-medium ${
    darkMode ? "text-gray-300" : "text-gray-500"
  }`}
>
  Total Applications
</p>
           <h2
  className={`text-5xl font-bold ${
    darkMode ? "text-white" : "text-black"
  }`}
>
              {applications.length}
            </h2>
          </div>

          <div
  className={`rounded-2xl border p-6 shadow-sm transition hover:shadow-lg ${
    darkMode
      ? "bg-slate-800 border-slate-600"
      : "bg-white border-gray-200"
  }`}
>
           <p
  className={`text-lg font-medium ${
    darkMode ? "text-gray-300" : "text-gray-500"
  }`}
>
  On Track
</p>
           <h2
  className={`text-5xl font-bold ${
    darkMode ? "text-white" : "text-black"
  }`}
>
              {
                applications.filter(
                  (app) => app.status === "On Track"
                ).length
              }
            </h2>
          </div>

         <div
  className={`rounded-2xl border p-6 shadow-sm transition hover:shadow-lg ${
    darkMode
      ? "bg-slate-800 border-slate-600"
      : "bg-white border-gray-200"
  }`}
>
          <p
  className={`text-lg font-medium ${
    darkMode ? "text-gray-300" : "text-gray-500"
  }`}
>
  Waiting
 </p>
            <h2
  className={`text-5xl font-bold ${
    darkMode ? "text-white" : "text-black"
  }`}
>
              {
                applications.filter(
                  (app) => app.status === "Waiting"
                ).length
              }
            </h2>
          </div>

              <div
  className={`rounded-2xl border p-6 shadow-sm transition hover:shadow-lg ${
    darkMode
      ? "bg-slate-800 border-slate-600"
      : "bg-white border-gray-200"
  }`}
>
                     <p
  className={`text-lg font-medium ${
    darkMode ? "text-gray-300" : "text-gray-500"
  }`}
>
 Action Required
</p>
            <h2
  className={`text-5xl font-bold ${
    darkMode ? "text-white" : "text-black"
  }`}
>
              {
                applications.filter(
                  (app) => app.status === "Action Required"
                ).length
              }
            </h2>
          </div>
        </div>

       <div className="grid gap-6 md:grid-cols-2">
  {filteredApplications.length > 0 ? (
    filteredApplications.map((app) => (
      <Link
        href={`/applications/${app.id}`}
        key={app.id}
        className={`
rounded-3xl
border
p-6
shadow-sm
transition-all
duration-300
hover:-translate-y-1
hover:shadow-xl hover:border-blue-500
${
  darkMode
    ? "bg-slate-800 border-slate-600"
    : "bg-white border-gray-200"
}
`}
         >
        
  <h3
  className={`mb-2 text-2xl font-bold ${
    darkMode ? "text-slate-100" : "text-gray-900"
  }`}
>
          {app.title}
        </h3>

        <p
  className={`text-sm ${
    darkMode ? "text-gray-400" : "text-gray-500"
  }`}
>
          {app.organization}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <StatusBadge status={app.status} />

          <span
  className={`text-sm ${
    darkMode ? "text-gray-400" : "text-gray-500"
  }`}
>
            {app.category}
          </span>
        </div>

        <div
  className={`mt-4 space-y-3 ${
    darkMode ? "text-gray-300" : "text-gray-700"
  }`}
>
          <p>
            <strong>Current Stage:</strong>{" "}
            {app.currentStage}
          </p>
          <ProgressBar stage={app.currentStage} />

          <p>
            <strong>Submitted:</strong>{" "}
            {app.submittedDate}
          </p>
        </div>

        <div className="mt-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              setDeleteId(app.id);
            }}
            className="mt-6 rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Link>
         ))
  ) : (
    <div
  className={`col-span-full rounded-3xl p-12 text-center shadow-sm ${
    darkMode
      ? "bg-slate-800 text-white"
      : "bg-white text-black"
  }`}
>
      <div className="mb-4 text-6xl">
        📂
      </div>

      <h2 className="mb-2 text-2xl font-bold">
        No applications yet
      </h2>

      <p className="mb-6 text-gray-500">
        Start tracking your applications with TraceDoc.
      </p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-xl bg-blue-600 px-5 py-3 text-white"
      >
        + Add Application </button>
    

</div>
)}

 {isModalOpen && (
  <AddApplicationModal
    onClose={() => setIsModalOpen(false)}
  />
)}

{deleteId && (
  <DeleteModal
    onCancel={() => setDeleteId(null)}
    onConfirm={() => {
      deleteApplication(deleteId);
      setDeleteId(null);
    }}
  />
)}

</div>

</main>

);
}