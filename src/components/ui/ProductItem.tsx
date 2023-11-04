import { ProductWithTotalPrice } from "@/helpers/product"
import Image from "next/image"
import { Badge } from "./badge"
import { ArrowDownIcon } from "lucide-react"
import Link from "next/link"

interface ProductItem {
  product: ProductWithTotalPrice
}

export function ProductItem({ product }: ProductItem) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col">
        <div className="relative bg-accent rounded-lg h-[170px] w-full flex justify-center items-center">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            alt={`Imagem do produto: ${product.name}`}
            className="h-auto w-auto object-contain max-w-[80%] max-h-[70%]"
          />
          {product.discountPercentage > 0 && (
            <Badge className="absolute left-3 top-3 px-2 py-[2px]">
              <ArrowDownIcon size={14} /> <span>{product.discountPercentage}%</span>
            </Badge>
          )}
        </div>

        <div className="mt-2">
          <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</p>
        </div>

        <div className="flex items-end gap-1">
          {product.discountPercentage > 0 && (
            <>
              <p className="font-semibold">R$ {product.totalPrice.toFixed(2)}</p>
              <p className="text-xs opacity-75 line-through">
                R$ {Number(product.basePrice.toFixed(2))}
              </p>
            </>
          )}
          {product.discountPercentage == 0 && (
            <p className="font-semibold">
              R$ {Number(product.basePrice.toFixed(2))}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}