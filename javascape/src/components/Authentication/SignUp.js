/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useRef } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, firestore } from "../../firebase"
import { doc, setDoc } from "firebase/firestore"
import Logo from '../../images/Logo.png'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { MapperContext } from '../../globalVariables/MapperContextProvider'

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
        console.log(registerEmail.current.value, registerPassword.current.value, registerUsername.current.value)

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

        // if is all data ok
        if (canReg[0] === true && canReg[1] === true && canReg[2] === true && canReg[3] === true) {
            await setDoc(doc(firestore, "Users", registerUsername.current.value), {
                Username: registerUsername.current.value,
                Email: registerEmail.current.value,
                Password: registerPassword.current.value,
                Position: "Private (E-1)",
                TotalScore: 0,
                CreateDate: new Date(),
            }).then(async () => {
                await setDoc(doc(firestore, `Users/${registerUsername.current.value}/Levels`, "Level1"), {
                    Username: registerUsername.current.value,
                    HighestScore: 0,
                    Level: 1,
                })

                await createUserWithEmailAndPassword(auth, registerEmail.current.value, registerPassword.current.value)
            })
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
        authUser !== null ? navigate('/profile') :
            <div className='SignUp flex flex-col justify-center items-center h-screen bg-background bg-[#09002B] text-white font-exo uppercase'>
                {/* Logo */}
                <div>
                    <NavLink to="/"><img src={Logo} alt="" className="max-w-[13rem] sm:max-w-[13rem] md:max-w-[17rem] lg:max-w-[17rem] my-10" /></NavLink>
                </div>
                {/* Sign up form */}
                <div className='flex flex-col max-w-[22rem] sm:max-w-[22rem] md:max-w-[28rem] lg:max-w-[28rem] w-full items-center px-[4rem] sm:px-[4rem] md:px-[5.5rem] lg:px-[5.5rem] rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>
                    {/* Sign up text */}
                    <span className='font-bold text-2xl text-white my-5'>Sign Up</span>
                    {/* Email field */}
                    <div class="w-full relative group my-5">
                        <input ref={registerEmail} type="text" id="email" required class="text-sm sm:text-sm md:text-md lg:text-[16px] w-full h-10 peer border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent outline-none" />
                        <label for="email" class="text-sm sm:text-sm md:text-md lg:text-[16px] transform transition-all absolute top-0 left-0 h-full flex items-center group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Email Address :</label>
                    </div>
                    {/* Username field */}
                    <div class="w-full relative group my-5">
                        <input ref={registerUsername} type="text" id="username" required class="text-sm sm:text-sm md:text-md lg:text-[16px] w-full h-10 peer border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent outline-none" />
                        <label for="username" class="text-sm sm:text-sm md:text-md lg:text-[16px] transform transition-all absolute top-0 left-0 h-full flex items-center group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Username :</label>
                    </div>
                    {/* Password field */}
                    <div class="w-full relative group my-5">
                        <input ref={registerPassword} type="password" id="password" required class="text-sm sm:text-sm md:text-md lg:text-[16px] w-full h-10 peer border-l-0 border-b-2 border-r-0 border-t-0 bg-transparent outline-none" />
                        <label for="password" class="text-sm sm:text-sm md:text-md lg:text-[16px] transform transition-all absolute top-0 left-0 h-full flex items-center group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Password : &#8805; 6</label>
                    </div>
                    {/* Sign up button */}
                    <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] my-3 max-w-[7rem] w-full">
                        <div>
                            <button onClick={Register} className='uppercase w-full h-[3rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30'>Sign Up</button>
                        </div>
                    </div>
                    {/* Link to login view */}
                    <div className='my-3 text-xs sm:text-sm md:text-md lg:text-md'>
                        <span>Already have a account ? <a href='/login' className='underline'>Login</a></span>
                    </div>
                </div>
            </div>
    )
}
