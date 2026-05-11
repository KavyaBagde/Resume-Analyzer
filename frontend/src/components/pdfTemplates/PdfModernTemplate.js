import { pdfThemes } from "../../constants/pdfThemes";

export const renderModernPDF = (doc, data, theme) => {
  const t = pdfThemes[theme] || pdfThemes.classic;

  const leftX = 15;
  const rightX = 110;
  const maxWidth = 80;

  let leftY = 40;
  let rightY = 40;

  const lineHeight = 5;

  const addTextBlock = (text, x, yRef) => {
    const lines = doc.splitTextToSize(text, maxWidth);

    doc.text(lines, x, yRef.value);
    yRef.value += lines.length * lineHeight;
  };

  const addSection = (title, items, x, yRef) => {
    yRef.value += 4;

    doc.setTextColor(t.primary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(title.toUpperCase(), x, yRef.value);

    yRef.value += 6;

    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    items?.forEach((item) => {
      const lines = doc.splitTextToSize("• " + item, maxWidth);
      doc.text(lines, x, yRef.value);
      yRef.value += lines.length * lineHeight + 2;
    });
  };

  // ================= HEADER =================
  doc.setTextColor(t.primary);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(data.name || "Your Name", leftX, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);

  doc.text(
    `${data.email || ""} | ${data.phone || ""} | ${data.github || ""}`,
    leftX,
    26
  );

  // ================= LEFT COLUMN =================
  const leftRef = { value: leftY };

  addSection("Skills", data.skills, leftX, leftRef);

  // ================= RIGHT COLUMN =================
  const rightRef = { value: rightY };

  addSection("Summary", [data.summary], rightX, rightRef);
  addSection("Experience", data.experience, rightX, rightRef);
  addSection("Projects", data.projects, rightX, rightRef);
  addSection("Education", data.education, rightX, rightRef);
};