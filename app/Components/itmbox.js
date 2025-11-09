import React from 'react'
import Image from 'next/image';
function itmbox(props) {
    return (
        <div className="h-fit w-36 sm:max-w-sm md:w-40 rounded-lg shadow-2xl border-8 bg-white border-none sm:p-3 p-2 flex flex-col items-center">
            <Image
                src={props.img}
                alt=""
                width={180}
                height={0}
                className="rounded-xl w-fit sm:w-40 md:w-44"
            />
            <h1 className="text-lg sm:text-xl md:text-2xl mt-3 self-start">{props.price}</h1>
            <h1 className="text-base sm:text-lg md:text-xl self-start text-gray-500">{props.title}</h1>
            <button className="bg-amber-500 text-white text-sm sm:text-base md:text-lg mt-2 hover:bg-white border-2 hover:border-amber-500 hover:text-amber-500 duration-700 ease-out px-4 sm:px-5 md:px-6 py-1 rounded-full self-start">
                Buy
            </button>
        </div>

    )
}

export default itmbox