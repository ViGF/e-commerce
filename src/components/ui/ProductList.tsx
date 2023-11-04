import { Product } from "@prisma/client"
import { ProductItem } from "@/components/ui/ProductItem"
import { computeProductTotalPrice } from "@/helpers/product"

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }:  ProductListProps) {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products.map(product => (
        <div 
          key={product.id}
          className="w-[170px] min-w-[170px] hover:brightness-105 cursor-pointer transition-all">
          <ProductItem
            product={computeProductTotalPrice(product)}
          />
        </div>
      ))}
    </div>
  )
}