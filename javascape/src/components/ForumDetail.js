/* eslint-disable array-callback-return */
import React, { useContext } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { MapperContext } from '../globalVariables/MapperContextProvider'

import { useNavigate } from 'react-router-dom'

export default function ForumDetail() {
    // call data from mapper context js
    const {
        forumData,
    } = useContext(MapperContext)

    // navigate function
    const navigate = useNavigate();

    // Get forum id from url
    const viewForum = window.location.pathname.replace("/forum/", "")

    return (
        <div className='Rank bg-[#09002B] bg-background text-white font-exo h-screen'>
            <NavBar />
            {/* Content */}
            <div className='w-full flex flex-col items-center h-screen uppercase'>
                {/* Title */}
                {
                    forumData.map((forum) => {
                        if (forum.id === viewForum)
                            return (
                                <>
                                    <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>{forum.Question}</span>
                                </>
                            )
                    })
                }
                {/* Forum Content */}
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='flex flex-col max-w-[20rem] sm:max-w-[20rem] md:max-w-[45rem] lg:md:max-w-[55rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5 px-[50px]'>
                        {/* Forum Detail */}
                        <div className='flex justify-center my-[1rem] hover:bg-black/20 rounded-lg px-5 py-[5px] cursor-pointer'>

                        </div>
                    </div>
                    {/* Create Button */}
                    <div className="w-full max-w-[1280px] pt-5 flex justify-center">
                        <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                            <div>
                                <button onClick={() => navigate(-1)} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Back</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}
