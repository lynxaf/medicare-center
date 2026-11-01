import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { SearchModal } from "../components/search-model";
import { SidebarOverlay } from "../components/sidebaroverlay";

const lexendDeca = Lexend_Deca({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediCare Center",
  description: "Dashboard rumah sakit MediCare Center.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${lexendDeca.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SidebarOverlay />
        <SearchModal />
      </body>
    </html>
  );
}
