import { Sora } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata = {
  title: "Sansa's Poker Timer",
  description:
    "Blind timer for home poker games: pick a level length and the clock raises the blinds for you.",
};

export const viewport = {
  themeColor: "#121815",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} font-sans`}>{children}</body>
      <GoogleAnalytics gaId="G-YH30BRMJF4" />
    </html>
  );
}
