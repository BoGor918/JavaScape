/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import DamageX2 from "../../images/Shop/DamageX2.png";
import HealthX2 from "../../images/Shop/HealthX2.png";
import TBDAbility from "../../images/Shop/TBDAbility.png";
import { NavLink } from 'react-router-dom'
import Loading from "../Loading";

export default function Topic() {
    // loading function
    const [loading, setLoading] = useState(false);

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
                            <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>Find your ability</span>
                            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[50px] sm:gap-[50px] md:gap-[100px] lg:gap-[100px]'>
                                <NavLink to="/ability?ability=damage-x2"><img src={DamageX2} alt="" className='w-full max-w-[300px] cursor-pointer' /></NavLink>
                                <NavLink to="/ability?ability=health-x2"><img src={HealthX2} alt="" className='w-full max-w-[300px] cursor-pointer' /></NavLink>
                                <NavLink><img src={TBDAbility} alt="" className='w-full max-w-[300px] cursor-pointer' /></NavLink>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
