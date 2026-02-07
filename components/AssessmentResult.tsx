"use client";

import jsPDF from "jspdf";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

/* ================= TYPES ================= */

type Section = {
  equipment?: string[];
  care_instructions?: string[];
};

type Assessment = {
  assessment_id?: string;
  patient?: {
    name?: string;
    age?: number;
    discharge_date?: string;
  };
  created_at?: string;
  output?: Record<string, Section>;
};

type Props = {
  assessment: Assessment;
  showActions?: boolean;
};

/* ================= HELPERS ================= */

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${date.toLocaleString("en-US", {
    month: "long",
  })} ${date.getFullYear()}`;
}

/* ================= MAIN ================= */

export default function AssessmentResult({
  assessment,
  showActions = true,
}: Props) {
  const patient = assessment.patient || {};
  const output = assessment.output || {};

  /* ================= ACTIONS ================= */

  function shareLink() {
    if (!assessment.assessment_id) {
      alert("Unable to generate share link");
      return;
    }

    const url = `${window.location.origin}/share/assessment/${assessment.assessment_id}`;
    navigator.clipboard.writeText(url);
    alert("Shareable link copied");
  }

  function downloadPDF() {
    const pdf = new jsPDF();
    let y = 15;

    pdf.setFontSize(14);
    pdf.text("Discharge Assessment Result", 10, y);
    y += 10;

    pdf.setFontSize(10);
    pdf.text(`Name: ${patient.name || "-"}`, 10, y);
    y += 6;
    pdf.text(`Age: ${patient.age ?? "-"}`, 10, y);
    y += 6;
    pdf.text(
      `Discharge Date: ${formatDate(patient.discharge_date)}`,
      10,
      y
    );
    y += 10;

    Object.entries(output).forEach(([sectionName, section]) => {
      const equipment = section.equipment || [];
      const care = section.care_instructions || [];

      if (!equipment.length && !care.length) return;

      pdf.setFontSize(11);
      pdf.text(sectionName.replace(/_/g, " ").toUpperCase(), 10, y);
      y += 6;

      pdf.setFontSize(10);

      if (equipment.length) {
        pdf.text("Equipment:", 12, y);
        y += 5;
        equipment.forEach((item) => {
          pdf.text(`- ${item}`, 14, y);
          y += 5;
        });
      }

      if (care.length) {
        pdf.text("Care Instructions:", 12, y);
        y += 5;
        care.forEach((item) => {
          pdf.text(`- ${item}`, 14, y);
          y += 5;
        });
      }

      y += 4;

      if (y > 270) {
        pdf.addPage();
        y = 15;
      }
    });

    pdf.save("assessment.pdf");
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-8">

      {/* ================= ACTION BAR ================= */}
      {showActions && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={shareLink}>
            Share Link
          </Button>
          <Button variant="outline" onClick={downloadPDF}>
            Download PDF
          </Button>
        </div>
      )}

      {/* ================= PATIENT SUMMARY ================= */}
      <div className="bg-white border-l-4 border-blue-600 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Patient Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-muted-foreground">Name</p>
            <p className="font-medium text-base">
              {patient.name || "-"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Age</p>
            <p className="font-medium">
              {patient.age ? `${patient.age} years` : "-"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Discharge Date</p>
            <p className="font-medium">
              {formatDate(patient.discharge_date)}
            </p>
          </div>
        </div>
      </div>

      {/* ================= CARE SECTIONS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(output).map(([sectionName, section]) => {
          const equipment = section.equipment || [];
          const care = section.care_instructions || [];

          if (!equipment.length && !care.length) return null;

          return (
            <div
              key={sectionName}
              className="bg-white rounded-lg border shadow-sm p-5 space-y-4"
            >
              <Label className="text-sm font-semibold capitalize">
                {sectionName.replace(/_/g, " ")}
              </Label>

              {equipment.length > 0 && (
                <div>
                  <Separator className="mb-2" />
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Equipment
                  </p>
                  <ul className="space-y-1 text-sm">
                    {equipment.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {care.length > 0 && (
                <div>
                  <Separator className="mb-2" />
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Care Instructions
                  </p>
                  <ul className="space-y-1 text-sm">
                    {care.map((inst, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
