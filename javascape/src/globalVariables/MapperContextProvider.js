import React from 'react'
import { createContext, useState, useEffect } from "react"
import { firestore, auth } from "../firebase"
import { collection, getDocs, } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth"

export const MapperContext = createContext()

export default function MapperContextProvider(props) {

    // User data set from firestore
    const [userData, setUserData] = useState([])
    // Logged user data
    const [authUser, setAuthUser] = useState({})

    // Get users collection from firestore
    const usersCollectionRef = collection(firestore, "Users")

    // Set logged user
    onAuthStateChanged(auth, (currentUser) => {
        setAuthUser(currentUser)
    })

    // Map the user data
    useEffect(() => {
        const GetUserData = async () => {
            const userDataRef = await getDocs(usersCollectionRef)

            setUserData(userDataRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        GetUserData()
    })

    return (
        // Pass the data to the children
        <MapperContext.Provider value={{
            userData, 
            authUser,
        }}>
            {props.children}
        </MapperContext.Provider>
    )
}