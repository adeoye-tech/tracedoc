"use client";
import { useApplications } from "@/context/ApplicationsContext";
import StatusBadge from "@/components/StatusBadge";
import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";
import { useState, useEffect } from "react";
import AddApplicationModal from "@/components/AddApplicationModal";
import ExportPdfButton from "@/components/ExportPdfButton";
import DeleteModal from "@/components/DeleteModal";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default function Dashboard() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
  try {
    await signOut(auth);
    router.replace("/auth/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  const {
    applications,
    notifications,
    deleteApplication,
  } = useApplications();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showNotifications, setShowNotifications] =
    useState(false);

 useEffect(() => {
  if (!loading && !user) {
    router.replace("/auth/login");
  }
}, [user, loading, router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }
  
  const filteredApplications = applications.filter((app) => {
  const matchesSearch = app.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    app.status === statusFilter;
    const submittedDate = new Date(
  app.submittedDate
);

const today = new Date();

const daysPassed = Math.floor(
  (today.getTime() -
    submittedDate.getTime()) /
    (1000 * 60 * 60 * 24)
);

const isDelayed =
  daysPassed > app.expectedDays;

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
const attentionNotifications = notifications.filter(
  (notification) =>
    notification.type === "action" ||
    notification.type === "warning"
);
const continueTracking = applications.filter(
  (app) => {
    const currentIndex = app.timeline.indexOf(
      app.currentStage
    );

    return (
      currentIndex !== -1 &&
      currentIndex < app.timeline.length - 1
    );
  }
);
const upcomingDeadlines = applications
  .map((app) => {
    const daysUntilExpiry = Math.ceil(
      (new Date(app.expiryDate).getTime() -
        new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return {
      ...app,
      daysUntilExpiry,
    };
  })
  .filter(
    (app) =>
      app.daysUntilExpiry >= 0 &&
      app.daysUntilExpiry <= 30
  )
  .sort(
    (a, b) =>
      a.daysUntilExpiry - b.daysUntilExpiry
  );
  return (
    <main
  className="min-h-screen bg-slate-50 p-6 text-black"

>
      <div className="mx-auto max-w-7xl">
       
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
 <h1 className="text-4xl font-bold tracking-tight text-slate-900">
    TraceDoc Dashboard
  </h1>

  <p className="mt-2 text-lg font-medium text-slate-700">
    Welcome back, {profile?.fullName || "there"} 
  </p>
  </div>
  

 <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
  <Link
    href="/"
    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-black transition hover:bg-slate-50"
  >
    Home
  </Link>

  <button
    onClick={handleLogout}
    className="rounded-xl border border-red-200 bg-white px-4 py-2 text-red-600 transition hover:bg-red-50 cursor-pointer"
  >
    Logout
  </button>
</div>
</div>

  <p className="mt-2 text-slate-500">
    Track every application from submission to completion
  </p>
</div>
<div className="relative mb-6 flex justify-end">
  <button
    onClick={() =>
      setShowNotifications(!showNotifications)
    }
    className="relative rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:bg-slate-50 cursor-pointer"
  >
    🔔

    {notifications.length > 0 && (
      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
        {notifications.length}
      </span>
    )}
  </button>
  {showNotifications && (
  <div className="absolute right-0 top-14 z-50 w-[calc(100vw-2rem)] max-w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
    <div className="mb-3 flex items-center justify-between">
      <h2 className="font-semibold text-slate-800">
        Notifications
      </h2>

      <span className="text-sm text-slate-500">
        {notifications.length}
      </span>
    </div>

    {notifications.length > 0 ? (
      <div className="max-h-80 space-y-3 overflow-y-auto">
        {notifications.map((notification) => (
         <div
  key={notification.id}
  className={`rounded-xl border p-3 ${
    notification.type === "action"
      ? "border-red-200 bg-red-50"
      : notification.type === "warning"
      ? "border-amber-200 bg-amber-50"
      : notification.type === "success"
      ? "border-green-200 bg-green-50"
      : "border-blue-200 bg-blue-50"
  }`}
>
  <p className="font-semibold text-slate-800">
    {notification.title}
  </p>

  <p className="mt-1 text-sm text-slate-600">
    {notification.message}
  </p>
</div>
        ))}
      </div>
    ) : (
      <p className="py-4 text-center text-sm text-slate-500">
        No notifications
      </p>
    )}
  </div>
)}
</div>
        <input
  type="text"
  placeholder=" Search applications..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
  className="mb-6 w-full rounded-2xl border border-slate-200 bg-white p-4 text-gray-900 shadow-sm"
/>
<div className="mb-6 flex flex-wrap gap-2">
  <button
  onClick={() => setStatusFilter("All")}
  className={`rounded-lg px-4 py-2 transition ${
  statusFilter === "All"
    ? "bg-blue-600 text-white"
   : "border border-slate-200 bg-white text-slate-700 cursor-pointer hover:bg-slate-50" 
}`}
>
  All
</button>
  <button
  onClick={() => setStatusFilter("Waiting")}
  className={`rounded-lg px-4 py-2 transition ${
  statusFilter === "Waiting"
    ? "bg-yellow-500 text-white"
   : "border border-slate-200 bg-white text-slate-700 cursor-pointer hover:bg-slate-50"
}`}
>
  Waiting
</button>

  <button
  onClick={() => setStatusFilter("On Track")}
  className={`rounded-lg px-4 py-2 transition ${
  statusFilter === "On Track"
    ? "bg-green-600 text-white"
    : "border border-slate-200 bg-white text-slate-700 cursor-pointer hover:bg-slate-50"
}`}
>
  On Track
</button>

  <button
  onClick={() => setStatusFilter("Action Required")}
 className={`rounded-lg px-4 py-2 transition ${
  statusFilter === "Action Required"
    ? "bg-red-600 text-white"
  : "border border-slate-200 bg-white text-slate-700 cursor-pointer hover:bg-slate-50"
}`}
>
  Action Required
</button>
</div>
<div className="mb-6 flex gap-3">
  <ExportPdfButton />

  <button
    onClick={() => setIsModalOpen(true)}
    className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700 cursor-pointer"
  >
    + Add Application
  </button>
</div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div
  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
>
            <p
  className={`text-lg font-medium ${
    "text-gray-500"
  }`}
>
  Total Applications
</p>
           <h2
  className={`text-3xl font-bold ${
     "text-slate-900"
  }`}
>
              {applications.length}
            </h2>
          </div>

          <div
  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
>
           <p
  className={`text-lg font-medium ${
    "text-gray-500"
  }`}
>
  On Track
</p>
           <h2
  className={`text-3xl font-bold ${
    "text-slate-900"
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
  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
>
          <p
  className={`text-lg font-medium ${
     "text-gray-500"
  }`}
>
  Waiting
 </p>
            <h2
  className={`text-3xl font-bold ${
   "text-slate-900"
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
 className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
>
                     <p
  className={`text-lg font-medium ${
    "text-gray-500"
  }`}
>
 Action Required
</p>
            <h2
  className={`text-3xl font-bold ${
     "text-slate-900"
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
        {/* Needs Your Attention */}
        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Needs Your Attention
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Important updates about your applications
              </p>
            </div>

            {attentionNotifications.length > 0 && (
              <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                {attentionNotifications.length}{" "}
                {attentionNotifications.length === 1
                  ? "item"
                  : "items"}
              </span>
            )}
          </div>

          {attentionNotifications.length > 0 ? (
            <div className="space-y-3">
              {attentionNotifications
                .slice(0, 5)
                .map((notification) => (
                  <Link
                    key={notification.id}
                    href={`/applications/${notification.applicationId}`}
                    className="block rounded-2xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-slate-50"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                          notification.type === "action"
                            ? "bg-red-500"
                            : "bg-amber-400"
                        }`}
                      />

                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {notification.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-600">
                          {notification.message}
                        </p>

                        <p className="mt-2 text-xs font-medium text-blue-600">
                          View application →
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-50 p-6 text-center">
              <p className="text-lg font-semibold text-slate-700">
                You're all caught up
              </p>

              <p className="mt-1 text-sm text-slate-500">
                No applications currently need your attention.
              </p>
            </div>
          )}
        </section>
        {/* Continue Tracking */}
<section className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
  <div className="mb-5">
    <h2 className="text-2xl font-bold text-slate-900">
      Continue Tracking
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Applications that are still in progress
    </p>
  </div>

  {continueTracking.length > 0 ? (
    <div className="grid gap-4 md:grid-cols-2">
      {continueTracking.slice(0, 4).map((app) => (
        <Link
          key={app.id}
          href={`/applications/${app.id}`}
          className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-slate-50"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {app.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {app.organization}
              </p>
            </div>

            <StatusBadge status={app.status} />
          </div>

          <div className="mt-4">
            <p className="text-sm text-slate-600">
              Current stage
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {app.currentStage}
            </p>
          </div>

          <ProgressBar
            currentStage={app.currentStage}
            timeline={app.timeline}
          />

          <p className="mt-3 text-sm font-medium text-blue-600">
            Continue tracking →
          </p>
        </Link>
      ))}
    </div>
  ) : (
    <div className="rounded-2xl bg-slate-50 p-6 text-center">
      <p className="text-lg font-semibold text-slate-700">
        No applications in progress
      </p>

      <p className="mt-1 text-sm text-slate-500">
        Applications will appear here while you are tracking them.
      </p>
    </div>
  )}
</section>
{/* Upcoming Deadlines */}
<section className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
  <div className="mb-5 flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold text-slate-900">
        Upcoming Deadlines
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Applications that are approaching their expiry date
      </p>
    </div>

    {upcomingDeadlines.length > 0 && (
      <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-600">
        {upcomingDeadlines.length}{" "}
        {upcomingDeadlines.length === 1
          ? "deadline"
          : "deadlines"}
      </span>
    )}
  </div>

  {upcomingDeadlines.length > 0 ? (
    <div className="space-y-3">
      {upcomingDeadlines.slice(0, 5).map((app) => (
        <Link
          key={app.id}
          href={`/applications/${app.id}`}
          className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-slate-50"
        >
          <div>
            <h3 className="font-semibold text-slate-800">
              {app.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {app.organization}
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Expires: {app.expiryDate}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p
              className={`font-bold ${
                app.daysUntilExpiry <= 7
                  ? "text-red-600"
                  : "text-amber-600"
              }`}
            >
              {app.daysUntilExpiry}{" "}
              {app.daysUntilExpiry === 1
                ? "day"
                : "days"}
            </p>

            <p className="text-xs text-slate-500">
              remaining
            </p>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="rounded-2xl bg-slate-50 p-6 text-center">
      <p className="text-lg font-semibold text-slate-700">
        No upcoming deadlines
      </p>

      <p className="mt-1 text-sm text-slate-500">
        You have no applications expiring within the next 30 days.
      </p>
    </div>
  )}
</section>
       <div className="grid gap-6 md:grid-cols-2">
  {filteredApplications.length > 0 ? (
   filteredApplications.map((app) => {
  const submittedDate = new Date(
    app.submittedDate
  );

  const daysPassed = Math.floor(
    (Date.now() - submittedDate.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const isDelayed =
    daysPassed > app.expectedDays;

  return (
      
      
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
hover:shadow-lg hover:border-blue-300
 "bg-white border-slate-200"
}
`}
         >
        
  <h3
  className={`mb-2 text-2xl font-bold ${
     "text-slate-900"
  }`}
>
          {app.title}
        </h3>

        <p
  className={`text-sm ${
     "text-slate-500"
  }`}
>
          {app.organization}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <StatusBadge status={app.status} />

          <span
  className={`text-sm ${
    "text-slate-500"
  }`}
>
            {app.category}
          </span>
        </div>

        <div
  className={`mt-4 space-y-3 ${
     "text-slate-700"
  }`}
>
          <p>
            <strong>Current Stage:</strong>{" "}
            {app.currentStage}
          </p>
          <ProgressBar
  currentStage={app.currentStage}
  timeline={app.timeline}
/>

          <p>
            <strong>Submitted:</strong>{" "}
            {app.submittedDate}
          </p>
         <p>
  <strong>Expires:</strong>{" "}
  {app.expiryDate}
</p>

<p className="text-sm text-orange-600">
  {Math.ceil(
    (new Date(app.expiryDate).getTime() -
      new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  ) > 0
    ? `${Math.ceil(
        (new Date(app.expiryDate).getTime() -
          new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )} days remaining`
    : "Expired"}
</p>
{isDelayed && (
  <p className="font-semibold text-red-500">
     Delayed by{" "}
    {daysPassed - app.expectedDays} days
  </p>
)}
        </div>

        <div className="mt-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              setDeleteId(app.id);
            }}
            className="mt-6 rounded-xl bg-red-500 px-4 py-2 text-white shadow-sm transition hover:bg-red-600 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </Link>
         )}

  )) : (
    <div
 className="col-span-full rounded-3xl bg-white p-12 text-center text-black shadow-sm"
>
      <div className="mb-4 text-6xl">
        
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