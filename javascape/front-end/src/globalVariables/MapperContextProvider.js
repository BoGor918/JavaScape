/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { createContext, useEffect, useState } from "react"
import { firestore, auth } from "../firebase"
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth"

export const MapperContext = createContext()

export default function MapperContextProvider(props) {

    // User data set from firestore
    const [userData, setUserData] = useState([])
    // Forum data set from firestore
    const [forumData, setForumData] = useState([])
    // Logged user data
    const [authUser, setAuthUser] = useState({})
    // user data set
    const currentUserDataSet = []
    // user skill set
    var currentUserSkillSet, currentUserSkillLength
    // get users collection from firestore
    const usersCollectionRef = collection(firestore, "Users")
    const forumCollection = collection(firestore, "Forum")

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
            currentUserDataSet.push(user.id, user.Username, user.Email, user.Password, user.Position, user.TotalScore)

            currentUserSkillLength = user.Skill.length

            if (user.Skill.length !== 0) {
                var userSkill = null

                for (let i = 0; i < user.Skill.length; i++) {
                    if (i === user.Skill.length - 1) {
                        userSkill += `skill${i + 1}=`;  // add separator
                        userSkill += user.Skill[i]; // add value
                    }
                    if (i < user.Skill.length - 1) {
                        userSkill += `skill${i + 1}=`;  // add separator
                        userSkill += user.Skill[i] + "&"; // add value
                    }
                }

                currentUserSkillSet = `?${userSkill.replace("null", "")}`
            }
        }
    })

    useEffect(() => {
        const GetUserData = async () => {
            const userDataRef = await getDocs(usersCollectionRef)
            setUserData(userDataRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        GetUserData()
    }, [authUser])

    useEffect(() => {
        const q = query(forumCollection, orderBy("CreateDate", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setForumData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
        return unsub;
    }, [authUser]);

    return (
        // Pass the data to the children
        <MapperContext.Provider value={{
            authUser,
            userArray,
            currentUserDataSet,
            userData,
            forumData,
            usersCollectionRef,
            currentUserSkillSet,
            currentUserSkillLength
        }}>
            {props.children}
        </MapperContext.Provider>
    )
}