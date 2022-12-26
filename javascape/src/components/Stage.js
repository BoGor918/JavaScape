/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useContext } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { firestore } from "../firebase"
import { updateDoc, doc } from 'firebase/firestore'
import { MapperContext } from "../globalVariables/MapperContextProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

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
      <div className="Stage bg-[#09002B] bg-background flex flex-col text-white font-exo w-full">
        <NavBar />
        <div className="w-full h-screen flex justify-center items-center">
          <Unity unityProvider={unityProvider} className="w-full max-w-[1280px]" />
        </div>
      </div>
  );
}