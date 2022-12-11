import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

export default function SignUp() {

    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")

    const Register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='SignUp'>
            <div>
                <span className='font-bold'>SignUp Information</span>

                <div className='mt-2'>
                    <span>Email: </span>
                    <input onChange={(email) => { setRegisterEmail(email.target.value) }} type="email" required className="border-2" />
                </div>

                <div className='mt-2'>
                    <span>Password: </span>
                    <input onChange={(password) => { setRegisterPassword(password.target.value) }} type="password" required className="border-2" />
                </div>

                {/* <div className='mt-2'>
                    <span>Password Confirmation: </span>
                    <input type="password" required className="border-2" />
                </div> */}

                <button onClick={Register} className='mt-2 border-2'>Sign Up</button>
            </div>

        </div>
    )
}
