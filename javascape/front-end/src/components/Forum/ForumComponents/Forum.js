/* eslint-disable array-callback-return */
import React, { useContext, useRef, useState, useEffect } from 'react'
import { MapperContext } from '../../../globalVariables/MapperContextProvider'
import { firestore } from "../../../firebase"
import { doc, setDoc, addDoc, collection } from 'firebase/firestore'
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage"
import { useNavigate } from 'react-router-dom'
import NavBar from '../../NavBar'
import Loading from '../../Loading'
import ForumList from './ForumList'
import ForumPagination from './ForumPagination'

export default function Forum() {
    // call data from mapper context js
    const {
        currentUserDataSet,
        forumData,
        authUser,
    } = useContext(MapperContext)

    // navigate function
    const navigate = useNavigate()

    // Firebase storage
    const storage = getStorage()

    // Forum variables
    const question = useRef("")
    const description = useRef("")
    const [image, setImage] = useState(undefined) // image state
    const hiddenFileInput = useRef(null); // hidden file input

    // handle image upload
    const handleImageUploaded = (event) => {
        setImage(event.target.files[0])
    };

    // Create Question
    const CreateQuestion = async () => {
        const today = new Date()
        const timeCode = currentUserDataSet[1] + "-" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds()

        const forumImageRef = ref(storage, "Forum/" + timeCode)

        // add reply sub collection
        const forumReplyRef = collection(firestore, 'Forum/' + timeCode + '/Comment');

        await uploadBytes(forumImageRef, image).then(
            async () => {
                await getDownloadURL(forumImageRef).then(
                    async (url) => {
                        if (question.current.value !== "" && description.current.value !== "" && image !== undefined) {
                            await setDoc(doc(firestore, "Forum", timeCode), {
                                Question: question.current.value,
                                Description: description.current.value,
                                Image: url,
                                CreateUser: currentUserDataSet[1],
                                PositiveVote: 0,
                                NegativeVote: 0,
                                PositiveVotedUser: [],
                                NegativeVotedUser: [],
                                CreateDate: new Date(),
                                EmailStatus: false,
                            }).then(() => {
                                addDoc(forumReplyRef, {
                                    Comment: "Comment",
                                })
                                window.location.reload()
                            })
                        } else if (question.current.value !== "" && description.current.value !== "" && image === undefined) {
                            await setDoc(doc(firestore, "Forum", timeCode), {
                                Question: question.current.value,
                                Description: description.current.value,
                                Image: null,
                                CreateUser: currentUserDataSet[1],
                                PositiveVote: 0,
                                NegativeVote: 0,
                                PositiveVotedUser: [],
                                NegativeVotedUser: [],
                                CreateDate: new Date(),
                                EmailStatus: false,
                            }).then(() => {
                                addDoc(forumReplyRef, {
                                    Comment: "Comment",
                                })
                                window.location.reload()
                            })
                        } else if (question.current.value === "" && description.current.value === "") {
                            alert("Please Input Your Question and Description")
                        }
                    }
                )
            })
    }

    // Popup detail
    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        authUser == null ? navigate("/login") : setModal(!modal)
    };

    if (modal) {
        document.body.classList.add('active-modal')
    }

    // loading function
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])

    // Pagination forum
    const [currentPage, setCurrentPage] = useState(1)
    const postPerPage = 5
    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = forumData.slice(firstPostIndex, lastPostIndex)

    return (
        <div>
            {
                loading ? <Loading /> :
                    <div className='Forum flex flex-col text-white font-exo w-full'>
                        {/* Navbar */}
                        <NavBar />
                        {/* Content */}
                        <div className='w-full overflow-auto flex flex-col items-center mb-[7rem] sm:mb-[7rem] md:mb-[10rem] lg:mb-[10rem]'>
                            {/* Title */}
                            <span className='text-center mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>Feel Free To Ask Your Teammates</span>
                            {/* Create Question Button */}
                            {
                                !modal && (
                                    <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start">
                                        <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                                            <div>
                                                <button onClick={toggleModal} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Create Question</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {/* Back Button just the create question button is clicked */}
                            {
                                modal && (
                                    <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start">
                                        <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                                            <div>
                                                <button onClick={toggleModal} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Back</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {/* Forum Column */}
                            <div className='w-full flex flex-col justify-center items-center'>
                                {/* All Question View */}
                                {
                                    !modal && (
                                        <div className='w-full flex flex-col justify-center items-center'>
                                            <div className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:max-w-[55rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[20px] sm:px-[20px] md:px-[35px] lg:px-[50px]'>
                                                {/* Forum Table */}
                                                <ForumList listData={currentPost} />
                                            </div>
                                            {/* Pagination */}
                                            <ForumPagination totalPosts={forumData.length} postsPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                                        </div>
                                    )
                                }
                                {/* Popup Model for create question */}
                                {
                                    modal && (
                                        <div className='w-full flex flex-col justify-center items-center'>
                                            <div className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:max-w-[55rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold py-5 px-[25px] md:lg:px-[50px]'>
                                                {/* Rank Lable */}
                                                <div className='flex justify-between'>
                                                    <div className='w-full flex flex-col justify-center items-center'>
                                                        {/* Question Field */}
                                                        <div className='my-3 flex flex-col w-full max-w-[40rem]'>
                                                            <span className='uppercase text-sm sm:text-sm md:text-xl lg:text-xl'>Question : </span>
                                                            <input ref={question} maxLength={200} type="question" required className="border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                                                        </div>
                                                        {/* Textarea */}
                                                        <div className='my-3 flex flex-col w-full max-w-[40rem]'>
                                                            <span className='uppercase text-sm sm:text-sm md:text-xl lg:text-xl'>Enter Your Description Here : </span>
                                                            <textarea ref={description} maxLength={5000} type="question" required className="text-justify border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
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
                                            {/* Ask Question Button */}
                                            <div className="w-full max-w-[1280px] pt-5 flex justify-center mb-[3rem] sm:mb-[3rem] lg:mb-[6rem]">
                                                <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit mx-2">
                                                    <div>
                                                        <button onClick={() => CreateQuestion()} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Ask Question</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
