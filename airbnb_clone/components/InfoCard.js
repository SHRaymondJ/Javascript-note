import Image from "next/image"
import { HeartIcon } from "@heroicons/react/outline"
import { StarIcon, HeartIcon as CollectedHearIcon } from "@heroicons/react/solid"
import { useState } from "react"

function InfoCard({ img, description, location, price, star, title, total }) {
    const [collect, setCollect] = useState(false)
    const switchCollect = () => {
        setCollect(!collect)
    }
    return (
        <div className="flex py-5 px-2 border-b first:border-t hover:shadow-lg hover:opacity-80 cursor-pointer transition transform ease-out duration-200">
            <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
                <Image src={img} layout='fill' objectFit="cover" className="rounded-2xl"/>
            </div>

            <div className="flex flex-col flex-grow px-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm">{location}</p>
                    <div onClick={switchCollect}>
                        {
                            collect ? <CollectedHearIcon className="h-5 cursor-pointer text-red-400" /> : <HeartIcon className="h-5 cursor-pointer"/>
                        }
                    </div>
                </div>
                <h1 className="text-lg font-semibold">{title}</h1>
                <p className="mt-2 text-sm text-gray-500">{description}</p>

                <div className="flex justify-between flex-grow items-end mt-4">
                    <div className="flex items-center">
                        <StarIcon className="h-4 text-red-400" />
                        <p className="text-sm font-semibold">{star}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-xl">{price}</p>
                        <p className="text-right text-sm mt-1">{total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard
