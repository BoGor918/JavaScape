/* eslint-disable array-callback-return */
import React, { useState } from "react";
import NavBar from "../NavBar";
import DamageX2 from "../../images/Shop/DamageX2.png";
import HealthX2 from "../../images/Shop/HealthX2.png";
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom"

export default function Ability() {
    // Get query from URL
    const location = useLocation()
    // set params
    const params = new URLSearchParams(location.search)
    // navigate function
    const navigate = useNavigate();

    // buying button checking
    const [buying, setBuying] = useState(false)

    return (
        <div className='Topic flex flex-col text-white font-exo w-full'>
            <NavBar />
            {/* Content */}
            <div className='w-full overflow-auto flex flex-col items-center mb-[7rem] sm:mb-[7rem] md:mb-[10rem] lg:mb-[10rem]'>
                {/* Title */}
                <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>{params.get("ability").replace(/-/g, ' ')}</span>
                <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start">
                    <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                        <div>
                            <button onClick={() => navigate(-1)} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Back</button>
                        </div>
                    </div>
                </div>
                {
                    buying === false && (
                        <div className='w-full flex flex-col justify-center items-center'>
                            <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:md:max-w-[55rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-8 sm:py-8 md:py-10 lg:py-10  px-5 sm:px-5 md:px-10 lg:px-10'>
                                <img src={params.get("ability") === "damage-x2" ? DamageX2 : HealthX2} alt="" className='w-full max-w-[300px] cursor-pointer' />
                                <div className="flex flex-col justify-between ml-[0rem] sm:ml-[0rem] md:ml-[4rem] lg:ml-[4rem] py-0 sm:py-0 md:py-8 lg:py-8 pt-3 sm:pt-3 md:pt-0 lg:pt-0">
                                    <div className="flex flex-col pl-[1rem] sm:pl-[1rem] md:pl-[0rem] lg:pl-[0rem]">
                                        <span className='uppercase text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Ability: {params.get("ability").replace(/-/g, ' ')}</span>
                                        <span className='uppercase text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Space Coin: {params.get("ability") === "damage-x2" ? "400SC" : "470SC"}</span>
                                        <span className='uppercase text-md sm:text-md md:text-xl lg:text-xl text-white mt-2 sm:mt-2 md:mt-3 lg:mt-3'>Description:</span>
                                        <span className='text-md sm:text-md md:text-md lg:text-md text-white'>{params.get("ability") === "damage-x2" ? "Produces double attack damage to enemies this turn." : "Instance health regeneration in your turn (2x of current health)."}</span>
                                    </div>
                                    <div className="self-center bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] mt-6 sm:mt-5 md:mt-3 lg:mt-3 max-w-[4rem] sm:max-w-[4rem] md:max-w-[7rem] lg:max-w-[7rem] w-full">
                                        <div>
                                            <button onClick={() => setBuying(true)} className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px] uppercase'>
                                                Buy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    buying === true && (
                        <div className='w-full flex flex-col justify-center items-center'>
                            <div className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:md:max-w-[55rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-8 sm:py-8 md:py-10 lg:py-10  px-5 sm:px-5 md:px-10 lg:px-10'>
                                <span className='self-center text-center uppercase text-md sm:text-md md:text-2xl lg:text-2xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Are you sure you want to buy "{params.get("ability").replace(/-/g, ' ')}" as your ability ?</span>
                                <div className="self-center bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] mt-6 sm:mt-5 md:mt-7 lg:mt-7 max-w-[7rem] sm:max-w-[7rem] md:max-w-[10rem] lg:max-w-[10rem] w-full">
                                    <div>
                                        <button className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px] uppercase'>
                                            Go Ahead
                                        </button>
                                    </div>
                                </div>
                                <div className="self-center bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] mt-3 sm:mt-3 md:mt-3 lg:mt-3 max-w-[7rem] sm:max-w-[7rem] md:max-w-[10rem] lg:max-w-[10rem] w-full">
                                    <div>
                                        <button onClick={() => setBuying(false)} className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px] uppercase'>
                                            Later
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
