/* eslint-disable array-callback-return */
import React, { useContext, useRef, useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { MapperContext } from '../globalVariables/MapperContextProvider'
import { firestore } from "../firebase"
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function Rank() {
    // call data from mapper context js
    const {
        currentUserDataSet,
        forumData,
        authUser,
    } = useContext(MapperContext)

    // navigate function
    const navigate = useNavigate();

    // Get forum id from url
    const viewForum = window.location.pathname.replace("/forum/", "")

    // Forum variables
    const question = useRef("");

    const CreateQuestion = async () => {
        const today = new Date()
        const timeCode = (currentUserDataSet[1] + today.getFullYear() + (today.getMonth() + 1) + "/" + today.getDate() + today.getHours() + today.getMinutes() + today.getSeconds()).replace("/", "")

        await setDoc(doc(firestore, "Forum", timeCode), {
            Question: question.current.value,
            CreateUser: currentUserDataSet[1],
            PositiveVote: 0,
            NegativeVote: 0,
            CreateDate: new Date(),
        }).then(() => {
            window.location.reload()
        })
    }

    // Popup detail
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        authUser == null ? navigate('/login') : setModal(!modal)
    };

    if (modal) {
        document.body.classList.add('active-modal')
    }

    return (
        <div className='Rank bg-[#09002B] bg-background text-white font-exo h-screen'>
            <NavBar />
            {/* Content */}
            <div className='w-full flex flex-col items-center h-screen uppercase'>
                {/* Title */}
                {
                    forumData.map((forum) => {
                        if (forum.id === viewForum)
                        return (
                            <>
                                <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>{forum.Question}</span>
                            </>
                        )
                    })
                }
                {/* Forum Content */}
                {
                    !modal && (
                        <div className='w-full flex flex-col justify-center items-center'>
                            <div className='flex flex-col max-w-[20rem] sm:max-w-[20rem] md:max-w-[45rem] lg:md:max-w-[55rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5 px-[50px]'>
                                {/* Forum Detail */}
                                <div className='flex justify-center my-[1rem] hover:bg-black/20 rounded-lg px-5 py-[5px] cursor-pointer'>

                                </div>
                            </div>
                            {/* Create Button */}
                            <div className="w-full max-w-[1280px] pt-5 flex justify-center">
                                <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                                    <div>
                                        <button onClick={() => navigate(-1)} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Back</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {/* Popup Model */}
                {
                    modal && (
                        <div className='w-full flex flex-col justify-center items-center'>
                            <div className='flex flex-col max-w-[20rem] sm:max-w-[20rem] md:max-w-[45rem] lg:md:max-w-[55rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5'>
                                {/* Rank Lable */}
                                <div className='flex justify-between'>
                                    <div className='w-full flex justify-center'>
                                        <div className='my-3 flex flex-col w-full max-w-[40rem]'>
                                            <span>Question : </span>
                                            <input ref={question} type="question" required className="border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Create Button */}
                            <div className="w-full max-w-[1280px] pt-5 flex justify-center">
                                {/* Ask Question Button */}
                                <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit mx-2">
                                    <div>
                                        <button onClick={toggleModal} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Back</button>
                                    </div>
                                </div>
                                {/* Close Panel Button */}
                                <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit mx-2">
                                    <div>
                                        <button onClick={() => CreateQuestion()} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Ask Question</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <Footer />
        </div>
    )
}
