/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Logo from "../images/Logo.png"
import { MapperContext } from '../globalVariables/MapperContextProvider'
import Footer from './Footer'

export default function AllUserProfile() {
    // call data from mapper context js
    const {
        authUser,
        userData,
    } = useContext(MapperContext)

    const viewUser = window.location.pathname.replace("/profile/", "")

    // navigate function
    const navigate = useNavigate();

    return (
        authUser === null ? navigate("/") :
            <div className='flex flex-col justify-between bg-background bg-[#09002B] text-white font-exo'>
                {/* Nav bar component */}
                <NavBar />
                {/* All User Profile */}
                <div className='w-full flex flex-col justify-center items-center h-screen uppercase'>
                    {
                        userData.map((user) => {
                            // Compare with the user name in the url
                            if (viewUser === user.Username) {
                                return (
                                    <div className='flex flex-col max-w-[23rem] sm:max-w-[23rem] md:max-w-[35rem] lg:md:max-w-[35rem] w-full pl-[2rem] pr-[1rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5'>
                                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Member Name: {user.Username}</span>
                                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Email: {user.Email}</span>
                                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Total Score: {user.TotalScore}</span>
                                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Position: {user.Position}</span>
                                        <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[4rem] sm:max-w-[4rem] md:max-w-[7rem] lg:max-w-[7rem] w-full">
                                            <div>
                                                <button onClick={() => navigate(-1)} className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#371152] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px] uppercase'>
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
                {/* Footer */}
                <Footer />
            </div>
    )
}
