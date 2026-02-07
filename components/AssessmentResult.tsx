"use client";

import jsPDF from "jspdf";

type Props = {
  result: any;
  showActions?: boolean;
};

export default function AssessmentResult({
  result,
  showActions = true,
}: Props) {
  function shareLink() {
    const encoded = encodeURIComponent(
      btoa(JSON.stringify(result))
    );

    const url = `${window.location.origin}/share?data=${encoded}`;
    navigator.clipboard.writeText(url);
    alert("Shareable link copied");
  }

  function downloadPDF() {
    const pdf = new jsPDF();
    pdf.text("Discharge Assessment Result", 10, 15);

    let y = 30;
    Object.entries(result).forEach(([key, value]) => {
      pdf.text(`${key}: ${JSON.stringify(value)}`, 10, y);
      y += 8;
    });

    pdf.save("assessment.pdf");
  }

  return (
    <div className="border rounded p-6 space-y-4">
      <h3 className="text-xl font-semibold">
        Assessment Result
      </h3>

      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
        {JSON.stringify(result, null, 2)}
      </pre>

      {showActions && (
        <div className="flex gap-4">
          <button
            onClick={shareLink}
            className="px-4 py-2 border rounded"
          >
            Share Link
          </button>

          <button
            onClick={downloadPDF}
            className="px-4 py-2 border rounded"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
