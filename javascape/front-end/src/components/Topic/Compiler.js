/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import NavBar from '../NavBar'
import { useLocation } from "react-router-dom"

export default function Compiler() {
    // Get query from URL
    const location = useLocation()
    // set params
    const params = new URLSearchParams(location.search)
    // set topic


    return (
        <div className='Compiler bg-[#09002B] bg-background text-white font-exo h-screen'>
            <NavBar />
            {/* Content */}
            <div className='w-full h-full overflow-auto flex flex-col items-center uppercase'>
                {/* Title */}
                <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>{params.get("program").replace(/-/g, ' ')}</span>
                {/* Rank Content */}
                <div className='w-full flex flex-col justify-center items-center'>
                    {/* All Results View */}
                    <div className='w-full flex justify-center items-center'>
                        <div className='flex flex-col items-center h-full mr-10 max-w-[14rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5'>
                            <span className='underline font-bold'>Topic</span>

                        </div>
                        <div className='flex flex-col items-center h-full mr-10 max-w-[80rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5'>
                            <span className='underline font-bold'>Topic</span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
