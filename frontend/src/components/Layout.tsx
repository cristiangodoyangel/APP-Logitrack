// src/components/Layout.tsx
import { ReactNode } from "react";

type LayoutProps = {
  title: string;
  children: ReactNode;
};

export function Layout({ title, children }: LayoutProps) {
  return (
    <div
      style={{
        maxWidth: "1800px",
        margin: "0 auto",
        padding: "30px",
        backgroundColor: "#d8e7ed",
        minHeight: "100vh",
        boxShadow: "0 0 25px rgba(0,0,0,0.15)",
        borderRadius: "12px",
      }}
    >
      {/* Encabezado de página */}
      <header style={{ marginBottom: "25px" }}>
        <h2
          style={{
            color: "#074260",
            fontWeight: 700,
            borderBottom: "2px solid #074260",
            paddingBottom: "8px",
          }}
        >
          {title}
        </h2>
      </header>

      {/* Contenido dinámico */}
      <main>{children}</main>
    </div>
  );
}
