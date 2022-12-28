/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { createContext, useEffect, useState } from "react"
import { firestore, auth } from "../firebase"
import { collection, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth"

export const MapperContext = createContext()

export default function MapperContextProvider(props) {

    // User data set from firestore
    const [userData, setUserData] = useState([])
    // Logged user data
    const [authUser, setAuthUser] = useState({})
    // user data set
    const currentUserDataSet = [];
    // get users collection from firestore
    const usersCollectionRef = collection(firestore, "Users")

    // set logged user data for authentication
    onAuthStateChanged(auth, (currentUser) => {
        setAuthUser(currentUser)
    })

    // set all user data
    const userArray = [
        userData.map((user) => user.Username),
        userData.map((user) => user.Email)
    ]

    // set current user data
    userData.map((user) => {
        if (user.Email === authUser?.email) {
            currentUserDataSet.push(user.id, user.Username, user.Email, user.Password, user.Position)
        }
    })

    // get and map the user data
    useEffect(() => {
        const GetUserData = async () => {
            const userDataRef = await getDocs(usersCollectionRef)

            setUserData(userDataRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        GetUserData()
    }, [authUser])

    return (
        // Pass the data to the children
        <MapperContext.Provider value={{
            authUser,
            userArray,
            currentUserDataSet,
        }}>
            {props.children}
        </MapperContext.Provider>
    )
}