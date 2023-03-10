import React, { useContext, useState, useEffect } from 'react'
import Level01IntroBanner from "../../../images/Levels/Level01/Level01IntroBanner.png"
import { MapperContext } from '../../../globalVariables/MapperContextProvider'
import M01 from "../../../images/Levels/Level01/M01.png"
import M02 from "../../../images/Levels/Level01/M02.png"
import M03 from "../../../images/Levels/Level01/M03.png"
import NavBar from '../../NavBar'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect';
import EmailVerification from '../../EmailVerification'
import HowToPlay1 from "../../../images/Levels/Level01/HowToPlay1.png"
import HowToPlay2 from "../../../images/Levels/Level01/HowToPlay2.png"
import L1Rank from './L1Rank/L1Rank'
import Loading from '../../Loading'

export default function Level01Intro() {
    const {
        authUser,
        currentUserDataSet,
    } = useContext(MapperContext);

    const hoverButton = {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };

    const navigate = useNavigate();

    // loading function
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    // handle display
    const [display, setDisplay] = useState("default");

    return (
        <div>
            {
                // loading ? <Loading /> :
                authUser != null && authUser.emailVerified === false ? <EmailVerification /> :
                    <div className='Level01Intro flex flex-col text-white font-exo w-full'>
                        <NavBar />
                        <div className='flex flex-col justify-center items-center'>
                            {/* Level Banner */}
                            <div className='w-full max-w-[350px] sm:max-w-[350px] md:max-w-[700px] lg:max-w-[1280px] relative block group mt-[130px] lg:mt-40'>
                                <img src={Level01IntroBanner} alt="" className="object-cover w-full group-hover:opacity-50 duration-500" />
                                <div className='opacity-0 duration-500 group-hover:opacity-100'>
                                    <div style={hoverButton} className="absolute bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[10rem] sm:max-w-[8rem] md:max-w-[13rem] lg:max-w-[17rem] w-full">
                                        {
                                            isMobile ?
                                                <div>
                                                    {
                                                        <button onClick={() => window.open(`/battle/level01/${currentUserDataSet[1]}/mobile`,
                                                            "_blank")} className='text-sm sm:text-sm md:text-[22px] lg:text-md w-full h-[3rem] sm:h-[3rem] md:h-[5rem] lg:h-[5rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 uppecase font-extrabold'>Start Game</button>
                                                    }
                                                </div>
                                                :
                                                <div>
                                                    {
                                                        authUser === null
                                                            ?
                                                            <button onClick={() => navigate(`/login`)} className='text-sm sm:text-sm md:text-[22px] lg:text-md w-full h-[3rem] sm:h-[3rem] md:h-[5rem] lg:h-[5rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 uppecase font-extrabold'>Start Game</button>
                                                            :
                                                            <button onClick={() => window.open(`/battle/level01/${currentUserDataSet[1]}`,
                                                                "_blank")} className='text-sm sm:text-sm md:text-[22px] lg:text-md w-full h-[3rem] sm:h-[3rem] md:h-[5rem] lg:h-[5rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 uppecase font-extrabold'>Start Game</button>
                                                    }
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* filter button */}
                        <div className='flex justify-center items-center mt-[3rem] sm:mt-[3rem] md:mt-[5rem] lg:mt-[8rem] font-bold'>
                            <div className="mx-[1px] bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[5rem] sm:max-w-[5rem] md:max-w-[7rem] lg:max-w-[7rem] w-full">
                                {
                                    display === "default" ?
                                        <button onClick={() => setDisplay("default")} className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#541680] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px] uppercase'>Level 01</button> :
                                        <button onClick={() => setDisplay("default")} className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px] uppercase'>Level 01</button>
                                }

                            </div>
                            <div className="mx-[1px] bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[7rem] sm:max-w-[7rem] md:max-w-[10rem] lg:max-w-[10rem] w-full">
                                {
                                    display === "howtoplay" ?
                                        <button onClick={() => setDisplay("howtoplay")} className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#541680] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px] uppercase'>How To Play</button> :
                                        <button onClick={() => setDisplay("howtoplay")} className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px] uppercase'>How To Play</button>
                                }
                            </div>
                            <div className="mx-[1px] bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[5rem] sm:max-w-[5rem] md:max-w-[7rem] lg:max-w-[7rem] w-full">
                                {
                                    display === "rank" ?
                                        <button onClick={() => setDisplay("rank")} className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#541680] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px] uppercase'>Rank</button> :
                                        <button onClick={() => setDisplay("rank")} className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px] uppercase'>Rank</button>
                                }
                            </div>
                        </div>
                        {/* Level Content */}
                        <>
                            {

                                display === "default" ?
                                    <div className='flex flex-col justify-center items-center mb-[7rem] sm:mb-[7rem] md:mb-[10rem] lg:mb-[10rem]'>
                                        <span className='my-[3rem] sm:my-[3rem] md:my-[5rem] lg:my-[5rem] md:text-[1.3rem] lg:text-[1.7rem] uppercase font-extrabold text-[#B154F0]'>WHAT WILL YOU MEET IN THIS LEVEL ?</span>
                                        <div className='flex flex-col md:flex-row lg:flex-row justify-center items-center w-full'>
                                            <img src={M01} alt="" className='w-full max-w-[17rem] md:max-w-[20rem] lg:max-w-[35rem] md:mx-[2rem] lg:mx-[3rem] mb-[3rem] sm:mb-[3rem] md:mb-[0rem] lg:mb-[0rem]' />
                                            <img src={M02} alt="" className='w-full max-w-[17rem] md:max-w-[20rem] lg:max-w-[35rem] md:mx-[2rem] lg:mx-[3rem] mb-[3rem] sm:mb-[3rem] md:mb-[0rem] lg:mb-[0rem]' />
                                        </div>
                                        <div className='flex flex-col md:flex-row lg:flex-row justify-center items-center self-start w-full md:mt-[6.5rem] lg:mt-[10rem]'>
                                            <img src={M03} alt="" className='w-full max-w-[17rem] md:max-w-[20rem] lg:max-w-[35rem] ml-[1.4rem] sm:ml-[1.4rem] md:ml-[0rem] lg:ml:[0rem] md:mx-[1rem] lg:mx-[1.4rem]' />
                                            <img src={M03} alt="" className='hidden sm:hidden md:block lg:block opacity-0 w-full max-w-[17rem] md:max-w-[20rem] lg:max-w-[35rem] md:mx-[1rem] lg:mx-[1.4rem]' />
                                        </div>
                                    </div> : display === "howtoplay" ?
                                        <div className='w-full max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:max-w-[75rem] self-center flex flex-col justify-center items-center mb-[7rem] sm:mb-[7rem] md:mb-[10rem] lg:mb-[10rem]'>
                                            <span className='my-[3rem] sm:my-[3rem] md:my-[5rem] lg:my-[5rem] md:text-[1.3rem] lg:text-[1.7rem] uppercase font-extrabold text-[#B154F0]'>How to Play ?</span>
                                            {
                                                isMobile ?
                                                    <div className='flex flex-col justify-center items-center'>
                                                        <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row mb-[1rem] sm:mb-[1rem] md:mb-[3rem] lg:mb-[3rem] justify-center items-center'>
                                                            <img src={HowToPlay2} alt="" className="mt-5 sm:mt-5 md:mt-0 lg:mt-0 md:max-w-[23rem] lg:max-w-[30rem] border-[3px] rounded-2xl border-[#B154F0]" />
                                                            <span className='md:text-[18px] md:pl-[2rem] lg:text-[23px] lg:pl-[5rem] text-justify w-full mt-3 sm:mt-3 md:mt-0 lg:mt-0'>
                                                                This is a multiple choices question, members need to click the correct box for attacking the enemies.
                                                            </span>
                                                        </div>
                                                    </div> :
                                                    <div className='flex flex-col justify-center items-center'>
                                                        <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row mb-[1rem] sm:mb-[1rem] md:mb-[3rem] lg:mb-[3rem] justify-center items-center'>
                                                            <img src={HowToPlay2} alt="" className="mt-5 sm:mt-5 md:mt-0 lg:mt-0 md:max-w-[23rem] lg:max-w-[30rem] border-[3px] rounded-2xl border-[#B154F0]" />
                                                            <span className='md:text-[18px] md:pl-[2rem] lg:text-[23px] lg:pl-[5rem] text-justify w-full mt-3 sm:mt-3 md:mt-0 lg:mt-0'>
                                                                This is a multiple choices question, members need to click the correct box for attacking the enemies.
                                                            </span>
                                                        </div>
                                                        <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row mt-[1rem] sm:mt-[1rem] md:mt-[3rem] lg:mt-[3rem] justify-center items-center'>
                                                            <img src={HowToPlay1} alt="" className="mt-5 sm:mt-5 md:mt-0 lg:mt-0 md:max-w-[23rem] lg:max-w-[30rem] border-[3px] rounded-2xl border-[#B154F0]" />
                                                            <span className='md:text-[18px] md:pl-[2rem] lg:text-[23px] lg:pl-[5rem] text-justify w-full mt-3 sm:mt-3 md:mt-0 lg:mt-0'>
                                                                This is a fill-in-the-blank question, members need to type in the correct answer in the middle box for attacking the enemies.
                                                            </span>
                                                        </div>
                                                    </div>
                                            }
                                        </div> : display === "rank" ?
                                            <div className='w-full max-w-[24rem] sm:max-w-[24rem] md:max-w-[50rem] lg:max-w-[75rem] self-center flex flex-col justify-center items-center mb-[7rem] sm:mb-[7rem] md:mb-[10rem] lg:mb-[10rem]'>
                                                <span className='my-[3rem] sm:my-[3rem] md:my-[5rem] lg:my-[5rem] md:text-[1.3rem] lg:text-[1.7rem] uppercase font-extrabold text-[#B154F0]'>Who's the best in this level ?</span>
                                                <L1Rank />
                                            </div> : <></>
                            }
                        </>
                    </div>
            }
        </div>
    )
}
