"use client"

import { type ReactNode, useEffect, useRef } from "react"

export default function AutoScrollGallery({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const interval = window.setInterval(() => {
      if (reducedMotion.matches || document.hidden || track.matches(":hover, :focus-within")) return

      const [first, second] = Array.from(track.children)
      const end = track.scrollWidth - track.clientWidth
      if (!first || !second || end <= 2) return

      if (track.scrollLeft >= end - 2) {
        track.scrollTo({ left: 0, behavior: "auto" })
        return
      }

      const distance = second.getBoundingClientRect().left - first.getBoundingClientRect().left
      track.scrollBy({ left: distance, behavior: "smooth" })
    }, 2000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div ref={trackRef} className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4" data-auto-scroll-interval-ms="2000">
      {children}
    </div>
  )
}
