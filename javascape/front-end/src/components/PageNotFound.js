/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Loading from "./Loading";

export default function PageNotFound() {
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
                    <div className='AllUserProfile flex flex-col text-white font-exo w-full'>
                        <NavBar />
                        {/* Page Not Found Box */}
                        <div className='w-full flex flex-col justify-center items-center h-screen uppercase'>
                            <div className='flex flex-col justify-center items-center max-w-[21rem] sm:max-w-[21rem] md:max-w-[35rem] lg:md:max-w-[35rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold p-4'>
                                <span className='text-center text-sm sm:text-sm md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Sorry ! This area is not available yet</span>
                                <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[4rem] sm:max-w-[4rem] md:max-w-[7rem] lg:max-w-[7rem] w-full">
                                    <div>
                                        <button onClick={() => navigate(-1)} className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px] uppercase'>
                                            Back
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
