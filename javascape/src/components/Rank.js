/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import NavBar from './NavBar'
import { MapperContext } from '../globalVariables/MapperContextProvider'
import { useNavigate } from 'react-router-dom'
import { query, orderBy, onSnapshot } from 'firebase/firestore'

export default function Rank() {
    // call data from mapper context js
    const {
        authUser,
        usersCollectionRef
    } = useContext(MapperContext)

    const [userData, setUserData] = React.useState([]);

    // navigate function
    const navigate = useNavigate();

    useEffect(() => {
        const q = query(usersCollectionRef, orderBy("TotalScore", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setUserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
        return unsub;
    }, [authUser]);

    return (
        <div className='Rank bg-[#09002B] bg-background text-white font-exo h-screen'>
            <NavBar />
            {/* Content */}
            <div className='w-full h-full overflow-auto flex flex-col items-center uppercase'>
                {/* Title */}
                <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>Who is the best ?</span>
                {/* Rank Content */}
                <div className='w-full flex flex-col justify-center items-center mb-[3rem] sm:mb-[3rem] lg:mb-[6rem]'>
                    <div className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:md:max-w-[55rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5 px-5'>
                        {/* Rank Lable */}
                        <div className='flex justify-between'>
                            <div className='w-full flex justify-center'>
                                <span className='text-sm sm:text-sm md:text-xl lg:text-2xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                    Rank
                                </span>
                            </div>
                            <div className='w-full flex justify-center'>
                                <span className='text-sm sm:text-sm md:text-xl lg:text-2xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                    Username
                                </span>
                            </div>
                            <div className='w-full flex justify-center'>
                                <span className='text-sm sm:text-sm md:text-xl lg:text-2xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                    Total Score
                                </span>
                            </div>
                        </div>
                        {/* Rank Table */}
                        {
                            userData.map((user, index) => {
                                return (
                                    <div onClick={() => navigate(`/profile/${user.Username}`)} className='flex justify-between hover:bg-black/20 rounded-lg cursor-pointer'>
                                        <div className='w-full flex justify-center'>
                                            <span className='text-sm sm:text-sm md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                                {index + 1}
                                            </span>
                                        </div>
                                        <div className='w-full flex justify-center'>
                                            <span className='text-sm sm:text-sm md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                                {user.Username}
                                            </span>
                                        </div>
                                        <div className='w-full flex justify-center'>
                                            <span className='text-sm sm:text-sm md:text-xl lg:text-xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                                {user.TotalScore}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
