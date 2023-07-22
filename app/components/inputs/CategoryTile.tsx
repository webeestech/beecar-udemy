'use client'

import { IconType } from "react-icons"

interface CategoryTileProps {
    icon: IconType;
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CategoryTile: React.FC<CategoryTileProps> = ({
    icon:Icon,label,selected,onClick
}) => {
  return (
    <div
        onClick={() => onClick(label)}
        className={`
         rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-blue-700 transition cursor-pointer
         ${selected ? "border-blue-700" : "border-neutral-200"}
        `}
    >
        <Icon size={30} />
        <div className="font-semibold">
            {label}
        </div>
    </div>
  )
}

export default CategoryTile