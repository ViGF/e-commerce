import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface CategoryItemProps {
  category: Category
}

export async function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="flex flex-col hover:hover:brightness-125 hover:scale-105 cursor-pointer transition-all">
        <div className="w-full h-[150px] flex items-center justify-center rounded-tl-lg rounded-tr-lg bg-category-item-gradient">
          <Image
            src={category.imageUrl}
            alt={`Imagem de ${category.name}`}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div className="bg-accent py-3 rounded-br-lg rounded-bl-lg">
            <p className="text-sm font-semibold text-center">{category.name}</p>
        </div>
      </div>
    </Link>
  )
}