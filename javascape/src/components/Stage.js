import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Stage() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/Build/Stage1.loader.js",
    dataUrl: "/Build/Stage1.data",
    frameworkUrl: "/Build/Stage1.framework.js",
    codeUrl: "/Build/Stage1.wasm",
  });

  return <Unity unityProvider={unityProvider} className="w-full" />;
}