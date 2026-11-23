"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"

const intervalMs = 2000

export default function AutoScrollGallery({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track || paused) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const interval = window.setInterval(() => {
      if (track.matches(":has(:focus-visible), :active")) return

      const [first, second] = Array.from(track.children)
      const end = track.scrollWidth - track.clientWidth
      if (!first || !second || end <= 2) return

      if (track.scrollLeft >= end - 2) {
        track.scrollTo({ left: 0, behavior: "auto" })
        return
      }

      const distance = second.getBoundingClientRect().left - first.getBoundingClientRect().left
      track.scrollBy({ left: distance, behavior: reducedMotion.matches ? "instant" : "smooth" })
    }, intervalMs)

    return () => window.clearInterval(interval)
  }, [paused])

  return (
    <>
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="rounded border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          {paused ? "Retomar carrossel" : "Pausar carrossel"}
        </button>
      </div>
      <div ref={trackRef} className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4" data-auto-scroll-interval-ms={intervalMs}>
        {children}
      </div>
    </>
  )
}
