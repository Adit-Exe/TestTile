"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Nav() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="bg-orange-100 backdrop-blur sticky top-0 z-50 mb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-3">
                            <Image src="/images/logo.png" alt="Foody" width={100} height={100} className="rounded-sm w-20" />
                            <span className="font-semibold text-lg text-slate-800">Foody</span>
                        </Link>
                    </div>

                    {/* Desktop links */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <Link href="/" className="text-slate-700 hover:text-amber-500 duration-500 ease-out">Home</Link>
                        <Link href="/About" className="text-slate-700 hover:text-amber-500 duration-500 ease-out">About</Link>
                        <Link href="/Store"><button className='border-2 bg-amber-500 text-white border-amber-500  px-4 py-1.5 rounded-full duration-700 ease-out hover:bg-transparent hover:text-black'>Store</button></Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden ">
                        <button
                            onClick={() => setOpen(!open)}
                            aria-label="Toggle menu"
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100"
                        >
                            <svg className={`h-6 w-6 transition-transform ${open ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                {open ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu panel */}
            {open && (
                <div className="md:hidden border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium  hover:bg-slate-100">Home</Link>
                        <Link href="/About" className="block px-3 py-2 rounded-md text-base font-medium  hover:bg-slate-100">About</Link>
                        <Link href="/Store"><button className='border-2 bg-amber-500 text-white border-amber-500  px-4 py-1.5 rounded-full duration-700 ease-out hover:bg-white hover:text-black'>Store</button></Link>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Nav