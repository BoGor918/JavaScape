/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext } from 'react'
import { signOut, sendEmailVerification } from "firebase/auth"
import NavBar from './NavBar'
import { MapperContext } from '../globalVariables/MapperContextProvider'
import { auth } from "../firebase"
import { useNavigate } from 'react-router-dom'

export default function EmailVerification() {
    // Get user data from context
    const {
        authUser
    } = useContext(MapperContext);

    // navigate function
    const navigate = useNavigate();

    console.log(authUser)

    // send Email function
    const SendEmail = () => {
        sendEmailVerification(authUser)
        .then(() => {
            alert("Verification Email Sent")
        });
    }

    // logout function
    const Logout = async () => {
        await signOut(auth)
        navigate("/")
    }

    return (
        <div className='AllUserProfile flex flex-col text-white font-exo w-full'>
            <NavBar />
            {/* Page Not Found Box */}
            <div className='w-full flex flex-col justify-center items-center h-screen uppercase'>
                <div className='flex flex-col justify-center items-center max-w-[21rem] sm:max-w-[21rem] md:max-w-[35rem] lg:md:max-w-[35rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold p-4'>
                    <span className='text-center text-sm sm:text-sm md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Press send to send Verification Email Or Logout !</span>
                    <div className="flex justify-center items-center w-full my-3">
                        <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit mx-3">
                            <div>
                                <button onClick={() => SendEmail()} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>
                                    Send
                                </button>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit mx-3">
                            <div>
                                <button onClick={() => Logout()} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
