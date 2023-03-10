/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from 'react'
import { auth, firestore } from "../../firebase"
import { signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import Position from "../../images/Private.png"
import { MapperContext } from '../../globalVariables/MapperContextProvider'
import NavBar from '../NavBar'
import Loading from "../Loading";
import EmailVerification from "../EmailVerification";
import Refresh from "../../images/Refresh.png"
import Private_First_Class from "../../images/Private_First_Class.png"
import Sergeant from "../../images/Sergeant.png"
import DamageX2Icon from "../../images/DamageX2Icon.png"
import HealthX2Icon from "../../images/HealthX2Icon.png"

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
    const usersLevelRef = collection(firestore, `Users/${currentUserDataSet[0]}/Levels`)

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

    // loading function
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    // handle edit name
    const [editName, setEditName] = useState(false);
    const [newName, setNewName] = useState("");

    const UpdateName = () => {
        if (currentUserDataSet[1] === newName) {
            alert("Please Enter a New Name")
        } else if (newName === "") {
            alert("Please Enter a New Name")
        } else if (newName.includes(" ")) {
            alert("Please Enter a Name Without Space")
        } else {
            const updateDocRef = doc(firestore, "Users", currentUserDataSet[0])
            const updateLevel1DocRef = doc(firestore, `Users/${currentUserDataSet[0]}/Levels`, "Level1")
            const updateLevel2DocRef = doc(firestore, `Users/${currentUserDataSet[0]}/Levels`, "Level2")

            updateDoc(updateDocRef, { Username: newName }).then(() => {
                updateDoc(updateLevel1DocRef, { Username: newName }).then(() => {
                    updateDoc(updateLevel2DocRef, { Username: newName }).then(() => {
                        window.location.reload();
                    })
                })
            })
        }
    }

    return (
        <div>
            {
                authUser === null ? navigate("/") :
                    loading ? <Loading /> :
                        authUser != null && authUser.emailVerified === false ? <EmailVerification /> :
                            <div className='Profile flex flex-col text-white font-exo w-full'>
                                <NavBar />
                                <div className='w-full flex flex-col justify-center items-center h-screen uppercase'>
                                    <div className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[35rem] lg:md:max-w-[35rem] w-full pl-[2rem] pr-[1rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5'>
                                        {
                                            editName === false ?
                                                <div className='flex items-baseline'>
                                                    <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Member Name: {currentUserDataSet[1]}</span>
                                                    <button onClick={() => setEditName(true)} className='text-sm underline mx-2'>Edit</button>
                                                </div> :
                                                <>
                                                    <div className='flex flex-col sm:flex md:flex lg:hidden items-baseline'>
                                                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-0'>Member Name: </span>
                                                        <input onChange={(e) => setNewName(e.target.value)} defaultValue={currentUserDataSet[1]} maxLength={8} className="mb-3 bg-transparent outline-none border-white border-b-[1px]" />
                                                        <div className='flex'>
                                                            <button onClick={UpdateName} className='text-sm underline mr-2'>Confirm</button>
                                                            <button onClick={() => setEditName(false)} className='text-sm underline mx-2'>Cancel</button>
                                                        </div>
                                                    </div>
                                                    <div className='hidden sm:hidden md:hidden lg:flex items-baseline'>
                                                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Member Name: <input onChange={(e) => setNewName(e.target.value)} defaultValue={currentUserDataSet[1]} maxLength={8} className="bg-transparent outline-none border-white border-b-[1px]" /></span>
                                                        <button onClick={UpdateName} className='text-sm underline mx-2'>Confirm</button>
                                                        <button onClick={() => setEditName(false)} className='text-sm underline mx-2'>Cancel</button>
                                                    </div>
                                                </>
                                        }
                                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Total Score: {currentLevelScoreDataSet.reduce((total, currentValue) => total + currentValue, 0)}</span>
                                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Space Coin: {currentUserDataSet[6]}</span>
                                        <span className='text-md sm:text-md md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>Position: {currentUserDataSet[4]}</span>
                                        <div className='flex justify-between'>
                                            <div className='flex justify-between items-center w-full max-w-[6rem] sm:max-w-[6rem] md:max-w-[9rem] lg:max-w-[9rem]'>
                                                <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[4.5rem] sm:max-w-[4.5rem] md:max-w-[7rem] lg:max-w-[7rem] w-full">
                                                    <div>
                                                        <button onClick={Logout} className='w-full h-[2.5rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 text-sm sm:text-sm md:text-[18px] lg:text-[18px]'>LOGOUT</button>
                                                    </div>
                                                </div>
                                                <div className='ml-[0.5rem]'>
                                                    <button onClick={() => window.location.reload()}>
                                                        <img src={Refresh} alt="Refresh" className='w-full max-w-[20px] sm:max-w-[20px] md:max-w-[25px] lg:max-w-[30px] mt-[6px]' />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='self-end'>
                                                <img src={currentUserDataSet[5] >= 0 && currentUserDataSet[5] < 2200 ? Position : currentUserDataSet[5] >= 2200 && currentUserDataSet[5] < 2800 ? Private_First_Class : Sergeant} alt="" className="opacity-80 max-w-[2.5rem] sm:max-w-[2.5rem] md:max-w-[3rem] lg:max-w-[3rem]" />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        currentUserDataSet[7] !== undefined
                                            ?
                                            currentUserDataSet[7].includes("fVCZo6bIVw") && currentUserDataSet[7].includes("w1AY4atFvp")
                                                ?
                                                <div className='mt-3 flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[35rem] lg:md:max-w-[35rem] w-full pl-[1.4rem] pr-[1rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5'>
                                                    <div className='flex items-center'>
                                                        <img src={DamageX2Icon} alt="DamageX2Icon" className='w-[2.5rem] sm:w-[2.5rem] md:w-[3.5rem] lg:w-[3.5rem] mx-2' />
                                                        <img src={HealthX2Icon} alt="HealthX2Icon" className='w-[2.5rem] sm:w-[2.5rem] md:w-[3.5rem] lg:w-[3.5rem] mx-2' />
                                                    </div>
                                                </div>
                                                :
                                                currentUserDataSet[7].includes("fVCZo6bIVw") && currentUserDataSet[7].includes("w1AY4atFvp") === false
                                                    ?
                                                    <div className='mt-3 flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[35rem] lg:md:max-w-[35rem] w-full pl-[1.4rem] pr-[1rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5'>
                                                        <div className='flex items-center'>
                                                            <img src={HealthX2Icon} alt="HealthX2Icon" className='w-[2.5rem] sm:w-[2.5rem] md:w-[3.5rem] lg:w-[3.5rem] mx-2' />
                                                        </div>
                                                    </div>
                                                    : currentUserDataSet[7].includes("fVCZo6bIVw") === false && currentUserDataSet[7].includes("w1AY4atFvp")
                                                        ?
                                                        <div className='mt-3 flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[35rem] lg:md:max-w-[35rem] w-full pl-[1.4rem] pr-[1rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5'>
                                                            <div className='flex items-center'>
                                                                <img src={DamageX2Icon} alt="DamageX2Icon" className='w-[2.5rem] sm:w-[2.5rem] md:w-[3.5rem] lg:w-[3.5rem] mx-2' />
                                                            </div>
                                                        </div>
                                                        :
                                                        <></>
                                            :
                                            <></>
                                    }
                                </div>
                            </div>
            }
        </div >
    )
}
