"use client"

import { useEffect, useRef, useState } from "react"

const images = [
  {
    src: "/images/elegancia-tons-de-azul-black-friday-v3-letras-maiores.png",
    alt: "Elegância em Tons de Azul — Black Friday, frete grátis e cartão em até 18x",
    href: "/br/store",
    kind: "roupa",
  },
  {
    src: "/images/maria-rica-joao-rico-v5-modelos-whatsapp.png",
    alt: "Maria Rica e João Rico — 10% de desconto, cartão em até 18x, frete grátis e WhatsApp (84) 9838-8771",
    href: "https://wa.me/558498388771",
    kind: "moda-intima",
  },
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
        track.scrollWidth - 2
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
    <section id="carrossel-produtos" className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1D4ED8]">
              Seleção especial
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-[#0A192F]">
              Ofertas em destaque
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
          {images.map((image, index) => (
            <a
              href={image.href}
              key={`${index}-${image.src}`}
              data-carousel-card
              data-carousel-kind={image.kind}
              className="shrink-0 snap-start w-full aspect-[5/2] overflow-hidden rounded-xl bg-neutral-100"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain"
                loading={index < 4 ? "eager" : "lazy"}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
