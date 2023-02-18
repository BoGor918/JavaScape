/* eslint-disable array-callback-return */
import React, { useState, useContext } from 'react'
import Logo from "../images/Logo.png"
import { MapperContext } from '../globalVariables/MapperContextProvider'
import { NavLink } from 'react-router-dom'
import Hamburger from 'hamburger-react'
import { useNavigate } from 'react-router-dom'

export default function NavBar() {
    // call data from mapper context js
    const {
        authUser,
        currentUserDataSet
    } = useContext(MapperContext);

    // navigate function
    const navigate = useNavigate();

    // nav bar state
    const [nav, setNav] = useState(true)
    // nav bar function
    const handleNav = () => {
        setNav(!nav)
    }

    // nav bar text active and inactive link style
    const activeLink = "text-white uppercase"
    const inactiveLink = "text-[#B154F0] hover:text-white active:text-white duration-300 uppercase"

    // battle state function
    const BattleURLHandle = (url) => {
        navigate(url)
        window.location.reload()
    }

    return (
        <div className='bg-[#19002A] w-full text-white font-exo uppercase fixed z-50'>
            <div className='max-w-[1280px] h-[100px] mx-auto px-4 flex justify-between items-center'>
                {/* Logo */}
                <div>
                    {
                        window.location.pathname.split("/").length !== 4 ?
                            <NavLink to="/"><img src={Logo} alt="" className="max-w-[8rem] sm:max-w-[8rem] md:max-w-[10rem] lg:max-w-[10rem]" /></NavLink>
                            :
                            <button onClick={() => BattleURLHandle("/")}><NavLink to="/"><img src={Logo} alt="" className="max-w-[8rem] sm:max-w-[8rem] md:max-w-[10rem] lg:max-w-[10rem]" /></NavLink></button>
                    }

                </div>
                <div className='hidden md:flex items-center'>
                    {/* Nav Text */}

                    {
                        window.location.pathname.split("/").length !== 4 ?
                            <ul className='flex'>
                                <li className='px-5'><NavLink to="/" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Home</NavLink></li>
                                <li className='px-5'><NavLink to="/topic?name=javaoutput" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Topic</NavLink></li>
                                <li className='px-5'><NavLink to="/battle" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Battle</NavLink></li>
                                <li className='px-5'><NavLink to="/rank" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Rank</NavLink></li>
                                <li className='px-5'><NavLink to="/forum" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Forum</NavLink></li>
                            </ul>
                            :
                            <ul className='flex'>
                                <li className='px-5'><button onClick={() => BattleURLHandle("/")}><NavLink to="/" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Home</NavLink></button></li>
                                <li className='px-5'><button onClick={() => BattleURLHandle("/topic?name=javaoutput")}><NavLink to="/topic?name=javaoutput" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Topic</NavLink></button></li>
                                <li className='px-5'><button onClick={() => BattleURLHandle("/battle")}><NavLink to="/battle" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Battle</NavLink></button></li>
                                <li className='px-5'><button onClick={() => BattleURLHandle("/rank")}><NavLink to="/rank" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Rank</NavLink></button></li>
                                <li className='px-5'><button onClick={() => BattleURLHandle("/forum")}><NavLink to="/forum" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Forum</NavLink></button></li>
                            </ul>
                    }
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
            <div className={!nav ? 'fixed left-0 top-0 w-[50%] bg-[#19002A] h-full ease-in-out duration-500' : 'fixed left-[-100%] top-0 w-[50%] bg-[#19002A] h-full ease-in-out duration-500'}>
                {/* Logo */}
                <div className='mx-[1rem] my-[1.3rem]'>
                    <img src={Logo} alt="" className="max-w-[8rem] sm:max-w-[8rem] md:max-w-[10rem] lg:max-w-[10rem]" />
                </div>
                {/* Nav Text */}
                {
                    window.location.pathname.split("/").length !== 4
                        ?
                        <ul className="pt-5 px-5">
                            <li className='p-5 border-b border-gray-500'><NavLink to="/" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Home</NavLink></li>
                            <li className='p-5 border-b border-gray-500'><NavLink to="/topic?name=javaoutput" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Topic</NavLink></li>
                            <li className='p-5 border-b border-gray-500'><NavLink to="/battle" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Battle</NavLink></li>
                            <li className='p-5 border-b border-gray-500'><NavLink to="/rank" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Rank</NavLink></li>
                            <li className='p-5 border-b border-gray-500'><NavLink to="/forum" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Forum</NavLink></li>
                        </ul>
                        :
                        <ul className="pt-5 px-5">
                            <li className='p-5 border-b border-gray-500'><button onClick={() => BattleURLHandle("/")}><NavLink to="/" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Home</NavLink></button></li>
                            <li className='p-5 border-b border-gray-500'><button onClick={() => BattleURLHandle("/topic?name=javaoutput")}><NavLink to="/topic?name=javaoutput" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Topic</NavLink></button></li>
                            <li className='p-5 border-b border-gray-500'><button onClick={() => BattleURLHandle("/battle")}><NavLink to="/battle" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Battle</NavLink></button></li>
                            <li className='p-5 border-b border-gray-500'><button onClick={() => BattleURLHandle("/rank")}><NavLink to="/rank" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Rank</NavLink></button></li>
                            <li className='p-5 border-b border-gray-500'><button onClick={() => BattleURLHandle("/forum")}><NavLink to="/forum" className={({ isActive }) => isActive ? activeLink : inactiveLink}>Forum</NavLink></button></li>
                        </ul>
                }

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
