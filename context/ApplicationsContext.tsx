"use client";

import { useAuth } from "@/context/AuthContext";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { Application,
  ApplicationActivity,
  ApplicationNotification,
} from "@/types/applications";

type ApplicationsContextType = {
  applications: Application[];
  notifications: ApplicationNotification[];
  activities: ApplicationActivity[];
  addApplication: (application: Application) => Promise<void>;
  deleteApplication: (id: number) => Promise<void>;
  updateApplication: (application: Application) => Promise<void>;
};

const ApplicationsContext =
  createContext<ApplicationsContextType | null>(null);
const calculateStatus = (
  application: Application
): Application["status"] => {
  const submittedDate = new Date(application.submittedDate);
  const expiryDate = new Date(application.expiryDate);
  const today = new Date();

  const daysPassed = Math.floor(
    (today.getTime() - submittedDate.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const daysUntilExpiry = Math.ceil(
    (expiryDate.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const currentIndex = application.timeline.indexOf(
    application.currentStage
  );

  const isFirstStage =
    currentIndex === 0;

  const isOverdue =
    daysPassed > application.expectedDays;

  const isExpired =
    daysUntilExpiry < 0;

  // Something needs the user's attention
  if (isOverdue || isExpired) {
    return "Action Required";
  }

  // Application is still at its first stage
  if (isFirstStage) {
    return "Waiting";
  }

  // Application has moved beyond the first stage
  return "On Track";
};

const generateNotifications = (
  application: Application
): ApplicationNotification[] => {
  const notifications: ApplicationNotification[] = [];

  const submittedDate = new Date(application.submittedDate);
  const expiryDate = new Date(application.expiryDate);
  const today = new Date();

  const daysPassed = Math.floor(
    (today.getTime() - submittedDate.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const daysUntilExpiry = Math.ceil(
    (expiryDate.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (daysPassed > application.expectedDays) {
    notifications.push({
      id: `${application.id}-processing`,
      applicationId: application.id,
      title: "Application needs attention",
      message: `The expected processing time of ${application.expectedDays} days has passed.`,
      type: "action",
    });
  }

  if (
    daysPassed <= application.expectedDays &&
    application.expectedDays - daysPassed <= 2
  ) {
    notifications.push({
      id: `${application.id}-deadline`,
      applicationId: application.id,
      title: "Expected completion approaching",
      message:
        "This application is approaching its expected processing time.",
      type: "warning",
    });
  }

  if (daysUntilExpiry >= 0 && daysUntilExpiry <= 7) {
    notifications.push({
      id: `${application.id}-expiry`,
      applicationId: application.id,
      title: "Expiry date approaching",
      message: `This application expires in ${daysUntilExpiry} days.`,
      type: "warning",
    });
  }

  if (daysUntilExpiry < 0) {
    notifications.push({
      id: `${application.id}-expired`,
      applicationId: application.id,
      title: "Application expired",
      message: "The expiry date for this application has passed.",
      type: "action",
    });
  }

  if (!application.documents?.length) {
    notifications.push({
      id: `${application.id}-documents`,
      applicationId: application.id,
      title: "No documents uploaded",
      message:
        "Consider adding the documents associated with this application.",
      type: "info",
    });
  }

  const currentIndex = application.timeline.indexOf(
    application.currentStage
  );

  if (
    currentIndex !== -1 &&
    currentIndex < application.timeline.length - 1 &&
    daysPassed >= application.expectedDays
  ) {
    notifications.push({
      id: `${application.id}-stuck`,
      applicationId: application.id,
      title: "Application may be stuck",
      message: `This application is still at the "${application.currentStage}" stage after the expected processing time.`,
      type: "action",
    });
  }

  if (
    currentIndex !== -1 &&
    currentIndex === application.timeline.length - 1
  ) {
    notifications.push({
      id: `${application.id}-completed`,
      applicationId: application.id,
      title: "Application completed",
      message:
        "This application has reached its final stage.",
      type: "success",
    });
  }

  return notifications;
};

export function ApplicationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  const [applications, setApplications] =
    useState<Application[]>([]);

  const [notifications, setNotifications] = useState<
    ApplicationNotification[]
  >([]);
  const [activities, setActivities] = useState<
  ApplicationActivity[]
>([]);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setApplications([]);
      return;
    }

    const loadApplications = async () => {
      try {
        const applicationsRef = collection(
          db,
          "users",
          user.uid,
          "applications"
        );

        const snapshot = await getDocs(applicationsRef);

        const userApplications = snapshot.docs.map(
  (document) => {
    const application = {
      ...document.data(),
      id: Number(document.data().id),
    } as Application;

    return {
      ...application,
      status: calculateStatus(application),
    };
  }
);

setApplications(userApplications);
      } catch (error) {
        console.error(
          "Error loading applications:",
          error
        );

        toast.error(
          "Unable to load your applications."
        );
      }
    };

    loadApplications();
  }, [user, loading]);
useEffect(() => {
  if (loading) return;

  if (!user) {
    setActivities([]);
    return;
  }

  const loadActivities = async () => {
    try {
      const activitiesRef = collection(
        db,
        "users",
        user.uid,
        "activities"
      );

      const snapshot = await getDocs(activitiesRef);

      const userActivities = snapshot.docs
        .map(
          (document) =>
            document.data() as ApplicationActivity
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

      setActivities(userActivities);
    } catch (error) {
      console.error(
        "Error loading activities:",
        error
      );
    }
  };

  loadActivities();
}, [user, loading]);
  useEffect(() => {
  const updateApplicationStatuses = () => {
    setApplications((currentApplications) =>
      currentApplications.map((application) => ({
        ...application,
        status: calculateStatus(application),
      }))
    );
  };

  updateApplicationStatuses();

  const interval = setInterval(
    updateApplicationStatuses,
    60 * 60 * 1000
  );

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  const updateNotifications = () => {
    const allNotifications = applications.flatMap(
      (application) =>
        generateNotifications(application)
    );

    setNotifications(allNotifications);
  };

  updateNotifications();
}, [applications]);
const addActivity = async (
  activity: ApplicationActivity
) => {
  if (!user) return;

  try {
    const activityRef = doc(
      db,
      "users",
      user.uid,
      "activities",
      activity.id
    );

    await setDoc(activityRef, activity);

    setActivities((prev) => [
      activity,
      ...prev,
    ]);
  } catch (error) {
    console.error(
      "Error saving activity:",
      error
    );
  }
};

  const addApplication = async (
    application: Application
  ) => {
    if (!user) {
      toast.error(
        "You must be logged in to add an application."
      );
      return;
    }

    try {
      const applicationWithStatus = {
        ...application,
        status: calculateStatus(application),
      };

      const applicationRef = doc(
        db,
        "users",
        user.uid,
        "applications",
        String(applicationWithStatus.id)
      );

    await setDoc(
  applicationRef,
  applicationWithStatus
);

setApplications((prev) => [
  ...prev,
  applicationWithStatus,
]);

await addActivity({
  id: `${applicationWithStatus.id}-created-${Date.now()}`,
  applicationId: applicationWithStatus.id,
  title: "Application added",
  description: `${applicationWithStatus.title} was added to TraceDoc.`,
  type: "created",
  createdAt: new Date().toISOString(),
});

toast.success(
  "Application Added Successfully"
);
    } catch (error) {
      console.error(
        "Error adding application:",
        error
      );

      toast.error(
        "Unable to add application."
      );
    }
  };

  const deleteApplication = async (id: number) => {
    if (!user) {
      toast.error(
        "You must be logged in to delete an application."
      );
      return;
    }

    try {
      const applicationRef = doc(
        db,
        "users",
        user.uid,
        "applications",
        String(id)
      );

      await deleteDoc(applicationRef);

      setApplications((prev) =>
        prev.filter((app) => app.id !== id)
      );

      toast.success(
        "Application Deleted Successfully"
      );
    } catch (error) {
      console.error(
        "Error deleting application:",
        error
      );

      toast.error(
        "Unable to delete application."
      );
    }
  };

  const updateApplication = async (
    updatedApplication: Application
  ) => {
    if (!user) {
      toast.error(
        "You must be logged in to update an application."
      );
      return;
    }

    try {
      const applicationWithStatus = {
        ...updatedApplication,
        status: calculateStatus(updatedApplication),
      };
      const existingApplication = applications.find(
  (app) => app.id === updatedApplication.id
);

const stageChanged =
  existingApplication &&
  existingApplication.currentStage !==
    updatedApplication.currentStage;

      const applicationRef = doc(
        db,
        "users",
        user.uid,
        "applications",
        String(applicationWithStatus.id)
      );

    await updateDoc(
  applicationRef,
  applicationWithStatus
);

setApplications((prev) =>
  prev.map((app) =>
    app.id === applicationWithStatus.id
      ? applicationWithStatus
      : app
  )
);

await addActivity({
  id: `${applicationWithStatus.id}-updated-${Date.now()}`,
  applicationId: applicationWithStatus.id,
  title: "Application updated",
  description: `${applicationWithStatus.title} was updated.`,
  type: "updated",
  createdAt: new Date().toISOString(),
});
if (stageChanged) {
  await addActivity({
    id: `${applicationWithStatus.id}-stage-${Date.now()}`,
    applicationId: applicationWithStatus.id,
    title: "Application stage updated",
    description: `${applicationWithStatus.title} moved to ${applicationWithStatus.currentStage}.`,
    type: "stage",
    createdAt: new Date().toISOString(),
  });
}

toast.success(
  "Application Updated Successfully"
);
    } catch (error) {
      console.error(
        "Error updating application:",
        error
      );

      toast.error(
        "Unable to update application."
      );
    }
  };

  return (
    <ApplicationsContext.Provider
    value={{
  applications,
  notifications,
  activities,
  addApplication,
  deleteApplication,
  updateApplication,
}}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(
    ApplicationsContext
  );

  if (!context) {
    throw new Error(
      "useApplications must be used inside ApplicationsProvider"
    );
  }

  return context;
}