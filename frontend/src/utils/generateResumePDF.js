import jsPDF from "jspdf";
import { pdfThemes } from "../constants/pdfThemes";

export const generateResumePDF = (
  data,
  theme = "executive",
  template = "modern",
) => {
  switch (template) {
    case "minimal":
      return generateMinimal(data, theme);
    case "premium":
      return generatePremium(data, theme);
    default:
      return generateModern(data, theme);
  }
};

// ================= COMMON SYSTEM =================
const createDoc = () => new jsPDF("p", "mm", "a4");

const setFont = (doc, size, bold = false, color = "#000") => {
  doc.setFont("helvetica", bold ? "bold" : "normal");
  doc.setFontSize(size);
  doc.setTextColor(color);
};

const split = (doc, text, width) => doc.splitTextToSize(text, width);

// 🔥 CONSTANTS FOR HIERARCHY
const LINE = 4.8;
const SECTION_GAP = 10;
const HEADING_GAP = 5;
const BODY_COLOR = "#4b5563"; // Consistent light gray for all normal text

// ================= MINIMAL (Full Width Underlines) =================
const generateMinimal = (data, theme) => {
  const doc = createDoc();
  const t = pdfThemes[theme];

  let y = 20;
  const x = 20;
  const width = 170;

  const heading = (title) => {
    y += SECTION_GAP;
    setFont(doc, 13, true, t.accent); // Bold, Large, Accent Color
    doc.text(title.toUpperCase(), x, y);

    y += 2;
    doc.setDrawColor(t.accent);
    doc.setLineWidth(0.4);
    doc.line(x, y, x + width, y); // Full width line

    y += HEADING_GAP;
  };

  // HEADER
  setFont(doc, 22, true, t.primary);
  doc.text(data.name || "Your Name", x, y);
  y += 6;
  setFont(doc, 10, false, BODY_COLOR);
  doc.text(`${data.email}  |  ${data.phone}`, x, y);
  y += 5;

  // CONTENT
  if (data.summary) {
    heading("Summary");
    setFont(doc, 10.5, false, BODY_COLOR);
    const lines = split(doc, data.summary, width);
    doc.text(lines, x, y);
    y += lines.length * LINE;
  }

  if (data.experience?.length) {
    heading("Experience");
    data.experience.forEach((exp) => {
      setFont(doc, 10.5, false, BODY_COLOR);
      const lines = split(doc, exp, width - 6);
      doc.text("•", x, y);
      doc.text(lines, x + 5, y);
      y += lines.length * LINE + 2;
    });
  }

  if (data.projects?.length) {
    heading("Projects");
    data.projects.forEach((proj) => {
      setFont(doc, 10.5, false, BODY_COLOR);
      const lines = split(doc, proj, width - 6);
      doc.text("•", x, y);
      doc.text(lines, x + 5, y);
      y += lines.length * LINE + 2;
    });
  }

  if (data.education?.length) {
    heading("Education");
    data.education.forEach((edu) => {
      setFont(doc, 10.5, false, BODY_COLOR);
      const lines = split(doc, edu, width - 6);
      doc.text("•", x, y);
      doc.text(lines, x + 5, y);
      y += lines.length * LINE + 2;
    });
  }

  if (data.skills?.length) {
    heading("Skills");
    setFont(doc, 10.5, false, BODY_COLOR);
    const lines = split(doc, data.skills.join(", "), width);
    doc.text(lines, x, y);
  }

  doc.save("resume-minimal.pdf");
};

// ================= MODERN (Sidebar Layout) =================
const generateModern = (data, theme) => {
  const doc = createDoc();
  const t = pdfThemes[theme];

  let y = 20;
  const leftX = 20;
  const rightX = 135; // Adjusted for better sidebar spacing
  const leftWidth = 100;
  const rightWidth = 55;

  // HEADER
  setFont(doc, 22, true, t.primary);
  doc.text(data.name || "Your Name", leftX, y);
  y += 7;
  setFont(doc, 12, true, t.accent); // Role in accent color
  doc.text(data.role || "Your Role", leftX, y);
  y += 6;
  setFont(doc, 9.5, false, BODY_COLOR);
  doc.text(`${data.email}  |  ${data.phone}`, leftX, y);

  y += 12;
  let leftY = y;
  let rightY = y;

  const leftSection = (title, content) => {
    leftY += SECTION_GAP;
    setFont(doc, 12, true, t.accent); // Bold Accent Headings
    doc.text(title.toUpperCase(), leftX, leftY);
    leftY += 2;
    doc.setDrawColor(t.accent);
    doc.line(leftX, leftY, leftX + leftWidth, leftY);
    leftY += HEADING_GAP;

    content.forEach((item) => {
      setFont(doc, 10, false, BODY_COLOR); // Light Gray Body
      const lines = split(doc, item, leftWidth - 6);
      doc.text("•", leftX, leftY);
      doc.text(lines, leftX + 5, leftY);
      leftY += lines.length * LINE + 2;
    });
  };

  const rightSection = (title, content) => {
    rightY += SECTION_GAP;
    setFont(doc, 12, true, t.accent); // Matching Sidebar Headings
    doc.text(title.toUpperCase(), rightX, rightY);
    rightY += 2;
    doc.setDrawColor(t.accent);
    doc.line(rightX, rightY, rightX + rightWidth, rightY);
    rightY += HEADING_GAP;

    content.forEach((item) => {
      setFont(doc, 10, false, BODY_COLOR);
      const lines = split(doc, item, rightWidth);
      doc.text(lines, rightX, rightY);
      rightY += lines.length * LINE + 2;
    });
  };

  if (data.summary) leftSection("Summary", [data.summary]);
  leftSection("Experience", data.experience || []);
  leftSection("Projects", data.projects || []);

  rightSection("Skills", data.skills || []);
  rightSection("Education", data.education || []);

  doc.save("resume-modern.pdf");
};

// ================= PREMIUM (Already Perfect) =================
const generatePremium = (data, theme) => {
  const doc = createDoc();
  const t = pdfThemes[theme];

  let y = 25;
  const centerX = 105;

  setFont(doc, 22, true, t.primary);
  doc.text(data.name || "Your Name", centerX, y, { align: "center" });

  y += 6;
  setFont(doc, 10, false, "#6b7280");
  doc.text(`${data.email} • ${data.phone}`, centerX, y, { align: "center" });

  y += 10;

  const section = (title, content) => {
    y += SECTION_GAP;
    setFont(doc, 13, true, t.accent);
    doc.text(title.toUpperCase(), 20, y);
    y += 2;
    doc.setDrawColor("#d1d5db");
    doc.line(20, y, 190, y);
    y += HEADING_GAP;

    content.forEach((item) => {
      setFont(doc, 10.5, false, BODY_COLOR);
      const lines = split(doc, item, 170);
      doc.text("•", 20, y);
      doc.text(lines, 25, y);
      y += lines.length * LINE;
    });
  };

  if (data.summary) section("Profile", [data.summary]);
  section("Experience", data.experience || []);
  section("Education", data.education || []);
  section("Skills", [data.skills?.join(", ") || ""]);

  doc.save("resume-premium.pdf");
};
