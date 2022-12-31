/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from 'react'
import { MapperContext } from '../../globalVariables/MapperContextProvider'
import { firestore } from "../../firebase"
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import ReplySingle from './ReplySingle'

export default function Reply({ replyReplyID, commentUser }) {
    // call data from mapper context js
    const {
        authUser,
    } = useContext(MapperContext)

    // Get forum id from url
    const viewForum = window.location.pathname.replace("/forum/", "")

    // Reply Collection
    const replyCollectionRef = collection(firestore, `Forum/${viewForum}/Comment/${replyReplyID}/Reply`)
    const [replyData, setReplyData] = useState([])

    // Get Reply Data
    useEffect(() => {
        const q = query(replyCollectionRef, orderBy("CreateDate", "asc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setReplyData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
        return unsub;
    }, [authUser]);

    return (
        <div className=''>
            {/* Reply Content */}
            <div className='flex flex-col w-full pl-[5rem] my-4'>
                {
                    replyData.map((reply, i) => <ReplySingle key={i} data={reply} replyReplyID={replyReplyID} />)
                }
            </div>
        </div>
    )
}
