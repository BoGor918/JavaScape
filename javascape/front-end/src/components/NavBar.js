/* eslint-disable array-callback-return */
import React, { useState, useContext } from 'react'
import Logo from "../images/Logo.png"
import { MapperContext } from '../globalVariables/MapperContextProvider'
import { NavLink } from 'react-router-dom'
import Hamburger from 'hamburger-react'

export default function NavBar() {
    // call data from mapper context js
    const {
        authUser,
        currentUserDataSet
    } = useContext(MapperContext);

    // nav bar state
    const [nav, setNav] = useState(true)
    // nav bar function
    const handleNav = () => {
        setNav(!nav)
    }

    // nav bar text active and inactive link style
    const activeLink = "text-white uppercase"
    const inactiveLink = "text-[#B154F0] hover:text-white active:text-white duration-300 uppercase"

    return (
        <div className='bg-[#19002A] w-full text-white font-exo uppercase fixed z-50'>
            <div className='max-w-[1280px] h-[100px] mx-auto px-4 flex justify-between items-center'>
                {/* Logo */}
                <div>
                    <NavLink to="/"><img src={Logo} alt="" className="max-w-[8rem] sm:max-w-[8rem] md:max-w-[10rem] lg:max-w-[10rem]" /></NavLink>
                </div>
                <div className='hidden md:flex items-center'>
                    {/* Nav Text */}
                    <ul className='flex'>
                        <li className='px-5'><NavLink to="/topic?name=javaoutput" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Topic</NavLink></li>
                        <li className='px-5'><NavLink to="/battle" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Battle</NavLink></li>
                        <li className='px-5'><NavLink to="/rank" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Rank</NavLink></li>
                        <li className='px-5'><NavLink to="/forum" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Forum</NavLink></li>
                        <li className='px-5'><NavLink to="/shop" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Shop</NavLink></li>
                    </ul>
                    {/* Login and Button */}
                    <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit mx-5">
                        {/* Link to profile only user is logged in else show login button */}
                        <div>
                            {
                                authUser === null ?
                                    <button className='px-3 h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'><NavLink to="/login">Login</NavLink></button> :
                                    <button className='px-3 h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'><NavLink to="/profile">{currentUserDataSet[1]}</NavLink></button>
                            }
                        </div>
                    </div>
                </div>
                {/* Mobile Responsive Burger Tag */}
                <div onClick={handleNav} className="block md:hidden">
                    <Hamburger size={20} onClick={handleNav} className='block md:hidden' />
                </div>
            </div>

            {/* Mobile Responsive Menu */}
            <div className={!nav ? 'fixed left-0 top-0 w-[50%] bg-[#19002A] h-full ease-in-out duration-500 z-40' : 'fixed left-[-100%] top-0 w-[50%] bg-[#19002A] h-full ease-in-out duration-500 z-40'}>
                {/* Logo */}
                <div className='mx-[1rem] my-[1.3rem]'>
                    <NavLink to="/"><img src={Logo} alt="" className="max-w-[8rem] sm:max-w-[8rem] md:max-w-[10rem] lg:max-w-[10rem]" /></NavLink>
                </div>
                {/* Nav Text */}
                <ul className="pt-5 px-5">
                    <li className='p-5 border-b border-gray-500'><NavLink to="/topic?name=javaoutput" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Topic</NavLink></li>
                    <li className='p-5 border-b border-gray-500'><NavLink to="/battle" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Battle</NavLink></li>
                    <li className='p-5 border-b border-gray-500'><NavLink to="/rank" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Rank</NavLink></li>
                    <li className='p-5 border-b border-gray-500'><NavLink to="/forum" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Forum</NavLink></li>
                    <li className='p-5 border-b border-gray-500'><NavLink to="/shop" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Shop</NavLink></li>
                </ul>
                {/* Login and Button */}
                <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit my-7 mx-[27px]">
                    {/* Link to profile only user is logged in else show login button */}
                    <div>
                        {
                            authUser === null ?
                                <button className='px-3 h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 uppercase font-extrabold'><NavLink to="/login">Login</NavLink></button> :
                                <button className='px-3 h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 uppercase font-extrabold'><NavLink to="/profile">{currentUserDataSet[1]}</NavLink></button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
