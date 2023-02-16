/* eslint-disable no-useless-concat */
import { useNavigate } from 'react-router-dom'
import React, { useContext, useState, useRef } from 'react'
import { MapperContext } from '../../globalVariables/MapperContextProvider'
import { firestore } from "../../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove, setDoc, deleteDoc } from 'firebase/firestore'
import Reply from './Reply'

const Comment = ({ data }) => {
    // call data from mapper context js
    const {
        currentUserDataSet,
        authUser
    } = useContext(MapperContext)

    //For collapse
    const [collapse, setCollapse] = useState(false);
    const [collapse2, setCollapse2] = useState(false);

    // navigate function
    const navigate = useNavigate();

    // Get forum id from url
    const viewForum = window.location.pathname.replace("/forum/", "")

    // Reply Input
    const reply = useRef("");

    // Comment Delete Function
    if (data.NegativeVote > 20) {
        const deleteCommentVotePath = `Forum/${viewForum}/Comment/`
        const deleteCommentDocRef = doc(firestore, deleteCommentVotePath, data.id)

        deleteDoc(deleteCommentDocRef)
    }

    // Comment Submit Function
    const SubmitReply = async () => {
        if (authUser === null) {
            navigate("/login")
        } else {
            const today = new Date()
            const timeCode = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds()
            const docuementID = currentUserDataSet[1] + "-" + "ReplyTo" + "-" + data.id + "-" + timeCode

            if (reply.current.value !== "") {
                await setDoc(doc(firestore, `Forum/${viewForum}/Comment/${data.id}/Reply`, docuementID), {
                    Content: reply.current.value,
                    ReplyUser: currentUserDataSet[1],
                    ReplyTo: data.CommentUser,
                    PositiveVote: 0,
                    NegativeVote: 0,
                    PositiveVotedUser: [],
                    NegativeVotedUser: [],
                    CreateDate: new Date(),
                }).then(() => {
                    reply.current.value = ""
                    setCollapse2(false)
                })
            } else {
                alert("Please Input Your Reply Before Submit")
            }
        }
    }

    // Reply Vote Function - Positive Vote
    const CommentPositiveVote = async (currentPositiveVote, currentNegativeVote, positiveVotedUser, negativeVotedUser, replyID) => {
        if (authUser === null) {
            navigate("/login")
        } else {
            const updateReplyVotePath = `Forum/${viewForum}/Comment/`
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
            else {
                updateDoc(updateReplyDocRef, { PositiveVote: currentPositiveVote - 1 })
                updateDoc(updateReplyDocRef, { PositiveVotedUser: arrayRemove(currentUserDataSet[1]) })
            }

            // if user already voted to negative and he click positive remove 1 from negative vote and remove user from negative voted user and add 1 to positive vote and add user to positive voted user
            if (alreadyVotedNegative === true) {
                updateDoc(updateReplyDocRef, { PositiveVote: currentPositiveVote + 1 })
                updateDoc(updateReplyDocRef, { PositiveVotedUser: arrayUnion(currentUserDataSet[1]) })
                updateDoc(updateReplyDocRef, { NegativeVote: currentNegativeVote - 1 })
                updateDoc(updateReplyDocRef, { NegativeVotedUser: arrayRemove(currentUserDataSet[1]) })
            }
        }
    }

    // Reply Vote Function - Negative Vote
    const CommentNegativeVote = async (currentPositiveVote, currentNegativeVote, positiveVotedUser, negativeVotedUser, replyID) => {
        if (authUser === null) {
            navigate("/login")
        } else {
            const updateReplyVotePath = `Forum/${viewForum}/Comment/`
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
            else {
                updateDoc(updateReplyDocRef, { NegativeVote: currentNegativeVote - 1 })
                updateDoc(updateReplyDocRef, { NegativeVotedUser: arrayRemove(currentUserDataSet[1]) })
            }

            // if user already voted to positive and he click negative remove 1 from positive vote and remove user from positive voted user and add 1 to negative vote and add user to negative voted user
            if (alreadyVotedPositive === true) {
                updateDoc(updateReplyDocRef, { NegativeVote: currentNegativeVote + 1 })
                updateDoc(updateReplyDocRef, { NegativeVotedUser: arrayUnion(currentUserDataSet[1]) })
                updateDoc(updateReplyDocRef, { PositiveVote: currentPositiveVote - 1 })
                updateDoc(updateReplyDocRef, { PositiveVotedUser: arrayRemove(currentUserDataSet[1]) })
            }

            if (currentNegativeVote > 20) {
                deleteDoc(updateReplyDocRef)
            }
        }
    }

    return (
        <div className='flex flex-col w-full px-[0.4rem] my-4'>
            <div className='flex items-center'>
                {
                    currentUserDataSet[1] === data.CommentUser ?
                        <div className='w-full max-w-[6rem] flex justify-center text-[12px]'>
                        </div> :
                        <div className='w-full max-w-[6rem] flex justify-center text-[12px]'>
                            {
                                data.PositiveVotedUser.includes(currentUserDataSet[1]) ?
                                    <button onClick={() => CommentPositiveVote(data.PositiveVote, data.NegativeVote, data.PositiveVotedUser, data.NegativeVotedUser, data.id)} className='p-1 mx-2 border-[1px] border-white rounded-md text-black bg-white'>{data.PositiveVote} &#43;</button> :
                                    <button onClick={() => CommentPositiveVote(data.PositiveVote, data.NegativeVote, data.PositiveVotedUser, data.NegativeVotedUser, data.id)} className='p-1 mx-2 border-[1px] border-white rounded-md hover:text-black hover:bg-white'>{data.PositiveVote} &#43;</button>
                            }
                            {
                                data.NegativeVotedUser.includes(currentUserDataSet[1]) ?
                                    <button onClick={() => CommentNegativeVote(data.PositiveVote, data.NegativeVote, data.PositiveVotedUser, data.NegativeVotedUser, data.id)} className='p-1 mr-2 border-[1px] border-white rounded-md text-black bg-white'>{data.NegativeVote} &minus;</button> :
                                    <button onClick={() => CommentNegativeVote(data.PositiveVote, data.NegativeVote, data.PositiveVotedUser, data.NegativeVotedUser, data.id)} className='p-1 mr-2 border-[1px] border-white rounded-md hover:text-black hover:bg-white'>{data.NegativeVote} &minus;</button>
                            }
                        </div>
                }
                <div className='flex flex-col'>
                    <span>{data.Content}</span>
                    <div className='text-[12px] text-gray-300'>
                        <span>Reply By </span>
                        {
                            currentUserDataSet[1] === data.CommentUser ?
                                <span onClick={() => navigate(`/profile`)} className='hover:underline cursor-pointer'>{data.CommentUser}</span> :
                                <span onClick={() => navigate(`/profile/${data.CommentUser}`)} className='hover:underline cursor-pointer'>{data.CommentUser}</span>
                        }
                        <span> {data.CreateDate.toDate().getDate() + "/" + (data.CreateDate.toDate().getMonth() + 1) + "/" + data.CreateDate.toDate().getFullYear() + " "}</span>
                        <span>{data.CreateDate.toDate().getHours() < 10 ? "0" + data.CreateDate.toDate().getHours() + ":" : data.CreateDate.toDate().getHours() + ":"}</span>
                        <span>{data.CreateDate.toDate().getMinutes() < 10 ? "0" + data.CreateDate.toDate().getMinutes() : data.CreateDate.toDate().getMinutes()}</span>
                        <span> - </span>
                        {
                            collapse ?
                                <span onClick={() => setCollapse(prev => !prev)} className='hover:underline cursor-pointer'>Hide Reply</span> :
                                <span onClick={() => setCollapse(prev => !prev)} className='hover:underline cursor-pointer'>Show Reply</span>
                        }
                        {
                            !collapse2 ?
                                <span> - <span onClick={() => setCollapse2(prev => !prev)} className='hover:underline cursor-pointer'>Reply</span></span> :
                                <span> - <span onClick={() => setCollapse2(prev => !prev)} className='hover:underline cursor-pointer'>Cancel Reply</span></span>
                        }

                    </div>
                </div>
            </div>
            {collapse && <Reply replyReplyID={data.id} commentUser={data.CommentUser} />}
            {
                collapse2 && (
                    <div className='w-full max-w-[19.1rem] md:max-w-[31.9rem] lg:max-w-[56.9rem] ml-auto'>
                        <textarea ref={reply} type="reply" placeholder='Type Your Reply Here......' className='text-[12px] sm:text-[12px] md:text-md lg:text-[16px] text-justify bg-transparent focus:outline-none flex flex-col max-w-[20rem] sm:max-w-[20rem] md:max-w-[45rem] lg:md:max-w-[70rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-2 px-[20px] sm:py-2 sm:px-[20px] md:py-5 md:px-[70px] lg:py-5 lg:px-[70px] mt-[1rem] placeholder-white' />
                        {/* Submit Button */}
                        <div className="w-full max-w-[69.8rem] pt-2 sm:pt-2 md:pt-5 lg:pt-5 flex justify-start">
                            <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                                <div>
                                    <button onClick={SubmitReply} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Reply To {data.CommentUser}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Comment