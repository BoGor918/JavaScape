/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext, useRef, useEffect, useState } from 'react'
import NavBar from './NavBar'
import { MapperContext } from '../globalVariables/MapperContextProvider'
import { useNavigate } from 'react-router-dom'
import { firestore } from "../firebase"
import { doc, setDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore'

export default function ForumDetail() {
    // call data from mapper context js
    const {
        forumData,
        authUser,
        currentUserDataSet
    } = useContext(MapperContext)

    // navigate function
    const navigate = useNavigate();

    // Get forum id from url
    const viewForum = window.location.pathname.replace("/forum/", "")

    // forum detail variable
    const reply = useRef("");

    // Reply Collection
    const replyCollectionRef = collection(firestore, `Forum/${viewForum}/Reply`)
    const [replyData, setReplyData] = useState([])

    useEffect(() => {
        const q = query(replyCollectionRef, orderBy("CreateDate", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setReplyData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
        return unsub;
    }, [authUser]);

    // Reply Submit Function
    const SubmitReply = async () => {
        const today = new Date()
        const timeCode = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds()
        const docuementID = currentUserDataSet[1] + "-" + "ReplyTo" + "-" + viewForum + "-" + timeCode

        const createDate = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes()

        if (reply.current.value !== "") {
            await setDoc(doc(firestore, `Forum/${viewForum}/Reply`, docuementID), {
                Content: reply.current.value,
                ReplyUser: currentUserDataSet[1],
                PositiveVote: 0,
                NegativeVote: 0,
                CreateDate: createDate,
            }).then(() => {
                reply.current.value = ""
            })
        } else {
            alert("Please Input Your Reply Before Submit")
        }
    }

    return (
        <div className='Forum bg-[#09002B] bg-background text-white font-exo h-screen'>
            <NavBar />
            {/* Content */}
            <div className='w-full h-full overflow-auto flex flex-col items-center'>
                {/* Title */}
                <div className='w-full flex flex-col items-center h-screen'>
                    {/* Title */}
                    {
                        forumData.map((forum) => {
                            if (forum.id === viewForum)
                                return (
                                    <>
                                        <span className='text-center mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>{forum.Question}</span>
                                    </>
                                )
                        })
                    }
                    {/* Back Button */}
                    <div className="w-full max-w-[69.8rem] pb-5 flex justify-start">
                        <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                            <div>
                                <button onClick={() => navigate(-1)} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Back</button>
                            </div>
                        </div>
                    </div>
                    {/* Forum Content */}
                    <div className='w-full flex flex-col justify-center items-center'>
                        <div className='flex flex-col max-w-[20rem] sm:max-w-[20rem] md:max-w-[45rem] lg:md:max-w-[70rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[50px]'>
                            {/* Forum Detail */}
                            <div className='flex justify-center my-[1rem] rounded-lg px-5 py-[5px]'>
                                {
                                    forumData.map((forum) => {
                                        if (forum.id === viewForum)
                                            return (
                                                <div className='flex flex-col'>
                                                    <a href={forum.Image} target="_blank" rel="noreferrer">
                                                        <img src={forum.Image} alt="" className='w-full object-contain cursor-pointer' />
                                                    </a>
                                                    <span className='text-justify text-white'>{forum.Description}</span>
                                                </div>
                                            )
                                    })
                                }
                            </div>
                        </div>
                        <div className='flex flex-col max-w-[20rem] sm:max-w-[20rem] md:max-w-[45rem] lg:md:max-w-[70rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[50px] mt-[1rem]'>
                            {/* Reply Content */}
                            {
                                replyData.map((reply) => {
                                    return (
                                        <div className='flex flex-col w-full px-[0.4rem] mb-4'>
                                            <div className='flex items-center'>
                                                <div className='w-full max-w-[5rem] flex justify-center text-[12px]'>
                                                    <button className='px-2'>{reply.PositiveVote} &#43;</button>
                                                    <button className='pr-2'>{reply.NegativeVote} &minus;</button>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span>{reply.Content}</span>
                                                    <span className='text-[12px]'>Reply By {reply.ReplyUser} {reply.CreateDate}</span>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* Reply Content */}
                        <textarea ref={reply} type="reply" placeholder='Type Your Reply Here......' className='text-justify bg-transparent focus:outline-none flex flex-col max-w-[20rem] sm:max-w-[20rem] md:max-w-[45rem] lg:md:max-w-[70rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[70px] mt-[1rem] placeholder-white' />
                        {/* Submit Button */}
                        <div className="w-full max-w-[69.8rem] pt-5 flex justify-start mb-[3rem] sm:mb-[3rem] lg:mb-[6rem]">
                            <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                                <div>
                                    <button onClick={SubmitReply} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Submit Your Reply</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >

    )
}
