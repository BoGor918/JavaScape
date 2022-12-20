/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { firestore } from "../firebase"
import { updateDoc, doc } from 'firebase/firestore'

export default function Stage() {
  // data set receive from unity
  const [isGameOver, setIsGameOver] = useState(false);
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
    setIsGameOver(true);
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
    <Fragment>
      <Unity unityProvider={unityProvider} />
      {isGameOver === true && (
        <p>{`Game Over ${userName}! You've scored ${score} points.`}</p>
      )}
    </Fragment>
  );
}