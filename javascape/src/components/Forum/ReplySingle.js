/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext, useRef, useState } from 'react'
import { MapperContext } from '../../globalVariables/MapperContextProvider'
import { useNavigate } from 'react-router-dom'
import { firestore } from "../../firebase"
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

const ReplySingle = ({ data, replyReplyID }) => {
    // call data from mapper context js
    const {
        currentUserDataSet
    } = useContext(MapperContext)

    // navigate function
    const navigate = useNavigate();

    // Get forum id from url
    const viewForum = window.location.pathname.replace("/forum/", "")

    // Reply Input
    const reply = useRef("");

    // Comment Submit Function
    const SubmitReply = async () => {
        const today = new Date()
        const timeCode = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds()
        const docuementID = currentUserDataSet[1] + "-" + "ReplyTo" + "-" + replyReplyID + "-" + timeCode

        await setDoc(doc(firestore, `Forum/${viewForum}/Comment/${replyReplyID}/Reply`, docuementID), {
            Content: reply.current.value,
            ReplyUser: currentUserDataSet[1],
            ReplyTo: currentReplyName,
            PositiveVote: 0,
            NegativeVote: 0,
            PositiveVotedUser: [],
            NegativeVotedUser: [],
            CreateDate: new Date(),
        }).then(() => {
            reply.current.value = ""
            setCollapse(false)
        })
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

    // For reply input
    const [collapse, setCollapse] = useState(false);
    const [currentReplyName, setCurrentReplyName] = useState('')

    const setReply = (replyName) => {
        setCollapse(!collapse)
        setCurrentReplyName(replyName)
    }

    return (
        <div className=''>
            {/* Reply Content */}

            <div className='flex flex-col w-full pl-[5rem] my-4'>
                <div className='flex items-center'>
                    {
                        currentUserDataSet[1] === data.ReplyUser ?
                            <div className='w-full max-w-[6rem] flex justify-center text-[12px]'>
                            </div> :
                            <div className='w-full max-w-[6rem] flex justify-center text-[12px]'>
                                {
                                    data.PositiveVotedUser.includes(currentUserDataSet[1]) ?
                                        <button onClick={() => ReplyPositiveVote(data.PositiveVote, data.NegativeVote, data.PositiveVotedUser, data.NegativeVotedUser, data.id)} className='p-1 mx-2 border-[1px] border-white rounded-md text-black bg-white'>{data.PositiveVote} &#43;</button> :
                                        <button onClick={() => ReplyPositiveVote(data.PositiveVote, data.NegativeVote, data.PositiveVotedUser, data.NegativeVotedUser, data.id)} className='p-1 mx-2 border-[1px] border-white rounded-md hover:text-black hover:bg-white'>{data.PositiveVote} &#43;</button>
                                }
                                {
                                    data.NegativeVotedUser.includes(currentUserDataSet[1]) ?
                                        <button onClick={() => ReplyNegativeVote(data.PositiveVote, data.NegativeVote, data.PositiveVotedUser, data.NegativeVotedUser, data.id)} className='p-1 mr-2 border-[1px] border-white rounded-md text-black bg-white'>{data.NegativeVote} &minus;</button> :
                                        <button onClick={() => ReplyNegativeVote(data.PositiveVote, data.NegativeVote, data.PositiveVotedUser, data.NegativeVotedUser, data.id)} className='p-1 mr-2 border-[1px] border-white rounded-md hover:text-black hover:bg-white'>{data.NegativeVote} &minus;</button>
                                }
                            </div>
                    }
                    <div className='flex flex-col'>
                        <div>
                            <span className='font-extrabold'>@</span>
                            {
                                currentUserDataSet[1] === data.ReplyTo ?
                                    <span onClick={() => navigate(`/profile`)} className='font-extrabold hover:underline cursor-pointer'>{data.ReplyTo}</span> :
                                    <span onClick={() => navigate(`/profile/${data.ReplyTo}`)} className='font-extrabold hover:underline cursor-pointer'>{data.ReplyTo}</span>
                            }
                            <span> {data.Content}</span>
                        </div>
                        <div className='text-[12px] text-gray-300'>
                            <span>Reply By </span>
                            {
                                currentUserDataSet[1] === data.ReplyUser ?
                                    <span onClick={() => navigate(`/profile`)} className='hover:underline cursor-pointer'>{data.ReplyUser}</span> :
                                    <span onClick={() => navigate(`/profile/${data.ReplyUser}`)} className='hover:underline cursor-pointer'>{data.ReplyUser}</span>
                            }
                            <span> {data.CreateDate.toDate().getDate() + "/" + (data.CreateDate.toDate().getMonth() + 1) + "/" + data.CreateDate.toDate().getFullYear() + " "}</span>
                            <span>{data.CreateDate.toDate().getHours() < 10 ? "0" + data.CreateDate.toDate().getHours() + ":" : data.CreateDate.toDate().getHours() + ":"}</span>
                            <span>{data.CreateDate.toDate().getMinutes() < 10 ? "0" + data.CreateDate.toDate().getMinutes() : data.CreateDate.toDate().getMinutes()}</span>
                            <span> - </span>
                            {
                                collapse ?
                                    <span onClick={() => setReply(data.ReplyUser)} className='hover:underline cursor-pointer'>Cancel Reply</span> :
                                    <span onClick={() => setReply(data.ReplyUser)} className='hover:underline cursor-pointer'>Reply</span>
                            }

                        </div>
                    </div>
                </div>
            </div>
            {/* New Reply with target user */}
            {
                collapse && (
                    <div className='w-full max-w-[46.8rem] ml-auto'>
                        <textarea ref={reply} type="reply" placeholder='Type Your Reply Here......' className='text-justify bg-transparent focus:outline-none flex flex-col max-w-[20rem] sm:max-w-[20rem] md:max-w-[45rem] lg:md:max-w-[70rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[70px] mt-[1rem] placeholder-white' />
                        {/* Submit Button */}
                        <div className="w-full max-w-[69.8rem] pt-5 flex justify-start">
                            <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                                <div>
                                    <button onClick={SubmitReply} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Reply To {currentReplyName}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ReplySingle