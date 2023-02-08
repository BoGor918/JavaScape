import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function PrintMultipleString() {
    // copy to clipboard
    const [copied, setCopied] = useState(false)

    return (
        <div className='w-full flex justify-center'>
            {/* Description View */}
            <div className='flex flex-col items-center h-full mr-4 max-w-[27rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 p-5'>
                <span className='font-bold underline'>Description - Click To Copy</span>
                <CopyToClipboard text={`// Print Out multiple string values\nSystem.out.println("Hello World!");\nSystem.out.println("I am learning Java.");\nSystem.out.println("It is awesome!");`} onCopy={() => setCopied(true)}>
                    <button><SyntaxHighlighter className="flex flex-col bg-white text-black border-l-[5px] border-l-[#b962f4] p-3 my-5 text-left" language="java" style={docco}>{`// Print Out multiple string values\nSystem.out.println("Hello World!");\nSystem.out.println("I am learning Java.");\nSystem.out.println("It is awesome!");`}</SyntaxHighlighter></button>
                </CopyToClipboard>
                {copied ? <span className='text-white bg-[#68cb9b] px-2 rounded-sm'>✔ Copied.</span> : null}
            </div>
            {/* Compiler View*/}
            <div className='flex flex-col h-full items-center max-w-[70rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 p-[38px]'>
                <iframe className='w-full h-[30rem] rounded-md' src="https://www.interviewbit.com/embed/snippet/5a7d7fcd97fc31e7c56e" title='Interviewbit Ide snippet/173e0ccff5920b5109f5' loading="lazy" allow="clipboard-write" allowfullscreen referrerpolicy="unsafe-url" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"></iframe>
            </div>
        </div>
    )
}
