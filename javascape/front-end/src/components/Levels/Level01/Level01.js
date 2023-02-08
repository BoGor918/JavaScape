/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useContext } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { firestore } from "../../../firebase"
import { updateDoc, doc, collection, getDocs } from 'firebase/firestore'
import { MapperContext } from "../../../globalVariables/MapperContextProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "../../NavBar";

export default function Level01() {
  // get user data from context
  const {
    authUser,
    currentUserDataSet,
  } = useContext(MapperContext);

  // redirect to login page if user is not login
  const navigate = useNavigate();

  // data set receive from unity
  const [score, setScore] = useState();
  const [userLevel1Data, setUserLevel1Data] = useState([]);
  const currentLevelDataSet = [];

  const usersLevel1Ref = collection(firestore, `Users/${currentUserDataSet[1]}/Levels`)

  // get and map the user data
  useEffect(() => {
    const GetUserData = async () => {
      const userLevel1Data = await getDocs(usersLevel1Ref)

      setUserLevel1Data(userLevel1Data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    GetUserData()
  }, [authUser])

  // set current user data
  userLevel1Data.map((level1) => {
    if (level1.Level === 1) {
      currentLevelDataSet.push(level1.Level, level1.Username, level1.HighestScore)
    }
  })

  // unity context
  const { unityProvider, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "/Level01/Level01.loader.js",
      dataUrl: "/Level01/Level01.data",
      frameworkUrl: "/Level01/Level01.framework.js",
      codeUrl: "/Level01/Level01.wasm",
    });

  // handle unity call back function also update document
  const handleGameOver = useCallback((score) => {
    setScore(score);

    const updateLevelPath = "Users/" + currentUserDataSet[1] + "/Levels/"
    const updateLevelRef = doc(firestore, updateLevelPath, "Level1")

    const updateUserPath = "Users/"
    const updateUserRef = doc(firestore, updateUserPath, currentUserDataSet[1])

    if (currentLevelDataSet[2] < score) {
      console.log(score + currentUserDataSet[5] - currentLevelDataSet[2])
      updateDoc(updateLevelRef, { HighestScore: score })
      updateDoc(updateUserRef, { TotalScore: score + currentUserDataSet[5] - currentLevelDataSet[2] })
    }
  }, [currentLevelDataSet, currentUserDataSet]);

  // add and remove event listener
  useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    return () => {
      removeEventListener("GameOver", handleGameOver);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);

  return (
    authUser === null ? navigate("/login") :
      <div>
        <NavBar />
        <div className="Stage flex flex-col text-white font-exo w-full">
          <div className="w-full h-screen flex flex-col justify-center items-center px-4 pt-4 sm:px-4 sm:pt-4 md:px-24 md:pt-24 lg:px-24 lg:pt-24">
            {
              userLevel1Data.map((level1, i) => {
                if (level1.Level === 1) {
                  return (
                    <div key={i} className="w-full max-w-[1280px] text-3xl font-bold flex justify-between mb-3">
                      <span className="text-sm sm:text-sm md:text-xl lg:text-3xl">Level 01</span>
                      <span className="text-sm sm:text-sm md:text-xl lg:text-3xl">Highest Score: {level1.HighestScore}</span>
                    </div>
                  )
                }
              })
            }
            {/* Unity Game Content */}
            <Unity unityProvider={unityProvider} className="w-full max-w-[1280px]" />
            {/* Exit Button */}
            <div className="w-full max-w-[1280px] pt-5">
              <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit self-end">
                <div>
                  <button onClick={() => window.close()} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Leave Game</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}