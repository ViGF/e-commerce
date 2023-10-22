import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";
import { HeadphonesIcon, KeyboardIcon, MouseIcon, SpeakerIcon, SquareIcon, MonitorIcon } from "lucide-react";

interface CategoryItemProps {
  category: Category
}

export function CategoryItem({ category }: CategoryItemProps) {
  const categoryIcon = {
    'keyboards': <KeyboardIcon size={16} />,
    'monitors': <MonitorIcon size={16} />,
    'headphones': <HeadphonesIcon size={16} />,
    'mouses': <MouseIcon size={16} />,
    'mousepads': <SquareIcon size={16} />,
    'speakers': <SpeakerIcon size={16} />
  }

  return (
    <Badge variant="outline" className="flex items-center justify-center gap-2 py-3 rounded-lg hover:brightness-150 hover:scale-105 cursor-pointer transition-all">
      {categoryIcon[category.slug as keyof typeof categoryIcon]}
      <span className="font-bold text-xs">{category.name}</span>
    </Badge>
  );
}