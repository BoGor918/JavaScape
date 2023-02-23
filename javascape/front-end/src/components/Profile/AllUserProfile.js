/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from "../../images/Logo.png"
import { MapperContext } from '../../globalVariables/MapperContextProvider'
import NavBar from '../NavBar'
import Loading from "../Loading";

export default function AllUserProfile() {
    // call data from mapper context js
    const {
        userData,
    } = useContext(MapperContext)

    // get the user name from the url
    const viewUser = window.location.pathname.replace("/profile/", "")

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
                        {/* All User Profile */}
                        <div className='w-full flex flex-col justify-center items-center h-screen uppercase'>
                            {
                                userData.map((user, i) => {
                                    // Compare with the user name in the url
                                    if (viewUser === user.Username) {
                                        return (
                                            <div key={i} className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[35rem] lg:md:max-w-[35rem] w-full pl-[2rem] pr-[1rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5'>
                                                <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Member Name: {user.Username}</span>
                                                <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Total Score: {user.TotalScore}</span>
                                                <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Position: {user.Position}</span>
                                                <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[4rem] sm:max-w-[4rem] md:max-w-[7rem] lg:max-w-[7rem] w-full">
                                                    <div>
                                                        <button onClick={() => navigate(-1)} className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px] uppercase'>
                                                            Back
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='self-end mt-[-58px] sm:mt-[-58px] md:mt-[-66px] lg:mt-[-66px]'>
                                                    <img src={Logo} alt="" className="max-w-[6rem] sm:max-w-[6rem] md:max-w-[7rem] lg:max-w-[7rem]" />
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
            }
        </div>
    )
}
