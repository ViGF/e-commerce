import { useContext } from "react";
import { Badge } from "./badge";
import { ShoppingCartIcon } from "lucide-react";
import { CartContext } from "@/providers/cart";
import { CartItem } from "./CartItem";
import { computeProductTotalPrice } from "@/helpers/product";

export function Cart() {
  const { products } = useContext(CartContext)

  return (
    <div className="flex flex-col gap-8">
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.375rem]" variant='outline'>
        <ShoppingCartIcon size={16} />
        Catálogo
      </Badge>

      <div className="flex flex-col gap-5">
        {products.map(product => (
          <CartItem
            key={product.id}
            product={computeProductTotalPrice(product) as any}
          />
        ))}
      </div>
    </div>
  )
}