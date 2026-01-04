"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function DischargeAssessmentForm() {
  const [initialValues, setInitialValues] = useState({
    patient_name: "",
    age: "",
    contact_number: "",
    delivery_date: "",

    respiratory: {
      spo2: "",
      on_oxygen: false,
      oxygen_flow_lpm: 0,
      on_niv: false,
      ipap: 0,
      peep: 0,
      epap: 0,
      tracheostomy: false,
      requires_suctioning: false,
    },
    mobility: {
      status: "",
    },
    pressure_injury: {
      has_pressure_sore: false,
      prolonged_bed_rest: false,
    },
    feeding: {
      method: "",
    },
    cognitive: {
      caregiver_availability: "",
      cognitive_concerns: false,
    },
    elimination: {
      can_use_toilet_independently: false,
    },
    wound_care: {
      dressings_required: false,
    },
    home_environment: {
      layout: "",
      lift_available: false,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      initialValues,
    };
    console.log("Payload:", payload);
    const response = await fetch(
      `http://127.0.0.1:8000/assessments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTk2ZTViMmItNDM5ZS00MWQ5LTgzOTQtMTM5Y2NjZDhlYjJiIiwicm9sZSI6Ik51cnNlIiwiZXhwIjoxNzY3NjA0OTkxfQ._B0Aa8nFrFHG14igyqkpXPSjsrzz63FPQ7FhJdnHEMs"
        },
        body: JSON.stringify(initialValues),
      }
    );
    console.log("response", response);
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <form onSubmit={handleSubmit} className="space-y-10">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Patient Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Patient name</Label>
              <Input
                value={initialValues.patient_name}
                onChange={(e) =>
                  setInitialValues((p) => ({
                    ...p,
                    patient_name: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Age</Label>
              <Input
                type="number"
                value={initialValues.age}
                onChange={(e) =>
                  setInitialValues((p) => ({ ...p, age: e.target.value }))
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Contact Number</Label>
              <Input
                type="number"
                value={initialValues.contact_number}
                onChange={(e) =>
                  setInitialValues((p) => ({
                    ...p,
                    contact_number: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Delivery Date</Label>
              <Input
                type="date"
                value={initialValues.delivery_date}
                onChange={(e) =>
                  setInitialValues((p) => ({
                    ...p,
                    delivery_date: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Respiratory Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Current SpO₂</Label>
              <RadioGroup
                value={initialValues.respiratory.spo2}
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    respiratory: {
                      ...prev.respiratory,
                      spo2: value,
                    },
                  }))
                }
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value=">=94" />
                  <Label>≥ 94%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="88-94" />
                  <Label>88 – 94%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="<88" />
                  <Label>&lt; 88%</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-2">
              <Label>On oxygen</Label>
              <RadioGroup
                value={initialValues.respiratory.on_oxygen ? "yes" : "no"}
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    respiratory: {
                      ...prev.respiratory,
                      on_oxygen: value === "yes",
                    },
                  }))
                }
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" />
                  <Label>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" />
                  <Label>No</Label>
                </div>
              </RadioGroup>
            </div>
            {initialValues.respiratory.on_oxygen && (
              <div className="flex flex-col gap-2">
                <Label>Oxygen flow rate</Label>
                <Input
                  name="oxygen_flow_lpm"
                  value={initialValues.respiratory.oxygen_flow_lpm}
                  placeholder="Enter oxygen flow rate"
                  type="string"
                  onChange={(e) =>
                    setInitialValues((prev) => ({
                      ...prev,
                      respiratory: {
                        ...prev.respiratory,
                        oxygen_flow_lpm: Number.parseFloat(e.target.value),
                      },
                    }))
                  }
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label>On NIV</Label>
              <RadioGroup
                value={initialValues.respiratory.on_niv ? "yes" : "no"}
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    respiratory: {
                      ...prev.respiratory,
                      on_niv: value === "yes",
                    },
                  }))
                }
                className="flex "
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" />
                  <Label>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" />
                  <Label>No</Label>
                </div>
              </RadioGroup>
            </div>
            {initialValues.respiratory.on_niv && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Label>IPAP</Label>
                  <Input
                    name="ipap"
                    value={initialValues.respiratory.ipap}
                    placeholder="Enter IPAP"
                    type="number"
                    onChange={(e) =>
                      setInitialValues((prev) => ({
                        ...prev,
                        respiratory: {
                          ...prev.respiratory,
                          ipap: Number.parseFloat(e.target.value),
                        },
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>EPAP</Label>
                  <Input
                    name="epap"
                    value={initialValues.respiratory.epap}
                    placeholder="Enter EPAP"
                    type="number"
                    onChange={(e) =>
                      setInitialValues((prev) => ({
                        ...prev,
                        respiratory: {
                          ...prev.respiratory,
                          epap: Number.parseFloat(e.target.value),
                        },
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>PEEP</Label>
                  <Input
                    name="peep"
                    value={initialValues.respiratory.peep}
                    placeholder="Enter PEEP"
                    type="number"
                    onChange={(e) =>
                      setInitialValues((prev) => ({
                        ...prev,
                        respiratory: {
                          ...prev.respiratory,
                          peep: Number.parseFloat(e.target.value),
                        },
                      }))
                    }
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label>On Tracheostomy</Label>
              <RadioGroup
                value={initialValues.respiratory.tracheostomy ? "yes" : "no"}
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    respiratory: {
                      ...prev.respiratory,
                      tracheostomy: value === "yes",
                    },
                  }))
                }
                className="flex "
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" />
                  <Label>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" />
                  <Label>No</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Requires suctioning?</Label>
              <RadioGroup
                value={
                  initialValues.respiratory.requires_suctioning ? "yes" : "no"
                }
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    respiratory: {
                      ...prev.respiratory,
                      requires_suctioning: value === "yes",
                    },
                  }))
                }
                className="flex "
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" />
                  <Label>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" />
                  <Label>No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Mobility & Transfers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Mobility Status</Label>
              <Select
                value={initialValues.mobility.status || ""}
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    mobility: { ...prev.mobility, status: value },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mobility status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bedridden">Bedridden</SelectItem>
                  <SelectItem value="wheelchair">Wheelchair-bound</SelectItem>
                  <SelectItem value="assistance">
                    Walks with assistance
                  </SelectItem>
                  <SelectItem value="independent">Independent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Pressure Injury Risk
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Existing bedsores</Label>
              <RadioGroup
                value={
                  initialValues.pressure_injury.has_pressure_sore ? "yes" : "no"
                }
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    pressure_injury: {
                      ...prev.pressure_injury,
                      has_pressure_sore: value === "yes",
                    },
                  }))
                }
                className="flex "
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" />
                  <Label>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" />
                  <Label>No</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Spends more than 6 hours in bed</Label>
              <RadioGroup
                value={
                  initialValues.pressure_injury.prolonged_bed_rest
                    ? "yes"
                    : "no"
                }
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    pressure_injury: {
                      ...prev.pressure_injury,
                      prolonged_bed_rest: value === "yes",
                    },
                  }))
                }
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" />
                  <Label>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" />
                  <Label>No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Feeding & Swallowing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Feeding Method</Label>
              <Select
                value={initialValues.feeding.method}
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    feeding: { ...prev.feeding, method: value },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select feeding method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oral">Oral</SelectItem>
                  <SelectItem value="ryle's tube">Ryle’s tube</SelectItem>
                  <SelectItem value="peg tube">PEG tube</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Cognitive / Supervision Needs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Caregiver availability</Label>
              <Select
                value={initialValues.cognitive.caregiver_availability || ""}
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    cognitive: {
                      ...prev.cognitive,
                      caregiver_availability: value,
                    },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Caregiver availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fullTime">Full time</SelectItem>
                  <SelectItem value="partTime">Part time</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Cognitive concerns</Label>
              <RadioGroup
                value={
                  initialValues.cognitive.cognitive_concerns ? "yes" : "no"
                }
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    cognitive: {
                      ...prev.cognitive,
                      cognitive_concerns: value === "yes",
                    },
                  }))
                }
                className="flex "
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" />
                  <Label>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" />
                  <Label>No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Elimination & Toileting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Can use toilet independently?</Label>
              <RadioGroup
                value={
                  initialValues.elimination.can_use_toilet_independently
                    ? "yes"
                    : "no"
                }
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    elimination: {
                      ...prev.elimination,
                      can_use_toilet_independently: value === "yes",
                    },
                  }))
                }
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" />
                  <Label>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" />
                  <Label>No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Wounds & Nursing Needs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Wounds / dressings required?</Label>
              <RadioGroup
                value={
                  initialValues.wound_care.dressings_required ? "yes" : "no"
                }
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    wound_care: {
                      ...prev.wound_care,
                      dressings_required: value === "yes",
                    },
                  }))
                }
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" />
                  <Label>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" />
                  <Label>No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Home Environment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Single floor / Multi-floor</Label>
              <Select
                value={initialValues.home_environment.layout || ""}
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    home_environment: {
                      ...prev.home_environment,
                      layout: value,
                    },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="singleFloor">Single Floor</SelectItem>
                  <SelectItem value="multiFloor">Multiple Floor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Lift available?</Label>
              <RadioGroup
                value={
                  initialValues.home_environment.lift_available ? "yes" : "no"
                }
                onValueChange={(value) =>
                  setInitialValues((prev) => ({
                    ...prev,
                    home_environment: {
                      ...prev.home_environment,
                      lift_available: value === "yes",
                    },
                  }))
                }
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" />
                  <Label>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" />
                  <Label>No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </section>

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
