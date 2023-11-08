import { useContext } from "react";
import { Badge } from "./badge";
import { ShoppingCartIcon } from "lucide-react";
import { CartContext } from "@/providers/cart";
import { CartItem } from "./CartItem";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js"

export function Cart() {
  const { products, subTotal, totalDiscount, totalPrice } = useContext(CartContext)

  const handleFinishPurchaseClick = async () => {
    const checkout = await createCheckout(products)

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    stripe?.redirectToCheckout({
      sessionId: checkout.id
    })
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.375rem]" variant='outline'>
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <ScrollArea className="h-full overflow-hidden">
        <div className="flex flex-col gap-5">
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
      </ScrollArea>

      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator />     

          <div className="flex items-center justify-between text-xs">
            <p>Subtotal</p>
            <p>R$ {subTotal.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Entrega</p>
            <p>GRÁTIS</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Descontos</p>
            <p>R$ {totalDiscount.toFixed(2)}</p>
          </div>
      
          <Separator />

          <div className="flex items-center justify-between text-sm font-bold">
            <p>Total</p>
            <p>R$ {totalPrice.toFixed(2)}</p>
          </div>
          
          <Button
            className="uppercase font-bold"
            onClick={handleFinishPurchaseClick}
          >
            Finalizar Compra
          </Button>
        </div>
      )}
    </div>
  )
}