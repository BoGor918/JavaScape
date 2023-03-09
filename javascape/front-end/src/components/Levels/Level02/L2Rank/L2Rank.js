/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { MapperContext } from '../../../../globalVariables/MapperContextProvider'
import { query, orderBy, onSnapshot } from 'firebase/firestore'
import RankList from './L2RankList'
import RankPagination from './L2RankPagination'

export default function L1Rank() {
    // call data from mapper context js
    const {
        usersCollectionRef,
        currentUserDataSet,
        userArray,
        userData,
    } = useContext(MapperContext)

    // ascending and descending data
    const [userDataDesc, setUserDataDesc] = useState([]);
    const [userDataAsc, setUserDataAsc] = useState([]);

    // sort by function
    const [selectedOption, setSelectedOption] = useState("Descending")
    // search function
    const [searchTerm, setSearchTerm] = useState("")

    // change select value
    const HandleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value)
    };

    // map descending data
    useEffect(() => {
        const q = query(usersCollectionRef, orderBy("Level2Score", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setUserDataDesc(snapshot.docs.map((doc, index) => ({ index, ...doc.data(), id: doc.id }))))
        return unsub
    }, []);

    // map ascending data
    useEffect(() => {
        const q = query(usersCollectionRef, orderBy("Level2Score", "asc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setUserDataAsc(snapshot.docs.map((doc, index) => ({ index, ...doc.data(), id: doc.id }))))
        return unsub
    }, [])

    // check by query filter data
    useEffect(() => {
        if (searchTerm === "" && selectedOption === "Descending") {
            const q = query(usersCollectionRef, orderBy("Level2Score", "desc"));
            const unsub = onSnapshot(q, (snapshot) =>
                setUserDataDesc(snapshot.docs.map((doc, index) => ({ index, ...doc.data(), id: doc.id }))));
            return unsub;
        } else if (searchTerm === "" && selectedOption === "Ascending") {
            const q = query(usersCollectionRef, orderBy("Level1Score", "asc"));
            const unsub = onSnapshot(q, (snapshot) =>
                setUserDataAsc(snapshot.docs.map((doc, index) => ({ index, ...doc.data(), id: doc.id }))));
            return unsub;
        }
        else if (searchTerm !== "" && selectedOption === "Descending") {
            setUserDataDesc(userDataDesc.filter(user => user.Username.toLowerCase().includes(searchTerm.toLowerCase())))
        } else if (searchTerm !== "" && selectedOption === "Ascending") {
            setUserDataAsc(userDataAsc.filter(user => user.Username.toLowerCase().includes(searchTerm.toLowerCase())))
        }
    }, [searchTerm, selectedOption]);

    // Pagination forum
    const [currentPage, setCurrentPage] = useState(1)
    const postPerPage = 5
    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    var currentPost;
    // check it the value is descending or ascending
    if (selectedOption === "Descending") {
        currentPost = userDataDesc.slice(firstPostIndex, lastPostIndex)
    } else {
        currentPost = userDataAsc.slice(firstPostIndex, lastPostIndex)
    }

    return (
        <div className='Rank flex flex-col text-white font-exo w-full'>
            {/* Content */}
            <div className='w-full h-full overflow-auto flex flex-col items-center uppercase mb-[7rem] sm:mb-[7rem] md:mb-[10rem] lg:mb-[10rem]'>
                {/* Rank Content */}
                <div className='w-full flex flex-col justify-center items-center max-w-[23.5rem] sm:max-w-[23.5rem] md:max-w-[47.5rem] lg:max-w-[57.5rem]'>
                    <div className='flex justify-center items-center w-full'>
                        {/* select */}
                        <div className="rounded-none bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[1.9px] w-fit ml-5 mr-2 self-start mb-3">
                            <select onChange={HandleChange} name="order" id="order" className='rounded-none outline-none text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>
                                <option value="Descending">Descending</option>
                                <option value="Ascending">Ascending</option>
                            </select>
                        </div>
                        {/* Input */}
                        <div onClick={() => setCurrentPage(1)} className="rounded-none bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[1.9px] w-full mr-5 ml-2 self-start mb-3">
                            <input placeholder='Search For Username' onChange={(e) => setSearchTerm(e.target.value)} name="order" id="order" className='rounded-none w-full outline-none text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase' />
                        </div>
                    </div>
                    <div className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:max-w-[55rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5 px-5'>
                        {/* Rank Lable */}
                        {
                            userData.length - 1 === 0 ?
                                <div className='flex justify-center items-center'>
                                    <div className='w-full flex justify-center'>
                                        <span className='text-sm sm:text-sm md:text-xl lg:text-2xl text-white my-2 sm:my-2 md:my-3 lg:my-3 uppercase'>
                                            There is no member Yet...
                                        </span>
                                    </div>
                                </div> :
                                <>
                                    <div className='flex justify-between'>
                                        <div className='w-full flex justify-center'>
                                            <span className='text-sm sm:text-sm md:text-xl lg:text-2xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                                Rank
                                            </span>
                                        </div>
                                        <div className='w-full flex justify-center'>
                                            <span className='text-sm sm:text-sm md:text-xl lg:text-2xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                                Name
                                            </span>
                                        </div>
                                        <div className='w-full flex justify-center'>
                                            <span className='text-sm sm:text-sm md:text-xl lg:text-2xl text-white my-2 sm:my-2 md:my-3 lg:my-3'>
                                                L2-Score
                                            </span>
                                        </div>
                                    </div>
                                    {/* Rank Table */}
                                    <RankList listData={currentPost} currentUserDataSet={currentUserDataSet} wholeDataLength={userArray[2]} order={selectedOption} />
                                </>
                        }
                    </div>
                </div>
                {/* Pagination */}
                <RankPagination totalPosts={selectedOption === "Descending" ? userDataDesc.length : userDataAsc.length} postsPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
        </div>
    )
}
