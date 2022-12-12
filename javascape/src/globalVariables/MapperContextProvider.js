import React from 'react'
import { createContext, useState, useEffect } from "react"
import { firestore, auth } from "../firebase"
import { collection, getDocs, } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth"

export const MapperContext = createContext()

export default function MapperContextProvider(props) {

    const [userData, setUserData] = useState([])
    const [authUser, setAuthUser] = useState({})

    const usersCollectionRef = collection(firestore, "Users")

    onAuthStateChanged(auth, (currentUser) => {
        setAuthUser(currentUser)
    })

    useEffect(() => {
        const GetUserData = async () => {
            const userDataRef = await getDocs(usersCollectionRef)

            setUserData(userDataRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        GetUserData()
    })

    return (
        <MapperContext.Provider value={{userData, authUser}}>
            {props.children}
        </MapperContext.Provider>
    )
}