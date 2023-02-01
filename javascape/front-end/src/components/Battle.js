import React from 'react'
import NavBar from './NavBar'
import { NavLink } from 'react-router-dom'
import Level01Banner from '../images/Levels/Level01/Level01Banner.png'
import Level02Banner from '../images/Levels/Level02Banner.png'
import Level03Banner from '../images/Levels/Level03Banner.png'
import Level04Banner from '../images/Levels/Level04Banner.png'

export default function Battle() {
    return (
        <div className='Battle bg-[#09002B] bg-background text-white font-exo'>
            <NavBar />
            {/* Content */}
            <div className='w-full flex flex-col justify-center items-center'>
                {/* Title */}
                <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>Ready To Beat Them ?</span>
                {/* Level Grid Column */}
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[50px] sm:gap-[50px] md:gap-[100px] lg:gap-[100px] mb-[7rem]'>
                    <NavLink to="/battle/level01"><img src={Level01Banner} alt="" className='w-full max-w-[260px] cursor-pointer' /></NavLink>
                    <NavLink><img src={Level02Banner} alt="" className='w-full max-w-[260px] cursor-pointer' /></NavLink>
                    <NavLink><img src={Level03Banner} alt="" className='w-full max-w-[260px] cursor-pointer' /></NavLink>
                    <NavLink><img src={Level04Banner} alt="" className='w-full max-w-[260px] cursor-pointer' /></NavLink>
                </div>
            </div>
        </div>
    )
}
