
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { AppLogo } from "@/components/AppLogo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TaskListAddDialog from "./TaskListAddDialog";
import SideBar from "./component/Sidebar";


const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Todo App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.variable}
      >
        <div className="flex md:flex-row flex-col">
        <SideBar />
        {children}
        </div>
      </body>
      
    </html>
  );
}
