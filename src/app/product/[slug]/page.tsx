import { prismaClient } from "@/lib/prisma"
import { ProductImages } from "./components/ProductImages"
import { ProductInfo } from "./components/ProductInfo"
import { computeProductTotalPrice } from "@/helpers/product"

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
    <div className="flex flex-col gap-5">
      <ProductImages
        imageUrls={product.imageUrls}
        name={product.name}
      />
      <ProductInfo product={computeProductTotalPrice(product)} />
    </div>
  )
}