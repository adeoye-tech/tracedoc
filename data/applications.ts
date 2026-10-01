import { Application } from "../types/applications";

export const applications = [
  {
    id: 1,
    title: "University Transcript",
    category: "Education",
    organization: "University of Ilorin",
    status: "Waiting",
    currentStage: "Verification",
    submittedDate: "2026-07-12",
    timeline: [
      "Submitted",
      "Payment Confirmed",
      "Verification",
      "Processing",
      "Completed",
    ],
  },

  {
    id: 2,
    title: "Passport Renewal",
    category: "Travel",
    organization: "Nigeria Immigration Service",
    status: "On Track",
    currentStage: "Processing",
    submittedDate: "2026-08-01",
    timeline: [
      "Submitted",
      "Payment Confirmed",
      "Biometrics",
      "Processing",
      "Collection",
    ],
  },

  {
    id: 3,
    title: "Scholarship Application",
    category: "Education",
    organization: "Federal Scholarship Board",
    status: "Action Required",
    currentStage: "Document Review",
    submittedDate: "2026-08-05",
    timeline: [
      "Submitted",
      "Document Review",
      "Shortlisting",
      "Interview",
      "Award",
    ],
  },
];