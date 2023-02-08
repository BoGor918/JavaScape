/* eslint-disable array-callback-return */
import React from "react";
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import JavaOutput from './Topics/JavaOutput';
import JavaForLoop from './Topics/JavaForLoop';

export default function Topic() {
    // Get query from URL
    const location = useLocation()
    // set params
    const params = new URLSearchParams(location.search)
    // navigate function
    const navigate = useNavigate();

    console.log(params.get("name"))

    return (
        <div className='Topic flex flex-col text-white font-exo w-full'>
            {/* Content */}
            <div className='w-full overflow-auto flex flex-col items-center'>
                {/* Title */}
                <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>Find your favourite Java Topics here</span>
                {/* Topic Column */}
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='w-full flex justify-center'>
                        {/* Category View */}
                        <div className='flex flex-col items-center h-full mr-4 max-w-[14rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5'>
                            <span className='underline font-bold'>Topic</span>
                            {
                                params.get("name") === "javaoutput" ?
                                    <>
                                        <span className='font-thin bg-black/20 rounded cursor-pointer px-5 my-3' onClick={() => navigate("/topic?name=javaoutput")}>Java Output / Print</span>
                                        <span className='font-thin hover:bg-black/20 rounded cursor-pointer px-5' onClick={() => navigate("/topic?name=javaforloop")}>Java For Loop</span>
                                    </>
                                    :
                                    params.get("name") === "javaforloop" ?
                                        <>
                                            <span className='font-thin hover:bg-black/20 rounded cursor-pointer px-5 my-3' onClick={() => navigate("/topic?name=javaoutput")}>Java Output / Print</span>
                                            <span className='font-thin bg-black/20 rounded cursor-pointer px-5' onClick={() => navigate("/topic?name=javaforloop")}>Java For Loop</span>
                                        </>
                                        :
                                        <>
                                        </>
                            }
                        </div>
                        {/* Content View */}
                        {
                            params.get("name") === "javaoutput" ?
                                <div className='flex flex-col h-full max-w-[80rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[20px] sm:px-[20px] md:px-[35px] lg:px-[50px]'>
                                    <JavaOutput />
                                </div>
                                :
                                <div className='flex flex-col h-full max-w-[80rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[20px] sm:px-[20px] md:px-[35px] lg:px-[50px]'>
                                    <JavaForLoop />
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
