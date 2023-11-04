import { prismaClient } from "@/lib/prisma"

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
      <h1>{product?.name}</h1>
    </div>
  )
}