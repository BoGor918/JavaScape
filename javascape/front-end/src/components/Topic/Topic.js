/* eslint-disable array-callback-return */
import NavBar from '../NavBar'
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
        <div className='Topic bg-[#09002B] bg-background text-white font-exo h-screen'>
            <NavBar />
            {/* Content */}
            <div className='w-full h-full overflow-auto flex flex-col items-center'>
                {/* Title */}
                <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[9rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>Find your favourite Java Topics here</span>
                {/* Results Column */}
                <div className='w-full flex flex-col justify-center items-center'>
                    {/* All Results View */}
                    <div className='w-full flex justify-center items-center'>
                        <div className='flex flex-col items-center h-full mr-10 max-w-[14rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5'>
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
