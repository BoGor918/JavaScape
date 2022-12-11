import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, firestore  } from "../firebase"
import { doc, setDoc } from "firebase/firestore"

export default function SignUp() {

    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [registerUsername, setRegisterUsername] = useState("")

    const Register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            try {
                await setDoc(doc(firestore, "Users", user.user.uid), {
                    Username: registerUsername,
                    Email: registerEmail,
                    CreateDate: new Date(),
                });
            } catch (error) {
                console.log('Error in creating user', error);
            }
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
                    <span>Username: </span>
                    <input onChange={(username) => { setRegisterUsername(username.target.value) }} type="username" required className="border-2" />
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
