/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useRef } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import Logo from "../images/Logo.png"
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { MapperContext } from '../globalVariables/MapperContextProvider'

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
                const user = await signInWithEmailAndPassword(auth, loginEmailOrUsername.current.value, loginPassword.current.value)
                console.log(user)

                navigate("/profile")
            } else {
                // if user is using username to login
                var haveUsername = false;
                for (var i = 0; i < userArray.length; i++) {
                    if (Object.is(userArray[0][i], loginEmailOrUsername.current.value) === true) {
                        const user = await signInWithEmailAndPassword(auth, userArray[1][i], loginPassword.current.value)
                        console.log(user)
                        navigate("/profile")
                        haveUsername = true;
                        break;
                    }
                    haveUsername = false;
                }

                if (haveUsername === false) {
                    alert("Invalid Email / Username or Password, Plz Try Again")
                }
            }
        } catch (error) {
            console.log(error)
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

    return (
        authUser !== null ? navigate("/profile") :
            <div className='Login w-full flex flex-col justify-center items-center h-screen bg-background bg-[#09002B] text-white font-exo'>
                {/* Logo */}
                <div>
                    <NavLink to="/"><img src={Logo} alt="" className="max-w-[13rem] sm:max-w-[13rem] md:max-w-[17rem] lg:max-w-[17rem] my-10" /></NavLink>
                </div>
                {/* Login form */}
                <div className='flex flex-col max-w-[22rem] sm:max-w-[22rem] md:max-w-[28rem] lg:max-w-[28rem] w-full items-center px-[4rem] sm:px-[4rem] md:px-[5.5rem] lg:px-[5.5rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>
                    {/* Login text */}
                    <span className='font-bold text-2xl text-white my-5'>Login</span>
                    {/* Email field */}
                    <div className='my-3 flex flex-col w-full'>
                        <span>Email Address / Username: </span>
                        <input ref={loginEmailOrUsername} type="email" required className="border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                    </div>
                    {/* Password field */}
                    <div className='my-3 flex flex-col w-full'>
                        <span>Password: </span>
                        <input ref={loginPassword} type="password" required className="border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                    </div>
                    {/* Login button */}
                    <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[7rem] w-full">
                        <div>
                            <button onClick={Login} className='w-full h-[3rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>Login</button>
                        </div>
                    </div>
                    {/* Link to sign up view */}
                    <div className='my-3 text-sm sm:text-sm md:text-md lg:text-md'>
                        <span>Do not have a account? <a href='/sign-up' className='underline'>Sign Up</a></span>
                    </div>
                </div>
            </div>
    )
}
