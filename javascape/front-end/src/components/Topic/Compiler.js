/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import NavBar from '../NavBar'
import { useLocation } from "react-router-dom"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import '../../global.css'

export default function Compiler() {
    // Get query from URL
    const location = useLocation()
    // set params
    const params = new URLSearchParams(location.search)
    // set topic

    // copy to clipboard
    const [copied, setCopied] = useState(false)

    return (
        <div className='Compiler bg-[#09002B] bg-background text-white font-exo h-screen'>
            <NavBar />
            {/* Content */}
            <div className='w-full h-full overflow-auto flex flex-col items-center'>
                {/* Title */}
                <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>{params.get("program").replace(/-/g, ' ')}</span>
                {/* Rank Content */}
                <div className='w-full flex flex-col justify-center items-center mb-[6rem]'>
                    {/* All Results View */}
                    <div className='w-full flex justify-center items-center'>
                        <div className='flex flex-col items-center h-full mr-10 max-w-[22rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 p-5'>
                            <span className='font-bold underline'>Description - Click To Copy</span>
                            <CopyToClipboard className="flex flex-col bg-white text-black border-l-[5px] border-l-[#b962f4] p-3 mt-5 my-2" text={`System.out.println("Hello World!");`} onCopy={() => setCopied(true)}>
                                <button><span className="text-[#690]">{`// Print Out string values Hello World!`}</span><span><span className="text-[#DD4A68]">System</span>.out.<span className="text-[#DD4A68]">println</span><span className="text-[#690]">("Hello World!");</span></span></button>
                            </CopyToClipboard>
                            {copied ? <span className='text-white bg-[#68cb9b] px-2 rounded-sm'>✔ Copied.</span> : null}
                        </div>
                        <div className='flex flex-col h-full items-center mr-10 max-w-[70rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 p-[38px]'>
                            <iframe className='w-full h-[30rem] rounded-md' src="https://www.interviewbit.com/embed/snippet/5a7d7fcd97fc31e7c56e" title='Interviewbit Ide snippet/173e0ccff5920b5109f5' loading="lazy" allow="clipboard-write" allowfullscreen referrerpolicy="unsafe-url" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
