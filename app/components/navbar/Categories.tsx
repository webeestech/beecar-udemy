'use client'

import CategoryBox from "../CategoryBox";
import Container from "../Container"
import {FaMotorcycle,FaTruckMoving,FaTruckPickup,FaCarSide,FaCaravan,
FaShuttleVan,FaBus,FaTractor} from "react-icons/fa";
import { MdOutlinePedalBike } from "react-icons/md";
import { BsScooter } from "react-icons/bs"
import { GiScooter} from "react-icons/gi";
import { TbBulldozer } from "react-icons/tb"

import { useSearchParams, usePathname} from "next/navigation";

export const categories = [
    {
        label: 'Motorcycle',
        icon: FaMotorcycle,
        description: 'Motorcycle'
    },
    {
        label: 'Truck',
        icon: FaTruckMoving,
        description: 'Truck'
    },
    {
        label: 'Pickup',
        icon: FaTruckPickup,
        description: 'Pickup'
    },
    {
        label: 'Car',
        icon: FaCarSide,
        description: 'Car'
    },
    {
        label: 'Caravan',
        icon: FaCaravan,
        description: 'Caravan'
    },
    {
        label: 'Bike',
        icon: MdOutlinePedalBike,
        description: 'Bike'
    },
    {
        label: 'Van',
        icon: FaShuttleVan,
        description: 'Van'
    },
    {
        label: 'Bus',
        icon: FaBus,
        description: 'Bus'
    },
    {
        label: 'Scooter',
        icon: BsScooter,
        description: 'Scooter'
    },
    {
        label: 'Tractor',
        icon: FaTractor,
        description: 'Tractor'
    },
    {
        label: 'BullDozer',
        icon: TbBulldozer,
        description: 'Bulldozer'
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/'

    if(!isMainPage){
        return null;
    }

  return (
    <Container>
        <div
            className="pt-4 flex flex-row    items-center justify-between overflow-x-auto"
        >
            {categories.map((item) => (
                <CategoryBox
                    key={item.label}
                    label={item.label}
                    description={item.description}
                    icon={item.icon}
                    selected={category === item.label}
                />
            ))}
        </div>
    </Container>
  )
}

export default Categories