import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.scss";
import { StoreProvider } from "@/store/StoreProvider";

const pks = Plus_Jakarta_Sans({
  style: ["normal"],
  subsets: ["latin"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Kanban | Task Management Dashboard",
  description:
    "A dashboard that allows you to add and edit different boards with different tasks and categories inside each column inside the board.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={pks.className}>{children}</body>
      </html>
    </StoreProvider>
  );
}
