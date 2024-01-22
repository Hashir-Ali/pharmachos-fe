"use client";
import "@/styles/globals.css";

import { ReactNode, useEffect } from "react";

import { Roboto } from "next/font/google";
import { useRouter } from "next/navigation";

import useIsAuthenticated from "@/hooks/useIsAuthenticated";

import CustomThemeProvider from "../theme";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Pharmacy OS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/assets/images/logo.svg" sizes="any" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={roboto.className}>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </body>
    </html>
  );
}
