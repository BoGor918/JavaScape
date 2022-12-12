import React from 'react'
import { createContext, useState, useEffect } from "react"
import { firestore } from "../firebase"
import { collection, getDocs } from 'firebase/firestore'

export const MapperContext = createContext("")

export default function MapperContextProvider(props) {

    const [userData, setUserData] = useState([])
    const usersCollectionRef = collection(firestore, "Users")

    useEffect(() => {
        const GetUserData = async () => {
            const userDataRef = await getDocs(usersCollectionRef)

            setUserData(userDataRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        GetUserData()
    })

    return (
        <MapperContext.Provider
            value={{
                userData,
            }}
        >
            {props.children}
        </MapperContext.Provider>
    )
}