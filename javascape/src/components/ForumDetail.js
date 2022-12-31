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

    // Get Reply Data
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

    // Vote Function - Positive Vote
    const PositiveVote = async (currentPositiveVote, currentNegativeVote, positiveVotedUser, negativeVotedUser) => {
        const updateDocRef = doc(firestore, "Forum", viewForum)

        // check if user already voted to positive
        var alreadyVotedPositive = false
        for (let i = 0; i < positiveVotedUser.length; i++) {
            if (positiveVotedUser[i] === currentUserDataSet[1]) {
                alreadyVotedPositive = true
            }
        }

        // check if user already voted to negative
        var alreadyVotedNegative = false
        for (let i = 0; i < negativeVotedUser.length; i++) {
            if (negativeVotedUser[i] === currentUserDataSet[1]) {
                alreadyVotedNegative = true
            }
        }

        // if user not voted to positive yet add 1 to positive vote and add user to positive voted user
        if (alreadyVotedPositive === false) {
            updateDoc(updateDocRef, { PositiveVote: currentPositiveVote + 1 })
            updateDoc(updateDocRef, { PositiveVotedUser: arrayUnion(currentUserDataSet[1]) })
        }
        // if user already voted to positive and he click positive again remove 1 from positive vote and remove user from positive voted user
        else if (alreadyVotedPositive === true) {
            updateDoc(updateDocRef, { PositiveVote: currentPositiveVote - 1 })
            updateDoc(updateDocRef, { PositiveVotedUser: arrayRemove(currentUserDataSet[1]) })
        }
        // if user already voted to negative and he click positive remove 1 from negative vote and remove user from negative voted user and add 1 to positive vote and add user to positive voted user
        else if (alreadyVotedNegative === true) {
            updateDoc(updateDocRef, { PositiveVote: currentPositiveVote + 1 })
            updateDoc(updateDocRef, { PositiveVotedUser: arrayUnion(currentUserDataSet[1]) })
            updateDoc(updateDocRef, { NegativeVote: currentNegativeVote - 1 })
            updateDoc(updateDocRef, { NegativeVotedUser: arrayRemove(currentUserDataSet[1]) })
        }
    }

    // Vote Function - Negative Vote
    const NegativeVote = async (currentPositiveVote, currentNegativeVote, positiveVotedUser, negativeVotedUser) => {
        const updateDocRef = doc(firestore, "Forum", viewForum)

        // check if user already voted to negative
        var alreadyVotedNegative = false
        for (let i = 0; i < negativeVotedUser.length; i++) {
            if (negativeVotedUser[i] === currentUserDataSet[1]) {
                alreadyVotedNegative = true
            }
        }

        // check if user already voted to positive
        var alreadyVotedPositive = false
        for (let i = 0; i < positiveVotedUser.length; i++) {
            if (positiveVotedUser[i] === currentUserDataSet[1]) {
                alreadyVotedPositive = true
            }
        }

        // if user not voted to negative yet add 1 to negative vote and add user to negative voted user
        if (alreadyVotedNegative === false) {
            updateDoc(updateDocRef, { NegativeVote: currentNegativeVote + 1 })
            updateDoc(updateDocRef, { NegativeVotedUser: arrayUnion(currentUserDataSet[1]) })
        }
        // if user already voted to negative and he click negative again remove 1 from negative vote and remove user from negative voted user
        else if (alreadyVotedNegative === true) {
            updateDoc(updateDocRef, { NegativeVote: currentNegativeVote - 1 })
            updateDoc(updateDocRef, { NegativeVotedUser: arrayRemove(currentUserDataSet[1]) })
        }
        // if user already voted to positive and he click negative remove 1 from positive vote and remove user from positive voted user and add 1 to negative vote and add user to negative voted user
        else if (alreadyVotedPositive === true) {
            updateDoc(updateDocRef, { NegativeVote: currentNegativeVote + 1 })
            updateDoc(updateDocRef, { NegativeVotedUser: arrayUnion(currentUserDataSet[1]) })
            updateDoc(updateDocRef, { PositiveVote: currentPositiveVote - 1 })
            updateDoc(updateDocRef, { PositiveVotedUser: arrayRemove(currentUserDataSet[1]) })
        }
    }

    // Reply Vote Function - Positive Vote
    const ReplyPositiveVote = async (currentPositiveVote, currentNegativeVote, positiveVotedUser, negativeVotedUser, replyID) => {
        const updateReplyVotePath = `Forum/${viewForum}/Reply/`
        const updateReplyDocRef = doc(firestore, updateReplyVotePath, replyID)

        // check if user already voted to positive
        var alreadyVotedPositive = false
        for (let i = 0; i < positiveVotedUser.length; i++) {
            if (positiveVotedUser[i] === currentUserDataSet[1]) {
                alreadyVotedPositive = true
            }
        }

        // check if user already voted to negative
        var alreadyVotedNegative = false
        for (let i = 0; i < negativeVotedUser.length; i++) {
            if (negativeVotedUser[i] === currentUserDataSet[1]) {
                alreadyVotedNegative = true
            }
        }

        // if user not voted to positive yet add 1 to positive vote and add user to positive voted user
        if (alreadyVotedPositive === false) {
            updateDoc(updateReplyDocRef, { PositiveVote: currentPositiveVote + 1 })
            updateDoc(updateReplyDocRef, { PositiveVotedUser: arrayUnion(currentUserDataSet[1]) })
        }
        // if user already voted to positive and he click positive again remove 1 from positive vote and remove user from positive voted user
        else if (alreadyVotedPositive === true) {
            updateDoc(updateReplyDocRef, { PositiveVote: currentPositiveVote - 1 })
            updateDoc(updateReplyDocRef, { PositiveVotedUser: arrayRemove(currentUserDataSet[1]) })
        }
        // if user already voted to negative and he click positive remove 1 from negative vote and remove user from negative voted user and add 1 to positive vote and add user to positive voted user
        else if (alreadyVotedNegative === true) {
            updateDoc(updateReplyDocRef, { PositiveVote: currentPositiveVote + 1 })
            updateDoc(updateReplyDocRef, { PositiveVotedUser: arrayUnion(currentUserDataSet[1]) })
            updateDoc(updateReplyDocRef, { NegativeVote: currentNegativeVote - 1 })
            updateDoc(updateReplyDocRef, { NegativeVotedUser: arrayRemove(currentUserDataSet[1]) })
        }
    }

    // Reply Vote Function - Negative Vote
    const ReplyNegativeVote = async (currentPositiveVote, currentNegativeVote, positiveVotedUser, negativeVotedUser, replyID) => {
        const updateReplyVotePath = `Forum/${viewForum}/Reply/`
        const updateReplyDocRef = doc(firestore, updateReplyVotePath, replyID)

        // check if user already voted to negative
        var alreadyVotedNegative = false
        for (let i = 0; i < negativeVotedUser.length; i++) {
            if (negativeVotedUser[i] === currentUserDataSet[1]) {
                alreadyVotedNegative = true
            }
        }

        // check if user already voted to positive
        var alreadyVotedPositive = false
        for (let i = 0; i < positiveVotedUser.length; i++) {
            if (positiveVotedUser[i] === currentUserDataSet[1]) {
                alreadyVotedPositive = true
            }
        }

        // if user not voted to negative yet add 1 to negative vote and add user to negative voted user
        if (alreadyVotedNegative === false) {
            updateDoc(updateReplyDocRef, { NegativeVote: currentNegativeVote + 1 })
            updateDoc(updateReplyDocRef, { NegativeVotedUser: arrayUnion(currentUserDataSet[1]) })
        }
        // if user already voted to negative and he click negative again remove 1 from negative vote and remove user from negative voted user
        else if (alreadyVotedNegative === true) {
            updateDoc(updateReplyDocRef, { NegativeVote: currentNegativeVote - 1 })
            updateDoc(updateReplyDocRef, { NegativeVotedUser: arrayRemove(currentUserDataSet[1]) })
        }
        // if user already voted to positive and he click negative remove 1 from positive vote and remove user from positive voted user and add 1 to negative vote and add user to negative voted user
        else if (alreadyVotedPositive === true) {
            updateDoc(updateReplyDocRef, { NegativeVote: currentNegativeVote + 1 })
            updateDoc(updateReplyDocRef, { NegativeVotedUser: arrayUnion(currentUserDataSet[1]) })
            updateDoc(updateReplyDocRef, { PositiveVote: currentPositiveVote - 1 })
            updateDoc(updateReplyDocRef, { PositiveVotedUser: arrayRemove(currentUserDataSet[1]) })
        }
    }

    return (
        <div className='ForumDetail bg-[#09002B] bg-background text-white font-exo h-screen'>
            <NavBar />
            {/* Content */}
            <div className='w-full h-full overflow-auto flex flex-col items-center'>
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
                    {/* Question deatil and vote */}
                    {
                        forumData.map((forum) => {
                            if (forum.id === viewForum)
                                return (
                                    <div className="w-full max-w-[69.8rem] pb-5 flex justify-start items-center">
                                        <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                                            <div>
                                                <button onClick={() => navigate(-1)} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Back</button>
                                            </div>
                                        </div>
                                        <div className='ml-2 font-extrabold'>
                                            <span>Create By {forum.ReplyUser} {forum.CreateDate.toDate().getDate() + "/" + (forum.CreateDate.toDate().getMonth() + 1) + "/" + forum.CreateDate.toDate().getFullYear() + " "}</span>
                                            <span>{forum.CreateDate.toDate().getHours() < 10 ? "0" + forum.CreateDate.toDate().getHours() + ":" : forum.CreateDate.toDate().getHours() + ":"}</span>
                                            <span>{forum.CreateDate.toDate().getMinutes() < 10 ? "0" + forum.CreateDate.toDate().getMinutes() : forum.CreateDate.toDate().getMinutes()}</span>
                                        </div>
                                        {
                                            currentUserDataSet[1] === forum.CreateUser ?
                                                <></> :
                                                <>
                                                    {
                                                        forum.PositiveVotedUser.includes(currentUserDataSet[1]) ?
                                                            <button onClick={() => PositiveVote(forum.PositiveVote, forum.NegativeVote, forum.PositiveVotedUser, forum.NegativeVotedUser)} className='p-1 mx-2 border-[1px] border-white rounded-md text-black bg-white'>{forum.PositiveVote} &#43;</button> :
                                                            <button onClick={() => PositiveVote(forum.PositiveVote, forum.NegativeVote, forum.PositiveVotedUser, forum.NegativeVotedUser, "forum")} className='p-1 mx-2 border-[1px] border-white rounded-md hover:text-black hover:bg-white'>{forum.PositiveVote} &#43;</button>
                                                    }
                                                    {
                                                        forum.NegativeVotedUser.includes(currentUserDataSet[1]) ?
                                                            <button onClick={() => NegativeVote(forum.PositiveVote, forum.NegativeVote, forum.PositiveVotedUser, forum.NegativeVotedUser)} className='p-1 mr-2 border-[1px] border-white rounded-md text-black bg-white'>{forum.NegativeVote} &minus;</button> :
                                                            <button onClick={() => NegativeVote(forum.PositiveVote, forum.NegativeVote, forum.PositiveVotedUser, forum.NegativeVotedUser)} className='p-1 mr-2 border-[1px] border-white rounded-md hover:text-black hover:bg-white'>{forum.NegativeVote} &minus;</button>
                                                    }

                                                </>
                                        }
                                    </div>
                                )
                        })
                    }
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
                        {/* Reply column */}
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
                                                                    <button onClick={() => ReplyPositiveVote(reply.PositiveVote, reply.NegativeVote, reply.PositiveVotedUser, reply.NegativeVotedUser, reply.id)} className='p-1 mx-2 border-[1px] border-white rounded-md text-black bg-white'>{reply.PositiveVote} &#43;</button> :
                                                                    <button onClick={() => ReplyPositiveVote(reply.PositiveVote, reply.NegativeVote, reply.PositiveVotedUser, reply.NegativeVotedUser, reply.id)} className='p-1 mx-2 border-[1px] border-white rounded-md hover:text-black hover:bg-white'>{reply.PositiveVote} &#43;</button>
                                                            }
                                                            {
                                                                reply.NegativeVotedUser.includes(currentUserDataSet[1]) ?
                                                                    <button onClick={() => ReplyNegativeVote(reply.PositiveVote, reply.NegativeVote, reply.PositiveVotedUser, reply.NegativeVotedUser, reply.id)} className='p-1 mr-2 border-[1px] border-white rounded-md text-black bg-white'>{reply.NegativeVote} &minus;</button> :
                                                                    <button onClick={() => ReplyNegativeVote(reply.PositiveVote, reply.NegativeVote, reply.PositiveVotedUser, reply.NegativeVotedUser, reply.id)} className='p-1 mr-2 border-[1px] border-white rounded-md hover:text-black hover:bg-white'>{reply.NegativeVote} &minus;</button>
                                                            }
                                                        </div>
                                                }
                                                <div className='flex flex-col'>
                                                    <span>{reply.Content}</span>
                                                    <div className='text-[12px]'>
                                                        <span>Reply By {reply.ReplyUser} {reply.CreateDate.toDate().getDate() + "/" + (reply.CreateDate.toDate().getMonth() + 1) + "/" + reply.CreateDate.toDate().getFullYear() + " "}</span>
                                                        <span>{reply.CreateDate.toDate().getHours() < 10 ? "0" + reply.CreateDate.toDate().getHours() + ":" : reply.CreateDate.toDate().getHours() + ":"}</span>
                                                        <span>{reply.CreateDate.toDate().getMinutes() < 10 ? "0" + reply.CreateDate.toDate().getMinutes() : reply.CreateDate.toDate().getMinutes()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* New Reply */}
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
