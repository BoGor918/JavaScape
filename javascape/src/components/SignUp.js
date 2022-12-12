/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, firestore } from "../firebase"
import { doc, setDoc } from "firebase/firestore"
import Logo from '../images/Logo.png'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

export default function SignUp() {

    var registerEmail = null, registerPassword = null, registerUsername = null, registerPhoneNumber = null;

    const setRegisterEmail = (email) => {
        registerEmail = email;
    }

    const setRegisterPassword = (password) => {
        registerPassword = password;
    }

    const setRegisterUsername = (username) => {
        registerUsername = username;
    }

    const setRegisterPhoneNumber = (phone) => {
        registerPhoneNumber = phone;
    }

    const navigate = useNavigate();

    const Register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)

            await setDoc(doc(firestore, "Users", user.user.uid), {
                Username: registerUsername,
                Email: registerEmail,
                Password: registerPassword,
                PhoneNumber: registerPhoneNumber,
                CreateDate: new Date(),
            })

            navigate('/profile')

        } catch (error) {
            console.log('Error in creating user', error);
        }
    }
    
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
        <div className='SignUp flex flex-col justify-center items-center h-screen bg-background bg-[#09002B] text-white font-exo'>
            <div>
                <NavLink to="/"><img src={Logo} alt="" className="max-w-[17rem] my-10" /></NavLink>
            </div>
            <div className='flex flex-col max-w-[28rem] w-full items-center px-[5.5rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>
                <span className='font-bold text-2xl text-white my-5'>Sign Up</span>

                <div className='my-3 flex flex-col w-full'>
                    <span>Email Address: </span>
                    <input onChange={(email) => { setRegisterEmail(email.target.value) }} type="email" required className="border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                </div>

                <div className='my-3 flex flex-col w-full'>
                    <span>Phone Number: </span>
                    <input onChange={(phone) => { setRegisterPhoneNumber(phone.target.value) }} type="phone" required className="border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                </div>

                <div className='my-3 flex flex-col w-full'>
                    <span>Username: </span>
                    <input onChange={(username) => { setRegisterUsername(username.target.value) }} type="username" required className="border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                </div>

                <div className='my-3 flex flex-col w-full'>
                    <span>Password: </span>
                    <input onChange={(password) => { setRegisterPassword(password.target.value) }} type="password" required className="border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent focus:outline-none" />
                </div>

                <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[7rem] w-full">
                    <div>
                        <button onClick={Register} className='w-full h-[3rem] bg-[#371152] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>Sign Up</button>
                    </div>
                </div>

                <div className='my-3'>
                    <span>Already have a account? <a href='/' className='underline'>Login</a></span>
                </div>
            </div>

        </div>
    )
}
