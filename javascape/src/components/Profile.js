/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useReducer } from 'react'
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Logo from "../images/Logo.png"
import { MapperContext } from '../globalVariables/MapperContextProvider'
import Footer from './Footer'

export default function Profile() {
    // call data from mapper context js
    const {
        authUser,
        currentUserDataSet,
    } = useContext(MapperContext)

    // navigate function
    const navigate = useNavigate();

    // Logout function
    const Logout = async () => {
        await signOut(auth)
        navigate("/")
    }

    return (
        authUser === null ? navigate("/") : 
            <div className='flex flex-col justify-between bg-background bg-[#09002B] text-white font-exo uppercase'>
                {/* Nav bar component */}
                <NavBar />
                <div className='Profile w-full flex flex-col justify-center items-center h-screen'>
                    <div className='flex flex-col max-w-[23rem] sm:max-w-[23rem] md:max-w-[35rem] lg:md:max-w-[35rem] w-full pl-[2rem] pr-[1rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5'>
                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Member Name: {currentUserDataSet[1]}</span>
                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Email: {currentUserDataSet[2]}</span>
                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Total Point: 150</span>
                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Position: COMMANDER IN CHIEF</span>

                        <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[4rem] sm:max-w-[4rem] md:max-w-[7rem] lg:max-w-[7rem] w-full">
                            <div>
                                <button onClick={Logout} className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#371152] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px]'>LOGOUT</button>
                            </div>
                        </div>

                        <div className='self-end mt-[-58px] sm:mt-[-58px] md:mt-[-66px] lg:mt-[-66px]'>
                            <img src={Logo} alt="" className="max-w-[6rem] sm:max-w-[6rem] md:max-w-[7rem] lg:max-w-[7rem]" />
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <Footer />
            </div>
    )
}
