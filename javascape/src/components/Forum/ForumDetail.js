/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext, useRef, useEffect, useState } from 'react'
import NavBar from '../NavBar'
import { MapperContext } from '../../globalVariables/MapperContextProvider'
import { useNavigate } from 'react-router-dom'
import { firestore } from "../../firebase"
import { doc, setDoc, collection, query, orderBy, onSnapshot, updateDoc, arrayUnion, arrayRemove, addDoc } from 'firebase/firestore'
import Comment from "./Comment";

export default function ForumDetail() {
    // call data from mapper context js
    const {
        forumData,
        authUser,
        currentUserDataSet
    } = useContext(MapperContext)

    // navigate function
    const navigate = useNavigate();

    // get forum id from url
    const viewForum = window.location.pathname.replace("/forum/", "")

    // for comments
    const comment = useRef("");
    const commentCollectionRef = collection(firestore, `Forum/${viewForum}/Comment`)
    const [commentData, setCommentData] = useState([]);

    // Get Comment Data
    useEffect(() => {
        const q = query(commentCollectionRef, orderBy("CreateDate", "asc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setCommentData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
        return unsub;
    }, [authUser]);

    // Comment Submit Function
    const SubmitComment = async () => {
        const today = new Date()
        const timeCode = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds()
        const docuementID = currentUserDataSet[1] + "-" + "CommentTo" + "-" + viewForum + "-" + timeCode

        // add reply to reply sub collection
        const replyRef = collection(firestore, 'Forum/' + viewForum + '/Comment' + '/' + docuementID + '/Reply');

        if (comment.current.value !== "") {
            await setDoc(doc(firestore, `Forum/${viewForum}/Comment`, docuementID), {
                Content: comment.current.value,
                CommentUser: currentUserDataSet[1],
                PositiveVote: 0,
                NegativeVote: 0,
                PositiveVotedUser: [],
                NegativeVotedUser: [],
                CreateDate: new Date(),
            }).then(() => {
                addDoc(replyRef, {
                    Reply: "Reply",
                })
                comment.current.value = ""
            })
        } else {
            alert("Please Input Your Reply Before Submit")
        }
    }

    // Vote Function - Positive Vote
    const ForumPositiveVote = async (currentPositiveVote, currentNegativeVote, positiveVotedUser, negativeVotedUser) => {
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
        else {
            updateDoc(updateDocRef, { PositiveVote: currentPositiveVote - 1 })
            updateDoc(updateDocRef, { PositiveVotedUser: arrayRemove(currentUserDataSet[1]) })
        }

        // if user already voted to negative and he click positive remove 1 from negative vote and remove user from negative voted user and add 1 to positive vote and add user to positive voted user
        if (alreadyVotedNegative === true) {
            updateDoc(updateDocRef, { PositiveVote: currentPositiveVote + 1 })
            updateDoc(updateDocRef, { PositiveVotedUser: arrayUnion(currentUserDataSet[1]) })
            updateDoc(updateDocRef, { NegativeVote: currentNegativeVote - 1 })
            updateDoc(updateDocRef, { NegativeVotedUser: arrayRemove(currentUserDataSet[1]) })
        }
    }

    // Vote Function - Negative Vote
    const ForumNegativeVote = async (currentPositiveVote, currentNegativeVote, positiveVotedUser, negativeVotedUser) => {
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
        else {
            updateDoc(updateDocRef, { NegativeVote: currentNegativeVote - 1 })
            updateDoc(updateDocRef, { NegativeVotedUser: arrayRemove(currentUserDataSet[1]) })
        }

        // if user already voted to positive and he click negative remove 1 from positive vote and remove user from positive voted user and add 1 to negative vote and add user to negative voted user
        if (alreadyVotedPositive === true) {
            updateDoc(updateDocRef, { NegativeVote: currentNegativeVote + 1 })
            updateDoc(updateDocRef, { NegativeVotedUser: arrayUnion(currentUserDataSet[1]) })
            updateDoc(updateDocRef, { PositiveVote: currentPositiveVote - 1 })
            updateDoc(updateDocRef, { PositiveVotedUser: arrayRemove(currentUserDataSet[1]) })
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
                        forumData.map((forum, i) => {
                            if (forum.id === viewForum)
                                return (
                                    <div key={i} className='text-center mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>
                                        <span >{forum.Question}</span>
                                    </div>
                                )
                        })
                    }
                    {/* Question deatil and vote */}
                    {
                        forumData.map((forum, i) => {
                            if (forum.id === viewForum)
                                return (
                                    <div key={i} className="w-full max-w-[69.8rem] pb-5 flex justify-start items-center">
                                        <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                                            <div>
                                                <button onClick={() => navigate(-1)} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Back</button>
                                            </div>
                                        </div>
                                        <div className='ml-2 font-extrabold'>
                                            <span>Create By </span>
                                            <span onClick={() => navigate(`/profile/${forum.CreateUser}`)} className='hover:underline cursor-pointer'>{forum.CreateUser}</span>
                                            <span> {forum.CreateDate.toDate().getDate() + "/" + (forum.CreateDate.toDate().getMonth() + 1) + "/" + forum.CreateDate.toDate().getFullYear() + " "}</span>
                                            <span>{forum.CreateDate.toDate().getHours() < 10 ? "0" + forum.CreateDate.toDate().getHours() + ":" : forum.CreateDate.toDate().getHours() + ":"}</span>
                                            <span>{forum.CreateDate.toDate().getMinutes() < 10 ? "0" + forum.CreateDate.toDate().getMinutes() : forum.CreateDate.toDate().getMinutes()}</span>
                                        </div>
                                        {
                                            currentUserDataSet[1] === forum.CreateUser ?
                                                <></> :
                                                <>
                                                    {
                                                        forum.PositiveVotedUser.includes(currentUserDataSet[1]) ?
                                                            <button onClick={() => ForumPositiveVote(forum.PositiveVote, forum.NegativeVote, forum.PositiveVotedUser, forum.NegativeVotedUser)} className='p-1 mx-2 border-[1px] border-white rounded-md text-black bg-white'>{forum.PositiveVote} &#43;</button> :
                                                            <button onClick={() => ForumPositiveVote(forum.PositiveVote, forum.NegativeVote, forum.PositiveVotedUser, forum.NegativeVotedUser)} className='p-1 mx-2 border-[1px] border-white rounded-md hover:text-black hover:bg-white'>{forum.PositiveVote} &#43;</button>
                                                    }
                                                    {
                                                        forum.NegativeVotedUser.includes(currentUserDataSet[1]) ?
                                                            <button onClick={() => ForumNegativeVote(forum.PositiveVote, forum.NegativeVote, forum.PositiveVotedUser, forum.NegativeVotedUser)} className='p-1 mr-2 border-[1px] border-white rounded-md text-black bg-white'>{forum.NegativeVote} &minus;</button> :
                                                            <button onClick={() => ForumNegativeVote(forum.PositiveVote, forum.NegativeVote, forum.PositiveVotedUser, forum.NegativeVotedUser)} className='p-1 mr-2 border-[1px] border-white rounded-md hover:text-black hover:bg-white'>{forum.NegativeVote} &minus;</button>
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
                                    forumData.map((forum, i) => {
                                        if (forum.id === viewForum)
                                            return (
                                                <div key={i} className='flex flex-col'>
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
                        {/* Comment column */}
                        <div className='flex flex-col max-w-[20rem] sm:max-w-[20rem] md:max-w-[45rem] lg:md:max-w-[70rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[50px] mt-[1rem] '>
                            {/* Comment Content */}
                            {
                                commentData.map((data, i) => <Comment key={i} data={data} />)
                            }
                        </div>
                        {/* New Comment */}
                        <textarea ref={comment} type="comment" placeholder='Type Your Comment Here......' className='text-justify bg-transparent focus:outline-none flex flex-col max-w-[20rem] sm:max-w-[20rem] md:max-w-[45rem] lg:md:max-w-[70rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[70px] mt-[1rem] placeholder-white' />
                        {/* Submit Button */}
                        <div className="w-full max-w-[69.8rem] pt-5 flex justify-start mb-[3rem] sm:mb-[3rem] lg:mb-[6rem]">
                            <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                                <div>
                                    <button onClick={SubmitComment} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Submit Your Comment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
