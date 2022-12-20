import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Stage() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/新增資料夾.loader.js",
    dataUrl: "Build/新增資料夾.data",
    frameworkUrl: "Build/新增資料夾.framework.js",
    codeUrl: "Build/新增資料夾.wasm",
  });

  return <Unity unityProvider={unityProvider} className="w-full" />;
}