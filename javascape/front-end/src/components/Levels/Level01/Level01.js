/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useContext } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { firestore } from "../../../firebase"
import { updateDoc, doc, collection, getDocs } from 'firebase/firestore'
import { MapperContext } from "../../../globalVariables/MapperContextProvider";
import NavBar from "../../NavBar";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading";

export default function Level01() {
  // get user data from context
  const {
    authUser,
    currentUserDataSet,
  } = useContext(MapperContext);

  // navigate function
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
  const { unityProvider, addEventListener, removeEventListener, loadingProgression, isLoaded } =
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

    // add space coin
    updateDoc(updateUserRef, { SpaceCoin: 50 + currentUserDataSet[6] })
  }, [currentLevelDataSet, currentUserDataSet]);

  console.log(currentUserDataSet[6])

  // add and remove event listener
  useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    return () => {
      removeEventListener("GameOver", handleGameOver);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);

  // loading function
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [])

  return (
    <div>
      {
        loading ? <Loading /> :
          <div className="Level01 flex flex-col text-white font-exo w-full">
            <NavBar />
            <div className="mb-[7rem] sm:mb-[7rem] md:mb-[10rem] lg:mb-[10rem]">
              <div className="w-full flex flex-col justify-center items-center px-4 sm:px-4 md:px-24 lg:px-24 pt-[10rem]">
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
                {!isLoaded && (
                  <div className="flex justify-center items-center text-lg sm:text-lg md:text-2xl lg:text-2xl mt-[10rem] md:mt-[20rem] lg:mt-[20rem]">
                    <span>Loading Application... {Math.round(loadingProgression * 100)}%</span>
                  </div>
                )}
                {/* Unity Game Content */}
                <Unity unityProvider={unityProvider} className="w-full max-w-[1280px]" />
                {/* Exit Button */}
                <div className="w-full max-w-[1280px] pt-5">
                  <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit self-end">
                    <div>
                      <button onClick={() => window.close()} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Leave Game</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  );
}