import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "@/context/AppContext";
import RainbowProvider from "@/context/Provider";
import ContractProvider from "@/context/ContracProvider";

export const metadata: Metadata = {
  title: "Fighter Cash",
  description: "Fighter Cash",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContractProvider>
          <RainbowProvider>
            <AppProvider>{children}</AppProvider>
          </RainbowProvider>
        </ContractProvider>
      </body>
    </html>
  );
}
