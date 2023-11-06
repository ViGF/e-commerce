import { ProductWithTotalPrice } from "@/helpers/product"
import { CartContext, CartProduct } from "@/providers/cart"
import { ArrowLeftIcon, ArrowRightIcon, Trash2Icon } from "lucide-react"
import Image from "next/image"
import { Button } from "./button"
import { useContext } from "react"

interface CartItemProps {
  product: CartProduct & ProductWithTotalPrice
}

export function CartItem({ product }: CartItemProps) {
  const { decreaseProductQuantity, increaseProductQuantity, removeProductFromCart } = useContext(CartContext)

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(product.id)
  }

  const handleIncreaseProductQuantityClick = () => {
    increaseProductQuantity(product.id)
  }

  const handleRemoveProductClick = () => {
    removeProductFromCart(product.id)
  }

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
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleDecreaseProductQuantityClick}
            >
              <ArrowLeftIcon size={16} />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleIncreaseProductQuantityClick}
            >
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button size='icon' variant='outline' onClick={handleRemoveProductClick}>
        <Trash2Icon size={16} />
      </Button>
    </div>
  )
}