"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

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
  const pdfRef = useRef<HTMLDivElement>(null);

  const patient = assessment.patient || {};
  const output = assessment.output || {};

  /* ================= ACTIONS ================= */

  function shareLink() {
    const shareId = crypto.randomUUID().slice(0, 8);

    localStorage.setItem(
      `shared_assessment_${shareId}`,
      JSON.stringify(assessment)
    );

    const url = `${window.location.origin}/share?id=${shareId}`;
    navigator.clipboard.writeText(url);
    alert("Shareable link copied");
  }

  async function downloadPDF() {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      backgroundColor: "#f8fafc", // light blue-gray
      useCORS: true,
      onclone: (doc) => {
        doc.querySelectorAll("*").forEach((el: any) => {
          const style = getComputedStyle(el);
          if (style.color.includes("lab")) el.style.color = "#0f172a";
          if (style.backgroundColor.includes("lab"))
            el.style.backgroundColor = "#ffffff";
          if (style.borderColor.includes("lab"))
            el.style.borderColor = "#cbd5e1";
        });
      },
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save("assessment.pdf");
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-8">
      {/* ACTION BAR */}
      {showActions && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={shareLink}>
            Share Link
          </Button>
          <Button onClick={downloadPDF} className="bg-sky-600 hover:bg-sky-700">
            Download PDF
          </Button>
        </div>
      )}

      {/* ================= PDF CONTENT ================= */}
      <div
        ref={pdfRef}
        className="bg-slate-50 p-10 rounded-xl space-y-8"
        style={{ width: "794px", margin: "0 auto" }}
      >
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-sky-700">
            Equipment Recommendation Report
          </h1>
          <p className="text-sm text-slate-600">
            Eldersmiles Discharge Triage Assessment
          </p>
        </div>

        {/* PATIENT SUMMARY */}
        <div className="bg-white border-l-4 border-sky-600 rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-slate-800 mb-4">
            Patient Summary
          </h2>

          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-slate-500">Name</p>
              <p className="font-medium">{patient.name || "-"}</p>
            </div>
            <div>
              <p className="text-slate-500">Age</p>
              <p className="font-medium">
                {patient.age ? `${patient.age} years` : "-"}
              </p>
            </div>
            <div>
              <p className="text-slate-500">Discharge Date</p>
              <p className="font-medium">
                {formatDate(patient.discharge_date)}
              </p>
            </div>
          </div>
        </div>

        {/* CARE SECTIONS */}
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(output).map(([sectionName, section]) => {
            const equipment = section.equipment || [];
            const care = section.care_instructions || [];

            if (!equipment.length && !care.length) return null;

            return (
              <div
                key={sectionName}
                className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm"
              >
                <h3 className="font-semibold text-slate-800 capitalize mb-3">
                  {sectionName.replace(/_/g, " ")}
                </h3>

                {equipment.length > 0 && (
                  <>
                    <p className="text-xs font-medium text-slate-500 mb-1">
                      Equipment
                    </p>
                    <ul className="text-sm space-y-1 mb-3">
                      {equipment.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-emerald-600">●</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {care.length > 0 && (
                  <>
                    <Separator className="my-2" />
                    <p className="text-xs font-medium text-slate-500 mb-1">
                      Care Instructions
                    </p>
                    <ul className="text-sm space-y-1">
                      {care.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-sky-600">●</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
