import { ProductItem } from "@/components/ui/ProductItem"
import { Badge } from "@/components/ui/badge"
import { CATEGORY_ICON } from "@/constants/category-icon"
import { computeProductTotalPrice } from "@/helpers/product"
import { prismaClient } from "@/lib/prisma"

export default async function CategoryProducts({ params }: any) {
  const category = await prismaClient.category.findFirstOrThrow({
    where: {
      slug: params.slug
    },
    include: {
      products: true
    }
  })

  if (!category) {
    return null
  }

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.375rem]" variant='outline'>
        {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
        {category.name}
      </Badge>
      <div className="grid grid-cols-2 gap-4">
        {category?.products.map(product => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
          />
        ))}
      </div>
    </div>
  )
}