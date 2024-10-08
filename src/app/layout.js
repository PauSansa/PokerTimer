import { Space_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space",
});

export const metadata = {
  title: "Sansa's Poker Timer",
  description:
    "Make your poker games more professional with Sansa's Poker Timer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} bg-background font-space text-white  flex flex-col justify-center items-center overflow-x-hidden text-center`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-YH30BRMJF4" />
    </html>
  );
}
