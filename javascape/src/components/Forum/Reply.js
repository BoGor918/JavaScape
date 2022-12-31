/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext, useRef, useEffect, useState } from 'react'
import { MapperContext } from '../../globalVariables/MapperContextProvider'
import { useNavigate } from 'react-router-dom'
import { firestore } from "../../firebase"
import { doc, setDoc, collection, query, orderBy, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

export default function ReplyToReply({ replyReplyID }) {
    // call data from mapper context js
    const {
        authUser,
        currentUserDataSet
    } = useContext(MapperContext)

    // navigate function
    const navigate = useNavigate();

    // Get forum id from url
    const viewForum = window.location.pathname.replace("/forum/", "")

    // Reply Input
    const reply = useRef("");

    // Reply Collection
    const replyCollectionRef = collection(firestore, `Forum/${viewForum}/Comment/${replyReplyID}/Reply`)
    const [replyData, setReplyData] = useState([])

    // Get Reply Data
    useEffect(() => {
        const q = query(replyCollectionRef, orderBy("CreateDate", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setReplyData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
        return unsub;
    }, [authUser]);

    // Comment Submit Function
    const SubmitReply = async () => {
        const today = new Date()
        const timeCode = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds()
        const docuementID = currentUserDataSet[1] + "-" + "ReplyTo" + "-" + replyReplyID + "-" + timeCode

        if (reply.current.value !== "") {
            await setDoc(doc(firestore, `Forum/${viewForum}/Comment/${replyReplyID}/Reply`, docuementID), {
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

    // Reply Vote Function - Positive Vote
    const ReplyPositiveVote = async (currentPositiveVote, currentNegativeVote, positiveVotedUser, negativeVotedUser, replyID) => {
        const updateReplyReplyVotePath = `Forum/${viewForum}/Comment/${replyReplyID}/Reply`
        const updateReplyReplyDocRef = doc(firestore, updateReplyReplyVotePath, replyID)

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
            updateDoc(updateReplyReplyDocRef, { PositiveVote: currentPositiveVote + 1 })
            updateDoc(updateReplyReplyDocRef, { PositiveVotedUser: arrayUnion(currentUserDataSet[1]) })
        }
        // if user already voted to positive and he click positive again remove 1 from positive vote and remove user from positive voted user
        else {
            updateDoc(updateReplyReplyDocRef, { PositiveVote: currentPositiveVote - 1 })
            updateDoc(updateReplyReplyDocRef, { PositiveVotedUser: arrayRemove(currentUserDataSet[1]) })
        }

        // if user already voted to negative and he click positive remove 1 from negative vote and remove user from negative voted user and add 1 to positive vote and add user to positive voted user
        if (alreadyVotedNegative === true) {
            updateDoc(updateReplyReplyDocRef, { PositiveVote: currentPositiveVote + 1 })
            updateDoc(updateReplyReplyDocRef, { PositiveVotedUser: arrayUnion(currentUserDataSet[1]) })
            updateDoc(updateReplyReplyDocRef, { NegativeVote: currentNegativeVote - 1 })
            updateDoc(updateReplyReplyDocRef, { NegativeVotedUser: arrayRemove(currentUserDataSet[1]) })
        }
    }

    // Reply Vote Function - Negative Vote
    const ReplyNegativeVote = async (currentPositiveVote, currentNegativeVote, positiveVotedUser, negativeVotedUser, replyID) => {
        const updateReplyReplyVotePath = `Forum/${viewForum}/Comment/${replyReplyID}/Reply`
        const updateReplyReplyDocRef = doc(firestore, updateReplyReplyVotePath, replyID)

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
            updateDoc(updateReplyReplyDocRef, { NegativeVote: currentNegativeVote + 1 })
            updateDoc(updateReplyReplyDocRef, { NegativeVotedUser: arrayUnion(currentUserDataSet[1]) })
        }
        // if user already voted to negative and he click negative again remove 1 from negative vote and remove user from negative voted user
        else {
            updateDoc(updateReplyReplyDocRef, { NegativeVote: currentNegativeVote - 1 })
            updateDoc(updateReplyReplyDocRef, { NegativeVotedUser: arrayRemove(currentUserDataSet[1]) })
        }

        // if user already voted to positive and he click negative remove 1 from positive vote and remove user from positive voted user and add 1 to negative vote and add user to negative voted user
        if (alreadyVotedPositive === true) {
            updateDoc(updateReplyReplyDocRef, { NegativeVote: currentNegativeVote + 1 })
            updateDoc(updateReplyReplyDocRef, { NegativeVotedUser: arrayUnion(currentUserDataSet[1]) })
            updateDoc(updateReplyReplyDocRef, { PositiveVote: currentPositiveVote - 1 })
            updateDoc(updateReplyReplyDocRef, { PositiveVotedUser: arrayRemove(currentUserDataSet[1]) })
        }
    }

    return (
        <div className=''>
            {/* Reply Content */}
            {
                replyData.map((reply) => {
                    return (
                        <div className='flex flex-col w-full pl-[5rem] my-4'>
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
                                        <span>Reply By </span>
                                        <span onClick={() => navigate(`/profile/${reply.ReplyUser}`)} className='hover:underline cursor-pointer'>{reply.ReplyUser}</span>
                                        <span> {reply.CreateDate.toDate().getDate() + "/" + (reply.CreateDate.toDate().getMonth() + 1) + "/" + reply.CreateDate.toDate().getFullYear() + " "}</span>
                                        <span>{reply.CreateDate.toDate().getHours() < 10 ? "0" + reply.CreateDate.toDate().getHours() + ":" : reply.CreateDate.toDate().getHours() + ":"}</span>
                                        <span>{reply.CreateDate.toDate().getMinutes() < 10 ? "0" + reply.CreateDate.toDate().getMinutes() : reply.CreateDate.toDate().getMinutes()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {/* New Comment */}
            <div className='w-full max-w-[56.8rem] ml-auto'>
                <textarea ref={reply} type="reply" placeholder='Type Your Reply Here......' className='text-justify bg-transparent focus:outline-none flex flex-col max-w-[20rem] sm:max-w-[20rem] md:max-w-[45rem] lg:md:max-w-[70rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[70px] mt-[1rem] placeholder-white' />
                {/* Submit Button */}
                <div className="w-full max-w-[69.8rem] pt-5 flex justify-start">
                    <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                        <div>
                            <button onClick={SubmitReply} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Submit Your Reply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
