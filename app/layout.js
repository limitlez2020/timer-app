import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({subsets: ["latin"]})

export const metadata = {
  title: "Time",
  description: "Make setting timer a beautiful experience",
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
