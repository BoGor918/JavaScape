/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext, useRef, useEffect, useState } from 'react'
import NavBar from './NavBar'
import { MapperContext } from '../globalVariables/MapperContextProvider'
import { useNavigate } from 'react-router-dom'
import { firestore } from "../firebase"
import { doc, setDoc, collection, query, orderBy, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

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

        if (reply.current.value !== "") {
            await setDoc(doc(firestore, `Forum/${viewForum}/Reply`, docuementID), {
                Content: reply.current.value,
                ReplyUser: currentUserDataSet[1],
                PositiveVote: 0,
                NegativeVote: 0,
                PositiveVotedUser: [],
                NegativeVotedUser: [],
                CreateDate: new Date(),
            }).then(() => {
                reply.current.value = ""
            })
        } else {
            alert("Please Input Your Reply Before Submit")
        }
    }

    const PositiveVote = async (currentPositiveVote, currentNegativeVote, positiveVotedUser, negativeVotedUser, replyID) => {
        const updateReplyVotePath = `Forum/${viewForum}/Reply/`
        const updateReplyDocRef = doc(firestore, updateReplyVotePath, replyID)

        var alreadyVotedPositive = false
        for (let i = 0; i < positiveVotedUser.length; i++) {
            if (positiveVotedUser[i] === currentUserDataSet[1]) {
                alreadyVotedPositive = true
            }
        }

        var alreadyVotedNegative = false
        for (let i = 0; i < negativeVotedUser.length; i++) {
            if (negativeVotedUser[i] === currentUserDataSet[1]) {
                alreadyVotedNegative = true
            }
        }

        if (alreadyVotedPositive === false) {
            updateDoc(updateReplyDocRef, { PositiveVote: currentPositiveVote + 1 })
            updateDoc(updateReplyDocRef, { PositiveVotedUser: arrayUnion(currentUserDataSet[1]) })
        } else if (positiveVotedUser.length === 0) {
            updateDoc(updateReplyDocRef, { PositiveVote: currentPositiveVote + 1 })
            updateDoc(updateReplyDocRef, { PositiveVotedUser: arrayUnion(currentUserDataSet[1]) })
        }

        if (alreadyVotedNegative === true) {
            updateDoc(updateReplyDocRef, { PositiveVote: currentPositiveVote + 1 })
            updateDoc(updateReplyDocRef, { PositiveVotedUser: arrayUnion(currentUserDataSet[1]) })
            updateDoc(updateReplyDocRef, { NegativeVote: currentNegativeVote - 1 })
            updateDoc(updateReplyDocRef, { NegativeVotedUser: arrayRemove(currentUserDataSet[1]) })
        }
    }

    const NegativeVote = async (currentPositiveVote, currentNegativeVote, positiveVotedUser, negativeVotedUser, replyID) => {
        const updateReplyVotePath = `Forum/${viewForum}/Reply/`
        const updateReplyDocRef = doc(firestore, updateReplyVotePath, replyID)


        var alreadyVotedNegative = false
        for (let i = 0; i < negativeVotedUser.length; i++) {
            if (negativeVotedUser[i] === currentUserDataSet[1]) {
                alreadyVotedNegative = true
            }
        }

        var alreadyVotedPositive = false
        for (let i = 0; i < positiveVotedUser.length; i++) {
            if (positiveVotedUser[i] === currentUserDataSet[1]) {
                alreadyVotedPositive = true
            }
        }

        if (alreadyVotedNegative === false) {
            updateDoc(updateReplyDocRef, { NegativeVote: currentNegativeVote + 1 })
            updateDoc(updateReplyDocRef, { NegativeVotedUser: arrayUnion(currentUserDataSet[1]) })
        } else if (negativeVotedUser.length === 0) {
            updateDoc(updateReplyDocRef, { NegativeVote: currentNegativeVote + 1 })
            updateDoc(updateReplyDocRef, { NegativeVotedUser: arrayUnion(currentUserDataSet[1]) })
        }


        if (alreadyVotedPositive === true) {
            updateDoc(updateReplyDocRef, { NegativeVote: currentNegativeVote + 1 })
            updateDoc(updateReplyDocRef, { NegativeVotedUser: arrayUnion(currentUserDataSet[1]) })
            updateDoc(updateReplyDocRef, { PositiveVote: currentPositiveVote - 1 })
            updateDoc(updateReplyDocRef, { PositiveVotedUser: arrayRemove(currentUserDataSet[1]) })
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
                        <div className='flex flex-col max-w-[20rem] sm:max-w-[20rem] md:max-w-[45rem] lg:md:max-w-[70rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[50px] mt-[1rem] '>
                            {/* Reply Content */}
                            {
                                replyData.map((reply) => {
                                    return (
                                        <div className='flex flex-col w-full px-[0.4rem] my-4'>
                                            <div className='flex items-center'>
                                                {
                                                    currentUserDataSet[1] === reply.ReplyUser ?
                                                        <div className='w-full max-w-[6rem] flex justify-center text-[12px]'>
                                                        </div> :
                                                        <div className='w-full max-w-[6rem] flex justify-center text-[12px]'>
                                                            {
                                                                reply.PositiveVotedUser.includes(currentUserDataSet[1]) ?
                                                                    <button onClick={() => PositiveVote(reply.PositiveVote, reply.NegativeVote, reply.PositiveVotedUser, reply.NegativeVotedUser, reply.id)} className='p-1 mx-2 border-[1px] border-white rounded-md text-black bg-white'>{reply.PositiveVote} &#43;</button> :
                                                                    <button onClick={() => PositiveVote(reply.PositiveVote, reply.NegativeVote, reply.PositiveVotedUser, reply.NegativeVotedUser, reply.id)} className='p-1 mx-2 border-[1px] border-white rounded-md hover:text-black hover:bg-white'>{reply.PositiveVote} &#43;</button>
                                                            }
                                                            {
                                                                reply.NegativeVotedUser.includes(currentUserDataSet[1]) ?
                                                                    <button onClick={() => NegativeVote(reply.PositiveVote, reply.NegativeVote, reply.PositiveVotedUser, reply.NegativeVotedUser, reply.id)} className='p-1 mr-2 border-[1px] border-white rounded-md text-black bg-white'>{reply.NegativeVote} &minus;</button> :
                                                                    <button onClick={() => NegativeVote(reply.PositiveVote, reply.NegativeVote, reply.PositiveVotedUser, reply.NegativeVotedUser, reply.id)} className='p-1 mr-2 border-[1px] border-white rounded-md hover:text-black hover:bg-white'>{reply.NegativeVote} &minus;</button>
                                                            }
                                                        </div>
                                                }
                                                <div className='flex flex-col'>
                                                    <span>{reply.Content}</span>
                                                    <span className='text-[12px]'>Reply By {reply.ReplyUser} {reply.CreateDate.toDate().getDate() + "/" + (reply.CreateDate.toDate().getMonth() + 1) + "/" + reply.CreateDate.toDate().getFullYear() + " " + reply.CreateDate.toDate().getHours() + ":" + reply.CreateDate.toDate().getMinutes()}</span>
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
