import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const font=Open_Sans({subsets:['latin']})

export const metadata: Metadata = {
  title: "SocioSync",
  description: "Socio Sync is a social media platform that allows you to connect with friends, family, and other people you know.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className,"bg-white dark:bg-[#313338]")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="discord-theme"
        >
          <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <SocketProvider>
          <ModalProvider/>
          <QueryProvider>
            {children} 
          </QueryProvider>
        </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
