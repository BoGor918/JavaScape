/* eslint-disable array-callback-return */
import React, { useState, useContext } from 'react'
import Logo from "../images/Logo.png"
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { MapperContext } from '../globalVariables/MapperContextProvider'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
    const {
        userData,
        authUser
    } = useContext(MapperContext);

    const [nav, setNav] = useState(true)

    const handleNav = () => {
        setNav(!nav)
    }

    const activeLink = "text-white"
    const inactiveLink = "text-[#B154F0]"

    return (
        <div className='bg-[#19002A] w-full text-white font-exo uppercase absolute'>
            <div className='max-w-[1280px] h-[100px] mx-auto px-4 flex justify-between items-center'>
                <div>
                    <NavLink to="/"><img src={Logo} alt="" className="max-w-[10rem]" /></NavLink>
                </div>

                <div className='hidden md:flex items-center '>
                    <ul className='flex'>
                        <li className='px-5'><NavLink to="/" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Home</NavLink></li>
                        <li className='px-5'><NavLink to="/topic" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Topic</NavLink></li>
                        <li className='px-5'><NavLink to="/battle" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Battle</NavLink></li>
                        <li className='px-5'><NavLink to="/rank" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Rank</NavLink></li>
                        <li className='px-5'><NavLink to="/forum" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Forum</NavLink></li>
                    </ul>

                    <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit mx-5">
                        <div>
                            {
                                authUser === null ?
                                    <button className='px-3 h-[2.6rem] bg-[#371152] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'><NavLink to="/login">Login</NavLink></button> :
                                    userData.map((user) => {
                                        if (authUser?.email === user.Email) {
                                            return (
                                                <button className='px-3 h-[2.6rem] bg-[#371152] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'><NavLink to="/profile">{user.Username}</NavLink></button>
                                            )
                                        }
                                    })
                            }
                        </div>
                    </div>



                </div>

                <div onClick={handleNav} className="block md:hidden">
                    {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>
            </div>

            <div className={!nav ? 'fixed left-0 top-0 w-[50%] bg-[#19002A] h-full ease-in-out duration-500' : 'fixed left-[-100%]'}>
                <div className='mx-[1rem] my-[0.9rem]'>
                    <img src={Logo} alt="" className="max-w-[10rem]" />
                </div>

                <ul className="pt-5 px-5">
                    <li className='p-5 border-b border-gray-500'>Home</li>
                    <li className='p-5 border-b border-gray-500'>Topics</li>
                    <li className='p-5 border-b border-gray-500'>Battle</li>
                    <li className='p-5 border-b border-gray-500'>Rank</li>
                    <li className='p-5 border-b border-gray-500'>Forum</li>
                </ul>

                <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit my-7 mx-[27px]">
                    <div>
                        <button className='px-3 h-[2.6rem] bg-[#371152] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 uppercase font-extrabold'>Bogor</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
