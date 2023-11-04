import { prismaClient } from "@/lib/prisma"
import { ProductImages } from "./components/ProductImages"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params: { slug } }: ProductPageProps) {
  const product = await prismaClient.product.findFirst({
    where: {
      slug
    }
  })

  if (!product) {
    return null
  }

  return (
    <div>
      <ProductImages
        imageUrls={product.imageUrls}
        name={product.name}
      />
    </div>
  )
}