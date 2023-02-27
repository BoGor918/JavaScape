/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { createContext, useEffect, useState } from "react"
import { firestore, auth } from "../firebase"
import { collection, query, orderBy, onSnapshot, getDocs, doc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth"
import { send } from 'emailjs-com';

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
            currentUserDataSet.push(user.id, user.Username, user.Email, user.Password, user.Position, user.TotalScore, user.SpaceCoin)

            currentUserSkillLength = user.Ability.length

            if (user.Ability.length !== 0) {
                var userSkill = null

                for (let i = 0; i < user.Ability.length; i++) {
                    if (i === user.Ability.length - 1) {
                        userSkill += `ability${i + 1}=`;  // add separator
                        userSkill += user.Ability[i]; // add value
                    }
                    if (i < user.Ability.length - 1) {
                        userSkill += `ability${i + 1}=`;  // add separator
                        userSkill += user.Ability[i] + "&"; // add value
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

    // if form Vote exist amount of number then send a email
    const CheckVote = async () => {
        forumData.map((forum) => {
            if (forum.PositiveVote >= 20 && forum.EmailStatus === false) {
                // confirm that the email has been sent message 
                console.log("Question of " + forum.Question + " has been sent to JavaScape email.")

                // send email data
                const toSend = ({
                    question: forum.Question,
                    autoResearchURL: `http://${window.location.host}/autoresearch?question=${forum.Question.replace(/ /g, '-')}`
                });

                // send email function by email js com service
                send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, toSend, process.env.REACT_APP_EMAILJS_USER_ID)
                    .then((response) => {
                        console.log('SUCCESS!', response.status, response.text);

                        const updateDocRef = doc(firestore, "Forum", forum.id)
                        updateDoc(updateDocRef, { EmailStatus: true })
                    })
                    .catch((err) => {
                        console.log('FAILED...', err);
                    });
            }
        })
    }

    // call CheckVote function
    useEffect(() => {
        CheckVote()
    }, [forumData])

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