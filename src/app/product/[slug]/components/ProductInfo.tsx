"use client"

import { DiscountsBadge } from "@/components/ui/DiscountsBadge";
import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
  product: ProductWithTotalPrice
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)

  const { addProductToCart } = useContext(CartContext)

  const handleAddProductToCart = () => {
    addProductToCart({...product, quantity})
  }

  const handleIncreaseQuantityClick = () => {
    setQuantity(prev => prev + 1)
  }

  const handleDecreaseQuantityClick = () => {
    setQuantity(prev => prev === 1 ? prev : prev - 1)
  }

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">R$ {product.totalPrice.toFixed(2)}</h1>
        
        {product.discountPercentage > 0 && (
          <DiscountsBadge>
            {product.discountPercentage}
          </DiscountsBadge>
        )}

      </div>
      {product.discountPercentage > 0 && (
        <p className="opacity-75 text-sm line-through">R$ {Number(product.basePrice).toFixed(2)}</p>
      )}

      <div className="flex items-center gap-3 mt-4">
        <Button size="icon" variant="outline" onClick={handleDecreaseQuantityClick}>
          <ArrowLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button size="icon" variant="outline" onClick={handleIncreaseQuantityClick}>
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="flex flex-col gap-3 mt-8">
        <h3 className="font-bold text-base">Descrição</h3>
        <p className="opacity-70 text-sm text-justify">{product.description}</p>
      </div>

      <Button
        className="mt-8 uppercase font-bold"
        onClick={handleAddProductToCart}
      >
        Adicionar ao Carrinho
      </Button>

      <div className="flex items-center bg-accent rounded-lg px-5 py-2 justify-between mt-5">
        <div className="flex items-center gap-3">
          <TruckIcon />

          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold">FSPacket®</span>
            </p>
            <p className="text-[#8162FF] text-xs">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>

        <p className="font-bold text-xs">Frete Grátis</p>
      </div>
    </div>
  )
}