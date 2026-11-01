import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="pt" data-mode="light" suppressHydrationWarning>
      <body>
        <main className="relative">{props.children}</main>
        <a
          href="https://wa.me/558496130844"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a loja pelo WhatsApp"
          style={{
            position: "fixed",
            right: 18,
            bottom: "max(20px, env(safe-area-inset-bottom))",
            zIndex: 50,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            borderRadius: 999,
            backgroundColor: "#15803d",
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 600,
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
          </svg>
          WhatsApp
        </a>
      </body>
    </html>
  )
}
