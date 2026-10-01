"use client";

import { jsPDF } from "jspdf";
import { useApplications } from "@/context/ApplicationsContext";

export default function ExportPdfButton() {
  const { applications } = useApplications();

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("TraceDoc Report", 20, 20);

    let y = 40;

    applications.forEach((app, index) => {
      doc.setFontSize(14);
      doc.text(
        `${index + 1}. ${app.title}`,
        20,
        y
      );

      y += 8;

      doc.setFontSize(11);
      doc.text(
        `Organization: ${app.organization}`,
        25,
        y
      );

      y += 8;

      doc.text(
        `Status: ${app.status}`,
        25,
        y
      );

      y += 8;

      doc.text(
        `Current Stage: ${app.currentStage}`,
        25,
        y
      );

      y += 8;

      doc.text(
        `Submitted: ${new Date(
          app.submittedDate
        ).toLocaleDateString()}`,
        25,
        y
      );

      y += 15;

      if (y > 260) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("tracedoc-report.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      className="rounded-lg bg-green-600 px-4 py-2 text-white"
    >
      Export PDF
    </button>
  );
}