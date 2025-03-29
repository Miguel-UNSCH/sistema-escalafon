import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { CircleCheckBig, CircleX, Loader } from "lucide-react";

export const metadata: Metadata = {
  title: "sistema escalafon",
  description: "gobierno regional de ayacucho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={clsx("bg-background h-screen text-text antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            <main className="h-full">
              {children}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 2000,
                  style: {
                    background: "var(--ctp-crust)",
                    color: "var(--ctp-text)",
                    padding: "8px 16px",
                  },
                  success: {
                    style: {
                      color: "var(--ctp-green)",
                    },
                    icon: <CircleCheckBig size={16} />,
                  },
                  error: {
                    style: {
                      color: "var(--ctp-red)",
                    },
                    icon: <CircleX size={16} />,
                  },
                  loading: {
                    style: {
                      color: "var(--ctp-mauve)",
                    },
                    icon: <Loader size={16} />,
                  },
                }}
              />
            </main>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
