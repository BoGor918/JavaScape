import React, { useState, useContext } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { NavLink } from 'react-router-dom'
import LBN from '../images/Levels/Level01Banner.png'
import LBN2 from '../images/Levels/Level02Banner.png'
import LBN3 from '../images/Levels/Level03Banner.png'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { MapperContext } from '../globalVariables/MapperContextProvider'

export default function Battle() {
    const { currentUserDataSet } = useContext(MapperContext)

    const slides = [
        {
            url: LBN
        },
        {
            url: LBN2
        },
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }
    return (
        <div className='Home bg-[#09002B] bg-background flex flex-col text-white font-exo w-full'>
            <NavBar />
            {/* Level Slider */}
            <div className='max-w-[1366px] h-[950px] w-full m-auto pt-40'>
                <div>
                    <img src={`${slides[currentIndex].url}`} alt='Level Banner' />
                    <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit lg:mt-[-17%] lg:ml-[16%]">
                        <div>
                            <button className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[25px] px-8 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[4rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>
                                {
                                    currentIndex === 0 ? <NavLink to={`/battle/level01/${currentUserDataSet[0]}`}>Start Level 01</NavLink> :
                                        <NavLink to={`/battle/level02/${currentUserDataSet[0]}`}>Start Level 02</NavLink>
                                }
                            </button>
                        </div>
                    </div>
                </div>

                {/* Left Arrow */}
                <div className='absolute top-[50%] -translate-x-5 sm:-translate-x-5 lg:-translate-x-0 -translate-y-[600%] sm:-translate-y-[600%] lg:translate-y-[50%] left-5 text-2xl text-white cursor-pointer'>
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>
                {/* Right Arrow */}
                <div className='absolute top-[50%] translate-x-5 sm:-translate-x-5 lg:-translate-x-0 -translate-y-[600%] sm:-translate-y-[600%] lg:translate-y-[50%] right-5 text-2xl text-white cursor-pointer'>
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div>
            </div>

            <Footer />
        </div>
    )
}
