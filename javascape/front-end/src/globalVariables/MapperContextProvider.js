/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { createContext, useEffect, useState } from "react"
import { firestore, auth } from "../firebase"
import { collection, query, orderBy, onSnapshot, getDocs, doc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth"
import { send } from 'emailjs-com'

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
    // get users collection from firestore
    const usersCollectionRef = collection(firestore, "Users")
    const forumCollectionRef = collection(firestore, "Forum")

    // set logged user data for authentication
    onAuthStateChanged(auth, (currentUser) => {
        setAuthUser(currentUser)
    })

    // set all user data
    const userArray = [
        userData.map((user) => user.Username),
        userData.map((user) => user.Email),
        userData.length,
    ]

    // set current user data
    userData.map((user) => {
        if (user.Email === authUser?.email) {
            currentUserDataSet.push(user.id, user.Username, user.Email, user.Password, user.Position, user.TotalScore, user.SpaceCoin, user.Ability, user.PostCredit)
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
        const q = query(forumCollectionRef, orderBy("CreateDate", "desc"));
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

    if (`${new Date().getHours()}${new Date().getMinutes()}` === "1944") {

        console.log(`${new Date().getHours()}${new Date().getMinutes()}`)
    }

    // post credit reset
    setInterval(() => {
        if (`${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}` === "0200") {
            userData.map((user) => {
                const updateDocRef = doc(firestore, "Users", user.id)
                updateDoc(updateDocRef, { PostCredit: 3 })
            })
        }
    }, 1000);

    // check position update
    const CheckPosition = async () => {
        userData.map((user) => {
            const updateDocRef = doc(firestore, "Users", user.id)
            if (user.TotalScore >= 0 && user.TotalScore < 2200) {
                updateDoc(updateDocRef, { Position: "E-1 Private" })
            } else if (user.TotalScore >= 2200 && user.TotalScore < 2800) {
                updateDoc(updateDocRef, { Position: "E-3 Private First Class" })
            } else if (user.TotalScore >= 2800) {
                updateDoc(updateDocRef, { Position: "E-5 Sergeant" })
            }
        })
    }

    // call CheckPosition function
    useEffect(() => {
        CheckPosition()
    }, [userData])

    return (
        // Pass the data to the children
        <MapperContext.Provider value={{
            authUser,
            userArray,
            currentUserDataSet,
            userData,
            forumData,
            usersCollectionRef,
            forumCollectionRef,
        }}>
            {props.children}
        </MapperContext.Provider>
    )
}