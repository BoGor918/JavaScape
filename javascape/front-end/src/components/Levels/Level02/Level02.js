/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useContext, Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { firestore } from "../../../firebase"
import { updateDoc, doc, collection, getDocs } from 'firebase/firestore'
import { MapperContext } from "../../../globalVariables/MapperContextProvider";
import NavBar from "../../NavBar";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading";
import EmailVerification from '../../EmailVerification'

export default function Level02() {
  // get user data from context
  const {
    authUser,
    currentUserDataSet,
  } = useContext(MapperContext);

  // navigate function
  const navigate = useNavigate();

  // data set receive from unity
  const [score, setScore] = useState();
  const [userLevel2Data, setUserLevel2Data] = useState([]);
  const currentLevelDataSet = [];

  const usersLevel2Ref = collection(firestore, `Users/${currentUserDataSet[0]}/Levels`)

  // get and map the user data
  useEffect(() => {
    const GetUserData = async () => {
      const userLevel2Data = await getDocs(usersLevel2Ref)

      setUserLevel2Data(userLevel2Data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    GetUserData()
  }, [authUser])

  // set current user data
  userLevel2Data.map((level2) => {
    if (level2.Level === 2) {
      currentLevelDataSet.push(level2.Level, level2.Username, level2.HighestScore)
    }
  })

  // unity context
  const { unityProvider, addEventListener, removeEventListener, loadingProgression, isLoaded, sendMessage } =
    useUnityContext({
      loaderUrl: "/Level02/Level02.loader.js",
      dataUrl: "/Level02/Level02.data",
      frameworkUrl: "/Level02/Level02.framework.js",
      codeUrl: "/Level02/Level02.wasm",
    });

  // handle unity call back function also update document
  const handleGameOver = useCallback((score) => {
    setScore(score);

    const updateLevelPath = "Users/" + currentUserDataSet[0] + "/Levels/"
    const updateLevelRef = doc(firestore, updateLevelPath, "Level2")

    const updateUserPath = "Users/"
    const updateUserRef = doc(firestore, updateUserPath, currentUserDataSet[0])

    if (currentLevelDataSet[2] < score) {
      console.log(score + currentUserDataSet[5] - currentLevelDataSet[2])
      updateDoc(updateLevelRef, { HighestScore: score })
      updateDoc(updateUserRef, { TotalScore: score + currentUserDataSet[5] - currentLevelDataSet[2] })
    }

    // add space coin
    updateDoc(updateUserRef, { SpaceCoin: 80 + currentUserDataSet[6] })
  }, [currentLevelDataSet, currentUserDataSet]);

  const handleClickStartGame = () => {
    if (currentUserDataSet[7].length === 1) {
      sendMessage("LevelLoader", "CallSetAbility", currentUserDataSet[7][0]);
    } else if (currentUserDataSet[7].length === 2) {
      sendMessage("LevelLoader", "CallSetAbility", currentUserDataSet[7][0] + currentUserDataSet[7][1]);
    } else if (currentUserDataSet[7].length === 0) {
      sendMessage("LevelLoader", "CallSetAbility", "")
    }
    setIsGameStart(true);
  }

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

  // check is game Start
  const [isGameStart, setIsGameStart] = useState(false);

  return (
    <Fragment>
      {
        loading ? <Loading /> :
          authUser != null && authUser.emailVerified === false ? <EmailVerification /> :
            <div className="Level01 flex flex-col text-white font-exo w-full">
              <NavBar />
              <div className="mb-[7rem] sm:mb-[7rem] md:mb-[10rem] lg:mb-[10rem]">
                <div className="w-full flex flex-col justify-center items-center px-4 sm:px-4 md:px-24 lg:px-24 pt-[10rem]">
                  {
                    userLevel2Data.map((level2, i) => {
                      if (level2.Level === 2) {
                        return (
                          <div key={i} className="w-full max-w-[1280px] text-3xl font-bold flex justify-between items-center mb-3">
                            {
                              isGameStart === false ?
                                <div className="flex justify-center items-center">
                                  {/* Start Button */}
                                  <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 px-[2px] pb-[2px] pt-[0px] w-fit self-end">
                                    <div>
                                      <button onClick={handleClickStartGame} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Start Game</button>
                                    </div>
                                  </div>
                                  <span className="text-sm sm:text-sm md:text-xl lg:text-3xl ml-5">Level 02</span>
                                </div> :
                                <div className="flex justify-center items-center">
                                  <span className="text-sm sm:text-sm md:text-xl lg:text-3xl">Level 02</span>
                                </div>
                            }
                            <span className="text-sm sm:text-sm md:text-xl lg:text-3xl">Highest Score: {level2.HighestScore}</span>
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
    </Fragment>
  );
}