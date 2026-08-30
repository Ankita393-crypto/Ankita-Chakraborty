import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { getDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

// pdf-lib's standard fonts cover Latin (WinAnsi) characters only. Strip
// anything else so PDF generation never crashes; the on-screen certificate
// still shows the full name. Production will embed a Unicode font for
// Hindi/Bengali names.
function latinSafe(s: string): string {
  const cleaned = s.replace(/[^\x20-\x7E\u00A0-\u00FF]/g, "").trim();
  return cleaned.length > 0 ? cleaned : "Learnzy Learner";
}

export async function GET(_req: Request, { params }: { params: Promise<{ vid: string }> }) {
  const user = await getSessionUser();
  if (!user) return new NextResponse("Please log in", { status: 401 });

  const { vid } = await params;
  const cert = getDb()
    .prepare(
      `SELECT c.verification_id, c.kind, c.name_on_cert, c.issued_at, c.user_id, co.title AS course_title
       FROM certificates c JOIN courses co ON co.id = c.course_id
       WHERE c.verification_id = ?`
    )
    .get(vid.toUpperCase()) as
    | { verification_id: string; kind: string; name_on_cert: string; issued_at: string; user_id: number; course_title: string }
    | undefined;
  if (!cert || (cert.user_id !== user.id && !user.is_admin)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([842, 595]); // A4 landscape
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const serif = await pdf.embedFont(StandardFonts.TimesRomanBoldItalic);

  const indigo = rgb(0.26, 0.22, 0.79);
  const slate = rgb(0.35, 0.4, 0.5);
  const { width, height } = page.getSize();

  page.drawRectangle({ x: 20, y: 20, width: width - 40, height: height - 40, borderColor: indigo, borderWidth: 3 });
  page.drawRectangle({ x: 30, y: 30, width: width - 60, height: height - 60, borderColor: indigo, borderWidth: 1 });

  const center = (text: string, y: number, font = regular, size = 14, color = slate) => {
    const w = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (width - w) / 2, y, size, font, color });
  };

  center("LEARNZY", height - 95, bold, 34, indigo);
  center(
    cert.kind === "quiz" ? "CERTIFICATE OF ENTRANCE EXAM ACHIEVEMENT" : "CERTIFICATE OF COURSE COMPLETION",
    height - 130,
    regular,
    13,
    slate
  );
  center("This certifies that", height - 195, regular, 14, slate);
  center(latinSafe(cert.name_on_cert), height - 245, serif, 38, rgb(0.1, 0.12, 0.2));
  center(
    cert.kind === "quiz"
      ? "has successfully passed the entrance examination for"
      : "has successfully completed the course",
    height - 290,
    regular,
    14,
    slate
  );
  center(latinSafe(cert.course_title), height - 330, bold, 22, rgb(0.1, 0.12, 0.2));
  center(`Issued on ${cert.issued_at.slice(0, 10)}`, height - 385, regular, 12, slate);

  page.drawText(`Verification ID: ${cert.verification_id}`, { x: 55, y: 60, size: 11, font: bold, color: slate });
  page.drawText("Verify at the Learnzy certificate verification page", { x: 55, y: 45, size: 9, font: regular, color: slate });
  const right = "Learnzy - AI-powered learning platform";
  page.drawText(right, {
    x: width - 55 - regular.widthOfTextAtSize(right, 10),
    y: 50,
    size: 10,
    font: regular,
    color: slate,
  });

  const bytes = await pdf.save();
  return new NextResponse(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="learnzy-certificate-${cert.verification_id}.pdf"`,
    },
  });
}
