/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from 'react'
import { auth, firestore } from "../../firebase"
import { signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import Logo from "../../images/Logo.png"
import { MapperContext } from '../../globalVariables/MapperContextProvider'
import NavBar from '../NavBar'

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

    // user level data
    const [userLevelScoreData, setUserLevelScoreData] = useState([]);
    // all level score
    const currentLevelScoreDataSet = [];
    // get users collection from firestore
    const usersLevelRef = collection(firestore, `Users/${currentUserDataSet[1]}/Levels`)

    // get and map the user data
    useEffect(() => {
        const GetUserLevelData = async () => {
            const userLevelData = await getDocs(usersLevelRef)
            setUserLevelScoreData(userLevelData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        GetUserLevelData()
    }, [currentUserDataSet])

    // set current user data
    userLevelScoreData.map((level) => {
        currentLevelScoreDataSet.push(level.HighestScore)
    })

    return (
        authUser === null ? navigate("/") :
            <div className='Profile flex flex-col text-white font-exo w-full'>
                <NavBar />
                <div className='w-full flex flex-col justify-center items-center h-screen uppercase'>
                    <div className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[35rem] lg:md:max-w-[35rem] w-full pl-[2rem] pr-[1rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5'>
                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Member Name: {currentUserDataSet[1]}</span>
                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Email: {currentUserDataSet[2]}</span>
                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Total Score: {currentLevelScoreDataSet.reduce((total, currentValue) => total + currentValue, 0)}</span>
                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Position: {currentUserDataSet[4]}</span>
                        <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[4rem] sm:max-w-[4rem] md:max-w-[7rem] lg:max-w-[7rem] w-full">
                            <div>
                                <button onClick={Logout} className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px]'>LOGOUT</button>
                            </div>
                        </div>
                        <div className='self-end mt-[-58px] sm:mt-[-58px] md:mt-[-66px] lg:mt-[-66px]'>
                            <img src={Logo} alt="" className="max-w-[6rem] sm:max-w-[6rem] md:max-w-[7rem] lg:max-w-[7rem]" />
                        </div>
                    </div>
                </div>
            </div>
    )
}
