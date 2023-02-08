/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import Logo from "../../images/Logo.png"
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import Hamburger from 'hamburger-react'

export default function CateMenu() {
    // Get query from URL
    const location = useLocation()
    // set params
    const params = new URLSearchParams(location.search)
    // navigate function
    const navigate = useNavigate();

    // nav bar state
    const [nav, setNav] = useState(true)
    // nav bar function
    const handleNav = () => {
        setNav(!nav)
    }

    return (
        <div className='ml-auto z-50'>
            <div className='max-w-[1280px] h-[100px] mx-auto px-4 flex justify-between items-center'>
                {/* Mobile Responsive Burger Tag */}
                <div onClick={handleNav} className="block md:visible lg:hidden">
                    <Hamburger size={20} onClick={handleNav} className='block md:hidden' />
                </div>
            </div>
            {/* Mobile Responsive Menu */}
            <div className={!nav ? 'fixed left-0 top-0 w-[50%] bg-[#19002A] h-full ease-in-out duration-500' : 'fixed left-[-100%] top-0 w-[50%] bg-[#19002A] h-full ease-in-out duration-500'}>
                {/* Logo */}
                <div className='mx-[1rem] my-[1.3rem]'>
                    <img src={Logo} alt="" className="max-w-[8rem] sm:max-w-[8rem] md:max-w-[10rem] lg:max-w-[10rem]" />
                    {
                        params.get("name") === "javaoutput" ?
                            <div className='flex flex-col justify-center items-center text-center mt-5'>
                                <span className='font-thin rounded underline px-5 my-3'>Topics</span>
                                <span className='font-thin text-[#B154F0] cursor-pointer px-5 my-3' onClick={() => navigate("/topic?name=javaoutput")}>Java Output / Print</span>
                                <span className='font-thin hover:text-[#B154F0] cursor-pointer px-5' onClick={() => navigate("/topic?name=javaforloop")}>Java For Loop</span>
                            </div>
                            :
                            params.get("name") === "javaforloop" ?
                                <div className='flex flex-col justify-center items-center text-center mt-5'>
                                    <span className='font-thin rounded underline px-5 my-3'>Topics</span>
                                    <span className='font-thin hover:text-[#B154F0] cursor-pointer px-5 my-3' onClick={() => navigate("/topic?name=javaoutput")}>Java Output / Print</span>
                                    <span className='font-thin text-[#B154F0] cursor-pointer px-5' onClick={() => navigate("/topic?name=javaforloop")}>Java For Loop</span>
                                </div>
                                :
                                <>
                                </>
                    }
                </div>
            </div>
        </div>
    )
}
