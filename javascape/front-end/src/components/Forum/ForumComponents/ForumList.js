import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ForumList({ listData }) {
    // navigate function
    const navigate = useNavigate()

    return (
        <>
            {
                listData.map((forum, i) => {
                    return (
                        <div key={i} onClick={() => navigate(`/forum/${forum.id}`)} className='flex justify-center my-[1rem] hover:bg-black/20 rounded-lg px-[7px] sm:px-[7px] md:px-5 lg:px-5 py-[5px] cursor-pointer'>
                            <div className='w-full max-w-[2.5rem] flex flex-col justify-center text-[12px] font-extrabold'>
                                <div className=''>{forum.PositiveVote} &#43;</div>
                                <div className=''>{forum.NegativeVote} &minus;</div>
                            </div>
                            <div className='w-full flex flex-col justify-center text-gray-300'>
                                <span className='hidden sm:hidden md:block lg:block break-words text-justify text-sm sm:text-sm md:text-xl lg:text-xl text-white font-extrabold'>
                                    {
                                        forum.Question.length >= 50 ? forum.Question.substring(0, 50) + "..." : forum.Question 
                                    }
                                </span>
                                <span className='block sm:block md:hidden lg:hidden break-words text-justify text-sm sm:text-sm md:text-xl lg:text-xl text-white font-extrabold'>
                                    {
                                        forum.Question.length >= 30 ? forum.Question.substring(0, 30) + "..." : forum.Question
                                    }
                                </span>
                                <div className='text-[12px]'>
                                    <span>Create By {forum.CreateUser} {forum.CreateDate.toDate().getDate() + "/" + (forum.CreateDate.toDate().getMonth() + 1) + "/" + forum.CreateDate.toDate().getFullYear() + " "}</span>
                                    <span>{forum.CreateDate.toDate().getHours() < 10 ? "0" + forum.CreateDate.toDate().getHours() + ":" : forum.CreateDate.toDate().getHours() + ":"}</span>
                                    <span>{forum.CreateDate.toDate().getMinutes() < 10 ? "0" + forum.CreateDate.toDate().getMinutes() : forum.CreateDate.toDate().getMinutes()}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
