"use client"

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number
}

interface ICartContext {
  products: CartProduct[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
  subTotal: number
  totalPrice: number
  totalDiscount: number
  addProductToCart: (product: CartProduct) => void
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProductFromCart: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  subTotal: 0,
  totalPrice: 0,
  totalDiscount: 0,
  addProductToCart: (product: CartProduct) => {},
  decreaseProductQuantity: (productId: string) => {},
  increaseProductQuantity: (productId: string) => {},
  removeProductFromCart: (productId: string) => {}
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([])

  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice)
    }, 0)
  }, [products])

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.totalPrice
    }, 0)
  }, [products])

  const totalDiscount = subTotal - totalPrice

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

  const decreaseProductQuantity = (productId: string) => {
   setProducts(prev => prev.map(cartProduct => {
    if (cartProduct.id === productId) {
      return {
        ...cartProduct,
        quantity: cartProduct.quantity - 1
      }
    }
    return cartProduct
   }).filter(cartProduct => cartProduct.quantity > 0))
  }

  const increaseProductQuantity = (productId: string) => {
    setProducts(prev => prev.map(cartProduct => {
      if (cartProduct.id === productId) {
        return {
          ...cartProduct,
          quantity: cartProduct.quantity + 1
        }
      }
  
      return cartProduct
     })) 
  }

  const removeProductFromCart = (productId: string) => {
    setProducts(prev => prev.filter(cartProduct => cartProduct.id != productId))
  }

  return (
    <CartContext.Provider value={{
      products,
      cartTotalPrice: 0,
      cartBasePrice: 0,
      cartTotalDiscount: 0,
      totalPrice,
      totalDiscount,
      subTotal,
      addProductToCart,
      decreaseProductQuantity,
      increaseProductQuantity,
      removeProductFromCart
    }} >
      {children}
    </CartContext.Provider>
  )
}