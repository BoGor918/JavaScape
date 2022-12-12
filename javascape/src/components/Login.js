/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import Logo from "../images/Logo.png"
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

export default function Login() {

    var loginEmail = null, loginPassword = null;

    const setLoginEmail = (email) => {
        loginEmail = email;
    }

    const setLoginPassword = (password) => {
        loginPassword = password;
    }

    const navigate = useNavigate();

    const Login = async () => {
        console.log(loginEmail, loginPassword)

        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(user)

            navigate("/profile")

        } catch (error) {
            console.log(error)
        }
    }

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
        <div className='Login w-full flex flex-col justify-center items-center h-screen bg-background bg-[#09002B] text-white font-exo'>

            <div>
                <NavLink to="/"><img src={Logo} alt="" className="max-w-[17rem] my-10" /></NavLink>
            </div>

            <div className='flex flex-col max-w-[28rem] w-full items-center px-[5.5rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>
                <span className='font-bold text-2xl text-white my-5'>Login</span>
                <div className='my-3 flex flex-col w-full'>
                    <span>Email Address: </span>
                    <input onChange={(email) => setLoginEmail(email.target.value)} value={loginEmail} type="email" required className="border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                </div>

                <div className='my-3 flex flex-col w-full'>
                    <span>Password: </span>
                    <input onChange={(password) => setLoginPassword(password.target.value)} value={loginPassword} type="password" required className="border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                </div>

                <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[7rem] w-full">
                    <div>
                        <button onClick={Login} className='w-full h-[3rem] bg-[#371152] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>Login</button>
                    </div>
                </div>
                <div className='my-3'>
                    <span>Do not have a account? <a href='/sign-up' className='underline'>Sign Up</a></span>
                </div>
            </div>
        </div>
    )
}
