import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

export default function Login() {

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const Login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='Login mt-2'>
            <div>
                <span className='font-bold'>Login Information</span>

                <div className='mt-2'>
                    <span>Email: </span>
                    <input onChange={(email) => { setLoginEmail(email.target.value) }} type="email" required className="border-2" />
                </div>

                <div className='mt-2'>
                    <span>Password: </span>
                    <input onChange={(password) => { setLoginPassword(password.target.value) }} type="password" required className="border-2" />
                </div>

                <button onClick={Login} className='mt-2 border-2'>Login</button>
            </div>

        </div>
    )
}
