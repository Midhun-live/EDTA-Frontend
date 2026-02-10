"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

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

  const pdfRef = useRef<HTMLDivElement>(null);

  /* ================= ACTIONS ================= */

  function shareLink() {
    const shareId = crypto.randomUUID().slice(0, 8);

    const payload = {
      assessment_id: assessment.assessment_id,
      patient: assessment.patient,
      created_at: assessment.created_at,
      output: assessment.output,
    };

    localStorage.setItem(
      `shared_assessment_${shareId}`,
      JSON.stringify(payload)
    );

    const url = `${window.location.origin}/share?id=${shareId}`;
    navigator.clipboard.writeText(url);
    alert("Shareable link copied");
  }

  async function downloadPDF() {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",

      // 🔒 FIX lab() / oklab() CRASH
      onclone: (clonedDoc) => {
        const elements =
          clonedDoc.querySelectorAll<HTMLElement>("*");

        elements.forEach((el) => {
          const style = getComputedStyle(el);

          if (style.color.includes("lab")) {
            el.style.color = "#000000";
          }

          if (
            style.backgroundColor.includes("lab") ||
            style.backgroundColor.includes("oklab")
          ) {
            el.style.backgroundColor = "#ffffff";
          }

          if (style.borderColor.includes("lab")) {
            el.style.borderColor = "#e5e7eb";
          }
        });
      },
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const margin = 10;
    const imgWidth = pdfWidth - margin * 2;
    const imgHeight =
      (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      margin,
      margin,
      imgWidth,
      imgHeight
    );

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

      {/* ================= PDF CONTENT ================= */}
      <div
        ref={pdfRef}
        className="space-y-8 bg-white"
        style={{
          width: "794px", // A4 width @ 96dpi
          padding: "32px",
          margin: "0 auto",
        }}
      >
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
              <p className="text-muted-foreground">
                Discharge Date
              </p>
              <p className="font-medium">
                {formatDate(patient.discharge_date)}
              </p>
            </div>
          </div>
        </div>

        {/* ================= CARE SECTIONS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(output).map(
            ([sectionName, section]) => {
              const equipment = section.equipment || [];
              const care =
                section.care_instructions || [];

              if (!equipment.length && !care.length)
                return null;

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
                          <li
                            key={i}
                            className="flex gap-2"
                          >
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
                          <li
                            key={i}
                            className="flex gap-2"
                          >
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                            <span>{inst}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
