export interface Application {
  id: number;
  title: string;
  category: string;
  expiryDate: string;
  expectedDays: number;
  documents?: {
  name: string;
  url: string;
}[];
  
  
  organization: string;
 status: "Waiting" | "On Track" | "Action Required";
  currentStage: string;
  submittedDate: string;
  timeline: string[];
}

export interface ApplicationNotification {
  id: string;
  applicationId: number;
  title: string;
  message: string;
  type: "warning" | "action" | "info" | "success";
}
export type ApplicationActivity = {
  id: string;
  applicationId: number;
  title: string;
  description: string;
  type:
    | "created"
    | "updated"
    | "stage"
    | "document"
    | "deleted";
  createdAt: string;
};