/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useNavigate } from 'react-router-dom'

export default function PrintStringHelloWorld() {
  // navigate function
  const navigate = useNavigate();
  // copy to clipboard
  const [copied, setCopied] = useState(false)

  return (
    <div className='Forum flex flex-col text-white font-exo w-full'>
      {/* Content */}
      <div className='w-full overflow-auto flex flex-col items-center'>
        {/* Back Button */}
        <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[83.9rem] pb-5 flex justify-start">
          <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
            <div>
              <button onClick={() => navigate(-1)} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[16px] px-3 h-[2rem] sm:h-[2rem] md:h-[2.6rem] lg:h-[2.6rem] bg-[#371152] hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Back</button>
            </div>
          </div>
        </div>
        {/* Two Side Panel */}
        <div className='w-full flex justify-center'>
          {/* Description Panel */}
          <div className='flex flex-col p-5 mr-4 max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:max-w-[28rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5'>
            <span className='font-bold underline self-center'>Description - Click To Copy</span>
            <CopyToClipboard text={`System.out.println("Hello World!");`} onCopy={() => setCopied(true)}>
              <button><SyntaxHighlighter className="flex flex-col bg-white text-black border-l-[5px] border-l-[#b962f4] p-3 my-5 text-left" language="java" style={docco}>{`// Print Out string values Hello World!\nSystem.out.println("Hello World!");`}</SyntaxHighlighter></button>
            </CopyToClipboard>
            {copied ? <span className='text-white bg-[#68cb9b] px-2 rounded-sm w-fit self-center'>✔ Copied.</span> : null}
          </div>
          {/* Compiler Panel */}
          <div className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:max-w-[55rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 p-5'>
            <iframe className='w-full h-[30rem] rounded-md' src="https://www.interviewbit.com/embed/snippet/5a7d7fcd97fc31e7c56e" title='Interviewbit Ide snippet/173e0ccff5920b5109f5' loading="lazy" allow="clipboard-write" allowfullscreen referrerpolicy="unsafe-url" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
