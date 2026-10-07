import { Application } from "../types/applications";

export const applications: Application[] = [
  {
    id: 1,
    title: "University Transcript",
    category: "Education",
    organization: "University of Ilorin",
    status: "Waiting",
    currentStage: "Verification",
    submittedDate: "2026-07-12",
    expiryDate: "2026-12-31",
expectedDays: 14,
documents: [],
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
    expiryDate: "2026-12-31",
expectedDays: 14,
documents: [],
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
    expiryDate: "2026-12-31",
expectedDays: 14,
documents: [],
    timeline: [
      "Submitted",
      "Document Review",
      "Shortlisting",
      "Interview",
      "Award",
    ],
  },
];