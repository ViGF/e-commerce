import { ProductWithTotalPrice } from "@/helpers/product"
import { CartProduct } from "@/providers/cart"
import { ArrowLeftIcon, ArrowRightIcon, Trash2Icon } from "lucide-react"
import Image from "next/image"
import { Button } from "./button"

interface CartItemProps {
  product: CartProduct & ProductWithTotalPrice
}

export function CartItem({ product }: CartItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Direita foto e nome */}

        <div className="bg-accent flex items-center justify-center rounded-lg h-20 w-20">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            alt={`Imagem do produto: ${product.name} `}
            sizes="100vw"
            className="w-auto h-auto max-h-[70%] max-w-[80%]"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="font-bold text-sm">
              R$ {product.totalPrice.toFixed(2)}
            </p>

            {product.discountPercentage > 0 && (
              <p className="opacity-75 line-through text-xs">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Button size="icon" variant="outline" className="h-8 w-8">
              <ArrowLeftIcon size={16} />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button size="icon" variant="outline" className="h-8 w-8">
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button size='icon' variant='outline'>
        <Trash2Icon size={16} />
      </Button>
    </div>
  )
}