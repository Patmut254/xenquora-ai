import jsPDF from "jspdf";

export function exportReportPDF(report) {
  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text("Xenquora AI Executive Report", 20, 20);

  doc.setFontSize(12);

  const splitText = doc.splitTextToSize(report, 170);

  doc.text(splitText, 20, 40);

  doc.save("xenquora-report.pdf");
}
