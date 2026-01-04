"use client";

import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

type Assessment = {
  assessment_id?: string;
  patient?: {
    name?: string;
    age?: number;
    contact_number?: string;
    discharge_date?: string;
  };
  created_at?: string;
  output?: {
    equipment_recommended?: string[];
    care_instructions?: string[];
  };
};

export default function AssessmentResult({
  assessment,
}: {
  assessment: Assessment;
}) {
  const patient = assessment.patient || {};
  const equipment = assessment.output?.equipment_recommended || [];
  const instructions = assessment.output?.care_instructions || [];

  return (
    <div className="space-y-6">
      {/* ===== SUMMARY HEADER ===== */}
      <div className="flex items-center justify-between bg-slate-50 rounded-lg p-4 border">
        <div>
          <h3 className="text-lg font-semibold">
            Assessment Summary
          </h3>
          <p className="text-xs text-muted-foreground">
            Generated on{" "}
            {assessment.created_at
              ? new Date(assessment.created_at).toLocaleString()
              : "-"}
          </p>
        </div>
        <Badge variant="secondary">Completed</Badge>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PATIENT DETAILS */}
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <Label className="text-sm font-semibold">
            Patient Details
          </Label>
          <Separator className="my-3" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{patient.name || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Age</span>
              <span className="font-medium">{patient.age ?? "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contact</span>
              <span className="font-medium">
                {patient.contact_number || "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discharge</span>
              <span className="font-medium">
                {patient.discharge_date || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* EQUIPMENT */}
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <Label className="text-sm font-semibold">
            Equipment Recommended
          </Label>
          <Separator className="my-3" />

          {equipment.length ? (
            <ul className="space-y-2 text-sm">
              {equipment.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 items-center"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No equipment recommended
            </p>
          )}
        </div>

        {/* CARE INSTRUCTIONS */}
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <Label className="text-sm font-semibold">
            Care Instructions
          </Label>
          <Separator className="my-3" />

          {instructions.length ? (
            <ul className="space-y-2 text-sm">
              {instructions.map((inst, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No specific instructions
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
