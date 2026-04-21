import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AngelDelN — La Capa Legal del Ecosistema Tech Venezolano",
  description: "Contratos privados con fuerza legal plena. Legaltech para startups venezolanas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
