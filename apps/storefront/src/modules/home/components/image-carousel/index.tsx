"use client"

import { useEffect, useRef, useState } from "react"

const images = [
  {
    "src": "/images/carousel-misto-20261101/01-roupa.jpg",
    "alt": "Moda masculina",
    "href": "/br/categories/ecossistema-moda/masculino",
    "kind": "roupa"
  },
  {
    "src": "/images/carousel-misto-20261101/02-suplemento.jpg",
    "alt": "Creatina Max Titanium 300 g",
    "href": "/br/products/creatina-max-titanium-300g",
    "kind": "suplemento"
  },
  {
    "src": "/images/carousel-misto-20261101/03-cosmetico.jpg",
    "alt": "Base Mary Kay TimeWise 3D Matte",
    "href": "/br/products/base-mary-kay-timewise-3d-matte",
    "kind": "cosmetico"
  },
  {
    "src": "/images/carousel-misto-20261101/04-roupa.jpg",
    "alt": "Moda feminina",
    "href": "/br/categories/ecossistema-moda/feminino",
    "kind": "roupa"
  },
  {
    "src": "/images/carousel-misto-20261101/05-suplemento.jpg",
    "alt": "Pre Treino Overpass 300g Pump Maça Verde Sirius labs",
    "href": "/br/products/meta-68bluu7aj",
    "kind": "suplemento"
  },
  {
    "src": "/images/carousel-misto-20261101/06-cosmetico.jpg",
    "alt": "Base Mary Kay TimeWise 3D Matte",
    "href": "/br/products/base-mary-kay-timewise-3d-matte",
    "kind": "cosmetico"
  },
  {
    "src": "/images/carousel-misto-20261101/07-roupa.jpg",
    "alt": "Moda masculina",
    "href": "/br/categories/ecossistema-moda/masculino",
    "kind": "roupa"
  },
  {
    "src": "/images/carousel-misto-20261101/08-suplemento.jpg",
    "alt": "Creatina Max Titanium 300 g",
    "href": "/br/products/creatina-max-titanium-300g",
    "kind": "suplemento"
  },
  {
    "src": "/images/carousel-misto-20261101/09-cosmetico.jpg",
    "alt": "Base Mary Kay TimeWise 3D Matte",
    "href": "/br/products/base-mary-kay-timewise-3d-matte",
    "kind": "cosmetico"
  },
  {
    "src": "/images/carousel-misto-20261101/10-roupa.jpg",
    "alt": "Moda feminina",
    "href": "/br/categories/ecossistema-moda/feminino",
    "kind": "roupa"
  },
  {
    "src": "/images/carousel-misto-20261101/11-suplemento.jpg",
    "alt": "Pre Treino Overpass 300g Pump Maça Verde Sirius labs",
    "href": "/br/products/meta-68bluu7aj",
    "kind": "suplemento"
  },
  {
    "src": "/images/carousel-misto-20261101/12-cosmetico.jpg",
    "alt": "Base Mary Kay TimeWise 3D Matte",
    "href": "/br/products/base-mary-kay-timewise-3d-matte",
    "kind": "cosmetico"
  },
  {
    "src": "/images/carousel-misto-20261101/13-roupa.jpg",
    "alt": "Moda masculina",
    "href": "/br/categories/ecossistema-moda/masculino",
    "kind": "roupa"
  },
  {
    "src": "/images/carousel-misto-20261101/14-suplemento.jpg",
    "alt": "Creatina Max Titanium 300 g",
    "href": "/br/products/creatina-max-titanium-300g",
    "kind": "suplemento"
  },
  {
    "src": "/images/carousel-misto-20261101/15-cosmetico.jpg",
    "alt": "Base Mary Kay TimeWise 3D Matte",
    "href": "/br/products/base-mary-kay-timewise-3d-matte",
    "kind": "cosmetico"
  },
  {
    "src": "/images/carousel-misto-20261101/16-roupa.jpg",
    "alt": "Moda feminina",
    "href": "/br/categories/ecossistema-moda/feminino",
    "kind": "roupa"
  },
  {
    "src": "/images/carousel-misto-20261101/17-suplemento.jpg",
    "alt": "Pre Treino Overpass 300g Pump Maça Verde Sirius labs",
    "href": "/br/products/meta-68bluu7aj",
    "kind": "suplemento"
  },
  {
    "src": "/images/carousel-misto-20261101/18-cosmetico.jpg",
    "alt": "Base Mary Kay TimeWise 3D Matte",
    "href": "/br/products/base-mary-kay-timewise-3d-matte",
    "kind": "cosmetico"
  },
  {
    "src": "/images/carousel-misto-20261101/19-roupa.jpg",
    "alt": "Moda masculina",
    "href": "/br/categories/ecossistema-moda/masculino",
    "kind": "roupa"
  },
  {
    "src": "/images/carousel-misto-20261101/20-suplemento.jpg",
    "alt": "Creatina Max Titanium 300 g",
    "href": "/br/products/creatina-max-titanium-300g",
    "kind": "suplemento"
  },
  {
    "src": "/images/carousel-misto-20261101/21-cosmetico.jpg",
    "alt": "Base Mary Kay TimeWise 3D Matte",
    "href": "/br/products/base-mary-kay-timewise-3d-matte",
    "kind": "cosmetico"
  },
  {
    "src": "/images/carousel-misto-20261101/22-roupa.jpg",
    "alt": "Moda feminina",
    "href": "/br/categories/ecossistema-moda/feminino",
    "kind": "roupa"
  },
  {
    "src": "/images/carousel-misto-20261101/23-suplemento.jpg",
    "alt": "Pre Treino Overpass 300g Pump Maça Verde Sirius labs",
    "href": "/br/products/meta-68bluu7aj",
    "kind": "suplemento"
  },
  {
    "src": "/images/carousel-misto-20261101/24-cosmetico.jpg",
    "alt": "Base Mary Kay TimeWise 3D Matte",
    "href": "/br/products/base-mary-kay-timewise-3d-matte",
    "kind": "cosmetico"
  },
  {
    "src": "/images/carousel-misto-20261101/25-roupa.jpg",
    "alt": "Moda masculina",
    "href": "/br/categories/ecossistema-moda/masculino",
    "kind": "roupa"
  },
  {
    "src": "/images/carousel-misto-20261101/26-suplemento.jpg",
    "alt": "Creatina Max Titanium 300 g",
    "href": "/br/products/creatina-max-titanium-300g",
    "kind": "suplemento"
  },
  {
    "src": "/images/carousel-misto-20261101/27-cosmetico.jpg",
    "alt": "Base Mary Kay TimeWise 3D Matte",
    "href": "/br/products/base-mary-kay-timewise-3d-matte",
    "kind": "cosmetico"
  },
  {
    "src": "/images/carousel-misto-20261101/28-roupa.jpg",
    "alt": "Moda feminina",
    "href": "/br/categories/ecossistema-moda/feminino",
    "kind": "roupa"
  },
  {
    "src": "/images/carousel-misto-20261101/29-suplemento.jpg",
    "alt": "Pre Treino Overpass 300g Pump Maça Verde Sirius labs",
    "href": "/br/products/meta-68bluu7aj",
    "kind": "suplemento"
  },
  {
    "src": "/images/carousel-misto-20261101/30-cosmetico.jpg",
    "alt": "Base Mary Kay TimeWise 3D Matte",
    "href": "/br/products/base-mary-kay-timewise-3d-matte",
    "kind": "cosmetico"
  }
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
    <section id="carrossel-produtos" className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1D4ED8]">
              Seleção especial
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-[#0A192F]">
              Moda, suplementos e cosméticos
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
              className="shrink-0 snap-start w-[72vw] sm:w-[42vw] md:w-[28vw] lg:w-[22vw] xl:w-[20vw] aspect-square overflow-hidden rounded-xl bg-neutral-100"
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
