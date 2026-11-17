"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@modules/common/components/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  contain?: boolean
}

const ImageGallery = ({ images, contain = false }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative">
      <div
        className={
          contain
            ? "mx-auto flex w-full max-w-[520px] flex-col gap-y-4"
            : "flex flex-col flex-1 small:mx-16 gap-y-4"
        }
      >
        {images.map((image, index) => {
          const imageUrl =
            contain &&
            image.url?.includes("orientrelogios.com.br/picts/uploads/") &&
            !image.url.includes("/uploads/zoom/")
              ? image.url.replace("/picts/uploads/", "/picts/uploads/zoom/")
              : image.url
          return (
            <Container
              key={image.id}
              className={
                contain
                  ? "relative aspect-square w-full overflow-hidden bg-white"
                  : "relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
              }
              id={image.id}
            >
              {!!image.url && (
                <Image
                  src={imageUrl}
                  onError={(event) => {
                    const target = event.currentTarget
                    if (contain && target.dataset.originalImage !== "true") {
                      target.dataset.originalImage = "true"
                      target.srcset = ""
                      target.src = image.url
                    }
                  }}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0 rounded-rounded"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                  style={{
                    objectFit: contain ? "contain" : "cover",
                    padding: contain ? "24px" : undefined,
                  }}
                />
              )}
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
