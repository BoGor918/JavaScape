import React, { useState } from 'react'
import { auth } from "../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'

export default function Profile() {

    const [user, setUser] = useState({});

    const navigate = useNavigate();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    const Logout = async () => {
        await signOut(auth)
        navigate("/")
    }

    return (
        <div className='Profile mt-2'>
            <div>
                <span className='font-bold'>User Logged In As:</span>
                {user?.email}
            </div>

            <button onClick={Logout} className='mt-2 border-2'>Logout</button>
        </div>
    )
}
