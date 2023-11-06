"use client"

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends Product {
  quantity: number
}

interface ICartContext {
  products: CartProduct[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
  addProductToCart: (product: CartProduct) => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductToCart: (product: CartProduct) => {}
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([])

  const addProductToCart = (product: CartProduct) => {
    const productAlreadyOnCart = products.some(cartProduct => cartProduct.id === product.id)

    if (productAlreadyOnCart) {
      setProducts((prev) => prev.map(cartProduct => {
        if (cartProduct.id === product.id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + product.quantity
          }
        }

        return cartProduct
      }))
    } else {
      setProducts((prev) => [...prev, product])
    }
  }

  return (
    <CartContext.Provider value={{
      products,
      cartTotalPrice: 0,
      cartBasePrice: 0,
      cartTotalDiscount: 0,
      addProductToCart
    }} >
      {children}
    </CartContext.Provider>
  )
}