import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({subsets: ["latin"]})

export const metadata = {
  title: "Email Agent",
  description: "Make sending emails a breeze",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${syne.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
