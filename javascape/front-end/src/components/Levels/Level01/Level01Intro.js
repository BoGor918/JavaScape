import React, { useContext } from 'react'
import Level01IntroBanner from "../../../images/Levels/Level01/Level01IntroBanner.png"
import { MapperContext } from '../../../globalVariables/MapperContextProvider'
import M01 from "../../../images/Levels/Level01/M01.png"
import M02 from "../../../images/Levels/Level01/M02.png"
import M03 from "../../../images/Levels/Level01/M03.png"
import NavBar from '../../NavBar'
import { useNavigate } from 'react-router-dom'

export default function Battle() {
    const {
        authUser,
        currentUserDataSet,
        currentUserSkillSet,
        currentUserSkillLength
    } = useContext(MapperContext);

    const hoverButton = {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };

    const navigate = useNavigate();

    return (
        <div className='Level01Intro flex flex-col text-white font-exo w-full'>
            <NavBar />
            <div className='flex flex-col justify-center items-center'>
                {/* Level Banner */}
                <div className='w-full max-w-[350px] sm:max-w-[350px] md:max-w-[700px] lg:max-w-[1280px] relative block group mt-[130px] lg:mt-40'>
                    <img src={Level01IntroBanner} alt="" className="object-cover w-full group-hover:opacity-50 duration-500" />
                    <div className='opacity-0 duration-500 group-hover:opacity-100'>
                        <div style={hoverButton} className="absolute bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[7rem] sm:max-w-[7rem] md:max-w-[13rem]  lg:max-w-[17rem] w-full">
                            <div>
                                {
                                    authUser === null
                                        ?
                                        <button onClick={() => navigate("/login")} className='text-sm sm:text-sm md:text-[22px] lg:text-md w-full h-[3rem] sm:h-[3rem] md:h-[5rem] lg:h-[5rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 uppecase font-extrabold'>Start Game</button>
                                        :
                                        currentUserSkillLength === 0 ?
                                            <button onClick={() => window.open(`/battle/level01/${currentUserDataSet[1]}`, 
                                            "_blank")} className='text-sm sm:text-sm md:text-[22px] lg:text-md w-full h-[3rem] sm:h-[3rem] md:h-[5rem] lg:h-[5rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 uppecase font-extrabold'>Start Game</button>
                                            :
                                            <button onClick={() => window.open(`/battle/level01/${currentUserDataSet[1]}${currentUserSkillSet}`, 
                                            "_blank")} className='text-sm sm:text-sm md:text-[22px] lg:text-md w-full h-[3rem] sm:h-[3rem] md:h-[5rem] lg:h-[5rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 uppecase font-extrabold'>Start Game</button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Level Content */}
            <div className='flex flex-col justify-center items-center mb-[7rem] sm:mb-[7rem] md:mb-[10rem] lg:mb-[10rem]'>
                <span className='mt-[3rem] sm:mt-[3rem] md:mt-[5rem] lg:mt-[8rem] my-[3rem] sm:my-[3rem] md:my-[5rem] lg:my-[5rem] md:text-[1.3rem] lg:text-[1.7rem] uppercase font-extrabold text-[#B154F0]'>WHAT WILL YOU MEET IN THIS LEVEL ?</span>
                <div className='hidden sm:hidden md:grid lg:grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[50px] sm:gap-[50px] lg:gap-[150px]'>
                    <img src={M01} alt="" className='w-full max-w-[17rem] md:max-w-[20rem] lg:max-w-[35rem]' />
                    <img src={M02} alt="" className='w-full max-w-[17rem] md:max-w-[20rem] lg:max-w-[35rem]' />
                    <img src={M03} alt="" className='w-full max-w-[17rem] md:max-w-[20rem] lg:max-w-[35rem] ml-[1.5rem] sm:ml-[1.5rem] lg:ml-[2.9rem]' />
                </div>

                <div className='grid sm:grid md:hidden lg:hidden grid-cols-1 gap-[50px]'>
                    <img src={M01} alt="" className='w-full max-w-[17rem]' />
                    <img src={M02} alt="" className='w-full max-w-[17rem]' />
                    <img src={M03} alt="" className='w-full max-w-[17rem]' />
                </div>
            </div>
        </div >
    )
}
