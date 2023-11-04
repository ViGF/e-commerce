"use client"

import Image from "next/image"
import { useState } from "react"

interface ProductImagesProps {
  name: string
  imageUrls: string[]
}

export function ProductImages({ imageUrls, name }: ProductImagesProps) {
  const [currentImage, setCurrentImage] = useState(imageUrls[0])

  const handleImageClick = (imageUrl: string) => {
    if (currentImage != imageUrl) {
      setCurrentImage(imageUrl)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="bg-accent h-52 w-full flex items-center justify-center">
        <Image
          src={currentImage}
          alt={`Imagem do produto: ${name}`}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
      <div className="grid grid-cols-4 gap-4 px-5">
        {imageUrls.map(imageUrl => (
          <button
            key={imageUrl}
            onClick={() => handleImageClick(imageUrl)}
            className={`
              bg-accent rounded-lg flex justify-center items-center h-20 w-20 mt-8
              hover:brightness-110 hover:scale-105 cursor-pointer transition-all
              ${imageUrl === currentImage ? 'border-2 border-primary': ''}
            `}
          >
            <Image
              src={imageUrl}
              alt={`Imagem do produto: ${name}`}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
            />
          </button>
        ))}
      </div>
    </div>
  )
}