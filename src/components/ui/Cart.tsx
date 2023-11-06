import { useContext } from "react";
import { Badge } from "./badge";
import { ShoppingCartIcon } from "lucide-react";
import { CartContext } from "@/providers/cart";
import { CartItem } from "./CartItem";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";

export function Cart() {
  const { products, subTotal, totalDiscount, totalPrice } = useContext(CartContext)

  return (
    <div className="flex flex-col h-full gap-8">
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.375rem]" variant='outline'>
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex flex-col gap-5 flex-1">
        {products.length > 0 ? (
          products.map(product => (
            <CartItem
              key={product.id}
              product={computeProductTotalPrice(product) as any}
            />
          ))
        ): (
          <p className="font-semibold">
            Carrinho vazio! Experimente algo novo.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Separator />     

        <div className="flex items-center justify-around text-xs">
          <p>Subtotal</p>
          <p>R$ {subTotal.toFixed(2)}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-around text-xs">
          <p>Entrega</p>
          <p>GRÁTIS</p>
        </div>

        <Separator />

        <div className="flex items-center justify-around text-xs">
          <p>Descontos</p>
          <p>R$ {totalDiscount.toFixed(2)}</p>
        </div>
     
        <Separator />

        <div className="flex items-center justify-around text-sm font-bold">
          <p>Total</p>
          <p>R$ {totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}