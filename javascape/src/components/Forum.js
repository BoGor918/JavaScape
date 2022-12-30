import React, { useContext, useRef, useState } from 'react'
import NavBar from './NavBar'
import { MapperContext } from '../globalVariables/MapperContextProvider'
import { firestore } from "../firebase"
import { doc, setDoc, addDoc, collection } from 'firebase/firestore'
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom'

export default function Forum() {
    // call data from mapper context js
    const {
        currentUserDataSet,
        forumData,
        authUser,
    } = useContext(MapperContext)

    // navigate function
    const navigate = useNavigate();

    // Firebase storage
    const storage = getStorage();

    // Forum variables
    const question = useRef("");
    const description = useRef("");

    const [image, setImage] = useState(undefined)
    const hiddenFileInput = useRef(null);

    const handleImageUploaded = (event) => {
        setImage(event.target.files[0]);
    };

    const CreateQuestion = async () => {
        const today = new Date()
        const timeCode = currentUserDataSet[1] + "-" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds()

        const forumImageRef = ref(storage, "Forum/" + timeCode)

        const createDate = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes()

        // add reply sub collection
        const forumReplyRef = collection(firestore, 'Forum/' + timeCode + '/Reply');

        await uploadBytes(forumImageRef, image).then(
            async () => {
                await getDownloadURL(forumImageRef).then(
                    async (url) => {
                        if (question.current.value !== "" && description.current.value !== "") {
                            await setDoc(doc(firestore, "Forum", timeCode), {
                                Question: question.current.value,
                                Description: description.current.value,
                                Image: url,
                                CreateUser: currentUserDataSet[1],
                                PositiveVote: 0,
                                NegativeVote: 0,
                                CreateDate: createDate,
                            }).then(() => {
                                addDoc(forumReplyRef, {
                                    ForumReply: "ForumReply",
                                })
                                window.location.reload()
                            })
                        } else {
                            alert("Please Input Your Question and Description")
                        }
                    }
                )
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
        <div className='Forum bg-[#09002B] bg-background text-white font-exo h-screen'>
            <NavBar />
            {/* Content */}
            <div className='w-full h-full overflow-auto flex flex-col items-center'>
                {/* Title */}
                <span className='text-center mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>Feel Free To Ask Your Teammates</span>
                {/* Create Button */}
                {
                    !modal && (
                        <div className="w-full max-w-[54.9rem] pb-5 flex justify-start">
                            <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                                <div>
                                    <button onClick={toggleModal} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Create Question</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    modal && (
                        <div className="w-full max-w-[54.9rem] pb-5 flex justify-start">
                            <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                                <div>
                                    <button onClick={toggleModal} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Back</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {/* Level Grid Column */}
                <div className='w-full flex flex-col justify-center items-center'>
                    {
                        !modal && (
                            <div className='w-full flex flex-col justify-center items-center'>
                                <div className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:md:max-w-[55rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[20px] sm:px-[20px] md:px-[35px] lg:px-[50px]'>
                                    {/* Forum Table */}
                                    {
                                        forumData.map((forum) => {
                                            return (
                                                <div onClick={() => navigate(`/forum/${forum.id}`)} className='flex justify-center my-[1rem] hover:bg-black/20 rounded-lg px-5 py-[5px] cursor-pointer'>
                                                    <div className='w-full max-w-[2.5rem] flex flex-col justify-center text-[12px] font-extrabold'>
                                                        <div className=''>{forum.PositiveVote} &#43;</div>
                                                        <div className=''>{forum.NegativeVote} &minus;</div>
                                                    </div>
                                                    <div className='w-full flex flex-col justify-center'>
                                                        <span className='text-sm sm:text-sm md:text-xl lg:text-xl text-white font-extrabold'>
                                                            {forum.Question}
                                                        </span>
                                                        <span className='text-[12px]'>
                                                            Create By {forum.CreateUser} {forum.CreateDate}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                    {/* Popup Model */}
                    {
                        modal && (
                            <div className='w-full flex flex-col justify-center items-center'>
                                <div className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:md:max-w-[55rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5 px-[25px] md:lg:px-[50px]'>
                                    {/* Rank Lable */}
                                    <div className='flex justify-between'>
                                        <div className='w-full flex flex-col justify-center items-center'>
                                            {/* Question Field */}
                                            <div className='my-3 flex flex-col w-full max-w-[40rem]'>
                                                <span className='uppercase text-sm sm:text-sm md:text-xl lg:text-xl'>Question : </span>
                                                <input ref={question} type="question" required className="border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                                            </div>
                                            {/* Textarea */}
                                            <div className='my-3 flex flex-col w-full max-w-[40rem]'>
                                                <span className='uppercase text-sm sm:text-sm md:text-xl lg:text-xl'>Enter Your Description Here : </span>
                                                <textarea ref={description} type="question" required className="text-justify border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                                            </div>
                                            <div className="my-3 flex flex-col w-full max-w-[40rem]">

                                                <span className='uppercase text-sm sm:text-sm md:text-xl lg:text-xl'>Upload Image (Optional) : </span>
                                                <input
                                                    className=""
                                                    type="file"
                                                    ref={hiddenFileInput}
                                                    onChange={handleImageUploaded}
                                                    accept=".jpg,.png,.jpeg,.tiff"
                                                    name="banner"
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Create Button */}
                                <div className="w-full max-w-[1280px] pt-5 flex justify-center mb-[3rem] sm:mb-[3rem] lg:mb-[6rem]">
                                    {/* Ask Question Button */}
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
            </div>
        </div>
    )
}
