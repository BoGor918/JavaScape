/* eslint-disable array-callback-return */
import React, { useState, useEffect, useContext } from 'react'
import { auth, firestore } from "../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Logo from "../images/Logo.png"
import { collection, getDocs } from "firebase/firestore"
import MapperContext from '../globalVariables/MapperContextProvider.js'

export default function Profile() {
    // const {
    //     userData,
    // } = useContext(MapperContext)

    const [authUser, setAuthUser] = useState({})
    const [userData, setUserData] = useState([])

    const usersCollectionRef = collection(firestore, "Users")

    const navigate = useNavigate();

    useEffect(() => {
        const GetUserData = async () => {
            const userDataRef = await getDocs(usersCollectionRef)

            setUserData(userDataRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        GetUserData()
    })

    onAuthStateChanged(auth, (currentUser) => {
        setAuthUser(currentUser)
    })

    const Logout = async () => {
        await signOut(auth)
        navigate("/")
    }

    return (
        <div className=''>
            <NavBar />
            <div className='Profile w-full flex flex-col justify-center items-center h-screen bg-background bg-[#09002B] text-white font-exo uppercase'>
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
        </div>
    )
}
