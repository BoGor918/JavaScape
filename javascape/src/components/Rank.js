import React, { useContext } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { MapperContext } from '../globalVariables/MapperContextProvider'

export default function Rank() {
    // call data from mapper context js
    const {
        userData,
    } = useContext(MapperContext)

    return (
        <div className='Rank bg-[#09002B] bg-background text-white font-exo h-screen'>
            <NavBar />
            {/* Content */}
            <div className='w-full flex flex-col items-center h-screen'>
                {/* Title */}
                <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>Who is the best ?</span>
                {/* Rank Content */}
                <div className='Profile w-full flex flex-col justify-center items-center'>
                    <div className='flex flex-col max-w-[20rem] sm:max-w-[20rem] md:max-w-[45rem] lg:md:max-w-[55rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5'>
                        {/* Rank Lable */}
                        <div className='flex justify-between'>
                            <div className='w-full flex justify-center'>
                                <span className='text-md sm:text-md md:text-xl lg:text-2xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                    Rank
                                </span>
                            </div>
                            <div className='w-full flex justify-center'>
                                <span className='text-md sm:text-md md:text-xl lg:text-2xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                    Username
                                </span>
                            </div>
                            <div className='w-full flex justify-center'>
                                <span className='text-md sm:text-md md:text-xl lg:text-2xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                    Total Score
                                </span>
                            </div>
                        </div>
                        {/* Rank Table */}
                        {
                            userData.map((user, index) => {
                                return (
                                    <div className='flex justify-between'>
                                        <div className='w-full flex justify-center'>
                                            <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                                {index + 1}
                                            </span>
                                        </div>
                                        <div className='w-full flex justify-center'>
                                            <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                                {user.Username}
                                            </span>
                                        </div>
                                        <div className='w-full flex justify-center'>
                                            <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                                {user.TotalScore}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
