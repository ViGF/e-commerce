import { prismaClient } from "@/lib/prisma";
import { CategoryItem } from "./ui/CategoryItem";

export async function Categories() {
  const categories = await prismaClient.category.findMany()

  return (
    <div className="grid grid-cols-2 gap-y-[0.625rem] gap-x-4">
      {categories.map(category => (
        <CategoryItem
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
}