import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StartupVE — La Capa Legal del Ecosistema Tech Venezolano",
  description:
    "Contratos privados con fuerza legal plena. Legaltech para startups venezolanas. De idea a contrato en 10 minutos.",
  openGraph: {
    title: "StartupVE — La Capa Legal del Ecosistema Tech Venezolano",
    description: "Contratos privados con fuerza legal plena desde el Código Civil. Sin SAREN, sin esperar semanas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
