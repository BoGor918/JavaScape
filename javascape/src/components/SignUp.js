/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useRef } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, firestore } from "../firebase"
import { doc, setDoc } from "firebase/firestore"
import Logo from '../images/Logo.png'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { MapperContext } from '../globalVariables/MapperContextProvider'

export default function SignUp() {
    // call data from mapper context js
    const {
        authUser
    } = useContext(MapperContext)

    // Register variables
    const registerEmail = useRef("")
    const registerPassword = useRef("")
    const registerUsername = useRef("")
    const registerPhoneNumber = useRef("")

    // Navigate function
    const navigate = useNavigate();

    // Register function
    const Register = async () => {
        console.log(registerEmail.current.value, registerPassword.current.value, registerUsername.current.value, registerPhoneNumber.current.value)

        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail.current.value, registerPassword.current.value)

            await setDoc(doc(firestore, "Users", user.user.uid), {
                Username: registerUsername.current.value,
                Email: registerEmail.current.value,
                Password: registerPassword.current.value,
                PhoneNumber: registerPhoneNumber.current.value,
                CreateDate: new Date(),
            })

            window.location.reload();
        } catch (error) {
            console.log('Error in creating user', error);

            switch (error.code) {
                case "auth/email-already-in-use":
                    alert("Email Already in Use, Plz Try Again")
                    break;
                case "auth/invalid-email":
                    alert("Invalid Email, Plz Try Again")
                    break;
                case "auth/weak-password":
                    alert("Invalid Password, Plz Try Again")
                    break;
                default:
                    break;
            }
        }
    }

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
        authUser !== null ? navigate("/profile") :
            <div className='SignUp flex flex-col justify-center items-center h-screen bg-background bg-[#09002B] text-white font-exo'>
                {/* Logo */}
                <div>
                    <NavLink to="/"><img src={Logo} alt="" className="max-w-[13rem] sm:max-w-[13rem] md:max-w-[17rem] lg:max-w-[17rem] my-10" /></NavLink>
                </div>
                {/* Sign up form */}
                <div className='flex flex-col max-w-[22rem] sm:max-w-[22rem] md:max-w-[28rem] lg:max-w-[28rem] w-full items-center px-[4rem] sm:px-[4rem] md:px-[5.5rem] lg:px-[5.5rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>
                    {/* Sign up text */}
                    <span className='font-bold text-2xl text-white my-5'>Sign Up</span>
                    {/* Email field */}
                    <div className='my-3 flex flex-col w-full'>
                        <span>Email Address: </span>
                        <input ref={registerEmail} type="email" required className="border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                    </div>
                    {/* Username field */}
                    <div className='my-3 flex flex-col w-full'>
                        <span>Username: </span>
                        <input ref={registerUsername} type="username" required className="border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                    </div>
                    {/* Password field */}
                    <div className='my-3 flex flex-col w-full'>
                        <span>Password: <span className='text-sm'>At Least 6 Characters</span></span>
                        <input ref={registerPassword} type="password" required className="border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                    </div>
                    {/* Sign up button */}
                    <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[7rem] w-full">
                        <div>
                            <button onClick={Register} className='w-full h-[3rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>Sign Up</button>
                        </div>
                    </div>
                    {/* Link to login view */}
                    <div className='my-3 text-sm sm:text-sm md:text-md lg:text-md'>
                        <span>Already have a account? <a href='/login' className='underline'>Login</a></span>
                    </div>
                </div>
            </div>
    )
}
