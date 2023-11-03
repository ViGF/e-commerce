import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constants/category-icon";
import { Category } from "@prisma/client";
import Link from "next/link";

interface CategoryItemProps {
  category: Category
}

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link href={`category/${category.slug}`}>
      <Badge variant="outline" className="flex items-center justify-center gap-2 py-3 rounded-lg hover:brightness-150 hover:scale-105 cursor-pointer transition-all">
        {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
        <span className="font-bold text-xs">{category.name}</span>
      </Badge>
    </Link>
  );
}