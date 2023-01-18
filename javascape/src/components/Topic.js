/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import { MapperContext } from '../globalVariables/MapperContextProvider'

export default function Topic() {
    // call data from mapper context js
    const {
        authUser,
    } = useContext(MapperContext)

    // navigate function
    const navigate = useNavigate();

    return (
        <div className='flex flex-col justify-between bg-background bg-[#09002B] text-white font-exo'>
            {/* Nav bar component */}
            <NavBar />
            <div className='w-full flex flex-col justify-center items-center h-screen uppercase'>
                <div className='flex flex-col max-w-[23rem] sm:max-w-[23rem] md:max-w-[35rem] lg:md:max-w-[35rem] w-full pl-[2rem] pr-[1rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5'>
                    <span className='self-center text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Coming Soon......</span>
                </div>
            </div>
        </div>
    )
}
