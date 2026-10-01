"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { Application } from "@/types/applications";
import { applications as initialApplications } from "@/data/applications";

type ApplicationsContextType = {
  applications: Application[];
  addApplication: (
    application: Application
  ) => void;
  deleteApplication: (
    id: number
  ) => void;
  updateApplication: (
    application: Application
  ) => void;
  darkMode: boolean;
setDarkMode: React.Dispatch<
  React.SetStateAction<boolean>
>;
};

const ApplicationsContext =
  createContext<ApplicationsContextType | null>(
    null
  );

export function ApplicationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [applications, setApplications] =
    useState<Application[]>([]);
    const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedApplications =
      localStorage.getItem("applications");
    const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  setDarkMode(true);
}
    if (storedApplications) {
      setApplications(
        JSON.parse(storedApplications)
      );
    } else {
      setApplications(initialApplications);
    }
  }, []);
  useEffect(() => {
  localStorage.setItem(
    "theme",
    darkMode ? "dark" : "light"
  );
}, [darkMode]);

  useEffect(() => {
    if (applications.length > 0) {
      localStorage.setItem(
        "applications",
        JSON.stringify(applications)
      );
    }
  }, [applications]);

  const addApplication = (
    application: Application
  ) => {
    setApplications((prev) => [
      ...prev,
      application,
    ]);
    toast.success("Application Added Successfully");
  };
  const deleteApplication = (
  id: number
) => {
  setApplications((prev) =>
    prev.filter(
      (app) => app.id !== id
    )
  );
  toast.success("Application Deleted Successfully");
};
const updateApplication = (
  updatedApplication: Application
) => {
  setApplications((prev) =>
    prev.map((app) =>
      app.id === updatedApplication.id
        ? updatedApplication
        : app
    )
  );
};

  return (
    <ApplicationsContext.Provider
  value={{
    applications,
    addApplication,
    deleteApplication,
    updateApplication,
    darkMode,
    setDarkMode,
  }}
>
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const context =
    useContext(ApplicationsContext);

  if (!context) {
    throw new Error(
      "useApplications must be used inside ApplicationsProvider"
    );
  }

  return context;
}