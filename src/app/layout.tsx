import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import fs from "fs";
import path from "path";

// Copy generated topper images on startup/request
try {
  const brainDir = "C:/Users/HP/.gemini/antigravity-ide/brain/09913a6a-9578-4eb8-b65e-8a11a6c335b0";
  const destDir = "d:/DEMO WEBSITES/Education/coachings/public/images";
  
  if (fs.existsSync(brainDir) && fs.existsSync(destDir)) {
    const files = fs.readdirSync(brainDir);
    files.forEach(file => {
      if (file.startsWith("topper_aarav") && file.endsWith(".png")) {
        fs.copyFileSync(path.join(brainDir, file), path.join(destDir, "topper_aarav.png"));
      }
      if (file.startsWith("topper_riya") && file.endsWith(".png")) {
        fs.copyFileSync(path.join(brainDir, file), path.join(destDir, "topper_riya.png"));
      }
      if (file.startsWith("topper_vikram") && file.endsWith(".png")) {
        fs.copyFileSync(path.join(brainDir, file), path.join(destDir, "topper_vikram.png"));
      }
      if (file.startsWith("gallery_classroom") && file.endsWith(".png")) {
        fs.copyFileSync(path.join(brainDir, file), path.join(destDir, "gallery_classroom.png"));
      }
      if (file.startsWith("gallery_library") && file.endsWith(".png")) {
        fs.copyFileSync(path.join(brainDir, file), path.join(destDir, "gallery_library.png"));
      }
      if (file.startsWith("gallery_lab") && file.endsWith(".png")) {
        fs.copyFileSync(path.join(brainDir, file), path.join(destDir, "gallery_lab.png"));
      }
      if (file.startsWith("gallery_discussion") && file.endsWith(".png")) {
        fs.copyFileSync(path.join(brainDir, file), path.join(destDir, "gallery_discussion.png"));
      }
      if (file.startsWith("media__") && file.endsWith(".png")) {
        fs.copyFileSync(path.join(brainDir, file), path.join(destDir, file));
      }
    });
  }
} catch (e) {
  console.error("Failed to copy topper and gallery images:", e);
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Deshkar Sir's Classes | Premier Coaching Institute for IIT-JEE, NEET & Board Exams",
  description:
    "Deshkar Sir's Classes is a top-rated coaching institute offering expert preparation for IIT-JEE, NEET, Board Exams, Foundation Courses & Olympiad Training. 15+ years of excellence with 95% success rate. Join today.",
  keywords: [
    "coaching institute",
    "IIT-JEE coaching",
    "NEET coaching",
    "board exam preparation",
    "Deshkar Sir's Classes",
    "Deshkar Sir Classes",
    "best coaching Bhandara",
    "foundation course",
    "olympiad training",
  ],
  openGraph: {
    title: "Deshkar Sir's Classes | Excellence in Education",
    description:
      "Premier coaching for IIT-JEE, NEET & Board Exams. Expert faculty, proven results, and 15+ years of academic excellence.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
