/* eslint-disable array-callback-return */
import NavBar from '../NavBar'
import React from "react";
import { useNavigate } from 'react-router-dom'

export default function JavaOutput() {

    // navigate function
    const navigate = useNavigate();

    return (
        <div className='JavaOutput bg-[#09002B] bg-background text-white font-exo h-screen'>
            <NavBar />
            {/* Content */}
            <div className='w-full h-full overflow-auto flex flex-col items-center'>
                {/* Title */}
                <span className='text-center mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>Java Output / Print</span>
                {/* Results Column */}
                <div className='w-full flex flex-col justify-center items-center'>
                    {/* All Results View */}
                    <div className='w-full flex flex-col justify-center items-center'>
                        <div className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:max-w-[55rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[20px] sm:px-[20px] md:px-[35px] lg:px-[50px]'>
                            <div onClick={() => navigate()} className='flex justify-center my-[1rem] hover:bg-black/20 rounded-lg px-[1px] sm:px-[1px] md:px-5 lg:px-5 py-[5px] cursor-pointer'>
                                <div className='w-full flex flex-col justify-center text-gray-300'>
                                    <span className='text-sm sm:text-sm md:text-xl lg:text-xl text-white font-extrabold'>
                                        Java Output / Print
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
