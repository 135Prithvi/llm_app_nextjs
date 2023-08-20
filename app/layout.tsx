import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "X",
  description: "Social Media Platform X",

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {" "}
          <SiteHeader />
          <main className="">
            {children}
          </main>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
