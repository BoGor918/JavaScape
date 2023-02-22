import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RankList({ listData, currentUserDataSet }) {
    // navigate function
    const navigate = useNavigate()

    return (
        <>
            {
                listData.map((user, index) => {
                    return (
                        <div key={index}>
                            {
                                user.Username === currentUserDataSet[1] ?
                                    <div onClick={() => navigate("/profile")} className='flex justify-between hover:bg-black/20 rounded-lg cursor-pointer'>
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
                                    </div> :
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
                            }
                        </div>
                    )
                })
            }
        </>
    )
}
