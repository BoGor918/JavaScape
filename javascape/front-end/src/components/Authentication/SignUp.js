/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useRef, useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, firestore } from "../../firebase"
import { doc, setDoc } from "firebase/firestore"
import Logo from '../../images/Logo.png'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { MapperContext } from '../../globalVariables/MapperContextProvider'
import Loading from "../Loading";
import { v1 as uuidv1 } from 'uuid';

export default function SignUp() {
    // call data from mapper context js
    const {
        authUser,
        userArray,
    } = useContext(MapperContext)

    // Register variables
    const registerEmail = useRef("")
    const registerPassword = useRef("")
    const registerUsername = useRef("")

    // Navigate function
    const navigate = useNavigate();

    // Register function
    const Register = async () => {
        // Check all register inputs
        var canReg = [true, true, true, true];

        // error checking
        for (let i = 0; i < userArray[1].length; i++) {
            if (userArray[1][i] === registerEmail.current.value) {
                canReg[0] = false;
            }
        }

        if (registerEmail.current.value === "" || registerEmail.current.value.includes("@") === false || registerEmail.current.value.includes(".") === false) {
            canReg[1] = false;
        } else if (registerEmail.current.value.includes("@") === false && registerEmail.current.value.includes(".") === false) {
            canReg[1] = false;
        }

        for (let i = 0; i < userArray[0].length; i++) {
            if (userArray[0][i] === registerUsername.current.value) {
                canReg[2] = false;
            }
        }

        if (registerPassword.current.value.length < 6) {
            canReg[3] = false;
        }

        if (canReg[0] === false) {
            alert("Email Already in Use, Plz Try Again")
        } else if (canReg[1] === false) {
            alert("Invalid Email, Plz Try Again")
        } else if (canReg[2] === false) {
            alert("Username Already in Use, Plz Try Again")
        } else if (canReg[3] === false) {
            alert("Invalid Password, It Shound At Least 6 Characters, Plz Try Again")
        }

        // check username format 
        if (registerUsername.current.value.includes(" ")) {
            alert("Username Can't Have Space, Plz Try Again")
        } else if (registerUsername.current.value === "") {
            alert("Username Can't Be Empty, Plz Try Again")
        } else {
            // if is all data ok
            if (canReg[0] === true && canReg[1] === true && canReg[2] === true && canReg[3] === true) {
                const ramdonID = `JS${uuidv1().slice(0, 8)}`
                await setDoc(doc(firestore, "Users", ramdonID), {
                    Username: registerUsername.current.value,
                    Email: registerEmail.current.value.toLowerCase(),
                    Password: registerPassword.current.value,
                    Position: "E-1 Private",
                    TotalScore: 0,
                    CreateDate: new Date(),
                    Ability: [],
                    SpaceCoin: 0,
                    Level1Score: 0,
                    Level2Score: 0,
                }).then(async () => {
                    await setDoc(doc(firestore, `Users/${ramdonID}/Levels`, "Level1"), {
                        Username: registerUsername.current.value,
                        HighestScore: 0,
                        Level: 1,
                    })

                    await setDoc(doc(firestore, `Users/${ramdonID}/Levels`, "Level2"), {
                        Username: registerUsername.current.value,
                        HighestScore: 0,
                        Level: 2,
                    })

                    await createUserWithEmailAndPassword(auth, registerEmail.current.value, registerPassword.current.value)
                })
            }
        }
    }

    // loading function
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    // Enter key press event and call Register function
    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                Register();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    return (
        <div>
            {
                authUser !== null ? navigate(-1) :
                    loading ? <Loading /> :
                        <div className='SignUp flex flex-col justify-center items-center h-screen text-white font-exo uppercase'>
                            {/* Logo */}
                            <div>
                                <NavLink to="/"><img src={Logo} alt="" className="max-w-[13rem] sm:max-w-[13rem] md:max-w-[17rem] lg:max-w-[17rem] my-10" /></NavLink>
                            </div>
                            {/* Sign up form */}
                            <div className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[28rem] lg:max-w-[28rem] w-full items-center px-[4rem] sm:px-[4rem] md:px-[5.5rem] lg:px-[5.5rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>
                                {/* Sign up text */}
                                <span className='font-bold text-2xl text-white my-5'>Sign Up</span>
                                {/* Email field */}
                                <div className="w-full relative group my-5">
                                    <input ref={registerEmail} type="text" id="email" required className="text-sm sm:text-sm md:text-md lg:text-[16px] w-full h-10 peer border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent outline-none" />
                                    <label htmlFor="email" className="text-sm sm:text-sm md:text-md lg:text-[16px] transform transition-all absolute top-0 left-0 h-full flex items-center group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Email Address :</label>
                                </div>
                                {/* Username field */}
                                <div className="w-full relative group my-5">
                                    <input maxLength={8} ref={registerUsername} type="text" id="username" required className="text-sm sm:text-sm md:text-md lg:text-[16px] w-full h-10 peer border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent outline-none" />
                                    <label htmlFor="username" className="text-sm sm:text-sm md:text-md lg:text-[16px] transform transition-all absolute top-0 left-0 h-full flex items-center group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Username : &#8804; 8</label>
                                </div>
                                {/* Password field */}
                                <div className="w-full relative group my-5">
                                    <input ref={registerPassword} type="password" id="password" required className="text-sm sm:text-sm md:text-md lg:text-[16px] w-full h-10 peer border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent outline-none" />
                                    <label htmlFor="password" className="text-sm sm:text-sm md:text-md lg:text-[16px] transform transition-all absolute top-0 left-0 h-full flex items-center group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Password : &#8805; 6</label>
                                </div>
                                {/* Sign up button */}
                                <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[7rem] w-full">
                                    <div>
                                        <button onClick={Register} className='uppercase w-full h-[3rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>Sign Up</button>
                                    </div>
                                </div>
                                {/* Link to login view */}
                                <div className='mt-3 mb-[1.3rem] text-xs sm:text-sm md:text-md lg:text-md'>
                                    <span>Already have a account ? <span onClick={() => navigate("/login")} className='underline cursor-pointer'>Login</span></span>
                                </div>
                            </div>
                        </div>
            }
        </div>
    )
}
