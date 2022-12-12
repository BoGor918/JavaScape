import React, { useState } from 'react'
import { auth } from "../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Logo from "../images/Logo.png"

export default function Profile() {

    const [user, setUser] = useState({});

    const navigate = useNavigate();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    const Logout = async () => {
        await signOut(auth)
        navigate("/")
    }

    return (
        <div>
            <NavBar />
            <div className='Profile w-full flex flex-col justify-center items-center h-screen bg-[#09002B] text-white font-exo uppercase'>

                <div className='flex flex-col max-w-[35rem] w-full pl-[2rem] pr-[1rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5'>
                    <span className='text-xl text-white my-3'>Member Name: admin</span>
                    <span className='text-xl text-white my-3'>Phone Number: 67708560</span>
                    <span className='text-xl text-white my-3'>Email: admin@admin.com</span>
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

            </div>
        </div>
    )
}
