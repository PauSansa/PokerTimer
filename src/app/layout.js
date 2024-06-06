import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ['400','700'], variable: "--font-space"});


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} bg-background font-space text-white flex flex-col justify-center items-center overflow-x-hidden text-center`}>{children}</body>
    </html>
  );
}
