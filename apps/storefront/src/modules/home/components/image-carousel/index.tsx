"use client"

import { useEffect, useRef, useState } from "react"

const images = [
  "/images/carousel/look_net_379_3_quadrado_loja.jpg",
  "/images/carousel/look_net_381_3_quadrado_loja.jpg",
  "/images/carousel/look_net_382_3_quadrado_loja.jpg",
  "/images/carousel/look_net_383_3_quadrado_loja.jpg",
  "/images/carousel/look_net_384_3_quadrado_loja.jpg",
  "/images/carousel/look_net_385_3_quadrado_loja.jpg",
  "/images/carousel/look_net_386_3_quadrado_loja.jpg",
  "/images/carousel/look_net_387_3_quadrado_loja.jpg",
  "/images/carousel/look_net_388_3_quadrado_loja.jpg",
  "/images/carousel/polo-masculina-20261022-01.webp",
  "/images/carousel/polo-feminina-20261022-01.webp",
  "/images/carousel/look_local_05_3_quadrado_loja.webp",
  "/images/carousel/polo-masculina-20261022-02.webp",
  "/images/carousel/look_local_25_3_quadrado_loja.webp",
  "/images/carousel/polo-feminina-20261022-02.webp",
  "/images/carousel/look_local_38_3_quadrado_loja.webp",
  "/images/carousel/look_local_40_3_quadrado_loja.webp",
  "/images/carousel/look_local_42_3_quadrado_loja.webp",
  "/images/carousel/polo-feminina-20261022-03.webp",
  "/images/carousel/look_local_47_3_quadrado_loja.webp",
  "/images/carousel/look_local_52_3_quadrado_loja.webp",
  "/images/carousel/look_local_53_3_quadrado_loja.webp",
  "/images/carousel/polo-feminina-20261022-04.webp",
  "/images/carousel/look_net_761_3_quadrado_loja.webp",
]

export default function ImageCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return

    const interval = setInterval(() => {
      const track = trackRef.current
      if (!track) return

      const firstCard = track.querySelector<HTMLElement>("[data-carousel-card]")
      if (!firstCard) return

      const gap = 24
      const distance = firstCard.offsetWidth + gap

      if (
        track.scrollLeft + track.clientWidth >=
        track.scrollWidth - distance
      ) {
        track.scrollTo({
          left: 0,
          behavior: "smooth",
        })
      } else {
        track.scrollBy({
          left: distance,
          behavior: "smooth",
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [paused])

  const move = (direction: "left" | "right") => {
    const track = trackRef.current
    if (!track) return

    const firstCard = track.querySelector<HTMLElement>("[data-carousel-card]")
    if (!firstCard) return

    const gap = 24
    const distance = firstCard.offsetWidth + gap

    track.scrollBy({
      left: direction === "right" ? distance : -distance,
      behavior: "smooth",
    })
  }

  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1D4ED8]">
              Seleção especial
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-[#0A192F]">
              Confira nossas novidades
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => move("left")}
              aria-label="Anterior"
              className="w-10 h-10 rounded-full border border-neutral-200 bg-white text-[#0A192F] hover:bg-neutral-100 transition"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => move("right")}
              aria-label="Próximo"
              className="w-10 h-10 rounded-full border border-neutral-200 bg-white text-[#0A192F] hover:bg-neutral-100 transition"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {images.map((src, index) => (
            <div
              key={src}
              data-carousel-card
              className="shrink-0 snap-start w-[72vw] sm:w-[42vw] md:w-[28vw] lg:w-[22vw] xl:w-[20vw] aspect-square overflow-hidden rounded-xl bg-neutral-100"
            >
              <img
                src={src}
                alt={`Produto em destaque ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index < 4 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
