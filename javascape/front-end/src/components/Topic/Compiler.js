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
                <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[9rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>{params.get("program").replace(/-/g, ' ')}</span>
                {/* Rank Content */}
                <div className='w-full flex flex-col justify-center items-center'>
                    {/* All Results View */}
                    <div className='w-full flex justify-center items-center'>
                        <div className='flex flex-col items-center h-full mr-10 max-w-[25rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5'>
                            <div className="flex flex-col bg-white text-black border-l-[5px] border-l-[#b962f4] p-3 my-5">
                                <span><span className="text-[#DD4A68]">System</span>.out.<span className="text-[#DD4A68]">println</span><span className="text-[#690]">("Hello World!");</span></span>
                            </div>
                            <CopyToClipboard text={`System.out.println("Hello World!");`} onCopy={() => setCopied(true)}>
                                <button>Copy Code</button>
                            </CopyToClipboard>
                        </div>
                        <div className='flex flex-col items-center h-full mr-10 max-w-[70rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5'>
                            <iframe src="https://trinket.io/embed/java/65a6fb6b35" className='w-full h-full px-6' />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
