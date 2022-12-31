import { useNavigate } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import { MapperContext } from '../../globalVariables/MapperContextProvider'
import { firestore } from "../../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import Reply from './Reply'

const Comment = ({ data }) => {
    // call data from mapper context js
    const { currentUserDataSet } = useContext(MapperContext)

    //For collapse
    const [collapse, setCollapse] = useState(false);

    // navigate function
    const navigate = useNavigate();

    // Get forum id from url
    const viewForum = window.location.pathname.replace("/forum/", "")

    // Reply Vote Function - Positive Vote
    const CommentPositiveVote = async (currentPositiveVote, currentNegativeVote, positiveVotedUser, negativeVotedUser, replyID) => {
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

    // Reply Vote Function - Negative Vote
    const CommentNegativeVote = async (currentPositiveVote, currentNegativeVote, positiveVotedUser, negativeVotedUser, replyID) => {
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
    }

    return (
        <div className='flex flex-col w-full px-[0.4rem] my-4'>
            <div className='flex items-center'>
                {
                    currentUserDataSet[1] === data.ReplyUser ?
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
                    <div className='text-[12px]'>
                        <span>Reply By </span>
                        <span onClick={() => navigate(`/profile/${data.ReplyUser}`)} className='hover:underline cursor-pointer'>{data.ReplyUser}</span>
                        <span> {data.CreateDate.toDate().getDate() + "/" + (data.CreateDate.toDate().getMonth() + 1) + "/" + data.CreateDate.toDate().getFullYear() + " "}</span>
                        <span>{data.CreateDate.toDate().getHours() < 10 ? "0" + data.CreateDate.toDate().getHours() + ":" : data.CreateDate.toDate().getHours() + ":"}</span>
                        <span>{data.CreateDate.toDate().getMinutes() < 10 ? "0" + data.CreateDate.toDate().getMinutes() : data.CreateDate.toDate().getMinutes()}</span>
                        <span> - </span>
                        <span onClick={() => setCollapse(prev => !prev)} className='hover:underline cursor-pointer'>Show Reply</span>
                    </div>
                </div>
            </div>
            {collapse && <Reply replyReplyID={data.id} />}
        </div>
    );
}

export default Comment;