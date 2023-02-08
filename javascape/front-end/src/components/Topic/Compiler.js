import React from 'react'
import { useLocation } from "react-router-dom"
import PrintStringHelloWorld from './Compilers/PrintStringHelloWorld'
import PrintMultipleString from './Compilers/PrintMultipleString'
import DoubleQuote from './Compilers/DoubleQuote'

export default function Compiler() {
    // Get query from URL
    const location = useLocation()
    // set params
    const params = new URLSearchParams(location.search)

    return (
        <div className='Compiler flex flex-col text-white font-exo w-full'>
            {/* Content */}
            <div className='w-full h-full overflow-auto flex flex-col items-center'>
                {/* Title */}
                <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>{params.get("program").replace(/-/g, ' ')}</span>
                {/* Compiler Content */}
                <div className='w-full flex flex-col justify-center items-center mb-[6rem]'>
                    {
                        params.get("program") === "print-single-string" ? <PrintStringHelloWorld />
                            :
                            params.get("program") === "print-multiple-string" ? <PrintMultipleString />
                                :
                                params.get("program") === "double-quote" ? <DoubleQuote />
                                    : null
                    }
                </div>
            </div>
        </div >
    )
}
