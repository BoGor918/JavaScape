/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import JavaOutput from './Topics/JavaOutput';
import JavaForLoop from './Topics/JavaForLoop';
import CateMenu from "./CateMenu";
import NavBar from "../NavBar";
import Loading from '../Loading'

export default function Topic() {
    // Get query from URL
    const location = useLocation()
    // set params
    const params = new URLSearchParams(location.search)
    // navigate function
    const navigate = useNavigate();
    // loading function
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    return (
        <div>
            {
                loading ? <Loading /> :
                    <div className='Topic flex flex-col text-white font-exo w-full'>
                        <NavBar />
                        {/* Content */}
                        <div className='w-full overflow-auto flex flex-col items-center mb-[7rem] sm:mb-[7rem] md:mb-[10rem] lg:mb-[10rem]'>
                            {/* Title */}
                            <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[0rem] sm:mb-[0rem] lg:mb-[2rem] text-[1.5rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0] text-center'>Find your favourite Java Topics here</span>
                            {/* Topic Column */}
                            <CateMenu className="visible sm:visible md:visible lg:hidden" />
                            <div className='w-full flex flex-col justify-center items-center mt-[-1rem]'>
                                <div className='w-full flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-end sm:items-end md:items-center lg:items-start'>
                                    {/* Category View */}
                                    <div className='hidden sm:hidden md:hidden lg:flex flex-col items-center h-full mr-4 max-w-[14rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5'>
                                        <span className='underline font-bold'>Topics</span>
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
                                            <div className='flex flex-col self-center h-full max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:max-w-[60rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[20px] sm:px-[20px] md:px-[35px] lg:px-[50px]'>
                                                <JavaOutput />
                                            </div>
                                            :
                                            <div className='flex flex-col self-center h-full max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:max-w-[60rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[20px] sm:px-[20px] md:px-[35px] lg:px-[50px]'>
                                                <JavaForLoop />
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}