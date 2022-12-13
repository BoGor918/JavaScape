/* eslint-disable array-callback-return */
import React, { useContext } from 'react'
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Logo from "../images/Logo.png"
import { MapperContext } from '../globalVariables/MapperContextProvider'

export default function Profile() {
    // call data from mapper context js
    const {
        userData,
        authUser
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
                    {/* display users information */}
                    {
                        userData.map((user) => {
                            if (authUser?.email === user.Email) {
                                return (
                                    <div className='flex flex-col max-w-[35rem] w-full pl-[2rem] pr-[1rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5'>
                                        <span className='text-xl text-white my-3'>Member Name: {user.Username}</span>
                                        <span className='text-xl text-white my-3'>Phone Number: {user.PhoneNumber}</span>
                                        <span className='text-xl text-white my-3'>Email: {user.Email}</span>
                                        <span className='text-xl text-white my-3'>Total Point: 150</span>
                                        <span className='text-xl text-white my-3'>Position: COMMANDER IN CHIEF</span>

                                        <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[7rem] w-full">
                                            <div>
                                                <button onClick={Logout} className='w-full h-[3rem] bg-[#371152] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>LOGOUT</button>
                                            </div>
                                        </div>

                                        <div className='self-end mt-[-66px]'>
                                            <img src={Logo} alt="" className="max-w-[7rem]" />
                                        </div>
                                    </div>
                                )

                            }
                        })
                    }
                </div>

                <div className='flex justify-center items-center mt-[-24px]'>
                    <span>Copyright © 2022 JavaScape. All Rights Reserved</span>
                </div>
            </div>
    )
}
