import { useContext } from "react";
import { Badge } from "./badge";
import { ShoppingCartIcon } from "lucide-react";
import { CartContext } from "@/providers/cart";

export function Cart() {
  const { products } = useContext(CartContext)

  console.log(products)

  return (
    <div>
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.375rem]" variant='outline'>
        <ShoppingCartIcon size={16} />
        Catálogo
      </Badge>

      {products.map(product => (
        <h1 key={product.id}>{product.name}</h1>
      ))}
    </div>
  )
}