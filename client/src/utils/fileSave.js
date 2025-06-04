import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";

export function downloadMarkdown(content, filename = "code-review.md") {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  saveAs(blob, filename);
}

export function downloadPDF() {
  const element = document.getElementById("code-review-report");

  const opt = {
    margin: 0.5,
    filename: "code-quality-report.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] }, // avoids breaking mid-element
  };

  html2pdf().set(opt).from(element).save();
}
