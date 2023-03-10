import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Level01Banner from '../images/Levels/Level01/Level01Banner.png'
import Level01BannerMobile from '../images/Levels/Level01/Level01Banner_Mobile.png'
import Level02Banner from '../images/Levels/Level02/Level02Banner.png'
import Level02BannerMobile from '../images/Levels/Level02/Level02Banner_Mobile.png'
import Level03Banner from '../images/Levels/Level03Banner.png'
import Level04Banner from '../images/Levels/Level04Banner.png'
import NavBar from './NavBar'
import Loading from './Loading'
import EmailVerification from './EmailVerification'
import { MapperContext } from '../globalVariables/MapperContextProvider'
import { isMobile } from 'react-device-detect';

export default function Battle() {
    // call data from mapper context js
    const {
        authUser,
    } = useContext(MapperContext);

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
                    authUser != null && authUser.emailVerified === false ? <EmailVerification /> :
                        <div className='Battle flex flex-col text-white font-exo w-full'>
                            <NavBar />
                            {/* Content */}
                            <div className='w-full flex flex-col justify-center items-center mb-[7rem] sm:mb-[7rem] md:mb-[10rem] lg:mb-[10rem]'>
                                {/* Title */}
                                <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>Ready To Beat Them ?</span>
                                {/* Level Grid Column */}
                                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[50px] sm:gap-[50px] md:gap-[100px] lg:gap-[100px]'>
                                    <NavLink to="/battle/level01"><img src={isMobile ? Level01BannerMobile : Level01Banner} alt="" className='w-full max-w-[260px] cursor-pointer' /></NavLink>
                                    <NavLink to="/battle/level02"><img src={isMobile ? Level02BannerMobile : Level02Banner} alt="" className='w-full max-w-[260px] cursor-pointer' /></NavLink>
                                    <NavLink><img src={Level03Banner} alt="" className='w-full max-w-[260px] cursor-pointer' /></NavLink>
                                    <NavLink><img src={Level04Banner} alt="" className='w-full max-w-[260px] cursor-pointer' /></NavLink>
                                </div>
                            </div>
                        </div>
            }

        </div>
    )
}
