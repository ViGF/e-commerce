import { Product } from "@prisma/client";

interface ProductWithTotalPrice extends Product {
  totalPrice: number
}

const computeProductTotalPrice = (product: Product): ProductWithTotalPrice => {
  if (product.discountPercentage == 0) {
    return {
      ...product,
      totalPrice: Number(product.basePrice)
    }
  }

  const priceDiscount = Number(product.basePrice) * (product.discountPercentage / 100)
  const totalPrice = Number(product.basePrice) - priceDiscount

  return {
    ...product,
    totalPrice: totalPrice
  }
}