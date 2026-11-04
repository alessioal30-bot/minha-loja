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
          href="https://wa.me/558498388771"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a loja pelo WhatsApp"
          title="Atendimento pelo WhatsApp"
          className="am-whatsapp-assistant"
          style={{
            position: "fixed",
            right: 18,
            bottom: "calc(max(20px, env(safe-area-inset-bottom, 0px)) + var(--mobile-product-actions-height, 0px))",
            zIndex: 50,
            display: "inline-flex",
            alignItems: "center",
            width: 56,
            height: 56,
            justifyContent: "center",
            padding: 4,
            borderRadius: 999,
            backgroundColor: "#15803d",
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 600,
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <path d="M32 10V6" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <circle cx="32" cy="5" r="3" fill="#fef08a" />
            <rect x="15" y="11" width="34" height="25" rx="10" fill="white" />
            <circle cx="25" cy="23" r="3" fill="#14532d" />
            <circle cx="39" cy="23" r="3" fill="#14532d" />
            <path d="M26 29Q32 34 38 29" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M17 41L12 48M25 54L23 59M39 54L41 59" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <rect x="20" y="39" width="24" height="17" rx="7" fill="white" />
            <path d="M38 47a6 6 0 0 1-8.7 5.3L26 53l.8-3.2A6 6 0 1 1 38 47Z" fill="#15803d" />
            <path d="M29.5 44.5c.5 3 2.2 4.6 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <g className="am-whatsapp-assistant-wave">
              <path d="M47 43Q57 35 54 26" stroke="white" strokeWidth="4" strokeLinecap="round" />
              <circle cx="54" cy="25" r="3.5" fill="#fef08a" />
            </g>
          </svg>
        </a>
      </body>
    </html>
  )
}
