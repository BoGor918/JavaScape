/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useRef, useState } from 'react'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../firebase"
import Logo from "../../images/Logo.png"
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { MapperContext } from '../../globalVariables/MapperContextProvider'
import Loading from "../Loading";

export default function Login() {
    // Get user data from context
    const {
        userArray,
        authUser
    } = useContext(MapperContext);

    // Login variables
    const loginEmailOrUsername = useRef("");
    const loginPassword = useRef("");

    // Navigate function
    const navigate = useNavigate()

    // Login function
    const Login = async () => {
        try {
            // if user is using email to login
            if (loginEmailOrUsername.current.value.includes('.') && loginEmailOrUsername.current.value.includes('@')) {
                await signInWithEmailAndPassword(auth, loginEmailOrUsername.current.value, loginPassword.current.value)
            } else {
                // if user is using username to login
                var haveUsername = false;
                for (var i = 0; i < userArray[0].length; i++) {
                    if (Object.is(userArray[0][i], loginEmailOrUsername.current.value)) {
                        await signInWithEmailAndPassword(auth, userArray[1][i], loginPassword.current.value)

                        haveUsername = true
                        break;
                    }
                }
                if (haveUsername === false) {
                    alert("Invalid Email / Username or Password, Plz Try Again")
                }
            }
        } catch (error) {
            console.log(error)
            console.log(haveUsername)
            alert("Invalid Email / Username or Password, Plz Try Again")
        }
    }
    // Enter key press event and call Login function
    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                Login();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    // loading function
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    // send reset password
    const SendResetPassword = async () => {
        if (loginEmailOrUsername.current.value !== "" && loginEmailOrUsername.current.value.includes('.') && loginEmailOrUsername.current.value.includes('@')) {
            await sendPasswordResetEmail(auth, loginEmailOrUsername.current.value).then(() => {
                alert("Reset Password Link Has Been Sent to Your Email Address")
            }).catch(() => {
                alert("Too Many Requests, Plz Try Again Later")
            });
        } else if (loginEmailOrUsername.current.value === "") {
            alert("Please Enter Your Email Address to Reset Your Password")
        } else if (loginEmailOrUsername.current.value.includes('.') === false || loginEmailOrUsername.current.value.includes('@') === false) {
            alert("Please Enter Your Email Address to Reset Your Password")
        }
    }

    return (
        <div>
            {
                authUser !== null ? navigate(-1) :
                    loading ? <Loading /> :
                        <div className='Login w-full flex flex-col justify-center items-center h-screen text-white font-exo uppercase'>
                            {/* Logo */}
                            <div>
                                <NavLink to="/"><img src={Logo} alt="" className="max-w-[13rem] sm:max-w-[13rem] md:max-w-[17rem] lg:max-w-[17rem] my-10" /></NavLink>
                            </div>
                            {/* Login form */}
                            <div className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[28rem] lg:max-w-[28rem] w-full items-center px-[4rem] sm:px-[4rem] md:px-[5.5rem] lg:px-[5.5rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>
                                {/* Login text */}
                                <span className='font-bold text-2xl text-white my-5'>Login</span>
                                {/* Email field */}
                                <div className="w-full relative group my-5">
                                    <input ref={loginEmailOrUsername} type="text" id="email" required className="text-sm sm:text-sm md:text-md lg:text-[16px] w-full h-10 peer border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent outline-none" />
                                    <label htmlFor="email" className="text-sm sm:text-sm md:text-md lg:text-[16px] transform transition-all absolute top-0 left-0 h-full flex items-center group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Email Address / Username :</label>
                                </div>
                                {/* Password field */}
                                <div className="w-full relative group my-5">
                                    <input ref={loginPassword} type="password" id="password" required className="text-sm sm:text-sm md:text-md lg:text-[16px] w-full h-10 peer border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent outline-none" />
                                    <label htmlFor="password" className="text-sm sm:text-sm md:text-md lg:text-[16px] transform transition-all absolute top-0 left-0 h-full flex items-center group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Password :</label>
                                </div>
                                <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[7rem] w-full">
                                    <div>
                                        <button onClick={Login} className='uppercase w-full h-[3rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>Login</button>
                                    </div>
                                </div>
                                {/* Link to sign up view */}
                                <div className='my-3 text-xs sm:text-sm md:text-md lg:text-md'>
                                    <span>Do not have a account ? <span onClick={() => navigate("/sign-up")} className='underline cursor-pointer'>Sign Up</span></span>
                                </div>
                                <div className='mb-[1.3rem] text-xs sm:text-sm md:text-md lg:text-md'>
                                    <span onClick={SendResetPassword} className='underline cursor-pointer'>Forgot Password</span>
                                </div>
                            </div>
                        </div>
            }
        </div>
    )
}
