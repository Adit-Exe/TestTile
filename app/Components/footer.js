import React from 'react'
import Link from 'next/link'

function footer() {
    return (





        <div className=' w-full flex sm:flex-row flex-col justify-evenly bg-orange-100'>
            <div className=" rounded-2xl p-4 ">
                <h2 className="mb-4 text-lg sm:text-xl font-semibold">Shop here</h2>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <Link href="/Store"> <button className="bg-amber-500 text-white px-6 py-3 rounded-full shadow-lg duration-700 ease-out hover:shadow-amber-500/50 hover:scale-105 w-fit sm:w-auto">
                        Our Store
                    </button></Link> 
                    <button className="border-2 border-amber-500 px-6 py-3 rounded-full duration-700 ease-out hover:bg-amber-500 hover:text-white w-fit sm:w-auto">
                        Amazon
                    </button>
                    <button className="border-2 border-amber-500 px-6 py-3 rounded-full duration-700 ease-out hover:bg-amber-500 hover:text-white w-fit sm:w-auto">
                        Flipkart
                    </button>
                </div>
            </div>


            <div className='max-w-96 h-fit  rounded-2xl p-4'>
                <h2 className="mb-4 text-lg sm:text-xl font-semibold">Social Media</h2>
                <div className=' flex gap-5'>
                    <i class="fa-brands fa-x-twitter text-3xl" className='hover:scale-105 duration-500 ease-out'></i>
                    <i class="fa-brands fa-facebook-f text-3xl" className='hover:scale-105 duration-500 ease-out'></i>
                    <i class="fa-brands fa-instagram text-3xl" className='hover:scale-105 duration-500 ease-out'></i>
                </div>
            </div>

            <div className='max-w-80 h-fit p-4 rounded-2xl'>
                <h2 className="mb-4 text-lg sm:text-xl font-semibold">Contact</h2>
                <div className=' flex gap-2 flex-col'>
                    <ul className="list-disc pl-5">
                        <li>Ynotfoodproducts@gmail.com</li>
                        <li>+91 70023 27572</li>
                    </ul>
                </div>
            </div>
        </div>


    )
}

export default footer