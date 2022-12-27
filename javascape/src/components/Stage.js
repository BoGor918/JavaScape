/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useContext } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { firestore } from "../firebase"
import { updateDoc, doc } from 'firebase/firestore'
import { MapperContext } from "../globalVariables/MapperContextProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";

export default function Stage() {
  // get user data from context
  const {
    authUser
  } = useContext(MapperContext);

  // redirect to login page if user is not login
  const navigate = useNavigate();

  // data set receive from unity
  const [userName, setUserName] = useState();
  const [score, setScore] = useState();

  // unity context
  const { unityProvider, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "/Build/Build.loader.js",
      dataUrl: "/Build/Build.data",
      frameworkUrl: "/Build/Build.framework.js",
      codeUrl: "/Build/Build.wasm",
    });

  // handle unity call back function also update document
  const handleGameOver = useCallback((userName, score) => {
    setUserName(userName);
    setScore(score);

    const updateLevelPath = "Users/" + userName + "/Levels/"
    const updateLevelRef = doc(firestore, updateLevelPath, "Level1")

    updateDoc(updateLevelRef, { HighestScore: score })
  }, []);

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
        <div className="Stage bg-[#09002B] bg-background flex flex-col text-white font-exo w-full">
          <div className="w-full h-screen flex flex-col justify-center items-center px-4 pt-4 sm:px-4 sm:pt-4 md:px-24 md:pt-24 lg:px-24 lg:pt-24">
            <div className="w-full max-w-[1280px] text-3xl font-bold flex justify-between mb-3">
              <span className="text-sm sm:text-sm md:text-xl lg:text-3xl">Level 01</span>
              <span className="text-sm sm:text-sm md:text-xl lg:text-3xl">Highest Score:</span>
            </div>
            <Unity unityProvider={unityProvider} className="w-full max-w-[1280px]" />
            <div className="w-full max-w-[1280px] pt-5">
              <div class="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit self-end">
                <div>
                  <button className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'><NavLink to="/login">Back To Menu</NavLink></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}